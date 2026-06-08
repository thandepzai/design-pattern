/**
 * ============================================================================
 * VÍ DỤ MINH HỌA: STRATEGY PATTERN
 * Thư mục: 21-B-Strategy-pattern/index.ts
 *
 * Ngữ cảnh: Hệ thống thanh toán e-commerce với nhiều phương thức thanh toán.
 * - ShoppingCart (Context) có thể sử dụng các phương thức thanh toán khác nhau.
 * - CreditCardStrategy: thanh toán bằng thẻ tín dụng.
 * - PayPalStrategy: thanh toán qua tài khoản PayPal.
 * - CryptoWalletStrategy: thanh toán bằng ví tiền điện tử.
 * ============================================================================
 */

// ============================================================================
// 1. STRATEGY INTERFACE
// ============================================================================
interface PaymentStrategy {
  pay(amount: number): void;
  getMethodName(): string;
}

// ============================================================================
// 2. CONCRETE STRATEGIES
// ============================================================================
class CreditCardStrategy implements PaymentStrategy {
  private cardNumber: string;
  private cardHolder: string;

  constructor(cardNumber: string, cardHolder: string) {
    this.cardNumber = cardNumber;
    this.cardHolder = cardHolder;
  }

  getMethodName(): string {
    return "Thẻ Tín Dụng";
  }

  pay(amount: number): void {
    const maskedCard = `****-****-****-${this.cardNumber.slice(-4)}`;
    console.log(`💳 [Credit Card] Thanh toán $${amount}`);
    console.log(`   Chủ thẻ: ${this.cardHolder}`);
    console.log(`   Số thẻ: ${maskedCard}`);
    console.log(`   Trạng thái: ĐÃ THANH TOÁN THÀNH CÔNG`);
  }
}

class PayPalStrategy implements PaymentStrategy {
  private email: string;

  constructor(email: string) {
    this.email = email;
  }

  getMethodName(): string {
    return "PayPal";
  }

  pay(amount: number): void {
    console.log(`🅿️  [PayPal] Thanh toán $${amount}`);
    console.log(`   Tài khoản: ${this.email}`);
    console.log(`   Đang chuyển hướng đến PayPal...`);
    console.log(`   Trạng thái: ĐÃ THANH TOÁN THÀNH CÔNG`);
  }
}

class CryptoWalletStrategy implements PaymentStrategy {
  private walletAddress: string;
  private currency: string;

  constructor(walletAddress: string, currency: string) {
    this.walletAddress = walletAddress;
    this.currency = currency;
  }

  getMethodName(): string {
    return `Ví Crypto (${this.currency})`;
  }

  pay(amount: number): void {
    const cryptoRate = this.currency === "BTC" ? 0.000016 : 0.00028;
    const cryptoAmount = (amount * cryptoRate).toFixed(6);
    const shortAddress = `${this.walletAddress.slice(0, 6)}...${this.walletAddress.slice(-4)}`;

    console.log(`🪙 [Crypto Wallet] Thanh toán $${amount}`);
    console.log(`   Tiền tệ: ${this.currency}`);
    console.log(`   Số lượng: ${cryptoAmount} ${this.currency}`);
    console.log(`   Địa chỉ ví: ${shortAddress}`);
    console.log(`   Trạng thái: ĐÃ THANH TOÁN THÀNH CÔNG`);
  }
}

// ============================================================================
// 3. CONTEXT
// ============================================================================
class ShoppingCart {
  private strategy: PaymentStrategy;
  private items: Array<{ name: string; price: number }> = [];

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
    console.log(`🛒 Giỏ hàng khởi tạo với phương thức: ${strategy.getMethodName()}`);
  }

  setStrategy(strategy: PaymentStrategy): void {
    console.log(`\n🔄 Đổi phương thức thanh toán sang: ${strategy.getMethodName()}`);
    this.strategy = strategy;
  }

  addItem(name: string, price: number): void {
    this.items.push({ name, price });
    console.log(`   + Thêm "${name}" ($${price}) vào giỏ hàng.`);
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  checkout(): void {
    const total = this.getTotal();
    console.log(`\n📦 Danh sách đơn hàng (${this.items.length} sản phẩm):`);
    this.items.forEach((item) => {
      console.log(`   - ${item.name}: $${item.price}`);
    });
    console.log(`   Tổng cộng: $${total}`);
    console.log(`\n💰 Tiến hành thanh toán...`);
    this.strategy.pay(total);
  }
}

// ============================================================================
// THỬ NGHIỆM CHẠY VÍ DỤ
// ============================================================================
function runExample() {
  console.log("=== CHẠY VÍ DỤ MINH HỌA STRATEGY PATTERN ===\n");

  // --- Khách hàng 1: Dùng thẻ tín dụng ---
  console.log("--- Đơn hàng 1: Thanh toán bằng Thẻ Tín Dụng ---");
  const cart1 = new ShoppingCart(
    new CreditCardStrategy("4539123456781234", "Nguyen Van A"),
  );
  cart1.addItem("Laptop Dell XPS 13", 1200);
  cart1.addItem("Chuột không dây Logitech", 45);
  cart1.addItem("Bàn phím cơ Keychron", 80);
  cart1.checkout();

  console.log("\n---------------------------------------------------\n");

  // --- Khách hàng 2: Bắt đầu với PayPal, sau đó đổi sang Crypto ---
  console.log("--- Đơn hàng 2: Đổi phương thức thanh toán trong runtime ---");
  const cart2 = new ShoppingCart(new PayPalStrategy("tran.thi.b@gmail.com"));
  cart2.addItem("iPhone 15 Pro Max", 1099);
  cart2.addItem("Ốp lưng MagSafe", 29);

  // Quyết định đổi sang Crypto trước khi thanh toán
  cart2.setStrategy(
    new CryptoWalletStrategy("0xAbCdEf1234567890AbCdEf", "ETH"),
  );
  cart2.checkout();

  console.log("\n---------------------------------------------------\n");

  // --- Khách hàng 3: Dùng ví Bitcoin ---
  console.log("--- Đơn hàng 3: Thanh toán bằng Bitcoin ---");
  const cart3 = new ShoppingCart(
    new CryptoWalletStrategy("1A1zP1eP5QGefi2DMPTfTL5SLmv7Divf", "BTC"),
  );
  cart3.addItem('Màn hình 4K LG 27"', 350);
  cart3.checkout();
}

runExample();
