# Bài tập thực hành: Adapter Pattern

Chào mừng bạn đến với phần bài tập thực hành về **Adapter Pattern**. Dưới đây là mô tả chi tiết của 3 bài tập được thiết kế sẵn trong file `exercises.ts`.

Nhiệm vụ của bạn là đọc kỹ yêu cầu, mở file **[exercises.ts](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/06-S-Adapter-pattern/exercises.ts)** và hoàn thành các phần có đánh dấu `// TODO`.

---

## 🛠️ Bài tập 1: Bộ chuyển đổi Cổng thanh toán (Payment Gateway Adapter)

### Bối cảnh:
Hệ thống Thương mại Điện tử hiện tại của bạn định nghĩa một interface tiêu chuẩn cho việc thanh toán bằng tiền Việt Nam Đồng (VND):
```typescript
interface PaymentProcessor {
  pay(amountInVND: number): void;
}
```

Bạn muốn tích hợp thêm cổng thanh toán quốc tế **GlobalPay**. Tuy nhiên, SDK của cổng thanh toán này hoạt động bằng đồng **Đô la Mỹ (USD)** với interface hoàn toàn khác:
```typescript
class GlobalPayService {
  public makeCharge(amountInUSD: number): boolean {
    // Xử lý thanh toán quốc tế...
    return true;
  }
}
```

### Yêu cầu:
1. Viết lớp `GlobalPayAdapter` thực thi (implement) interface `PaymentProcessor`.
2. Lớp này phải nhận vào đối tượng `GlobalPayService` và tỷ giá chuyển đổi (exchange rate từ USD sang VND).
3. Trong phương thức `pay(amountInVND: number)`, Adapter cần tự động quy đổi số tiền từ VND sang USD (ví dụ: `USD = VND / tỷ giá`), làm tròn số tiền USD đến 2 chữ số thập phân, rồi gọi phương thức `makeCharge(amountInUSD)` của `GlobalPayService`.
4. Nếu thanh toán thất bại (phương thức `makeCharge` trả về `false`), ném ra một ngoại lệ `Error("Thanh toán qua GlobalPay thất bại")`.

---

## 👥 Bài tập 2: Đồng bộ Dữ liệu Khách hàng (Customer Data Adapter)

### Bối cảnh:
Hệ thống CRM mới của doanh nghiệp yêu cầu một cấu trúc dữ liệu khách hàng tiêu chuẩn thông qua interface sau:
```typescript
interface TargetCustomer {
  getFullName(): string;
  getEmail(): string;
  getAge(): number;
}
```

Tuy nhiên, cơ sở dữ liệu cũ của bạn lưu trữ thông tin người dùng dưới dạng một lớp phẳng `LegacyUser` với các trường thuộc tính viết bằng tiếng Anh có dấu gạch dưới:
```typescript
class LegacyUser {
  constructor(
    public first_name: string,
    public last_name: string,
    public contact_email: string,
    public birth_year: number
  ) {}
}
```

### Yêu cầu:
1. Triển khai lớp `CustomerDataAdapter` thực thi interface `TargetCustomer`.
2. Lớp Adapter này nhận vào một đối tượng `LegacyUser`.
3. Cài đặt các phương thức:
   - `getFullName()`: Ghép `first_name` và `last_name` cách nhau bởi dấu cách.
   - `getEmail()`: Trả về `contact_email`.
   - `getAge()`: Tính toán tuổi của người dùng bằng cách lấy năm hiện tại trừ đi `birth_year`. (Trong bài test, ta mặc định lấy năm hiện tại là **2026**).

---

## 🎨 Bài tập 3: Bộ chuyển đổi Đồ họa từ Vector sang Raster (Vector to Raster Adapter)

### Bối cảnh:
Bạn đang phát triển một thư viện vẽ đồ họa. 
- Thư viện vẽ của Client định nghĩa giao diện vẽ hình dựa trên tọa độ đường thẳng Vector:
```typescript
interface VectorGraphics {
  drawVectorLine(x1: number, y1: number, x2: number, y2: number): void;
}
```
- Bạn tìm thấy một thư viện vẽ raster cũ rất tối ưu hiệu năng nhưng nó chỉ có khả năng vẽ các điểm ảnh rời rạc (pixels):
```typescript
class RasterGraphicsService {
  public drawRasterPoint(x: number, y: number): void {
    console.log(`📍 Vẽ điểm tại: (${x}, ${y})`);
  }
}
```

### Yêu cầu:
1. Triển khai lớp `VectorToRasterAdapter` thực thi interface `VectorGraphics` và bọc (wrap) `RasterGraphicsService`.
2. Triển khai phương thức `drawVectorLine(x1, y1, x2, y2)`. Để chuyển đổi đường thẳng từ $(x1, y1)$ đến $(x2, y2)$ thành các điểm ảnh raster, bạn cần vẽ:
   - Điểm đầu: $(x1, y1)$.
   - Điểm cuối: $(x2, y2)$.
   - Các điểm trung gian nằm trên đường thẳng. Để đơn giản, hãy vẽ **điểm chính giữa (trung điểm)** của đoạn thẳng: $x_{mid} = \frac{x1 + x2}{2}$ và $y_{mid} = \frac{y1 + y2}{2}$ (làm tròn xuống số nguyên bằng `Math.floor`).
   - Tổng cộng phương thức sẽ gọi `drawRasterPoint` **3 lần** cho 3 điểm: điểm đầu, trung điểm, và điểm cuối. (Nếu điểm đầu, trung điểm, điểm cuối trùng nhau thì vẫn gọi vẽ bình thường).

---

## 🏁 Cách kiểm tra kết quả

Sau khi hoàn thành viết mã nguồn trong `exercises.ts`, hãy chạy lệnh sau từ thư mục gốc của dự án để chạy kiểm thử tự động:

```bash
npx tsx 06-S-Adapter-pattern/exercises.ts
```

Nếu tất cả các test hiển thị dấu tick xanh `✓`, xin chúc mừng bạn đã làm chủ được **Adapter Pattern**!
