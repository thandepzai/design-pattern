/**
 * ============================================================================
 * BÀI TẬP THỰC HÀNH: MEDIATOR PATTERN
 * Thư mục: 17-B-Mediator-pattern/exercises.ts
 *
 * Hướng dẫn: Điền mã nguồn vào các phần có đánh dấu // TODO.
 * ============================================================================
 */

export const operationLogs: string[] = [];

// ============================================================================
// BÀI TẬP 1: HỆ THỐNG ĐIỀU PHỐI KHÔNG LƯU (AIR TRAFFIC CONTROL)
// ============================================================================

export interface AirTrafficControl {
  requestLanding(plane: Airplane): void;
  requestTakeoff(plane: Airplane): void;
}

export class Airplane {
  constructor(
    public readonly planeId: string,
    private atc: AirTrafficControl,
  ) {}

  public requestLanding(): void {
    this.atc.requestLanding(this);
  }

  public requestTakeoff(): void {
    this.atc.requestTakeoff(this);
  }
}

export class Airport implements AirTrafficControl {
  private isRunwayClear: boolean = true;

  public requestLanding(plane: Airplane): void {
    // TODO: Triển khai các bước:
    // 1. Kiểm tra `this.isRunwayClear`.
    // 2. Nếu đường băng rảnh (true):
    //    - Đặt `this.isRunwayClear = false` (đường băng đang được sử dụng).
    //    - Ghi log: `"ATC: ${plane.planeId} được phép hạ cánh."`
    // 3. Nếu đường băng bận (false):
    //    - Ghi log: `"ATC: ${plane.planeId} phải chờ, đường băng bận!"`
  }

  public requestTakeoff(plane: Airplane): void {
    // TODO: Triển khai các bước:
    // 1. Ghi log: `"ATC: ${plane.planeId} được phép cất cánh."`
    // 2. Đặt `this.isRunwayClear = true` (đường băng rảnh sau khi cất cánh).
  }
}

// ============================================================================
// BÀI TẬP 2: HỆ THỐNG ĐIỀU PHỐI FORM PHỨC TẠP
// ============================================================================

export interface FormMediator {
  notify(sender: FormComponent, event: string, payload?: string): void;
}

export abstract class FormComponent {
  constructor(protected mediator: FormMediator) {}
}

export class DropdownCountry extends FormComponent {
  private selectedCountry: string = "";

  public selectCountry(country: string): void {
    // TODO: Triển khai các bước:
    // 1. Lưu `country` vào `this.selectedCountry`.
    // 2. Gọi `this.mediator.notify(this, "countryChanged", country)` để thông báo.
  }

  public getSelectedCountry(): string {
    return this.selectedCountry;
  }
}

export class DropdownCity extends FormComponent {
  private selectedCity: string = "";
  private availableCities: string[] = [];

  public updateCities(cities: string[]): void {
    this.availableCities = cities;
    this.selectedCity = "";
  }

  public selectCity(city: string): void {
    if (this.availableCities.includes(city)) {
      this.selectedCity = city;
      this.mediator.notify(this, "cityChanged", city);
    }
  }

  public getSelectedCity(): string {
    return this.selectedCity;
  }

  public getAvailableCities(): string[] {
    return this.availableCities;
  }
}

export class CheckboxAgree extends FormComponent {
  private checked: boolean = false;

  public toggle(): void {
    // TODO: Triển khai các bước:
    // 1. Đảo ngược giá trị `this.checked` (true -> false hoặc false -> true).
    // 2. Gọi `this.mediator.notify(this, "checkboxChanged", String(this.checked))`.
  }

  public isChecked(): boolean {
    return this.checked;
  }
}

export class ButtonSubmit extends FormComponent {
  private enabled: boolean = false;

  public setEnabled(value: boolean): void {
    this.enabled = value;
  }

  public submit(country: string, city: string): void {
    if (this.enabled) {
      operationLogs.push(`FORM: Submit form ${country}/${city}`);
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }
}

export class OrderFormMediator implements FormMediator {
  private dropdownCountry: DropdownCountry;
  private dropdownCity: DropdownCity;
  private checkboxAgree: CheckboxAgree;
  private buttonSubmit: ButtonSubmit;

  private citiesByCountry: Record<string, string[]> = {
    "Vietnam": ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng"],
    "Japan": ["Tokyo", "Osaka", "Kyoto"],
    "USA": ["New York", "Los Angeles", "Chicago"],
  };

  constructor() {
    this.dropdownCountry = new DropdownCountry(this);
    this.dropdownCity = new DropdownCity(this);
    this.checkboxAgree = new CheckboxAgree(this);
    this.buttonSubmit = new ButtonSubmit(this);
  }

  public notify(sender: FormComponent, event: string, payload?: string): void {
    if (event === "countryChanged" && payload !== undefined) {
      const cities = this.citiesByCountry[payload] ?? [];
      this.dropdownCity.updateCities(cities);
      operationLogs.push(`FORM: Đã chọn quốc gia ${payload}, cập nhật danh sách thành phố.`);
      this.buttonSubmit.setEnabled(false);
    }

    if (event === "checkboxChanged") {
      // TODO: Triển khai các bước:
      // 1. Kiểm tra `this.checkboxAgree.isChecked()`.
      // 2. Nếu đã được check (true):
      //    - Ghi log: "FORM: Đã đồng ý điều khoản, nút Submit được kích hoạt."
      //    - Gọi `this.buttonSubmit.setEnabled(true)`.
      // 3. Nếu bỏ check (false):
      //    - Gọi `this.buttonSubmit.setEnabled(false)`.
    }
  }

  public getDropdownCountry(): DropdownCountry {
    return this.dropdownCountry;
  }

  public getDropdownCity(): DropdownCity {
    return this.dropdownCity;
  }

  public getCheckboxAgree(): CheckboxAgree {
    return this.checkboxAgree;
  }

  public getButtonSubmit(): ButtonSubmit {
    return this.buttonSubmit;
  }
}

// ============================================================================
// CLIENT CODE & TEST RUNNER
// ============================================================================
async function runTests(): Promise<void> {
  console.log("=== THỬ NGHIỆM BÀI TẬP 1 (AIR TRAFFIC CONTROL) ===");
  try {
    const airport = new Airport();
    const vn123 = new Airplane("VN123", airport);
    const vj456 = new Airplane("VJ456", airport);
    const vn789 = new Airplane("VN789", airport);

    operationLogs.length = 0;

    vn123.requestLanding();
    vj456.requestLanding();
    vn123.requestTakeoff();
    vn789.requestLanding();

    const test1_1 = operationLogs.includes("ATC: VN123 được phép hạ cánh.");
    console.log(`  - Test 1.1: VN123 được phép hạ cánh (đường băng rảnh) -> [${test1_1 ? "OK" : "FAIL"}]`);

    const test1_2 = operationLogs.includes("ATC: VJ456 phải chờ, đường băng bận!");
    console.log(`  - Test 1.2: VJ456 phải chờ (đường băng bận) -> [${test1_2 ? "OK" : "FAIL"}]`);

    const test1_3 = operationLogs.includes("ATC: VN123 được phép cất cánh.");
    console.log(`  - Test 1.3: VN123 được phép cất cánh -> [${test1_3 ? "OK" : "FAIL"}]`);

    const test1_4 = operationLogs.includes("ATC: VN789 được phép hạ cánh.");
    console.log(`  - Test 1.4: VN789 được phép hạ cánh (đường băng rảnh lại sau khi VN123 cất cánh) -> [${test1_4 ? "OK" : "FAIL"}]`);

    const allPassed = test1_1 && test1_2 && test1_3 && test1_4;
    if (allPassed) {
      console.log("\x1b[32m  ✓ Thành công: ATC điều phối hạ cánh/cất cánh chính xác.\x1b[0m");
    } else {
      console.log("\x1b[31m  ✗ Thất bại: Logic điều phối đường băng chưa đúng.\x1b[0m");
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 1 chưa hoàn thiện:\x1b[0m", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 (FORM MEDIATOR) ===");
  try {
    const form = new OrderFormMediator();
    const countryDd = form.getDropdownCountry();
    const cityDd = form.getDropdownCity();
    const checkbox = form.getCheckboxAgree();
    const submitBtn = form.getButtonSubmit();

    operationLogs.length = 0;

    countryDd.selectCountry("Vietnam");

    const test2_1 = operationLogs.includes("FORM: Đã chọn quốc gia Vietnam, cập nhật danh sách thành phố.");
    console.log(`  - Test 2.1: Chọn quốc gia Vietnam cập nhật log -> [${test2_1 ? "OK" : "FAIL"}]`);

    const test2_2 = cityDd.getAvailableCities().includes("Hà Nội");
    console.log(`  - Test 2.2: Danh sách thành phố cập nhật theo Vietnam -> [${test2_2 ? "OK" : "FAIL"}]`);

    cityDd.selectCity("Hà Nội");

    const test2_3 = !submitBtn.isEnabled();
    console.log(`  - Test 2.3: Submit chưa được bật (chưa tick checkbox) -> [${test2_3 ? "OK" : "FAIL"}]`);

    operationLogs.length = 0;
    checkbox.toggle();

    const test2_4 = operationLogs.includes("FORM: Đã đồng ý điều khoản, nút Submit được kích hoạt.");
    console.log(`  - Test 2.4: Tick checkbox kích hoạt Submit -> [${test2_4 ? "OK" : "FAIL"}]`);

    const test2_5 = submitBtn.isEnabled();
    console.log(`  - Test 2.5: Submit button thực sự được enable -> [${test2_5 ? "OK" : "FAIL"}]`);

    operationLogs.length = 0;
    submitBtn.submit(countryDd.getSelectedCountry(), cityDd.getSelectedCity());

    const test2_6 = operationLogs.includes("FORM: Submit form Vietnam/Hà Nội");
    console.log(`  - Test 2.6: Submit form ghi log đúng format -> [${test2_6 ? "OK" : "FAIL"}]`);

    const allPassed2 = test2_1 && test2_2 && test2_3 && test2_4 && test2_5 && test2_6;
    if (allPassed2) {
      console.log("\x1b[32m  ✓ Thành công: Form Mediator điều phối các component chính xác.\x1b[0m");
    } else {
      console.log("\x1b[31m  ✗ Thất bại: Logic điều phối form chưa đúng.\x1b[0m");
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 2 chưa hoàn thiện:\x1b[0m", message);
  }
}

runTests();
