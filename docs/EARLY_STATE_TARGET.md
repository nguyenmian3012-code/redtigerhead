# Early Keys Target

## 1. Mục tiêu cuối cùng

- Xây dựng website có giao diện bám sát ảnh tham chiếu ở mức tối đa, hướng tới **pixel-perfect tại viewport desktop chuẩn 960 × 1200 px**.
- Ưu tiên hoàn thiện phần nhìn trước: bố cục, kích thước, màu sắc, font, khoảng cách, đường viền, bo góc, icon, hình ảnh và biểu đồ.
- Nội dung và số liệu hiện tại là **draft/demo phục vụ thiết kế**; dữ liệu thật sẽ được cập nhật trước khi public.
- Responsive giữ đúng ngôn ngữ thiết kế nhưng phải được thiết kế thích ứng, không thu nhỏ máy móc từ desktop.

## 2. Công nghệ và kiến trúc

- Dùng **Astro** làm nền tảng chính và tổ chức website theo component.
- Dùng **CSS chuẩn** để tái tạo giao diện chính xác.
- Dùng **DOM APIs** cho các tương tác nhỏ như menu, bộ lọc, form và trạng thái giao diện.
- Hạn chế HTML String/`innerHTML`; không dùng để dựng các khối giao diện chính.
- Ưu tiên HTML nhẹ, JavaScript tối thiểu, SEO tốt và khả năng bảo trì lâu dài.
- Không thêm framework hoặc dependency nếu Astro, CSS và DOM APIs đã giải quyết tốt yêu cầu.

## 3. Cấu trúc hội tụ

- Header, Hero, các khối giới thiệu, năng lực sản xuất, quy trình, dashboard giá, tuyển dụng, liên hệ và Footer được tách thành component dùng chung.
- Danh sách việc làm, trang chi tiết và form tuyển dụng dùng chung một schema dữ liệu.
- Tách ba lớp rõ ràng:
  1. Giao diện
  2. Nội dung
  3. Dữ liệu vận hành
- Component chỉ nhận dữ liệu; tránh hard-code nội dung và số liệu trực tiếp trong markup.
- Dữ liệu draft và dữ liệu thật dùng cùng schema để khi public chỉ cần thay nguồn dữ liệu, không viết lại UI.
- Chỉ tích hợp CMS/API khi nhu cầu cập nhật thực tế đủ lớn.

## 4. Design system

- Màu chủ đạo: đỏ rượu vang, đỏ tươi, vàng kim và trắng sứ.
- Serif cho tiêu đề/thương hiệu; sans-serif cho nội dung và dữ liệu.
- Dùng một hệ thống thống nhất cho spacing, typography, màu, viền, bo góc, bóng và breakpoint.
- Icon phải đồng nhất về phong cách; không trộn nhiều bộ icon.
- Chuẩn hóa các trạng thái hover, focus, active, disabled, loading, empty, error và success.
- Giao diện phải chịu được nội dung đa ngôn ngữ dài hơn mà không vỡ bố cục.

## 5. Phạm vi trang và component chính

- `SiteHeader`
- `LanguageSwitcher`
- `ThemeToggle` nếu có nhu cầu thực tế
- `HeroSection`
- `ProductionCapacity`
- `FactoryMedia`
- `TrustBenefits`
- `CompanyIntroduction`
- `ProductionProcess`
- `PriceDashboard`
- `PriceChartCard`
- `RecruitmentForm`
- `SiteFooter`

Các trang dự kiến gồm Trang chủ, Giới thiệu, Bảng giá, Tuyển dụng và Liên hệ.

## 6. Dashboard và dữ liệu

- Biểu đồ phải được dựng từ dữ liệu, không dùng ảnh chụp tĩnh.
- Giữ đúng màu, tỷ lệ, nhãn và bố cục của ảnh tham chiếu.
- Hiển thị rõ đơn vị, ngày cập nhật, nguồn/phạm vi tham khảo và trạng thái draft nếu có.
- Dữ liệu demo phải được nhận biết rõ để không bị hiểu nhầm là số liệu chính thức.
- Không kết nối dữ liệu thời gian thực khi chưa có nguồn chính thức và quy tắc cập nhật đáng tin cậy.

## 7. Form tuyển dụng

- Form phải hoạt động gần như form thật: chọn vị trí, thông tin liên hệ, kinh nghiệm, tải CV, xem lại, gửi và nhận mã hồ sơ.
- Có validation phía client và server, giới hạn loại/dung lượng file, consent và thông báo quyền riêng tư.
- Khi xảy ra lỗi, không làm mất dữ liệu người dùng đã nhập.
- Không thu CCCD ở vòng ứng tuyển đầu tiên; chỉ thu khi thực sự cần ở giai đoạn nhân sự phù hợp và có quy trình bảo vệ riêng.
- Không để tên nội bộ **`Niu_hr`** xuất hiện trên giao diện công khai, URL công khai hoặc thông báo cho ứng viên.
- Chống spam theo nhiều lớp:
  - Honeypot
  - Kiểm tra thời gian hoàn thành form
  - Rate limit phía server
  - Turnstile thích ứng/vô hình
  - Chỉ thêm xác minh email khi rủi ro spam thực tế yêu cầu
- Không đưa form lên production khi chưa có nơi tiếp nhận, lưu trữ và xử lý hồ sơ rõ ràng.

## 8. Quy trình triển khai

1. Kiểm kê mã nguồn và tài sản hiện có.
2. Khóa ảnh tham chiếu, viewport, logo, font, icon và hình ảnh.
3. Xây design token và schema dữ liệu demo.
4. Dựng trang chủ desktop từ trên xuống dưới bằng Astro component.
5. Với từng khối: dựng → chụp → chồng ảnh → đo sai lệch → chỉnh sửa.
6. Khi desktop ổn định, hoàn thiện responsive cho tablet/mobile.
7. Xây các trang phụ theo cùng design system.
8. Hoàn thiện form tuyển dụng và chống spam.
9. Thay dữ liệu draft bằng dữ liệu thật.
10. Kiểm thử toàn diện và public.

## 9. Tiêu chuẩn nghiệm thu

- Visual regression tại viewport tham chiếu; không nghiệm thu chỉ bằng cảm giác.
- Kiểm tra Chrome, Edge, Firefox và Safari khi có môi trường phù hợp.
- Không có lỗi layout tại các breakpoint chính, lỗi console hoặc liên kết hỏng.
- Menu, biểu đồ, liên kết và form hoạt động đúng.
- Nội dung có thể thay tập trung mà không sửa component.
- Kiểm tra SEO, accessibility, Core Web Vitals, quyền riêng tư và bảo mật form.
- Tối ưu hình ảnh WebP/AVIF, font và tài nguyên tải xuống.
- Hỗ trợ bàn phím, focus rõ ràng, semantic HTML, label form và độ tương phản phù hợp.

## 10. Mốc bàn giao

- **Mốc A:** Trang chủ desktop khớp ảnh tham chiếu.
- **Mốc B:** Responsive và hệ thống component ổn định.
- **Mốc C:** Các trang phụ đồng nhất thiết kế.
- **Mốc D:** Form tuyển dụng và chống spam hoàn chỉnh.
- **Mốc E:** Dữ liệu thật, kiểm thử production và public.

Mỗi mốc có ảnh nghiệm thu và danh sách sai lệch/lỗi còn tồn tại.

## 11. Nguyên tắc ưu tiên

Khi có xung đột, ưu tiên theo thứ tự:

1. Bảo mật và quyền riêng tư
2. Khả năng sử dụng
3. Độ chính xác so với ảnh tham chiếu
4. Hiệu năng
5. Khả năng bảo trì
6. Hiệu ứng trang trí

Mọi thay đổi phải giúp website **giống hơn, dùng tốt hơn hoặc bền vững hơn**.

## 12. Những việc chưa làm ở giai đoạn đầu

- CMS phức tạp
- Tài khoản người dùng
- Hệ thống ATS/quản trị tuyển dụng đầy đủ
- Animation cầu kỳ
- Thu thập CCCD
- Giá thời gian thực khi chưa có nguồn chính thức
- Tính năng không có nhu cầu rõ ràng

## 13. Điều kiện trước khi public

- Logo, font, ảnh và tài sản thương hiệu bản chuẩn, có quyền sử dụng.
- Nội dung doanh nghiệp, địa chỉ và kênh liên hệ đã xác minh.
- Nguồn, đơn vị và quy tắc cập nhật dữ liệu giá đã chốt.
- Nơi nhận hồ sơ, chính sách quyền riêng tư và thời hạn lưu dữ liệu đã xác định.
- Tách rõ cấu hình draft/staging/production và không còn dữ liệu nội bộ hoặc demo ngoài ý muốn.
- Hoàn tất kiểm thử giao diện, chức năng, bảo mật, SEO, accessibility và hiệu năng.

## 14. Quyết định thống nhất

- **Astro + CSS + DOM APIs tối thiểu.**
- **Component hóa và dùng dữ liệu hội tụ.**
- **Dựng desktop khớp ảnh trước, responsive sau.**
- **Draft/demo trước; dữ liệu thật trước khi public.**
- **Form tuyển dụng thực tế, không CCCD, không `Niu_hr`, chống spam nhiều lớp.**
- **Nghiệm thu bằng visual regression.**
- Trình tự cuối: **desktop → responsive → trang phụ → form → dữ liệu thật → kiểm thử → public**.

> Sao chép chính xác phần nhìn, xây đúng phần lõi và trì hoãn nội dung thật — không trì hoãn chất lượng kiến trúc.
