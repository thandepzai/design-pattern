/**
 * ============================================================================
 * BÀI TẬP THỰC HÀNH: BRIDGE PATTERN
 * Thư mục: 07-S-Bridge-pattern/exercises.ts
 *
 * Hướng dẫn: Điền mã nguồn vào các phần có đánh dấu // TODO.
 * Chạy file này bằng tsx hoặc ts-node để kiểm tra kết quả.
 * ============================================================================
 */

// ============================================================================
// BÀI TẬP 1: BỘ XUẤT BẢN TÀI LIỆU (DOCUMENT EXPORTER)
// Đề bài: Tách biệt cấu trúc tài liệu (Abstraction) và công cụ kết xuất định dạng (Implementation).
// ============================================================================

export interface ExportEngine {
  renderHeader(text: string): string;
  renderParagraph(text: string): string;
  renderFooter(text: string): string;
}

// Concrete Implementor 1: Bộ kết xuất HTML
export class HtmlEngine implements ExportEngine {
  public renderHeader(text: string): string {
    // TODO: Trả về chuỗi định dạng tiêu đề HTML: <h1>text</h1>
    throw new Error("Chưa triển khai");
  }

  public renderParagraph(text: string): string {
    // TODO: Trả về chuỗi định dạng đoạn văn HTML: <p>text</p>
    throw new Error("Chưa triển khai");
  }

  public renderFooter(text: string): string {
    // TODO: Trả về chuỗi định dạng chân trang HTML: <footer>text</footer>
    throw new Error("Chưa triển khai");
  }
}

// Concrete Implementor 2: Bộ kết xuất Markdown
export class MarkdownEngine implements ExportEngine {
  public renderHeader(text: string): string {
    // TODO: Trả về chuỗi định dạng tiêu đề Markdown: # text
    throw new Error("Chưa triển khai");
  }

  public renderParagraph(text: string): string {
    // TODO: Trả về chuỗi định dạng đoạn văn Markdown (chỉ cần trả về text gốc)
    throw new Error("Chưa triển khai");
  }

  public renderFooter(text: string): string {
    // TODO: Trả về chuỗi định dạng chân trang Markdown đặt trong dấu sao: * text *
    throw new Error("Chưa triển khai");
  }
}

// Abstraction
export abstract class Document {
  protected engine: ExportEngine;
  public title: string;
  public content: string;

  constructor(title: string, content: string, engine: ExportEngine) {
    this.title = title;
    this.content = content;
    this.engine = engine;
  }

  public abstract export(): string;
}

// Refined Abstraction 1: Tài liệu cơ bản
export class SimpleDocument extends Document {
  public export(): string {
    // TODO: Sử dụng engine để render Header cho tiêu đề và Paragraph cho nội dung.
    // Kết nối các phần với nhau bằng dấu xuống dòng "\n".
    throw new Error("Chưa triển khai");
  }
}

// Refined Abstraction 2: Tài liệu chi tiết có footer
export class DetailedDocument extends Document {
  public footerText: string;

  constructor(title: string, content: string, footerText: string, engine: ExportEngine) {
    super(title, content, engine);
    this.footerText = footerText;
  }

  public export(): string {
    // TODO: Sử dụng engine để render Header cho tiêu đề, Paragraph cho nội dung, và Footer cho footerText.
    // Kết nối các phần với nhau bằng dấu xuống dòng "\n".
    throw new Error("Chưa triển khai");
  }
}

// ============================================================================
// BÀI TẬP 2: TÁCH BIỆT LOGIC NGHIỆP VỤ KHỎI HỆ CƠ SỞ DỮ LIỆU (DATABASE DRIVER BRIDGE)
// Đề bài: Xây dựng Repository nghiệp vụ độc lập hoàn toàn với Driver CSDL cụ thể.
// ============================================================================

export interface DatabaseDriver {
  connect(): void;
  execute(query: string): any[];
  isConnected(): boolean;
}

// Concrete Implementor 1: Postgres Driver giả lập
export class PostgresDriver implements DatabaseDriver {
  private connected: boolean = false;

  public connect(): void {
    this.connected = true;
  }

  public isConnected(): boolean {
    return this.connected;
  }

  public execute(query: string): any[] {
    if (!this.connected) throw new Error("Chưa kết nối CSDL!");
    // Giả lập kết quả trả về từ DB
    return [
      { id: 1, name: "Alice", email: "alice@postgres.com" },
      { id: 2, name: "Bob", email: "bob@postgres.com" }
    ];
  }
}

// Concrete Implementor 2: In-Memory Driver giả lập
export class InMemoryDriver implements DatabaseDriver {
  private connected: boolean = false;
  private localDb: any[] = [];

  constructor(initialData: any[]) {
    this.localDb = initialData;
  }

  public connect(): void {
    this.connected = true;
  }

  public isConnected(): boolean {
    return this.connected;
  }

  public execute(query: string): any[] {
    if (!this.connected) throw new Error("Chưa kết nối CSDL!");
    return this.localDb;
  }
}

// Abstraction
export class UserRepository {
  protected driver: DatabaseDriver; // Cầu nối

  constructor(driver: DatabaseDriver) {
    this.driver = driver;
  }

  public getUsers(): any[] {
    // TODO: Thực hiện kết nối tới database thông qua driver.
    // Sau đó chạy câu truy vấn giả lập "SELECT * FROM users" bằng driver.execute(query)
    // và trả về kết quả.
    throw new Error("Chưa triển khai");
  }
}

// ============================================================================
// BÀI TẬP 3: BỘ HIỂN THỊ LINH KIỆN UI THEO CHỦ ĐỀ GIAO DIỆN (UI WIDGET & THEME RENDERER)
// Đề bài: Liên kết các widget UI với cấu hình Theme màu sắc khác nhau.
// ============================================================================

export interface Theme {
  getColor(): string;
  getBackgroundColor(): string;
  getBorderRadius(): number;
}

// Concrete Implementors cho Theme
export class LightTheme implements Theme {
  public getColor(): string { return "Blue"; }
  public getBackgroundColor(): string { return "White"; }
  public getBorderRadius(): number { return 4; }
}

export class DarkTheme implements Theme {
  public getColor(): string { return "Yellow"; }
  public getBackgroundColor(): string { return "Charcoal"; }
  public getBorderRadius(): number { return 8; }
}

// Abstraction cho UI Widget
export abstract class Widget {
  protected theme: Theme; // Cầu nối (Bridge)

  constructor(theme: Theme) {
    this.theme = theme;
  }

  public abstract render(): string;
}

// Refined Abstraction 1: Nút bấm
export class Button extends Widget {
  private label: string;

  constructor(label: string, theme: Theme) {
    super(theme);
    this.label = label;
  }

  public render(): string {
    // TODO: Trả về chuỗi kết xuất nút bấm theo định dạng:
    // "[Button] {label} | Color: {themeColor} | Border: {themeBorderRadius}px"
    throw new Error("Chưa triển khai");
  }
}

// Refined Abstraction 2: Hộp nhập liệu
export class TextBox extends Widget {
  private placeholder: string;

  constructor(placeholder: string, theme: Theme) {
    super(theme);
    this.placeholder = placeholder;
  }

  public render(): string {
    // TODO: Trả về chuỗi kết xuất textbox theo định dạng:
    // "[TextBox] {placeholder} | Background: {themeBgColor} | Border: {themeBorderRadius}px"
    throw new Error("Chưa triển khai");
  }
}

// ============================================================================
// CLIENT CODE (DÙNG ĐỂ CHẠY THỬ NGHIỆM)
// ============================================================================
async function runTests() {
  console.log("=== THỬ NGHIỆM BÀI TẬP 1 ===");
  try {
    const htmlEngine = new HtmlEngine();
    const markdownEngine = new MarkdownEngine();

    const simpleDocHtml = new SimpleDocument("Báo cáo tháng 6", "Mọi thứ diễn ra rất tốt.", htmlEngine);
    const detailedDocMd = new DetailedDocument(
      "Dự án Alpha", 
      "Giai đoạn thiết kế hệ thống đã hoàn thành.", 
      "Bản quyền thuộc về công ty", 
      markdownEngine
    );

    const test1_1 = simpleDocHtml.export() === "<h1>Báo cáo tháng 6</h1>\n<p>Mọi thứ diễn ra rất tốt.</p>";
    const test1_2 = detailedDocMd.export() === "# Dự án Alpha\nGiai đoạn thiết kế hệ thống đã hoàn thành.\n* Bản quyền thuộc về công ty *";

    if (test1_1 && test1_2) {
      console.log(
        "\x1b[32m  ✓ Thành công: Document Exporter xuất bản HTML và Markdown chính xác.\x1b[0m"
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Định dạng xuất bản của tài liệu không đúng chuẩn.\x1b[0m"
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 1 chưa hoàn thiện:\x1b[0m", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 ===");
  try {
    const postgresDriver = new PostgresDriver();
    const testData = [{ id: 100, name: "David", email: "david@test.com" }];
    const inMemoryDriver = new InMemoryDriver(testData);

    const repo1 = new UserRepository(postgresDriver);
    const repo2 = new UserRepository(inMemoryDriver);

    const users1 = repo1.getUsers();
    const users2 = repo2.getUsers();

    const test2_1 = postgresDriver.isConnected() && inMemoryDriver.isConnected();
    const test2_2 = users1.length === 2 && users1[0].name === "Alice";
    const test2_3 = users2.length === 1 && users2[0].name === "David";

    if (test2_1 && test2_2 && test2_3) {
      console.log(
        "\x1b[32m  ✓ Thành công: UserRepository kết nối và lấy dữ liệu thành công từ cả 2 driver.\x1b[0m"
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Dữ liệu trả về từ các driver không đúng hoặc driver chưa được kết nối.\x1b[0m"
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 2 chưa hoàn thiện:\x1b[0m", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 3 ===");
  try {
    const light = new LightTheme();
    const dark = new DarkTheme();

    const lightBtn = new Button("Đăng nhập", light);
    const darkBtn = new Button("Xóa tài khoản", dark);
    const lightText = new TextBox("Nhập email...", light);
    const darkText = new TextBox("Mật khẩu...", dark);

    const test3_1 = lightBtn.render() === "[Button] Đăng nhập | Color: Blue | Border: 4px";
    const test3_2 = darkBtn.render() === "[Button] Xóa tài khoản | Color: Yellow | Border: 8px";
    const test3_3 = lightText.render() === "[TextBox] Nhập email... | Background: White | Border: 4px";
    const test3_4 = darkText.render() === "[TextBox] Mật khẩu... | Background: Charcoal | Border: 8px";

    if (test3_1 && test3_2 && test3_3 && test3_4) {
      console.log(
        "\x1b[32m  ✓ Thành công: Các Widget hiển thị đúng theo Theme được liên kết qua Bridge.\x1b[0m"
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Nội dung hoặc định dạng hiển thị của Widget bị sai.\x1b[0m"
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 3 chưa hoàn thiện:\x1b[0m", message);
  }
}

runTests();
