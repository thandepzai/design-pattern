/**
 * ============================================================================
 * VÍ DỤ MINH HỌA: INTERPRETER PATTERN
 * Thư mục: 15-B-Interpreter-pattern/index.ts
 *
 * Ngữ cảnh: Bộ đánh giá biểu thức toán học (Math Expression Evaluator).
 * - Context: Map<string, number> (Lưu giá trị của các biến như x = 10, y = 5).
 * - Abstract Expression: Expression (interpret)
 * - Terminal Expression: NumberExpression (số cụ thể), VariableExpression (tên biến).
 * - Non-terminal Expressions: AddExpression (phép cộng), SubtractExpression (phép trừ).
 * ============================================================================
 */

// ============================================================================
// 1. ABSTRACT EXPRESSION
// ============================================================================
interface Expression {
  interpret(context: Map<string, number>): number;
}

// ============================================================================
// 2. TERMINAL EXPRESSIONS
// ============================================================================
class NumberExpression implements Expression {
  constructor(private value: number) {}

  public interpret(context: Map<string, number>): number {
    return this.value;
  }
}

class VariableExpression implements Expression {
  constructor(private name: string) {}

  public interpret(context: Map<string, number>): number {
    return context.get(this.name) || 0;
  }
}

// ============================================================================
// 3. NON-TERMINAL EXPRESSIONS (Biểu thức chứa biểu thức con)
// ============================================================================
class AddExpression implements Expression {
  constructor(
    private left: Expression,
    private right: Expression
  ) {}

  public interpret(context: Map<string, number>): number {
    return this.left.interpret(context) + this.right.interpret(context);
  }
}

class SubtractExpression implements Expression {
  constructor(
    private left: Expression,
    private right: Expression
  ) {}

  public interpret(context: Map<string, number>): number {
    return this.left.interpret(context) - this.right.interpret(context);
  }
}

// ============================================================================
// THỬ NGHIỆM CHẠY VÍ DỤ
// ============================================================================
function runExample() {
  console.log("=== CHẠY VÍ DỤ MINH HỌA INTERPRETER PATTERN ===\n");

  // Ngữ cảnh lưu giá trị các biến số
  const context = new Map<string, number>([
    ["x", 15],
    ["y", 10],
    ["z", 5],
  ]);

  console.log(`Ngữ cảnh biến số: x = 15, y = 10, z = 5`);

  // Xây dựng cây biểu thức đại diện cho công thức: (x - y) + (z - 2)
  // Phân tích cây AST:
  //          Add
  //         /   \
  //    Subtract  Subtract
  //     /   \     /    \
  //    x     y   z      2

  const leftSub = new SubtractExpression(
    new VariableExpression("x"),
    new VariableExpression("y")
  ); // x - y = 5

  const rightSub = new SubtractExpression(
    new VariableExpression("z"),
    new NumberExpression(2)
  ); // z - 2 = 3

  const rootExpression = new AddExpression(leftSub, rightSub); // 5 + 3 = 8

  // Thực hiện thông dịch cây biểu thức
  const result = rootExpression.interpret(context);

  console.log(`Biểu thức: (x - y) + (z - 2)`);
  console.log(`Kết quả tính toán: ${result} (Kỳ vọng: 8)`);
}

runExample();
