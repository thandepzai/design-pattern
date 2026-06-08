/**
 * ============================================================================
 * BÀI TẬP THỰC HÀNH: STATE PATTERN
 * Thư mục: 20-B-State-pattern/exercises.ts
 *
 * Hướng dẫn: Điền mã nguồn vào các phần có đánh dấu // TODO.
 * Chạy file này bằng tsx hoặc ts-node để kiểm tra kết quả.
 * ============================================================================
 */

export const operationLogs: string[] = [];

// ============================================================================
// BÀI TẬP 1: VÒNG ĐỜI ĐƠN HÀNG (ORDER LIFECYCLE)
// ============================================================================

export interface OrderState {
  cancel(order: Order): void;
  confirm(order: Order): void;
  ship(order: Order): void;
  deliver(order: Order): void;
}

export class Order {
  private state: OrderState;
  public readonly id: string;

  constructor(id: string) {
    this.id = id;
    this.state = new PendingState();
  }

  public setState(state: OrderState): void {
    this.state = state;
  }

  public cancel(): void {
    this.state.cancel(this);
  }

  public confirm(): void {
    this.state.confirm(this);
  }

  public ship(): void {
    this.state.ship(this);
  }

  public deliver(): void {
    this.state.deliver(this);
  }
}

export class PendingState implements OrderState {
  public cancel(order: Order): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs: `ORDER: Đơn hàng #${order.id} đã bị huỷ.`
    // 2. Không cần chuyển state (đơn hàng đã kết thúc).
    operationLogs.push(`ORDER: Đơn hàng #${order.id} đã bị huỷ.`);
  }

  public confirm(order: Order): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs: `ORDER: Đơn hàng #${order.id} đã được xác nhận, đang xử lý.`
    // 2. Chuyển state của order sang ProcessingState.
    operationLogs.push(`ORDER: Đơn hàng #${order.id} đã được xác nhận, đang xử lý.`);
    order.setState(new ProcessingState());
  }

  public ship(order: Order): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs: `ORDER: Không thể giao vận đơn hàng ở trạng thái chờ xác nhận.`
    operationLogs.push(`ORDER: Không thể giao vận đơn hàng ở trạng thái chờ xác nhận.`);
  }

  public deliver(order: Order): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs: `ORDER: Không thể giao hàng đơn hàng ở trạng thái chờ xác nhận.`
    operationLogs.push(`ORDER: Không thể giao hàng đơn hàng ở trạng thái chờ xác nhận.`);
  }
}

export class ProcessingState implements OrderState {
  public cancel(order: Order): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs: `ORDER: Đơn hàng #${order.id} đã bị huỷ.`
    // 2. Không cần chuyển state (đơn hàng đã kết thúc).
    operationLogs.push(`ORDER: Đơn hàng #${order.id} đã bị huỷ.`);
  }

  public confirm(order: Order): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs: `ORDER: Không thể xác nhận đơn hàng ở trạng thái đang xử lý.`
    operationLogs.push(`ORDER: Không thể xác nhận đơn hàng ở trạng thái đang xử lý.`);
  }

  public ship(order: Order): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs: `ORDER: Đơn hàng #${order.id} đã được giao cho đơn vị vận chuyển.`
    // 2. Chuyển state của order sang ShippedState.
    operationLogs.push(`ORDER: Đơn hàng #${order.id} đã được giao cho đơn vị vận chuyển.`);
    order.setState(new ShippedState());
  }

  public deliver(order: Order): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs: `ORDER: Không thể giao hàng đơn hàng ở trạng thái đang xử lý.`
    operationLogs.push(`ORDER: Không thể giao hàng đơn hàng ở trạng thái đang xử lý.`);
  }
}

export class ShippedState implements OrderState {
  public cancel(order: Order): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs: `ORDER: Không thể huỷ đơn hàng ở trạng thái đang vận chuyển.`
    operationLogs.push(`ORDER: Không thể huỷ đơn hàng ở trạng thái đang vận chuyển.`);
  }

  public confirm(order: Order): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs: `ORDER: Không thể xác nhận đơn hàng ở trạng thái đang vận chuyển.`
    operationLogs.push(`ORDER: Không thể xác nhận đơn hàng ở trạng thái đang vận chuyển.`);
  }

  public ship(order: Order): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs: `ORDER: Không thể giao vận đơn hàng ở trạng thái đang vận chuyển.`
    operationLogs.push(`ORDER: Không thể giao vận đơn hàng ở trạng thái đang vận chuyển.`);
  }

  public deliver(order: Order): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs: `ORDER: Đơn hàng #${order.id} đã giao thành công.`
    // 2. Chuyển state của order sang DeliveredState.
    operationLogs.push(`ORDER: Đơn hàng #${order.id} đã giao thành công.`);
    order.setState(new DeliveredState());
  }
}

export class DeliveredState implements OrderState {
  public cancel(order: Order): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs: `ORDER: Không thể huỷ đơn hàng đã giao thành công.`
    operationLogs.push(`ORDER: Không thể huỷ đơn hàng đã giao thành công.`);
  }

  public confirm(order: Order): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs: `ORDER: Không thể xác nhận đơn hàng đã giao thành công.`
    operationLogs.push(`ORDER: Không thể xác nhận đơn hàng đã giao thành công.`);
  }

  public ship(order: Order): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs: `ORDER: Không thể giao vận đơn hàng đã giao thành công.`
    operationLogs.push(`ORDER: Không thể giao vận đơn hàng đã giao thành công.`);
  }

  public deliver(order: Order): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs: `ORDER: Không thể giao hàng đơn hàng đã giao thành công.`
    operationLogs.push(`ORDER: Không thể giao hàng đơn hàng đã giao thành công.`);
  }
}

// ============================================================================
// BÀI TẬP 2: MEDIA PLAYER (MEDIA PLAYBACK STATES)
// ============================================================================

export interface MediaState {
  play(player: MediaPlayer): void;
  pause(player: MediaPlayer): void;
  stop(player: MediaPlayer): void;
}

export class MediaPlayer {
  private state: MediaState;
  private currentTrack: string = "";

  constructor() {
    this.state = new StoppedState();
  }

  public setState(state: MediaState): void {
    this.state = state;
  }

  public setTrack(track: string): void {
    this.currentTrack = track;
  }

  public getTrack(): string {
    return this.currentTrack;
  }

  public play(track?: string): void {
    if (track) {
      this.currentTrack = track;
    }
    this.state.play(this);
  }

  public pause(): void {
    this.state.pause(this);
  }

  public stop(): void {
    this.state.stop(this);
  }
}

export class StoppedState implements MediaState {
  public play(player: MediaPlayer): void {
    // TODO: Triển khai các bước:
    // 1. Lấy track từ player.getTrack().
    // 2. Push vào operationLogs: `MEDIA: Bắt đầu phát ${track}.`
    // 3. Chuyển state của player sang PlayingState.
    const track = player.getTrack();
    operationLogs.push(`MEDIA: Bắt đầu phát ${track}.`);
    player.setState(new PlayingState());
  }

  public pause(_player: MediaPlayer): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs: `MEDIA: Không thể tạm dừng ở trạng thái hiện tại.`
    operationLogs.push(`MEDIA: Không thể tạm dừng ở trạng thái hiện tại.`);
  }

  public stop(_player: MediaPlayer): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs: `MEDIA: Không thể dừng ở trạng thái hiện tại.`
    operationLogs.push(`MEDIA: Không thể dừng ở trạng thái hiện tại.`);
  }
}

export class PlayingState implements MediaState {
  public play(_player: MediaPlayer): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs: `MEDIA: Không thể phát ở trạng thái hiện tại.`
    operationLogs.push(`MEDIA: Không thể phát ở trạng thái hiện tại.`);
  }

  public pause(player: MediaPlayer): void {
    // TODO: Triển khai các bước:
    // 1. Lấy track từ player.getTrack().
    // 2. Push vào operationLogs: `MEDIA: Tạm dừng ${track}.`
    // 3. Chuyển state của player sang PausedState.
    const track = player.getTrack();
    operationLogs.push(`MEDIA: Tạm dừng ${track}.`);
    player.setState(new PausedState());
  }

  public stop(player: MediaPlayer): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs: `MEDIA: Dừng phát.`
    // 2. Xóa track: gọi player.setTrack("").
    // 3. Chuyển state của player sang StoppedState.
    operationLogs.push(`MEDIA: Dừng phát.`);
    player.setTrack("");
    player.setState(new StoppedState());
  }
}

export class PausedState implements MediaState {
  public play(player: MediaPlayer): void {
    // TODO: Triển khai các bước:
    // 1. Lấy track từ player.getTrack().
    // 2. Push vào operationLogs: `MEDIA: Tiếp tục phát ${track}.`
    // 3. Chuyển state của player sang PlayingState.
    const track = player.getTrack();
    operationLogs.push(`MEDIA: Tiếp tục phát ${track}.`);
    player.setState(new PlayingState());
  }

  public pause(_player: MediaPlayer): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs: `MEDIA: Không thể tạm dừng ở trạng thái hiện tại.`
    operationLogs.push(`MEDIA: Không thể tạm dừng ở trạng thái hiện tại.`);
  }

  public stop(player: MediaPlayer): void {
    // TODO: Triển khai các bước:
    // 1. Push vào operationLogs: `MEDIA: Dừng phát.`
    // 2. Xóa track: gọi player.setTrack("").
    // 3. Chuyển state của player sang StoppedState.
    operationLogs.push(`MEDIA: Dừng phát.`);
    player.setTrack("");
    player.setState(new StoppedState());
  }
}

// ============================================================================
// CLIENT CODE (DÙNG ĐỂ CHẠY THỬ NGHIỆM)
// ============================================================================
async function runTests() {
  console.log("=== THỬ NGHIỆM BÀI TẬP 1 (ORDER LIFECYCLE) ===");
  try {
    // Test 1.1: Luồng hoàn chỉnh Pending -> Processing -> Shipped -> Delivered
    operationLogs.length = 0;
    const order1 = new Order("DH-001");
    order1.confirm();
    order1.ship();
    order1.deliver();
    const test1_1 =
      operationLogs.includes("ORDER: Đơn hàng #DH-001 đã được xác nhận, đang xử lý.") &&
      operationLogs.includes("ORDER: Đơn hàng #DH-001 đã được giao cho đơn vị vận chuyển.") &&
      operationLogs.includes("ORDER: Đơn hàng #DH-001 đã giao thành công.");
    console.log(
      `  - Test 1.1: Luồng Pending -> Processing -> Shipped -> Delivered thành công -> [${test1_1 ? "OK" : "FAIL"}]`,
    );

    // Test 1.2: Huỷ đơn hàng từ trạng thái Pending
    operationLogs.length = 0;
    const order2 = new Order("DH-002");
    order2.cancel();
    const test1_2 = operationLogs.includes("ORDER: Đơn hàng #DH-002 đã bị huỷ.");
    console.log(
      `  - Test 1.2: Huỷ đơn hàng từ trạng thái Pending -> [${test1_2 ? "OK" : "FAIL"}]`,
    );

    // Test 1.3: Huỷ đơn từ Pending, sau đó thử confirm - không được xử lý tiếp
    operationLogs.length = 0;
    const order3 = new Order("DH-003");
    order3.confirm();
    order3.cancel();
    order3.ship(); // Đã huỷ, không có state xử lý -> không push log ship
    const test1_3 =
      operationLogs.includes("ORDER: Đơn hàng #DH-003 đã được xác nhận, đang xử lý.") &&
      operationLogs.includes("ORDER: Đơn hàng #DH-003 đã bị huỷ.");
    console.log(
      `  - Test 1.3: Huỷ đơn sau khi xác nhận, không thể ship nữa -> [${test1_3 ? "OK" : "FAIL"}]`,
    );

    // Test 1.4: Thử ship từ Pending - bị từ chối
    operationLogs.length = 0;
    const order4 = new Order("DH-004");
    order4.ship();
    const test1_4 = operationLogs.includes(
      "ORDER: Không thể giao vận đơn hàng ở trạng thái chờ xác nhận.",
    );
    console.log(
      `  - Test 1.4: Ship từ Pending bị từ chối với thông báo phù hợp -> [${test1_4 ? "OK" : "FAIL"}]`,
    );

    // Test 1.5: Thử huỷ đơn đã giao thành công
    operationLogs.length = 0;
    const order5 = new Order("DH-005");
    order5.confirm();
    order5.ship();
    order5.deliver();
    order5.cancel();
    const test1_5 = operationLogs.includes("ORDER: Không thể huỷ đơn hàng đã giao thành công.");
    console.log(
      `  - Test 1.5: Huỷ đơn đã giao bị từ chối với thông báo phù hợp -> [${test1_5 ? "OK" : "FAIL"}]`,
    );

    if (test1_1 && test1_2 && test1_3 && test1_4 && test1_5) {
      console.log(
        "\x1b[32m  ✓ Thành công: Order lifecycle chuyển trạng thái và từ chối hành động đúng.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Một hoặc nhiều trạng thái của Order chưa hoạt động đúng.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 1 chưa hoàn thiện:\x1b[0m", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 (MEDIA PLAYER) ===");
  try {
    // Test 2.1: Phát nhạc từ trạng thái dừng
    operationLogs.length = 0;
    const player1 = new MediaPlayer();
    player1.play("Bohemian Rhapsody");
    const test2_1 = operationLogs.includes("MEDIA: Bắt đầu phát Bohemian Rhapsody.");
    console.log(
      `  - Test 2.1: Bắt đầu phát từ StoppedState -> [${test2_1 ? "OK" : "FAIL"}]`,
    );

    // Test 2.2: Đang phát -> tạm dừng -> tiếp tục phát
    operationLogs.length = 0;
    const player2 = new MediaPlayer();
    player2.play("Hotel California");
    player2.pause();
    player2.play();
    const test2_2 =
      operationLogs.includes("MEDIA: Bắt đầu phát Hotel California.") &&
      operationLogs.includes("MEDIA: Tạm dừng Hotel California.") &&
      operationLogs.includes("MEDIA: Tiếp tục phát Hotel California.");
    console.log(
      `  - Test 2.2: Play -> Pause -> Resume hoạt động đúng -> [${test2_2 ? "OK" : "FAIL"}]`,
    );

    // Test 2.3: Đang phát -> dừng hẳn
    operationLogs.length = 0;
    const player3 = new MediaPlayer();
    player3.play("Stairway to Heaven");
    player3.stop();
    const test2_3 =
      operationLogs.includes("MEDIA: Bắt đầu phát Stairway to Heaven.") &&
      operationLogs.includes("MEDIA: Dừng phát.");
    console.log(
      `  - Test 2.3: Play -> Stop hoạt động đúng -> [${test2_3 ? "OK" : "FAIL"}]`,
    );

    // Test 2.4: Tạm dừng -> dừng hẳn
    operationLogs.length = 0;
    const player4 = new MediaPlayer();
    player4.play("Imagine");
    player4.pause();
    player4.stop();
    const test2_4 =
      operationLogs.includes("MEDIA: Tạm dừng Imagine.") &&
      operationLogs.includes("MEDIA: Dừng phát.");
    console.log(
      `  - Test 2.4: Pause -> Stop hoạt động đúng -> [${test2_4 ? "OK" : "FAIL"}]`,
    );

    // Test 2.5: Thử pause khi đang dừng - bị từ chối
    operationLogs.length = 0;
    const player5 = new MediaPlayer();
    player5.pause();
    const test2_5 = operationLogs.includes("MEDIA: Không thể tạm dừng ở trạng thái hiện tại.");
    console.log(
      `  - Test 2.5: Pause khi dừng bị từ chối đúng -> [${test2_5 ? "OK" : "FAIL"}]`,
    );

    if (test2_1 && test2_2 && test2_3 && test2_4 && test2_5) {
      console.log(
        "\x1b[32m  ✓ Thành công: MediaPlayer chuyển trạng thái và từ chối hành động không hợp lệ đúng.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Một hoặc nhiều trạng thái của MediaPlayer chưa hoạt động đúng.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 2 chưa hoàn thiện:\x1b[0m", message);
  }
}

runTests();
