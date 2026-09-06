import { createHash, randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";

const host = process.env.BM_BRIDGE_HOST || "0.0.0.0";
const port = Number(process.env.BM_BRIDGE_PORT || 8789);
const deviceId = process.env.BM_DEVICE_ID || "1605063";
const databasePath = resolve(process.env.BM_DB_PATH || "data/bm-device-bridge.sqlite");
const gatewayUrl = (process.env.BM_GATEWAY_URL || "").trim();
const gatewayToken = (process.env.BM_GATEWAY_TOKEN || "").trim();
const allowedIps = new Set(
  (process.env.BM_TERMINAL_IP || "192.168.1.227")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),
);
const maxBodyBytes = 2 * 1024 * 1024;

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("BM_BRIDGE_PORT phải nằm trong khoảng 1-65535");
}
if (gatewayUrl && (!gatewayUrl.startsWith("https://") || !gatewayToken)) {
  throw new Error("Khi bật gửi Gateway, BM_GATEWAY_URL phải dùng HTTPS và BM_GATEWAY_TOKEN không được trống");
}

mkdirSync(dirname(databasePath), { recursive: true });
const db = new DatabaseSync(databasePath);
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA synchronous = FULL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS raw_events (
    sequence INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id TEXT NOT NULL UNIQUE,
    received_at TEXT NOT NULL,
    source_ip TEXT NOT NULL,
    method TEXT NOT NULL,
    path TEXT NOT NULL,
    query_string TEXT NOT NULL,
    event_kind TEXT NOT NULL,
    content_type TEXT NOT NULL,
    headers_json TEXT NOT NULL,
    body BLOB NOT NULL,
    body_sha256 TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS outbox (
    event_id TEXT PRIMARY KEY REFERENCES raw_events(event_id),
    state TEXT NOT NULL DEFAULT 'pending',
    attempt_count INTEGER NOT NULL DEFAULT 0,
    next_attempt_at TEXT NOT NULL,
    last_error TEXT,
    sent_at TEXT
  );

  CREATE TABLE IF NOT EXISTS runtime_state (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_raw_events_received_at
    ON raw_events(received_at DESC);
  CREATE INDEX IF NOT EXISTS idx_outbox_pending
    ON outbox(state, next_attempt_at);
`);

const insertEvent = db.prepare(`
  INSERT INTO raw_events (
    event_id, received_at, source_ip, method, path, query_string,
    event_kind, content_type, headers_json, body, body_sha256
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);
const insertOutbox = db.prepare(`
  INSERT INTO outbox (event_id, next_attempt_at) VALUES (?, ?)
`);
const upsertState = db.prepare(`
  INSERT INTO runtime_state (key, value, updated_at) VALUES (?, ?, ?)
  ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
`);
const statusCounts = db.prepare(`
  SELECT
    (SELECT COUNT(*) FROM raw_events) AS received,
    (SELECT COUNT(*) FROM outbox WHERE state = 'pending') AS pending,
    (SELECT COUNT(*) FROM outbox WHERE state = 'sent') AS sent,
    (SELECT MAX(received_at) FROM raw_events) AS last_event_at,
    (SELECT value FROM runtime_state WHERE key = 'last_heartbeat_at') AS last_heartbeat_at
`);
const pendingEvents = db.prepare(`
  SELECT r.*, o.attempt_count
  FROM outbox o
  JOIN raw_events r ON r.event_id = o.event_id
  WHERE o.state = 'pending' AND o.next_attempt_at <= ?
  ORDER BY r.sequence
  LIMIT 10
`);
const markSent = db.prepare(`
  UPDATE outbox SET state = 'sent', sent_at = ?, last_error = NULL WHERE event_id = ?
`);
const markRetry = db.prepare(`
  UPDATE outbox
  SET attempt_count = attempt_count + 1, next_attempt_at = ?, last_error = ?
  WHERE event_id = ?
`);

function normalizeIp(address = "") {
  return address.startsWith("::ffff:") ? address.slice(7) : address;
}

function isLocalhost(address) {
  return address === "127.0.0.1" || address === "::1";
}

function safeHeaders(headers) {
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [
      key,
      ["authorization", "cookie", "proxy-authorization"].includes(key.toLowerCase())
        ? "[REDACTED]"
        : value,
    ]),
  );
}

async function readBody(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > maxBodyBytes) throw new Error("PAYLOAD_TOO_LARGE");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

function saveRawEvent(request, url, sourceIp, body) {
  const receivedAt = new Date().toISOString();
  const eventId = randomUUID();
  const kind = url.pathname.toLowerCase().includes("heartbeat") ? "heartbeat" : "terminal_callback";
  const checksum = createHash("sha256").update(body).digest("hex");

  db.exec("BEGIN IMMEDIATE");
  try {
    insertEvent.run(
      eventId,
      receivedAt,
      sourceIp,
      request.method || "UNKNOWN",
      url.pathname,
      url.search.slice(1),
      kind,
      request.headers["content-type"] || "",
      JSON.stringify(safeHeaders(request.headers)),
      body,
      checksum,
    );
    if (kind === "heartbeat") {
      upsertState.run("last_heartbeat_at", receivedAt, receivedAt);
    } else {
      insertOutbox.run(eventId, receivedAt);
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }

  return { eventId, receivedAt, kind };
}

function sendJson(response, status, body) {
  response.writeHead(status, {
    "cache-control": "no-store",
    "content-type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(body));
}

const server = createServer(async (request, response) => {
  const sourceIp = normalizeIp(request.socket.remoteAddress);
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

  if (request.method === "GET" && url.pathname === "/health") {
    if (!isLocalhost(sourceIp) && !allowedIps.has(sourceIp)) {
      return sendJson(response, 403, { ok: false, error: "SOURCE_IP_NOT_ALLOWED" });
    }
    const counts = statusCounts.get();
    return sendJson(response, 200, {
      ok: true,
      mode: gatewayUrl ? "forwarding" : "shadow-local-only",
      deviceId,
      allowedTerminalIps: [...allowedIps],
      received: Number(counts.received),
      pending: Number(counts.pending),
      sent: Number(counts.sent),
      lastEventAt: counts.last_event_at,
      lastHeartbeatAt: counts.last_heartbeat_at,
      gatewayEnabled: Boolean(gatewayUrl),
    });
  }

  if (!isLocalhost(sourceIp) && !allowedIps.has(sourceIp)) {
    return sendJson(response, 403, { ok: false, error: "SOURCE_IP_NOT_ALLOWED" });
  }

  try {
    const body = await readBody(request);
    const saved = saveRawEvent(request, url, sourceIp, body);
    console.log(`${saved.receivedAt} ${sourceIp} ${request.method} ${url.pathname} ${saved.kind} ${saved.eventId}`);
    response.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
    response.end("OK");
  } catch (error) {
    const tooLarge = error instanceof Error && error.message === "PAYLOAD_TOO_LARGE";
    console.error(new Date().toISOString(), "Không thể lưu callback:", error);
    sendJson(response, tooLarge ? 413 : 503, {
      ok: false,
      error: tooLarge ? "PAYLOAD_TOO_LARGE" : "LOCAL_PERSISTENCE_FAILED",
    });
  }
});

let flushing = false;
async function flushOutbox() {
  if (!gatewayUrl || flushing) return;
  flushing = true;
  try {
    for (const event of pendingEvents.all(new Date().toISOString())) {
      try {
        const response = await fetch(gatewayUrl, {
          method: "POST",
          headers: {
            accept: "application/json",
            authorization: `Bearer ${gatewayToken}`,
            "content-type": "application/json",
            "idempotency-key": event.event_id,
          },
          body: JSON.stringify({
            schema: "bm.terminal.raw.v1",
            eventId: event.event_id,
            deviceId,
            receivedAt: event.received_at,
            sourceIp: event.source_ip,
            method: event.method,
            path: event.path,
            queryString: event.query_string,
            contentType: event.content_type,
            headers: JSON.parse(event.headers_json),
            bodyBase64: Buffer.from(event.body).toString("base64"),
            bodySha256: event.body_sha256,
          }),
          signal: AbortSignal.timeout(10_000),
        });
        if (!response.ok && response.status !== 409) {
          throw new Error(`HTTP ${response.status}`);
        }
        markSent.run(new Date().toISOString(), event.event_id);
      } catch (error) {
        const attempts = Number(event.attempt_count) + 1;
        const delayMs = Math.min(300_000, 2 ** Math.min(attempts, 8) * 1_000);
        const nextAttemptAt = new Date(Date.now() + delayMs).toISOString();
        const message = error instanceof Error ? error.message.slice(0, 500) : "UNKNOWN_ERROR";
        markRetry.run(nextAttemptAt, message, event.event_id);
      }
    }
  } finally {
    flushing = false;
  }
}

const flushTimer = setInterval(flushOutbox, 5_000);
flushTimer.unref();

server.listen(port, host, () => {
  console.log(`BM Device Bridge Shadow v0.1.0 đang nghe tại http://${host}:${port}`);
  console.log(`Terminal được phép: ${[...allowedIps].join(", ")}`);
  console.log(`Chế độ Gateway: ${gatewayUrl ? "BẬT" : "TẮT (chỉ lưu cục bộ)"}`);
});

function shutdown() {
  clearInterval(flushTimer);
  server.close(() => {
    db.close();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
