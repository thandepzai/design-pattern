# BÀI TẬP THỰC HÀNH: STATE PATTERN

## BÀI TẬP 1: Vòng Đời Đơn Hàng (Order Lifecycle)

### Ngữ cảnh
Một đơn hàng trong hệ thống e-commerce trải qua nhiều trạng thái trong vòng đời của nó. Mỗi trạng thái cho phép hoặc từ chối các hành động khác nhau:

1. **PendingState** (Đang chờ xác nhận): Có thể `cancel()` hoặc `confirm()`. Không thể `ship()` hay `deliver()`.
2. **ProcessingState** (Đang xử lý): Có thể `cancel()` hoặc `ship()`. Không thể `confirm()` hay `deliver()`.
3. **ShippedState** (Đã giao vận chuyển): Chỉ có thể `deliver()`. Không thể `cancel()`, `confirm()`, hay thay đổi gì nữa.
4. **DeliveredState** (Đã giao thành công): Mọi hành động đều không thể thực hiện - đơn hàng đã hoàn tất.

Hãy áp dụng **State Pattern**:
- Thiết kế interface `OrderState` với các method: `cancel(order)`, `confirm(order)`, `ship(order)`, `deliver(order)`.
- `Order` là Context lưu trạng thái hiện tại và id đơn hàng.
- Mỗi ConcreteState xử lý hành động hợp lệ và từ chối hành động không hợp lệ với log tương ứng.

---

## BÀI TẬP 2: Media Player (Media Playback States)

### Ngữ cảnh
Một ứng dụng media player có 3 trạng thái rõ ràng, mỗi trạng thái phản ứng khác nhau với các nút điều khiển:

1. **StoppedState** (Đã dừng): `play()` bắt đầu phát. `pause()` và `stop()` không làm gì (không có gì đang chạy).
2. **PlayingState** (Đang phát): `pause()` tạm dừng. `stop()` dừng hẳn. `play()` không làm gì (đang phát rồi).
3. **PausedState** (Tạm dừng): `play()` tiếp tục phát. `stop()` dừng hẳn. `pause()` không làm gì (đã tạm dừng rồi).

Hãy áp dụng **State Pattern**:
- Thiết kế interface `MediaState` với các method: `play(player)`, `pause(player)`, `stop(player)`.
- `MediaPlayer` là Context lưu trạng thái và track đang phát hiện tại.
- Mỗi ConcreteState xử lý hành động và push log vào `operationLogs`.

---

## Hướng dẫn hoàn thành bài tập
1. Mở file [exercises.ts](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-pattern/20-B-State-pattern/exercises.ts).
2. Thực hiện các phần có đánh dấu `// TODO`.
3. Chạy lệnh sau trong terminal để kiểm tra kết quả:
   ```bash
   npx tsx 20-B-State-pattern/exercises.ts
   ```
4. Đảm bảo tất cả các test case đều hiển thị `[OK]` và chương trình in ra thông báo thành công màu xanh lá.
