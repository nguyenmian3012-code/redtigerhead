# Page topology — `/dsKhach`

## Source and destination

- Source: `https://binhminh.dahahi.vn/dsKhach`
- Destination route: `/`
- Final hostname: `nv.redtigerhead.com`
- Reference viewport: `1363 × 936`

## Structure

1. `TopNavigation`
   - 46 px blue application bar.
   - Desktop navigation and hover menus.
   - Mobile menu below 992 px.
   - Company identity and the official Bình Minh mark.
2. `PortalBody`
   - `FilterSidebar`, 16.6667% desktop width.
   - `CustomerTable`, remaining desktop width.
3. `AddCustomerDialog`
   - Controlled overlay opened by “Thêm khách hàng”.
   - Adds a synthetic, in-memory row only.
4. `ImportCustomerDialog`
   - Controlled overlay opened by “Nhập từ file”.
   - Demonstrates file selection only; no upload or persistence.

## Data boundary

This clone contains no customer data from the source. It does not call DAHAHI APIs, databases, Face1, or local network addresses. The future terminal seam is an outbound HTTPS bridge running on MinhComp.

## Responsive topology

- `>= 992 px`: one-line navigation; sidebar and workspace side by side.
- `768–991 px`: compact mobile navigation; sidebar remains left when practical.
- `< 768 px`: navigation menu, filters, toolbar and form columns stack vertically.

