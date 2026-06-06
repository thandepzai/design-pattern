/**
 * ============================================================================
 * BÀI TẬP THỰC HÀNH: FLYWEIGHT PATTERN
 * Thư mục: 11-S-Flyweight-pattern/exercises.ts
 *
 * Hướng dẫn: Điền mã nguồn vào các phần có đánh dấu // TODO.
 * Chạy file này bằng tsx hoặc ts-node để kiểm tra kết quả.
 * ============================================================================
 */

export const operationLogs: string[] = [];

// ============================================================================
// BÀI TẬP 1: TRÌNH SOẠN THẢO VĂN BẢN TỐI ƯU BỘ NHỚ (CHARACTER FORMATTER)
// ============================================================================

// 1. Flyweight class
export class CharacterFormat {
  constructor(
    public font: string,
    public size: number,
    public color: string,
  ) {}

  public getDetails(): string {
    return `${this.font}-${this.size}-${this.color}`;
  }
}

// 2. Flyweight Factory
export class FormatFactory {
  private static formats: Map<string, CharacterFormat> = new Map();

  public static getFormat(
    font: string,
    size: number,
    color: string,
  ): CharacterFormat {
    // TODO: Triển khai các bước sau:
    // 1. Tạo một key duy nhất dựa trên các tham số (ví dụ: `${font}_${size}_${color}`)
    // 2. Kiểm tra xem key này đã tồn tại trong `formats` chưa.
    // 3. Nếu chưa tồn tại:
    //    - Tạo mới một đối tượng `CharacterFormat`.
    //    - Lưu vào map `formats`.
    //    - Ghi log vào operationLogs: `TẠO MỚI FORMAT: ${key}`
    // 4. Nếu đã tồn tại:
    //    - Ghi log vào operationLogs: `TÁI SỬ DỤNG FORMAT: ${key}`
    // 5. Trả về đối tượng CharacterFormat tương ứng.
    const formatKey = `${font}_${size}_${color}`;
    if (!this.formats.has(formatKey)) {
      const format = new CharacterFormat(font, size, color);
      this.formats.set(formatKey, format);
      operationLogs.push(`TẠO MỚI FORMAT: ${formatKey}`);
    } else {
      operationLogs.push(`TÁI SỬ DỤNG FORMAT: ${formatKey}`);
    }
    return this.formats.get(formatKey)!;
  }

  public static getFormatCount(): number {
    return this.formats.size;
  }

  public static clear(): void {
    this.formats.clear();
  }
}

// 3. Context class
export class Character {
  // TODO: Khai báo các thuộc tính:
  // - public char: string (ký tự đơn)
  // - public line: number (dòng)
  // - public column: number (cột)
  // - private format: CharacterFormat (tham chiếu tới Flyweight)
  // Viết constructor nhận các tham số trên.

  constructor(
    public char: string,
    public line: number,
    public column: number,
    private format: CharacterFormat,
  ) {}

  public render(): string {
    // TODO: Trả về chuỗi thông tin ký tự định dạng theo mẫu sau:
    // `Ký tự '${this.char}' tại dòng ${this.line}, cột ${this.column} định dạng: ${this.format.getDetails()}`
    return `Ký tự '${this.char}' tại dòng ${this.line}, cột ${this.column} định dạng: ${this.format.getDetails()}`;
  }
}

// ============================================================================
// BÀI TẬP 2: QUẢN LÝ THẺ SẢN PHẨM THƯƠNG MẠI ĐIỆN TỬ (PRODUCT CATALOG CARD)
// ============================================================================

// 1. Flyweight class
export class ProductInfo {
  constructor(
    public name: string,
    public category: string,
    public image: string,
  ) {}
}

// 2. Flyweight Factory
export class ProductFactory {
  private static products: Map<string, ProductInfo> = new Map();

  public static getProductInfo(
    name: string,
    category: string,
    image: string,
  ): ProductInfo {
    // TODO: Triển khai các bước sau:
    // 1. Tạo một key duy nhất dựa trên name và category (ví dụ: `${name}_${category}`)
    // 2. Kiểm tra xem key này đã tồn tại trong `products` chưa.
    // 3. Nếu chưa tồn tại:
    //    - Tạo mới đối tượng `ProductInfo`.
    //    - Lưu vào map `products`.
    //    - Ghi log vào operationLogs: `TẠO MỚI PRODUCT_INFO: ${key}`
    // 4. Nếu đã tồn tại:
    //    - Ghi log vào operationLogs: `TÁI SỬ DỤNG PRODUCT_INFO: ${key}`
    // 5. Trả về đối tượng ProductInfo tương ứng.
    const productKey = `${name}_${category}`;
    if (!this.products.has(productKey)) {
      const productInfo = new ProductInfo(name, category, image);
      this.products.set(productKey, productInfo);
      operationLogs.push(`TẠO MỚI PRODUCT_INFO: ${productKey}`);
    } else {
      operationLogs.push(`TÁI SỬ DỤNG PRODUCT_INFO: ${productKey}`);
    }
    return this.products.get(productKey)!;
  }

  public static getProductCount(): number {
    return this.products.size;
  }

  public static clear(): void {
    this.products.clear();
  }
}

// 3. Context class
export class ProductCard {
  // TODO: Khai báo các thuộc tính:
  // - public price: number (Giá bán thực tế của thẻ cụ thể)
  // - public stock: number (Số lượng tồn kho hiển thị riêng biệt)
  // - public isSelected: boolean (Trạng thái đã thêm vào giỏ hàng)
  // - private info: ProductInfo (Tham chiếu Flyweight chứa dữ liệu dòng sản phẩm nặng)

  constructor(
    public price: number,
    public stock: number,
    public isSelected: boolean,
    private info: ProductInfo,
  ) {}

  public getCardDetails(): string {
    // TODO: Trả về chuỗi mô tả thẻ sản phẩm định dạng theo mẫu:
    // `Sản phẩm [${this.info.name}] (Danh mục: ${this.info.category}) - Giá: $${this.price}, Tồn kho: ${this.stock}, Đã chọn: ${this.isSelected}`
    return `Sản phẩm [${this.info.name}] (Danh mục: ${this.info.category}) - Giá: $${this.price}, Tồn kho: ${this.stock}, Đã chọn: ${this.isSelected}`;
  }
}

// ============================================================================
// CLIENT CODE (DÙNG ĐỂ CHẠY THỬ NGHIỆM)
// ============================================================================
async function runTests() {
  console.log("=== THỬ NGHIỆM BÀI TẬP 1 (CHARACTER FORMATTER) ===");
  try {
    FormatFactory.clear();
    operationLogs.length = 0;

    // Tạo các định dạng format
    const formatArialRed = FormatFactory.getFormat("Arial", 12, "red");
    const formatArialRedDup = FormatFactory.getFormat("Arial", 12, "red"); // Tái sử dụng
    const formatTimesBlue = FormatFactory.getFormat(
      "Times New Roman",
      14,
      "blue",
    );

    // Tạo các ký tự cụ thể
    const char1 = new Character("H", 1, 1, formatArialRed);
    const char2 = new Character("e", 1, 2, formatArialRedDup);
    const char3 = new Character("l", 1, 3, formatTimesBlue);

    // Test 1.1: Tái sử dụng đối tượng Flyweight
    const test1_1 = FormatFactory.getFormatCount() === 2;
    console.log(
      `  - Test 1.1: Đếm số đối tượng Flyweight được tạo ra (Kỳ vọng: 2) -> [${
        test1_1 ? "OK" : "FAIL"
      }]`,
    );

    // Test 1.2: Nhật ký ghi tạo mới/tái sử dụng
    const hasCorrectLogs =
      operationLogs.includes("TẠO MỚI FORMAT: Arial_12_red") &&
      operationLogs.includes("TÁI SỬ DỤNG FORMAT: Arial_12_red") &&
      operationLogs.includes("TẠO MỚI FORMAT: Times New Roman_14_blue");
    console.log(
      `  - Test 1.2: Nhật ký xử lý của Flyweight Factory -> [${hasCorrectLogs ? "OK" : "FAIL"}]`,
    );

    // Test 1.3: Render ký tự chính xác
    const r1 = char1.render();
    const r3 = char3.render();
    const test1_3 =
      r1 === "Ký tự 'H' tại dòng 1, cột 1 định dạng: Arial-12-red" &&
      r3 === "Ký tự 'l' tại dòng 1, cột 3 định dạng: Times New Roman-14-blue";
    console.log(
      `  - Test 1.3: Render thông tin ký tự chính xác -> [${test1_3 ? "OK" : "FAIL"}]`,
    );

    if (test1_1 && hasCorrectLogs && test1_3) {
      console.log(
        "\x1b[32m  ✓ Thành công: Character Formatter tối ưu bộ nhớ chính xác bằng Flyweight.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Một số chức năng Flyweight của bài 1 chưa hoạt động đúng.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 1 chưa hoàn thiện:\x1b[0m", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 (PRODUCT CATALOG CARD) ===");
  try {
    ProductFactory.clear();
    operationLogs.length = 0;

    const infoPhone = ProductFactory.getProductInfo(
      "iPhone 15",
      "Điện thoại",
      "iphone15.png",
    );
    const infoPhoneDup = ProductFactory.getProductInfo(
      "iPhone 15",
      "Điện thoại",
      "iphone15.png",
    ); // Tái sử dụng
    const infoLaptop = ProductFactory.getProductInfo(
      "MacBook Pro M3",
      "Laptop",
      "macbookm3.png",
    );

    const card1 = new ProductCard(999, 10, true, infoPhone);
    const card2 = new ProductCard(949, 5, false, infoPhoneDup);
    const card3 = new ProductCard(1999, 3, false, infoLaptop);

    // Test 2.1: Số lượng Flyweight của ProductInfo
    const test2_1 = ProductFactory.getProductCount() === 2;
    console.log(
      `  - Test 2.1: Số đối tượng ProductInfo trong bộ nhớ (Kỳ vọng: 2) -> [${
        test2_1 ? "OK" : "FAIL"
      }]`,
    );

    // Test 2.2: Nhật ký xử lý
    const test2_2 =
      operationLogs.includes("TẠO MỚI PRODUCT_INFO: iPhone 15_Điện thoại") &&
      operationLogs.includes(
        "TÁI SỬ DỤNG PRODUCT_INFO: iPhone 15_Điện thoại",
      ) &&
      operationLogs.includes("TẠO MỚI PRODUCT_INFO: MacBook Pro M3_Laptop");
    console.log(
      `  - Test 2.2: Nhật ký xử lý của ProductFactory -> [${test2_2 ? "OK" : "FAIL"}]`,
    );

    // Test 2.3: Xuất thông tin thẻ chi tiết
    const d1 = card1.getCardDetails();
    const d2 = card2.getCardDetails();
    const test2_3 =
      d1 ===
        "Sản phẩm [iPhone 15] (Danh mục: Điện thoại) - Giá: $999, Tồn kho: 10, Đã chọn: true" &&
      d2 ===
        "Sản phẩm [iPhone 15] (Danh mục: Điện thoại) - Giá: $949, Tồn kho: 5, Đã chọn: false";
    console.log(
      `  - Test 2.3: Hiển thị thông tin thẻ sản phẩm chính xác -> [${test2_3 ? "OK" : "FAIL"}]`,
    );

    if (test2_1 && test2_2 && test2_3) {
      console.log(
        "\x1b[32m  ✓ Thành công: Product Catalog Card tối ưu dữ liệu chung của sản phẩm thành công.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Hệ thống quản lý thẻ sản phẩm bằng Flyweight chưa đúng.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 2 chưa hoàn thiện:\x1b[0m", message);
  }
}

runTests();
