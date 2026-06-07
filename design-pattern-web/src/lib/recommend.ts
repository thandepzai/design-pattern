// Catalog tĩnh 23 GoF pattern + thuật toán gợi ý.
// Cố ý KHÔNG đọc filesystem để chạy ổn định trên Vercel (serverless).
// Dùng cho cả prompt gửi Claude và fallback luật từ khoá khi không có API key.

export type PatternType = 'C' | 'S' | 'B';

export interface PatternMeta {
  id: string; // khớp tên thư mục, dùng để link /pattern/{id}
  number: string;
  name: string; // tên tiếng Anh chuẩn
  label: string; // nhãn tiếng Việt ngắn
  type: PatternType;
  intent: string; // ý đồ / khi nào dùng
  keywords: string[]; // từ khoá cho fallback (cả Việt lẫn Anh)
}

export interface Recommendation {
  id: string;
  number: string;
  name: string;
  label: string;
  type: PatternType;
  reason: string;
}

export const PATTERN_CATALOG: PatternMeta[] = [
  { id: '01-C-Singleton-pattern', number: '01', name: 'Singleton', label: 'Đơn nhất', type: 'C',
    intent: 'Đảm bảo một class chỉ có đúng một thể hiện duy nhất và cung cấp điểm truy cập chung toàn ứng dụng.',
    keywords: ['duy nhất', 'một thể hiện', 'một instance', 'dùng chung', 'toàn cục', 'global', 'kết nối db', 'database connection', 'config', 'cấu hình', 'logger', 'single instance', 'shared'] },
  { id: '02-C-FactoryMethod-pattern', number: '02', name: 'Factory Method', label: 'Phương thức nhà máy', type: 'C',
    intent: 'Định nghĩa interface để tạo đối tượng nhưng để lớp con quyết định lớp cụ thể nào được khởi tạo.',
    keywords: ['tạo đối tượng', 'khởi tạo', 'factory', 'lớp con quyết định', 'create object', 'new instance theo loại'] },
  { id: '03-C-AbstractFactory-pattern', number: '03', name: 'Abstract Factory', label: 'Nhà máy trừu tượng', type: 'C',
    intent: 'Tạo ra các họ đối tượng liên quan nhau mà không cần chỉ định lớp cụ thể.',
    keywords: ['họ sản phẩm', 'nhóm đối tượng', 'family', 'theme', 'giao diện đa nền tảng', 'cross-platform', 'bộ sản phẩm'] },
  { id: '04-C-Builder-pattern', number: '04', name: 'Builder', label: 'Người xây dựng', type: 'C',
    intent: 'Xây dựng đối tượng phức tạp từng bước, tách quá trình tạo khỏi biểu diễn cuối cùng.',
    keywords: ['nhiều tham số', 'từng bước', 'cấu hình phức tạp', 'fluent', 'step by step', 'tham số tuỳ chọn', 'optional', 'xây dựng object lớn'] },
  { id: '05-C-Prototype-pattern', number: '05', name: 'Prototype', label: 'Nguyên mẫu', type: 'C',
    intent: 'Tạo đối tượng mới bằng cách sao chép (clone) một đối tượng có sẵn.',
    keywords: ['sao chép', 'nhân bản', 'clone', 'copy', 'sao chép đối tượng', 'tạo bản sao'] },
  { id: '06-S-Adapter-pattern', number: '06', name: 'Adapter', label: 'Bộ chuyển đổi', type: 'S',
    intent: 'Chuyển đổi interface của một class thành interface khác mà client mong đợi, giúp các lớp không tương thích làm việc cùng nhau.',
    keywords: ['tương thích', 'chuyển đổi interface', 'tích hợp', 'thư viện cũ', 'legacy', 'third-party', 'bên thứ ba', 'wrapper', 'convert', 'ghép nối'] },
  { id: '07-S-Bridge-pattern', number: '07', name: 'Bridge', label: 'Cây cầu', type: 'S',
    intent: 'Tách phần trừu tượng khỏi phần cài đặt để cả hai có thể thay đổi độc lập.',
    keywords: ['tách rời', 'nhiều chiều', 'abstraction', 'implementation', 'độc lập', 'kết hợp nhiều biến thể'] },
  { id: '08-S-Composite-pattern', number: '08', name: 'Composite', label: 'Tổng hợp', type: 'S',
    intent: 'Tổ chức đối tượng thành cấu trúc cây và xử lý nhóm lẫn đơn lẻ một cách đồng nhất.',
    keywords: ['cây', 'phân cấp', 'tree', 'đệ quy', 'thư mục', 'file folder', 'part-whole', 'cấu trúc lồng nhau', 'menu lồng nhau'] },
  { id: '09-S-Decorator-pattern', number: '09', name: 'Decorator', label: 'Trang trí', type: 'S',
    intent: 'Thêm hành vi/tính năng mới cho đối tượng một cách linh hoạt mà không sửa class gốc.',
    keywords: ['thêm tính năng', 'mở rộng', 'không sửa class gốc', 'bọc', 'wrap', 'dynamically add', 'thêm chức năng động', 'topping', 'middleware bọc'] },
  { id: '10-S-Facade-pattern', number: '10', name: 'Facade', label: 'Mặt tiền', type: 'S',
    intent: 'Cung cấp một interface đơn giản che giấu sự phức tạp của một hệ thống con lớn.',
    keywords: ['đơn giản hoá', 'che giấu phức tạp', 'simple interface', 'hệ thống con', 'subsystem', 'gói gọn nhiều bước', 'một hàm gọi tất cả'] },
  { id: '11-S-Flyweight-pattern', number: '11', name: 'Flyweight', label: 'Hạng nhẹ', type: 'S',
    intent: 'Tiết kiệm bộ nhớ bằng cách chia sẻ phần dữ liệu chung giữa rất nhiều đối tượng giống nhau.',
    keywords: ['tiết kiệm bộ nhớ', 'nhiều đối tượng giống nhau', 'chia sẻ', 'share', 'memory', 'hàng triệu object', 'render nhiều phần tử'] },
  { id: '12-S-Proxy-pattern', number: '12', name: 'Proxy', label: 'Đại diện', type: 'S',
    intent: 'Cung cấp đối tượng đại diện để kiểm soát truy cập tới đối tượng thật (lazy load, cache, phân quyền).',
    keywords: ['kiểm soát truy cập', 'lazy load', 'cache', 'phân quyền', 'access control', 'tải trễ', 'bảo vệ', 'trung gian truy cập'] },
  { id: '13-B-ChainOfResponsibility-pattern', number: '13', name: 'Chain of Responsibility', label: 'Chuỗi trách nhiệm', type: 'B',
    intent: 'Chuyển request qua một chuỗi các handler, mỗi handler tự xử lý hoặc chuyển tiếp.',
    keywords: ['chuỗi xử lý', 'middleware', 'pipeline', 'lần lượt', 'nhiều bước duyệt', 'handler', 'xử lý theo cấp', 'duyệt qua nhiều bộ lọc'] },
  { id: '14-B-Command-pattern', number: '14', name: 'Command', label: 'Mệnh lệnh', type: 'B',
    intent: 'Đóng gói một yêu cầu thành đối tượng để hỗ trợ undo/redo, hàng đợi và ghi log lệnh.',
    keywords: ['undo', 'redo', 'hoàn tác', 'làm lại', 'hàng đợi lệnh', 'lịch sử', 'queue', 'thao tác', 'nút bấm thực thi lệnh'] },
  { id: '15-B-Interpreter-pattern', number: '15', name: 'Interpreter', label: 'Trình thông dịch', type: 'B',
    intent: 'Định nghĩa ngữ pháp cho một ngôn ngữ và cách diễn giải các câu trong ngôn ngữ đó.',
    keywords: ['ngữ pháp', 'biểu thức', 'parse', 'ngôn ngữ', 'grammar', 'expression', 'dsl', 'máy tính biểu thức', 'thông dịch'] },
  { id: '16-B-Iterator-pattern', number: '16', name: 'Iterator', label: 'Bộ lặp', type: 'B',
    intent: 'Truy cập tuần tự các phần tử của một collection mà không lộ cấu trúc bên trong.',
    keywords: ['duyệt', 'lặp', 'collection', 'iterate', 'traverse', 'duyệt danh sách', 'next', 'phần tử kế tiếp'] },
  { id: '17-B-Mediator-pattern', number: '17', name: 'Mediator', label: 'Trung gian', type: 'B',
    intent: 'Tập trung giao tiếp giữa nhiều đối tượng vào một trung gian để giảm phụ thuộc chằng chịt.',
    keywords: ['trung gian', 'điều phối', 'giảm phụ thuộc', 'chat', 'nhiều component giao tiếp', 'phòng chat', 'điều phối form'] },
  { id: '18-B-Memento-pattern', number: '18', name: 'Memento', label: 'Lưu trạng thái', type: 'B',
    intent: 'Lưu và khôi phục trạng thái của đối tượng mà không phá vỡ tính đóng gói.',
    keywords: ['lưu trạng thái', 'khôi phục', 'snapshot', 'save state', 'restore', 'checkpoint', 'lưu lại để quay về', 'undo trạng thái'] },
  { id: '19-B-Observer-pattern', number: '19', name: 'Observer', label: 'Người quan sát', type: 'B',
    intent: 'Thông báo tự động tới nhiều đối tượng theo dõi khi trạng thái của đối tượng nguồn thay đổi.',
    keywords: ['thông báo', 'lắng nghe', 'sự kiện', 'subscribe', 'publish', 'event', 'notify', 'realtime', 'đăng ký nhận tin', 'cập nhật tự động'] },
  { id: '20-B-State-pattern', number: '20', name: 'State', label: 'Trạng thái', type: 'B',
    intent: 'Cho phép đối tượng thay đổi hành vi khi trạng thái nội bộ thay đổi, như chuyển giữa các state.',
    keywords: ['trạng thái', 'state machine', 'chuyển trạng thái', 'status', 'máy trạng thái', 'đèn giao thông', 'vòng đời đơn hàng'] },
  { id: '21-B-Strategy-pattern', number: '21', name: 'Strategy', label: 'Chiến lược', type: 'B',
    intent: 'Định nghĩa một họ thuật toán và cho phép hoán đổi chúng linh hoạt lúc chạy.',
    keywords: ['thuật toán', 'chiến lược', 'hoán đổi', 'phương thức thanh toán', 'payment', 'sắp xếp', 'sorting', 'algorithm', 'nhiều cách xử lý', 'chọn cách tính'] },
  { id: '22-B-TemplateMethod-pattern', number: '22', name: 'Template Method', label: 'Phương thức khuôn mẫu', type: 'B',
    intent: 'Định nghĩa bộ khung của một thuật toán và để lớp con override một số bước cụ thể.',
    keywords: ['khung', 'các bước cố định', 'override bước', 'template', 'skeleton', 'quy trình chung', 'các bước giống nhau khác chi tiết'] },
  { id: '23-B-Visitor-pattern', number: '23', name: 'Visitor', label: 'Khách thăm', type: 'B',
    intent: 'Thêm thao tác mới lên một cấu trúc đối tượng mà không cần sửa các lớp của cấu trúc đó.',
    keywords: ['thêm thao tác', 'duyệt cấu trúc', 'xuất nhiều định dạng', 'export', 'visitor', 'tính toán trên cây', 'thao tác mới không sửa class'] },
];

export function catalogForPrompt(): string {
  return PATTERN_CATALOG.map((p) => `- ${p.name} (id: ${p.id}): ${p.intent}`).join('\n');
}

// Fallback không cần AI: chấm điểm theo từ khoá xuất hiện trong mô tả.
export function keywordRecommend(description: string): Recommendation[] {
  const q = description.toLowerCase();

  const scored = PATTERN_CATALOG.map((p) => {
    let score = 0;
    for (const kw of p.keywords) {
      if (q.includes(kw.toLowerCase())) score += 1;
    }
    if (q.includes(p.name.toLowerCase())) score += 3;
    if (q.includes(p.label.toLowerCase())) score += 2;
    return { p, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return scored.map(({ p }) => ({
    id: p.id,
    number: p.number,
    name: p.name,
    label: p.label,
    type: p.type,
    reason: p.intent,
  }));
}

export function toRecommendation(id: string, reason: string): Recommendation | null {
  const p = PATTERN_CATALOG.find((x) => x.id === id);
  if (!p) return null;
  return { id: p.id, number: p.number, name: p.name, label: p.label, type: p.type, reason: reason || p.intent };
}
