# Bài tập thực hành: Decorator Pattern

Chào mừng bạn đến với phần bài tập thực hành về **Decorator Pattern**. Dưới đây là mô tả chi tiết của các bài tập được thiết kế sẵn trong file `exercises.ts`.

Nhiệm vụ của bạn là đọc kỹ yêu cầu, mở file **[exercises.ts](file:///Users/thantran/Desktop/learn/design-pattern/09-S-Decorator-pattern/exercises.ts)** và hoàn thành các phần có đánh dấu `// TODO`.

---

## 📄 Bài tập 1: Bộ định dạng văn bản HTML (HTML Text Formatter)

### Bối cảnh:
Bạn muốn tạo một công cụ định dạng chữ viết đơn giản cho một trình soạn thảo HTML. 
Văn bản ban đầu chỉ là văn bản thuần túy (`PlainText`). Tuy nhiên, người dùng có thể áp dụng nhiều định dạng cùng lúc lên văn bản đó, chẳng hạn như in đậm (Bold), in nghiêng (Italic), hoặc gạch chân (Underline).

Sử dụng Decorator Pattern, hãy cho phép lồng ghép các thẻ định dạng HTML vào nhau một cách linh hoạt.

### Yêu cầu:
1. Triển khai lớp `PlainText` (Concrete Component):
   - Phương thức `format()` trả về chuỗi văn bản gốc.
2. Triển khai các Decorators cụ thể kế thừa từ lớp trừu tượng `TextDecorator`:
   - `BoldDecorator`: Bao quanh chuỗi kết quả bằng thẻ `<b>` và `</b>`.
   - `ItalicDecorator`: Bao quanh chuỗi kết quả bằng thẻ `<i>` and `</i>`.
   - `UnderlineDecorator`: Bao quanh chuỗi kết quả bằng thẻ `<u>` and `</u>`.

Ví dụ: Nếu áp dụng in đậm rồi in nghiêng cho chuỗi "Hello", kết quả mong đợi là: `<i><b>Hello</b></i>` hoặc `<b><i>Hello</i></b>` tùy theo thứ tự trang trí.

---

## 🔔 Bài tập 2: Hệ thống Gửi thông báo Đa kênh (Multi-Channel Notifier)

### Bối cảnh:
Một hệ thống giám sát máy chủ cần gửi cảnh báo cho quản trị viên khi có lỗi nghiêm trọng xảy ra. 
- Mặc định, tất cả các lỗi đều được gửi qua **Email** (`EmailNotifier`).
- Quản trị viên có thể cấu hình thêm để gửi qua **SMS** (`SmsDecorator`) hoặc gửi lên kênh **Slack** (`SlackDecorator`) của dự án, hoặc kết hợp cả 3 kênh.

Hệ thống cần tích hợp các kênh này động thông qua Decorator Pattern, cho phép tích hợp thêm kênh truyền tải mới bất cứ lúc nào.

### Yêu cầu:
1. Triển khai lớp `EmailNotifier` (Concrete Component):
   - Phương thức `send(message)` thực hiện lưu log định dạng: `✉️ Gửi Email với nội dung: {message}`.
2. Triển khai các Decorators kế thừa từ `NotifierDecorator`:
   - `SmsDecorator`: Gọi phương thức `send()` của Notifier gốc để gửi email trước, sau đó gửi tin nhắn SMS bằng cách ghi log định dạng: `📱 Gửi SMS với nội dung: {message}`.
   - `SlackDecorator`: Gọi phương thức `send()` của Notifier gốc để gửi trước, sau đó gửi tin nhắn Slack bằng cách ghi log định dạng: `💬 Gửi Slack với nội dung: {message}`.

*Mẹo: Trong các hàm này, hãy ghi log (push) chuỗi thông báo tương ứng vào một mảng `logs` dùng chung để kiểm tra kết quả.*

---

## 🏁 Cách kiểm tra kết quả

Sau khi hoàn thành viết mã nguồn trong `exercises.ts`, hãy chạy lệnh sau từ thư mục gốc của dự án để chạy kiểm thử tự động:

```bash
npx tsx 09-S-Decorator-pattern/exercises.ts
```

Nếu tất cả các test hiển thị dấu tick xanh `✓`, xin chúc mừng bạn đã làm chủ được **Decorator Pattern**!
