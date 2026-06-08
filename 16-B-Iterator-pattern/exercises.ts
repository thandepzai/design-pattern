/**
 * ============================================================================
 * BÀI TẬP THỰC HÀNH: ITERATOR PATTERN
 * Thư mục: 16-B-Iterator-pattern/exercises.ts
 *
 * Hướng dẫn: Điền mã nguồn vào các phần có đánh dấu // TODO.
 * Chạy file này bằng tsx hoặc ts-node để kiểm tra kết quả.
 * ============================================================================
 */

export const operationLogs: string[] = [];

// ============================================================================
// BÀI TẬP 1: DUYỆT CÂY THƯ MỤC (FILE SYSTEM TREE ITERATOR)
// ============================================================================

export interface FileSystemNode {
  name: string;
}

export class FileNode implements FileSystemNode {
  constructor(public name: string) {}
}

export class FolderNode implements FileSystemNode {
  public children: FileSystemNode[] = [];

  constructor(public name: string) {}

  public add(node: FileSystemNode): void {
    this.children.push(node);
  }
}

export interface FileSystemIterator {
  hasNext(): boolean;
  next(): string;
}

export class FlatFileIterator implements FileSystemIterator {
  private fileQueue: string[] = [];
  private index: number = 0;

  constructor(root: FolderNode) {
    // TODO: Triển khai DFS để thu thập tất cả tên file (FileNode) vào this.fileQueue.
    // Gợi ý:
    // - Dùng một stack hoặc đệ quy để duyệt DFS toàn bộ cây từ `root`.
    // - Chỉ thêm vào queue khi node là FileNode (không phải FolderNode).
    // - Thứ tự duyệt: con trái trước, con phải sau (thứ tự children trong mảng).
    throw new Error("FlatFileIterator constructor chưa được triển khai!");
  }

  public hasNext(): boolean {
    // TODO: Trả về true nếu còn file chưa được duyệt qua.
    throw new Error("FlatFileIterator.hasNext chưa được triển khai!");
  }

  public next(): string {
    // TODO: Triển khai các bước:
    // 1. Kiểm tra nếu không còn phần tử, ném lỗi "Không còn file nào để duyệt."
    // 2. Lấy tên file tại vị trí this.index, tăng index lên 1.
    // 3. Push vào operationLogs với format: "ITERATOR: ${filename}"
    // 4. Trả về tên file.
    throw new Error("FlatFileIterator.next chưa được triển khai!");
  }
}

// ============================================================================
// BÀI TẬP 2: DUYỆT LỊCH SỬ ĐƠN HÀNG CÓ BỘ LỌC (FILTERED ORDER ITERATOR)
// ============================================================================

export class Order {
  constructor(
    public id: number,
    public status: string,
    public total: number
  ) {}
}

export type OrderFilter = (order: Order) => boolean;

export class FilteredOrderIterator {
  private currentIndex: number = 0;
  private nextOrder: Order | null = null;
  private consumed: boolean = true;

  constructor(
    private readonly orders: Order[],
    private readonly filter: OrderFilter
  ) {}

  public hasNext(): boolean {
    // TODO: Triển khai các bước:
    // 1. Nếu this.consumed === false, nghĩa là đã tìm được next nhưng chưa đọc -> trả về true.
    // 2. Duyệt từ this.currentIndex đến hết mảng this.orders:
    //    - Nếu orders[i] thỏa mãn this.filter(order), lưu vào this.nextOrder,
    //      cập nhật this.currentIndex = i + 1, đặt this.consumed = false, trả về true.
    // 3. Nếu duyệt hết mà không tìm thấy, trả về false.
    throw new Error("FilteredOrderIterator.hasNext chưa được triển khai!");
  }

  public next(): Order {
    // TODO: Triển khai các bước:
    // 1. Nếu this.consumed === true, gọi this.hasNext() để tìm phần tử tiếp theo.
    // 2. Nếu this.nextOrder === null (không tìm thấy), ném lỗi "Không còn đơn hàng nào thỏa điều kiện."
    // 3. Lấy order từ this.nextOrder, đặt this.consumed = true, this.nextOrder = null.
    // 4. Push vào operationLogs với format: "ORDER_ITER: #${order.id} - ${order.status} - $${order.total}"
    // 5. Trả về order.
    throw new Error("FilteredOrderIterator.next chưa được triển khai!");
  }
}

// ============================================================================
// CLIENT CODE (DÙNG ĐỂ CHẠY THỬ NGHIỆM)
// ============================================================================
async function runTests(): Promise<void> {
  console.log("=== THỬ NGHIỆM BÀI TẬP 1 (FILE SYSTEM TREE ITERATOR) ===");
  try {
    // Xây dựng cây thư mục:
    // root/
    // ├── src/
    // │   ├── index.ts
    // │   └── utils/
    // │       └── helper.ts
    // ├── package.json
    // └── README.md
    const root = new FolderNode("root");

    const src = new FolderNode("src");
    src.add(new FileNode("index.ts"));
    const utils = new FolderNode("utils");
    utils.add(new FileNode("helper.ts"));
    src.add(utils);

    root.add(src);
    root.add(new FileNode("package.json"));
    root.add(new FileNode("README.md"));

    const iterator = new FlatFileIterator(root);

    const collectedFiles: string[] = [];
    while (iterator.hasNext()) {
      collectedFiles.push(iterator.next());
    }

    const expectedFiles = ["index.ts", "helper.ts", "package.json", "README.md"];

    // Test 1.1: Thu thập đúng số lượng file
    const test1_1 = collectedFiles.length === 4;
    console.log(`  - Test 1.1: Tìm thấy đúng 4 file -> [${test1_1 ? "OK" : "FAIL"}]`);

    // Test 1.2: Thứ tự DFS chính xác
    const test1_2 = collectedFiles.join(",") === expectedFiles.join(",");
    console.log(
      `  - Test 1.2: Thứ tự DFS đúng (${collectedFiles.join(", ")}) -> [${test1_2 ? "OK" : "FAIL"}]`
    );

    // Test 1.3: operationLogs ghi đúng format
    const expectedLogs = expectedFiles.map((f) => `ITERATOR: ${f}`);
    const test1_3 = expectedLogs.every((log) => operationLogs.includes(log));
    console.log(`  - Test 1.3: operationLogs ghi đúng format "ITERATOR: filename" -> [${test1_3 ? "OK" : "FAIL"}]`);

    // Test 1.4: Thứ tự log khớp thứ tự duyệt
    const logSlice = operationLogs.slice(0, 4);
    const test1_4 = logSlice.join(",") === expectedLogs.join(",");
    console.log(`  - Test 1.4: Thứ tự log khớp thứ tự duyệt DFS -> [${test1_4 ? "OK" : "FAIL"}]`);

    if (test1_1 && test1_2 && test1_3 && test1_4) {
      console.log("\x1b[32m  ✓ Thành công: FlatFileIterator duyệt DFS chính xác.\x1b[0m");
    } else {
      console.log("\x1b[31m  ✗ Thất bại: Kết quả duyệt cây thư mục chưa đúng.\x1b[0m");
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 1 chưa hoàn thiện:\x1b[0m", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 (FILTERED ORDER ITERATOR) ===");
  try {
    const orders: Order[] = [
      new Order(1, "completed", 250),
      new Order(2, "pending", 45),
      new Order(3, "completed", 80),
      new Order(4, "cancelled", 120),
      new Order(5, "completed", 310),
      new Order(6, "pending", 500),
    ];

    // --- Test 2.1: Lọc theo status = 'completed' ---
    const completedFilter: OrderFilter = (o) => o.status === "completed";
    const completedIter = new FilteredOrderIterator(orders, completedFilter);

    const completedOrders: Order[] = [];
    while (completedIter.hasNext()) {
      completedOrders.push(completedIter.next());
    }

    const test2_1 =
      completedOrders.length === 3 &&
      completedOrders[0].id === 1 &&
      completedOrders[1].id === 3 &&
      completedOrders[2].id === 5;
    console.log(
      `  - Test 2.1: Lọc status='completed' -> 3 đơn hàng (id: 1, 3, 5) -> [${test2_1 ? "OK" : "FAIL"}]`
    );

    // --- Test 2.2: Lọc theo total >= 100 ---
    const highValueFilter: OrderFilter = (o) => o.total >= 100;
    const highValueIter = new FilteredOrderIterator(orders, highValueFilter);

    const highValueOrders: Order[] = [];
    while (highValueIter.hasNext()) {
      highValueOrders.push(highValueIter.next());
    }

    const test2_2 =
      highValueOrders.length === 4 &&
      highValueOrders.map((o) => o.id).join(",") === "1,4,5,6";
    console.log(
      `  - Test 2.2: Lọc total >= 100 -> 4 đơn hàng (id: 1, 4, 5, 6) -> [${test2_2 ? "OK" : "FAIL"}]`
    );

    // --- Test 2.3: Lọc không có kết quả ---
    const impossibleFilter: OrderFilter = (o) => o.total > 10000;
    const emptyIter = new FilteredOrderIterator(orders, impossibleFilter);
    const test2_3 = emptyIter.hasNext() === false;
    console.log(`  - Test 2.3: Bộ lọc không khớp -> hasNext() = false -> [${test2_3 ? "OK" : "FAIL"}]`);

    // --- Test 2.4: operationLogs ghi đúng format cho completed orders ---
    const expectedLog1 = "ORDER_ITER: #1 - completed - $250";
    const expectedLog3 = "ORDER_ITER: #3 - completed - $80";
    const expectedLog5 = "ORDER_ITER: #5 - completed - $310";
    const test2_4 =
      operationLogs.includes(expectedLog1) &&
      operationLogs.includes(expectedLog3) &&
      operationLogs.includes(expectedLog5);
    console.log(`  - Test 2.4: operationLogs ghi đúng format "ORDER_ITER: #id - status - $total" -> [${test2_4 ? "OK" : "FAIL"}]`);

    // --- Test 2.5: Thứ tự log completed đúng thứ tự trong mảng gốc ---
    const completedLogIndex1 = operationLogs.indexOf(expectedLog1);
    const completedLogIndex3 = operationLogs.indexOf(expectedLog3);
    const completedLogIndex5 = operationLogs.indexOf(expectedLog5);
    const test2_5 =
      completedLogIndex1 !== -1 &&
      completedLogIndex3 !== -1 &&
      completedLogIndex5 !== -1 &&
      completedLogIndex1 < completedLogIndex3 &&
      completedLogIndex3 < completedLogIndex5;
    console.log(`  - Test 2.5: Thứ tự log khớp thứ tự duyệt trong mảng gốc -> [${test2_5 ? "OK" : "FAIL"}]`);

    if (test2_1 && test2_2 && test2_3 && test2_4 && test2_5) {
      console.log(
        "\x1b[32m  ✓ Thành công: FilteredOrderIterator lọc và duyệt đơn hàng chính xác.\x1b[0m"
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Kết quả lọc đơn hàng chưa đúng.\x1b[0m"
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 2 chưa hoàn thiện:\x1b[0m", message);
  }
}

runTests();
