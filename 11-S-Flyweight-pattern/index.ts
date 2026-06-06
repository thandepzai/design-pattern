/**
 * ============================================================================
 * VÍ DỤ MINH HỌA: FLYWEIGHT PATTERN
 * Thư mục: 11-S-Flyweight-pattern/index.ts
 *
 * Ngữ cảnh: Mô phỏng khu rừng (Forest Simulator) trong Game với hàng ngàn cây sồi và cây thông.
 * - Flyweight: TreeType (lưu trữ tên, màu sắc, texture đồ họa nặng).
 * - Flyweight Factory: TreeFactory (quản lý việc chia sẻ TreeType).
 * - Context: Tree (lưu trữ tọa độ x, y cụ thể của từng cây).
 * ============================================================================
 */

// ============================================================================
// 1. FLYWEIGHT CLASS (Chứa Intrinsic State - Dữ liệu nặng không thay đổi)
// ============================================================================
class TreeType {
  private name: string;
  private color: string;
  private texture: string; // Giả lập dữ liệu nhị phân nặng của texture hình ảnh

  constructor(name: string, color: string, texture: string) {
    this.name = name;
    this.color = color;
    this.texture = texture;
  }

  // Nhận Extrinsic State (tọa độ x, y) truyền từ ngữ cảnh để vẽ
  public draw(x: number, y: number): void {
    console.log(
      `🌲 [Vẽ] Cây "${this.name}" màu ${this.color} tại vị trí (${x}, ${y}). (Dung lượng Texture: ${this.texture.length} bytes)`
    );
  }
}

// ============================================================================
// 2. FLYWEIGHT FACTORY (Đảm bảo tái sử dụng đối tượng Flyweight)
// ============================================================================
class TreeFactory {
  private static treeTypes: Map<string, TreeType> = new Map();

  public static getTreeType(name: string, color: string, texture: string): TreeType {
    const key = `${name}_${color}`;
    if (!this.treeTypes.has(key)) {
      console.log(`🔨 [Factory] Tạo mới TreeType loại: "${name}" [Màu: ${color}]`);
      this.treeTypes.set(key, new TreeType(name, color, texture));
    } else {
      console.log(`♻️ [Factory] Tái sử dụng TreeType loại: "${name}" [Màu: ${color}]`);
    }
    return this.treeTypes.get(key)!;
  }

  public static getTypesCount(): number {
    return this.treeTypes.size;
  }
}

// ============================================================================
// 3. CONTEXT CLASS (Chứa Extrinsic State & tham chiếu Flyweight)
// ============================================================================
class Tree {
  private x: number;
  private y: number;
  private type: TreeType;

  constructor(x: number, y: number, type: TreeType) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  public draw(): void {
    this.type.draw(this.x, this.y);
  }
}

// ============================================================================
// 4. CLIENT (Điều phối hoạt động)
// ============================================================================
class Forest {
  private trees: Tree[] = [];

  public plantTree(
    x: number,
    y: number,
    name: string,
    color: string,
    texture: string
  ): void {
    const type = TreeFactory.getTreeType(name, color, texture);
    const tree = new Tree(x, y, type);
    this.trees.push(tree);
  }

  public draw(): void {
    console.log("\n--- Vẽ toàn bộ khu rừng ---");
    this.trees.forEach((tree) => tree.draw());
  }

  public getTreesCount(): number {
    return this.trees.length;
  }
}

// ============================================================================
// THỬ NGHIỆM CHẠY VÍ DỤ
// ============================================================================
function runExample() {
  console.log("=== CHẠY VÍ DỤ MINH HỌA FLYWEIGHT PATTERN ===\n");

  const forest = new Forest();

  // Giả lập texture đồ họa dung lượng lớn
  const oakTexture = "IMAGE_DATA_OAK_TREE_VERY_HEAVY_PNG_10MB";
  const pineTexture = "IMAGE_DATA_PINE_TREE_VERY_HEAVY_PNG_8MB";

  // Trồng nhiều cây sồi và cây thông
  forest.plantTree(10, 20, "Cây Sồi", "Xanh Thẫm", oakTexture);
  forest.plantTree(15, 35, "Cây Sồi", "Xanh Thẫm", oakTexture); // Cùng loại
  forest.plantTree(50, 80, "Cây Thông", "Xanh Lá Mạ", pineTexture);
  forest.plantTree(100, 120, "Cây Thông", "Xanh Lá Mạ", pineTexture); // Cùng loại
  forest.plantTree(12, 45, "Cây Sồi", "Xanh Úa", oakTexture); // Cây sồi màu khác -> loại mới

  // Vẽ rừng
  forest.draw();

  console.log("\n------------------------------------------------");
  console.log(`Tổng số cây được trồng: ${forest.getTreesCount()}`);
  console.log(`Tổng số đối tượng TreeType được tạo ra trong bộ nhớ: ${TreeFactory.getTypesCount()}`);
  console.log("------------------------------------------------\n");
}

runExample();
