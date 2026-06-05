# Bài tập thực hành: Composite Pattern

Chào mừng bạn đến với phần bài tập thực hành về **Composite Pattern**. Dưới đây là mô tả chi tiết của các bài tập được thiết kế sẵn trong file `exercises.ts`.

Nhiệm vụ của bạn là đọc kỹ yêu cầu, mở file **[exercises.ts](file:///Users/thantran/Desktop/learn/design-pattern/08-S-Composite-pattern/exercises.ts)** và hoàn thành các phần có đánh dấu `// TODO`.

---

## 🍴 Bài tập 1: Cây danh mục Menu nhà hàng (Restaurant Menu Tree)

### Bối cảnh:
Một nhà hàng muốn hiển thị thực đơn của họ. Thực đơn có thể bao gồm:
- Các món ăn cụ thể (`MenuItem`) có tên và giá tiền.
- Các danh mục con (`MenuSection`) như "Đồ uống", "Tráng miệng", "Món chính". Mỗi danh mục con này lại chứa các món ăn cụ thể hoặc các danh mục con nhỏ hơn (ví dụ: trong "Đồ uống" lại có "Cà phê" và "Trà").

Hệ thống cần cung cấp một giao diện chung `MenuComponent` để client có thể gọi phương thức hiển thị `print()` và tính tiền mà không cần quan tâm phần tử đó là một món ăn hay một nhóm danh mục.

### Yêu cầu:
1. Triển khai lớp `MenuItem` (Leaf):
   - Phương thức `print(indent)` hiển thị định dạng: `{indent}- {name}: ${price}`.
   - Phương thức `getPrice()` trả về giá của món ăn đó.
2. Triển khai lớp `MenuSection` (Composite):
   - Có mảng chứa các `MenuComponent`.
   - Triển khai phương thức `add(component)` và `remove(component)` để quản lý thành phần con.
   - Phương thức `print(indent)` hiển thị tên danh mục: `{indent}[ {name} ]` và đệ quy gọi `print()` cho tất cả các thành phần con với khoảng thụt đầu dòng tăng thêm 2 khoảng trắng.
   - Phương thức `getPrice()` đệ quy tính tổng tiền của tất cả các phần tử con bên trong.

---

## 🎁 Bài tập 2: Tính tổng giá trị Hộp quà tổ hợp (Gift Box System)

### Bối cảnh:
Một trang web thương mại điện tử cho phép khách hàng tạo các hộp quà cá nhân hóa. Hộp quà (`GiftBox`) có thể chứa:
- Các sản phẩm đơn lẻ (`Product`) có giá cụ thể.
- Các hộp quà nhỏ hơn (`GiftBox`), bên trong có sản phẩm hoặc hộp quà khác.
- Mỗi hộp quà khi đóng gói sẽ tốn thêm một khoản phí đóng gói cố định (`packagingFee`).

Bạn cần tính tổng giá trị của toàn bộ hộp quà (bao gồm giá của tất cả sản phẩm bên trong và toàn bộ chi phí đóng gói của các hộp quà ở tất cả các cấp).

### Yêu cầu:
1. Triển khai lớp `Product` (Leaf):
   - Phương thức `getPrice()` trả về giá của sản phẩm đó.
2. Triển khai lớp `GiftBox` (Composite):
   - Có danh mục chứa các `GiftItem`.
   - Có thuộc tính phí đóng gói `packagingFee`.
   - Triển khai phương thức `add(item)` và `remove(item)`.
   - Triển khai phương thức `getPrice()` để trả về tổng giá trị của hộp quà: bao gồm tổng giá của các vật phẩm bên trong cộng với phí đóng gói `packagingFee` của chính hộp đó.

---

## 🏁 Cách kiểm tra kết quả

Sau khi hoàn thành viết mã nguồn trong `exercises.ts`, hãy chạy lệnh sau từ thư mục gốc của dự án để chạy kiểm thử tự động:

```bash
npx tsx 08-S-Composite-pattern/exercises.ts
```

Nếu tất cả các test hiển thị dấu tick xanh `✓`, xin chúc mừng bạn đã làm chủ được **Composite Pattern**!
