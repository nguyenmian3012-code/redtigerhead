import assert from 'node:assert/strict';
import test from 'node:test';
import { assertFreshSource, numericCell, parseEffectiveDate } from '../scripts/sync-prices.mjs';

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
