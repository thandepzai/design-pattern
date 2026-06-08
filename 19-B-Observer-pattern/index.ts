/**
 * ============================================================================
 * VÍ DỤ MINH HỌA: OBSERVER PATTERN
 * Thư mục: 19-B-Observer-pattern/index.ts
 *
 * Ngữ cảnh: Hệ thống thông báo giá cổ phiếu thời gian thực.
 * - StockMarket (Subject): Lưu giá cổ phiếu và danh sách observer.
 * - MobileApp: Hiển thị giá mới nhất lên màn hình di động.
 * - TradingDashboard: Cập nhật biểu đồ giá trên dashboard web.
 * - AlertSystem: Gửi cảnh báo khi giá vượt ngưỡng bất thường.
 * ============================================================================
 */

// ============================================================================
// 1. OBSERVER INTERFACE
// ============================================================================
interface StockObserver {
  update(symbol: string, price: number, change: number): void;
}

// ============================================================================
// 2. SUBJECT INTERFACE
// ============================================================================
interface StockSubject {
  subscribe(observer: StockObserver): void;
  unsubscribe(observer: StockObserver): void;
  notify(symbol: string, price: number, change: number): void;
}

// ============================================================================
// 3. CONCRETE SUBJECT
// ============================================================================
class StockMarket implements StockSubject {
  private observers: StockObserver[] = [];
  private stocks: Map<string, number> = new Map();

  public subscribe(observer: StockObserver): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  public unsubscribe(observer: StockObserver): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  public notify(symbol: string, price: number, change: number): void {
    for (const observer of this.observers) {
      observer.update(symbol, price, change);
    }
  }

  public updatePrice(symbol: string, newPrice: number): void {
    const oldPrice = this.stocks.get(symbol) ?? newPrice;
    const change = parseFloat((newPrice - oldPrice).toFixed(2));
    this.stocks.set(symbol, newPrice);
    console.log(`\n[StockMarket] ${symbol}: $${oldPrice} -> $${newPrice} (${change >= 0 ? "+" : ""}${change})`);
    this.notify(symbol, newPrice, change);
  }
}

// ============================================================================
// 4. CONCRETE OBSERVERS
// ============================================================================

// Observer 1: Ứng dụng di động - hiển thị giá mới nhất
class MobileApp implements StockObserver {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public update(symbol: string, price: number, change: number): void {
    const arrow = change >= 0 ? "▲" : "▼";
    const sign = change >= 0 ? "+" : "";
    console.log(`  📱 [${this.name}] ${symbol}: $${price} ${arrow} ${sign}${change}`);
  }
}

// Observer 2: Dashboard giao dịch - cập nhật biểu đồ
class TradingDashboard implements StockObserver {
  private priceHistory: Map<string, number[]> = new Map();

  public update(symbol: string, price: number, _change: number): void {
    if (!this.priceHistory.has(symbol)) {
      this.priceHistory.set(symbol, []);
    }
    this.priceHistory.get(symbol)!.push(price);
    const history = this.priceHistory.get(symbol)!;
    const avg = (history.reduce((a, b) => a + b, 0) / history.length).toFixed(2);
    console.log(`  📊 [Dashboard] ${symbol}: Giá hiện tại $${price} | Trung bình ${avg} | Điểm dữ liệu: ${history.length}`);
  }
}

// Observer 3: Hệ thống cảnh báo - gửi alert khi vượt ngưỡng
class AlertSystem implements StockObserver {
  private thresholds: Map<string, { min: number; max: number }> = new Map();

  public setThreshold(symbol: string, min: number, max: number): void {
    this.thresholds.set(symbol, { min, max });
  }

  public update(symbol: string, price: number, _change: number): void {
    const threshold = this.thresholds.get(symbol);
    if (!threshold) return;

    if (price < threshold.min) {
      console.log(`  🚨 [AlertSystem] CẢNH BÁO: ${symbol} giảm xuống $${price} - Dưới ngưỡng tối thiểu $${threshold.min}!`);
    } else if (price > threshold.max) {
      console.log(`  🚨 [AlertSystem] CẢNH BÁO: ${symbol} tăng lên $${price} - Vượt ngưỡng tối đa $${threshold.max}!`);
    } else {
      console.log(`  ✅ [AlertSystem] ${symbol}: $${price} nằm trong ngưỡng an toàn [$${threshold.min} - $${threshold.max}]`);
    }
  }
}

// ============================================================================
// THỬ NGHIỆM CHẠY VÍ DỤ
// ============================================================================
function runExample() {
  console.log("=== CHẠY VÍ DỤ MINH HỌA OBSERVER PATTERN ===\n");

  // Khởi tạo Subject
  const market = new StockMarket();

  // Khởi tạo các Observer
  const mobileApp1 = new MobileApp("Nhà đầu tư A - iPhone");
  const mobileApp2 = new MobileApp("Nhà đầu tư B - Android");
  const dashboard = new TradingDashboard();
  const alertSystem = new AlertSystem();

  // Cấu hình ngưỡng cảnh báo cho từng cổ phiếu
  alertSystem.setThreshold("AAPL", 170, 200);
  alertSystem.setThreshold("TSLA", 200, 280);

  // Đăng ký Observer vào Subject
  market.subscribe(mobileApp1);
  market.subscribe(mobileApp2);
  market.subscribe(dashboard);
  market.subscribe(alertSystem);

  console.log("--- [Phiên giao dịch sáng] ---");
  market.updatePrice("AAPL", 185);
  market.updatePrice("TSLA", 250);

  console.log("\n--- [Giá AAPL biến động mạnh] ---");
  market.updatePrice("AAPL", 205); // Vượt ngưỡng tối đa
  market.updatePrice("AAPL", 160); // Dưới ngưỡng tối thiểu

  console.log("\n--- [Nhà đầu tư A tắt ứng dụng (unsubscribe)] ---");
  market.unsubscribe(mobileApp1);
  console.log("  -> mobileApp1 đã unsubscribe khỏi StockMarket.");

  console.log("\n--- [Phiên giao dịch chiều - chỉ còn 3 observer] ---");
  market.updatePrice("TSLA", 220);

  console.log("\n--- Kết thúc ví dụ ---");
}

runExample();
