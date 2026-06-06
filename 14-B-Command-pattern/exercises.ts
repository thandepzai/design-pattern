/**
 * ============================================================================
 * BÀI TẬP THỰC HÀNH: COMMAND PATTERN
 * Thư mục: 14-B-Command-pattern/exercises.ts
 *
 * Hướng dẫn: Điền mã nguồn vào các phần có đánh dấu // TODO.
 * Chạy file này bằng tsx hoặc ts-node để kiểm tra kết quả.
 * ============================================================================
 */

export const operationLogs: string[] = [];

// ============================================================================
// BÀI TẬP 1: TRÌNH SOẠN THẢO VĂN BẢN HỖ TRỢ UNDO/REDO (TEXT EDITOR ENGINE)
// ============================================================================

export class TextEditor {
  private content: string = "";

  public getContent(): string {
    return this.content;
  }

  public write(text: string): void {
    this.content += text;
    operationLogs.push(`EDITOR: Viết "${text}" -> Nội dung: "${this.content}"`);
  }

  public delete(length: number): string {
    const deleted = this.content.slice(-length);
    this.content = this.content.slice(0, -length);
    operationLogs.push(
      `EDITOR: Xóa ${length} ký tự ("${deleted}") -> Nội dung: "${this.content}"`
    );
    return deleted;
  }
}

export interface Command {
  execute(): void;
  undo(): void;
}

export class WriteCommand implements Command {
  constructor(
    private editor: TextEditor,
    private text: string
  ) {}

  public execute(): void {
    // TODO: Thực thi ghi văn bản vào editor
    this.editor.write(this.text);
  }

  public undo(): void {
    // TODO: Hoàn tác hành động ghi bằng cách xóa đúng số lượng ký tự vừa được thêm vào
    this.editor.delete(this.text.length);
  }
}

export class DeleteCommand implements Command {
  private deletedText: string = "";

  constructor(
    private editor: TextEditor,
    private length: number
  ) {}

  public execute(): void {
    // TODO: Thực thi xóa và lưu trữ chuỗi ký tự bị xóa vào `deletedText` để phục vụ việc undo
    this.deletedText = this.editor.delete(this.length);
  }

  public undo(): void {
    // TODO: Hoàn tác hành động xóa bằng cách chèn lại nội dung `deletedText` vào editor
    this.editor.write(this.deletedText);
  }
}

export class EditorInvoker {
  private history: Command[] = [];
  private redoStack: Command[] = [];

  public executeCommand(command: Command): void {
    // TODO: Triển khai các bước:
    // 1. Gọi execute() của command.
    // 2. Lưu command vào stack `history`.
    // 3. Xóa sạch dữ liệu trong `redoStack` vì có thao tác mới chèn vào.
    command.execute();
    this.history.push(command);
    this.redoStack.length = 0;
  }

  public undo(): void {
    // TODO: Triển khai hoàn tác:
    // 1. Lấy command gần nhất ra khỏi stack `history` (nếu có).
    // 2. Gọi phương thức undo() của command đó.
    // 3. Đẩy command đó vào stack `redoStack` để chuẩn bị cho redo.
    if(this.history.length > 0) {
      const command = this.history.pop();
      command?.undo();
      if(command) {
        this.redoStack.push(command);
      }
    }
  }

  public redo(): void {
    // TODO: Triển khai làm lại:
    // 1. Lấy command ra khỏi stack `redoStack` (nếu có).
    // 2. Gọi phương thức execute() của command đó.
    // 3. Đẩy command đó vào stack `history` trở lại.
    if(this.redoStack.length > 0) {
      const command = this.redoStack.pop();
      command?.execute();
      if(command) {
        this.history.push(command);
      }
    }
  }

  public getHistoryCount(): number {
    return this.history.length;
  }

  public getRedoCount(): number {
    return this.redoStack.length;
  }
}

// ============================================================================
// BÀI TẬP 2: QUẢN LÝ LỊCH SỬ GIAO DỊCH NGÂN HÀNG (BANK TRANSACTION MANAGER)
// ============================================================================

export class BankAccount {
  constructor(
    public accountNumber: string,
    private balance: number
  ) {}

  public getBalance(): number {
    return this.balance;
  }

  public deposit(amount: number): void {
    this.balance += amount;
    operationLogs.push(`BANK: Nạp $${amount} -> Số dư: $${this.balance}`);
  }

  public withdraw(amount: number): void {
    if (this.balance < amount) {
      throw new Error("Insufficient funds");
    }
    this.balance -= amount;
    operationLogs.push(`BANK: Rút $${amount} -> Số dư: $${this.balance}`);
  }
}

export interface Transaction {
  execute(): void;
  undo(): void;
}

export class DepositTransaction implements Transaction {
  constructor(
    private account: BankAccount,
    private amount: number
  ) {}

  public execute(): void {
    // TODO: Thực thi nạp tiền vào tài khoản
  }

  public undo(): void {
    // TODO: Hoàn tác nạp tiền bằng cách rút số tiền tương ứng khỏi tài khoản
  }
}

export class WithdrawTransaction implements Transaction {
  private success: boolean = false;

  constructor(
    private account: BankAccount,
    private amount: number
  ) {}

  public execute(): void {
    // TODO: Thực thi rút tiền.
    // Nếu thành công (không ném lỗi Insufficient funds), gán `success = true`.
    if(this.account.getBalance() >= this.amount) {
      this.account.withdraw(this.amount);
      this.success = true;
    } else {
      this.success = false;
    }
  }

  public undo(): void {
    // TODO: Hoàn tác rút tiền bằng cách nạp lại số tiền tương ứng (nếu hành động execute trước đó đã thành công)
    if(this.success) {
      this.account.deposit(this.amount);
    }
  }
}

export class TransactionManager {
  private history: Transaction[] = [];

  public executeTransaction(transaction: Transaction): void {
    // TODO: 1. Gọi execute() của transaction.
    //       2. Đẩy transaction vào history để ghi nhận.
    transaction.execute();
    this.history.push(transaction);
  }

  public rollbackLastTransaction(): void {
    // TODO: 1. Lấy transaction cuối cùng ra khỏi history.
    //       2. Gọi undo() của transaction đó.
    if(this.history.length > 0) {
      const transaction = this.history.pop();
      transaction?.undo();
    }
  }

  public getTransactionHistoryCount(): number {
    return this.history.length;
  }
}

// ============================================================================
// CLIENT CODE (DÙNG ĐỂ CHẠY THỬ NGHIỆM)
// ============================================================================
async function runTests() {
  console.log("=== THỬ NGHIỆM BÀI TẬP 1 (TEXT EDITOR UNDO/REDO) ===");
  try {
    operationLogs.length = 0;
    const editor = new TextEditor();
    const invoker = new EditorInvoker();

    // 1. Viết "Hello"
    const cmd1 = new WriteCommand(editor, "Hello");
    invoker.executeCommand(cmd1);

    // 2. Viết " World"
    const cmd2 = new WriteCommand(editor, " World");
    invoker.executeCommand(cmd2);

    // Test 1.1: Trạng thái văn bản sau khi gõ
    const test1_1 = editor.getContent() === "Hello World" && invoker.getHistoryCount() === 2;
    console.log(
      `  - Test 1.1: Gõ văn bản thành công -> [${test1_1 ? "OK" : "FAIL"}]`
    );

    // 3. Xóa 6 ký tự (" World")
    const cmd3 = new DeleteCommand(editor, 6);
    invoker.executeCommand(cmd3);
    const test1_2 = editor.getContent() === "Hello" && invoker.getHistoryCount() === 3;
    console.log(
      `  - Test 1.2: Xóa ký tự thành công -> [${test1_2 ? "OK" : "FAIL"}]`
    );

    // 4. Undo xóa ký tự (phục hồi " World")
    invoker.undo();
    const test1_3 = editor.getContent() === "Hello World" && invoker.getRedoCount() === 1;
    console.log(
      `  - Test 1.3: Undo lệnh xóa thành công -> [${test1_3 ? "OK" : "FAIL"}]`
    );

    // 5. Redo xóa ký tự (xóa lại " World")
    invoker.redo();
    const test1_4 = editor.getContent() === "Hello" && invoker.getRedoCount() === 0;
    console.log(
      `  - Test 1.4: Redo lệnh xóa thành công -> [${test1_4 ? "OK" : "FAIL"}]`
    );

    // 6. Undo 2 lần (quay về "Hello", rồi về "")
    invoker.undo(); // quay về "Hello World"
    invoker.undo(); // quay về "Hello"
    const test1_5 = editor.getContent() === "Hello";
    console.log(
      `  - Test 1.5: Hoàn tác liên tiếp thành công -> [${test1_5 ? "OK" : "FAIL"}]`
    );

    if (test1_1 && test1_2 && test1_3 && test1_4 && test1_5) {
      console.log(
        "\x1b[32m  ✓ Thành công: Text Editor hoàn thành quy trình Undo/Redo bằng Command.\x1b[0m"
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Trình soạn thảo gặp lỗi trong việc lưu trữ hoặc đảo ngược trạng thái.\x1b[0m"
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 1 chưa hoàn thiện:\x1b[0m", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 (BANK ACCOUNT TRANSACTION) ===");
  try {
    operationLogs.length = 0;
    const account = new BankAccount("123-456", 1000);
    const manager = new TransactionManager();

    // 1. Nạp $500
    const tx1 = new DepositTransaction(account, 500);
    manager.executeTransaction(tx1);

    // 2. Rút $300
    const tx2 = new WithdrawTransaction(account, 300);
    manager.executeTransaction(tx2);

    // Test 2.1: Giao dịch nạp/rút thông thường
    const test2_1 = account.getBalance() === 1200 && manager.getTransactionHistoryCount() === 2;
    console.log(
      `  - Test 2.1: Nạp $500 và rút $300 thành công. Số dư $1200 -> [${test2_1 ? "OK" : "FAIL"}]`
    );

    // 3. Rollback rút $300 (số dư phải về $1500)
    manager.rollbackLastTransaction();
    const test2_2 = account.getBalance() === 1500 && manager.getTransactionHistoryCount() === 1;
    console.log(
      `  - Test 2.2: Rollback giao dịch rút tiền gần nhất thành công -> [${
        test2_2 ? "OK" : "FAIL"
      }]`
    );

    // 4. Rút quá số dư ($2000 > $1500) -> phải ném lỗi
    let failedWithdraw = false;
    const tx3 = new WithdrawTransaction(account, 2000);
    try {
      manager.executeTransaction(tx3);
    } catch {
      failedWithdraw = true;
    }
    const test2_3 = failedWithdraw && account.getBalance() === 1500;
    console.log(
      `  - Test 2.3: Rút quá số dư bị chặn và bảo toàn tiền thành công -> [${
        test2_3 ? "OK" : "FAIL"
      }]`
    );

    if (test2_1 && test2_2 && test2_3) {
      console.log(
        "\x1b[32m  ✓ Thành công: Bank Transaction Manager đóng gói và quản lý giao dịch chính xác.\x1b[0m"
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Giao dịch ngân hàng bị sai logic nạp/rút/hoàn tác.\x1b[0m"
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 2 chưa hoàn thiện:\x1b[0m", message);
  }
}

runTests();
