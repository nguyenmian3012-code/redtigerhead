import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const css = await readFile(new URL("../src/styles/v03-fix.css", import.meta.url), "utf8");

assert.match(css, /--display:\s*"Segoe UI Variable Display"/);
assert.match(css, /\.product-spec-head h2[\s\S]*?font-family:\s*var\(--display\)/);
assert.match(css, /\.product-tab\s*\{[\s\S]*?font-size:\s*clamp\(12px/);
assert.match(css, /@media \(max-width:\s*600px\)[\s\S]*?body\s*\{\s*font-size:\s*15px/);
assert.match(css, /html\[lang="zh-CN"\][\s\S]*?letter-spacing:\s*0/);

console.log("Typography safeguards passed.");
