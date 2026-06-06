/**
 * ============================================================================
 * BÀI TẬP THỰC HÀNH: INTERPRETER PATTERN
 * Thư mục: 15-B-Interpreter-pattern/exercises.ts
 *
 * Hướng dẫn: Điền mã nguồn vào các phần có đánh dấu // TODO.
 * Chạy file này bằng tsx hoặc ts-node để kiểm tra kết quả.
 * ============================================================================
 */

export const operationLogs: string[] = [];

// ============================================================================
// BÀI TẬP 1: BỘ LỌC DỮ LIỆU LOGIC (BOOLEAN FILTER INTERPRETER)
// ============================================================================

export class Product {
  constructor(
    public name: string,
    public category: string,
    public brand: string,
    public price: number
  ) {}
}

export interface BooleanExpression {
  interpret(product: Product): boolean;
}

export class EqualsExpression implements BooleanExpression {
  constructor(
    private key: keyof Product,
    private value: string | number
  ) {}

  public interpret(product: Product): boolean {
    // TODO: Triển khai các bước:
    // So sánh thuộc tính `this.key` của đối tượng `product` có bằng `this.value` không.
    // Trả về true nếu bằng, ngược lại trả về false.
    throw new Error("EqualsExpression chưa được triển khai!");
  }
}

export class AndExpression implements BooleanExpression {
  constructor(
    private left: BooleanExpression,
    private right: BooleanExpression
  ) {}

  public interpret(product: Product): boolean {
    // TODO: Đánh giá cả 2 biểu thức logic `left` và `right`.
    // Trả về true nếu cả 2 cùng trả về true, ngược lại trả về false.
    throw new Error("AndExpression chưa được triển khai!");
  }
}

export class OrExpression implements BooleanExpression {
  constructor(
    private left: BooleanExpression,
    private right: BooleanExpression
  ) {}

  public interpret(product: Product): boolean {
    // TODO: Đánh giá 2 biểu thức logic `left` và `right`.
    // Trả về true nếu ít nhất 1 biểu thức trả về true, ngược lại trả về false.
    throw new Error("OrExpression chưa được triển khai!");
  }
}

// ============================================================================
// BÀI TẬP 2: TRÌNH PHÂN TÍCH SỐ LA MÃ (ROMAN TO DECIMAL INTERPRETER)
// ============================================================================

export class RomanContext {
  constructor(
    public input: string,
    public output: number = 0
  ) {}

  public startsWith(str: string): boolean {
    if (!str || str.trim() === "") return false;
    return this.input.startsWith(str);
  }

  public consume(length: number): void {
    this.input = this.input.substring(length);
  }
}

export abstract class RomanExpression {
  public interpret(context: RomanContext): void {
    if (context.input.length === 0) return;

    if (context.startsWith(this.nine())) {
      context.output += 9 * this.multiplier();
      context.consume(this.nine().length);
    } else if (context.startsWith(this.five())) {
      context.output += 5 * this.multiplier();
      context.consume(this.five().length);
    } else if (context.startsWith(this.four())) {
      context.output += 4 * this.multiplier();
      context.consume(this.four().length);
    }

    while (context.startsWith(this.one())) {
      context.output += 1 * this.multiplier();
      context.consume(this.one().length);
    }
  }

  abstract one(): string;
  abstract four(): string;
  abstract five(): string;
  abstract nine(): string;
  abstract multiplier(): number;
}

export class ThousandExpression extends RomanExpression {
  // TODO: Triển khai các phương thức định nghĩa ký tự La Mã cho hàng NGHÌN:
  // - 1000: "M"
  // - Không có các ký tự cho 4000, 5000, 9000 (trả về chuỗi rỗng "" hoặc khoảng trắng " ")
  // - Hệ số nhân: 1000

  one(): string {
    throw new Error("ThousandExpression.one chưa được triển khai!");
  }
  four(): string {
    throw new Error("ThousandExpression.four chưa được triển khai!");
  }
  five(): string {
    throw new Error("ThousandExpression.five chưa được triển khai!");
  }
  nine(): string {
    throw new Error("ThousandExpression.nine chưa được triển khai!");
  }
  multiplier(): number {
    throw new Error("ThousandExpression.multiplier chưa được triển khai!");
  }
}

export class HundredExpression extends RomanExpression {
  // TODO: Triển khai ký tự La Mã cho hàng TRĂM:
  // - 100: "C"
  // - 400: "CD"
  // - 500: "D"
  // - 900: "CM"
  // - Hệ số nhân: 100

  one(): string {
    throw new Error("HundredExpression.one chưa được triển khai!");
  }
  four(): string {
    throw new Error("HundredExpression.four chưa được triển khai!");
  }
  five(): string {
    throw new Error("HundredExpression.five chưa được triển khai!");
  }
  nine(): string {
    throw new Error("HundredExpression.nine chưa được triển khai!");
  }
  multiplier(): number {
    throw new Error("HundredExpression.multiplier chưa được triển khai!");
  }
}

export class TenExpression extends RomanExpression {
  // TODO: Triển khai ký tự La Mã cho hàng CHỤC:
  // - 10: "X"
  // - 40: "XL"
  // - 50: "L"
  // - 90: "XC"
  // - Hệ số nhân: 10

  one(): string {
    throw new Error("TenExpression.one chưa được triển khai!");
  }
  four(): string {
    throw new Error("TenExpression.four chưa được triển khai!");
  }
  five(): string {
    throw new Error("TenExpression.five chưa được triển khai!");
  }
  nine(): string {
    throw new Error("TenExpression.nine chưa được triển khai!");
  }
  multiplier(): number {
    throw new Error("TenExpression.multiplier chưa được triển khai!");
  }
}

export class OneExpression extends RomanExpression {
  // TODO: Triển khai ký tự La Mã cho hàng ĐƠN VỊ:
  // - 1: "I"
  // - 4: "IV"
  // - 5: "V"
  // - 9: "IX"
  // - Hệ số nhân: 1

  one(): string {
    throw new Error("OneExpression.one chưa được triển khai!");
  }
  four(): string {
    throw new Error("OneExpression.four chưa được triển khai!");
  }
  five(): string {
    throw new Error("OneExpression.five chưa được triển khai!");
  }
  nine(): string {
    throw new Error("OneExpression.nine chưa được triển khai!");
  }
  multiplier(): number {
    throw new Error("OneExpression.multiplier chưa được triển khai!");
  }
}

// ============================================================================
// CLIENT CODE (DÙNG ĐỂ CHẠY THỬ NGHIỆM)
// ============================================================================
async function runTests() {
  console.log("=== THỬ NGHIỆM BÀI TẬP 1 (BOOLEAN FILTER INTERPRETER) ===");
  try {
    const p1 = new Product("MacBook Air", "Laptop", "Apple", 999);
    const p2 = new Product("iPhone 15 Pro", "Phone", "Apple", 1099);
    const p3 = new Product("Galaxy S24", "Phone", "Samsung", 899);

    // Xây dựng các biểu thức điều kiện lọc
    const isLaptop = new EqualsExpression("category", "Laptop");
    const isApple = new EqualsExpression("brand", "Apple");
    const isSamsung = new EqualsExpression("brand", "Samsung");

    // Lọc: Laptop VÀ Apple
    const isAppleLaptop = new AndExpression(isLaptop, isApple);

    // Lọc: Apple HOẶC Samsung
    const isAppleOrSamsung = new OrExpression(isApple, isSamsung);

    // Test 1.1: EqualsExpression
    const test1_1 = isLaptop.interpret(p1) === true && isLaptop.interpret(p2) === false;
    console.log(
      `  - Test 1.1: So sánh trực tiếp giá trị thuộc tính -> [${test1_1 ? "OK" : "FAIL"}]`
    );

    // Test 1.2: AndExpression
    const test1_2 = isAppleLaptop.interpret(p1) === true && isAppleLaptop.interpret(p2) === false;
    console.log(`  - Test 1.2: Kết hợp điều kiện VÀ (AND) -> [${test1_2 ? "OK" : "FAIL"}]`);

    // Test 1.3: OrExpression
    const test1_3 =
      isAppleOrSamsung.interpret(p2) === true &&
      isAppleOrSamsung.interpret(p3) === true &&
      isAppleOrSamsung.interpret(p1) === true; // MacBook Air cũng là Apple
    console.log(`  - Test 1.3: Kết hợp điều kiện HOẶC (OR) -> [${test1_3 ? "OK" : "FAIL"}]`);

    if (test1_1 && test1_2 && test1_3) {
      console.log(
        "\x1b[32m  ✓ Thành công: Bộ lọc logic BooleanExpression thông dịch chính xác.\x1b[0m"
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Kết quả phân tích biểu thức logic chưa đúng.\x1b[0m"
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 1 chưa hoàn thiện:\x1b[0m", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 (ROMAN TO DECIMAL INTERPRETER) ===");
  try {
    const expressions: RomanExpression[] = [
      new ThousandExpression(),
      new HundredExpression(),
      new TenExpression(),
      new OneExpression(),
    ];

    // Hàm tiện ích phân tích chuỗi La Mã qua cây biểu thức
    const parseRoman = (romanStr: string): number => {
      const context = new RomanContext(romanStr);
      for (const expr of expressions) {
        expr.interpret(context);
      }
      return context.output;
    };

    // Test 2.1: Chuyển đổi số đơn giản (III = 3)
    const test2_1 = parseRoman("III") === 3;
    console.log(`  - Test 2.1: Số La Mã đơn giản III -> 3 -> [${test2_1 ? "OK" : "FAIL"}]`);

    // Test 2.2: Quy tắc trừ (IV = 4, IX = 9)
    const test2_2 = parseRoman("IV") === 4 && parseRoman("IX") === 9;
    console.log(`  - Test 2.2: Quy tắc trừ IV -> 4, IX -> 9 -> [${test2_2 ? "OK" : "FAIL"}]`);

    // Test 2.3: Số phức tạp (MCMXCIV = 1994)
    // M = 1000, CM = 900, XC = 90, IV = 4. Tổng = 1994
    const test2_3 = parseRoman("MCMXCIV") === 1994;
    console.log(`  - Test 2.3: Số phức tạp MCMXCIV -> 1994 -> [${test2_3 ? "OK" : "FAIL"}]`);

    // Test 2.4: Một số khác (CCXLVI = 246)
    // CC = 200, XL = 40, VI = 6. Tổng = 246
    const test2_4 = parseRoman("CCXLVI") === 246;
    console.log(`  - Test 2.4: Số CCXLVI -> 246 -> [${test2_4 ? "OK" : "FAIL"}]`);

    if (test2_1 && test2_2 && test2_3 && test2_4) {
      console.log(
        "\x1b[32m  ✓ Thành công: Roman to Decimal Interpreter hoạt động hoàn hảo.\x1b[0m"
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Trình phân tích tính sai giá trị của số La Mã.\x1b[0m"
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 2 chưa hoàn thiện:\x1b[0m", message);
  }
}

runTests();
