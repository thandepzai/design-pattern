/**
 * 01-C-Singleton-pattern/exercises.ts
 * File bài tập tự luyện Singleton Pattern.
 * Hãy điền code vào các phần "// TODO" để hoàn thành bài tập.
 * Chạy thử bằng lệnh: npx ts-node 01-C-Singleton-pattern/exercises.ts
 */

// =========================================================================
// 📝 BÀI TẬP 1: SYSTEM LOGGER (Ghi log toàn hệ thống)
// -------------------------------------------------------------------------
// Yêu cầu:
// - Tạo class Logger theo mẫu Singleton.
// - Có một thuộc tính private `logs: string[]` lưu danh sách log trong bộ nhớ.
// - Có phương thức `log(message: string, level: 'INFO' | 'WARNING' | 'ERROR')`
//   để thêm log kèm timestamp vào mảng `logs` và in ra console.
// - Có phương thức `getLogsCount()` trả về số lượng log đã ghi nhận.
// - Có phương thức `clearLogs()` để xóa sạch logs.
// =========================================================================

class Logger {
  // TODO 1: Khai báo biến static private để lưu instance duy nhất
  private static instance: Logger | null = null;

  private logs: string[] = [];
  private loggerId: number;

  // TODO 2: Khai báo constructor là private
  private constructor() {
    this.loggerId = Math.floor(Math.random() * 1000) + 1;
    console.log(
      `\n[LOGGER] Thiết lập kết nối thành công! ID kết nối: ${this.loggerId}`,
    );
  }

  // TODO 3: Viết phương thức static getInstance() để khởi tạo/lấy instance duy nhất
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  // Ghi log
  public log(
    message: string,
    level: "INFO" | "WARNING" | "ERROR" = "INFO",
  ): void {
    const timestamp = new Date().toISOString();
    const formattedLog = `[${timestamp}] [${level}] ${message}`;
    this.logs.push(formattedLog);
    console.log(formattedLog);
  }

  // Trả về số lượng log đã lưu
  public getLogsCount(): number {
    return this.logs.length;
  }

  // Xóa sạch log
  public clearLogs(): void {
    this.logs = [];
  }
}

// =========================================================================
// 📝 BÀI TẬP 2: APPLICATION CONFIG MANAGER (Quản lý cấu hình ứng dụng)
// -------------------------------------------------------------------------
// Yêu cầu:
// - Tạo class ConfigManager theo mẫu Singleton.
// - Khởi tạo một đối tượng cấu hình mặc định trong constructor (private).
// - Có phương thức `get(key: string): any` để lấy giá trị cấu hình theo key.
// - Có phương thức `set(key: string, value: any): void` để thay đổi giá trị cấu hình.
// =========================================================================

class ConfigManager {
  // TODO 1: Khai báo biến static private để lưu instance duy nhất
  private static instance: ConfigManager | null = null;

  // Đối tượng lưu trữ các giá trị cấu hình (key-value)
  private settings: Record<string, any> = {};

  // TODO 2: Private constructor - khởi tạo giá trị cấu hình mặc định ban đầu:
  // { port: 3000, theme: 'dark', apiKey: 'SECRET_XYZ_123' }
  // private constructor() { ... }
  private constructor(port: number, theme: string, apiKey: string) {
    this.settings = { port, theme, apiKey };
  }

  // TODO 3: Viết phương thức static getInstance()
  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager(
        3000,
        "dark",
        "SECRET_XYZ_123",
      );
    }
    return ConfigManager.instance;
  }

  // Lấy giá trị cấu hình theo key
  public get(key: string): any {
    // TODO 4: Trả về giá trị của key trong đối tượng settings
    return this.settings[key];
  }

  // Cập nhật cấu hình
  public set(key: string, value: any): void {
    // TODO 5: Gán giá trị mới cho key trong đối tượng settings
    this.settings[key] = value;
  }
}

// =========================================================================
// 🚨 CHẠY TEST ĐỂ KIỂM TRA ĐÁP ÁN CỦA BẠN
// =========================================================================
function runTests() {
  console.log("=== BẮT ĐẦU KIỂM TRA BÀI TẬP ===\n");

  try {
    // ---------------------------
    // TEST BÀI 1: Logger
    // ---------------------------
    console.log("--- Test bài 1: Logger ---");
    const logger1 = Logger.getInstance();
    const logger2 = Logger.getInstance();

    if (!logger1 || !logger2) {
      console.error("❌ THẤT BẠI: getInstance() trả về null hoặc undefined!");
      return;
    }

    if (logger1 !== logger2) {
      console.error(
        "❌ THẤT BẠI: logger1 và logger2 là hai đối tượng khác nhau! Không phải Singleton.",
      );
      return;
    }

    logger1.clearLogs();
    logger1.log("Người dùng đăng nhập thành công", "INFO");
    logger2.log("Không thể kết nối API bên thứ 3", "WARNING");
    logger1.log("Hệ thống hết bộ nhớ RAM!", "ERROR");

    // Nếu là Singleton, cả logger1 và logger2 đều phải dùng chung mảng logs
    const totalLogs = logger2.getLogsCount();
    if (totalLogs === 3) {
      console.log(
        "✅ THÀNH CÔNG: Bài 1 chính xác! Cả hai biến đều chia sẻ chung danh sách logs.",
      );
    } else {
      console.error(
        `❌ THẤT BẠI: Mong đợi 3 logs, nhưng nhận được ${totalLogs} logs. Có thể bạn chưa hoàn thành hàm getLogsCount hoặc logs không được dùng chung.`,
      );
    }
  } catch (e: any) {
    console.error(`❌ THẤT BẠI BÀI 1: Có lỗi xảy ra: ${e.message}`);
  }

  try {
    // ---------------------------
    // TEST BÀI 2: ConfigManager
    // ---------------------------
    console.log("\n--- Test bài 2: ConfigManager ---");
    const config1 = ConfigManager.getInstance();
    const config2 = ConfigManager.getInstance();

    if (!config1 || !config2) {
      console.error("❌ THẤT BẠI: getInstance() trả về null hoặc undefined!");
      return;
    }

    if (config1 !== config2) {
      console.error(
        "❌ THẤT BẠI: config1 và config2 là hai đối tượng khác nhau! Không phải Singleton.",
      );
      return;
    }

    // Kiểm tra cấu hình mặc định
    const defaultPort = config1.get("port");
    if (defaultPort !== 3000) {
      console.error(
        `❌ THẤT BẠI: port mặc định phải là 3000, nhận được: ${defaultPort}. Hãy kiểm tra lại constructor.`,
      );
      return;
    }

    // config1 thay đổi cài đặt
    config1.set("theme", "light");
    config1.set("port", 4000);

    // config2 đọc cài đặt ra kiểm tra
    const themeFromConfig2 = config2.get("theme");
    const portFromConfig2 = config2.get("port");

    if (themeFromConfig2 === "light" && portFromConfig2 === 4000) {
      console.log(
        "✅ THÀNH CÔNG: Bài 2 chính xác! Thay đổi từ config1 đã đồng bộ sang config2.",
      );
    } else {
      console.error(
        `❌ THẤT BẠI: Mong đợi theme='light', port=4000. Thực tế: theme='${themeFromConfig2}', port=${portFromConfig2}`,
      );
    }
  } catch (e: any) {
    console.error(`❌ THẤT BẠI BÀI 2: Có lỗi xảy ra: ${e.message}`);
  }

  console.log("\n=== TẤT CẢ BÀI TEST HOÀN THÀNH ===");
}

runTests();
