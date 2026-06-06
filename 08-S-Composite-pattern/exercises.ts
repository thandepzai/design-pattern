/**
 * ============================================================================
 * BÀI TẬP THỰC HÀNH: COMPOSITE PATTERN
 * Thư mục: 08-S-Composite-pattern/exercises.ts
 *
 * Hướng dẫn: Điền mã nguồn vào các phần có đánh dấu // TODO.
 * Chạy file này bằng tsx hoặc ts-node để kiểm tra kết quả.
 * ============================================================================
 */

// ============================================================================
// BÀI TẬP 1: CÂY DANH MỤC MENU NHÀ HÀNG (RESTAURANT MENU TREE)
// Đề bài: Xây dựng thực đơn đa cấp cho phép in cấu trúc và tính tổng giá.
// ============================================================================

export interface MenuComponent {
  getName(): string;
  getPrice(): number;
  print(indent?: string): string;
}

// Leaf: Món ăn cụ thể
export class MenuItem implements MenuComponent {
  private name: string;
  private price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    // TODO: Trả về giá của món ăn
    return this.price;
  }

  public print(indent: string = ""): string {
    // TODO: Trả về chuỗi hiển thị theo cấu trúc: "{indent}- {name}: ${price}"
    // Ví dụ: "  - Cà phê sữa: $2.5"
    return `${indent}- ${this.name}: $${this.price}`;
  }
}

// Composite: Danh mục món ăn (chứa danh sách các MenuComponent con)
export class MenuSection implements MenuComponent {
  private name: string;
  private children: MenuComponent[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public add(component: MenuComponent): void {
    // TODO: Thêm component con vào danh sách
    this.children.push(component);
  }

  public remove(component: MenuComponent): void {
    // TODO: Xóa component con khỏi danh sách
    this.children = this.children.filter((child) => child !== component);
  }

  public getPrice(): number {
    // TODO: Tính tổng giá trị của toàn bộ các phần tử con bên trong
    let totalPrice = 0;
    for (const child of this.children) {
      totalPrice += child.getPrice();
    }
    return totalPrice;
  }

  public print(indent: string = ""): string {
    // TODO: Trả về chuỗi biểu diễn danh mục và các con của nó.
    // Dòng đầu: "{indent}[ {name} ]"
    // Các dòng tiếp theo: Gọi print() của các con với thụt dòng tăng thêm 2 khoảng trắng (indent + "  ").
    // Mỗi dòng nối với nhau bằng dấu xuống dòng "\n".
    // Ví dụ:
    // "[ Đồ uống ]"
    // "  - Cà phê: $2"
    // "  [ Trà ]"
    // "    - Trà đào: $3"
    let result = `${indent}[ ${this.name} ]`;
    for (const child of this.children) {
      result += "\n" + child.print(indent + "  ");
    }
    return result;
  }
}

// ============================================================================
// BÀI TẬP 2: TÍNH TỔNG GIÁ TRỊ HỘP QUÀ TỔ HỢP (GIFT BOX SYSTEM)
// Đề bài: Tính tổng tiền của hộp quà chứa sản phẩm và các hộp quà con khác,
// cộng với phí đóng gói của mỗi cấp hộp quà.
// ============================================================================

export interface GiftItem {
  getName(): string;
  getPrice(): number;
}

// Leaf: Sản phẩm đơn lẻ
export class Product implements GiftItem {
  private name: string;
  private price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    return this.price;
  }
}

// Composite: Hộp quà (chứa các GiftItem con và có phí đóng gói riêng)
export class GiftBox implements GiftItem {
  private name: string;
  private packagingFee: number;
  private items: GiftItem[] = [];

  constructor(name: string, packagingFee: number) {
    this.name = name;
    this.packagingFee = packagingFee;
  }

  public getName(): string {
    return this.name;
  }

  public add(item: GiftItem): void {
    // TODO: Thêm item vào danh sách items
    this.items.push(item);
  }

  public remove(item: GiftItem): void {
    // TODO: Xóa item khỏi danh sách items
    this.items = this.items.filter((i) => i !== item);
  }

  public getPrice(): number {
    // TODO: Tính tổng giá trị của GiftBox:
    // Tổng giá của các item con + phí đóng gói (packagingFee) của chính nó.
    return this.items.reduce(
      (total, item) => total + item.getPrice(),
      this.packagingFee,
    );
  }
}

// ============================================================================
// CLIENT CODE (DÙNG ĐỂ CHẠY THỬ NGHIỆM)
// ============================================================================
async function runTests() {
  console.log("=== THỬ NGHIỆM BÀI TẬP 1 (MENU SYSTEM) ===");
  try {
    const coffee = new MenuItem("Cà phê sữa", 2.5);
    const orangeJuice = new MenuItem("Nước cam", 3.0);
    const tea = new MenuItem("Trà đào", 2.8);

    const drinkSection = new MenuSection("Đồ uống");
    drinkSection.add(coffee);
    drinkSection.add(orangeJuice);

    const teaSection = new MenuSection("Các loại Trà");
    teaSection.add(tea);
    drinkSection.add(teaSection);

    const mainMenu = new MenuSection("Menu Chính");
    mainMenu.add(drinkSection);

    // Test 1.1: getPrice()
    const expectedPrice = 2.5 + 3.0 + 2.8;
    const actualPrice = mainMenu.getPrice();
    const test1_1 = Math.abs(actualPrice - expectedPrice) < 0.01;
    console.log(
      `  - Test 1.1: Tính tổng giá thực đơn -> [${test1_1 ? "OK" : "FAIL"}]`,
    );
    console.log(`    + Thực tế: $${actualPrice} | Mong đợi: $${expectedPrice}`);

    // Test 1.2: print()
    const actualPrint = mainMenu.print();
    const expectedPrint =
      "[ Menu Chính ]\n" +
      "  [ Đồ uống ]\n" +
      "    - Cà phê sữa: $2.5\n" +
      "    - Nước cam: $3\n" +
      "    [ Các loại Trà ]\n" +
      "      - Trà đào: $2.8";

    // Chuẩn hóa chuỗi bằng cách bỏ khoảng trắng thừa ở cuối dòng để so sánh
    const normalize = (s: string) =>
      s
        .split("\n")
        .map((l) => l.trimEnd())
        .join("\n");
    const test1_2 = normalize(actualPrint) === normalize(expectedPrint);
    console.log(
      `  - Test 1.2: In cấu trúc thực đơn -> [${test1_2 ? "OK" : "FAIL"}]`,
    );
    console.log(`    + Thực tế:\n${actualPrint}`);
    console.log(`    + Mong đợi:\n${expectedPrint}`);

    if (test1_1 && test1_2) {
      console.log(
        "\x1b[32m  ✓ Thành công: Menu Tree in cấu trúc và tính giá chính xác.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Giá hoặc định dạng hiển thị menu không đúng.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 1 chưa hoàn thiện:\x1b[0m", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 (GIFT BOX SYSTEM) ===");
  try {
    const phone = new Product("iPhone 15", 1000);
    const caseProduct = new Product("Ốp lưng da", 50);
    const charger = new Product("Sạc nhanh", 30);

    const smallBox = new GiftBox("Hộp phụ kiện", 5);
    smallBox.add(caseProduct);
    smallBox.add(charger);

    const bigBox = new GiftBox("Hộp quà sinh nhật", 15);
    bigBox.add(phone);
    bigBox.add(smallBox);

    // Test 2.1: getPrice() của Small Box
    const expectedSmallBoxPrice = 50 + 30 + 5; // 85
    const actualSmallBoxPrice = smallBox.getPrice();
    const test2_1 = actualSmallBoxPrice === expectedSmallBoxPrice;
    console.log(
      `  - Test 2.1: Tính giá Hộp phụ kiện nhỏ -> [${test2_1 ? "OK" : "FAIL"}]`,
    );
    console.log(
      `    + Thực tế: $${actualSmallBoxPrice} | Mong đợi: $${expectedSmallBoxPrice}`,
    );

    // Test 2.2: getPrice() của Big Box
    const expectedBigBoxPrice = 1000 + expectedSmallBoxPrice + 15; // 1100
    const actualBigBoxPrice = bigBox.getPrice();
    const test2_2 = actualBigBoxPrice === expectedBigBoxPrice;
    console.log(
      `  - Test 2.2: Tính giá Hộp quà lớn -> [${test2_2 ? "OK" : "FAIL"}]`,
    );
    console.log(
      `    + Thực tế: $${actualBigBoxPrice} | Mong đợi: $${expectedBigBoxPrice}`,
    );

    if (test2_1 && test2_2) {
      console.log(
        "\x1b[32m  ✓ Thành công: Gift Box tính tổng giá tiền chính xác.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Giá trị hộp quà tính toán bị sai.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 2 chưa hoàn thiện:\x1b[0m", message);
  }
}

runTests();
