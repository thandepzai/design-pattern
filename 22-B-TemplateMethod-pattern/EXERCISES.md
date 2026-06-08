# BÀI TẬP THỰC HÀNH: TEMPLATE METHOD PATTERN

## BÀI TẬP 1: Quy Trình Tạo Báo Cáo (Report Generator)

### Ngữ cảnh
Hệ thống quản trị doanh nghiệp cần tạo nhiều loại báo cáo khác nhau, nhưng tất cả đều tuân theo cùng một quy trình:
1. **collectData()**: Thu thập dữ liệu thô từ nguồn (database, API...).
2. **processData(data)**: Xử lý, tính toán, lọc dữ liệu thô.
3. **formatOutput(data)**: Định dạng dữ liệu thành chuỗi có thể đọc.
4. **sendReport(output)**: Gửi báo cáo đến người nhận.

Bộ khung này được định nghĩa trong `generateReport()` của abstract class `ReportGenerator`.

Các lớp con cần implement:
- **SalesReportGenerator**: Báo cáo doanh thu, gửi cho Ban Giám Đốc.
- **InventoryReportGenerator**: Báo cáo tồn kho, gửi cho Trưởng Kho.

Các bước ghi log phải chính xác theo format quy định để test runner nhận diện được.

### Format log bắt buộc cho SalesReportGenerator
- `"SALES_REPORT: Thu thập dữ liệu bán hàng từ database..."`
- `"SALES_REPORT: Xử lý và tính toán doanh thu..."`
- `"SALES_REPORT: Định dạng báo cáo doanh thu."`
- `"SALES_REPORT: Gửi báo cáo đến Ban Giám Đốc."`

### Format log bắt buộc cho InventoryReportGenerator
- `"INVENTORY_REPORT: Thu thập dữ liệu tồn kho..."`
- `"INVENTORY_REPORT: Kiểm tra và phân loại hàng tồn..."`
- `"INVENTORY_REPORT: Định dạng báo cáo tồn kho."`
- `"INVENTORY_REPORT: Gửi báo cáo đến Trưởng Kho."`

---

## BÀI TẬP 2: Quy Trình Phân Tích Dữ Liệu (Data Analyzer)

### Ngữ cảnh
Hệ thống ETL (Extract-Transform-Load) cần phân tích dữ liệu từ nhiều định dạng file khác nhau. Tất cả đều chạy qua cùng một quy trình:
1. **loadData()**: Đọc dữ liệu từ nguồn, trả về chuỗi raw data.
2. **validateData(data)**: Kiểm tra tính hợp lệ của dữ liệu, trả về `boolean`.
3. **analyzeData(data)**: Phân tích cú pháp và trích xuất thông tin.
4. **generateSummary(result)**: Tạo bản tổng kết từ kết quả phân tích.

Nếu `validateData()` trả về `false`, quy trình dừng lại (không chạy các bước tiếp theo) và ghi log lỗi.

Các lớp con cần implement:
- **CSVAnalyzer**: Phân tích file CSV.
- **JSONAnalyzer**: Phân tích file JSON.

### Format log bắt buộc cho CSVAnalyzer
- `"CSV: Tải dữ liệu từ file .csv"`
- `"CSV: Kiểm tra định dạng CSV hợp lệ."`
- `"CSV: Phân tích cú pháp dữ liệu CSV."`
- `"CSV: Tổng kết: Tìm thấy 3 bản ghi."` *(số bản ghi tùy implement)*

### Format log bắt buộc cho JSONAnalyzer
- `"JSON: Tải dữ liệu từ file .json"`
- `"JSON: Kiểm tra cú pháp JSON hợp lệ."`
- `"JSON: Phân tích cú pháp dữ liệu JSON."`
- `"JSON: Tổng kết: Tìm thấy 2 bản ghi."` *(số bản ghi tùy implement)*

---

## Hướng dẫn hoàn thành bài tập
1. Mở file [exercises.ts](./exercises.ts).
2. Thực hiện các phần có đánh dấu `// TODO`.
3. Chạy lệnh sau trong terminal để kiểm tra kết quả:
   ```bash
   npx tsx 22-B-TemplateMethod-pattern/exercises.ts
   ```
4. Đảm bảo tất cả các test case đều hiển thị `[OK]` và chương trình in ra thông báo thành công màu xanh lá.
