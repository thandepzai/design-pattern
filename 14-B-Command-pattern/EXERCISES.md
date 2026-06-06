# BÀI TẬP THỰC HÀNH: COMMAND PATTERN

## BÀI TẬP 1: Trình Soạn Thảo Văn Bản Hỗ Trợ Undo/Redo (Text Editor Engine)

### Ngữ cảnh
Bạn đang phát triển một Text Editor đơn giản. Trình soạn thảo này lưu nội dung văn bản trong một biến kiểu string. Người dùng có thể thực hiện 2 hành động:
- **Viết chữ (Write)**: Thêm một chuỗi văn bản vào cuối nội dung hiện tại.
- **Xóa chữ (Delete)**: Xóa đi một số lượng ký tự nhất định ở cuối nội dung hiện tại.

Để hỗ trợ tính năng **Undo** (Hoàn tác) và **Redo** (Làm lại), bạn cần áp dụng **Command Pattern**:
- **Receiver** (`TextEditor`): Lớp chứa chuỗi văn bản thực tế (`content`) và các phương thức `write(text: string)`, `delete(length: number)`.
- **Command Interface** (`Command`): Chứa `execute()` và `undo()`.
- **Concrete Commands**:
  - `WriteCommand`: Khi `execute()`, gọi `editor.write(text)`. Khi `undo()`, xóa phần chữ vừa viết.
  - `DeleteCommand`: Khi `execute()`, gọi `editor.delete(length)` nhưng phải lưu trữ tạm thời đoạn chữ bị xóa để khi `undo()` có thể khôi phục lại.
- **Invoker** (`EditorInvoker`): Chứa lịch sử thực thi bằng cấu trúc dữ liệu Stack (`historyStack: Command[]` cho Undo và `redoStack: Command[]` cho Redo).

---

## BÀI TẬP 2: Quản Lý Lịch Sử Giao Dịch Ngân Hàng (Bank Transaction Manager)

### Ngữ cảnh
Một tài khoản ngân hàng thực hiện các giao dịch nạp tiền (Deposit) và rút tiền (Withdraw). Để đảm bảo tính minh bạch, tất cả các giao dịch này phải được đóng gói thành các đối tượng giao dịch (Command) để có thể ghi nhật ký (Log), kiểm toán, hoặc thực hiện đảo ngược giao dịch khi phát hiện sai sót (Undo).

Hãy áp dụng **Command Pattern**:
- **Receiver** (`BankAccount`): Chứa số dư (`balance`) và phương thức nạp/rút tiền.
- **Command Interface** (`Transaction`): Định nghĩa `execute()` và `undo()`.
- **Concrete Commands**:
  - `DepositTransaction`: Nạp tiền và đảo ngược bằng cách trừ tiền.
  - `WithdrawTransaction`: Rút tiền (kiểm tra số dư, nếu không đủ tiền thì ném lỗi và không thực thi tiếp). Đảo ngược bằng cách nạp lại tiền.
- **Invoker** (`TransactionManager`): Quản lý việc thực thi giao dịch và lưu trữ lịch sử để rollback (undo).

---

## Hướng dẫn hoàn thành bài tập
1. Mở file [exercises.ts](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/14-B-Command-pattern/exercises.ts).
2. Thực hiện các phần có đánh dấu `// TODO`.
3. Chạy lệnh sau trong terminal để kiểm tra kết quả:
   ```bash
   npx tsx 14-B-Command-pattern/exercises.ts
   ```
4. Đảm bảo tất cả các test case đều hiển thị `[OK]` và chương trình in ra thông báo thành công màu xanh lá.
