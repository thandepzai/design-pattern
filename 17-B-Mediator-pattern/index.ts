/**
 * ============================================================================
 * VÍ DỤ MINH HỌA: MEDIATOR PATTERN
 * Thư mục: 17-B-Mediator-pattern/index.ts
 *
 * Ngữ cảnh: Phòng chat (Chat Room) — các thành viên gửi tin nhắn cho nhau
 * thông qua ChatRoom (mediator) thay vì kết nối trực tiếp với từng người.
 * ChatRoom còn hỗ trợ gửi tin nhắn riêng (DM) và thông báo hệ thống.
 * ============================================================================
 */

// ============================================================================
// 1. MEDIATOR INTERFACE
// ============================================================================
interface ChatMediator {
  notify(sender: ChatMember, event: string, payload?: string): void;
  sendDirect(from: ChatMember, toName: string, message: string): void;
}

// ============================================================================
// 2. BASE COMPONENT
// ============================================================================
abstract class ChatMember {
  constructor(
    public readonly name: string,
    protected mediator: ChatMediator,
  ) {}

  public send(message: string): void {
    console.log(`[${this.name}] gửi: "${message}"`);
    this.mediator.notify(this, "message", message);
  }

  public sendTo(toName: string, message: string): void {
    console.log(`[${this.name}] nhắn riêng cho ${toName}: "${message}"`);
    this.mediator.sendDirect(this, toName, message);
  }

  public abstract receive(from: string, message: string): void;
  public abstract receiveSystem(message: string): void;
}

// ============================================================================
// 3. CONCRETE MEDIATOR
// ============================================================================
class ChatRoom implements ChatMediator {
  private members: Map<string, ChatMember> = new Map();

  public join(member: ChatMember): void {
    this.members.set(member.name, member);
    // Thông báo cho tất cả thành viên hiện tại
    for (const [, existing] of this.members) {
      if (existing !== member) {
        existing.receiveSystem(`${member.name} đã tham gia phòng chat.`);
      }
    }
    member.receiveSystem(`Chào mừng bạn đến phòng chat! Hiện có ${this.members.size} thành viên.`);
  }

  public leave(memberName: string): void {
    const member = this.members.get(memberName);
    if (!member) return;
    this.members.delete(memberName);
    for (const [, existing] of this.members) {
      existing.receiveSystem(`${memberName} đã rời phòng chat.`);
    }
  }

  public notify(sender: ChatMember, event: string, payload?: string): void {
    if (event === "message" && payload !== undefined) {
      for (const [, member] of this.members) {
        if (member !== sender) {
          member.receive(sender.name, payload);
        }
      }
    }
  }

  public sendDirect(from: ChatMember, toName: string, message: string): void {
    const target = this.members.get(toName);
    if (target) {
      target.receive(`[DM từ ${from.name}]`, message);
    } else {
      from.receiveSystem(`Không tìm thấy thành viên "${toName}" trong phòng chat.`);
    }
  }
}

// ============================================================================
// 4. CONCRETE COMPONENTS
// ============================================================================
class RegularUser extends ChatMember {
  public receive(from: string, message: string): void {
    console.log(`  -> [${this.name}] nhận từ ${from}: "${message}"`);
  }

  public receiveSystem(message: string): void {
    console.log(`  -> [${this.name}] [HỆ THỐNG]: ${message}`);
  }
}

class BotUser extends ChatMember {
  private readonly keyword: string;
  private readonly autoReply: string;

  constructor(name: string, mediator: ChatMediator, keyword: string, autoReply: string) {
    super(name, mediator);
    this.keyword = keyword;
    this.autoReply = autoReply;
  }

  public receive(from: string, message: string): void {
    console.log(`  -> [BOT ${this.name}] nhận từ ${from}: "${message}"`);
    if (message.toLowerCase().includes(this.keyword.toLowerCase())) {
      console.log(`  -> [BOT ${this.name}] phát hiện từ khoá "${this.keyword}", tự động trả lời...`);
      this.send(this.autoReply);
    }
  }

  public receiveSystem(message: string): void {
    console.log(`  -> [BOT ${this.name}] [SYS]: ${message}`);
  }
}

// ============================================================================
// THỬ NGHIỆM CHẠY VÍ DỤ
// ============================================================================
function runExample(): void {
  console.log("=== CHẠY VÍ DỤ MINH HỌA MEDIATOR PATTERN ===\n");

  const chatRoom = new ChatRoom();

  const alice = new RegularUser("Alice", chatRoom);
  const bob = new RegularUser("Bob", chatRoom);
  const charlie = new RegularUser("Charlie", chatRoom);
  const helpBot = new BotUser("HelpBot", chatRoom, "giúp", "Bạn cần giúp đỡ? Hãy liên hệ admin@example.com!");

  console.log("--- Thành viên lần lượt tham gia phòng chat ---");
  chatRoom.join(alice);
  chatRoom.join(bob);
  chatRoom.join(charlie);
  chatRoom.join(helpBot);

  console.log("\n--- Alice gửi tin nhắn cho cả phòng ---");
  alice.send("Xin chào mọi người!");

  console.log("\n--- Bob gửi tin nhắn kích hoạt bot ---");
  bob.send("Ai có thể giúp mình cách cài đặt không?");

  console.log("\n--- Charlie gửi tin nhắn riêng cho Alice ---");
  charlie.sendTo("Alice", "Mình muốn hỏi riêng bạn chút!");

  console.log("\n--- Bob thử nhắn tin cho người không tồn tại ---");
  bob.sendTo("Dave", "Bạn có ở đây không?");

  console.log("\n--- Charlie rời phòng chat ---");
  chatRoom.leave("Charlie");

  console.log("\n--- Alice gửi tin sau khi Charlie rời ---");
  alice.send("Charlie đi rồi à, tiếc quá!");
}

runExample();
