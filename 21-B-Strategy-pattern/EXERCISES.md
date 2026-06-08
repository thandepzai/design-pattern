# BÀI TẬP THỰC HÀNH: STRATEGY PATTERN

## BÀI TẬP 1: Hệ Thống Sắp Xếp Dữ Liệu (Sorting Strategy)

### Ngữ cảnh
Bạn cần xây dựng một `DataSorter` có khả năng sắp xếp mảng số nguyên bằng nhiều thuật toán khác nhau tùy thuộc vào kích thước dữ liệu và yêu cầu hiệu suất:

1. **BubbleSortStrategy**: Thuật toán Bubble Sort đơn giản, phù hợp với mảng nhỏ.
2. **QuickSortStrategy**: Thuật toán Quick Sort hiệu quả, phù hợp với dữ liệu vừa.
3. **MergeSortStrategy**: Thuật toán Merge Sort ổn định, phù hợp với dữ liệu lớn.

Mỗi chiến lược phải:
- Implement interface `SortStrategy` với phương thức `sort(data: number[]): number[]`.
- Ghi log vào `operationLogs` để xác nhận chiến lược nào đã được gọi.
- Trả về mảng đã sắp xếp tăng dần (không được mutate mảng gốc).

Lớp `DataSorter` (Context):
- Nhận `SortStrategy` qua constructor.
- Có phương thức `setStrategy(strategy: SortStrategy)` để đổi thuật toán.
- Có phương thức `sort(data: number[]): number[]` để thực hiện sắp xếp.

### Format log bắt buộc
- BubbleSortStrategy: `"BUBBLE_SORT: Sắp xếp ${n} phần tử bằng Bubble Sort."`
- QuickSortStrategy: `"QUICK_SORT: Sắp xếp ${n} phần tử bằng Quick Sort."`
- MergeSortStrategy: `"MERGE_SORT: Sắp xếp ${n} phần tử bằng Merge Sort."`

*(trong đó `n` là độ dài của mảng đầu vào)*

---

## BÀI TẬP 2: Hệ Thống Tính Phí Vận Chuyển (Shipping Strategy)

### Ngữ cảnh
Một sàn thương mại điện tử cần tính phí vận chuyển dựa trên loại dịch vụ và giá trị đơn hàng:

1. **StandardShippingStrategy**: Vận chuyển tiêu chuẩn, phí cố định **$5**.
2. **ExpressShippingStrategy**: Vận chuyển nhanh, phí cố định **$15**.
3. **FreeShippingStrategy**: Miễn phí vận chuyển nếu tổng đơn hàng **>= $50**, ngược lại báo lỗi bằng cách throw `Error`.

Mỗi chiến lược phải:
- Implement interface `ShippingStrategy` với phương thức `calculateFee(orderTotal: number): number`.
- Ghi log vào `operationLogs` để xác nhận kết quả tính phí.

Lớp `ShippingCalculator` (Context):
- Nhận `ShippingStrategy` qua constructor.
- Có phương thức `setStrategy(strategy: ShippingStrategy)` để đổi chiến lược.
- Có phương thức `calculate(orderTotal: number): number` để tính phí.

### Format log bắt buộc
- StandardShippingStrategy: `"STANDARD: Phí vận chuyển tiêu chuẩn: $${fee}"`
- ExpressShippingStrategy: `"EXPRESS: Phí vận chuyển nhanh: $${fee}"`
- FreeShippingStrategy (hợp lệ): `"FREE: Miễn phí vận chuyển cho đơn hàng $${total}"`

*(trong đó `fee` là số tiền phí, `total` là giá trị đơn hàng)*

---

## Hướng dẫn hoàn thành bài tập
1. Mở file [exercises.ts](./exercises.ts).
2. Thực hiện các phần có đánh dấu `// TODO`.
3. Chạy lệnh sau trong terminal để kiểm tra kết quả:
   ```bash
   npx tsx 21-B-Strategy-pattern/exercises.ts
   ```
4. Đảm bảo tất cả các test case đều hiển thị `[OK]` và chương trình in ra thông báo thành công màu xanh lá.
