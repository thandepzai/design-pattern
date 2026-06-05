/**
 * ============================================================================
 * VÍ DỤ MINH HỌA: DECORATOR PATTERN
 * Thư mục: 09-S-Decorator-pattern/index.ts
 *
 * Ngữ cảnh: Hệ thống tính tiền nước tại quán Cà phê (Coffee Shop).
 * - Component: Coffee (Giao diện chung cho đồ uống)
 * - Concrete Component: SimpleCoffee (Cà phê đen nguyên bản)
 * - Base Decorator: CoffeeDecorator (Lớp cơ sở cho các Topping trang trí)
 * - Concrete Decorators: MilkDecorator, SugarDecorator (Các topping cụ thể thêm vào)
 * ============================================================================
 */

// ============================================================================
// 1. COMPONENT INTERFACE
// ============================================================================
interface Coffee {
  getDescription(): string;
  getCost(): number;
}

// ============================================================================
// 2. CONCRETE COMPONENT
// ============================================================================
class SimpleCoffee implements Coffee {
  public getDescription(): string {
    return "Cà phê đen";
  }

  public getCost(): number {
    return 15; // 15.000 VND
  }
}

// ============================================================================
// 3. BASE DECORATOR
// ============================================================================
abstract class CoffeeDecorator implements Coffee {
  protected coffee: Coffee; // Đối tượng được bao bọc (wrapee)

  constructor(coffee: Coffee) {
    this.coffee = coffee;
  }

  public getDescription(): string {
    return this.coffee.getDescription();
  }

  public getCost(): number {
    return this.coffee.getCost();
  }
}

// ============================================================================
// 4. CONCRETE DECORATORS (Các thành phần trang trí cụ thể)
// ============================================================================

// Thêm Sữa
class MilkDecorator extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  public getDescription(): string {
    return `${super.getDescription()} + Sữa`;
  }

  public getCost(): number {
    return super.getCost() + 5; // Cộng thêm 5.000 VND
  }
}

// Thêm Kem Phủ
class WhipDecorator extends CoffeeDecorator {
  constructor(coffee: Coffee) {
    super(coffee);
  }

  public getDescription(): string {
    return `${super.getDescription()} + Kem phủ`;
  }

  public getCost(): number {
    return super.getCost() + 8; // Cộng thêm 8.000 VND
  }
}

// ============================================================================
// THỬ NGHIỆM CHẠY CHƯƠNG TRÌNH
// ============================================================================
function runExample() {
  console.log("=== CHẠY VÍ DỤ MINH HỌA DECORATOR PATTERN ===\n");

  // 1. Đặt 1 ly cà phê đen nguyên chất
  let myCoffee: Coffee = new SimpleCoffee();
  console.log(`☕ Đồ uống: ${myCoffee.getDescription()} | Giá: ${myCoffee.getCost()}.000đ`);

  // 2. Khách muốn thêm sữa vào ly cà phê đó
  myCoffee = new MilkDecorator(myCoffee);
  console.log(`☕ Đồ uống: ${myCoffee.getDescription()} | Giá: ${myCoffee.getCost()}.000đ`);

  // 3. Khách muốn thêm tiếp lớp kem phủ lên trên ly cà phê sữa
  myCoffee = new WhipDecorator(myCoffee);
  console.log(`☕ Đồ uống: ${myCoffee.getDescription()} | Giá: ${myCoffee.getCost()}.000đ`);

  // 4. Tạo một ly cà phê đặc biệt: Cà phê đen thêm 2 phần sữa
  let doubleMilkCoffee: Coffee = new SimpleCoffee();
  doubleMilkCoffee = new MilkDecorator(doubleMilkCoffee);
  doubleMilkCoffee = new MilkDecorator(doubleMilkCoffee);
  console.log(`\n☕ Đồ uống đặc biệt: ${doubleMilkCoffee.getDescription()} | Giá: ${doubleMilkCoffee.getCost()}.000đ`);
}

runExample();
