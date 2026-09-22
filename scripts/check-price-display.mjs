import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const prices = JSON.parse(await readFile(new URL('../src/data/prices.json', import.meta.url)));
assert.ok(Array.isArray(prices.starch) && prices.starch.length > 0, 'Starch price history is empty');
const latest = prices.starch.at(-1);
const { usd_vnd: usdVnd, cny_vnd: cnyVnd } = prices._meta.exchange_rates;

assert.match(latest.date, /^\d{4}-\d{2}-\d{2}$/, 'Latest price date is invalid');
assert.equal(latest.date, prices._meta.starch.last_source_date, 'Latest price and source dates differ');
assert.ok(Number.isFinite(latest.value) && latest.value > 0, 'Latest price must be positive');
assert.equal(latest.unit, 'VND/kg');
assert.ok(Number.isFinite(usdVnd) && usdVnd > 0, 'USD exchange rate is invalid');
assert.ok(Number.isFinite(cnyVnd) && cnyVnd > 0, 'CNY exchange rate is invalid');
assert.ok(Math.round(latest.value * 1000 / usdVnd) > 0, 'USD/t conversion is invalid');
assert.ok(Math.round(latest.value * 1000 / cnyVnd) > 0, 'RMB/t conversion is invalid');

console.log('Price display check passed.');
