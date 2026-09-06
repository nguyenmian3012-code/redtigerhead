import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const source = "/workspace/sites/redtigerhead-preview/public/assets.js";
const output =
  "/workspace/sites/bm-nv-portal/public/sites/binhminh-dahahi-vn-81f51c00/dsKhach-0a4701c1/binh-minh-logo.webp";

const text = await readFile(source, "utf8");
const match = text.match(/logo:'data:image\/webp;base64,([^']+)'/);

if (!match) throw new Error("Official Bình Minh logo was not found.");

await mkdir(dirname(output), { recursive: true });
await writeFile(output, Buffer.from(match[1], "base64"));
console.log(output);
