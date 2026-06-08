/**
 * ============================================================================
 * BÀI TẬP THỰC HÀNH: TEMPLATE METHOD PATTERN
 * Thư mục: 22-B-TemplateMethod-pattern/exercises.ts
 *
 * Hướng dẫn: Điền mã nguồn vào các phần có đánh dấu // TODO.
 * Chạy file này bằng tsx hoặc ts-node để kiểm tra kết quả.
 * ============================================================================
 */

export const operationLogs: string[] = [];

// ============================================================================
// BÀI TẬP 1: QUY TRÌNH TẠO BÁO CÁO (REPORT GENERATOR)
// ============================================================================

export abstract class ReportGenerator {
  // Template Method - bộ khung, KHÔNG override ở lớp con
  generateReport(): void {
    const rawData = this.collectData();
    const processedData = this.processData(rawData);
    const output = this.formatOutput(processedData);
    this.sendReport(output);
  }

  // 2. Abstract Methods - lớp con bắt buộc implement
  protected abstract collectData(): string[];
  protected abstract processData(data: string[]): string[];
  protected abstract formatOutput(data: string[]): string;
  protected abstract sendReport(output: string): void;
}

export class SalesReportGenerator extends ReportGenerator {
  protected collectData(): string[] {
    // TODO: Triển khai các bước:
    // 1. Ghi log vào operationLogs: "SALES_REPORT: Thu thập dữ liệu bán hàng từ database..."
    // 2. Trả về mảng dữ liệu giả: ["sale_001: $1200", "sale_002: $850", "sale_003: $2300"]
    operationLogs.push(
      "SALES_REPORT: Thu thập dữ liệu bán hàng từ database...",
    );
    return ["sale_001: $1200", "sale_002: $850", "sale_003: $2300"];
  }

  protected processData(data: string[]): string[] {
    // TODO: Triển khai các bước:
    // 1. Ghi log vào operationLogs: "SALES_REPORT: Xử lý và tính toán doanh thu..."
    // 2. Trả về mảng đã xử lý (có thể trả về data không đổi hoặc thêm dòng tổng kết)
    //    Ví dụ: [...data, "TOTAL: $4350"]
    operationLogs.push("SALES_REPORT: Xử lý và tính toán doanh thu...");
    return [...data, "TOTAL: $4350"];
  }

  protected formatOutput(data: string[]): string {
    // TODO: Triển khai các bước:
    // 1. Ghi log vào operationLogs: "SALES_REPORT: Định dạng báo cáo doanh thu."
    // 2. Trả về chuỗi format: `[BÁO CÁO DOANH THU]\n${data.join("\n")}`
    operationLogs.push("SALES_REPORT: Định dạng báo cáo doanh thu.");
    return `[BÁO CÁO DOANH THU]\n${data.join("\n")}`;
  }

  protected sendReport(output: string): void {
    // TODO: Triển khai các bước:
    // 1. Ghi log vào operationLogs: "SALES_REPORT: Gửi báo cáo đến Ban Giám Đốc."
    // 2. (Tùy chọn) In ra output để xem kết quả: console.log(output)
    operationLogs.push("SALES_REPORT: Gửi báo cáo đến Ban Giám Đốc.");
  }
}

export class InventoryReportGenerator extends ReportGenerator {
  protected collectData(): string[] {
    // TODO: Triển khai các bước:
    // 1. Ghi log vào operationLogs: "INVENTORY_REPORT: Thu thập dữ liệu tồn kho..."
    // 2. Trả về mảng dữ liệu giả: ["SP001: Laptop - Còn 15 cái", "SP002: Chuột - Còn 42 cái", "SP003: Bàn phím - Còn 7 cái (sắp hết)"]
    operationLogs.push("INVENTORY_REPORT: Thu thập dữ liệu tồn kho...");
    return [
      "SP001: Laptop - Còn 15 cái",
      "SP002: Chuột - Còn 42 cái",
      "SP003: Bàn phím - Còn 7 cái (sắp hết)",
    ];
  }

  protected processData(data: string[]): string[] {
    // TODO: Triển khai các bước:
    // 1. Ghi log vào operationLogs: "INVENTORY_REPORT: Kiểm tra và phân loại hàng tồn..."
    // 2. Trả về mảng đã lọc ra các mặt hàng cần nhập thêm:
    //    data.filter((item) => item.includes("sắp hết"))
    operationLogs.push("INVENTORY_REPORT: Kiểm tra và phân loại hàng tồn...");
    return data.filter((item) => item.includes("sắp hết"));
  }

  protected formatOutput(data: string[]): string {
    // TODO: Triển khai các bước:
    // 1. Ghi log vào operationLogs: "INVENTORY_REPORT: Định dạng báo cáo tồn kho."
    // 2. Trả về chuỗi format: `[BÁO CÁO TỒN KHO - CẦN NHẬP THÊM]\n${data.join("\n")}`
    operationLogs.push("INVENTORY_REPORT: Định dạng báo cáo tồn kho.");
    return `[BÁO CÁO TỒN KHO - CẦN NHẬP THÊM]\n${data.join("\n")}`;
  }

  protected sendReport(output: string): void {
    // TODO: Triển khai các bước:
    // 1. Ghi log vào operationLogs: "INVENTORY_REPORT: Gửi báo cáo đến Trưởng Kho."
    operationLogs.push("INVENTORY_REPORT: Gửi báo cáo đến Trưởng Kho.");
  }
}

// ============================================================================
// BÀI TẬP 2: QUY TRÌNH PHÂN TÍCH DỮ LIỆU (DATA ANALYZER)
// ============================================================================

export abstract class DataAnalyzer {
  // Template Method - bộ khung quy trình phân tích
  analyze(): void {
    const rawData = this.loadData();
    const isValid = this.validateData(rawData);
    if (!isValid) {
      operationLogs.push(`${this.getPrefix()}: Dữ liệu không hợp lệ, dừng phân tích.`);
      return;
    }
    const result = this.analyzeData(rawData);
    this.generateSummary(result);
  }

  // Abstract Methods
  protected abstract getPrefix(): string;
  protected abstract loadData(): string;
  protected abstract validateData(data: string): boolean;
  protected abstract analyzeData(data: string): string;
  protected abstract generateSummary(result: string): void;
}

export class CSVAnalyzer extends DataAnalyzer {
  protected getPrefix(): string {
    return "CSV";
  }

  protected loadData(): string {
    // TODO: Triển khai các bước:
    // 1. Ghi log vào operationLogs: "CSV: Tải dữ liệu từ file .csv"
    // 2. Trả về chuỗi CSV giả:
    //    "name,age,city\nAlice,30,HCM\nBob,25,HN\nCharlie,35,DN"
    operationLogs.push("CSV: Tải dữ liệu từ file .csv");
    return "name,age,city\nAlice,30,HCM\nBob,25,HN\nCharlie,35,DN";
  }

  protected validateData(data: string): boolean {
    // TODO: Triển khai các bước:
    // 1. Ghi log vào operationLogs: "CSV: Kiểm tra định dạng CSV hợp lệ."
    // 2. Kiểm tra data có chứa dấu phẩy không: data.includes(",")
    // 3. Trả về kết quả kiểm tra
    operationLogs.push("CSV: Kiểm tra định dạng CSV hợp lệ.");
    return data.includes(",");
  }

  protected analyzeData(data: string): string {
    // TODO: Triển khai các bước:
    // 1. Ghi log vào operationLogs: "CSV: Phân tích cú pháp dữ liệu CSV."
    // 2. Tách các dòng: const lines = data.split("\n")
    // 3. Số bản ghi = lines.length - 1 (trừ header)
    // 4. Trả về chuỗi: `${lines.length - 1} bản ghi CSV`
    operationLogs.push("CSV: Phân tích cú pháp dữ liệu CSV.");
    const lines = data.split("\n");
    const recordCount = lines.length - 1;
    return `${recordCount} bản ghi CSV`;
  }

  protected generateSummary(result: string): void {
    // TODO: Triển khai các bước:
    // 1. Tách số bản ghi từ result: const count = result.split(" ")[0]
    // 2. Ghi log vào operationLogs: `"CSV: Tổng kết: Tìm thấy ${count} bản ghi."`
    const count = result.split(" ")[0];
    operationLogs.push(`CSV: Tổng kết: Tìm thấy ${count} bản ghi.`);
  }
}

export class JSONAnalyzer extends DataAnalyzer {
  protected getPrefix(): string {
    return "JSON";
  }

  protected loadData(): string {
    // TODO: Triển khai các bước:
    // 1. Ghi log vào operationLogs: "JSON: Tải dữ liệu từ file .json"
    // 2. Trả về chuỗi JSON giả:
    //    '[{"id":1,"name":"Product A"},{"id":2,"name":"Product B"}]'
    operationLogs.push("JSON: Tải dữ liệu từ file .json");
    return '[{"id":1,"name":"Product A"},{"id":2,"name":"Product B"}]';
  }

  protected validateData(data: string): boolean {
    // TODO: Triển khai các bước:
    // 1. Ghi log vào operationLogs: "JSON: Kiểm tra cú pháp JSON hợp lệ."
    // 2. Thử parse JSON: try { JSON.parse(data); return true; } catch { return false; }
    operationLogs.push("JSON: Kiểm tra cú pháp JSON hợp lệ.");
    try {
      JSON.parse(data);
      return true;
    } catch {
      return false;
    }
  }

  protected analyzeData(data: string): string {
    // TODO: Triển khai các bước:
    // 1. Ghi log vào operationLogs: "JSON: Phân tích cú pháp dữ liệu JSON."
    // 2. Parse JSON: const parsed = JSON.parse(data)
    // 3. Lấy số phần tử: parsed.length (hoặc Object.keys(parsed).length nếu là object)
    // 4. Trả về chuỗi: `${count} bản ghi JSON`
    operationLogs.push("JSON: Phân tích cú pháp dữ liệu JSON.");
    const parsed = JSON.parse(data) as unknown[];
    const count = Array.isArray(parsed) ? parsed.length : Object.keys(parsed as object).length;
    return `${count} bản ghi JSON`;
  }

  protected generateSummary(result: string): void {
    // TODO: Triển khai các bước:
    // 1. Tách số bản ghi từ result: const count = result.split(" ")[0]
    // 2. Ghi log vào operationLogs: `"JSON: Tổng kết: Tìm thấy ${count} bản ghi."`
    const count = result.split(" ")[0];
    operationLogs.push(`JSON: Tổng kết: Tìm thấy ${count} bản ghi.`);
  }
}

// ============================================================================
// CLIENT CODE (DÙNG ĐỂ CHẠY THỬ NGHIỆM)
// ============================================================================
function runTests() {
  console.log("=== THỬ NGHIỆM BÀI TẬP 1 (REPORT GENERATOR) ===");
  try {
    // Test 1.1: SalesReportGenerator chạy đúng thứ tự các bước
    operationLogs.length = 0;
    const salesGen = new SalesReportGenerator();
    salesGen.generateReport();

    const test1_1 =
      operationLogs.includes(
        "SALES_REPORT: Thu thập dữ liệu bán hàng từ database...",
      ) &&
      operationLogs.includes("SALES_REPORT: Xử lý và tính toán doanh thu...") &&
      operationLogs.includes("SALES_REPORT: Định dạng báo cáo doanh thu.") &&
      operationLogs.includes("SALES_REPORT: Gửi báo cáo đến Ban Giám Đốc.");
    console.log(
      `  - Test 1.1: SalesReportGenerator chạy đủ 4 bước đúng thứ tự -> [${test1_1 ? "OK" : "FAIL"}]`,
    );

    // Test 1.2: InventoryReportGenerator chạy đúng thứ tự các bước
    operationLogs.length = 0;
    const inventoryGen = new InventoryReportGenerator();
    inventoryGen.generateReport();

    const test1_2 =
      operationLogs.includes("INVENTORY_REPORT: Thu thập dữ liệu tồn kho...") &&
      operationLogs.includes(
        "INVENTORY_REPORT: Kiểm tra và phân loại hàng tồn...",
      ) &&
      operationLogs.includes("INVENTORY_REPORT: Định dạng báo cáo tồn kho.") &&
      operationLogs.includes("INVENTORY_REPORT: Gửi báo cáo đến Trưởng Kho.");
    console.log(
      `  - Test 1.2: InventoryReportGenerator chạy đủ 4 bước đúng thứ tự -> [${test1_2 ? "OK" : "FAIL"}]`,
    );

    // Test 1.3: Hai generator không ảnh hưởng lẫn nhau (log độc lập)
    operationLogs.length = 0;
    salesGen.generateReport();
    const test1_3 = !operationLogs.includes(
      "INVENTORY_REPORT: Thu thập dữ liệu tồn kho...",
    );
    console.log(
      `  - Test 1.3: Sales log không lẫn với Inventory log -> [${test1_3 ? "OK" : "FAIL"}]`,
    );

    if (test1_1 && test1_2 && test1_3) {
      console.log(
        "\x1b[32m  ✓ Thành công: Tất cả Report Generator chạy đúng bộ khung Template Method.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Một hoặc nhiều bước trong quy trình báo cáo bị thiếu hoặc sai.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 1 chưa hoàn thiện:\x1b[0m", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 (DATA ANALYZER) ===");
  try {
    // Test 2.1: CSVAnalyzer chạy đủ các bước và ghi log đúng
    operationLogs.length = 0;
    const csvAnalyzer = new CSVAnalyzer();
    csvAnalyzer.analyze();

    const test2_1 =
      operationLogs.includes("CSV: Tải dữ liệu từ file .csv") &&
      operationLogs.includes("CSV: Kiểm tra định dạng CSV hợp lệ.") &&
      operationLogs.includes("CSV: Phân tích cú pháp dữ liệu CSV.") &&
      operationLogs.includes("CSV: Tổng kết: Tìm thấy 3 bản ghi.");
    console.log(
      `  - Test 2.1: CSVAnalyzer chạy đủ 4 bước và log đúng -> [${test2_1 ? "OK" : "FAIL"}]`,
    );

    // Test 2.2: JSONAnalyzer chạy đủ các bước và ghi log đúng
    operationLogs.length = 0;
    const jsonAnalyzer = new JSONAnalyzer();
    jsonAnalyzer.analyze();

    const test2_2 =
      operationLogs.includes("JSON: Tải dữ liệu từ file .json") &&
      operationLogs.includes("JSON: Kiểm tra cú pháp JSON hợp lệ.") &&
      operationLogs.includes("JSON: Phân tích cú pháp dữ liệu JSON.") &&
      operationLogs.includes("JSON: Tổng kết: Tìm thấy 2 bản ghi.");
    console.log(
      `  - Test 2.2: JSONAnalyzer chạy đủ 4 bước và log đúng -> [${test2_2 ? "OK" : "FAIL"}]`,
    );

    // Test 2.3: Dữ liệu không hợp lệ dừng quy trình
    operationLogs.length = 0;

    class InvalidCSVAnalyzer extends CSVAnalyzer {
      protected loadData(): string {
        operationLogs.push("CSV: Tải dữ liệu từ file .csv");
        return "NO_COMMA_DATA_INVALID";
      }
    }

    const invalidAnalyzer = new InvalidCSVAnalyzer();
    invalidAnalyzer.analyze();

    const test2_3 =
      operationLogs.includes("CSV: Kiểm tra định dạng CSV hợp lệ.") &&
      !operationLogs.includes("CSV: Phân tích cú pháp dữ liệu CSV.") &&
      operationLogs.includes("CSV: Dữ liệu không hợp lệ, dừng phân tích.");
    console.log(
      `  - Test 2.3: Dữ liệu không hợp lệ -> quy trình dừng tại validate -> [${test2_3 ? "OK" : "FAIL"}]`,
    );

    if (test2_1 && test2_2 && test2_3) {
      console.log(
        "\x1b[32m  ✓ Thành công: Tất cả Data Analyzer chạy đúng bộ khung Template Method.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Một hoặc nhiều bước trong quy trình phân tích bị thiếu hoặc sai.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 2 chưa hoàn thiện:\x1b[0m", message);
  }
}

runTests();
