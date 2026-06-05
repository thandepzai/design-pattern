/**
 * ============================================================================
 * BÀI TẬP THỰC HÀNH: BUILDER PATTERN
 * Thư mục: 04-C-Builder-pattern/exercises.ts
 *
 * Hướng dẫn: Điền mã nguồn vào các phần có đánh dấu // TODO.
 * Chạy file này bằng tsx hoặc ts-node để kiểm tra kết quả.
 * ============================================================================
 */

// ============================================================================
// BÀI TẬP 1: BỘ CẤU HÌNH LẮP RÁP MÁY TÍNH (COMPUTER CONFIGURATOR)
// Đề bài: Lắp ráp các linh kiện PC thông qua ComputerBuilder.
// Ràng buộc: Bắt buộc phải có CPU, RAM, PSU khi build.
// ============================================================================

export class Computer {
  public readonly cpu: string;
  public readonly ram: string;
  public readonly storage: string;
  public readonly gpu?: string;
  public readonly psu: string;
  public readonly coolingSystem?: string;

  constructor(builder: ComputerBuilder) {
    this.cpu = builder.cpu;
    this.ram = builder.ram;
    this.storage = builder.storage;
    this.gpu = builder.gpu;
    this.psu = builder.psu;
    this.coolingSystem = builder.coolingSystem;
  }

  public toString(): string {
    return (
      `PC Specs: [CPU: ${this.cpu}] [RAM: ${this.ram}] [Storage: ${this.storage}] ` +
      `[GPU: ${this.gpu || "Onboard"}] [PSU: ${this.psu}] [Cooling: ${this.coolingSystem || "Stock Air"}]`
    );
  }
}

export class ComputerBuilder {
  public cpu!: string;
  public ram!: string;
  public storage!: string;
  public gpu?: string;
  public psu!: string;
  public coolingSystem?: string;

  public setCpu(cpu: string): this {
    // TODO: Gán cpu và trả về this
    this.cpu = cpu;
    return this;
  }

  public setRam(ram: string): this {
    // TODO: Gán ram và trả về this
    this.ram = ram;
    return this;
  }

  public setStorage(storage: string): this {
    // TODO: Gán storage và trả về this
    this.storage = storage;
    return this;
  }

  public setGpu(gpu: string): this {
    // TODO: Gán gpu và trả về this
    this.gpu = gpu;
    return this;
  }

  public setPsu(psu: string): this {
    // TODO: Gán psu và trả về this
    this.psu = psu;
    return this;
  }

  public setCoolingSystem(coolingSystem: string): this {
    // TODO: Gán coolingSystem và trả về this
    this.coolingSystem = coolingSystem;
    return this;
  }

  public build(): Computer {
    // TODO: Kiểm tra ràng buộc bắt buộc (cpu, ram, psu phải có giá trị). Nếu thiếu ném ra Error.
    // Nếu hợp lệ, trả về đối tượng Computer mới tạo từ builder này.
    if (!this.cpu) throw new Error("Thiếu linh kiện bắt buộc: CPU");
    if (!this.ram) throw new Error("Thiếu linh kiện bắt buộc: RAM");
    if (!this.psu) throw new Error("Thiếu linh kiện bắt buộc: PSU");
    if (!this.storage) throw new Error("Thiếu linh kiện bắt buộc: Storage");

    return new Computer(this);
  }
}

// ============================================================================
// BÀI TẬP 2: BỘ DỰNG GÓI TIN HTTP REQUEST (IMMUTABLE HTTP REQUEST BUILDER)
// Đề bài: Dựng đối tượng HttpRequest bất biến.
// Ràng buộc:
// 1. Method mặc định là GET.
// 2. URL phải bắt đầu bằng http:// hoặc https://.
// 3. GET và DELETE không được phép đính kèm Body.
// ============================================================================

export class HttpRequest {
  public readonly url: string;
  public readonly method: string;
  public readonly headers: Record<string, string>;
  public readonly queryParams: Record<string, string>;
  public readonly body: string | null;

  constructor(builder: HttpRequestBuilder) {
    this.url = builder.url;
    this.method = builder.method;
    this.headers = { ...builder.headers };
    this.queryParams = { ...builder.queryParams };
    this.body = builder.body;
  }

  public send(): void {
    console.log(
      `[HTTP Client] Gửi yêu cầu ${this.method.toUpperCase()} tới: ${this.url}`,
    );
    if (Object.keys(this.queryParams).length > 0) {
      console.log(`  Query Params: ${JSON.stringify(this.queryParams)}`);
    }
    if (Object.keys(this.headers).length > 0) {
      console.log(`  Headers: ${JSON.stringify(this.headers)}`);
    }
    if (this.body) {
      console.log(`  Body Payload: ${this.body}`);
    }
  }
}

export class HttpRequestBuilder {
  public url!: string;
  public method: string = "GET"; // Mặc định là GET
  public headers: Record<string, string> = {};
  public queryParams: Record<string, string> = {};
  public body: string | null = null;

  public setUrl(url: string): this {
    // TODO: Gán url và trả về this
    this.url = url;
    return this;
  }

  public setMethod(method: string): this {
    // TODO: Gán method (in hoa để đồng nhất) và trả về this
    this.method = method.toUpperCase();
    return this;
  }

  public addHeader(key: string, value: string): this {
    // TODO: Thêm key-value vào headers và trả về this
    this.headers[key] = value;
    return this;
  }

  public addQueryParam(key: string, value: string): this {
    // TODO: Thêm key-value vào queryParams và trả về this
    this.queryParams[key] = value;
    return this;
  }

  public setBody(body: string): this {
    // TODO: Gán body và trả về this
    this.body = body;
    return this;
  }

  public build(): HttpRequest {
    // TODO: Kiểm tra các ràng buộc nghiệp vụ:
    // 1. URL bắt buộc phải có và phải bắt đầu bằng 'http://' hoặc 'https://'.
    // 2. Nếu method là GET hoặc DELETE thì body phải là null (nếu có body thì quăng lỗi).
    // Nếu hợp lệ, trả về đối tượng HttpRequest mới.
    if (!this.url) {
      throw new Error("Yêu cầu URL không được để trống.");
    }
    if (!this.url.startsWith("http://") && !this.url.startsWith("https://")) {
      throw new Error(
        "URL không hợp lệ. Phải bắt đầu bằng http:// hoặc https://",
      );
    }
    if (
      (this.method === "GET" || this.method === "DELETE") &&
      this.body !== null
    ) {
      throw new Error(
        `Phương thức ${this.method} không được phép gửi kèm Body payload.`,
      );
    }

    return new HttpRequest(this);
  }
}

// ============================================================================
// BÀI TẬP 3: TRÌNH TẠO TÀI LIỆU MARKDOWN TỰ ĐỘNG KẾT HỢP DIRECTOR (MARKDOWN BUILDER)
// Đề bài: Xây dựng tài liệu Markdown qua Builder & quản lý biểu mẫu bằng Director.
// ============================================================================

export class MarkdownDocument {
  private lines: string[] = [];

  public addLine(line: string): void {
    this.lines.push(line);
  }

  public getContent(): string {
    return this.lines.join("\n");
  }

  public reset(): void {
    this.lines = [];
  }
}

export class MarkdownDocumentBuilder {
  private document: MarkdownDocument = new MarkdownDocument();

  public addHeader(level: number, text: string): this {
    // TODO: Tạo định dạng tiêu đề Markdown (ví dụ level 1: '# text', level 2: '## text')
    // Thêm dòng đó vào document và trả về this.
    const hashes = "#".repeat(level);
    this.document.addLine(`${hashes} ${text}`);
    return this;
  }

  public addParagraph(text: string): this {
    // TODO: Thêm một đoạn văn bản vào document và trả về this
    this.document.addLine(text);
    return this;
  }

  public addCodeBlock(code: string, language: string): this {
    // TODO: Thêm khối mã code bọc trong ba dấu nháy ``` cùng ngôn ngữ và trả về this
    this.document.addLine(`\`\`\`${language}\n${code}\n\`\`\``);
    return this;
  }

  public addBulletPoints(items: string[]): this {
    // TODO: Duyệt qua mảng items, mỗi item viết dạng `- item` và thêm vào document, trả về this
    items.forEach((item) => {
      this.document.addLine(`- ${item}`);
    });
    return this;
  }

  public build(): MarkdownDocument {
    // TODO: Lưu document hiện tại để trả về, đồng thời khởi tạo document mới (reset builder) rồi trả về bản cũ.
    const completedDoc = this.document;
    this.document = new MarkdownDocument();
    return completedDoc;
  }
}

export class DocumentDirector {
  public constructReadme(
    builder: MarkdownDocumentBuilder,
    projectName: string,
    description: string,
  ): void {
    // TODO: Dựng tài liệu README theo luồng:
    // 1. Header 1: Tên dự án
    // 2. Paragraph: Mô tả dự án
    // 3. Header 2: "Cài đặt"
    // 4. CodeBlock: hướng dẫn cài đặt "npm install\nnpm run dev" bằng shell
    builder
      .addHeader(1, projectName)
      .addParagraph(description)
      .addHeader(2, "Cài đặt")
      .addCodeBlock("npm install\nnpm run dev", "bash");
  }

  public constructReleaseNotes(
    builder: MarkdownDocumentBuilder,
    version: string,
    features: string[],
  ): void {
    // TODO: Dựng tài liệu RELEASE NOTES theo luồng:
    // 1. Header 1: "Bản phát hành [version]"
    // 2. Paragraph: "Danh sách tính năng mới:"
    // 3. BulletPoints: danh sách tính năng (features)
    builder
      .addHeader(1, `Bản phát hành ${version}`)
      .addParagraph("Danh sách tính năng mới:")
      .addBulletPoints(features);
  }
}

// ============================================================================
// CLIENT CODE (DÙNG ĐỂ CHẠY THỬ NGHIỆM SAU KHI ĐÃ HOÀN THÀNH TODO)
// ============================================================================
async function runTests() {
  console.log("=== THỬ NGHIỆM BÀI TẬP 1 ===");
  try {
    // 1. Dựng máy Gaming cao cấp
    const gamingPC = new ComputerBuilder()
      .setCpu("AMD Ryzen 7 7800X3D")
      .setRam("32GB DDR5")
      .setStorage("2TB NVMe SSD")
      .setGpu("Radeon RX 7900 XTX")
      .setPsu("850W Gold")
      .setCoolingSystem("360mm AIO Liquid Cooler")
      .build();
    console.log("Gaming PC:", gamingPC.toString());

    // 2. Dựng máy Văn phòng tối giản
    const officePC = new ComputerBuilder()
      .setCpu("Intel Core i3-12100")
      .setRam("8GB DDR4")
      .setStorage("256GB SSD")
      .setPsu("450W")
      .build();
    console.log("Office PC:", officePC.toString());

    // 3. Test lỗi thiếu RAM
    new ComputerBuilder().setCpu("Intel i5").setPsu("500W").build();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("Lỗi lắp ráp máy tính dự kiến:", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 ===");
  try {
    // 1. Request GET thành công
    const getRequest = new HttpRequestBuilder()
      .setUrl("https://api.github.com/users/octocat")
      .addHeader("Accept", "application/vnd.github+json")
      .addQueryParam("page", "1")
      .build();
    getRequest.send();

    // 2. Request POST thành công có Body
    const postRequest = new HttpRequestBuilder()
      .setUrl("http://localhost:3000/api/users")
      .setMethod("POST")
      .addHeader("Content-Type", "application/json")
      .setBody(JSON.stringify({ name: "Bob", age: 30 }))
      .build();
    postRequest.send();

    // 3. Thử nghiệm lỗi GET đính kèm body
    new HttpRequestBuilder()
      .setUrl("https://google.com")
      .setMethod("GET")
      .setBody("test payload")
      .build();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("Lỗi HTTP Request dự kiến:", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 3 ===");
  try {
    const builder = new MarkdownDocumentBuilder();
    const director = new DocumentDirector();

    // 1. Tạo README
    director.constructReadme(
      builder,
      "Antigravity Project",
      "Hệ thống AI tự động hóa lập trình.",
    );
    const readmeDoc = builder.build();
    console.log(">>> NỘI DUNG FILE README.md:");
    console.log(readmeDoc.getContent());

    console.log("\n--------------------------------------------------");

    // 2. Tạo Release Notes
    director.constructReleaseNotes(builder, "v1.5.0", [
      "Bổ sung mẫu thiết kế Builder Pattern.",
      "Tối ưu hóa thời gian thực thi mã TypeScript.",
      "Sửa lỗi kết nối Database Cluster.",
    ]);
    const releaseNotesDoc = builder.build();
    console.log(">>> NỘI DUNG FILE RELEASE_NOTES.md:");
    console.log(releaseNotesDoc.getContent());
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("Bài tập 3 chưa hoàn thiện:", message);
  }
}

// Bỏ comment dòng dưới để chạy thử khi bạn đã code xong các phần TODO
runTests();
