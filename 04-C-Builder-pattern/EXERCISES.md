# Bài tập Thực hành: Builder Pattern

Dưới đây là 3 bài tập thực hành từ cơ bản đến nâng cao giúp bạn thành thạo **Builder Pattern** trong TypeScript. Hãy tạo và chỉnh sửa file `exercises.ts` để thực hành lắp ráp code.

---

## 📝 Bài tập 1: Bộ Cấu hình Lắp ráp Máy tính (Computer Configurator)

### 1. Bối cảnh

Cửa hàng vi tính cần một phần mềm cho phép khách hàng tự build cấu hình PC của họ trực quan. Mỗi chiếc máy tính (`Computer`) gồm các bộ phận: CPU, RAM, ổ cứng (Storage), Card đồ họa (GPU), Bộ nguồn (PSU) và hệ thống tản nhiệt (CoolingSystem).

### 2. Yêu cầu

- Định nghĩa lớp `Computer` đại diện cho sản phẩm hoàn chỉnh:
  - Có các thuộc tính: `cpu`, `ram`, `storage`, `gpu?`, `psu`, `coolingSystem?`.
  - Có phương thức `toString(): string` để trả về mô tả cấu hình chi tiết của máy.
- Định nghĩa lớp `ComputerBuilder` để xây dựng từng bước một:
  - Có các phương thức tiện ích nối chuỗi (Fluent API) như: `setCpu(cpu)`, `setRam(ram)`, `setStorage(storage)`, `setGpu(gpu)`, `setPsu(psu)`, `setCoolingSystem(coolingSystem)`.
  - Phương thức `build(): Computer` để trả về một chiếc `Computer` hoàn thiện.
  - _Ràng buộc:_ Yêu cầu bắt buộc khi `.build()` phải có đủ CPU, RAM và PSU. Nếu thiếu, ném ra lỗi (throw Error).
- Viết client code cấu hình 2 dòng PC: một dòng văn phòng tiết kiệm và một dòng gaming cao cấp có đầy đủ tản nhiệt nước và GPU rời.

---

## 📝 Bài tập 2: Bộ dựng gói tin HTTP Request (Immutable HTTP Request Builder)

### 1. Bối cảnh

Khi xây dựng các API client hay các dịch vụ giao tiếp HTTP ở backend, chúng ta cần sinh các request một cách linh hoạt. Một `HttpRequest` thông thường gồm có: URL, HTTP Method (GET, POST, PUT, DELETE...), Headers, Query Parameters, và Body. Vì các gói tin gửi đi không được phép thay đổi cấu trúc giữa chừng, đối tượng `HttpRequest` sau khi build cần được thiết lập ở dạng bất biến (Immutable).

### 2. Yêu cầu

- Định nghĩa lớp `HttpRequest` chứa các thuộc tính:
  - `url: string`
  - `method: string`
  - `headers: Record<string, string>`
  - `queryParams: Record<string, string>`
  - `body: string | null`
  - _Bất biến (Immutable):_ Mọi thuộc tính của `HttpRequest` nên được khai báo ở dạng `readonly`.
  - Có phương thức `send(): void` mô phỏng việc gửi gói tin (log thông tin method, url, headers, params và body ra console).
- Định nghĩa lớp `HttpRequestBuilder`:
  - Có các phương thức: `setUrl()`, `setMethod()`, `addHeader(key, value)`, `addQueryParam(key, value)`, `setBody(body)`.
  - Phương thức `.build(): HttpRequest`.
  - _Ràng buộc:_
    1. Method mặc định là `GET` nếu không chỉ định.
    2. URL phải bắt đầu bằng `http://` hoặc `https://`. Nếu không hợp lệ, quăng lỗi.
    3. Nếu method là `GET` hoặc `DELETE`, không cho phép đính kèm Body (quăng lỗi).

---

## 📝 Bài tập 3: Trình tạo tài liệu Markdown tự động kết hợp Director (Markdown Builder)

### 1. Bối cảnh

Hệ thống CI/CD cần tự động phát sinh các tài liệu tài liệu dự án dưới định dạng Markdown như file `README.md` hay `RELEASE_NOTES.md`. Mỗi tài liệu gồm các phần: Tiêu đề (Header), đoạn văn (Paragraph), khối mã (CodeBlock), danh sách gạch đầu dòng (List). Ta cần dùng Builder để dựng cấu trúc tài liệu và một lớp **Director** quản lý luồng để tạo sẵn các biểu mẫu tài liệu chuẩn.

### 2. Yêu cầu

- Định nghĩa lớp `MarkdownDocument` chứa mảng các chuỗi dòng nội dung `lines: string[]`.
  - Phương thức `getContent(): string` trả về toàn bộ nội dung tài liệu ghép lại bằng ký tự xuống dòng (`\n`).
- Định nghĩa lớp `MarkdownDocumentBuilder`:
  - Có các phương thức gán nội dung:
    - `addHeader(level: number, text: string): this` (ví dụ: `level 1` là `# text`, `level 2` là `## text`).
    - `addParagraph(text: string): this`.
    - `addCodeBlock(code: string, language: string): this` (ví dụ: bọc code trong ba dấu nháy ```).
    - `addBulletPoints(items: string[]): this` (ví dụ: mỗi item bắt đầu bằng `- `).
  - Phương thức `build(): MarkdownDocument` trả về tài liệu markdown đã hoàn thành, đồng thời dọn sạch (reset) trạng thái builder để chuẩn bị cho tài liệu tiếp theo.
- Định nghĩa lớp **Director** tên là `DocumentDirector`:
  - Chứa phương thức nghiệp vụ dựng tài liệu mẫu `README.md` chuẩn:
    - `constructReadme(builder: MarkdownDocumentBuilder, projectName: string, description: string): void`
    - Luồng dựng: Header 1 (Tên dự án) -> Paragraph (Mô tả) -> Header 2 ("Cài đặt") -> CodeBlock hướng dẫn cài đặt.
  - Chứa phương thức dựng tài liệu mẫu `RELEASE_NOTES.md` chuẩn:
    - `constructReleaseNotes(builder: MarkdownDocumentBuilder, version: string, features: string[]): void`
    - Luồng dựng: Header 1 ("Bản phát hành " + version) -> Paragraph ("Danh sách tính năng mới:") -> BulletPoints (danh sách tính năng).

---

## 💡 Hướng dẫn thực hiện

1. Hãy mở file `04-C-Builder-pattern/exercises.ts`.
2. Đọc kỹ phần khai báo các lớp mẫu và điền mã nguồn của bạn vào những vị trí có comment `// TODO`.
3. Chạy thử nghiệm kết quả bằng cách thực thi lệnh: `npx tsx 04-C-Builder-pattern/exercises.ts` từ thư mục gốc của dự án.
