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
    return `<h1>${text}</h1>`;
  }

  public renderParagraph(text: string): string {
    // TODO: Trả về chuỗi định dạng đoạn văn HTML: <p>text</p>
    return `<p>${text}</p>`;
  }

  public renderFooter(text: string): string {
    // TODO: Trả về chuỗi định dạng chân trang HTML: <footer>text</footer>
    return `<footer>${text}</footer>`;
  }
}

// Concrete Implementor 2: Bộ kết xuất Markdown
export class MarkdownEngine implements ExportEngine {
  public renderHeader(text: string): string {
    // TODO: Trả về chuỗi định dạng tiêu đề Markdown: # text
    return `# ${text}`;
  }

  public renderParagraph(text: string): string {
    // TODO: Trả về chuỗi định dạng đoạn văn Markdown (chỉ cần trả về text gốc)
    return text;
  }

  public renderFooter(text: string): string {
    // TODO: Trả về chuỗi định dạng chân trang Markdown đặt trong dấu sao: * text *
    return `* ${text} *`;
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
    return (
      this.engine.renderHeader(this.title) +
      "\n" +
      this.engine.renderParagraph(this.content)
    );
  }
}

// Refined Abstraction 2: Tài liệu chi tiết có footer
export class DetailedDocument extends Document {
  public footerText: string;

  constructor(
    title: string,
    content: string,
    footerText: string,
    engine: ExportEngine,
  ) {
    super(title, content, engine);
    this.footerText = footerText;
  }

  public export(): string {
    // TODO: Sử dụng engine để render Header cho tiêu đề, Paragraph cho nội dung, và Footer cho footerText.
    // Kết nối các phần với nhau bằng dấu xuống dòng "\n".
    return (
      this.engine.renderHeader(this.title) +
      "\n" +
      this.engine.renderParagraph(this.content) +
      "\n" +
      this.engine.renderFooter(this.footerText)
    );
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
      { id: 2, name: "Bob", email: "bob@postgres.com" },
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
    if (!this.driver.isConnected()) {
      this.driver.connect();
    }
    return this.driver.execute("SELECT * FROM users");
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
  public getColor(): string {
    return "Blue";
  }
  public getBackgroundColor(): string {
    return "White";
  }
  public getBorderRadius(): number {
    return 4;
  }
}

export class DarkTheme implements Theme {
  public getColor(): string {
    return "Yellow";
  }
  public getBackgroundColor(): string {
    return "Charcoal";
  }
  public getBorderRadius(): number {
    return 8;
  }
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
    return `[Button] ${this.label} | Color: ${this.theme.getColor()} | Border: ${this.theme.getBorderRadius()}px`;
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
    return `[TextBox] ${this.placeholder} | Background: ${this.theme.getBackgroundColor()} | Border: ${this.theme.getBorderRadius()}px`;
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

    const simpleDocHtml = new SimpleDocument(
      "Báo cáo tháng 6",
      "Mọi thứ diễn ra rất tốt.",
      htmlEngine,
    );
    const detailedDocMd = new DetailedDocument(
      "Dự án Alpha",
      "Giai đoạn thiết kế hệ thống đã hoàn thành.",
      "Bản quyền thuộc về công ty",
      markdownEngine,
    );

    const actualHtml = simpleDocHtml.export();
    const expectedHtml = "<h1>Báo cáo tháng 6</h1>\n<p>Mọi thứ diễn ra rất tốt.</p>";
    const test1_1 = actualHtml === expectedHtml;
    console.log(`  - Test 1.1: SimpleDocument HTML -> [${test1_1 ? "OK" : "FAIL"}]`);
    console.log(`    + Thực tế: ${JSON.stringify(actualHtml)}`);
    console.log(`    + Mong đợi: ${JSON.stringify(expectedHtml)}`);

    const actualMd = detailedDocMd.export();
    const expectedMd = "# Dự án Alpha\nGiai đoạn thiết kế hệ thống đã hoàn thành.\n* Bản quyền thuộc về công ty *";
    const test1_2 = actualMd === expectedMd;
    console.log(`  - Test 1.2: DetailedDocument Markdown -> [${test1_2 ? "OK" : "FAIL"}]`);
    console.log(`    + Thực tế: ${JSON.stringify(actualMd)}`);
    console.log(`    + Mong đợi: ${JSON.stringify(expectedMd)}`);

    if (test1_1 && test1_2) {
      console.log(
        "\x1b[32m  ✓ Thành công: Document Exporter xuất bản HTML và Markdown chính xác.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Định dạng xuất bản của tài liệu không đúng chuẩn.\x1b[0m",
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

    const isPostgresConnected = postgresDriver.isConnected();
    const isInMemoryConnected = inMemoryDriver.isConnected();
    const test2_1 = isPostgresConnected && isInMemoryConnected;
    console.log(`  - Test 2.1: Trạng thái kết nối -> [${test2_1 ? "OK" : "FAIL"}]`);
    console.log(`    + Postgres connected: ${isPostgresConnected} | In-Memory connected: ${isInMemoryConnected}`);

    const test2_2 = users1.length === 2 && users1[0].name === "Alice";
    console.log(`  - Test 2.2: Dữ liệu Postgres -> [${test2_2 ? "OK" : "FAIL"}]`);
    console.log(`    + Thực tế: ${users1.length} users, user đầu: "${users1[0]?.name}" | Mong đợi: 2 users, user đầu: "Alice"`);

    const test2_3 = users2.length === 1 && users2[0].name === "David";
    console.log(`  - Test 2.3: Dữ liệu In-Memory -> [${test2_3 ? "OK" : "FAIL"}]`);
    console.log(`    + Thực tế: ${users2.length} users, user đầu: "${users2[0]?.name}" | Mong đợi: 1 user, user đầu: "David"`);

    if (test2_1 && test2_2 && test2_3) {
      console.log(
        "\x1b[32m  ✓ Thành công: UserRepository kết nối và lấy dữ liệu thành công từ cả 2 driver.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Dữ liệu trả về từ các driver không đúng hoặc driver chưa được kết nối.\x1b[0m",
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

    const actualLightBtn = lightBtn.render();
    const expectedLightBtn = "[Button] Đăng nhập | Color: Blue | Border: 4px";
    const test3_1 = actualLightBtn === expectedLightBtn;
    console.log(`  - Test 3.1: Light Button render -> [${test3_1 ? "OK" : "FAIL"}]`);
    console.log(`    + Thực tế: "${actualLightBtn}"`);
    console.log(`    + Mong đợi: "${expectedLightBtn}"`);

    const actualDarkBtn = darkBtn.render();
    const expectedDarkBtn = "[Button] Xóa tài khoản | Color: Yellow | Border: 8px";
    const test3_2 = actualDarkBtn === expectedDarkBtn;
    console.log(`  - Test 3.2: Dark Button render -> [${test3_2 ? "OK" : "FAIL"}]`);
    console.log(`    + Thực tế: "${actualDarkBtn}"`);
    console.log(`    + Mong đợi: "${expectedDarkBtn}"`);

    const actualLightText = lightText.render();
    const expectedLightText = "[TextBox] Nhập email... | Background: White | Border: 4px";
    const test3_3 = actualLightText === expectedLightText;
    console.log(`  - Test 3.3: Light TextBox render -> [${test3_3 ? "OK" : "FAIL"}]`);
    console.log(`    + Thực tế: "${actualLightText}"`);
    console.log(`    + Mong đợi: "${expectedLightText}"`);

    const actualDarkText = darkText.render();
    const expectedDarkText = "[TextBox] Mật khẩu... | Background: Charcoal | Border: 8px";
    const test3_4 = actualDarkText === expectedDarkText;
    console.log(`  - Test 3.4: Dark TextBox render -> [${test3_4 ? "OK" : "FAIL"}]`);
    console.log(`    + Thực tế: "${actualDarkText}"`);
    console.log(`    + Mong đợi: "${expectedDarkText}"`);

    if (test3_1 && test3_2 && test3_3 && test3_4) {
      console.log(
        "\x1b[32m  ✓ Thành công: Các Widget hiển thị đúng theo Theme được liên kết qua Bridge.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Nội dung hoặc định dạng hiển thị của Widget bị sai.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 3 chưa hoàn thiện:\x1b[0m", message);
  }
}

runTests();
