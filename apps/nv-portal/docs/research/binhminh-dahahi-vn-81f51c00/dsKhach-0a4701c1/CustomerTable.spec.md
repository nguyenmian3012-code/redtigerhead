# Component specification: CustomerTable

## Overview

- Target: `src/components/sites/binhminh-dahahi-vn-81f51c00/dsKhach-0a4701c1/CustomerTable.tsx`
- Reference: `docs/design-references/binhminh-dahahi-vn-81f51c00/dsKhach-0a4701c1/content-table.jpg`
- Controlled client component; do not fetch data.

## Props

- `customers: Customer[]`
- `onOpenImport(): void`
- `onOpenAdd(): void`
- `onExport(): void`

## DOM and styling

- Heading `Danh sách khách`, Arial 28 px, `#2c304d`.
- Toolbar: green square buttons (`#4bac4d`, hover `#44a446`), white 16 px text, 38 px height, 6 px 20 px padding.
- Button order: `Nhập từ file`, `Thêm khách hàng`, `Xuất file`.
- White content surface with `0 1px 15px rgba(62,57,107,.07)` shadow and 20 px top margin.
- Scroll container, sticky table header. Header labels: select all, `Hành động`, `Tên khách hàng`, `Điện thoại`, `Đơn vị`, `Hẹn gặp`, `Thời gian`.
- Header: 16 px bold `#52677a`, 12 px padding. Rows: 14 px, 10 px vertical padding.
- Empty message exactly `Không tìm thấy bản ghi nào`.
- For rows, provide compact `Sửa` and `Xóa` demo controls; deletion may be intentionally absent unless provided by parent.

## State

- Checkbox selection is local to this component.
- Buttons call parent callbacks.
- No side effects beyond callback and checkbox state.

## Responsive

- Toolbar wraps below 768 px.
- Table keeps a minimum width and scrolls horizontally on small screens.

