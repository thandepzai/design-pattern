/**
 * ============================================================================
 * VÍ DỤ MINH HỌA: TEMPLATE METHOD PATTERN
 * Thư mục: 22-B-TemplateMethod-pattern/index.ts
 *
 * Ngữ cảnh: Quy trình pha đồ uống (Beverage Preparation).
 * - Tất cả đồ uống đều có cùng khung quy trình: đun nước -> pha -> rót -> phụ gia.
 * - Tea: ngâm túi trà, thêm chanh và mật ong.
 * - Coffee: pha qua máy espresso, thêm sữa và đường.
 * - GreenTea: ngâm trà xanh, KHÔNG thêm phụ gia (override hook).
 * ============================================================================
 */

// ============================================================================
// 1. ABSTRACT CLASS VỚI TEMPLATE METHOD
// ============================================================================
abstract class Beverage {
  // Template Method - bộ khung quy trình, không được override
  prepare(): void {
    console.log(`\n☕ Bắt đầu pha: ${this.getName()}`);
    console.log("─".repeat(40));
    this.boilWater();
    this.brew();
    this.pourInCup();
    if (this.customerWantsCondiments()) {
      this.addCondiments();
    } else {
      console.log("  [Bỏ qua bước phụ gia theo yêu cầu]");
    }
    console.log(`✅ Hoàn thành: ${this.getName()} đã sẵn sàng phục vụ!\n`);
  }

  // Bước dùng chung - không cần override
  private boilWater(): void {
    console.log("  1. Đun nước đến 100°C...");
  }

  private pourInCup(): void {
    console.log("  3. Rót vào ly và trang trí...");
  }

  // 2. Abstract Methods - lớp con bắt buộc phải triển khai
  protected abstract getName(): string;
  protected abstract brew(): void;
  protected abstract addCondiments(): void;

  // 3. Hook Method - lớp con có thể override (mặc định: muốn phụ gia)
  protected customerWantsCondiments(): boolean {
    return true;
  }
}

// ============================================================================
// 2. CONCRETE CLASSES
// ============================================================================
class Tea extends Beverage {
  protected getName(): string {
    return "Trà Lài";
  }

  protected brew(): void {
    console.log("  2. Ngâm túi trà lài trong nước nóng 5 phút...");
  }

  protected addCondiments(): void {
    console.log("  4. Thêm 2 lát chanh tươi và 1 thìa mật ong...");
  }
}

class Coffee extends Beverage {
  private withMilk: boolean;

  constructor(withMilk: boolean = true) {
    super();
    this.withMilk = withMilk;
  }

  protected getName(): string {
    return this.withMilk ? "Cà Phê Sữa" : "Cà Phê Đen";
  }

  protected brew(): void {
    console.log("  2. Ép cà phê Arabica qua máy espresso 9 bar...");
  }

  protected addCondiments(): void {
    if (this.withMilk) {
      console.log("  4. Thêm sữa tươi đánh bông và 1 thìa đường...");
    } else {
      console.log("  4. Thêm 1/2 thìa đường nâu...");
    }
  }
}

class GreenTea extends Beverage {
  protected getName(): string {
    return "Trà Xanh Nhật Bản (Matcha)";
  }

  protected brew(): void {
    console.log("  2. Đánh bột matcha với nước ấm 80°C bằng chổi tre...");
  }

  protected addCondiments(): void {
    // Matcha thuần túy không thêm phụ gia
    console.log("  [Không thêm phụ gia]");
  }

  // Override hook: Matcha thuần túy không cần phụ gia
  protected customerWantsCondiments(): boolean {
    return false;
  }
}

// ============================================================================
// THỬ NGHIỆM CHẠY VÍ DỤ
// ============================================================================
function runExample() {
  console.log("=== CHẠY VÍ DỤ MINH HỌA TEMPLATE METHOD PATTERN ===");
  console.log(
    "Tất cả đồ uống đều chạy qua cùng một bộ khung quy trình.\n",
  );

  const beverages: Beverage[] = [
    new Tea(),
    new Coffee(true),
    new Coffee(false),
    new GreenTea(),
  ];

  for (const beverage of beverages) {
    beverage.prepare();
  }
}

runExample();
