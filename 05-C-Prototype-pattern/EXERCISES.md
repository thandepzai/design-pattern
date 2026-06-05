# Bài tập Thực hành: Prototype Pattern (Mẫu Nguyên Mẫu)

Dưới đây là 3 bài tập thực hành từ cơ bản đến nâng cao giúp bạn thành thạo **Prototype Pattern** và hiểu rõ sự khác biệt giữa **Shallow Copy** và **Deep Copy** trong TypeScript. Hãy mở và hoàn thành file `exercises.ts` để thực hành lắp ráp code.

---

## 📝 Bài tập 1: Nhân bản Hợp đồng thông minh (Deep vs Shallow Contract Cloner)

### 1. Bối cảnh
Hệ thống quản lý nhân sự cần tự động tạo các hợp đồng lao động mới dựa trên một hợp đồng mẫu có sẵn. Mỗi hợp đồng (`Contract`) bao gồm thông tin: Tên nhân viên, điều khoản chung và một đối tượng `ClientInfo` (chứa thông tin công ty ký kết gồm Tên công ty và Địa chỉ).

Để tránh việc sửa thông tin ở hợp đồng của nhân viên này làm ảnh hưởng đến hợp đồng của nhân viên khác (do tham chiếu chéo), chúng ta cần hỗ trợ cả hai cơ chế sao chép:
1. `shallowClone()`: Sao chép nông (chỉ sao chép các thuộc tính nguyên bản, đối tượng `ClientInfo` dùng chung tham chiếu).
2. `deepClone()`: Sao chép sâu (nhân bản mới hoàn toàn cả đối tượng `ClientInfo` lồng bên trong).

### 2. Yêu cầu
- Định nghĩa lớp `ClientInfo` chứa thuộc tính `companyName` và `address`.
- Định nghĩa lớp `Contract` thực thi giao diện nhân bản:
  - Có các thuộc tính: `employeeName: string`, `terms: string`, `clientInfo: ClientInfo`.
  - Triển khai phương thức `shallowClone(): Contract` để thực hiện sao chép nông (chỉ dùng toán tử spread hoặc Object.assign).
  - Triển khai phương thức `deepClone(): Contract` để thực hiện sao chép sâu (nhân bản cả `clientInfo` bằng cách tạo instance mới hoặc dùng các kỹ thuật clone sâu).
- Client code sẽ tạo một hợp đồng gốc, tiến hành clone nông và sâu để chứng minh sự khác biệt khi thay đổi thông tin công ty ký kết ở bản sao.

---

## 📝 Bài tập 2: Hệ thống nhân bản hình học (Graphic Shape Cloner)

### 1. Bối cảnh
Trong một ứng dụng vẽ sơ đồ kỹ thuật (Vector Graphic Editor), người dùng có thể vẽ nhiều hình dạng giống nhau (ví dụ: vẽ 10 hình tròn có kích thước và màu sắc tương đương nhưng ở các tọa độ khác nhau). Để tối ưu hóa trải nghiệm người dùng, ứng dụng hỗ trợ chức năng sao chép hình vẽ (Copy-Paste) bằng cách nhân bản trực tiếp từ một hình tròn hoặc hình chữ nhật đã vẽ từ trước.

### 2. Yêu cầu
- Định nghĩa interface `Shape` có phương thức `clone(): Shape` và `draw(): void`.
- Định nghĩa lớp `Circle` thực thi `Shape`:
  - Thuộc tính: `x: number`, `y: number`, `radius: number`, `color: string`, `style: { border: string }`.
  - Triển khai phương thức `clone()` thực hiện nhân bản sâu toàn bộ thuộc tính (lưu ý thuộc tính `style` là object lồng).
  - Triển khai `draw()` để in thông tin hình tròn ra console.
- Định nghĩa lớp `Rectangle` thực thi `Shape`:
  - Thuộc tính: `x: number`, `y: number`, `width: number`, `height: number`, `color: string`, `style: { border: string }`.
  - Triển khai phương thức `clone()` thực hiện nhân bản sâu toàn bộ thuộc tính.
  - Triển khai `draw()` để in thông tin hình chữ nhật ra console.

---

## 📝 Bài tập 3: Quản lý nhân vật RPG kết hợp Registry (Character Registry Manager)

### 1. Bối cảnh
Trong game RPG, việc khởi tạo một nhân vật có thể mất nhiều thời gian do phải tải mô hình 3D, thiết lập thông số kỹ năng, thuộc tính ban đầu. Ta cần tạo một bộ đăng ký `CharacterRegistry` chứa các nhân vật mẫu (`Warrior`, `Mage`, `Archer`) ở cấp độ 1 với các trang bị cơ bản. Khi một người chơi mới tham gia game và chọn class nhân vật, hệ thống chỉ cần nhân bản (clone) đối tượng mẫu tương ứng từ registry và gán tên người chơi vào bản sao đó.

### 2. Yêu cầu
- Định nghĩa lớp trừu tượng `Hero` kế thừa interface `Prototype`:
  - Thuộc tính: `name: string`, `heroClass: string`, `stats: { hp: number; mp: number; strength: number }`, `equipment: string[]`.
  - Phương thức trừu tượng `clone(): Hero`.
  - Phương thức `display(): void` in thông tin nhân vật chi tiết.
- Định nghĩa các lớp cụ thể: `Warrior`, `Mage` kế thừa `Hero`.
  - Triển khai phương thức `clone()` cho từng lớp cụ thể thực hiện Deep Copy mảng `equipment` và đối tượng `stats`.
- Định nghĩa lớp `CharacterRegistry` quản lý các mẫu nguyên gốc:
  - Có các phương thức: `addPrototype(key, hero)`, `getPrototype(key)`.
  - Phương thức `getPrototype(key)` phải trả về một bản clone từ mẫu nguyên gốc, nếu key không tồn tại thì ném ra lỗi.

---

## 💡 Hướng dẫn thực hiện

1. Hãy mở file `05-C-Prototype-pattern/exercises.ts`.
2. Đọc kỹ phần mô tả và điền mã nguồn của bạn vào những vị trí có comment `// TODO`. **Không sửa đổi cấu trúc của client code hoặc các hàm kiểm thử có sẵn.**
3. Chạy thử nghiệm kết quả bằng cách thực thi lệnh:
   ```bash
   npx tsx 05-C-Prototype-pattern/exercises.ts
   ```
4. Đảm bảo toàn bộ các kịch bản kiểm thử chạy qua mà không ném ra ngoại lệ nào.
