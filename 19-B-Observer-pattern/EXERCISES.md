# BÀI TẬP THỰC HÀNH: OBSERVER PATTERN

## BÀI TẬP 1: Hệ Thống Cảnh Báo Thời Tiết (Weather Alert System)

### Ngữ cảnh
Một trạm khí tượng thủy văn (`WeatherStation`) thu thập các chỉ số thời tiết (nhiệt độ, độ ẩm, áp suất) và cần truyền dữ liệu đến nhiều màn hình hiển thị khác nhau:

1. **CurrentConditionsDisplay**: Hiển thị điều kiện thời tiết hiện tại.
2. **StatisticsDisplay**: Ghi nhận và tính toán thống kê nhiệt độ theo thời gian.
3. **ForecastDisplay**: Đưa ra dự báo thời tiết dựa trên áp suất khí quyển.

Hãy áp dụng **Observer Pattern**:
- Thiết kế interface `WeatherObserver` với method `update(temp, humidity, pressure)`.
- `WeatherStation` là Subject quản lý danh sách observer và gọi `update` khi có số liệu mới.
- Mỗi Display tự xử lý dữ liệu nhận được theo cách riêng và push log vào `operationLogs`.

---

## BÀI TẬP 2: Hệ Thống Sự Kiện Đặt Hàng E-Commerce (Order Event System)

### Ngữ cảnh
Trong một nền tảng thương mại điện tử, khi khách hàng đặt hàng thành công, `OrderService` cần thông báo đến nhiều service khác nhau để xử lý song song:

1. **EmailService**: Gửi email xác nhận đơn hàng cho khách hàng.
2. **InventoryService**: Cập nhật số lượng tồn kho, trừ đi sản phẩm đã bán.
3. **AnalyticsService**: Ghi nhận thông tin đơn hàng vào hệ thống phân tích doanh thu.

Hãy áp dụng **Observer Pattern**:
- Thiết kế interface `OrderObserver` với method `onOrderPlaced(orderId, total)`.
- `OrderService` là Subject quản lý danh sách observer và broadcast khi có đơn hàng mới.
- Mỗi Service implement `onOrderPlaced` theo nghiệp vụ riêng và push log vào `operationLogs`.

---

## Hướng dẫn hoàn thành bài tập
1. Mở file [exercises.ts](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-pattern/19-B-Observer-pattern/exercises.ts).
2. Thực hiện các phần có đánh dấu `// TODO`.
3. Chạy lệnh sau trong terminal để kiểm tra kết quả:
   ```bash
   npx tsx 19-B-Observer-pattern/exercises.ts
   ```
4. Đảm bảo tất cả các test case đều hiển thị `[OK]` và chương trình in ra thông báo thành công màu xanh lá.
