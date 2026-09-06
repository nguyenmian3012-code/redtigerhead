# BM Device Bridge Shadow v0.1.0

Gói thử nghiệm không thay firmware và không tắt MQTT Dahahi. Terminal gửi thêm callback HTTP qua LAN; Bridge ghi dữ liệu nguyên bản xuống SQLite trước khi trả `200 OK`.

## Cấu hình đã khóa

- Terminal: `1605063` — `192.168.1.227`
- Máy Bridge: `MINHCOMP` — `192.168.1.99`
- Cổng nhận: `8789/TCP`
- Cơ sở dữ liệu: `data/bm-device-bridge.sqlite`
- Gửi Gateway: **tắt mặc định**

## Bước 1 — chạy thử tại MINHCOMP

1. Giải nén vào `C:\ABMT\BM-Device-Bridge`.
2. Mở PowerShell **Run as administrator** tại thư mục vừa giải nén.
3. Chạy firewall một lần:

   ```powershell
   powershell.exe -ExecutionPolicy Bypass -File .\configure-firewall.ps1
   ```

4. Mở PowerShell thường và chạy:

   ```powershell
   powershell.exe -ExecutionPolicy Bypass -File .\start-shadow.ps1
   ```

5. Giữ cửa sổ đó mở. Mở cửa sổ PowerShell thứ hai và chạy:

   ```powershell
   powershell.exe -ExecutionPolicy Bypass -File .\test-local.ps1
   ```

Kết quả đúng phải có `PASS`, `mode: shadow-local-only`, `gatewayEnabled: False`.

## Bước 2 — chỉ cấu hình Terminal sau khi bước 1 PASS

Trong **Thuê bao HTTP**:

| Trường | Giá trị shadow |
| --- | --- |
| Loại giao thức | `LAN` |
| Địa chỉ dịch vụ | `192.168.1.99` |
| Cổng dịch vụ | `8789` |
| Đăng ký xác thực | Bật đăng ký |
| Chụp lại người lạ / QR / Báo động / RF Card | Giữ `Không có đăng ký` |
| URL Nhịp Tim | `/Subscribe/heartbeat` |
| Chu kỳ xung nhịp | `30` giây |

Giữ nguyên:

- MQTT tới `brokers.dahahi.vn` trong giai đoạn đối chứng.
- **Kết nối trung tâm** ở trạng thái chưa kích hoạt.
- Firmware hiện tại; không cập nhật, reset hoặc khôi phục thiết bị.

Sau khi lưu, mở `http://127.0.0.1:8789/health` trên MINHCOMP và kiểm tra `lastHeartbeatAt` thay đổi mỗi khoảng 30 giây.

## Điều kiện trước khi tắt Dahahi

- Chạy shadow 3–7 ngày hoặc ít nhất 100 lượt thử.
- Sự kiện BM khớp đối chứng, không mất và không gửi lặp do retry.
- Thử ngắt Internet rồi nối lại; dữ liệu cục bộ vẫn còn.
- Heartbeat ổn định.
- Có bản sao thư mục `data` trước khi chuyển giai đoạn.

Không đặt `BM_GATEWAY_URL` hoặc `BM_GATEWAY_TOKEN` trong vòng shadow đầu tiên. Chỉ bật gửi HTTPS sau khi Gateway chính thức có endpoint và thông tin xác thực riêng cho thiết bị.
