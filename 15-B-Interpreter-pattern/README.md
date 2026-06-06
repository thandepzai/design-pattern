# 15. Interpreter Pattern (Behavioral Pattern)

## Khái niệm
**Interpreter Pattern** (Mẫu Thiết kế Thông dịch) là một mẫu thiết kế hành vi định nghĩa một biểu diễn ngữ pháp cho một ngôn ngữ, cùng với một bộ thông dịch (interpreter) sử dụng biểu diễn này để thông dịch/đánh giá các câu trong ngôn ngữ đó.

Mẫu thiết kế này chủ yếu được sử dụng trong các trình phân tích cú pháp (compilers), bộ lọc điều kiện SQL, định dạng chuỗi quy tắc logic, hoặc biểu thức toán học.

---

## Ý tưởng cốt lõi
Interpreter khuyên chúng ta mô hình hóa một ngôn ngữ đơn giản dưới dạng một cây cú pháp trừu tượng (**Abstract Syntax Tree - AST**). 
Mỗi nút trong cây là một biểu thức logic, được chia làm hai loại:

1. **Terminal Expression (Biểu thức đầu cuối):**
   - Là các phần tử cơ bản nhất của ngôn ngữ, không chứa biểu thức con nào khác.
   - *Ví dụ:* Các con số (như `5`, `10`), các ký tự, biến biến số cụ thể.

2. **Non-terminal Expression (Biểu thức không đầu cuối):**
   - Là các cấu trúc ngữ pháp phức tạp hơn, chứa và kết hợp một hoặc nhiều biểu thức con (có thể là Terminal hoặc Non-terminal khác).
   - *Ví dụ:* Các phép toán cộng (`+`), trừ (`-`), logic `AND`, `OR`. Phương thức thông dịch của nó sẽ đệ quy gọi phương thức thông dịch của các biểu thức con rồi gộp kết quả lại.

---

## Cấu trúc của Interpreter Pattern

- **Context (Ngữ cảnh):** Chứa thông tin toàn cục, dữ liệu đầu vào hoặc trạng thái cần thiết cho trình thông dịch (ví dụ: bảng tra cứu giá trị của các biến số).
- **AbstractExpression (Biểu thức trừu tượng):** Khai báo phương thức `interpret(context)`. Tất cả các nút trong cây cú pháp đều triển khai phương thức này.
- **TerminalExpression:** Triển khai phương thức `interpret()` cho các ký tự đầu cuối trong ngữ pháp.
- **NonTerminalExpression:** Triển khai phương thức `interpret()` cho các toán tử ngữ pháp.
- **Client:** Xây dựng cây cú pháp trừu tượng AST và kích hoạt việc thông dịch từ nút gốc.

---

## Ví dụ Minh Họa (TypeScript)

Xem mã nguồn chi tiết tại [index.ts](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/15-B-Interpreter-pattern/index.ts).

```typescript
// 1. Abstract Expression
interface Expression {
  interpret(context: Map<string, number>): number;
}

// 2. Terminal Expression: Đại diện cho một biến số (Variable)
class VariableExpression implements Expression {
  constructor(private name: string) {}

  public interpret(context: Map<string, number>): number {
    return context.get(this.name) || 0;
  }
}

// 3. Non-terminal Expression: Phép cộng (Add)
class AddExpression implements Expression {
  constructor(
    private left: Expression,
    private right: Expression
  ) {}

  public interpret(context: Map<string, number>): number {
    return this.left.interpret(context) + this.right.interpret(context);
  }
}
```

---

## Khi nào nên sử dụng?
- Khi bạn cần viết một chương trình đơn giản để phân tích các biểu thức toán học hoặc logic.
- Khi một quy tắc hoặc cấu hình nghiệp vụ thay đổi thường xuyên và bạn muốn định nghĩa một ngôn ngữ cấu hình riêng (Domain-Specific Language - DSL) đơn giản để người dùng hoặc quản trị viên có thể tự khai báo.
- Ngữ pháp của ngôn ngữ phải **rất đơn giản**. Nếu ngữ pháp quá phức tạp (như Java, Python), Interpreter Pattern sẽ trở nên cực kỳ cồng kềnh, khi đó bạn nên sử dụng các thư viện phân tích cú pháp chuyên dụng như ANTLR.

---

## Ưu điểm và Nhược điểm

### Ưu điểm
- **Dễ dàng mở rộng ngữ pháp**: Bạn chỉ cần tạo một class biểu thức mới triển khai interface `Expression` mà không ảnh hưởng đến các biểu thức cũ.
- **Dễ dàng triển khai**: Cấu trúc cây giúp việc viết các logic đệ quy trở nên trực quan.

### Nhược điểm
- **Hiệu năng kém trên cây lớn**: Việc duyệt đệ quy sâu trên cây AST lớn tiêu tốn nhiều bộ nhớ stack và CPU.
- **Phức tạp khi ngữ pháp phình to**: Nếu có hàng trăm quy tắc ngữ pháp khác nhau, việc quản lý hàng trăm class biểu thức sẽ trở thành cơn ác mộng bảo trì.
