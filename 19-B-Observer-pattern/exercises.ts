/**
 * ============================================================================
 * BÀI TẬP THỰC HÀNH: OBSERVER PATTERN
 * Thư mục: 19-B-Observer-pattern/exercises.ts
 *
 * Hướng dẫn: Điền mã nguồn vào các phần có đánh dấu // TODO.
 * Chạy file này bằng tsx hoặc ts-node để kiểm tra kết quả.
 * ============================================================================
 */

export const operationLogs: string[] = [];

// ============================================================================
// BÀI TẬP 1: HỆ THỐNG CẢNH BÁO THỜI TIẾT (WEATHER ALERT SYSTEM)
// ============================================================================

export interface WeatherObserver {
  update(temp: number, humidity: number, pressure: number): void;
}

export interface WeatherSubject {
  subscribe(observer: WeatherObserver): void;
  unsubscribe(observer: WeatherObserver): void;
  notify(): void;
}

export class WeatherStation implements WeatherSubject {
  private observers: WeatherObserver[] = [];
  private temperature: number = 0;
  private humidity: number = 0;
  private pressure: number = 0;

  public subscribe(observer: WeatherObserver): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  public unsubscribe(observer: WeatherObserver): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  public notify(): void {
    for (const observer of this.observers) {
      observer.update(this.temperature, this.humidity, this.pressure);
    }
  }

  public setMeasurements(temp: number, humidity: number, pressure: number): void {
    this.temperature = temp;
    this.humidity = humidity;
    this.pressure = pressure;
    this.notify();
  }
}

export class CurrentConditionsDisplay implements WeatherObserver {
  public update(temp: number, humidity: number, pressure: number): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs với format chính xác:
    //    `WEATHER_CURRENT: Nhiệt độ ${temp}°C, Độ ẩm ${humidity}%, Áp suất ${pressure}hPa`
    operationLogs.push(
      `WEATHER_CURRENT: Nhiệt độ ${temp}°C, Độ ẩm ${humidity}%, Áp suất ${pressure}hPa`,
    );
  }
}

export class StatisticsDisplay implements WeatherObserver {
  private temperatures: number[] = [];

  public update(temp: number, _humidity: number, _pressure: number): void {
    // TODO: Triển khai các bước:
    // 1. Thêm `temp` vào mảng `this.temperatures`.
    // 2. Push vào operationLogs với format chính xác:
    //    `WEATHER_STATS: Ghi nhận nhiệt độ ${temp}°C vào thống kê`
    this.temperatures.push(temp);
    operationLogs.push(`WEATHER_STATS: Ghi nhận nhiệt độ ${temp}°C vào thống kê`);
  }

  public getAverage(): number {
    if (this.temperatures.length === 0) return 0;
    return this.temperatures.reduce((a, b) => a + b, 0) / this.temperatures.length;
  }
}

export class ForecastDisplay implements WeatherObserver {
  private lastPressure: number = 0;

  public update(_temp: number, _humidity: number, pressure: number): void {
    // TODO: Triển khai các bước:
    // 1. So sánh `pressure` với `this.lastPressure`:
    //    - Nếu pressure > lastPressure: push log `"WEATHER_FORECAST: Dự báo thời tiết cải thiện, áp suất tăng lên ${pressure}hPa"`
    //    - Nếu pressure < lastPressure: push log `"WEATHER_FORECAST: Dự báo có mưa, áp suất giảm xuống ${pressure}hPa"`
    //    - Nếu bằng nhau: push log `"WEATHER_FORECAST: Thời tiết ổn định, áp suất giữ nguyên ${pressure}hPa"`
    // 2. Cập nhật `this.lastPressure = pressure`.
    if (pressure > this.lastPressure) {
      operationLogs.push(
        `WEATHER_FORECAST: Dự báo thời tiết cải thiện, áp suất tăng lên ${pressure}hPa`,
      );
    } else if (pressure < this.lastPressure) {
      operationLogs.push(
        `WEATHER_FORECAST: Dự báo có mưa, áp suất giảm xuống ${pressure}hPa`,
      );
    } else {
      operationLogs.push(
        `WEATHER_FORECAST: Thời tiết ổn định, áp suất giữ nguyên ${pressure}hPa`,
      );
    }
    this.lastPressure = pressure;
  }
}

// ============================================================================
// BÀI TẬP 2: HỆ THỐNG SỰ KIỆN ĐẶT HÀNG E-COMMERCE (ORDER EVENT SYSTEM)
// ============================================================================

export interface OrderObserver {
  onOrderPlaced(orderId: string, total: number): void;
}

export interface OrderSubject {
  subscribe(observer: OrderObserver): void;
  unsubscribe(observer: OrderObserver): void;
  notify(orderId: string, total: number): void;
}

export class OrderService implements OrderSubject {
  private observers: OrderObserver[] = [];

  public subscribe(observer: OrderObserver): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  public unsubscribe(observer: OrderObserver): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  public notify(orderId: string, total: number): void {
    for (const observer of this.observers) {
      observer.onOrderPlaced(orderId, total);
    }
  }

  public placeOrder(orderId: string, total: number): void {
    this.notify(orderId, total);
  }
}

export class EmailService implements OrderObserver {
  public onOrderPlaced(orderId: string, _total: number): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs với format chính xác:
    //    `EMAIL: Đã gửi email xác nhận đơn hàng #${orderId}`
    operationLogs.push(`EMAIL: Đã gửi email xác nhận đơn hàng #${orderId}`);
  }
}

export class InventoryService implements OrderObserver {
  public onOrderPlaced(orderId: string, _total: number): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs với format chính xác:
    //    `INVENTORY: Đã cập nhật tồn kho cho đơn hàng #${orderId}`
    operationLogs.push(`INVENTORY: Đã cập nhật tồn kho cho đơn hàng #${orderId}`);
  }
}

export class AnalyticsService implements OrderObserver {
  public onOrderPlaced(orderId: string, total: number): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs với format chính xác:
    //    `ANALYTICS: Ghi nhận đơn hàng #${orderId} trị giá $${total}`
    operationLogs.push(`ANALYTICS: Ghi nhận đơn hàng #${orderId} trị giá $${total}`);
  }
}

// ============================================================================
// CLIENT CODE (DÙNG ĐỂ CHẠY THỬ NGHIỆM)
// ============================================================================
async function runTests() {
  console.log("=== THỬ NGHIỆM BÀI TẬP 1 (WEATHER ALERT SYSTEM) ===");
  try {
    const station = new WeatherStation();
    const currentDisplay = new CurrentConditionsDisplay();
    const statsDisplay = new StatisticsDisplay();
    const forecastDisplay = new ForecastDisplay();

    station.subscribe(currentDisplay);
    station.subscribe(statsDisplay);
    station.subscribe(forecastDisplay);

    // Test 1.1: Lần đo đầu tiên - tất cả observer nhận được thông báo
    operationLogs.length = 0;
    station.setMeasurements(28, 65, 1013);
    const test1_1 =
      operationLogs.includes("WEATHER_CURRENT: Nhiệt độ 28°C, Độ ẩm 65%, Áp suất 1013hPa") &&
      operationLogs.includes("WEATHER_STATS: Ghi nhận nhiệt độ 28°C vào thống kê") &&
      operationLogs.includes("WEATHER_FORECAST: Dự báo thời tiết cải thiện, áp suất tăng lên 1013hPa");
    console.log(
      `  - Test 1.1: 3 display đều nhận thông báo khi trạm đo lần đầu -> [${test1_1 ? "OK" : "FAIL"}]`,
    );

    // Test 1.2: Áp suất giảm - forecast báo mưa
    operationLogs.length = 0;
    station.setMeasurements(25, 80, 1008);
    const test1_2 =
      operationLogs.includes("WEATHER_CURRENT: Nhiệt độ 25°C, Độ ẩm 80%, Áp suất 1008hPa") &&
      operationLogs.includes("WEATHER_STATS: Ghi nhận nhiệt độ 25°C vào thống kê") &&
      operationLogs.includes("WEATHER_FORECAST: Dự báo có mưa, áp suất giảm xuống 1008hPa");
    console.log(
      `  - Test 1.2: Forecast dự báo có mưa khi áp suất giảm -> [${test1_2 ? "OK" : "FAIL"}]`,
    );

    // Test 1.3: Unsubscribe ForecastDisplay - chỉ còn 2 display nhận thông báo
    operationLogs.length = 0;
    station.unsubscribe(forecastDisplay);
    station.setMeasurements(30, 70, 1010);
    const test1_3 =
      operationLogs.includes("WEATHER_CURRENT: Nhiệt độ 30°C, Độ ẩm 70%, Áp suất 1010hPa") &&
      operationLogs.includes("WEATHER_STATS: Ghi nhận nhiệt độ 30°C vào thống kê") &&
      !operationLogs.some((log) => log.startsWith("WEATHER_FORECAST:"));
    console.log(
      `  - Test 1.3: ForecastDisplay không nhận thông báo sau khi unsubscribe -> [${test1_3 ? "OK" : "FAIL"}]`,
    );

    if (test1_1 && test1_2 && test1_3) {
      console.log(
        "\x1b[32m  ✓ Thành công: WeatherStation broadcast dữ liệu chính xác đến các display.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Cơ chế subscribe/notify của WeatherStation chưa hoạt động đúng.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 1 chưa hoàn thiện:\x1b[0m", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 (ORDER EVENT SYSTEM) ===");
  try {
    const orderService = new OrderService();
    const emailService = new EmailService();
    const inventoryService = new InventoryService();
    const analyticsService = new AnalyticsService();

    orderService.subscribe(emailService);
    orderService.subscribe(inventoryService);
    orderService.subscribe(analyticsService);

    // Test 2.1: Đặt đơn hàng - tất cả service đều được notify
    operationLogs.length = 0;
    orderService.placeOrder("ORD-001", 299);
    const test2_1 =
      operationLogs.includes("EMAIL: Đã gửi email xác nhận đơn hàng #ORD-001") &&
      operationLogs.includes("INVENTORY: Đã cập nhật tồn kho cho đơn hàng #ORD-001") &&
      operationLogs.includes("ANALYTICS: Ghi nhận đơn hàng #ORD-001 trị giá $299");
    console.log(
      `  - Test 2.1: 3 service được notify khi đặt đơn hàng #ORD-001 -> [${test2_1 ? "OK" : "FAIL"}]`,
    );

    // Test 2.2: Đặt đơn hàng thứ hai - kiểm tra orderId và total đúng
    operationLogs.length = 0;
    orderService.placeOrder("ORD-002", 1500);
    const test2_2 =
      operationLogs.includes("EMAIL: Đã gửi email xác nhận đơn hàng #ORD-002") &&
      operationLogs.includes("INVENTORY: Đã cập nhật tồn kho cho đơn hàng #ORD-002") &&
      operationLogs.includes("ANALYTICS: Ghi nhận đơn hàng #ORD-002 trị giá $1500");
    console.log(
      `  - Test 2.2: Thông tin đơn hàng #ORD-002 truyền đúng đến tất cả service -> [${test2_2 ? "OK" : "FAIL"}]`,
    );

    // Test 2.3: Unsubscribe AnalyticsService - chỉ còn Email và Inventory nhận thông báo
    operationLogs.length = 0;
    orderService.unsubscribe(analyticsService);
    orderService.placeOrder("ORD-003", 750);
    const test2_3 =
      operationLogs.includes("EMAIL: Đã gửi email xác nhận đơn hàng #ORD-003") &&
      operationLogs.includes("INVENTORY: Đã cập nhật tồn kho cho đơn hàng #ORD-003") &&
      !operationLogs.some((log) => log.includes("ORD-003") && log.startsWith("ANALYTICS:"));
    console.log(
      `  - Test 2.3: AnalyticsService không nhận notify sau khi unsubscribe -> [${test2_3 ? "OK" : "FAIL"}]`,
    );

    if (test2_1 && test2_2 && test2_3) {
      console.log(
        "\x1b[32m  ✓ Thành công: OrderService broadcast sự kiện đặt hàng chính xác đến các service.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Cơ chế subscribe/notify của OrderService chưa hoạt động đúng.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 2 chưa hoàn thiện:\x1b[0m", message);
  }
}

runTests();
