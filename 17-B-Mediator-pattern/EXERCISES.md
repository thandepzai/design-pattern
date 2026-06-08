# BÀI TẬP THỰC HÀNH: MEDIATOR PATTERN

## BÀI TẬP 1: Hệ Thống Điều Phối Không Lưu (Air Traffic Control)

### Ngữ cảnh

Sân bay quốc tế cần một hệ thống điều phối không lưu (ATC — Air Traffic Control). Không có ATC, các máy bay phải tự liên lạc với nhau để quyết định ai được hạ cánh trước, ai phải chờ, ai được cất cánh — cực kỳ nguy hiểm và hỗn loạn.

Với ATC đóng vai trò là Mediator, mỗi máy bay chỉ cần liên lạc với ATC. ATC sẽ kiểm tra trạng thái đường băng và điều phối: nếu đường băng rảnh thì cho phép hạ cánh/cất cánh; nếu bận thì yêu cầu máy bay chờ.

Hãy áp dụng **Mediator Pattern**:
- Định nghĩa interface `AirTrafficControl` với các phương thức `requestLanding(plane: Airplane)` và `requestTakeoff(plane: Airplane)`.
- Triển khai class `Airport` (ConcreteMediator) quản lý trạng thái đường băng (`isRunwayClear`), điều phối các yêu cầu hạ cánh và cất cánh.
- Triển khai class `Airplane` có các phương thức `requestLanding()` và `requestTakeoff()` — chỉ gọi đến ATC, không tự xử lý logic.
- Ghi log vào `operationLogs` theo đúng format để test có thể kiểm tra.

**Log format yêu cầu:**
- Khi máy bay được phép hạ cánh: `"ATC: [PlaneID] được phép hạ cánh."`
- Khi đường băng bận, máy bay phải chờ: `"ATC: [PlaneID] phải chờ, đường băng bận!"`
- Khi máy bay được phép cất cánh: `"ATC: [PlaneID] được phép cất cánh."`

---

## BÀI TẬP 2: Hệ Thống Điều Phối Form Phức Tạp

### Ngữ cảnh

Một trang đặt hàng có form với các thành phần phụ thuộc lẫn nhau:
- **DropdownCountry**: Khi người dùng chọn quốc gia, danh sách thành phố phải tự động cập nhật.
- **DropdownCity**: Danh sách thành phố thay đổi theo quốc gia đã chọn.
- **CheckboxAgree**: Người dùng phải tích vào "đồng ý điều khoản" thì nút Submit mới được bật.
- **ButtonSubmit**: Chỉ hoạt động khi đã chọn cả quốc gia, thành phố và đã tích checkbox.

Nếu các component tự theo dõi nhau, code sẽ rất rối. Hãy áp dụng **Mediator Pattern**:
- Tạo interface `FormMediator` với phương thức `notify(sender: FormComponent, event: string, payload?: string)`.
- Triển khai class `OrderFormMediator` điều phối toàn bộ tương tác giữa các component.
- Triển khai các class `DropdownCountry`, `DropdownCity`, `CheckboxAgree`, `ButtonSubmit` — mỗi class chỉ gọi mediator khi có thay đổi.
- Ghi log vào `operationLogs` theo đúng format.

**Log format yêu cầu:**
- Khi chọn quốc gia: `"FORM: Đã chọn quốc gia [country], cập nhật danh sách thành phố."`
- Khi đồng ý điều khoản: `"FORM: Đã đồng ý điều khoản, nút Submit được kích hoạt."`
- Khi submit form: `"FORM: Submit form [country]/[city]"`

---

## Hướng dẫn hoàn thành bài tập

1. Mở file `exercises.ts`.
2. Thực hiện các phần có đánh dấu `// TODO`.
3. Chạy lệnh sau trong terminal để kiểm tra kết quả:
   ```bash
   npx tsx 17-B-Mediator-pattern/exercises.ts
   ```
4. Đảm bảo tất cả các test case đều hiển thị `[OK]`.
