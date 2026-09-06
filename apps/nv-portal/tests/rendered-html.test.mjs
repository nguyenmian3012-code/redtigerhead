import assert from "node:assert/strict";
import test from "node:test";

const siteTitle = /<title>BM Bridge \| Bình Minh<\/title>/i;

test("renders the BM Bridge title", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, siteTitle);
  assert.match(html, /1605063/);
});

test("keeps Bridge checks read-only until an endpoint is configured", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("bridge-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/api/bridge/health"),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    online: false,
    code: "BRIDGE_NOT_CONFIGURED",
    message: "Chưa cấu hình endpoint sức khỏe của BM Device Bridge/Gateway",
  });
});
