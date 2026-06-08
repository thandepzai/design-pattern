/**
 * ============================================================================
 * BÀI TẬP THỰC HÀNH: STRATEGY PATTERN
 * Thư mục: 21-B-Strategy-pattern/exercises.ts
 *
 * Hướng dẫn: Điền mã nguồn vào các phần có đánh dấu // TODO.
 * Chạy file này bằng tsx hoặc ts-node để kiểm tra kết quả.
 * ============================================================================
 */

export const operationLogs: string[] = [];

// ============================================================================
// BÀI TẬP 1: HỆ THỐNG SẮP XẾP DỮ LIỆU (SORTING STRATEGY)
// ============================================================================

export interface SortStrategy {
  sort(data: number[]): number[];
}

export class BubbleSortStrategy implements SortStrategy {
  sort(data: number[]): number[] {
    // TODO: Triển khai các bước:
    // 1. Ghi log vào operationLogs: `"BUBBLE_SORT: Sắp xếp ${data.length} phần tử bằng Bubble Sort."`
    // 2. Tạo bản sao của mảng (KHÔNG mutate mảng gốc): const arr = [...data]
    // 3. Thực hiện thuật toán Bubble Sort trên arr
    //    - Vòng lặp ngoài i từ 0 đến arr.length - 1
    //    - Vòng lặp trong j từ 0 đến arr.length - i - 2
    //    - Nếu arr[j] > arr[j + 1] thì đổi chỗ: [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
    // 4. Trả về arr đã sắp xếp
    operationLogs.push(
      `BUBBLE_SORT: Sắp xếp ${data.length} phần tử bằng Bubble Sort.`,
    );
    const arr = [...data];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }
}

export class QuickSortStrategy implements SortStrategy {
  sort(data: number[]): number[] {
    // TODO: Triển khai các bước:
    // 1. Ghi log vào operationLogs: `"QUICK_SORT: Sắp xếp ${data.length} phần tử bằng Quick Sort."`
    // 2. Tạo bản sao của mảng: const arr = [...data]
    // 3. Gọi hàm quickSort(arr, 0, arr.length - 1) (hàm helper bên dưới)
    // 4. Trả về arr đã sắp xếp
    //
    // Hàm helper quickSort(arr, low, high):
    //   - Nếu low >= high thì return
    //   - Chọn pivot là arr[high]
    //   - Dùng biến i = low - 1 để theo dõi vị trí phần tử nhỏ hơn pivot
    //   - Vòng lặp j từ low đến high - 1:
    //     + Nếu arr[j] <= pivot: tăng i, đổi chỗ arr[i] và arr[j]
    //   - Đổi chỗ arr[i + 1] và arr[high] (đưa pivot vào đúng vị trí)
    //   - Gọi đệ quy: quickSort(arr, low, i) và quickSort(arr, i + 2, high)
    operationLogs.push(
      `QUICK_SORT: Sắp xếp ${data.length} phần tử bằng Quick Sort.`,
    );
    const arr = [...data];

    const quickSort = (a: number[], low: number, high: number): void => {
      if (low >= high) return;
      const pivot = a[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        if (a[j] <= pivot) {
          i++;
          [a[i], a[j]] = [a[j], a[i]];
        }
      }
      [a[i + 1], a[high]] = [a[high], a[i + 1]];
      const pi = i + 1;
      quickSort(a, low, pi - 1);
      quickSort(a, pi + 1, high);
    };

    quickSort(arr, 0, arr.length - 1);
    return arr;
  }
}

export class MergeSortStrategy implements SortStrategy {
  sort(data: number[]): number[] {
    // TODO: Triển khai các bước:
    // 1. Ghi log vào operationLogs: `"MERGE_SORT: Sắp xếp ${data.length} phần tử bằng Merge Sort."`
    // 2. Tạo bản sao của mảng: const arr = [...data]
    // 3. Gọi hàm mergeSort(arr) và trả về kết quả
    //
    // Hàm helper mergeSort(arr):
    //   - Nếu arr.length <= 1 thì return arr
    //   - Tìm mid = Math.floor(arr.length / 2)
    //   - left = mergeSort(arr.slice(0, mid))
    //   - right = mergeSort(arr.slice(mid))
    //   - Trả về merge(left, right)
    //
    // Hàm helper merge(left, right):
    //   - Tạo mảng result = []
    //   - Dùng 2 con trỏ i, j = 0
    //   - Khi cả hai mảng còn phần tử: so sánh left[i] và right[j], push phần nhỏ hơn vào result
    //   - Push phần còn lại của mảng chưa hết vào result
    //   - Trả về result
    operationLogs.push(
      `MERGE_SORT: Sắp xếp ${data.length} phần tử bằng Merge Sort.`,
    );
    const arr = [...data];

    const merge = (left: number[], right: number[]): number[] => {
      const result: number[] = [];
      let i = 0;
      let j = 0;
      while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
          result.push(left[i++]);
        } else {
          result.push(right[j++]);
        }
      }
      return result.concat(left.slice(i)).concat(right.slice(j));
    };

    const mergeSort = (a: number[]): number[] => {
      if (a.length <= 1) return a;
      const mid = Math.floor(a.length / 2);
      const left = mergeSort(a.slice(0, mid));
      const right = mergeSort(a.slice(mid));
      return merge(left, right);
    };

    return mergeSort(arr);
  }
}

export class DataSorter {
  private strategy: SortStrategy;

  constructor(strategy: SortStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: SortStrategy): void {
    this.strategy = strategy;
  }

  sort(data: number[]): number[] {
    return this.strategy.sort(data);
  }
}

// ============================================================================
// BÀI TẬP 2: HỆ THỐNG TÍNH PHÍ VẬN CHUYỂN (SHIPPING STRATEGY)
// ============================================================================

export interface ShippingStrategy {
  calculateFee(orderTotal: number): number;
}

export class StandardShippingStrategy implements ShippingStrategy {
  calculateFee(orderTotal: number): number {
    // TODO: Triển khai các bước:
    // 1. Khai báo fee = 5
    // 2. Ghi log vào operationLogs: `"STANDARD: Phí vận chuyển tiêu chuẩn: $${fee}"`
    // 3. Trả về fee
    const fee = 5;
    operationLogs.push(`STANDARD: Phí vận chuyển tiêu chuẩn: $${fee}`);
    return fee;
  }
}

export class ExpressShippingStrategy implements ShippingStrategy {
  calculateFee(orderTotal: number): number {
    // TODO: Triển khai các bước:
    // 1. Khai báo fee = 15
    // 2. Ghi log vào operationLogs: `"EXPRESS: Phí vận chuyển nhanh: $${fee}"`
    // 3. Trả về fee
    const fee = 15;
    operationLogs.push(`EXPRESS: Phí vận chuyển nhanh: $${fee}`);
    return fee;
  }
}

export class FreeShippingStrategy implements ShippingStrategy {
  calculateFee(orderTotal: number): number {
    // TODO: Triển khai các bước:
    // 1. Kiểm tra xem orderTotal có >= 50 không.
    // 2. Nếu KHÔNG hợp lệ (< 50):
    //    - Throw new Error("Đơn hàng không đủ điều kiện miễn phí vận chuyển.")
    // 3. Nếu hợp lệ (>= 50):
    //    - Ghi log vào operationLogs: `"FREE: Miễn phí vận chuyển cho đơn hàng $${orderTotal}"`
    //    - Trả về 0
    if (orderTotal < 50) {
      throw new Error("Đơn hàng không đủ điều kiện miễn phí vận chuyển.");
    }
    operationLogs.push(
      `FREE: Miễn phí vận chuyển cho đơn hàng $${orderTotal}`,
    );
    return 0;
  }
}

export class ShippingCalculator {
  private strategy: ShippingStrategy;

  constructor(strategy: ShippingStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: ShippingStrategy): void {
    this.strategy = strategy;
  }

  calculate(orderTotal: number): number {
    return this.strategy.calculateFee(orderTotal);
  }
}

// ============================================================================
// CLIENT CODE (DÙNG ĐỂ CHẠY THỬ NGHIỆM)
// ============================================================================
function runTests() {
  console.log("=== THỬ NGHIỆM BÀI TẬP 1 (SORTING STRATEGY) ===");
  try {
    const data = [64, 34, 25, 12, 22, 11, 90];
    const expected = [11, 12, 22, 25, 34, 64, 90];
    const isSorted = (arr: number[]): boolean =>
      arr.every((v, i) => i === 0 || v >= arr[i - 1]);

    const sorter = new DataSorter(new BubbleSortStrategy());

    // Test 1.1: BubbleSort log và kết quả đúng
    operationLogs.length = 0;
    const bubbleResult = sorter.sort(data);
    const test1_1 =
      operationLogs.includes(
        `BUBBLE_SORT: Sắp xếp ${data.length} phần tử bằng Bubble Sort.`,
      ) &&
      isSorted(bubbleResult) &&
      bubbleResult.join(",") === expected.join(",");
    console.log(
      `  - Test 1.1: BubbleSortStrategy ghi log và sắp xếp đúng -> [${test1_1 ? "OK" : "FAIL"}]`,
    );

    // Test 1.2: QuickSort log và kết quả đúng
    operationLogs.length = 0;
    sorter.setStrategy(new QuickSortStrategy());
    const quickResult = sorter.sort(data);
    const test1_2 =
      operationLogs.includes(
        `QUICK_SORT: Sắp xếp ${data.length} phần tử bằng Quick Sort.`,
      ) &&
      isSorted(quickResult) &&
      quickResult.join(",") === expected.join(",");
    console.log(
      `  - Test 1.2: QuickSortStrategy ghi log và sắp xếp đúng -> [${test1_2 ? "OK" : "FAIL"}]`,
    );

    // Test 1.3: MergeSort log và kết quả đúng
    operationLogs.length = 0;
    sorter.setStrategy(new MergeSortStrategy());
    const mergeResult = sorter.sort(data);
    const test1_3 =
      operationLogs.includes(
        `MERGE_SORT: Sắp xếp ${data.length} phần tử bằng Merge Sort.`,
      ) &&
      isSorted(mergeResult) &&
      mergeResult.join(",") === expected.join(",");
    console.log(
      `  - Test 1.3: MergeSortStrategy ghi log và sắp xếp đúng -> [${test1_3 ? "OK" : "FAIL"}]`,
    );

    // Test 1.4: Mảng gốc không bị thay đổi (immutability)
    const test1_4 = data.join(",") === "64,34,25,12,22,11,90";
    console.log(
      `  - Test 1.4: Mảng gốc không bị mutate -> [${test1_4 ? "OK" : "FAIL"}]`,
    );

    if (test1_1 && test1_2 && test1_3 && test1_4) {
      console.log(
        "\x1b[32m  ✓ Thành công: Tất cả chiến lược sắp xếp hoạt động chính xác.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Một hoặc nhiều chiến lược sắp xếp bị lỗi.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 1 chưa hoàn thiện:\x1b[0m", message);
  }

  console.log("\n=== THỬ NGHIỆM BÀI TẬP 2 (SHIPPING STRATEGY) ===");
  try {
    const calculator = new ShippingCalculator(new StandardShippingStrategy());

    // Test 2.1: Standard shipping - phí $5
    operationLogs.length = 0;
    const standardFee = calculator.calculate(30);
    const test2_1 =
      standardFee === 5 &&
      operationLogs.includes("STANDARD: Phí vận chuyển tiêu chuẩn: $5");
    console.log(
      `  - Test 2.1: StandardShipping tính phí $5 và ghi log đúng -> [${test2_1 ? "OK" : "FAIL"}]`,
    );

    // Test 2.2: Express shipping - phí $15
    operationLogs.length = 0;
    calculator.setStrategy(new ExpressShippingStrategy());
    const expressFee = calculator.calculate(30);
    const test2_2 =
      expressFee === 15 &&
      operationLogs.includes("EXPRESS: Phí vận chuyển nhanh: $15");
    console.log(
      `  - Test 2.2: ExpressShipping tính phí $15 và ghi log đúng -> [${test2_2 ? "OK" : "FAIL"}]`,
    );

    // Test 2.3: Free shipping - đủ điều kiện (>= $50)
    operationLogs.length = 0;
    calculator.setStrategy(new FreeShippingStrategy());
    const freeFee = calculator.calculate(75);
    const test2_3 =
      freeFee === 0 &&
      operationLogs.includes("FREE: Miễn phí vận chuyển cho đơn hàng $75");
    console.log(
      `  - Test 2.3: FreeShipping miễn phí cho đơn $75 và ghi log đúng -> [${test2_3 ? "OK" : "FAIL"}]`,
    );

    // Test 2.4: Free shipping - không đủ điều kiện (< $50) -> throw Error
    operationLogs.length = 0;
    let test2_4 = false;
    try {
      calculator.calculate(30);
    } catch (e: unknown) {
      test2_4 = e instanceof Error;
    }
    console.log(
      `  - Test 2.4: FreeShipping throw Error khi đơn hàng < $50 -> [${test2_4 ? "OK" : "FAIL"}]`,
    );

    if (test2_1 && test2_2 && test2_3 && test2_4) {
      console.log(
        "\x1b[32m  ✓ Thành công: Tất cả chiến lược tính phí vận chuyển hoạt động chính xác.\x1b[0m",
      );
    } else {
      console.log(
        "\x1b[31m  ✗ Thất bại: Một hoặc nhiều chiến lược tính phí bị lỗi.\x1b[0m",
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.log("\x1b[31m  ✗ Bài tập 2 chưa hoàn thiện:\x1b[0m", message);
  }
}

runTests();
