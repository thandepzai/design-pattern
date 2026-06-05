/**
 * ============================================================================
 * BÀI TẬP THỰC HÀNH: PROTOTYPE PATTERN
 * Thư mục: 05-C-Prototype-pattern/exercises.ts
 *
 * Hướng dẫn: Điền mã nguồn vào các phần có đánh dấu // TODO.
 * Chạy file này bằng tsx hoặc ts-node để kiểm tra kết quả.
 * ============================================================================
 */

// ============================================================================
// BÀI TẬP 1: NHÂN BẢN HỢP ĐỒNG THÔNG MINH (DEEP VS SHALLOW CONTRACT CLONER)
// Đề bài: Triển khai sao chép nông (Shallow Copy) và sao chép sâu (Deep Copy) cho Hợp đồng.
// ============================================================================

export class ClientInfo {
  constructor(
    public companyName: string,
    public address: string,
  ) {}
}

export class Contract {
  public employeeName: string;
  public terms: string;
  public clientInfo: ClientInfo;

  constructor(employeeName: string, terms: string, clientInfo: ClientInfo) {
    this.employeeName = employeeName;
    this.terms = terms;
    this.clientInfo = clientInfo;
  }

  /**
   * Sao chép nông (Shallow Copy)
   * Chỉ sao chép các thuộc tính ở cấp độ đầu tiên. Đối tượng clientInfo lồng bên trong
   * vẫn chia sẻ chung vùng nhớ tham chiếu với đối tượng gốc.
   */
  public shallowClone(): Contract {
    // TODO: Thực hiện sao chép nông đối tượng Contract hiện tại (this) và trả về bản sao đó.
    return new Contract(this.employeeName, this.terms, this.clientInfo);
  }

  /**
   * Sao chép sâu (Deep Copy)
   * Nhân bản hoàn toàn đối tượng Contract hiện tại, bao gồm việc tạo mới một đối tượng
   * clientInfo riêng biệt có cùng giá trị thuộc tính để không dùng chung tham chiếu gốc.
   */
  public deepClone(): Contract {
    // TODO: Thực hiện sao chép sâu đối tượng Contract hiện tại (this) và trả về bản sao đó.
    return new Contract(
      this.employeeName,
      this.terms,
      new ClientInfo(this.clientInfo.companyName, this.clientInfo.address),
    );
  }
}

// ============================================================================
// BÀI TẬP 2: HỆ THỐNG NHÂN BẢN HÌNH HỌC (GRAPHIC SHAPE CLONER)
// Đề bài: Triển khai nhân bản sâu cho các hình Circle, Rectangle gồm thuộc tính lồng.
// ============================================================================

export interface Shape {
  clone(): Shape;
  draw(): void;
}

export class Circle implements Shape {
  public x: number;
  public y: number;
  public radius: number;
  public color: string;
  public style: { border: string };

  constructor(
    x: number,
    y: number,
    radius: number,
    color: string,
    style: { border: string },
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.style = style;
  }

  /**
   * Nhân bản sâu đối tượng hình tròn.
   * Đảm bảo đối tượng lồng `style` cũng được sao chép mới hoàn toàn.
   */
  public clone(): Circle {
    // TODO: Thực hiện sao chép sâu đối tượng Circle hiện tại (this) và trả về bản sao đó.
    return new Circle(this.x, this.y, this.radius, this.color, {
      ...this.style,
    });
  }

  public draw(): void {
    console.log(
      `🟢 [Vẽ Circle] Tâm: (${this.x}, ${this.y}) | Bán kính: ${this.radius} | Màu: ${this.color} | Đường viền: ${this.style.border}`,
    );
  }
}

export class Rectangle implements Shape {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public color: string;
  public style: { border: string };

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string,
    style: { border: string },
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.style = style;
  }

  /**
   * Nhân bản sâu đối tượng hình chữ nhật.
   * Đảm bảo đối tượng lồng `style` cũng được sao chép mới hoàn toàn.
   */
  public clone(): Rectangle {
    // TODO: Thực hiện sao chép sâu đối tượng Rectangle hiện tại (this) và trả về bản sao đó.
    return new Rectangle(this.x, this.y, this.width, this.height, this.color, {
      ...this.style,
    });
  }

  public draw(): void {
    console.log(
      `🟦 [Vẽ Rectangle] Tọa độ: (${this.x}, ${this.y}) | Rộng: ${this.width} x Cao: ${this.height} | Màu: ${this.color} | Đường viền: ${this.style.border}`,
    );
  }
}

// ============================================================================
// BÀI TẬP 3: QUẢN LÝ NHÂN VẬT RPG KẾT HỢP REGISTRY (CHARACTER REGISTRY MANAGER)
// Đề bài: Xây dựng bộ lưu trữ mẫu nguyên bản và thực hiện clone sâu khi xuất quái vật/hero.
// ============================================================================

export interface Prototype {
  clone(): this;
}

export abstract class Hero implements Prototype {
  public name: string;
  public heroClass: string;
  public stats: { hp: number; mp: number; strength: number };
  public equipment: string[];

  constructor(
    name: string,
    heroClass: string,
    stats: { hp: number; mp: number; strength: number },
    equipment: string[],
  ) {
    this.name = name;
    this.heroClass = heroClass;
    this.stats = stats;
    this.equipment = equipment;
  }

  // Khai báo phương thức clone trừu tượng
  public abstract clone(): this;

  public display(): void {
    console.log(
      `🛡️ [Hero] ${this.name} (${this.heroClass}) | HP: ${this.stats.hp} | MP: ${this.stats.mp} | STR: ${this.stats.strength} | Trang bị: [${this.equipment.join(", ")}]`,
    );
  }
}

export class Warrior extends Hero {
  public ragePoint: number;

  constructor(
    name: string,
    stats: { hp: number; mp: number; strength: number },
    equipment: string[],
    ragePoint: number,
  ) {
    super(name, "Warrior", stats, equipment);
    this.ragePoint = ragePoint;
  }

  /**
   * Nhân bản sâu nhân vật Warrior.
   */
  public clone(): this {
    // TODO: Thực hiện nhân bản sâu Warrior (bao gồm mảng equipment, đối tượng stats) và trả về bản sao đó.
    return new Warrior(
      this.name,
      { ...this.stats },
      [...this.equipment],
      this.ragePoint,
    ) as this;
  }
}

export class Mage extends Hero {
  public spellPower: number;

  constructor(
    name: string,
    stats: { hp: number; mp: number; strength: number },
    equipment: string[],
    spellPower: number,
  ) {
    super(name, "Mage", stats, equipment);
    this.spellPower = spellPower;
  }

  /**
   * Nhân bản sâu nhân vật Mage.
   */
  public clone(): this {
    // TODO: Thực hiện nhân bản sâu Mage (bao gồm mảng equipment, đối tượng stats) và trả về bản sao đó.
    return new Mage(
      this.name,
      { ...this.stats },
      [...this.equipment],
      this.spellPower,
    ) as this;
  }
}

export class CharacterRegistry {
  private prototypes: Record<string, Hero> = {};

  /**
   * Đăng ký một hero nguyên mẫu.
   */
  public addPrototype(key: string, hero: Hero): void {
    // TODO: Lưu hero vào bản đồ prototypes
    this.prototypes[key] = hero;
  }

  /**
   * Trả về bản sao (clone) từ nguyên mẫu tương ứng.
   * Nếu key không tồn tại trong map, ném ra một Error phù hợp.
   */
  public getPrototype(key: string): Hero {
    // TODO: Kiểm tra sự tồn tại của key. Nếu tồn tại, gọi clone() trên nguyên mẫu và trả về bản clone.
    // Ngược lại, ném ra lỗi.
    const hero = this.prototypes[key];
    if (!hero) {
      throw new Error("Character not found");
    }
    return hero.clone();
  }
}

// ============================================================================
// CLIENT CODE (DÙNG ĐỂ CHẠY THỬ NGHIỆM SAU KHI ĐÃ HOÀN THÀNH TODO)
// ============================================================================
async function runTests() {
  console.log("=== THỬ NGHIỆM BÀI TẬP 1 ===");
  try {
    const defaultClient = new ClientInfo("Google Inc", "Mountain View, CA");
    const originalContract = new Contract(
      "Nguyễn Văn A",
      "Điều khoản bảo mật thông tin NDA",
      defaultClient,
    );

    // 1. Kiểm tra Shallow Clone
    console.log("-> Kiểm thử Shallow Copy...");
    const shallowCopy = originalContract.shallowClone();

    // Thay đổi thông tin công ty ký kết ở bản sao nông
    shallowCopy.clientInfo.companyName = "Alphabet Inc";

    if (originalContract.clientInfo.companyName === "Alphabet Inc") {
      console.log(
        "\x1b[32m  ✓ Thành công: Shallow Copy hoạt động đúng (chia sẻ chung clientInfo tham chiếu).\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Shallow Copy không giữ chung tham chiếu gốc.\x1b[0m",
      );
    }

    // Khôi phục lại dữ liệu ban đầu
    originalContract.clientInfo.companyName = "Google Inc";

    // 2. Kiểm tra Deep Clone
    console.log("-> Kiểm thử Deep Copy...");
    const deepCopy = originalContract.deepClone();

    // Thay đổi thông tin công ty ở bản sao sâu
    deepCopy.clientInfo.companyName = "Meta Platforms";

    if (
      originalContract.clientInfo.companyName === "Google Inc" &&
      deepCopy.clientInfo.companyName === "Meta Platforms"
    ) {
      console.log(
        "\x1b[32m  ✓ Thành công: Deep Copy hoạt động đúng (bản sao độc lập hoàn toàn).\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Thay đổi thông tin ở bản sao sâu làm ảnh hưởng tới bản gốc.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 1 chưa hoàn thiện:\x1b[0m", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 ===");
  try {
    const baseCircle = new Circle(10, 10, 5, "Red", {
      border: "2px solid black",
    });
    const clonedCircle = baseCircle.clone();

    clonedCircle.x = 50;
    clonedCircle.style.border = "5px dashed blue";

    if (
      baseCircle.x === 10 &&
      baseCircle.style.border === "2px solid black" &&
      clonedCircle.x === 50 &&
      clonedCircle.style.border === "5px dashed blue"
    ) {
      console.log(
        "\x1b[32m  ✓ Thành công: Clone đối tượng Circle (sao chép sâu thuộc tính lồng) đạt yêu cầu.\x1b[0m",
      );
      baseCircle.draw();
      clonedCircle.draw();
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Các thuộc tính lồng hoặc thuộc tính của Circle bị ảnh hưởng lẫn nhau.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 2 chưa hoàn thiện:\x1b[0m", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 3 ===");
  try {
    const registry = new CharacterRegistry();

    const level1Warrior = new Warrior(
      "Chiến Binh Mẫu",
      { hp: 200, mp: 50, strength: 25 },
      ["Kiếm gỗ", "Khiên gỗ"],
      0,
    );
    const level1Mage = new Mage(
      "Pháp Sư Mẫu",
      { hp: 120, mp: 250, strength: 10 },
      ["Gậy phép", "Áo choàng vải"],
      15,
    );

    registry.addPrototype("default_warrior", level1Warrior);
    registry.addPrototype("default_mage", level1Mage);

    console.log("-> Lấy Warrior từ Registry và trang bị thêm vũ khí...");
    const playerWarrior = registry.getPrototype("default_warrior") as Warrior;
    playerWarrior.name = "Arthur";
    playerWarrior.equipment.push("Rìu khổng lồ");

    if (
      level1Warrior.name === "Chiến Binh Mẫu" &&
      level1Warrior.equipment.length === 2 &&
      playerWarrior.name === "Arthur" &&
      playerWarrior.equipment.length === 3
    ) {
      console.log(
        "\x1b[32m  ✓ Thành công: Registry nhân bản Warrior thành công và không chia sẻ trang bị.\x1b[0m",
      );
      level1Warrior.display();
      playerWarrior.display();
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Có hiện tượng dùng chung bộ nhớ trang bị (equipment) giữa bản mẫu và bản sao.\x1b[0m",
      );
    }

    console.log("-> Lấy Mage từ Registry...");
    const playerMage = registry.getPrototype("default_mage") as Mage;
    playerMage.name = "Gandalf";

    // Thử nghiệm lấy mẫu không tồn tại
    console.log("-> Thử nghiệm lấy key không tồn tại:");
    try {
      registry.getPrototype("default_assassin");
      console.log(
        "\x1b[31m  ✗ Thất bại: Không quăng ra lỗi khi tìm kiếm một key không tồn tại.\x1b[0m",
      );
    } catch (e) {
      console.log(
        "\x1b[32m  ✓ Thành công: Hệ thống bắt lỗi và ném ra Error chính xác khi key không tồn tại.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 3 chưa hoàn thiện:\x1b[0m", message);
  }
}

// Bỏ comment dòng dưới để chạy thử khi bạn đã hoàn thành việc code các phần TODO
runTests();
