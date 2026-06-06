# BÀI TẬP THỰC HÀNH: FLYWEIGHT PATTERN

## BÀI TẬP 1: Trình Soạn Thảo Văn Bản Tối Ưu Bộ Nhớ (Character Formatter)

### Ngữ cảnh
Bạn đang thiết kế một trình soạn thảo văn bản (giống MS Word). Mỗi trang văn bản có thể chứa hàng triệu ký tự. Nếu mỗi ký tự đều lưu thông tin về định dạng phông chữ (font), cỡ chữ (size), màu sắc (color), bộ nhớ RAM sẽ bị quá tải một cách lãng phí vì hầu hết các ký tự liền kề nhau đều có định dạng giống hệt nhau.

Hãy áp dụng **Flyweight Pattern** để tối ưu hóa bộ nhớ:
- **Intrinsic State** (Flyweight: `CharacterFormat`): Chứa thông tin về phông chữ (font), kích thước (size), và màu sắc (color). Những thuộc tính này lặp đi lặp lại rất nhiều.
- **Extrinsic State** (Context: `Character`): Chứa ký tự thực tế cần hiển thị (`char`) và vị trí dòng/cột (`line`, `column`).
- **Flyweight Factory** (`FormatFactory`): Quản lý việc chia sẻ các đối tượng `CharacterFormat`.

---

## BÀI TẬP 2: Quản Lý Thẻ Sản Phẩm Thương Mại Điện Tử (Product Catalog Card)

### Ngữ cảnh
Một trang web thương mại điện tử hiển thị danh sách 10,000 sản phẩm trên một trang cuộn vô tận.
Mỗi sản phẩm hiển thị một thẻ gồm:
- **Dữ liệu chung của dòng sản phẩm (Intrinsic)**: Tên sản phẩm, hình ảnh đại diện, danh mục, thông số kỹ thuật sản xuất.
- **Dữ liệu riêng biệt của từng thẻ cụ thể (Extrinsic)**: Giá bán thực tế (thay đổi theo khuyến mãi cá nhân hóa), số lượng tồn kho hiển thị riêng, và trạng thái nút "Đã thêm vào giỏ hàng" (selected/not selected).

Hãy áp dụng **Flyweight Pattern**:
- Thiết kế `ProductInfo` là Flyweight chứa thông tin dòng sản phẩm.
- Thiết kế `ProductCard` là Context chứa giá bán, tồn kho, trạng thái đã chọn và tham chiếu tới `ProductInfo`.
- Thiết kế `ProductFactory` để lưu giữ các đối tượng `ProductInfo`.

---

## Hướng dẫn hoàn thành bài tập
1. Mở file [exercises.ts](file:///Users/mapclient.001/Desktop/Work/Learning/BE/design-patterns/11-S-Flyweight-pattern/exercises.ts).
2. Đọc kỹ yêu cầu và thực hiện các phần có đánh dấu `// TODO`.
3. Chạy lệnh sau trong terminal để kiểm tra kết quả:
   ```bash
   npx tsx 11-S-Flyweight-pattern/exercises.ts
   ```
4. Đảm bảo tất cả các test case đều hiển thị `[OK]` và chương trình in ra thông báo thành công màu xanh lá.
