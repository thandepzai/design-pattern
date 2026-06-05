/**
 * 05-C-Prototype-pattern/index.ts
 * Mô phỏng hệ thống sinh quái vật trong game (Monster Spawner System).
 */

// ==========================================
// 1. PROTOTYPE INTERFACE & BASE CLASS
// ==========================================
export interface Prototype {
  clone(): this;
}

export abstract class Monster implements Prototype {
  public name: string;
  public hp: number;
  public attackPower: number;
  public speed: number;
  public position: { x: number; y: number } = { x: 0, y: 0 };
  public skills: string[];

  constructor(
    name: string,
    hp: number,
    attackPower: number,
    speed: number,
    skills: string[],
  ) {
    this.name = name;
    this.hp = hp;
    this.attackPower = attackPower;
    this.speed = speed;
    this.skills = skills;
  }

  // Phương thức nhân bản trừu tượng
  public abstract clone(): this;

  public setPosition(x: number, y: number): void {
    this.position = { x, y };
  }

  public abstract render(): void;
}

// ==========================================
// 2. CONCRETE PROTOTYPES
// ==========================================

export class Zombie extends Monster {
  public decayLevel: number; // Tỉ lệ phân hủy của Zombie (%)

  constructor(
    name: string,
    hp: number,
    attackPower: number,
    speed: number,
    skills: string[],
    decayLevel: number,
  ) {
    super(name, hp, attackPower, speed, skills);
    this.decayLevel = decayLevel;
  }

  // Triển khai clone() với Deep Copy cho phần mảng skills và đối tượng position
  public clone(): this {
    const clonedSkills = [...this.skills];
    const cloned = new Zombie(
      this.name,
      this.hp,
      this.attackPower,
      this.speed,
      clonedSkills,
      this.decayLevel,
    ) as this;
    cloned.position = { ...this.position };
    return cloned;
  }

  public render(): void {
    console.log(
      `🧟 [Zombie] ${this.name} | HP: ${this.hp} | ATK: ${this.attackPower} | SPD: ${this.speed} | ` +
        `Kỹ năng: [${this.skills.join(", ")}] | Phân hủy: ${this.decayLevel}% | Vị trí: (${this.position.x}, ${this.position.y})`,
    );
  }
}

export class Skeleton extends Monster {
  public weaponType: string;

  constructor(
    name: string,
    hp: number,
    attackPower: number,
    speed: number,
    skills: string[],
    weaponType: string,
  ) {
    super(name, hp, attackPower, speed, skills);
    this.weaponType = weaponType;
  }

  // Triển khai clone() với Deep Copy
  public clone(): this {
    const clonedSkills = [...this.skills];
    const cloned = new Skeleton(
      this.name,
      this.hp,
      this.attackPower,
      this.speed,
      clonedSkills,
      this.weaponType,
    ) as this;
    cloned.position = { ...this.position };
    return cloned;
  }

  public render(): void {
    console.log(
      `💀 [Skeleton] ${this.name} | HP: ${this.hp} | ATK: ${this.attackPower} | SPD: ${this.speed} | ` +
        `Kỹ năng: [${this.skills.join(", ")}] | Vũ khí: ${this.weaponType} | Vị trí: (${this.position.x}, ${this.position.y})`,
    );
  }
}

// ==========================================
// 3. PROTOTYPE REGISTRY (Bộ quản lý nguyên mẫu)
// ==========================================
export class MonsterRegistry {
  private prototypes: Record<string, Monster> = {};

  /**
   * Đăng ký một đối tượng làm nguyên mẫu chuẩn.
   */
  public registerPrototype(key: string, prototype: Monster): void {
    this.prototypes[key] = prototype;
  }

  /**
   * Nhân bản một quái vật từ nguyên mẫu đã đăng ký.
   */
  public getMonster(key: string): Monster {
    const proto = this.prototypes[key];
    if (!proto) {
      throw new Error(`Lỗi: Không tìm thấy mẫu quái vật có mã "${key}".`);
    }
    return proto.clone();
  }
}

// ==========================================
// CLIENT CODE (Mô phỏng sinh quái vật trên bản đồ game)
// ==========================================
async function runApplication() {
  console.log("🎮 KHỞI ĐỘNG HỆ THỐNG SINH QUÁI VẬT TRONG GAME 🎮\n");

  const registry = new MonsterRegistry();

  // 1. Tạo các đối tượng nguyên bản (Prototypes) và đăng ký vào hệ thống
  console.log(">>> [Khởi tạo] Đăng ký các mẫu quái vật nguyên bản...");
  
  const defaultZombie = new Zombie(
    "Zombie Thường",
    100,
    15,
    5,
    ["Cắn", "Cào"],
    20,
  );
  const bossZombie = new Zombie(
    "Zombie Khổng Lồ (Boss)",
    1000,
    80,
    3,
    ["Đập đất", "Hú gọi bầy", "Húc"],
    50,
  );
  const archerSkeleton = new Skeleton(
    "Xương Cung Thủ",
    80,
    25,
    8,
    ["Bắn xa", "Trốn chạy"],
    "Cung gỗ",
  );

  registry.registerPrototype("zombie_normal", defaultZombie);
  registry.registerPrototype("zombie_boss", bossZombie);
  registry.registerPrototype("skeleton_archer", archerSkeleton);
  console.log("Đã đăng ký thành công các mẫu: [zombie_normal, zombie_boss, skeleton_archer]\n");

  // 2. Sinh quái vật bằng cách sao chép từ registry (Client không dùng `new`)
  console.log(">>> [Spawning] Bắt đầu sinh quái vật xuất hiện trên bản đồ...");

  // Sinh 2 Zombie thường tại các vị trí khác nhau
  const zombie1 = registry.getMonster("zombie_normal") as Zombie;
  zombie1.setPosition(10, 20);
  zombie1.render();

  const zombie2 = registry.getMonster("zombie_normal") as Zombie;
  zombie2.setPosition(45, 12);
  // Ta có thể điều chỉnh thuộc tính đặc thù của bản sao mà không làm ảnh hưởng bản mẫu
  zombie2.name = "Zombie Đột Biến";
  zombie2.hp = 150;
  zombie2.skills.push("Tăng tốc độ"); // Thêm skill mới
  zombie2.render();

  // Sinh 1 Xương cung thủ
  const skeleton1 = registry.getMonster("skeleton_archer") as Skeleton;
  skeleton1.setPosition(100, 150);
  skeleton1.render();

  // Sinh 1 Boss Zombie
  const boss = registry.getMonster("zombie_boss") as Zombie;
  boss.setPosition(500, 500);
  boss.render();

  console.log("\n>>> [Kiểm chứng] Kiểm tra xem đối tượng mẫu nguyên bản ban đầu có bị thay đổi không:");
  // Xem lại defaultZombie ban đầu trong registry xem có bị thêm skill "Tăng tốc độ" hay đổi HP thành 150 không
  defaultZombie.render(); 
  // Kết quả kỳ vọng: defaultZombie vẫn giữ nguyên HP 100, Kỹ năng: [Cắn, Cào] và Vị trí (0,0)
}

runApplication();
