/**
 * ============================================================================
 * VÍ DỤ MINH HỌA: FACADE PATTERN
 * Thư mục: 10-S-Facade-pattern/index.ts
 *
 * Ngữ cảnh: Hệ thống Rạp chiếu phim tại nhà (Home Theater System).
 * - Hệ thống con phức tạp: Amplifier, Projector, Screen, PopcornPopper, DvdPlayer.
 * - Facade: HomeTheaterFacade (Cung cấp các phương thức đơn giản: watchMovie(), endMovie()).
 * ============================================================================
 */

// ============================================================================
// 1. SUBSYSTEM CLASSES (Các thành phần phức tạp bên dưới)
// ============================================================================

class PopcornPopper {
  public on(): void {
    console.log("🍿 [Popcorn Popper] Đang bật...");
  }
  public pop(): void {
    console.log("🍿 [Popcorn Popper] Đang nổ bắp rang bơ...");
  }
  public off(): void {
    console.log("🍿 [Popcorn Popper] Đã tắt.");
  }
}

class Projector {
  public on(): void {
    console.log("📹 [Projector] Đang bật máy chiếu...");
  }
  public wideScreenMode(): void {
    console.log("📹 [Projector] Đã chuyển sang chế độ màn ảnh rộng (16:9).");
  }
  public off(): void {
    console.log("📹 [Projector] Đã tắt máy chiếu.");
  }
}

class Amplifier {
  public on(): void {
    console.log("🔊 [Amplifier] Đang bật âm ly...");
  }
  public setVolume(level: number): void {
    console.log(`🔊 [Amplifier] Thiết lập âm lượng ở mức: ${level}`);
  }
  public off(): void {
    console.log("🔊 [Amplifier] Đã tắt âm ly.");
  }
}

class DvdPlayer {
  public on(): void {
    console.log("📀 [DVD Player] Đang bật đầu đĩa...");
  }
  public play(movie: string): void {
    console.log(`📀 [DVD Player] Đang phát phim: "${movie}"`);
  }
  public stop(): void {
    console.log("📀 [DVD Player] Đã dừng phát phim.");
  }
  public off(): void {
    console.log("📀 [DVD Player] Đã tắt đầu đĩa.");
  }
}

// ============================================================================
// 2. FACADE CLASS (Mặt tiền điều khiển chung)
// ============================================================================
class HomeTheaterFacade {
  private popper: PopcornPopper;
  private projector: Projector;
  private amp: Amplifier;
  private dvd: DvdPlayer;

  constructor(
    popper: PopcornPopper,
    projector: Projector,
    amp: Amplifier,
    dvd: DvdPlayer
  ) {
    this.popper = popper;
    this.projector = projector;
    this.amp = amp;
    this.dvd = dvd;
  }

  // Phương thức mặt tiền đơn giản để xem phim
  public watchMovie(movie: string): void {
    console.log(`🎬 Chuẩn bị chiếu phim: "${movie}"...`);
    this.popper.on();
    this.popper.pop();

    this.projector.on();
    this.projector.wideScreenMode();

    this.amp.on();
    this.amp.setVolume(7);

    this.dvd.on();
    this.dvd.play(movie);
    console.log(`🎬 Phim bắt đầu chiếu! Hãy thưởng thức bắp rang bơ.`);
  }

  // Phương thức mặt tiền đơn giản để dọn dẹp sau khi xem xong
  public endMovie(): void {
    console.log("🎬 Đang tắt rạp chiếu phim...");
    this.popper.off();
    this.projector.off();
    this.amp.off();
    this.dvd.stop();
    this.dvd.off();
    console.log("🎬 Đã tắt toàn bộ thiết bị. Chúc ngủ ngon!");
  }
}

// ============================================================================
// THỬ NGHIỆM CHẠY CHƯƠNG TRÌNH
// ============================================================================
function runExample() {
  console.log("=== CHẠY VÍ DỤ MINH HỌA FACADE PATTERN ===\n");

  // Khởi tạo các linh kiện phức tạp
  const popper = new PopcornPopper();
  const projector = new Projector();
  const amp = new Amplifier();
  const dvd = new DvdPlayer();

  // Tạo đối tượng Facade
  const homeTheater = new HomeTheaterFacade(popper, projector, amp, dvd);

  // Client chỉ cần tương tác qua Facade rất ngắn gọn
  homeTheater.watchMovie("Kẻ Hủy Diệt (Terminator)");
  
  console.log("\n------------------------------------------------\n");
  
  homeTheater.endMovie();
}

runExample();
