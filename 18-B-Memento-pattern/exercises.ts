/**
 * ============================================================================
 * BÀI TẬP THỰC HÀNH: MEMENTO PATTERN
 * Thư mục: 18-B-Memento-pattern/exercises.ts
 *
 * Hướng dẫn: Điền mã nguồn vào các phần có đánh dấu // TODO.
 * ============================================================================
 */

export const operationLogs: string[] = [];

// ============================================================================
// BÀI TẬP 1: LỊCH SỬ TRẠNG THÁI NHÂN VẬT TRONG GAME (PLAYER CHECKPOINT)
// ============================================================================

export class PlayerMemento {
  constructor(
    private readonly hp: number,
    private readonly mp: number,
    private readonly level: number,
    private readonly position: string,
  ) {}

  public getHp(): number {
    return this.hp;
  }

  public getMp(): number {
    return this.mp;
  }

  public getLevel(): number {
    return this.level;
  }

  public getPosition(): string {
    return this.position;
  }
}

export class Player {
  private hp: number;
  private mp: number;
  private level: number;
  private position: string;

  constructor(hp: number, mp: number, level: number, position: string) {
    this.hp = hp;
    this.mp = mp;
    this.level = level;
    this.position = position;
  }

  public takeDamage(amount: number): void {
    this.hp = Math.max(0, this.hp - amount);
  }

  public useMp(amount: number): void {
    this.mp = Math.max(0, this.mp - amount);
  }

  public levelUp(): void {
    this.level += 1;
    this.hp = 100;
    this.mp = 100;
  }

  public moveTo(position: string): void {
    this.position = position;
  }

  public save(): PlayerMemento {
    // TODO: Triển khai các bước:
    // 1. Ghi log vào operationLogs: `"GAME: Lưu checkpoint - HP:${this.hp} MP:${this.mp} Level:${this.level} Pos:${this.position}"`
    // 2. Tạo và trả về `new PlayerMemento(this.hp, this.mp, this.level, this.position)`.
    return new PlayerMemento(0, 0, 0, "");
  }

  public restore(memento: PlayerMemento): void {
    // TODO: Triển khai các bước:
    // 1. Khôi phục `this.hp`, `this.mp`, `this.level`, `this.position` từ memento bằng các getter.
    // 2. Ghi log vào operationLogs:
    //    `"GAME: Khôi phục checkpoint - HP:${this.hp} MP:${this.mp} Level:${this.level} Pos:${this.position}"`
  }

  public getStats(): { hp: number; mp: number; level: number; position: string } {
    return { hp: this.hp, mp: this.mp, level: this.level, position: this.position };
  }
}

export class GameSaveManager {
  private checkpoints: PlayerMemento[] = [];

  public saveCheckpoint(memento: PlayerMemento): void {
    this.checkpoints.push(memento);
  }

  public loadCheckpoint(): PlayerMemento | undefined {
    return this.checkpoints.pop();
  }

  public hasCheckpoint(): boolean {
    return this.checkpoints.length > 0;
  }

  public getCheckpointCount(): number {
    return this.checkpoints.length;
  }
}

// ============================================================================
// BÀI TẬP 2: CONFIGURATION MANAGER VỚI ROLLBACK
// ============================================================================

export class ConfigMemento {
  constructor(
    private readonly theme: string,
    private readonly language: string,
    private readonly fontSize: number,
  ) {}

  public getTheme(): string {
    return this.theme;
  }

  public getLanguage(): string {
    return this.language;
  }

  public getFontSize(): number {
    return this.fontSize;
  }
}

export class AppConfig {
  private theme: string;
  private language: string;
  private fontSize: number;

  constructor(theme: string, language: string, fontSize: number) {
    this.theme = theme;
    this.language = language;
    this.fontSize = fontSize;
  }

  public setTheme(theme: string): void {
    this.theme = theme;
  }

  public setLanguage(language: string): void {
    this.language = language;
  }

  public setFontSize(fontSize: number): void {
    this.fontSize = fontSize;
  }

  public save(): ConfigMemento {
    // TODO: Triển khai các bước:
    // 1. Ghi log vào operationLogs:
    //    `"CONFIG: Lưu snapshot - theme:${this.theme} lang:${this.language} fontSize:${this.fontSize}"`
    // 2. Tạo và trả về `new ConfigMemento(this.theme, this.language, this.fontSize)`.
    return new ConfigMemento("", "", 0);
  }

  public restore(memento: ConfigMemento): void {
    // TODO: Triển khai các bước:
    // 1. Khôi phục `this.theme`, `this.language`, `this.fontSize` từ memento bằng các getter.
    // 2. Ghi log vào operationLogs:
    //    `"CONFIG: Rollback về - theme:${this.theme} lang:${this.language} fontSize:${this.fontSize}"`
  }

  public getConfig(): { theme: string; language: string; fontSize: number } {
    return { theme: this.theme, language: this.language, fontSize: this.fontSize };
  }
}

export class ConfigManager {
  private history: ConfigMemento[] = [];

  public snapshot(config: AppConfig): void {
    this.history.push(config.save());
  }

  public rollback(config: AppConfig): boolean {
    if (this.history.length === 0) {
      return false;
    }
    const previousMemento = this.history.pop()!;
    config.restore(previousMemento);
    return true;
  }

  public hasHistory(): boolean {
    return this.history.length > 0;
  }

  public getHistoryCount(): number {
    return this.history.length;
  }
}

// ============================================================================
// CLIENT CODE & TEST RUNNER
// ============================================================================
async function runTests(): Promise<void> {
  console.log("=== THỬ NGHIỆM BÀI TẬP 1 (PLAYER CHECKPOINT) ===");
  try {
    const player = new Player(100, 80, 1, "Town");
    const saveManager = new GameSaveManager();

    operationLogs.length = 0;

    const checkpoint1 = player.save();
    saveManager.saveCheckpoint(checkpoint1);

    const test1_1 = operationLogs.includes(
      "GAME: Lưu checkpoint - HP:100 MP:80 Level:1 Pos:Town",
    );
    console.log(`  - Test 1.1: Lưu checkpoint đầu tiên đúng format -> [${test1_1 ? "OK" : "FAIL"}]`);

    player.moveTo("Dungeon");
    player.takeDamage(60);
    player.useMp(40);

    operationLogs.length = 0;
    const checkpoint2 = player.save();
    saveManager.saveCheckpoint(checkpoint2);

    const test1_2 = operationLogs.includes(
      "GAME: Lưu checkpoint - HP:40 MP:40 Level:1 Pos:Dungeon",
    );
    console.log(`  - Test 1.2: Lưu checkpoint sau khi chiến đấu -> [${test1_2 ? "OK" : "FAIL"}]`);

    player.takeDamage(40);
    const statsAfterDeath = player.getStats();
    const test1_3 = statsAfterDeath.hp === 0;
    console.log(`  - Test 1.3: Nhân vật chết (HP = 0) -> [${test1_3 ? "OK" : "FAIL"}]`);

    operationLogs.length = 0;
    const loaded = saveManager.loadCheckpoint();
    if (loaded !== undefined) {
      player.restore(loaded);
    }

    const test1_4 = operationLogs.includes(
      "GAME: Khôi phục checkpoint - HP:40 MP:40 Level:1 Pos:Dungeon",
    );
    console.log(`  - Test 1.4: Khôi phục checkpoint đúng format -> [${test1_4 ? "OK" : "FAIL"}]`);

    const statsRestored = player.getStats();
    const test1_5 = statsRestored.hp === 40 && statsRestored.position === "Dungeon";
    console.log(`  - Test 1.5: Trạng thái nhân vật được phục hồi đúng -> [${test1_5 ? "OK" : "FAIL"}]`);

    operationLogs.length = 0;
    const loaded2 = saveManager.loadCheckpoint();
    if (loaded2 !== undefined) {
      player.restore(loaded2);
    }

    const test1_6 = operationLogs.includes(
      "GAME: Khôi phục checkpoint - HP:100 MP:80 Level:1 Pos:Town",
    );
    console.log(`  - Test 1.6: Load checkpoint đầu tiên (Town) -> [${test1_6 ? "OK" : "FAIL"}]`);

    const allPassed = test1_1 && test1_2 && test1_3 && test1_4 && test1_5 && test1_6;
    if (allPassed) {
      console.log("\x1b[32m  ✓ Thành công: Player checkpoint save/restore hoạt động chính xác.\x1b[0m");
    } else {
      console.log("\x1b[31m  ✗ Thất bại: Logic save/restore checkpoint chưa đúng.\x1b[0m");
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 1 chưa hoàn thiện:\x1b[0m", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 (CONFIG MANAGER ROLLBACK) ===");
  try {
    const config = new AppConfig("light", "vi", 14);
    const manager = new ConfigManager();

    operationLogs.length = 0;
    manager.snapshot(config);

    const test2_1 = operationLogs.includes(
      "CONFIG: Lưu snapshot - theme:light lang:vi fontSize:14",
    );
    console.log(`  - Test 2.1: Lưu snapshot config đầu tiên -> [${test2_1 ? "OK" : "FAIL"}]`);

    config.setTheme("dark");
    config.setLanguage("en");
    config.setFontSize(16);

    operationLogs.length = 0;
    manager.snapshot(config);

    const test2_2 = operationLogs.includes(
      "CONFIG: Lưu snapshot - theme:dark lang:en fontSize:16",
    );
    console.log(`  - Test 2.2: Lưu snapshot config sau khi thay đổi -> [${test2_2 ? "OK" : "FAIL"}]`);

    config.setTheme("contrast");
    config.setFontSize(20);

    const test2_3 = config.getConfig().theme === "contrast" && config.getConfig().fontSize === 20;
    console.log(`  - Test 2.3: Config hiện tại đã thay đổi (contrast/20) -> [${test2_3 ? "OK" : "FAIL"}]`);

    operationLogs.length = 0;
    manager.rollback(config);

    const test2_4 = operationLogs.includes(
      "CONFIG: Rollback về - theme:dark lang:en fontSize:16",
    );
    console.log(`  - Test 2.4: Rollback về config dark/en/16 -> [${test2_4 ? "OK" : "FAIL"}]`);

    operationLogs.length = 0;
    manager.rollback(config);

    const test2_5 = operationLogs.includes(
      "CONFIG: Rollback về - theme:light lang:vi fontSize:14",
    );
    console.log(`  - Test 2.5: Rollback về config gốc light/vi/14 -> [${test2_5 ? "OK" : "FAIL"}]`);

    const test2_6 = !manager.hasHistory();
    console.log(`  - Test 2.6: Không còn history sau khi rollback hết -> [${test2_6 ? "OK" : "FAIL"}]`);

    const noMoreRollback = manager.rollback(config);
    const test2_7 = noMoreRollback === false;
    console.log(`  - Test 2.7: rollback() trả về false khi hết history -> [${test2_7 ? "OK" : "FAIL"}]`);

    const allPassed2 = test2_1 && test2_2 && test2_3 && test2_4 && test2_5 && test2_6 && test2_7;
    if (allPassed2) {
      console.log("\x1b[32m  ✓ Thành công: Config Manager snapshot/rollback hoạt động chính xác.\x1b[0m");
    } else {
      console.log("\x1b[31m  ✗ Thất bại: Logic snapshot hoặc rollback config chưa đúng.\x1b[0m");
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 2 chưa hoàn thiện:\x1b[0m", message);
  }
}

runTests();
