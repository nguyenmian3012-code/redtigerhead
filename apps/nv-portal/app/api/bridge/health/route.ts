const responseHeaders = {
  "cache-control": "no-store",
  "content-type": "application/json; charset=utf-8",
};

function json(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), { status, headers: responseHeaders });
}

export async function GET() {
  const target = process.env.BM_ATTENDANCE_HEALTH_URL;

  if (!target) {
    return json(
      {
        online: false,
        code: "BRIDGE_NOT_CONFIGURED",
        message: "Chưa cấu hình endpoint sức khỏe của BM Device Bridge/Gateway",
      },
      503,
    );
  }

  let url: URL;
  try {
    url = new URL(target);
  } catch {
    return json({ online: false, code: "INVALID_HEALTH_URL", message: "Endpoint kiểm tra không hợp lệ" }, 500);
  }

  if (url.protocol !== "https:") {
    return json({ online: false, code: "HTTPS_REQUIRED", message: "Endpoint kiểm tra bắt buộc dùng HTTPS" }, 500);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5_000);
  try {
    const response = await fetch(url, {
      headers: { accept: "application/json" },
      signal: controller.signal,
    });
    return json(
      {
        online: response.ok,
        code: response.ok ? "ONLINE" : "UPSTREAM_ERROR",
        message: response.ok ? "Gateway đã phản hồi; sẵn sàng kiểm tra heartbeat của Bridge" : `Gateway phản hồi HTTP ${response.status}`,
        checkedAt: new Date().toISOString(),
      },
      response.ok ? 200 : 502,
    );
  } catch {
    return json({ online: false, code: "UNREACHABLE", message: "Không thể kết nối endpoint kiểm tra trong 5 giây" }, 502);
  } finally {
    clearTimeout(timeout);
  }
}
