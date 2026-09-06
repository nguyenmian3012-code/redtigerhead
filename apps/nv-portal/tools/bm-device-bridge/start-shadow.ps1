$ErrorActionPreference = "Stop"
$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    throw "Khong tim thay Node.js. Can Node.js 24 tro len."
}

New-Item -ItemType Directory -Force -Path (Join-Path $scriptRoot "data") | Out-Null

$env:BM_BRIDGE_HOST = "0.0.0.0"
$env:BM_BRIDGE_PORT = "8789"
$env:BM_TERMINAL_IP = "192.168.1.227"
$env:BM_DEVICE_ID = "1605063"
$env:BM_DB_PATH = Join-Path $scriptRoot "data\bm-device-bridge.sqlite"

# Shadow an toan: khong dat BM_GATEWAY_URL/TOKEN, nen du lieu chi luu tai may.
Remove-Item Env:BM_GATEWAY_URL -ErrorAction SilentlyContinue
Remove-Item Env:BM_GATEWAY_TOKEN -ErrorAction SilentlyContinue

Write-Host "BM Device Bridge Shadow dang khoi dong tai cong 8789..." -ForegroundColor Cyan
Write-Host "Nhan Ctrl+C de dung. Khong dong cua so trong khi test Terminal." -ForegroundColor Yellow
& node (Join-Path $scriptRoot "bridge.mjs")
