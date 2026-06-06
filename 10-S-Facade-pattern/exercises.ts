/**
 * ============================================================================
 * BÀI TẬP THỰC HÀNH: FACADE PATTERN
 * Thư mục: 10-S-Facade-pattern/exercises.ts
 *
 * Hướng dẫn: Điền mã nguồn vào các phần có đánh dấu // TODO.
 * Chạy file này bằng tsx hoặc ts-node để kiểm tra kết quả.
 * ============================================================================
 */

// Mảng log toàn cục để kiểm tra thứ tự thực thi của các hệ thống con
export const operationLogs: string[] = [];

// ============================================================================
// BÀI TẬP 1: QUY TRÌNH ĐẶT HÀNG TRỰC TUYẾN PHỨC TẠP (ORDER PROCESSING FACADE)
// ============================================================================

export class InventoryService {
  private stock: Map<string, number> = new Map([
    ["prod-100", 10],
    ["prod-200", 0],
  ]);

  public checkStock(productId: string, quantity: number): boolean {
    const available = this.stock.get(productId) || 0;
    return available >= quantity;
  }

  public deductStock(productId: string, quantity: number): void {
    const available = this.stock.get(productId) || 0;
    this.stock.set(productId, available - quantity);
    operationLogs.push(
      `INVENTORY: Đã trừ ${quantity} sản phẩm ${productId} khỏi kho`,
    );
  }
}

export class PaymentProcessor {
  public processPayment(userId: string, amount: number): boolean {
    if (amount <= 0) return false;
    operationLogs.push(
      `PAYMENT: Đã thanh toán thành công $${amount} cho người dùng ${userId}`,
    );
    return true;
  }
}

export class ShippingService {
  public arrangeShipping(productId: string, quantity: number): string {
    const trackingCode = `TRK-${Math.floor(100000 + Math.random() * 900000)}`;
    operationLogs.push(
      `SHIPPING: Đã sắp xếp vận chuyển ${quantity} x ${productId}. Tracking: ${trackingCode}`,
    );
    return trackingCode;
  }
}

export class NotificationService {
  public sendConfirmationEmail(userId: string, trackingCode: string): void {
    operationLogs.push(
      `NOTIFICATION: Đã gửi email xác nhận cho ${userId} với mã vận đơn ${trackingCode}`,
    );
  }
}

// Facade
export class OrderFacade {
  private inventory: InventoryService;
  private payment: PaymentProcessor;
  private shipping: ShippingService;
  private notification: NotificationService;

  constructor(
    inventory: InventoryService,
    payment: PaymentProcessor,
    shipping: ShippingService,
    notification: NotificationService,
  ) {
    this.inventory = inventory;
    this.payment = payment;
    this.shipping = shipping;
    this.notification = notification;
  }

  public placeOrder(
    productId: string,
    quantity: number,
    userId: string,
    amount: number,
  ): boolean {
    // TODO: Triển khai quy trình đặt hàng theo các bước:
    // 1. Kiểm tra kho hàng (checkStock). Nếu không đủ, ghi log lỗi: "FACADE: Hết hàng!" và trả về false.
    // 2. Xử lý thanh toán (processPayment). Nếu thất bại, ghi log lỗi: "FACADE: Thanh toán lỗi!" và trả về false.
    // 3. Trừ kho hàng (deductStock).
    // 4. Sắp xếp giao hàng (arrangeShipping) và lấy mã vận đơn (trackingCode).
    // 5. Gửi email xác nhận (sendConfirmationEmail).
    // 6. Trả về true.
    if (!this.inventory.checkStock(productId, quantity)) {
      operationLogs.push("FACADE: Hết hàng!");
      return false;
    }
    if (!this.payment.processPayment(userId, amount)) {
      operationLogs.push("FACADE: Thanh toán lỗi!");
      return false;
    }
    this.inventory.deductStock(productId, quantity);
    const trackingCode = this.shipping.arrangeShipping(productId, quantity);
    this.notification.sendConfirmationEmail(userId, trackingCode);
    return true;
  }
}

// ============================================================================
// BÀI TẬP 2: QUY TRÌNH KHỞI ĐỘNG MÁY TÍNH (COMPUTER BOOTING FACADE)
// ============================================================================

export class CPU {
  public freeze(): void {
    operationLogs.push("CPU: Đang đóng băng bộ vi xử lý");
  }

  public jump(position: number): void {
    operationLogs.push(
      `CPU: Đã chuyển con trỏ lệnh tới địa chỉ ô nhớ 0x${position.toString(16)}`,
    );
  }

  public execute(): void {
    operationLogs.push("CPU: Bắt đầu thực thi các lệnh từ RAM");
  }
}

export class Memory {
  public load(position: number, data: string): void {
    operationLogs.push(
      `RAM: Nạp dữ liệu "${data}" vào địa chỉ 0x${position.toString(16)}`,
    );
  }
}

export class HardDrive {
  public read(lba: number, size: number): string {
    operationLogs.push(
      `HDD: Đọc dữ liệu từ cung từ (LBA) ${lba}, dung lượng ${size} bytes`,
    );
    return "KERNEL_IMAGE_DATA";
  }
}

// Facade
export class ComputerFacade {
  private cpu: CPU;
  private memory: Memory;
  private hardDrive: HardDrive;

  constructor(cpu: CPU, memory: Memory, hardDrive: HardDrive) {
    this.cpu = cpu;
    this.memory = memory;
    this.hardDrive = hardDrive;
  }

  public startComputer(): void {
    const BOOT_SECTOR = 100;
    const SECTOR_SIZE = 512;
    const BOOT_ADDRESS = 0x00f0;

    // TODO: Triển khai quy trình boot máy tính sử dụng các hệ thống con:
    // 1. CPU đóng băng: cpu.freeze()
    // 2. HDD đọc Boot Sector: hardDrive.read(BOOT_SECTOR, SECTOR_SIZE) -> nhận bootData
    // 3. RAM nạp dữ liệu Boot Address: memory.load(BOOT_ADDRESS, bootData)
    // 4. CPU chuyển trỏ lệnh: cpu.jump(BOOT_ADDRESS)
    // 5. CPU thực thi lệnh: cpu.execute()
    this.cpu.freeze();
    const bootData = this.hardDrive.read(BOOT_SECTOR, SECTOR_SIZE);
    this.memory.load(BOOT_ADDRESS, bootData);
    this.cpu.jump(BOOT_ADDRESS);
    this.cpu.execute();
  }
}

// ============================================================================
// CLIENT CODE (DÙNG ĐỂ CHẠY THỬ NGHIỆM)
// ============================================================================
async function runTests() {
  console.log("=== THỬ NGHIỆM BÀI TẬP 1 (ORDER FACADE) ===");
  try {
    const inventory = new InventoryService();
    const payment = new PaymentProcessor();
    const shipping = new ShippingService();
    const notification = new NotificationService();

    const orderFacade = new OrderFacade(
      inventory,
      payment,
      shipping,
      notification,
    );

    // Test 1.1: Đặt hàng thành công
    operationLogs.length = 0;
    const successResult = orderFacade.placeOrder(
      "prod-100",
      2,
      "user-999",
      150,
    );
    const test1_1 = successResult === true;
    console.log(
      `  - Test 1.1: Đặt hàng hợp lệ thành công -> [${test1_1 ? "OK" : "FAIL"}]`,
    );

    const hasCorrectSteps =
      operationLogs.some((log) =>
        log.includes("INVENTORY: Đã trừ 2 sản phẩm prod-100"),
      ) &&
      operationLogs.some((log) => log.includes("PAYMENT: Đã thanh toán")) &&
      operationLogs.some((log) => log.includes("SHIPPING: Đã sắp xếp")) &&
      operationLogs.some((log) => log.includes("NOTIFICATION: Đã gửi email"));

    console.log(
      `  - Test 1.2: Các bước hệ thống con thực thi -> [${hasCorrectSteps ? "OK" : "FAIL"}]`,
    );
    console.log(
      `    + Các bước thực tế:\n      ${operationLogs.join("\n      ")}`,
    );

    // Test 1.3: Đặt hàng hết kho
    operationLogs.length = 0;
    const outOfStockResult = orderFacade.placeOrder(
      "prod-200",
      1,
      "user-999",
      50,
    );
    const test1_3 = outOfStockResult === false;
    console.log(
      `  - Test 1.3: Đặt hàng sản phẩm hết kho -> [${test1_3 ? "OK" : "FAIL"}]`,
    );

    // Test 1.4: Lỗi thanh toán
    operationLogs.length = 0;
    const badPaymentResult = orderFacade.placeOrder(
      "prod-100",
      1,
      "user-999",
      -10,
    );
    const test1_4 = badPaymentResult === false;
    console.log(
      `  - Test 1.4: Lỗi thanh toán không hợp lệ -> [${test1_4 ? "OK" : "FAIL"}]`,
    );

    if (test1_1 && hasCorrectSteps && test1_3 && test1_4) {
      console.log(
        "\x1b[32m  ✓ Thành công: OrderFacade điều phối quy trình đặt hàng chính xác.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Một số bước đặt hàng bị lỗi hoặc điều phối sai trình tự.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 1 chưa hoàn thiện:\x1b[0m", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 (COMPUTER FACADE) ===");
  try {
    const cpu = new CPU();
    const memory = new Memory();
    const hardDrive = new HardDrive();

    const computer = new ComputerFacade(cpu, memory, hardDrive);

    operationLogs.length = 0;
    computer.startComputer();

    const expectedSteps = [
      "CPU: Đang đóng băng bộ vi xử lý",
      "HDD: Đọc dữ liệu từ cung từ (LBA) 100, dung lượng 512 bytes",
      'RAM: Nạp dữ liệu "KERNEL_IMAGE_DATA" vào địa chỉ 0xf0',
      "CPU: Đã chuyển con trỏ lệnh tới địa chỉ ô nhớ 0xf0",
      "CPU: Bắt đầu thực thi các lệnh từ RAM",
    ];

    let test2_1 = operationLogs.length === expectedSteps.length;
    if (test2_1) {
      for (let i = 0; i < expectedSteps.length; i++) {
        if (operationLogs[i] !== expectedSteps[i]) {
          test2_1 = false;
          break;
        }
      }
    }

    console.log(
      `  - Test 2.1: Thứ tự boot máy tính -> [${test2_1 ? "OK" : "FAIL"}]`,
    );
    console.log(`    + Thực tế:\n      ${operationLogs.join("\n      ")}`);
    console.log(`    + Mong đợi:\n      ${expectedSteps.join("\n      ")}`);

    if (test2_1) {
      console.log(
        "\x1b[32m  ✓ Thành công: ComputerFacade khởi động hệ thống theo đúng trình tự phần cứng.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Quy trình boot bị sai bước hoặc sai thứ tự.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 2 chưa hoàn thiện:\x1b[0m", message);
  }
}

runTests();
