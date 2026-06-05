/**
 * ============================================================================
 * BÀI TẬP THỰC HÀNH: FACTORY METHOD PATTERN
 * Thư mục: 02-C-FactoryMethod-pattern/exercises.ts
 *
 * Hướng dẫn: Điền mã nguồn vào các phần có đánh dấu // TODO.
 * Chạy file này bằng ts-node hoặc compiler tương ứng để kiểm tra kết quả.
 * ============================================================================
 */

// ============================================================================
// BÀI TẬP 1: HỆ THỐNG XUẤT BÁO CÁO (DOCUMENT EXPORTER)
// Đề bài: Xây dựng hệ thống xuất dữ liệu báo cáo sang các định dạng PDF, Excel, CSV.
// ============================================================================

// 1. Product Interface
export interface DocumentExporter {
  export(data: unknown): void;
}

// 2. Concrete Products (TODO)
export class PdfExporter implements DocumentExporter {
  public export(data: unknown): void {
    // TODO: In ra console thông tin xuất file PDF dạng: `[PDF] Đang xuất báo cáo dạng PDF với dữ liệu: [dữ liệu]`
    console.log(
      `[PDF] Đang xuất báo cáo dạng PDF với dữ liệu: ${JSON.stringify(data)}`,
    );
  }
}

export class ExcelExporter implements DocumentExporter {
  public export(data: unknown): void {
    // TODO: In ra console thông tin xuất file Excel dạng: `[Excel] Đang xuất báo cáo dạng Excel với dữ liệu: [dữ liệu]`
    console.log(
      `[Excel] Đang xuất báo cáo dạng Excel với dữ liệu: ${JSON.stringify(data)}`,
    );
  }
}

export class CsvExporter implements DocumentExporter {
  public export(data: unknown): void {
    // TODO: In ra console thông tin xuất file CSV dạng: `[CSV] Đang xuất báo cáo dạng CSV với dữ liệu: [dữ liệu]`
    console.log(
      `[CSV] Đang xuất báo cáo dạng CSV với dữ liệu: ${JSON.stringify(data)}`,
    );
  }
}

// 3. Creator Class
export abstract class ReportGenerator {
  // Factory Method
  protected abstract createExporter(): DocumentExporter;

  // Business Logic
  public generateReport(data: unknown): void {
    console.log(`[Hệ thống] Bắt đầu chuẩn bị dữ liệu xuất báo cáo...`);
    // TODO: Khởi tạo exporter thông qua Factory Method và gọi hàm export với dữ liệu truyền vào
    const exporter = this.createExporter();
    exporter.export(data);
    console.log(`[Hệ thống] Xuất báo cáo hoàn tất!\n`);
  }
}

// 4. Concrete Creators (TODO)
export class PdfReportGenerator extends ReportGenerator {
  protected createExporter(): DocumentExporter {
    // TODO: Trả về đối tượng PdfExporter tương ứng
    return new PdfExporter();
  }
}

export class ExcelReportGenerator extends ReportGenerator {
  protected createExporter(): DocumentExporter {
    // TODO: Trả về đối tượng ExcelExporter tương ứng
    return new ExcelExporter();
  }
}

export class CsvReportGenerator extends ReportGenerator {
  protected createExporter(): DocumentExporter {
    // TODO: Trả về đối tượng CsvExporter tương ứng
    return new CsvExporter();
  }
}

// ============================================================================
// BÀI TẬP 2: HỆ THỐNG GỬI THÔNG BÁO ĐA KÊNH (NOTIFICATION HUB)
// Đề bài: Hệ thống gửi OTP/khuyến mãi qua Email, SMS, Push.
// Ràng buộc: SMS tối đa 160 kí tự, Push tối đa 200 kí tự, Email tối đa 1000 kí tự.
// ============================================================================

// 1. Product Interface
export interface NotificationSender {
  send(recipient: string, message: string): Promise<boolean>;
}

// 2. Concrete Products (TODO)
export class EmailSender implements NotificationSender {
  public async send(recipient: string, message: string): Promise<boolean> {
    // Ràng buộc: Email tối đa 1000 ký tự
    // TODO: Kiểm tra độ dài tin nhắn. Nếu hợp lệ, in log gửi email thành công và trả về true. Ngược lại trả về false.
    if (message.length > 1000) return false;

    console.log(
      `[Email] Đang gửi email đến ${recipient} với nội dung: ${message}`,
    );
    return true;
  }
}

export class SmsSender implements NotificationSender {
  public async send(recipient: string, message: string): Promise<boolean> {
    // Ràng buộc: SMS tối đa 160 ký tự
    // TODO: Kiểm tra độ dài tin nhắn. Nếu hợp lệ, in log gửi SMS thành công và trả về true. Ngược lại trả về false.
    if (message.length > 160) return false;

    console.log(`[SMS] Đang gửi SMS đến ${recipient} với nội dung: ${message}`);
    return true;
  }
}

export class PushSender implements NotificationSender {
  public async send(recipient: string, message: string): Promise<boolean> {
    // Ràng buộc: Push tối đa 200 ký tự
    // TODO: Kiểm tra độ dài tin nhắn. Nếu hợp lệ, in log gửi Push thành công và trả về true. Ngược lại trả về false.
    if (message.length > 200) return false;

    console.log(
      `[Push] Đang gửi Push đến ${recipient} với nội dung: ${message}`,
    );
    return true;
  }
}

// 3. Creator Class
export abstract class NotificationService {
  // Factory Method
  protected abstract createSender(): NotificationSender;

  // Business Logic
  public async dispatchNotification(
    recipient: string,
    message: string,
  ): Promise<void> {
    console.log(`[Notification Service] Đang xử lý yêu cầu gửi tin nhắn...`);
    // TODO:
    // 1. Khởi tạo sender tương ứng thông qua Factory Method.
    // 2. Gọi hàm send và kiểm tra kết quả (Thành công/Thất bại).
    // 3. In log thông báo chi tiết kết quả kèm mốc thời gian (timestamp).
    const sender = this.createSender();
    const result = await sender.send(recipient, message);
    console.log(
      `[Notification Service] Kết quả gửi tin nhắn đến ${recipient}: ${result} tại ${new Date().toISOString()}`,
    );
  }
}

// 4. Concrete Creators (TODO)
export class EmailNotificationService extends NotificationService {
  protected createSender(): NotificationSender {
    // TODO: Trả về đối tượng EmailSender
    return new EmailSender();
  }
}

export class SmsNotificationService extends NotificationService {
  protected createSender(): NotificationSender {
    // TODO: Trả về đối tượng SmsSender
    return new SmsSender();
  }
}

export class PushNotificationService extends NotificationService {
  protected createSender(): NotificationSender {
    // TODO: Trả về đối tượng PushSender
    return new PushSender();
  }
}

// ============================================================================
// BÀI TẬP 3: BỘ QUẢN LÝ KẾT NỐI DATABASE (DATABASE CONNECTION MANAGER)
// Đề bài: Kết nối đến các database khác nhau dựa trên môi trường phát triển (Postgres, Mongo, SQLite).
// Yêu cầu: Đảm bảo kết nối luôn đóng (disconnect) dù truy vấn thành công hay thất bại.
// ============================================================================

// 1. Product Interface
export interface DatabaseConnection {
  connect(uri: string): Promise<void>;
  executeQuery(query: string): Promise<unknown>;
  disconnect(): Promise<void>;
}

// 2. Concrete Products (TODO)
export class PostgresConnection implements DatabaseConnection {
  public async connect(uri: string): Promise<void> {
    console.log(`[PostgreSQL] Kết nối thành công đến: ${uri}`);
  }

  public async executeQuery(query: string): Promise<unknown> {
    console.log(`[PostgreSQL] Đang thực thi truy vấn: "${query}"`);
    // Giả lập truy vấn lỗi nếu câu query chứa chữ "error"
    if (query.toLowerCase().includes("error")) {
      throw new Error("Lỗi cú pháp SQL tại PostgresConnection");
    }
    return { status: "Success", rows: [] };
  }

  public async disconnect(): Promise<void> {
    console.log(`[PostgreSQL] Đã ngắt kết nối an toàn.`);
  }
}

export class MongoConnection implements DatabaseConnection {
  public async connect(uri: string): Promise<void> {
    // TODO: In log kết nối thành công kèm URI
    console.log(`[Mongodb] Kết nối thành công đến: ${uri}`);
  }

  public async executeQuery(query: string): Promise<unknown> {
    // TODO: In log thực thi truy vấn. Nếu query chứa chữ "error", quăng ra lỗi (throw Error).
    console.log(`[Mongodb] Đang thực thi truy vấn: "${query}"`);
    if (query.toLowerCase().includes("error")) {
      throw new Error("Lỗi cú pháp SQL tại Mongodb");
    }
    return { status: "Success", rows: [] };
  }

  public async disconnect(): Promise<void> {
    // TODO: In log ngắt kết nối an toàn
    console.log(`[Mongodb] Đã ngắt kết nối an toàn.`);
  }
}

export class SqliteConnection implements DatabaseConnection {
  public async connect(uri: string): Promise<void> {
    // TODO: In log kết nối thành công kèm URI
    console.log(`[SQLite] Kết nối thành công đến: ${uri}`);
  }

  public async executeQuery(query: string): Promise<unknown> {
    // TODO: In log thực thi truy vấn. Nếu query chứa chữ "error", quăng ra lỗi (throw Error).
    console.log(`[SQLite] Đang thực thi truy vấn: "${query}"`);
    if (query.toLowerCase().includes("error")) {
      throw new Error("Lỗi cú pháp SQL tại SqliteConnection");
    }
    return { status: "Success", rows: [] };
  }

  public async disconnect(): Promise<void> {
    // TODO: In log ngắt kết nối an toàn
    console.log(`[SQLite] Đã ngắt kết nối an toàn.`);
  }
}

// 3. Creator Class
export abstract class DatabaseClient {
  // Factory Method
  protected abstract createConnection(): DatabaseConnection;

  // Business Logic (TODO)
  public async runQueryInTransaction(
    uri: string,
    query: string,
  ): Promise<void> {
    console.log(`\n[Database Client] Bắt đầu phiên làm việc mới...`);
    // TODO:
    // 1. Khởi tạo connection qua Factory Method.
    // 2. Kết nối tới database (connect).
    // 3. Chạy truy vấn (executeQuery) trong khối try...catch để bắt các lỗi có thể xảy ra.
    // 4. BẮT BUỘC ngắt kết nối (disconnect) trong khối finally để giải phóng tài nguyên.
    const connection = this.createConnection();
    try {
      await connection.connect(uri);
      await connection.executeQuery(query);
    } catch (err) {
      console.log(`[Database Client] Lỗi xảy ra trong quá trình giao dịch: `, err);
    } finally {
      await connection.disconnect();
    }
  }
}

// 4. Concrete Creators (TODO)
export class PostgresClient extends DatabaseClient {
  protected createConnection(): DatabaseConnection {
    // TODO: Trả về đối tượng PostgresConnection
    return new PostgresConnection();
  }
}

export class MongoClient extends DatabaseClient {
  protected createConnection(): DatabaseConnection {
    // TODO: Trả về đối tượng MongoConnection
    return new MongoConnection();
  }
}

export class SqliteClient extends DatabaseClient {
  protected createConnection(): DatabaseConnection {
    // TODO: Trả về đối tượng SqliteConnection
    return new SqliteConnection();
  }
}

// ============================================================================
// CLIENT CODE (DÙNG ĐỂ CHẠY THỬ NGHIỆM SAU KHI ĐÃ HOÀN THÀNH TODO)
// ============================================================================
async function runTests() {
  console.log("=== THỬ NGHIỆM BÀI TẬP 1 ===");
  try {
    const pdfReport = new PdfReportGenerator();
    pdfReport.generateReport({ totalSales: 50000000, itemsCount: 120 });

    const csvReport = new CsvReportGenerator();
    csvReport.generateReport("Dữ liệu xuất kho tháng 555");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("Bài tập 1 chưa hoàn thiện:", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 ===");
  try {
    const smsService = new SmsNotificationService();
    // Test gửi tin ngắn (Thành công)
    await smsService.dispatchNotification(
      "0901234567",
      "Ma OTP cua ban la: 123456",
    );
    // Test gửi tin dài vượt quá 160 ký tự (Thất bại)
    await smsService.dispatchNotification(
      "0901234567",
      "Day la mot tin nhan rat rat rat dai nham muc dich kiem tra xem he thong co tu dong chan cac tin nhan vuot qua gioi han ky tu cho phep cua nha mang hay khong. Neu vuot qua 160 ky tu thi he thong phai bao loi ngay lap tuc.",
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("Bài tập 2 chưa hoàn thiện:", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 3 ===");
  try {
    const pgClient = new PostgresClient();
    // Query bình thường
    await pgClient.runQueryInTransaction(
      "postgresql://localhost:5432/mydb",
      "SELECT * FROM users;",
    );
    // Query lỗi để kiểm tra xem có nhảy vào finally block để đóng kết nối không
    await pgClient.runQueryInTransaction(
      "postgresql://localhost:5432/mydb",
      "SELECT ERROR_SYNTAX FROM users;",
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("Bài tập 3 chưa hoàn thiện:", message);
  }
}

// Bỏ comment dòng dưới để chạy thử khi bạn đã code xong các phần TODO
runTests();
