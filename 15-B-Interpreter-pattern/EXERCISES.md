# BÀI TẬP THỰC HÀNH: INTERPRETER PATTERN

## BÀI TẬP 1: Bộ Lọc Dữ Liệu Logic (Boolean Filter Interpreter)

### Ngữ cảnh
Trong một hệ thống quản lý sản phẩm, bạn cần cho phép người dùng nhập vào các điều kiện tìm kiếm động (dynamic filter expressions) để lọc danh sách sản phẩm.
Ví dụ: Lọc ra các sản phẩm có `category = "Laptop"` VÀ `brand = "Apple"`.

Hãy áp dụng **Interpreter Pattern** để đánh giá điều kiện lọc:
- **Context** (`Product`): Đối tượng chứa dữ liệu sản phẩm cụ thể (ví dụ: `name`, `category`, `brand`, `price`).
- **Abstract Expression** (`BooleanExpression`): Định nghĩa phương thức `interpret(product: Product): boolean`.
- **Terminal Expression**:
  - `EqualsExpression`: Kiểm tra xem một thuộc tính cụ thể của sản phẩm có bằng giá trị chỉ định hay không.
    - *Ví dụ:* `new EqualsExpression("category", "Laptop")` sẽ kiểm tra `product.category === "Laptop"`.
- **Non-terminal Expressions**:
  - `AndExpression`: Nhận vào hai biểu thức con. Trả về `true` nếu cả hai đều đúng.
  - `OrExpression`: Nhận vào hai biểu thức con. Trả về `true` nếu ít nhất một biểu thức đúng.

---

## BÀI TẬP 2: Trình Phân Tích Số La Mã (Roman to Decimal Interpreter)

### Ngữ cảnh
Số La Mã sử dụng các ký tự Latinh ghép lại theo quy tắc để biểu thị các giá trị số thập phân.
- `I` = 1, `V` = 5, `X` = 10, `L` = 50, `C` = 100, `D` = 500, `M` = 1000.
- Quy tắc cộng dồn hoặc trừ đi nếu ký tự nhỏ đứng trước ký tự lớn (ví dụ: `IV` = 4, `IX` = 9).

Hãy xây dựng một trình thông dịch số La Mã sang số thập phân:
- **Context** (`RomanContext`): Chứa chuỗi ký tự La Mã cần chuyển đổi (`input: string`) và tổng số thập phân hiện tại (`output: number`). Lớp này cung cấp các phương thức duyệt chuỗi tiện lợi.
- **Abstract Expression** (`RomanExpression`): Lớp trừu tượng định nghĩa phương thức `interpret(context: RomanContext): void`.
- **Concrete Expressions**: Thiết kế các lớp biểu thức xử lý theo từng đơn vị:
  - `OneExpression` (xử lý chữ số hàng đơn vị: I, IV, V, IX).
  - `TenExpression` (xử lý chữ số hàng chục: X, XL, L, XC).
  - `HundredExpression` (xử lý chữ số hàng trăm: C, CD, D, CM).
  - `ThousandExpression` (xử lý chữ số hàng nghìn: M).
  
Mỗi biểu thức sẽ kiểm tra xem đầu chuỗi input có khớp với ký tự La Mã mà nó quản trị hay không, nếu có thì cộng giá trị tương ứng vào `context.output` và loại bỏ ký tự đó ra khỏi đầu `context.input`.

---

## Hướng dẫn hoàn thành bài tập
1. Mở file [exercises.ts](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/15-B-Interpreter-pattern/exercises.ts).
2. Thực hiện các phần có đánh dấu `// TODO`.
3. Chạy lệnh sau trong terminal để kiểm tra kết quả:
   ```bash
   npx tsx 15-B-Interpreter-pattern/exercises.ts
   ```
4. Đảm bảo tất cả các test case đều hiển thị `[OK]` và chương trình in ra thông báo thành công màu xanh lá.
