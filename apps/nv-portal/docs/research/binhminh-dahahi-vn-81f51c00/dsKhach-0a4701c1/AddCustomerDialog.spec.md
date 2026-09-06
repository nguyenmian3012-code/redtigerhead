# Component specification: AddCustomerDialog

## Overview

- Target: `src/components/sites/binhminh-dahahi-vn-81f51c00/dsKhach-0a4701c1/AddCustomerDialog.tsx`
- Reference: `docs/design-references/binhminh-dahahi-vn-81f51c00/dsKhach-0a4701c1/add-customer-modal.jpg`
- Client component. Synthetic in-memory form only.

## Props

- `open: boolean`
- `nextCode: string`
- `onClose(): void`
- `onSubmit(draft: CustomerDraft): void`

## Layout and copy

- Fixed dark translucent overlay; centered white panel, desktop width 876 px, max-width 80vw, max-height 90vh, square corners and Angular-Material-like shadow.
- Blue `#2e94da` title bar: `Thêm khách hàng`.
- Two-column form on desktop. Left: Mã khách hàng, Tên khách hàng, Giới tính Nam/Nữ, Địa chỉ, Số điện thoại, Email, Hẹn gặp ai, Có lịch hẹn?, Đăng ký TimeFace. Right: Ảnh đại diện / Tải ảnh đại diện, Cơ quan/đơn vị, CMND/HC, Phòng ban.
- Identity value and avatar start blank. Do not collect face images; file picker is a disabled/demo visual affordance and must say `Chưa hỗ trợ trong bản thử`.
- Footer buttons: `Tạo mới` green and `Đóng` red.

## Behavior and accessibility

- Form requires `Tên khách hàng`; render an inline Vietnamese error.
- Escape and overlay click close; clicks inside panel do not.
- Autofocus name when opened where practical.
- Successful submit calls parent with normalized values and clears form.

## Responsive

- Below 768 px: one column, max-width calc(100vw - 24px), title smaller, content padding 12 px.

