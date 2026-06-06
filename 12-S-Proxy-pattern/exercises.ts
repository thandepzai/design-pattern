/**
 * ============================================================================
 * BÀI TẬP THỰC HÀNH: PROXY PATTERN
 * Thư mục: 12-S-Proxy-pattern/exercises.ts
 *
 * Hướng dẫn: Điền mã nguồn vào các phần có đánh dấu // TODO.
 * Chạy file này bằng tsx hoặc ts-node để kiểm tra kết quả.
 * ============================================================================
 */

export const operationLogs: string[] = [];

// ============================================================================
// BÀI TẬP 1: TRÌNH HIỂN THỊ HÌNH ẢNH TRÌ HÕAN (VIRTUAL IMAGE PROXY)
// ============================================================================

export interface Image {
  display(): string;
}

export class RealImage implements Image {
  constructor(private fileName: string) {
    this.loadFromDisk();
  }

  private loadFromDisk(): void {
    operationLogs.push(`TẢI ẢNH TỪ ĐĨA CỨNG: ${this.fileName}`);
  }

  public display(): string {
    return `Hiển thị hình ảnh thực tế: ${this.fileName}`;
  }
}

export class ProxyImage implements Image {
  private realImage: RealImage | null = null;

  constructor(private fileName: string) {
    // TODO: Lưu trữ tên file hình ảnh nhưng KHÔNG khởi tạo RealImage ở đây để tối ưu hóa
    this.fileName = fileName;
  }

  public display(): string {
    // TODO: Triển khai Virtual Proxy (Lazy Loading)
    // 1. Kiểm tra xem `realImage` đã được khởi tạo chưa.
    // 2. Nếu chưa khởi tạo:
    //    - Tạo mới một thực thể `RealImage` với `fileName` tương ứng.
    //    - Gán vào biến `realImage`.
    // 3. Gọi phương thức `display()` của `realImage` và trả về giá trị đó.
    if (!this.realImage) {
      this.realImage = new RealImage(this.fileName);
    }
    return this.realImage.display();
  }

  // Phương thức phụ phục vụ việc kiểm thử trạng thái khởi tạo
  public isLoaded(): boolean {
    return this.realImage !== null;
  }
}

// ============================================================================
// BÀI TẬP 2: KIỂM SOÁT TRUY CẬP CƠ SỞ DỮ LIỆU (PROTECTION DATABASE PROXY)
// ============================================================================

export interface User {
  username: string;
  role: "ADMIN" | "HR" | "EMPLOYEE";
}

export interface DatabaseExecutor {
  executeQuery(sql: string): string;
  executeUpdate(sql: string): void;
}

export class RealDatabaseExecutor implements DatabaseExecutor {
  public executeQuery(sql: string): string {
    operationLogs.push(`DATABASE: Thực thi truy vấn đọc [${sql}]`);
    return `Dữ liệu kết quả cho [${sql}]`;
  }

  public executeUpdate(sql: string): void {
    operationLogs.push(`DATABASE: Thực thi cập nhật ghi [${sql}]`);
  }
}

export class DatabaseProxy implements DatabaseExecutor {
  constructor(
    private realExecutor: RealDatabaseExecutor,
    private currentUser: User,
  ) {}

  public executeQuery(sql: string): string {
    // TODO: Triển khai Protection Proxy (Quyền đọc)
    // Cho phép tất cả các người dùng thực hiện truy vấn đọc dữ liệu thông qua đối tượng realExecutor.
    return this.realExecutor.executeQuery(sql);
  }

  public executeUpdate(sql: string): void {
    // TODO: Triển khai Protection Proxy (Quyền ghi/cập nhật)
    // 1. Kiểm tra xem role của currentUser có phải là "ADMIN" hoặc "HR" không.
    // 2. Nếu hợp lệ:
    //    - Gọi realExecutor.executeUpdate(sql)
    // 3. Nếu không hợp lệ (ví dụ: "EMPLOYEE"):
    //    - Ghi log vào operationLogs: `PROXY: Từ chối truy cập ghi cho người dùng ${this.currentUser.username}!`
    //    - Ném ra một Error với thông điệp: "Access Denied"
    if (this.currentUser.role === "ADMIN" || this.currentUser.role === "HR") {
      this.realExecutor.executeUpdate(sql);
      return;
    }
    operationLogs.push(
      `PROXY: Từ chối truy cập ghi cho người dùng ${this.currentUser.username}!`,
    );
    throw new Error("Access Denied");
  }
}

// ============================================================================
// CLIENT CODE (DÙNG ĐỂ CHẠY THỬ NGHIỆM)
// ============================================================================
async function runTests() {
  console.log("=== THỬ NGHIỆM BÀI TẬP 1 (IMAGE VIRTUAL PROXY) ===");
  try {
    operationLogs.length = 0;

    const proxyImage = new ProxyImage("sunset.png");

    // Test 1.1: Lazy loading - chưa tải khi tạo Proxy
    const test1_1 =
      proxyImage.isLoaded() === false && operationLogs.length === 0;
    console.log(
      `  - Test 1.1: Ảnh chưa được tải ngay khi khởi tạo proxy -> [${test1_1 ? "OK" : "FAIL"}]`,
    );

    // Test 1.2: Tải và hiển thị lần đầu
    const displayResult1 = proxyImage.display();
    const test1_2 =
      proxyImage.isLoaded() === true &&
      operationLogs.includes("TẢI ẢNH TỪ ĐĨA CỨNG: sunset.png") &&
      displayResult1 === "Hiển thị hình ảnh thực tế: sunset.png";
    console.log(
      `  - Test 1.2: Ảnh được tải và hiển thị chính xác khi gọi display() -> [${
        test1_2 ? "OK" : "FAIL"
      }]`,
    );

    // Test 1.3: Hiển thị lần hai không cần tải lại
    operationLogs.length = 0;
    const displayResult2 = proxyImage.display();
    const test1_3 =
      operationLogs.length === 0 &&
      displayResult2 === "Hiển thị hình ảnh thực tế: sunset.png";
    console.log(
      `  - Test 1.3: Hiển thị lại không cần đọc từ đĩa cứng lần nữa -> [${
        test1_3 ? "OK" : "FAIL"
      }]`,
    );

    if (test1_1 && test1_2 && test1_3) {
      console.log(
        "\x1b[32m  ✓ Thành công: Virtual Proxy quản lý trì hoãn tải hình ảnh chính xác.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Gặp lỗi trong cơ chế lazy load của Virtual Proxy.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 1 chưa hoàn thiện:\x1b[0m", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 (DATABASE PROTECTION PROXY) ===");
  try {
    const realDb = new RealDatabaseExecutor();

    const adminUser: User = { username: "admin_david", role: "ADMIN" };
    const employeeUser: User = { username: "staff_bob", role: "EMPLOYEE" };

    const adminProxy = new DatabaseProxy(realDb, adminUser);
    const employeeProxy = new DatabaseProxy(realDb, employeeUser);

    // Test 2.1: Truy vấn đọc thành công đối với nhân viên thường
    operationLogs.length = 0;
    const readResult = employeeProxy.executeQuery("SELECT * FROM Salary");
    const test2_1 =
      readResult === "Dữ liệu kết quả cho [SELECT * FROM Salary]" &&
      operationLogs.includes(
        "DATABASE: Thực thi truy vấn đọc [SELECT * FROM Salary]",
      );
    console.log(
      `  - Test 2.1: Nhân viên thường được phép đọc dữ liệu -> [${test2_1 ? "OK" : "FAIL"}]`,
    );

    // Test 2.2: Nhân viên thường bị từ chối sửa dữ liệu
    operationLogs.length = 0;
    let accessDenied = false;
    try {
      employeeProxy.executeUpdate(
        "UPDATE Salary SET amount = 5000 WHERE id = 1",
      );
    } catch (e: unknown) {
      const error = e as Error;
      if (error.message === "Access Denied") {
        accessDenied = true;
      }
    }
    const test2_2 =
      accessDenied &&
      operationLogs.includes(
        "PROXY: Từ chối truy cập ghi cho người dùng staff_bob!",
      ) &&
      !operationLogs.includes(
        "DATABASE: Thực thi cập nhật ghi [UPDATE Salary SET amount = 5000 WHERE id = 1]",
      );
    console.log(
      `  - Test 2.2: Từ chối quyền ghi của nhân viên thường thành công -> [${
        test2_2 ? "OK" : "FAIL"
      }]`,
    );

    // Test 2.3: Admin được phép sửa dữ liệu
    operationLogs.length = 0;
    adminProxy.executeUpdate("UPDATE Salary SET amount = 9999 WHERE id = 2");
    const test2_3 = operationLogs.includes(
      "DATABASE: Thực thi cập nhật ghi [UPDATE Salary SET amount = 9999 WHERE id = 2]",
    );
    console.log(
      `  - Test 2.3: Admin được cấp quyền ghi dữ liệu bình thường -> [${
        test2_3 ? "OK" : "FAIL"
      }]`,
    );

    if (test2_1 && test2_2 && test2_3) {
      console.log(
        "\x1b[32m  ✓ Thành công: Protection Proxy phân quyền truy cập Database chính xác.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Phân quyền truy cập bị sai hoặc chưa chặn đúng yêu cầu.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 2 chưa hoàn thiện:\x1b[0m", message);
  }
}

runTests();
