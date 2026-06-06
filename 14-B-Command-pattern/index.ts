/**
 * ============================================================================
 * VÍ DỤ MINH HỌA: COMMAND PATTERN
 * Thư mục: 14-B-Command-pattern/index.ts
 *
 * Ngữ cảnh: Bộ điều khiển nhà thông minh (Smart Home Remote Control).
 * - Receiver: Light (Thiết bị đèn có các hàm turnOn, turnOff).
 * - Command: Command interface (execute, undo).
 * - Concrete Commands: LightOnCommand, LightOffCommand.
 * - Invoker: RemoteControl (Giữ lịch sử lệnh để thực hiện nút Undo).
 * ============================================================================
 */

// ============================================================================
// 1. RECEIVER (Đối tượng thực sự thực thi nghiệp vụ)
// ============================================================================
class Light {
  constructor(private roomName: string) {}

  public turnOn(): void {
    console.log(`💡 [Light - ${this.roomName}] Đèn đã được BẬT.`);
  }

  public turnOff(): void {
    console.log(`💡 [Light - ${this.roomName}] Đèn đã được TẮT.`);
  }
}

// ============================================================================
// 2. COMMAND INTERFACE
// ============================================================================
interface Command {
  execute(): void;
  undo(): void;
}

// ============================================================================
// 3. CONCRETE COMMANDS
// ============================================================================
class LightOnCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  public execute(): void {
    this.light.turnOn();
  }

  public undo(): void {
    this.light.turnOff();
  }
}

class LightOffCommand implements Command {
  private light: Light;

  constructor(light: Light) {
    this.light = light;
  }

  public execute(): void {
    this.light.turnOff();
  }

  public undo(): void {
    this.light.turnOn();
  }
}

// ============================================================================
// 4. INVOKER (Giữ lịch sử lệnh để thực hiện nút Undo)
// ============================================================================
class RemoteControl {
  private undoCommand: Command | null = null;

  public pressButton(command: Command): void {
    console.log(`[Remote] Nhấn nút kích hoạt một lệnh...`);
    command.execute();
    this.undoCommand = command; // Lưu lại lệnh vừa thực thi để hoàn tác
  }

  public pressUndo(): void {
    if (this.undoCommand) {
      console.log(`[Remote] Nhấn nút UNDO (Hoàn tác) lệnh trước đó...`);
      this.undoCommand.undo();
      this.undoCommand = null;
    } else {
      console.log(`[Remote] Không có lệnh nào gần đây để hoàn tác.`);
    }
  }
}

// ============================================================================
// THỬ NGHIỆM CHẠY VÍ DỤ
// ============================================================================
function runExample() {
  console.log("=== CHẠY VÍ DỤ MINH HỌA COMMAND PATTERN ===\n");

  const livingRoomLight = new Light("Phòng Khách");
  const remote = new RemoteControl();

  // Khởi tạo các command
  const turnOn = new LightOnCommand(livingRoomLight);
  const turnOff = new LightOffCommand(livingRoomLight);

  // Thử nghiệm điều khiển
  remote.pressButton(turnOn); // Bật đèn phòng khách
  remote.pressUndo();         // Hoàn tác -> Tắt đèn

  console.log("");

  remote.pressButton(turnOff); // Tắt đèn phòng khách
  remote.pressUndo();          // Hoàn tác -> Bật đèn

  console.log("");
  remote.pressUndo();          // Không có gì để hoàn tác
}

runExample();
