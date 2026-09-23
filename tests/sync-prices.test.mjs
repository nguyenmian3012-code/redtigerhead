import assert from 'node:assert/strict';
import test from 'node:test';
import { assertFreshSource, deriveExchangeRates, numericCell, parseEffectiveDate, readExchangeRates } from '../scripts/sync-prices.mjs';

test('parses the date formats used by the production sheet', () => {
  assert.equal(parseEffectiveDate('12/09/2026'), '2026-09-12');
  assert.equal(parseEffectiveDate('Ngày 15+16/09/2026'), '2026-09-16');
  assert.equal(parseEffectiveDate(''), null);
});

test('normalizes numeric price cells', () => {
  assert.equal(numericCell(14446), 14446);
  assert.equal(numericCell('14,446'), 14446);
  assert.equal(numericCell('not a price'), null);
});

test('rejects stale or future source dates', () => {
  assert.equal(assertFreshSource('2026-09-21', '2026-09-22', 5), 1);
  assert.throws(() => assertFreshSource('2026-09-16', '2026-09-22', 5), /6 day/);
  assert.throws(() => assertFreshSource('2026-09-23', '2026-09-22', 5), /-1 day/);
});

test('derives VND reference rates from a USD-base public feed', () => {
  const rates = deriveExchangeRates({ VND: 26000, CNY: 7.2 }, 1790121600);
  assert.equal(rates.usd_vnd, 26000);
  assert.equal(rates.cny_vnd, 3611.11);
  assert.equal(rates.as_of, '2026-09-23');
});

test('rejects incomplete exchange-rate responses', () => {
  assert.throws(() => deriveExchangeRates({ VND: 26000 }, 1790121600), /VND and CNY/);
});

test('reads the public feed once and derives the site rates', async () => {
  let calls = 0;
  const rates = await readExchangeRates(null, async () => {
    calls += 1;
    return {
      ok: true,
      json: async () => ({ result: 'success', rates: { VND: 26000, CNY: 7.2 }, time_last_update_unix: 1790121600 })
    };
  });
  assert.equal(calls, 1);
  assert.equal(rates.cny_vnd, 3611.11);
});

test('retains the last known rates when the public feed is unavailable', async () => {
  const fallback = { source: 'previous', as_of: '2026-09-22', usd_vnd: 25900, cny_vnd: 3600 };
  const rates = await readExchangeRates(fallback, async () => { throw new Error('offline'); });
  assert.deepEqual(rates, fallback);
});
