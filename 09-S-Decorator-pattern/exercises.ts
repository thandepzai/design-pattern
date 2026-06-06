/**
 * ============================================================================
 * BÀI TẬP THỰC HÀNH: DECORATOR PATTERN
 * Thư mục: 09-S-Decorator-pattern/exercises.ts
 *
 * Hướng dẫn: Điền mã nguồn vào các phần có đánh dấu // TODO.
 * Chạy file này bằng tsx hoặc ts-node để kiểm tra kết quả.
 * ============================================================================
 */

// ============================================================================
// BÀI TẬP 1: BỘ ĐỊNH DẠNG VĂN BẢN HTML (HTML TEXT FORMATTER)
// Đề bài: Sử dụng Decorator để bọc các thẻ định dạng HTML vào chuỗi văn bản gốc.
// ============================================================================

export interface TextComponent {
  format(): string;
}

// Concrete Component: Văn bản thuần túy
export class PlainText implements TextComponent {
  private text: string;

  constructor(text: string) {
    this.text = text;
  }

  public format(): string {
    // TODO: Trả về văn bản gốc
    return this.text;
  }
}

// Base Decorator
export abstract class TextDecorator implements TextComponent {
  protected component: TextComponent;

  constructor(component: TextComponent) {
    this.component = component;
  }

  public format(): string {
    return this.component.format();
  }
}

// Concrete Decorator 1: In đậm (Thẻ <b>)
export class BoldDecorator extends TextDecorator {
  public format(): string {
    // TODO: Bọc kết quả định dạng của component gốc trong cặp thẻ <b> và </b>
    return `<b>${this.component.format()}</b>`;
  }
}

// Concrete Decorator 2: In nghiêng (Thẻ <i>)
export class ItalicDecorator extends TextDecorator {
  public format(): string {
    // TODO: Bọc kết quả định dạng của component gốc trong cặp thẻ <i> và </i>
    return `<i>${this.component.format()}</i>`;
  }
}

// Concrete Decorator 3: Gạch chân (Thẻ <u>)
export class UnderlineDecorator extends TextDecorator {
  public format(): string {
    // TODO: Bọc kết quả định dạng của component gốc trong cặp thẻ <u> và </u>
    return `<u>${this.component.format()}</u>`;
  }
}

// ============================================================================
// BÀI TẬP 2: HỆ THỐNG GỬI THÔNG BÁO ĐA KÊNH (MULTI-CHANNEL NOTIFIER)
// Đề bài: Thiết kế hệ thống gửi thông báo đa kênh, cho phép ghi nhận các log gửi tin.
// ============================================================================

// Dùng chung một mảng toàn cục chứa log gửi tin để test kết quả
export const sendLogs: string[] = [];

export interface Notifier {
  send(message: string): void;
}

// Concrete Component: Gửi Email
export class EmailNotifier implements Notifier {
  public send(message: string): void {
    // TODO: Ghi vào sendLogs chuỗi log dạng: "✉️ Gửi Email với nội dung: {message}"
    sendLogs.push(`✉️ Gửi Email với nội dung: ${message}`);
  }
}

// Base Decorator
export abstract class NotifierDecorator implements Notifier {
  protected wrappee: Notifier;

  constructor(wrappee: Notifier) {
    this.wrappee = wrappee;
  }

  public send(message: string): void {
    this.wrappee.send(message);
  }
}

// Concrete Decorator 1: Gửi thêm SMS
export class SmsDecorator extends NotifierDecorator {
  public send(message: string): void {
    // TODO: Đầu tiên, gọi send() của đối tượng wrappee
    // Sau đó, ghi vào sendLogs chuỗi log dạng: "📱 Gửi SMS với nội dung: {message}"
    this.wrappee.send(message);
    sendLogs.push(`📱 Gửi SMS với nội dung: ${message}`);
  }
}

// Concrete Decorator 2: Gửi thêm Slack
export class SlackDecorator extends NotifierDecorator {
  public send(message: string): void {
    // TODO: Đầu tiên, gọi send() của đối tượng wrappee
    // Sau đó, ghi vào sendLogs chuỗi log dạng: "💬 Gửi Slack với nội dung: {message}"
    this.wrappee.send(message);
    sendLogs.push(`💬 Gửi Slack với nội dung: ${message}`);
  }
}

// ============================================================================
// CLIENT CODE (DÙNG ĐỂ CHẠY THỬ NGHIỆM)
// ============================================================================
async function runTests() {
  console.log("=== THỬ NGHIỆM BÀI TẬP 1 (TEXT FORMATTER) ===");
  try {
    const text = new PlainText("Xin chào");

    const boldText = new BoldDecorator(text);
    const italicBoldText = new ItalicDecorator(boldText);
    const underlineItalicBoldText = new UnderlineDecorator(italicBoldText);

    // Test 1.1: PlainText format
    const test1_1 = text.format() === "Xin chào";
    console.log(`  - Test 1.1: Định dạng Văn bản thuần -> [${test1_1 ? "OK" : "FAIL"}]`);
    console.log(`    + Thực tế: "${text.format()}" | Mong đợi: "Xin chào"`);

    // Test 1.2: Bold format
    const test1_2 = boldText.format() === "<b>Xin chào</b>";
    console.log(`  - Test 1.2: Định dạng In đậm -> [${test1_2 ? "OK" : "FAIL"}]`);
    console.log(`    + Thực tế: "${boldText.format()}" | Mong đợi: "<b>Xin chào</b>"`);

    // Test 1.3: Lồng nhiều lớp
    const actualNested = underlineItalicBoldText.format();
    const expectedNested = "<u><i><b>Xin chào</b></i></u>";
    const test1_3 = actualNested === expectedNested;
    console.log(`  - Test 1.3: Lồng 3 cấp định dạng -> [${test1_3 ? "OK" : "FAIL"}]`);
    console.log(`    + Thực tế: "${actualNested}"`);
    console.log(`    + Mong đợi: "${expectedNested}"`);

    if (test1_1 && test1_2 && test1_3) {
      console.log(
        "\x1b[32m  ✓ Thành công: HTML Text Formatter hoạt động chính xác.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Kết quả bọc thẻ HTML bị sai.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 1 chưa hoàn thiện:\x1b[0m", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 (MULTI-CHANNEL NOTIFIER) ===");
  try {
    // Reset log
    sendLogs.length = 0;

    const emailNotifier = new EmailNotifier();
    const emailAndSms = new SmsDecorator(emailNotifier);
    const emailSmsSlack = new SlackDecorator(emailAndSms);

    // Test gửi qua Email + SMS + Slack
    emailSmsSlack.send("Máy chủ sập!");

    const test2_1 = sendLogs.length === 3;
    console.log(`  - Test 2.1: Số lượng log gửi đi -> [${test2_1 ? "OK" : "FAIL"}]`);
    console.log(`    + Số lượng: ${sendLogs.length} | Mong đợi: 3`);

    const test2_2 = 
      sendLogs[0] === "✉️ Gửi Email với nội dung: Máy chủ sập!" &&
      sendLogs[1] === "📱 Gửi SMS với nội dung: Máy chủ sập!" &&
      sendLogs[2] === "💬 Gửi Slack với nội dung: Máy chủ sập!";
    console.log(`  - Test 2.2: Thứ tự ghi nhận log -> [${test2_2 ? "OK" : "FAIL"}]`);
    console.log(`    + Log thực tế:\n      ${sendLogs.join("\n      ")}`);

    if (test2_1 && test2_2) {
      console.log(
        "\x1b[32m  ✓ Thành công: Gửi thông báo đa kênh bằng Decorator hoạt động chính xác.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Nội dung hoặc thứ tự gửi thông báo bị sai.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 2 chưa hoàn thiện:\x1b[0m", message);
  }
}

runTests();
