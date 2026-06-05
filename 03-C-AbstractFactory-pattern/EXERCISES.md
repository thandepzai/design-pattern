# Bài tập Thực hành: Abstract Factory Pattern

Dưới đây là 3 bài tập thực hành từ cơ bản đến nâng cao giúp bạn làm chủ **Abstract Factory Pattern** bằng TypeScript. Hãy hoàn thành các phần còn thiếu (`// TODO`) trong file `exercises.ts` để rèn luyện tư duy thiết kế hệ thống.

---

## 📝 Bài tập 1: Hệ thống Trang bị Nhân vật trong Game (RPG Equipment Kit)
### 1. Bối cảnh
Trong một trò chơi nhập vai (RPG), hệ thống cần tạo ra trang bị cho nhân vật khi họ chọn môn phái khác nhau. Mỗi môn phái cần một bộ trang bị đồng bộ gồm: **Vũ khí (Weapon)** và **Giáp (Armor)** để đảm bảo tính cân bằng game và đồ họa hiển thị đồng nhất.

### 2. Yêu cầu
Hãy áp dụng Abstract Factory Pattern để xây dựng hệ thống:
- Định nghĩa hai interfaces sản phẩm trừu tượng:
  - `Weapon` có phương thức `use(): void`.
  - `Armor` có phương thức `wear(): void`.
- Triển khai các lớp sản phẩm cụ thể:
  - Cho phái **Chiến binh (Warrior)**:
    - `Sword` (Weapon): In ra `[Sword] Đang chém cận chiến gây 50 sát thương vật lý.`
    - `PlateMail` (Armor): In ra `[PlateMail] Đang mặc giáp sắt dày giúp giảm 30% sát thương nhận vào.`
  - Cho phái **Pháp sư (Mage)**:
    - `Staff` (Weapon): In ra `[Staff] Đang niệm phép bắn tia lửa gây 80 sát thương ma pháp.`
    - `Robe` (Armor): In ra `[Robe] Đang khoác áo choàng vải tăng tốc độ hồi phục năng lượng.`
- Định nghĩa interface nhà máy trừu tượng `GameEquipmentFactory`:
  - Phương thức `createWeapon(): Weapon`.
  - Phương thức `createArmor(): Armor`.
- Triển khai các nhà máy cụ thể: `WarriorEquipmentFactory` và `MageEquipmentFactory`.
- Client code sẽ khởi tạo một nhân vật và tự động trang bị cho họ dựa trên Factory được truyền vào.

---

## 📝 Bài tập 2: Hệ thống Truyền thông Khách hàng (B2B vs B2C Communication Suite)
### 1. Bối cảnh
Hệ thống quản lý khách hàng của công ty cần tự động gửi thông tin báo cáo định kỳ. 
- Khách hàng doanh nghiệp (**B2B**) yêu cầu tài liệu dạng **PDF** (trang trọng) và nhận qua **Email**.
- Khách hàng cá nhân (**B2C**) yêu cầu tài liệu dạng **HTML** (giao diện sinh động) và nhận qua **Push Notification** trên ứng dụng di động.

### 2. Yêu cầu
- Định nghĩa hai interfaces sản phẩm trừu tượng:
  - `Document` có phương thức `generate(content: string): void`.
  - `Notifier` có phương thức `notify(recipient: string, message: string): Promise<void>`.
- Triển khai các lớp sản phẩm cụ thể:
  - Dành cho **B2B**:
    - `PdfDocument`: In ra `[PDF Document] Đang tạo tài liệu báo cáo trang trọng: "[nội dung]"`
    - `EmailNotifier`: In ra `[Email Notifier] Gửi email đến doanh nghiệp [người nhận]: "[tin nhắn]"`
  - Dành cho **B2C**:
    - `HtmlDocument`: In ra `[HTML Document] Đang tạo trang tài liệu động: "[nội dung]"`
    - `PushNotifier`: In ra `[Push Notifier] Gửi Push thông báo tới thiết bị của [người nhận]: "[tin nhắn]"`
- Định nghĩa interface nhà máy trừu tượng `CommunicationFactory`:
  - Phương thức `createDocument(): Document`.
  - Phương thức `createNotifier(): Notifier`.
- Triển khai các nhà máy cụ thể: `B2BCommunicationFactory` và `B2CCommunicationFactory`.
- Viết client code quản lý luồng gửi báo cáo (chạy thử gửi cho cả đối tượng doanh nghiệp và cá nhân).

---

## 📝 Bài tập 3: Cấu hình Môi trường Chạy ứng dụng (Environment Bootstrapper)
### 1. Bối cảnh
Khi khởi động ứng dụng backend, cấu hình logger và kết nối database sẽ thay đổi tùy thuộc vào môi trường chạy ứng dụng:
- Môi trường **Production**: Logger cần xuất log dạng JSON (`JsonLogger`) để đẩy về máy chủ tập trung (ELK Stack), database kết nối Cluster PostgreSQL (`PgConnection`).
- Môi trường **Development**: Logger chỉ cần xuất text thô ra màn hình console (`ConsoleLogger`) để lập trình viên dễ đọc, database dùng SQLite dạng file cục bộ (`SqliteConnection`).

### 2. Yêu cầu
- Định nghĩa hai interfaces sản phẩm trừu tượng:
  - `DatabaseConnection` có các phương thức: `connect(uri: string): void`, `disconnect(): void`.
  - `AppLogger` có phương thức: `log(message: string): void`.
- Triển khai các lớp cụ thể:
  - **Môi trường Production**:
    - `PgConnection`: `connect` in ra `[PgConnection] Đang kết nối tới DB Cluster: [uri]`, `disconnect` in ra `[PgConnection] Ngắt kết nối Cluster an toàn.`
    - `JsonLogger`: In ra log dạng JSON chuẩn: `{"level":"info","timestamp":"[ISO Date]","message":"[tin nhắn]"}`
  - **Môi trường Development**:
    - `SqliteConnection`: `connect` in ra `[SqliteConnection] Mở file DB cục bộ: [uri]`, `disconnect` in ra `[SqliteConnection] Đóng file DB.`
    - `ConsoleLogger`: In log thô dạng: `[DEV LOG - INFO] [tin nhắn]`
- Định nghĩa interface nhà máy trừu tượng `EnvironmentFactory`:
  - Phương thức `createConnection(): DatabaseConnection`.
  - Phương thức `createLogger(): AppLogger`.
- Triển khai các nhà máy cụ thể: `ProdEnvironmentFactory` và `DevEnvironmentFactory`.
- Viết client code khởi tạo và chạy ứng dụng trong cả hai môi trường:
  - Kết nối DB
  - Ghi log một số thao tác
  - Ngắt kết nối DB

---

## 💡 Hướng dẫn thực hiện
1. Hãy mở file `03-C-AbstractFactory-pattern/exercises.ts`.
2. Đọc kỹ phần khai báo interfaces và các class mẫu.
3. Điền mã nguồn của bạn vào những vị trí có comment `// TODO`.
4. Chạy kiểm thử kết quả bằng cách thực thi lệnh: `npx tsx 03-C-AbstractFactory-pattern/exercises.ts` từ thư mục gốc của dự án.
