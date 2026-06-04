/**
 * 01-C-Singleton-pattern/index.ts
 * Mô phỏng kết nối cơ sở dữ liệu (Database Connection) sử dụng Singleton Pattern.
 */

class DatabaseConnection {
  // 1. Tạo biến tĩnh private để lưu trữ instance duy nhất
  private static instance: DatabaseConnection | null = null;
  private connectionId: number;

  // 2. Đặt constructor là private để chặn việc khởi tạo bằng từ khóa "new" từ ngoài class
  private constructor() {
    this.connectionId = Math.floor(Math.random() * 1000) + 1; // ID ngẫu nhiên từ 1-1000
    console.log(`\n[DB CONNECTED] Thiết lập kết nối thành công! ID kết nối: ${this.connectionId}`);
  }

  // 3. Phương thức tĩnh công khai để lấy instance duy nhất
  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  // Phương thức nghiệp vụ mô phỏng truy vấn database
  public query(sql: string): void {
    console.log(`[QUERY - Conn ID: ${this.connectionId}] Thực thi: "${sql}"`);
  }
}

// ==========================================
// CHẠY THỬ NGHIỆM SINGLETON PATTERN
// ==========================================

console.log("--- Bắt đầu ứng dụng ---");

// ❌ Thử dùng từ khóa new (Bỏ comment dòng dưới sẽ thấy TypeScript báo lỗi ngay lập tức)
// const myDb = new DatabaseConnection(); 

// ✅ Lần đầu tiên gọi getInstance() -> Singleton sẽ tự động khởi tạo kết nối mới
console.log("Yêu cầu kết nối DB lần 1:");
const db1 = DatabaseConnection.getInstance();
db1.query("SELECT * FROM users WHERE id = 1");

// ✅ Lần thứ hai gọi getInstance() -> Singleton chỉ trả về kết nối đã tạo từ trước (không tạo mới)
console.log("\nYêu cầu kết nối DB lần 2:");
const db2 = DatabaseConnection.getInstance();
db2.query("SELECT * FROM products LIMIT 10");

// ✅ Lần thứ ba gọi getInstance() -> Vẫn trả về kết nối cũ đó
console.log("\nYêu cầu kết nối DB lần 3:");
const db3 = DatabaseConnection.getInstance();
db3.query("UPDATE posts SET title = 'OOP' WHERE id = 5");

console.log("\n--- Kiểm tra đồng nhất thực thể (Identity Check) ---");
// Hai biến db1 và db2 có trỏ chung vào cùng một vùng nhớ/thực thể không?
const isSameInstance = (db1 === db2 && db2 === db3);
console.log(`db1 === db2 === db3 ? Kết quả: ${isSameInstance}`);

if (isSameInstance) {
  console.log("👉 THÀNH CÔNG: Singleton hoạt động đúng! Chỉ có duy nhất 1 kết nối được tạo ra cho toàn bộ ứng dụng.");
} else {
  console.log("👉 THẤT BẠI: Singleton hoạt động sai, xuất hiện nhiều kết nối khác nhau.");
}
