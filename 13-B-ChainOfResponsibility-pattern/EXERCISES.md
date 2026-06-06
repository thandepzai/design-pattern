# BÀI TẬP THỰC HÀNH: CHAIN OF RESPONSIBILITY PATTERN

## BÀI TẬP 1: Middleware Pipeline Xử Lý HTTP Request (HTTP Middleware Chain)

### Ngữ cảnh
Khi một HTTP Request gửi đến API Server, nó cần đi qua một loạt các bước kiểm tra (pipeline middleware) trước khi tới được Controller xử lý nghiệp vụ chính:
1. **LoggerMiddleware**: Ghi lại nhật ký yêu cầu (ví dụ: `REQUEST LOGGED: <url>`).
2. **AuthMiddleware**: Xác thực xem request có chứa token hợp lệ hay không.
3. **ValidationMiddleware**: Kiểm tra xem body của request có hợp lệ không (ví dụ: email có đúng định dạng).

Hãy áp dụng **Chain of Responsibility Pattern**:
- Thiết kế một interface `Middleware` (Handler) với phương thức `setNext()` và `handle(request: HttpRequest): boolean`.
- Yêu cầu đi dọc theo chuỗi. Nếu bất kỳ middleware nào trả về `false`, chuỗi xử lý bị ngắt ngay lập tức và server sẽ trả về lỗi.
- Nếu đi hết chuỗi thành công (tất cả đều trả về `true`), request được xem là hợp lệ.

---

## BÀI TẬP 2: Hệ Thống Phê Duyệt Chi Phí Công Tác (Expense Approval Chain)

### Ngữ cảnh
Một công ty ban hành quy trình phê duyệt các hóa đơn chi phí đi công tác của nhân viên dựa trên số tiền chi tiêu:
1. **Trưởng phòng (Manager)**: Được quyền phê duyệt các khoản chi **dưới hoặc bằng $500**.
2. **Giám đốc (Director)**: Được quyền phê duyệt các khoản chi **dưới hoặc bằng $2,000**.
3. **Giám đốc tài chính (CFO)**: Được quyền phê duyệt các khoản chi **dưới hoặc bằng $10,000**.
4. Các khoản chi **trên $10,000** sẽ bị từ chối tự động vì vượt hạn mức tối đa của công ty.

Hãy áp dụng **Chain of Responsibility Pattern**:
- Thiết kế interface `Approver` và lớp cơ sở `AbstractApprover`.
- Tạo các lớp concrete approver đại diện cho Manager, Director, CFO.
- Khi gửi một `ExpenseRequest` gồm mục đích chi tiêu và số tiền, chuỗi sẽ tự động chuyển tiếp yêu cầu đến cấp có thẩm quyền xử lý thích hợp nhất.

---

## Hướng dẫn hoàn thành bài tập
1. Mở file [exercises.ts](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/13-B-ChainOfResponsibility-pattern/exercises.ts).
2. Thực hiện các phần có đánh dấu `// TODO`.
3. Chạy lệnh sau trong terminal để kiểm tra kết quả:
   ```bash
   npx tsx 13-B-ChainOfResponsibility-pattern/exercises.ts
   ```
4. Đảm bảo tất cả các test case đều hiển thị `[OK]` và chương trình in ra thông báo thành công màu xanh lá.
