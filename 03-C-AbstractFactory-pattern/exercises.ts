/**
 * ============================================================================
 * BÀI TẬP THỰC HÀNH: ABSTRACT FACTORY PATTERN
 * Thư mục: 03-C-AbstractFactory-pattern/exercises.ts
 *
 * Hướng dẫn: Điền mã nguồn vào các phần có đánh dấu // TODO.
 * Chạy file này bằng tsx hoặc ts-node để kiểm tra kết quả.
 * ============================================================================
 */

// ============================================================================
// BÀI TẬP 1: HỆ THỐNG TRANG BỊ NHÂN VẬT TRONG GAME (RPG EQUIPMENT KIT)
// Đề bài: Khởi tạo Weapon và Armor đồng bộ cho phái Warrior và Mage.
// ============================================================================

// 1. Abstract Products
export interface Weapon {
  use(): void;
}

export interface Armor {
  wear(): void;
}

// 2. Concrete Products - Warrior (TODO)
export class Sword implements Weapon {
  public use(): void {
    // TODO: In ra: `[Sword] Đang chém cận chiến gây 50 sát thương vật lý.`
    console.log("[Sword] Đang chém cận chiến gây 50 sát thương vật lý.");
  }
}

export class PlateMail implements Armor {
  public wear(): void {
    // TODO: In ra: `[PlateMail] Đang mặc giáp sắt dày giúp giảm 30% sát thương nhận vào.`
    console.log("[PlateMail] Đang mặc giáp sắt dày giúp giảm 30% sát thương nhận vào.");
  }
}

// Concrete Products - Mage (TODO)
export class Staff implements Weapon {
  public use(): void {
    // TODO: In ra: `[Staff] Đang niệm phép bắn tia lửa gây 80 sát thương ma pháp.`
    console.log("[Staff] Đang niệm phép bắn tia lửa gây 80 sát thương ma pháp.");
  }
}

export class Robe implements Armor {
  public wear(): void {
    // TODO: In ra: `[Robe] Đang khoác áo choàng vải tăng tốc độ hồi phục năng lượng.`
    console.log("[Robe] Đang khoác áo choàng vải tăng tốc độ hồi phục năng lượng.");
  }
}

// 3. Abstract Factory
export interface GameEquipmentFactory {
  createWeapon(): Weapon;
  createArmor(): Armor;
}

// 4. Concrete Factories (TODO)
export class WarriorEquipmentFactory implements GameEquipmentFactory {
  public createWeapon(): Weapon {
    // TODO: Trả về một đối tượng Sword mới
    return new Sword();
  }

  public createArmor(): Armor {
    // TODO: Trả về một đối tượng PlateMail mới
    return new PlateMail();
  }
}

export class MageEquipmentFactory implements GameEquipmentFactory {
  public createWeapon(): Weapon {
    // TODO: Trả về một đối tượng Staff mới
    return new Staff();
  }

  public createArmor(): Armor {
    // TODO: Trả về một đối tượng Robe mới
    return new Robe();
  }
}

// 5. Client Code (TODO)
export class GameCharacter {
  private name: string;
  private weapon!: Weapon;
  private armor!: Armor;

  constructor(name: string) {
    this.name = name;
  }

  public equip(factory: GameEquipmentFactory): void {
    // TODO: Khởi tạo vũ khí và giáp từ factory được truyền vào
    this.weapon = factory.createWeapon();
    this.armor = factory.createArmor();
  }

  public showEquipment(): void {
    console.log(`\n[Nhân vật: ${this.name}] Bắt đầu chiến đấu với trang bị:`);
    // TODO: Gọi hàm use() của vũ khí và wear() của giáp
    this.weapon.use();
    this.armor.wear();
  }
}

// ============================================================================
// BÀI TẬP 2: HỆ THỐNG TRUYỀN THÔNG KHÁCH HÀNG (B2B VS B2C SUITE)
// Đề bài: Tạo Document và Notifier đồng bộ cho B2B (PDF + Email) và B2C (HTML + Push).
// ============================================================================

// 1. Abstract Products
export interface Document {
  generate(content: string): void;
}

export interface Notifier {
  notify(recipient: string, message: string): Promise<void>;
}

// 2. Concrete Products - B2B (TODO)
export class PdfDocument implements Document {
  public generate(content: string): void {
    // TODO: In ra: `[PDF Document] Đang tạo tài liệu báo cáo trang trọng: "[content]"`
    console.log(`[PDF Document] Đang tạo tài liệu báo cáo trang trọng: "${content}"`);
  }
}

export class EmailNotifier implements Notifier {
  public async notify(recipient: string, message: string): Promise<void> {
    // TODO: In ra: `[Email Notifier] Gửi email đến doanh nghiệp [recipient]: "[message]"`
    console.log(`[Email Notifier] Gửi email đến doanh nghiệp ${recipient}: "${message}"`);
  }
}

// Concrete Products - B2C (TODO)
export class HtmlDocument implements Document {
  public generate(content: string): void {
    // TODO: In ra: `[HTML Document] Đang tạo trang tài liệu động: "[content]"`
    console.log(`[HTML Document] Đang tạo trang tài liệu động: "${content}"`);
  }
}

export class PushNotifier implements Notifier {
  public async notify(recipient: string, message: string): Promise<void> {
    // TODO: In ra: `[Push Notifier] Gửi Push thông báo tới thiết bị của [recipient]: "[message]"`
    console.log(`[Push Notifier] Gửi Push thông báo tới thiết bị của ${recipient}: "${message}"`);
  }
}

// 3. Abstract Factory
export interface CommunicationFactory {
  createDocument(): Document;
  createNotifier(): Notifier;
}

// 4. Concrete Factories (TODO)
export class B2BCommunicationFactory implements CommunicationFactory {
  public createDocument(): Document {
    // TODO: Trả về đối tượng PdfDocument
    return new PdfDocument();
  }

  public createNotifier(): Notifier {
    // TODO: Trả về đối tượng EmailNotifier
    return new EmailNotifier();
  }
}

export class B2CCommunicationFactory implements CommunicationFactory {
  public createDocument(): Document {
    // TODO: Trả về đối tượng HtmlDocument
    return new HtmlDocument();
  }

  public createNotifier(): Notifier {
    // TODO: Trả về đối tượng PushNotifier
    return new PushNotifier();
  }
}

// 5. Client Code (TODO)
export class CommunicationManager {
  // TODO: Tự xây dựng hàm gửi báo cáo gửi tài liệu đồng bộ
  // Ví dụ hàm:
  // public async sendReport(recipient: string, content: string, factory: CommunicationFactory): Promise<void>
  // Luồng xử lý:
  // 1. Tạo tài liệu từ factory và gọi hàm generate(content).
  // 2. Tạo notifier từ factory và gọi hàm notify(recipient, "Báo cáo mới đã sẵn sàng!").
  public async sendReport(
    recipient: string,
    content: string,
    factory: CommunicationFactory,
  ): Promise<void> {
    console.log(`\n[Communication Manager] Chuẩn bị xuất bản tài liệu...`);
    const doc = factory.createDocument();
    const notifier = factory.createNotifier();

    doc.generate(content);
    await notifier.notify(recipient, "Báo cáo định kỳ tháng này của bạn.");
  }
}

// ============================================================================
// BÀI TẬP 3: CẤU HÌNH MÔI TRƯỜNG CHẠY ỨNG DỤNG (ENVIRONMENT BOOTSTRAPPER)
// Đề bài: Tạo DatabaseConnection và AppLogger phù hợp cho Production và Development.
// ============================================================================

// 1. Abstract Products
export interface DatabaseConnection {
  connect(uri: string): void;
  disconnect(): void;
}

export interface AppLogger {
  log(message: string): void;
}

// 2. Concrete Products - Production (TODO)
export class PgConnection implements DatabaseConnection {
  public connect(uri: string): void {
    // TODO: In ra: `[PgConnection] Đang kết nối tới DB Cluster: [uri]`
    console.log(`[PgConnection] Đang kết nối tới DB Cluster: ${uri}`);
  }

  public disconnect(): void {
    // TODO: In ra: `[PgConnection] Ngắt kết nối Cluster an toàn.`
    console.log("[PgConnection] Ngắt kết nối Cluster an toàn.");
  }
}

export class JsonLogger implements AppLogger {
  public log(message: string): void {
    // TODO: In ra log dạng JSON chứa level, timestamp, message
    // Ví dụ: {"level":"info","timestamp":"2026-06-05T07:42:24.342Z","message":"[message]"}
    console.log(
      JSON.stringify({
        level: "info",
        timestamp: new Date().toISOString(),
        message: message,
      }),
    );
  }
}

// Concrete Products - Development (TODO)
export class SqliteConnection implements DatabaseConnection {
  public connect(uri: string): void {
    // TODO: In ra: `[SqliteConnection] Mở file DB cục bộ: [uri]`
    console.log(`[SqliteConnection] Mở file DB cục bộ: ${uri}`);
  }

  public disconnect(): void {
    // TODO: In ra: `[SqliteConnection] Đóng file DB.`
    console.log("[SqliteConnection] Đóng file DB.");
  }
}

export class ConsoleLogger implements AppLogger {
  public log(message: string): void {
    // TODO: In ra: `[DEV LOG - INFO] [message]`
    console.log(`[DEV LOG - INFO] ${message}`);
  }
}

// 3. Abstract Factory
export interface EnvironmentFactory {
  createConnection(): DatabaseConnection;
  createLogger(): AppLogger;
}

// 4. Concrete Factories (TODO)
export class ProdEnvironmentFactory implements EnvironmentFactory {
  public createConnection(): DatabaseConnection {
    // TODO: Trả về PgConnection
    return new PgConnection();
  }

  public createLogger(): AppLogger {
    // TODO: Trả về JsonLogger
    return new JsonLogger();
  }
}

export class DevEnvironmentFactory implements EnvironmentFactory {
  public createConnection(): DatabaseConnection {
    // TODO: Trả về SqliteConnection
    return new SqliteConnection();
  }

  public createLogger(): AppLogger {
    // TODO: Trả về ConsoleLogger
    return new ConsoleLogger();
  }
}

// ============================================================================
// CLIENT CODE (DÙNG ĐỂ CHẠY THỬ NGHIỆM SAU KHI ĐÃ HOÀN THÀNH TODO)
// ============================================================================
async function runTests() {
  console.log("=== THỬ NGHIỆM BÀI TẬP 1 ===");
  try {
    const warriorFactory = new WarriorEquipmentFactory();
    const warrior = new GameCharacter("Arthur");
    warrior.equip(warriorFactory);
    warrior.showEquipment();

    const mageFactory = new MageEquipmentFactory();
    const mage = new GameCharacter("Gandalf");
    mage.equip(mageFactory);
    mage.showEquipment();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("Bài tập 1 chưa hoàn thiện:", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 ===");
  try {
    const manager = new CommunicationManager();
    
    // Gửi báo cáo cho B2B
    const b2bFactory = new B2BCommunicationFactory();
    await manager.sendReport("partner@corporate.com", "Báo cáo tài chính quý 1", b2bFactory);

    // Gửi báo cáo cho B2C
    const b2cFactory = new B2CCommunicationFactory();
    await manager.sendReport("user123", "Hóa đơn mua sắm của bạn", b2cFactory);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("Bài tập 2 chưa hoàn thiện:", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 3 ===");
  try {
    const runEnv = (factory: EnvironmentFactory, uri: string) => {
      const conn = factory.createConnection();
      const logger = factory.createLogger();

      conn.connect(uri);
      logger.log("Hệ thống đã khởi động thành công.");
      logger.log("Đang tiến hành đồng bộ dữ liệu người dùng...");
      conn.disconnect();
    };

    console.log(">>> CHẠY TRÊN MÔI TRƯỜNG DEVELOPMENT:");
    runEnv(new DevEnvironmentFactory(), "dev.db");

    console.log("\n>>> CHẠY TRÊN MÔI TRƯỜNG PRODUCTION:");
    runEnv(new ProdEnvironmentFactory(), "postgresql://db.company.com:5432/prod");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("Bài tập 3 chưa hoàn thiện:", message);
  }
}

// Bỏ comment dòng dưới để chạy thử khi bạn đã code xong các phần TODO
runTests();
