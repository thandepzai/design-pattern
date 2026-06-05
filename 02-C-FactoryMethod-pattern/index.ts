/**
 * 02-C-FactoryMethod-pattern/index.ts
 * Mô phỏng hệ thống xử lý thanh toán đa cổng (Payment Gateway) chuyên sâu.
 */

// ==========================================
// 1. DATA CONTRACTS & INTERFACES
// Định nghĩa cấu trúc dữ liệu và giao diện nghiệp vụ rõ ràng.
// ==========================================

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  message: string;
  timestamp: Date;
}

export interface GatewayConfig {
  apiKey: string;
  environment: "sandbox" | "production";
  merchantId: string;
}

/**
 * Product Interface: Định nghĩa các hành vi mà mọi Cổng thanh toán (Gateway) phải có.
 */
export interface PaymentGateway {
  initialize(config: GatewayConfig): void;
  processPayment(amount: number, orderId: string): Promise<PaymentResult>;
  refund(transactionId: string, amount: number): Promise<PaymentResult>;
}

// ==========================================
// 2. CONCRETE PRODUCTS
// Triển khai chi tiết từng Cổng thanh toán cụ thể.
// ==========================================

/**
 * Stripe Gateway: Sử dụng mô hình Token & PaymentIntent.
 */
export class StripeGateway implements PaymentGateway {
  private config!: GatewayConfig;

  public initialize(config: GatewayConfig): void {
    this.config = config;
    console.log(`[Stripe SDK] Đã khởi tạo kết nối trong môi trường: ${this.config.environment.toUpperCase()}`);
  }

  public async processPayment(amount: number, orderId: string): Promise<PaymentResult> {
    console.log(`[Stripe SDK] Đang gửi yêu cầu tạo PaymentIntent cho Đơn hàng: ${orderId}...`);
    
    // Giả lập độ trễ mạng (Network Latency)
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (amount <= 0) {
      return {
        success: false,
        transactionId: "",
        message: "Số tiền thanh toán phải lớn hơn 0.",
        timestamp: new Date()
      };
    }

    const mockTxId = `ch_stripe_${Math.random().toString(36).substring(2, 11)}`;
    return {
      success: true,
      transactionId: mockTxId,
      message: `Thanh toán thành công qua Stripe. Đã trừ tiền từ Credit Card của khách hàng.`,
      timestamp: new Date()
    };
  }

  public async refund(transactionId: string, amount: number): Promise<PaymentResult> {
    console.log(`[Stripe SDK] Yêu cầu hoàn trả $${amount} cho Transaction ID: ${transactionId}...`);
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      transactionId: `re_stripe_${Math.random().toString(36).substring(2, 11)}`,
      message: `Đã hoàn trả thành công số tiền $${amount} qua cổng Stripe.`,
      timestamp: new Date()
    };
  }
}

/**
 * MoMo Gateway: Sử dụng mã QR Code và giao thức HTTP POST Callback.
 */
export class MomoGateway implements PaymentGateway {
  private config!: GatewayConfig;

  public initialize(config: GatewayConfig): void {
    this.config = config;
    console.log(`[MoMo SDK] Khởi tạo kết nối MoMo Merchant ID: ${this.config.merchantId}`);
  }

  public async processPayment(amount: number, orderId: string): Promise<PaymentResult> {
    console.log(`[MoMo SDK] Đang tạo liên kết thanh toán (DeepLink) & QR Code cho Đơn hàng: ${orderId}...`);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (amount < 10000) {
      return {
        success: false,
        transactionId: "",
        message: "Số tiền tối thiểu thanh toán qua MoMo phải từ 10,000 VND.",
        timestamp: new Date()
      };
    }

    const mockTxId = `momo_tx_${Date.now()}`;
    return {
      success: true,
      transactionId: mockTxId,
      message: `Thanh toán MoMo thành công. Đã nhận callback IPN từ MoMo Server.`,
      timestamp: new Date()
    };
  }

  public async refund(transactionId: string, amount: number): Promise<PaymentResult> {
    console.log(`[MoMo SDK] Đang gọi API hoàn tiền MoMo cho giao dịch gốc: ${transactionId}...`);
    await new Promise((resolve) => setTimeout(resolve, 600));

    return {
      success: true,
      transactionId: `momo_ref_${Date.now()}`,
      message: `MoMo hoàn tiền thành công số tiền ${amount} VND.`,
      timestamp: new Date()
    };
  }
}

// ==========================================
// 3. CREATOR (ABSTRACT CLASS)
// Chứa Factory Method và định nghĩa bộ khung xử lý nghiệp vụ đơn hàng.
// ==========================================

export abstract class OrderPaymentProcessor {
  // 🌟 FACTORY METHOD: Bắt buộc các lớp con phải ghi đè để trả về đúng Gateway của chúng.
  protected abstract createPaymentGateway(): PaymentGateway;

  // Lớp con cũng có thể quyết định cấu hình của Gateway
  protected abstract getGatewayConfig(): GatewayConfig;

  /**
   * Phương thức nghiệp vụ cốt lõi (Template Method/Business Logic).
   * Chứa luồng xử lý đơn hàng phức tạp chung của toàn hệ thống, 
   * đảm bảo tính đóng gói, tránh trùng lặp code.
   */
  public async processOrder(orderId: string, amount: number): Promise<void> {
    console.log(`\n==================================================`);
    console.log(`[HỆ THỐNG] BẮT ĐẦU XỬ LÝ ĐƠN HÀNG: ${orderId}`);
    console.log(`[HỆ THỐNG] Số tiền: ${amount}`);

    // 1. Gọi Factory Method để tạo ra sản phẩm (Gateway) tương ứng
    const gateway = this.createPaymentGateway();

    // 2. Lấy cấu hình và khởi tạo Gateway
    const config = this.getGatewayConfig();
    gateway.initialize(config);

    try {
      // 3. Thực hiện thanh toán qua cổng tương ứng
      const result = await gateway.processPayment(amount, orderId);

      // 4. Xử lý kết quả giao dịch tập trung (Ghi log, cập nhật DB, gửi email...)
      if (result.success) {
        console.log(`\x1b[32m[THÀNH CÔNG] Đơn hàng ${orderId} đã được thanh toán.`);
        console.log(`            Mã giao dịch: ${result.transactionId}`);
        console.log(`            Thông điệp: ${result.message}\x1b[0m`);
        // Tại đây có thể chèn code cập nhật DB: Order.status = 'PAID'
      } else {
        console.log(`\x1b[31m[THẤT BẠI] Giao dịch thất bại.`);
        console.log(`          Lý do: ${result.message}\x1b[0m`);
        // Tại đây có thể chèn code cập nhật DB: Order.status = 'FAILED'
      }
    } catch (error: any) {
      console.log(`\x1b[31m[LỖI HỆ THỐNG] Đã xảy ra lỗi khi xử lý thanh toán: ${error.message}\x1b[0m`);
    }

    console.log(`[HỆ THỐNG] HOÀN TẤT TIẾN TRÌNH ĐƠN HÀNG: ${orderId}`);
    console.log(`==================================================\n`);
  }
}

// ==========================================
// 4. CONCRETE CREATORS
// Triển khai Factory Method để trả về các sản phẩm phù hợp với cấu hình riêng.
// ==========================================

export class StripeOrderProcessor extends OrderPaymentProcessor {
  protected createPaymentGateway(): PaymentGateway {
    return new StripeGateway();
  }

  protected getGatewayConfig(): GatewayConfig {
    return {
      apiKey: "sk_test_51Nz...stripe_key",
      environment: "sandbox",
      merchantId: "acct_123456"
    };
  }
}

export class MomoOrderProcessor extends OrderPaymentProcessor {
  protected createPaymentGateway(): PaymentGateway {
    return new MomoGateway();
  }

  protected getGatewayConfig(): GatewayConfig {
    return {
      apiKey: "momo_partner_secret_xyz",
      environment: "sandbox",
      merchantId: "MOMO_MERCHANT_HN_01"
    };
  }
}

// ==========================================
// CLIENT CODE (Ứng dụng chạy thực tế)
// ==========================================

async function runApplication() {
  console.log("🚀 KHỞI CHẠY HỆ THỐNG THANH TOÁN PAYMENT HUB 🚀\n");

  // Client xử lý thanh toán qua Stripe
  console.log(">>> KHÁCH HÀNG CHỌN THANH TOÁN QUA THẺ QUỐC TẾ (STRIPE)");
  const stripeProcessor = new StripeOrderProcessor();
  await stripeProcessor.processOrder("ORDER-2026-001", 150); // $150 USD

  // Client xử lý thanh toán qua Ví điện tử MoMo
  console.log(">>> KHÁCH HÀNG CHỌN THANH TOÁN QUA VÍ ĐIỆN TỬ MOMO");
  const momoProcessor = new MomoOrderProcessor();
  await momoProcessor.processOrder("ORDER-2026-002", 50000); // 50,000 VND

  // Thử nghiệm case lỗi số tiền nhỏ hơn mức tối thiểu của MoMo
  console.log(">>> KHÁCH HÀNG CHỌN THANH TOÁN MOMO NHƯNG SỐ TIỀN THẤP HƠN QUY ĐỊNH");
  await momoProcessor.processOrder("ORDER-2026-003", 2000); // 2,000 VND
}

// Kích hoạt chạy chương trình
runApplication();
