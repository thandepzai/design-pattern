# Bài tập thực hành: Facade Pattern

Chào mừng bạn đến với phần bài tập thực hành về **Facade Pattern**. Dưới đây là mô tả chi tiết của các bài tập được thiết kế sẵn trong file `exercises.ts`.

Nhiệm vụ của bạn là đọc kỹ yêu cầu, mở file **[exercises.ts](file:///Users/thantran/Desktop/learn/design-pattern/10-S-Facade-pattern/exercises.ts)** và hoàn thành các phần có đánh dấu `// TODO`.

---

## 🛒 Bài tập 1: Quy trình Đặt hàng Trực tuyến phức tạp (Order Processing Facade)

### Bối cảnh:
Trong một hệ thống thương mại điện tử, quy trình mua một sản phẩm bao gồm rất nhiều bước xử lý phức tạp của các bộ phận khác nhau:
1. **InventoryService** (Quản lý kho): Kiểm tra xem sản phẩm còn hàng không và cập nhật số lượng trong kho.
2. **PaymentProcessor** (Thanh toán): Thực hiện thanh toán tiền của khách hàng.
3. **ShippingService** (Vận chuyển): Đăng ký đơn hàng vận chuyển và nhận mã theo dõi (tracking code).
4. **NotificationService** (Thông báo): Gửi email thông báo đặt hàng thành công cho khách hàng.

Nếu để Client gọi từng dịch vụ này, mã nguồn Client sẽ bị phình to và khó quản lý. Hãy xây dựng một lớp `OrderFacade` để cung cấp phương thức `placeOrder(productId, quantity, userId, amount)` nhằm xử lý toàn bộ quy trình trên một cách thống nhất.

### Yêu cầu:
1. Triển khai phương thức `placeOrder(...)` trong lớp `OrderFacade`:
   - Bước 1: Kiểm tra xem sản phẩm có đủ số lượng trong kho không bằng cách gọi `inventory.checkStock(productId, quantity)`. Nếu không đủ, ghi log lỗi và trả về `false`.
   - Bước 2: Tiến hành thanh toán qua `payment.processPayment(userId, amount)`. Nếu thanh toán thất bại, ghi log lỗi và trả về `false`.
   - Bước 3: Cập nhật kho hàng bằng cách trừ số lượng sản phẩm `inventory.deductStock(productId, quantity)`.
   - Bước 4: Tạo yêu cầu vận chuyển qua `shipping.arrangeShipping(productId, quantity)`. Nhận về một mã tracking code.
   - Bước 5: Gửi thông báo thành công qua `notification.sendConfirmationEmail(userId, trackingCode)`.
   - Bước 6: Trả về `true` báo hiệu toàn bộ quy trình đã hoàn thành xuất sắc.

*Mẹo: Trong các hệ thống con đã được định nghĩa sẵn, chúng sẽ lưu kết quả xử lý vào một mảng `logs` dùng chung. Hãy đảm bảo gọi các phương thức theo đúng thứ tự.*

---

## 💻 Bài tập 2: Quy trình Khởi động Máy tính (Computer Booting Facade)

### Bối cảnh:
Khởi động một chiếc máy tính là một quy trình tương tác phức tạp giữa các linh kiện phần cứng cấp thấp ở mức CPU, RAM và Ổ cứng.
- **CPU**: Cần dừng các tiến trình hiện tại (`freeze()`), đặt con trỏ lệnh vào một địa chỉ ô nhớ xác định (`jump(position)`), và bắt đầu thực thi lệnh (`execute()`).
- **Memory (RAM)**: Cần nạp dữ liệu hệ điều hành từ ổ cứng vào một địa chỉ RAM (`load(position, data)`).
- **HardDrive (Ổ cứng)**: Cần đọc dữ liệu hệ điều hành tại cung từ (sector) cụ thể (`read(lba, size)`).

Hãy thiết kế một lớp `ComputerFacade` chứa các linh kiện trên và cung cấp phương thức `startComputer()` giúp người dùng khởi động máy tính chỉ với một câu lệnh đơn giản.

### Yêu cầu:
1. Triển khai phương thức `startComputer()` trong lớp `ComputerFacade`:
   - Bước 1: Gọi `cpu.freeze()` để đưa CPU về trạng thái chờ.
   - Bước 2: Đọc dữ liệu Boot sector từ ổ cứng bằng cách gọi `hardDrive.read(BOOT_SECTOR, SECTOR_SIZE)`.
   - Bước 3: Nạp dữ liệu vừa đọc từ ổ cứng vào bộ nhớ RAM ở địa chỉ `BOOT_ADDRESS` thông qua `memory.load(BOOT_ADDRESS, bootData)`.
   - Bước 4: Chuyển con trỏ lệnh của CPU tới địa chỉ `BOOT_ADDRESS` thông qua `cpu.jump(BOOT_ADDRESS)`.
   - Bước 5: Bắt đầu thực thi các lệnh trên CPU thông qua `cpu.execute()`.

---

## 🏁 Cách kiểm tra kết quả

Sau khi hoàn thành viết mã nguồn trong `exercises.ts`, hãy chạy lệnh sau từ thư mục gốc của dự án để chạy kiểm thử tự động:

```bash
npx tsx 10-S-Facade-pattern/exercises.ts
```

Nếu tất cả các test hiển thị dấu tick xanh `✓`, xin chúc mừng bạn đã làm chủ được **Facade Pattern**!
