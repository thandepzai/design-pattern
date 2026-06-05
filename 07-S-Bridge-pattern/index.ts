/**
 * ============================================================================
 * VÍ DỤ MINH HỌA: BRIDGE PATTERN
 * Thư mục: 07-S-Bridge-pattern/index.ts
 *
 * Ngữ cảnh: Hệ thống điều khiển từ xa thông minh (Smart Remote Control System).
 * - Chúng ta có các Thiết bị điện tử (Devices): TV, Radio. Chúng có cách hoạt động
 *   nội bộ khác nhau nhưng chia sẻ một giao diện chung để điều khiển.
 * - Chúng ta có các loại Điều khiển (Remote Controls): Điều khiển cơ bản và
 *   Điều khiển nâng cao (có thêm nút Mute, phím tắt nhanh).
 * - Bridge Pattern giúp kết nối bất kỳ loại điều khiển nào với bất kỳ loại thiết
 *   bị nào mà không cần tạo ra các lớp kết hợp kiểu `BasicRemoteForTV`, `AdvancedRemoteForRadio`.
 * ============================================================================
 */

// ============================================================================
// 1. IMPLEMENTOR INTERFACE (Giao diện chung cho các thiết bị)
// ============================================================================
interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(percent: number): void;
  getChannel(): number;
  setChannel(channel: number): void;
  getDeviceName(): string;
}

// ============================================================================
// 2. CONCRETE IMPLEMENTORS (Các thiết bị cụ thể)
// ============================================================================

// Lớp Tivi
class TV implements Device {
  private on: boolean = false;
  private volume: number = 30;
  private channel: number = 1;

  public isEnabled(): boolean {
    return this.on;
  }

  public enable(): void {
    this.on = true;
    console.log(`📺 [TV] Đã Bật nguồn.`);
  }

  public disable(): void {
    this.on = false;
    console.log(`📺 [TV] Đã Tắt nguồn.`);
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(percent: number): void {
    // Giới hạn âm lượng từ 0 đến 100
    this.volume = Math.max(0, Math.min(100, percent));
    console.log(`📺 [TV] Thiết lập âm lượng: ${this.volume}%`);
  }

  public getChannel(): number {
    return this.channel;
  }

  public setChannel(channel: number): void {
    this.channel = channel;
    console.log(`📺 [TV] Chuyển sang kênh số: ${this.channel}`);
  }

  public getDeviceName(): string {
    return "Tivi Sony Bravia";
  }
}

// Lớp Đài Radio
class Radio implements Device {
  private on: boolean = false;
  private volume: number = 15;
  private channel: number = 90; // Kênh FM (90 Mhz)

  public isEnabled(): boolean {
    return this.on;
  }

  public enable(): void {
    this.on = true;
    console.log(`📻 [Radio] Đã Bật nguồn.`);
  }

  public disable(): void {
    this.on = false;
    console.log(`📻 [Radio] Đã Tắt nguồn.`);
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(percent: number): void {
    this.volume = Math.max(0, Math.min(100, percent));
    console.log(`📻 [Radio] Thiết lập âm lượng: ${this.volume}%`);
  }

  public getChannel(): number {
    return this.channel;
  }

  public setChannel(channel: number): void {
    this.channel = channel;
    console.log(`📻 [Radio] Chuyển sang tần số: ${this.channel} MHz`);
  }

  public getDeviceName(): string {
    return "Đài Radio Panasonic";
  }
}

// ============================================================================
// 3. ABSTRACTION (Lớp điều khiển trừu tượng)
// ============================================================================
class RemoteControl {
  protected device: Device; // Cầu nối (Bridge) đến thiết bị thực tế

  constructor(device: Device) {
    this.device = device;
  }

  public togglePower(): void {
    console.log(`🕹️ [Remote] Bấm nút Nguồn cho ${this.device.getDeviceName()}`);
    if (this.device.isEnabled()) {
      this.device.disable();
    } else {
      this.device.enable();
    }
  }

  public volumeDown(): void {
    console.log(`🕹️ [Remote] Bấm nút Giảm âm lượng (-)`);
    const currentVol = this.device.getVolume();
    this.device.setVolume(currentVol - 10);
  }

  public volumeUp(): void {
    console.log(`🕹️ [Remote] Bấm nút Tăng âm lượng (+)`);
    const currentVol = this.device.getVolume();
    this.device.setVolume(currentVol + 10);
  }

  public channelDown(): void {
    console.log(`🕹️ [Remote] Bấm nút Lùi kênh (<)`);
    const currentChan = this.device.getChannel();
    this.device.setChannel(currentChan - 1);
  }

  public channelUp(): void {
    console.log(`🕹️ [Remote] Bấm nút Tiến kênh (>)`);
    const currentChan = this.device.getChannel();
    this.device.setChannel(currentChan + 1);
  }
}

// ============================================================================
// 4. REFINED ABSTRACTION (Lớp điều khiển nâng cao bổ sung chức năng mới)
// ============================================================================
class AdvancedRemoteControl extends RemoteControl {
  private previousVolume: number = 0;

  // Bổ sung nút Mute (Tắt tiếng nhanh)
  public mute(): void {
    console.log(`🕹️ [Advanced Remote] Bấm nút Tắt tiếng (MUTE)`);
    const currentVol = this.device.getVolume();
    if (currentVol > 0) {
      this.previousVolume = currentVol;
      this.device.setVolume(0);
    } else {
      // Nhấn Mute lần nữa để khôi phục âm lượng trước đó
      this.device.setVolume(this.previousVolume);
    }
  }

  // Bổ sung phím tắt nhanh chuyển tới kênh yêu thích
  public selectFavoriteChannel(channel: number): void {
    console.log(`🕹️ [Advanced Remote] Bấm phím tắt chuyển nhanh tới kênh: ${channel}`);
    this.device.setChannel(channel);
  }
}

// ============================================================================
// THỬ NGHIỆM CHẠY CHƯƠNG TRÌNH
// ============================================================================
function runExample() {
  console.log("=== CHẠY VÍ DỤ MINH HỌA BRIDGE PATTERN ===\n");

  // Tạo các thiết bị thực tế
  const tv = new TV();
  const radio = new Radio();

  console.log("--- Tình huống 1: Sử dụng Remote cơ bản điều khiển TV ---");
  const basicRemoteForTv = new RemoteControl(tv);
  basicRemoteForTv.togglePower();
  basicRemoteForTv.volumeUp();
  basicRemoteForTv.channelUp();
  basicRemoteForTv.togglePower();
  console.log("\n");

  console.log("--- Tình huống 2: Sử dụng Remote nâng cao điều khiển Radio ---");
  // Chúng ta kết nối AdvancedRemoteControl với Radio
  const advancedRemoteForRadio = new AdvancedRemoteControl(radio);
  advancedRemoteForRadio.togglePower();
  
  // Các chức năng cơ bản
  advancedRemoteForRadio.volumeUp();
  
  // Chức năng nâng cao của Advanced Remote
  advancedRemoteForRadio.mute(); // Tắt tiếng về 0%
  advancedRemoteForRadio.mute(); // Khôi phục lại âm lượng cũ
  advancedRemoteForRadio.selectFavoriteChannel(102); // Chuyển nhanh tần số FM 102 MHz
  
  advancedRemoteForRadio.togglePower();
  console.log("\n");

  console.log("--- Tình huống 3: Sử dụng Remote nâng cao điều khiển TV (Khả năng linh hoạt) ---");
  // Ta cũng có thể dùng chính chiếc AdvancedRemote đó kết nối sang Tivi một cách dễ dàng
  const advancedRemoteForTv = new AdvancedRemoteControl(tv);
  advancedRemoteForTv.togglePower();
  advancedRemoteForTv.selectFavoriteChannel(7); // Bật VTV7
  advancedRemoteForTv.togglePower();
}

runExample();
