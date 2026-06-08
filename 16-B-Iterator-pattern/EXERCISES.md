# BÀI TẬP THỰC HÀNH: ITERATOR PATTERN

## BÀI TẬP 1: Duyệt Cây Thư Mục (File System Tree Iterator)

### Ngữ cảnh
Trong một ứng dụng quản lý tệp, bạn cần duyệt qua toàn bộ cây thư mục để liệt kê tất cả các **file** (bỏ qua thư mục). Cây thư mục có thể có nhiều cấp lồng nhau tùy ý.

Hãy áp dụng **Iterator Pattern** để xây dựng `FlatFileIterator` duyệt cây thư mục theo thuật toán **DFS (Depth-First Search)**:

- **`FileSystemNode` (interface):** Node cơ bản trong cây, có thuộc tính `name: string`.
- **`FileNode` (class):** Đại diện cho một file lá (leaf), không có con. Triển khai `FileSystemNode`.
- **`FolderNode` (class):** Đại diện cho một thư mục, có thể chứa nhiều node con (`children: FileSystemNode[]`). Triển khai `FileSystemNode`.
- **`FileSystemIterator` (interface):** Iterator với `hasNext(): boolean` và `next(): string` (trả về tên file).
- **`FlatFileIterator` (class):** Triển khai `FileSystemIterator`, nhận `FolderNode` làm gốc và duyệt DFS qua tất cả các `FileNode` trong cây.

### Yêu cầu log
Mỗi lần phương thức `next()` trả về một file, phải push vào `operationLogs`:
```
"ITERATOR: ${filename}"
```

### Ví dụ cây thư mục
```
root/
├── src/
│   ├── index.ts       <- file
│   └── utils/
│       └── helper.ts  <- file
├── package.json       <- file
└── README.md          <- file
```
Thứ tự DFS mong đợi: `index.ts`, `helper.ts`, `package.json`, `README.md`

---

## BÀI TẬP 2: Duyệt Lịch Sử Đơn Hàng Có Bộ Lọc (Filtered Order Iterator)

### Ngữ cảnh
Trong một hệ thống thương mại điện tử, bạn cần hiển thị lịch sử đơn hàng của người dùng với khả năng lọc theo điều kiện (ví dụ: chỉ hiện đơn đã hoàn thành, hoặc chỉ hiện đơn có giá trị từ $100 trở lên). Thay vì filter trước rồi truyền mảng mới, hãy dùng Iterator để lọc "on the fly" trong quá trình duyệt.

Hãy xây dựng:
- **`Order` (class):** Đối tượng đơn hàng với `id: number`, `status: string`, `total: number`.
- **`OrderFilter` (type):** Hàm nhận `Order` và trả về `boolean` — dùng làm điều kiện lọc.
- **`FilteredOrderIterator` (class):** Nhận mảng `Order[]` và một `OrderFilter`, chỉ trả về những đơn hàng thỏa mãn điều kiện khi gọi `next()`.

### Yêu cầu log
Mỗi lần phương thức `next()` trả về một đơn hàng thỏa điều kiện, phải push vào `operationLogs`:
```
"ORDER_ITER: #${id} - ${status} - $${total}"
```

### Ví dụ sử dụng
```typescript
const orders = [
  new Order(1, 'completed', 250),
  new Order(2, 'pending',   45),
  new Order(3, 'completed', 80),
  new Order(4, 'cancelled', 120),
  new Order(5, 'completed', 310),
];

// Chỉ lấy đơn hoàn thành
const completedFilter: OrderFilter = (o) => o.status === 'completed';
const iter = new FilteredOrderIterator(orders, completedFilter);

while (iter.hasNext()) {
  const order = iter.next(); // trả về Order #1, #3, #5
}
```

---

## Hướng dẫn hoàn thành bài tập
1. Mở file [exercises.ts](./exercises.ts).
2. Thực hiện các phần có đánh dấu `// TODO`.
3. Chạy lệnh sau trong terminal để kiểm tra kết quả:
   ```bash
   npx tsx 16-B-Iterator-pattern/exercises.ts
   ```
4. Đảm bảo tất cả test case hiển thị `[OK]` và chương trình in ra thông báo thành công màu xanh lá.
