/**
 * ============================================================================
 * BÀI TẬP THỰC HÀNH: VISITOR PATTERN
 * Thư mục: 23-B-Visitor-pattern/exercises.ts
 *
 * Hướng dẫn: Điền mã nguồn vào các phần có đánh dấu // TODO.
 * Chạy file này bằng tsx hoặc ts-node để kiểm tra kết quả.
 * ============================================================================
 */

export const operationLogs: string[] = [];

// ============================================================================
// BÀI TẬP 1: HỆ THỐNG TÍNH THUẾ HÀNG HÓA
// ============================================================================

export interface TaxVisitor {
  visitFood(item: FoodItem): void;
  visitElectronics(item: ElectronicsItem): void;
  visitClothing(item: ClothingItem): void;
}

export interface TaxableItem {
  accept(visitor: TaxVisitor): void;
}

export class FoodItem implements TaxableItem {
  constructor(
    public readonly name: string,
    public readonly price: number
  ) {}

  accept(visitor: TaxVisitor): void {
    // TODO: Gọi đúng method trên visitor theo kỹ thuật double dispatch
  }
}

export class ElectronicsItem implements TaxableItem {
  constructor(
    public readonly name: string,
    public readonly price: number
  ) {}

  accept(visitor: TaxVisitor): void {
    // TODO: Gọi đúng method trên visitor theo kỹ thuật double dispatch
  }
}

export class ClothingItem implements TaxableItem {
  constructor(
    public readonly name: string,
    public readonly price: number
  ) {}

  accept(visitor: TaxVisitor): void {
    // TODO: Gọi đúng method trên visitor theo kỹ thuật double dispatch
  }
}

export class StandardTaxVisitor implements TaxVisitor {
  visitFood(item: FoodItem): void {
    // TODO: Thuế 0%. Log format:
    // "TAX_STANDARD: Thực phẩm '${name}' giá $${price} - Thuế 0% = $0"
  }

  visitElectronics(item: ElectronicsItem): void {
    // TODO: Thuế 10%. Log format:
    // "TAX_STANDARD: Điện tử '${name}' giá $${price} - Thuế 10% = $${tax}"
    // tax = price * 0.10 (số nguyên, không toFixed)
  }

  visitClothing(item: ClothingItem): void {
    // TODO: Thuế 5%. Log format:
    // "TAX_STANDARD: Quần áo '${name}' giá $${price} - Thuế 5% = $${tax}"
    // tax = price * 0.05 (số nguyên, không toFixed)
  }
}

export class DiscountTaxVisitor implements TaxVisitor {
  visitFood(item: FoodItem): void {
    // TODO: Thuế 0% (giảm 50% của 0% vẫn là 0%). Log format:
    // "TAX_DISCOUNT: Thực phẩm '${name}' giá $${price} - Thuế 0% = $0"
  }

  visitElectronics(item: ElectronicsItem): void {
    // TODO: Thuế giảm 50%: 10% -> 5%. Log format:
    // "TAX_DISCOUNT: Điện tử '${name}' giá $${price} - Thuế 5% = $${tax}"
    // tax = price * 0.05
  }

  visitClothing(item: ClothingItem): void {
    // TODO: Thuế giảm 50%: 5% -> 2.5%. Log format:
    // "TAX_DISCOUNT: Quần áo '${name}' giá $${price} - Thuế 2.5% = $${tax}"
    // tax = price * 0.025 (số nguyên, không toFixed)
  }
}

// ============================================================================
// BÀI TẬP 2: TÍNH DIỆN TÍCH VÀ CHU VI HÌNH HỌC
// ============================================================================

export interface ShapeVisitor {
  visitCircle(c: Circle): void;
  visitRectangle(r: Rectangle): void;
  visitTriangle(t: Triangle): void;
}

export interface Shape {
  accept(visitor: ShapeVisitor): void;
}

export class Circle implements Shape {
  constructor(public readonly radius: number) {}

  accept(visitor: ShapeVisitor): void {
    // TODO: Gọi đúng method trên visitor
  }
}

export class Rectangle implements Shape {
  constructor(
    public readonly width: number,
    public readonly height: number
  ) {}

  accept(visitor: ShapeVisitor): void {
    // TODO: Gọi đúng method trên visitor
  }
}

export class Triangle implements Shape {
  constructor(
    public readonly a: number,
    public readonly b: number,
    public readonly c: number
  ) {}

  accept(visitor: ShapeVisitor): void {
    // TODO: Gọi đúng method trên visitor
  }
}

export class AreaVisitor implements ShapeVisitor {
  visitCircle(c: Circle): void {
    // TODO: area = Math.PI * r * r
    // Log format: "AREA: Hình tròn r=${r} - Diện tích = ${area.toFixed(2)}"
  }

  visitRectangle(r: Rectangle): void {
    // TODO: area = width * height
    // Log format: "AREA: Hình chữ nhật ${w}x${h} - Diện tích = ${area}"
  }

  visitTriangle(t: Triangle): void {
    // TODO: Công thức Heron
    // s = (a + b + c) / 2
    // area = Math.sqrt(s * (s-a) * (s-b) * (s-c))
    // Log format: "AREA: Tam giác ${a}/${b}/${c} - Diện tích = ${area.toFixed(2)}"
  }
}

export class PerimeterVisitor implements ShapeVisitor {
  visitCircle(c: Circle): void {
    // TODO: perimeter = 2 * Math.PI * r
    // Log format: "PERIMETER: Hình tròn r=${r} - Chu vi = ${peri.toFixed(2)}"
  }

  visitRectangle(r: Rectangle): void {
    // TODO: perimeter = 2 * (width + height)
    // Log format: "PERIMETER: Hình chữ nhật ${w}x${h} - Chu vi = ${peri}"
  }

  visitTriangle(t: Triangle): void {
    // TODO: perimeter = a + b + c
    // Log format: "PERIMETER: Tam giác ${a}/${b}/${c} - Chu vi = ${peri}"
  }
}

// ============================================================================
// CLIENT CODE (DÙNG ĐỂ CHẠY THỬ NGHIỆM)
// ============================================================================
async function runTests() {
  // --- BÀI TẬP 1 ---
  console.log("=== THỬ NGHIỆM BÀI TẬP 1 (HỆ THỐNG TÍNH THUẾ) ===");
  try {
    operationLogs.length = 0;

    const items: TaxableItem[] = [
      new FoodItem("Gạo Jasmine", 50),
      new ElectronicsItem("Laptop Dell", 1000),
      new ClothingItem("Áo Polo", 80),
    ];

    const standardVisitor = new StandardTaxVisitor();
    const discountVisitor = new DiscountTaxVisitor();

    // Áp dụng thuế tiêu chuẩn
    items.forEach(item => item.accept(standardVisitor));

    // Test 1.1: Kiểm tra log thuế thực phẩm (0%)
    const test1_1 = operationLogs.includes(
      "TAX_STANDARD: Thực phẩm 'Gạo Jasmine' giá $50 - Thuế 0% = $0"
    );
    console.log(
      `  - Test 1.1: Thực phẩm thuế 0% -> [${test1_1 ? "OK" : "FAIL"}]`
    );

    // Test 1.2: Kiểm tra log thuế điện tử (10%)
    const test1_2 = operationLogs.includes(
      "TAX_STANDARD: Điện tử 'Laptop Dell' giá $1000 - Thuế 10% = $100"
    );
    console.log(
      `  - Test 1.2: Điện tử thuế 10% -> [${test1_2 ? "OK" : "FAIL"}]`
    );

    // Test 1.3: Kiểm tra log thuế quần áo (5%)
    const test1_3 = operationLogs.includes(
      "TAX_STANDARD: Quần áo 'Áo Polo' giá $80 - Thuế 5% = $4"
    );
    console.log(
      `  - Test 1.3: Quần áo thuế 5% -> [${test1_3 ? "OK" : "FAIL"}]`
    );

    // Áp dụng thuế khuyến mãi (giảm 50%)
    items.forEach(item => item.accept(discountVisitor));

    // Test 1.4: Kiểm tra log thuế điện tử với discount (5%)
    const test1_4 = operationLogs.includes(
      "TAX_DISCOUNT: Điện tử 'Laptop Dell' giá $1000 - Thuế 5% = $50"
    );
    console.log(
      `  - Test 1.4: Điện tử thuế khuyến mãi 5% -> [${test1_4 ? "OK" : "FAIL"}]`
    );

    // Test 1.5: Kiểm tra log thuế quần áo với discount (2.5%)
    const test1_5 = operationLogs.includes(
      "TAX_DISCOUNT: Quần áo 'Áo Polo' giá $80 - Thuế 2.5% = $2"
    );
    console.log(
      `  - Test 1.5: Quần áo thuế khuyến mãi 2.5% -> [${test1_5 ? "OK" : "FAIL"}]`
    );

    if (test1_1 && test1_2 && test1_3 && test1_4 && test1_5) {
      console.log(
        "\x1b[32m  ✓ Thành công: TaxVisitor tính thuế chính xác cho tất cả loại hàng hóa.\x1b[0m"
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Một hoặc nhiều phép tính thuế chưa đúng.\x1b[0m"
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 1 chưa hoàn thiện:\x1b[0m", message);
  }

  // --- BÀI TẬP 2 ---
  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 (TÍNH DIỆN TÍCH VÀ CHU VI) ===");
  try {
    operationLogs.length = 0;

    const shapes: Shape[] = [
      new Circle(5),
      new Rectangle(4, 6),
      new Triangle(3, 4, 5),
    ];

    const areaVisitor = new AreaVisitor();
    const perimeterVisitor = new PerimeterVisitor();

    shapes.forEach(s => s.accept(areaVisitor));
    shapes.forEach(s => s.accept(perimeterVisitor));

    // Test 2.1: Diện tích hình tròn r=5 ≈ 78.54
    const test2_1 = operationLogs.includes(
      "AREA: Hình tròn r=5 - Diện tích = 78.54"
    );
    console.log(
      `  - Test 2.1: Diện tích hình tròn r=5 = 78.54 -> [${test2_1 ? "OK" : "FAIL"}]`
    );

    // Test 2.2: Diện tích hình chữ nhật 4x6 = 24
    const test2_2 = operationLogs.includes(
      "AREA: Hình chữ nhật 4x6 - Diện tích = 24"
    );
    console.log(
      `  - Test 2.2: Diện tích hình chữ nhật 4x6 = 24 -> [${test2_2 ? "OK" : "FAIL"}]`
    );

    // Test 2.3: Diện tích tam giác 3/4/5 = 6.00 (tam giác vuông)
    const test2_3 = operationLogs.includes(
      "AREA: Tam giác 3/4/5 - Diện tích = 6.00"
    );
    console.log(
      `  - Test 2.3: Diện tích tam giác 3/4/5 = 6.00 -> [${test2_3 ? "OK" : "FAIL"}]`
    );

    // Test 2.4: Chu vi hình tròn r=5 ≈ 31.42
    const test2_4 = operationLogs.includes(
      "PERIMETER: Hình tròn r=5 - Chu vi = 31.42"
    );
    console.log(
      `  - Test 2.4: Chu vi hình tròn r=5 = 31.42 -> [${test2_4 ? "OK" : "FAIL"}]`
    );

    // Test 2.5: Chu vi hình chữ nhật 4x6 = 20
    const test2_5 = operationLogs.includes(
      "PERIMETER: Hình chữ nhật 4x6 - Chu vi = 20"
    );
    console.log(
      `  - Test 2.5: Chu vi hình chữ nhật 4x6 = 20 -> [${test2_5 ? "OK" : "FAIL"}]`
    );

    // Test 2.6: Chu vi tam giác 3/4/5 = 12
    const test2_6 = operationLogs.includes(
      "PERIMETER: Tam giác 3/4/5 - Chu vi = 12"
    );
    console.log(
      `  - Test 2.6: Chu vi tam giác 3/4/5 = 12 -> [${test2_6 ? "OK" : "FAIL"}]`
    );

    if (test2_1 && test2_2 && test2_3 && test2_4 && test2_5 && test2_6) {
      console.log(
        "\x1b[32m  ✓ Thành công: AreaVisitor và PerimeterVisitor tính toán chính xác tất cả hình học.\x1b[0m"
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Một hoặc nhiều phép tính hình học chưa đúng.\x1b[0m"
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 2 chưa hoàn thiện:\x1b[0m", message);
  }
}

runTests();
