# Bài tập Thực hành: Factory Method Pattern

Dưới đây là 3 bài tập từ cơ bản đến nâng cao giúp bạn làm chủ **Factory Method Pattern** bằng TypeScript. Hãy tạo các file code tương ứng (ví dụ: `exercise1.ts`, `exercise2.ts`...) trong thư mục này để thực hành.

---

## 📝 Bài tập 1: Hệ thống Xuất Báo Cáo (Document Exporter)
### 1. Bối cảnh
Hệ thống quản lý bán hàng cần xuất dữ liệu báo cáo doanh thu ra nhiều định dạng khác nhau tùy theo lựa chọn của người dùng: **PDF**, **Excel (XLSX)**, và **CSV**. 

### 2. Yêu cầu
Hãy áp dụng Factory Method Pattern để thiết kế hệ thống đáp ứng các yêu cầu sau:
- Định nghĩa interface `DocumentExporter` chứa phương thức `export(data: any): void`.
- Triển khai các lớp cụ thể:
  - `PdfExporter`: In ra console `[PDF] Đang xuất báo cáo dạng PDF với dữ liệu: ...`
  - `ExcelExporter`: In ra console `[Excel] Đang xuất báo cáo dạng Excel với dữ liệu: ...`
  - `CsvExporter`: In ra console `[CSV] Đang xuất báo cáo dạng CSV với dữ liệu: ...`
- Tạo lớp trừu tượng `ReportGenerator` làm **Creator**:
  - Có phương thức trừu tượng `createExporter(): DocumentExporter` (Factory Method).
  - Có phương thức nghiệp vụ `generateReport(data: any): void` thực hiện luồng:
    1. Log: `[Hệ thống] Bắt đầu chuẩn bị dữ liệu xuất báo cáo...`
    2. Khởi tạo exporter tương ứng thông qua Factory Method.
    3. Gọi phương thức `export(data)`.
    4. Log: `[Hệ thống] Xuất báo cáo hoàn tất!`
- Triển khai các lớp **Concrete Creator**: `PdfReportGenerator`, `ExcelReportGenerator`, `CsvReportGenerator`.
- Viết client code chạy thử nghiệm xuất dữ liệu với cả 3 định dạng.

---

## 📝 Bài tập 2: Hệ thống Gửi Thông Báo Đa Kênh (Notification Hub)
### 1. Bối cảnh
Hệ thống chăm sóc khách hàng cần gửi mã OTP và tin nhắn khuyến mãi qua 3 kênh: **Email**, **SMS**, và **Push Notification** (thông báo ứng dụng). Mỗi kênh có cấu hình riêng và giới hạn độ dài ký tự khác nhau.

### 2. Yêu cầu
- Định nghĩa interface `NotificationSender` với phương thức `send(recipient: string, message: string): Promise<boolean>`.
- Triển khai các lớp cụ thể:
  - `EmailSender`: Gửi email. Giới hạn tin nhắn tối đa 1000 ký tự.
  - `SmsSender`: Gửi SMS qua API Brandname. Giới hạn tối đa 160 ký tự. Nếu tin nhắn dài hơn, phải trả về kết quả thất bại.
  - `PushSender`: Gửi Firebase Cloud Messaging. Giới hạn tối đa 200 ký tự.
- Tạo lớp trừu tượng `NotificationService` làm **Creator**:
  - Chứa Factory Method `protected abstract createSender(): NotificationSender`.
  - Chứa phương thức nghiệp vụ `public async dispatchNotification(recipient: string, message: string): Promise<void>` để quản lý luồng gửi tin nhắn, ghi nhận trạng thái gửi (Thành công/Thất bại), ghi log thời gian gửi.
- Triển khai các lớp **Concrete Creator** tương ứng.
- Viết client code để thử nghiệm gửi tin nhắn thành công, và kiểm tra trường hợp lỗi (ví dụ gửi SMS vượt quá 160 ký tự).

---

## 📝 Bài tập 3: Bộ Quản Lý Kết Nối Database (Database Connection Manager)
### 1. Bối cảnh
Ứng dụng backend cần kết nối đến các hệ quản trị cơ sở dữ liệu khác nhau tùy thuộc vào môi trường (development dùng **MongoDB**, production dùng **PostgreSQL**, testing dùng **SQLite** bộ nhớ).

### 2. Yêu cầu
- Định nghĩa interface `DatabaseConnection` với các phương thức:
  - `connect(uri: string): Promise<void>`
  - `executeQuery(query: string): Promise<any>`
  - `disconnect(): Promise<void>`
- Triển khai các lớp kết nối cụ thể: `PostgresConnection`, `MongoConnection`, `SqliteConnection` (mô phỏng kết nối bằng log console và `setTimeout` để giả lập độ trễ).
- Tạo lớp trừu tượng `DatabaseClient` làm **Creator**:
  - Chứa Factory Method `protected abstract createConnection(): DatabaseConnection`.
  - Chứa phương thức nghiệp vụ `public async runQueryInTransaction(uri: string, query: string): Promise<void>` thực hiện chuỗi hành động:
    1. Tạo kết nối.
    2. Gọi `connect(uri)`.
    3. Thực thi truy vấn `executeQuery(query)`.
    4. Ngắt kết nối `disconnect()`.
    - *Lưu ý:* Cần sử dụng khối `try...finally` để đảm bảo kết nối luôn được đóng (`disconnect()`) kể cả khi truy vấn bị lỗi.
- Triển khai các lớp **Concrete Creator**: `PostgresClient`, `MongoClient`, `SqliteClient`.
- Viết client code chạy thực tế để giả lập kết nối và chạy truy vấn.

---

## 💡 Hướng dẫn thực hiện
1. Bạn hãy tạo các file tương ứng trong thư mục `02-C-FactoryMethod-pattern/`.
2. Khai báo rõ ràng các `type` hoặc `interface`, tuyệt đối không dùng `any` theo đúng tiêu chuẩn TypeScript.
3. Sử dụng `async/await` đối với các tác vụ mô phỏng kết nối, gửi nhận để code chân thực hơn.
