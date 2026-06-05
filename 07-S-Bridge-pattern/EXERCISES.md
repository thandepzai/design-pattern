# Bài tập thực hành: Bridge Pattern

Chào mừng bạn đến với phần bài tập thực hành về **Bridge Pattern**. Dưới đây là mô tả chi tiết của 3 bài tập được thiết kế sẵn trong file `exercises.ts`.

Nhiệm vụ của bạn là đọc kỹ yêu cầu, mở file **[exercises.ts](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/07-S-Bridge-pattern/exercises.ts)** và hoàn thành các phần có đánh dấu `// TODO`.

---

## 📄 Bài tập 1: Bộ Xuất Bản Tài Liệu đa định dạng (Document Exporter)

### Bối cảnh:
Bạn có nhiệm vụ xây dựng hệ thống quản lý tài liệu. Tài liệu có các loại khác nhau:
- `SimpleDocument`: Chỉ gồm Tiêu đề (Title) và Nội dung (Content).
- `DetailedDocument`: Gồm Tiêu đề (Title), Nội dung (Content) và Lời cảm ơn ở chân trang (Footer).

Bạn cần xuất các tài liệu này ra các định dạng khác nhau: **HTML** hoặc **Markdown**. Nếu sử dụng kế thừa trực tiếp, bạn sẽ phải viết các lớp: `SimpleHtmlDocument`, `DetailedHtmlDocument`, `SimpleMarkdownDocument`, `DetailedMarkdownDocument`.

Hãy dùng Bridge Pattern để tách biệt cấu trúc tài liệu (**Abstraction**) và công cụ kết xuất định dạng (**Implementation**).

### Yêu cầu:
1. Triển khai các lớp cụ thể thực thi `ExportEngine` (Implementor):
   - `HtmlEngine`:
     - `renderHeader(text: string)` trả về: `<h1>{text}</h1>`
     - `renderParagraph(text: string)` trả về: `<p>{text}</p>`
     - `renderFooter(text: string)` trả về: `<footer>{text}</footer>`
   - `MarkdownEngine`:
     - `renderHeader(text: string)` trả về: `# {text}`
     - `renderParagraph(text: string)` trả về: `{text}`
     - `renderFooter(text: string)` trả về: `* {text} *`
2. Hoàn thiện phương thức `export()` trong các lớp con của `Document` (Abstraction):
   - `SimpleDocument`: Xuất ra tiêu đề (dưới dạng Header) và nội dung (dưới dạng Paragraph), nối với nhau bằng ký tự xuống dòng `\n`.
   - `DetailedDocument`: Xuất ra tiêu đề (Header), nội dung (Paragraph) và chân trang (Footer), nối với nhau bằng ký tự xuống dòng `\n`.

---

## 🛢️ Bài tập 2: Tách biệt Logic Nghiệp vụ khỏi Hệ quản trị Cơ sở dữ liệu (Database Driver Bridge)

### Bối cảnh:
Bạn đang xây dựng một ứng dụng lưu trữ thông tin Người dùng (`User`). Lớp chứa logic nghiệp vụ truy xuất dữ liệu là `UserRepository`. 
Hệ thống cần hoạt động linh hoạt với nhiều loại cơ sở dữ liệu khác nhau tùy môi trường (ví dụ: **PostgreSQL** ở môi trường sản xuất, **In-Memory database** ở môi trường kiểm thử).

### Yêu cầu:
1. Hoàn thành việc triển khai các CSDL Driver thực thi `DatabaseDriver` (Implementor):
   - `PostgresDriver`: Trả về mảng dữ liệu mô phỏng.
   - `InMemoryDriver`: Lưu trữ dữ liệu trong một mảng cục bộ riêng để giả lập bộ nhớ RAM.
2. Hoàn thành lớp `UserRepository` (Abstraction):
   - Phương thức `getUsers()`: Gọi kết nối CSDL qua `driver.connect()`, thực thi câu lệnh SQL/Query qua `driver.execute(query)`, rồi trả về kết quả nhận được.

---

## 🎨 Bài tập 3: Bộ hiển thị Linh kiện UI theo Chủ đề giao diện (UI Widget & Theme Renderer)

### Bối cảnh:
Bạn đang xây dựng một thư viện giao diện UI Component. Thư viện này chứa các linh kiện (Widgets) khác nhau như Nút bấm (`Button`) và Hộp văn bản (`TextBox`). 
Mỗi widget cần hiển thị theo các Chủ đề giao diện (Themes) khác nhau: **LightTheme** (Màu sáng) và **DarkTheme** (Màu tối).

### Yêu cầu:
1. Định nghĩa cầu nối giữa các Widget và Theme.
2. Triển khai phương thức vẽ đồ họa `render()` cho `Button` và `TextBox`:
   - `Button`: Trả về chuỗi kết xuất dạng `[Button] {Label} | Color: {ThemeColor} | Border: {ThemeBorderRadius}px`.
   - `TextBox`: Trả về chuỗi kết xuất dạng `[TextBox] {Placeholder} | Background: {ThemeBgColor} | Border: {ThemeBorderRadius}px`.

---

## 🏁 Cách kiểm tra kết quả

Sau khi hoàn thành viết mã nguồn trong `exercises.ts`, hãy chạy lệnh sau từ thư mục gốc của dự án để chạy kiểm thử tự động:

```bash
npx tsx 07-S-Bridge-pattern/exercises.ts
```

Nếu tất cả các test hiển thị dấu tick xanh `✓`, xin chúc mừng bạn đã làm chủ được **Bridge Pattern**!
