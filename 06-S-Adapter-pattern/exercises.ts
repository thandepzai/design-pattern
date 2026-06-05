/**
 * ============================================================================
 * BÀI TẬP THỰC HÀNH: ADAPTER PATTERN
 * Thư mục: 06-S-Adapter-pattern/exercises.ts
 *
 * Hướng dẫn: Điền mã nguồn vào các phần có đánh dấu // TODO.
 * Chạy file này bằng tsx hoặc ts-node để kiểm tra kết quả.
 * ============================================================================
 */

// ============================================================================
// BÀI TẬP 1: BỘ CHUYỂN ĐỔI CỔNG THANH TOÁN (PAYMENT GATEWAY ADAPTER)
// Đề bài: Triển khai lớp GlobalPayAdapter để tích hợp cổng thanh toán GlobalPay (USD)
// vào hệ thống thanh toán VND hiện tại.
// ============================================================================

export interface PaymentProcessor {
  pay(amountInVND: number): void;
}

// SDK của cổng thanh toán quốc tế (Adaptee) - Không được sửa đổi lớp này
export class GlobalPayService {
  private shouldSucceed: boolean = true;
  public lastChargedAmountUSD: number = 0;

  constructor(shouldSucceed: boolean = true) {
    this.shouldSucceed = shouldSucceed;
  }

  public makeCharge(amountInUSD: number): boolean {
    if (!this.shouldSucceed) {
      return false;
    }
    this.lastChargedAmountUSD = amountInUSD;
    return true;
  }
}

// Adapter cần triển khai
export class GlobalPayAdapter implements PaymentProcessor {
  private globalPayService: GlobalPayService;
  private exchangeRate: number; // Tỷ giá quy đổi từ USD sang VND (ví dụ: 25000)

  constructor(globalPayService: GlobalPayService, exchangeRate: number) {
    this.globalPayService = globalPayService;
    this.exchangeRate = exchangeRate;
  }

  public pay(amountInVND: number): void {
    // TODO: 1. Chuyển đổi số tiền từ VND sang USD (amountInUSD = amountInVND / exchangeRate)
    // TODO: 2. Làm tròn số tiền USD đến 2 chữ số thập phân (ví dụ dùng Math.round(val * 100) / 100)
    // TODO: 3. Gọi phương thức makeCharge trên globalPayService
    // TODO: 4. Nếu makeCharge trả về false, ném ra một Error("Thanh toán qua GlobalPay thất bại")
    const amountInUSD =
      Math.round((amountInVND / this.exchangeRate) * 100) / 100;

    const success = this.globalPayService.makeCharge(amountInUSD);

    if (!success) throw new Error("Thanh toán qua GlobalPay thất bại");
  }
}

// ============================================================================
// BÀI TẬP 2: ĐỒNG BỘ DỮ LIỆU KHÁCH HÀNG (CUSTOMER DATA ADAPTER)
// Đề bài: Triển khai lớp CustomerDataAdapter để chuyển đổi dữ liệu người dùng cũ
// LegacyUser sang cấu trúc dữ liệu mới TargetCustomer.
// ============================================================================

export interface TargetCustomer {
  getFullName(): string;
  getEmail(): string;
  getAge(): number;
}

// Dữ liệu khách hàng cũ (Adaptee) - Không được sửa đổi lớp này
export class LegacyUser {
  constructor(
    public first_name: string,
    public last_name: string,
    public contact_email: string,
    public birth_year: number,
  ) {}
}

// Adapter cần triển khai
export class CustomerDataAdapter implements TargetCustomer {
  constructor(private legacyUser: LegacyUser) {}

  public getFullName(): string {
    // TODO: Trả về họ và tên đầy đủ bằng cách ghép first_name và last_name cách nhau bởi khoảng trắng
    return `${this.legacyUser.first_name} ${this.legacyUser.last_name}`;
  }

  public getEmail(): string {
    // TODO: Trả về email liên hệ (contact_email)
    return this.legacyUser.contact_email;
  }

  public getAge(): number {
    // TODO: Tính tuổi dựa trên năm hiện tại là 2026 trừ đi năm sinh birth_year
    return new Date().getFullYear() - this.legacyUser.birth_year;
  }
}

// ============================================================================
// BÀI TẬP 3: BỘ CHUYỂN ĐỔI ĐỒ HỌA VECTOR SANG RASTER (VECTOR TO RASTER ADAPTER)
// Đề bài: Tạo bộ chuyển đổi giúp vẽ các đường thẳng Vector bằng cách chuyển thành
// các điểm ảnh Raster rời rạc (pixel).
// ============================================================================

export interface VectorGraphics {
  drawVectorLine(x1: number, y1: number, x2: number, y2: number): void;
}

// Dịch vụ vẽ đồ họa raster cũ (Adaptee) - Không được sửa đổi lớp này
export class RasterGraphicsService {
  public drawnPoints: { x: number; y: number }[] = [];

  public drawRasterPoint(x: number, y: number): void {
    this.drawnPoints.push({ x, y });
  }
}

// Adapter cần triển khai
export class VectorToRasterAdapter implements VectorGraphics {
  constructor(private rasterService: RasterGraphicsService) {}

  public drawVectorLine(x1: number, y1: number, x2: number, y2: number): void {
    // TODO: Chuyển đổi đường thẳng Vector từ (x1, y1) đến (x2, y2) thành 3 điểm Raster:
    // 1. Điểm bắt đầu: (x1, y1)
    // 2. Điểm trung điểm: (x_mid, y_mid) với x_mid = Math.floor((x1 + x2) / 2) và y_mid = Math.floor((y1 + y2) / 2)
    // 3. Điểm kết thúc: (x2, y2)
    // Gọi phương thức drawRasterPoint của rasterService cho 3 điểm trên.
    const midX = Math.floor((x1 + x2) / 2);
    const midY = Math.floor((y1 + y2) / 2);

    this.rasterService.drawRasterPoint(x1, y1);
    this.rasterService.drawRasterPoint(midX, midY);
    this.rasterService.drawRasterPoint(x2, y2);
  }
}

// ============================================================================
// CLIENT CODE (DÙNG ĐỂ CHẠY THỬ NGHIỆM)
// ============================================================================
async function runTests() {
  console.log("=== THỬ NGHIỆM BÀI TẬP 1 ===");
  try {
    const successService = new GlobalPayService(true);
    const adapter1 = new GlobalPayAdapter(successService, 25000);

    // Test thanh toán thành công và làm tròn số tiền
    adapter1.pay(250000); // 10 USD
    const usdCharged1 = successService.lastChargedAmountUSD;
    const test1_1 = usdCharged1 === 10;
    console.log(`  - Test 1.1: Thanh toán 250,000 VND (tỷ giá 25,000) -> Thực tế: ${usdCharged1} USD | Mong đợi: 10 USD [${test1_1 ? "OK" : "FAIL"}]`);

    adapter1.pay(100000); // 4 USD
    const usdCharged2 = successService.lastChargedAmountUSD;
    const test1_2 = usdCharged2 === 4;
    console.log(`  - Test 1.2: Thanh toán 100,000 VND (tỷ giá 25,000) -> Thực tế: ${usdCharged2} USD | Mong đợi: 4 USD [${test1_2 ? "OK" : "FAIL"}]`);

    // Test làm tròn số lẻ (125,000 VND / 25,400 rate ~ 4.921 -> 4.92 USD)
    const rateService = new GlobalPayService(true);
    const adapter2 = new GlobalPayAdapter(rateService, 25400);
    adapter2.pay(125000);
    const usdCharged3 = rateService.lastChargedAmountUSD;
    const test1_3 = usdCharged3 === 4.92;
    console.log(`  - Test 1.3: Làm tròn 125,000 VND (tỷ giá 25,400) -> Thực tế: ${usdCharged3} USD | Mong đợi: 4.92 USD [${test1_3 ? "OK" : "FAIL"}]`);

    // Test trường hợp thất bại ném ra lỗi
    const failService = new GlobalPayService(false);
    const adapter3 = new GlobalPayAdapter(failService, 25000);
    let test1_4 = false;
    let errorMsg = "";
    try {
      adapter3.pay(100000);
    } catch (e) {
      test1_4 = true;
      errorMsg = e instanceof Error ? e.message : String(e);
    }
    console.log(`  - Test 1.4: Ném lỗi khi thanh toán thất bại -> Thực tế: ${test1_4 ? `Ném lỗi "${errorMsg}"` : "Không ném lỗi"} | Mong đợi: Ném lỗi [${test1_4 ? "OK" : "FAIL"}]`);

    if (test1_1 && test1_2 && test1_3 && test1_4) {
      console.log(
        "\x1b[32m  ✓ Thành công: GlobalPayAdapter chuyển đổi tiền tệ, làm tròn và bắt lỗi chính xác.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: GlobalPayAdapter tính toán sai hoặc không ném ra lỗi khi thanh toán thất bại.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 1 chưa hoàn thiện:\x1b[0m", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 ===");
  try {
    const legacyUser = new LegacyUser(
      "John",
      "Doe",
      "john.doe@gmail.com",
      1996,
    );
    const adapter = new CustomerDataAdapter(legacyUser);

    const actualFullName = adapter.getFullName();
    const test2_1 = actualFullName === "John Doe";
    console.log(`  - Test 2.1: Lấy họ tên đầy đủ -> Thực tế: "${actualFullName}" | Mong đợi: "John Doe" [${test2_1 ? "OK" : "FAIL"}]`);

    const actualEmail = adapter.getEmail();
    const test2_2 = actualEmail === "john.doe@gmail.com";
    console.log(`  - Test 2.2: Lấy email -> Thực tế: "${actualEmail}" | Mong đợi: "john.doe@gmail.com" [${test2_2 ? "OK" : "FAIL"}]`);

    const actualAge = adapter.getAge();
    const test2_3 = actualAge === 30; // 2026 - 1996 = 30
    console.log(`  - Test 2.3: Tính tuổi -> Thực tế: ${actualAge} tuổi | Mong đợi: 30 tuổi [${test2_3 ? "OK" : "FAIL"}]`);

    if (test2_1 && test2_2 && test2_3) {
      console.log(
        "\x1b[32m  ✓ Thành công: CustomerDataAdapter chuyển đổi thông tin người dùng chính xác.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Thông tin trả về từ CustomerDataAdapter không đúng yêu cầu.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 2 chưa hoàn thiện:\x1b[0m", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 3 ===");
  try {
    const rasterService = new RasterGraphicsService();
    const adapter = new VectorToRasterAdapter(rasterService);

    adapter.drawVectorLine(0, 0, 10, 10);

    const points = rasterService.drawnPoints;
    const test3_1 = points.length === 3;
    const test3_2 = points[0]?.x === 0 && points[0]?.y === 0; // Điểm đầu
    const test3_3 = points[1]?.x === 5 && points[1]?.y === 5; // Trung điểm
    const test3_4 = points[2]?.x === 10 && points[2]?.y === 10; // Điểm cuối

    console.log(`  - Test 3.1: Số lượng điểm vẽ -> Thực tế: ${points.length} | Mong đợi: 3 [${test3_1 ? "OK" : "FAIL"}]`);
    console.log(`  - Test 3.2: Điểm đầu -> Thực tế: ${JSON.stringify(points[0])} | Mong đợi: {"x":0,"y":0} [${test3_2 ? "OK" : "FAIL"}]`);
    console.log(`  - Test 3.3: Trung điểm -> Thực tế: ${JSON.stringify(points[1])} | Mong đợi: {"x":5,"y":5} [${test3_3 ? "OK" : "FAIL"}]`);
    console.log(`  - Test 3.4: Điểm cuối -> Thực tế: ${JSON.stringify(points[2])} | Mong đợi: {"x":10,"y":10} [${test3_4 ? "OK" : "FAIL"}]`);

    if (test3_1 && test3_2 && test3_3 && test3_4) {
      console.log(
        "\x1b[32m  ✓ Thành công: VectorToRasterAdapter chuyển đổi đường thẳng thành các điểm raster chuẩn.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Số lượng hoặc tọa độ các điểm vẽ được không chính xác.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 3 chưa hoàn thiện:\x1b[0m", message);
  }
}

runTests();
