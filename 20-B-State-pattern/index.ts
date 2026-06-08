/**
 * ============================================================================
 * VÍ DỤ MINH HỌA: STATE PATTERN
 * Thư mục: 20-B-State-pattern/index.ts
 *
 * Ngữ cảnh: Máy bán hàng tự động (Vending Machine).
 * - IdleState: Máy đang chờ, chưa có tiền.
 * - HasMoneyState: Đã nhận tiền, chờ người dùng chọn hàng.
 * - DispensingState: Đang phát hàng ra khay lấy hàng.
 * - OutOfStockState: Máy hết hàng, không thể phục vụ.
 * ============================================================================
 */

// ============================================================================
// 1. STATE INTERFACE - khai báo tất cả hành động có thể thực hiện
// ============================================================================
interface VendingState {
  insertCoin(machine: VendingMachine): void;
  selectProduct(machine: VendingMachine, product: string): void;
  dispense(machine: VendingMachine): void;
  refund(machine: VendingMachine): void;
}

// ============================================================================
// 2. CONTEXT - Máy bán hàng tự động
// ============================================================================
class VendingMachine {
  private state: VendingState;
  private stock: number;
  private selectedProduct: string = "";

  constructor(initialStock: number) {
    this.stock = initialStock;
    this.state = initialStock > 0 ? new IdleState() : new OutOfStockState();
  }

  public setState(state: VendingState): void {
    this.state = state;
  }

  public getStock(): number {
    return this.stock;
  }

  public decreaseStock(): void {
    this.stock = Math.max(0, this.stock - 1);
  }

  public setSelectedProduct(product: string): void {
    this.selectedProduct = product;
  }

  public getSelectedProduct(): string {
    return this.selectedProduct;
  }

  // Các action ủy quyền xuống state hiện tại
  public insertCoin(): void {
    this.state.insertCoin(this);
  }

  public selectProduct(product: string): void {
    this.state.selectProduct(this, product);
  }

  public dispense(): void {
    this.state.dispense(this);
  }

  public refund(): void {
    this.state.refund(this);
  }
}

// ============================================================================
// 3. CONCRETE STATES
// ============================================================================

// Trạng thái 1: Máy đang chờ (chưa có tiền)
class IdleState implements VendingState {
  public insertCoin(machine: VendingMachine): void {
    console.log("  💰 Đã nhận đồng xu. Vui lòng chọn sản phẩm.");
    machine.setState(new HasMoneyState());
  }

  public selectProduct(machine: VendingMachine, _product: string): void {
    console.log("  ⚠️  Vui lòng bỏ tiền vào máy trước khi chọn sản phẩm.");
  }

  public dispense(_machine: VendingMachine): void {
    console.log("  ⚠️  Chưa có tiền và chưa chọn sản phẩm.");
  }

  public refund(_machine: VendingMachine): void {
    console.log("  ⚠️  Không có tiền nào để hoàn lại.");
  }
}

// Trạng thái 2: Đã có tiền, chờ chọn hàng
class HasMoneyState implements VendingState {
  public insertCoin(_machine: VendingMachine): void {
    console.log("  ⚠️  Máy đã nhận tiền. Vui lòng chọn sản phẩm.");
  }

  public selectProduct(machine: VendingMachine, product: string): void {
    machine.setSelectedProduct(product);
    console.log(`  ✅ Đã chọn: "${product}". Đang chuẩn bị phát hàng...`);
    machine.setState(new DispensingState());
    machine.dispense();
  }

  public dispense(_machine: VendingMachine): void {
    console.log("  ⚠️  Vui lòng chọn sản phẩm trước.");
  }

  public refund(machine: VendingMachine): void {
    console.log("  💵 Hoàn lại tiền thành công. Cảm ơn bạn!");
    machine.setState(new IdleState());
  }
}

// Trạng thái 3: Đang phát hàng
class DispensingState implements VendingState {
  public insertCoin(_machine: VendingMachine): void {
    console.log("  ⚠️  Máy đang phát hàng. Vui lòng chờ.");
  }

  public selectProduct(_machine: VendingMachine, _product: string): void {
    console.log("  ⚠️  Đang phát hàng. Vui lòng chờ hoàn tất.");
  }

  public dispense(machine: VendingMachine): void {
    const product = machine.getSelectedProduct();
    machine.decreaseStock();
    console.log(`  🎁 Phát hàng thành công: "${product}". Lấy hàng tại khay bên dưới!`);
    machine.setSelectedProduct("");

    if (machine.getStock() === 0) {
      console.log("  📦 Máy đã hết hàng!");
      machine.setState(new OutOfStockState());
    } else {
      console.log(`  📦 Còn lại: ${machine.getStock()} sản phẩm.`);
      machine.setState(new IdleState());
    }
  }

  public refund(_machine: VendingMachine): void {
    console.log("  ⚠️  Không thể hoàn tiền khi đang phát hàng.");
  }
}

// Trạng thái 4: Hết hàng
class OutOfStockState implements VendingState {
  public insertCoin(_machine: VendingMachine): void {
    console.log("  ❌ Máy hiện đã hết hàng. Tiền đã được hoàn lại tự động.");
  }

  public selectProduct(_machine: VendingMachine, _product: string): void {
    console.log("  ❌ Xin lỗi, máy đã hết hàng.");
  }

  public dispense(_machine: VendingMachine): void {
    console.log("  ❌ Không thể phát hàng: máy đã hết hàng.");
  }

  public refund(_machine: VendingMachine): void {
    console.log("  ⚠️  Không có tiền nào trong máy để hoàn lại.");
  }
}

// ============================================================================
// THỬ NGHIỆM CHẠY VÍ DỤ
// ============================================================================
function runExample() {
  console.log("=== CHẠY VÍ DỤ MINH HỌA STATE PATTERN ===\n");

  const machine = new VendingMachine(2);

  console.log("--- [Kịch bản 1: Mua hàng thành công] ---");
  machine.insertCoin();
  machine.selectProduct("Coca-Cola");

  console.log("\n--- [Kịch bản 2: Thử chọn hàng khi chưa bỏ tiền] ---");
  machine.selectProduct("Pepsi");

  console.log("\n--- [Kịch bản 3: Bỏ tiền rồi đổi ý - hoàn tiền] ---");
  machine.insertCoin();
  machine.refund();

  console.log("\n--- [Kịch bản 4: Mua hàng cuối cùng - máy hết hàng] ---");
  machine.insertCoin();
  machine.selectProduct("Pepsi");

  console.log("\n--- [Kịch bản 5: Thử dùng khi máy hết hàng] ---");
  machine.insertCoin();
  machine.selectProduct("Fanta");

  console.log("\n--- Kết thúc ví dụ ---");
}

runExample();
