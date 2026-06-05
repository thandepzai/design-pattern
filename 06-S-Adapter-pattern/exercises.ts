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
    throw new Error("Chưa triển khai");
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
    public birth_year: number
  ) {}
}

// Adapter cần triển khai
export class CustomerDataAdapter implements TargetCustomer {
  private legacyUser: LegacyUser;

  constructor(legacyUser: LegacyUser) {
    this.legacyUser = legacyUser;
  }

  public getFullName(): string {
    // TODO: Trả về họ và tên đầy đủ bằng cách ghép first_name và last_name cách nhau bởi khoảng trắng
    throw new Error("Chưa triển khai");
  }

  public getEmail(): string {
    // TODO: Trả về email liên hệ (contact_email)
    throw new Error("Chưa triển khai");
  }

  public getAge(): number {
    // TODO: Tính tuổi dựa trên năm hiện tại là 2026 trừ đi năm sinh birth_year
    throw new Error("Chưa triển khai");
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
  private rasterService: RasterGraphicsService;

  constructor(rasterService: RasterGraphicsService) {
    this.rasterService = rasterService;
  }

  public drawVectorLine(x1: number, y1: number, x2: number, y2: number): void {
    // TODO: Chuyển đổi đường thẳng Vector từ (x1, y1) đến (x2, y2) thành 3 điểm Raster:
    // 1. Điểm bắt đầu: (x1, y1)
    // 2. Điểm trung điểm: (x_mid, y_mid) với x_mid = Math.floor((x1 + x2) / 2) và y_mid = Math.floor((y1 + y2) / 2)
    // 3. Điểm kết thúc: (x2, y2)
    // Gọi phương thức drawRasterPoint của rasterService cho 3 điểm trên.
    throw new Error("Chưa triển khai");
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
    const test1_1 = successService.lastChargedAmountUSD === 10;

    adapter1.pay(100000); // 4 USD
    const test1_2 = successService.lastChargedAmountUSD === 4;

    // Test làm tròn số lẻ (125,000 VND / 25,400 rate ~ 4.921 -> 4.92 USD)
    const rateService = new GlobalPayService(true);
    const adapter2 = new GlobalPayAdapter(rateService, 25400);
    adapter2.pay(125000);
    const test1_3 = rateService.lastChargedAmountUSD === 4.92;

    // Test trường hợp thất bại ném ra lỗi
    const failService = new GlobalPayService(false);
    const adapter3 = new GlobalPayAdapter(failService, 25000);
    let test1_4 = false;
    try {
      adapter3.pay(100000);
    } catch (e) {
      test1_4 = true;
    }

    if (test1_1 && test1_2 && test1_3 && test1_4) {
      console.log(
        "\x1b[32m  ✓ Thành công: GlobalPayAdapter chuyển đổi tiền tệ, làm tròn và bắt lỗi chính xác.\x1b[0m"
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: GlobalPayAdapter tính toán sai hoặc không ném ra lỗi khi thanh toán thất bại.\x1b[0m"
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 1 chưa hoàn thiện:\x1b[0m", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 ===");
  try {
    const legacyUser = new LegacyUser("John", "Doe", "john.doe@gmail.com", 1996);
    const adapter = new CustomerDataAdapter(legacyUser);

    const test2_1 = adapter.getFullName() === "John Doe";
    const test2_2 = adapter.getEmail() === "john.doe@gmail.com";
    const test2_3 = adapter.getAge() === 30; // 2026 - 1996 = 30

    if (test2_1 && test2_2 && test2_3) {
      console.log(
        "\x1b[32m  ✓ Thành công: CustomerDataAdapter chuyển đổi thông tin người dùng chính xác.\x1b[0m"
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Thông tin trả về từ CustomerDataAdapter không đúng yêu cầu.\x1b[0m"
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

    if (test3_1 && test3_2 && test3_3 && test3_4) {
      console.log(
        "\x1b[32m  ✓ Thành công: VectorToRasterAdapter chuyển đổi đường thẳng thành các điểm raster chuẩn.\x1b[0m"
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Số lượng hoặc tọa độ các điểm vẽ được không chính xác.\x1b[0m"
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 3 chưa hoàn thiện:\x1b[0m", message);
  }
}

runTests();
