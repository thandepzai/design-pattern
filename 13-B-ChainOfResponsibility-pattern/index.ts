/**
 * ============================================================================
 * VÍ DỤ MINH HỌA: CHAIN OF RESPONSIBILITY PATTERN
 * Thư mục: 13-B-ChainOfResponsibility-pattern/index.ts
 *
 * Ngữ cảnh: Hệ thống hỗ trợ kỹ thuật đa cấp (Customer Support Ticket).
 * - Cấp 1 (Local Support): Xử lý các lỗi cơ bản cấu hình phần mềm.
 * - Cấp 2 (Technical Support): Xử lý lỗi hệ thống mạng/hạ tầng.
 * - Cấp 3 (Director Support): Quyết định hoàn tiền hoặc đền bù thiệt hại.
 * ============================================================================
 */

// Định nghĩa mức độ ưu tiên/phức tạp của ticket
enum Severity {
  EASY,
  MEDIUM,
  HARD,
}

// Đối tượng biểu thị yêu cầu hỗ trợ
class SupportTicket {
  constructor(
    public description: string,
    public severity: Severity,
  ) {}
}

// ============================================================================
// 1. HANDLER INTERFACE
// ============================================================================
interface SupportHandler {
  setNext(handler: SupportHandler): SupportHandler;
  handle(ticket: SupportTicket): void;
}

// ============================================================================
// 2. BASE HANDLER (Lớp cơ sở giữ tham chiếu chuỗi)
// ============================================================================
abstract class AbstractSupportHandler implements SupportHandler {
  private nextHandler: SupportHandler | null = null;

  public setNext(handler: SupportHandler): SupportHandler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(ticket: SupportTicket): void {
    if (this.nextHandler) {
      this.nextHandler.handle(ticket);
    } else {
      console.log(
        `❌ [System] Không có cấp nào xử lý được ticket: "${ticket.description}"`,
      );
    }
  }
}

// ============================================================================
// 3. CONCRETE HANDLERS
// ============================================================================
class LocalSupport extends AbstractSupportHandler {
  public handle(ticket: SupportTicket): void {
    if (ticket.severity === Severity.EASY) {
      console.log(
        `👨‍💻 [Local Support] Đã xử lý xong ticket: "${ticket.description}" (Cài đặt lại phần mềm).`,
      );
    } else {
      console.log(
        `➡️ [Local Support] Lỗi vượt quá khả năng. Chuyển lên cấp trên.`,
      );
      super.handle(ticket);
    }
  }
}

class TechnicalSupport extends AbstractSupportHandler {
  public handle(ticket: SupportTicket): void {
    if (ticket.severity === Severity.MEDIUM) {
      console.log(
        `🛠️ [Technical Support] Đã xử lý xong ticket: "${ticket.description}" (Khởi động lại router/hệ thống).`,
      );
    } else {
      console.log(
        `➡️ [Technical Support] Lỗi quá phức tạp. Chuyển lên Giám đốc.`,
      );
      super.handle(ticket);
    }
  }
}

class DirectorSupport extends AbstractSupportHandler {
  public handle(ticket: SupportTicket): void {
    if (ticket.severity === Severity.HARD) {
      console.log(
        `👔 [Director Support] Đã xử lý xong ticket: "${ticket.description}" (Đồng ý bồi thường tài chính).`,
      );
    } else {
      super.handle(ticket);
    }
  }
}

// ============================================================================
// THỬ NGHIỆM CHẠY VÍ DỤ
// ============================================================================
function runExample() {
  console.log("=== CHẠY VÍ DỤ MINH HỌA CHAIN OF RESPONSIBILITY PATTERN ===\n");

  // Khởi tạo các handler
  const local = new LocalSupport();
  const tech = new TechnicalSupport();
  const director = new DirectorSupport();

  // Thiết lập chuỗi: local -> tech -> director
  local.setNext(tech).setNext(director);

  // Tạo các ticket với độ khó khác nhau
  const easyTicket = new SupportTicket(
    "Quên mật khẩu đăng nhập",
    Severity.EASY,
  );
  const mediumTicket = new SupportTicket(
    "Mất kết nối mạng toàn chi nhánh",
    Severity.MEDIUM,
  );
  const hardTicket = new SupportTicket(
    "Dữ liệu khách hàng bị rò rỉ",
    Severity.HARD,
  );

  console.log("--- Xử lý ticket dễ ---");
  local.handle(easyTicket);
  console.log("");

  console.log("--- Xử lý ticket trung bình ---");
  local.handle(mediumTicket);
  console.log("");

  console.log("--- Xử lý ticket khó ---");
  local.handle(hardTicket);
  console.log("");
}

runExample();
