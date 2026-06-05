/**
 * ============================================================================
 * VÍ DỤ MINH HỌA: COMPOSITE PATTERN
 * Thư mục: 08-S-Composite-pattern/index.ts
 *
 * Ngữ cảnh: Hệ thống Quản lý Tệp tin (File System).
 * - Component: FileSystemNode (Định nghĩa giao diện chung cho File và Directory)
 * - Leaf: File (Tệp tin đơn giản, chứa kích thước)
 * - Composite: Directory (Thư mục, chứa danh sách các FileSystemNode con)
 * ============================================================================
 */

// ============================================================================
// 1. COMPONENT INTERFACE
// ============================================================================
interface FileSystemNode {
  getName(): string;
  getSize(): number;
  print(indent?: string): void;
}

// ============================================================================
// 2. LEAF (Đối tượng lá - File)
// ============================================================================
class FileNode implements FileSystemNode {
  private name: string;
  private size: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }

  public getName(): string {
    return this.name;
  }

  public getSize(): number {
    return this.size;
  }

  public print(indent: string = ""): void {
    console.log(`${indent}📄 ${this.name} (${this.size} KB)`);
  }
}

// ============================================================================
// 3. COMPOSITE (Đối tượng tổ hợp - Thư mục)
// ============================================================================
class DirectoryNode implements FileSystemNode {
  private name: string;
  private children: FileSystemNode[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  // Phương thức thêm phần tử con (Chỉ Composite mới có)
  public add(node: FileSystemNode): void {
    this.children.push(node);
  }

  // Phương thức xóa phần tử con (Chỉ Composite mới có)
  public remove(node: FileSystemNode): void {
    const index = this.children.indexOf(node);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  // Tính tổng kích thước bằng cách đệ quy qua toàn bộ các con
  public getSize(): number {
    let totalSize = 0;
    for (const child of this.children) {
      totalSize += child.getSize();
    }
    return totalSize;
  }

  // In cấu trúc thư mục phân cấp
  public print(indent: string = ""): void {
    console.log(`${indent}📁 [${this.name}] - Tổng dung lượng: ${this.getSize()} KB`);
    for (const child of this.children) {
      child.print(indent + "  ");
    }
  }
}

// ============================================================================
// THỬ NGHIỆM CHẠY CHƯƠNG TRÌNH
// ============================================================================
function runExample() {
  console.log("=== CHẠY VÍ DỤ MINH HỌA COMPOSITE PATTERN ===\n");

  // Tạo các file đơn lẻ
  const file1 = new FileNode("index.html", 12);
  const file2 = new FileNode("styles.css", 45);
  const file3 = new FileNode("app.ts", 120);
  const file4 = new FileNode("logo.png", 350);
  const file5 = new FileNode("README.md", 5);

  // Tạo thư mục nguồn
  const srcDir = new DirectoryNode("src");
  srcDir.add(file3);

  // Tạo thư mục assets
  const assetsDir = new DirectoryNode("assets");
  assetsDir.add(file4);

  // Tạo thư mục gốc dự án
  const rootDir = new DirectoryNode("MyWebProject");
  rootDir.add(file1);
  rootDir.add(file2);
  rootDir.add(file5);
  rootDir.add(srcDir);
  rootDir.add(assetsDir);

  // In toàn bộ cấu trúc dự án
  rootDir.print();

  console.log("\n------------------------------------------------");
  console.log(`Dung lượng của thư mục 'src': ${srcDir.getSize()} KB`);
  console.log(`Dung lượng toàn bộ thư mục 'MyWebProject': ${rootDir.getSize()} KB`);
}

runExample();
