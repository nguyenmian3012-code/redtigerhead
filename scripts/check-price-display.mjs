import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const prices = JSON.parse(await readFile(new URL('../src/data/prices.json', import.meta.url)));
const latest = prices.starch.at(-1);
const { usd_vnd: usdVnd, cny_vnd: cnyVnd } = prices._meta.exchange_rates;

assert.ok(Math.abs(latest.value - 15400) <= 200, 'Reference price differs by more than 200 VND/kg');
assert.equal(Math.round(latest.value * 1000 / usdVnd), 603);
assert.equal(Math.round(latest.value * 1000 / cnyVnd), 4049);

console.log('Price display check passed.');
