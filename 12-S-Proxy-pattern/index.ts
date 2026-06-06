/**
 * ============================================================================
 * VÍ DỤ MINH HỌA: PROXY PATTERN
 * Thư mục: 12-S-Proxy-pattern/index.ts
 *
 * Ngữ cảnh: Tải video từ YouTube (YouTube Video Downloader).
 * - Subject Interface: ThirdPartyYouTubeLib
 * - Real Subject: ThirdPartyYouTubeClass (kết nối mạng và tải video, xử lý rất chậm).
 * - Caching Proxy: CachedYouTubeProxy (lưu giữ thông tin video đã tải trong map).
 * ============================================================================
 */

// ============================================================================
// 1. SUBJECT INTERFACE (Interface chung cho cả Real và Proxy)
// ============================================================================
interface ThirdPartyYouTubeLib {
  getVideoInfo(id: string): string;
  downloadVideo(id: string): void;
}

// ============================================================================
// 2. REAL SUBJECT (Đối tượng gốc xử lý nặng)
// ============================================================================
class ThirdPartyYouTubeClass implements ThirdPartyYouTubeLib {
  public getVideoInfo(id: string): string {
    // Giả lập kết nối mạng chậm
    console.log(`🌐 [Real Service] Đang gửi API request lên YouTube lấy thông tin video: ${id}...`);
    return `Tiêu đề Video [${id}] - Tác giả: PewDiePie`;
  }

  public downloadVideo(id: string): void {
    console.log(`📥 [Real Service] Đang tải xuống các file media cho video: ${id}...`);
  }
}

// ============================================================================
// 3. PROXY CLASS (Ủy quyền & Caching)
// ============================================================================
class CachedYouTubeProxy implements ThirdPartyYouTubeLib {
  private service: ThirdPartyYouTubeClass;
  private infoCache: Map<string, string> = new Map();
  private downloadedCache: Set<string> = new Set();

  constructor(service: ThirdPartyYouTubeClass) {
    this.service = service;
  }

  public getVideoInfo(id: string): string {
    if (!this.infoCache.has(id)) {
      console.log(`💾 [Proxy] Không tìm thấy metadata cho video "${id}". Gọi dịch vụ thật...`);
      const info = this.service.getVideoInfo(id);
      this.infoCache.set(id, info);
      return info;
    }

    console.log(`⚡ [Proxy] Đã tìm thấy metadata cho video "${id}" trong bộ nhớ đệm.`);
    return this.infoCache.get(id)!;
  }

  public downloadVideo(id: string): void {
    if (!this.downloadedCache.has(id)) {
      console.log(`💾 [Proxy] Chưa tải video "${id}" trước đây. Chuyển tiếp yêu cầu tải...`);
      this.service.downloadVideo(id);
      this.downloadedCache.add(id);
    } else {
      console.log(`⚡ [Proxy] Video "${id}" đã có sẵn trong bộ nhớ đệm của máy cục bộ. Bỏ qua tải lại.`);
    }
  }
}

// ============================================================================
// THỬ NGHIỆM CHẠY VÍ DỤ
// ============================================================================
function runExample() {
  console.log("=== CHẠY VÍ DỤ MINH HỌA PROXY PATTERN ===\n");

  const youtubeService = new ThirdPartyYouTubeClass();
  const youtubeProxy = new CachedYouTubeProxy(youtubeService);

  // Yêu cầu thông tin video lần 1 (Cache miss)
  console.log("--- Yêu cầu 1 ---");
  const info1 = youtubeProxy.getVideoInfo("djs831hs");
  console.log(`Kết quả: ${info1}\n`);

  // Yêu cầu thông tin video lần 2 (Cache hit)
  console.log("--- Yêu cầu 2 ---");
  const info2 = youtubeProxy.getVideoInfo("djs831hs");
  console.log(`Kết quả: ${info2}\n`);

  // Tải video lần 1 (Mới tải)
  console.log("--- Tải video lần 1 ---");
  youtubeProxy.downloadVideo("djs831hs");
  console.log("");

  // Tải video lần 2 (Đã có sẵn)
  console.log("--- Tải video lần 2 ---");
  youtubeProxy.downloadVideo("djs831hs");
  console.log("");
}

runExample();
