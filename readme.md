# Red Tiger Head — Bình Minh company website

Website độc lập của Bình Minh tại `redtigerhead.com`. Dự án này **không thuộc và không phụ thuộc ABMT core**.

## Mục tiêu

- Website giới thiệu doanh nghiệp sản xuất: nhanh, rõ ràng, đáng tin cậy.
- Static-first để giảm độ phức tạp, chi phí vận hành và bề mặt tấn công.
- Chạy ổn định trên Cloudflare Pages, có preview trước khi phát hành.
- Ưu tiên accessibility, SEO kỹ thuật, responsive design và progressive enhancement.
- Chỉ thêm JavaScript phía trình duyệt khi có nhu cầu thực tế.

Định hướng chi tiết nằm trong [`docs/PROJECT_DIRECTION.md`](docs/PROJECT_DIRECTION.md).

## Công nghệ

- Astro, TypeScript strict
- CSS thuần với design tokens
- Cloudflare Pages
- GitHub Actions kiểm tra push và pull request

## Chạy local

Yêu cầu Node.js 22 trở lên.

```sh
npm ci
npm run dev
```

Kiểm tra trước khi commit:

```sh
npm run check
```

## Quy trình Git

- `main`: production, chỉ nhận phiên bản đã qua `npm run check`.
- Mỗi công việc dùng nhánh ngắn hạn: `openclaw/...`, `chatgpt/...`, `feature/...`, `fix/...`.
- Không để hai agent sửa cùng một nhánh đồng thời.
- Pull/fetch trước khi bắt đầu; commit nhỏ, mô tả rõ.
- Không commit `.env`, token, khóa API, dữ liệu khách hàng hoặc tài liệu nội bộ.

GitHub Desktop có thể mở repository local tại:

`C:\Users\Mian Nguyen\.openclaw\workspace\projects\redtigerhead`

## Triển khai dự kiến

Cloudflare Pages kết nối repository GitHub:

- Production branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 22

Tên miền và Pages chưa được nối cho tới khi Cloudflare API token có đủ quyền hoặc Minh An xác nhận kết nối GitHub trong Dashboard.
