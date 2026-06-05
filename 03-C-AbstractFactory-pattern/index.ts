/**
 * 03-C-AbstractFactory-pattern/index.ts
 * Mô phỏng hệ thống khởi tạo giao diện người dùng (UI Kit) hoạt động đa nền tảng.
 */

// ==========================================
// 1. ABSTRACT PRODUCTS (Giao diện sản phẩm trừu tượng)
// ==========================================

export interface Button {
  render(): void;
  onClick(callback: () => void): void;
}

export interface Checkbox {
  render(): void;
  toggle(): void;
  isChecked(): boolean;
}

// ==========================================
// 2. CONCRETE PRODUCTS (Các lớp sản phẩm cụ thể theo nền tảng)
// ==========================================

// --- Windows Components ---
export class WindowsButton implements Button {
  public render(): void {
    console.log("  [Windows Button] Rendering a flat rectangular button with thin gray border.");
  }

  public onClick(callback: () => void): void {
    console.log("  [Windows Button] Registering Windows-specific double-click & click event.");
    callback();
  }
}

export class WindowsCheckbox implements Checkbox {
  private checked: boolean = false;

  public render(): void {
    console.log(`  [Windows Checkbox] Rendering a square box with style: [${this.checked ? "X" : " "}]`);
  }

  public toggle(): void {
    this.checked = !this.checked;
    console.log(`  [Windows Checkbox] State toggled to: ${this.checked ? "CHECKED" : "UNCHECKED"}`);
  }

  public isChecked(): boolean {
    return this.checked;
  }
}

// --- macOS Components ---
export class MacButton implements Button {
  public render(): void {
    console.log("  [macOS Button] Rendering a rounded glassy button with native drop shadow.");
  }

  public onClick(callback: () => void): void {
    console.log("  [macOS Button] Triggering macOS-specific spring animation and click event.");
    callback();
  }
}

export class MacCheckbox implements Checkbox {
  private checked: boolean = false;

  public render(): void {
    console.log(`  [macOS Checkbox] Rendering a rounded blue checkbox with style: [${this.checked ? "✓" : " "}]`);
  }

  public toggle(): void {
    this.checked = !this.checked;
    console.log(`  [macOS Checkbox] Native sound effect played. State toggled to: ${this.checked ? "✓" : " "}`);
  }

  public isChecked(): boolean {
    return this.checked;
  }
}

// --- Linux (GTK+) Components ---
export class LinuxButton implements Button {
  public render(): void {
    console.log("  [Linux Button] Rendering a custom themed button based on GTK+ specification.");
  }

  public onClick(callback: () => void): void {
    console.log("  [Linux Button] Processing GTK+ click event signals.");
    callback();
  }
}

export class LinuxCheckbox implements Checkbox {
  private checked: boolean = false;

  public render(): void {
    console.log(`  [Linux Checkbox] Rendering flat check box with theme tint: [${this.checked ? "■" : " "}]`);
  }

  public toggle(): void {
    this.checked = !this.checked;
    console.log(`  [Linux Checkbox] GTK State changed to: ${this.checked ? "SELECTED" : "DESELECTED"}`);
  }

  public isChecked(): boolean {
    return this.checked;
  }
}

// ==========================================
// 3. ABSTRACT FACTORY (Nhà máy trừu tượng)
// ==========================================

export interface UIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

// ==========================================
// 4. CONCRETE FACTORIES (Các nhà máy cụ thể)
// ==========================================

export class WindowsUIFactory implements UIFactory {
  public createButton(): Button {
    return new WindowsButton();
  }

  public createCheckbox(): Checkbox {
    return new WindowsCheckbox();
  }
}

export class MacUIFactory implements UIFactory {
  public createButton(): Button {
    return new MacButton();
  }

  public createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}

export class LinuxUIFactory implements UIFactory {
  public createButton(): Button {
    return new LinuxButton();
  }

  public createCheckbox(): Checkbox {
    return new LinuxCheckbox();
  }
}

// ==========================================
// 5. CLIENT CODE (Lớp sử dụng độc lập với nền tảng cụ thể)
// ==========================================

class AppWindow {
  private button: Button;
  private checkbox: Checkbox;
  private osName: string;

  constructor(factory: UIFactory, osName: string) {
    this.osName = osName;
    // Khởi tạo các thành phần giao diện mà không cần biết chúng thuộc class cụ thể nào!
    this.button = factory.createButton();
    this.checkbox = factory.createCheckbox();
  }

  public draw(): void {
    console.log(`\n--------------------------------------------------`);
    console.log(`[CỬA SỔ ỨNG DỤNG] Hệ điều hành phát hiện: \x1b[36m${this.osName.toUpperCase()}\x1b[0m`);
    console.log(`[CỬA SỔ ỨNG DỤNG] Đang tiến hành vẽ các thành phần...`);
    
    this.button.render();
    this.checkbox.render();

    console.log(`[CỬA SỔ ỨNG DỤNG] Tương tác với các thành phần:`);
    this.button.onClick(() => {
      console.log("    \x1b[32m=> Client Callback: Đã nhấn nút! Lưu cài đặt thành công.\x1b[0m");
    });

    this.checkbox.toggle();
    this.checkbox.render();
    console.log(`--------------------------------------------------\n`);
  }
}

// ==========================================
// RUN APPLICATION
// ==========================================
async function runApplication() {
  console.log("🚀 KHỞI ĐỘNG HỆ THỐNG GIAO DIỆN ĐA NỀN TẢNG (CROSS-PLATFORM UI KIT) 🚀\n");

  // Giả lập ứng dụng chạy trên Windows
  const winFactory: UIFactory = new WindowsUIFactory();
  const appOnWindows = new AppWindow(winFactory, "Windows 11");
  appOnWindows.draw();

  await new Promise((resolve) => setTimeout(resolve, 500));

  // Giả lập ứng dụng chạy trên macOS
  const macFactory: UIFactory = new MacUIFactory();
  const appOnMac = new AppWindow(macFactory, "macOS Sequoia");
  appOnMac.draw();

  await new Promise((resolve) => setTimeout(resolve, 500));

  // Giả lập ứng dụng chạy trên Linux
  const linuxFactory: UIFactory = new LinuxUIFactory();
  const appOnLinux = new AppWindow(linuxFactory, "Ubuntu Linux 24.04");
  appOnLinux.draw();
}

runApplication();
