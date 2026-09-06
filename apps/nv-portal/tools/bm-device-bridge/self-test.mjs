import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";

const testDirectory = mkdtempSync(join(tmpdir(), "bm-device-bridge-"));
const databasePath = join(testDirectory, "bridge.sqlite");
const port = 18789;
let childOutput = "";
const child = spawn(process.execPath, [fileURLToPath(new URL("bridge.mjs", import.meta.url))], {
  env: {
    ...process.env,
    BM_BRIDGE_HOST: "127.0.0.1",
    BM_BRIDGE_PORT: String(port),
    BM_DB_PATH: databasePath,
    BM_TERMINAL_IP: "192.168.1.227",
  },
  stdio: ["ignore", "pipe", "pipe"],
});
child.stdout.on("data", (chunk) => { childOutput += chunk; });
child.stderr.on("data", (chunk) => { childOutput += chunk; });

async function waitUntilReady() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/health`);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Bridge không khởi động trong thời gian chờ\n${childOutput}`);
}

try {
  await waitUntilReady();
  const heartbeat = await fetch(`http://127.0.0.1:${port}/Subscribe/heartbeat`, {
    method: "POST",
    body: JSON.stringify({ deviceId: "1605063", status: "online" }),
    headers: { "content-type": "application/json" },
  });
  assert.equal(heartbeat.status, 200);
  assert.equal(await heartbeat.text(), "OK");

  const attendance = await fetch(`http://127.0.0.1:${port}/Subscribe/verify`, {
    method: "POST",
    body: JSON.stringify({ deviceId: "1605063", personId: "TEST-001" }),
    headers: { "content-type": "application/json" },
  });
  assert.equal(attendance.status, 200);

  const health = await fetch(`http://127.0.0.1:${port}/health`).then((response) => response.json());
  assert.equal(health.mode, "shadow-local-only");
  assert.equal(health.received, 2);
  assert.equal(health.pending, 1);
  assert.equal(health.sent, 0);
  assert.ok(health.lastHeartbeatAt);

  const db = new DatabaseSync(databasePath, { readOnly: true });
  const stored = db.prepare("SELECT COUNT(*) AS count FROM raw_events").get();
  assert.equal(Number(stored.count), 2);
  db.close();
  console.log("PASS: heartbeat và callback được lưu trước khi phản hồi; Gateway đang tắt.");
} finally {
  if (child.exitCode === null) {
    const exited = new Promise((resolve) => child.once("exit", resolve));
    child.kill("SIGTERM");
    await exited;
  }
  rmSync(testDirectory, { recursive: true, force: true });
}
