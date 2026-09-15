import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const component = await readFile(new URL("../src/components/ProductSpecifications.astro", import.meta.url), "utf8");
const data = await readFile(new URL("../src/data/products.ts", import.meta.url), "utf8");

assert.equal((data.match(/^    id: /gm) ?? []).length, 4, "expected four product definitions");
assert.match(component, /role="tablist"/);
assert.match(component, /role="tabpanel"/);
assert.match(component, /setInterval\(\(\) => show\(active \+ 1\), 5000\)/);
assert.match(component, /pause\(\);\s*show\(index\)/);
assert.match(data, /Gluten Free/i);
assert.match(data, /Hàm lượng tinh bột/);
assert.match(data, /Độ keo \/ độ nhớt/);
assert.match(data, /Độ tro/);

console.log("Product slider checks passed.");
