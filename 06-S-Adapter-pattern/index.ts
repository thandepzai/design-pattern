/**
 * ============================================================================
 * VÍ DỤ MINH HỌA: ADAPTER PATTERN
 * Thư mục: 06-S-Adapter-pattern/index.ts
 *
 * Ngữ cảnh: Hệ thống thông báo (Notification System) của một trang web E-Commerce.
 * - Hệ thống định nghĩa một interface chuẩn là `NotificationService` để gửi thông báo.
 * - Ban đầu hệ thống dùng email. Sau đó muốn tích hợp thêm SMS của Twilio và Slack
 *   nhưng SDK của Twilio và Slack lại có interface khác hoàn toàn và không thể chỉnh sửa.
 * - Giải pháp: Sử dụng Adapter Pattern để bọc (wrap) Twilio và Slack SDK lại.
 * ============================================================================
 */

// ============================================================================
// 1. TARGET INTERFACE (Giao diện tiêu chuẩn hệ thống mong muốn)
// ============================================================================
interface NotificationService {
  send(recipient: string, title: string, content: string): void;
}

// ============================================================================
// 2. CÁC LỚP ĐÃ CÓ (Đã tuân thủ sẵn interface chuẩn)
// ============================================================================
class EmailNotificationService implements NotificationService {
  public send(recipient: string, title: string, content: string): void {
    console.log(`✉️ [EMAIL] Gửi tới <${recipient}>`);
    console.log(`   Tiêu đề: ${title}`);
    console.log(`   Nội dung: ${content}`);
    console.log(`   --> Thành công!\n`);
  }
}

// ============================================================================
// 3. ADAPTEE (Các thư viện bên thứ 3 hoặc lớp cũ có interface khác biệt)
// ============================================================================

// SDK SMS từ bên thứ ba (ví dụ Twilio)
// Không có phương thức send(recipient, title, content)
class ThirdPartySmsSdk {
  public triggerSmsSend(phone: string, textMessage: string): boolean {
    console.log(`📱 [SMS SDK] Kết nối API nhà mạng...`);
    console.log(`   SĐT nhận: ${phone}`);
    console.log(`   Nội dung SMS: ${textMessage}`);
    console.log(`   --> [API Status: 200 OK]`);
    return true;
  }
}

// API Slack Webhook từ bên thứ ba
// Sử dụng channel name và payload object đặc thù
class ThirdPartySlackApi {
  public postJsonToWebhook(
    channel: string,
    payload: { text: string; bot_name: string; icon_emoji: string }
  ): void {
    console.log(`💬 [SLACK WEBHOOK] Post Payload lên channel #${channel}...`);
    console.log(`   Bot Name: ${payload.bot_name}`);
    console.log(`   Emoji: ${payload.icon_emoji}`);
    console.log(`   Message: ${payload.text}`);
    console.log(`   --> [Slack Webhook: Delivered]`);
  }
}

// ============================================================================
// 4. ADAPTER (Các bộ chuyển đổi giúp kết nối Adaptee vào Target Interface)
// ============================================================================

// Bộ chuyển đổi cho SMS Sdk
class SmsAdapter implements NotificationService {
  private smsSdk: ThirdPartySmsSdk;

  constructor(smsSdk: ThirdPartySmsSdk) {
    this.smsSdk = smsSdk;
  }

  // Chuyển đổi từ send(recipient, title, content) thành triggerSmsSend(phone, textMessage)
  public send(recipient: string, title: string, content: string): void {
    // Vì SMS không có khái niệm Tiêu đề (Title), ta sẽ gộp Tiêu đề và Nội dung lại
    const formattedSmsText = `[${title}] ${content}`;
    
    // Gọi phương thức đặc thù của SMS SDK
    this.smsSdk.triggerSmsSend(recipient, formattedSmsText);
    console.log(`   --> [SmsAdapter] Đã chuyển đổi và gửi thành công qua SMS Sdk.\n`);
  }
}

// Bộ chuyển đổi cho Slack Api
class SlackAdapter implements NotificationService {
  private slackApi: ThirdPartySlackApi;
  private botName: string;

  constructor(slackApi: ThirdPartySlackApi, botName: string = "SystemBot") {
    this.slackApi = slackApi;
    this.botName = botName;
  }

  // Chuyển đổi từ send(recipient, title, content) sang postJsonToWebhook(...)
  public send(recipient: string, title: string, content: string): void {
    // recipient trong ngữ cảnh Slack sẽ là tên channel (ví dụ: 'sale-alerts')
    const channelName = recipient.replace("#", ""); // Đảm bảo không chứa dấu # thừa
    
    // Tạo payload theo định dạng Slack yêu cầu
    const payload = {
      bot_name: this.botName,
      icon_emoji: ":rocket:",
      text: `*${title}*\n${content}`
    };

    // Gọi phương thức đặc thù của Slack API
    this.slackApi.postJsonToWebhook(channelName, payload);
    console.log(`   --> [SlackAdapter] Đã chuyển đổi và gửi thành công qua Slack Webhook.\n`);
  }
}

// ============================================================================
// 5. CLIENT CODE (Mã nguồn ứng dụng sử dụng giao diện chuẩn)
// ============================================================================
class OrderProcessor {
  private notificationService: NotificationService;

  constructor(notificationService: NotificationService) {
    this.notificationService = notificationService;
  }

  public completeOrder(orderId: string, customerContact: string, totalAmount: number): void {
    console.log(`🛒 [Hệ thống] Đang xử lý đơn hàng #${orderId}...`);
    // Xử lý logic thanh toán, kho bãi ở đây...
    console.log(`🛒 [Hệ thống] Đơn hàng #${orderId} hoàn tất. Đang gửi thông báo...`);

    const title = "Xác nhận đơn hàng thành công!";
    const content = `Đơn hàng #${orderId} trị giá ${totalAmount.toLocaleString()} VND đã được thanh toán và đang chuẩn bị giao.`;

    // Gửi thông báo thông qua interface chuẩn mà không cần quan tâm dịch vụ thực tế là gì
    this.notificationService.send(customerContact, title, content);
  }
}

// ============================================================================
// THỬ NGHIỆM CHẠY CHƯƠNG TRÌNH
// ============================================================================
function runExample() {
  console.log("=== CHẠY VÍ DỤ MINH HỌA ADAPTER PATTERN ===\n");

  // 1. Thử nghiệm với Email (chạy trực tiếp không cần Adapter)
  console.log("--- Tình huống 1: Gửi thông báo qua Email ---");
  const emailService = new EmailNotificationService();
  const orderProcessor1 = new OrderProcessor(emailService);
  orderProcessor1.completeOrder("ORD-001", "khachhang@gmail.com", 250000);

  // 2. Thử nghiệm với SMS (sử dụng SmsAdapter)
  console.log("--- Tình huống 2: Gửi thông báo qua SMS (Cần Adapter) ---");
  const smsSdk = new ThirdPartySmsSdk();
  const smsAdapter = new SmsAdapter(smsSdk);
  
  // orderProcessor chạy hoàn toàn bình thường khi nhận vào smsAdapter 
  // vì smsAdapter thực thi đúng giao diện NotificationService
  const orderProcessor2 = new OrderProcessor(smsAdapter);
  orderProcessor2.completeOrder("ORD-002", "0987654321", 1200000);

  // 3. Thử nghiệm với Slack (sử dụng SlackAdapter)
  console.log("--- Tình huống 3: Gửi thông báo lên Slack Channel (Cần Adapter) ---");
  const slackApi = new ThirdPartySlackApi();
  const slackAdapter = new SlackAdapter(slackApi, "NotificationBot");

  const orderProcessor3 = new OrderProcessor(slackAdapter);
  orderProcessor3.completeOrder("ORD-003", "#order-logs", 5400000);
}

runExample();
