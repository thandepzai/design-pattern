/**
 * ============================================================================
 * VÍ DỤ MINH HỌA: VISITOR PATTERN
 * Thư mục: 23-B-Visitor-pattern/index.ts
 *
 * Ngữ cảnh: Hệ thống tính toán cho giỏ hàng (Shopping Cart).
 * - Các loại sản phẩm (Elements): Book (Sách), Fruit (Trái cây), Electronics (Đồ điện tử).
 * - Visitor: ShoppingCartVisitor interface.
 * - Concrete Visitors:
 *   1. PriceCalculator: Tính tổng tiền (Sách được giảm 10%, Trái cây tính theo kg, Đồ điện tử thêm 10% VAT).
 *   2. ShippingWeightCalculator: Tính tổng khối lượng để tính phí ship.
 * ============================================================================
 */

// ============================================================================
// 1. VISITOR INTERFACE - Khai báo các phương thức viếng thăm từng loại sản phẩm
// ============================================================================
interface ShoppingCartVisitor {
  visitBook(book: Book): number;
  visitFruit(fruit: Fruit): number;
  visitElectronics(electronics: Electronics): number;
}

// ============================================================================
// 2. ELEMENT INTERFACE - Chấp nhận một Visitor vào xử lý
// ============================================================================
interface ItemElement {
  accept(visitor: ShoppingCartVisitor): number;
}

// ============================================================================
// 3. CONCRETE ELEMENTS - Các class sản phẩm chỉ chứa dữ liệu thô
// ============================================================================
class Book implements ItemElement {
  constructor(
    public readonly title: string,
    public readonly price: number,
    public readonly weightGrams: number
  ) {}

  accept(visitor: ShoppingCartVisitor): number {
    return visitor.visitBook(this);
  }
}

class Fruit implements ItemElement {
  constructor(
    public readonly name: string,
    public readonly pricePerKg: number,
    public readonly weightKg: number
  ) {}

  accept(visitor: ShoppingCartVisitor): number {
    return visitor.visitFruit(this);
  }
}

class Electronics implements ItemElement {
  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly packageWeightGrams: number
  ) {}

  accept(visitor: ShoppingCartVisitor): number {
    return visitor.visitElectronics(this);
  }
}

// ============================================================================
// 4. CONCRETE VISITORS - Đóng gói các thuật toán tính toán riêng biệt
// ============================================================================

/** Bộ tính tiền cho từng loại sản phẩm */
class PriceCalculator implements ShoppingCartVisitor {
  visitBook(book: Book): number {
    // Sách được ưu đãi giảm giá 10%
    const discountedPrice = book.price * 0.9;
    console.log(`  [Giá tiền] Sách "${book.title}": ${book.price}đ -> Giảm 10% còn ${discountedPrice}đ`);
    return discountedPrice;
  }

  visitFruit(fruit: Fruit): number {
    // Trái cây tính theo khối lượng thực tế (kg)
    const totalPrice = fruit.pricePerKg * fruit.weightKg;
    console.log(`  [Giá tiền] Trái cây "${fruit.name}": ${fruit.weightKg}kg x ${fruit.pricePerKg}đ/kg = ${totalPrice}đ`);
    return totalPrice;
  }

  visitElectronics(electronics: Electronics): number {
    // Đồ điện tử chịu thêm 10% VAT
    const tax = electronics.price * 0.1;
    const finalPrice = electronics.price + tax;
    console.log(`  [Giá tiền] Đồ điện tử "${electronics.name}": ${electronics.price}đ + 10% VAT = ${finalPrice}đ`);
    return finalPrice;
  }
}

/** Bộ tính tổng cân nặng để tính phí vận chuyển */
class ShippingWeightCalculator implements ShoppingCartVisitor {
  visitBook(book: Book): number {
    console.log(`  [Cân nặng] Sách "${book.title}": ${book.weightGrams}g`);
    return book.weightGrams;
  }

  visitFruit(fruit: Fruit): number {
    // Đổi từ kg sang gram
    const weightGrams = fruit.weightKg * 1000;
    console.log(`  [Cân nặng] Trái cây "${fruit.name}": ${weightGrams}g`);
    return weightGrams;
  }

  visitElectronics(electronics: Electronics): number {
    console.log(`  [Cân nặng] Đồ điện tử "${electronics.name}": ${electronics.packageWeightGrams}g`);
    return electronics.packageWeightGrams;
  }
}

// ============================================================================
// THỬ NGHIỆM CHẠY VÍ DỤ
// ============================================================================
function runExample() {
  console.log("=== CHẠY VÍ DỤ MINH HỌA VISITOR PATTERN (GIỎ HÀNG) ===\n");

  // Giỏ hàng chứa nhiều loại sản phẩm khác nhau
  const cart: ItemElement[] = [
    new Book("Clean Code", 150000, 450),
    new Fruit("Táo Envy", 80000, 1.5),
    new Electronics("Bàn phím cơ", 1200000, 800),
  ];

  // --- 1. Tính tổng số tiền ---
  console.log("━━━ 1. THỰC HIỆN TÍNH GIÁ TIỀN ━━━");
  const priceCalculator = new PriceCalculator();
  let totalAmount = 0;
  cart.forEach(item => {
    totalAmount += item.accept(priceCalculator);
  });
  console.log(`👉 Tổng số tiền trong giỏ hàng: ${totalAmount}đ\n`);

  // --- 2. Tính tổng cân nặng để giao hàng ---
  console.log("━━━ 2. THỰC HIỆN TÍNH CÂN NẶNG VẬN CHUYỂN ━━━");
  const weightCalculator = new ShippingWeightCalculator();
  let totalWeight = 0;
  cart.forEach(item => {
    totalWeight += item.accept(weightCalculator);
  });
  console.log(`👉 Tổng khối lượng giỏ hàng: ${totalWeight}g (${totalWeight / 1000}kg)`);

  console.log("\n━━━ KẾT LUẬN VỀ SỨC MẠNH CỦA VISITOR ━━━");
  console.log("✓ Bạn có thể dễ dàng thêm tính năng mới (ví dụ: in hóa đơn, tích lũy điểm thưởng) bằng cách viết thêm Visitor mới.");
  console.log("✓ Hoàn toàn không cần sửa đổi bất kỳ thuộc tính hay phương thức nào của các class Book, Fruit, Electronics.");
}

runExample();
