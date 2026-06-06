/**
 * ============================================================================
 * BÀI TẬP THỰC HÀNH: CHAIN OF RESPONSIBILITY PATTERN
 * Thư mục: 13-B-ChainOfResponsibility-pattern/exercises.ts
 *
 * Hướng dẫn: Điền mã nguồn vào các phần có đánh dấu // TODO.
 * Chạy file này bằng tsx hoặc ts-node để kiểm tra kết quả.
 * ============================================================================
 */

export const operationLogs: string[] = [];

// ============================================================================
// BÀI TẬP 1: MIDDLEWARE PIPELINE XỬ LÝ HTTP REQUEST (HTTP MIDDLEWARE CHAIN)
// ============================================================================

export class HttpRequest {
  constructor(
    public url: string,
    public token: string,
    public body: { email?: string; [key: string]: unknown },
  ) {}
}

export interface Middleware {
  setNext(middleware: Middleware): Middleware;
  handle(request: HttpRequest): boolean;
}

export abstract class AbstractMiddleware implements Middleware {
  private nextMiddleware: Middleware | null = null;

  public setNext(middleware: Middleware): Middleware {
    this.nextMiddleware = middleware;
    return middleware;
  }

  public handle(request: HttpRequest): boolean {
    if (this.nextMiddleware) {
      return this.nextMiddleware.handle(request);
    }
    return true; // Kết thúc chuỗi thành công nếu không còn middleware nào tiếp theo
  }
}

export class LoggerMiddleware extends AbstractMiddleware {
  public handle(request: HttpRequest): boolean {
    operationLogs.push(`LOGGER: Đã ghi nhận request gửi đến ${request.url}`);
    return super.handle(request);
  }
}

export class AuthMiddleware extends AbstractMiddleware {
  public handle(request: HttpRequest): boolean {
    // TODO: Triển khai các bước:
    // 1. Kiểm tra xem `request.token` có bằng "secret_token_123" không.
    // 2. Nếu bằng:
    //    - Ghi log vào operationLogs: "AUTH: Xác thực thành công."
    //    - Chuyển tiếp yêu cầu xử lý sang middleware tiếp theo bằng cách gọi super.handle(request) và trả về kết quả.
    // 3. Nếu không bằng:
    //    - Ghi log vào operationLogs: "AUTH: Xác thực thất bại!"
    //    - Trả về false ngay lập tức mà không gọi phần tiếp theo của chuỗi.
    if (request.token === "secret_token_123") {
      operationLogs.push("AUTH: Xác thực thành công.");
      return super.handle(request);
    }
    operationLogs.push("AUTH: Xác thực thất bại!");
    return false;
  }
}

export class ValidationMiddleware extends AbstractMiddleware {
  public handle(request: HttpRequest): boolean {
    // TODO: Triển khai các bước:
    // 1. Lấy thuộc tính email từ `request.body.email`.
    // 2. Kiểm tra xem email có chứa ký tự '@' không.
    // 3. Nếu hợp lệ:
    //    - Ghi log vào operationLogs: "VALIDATOR: Dữ liệu hợp lệ."
    //    - Chuyển tiếp yêu cầu xử lý sang middleware tiếp theo bằng cách gọi super.handle(request) và trả về kết quả.
    // 4. Nếu không hợp lệ:
    //    - Ghi log vào operationLogs: "VALIDATOR: Dữ liệu email không hợp lệ!"
    //    - Trả về false ngay lập tức mà không gọi phần tiếp theo của chuỗi.
    const email = request.body.email;
    if (email && email.includes("@")) {
      operationLogs.push("VALIDATOR: Dữ liệu hợp lệ.");
      return super.handle(request);
    }
    operationLogs.push("VALIDATOR: Dữ liệu email không hợp lệ!");
    return false;
  }
}

// ============================================================================
// BÀI TẬP 2: HỆ THỐNG PHÊ DUYỆT CHI PHÍ CÔNG TÁC (EXPENSE APPROVAL CHAIN)
// ============================================================================

export class ExpenseRequest {
  constructor(
    public purpose: string,
    public amount: number,
  ) {}
}

export interface Approver {
  setNext(approver: Approver): Approver;
  approve(request: ExpenseRequest): void;
}

export abstract class AbstractApprover implements Approver {
  private nextApprover: Approver | null = null;

  public setNext(approver: Approver): Approver {
    this.nextApprover = approver;
    return approver;
  }

  public approve(request: ExpenseRequest): void {
    if (this.nextApprover) {
      this.nextApprover.approve(request);
    } else {
      operationLogs.push(
        `SYSTEM: Chi phí $${request.amount} cho "${request.purpose}" bị từ chối tự động vì vượt hạn mức!`,
      );
    }
  }
}

export class Manager extends AbstractApprover {
  public approve(request: ExpenseRequest): void {
    // TODO: Triển khai các bước:
    // 1. Kiểm tra xem `request.amount` có nhỏ hơn hoặc bằng 500 không.
    // 2. Nếu có:
    //    - Ghi log vào operationLogs: `MANAGER: Đã duyệt chi phí $${request.amount} cho "${request.purpose}"`
    // 3. Nếu không (lớn hơn 500):
    //    - Gọi `super.approve(request)` để chuyển tiếp yêu cầu lên cấp cao hơn.
    if (request.amount <= 500) {
      operationLogs.push(
        `MANAGER: Đã duyệt chi phí $${request.amount} cho "${request.purpose}"`,
      );
    } else {
      super.approve(request);
    }
  }
}

export class Director extends AbstractApprover {
  public approve(request: ExpenseRequest): void {
    // TODO: Triển khai các bước:
    // 1. Kiểm tra xem `request.amount` có nhỏ hơn hoặc bằng 2000 không.
    // 2. Nếu có:
    //    - Ghi log vào operationLogs: `DIRECTOR: Đã duyệt chi phí $${request.amount} cho "${request.purpose}"`
    // 3. Nếu không (lớn hơn 2000):
    //    - Gọi `super.approve(request)` để chuyển tiếp yêu cầu lên cấp cao hơn.
    if(request.amount <= 2000) {
      operationLogs.push(
        `DIRECTOR: Đã duyệt chi phí $${request.amount} cho "${request.purpose}"`
      )
    } else {
      super.approve(request);
    }
  }
}

export class CFO extends AbstractApprover {
  public approve(request: ExpenseRequest): void {
    // TODO: Triển khai các bước:
    // 1. Kiểm tra xem `request.amount` có nhỏ hơn hoặc bằng 10000 không.
    // 2. Nếu có:
    //    - Ghi log vào operationLogs: `CFO: Đã duyệt chi phí $${request.amount} cho "${request.purpose}"`
    // 3. Nếu không:
    //    - Gọi `super.approve(request)` để chuyển tiếp yêu cầu lên cấp cao hơn.
    if(request.amount <= 10000) {
      operationLogs.push(
        `CFO: Đã duyệt chi phí $${request.amount} cho "${request.purpose}"`
      )
    } else {
      super.approve(request);
    }
  }
}

// ============================================================================
// CLIENT CODE (DÙNG ĐỂ CHẠY THỬ NGHIỆM)
// ============================================================================
async function runTests() {
  console.log("=== THỬ NGHIỆM BÀI TẬP 1 (HTTP PIPELINE MIDDLEWARE) ===");
  try {
    const logger = new LoggerMiddleware();
    const auth = new AuthMiddleware();
    const validator = new ValidationMiddleware();

    // Thiết lập chuỗi: logger -> auth -> validator
    logger.setNext(auth).setNext(validator);

    // Test 1.1: Request hợp lệ đi qua hết chuỗi
    operationLogs.length = 0;
    const req1 = new HttpRequest("/api/checkout", "secret_token_123", {
      email: "user@example.com",
      items: [1, 2],
    });
    const result1 = logger.handle(req1);
    const test1_1 =
      result1 === true &&
      operationLogs.includes(
        "LOGGER: Đã ghi nhận request gửi đến /api/checkout",
      ) &&
      operationLogs.includes("AUTH: Xác thực thành công.") &&
      operationLogs.includes("VALIDATOR: Dữ liệu hợp lệ.");
    console.log(
      `  - Test 1.1: Request hợp lệ đi qua hết chuỗi thành công -> [${test1_1 ? "OK" : "FAIL"}]`,
    );

    // Test 1.2: Request lỗi auth bị ngắt chuỗi giữa chừng
    operationLogs.length = 0;
    const req2 = new HttpRequest("/api/checkout", "wrong_token", {
      email: "user@example.com",
    });
    const result2 = logger.handle(req2);
    const test1_2 =
      result2 === false &&
      operationLogs.includes(
        "LOGGER: Đã ghi nhận request gửi đến /api/checkout",
      ) &&
      operationLogs.includes("AUTH: Xác thực thất bại!") &&
      !operationLogs.includes("VALIDATOR: Dữ liệu hợp lệ.");
    console.log(
      `  - Test 1.2: Request sai token bị ngắt chuỗi tại Auth -> [${test1_2 ? "OK" : "FAIL"}]`,
    );

    // Test 1.3: Request lỗi validation bị ngắt chuỗi tại Validation
    operationLogs.length = 0;
    const req3 = new HttpRequest("/api/checkout", "secret_token_123", {
      email: "invalid_email_no_at_sign",
    });
    const result3 = logger.handle(req3);
    const test1_3 =
      result3 === false &&
      operationLogs.includes(
        "LOGGER: Đã ghi nhận request gửi đến /api/checkout",
      ) &&
      operationLogs.includes("AUTH: Xác thực thành công.") &&
      operationLogs.includes("VALIDATOR: Dữ liệu email không hợp lệ!");
    console.log(
      `  - Test 1.3: Request sai định dạng email bị ngắt tại Validation -> [${
        test1_3 ? "OK" : "FAIL"
      }]`,
    );

    if (test1_1 && test1_2 && test1_3) {
      console.log(
        "\x1b[32m  ✓ Thành công: HTTP Middleware Chain ngắt/chuyển tiếp request chính xác.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Gặp lỗi trong cơ chế điều phối request của chuỗi middleware.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 1 chưa hoàn thiện:\x1b[0m", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 (EXPENSE APPROVAL CHAIN) ===");
  try {
    const manager = new Manager();
    const director = new Director();
    const cfo = new CFO();

    // Thiết lập chuỗi: manager -> director -> cfo
    manager.setNext(director).setNext(cfo);

    // Test 2.1: Manager duyệt
    operationLogs.length = 0;
    manager.approve(new ExpenseRequest("Mua văn phòng phẩm", 150));
    const test2_1 = operationLogs.includes(
      'MANAGER: Đã duyệt chi phí $150 cho "Mua văn phòng phẩm"',
    );
    console.log(
      `  - Test 2.1: Trưởng phòng duyệt khoản chi nhỏ ($150) -> [${test2_1 ? "OK" : "FAIL"}]`,
    );

    // Test 2.2: Director duyệt
    operationLogs.length = 0;
    manager.approve(new ExpenseRequest("Mua laptop mới cho nhân viên", 1200));
    const test2_2 = operationLogs.includes(
      'DIRECTOR: Đã duyệt chi phí $1200 cho "Mua laptop mới cho nhân viên"',
    );
    console.log(
      `  - Test 2.2: Giám đốc duyệt khoản chi vừa phải ($1200) -> [${test2_2 ? "OK" : "FAIL"}]`,
    );

    // Test 2.3: CFO duyệt
    operationLogs.length = 0;
    manager.approve(new ExpenseRequest("Tổ chức sự kiện Year End Party", 8500));
    const test2_3 = operationLogs.includes(
      'CFO: Đã duyệt chi phí $8500 cho "Tổ chức sự kiện Year End Party"',
    );
    console.log(
      `  - Test 2.3: CFO duyệt khoản chi lớn ($8500) -> [${test2_3 ? "OK" : "FAIL"}]`,
    );

    // Test 2.4: Từ chối tự động
    operationLogs.length = 0;
    manager.approve(new ExpenseRequest("Thuê văn phòng mới", 15000));
    const test2_4 = operationLogs.includes(
      'SYSTEM: Chi phí $15000 cho "Thuê văn phòng mới" bị từ chối tự động vì vượt hạn mức!',
    );
    console.log(
      `  - Test 2.4: Từ chối tự động khoản chi vượt hạn mức ($15000) -> [${test2_4 ? "OK" : "FAIL"}]`,
    );

    if (test2_1 && test2_2 && test2_3 && test2_4) {
      console.log(
        "\x1b[32m  ✓ Thành công: Expense Approval Chain phân phối cấp duyệt chi phí chính xác.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Phân phối hoặc duyệt chi phí bị sai thẩm quyền.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 2 chưa hoàn thiện:\x1b[0m", message);
  }
}

runTests();
