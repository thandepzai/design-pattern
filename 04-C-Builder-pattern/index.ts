/**
 * 04-C-Builder-pattern/index.ts
 * Mô phỏng bộ dựng câu lệnh truy vấn cơ sở dữ liệu động (SQL Query Builder).
 */

// ==========================================
// 1. PRODUCT (Sản phẩm cuối cùng - Thường là bất biến)
// ==========================================
export class SqlQuery {
  private readonly fields: string[];
  private readonly table: string;
  private readonly conditions: string[];
  private readonly orderByField: string | null;
  private readonly orderDirection: "ASC" | "DESC";
  private readonly limitCount: number | null;

  constructor(builder: SqlQueryBuilder) {
    this.fields = builder.fields;
    this.table = builder.table;
    this.conditions = builder.conditions;
    this.orderByField = builder.orderByField;
    this.orderDirection = builder.orderDirection;
    this.limitCount = builder.limitCount;
  }

  /**
   * Biên dịch cấu hình thành chuỗi SQL hoàn chỉnh.
   */
  public toSqlString(): string {
    const selectClause = `SELECT ${this.fields.length > 0 ? this.fields.join(", ") : "*"}`;
    const fromClause = `FROM ${this.table}`;

    let sql = `${selectClause} ${fromClause}`;

    if (this.conditions.length > 0) {
      sql += ` WHERE ${this.conditions.join(" AND ")}`;
    }

    if (this.orderByField) {
      sql += ` ORDER BY ${this.orderByField} ${this.orderDirection}`;
    }

    if (this.limitCount !== null) {
      sql += ` LIMIT ${this.limitCount}`;
    }

    return sql + ";";
  }
}

// ==========================================
// 2. BUILDER (Lớp dựng đối tượng)
// ==========================================
export class SqlQueryBuilder {
  public fields: string[] = [];
  public table!: string;
  public conditions: string[] = [];
  public orderByField: string | null = null;
  public orderDirection: "ASC" | "DESC" = "ASC";
  public limitCount: number | null = null;

  /**
   * Chọn các trường cần lấy dữ liệu.
   */
  public select(fields: string | string[]): this {
    if (Array.isArray(fields)) {
      this.fields.push(...fields);
    } else {
      this.fields.push(fields);
    }
    return this; // Trả về `this` để tạo tính năng Method Chaining
  }

  /**
   * Chọn bảng cần truy vấn.
   */
  public from(table: string): this {
    this.table = table;
    return this;
  }

  /**
   * Thêm điều kiện lọc WHERE.
   */
  public where(condition: string): this {
    this.conditions.push(condition);
    return this;
  }

  /**
   * Sắp xếp kết quả.
   */
  public orderBy(field: string, direction: "ASC" | "DESC" = "ASC"): this {
    this.orderByField = field;
    this.orderDirection = direction;
    return this;
  }

  /**
   * Giới hạn số lượng bản ghi trả về.
   */
  public limit(count: number): this {
    if (count <= 0) {
      throw new Error("Mức giới hạn bản ghi (limit) phải lớn hơn 0.");
    }
    this.limitCount = count;
    return this;
  }

  /**
   * Kiểm tra tính hợp lệ và xuất câu truy vấn SqlQuery.
   */
  public build(): SqlQuery {
    if (!this.table) {
      throw new Error(
        "Lỗi cú pháp: Truy vấn SQL bắt buộc phải có bảng dữ liệu mục tiêu (FROM).",
      );
    }
    return new SqlQuery(this);
  }
}

// ==========================================
// CLIENT CODE (Mô phỏng sử dụng trong thực tế)
// ==========================================
async function runApplication() {
  console.log(
    "🚀 KHỞI ĐỘNG HỆ THỐNG PHÁT SINH TRUY VẤN DỮ LIỆU SQL DỰNG SẴN 🚀\n",
  );

  // Kịch bản 1: Truy vấn danh sách người dùng đang hoạt động
  console.log(">>> [Truy vấn 1] Lấy danh sách admin đang hoạt động:");
  const query1 = new SqlQueryBuilder()
    .select(["id", "username", "email"])
    .from("users")
    .where("status = 'active'")
    .where("role = 'admin'")
    .orderBy("created_at", "DESC")
    .limit(10)
    .build();

  console.log(`\x1b[32m  SQL Output: ${query1.toSqlString()}\x1b[0m\n`);

  // Kịch bản 2: Truy vấn thống kê sản phẩm tồn kho thấp
  console.log(">>> [Truy vấn 2] Lấy các sản phẩm sắp hết hàng:");
  const query2 = new SqlQueryBuilder()
    .select("product_name")
    .select("stock")
    .select("price")
    .from("products")
    .where("stock < 5")
    .build();

  console.log(`\x1b[32m  SQL Output: ${query2.toSqlString()}\x1b[0m\n`);

  // Kịch bản 3: Xử lý lỗi khi build truy vấn thiếu bảng FROM
  console.log(
    ">>> [Truy vấn 3] Thử nghiệm build thiếu thông tin bảng mục tiêu (FROM):",
  );
  try {
    const invalidQuery = new SqlQueryBuilder()
      .select("title")
      .where("views > 1000")
      .build();

    console.log(invalidQuery.toSqlString());
  } catch (error: any) {
    console.log(`\x1b[31m  [LỖI PHÁT HIỆN]: ${error.message}\x1b[0m\n`);
  }
}

runApplication();
