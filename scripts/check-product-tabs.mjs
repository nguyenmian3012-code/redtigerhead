import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const component = await readFile(new URL("../src/components/ProductSpecifications.astro", import.meta.url), "utf8");
const data = await readFile(new URL("../src/data/products.ts", import.meta.url), "utf8");
const script = await readFile(new URL("../public/scripts/site.js", import.meta.url), "utf8");

assert.equal((data.match(/^    id: /gm) ?? []).length, 4, "expected four product definitions");
assert.match(component, /role="tablist"/);
assert.match(component, /role="tabpanel"/);
assert.match(script, /setInterval\(\(\) => show\(active \+ 1\), 5000\)/);
assert.match(script, /pause\(\);\s*show\(index\)/);
assert.match(data, /Gluten Free/i);
assert.match(data, /Hàm lượng tinh bột/);
assert.match(data, /Độ keo \/ độ nhớt/);
assert.match(data, /Độ tro/);
assert.doesNotMatch(component + data, /Dữ liệu tham khảo|Thông số tham khảo|Reference data|Reference specifications|参考数据|参考参数/i);
assert.equal((data.match(/^    image: /gm) ?? []).length, 4, "expected one image per product");
const images = [...data.matchAll(/image: "([^"]+)"/g)].map((match) => match[1]);
await Promise.all(images.map((path) => access(new URL(`../public${path}`, import.meta.url))));

console.log("Product slider checks passed.");
