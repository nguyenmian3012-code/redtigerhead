# Component specification: TopNavigation

## Overview

- Target: `src/components/sites/binhminh-dahahi-vn-81f51c00/dsKhach-0a4701c1/TopNavigation.tsx`
- Reference: `docs/design-references/binhminh-dahahi-vn-81f51c00/dsKhach-0a4701c1/header.jpg`
- Client component. No network calls, routing dependency or external assets besides the official local logo.

## DOM and styling

- Semantic `<header>` with 46 px minimum height and `#2e94da` background.
- Desktop `<nav>` links in 14 px white text; active/hover background `#2782c0`.
- Use the local logo at `/sites/binhminh-dahahi-vn-81f51c00/dsKhach-0a4701c1/binh-minh-logo.webp`, approximately 34 × 34 px.
- Company label: `Cty TNHH SX Tinh Bột Khoai Mì Bình Minh`.
- Primary labels, in order: `Khách hàng`, `Nhân viên`, `Tài khoản`, `Thiết bị`, `Lịch sử checkin`, `Nhân viên thời vụ`, `Quản lý Nhân viên`, `Chấm công`, `Quản trị hệ thống`, `Cài đặt`, `Báo cáo`.
- `Khách hàng` is active.
- Use lucide icons only where useful; do not add dependencies.

## Interaction states

- Desktop dropdowns open on hover and `focus-within` for Quản lý Nhân viên, Quản trị hệ thống, and Cài đặt.
- Use the exact dropdown items recorded in `PAGE_TOPOLOGY.md`/source inventory from the parent prompt.
- Links are demo anchors; prevent disruptive navigation.
- Mobile button toggles an accessible menu with `aria-expanded` and Escape closes it.

## Responsive

- `>= 992 px`: dense one-line navigation matching the source.
- `< 992 px`: show brand, company label and menu button; stack nav items in an absolute/full-width panel.
- Do not allow horizontal document scrolling.

