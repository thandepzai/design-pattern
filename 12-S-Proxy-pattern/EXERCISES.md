# BÀI TẬP THỰC HÀNH: PROXY PATTERN

## BÀI TẬP 1: Trình Hiển Thị Hình Ảnh Trì Hoãn (Virtual Image Proxy)

### Ngữ cảnh
Bạn đang viết một ứng dụng album ảnh. Khi danh sách ảnh được hiển thị, ứng dụng không nên tải toàn bộ hình ảnh có độ phân giải cao từ bộ nhớ hoặc mạng ngay lập tức, vì điều này làm chậm giao diện. Thay vào đó, nó nên hiển thị một khung giữ chỗ (placeholder) hoặc chỉ tải ảnh thật khi người dùng click vào ảnh đó để phóng to.

Hãy áp dụng **Virtual Proxy Pattern**:
- **Subject Interface** (`Image`): Định nghĩa phương thức `display(): string`.
- **Real Subject** (`RealImage`): Tải ảnh từ đĩa cứng (tiêu tốn tài nguyên và thời gian - được mô phỏng bằng nhật ký log `TẢI ẢNH TỪ ĐĨA CỨNG: <filename>`) và hiển thị ảnh.
- **Virtual Proxy** (`ProxyImage`): Giữ tham chiếu tới `RealImage` nhưng không khởi tạo đối tượng này ngay khi tạo proxy. Đối tượng `RealImage` chỉ được khởi tạo trong phương thức `display()` khi người dùng thực hiện cuộc gọi hiển thị lần đầu tiên. Những lần sau, nó dùng lại đối tượng đã khởi tạo.

---

## BÀI TẬP 2: Kiểm Soát Truy Cập Cơ Sở Dữ Liệu (Protection Database Proxy)

### Ngữ cảnh
Một hệ thống quản lý cơ sở dữ liệu nội bộ cung cấp quyền truy cập để truy vấn và sửa đổi bảng lương nhân viên.
- Tất cả nhân viên đều được phép **đọc** (read) bảng lương.
- Chỉ nhân viên có chức vụ `ADMIN` hoặc `HR` mới được phép **ghi/sửa đổi** (write) dữ liệu bảng lương.

Hãy áp dụng **Protection Proxy Pattern**:
- **Subject Interface** (`DatabaseExecutor`): Định nghĩa hai phương thức:
  - `executeQuery(sql: string): string`
  - `executeUpdate(sql: string): void`
- **Real Subject** (`RealDatabaseExecutor`): Thực hiện trực tiếp câu lệnh SQL vào Database.
- **Protection Proxy** (`DatabaseProxy`): Nhận vào đối tượng `RealDatabaseExecutor` và thông tin `User` hiện tại. Nó kiểm tra xem người dùng có đủ quyền hay không trước khi cho phép gọi các hàm sửa đổi của `RealDatabaseExecutor`.

---

## Hướng dẫn hoàn thành bài tập
1. Mở file [exercises.ts](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/12-S-Proxy-pattern/exercises.ts).
2. Thực hiện các phần có đánh dấu `// TODO`.
3. Chạy lệnh sau trong terminal để kiểm tra kết quả:
   ```bash
   npx tsx 12-S-Proxy-pattern/exercises.ts
   ```
4. Đảm bảo tất cả các test case đều hiển thị `[OK]` và chương trình in ra thông báo thành công màu xanh lá.
