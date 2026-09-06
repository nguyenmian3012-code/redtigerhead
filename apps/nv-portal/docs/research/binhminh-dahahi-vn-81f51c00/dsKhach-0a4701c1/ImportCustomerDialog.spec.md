# Component specification: ImportCustomerDialog

## Overview

- Target: `src/components/sites/binhminh-dahahi-vn-81f51c00/dsKhach-0a4701c1/ImportCustomerDialog.tsx`
- Reference: `docs/design-references/binhminh-dahahi-vn-81f51c00/dsKhach-0a4701c1/import-customer-modal.jpg`
- Client component; local demo only, no upload or persistence.

## Props

- `open: boolean`
- `onClose(): void`

## Layout and copy

- Same overlay/panel/title treatment as AddCustomerDialog.
- Title `Nhập dữ liệu khách hàng`.
- Step 1: `Tải file mẫu và nhập thông tin`, button `Tải file mẫu dữ liệu khách hàng`.
- Step 2: `Tải dữ liệu đã nhập lên hệ thống`, local file picker button `Tải lên file dữ liệu`.
- Tabs: `DỮ LIỆU KHÁCH HÀNG (0)` and `DỮ LIỆU TẢI LÊN LỖI (0)`.
- Table headers: STT, Mã, Họ tên, SĐT, Giới tính, CCCD/CMND, Chức vụ, Cơ quan, Địa chỉ, Hình ảnh. Empty text `Không có dữ liệu`.
- Footer: green `Lưu lại`, red `Đóng`.

## Behavior and safety

- Template button creates a tiny CSV sample locally or shows a clear demo message.
- File picker accepts `.csv,.xlsx,.xls`; display filename only and do not read/upload bytes.
- `Lưu lại` displays `Bản thử không tải dữ liệu lên máy chủ` and keeps data count at zero.
- Escape and overlay click close.

## Responsive

- Below 768 px: steps stack and the table scrolls horizontally.

