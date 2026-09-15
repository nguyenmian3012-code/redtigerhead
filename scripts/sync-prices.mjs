import { createSign } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

const REQUIRED = [
  'GOOGLE_SERVICE_ACCOUNT_JSON',
  'POSTGRES_URL'
];
for (const key of REQUIRED) {
  if (!process.env[key]) throw new Error(`Missing required environment variable: ${key}`);
}

const SHEET_ID = process.env.GOOGLE_SHEET_ID || '1LAIuJro3p_e27ZMPFsdutAQUdy9aY53DKTIfBTSI1Mw';
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || '8-Production Close';
const RANGE = `'${SHEET_NAME.replaceAll("'", "''")}'!A2:J1020`;
const SURCHARGE = 500;

const b64url = (value) => Buffer.from(value).toString('base64url');
const sqlLit = (value) => `'${String(value ?? '').replaceAll("'", "''")}'`;
const jsonSql = (value) => `${sqlLit(JSON.stringify(value))}::jsonb`;

function localParts() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false
  }).formatToParts(new Date());
  const get = (type) => parts.find((p) => p.type === type)?.value;
  const date = `${get('year')}-${get('month')}-${get('day')}`;
  const hour = Number(get('hour'));
  const slot = process.env.PRICE_SYNC_SLOT || (hour < 12 ? 'AM' : 'PM');
  if (!['AM', 'PM'].includes(slot)) throw new Error('PRICE_SYNC_SLOT must be AM or PM');
  return { date, slot };
}

function parseEffectiveDate(text) {
  const raw = String(text || '').trim();
  if (!raw) return null;
  const full = [...raw.matchAll(/(\d{1,2})\/(\d{1,2})\/(\d{4})/g)];
  if (full.length) {
    const [, d, m, y] = full.at(-1);
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  const compact = raw.match(/(\d{1,2})\s*[-+]\s*(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (compact) {
    const [, , d, m, y] = compact;
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  return null;
}

function numericCell(value) {
  if (typeof value === 'number') return value;
  const normalized = String(value ?? '').replaceAll(',', '').trim();
  if (!normalized) return null;
  const number = Number(normalized);
  return Number.isFinite(number) ? number : null;
}

async function googleAccessToken() {
  const service = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = b64url(JSON.stringify({
    iss: service.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600
  }));
  const signingInput = `${header}.${payload}`;
  const signer = createSign('RSA-SHA256');
  signer.update(signingInput);
  signer.end();
  const signature = signer.sign(service.private_key).toString('base64url');
  const assertion = `${signingInput}.${signature}`;
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion
    })
  });
  if (!response.ok) throw new Error(`Google OAuth failed: ${response.status} ${await response.text()}`);
  return (await response.json()).access_token;
}

async function readSheet() {
  const token = await googleAccessToken();
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(RANGE)}?valueRenderOption=UNFORMATTED_VALUE&majorDimension=ROWS`;
  const response = await fetch(url, { headers: { authorization: `Bearer ${token}` } });
  if (!response.ok) throw new Error(`Google Sheets read failed: ${response.status} ${await response.text()}`);
  const body = await response.json();
  const observations = [];
  for (let index = 0; index < (body.values || []).length; index += 1) {
    const row = body.values[index];
    const sheetRow = index + 2;
    const effectiveDate = parseEffectiveDate(row?.[0]);
    const sourcePrice = numericCell(row?.[9]);
    if (!effectiveDate || !sourcePrice) continue;
    observations.push({
      sourceKey: `${SHEET_ID}:${SHEET_NAME}:${sheetRow}`,
      sheetRow,
      effectiveDate,
      sourcePrice,
      sourceLabel: String(row?.[0] || ''),
      payload: { A: row?.[0] ?? null, J: row?.[9] ?? null }
    });
  }
  if (!observations.length) throw new Error('No valid price observations found in column J');
  return observations;
}

function runPsql(sql, label) {
  const result = spawnSync('psql', [process.env.POSTGRES_URL, '-v', 'ON_ERROR_STOP=1', '-X', '-q'], {
    input: sql, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe']
  });
  if (result.status !== 0) throw new Error(`${label} failed: ${result.stderr || result.stdout}`);
  return result.stdout;
}

async function main() {
  const observations = await readSheet();
  const byDate = new Map();
  for (const item of observations) byDate.set(item.effectiveDate, item); // later row wins for duplicate effective dates
  const daily = [...byDate.values()].sort((a, b) => a.effectiveDate.localeCompare(b.effectiveDate));
  const latest = daily.at(-1);
  const { date: runDate, slot } = localParts();

  const schema = await readFile(new URL('../infra/postgres/rth_prices.sql', import.meta.url), 'utf8');
  runPsql(schema, 'Schema migration');

  const valuesSql = observations.map((item) => `(
    ${sqlLit(item.sourceKey)}, ${sqlLit(SHEET_ID)}, ${sqlLit(SHEET_NAME)}, ${item.sheetRow},
    ${sqlLit(item.effectiveDate)}::date, ${item.sourcePrice}, ${sqlLit(item.sourceLabel)}, ${jsonSql(item.payload)}
  )`).join(',\n');

  const latestKey = latest.sourceKey;
  const publicPrice = latest.sourcePrice + SURCHARGE;
  const tx = `
BEGIN;
INSERT INTO rth_prices.source_observation
  (source_key, spreadsheet_id, sheet_name, sheet_row, effective_date, source_price_vnd_kg, source_label, source_payload)
VALUES ${valuesSql}
ON CONFLICT (source_key) DO UPDATE SET
  effective_date = EXCLUDED.effective_date,
  source_price_vnd_kg = EXCLUDED.source_price_vnd_kg,
  source_label = EXCLUDED.source_label,
  source_payload = EXCLUDED.source_payload,
  last_seen_at = now();

INSERT INTO rth_prices.sync_run
  (run_date, publish_slot, status, source_rows, latest_source_effective_date, finished_at)
VALUES (${sqlLit(runDate)}::date, ${sqlLit(slot)}, 'ok', ${observations.length}, ${sqlLit(latest.effectiveDate)}::date, now())
ON CONFLICT (run_date, publish_slot) DO UPDATE SET
  status = 'ok', source_rows = EXCLUDED.source_rows,
  latest_source_effective_date = EXCLUDED.latest_source_effective_date,
  finished_at = now(), error_message = NULL;

INSERT INTO rth_prices.public_snapshot
  (product_code, publish_date, publish_slot, source_observation_id, source_effective_date, public_price_vnd_kg)
SELECT
  'native_tapioca_starch', ${sqlLit(runDate)}::date, ${sqlLit(slot)}, id, effective_date, ${publicPrice}
FROM rth_prices.source_observation
WHERE source_key = ${sqlLit(latestKey)}
ON CONFLICT (product_code, publish_date, publish_slot) DO UPDATE SET
  source_observation_id = EXCLUDED.source_observation_id,
  source_effective_date = EXCLUDED.source_effective_date,
  public_price_vnd_kg = EXCLUDED.public_price_vnd_kg,
  published_at = now();
COMMIT;
`;
  runPsql(tx, 'Price sync transaction');

  const pricesPath = new URL('../src/data/prices.json', import.meta.url);
  const prices = JSON.parse(await readFile(pricesPath, 'utf8'));
  const cutoff = new Date(`${runDate}T00:00:00+07:00`);
  cutoff.setDate(cutoff.getDate() - 90);
  prices.starch = daily
    .filter((item) => new Date(`${item.effectiveDate}T00:00:00+07:00`) >= cutoff)
    .map((item) => ({ date: item.effectiveDate, value: item.sourcePrice + SURCHARGE, unit: 'VND/kg' }));
  prices._meta = {
    ...(prices._meta || {}),
    starch: {
      mode: 'real',
      source: 'Google Sheet / 8-Production Close / column J',
      last_source_date: latest.effectiveDate,
      public_formula_private: true,
      sync_slot: slot,
      synced_at: new Date().toISOString()
    }
  };
  await writeFile(pricesPath, JSON.stringify(prices, null, 2) + '\n');
  console.log(`Synced ${observations.length} source rows; latest ${latest.effectiveDate}; slot ${slot}.`);
}

main().catch((error) => {
  console.error(error?.stack || error);
  process.exit(1);
});
