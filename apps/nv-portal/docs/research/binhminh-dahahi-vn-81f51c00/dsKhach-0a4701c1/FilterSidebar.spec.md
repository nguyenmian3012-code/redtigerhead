# Component specification: FilterSidebar

## Overview

- Target: `src/components/sites/binhminh-dahahi-vn-81f51c00/dsKhach-0a4701c1/FilterSidebar.tsx`
- Reference: `docs/design-references/binhminh-dahahi-vn-81f51c00/dsKhach-0a4701c1/sidebar.jpg`
- Controlled client component.

## Props

- `query: string`
- `onQueryChange(value: string): void`
- `faceFilter: FaceFilter`
- `onFaceFilterChange(value: FaceFilter): void`

## DOM and styling

- White surface with source shadow `0 1px 15px 1px rgba(62,57,107,.07)`.
- Blue section titles `#2e94da`, white 16 px medium text, 38 px height, 7 px 15 px padding.
- Search input placeholder `Nhập nội dung tìm kiếm`, 37 px high, square border, 16 px.
- Radio section title `Đăng ký Face` and labels `Tất cả`, `Đã đăng ký`, `Chưa đăng ký`.
- Use native input controls with visible keyboard focus.

## Responsive

- Desktop: fill the left 16.6667% column with 15 px outer gutters.
- Below 768 px: full width above the workspace; compact vertical spacing.

