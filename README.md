# 23 Mẫu Thiết Kế (Design Patterns) - Gang of Four (GoF)

Chào mừng bạn đến với thư mục học tập về **Design Patterns (Mẫu Thiết Kế)**. Thư mục này chứa 23 mẫu thiết kế kinh duyệt được đánh số thứ tự từ **01 đến 23** giúp các thư mục tự sắp xếp theo đúng lộ trình học tập của bạn.

Các ký tự viết tắt giúp phân biệt loại mẫu thiết kế:
* **`C`**: **Creational Patterns** (Nhóm mẫu Khởi tạo) - Tập trung vào cách tạo ra đối tượng.
* **`S`**: **Structural Patterns** (Nhóm mẫu Cấu trúc) - Tập trung vào cách thiết lập cấu trúc và liên kết các đối tượng.
* **`B`**: **Behavioral Patterns** (Nhóm mẫu Hành vi) - Tập trung vào sự tương tác và phân phối nhiệm vụ giữa các đối tượng.

---

## 🗺️ Danh Sách 23 Design Patterns Theo Lộ Trình

### 🚀 1. Creational Patterns (Nhóm mẫu Khởi tạo - 5 mẫu từ 01 đến 05)
Giúp việc tạo đối tượng linh hoạt hơn, che giấu logic khởi tạo phức tạp.
1. **[01-C-Singleton-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/01-C-Singleton-pattern)**: Đảm bảo một class chỉ có duy nhất một instance và cung cấp điểm truy cập toàn cục.
2. **[02-C-FactoryMethod-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/02-C-FactoryMethod-pattern)**: Định nghĩa interface tạo đối tượng nhưng để các class con quyết định class nào được khởi tạo.
3. **[03-C-AbstractFactory-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/03-C-AbstractFactory-pattern)**: Cung cấp interface tạo ra các họ đối tượng liên quan mà không cần chỉ ra các class cụ thể.
4. **[04-C-Builder-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/04-C-Builder-pattern)**: Tách biệt quá trình xây dựng một đối tượng phức tạp để cùng một quy trình có thể tạo ra các đại diện khác nhau.
5. **[05-C-Prototype-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/05-C-Prototype-pattern)**: Tạo ra đối tượng mới bằng cách nhân bản (clone) một đối tượng mẫu có sẵn.

---

### 🏛️ 2. Structural Patterns (Nhóm mẫu Cấu trúc - 7 mẫu từ 06 đến 12)
Giúp lắp ghép các đối tượng/lớp thành cấu trúc lớn hơn nhưng vẫn đảm bảo tính linh hoạt và hiệu năng.
6. **[06-S-Adapter-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/06-S-Adapter-pattern)**: Chuyển đổi interface của một class thành interface khác mà phía client mong muốn (Bộ chuyển đổi).
7. **[07-S-Bridge-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/07-S-Bridge-pattern)**: Tách biệt tính trừu tượng khỏi phần thực thi của nó, giúp cả hai có thể thay đổi độc lập.
8. **[08-S-Composite-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/08-S-Composite-pattern)**: Tổ chức các đối tượng theo cấu trúc dạng cây để client có thể tương tác đồng nhất với đối tượng đơn lẻ và tập hợp đối tượng.
9. **[09-S-Decorator-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/09-S-Decorator-pattern)**: Gán thêm trách nhiệm mới cho đối tượng một cách linh hoạt tại runtime mà không ảnh hưởng tới code gốc.
10. **[10-S-Facade-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/10-S-Facade-pattern)**: Cung cấp một giao diện đơn giản duy nhất đại diện cho một hệ thống con (subsystem) phức tạp bên trong.
11. **[11-S-Flyweight-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/11-S-Flyweight-pattern)**: Chia sẻ dữ liệu dùng chung giữa hàng ngàn đối tượng để tiết kiệm tối đa bộ nhớ RAM.
12. **[12-S-Proxy-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/12-S-Proxy-pattern)**: Cung cấp một đối tượng đại diện/thay thế để kiểm soát quyền truy cập đến đối tượng gốc (Ủy quyền).

---

### 🛠️ 3. Behavioral Patterns (Nhóm mẫu Hành vi - 11 mẫu từ 13 đến 23)
Giải quyết các bài toán về giao tiếp, phân chia luồng xử lý dữ liệu giữa các đối tượng.
13. **[13-B-ChainOfResponsibility-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/13-B-ChainOfResponsibility-pattern)**: Chuyển yêu cầu qua một chuỗi các đối tượng xử lý cho đến khi có đối tượng giải quyết được (Chuỗi trách nhiệm).
14. **[14-B-Command-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/14-B-Command-pattern)**: Đóng gói một yêu cầu thành một đối tượng độc lập, cho phép tham số hóa các yêu cầu, xếp hàng hoặc hoàn tác (undo).
15. **[15-B-Interpreter-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/15-B-Interpreter-pattern)**: Định nghĩa một biểu diễn ngữ pháp cho một ngôn ngữ và một bộ thông dịch cú pháp đó.
16. **[16-B-Iterator-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/16-B-Iterator-pattern)**: Truy cập tuần tự các phần tử của một tập hợp mà không cần để lộ cấu trúc bên dưới của nó.
17. **[17-B-Mediator-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/17-B-Mediator-pattern)**: Định nghĩa một đối tượng trung gian điều phối giao tiếp giữa các class khác nhau, giảm sự phụ thuộc trực tiếp.
18. **[18-B-Memento-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/18-B-Memento-pattern)**: Lưu lại trạng thái nội bộ của đối tượng để có thể khôi phục lại sau này (tính năng Undo/Redo).
19. **[19-B-Observer-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/19-B-Observer-pattern)**: Định nghĩa mối quan hệ 1-nhiều sao cho khi một đối tượng thay đổi trạng thái, tất cả các đối tượng quan sát nó sẽ nhận thông báo tự động.
20. **[20-B-State-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/20-B-State-pattern)**: Cho phép một đối tượng thay đổi hành vi khi trạng thái nội bộ của nó thay đổi.
21. **[21-B-Strategy-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/21-B-Strategy-pattern)**: Định nghĩa một họ các thuật toán, đóng gói từng thuật toán lại và cho phép chúng thay đổi linh hoạt cho nhau ở client.
22. **[22-B-TemplateMethod-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/22-B-TemplateMethod-pattern)**: Định nghĩa bộ khung của một thuật toán ở lớp cha, nhưng cho phép lớp con ghi đè một số bước cụ thể mà không làm thay đổi cấu trúc chung.
23. **[23-B-Visitor-pattern](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/23-B-Visitor-pattern)**: Tách biệt một thuật toán hoặc hành động xử lý ra khỏi cấu trúc đối tượng mà nó thao tác.
