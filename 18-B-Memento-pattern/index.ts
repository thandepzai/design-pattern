/**
 * ============================================================================
 * VÍ DỤ MINH HỌA: MEMENTO PATTERN
 * Thư mục: 18-B-Memento-pattern/index.ts
 *
 * Ngữ cảnh: Text Editor với tính năng Undo/Redo — mỗi lần gõ thêm text
 * hoặc xóa text, trình soạn thảo lưu snapshot trạng thái. Người dùng có thể
 * undo về các trạng thái trước hoặc redo để tiến lên trạng thái sau.
 * ============================================================================
 */

// ============================================================================
// 1. MEMENTO — Snapshot bất biến của trạng thái editor
// ============================================================================
class TextEditorMemento {
  private readonly content: string;
  private readonly cursorPosition: number;
  private readonly timestamp: Date;

  constructor(content: string, cursorPosition: number) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.timestamp = new Date();
  }

  public getContent(): string {
    return this.content;
  }

  public getCursorPosition(): number {
    return this.cursorPosition;
  }

  public getTimestamp(): string {
    return this.timestamp.toLocaleTimeString("vi-VN");
  }
}

// ============================================================================
// 2. ORIGINATOR — Text Editor (đối tượng có state cần lưu)
// ============================================================================
class TextEditor {
  private content: string = "";
  private cursorPosition: number = 0;

  public type(text: string): void {
    const before = this.content.slice(0, this.cursorPosition);
    const after = this.content.slice(this.cursorPosition);
    this.content = before + text + after;
    this.cursorPosition += text.length;
    console.log(`  [Editor] Gõ "${text}" -> Nội dung: "${this.content}" (cursor: ${this.cursorPosition})`);
  }

  public delete(count: number): void {
    if (this.cursorPosition === 0) return;
    const deleteCount = Math.min(count, this.cursorPosition);
    const before = this.content.slice(0, this.cursorPosition - deleteCount);
    const after = this.content.slice(this.cursorPosition);
    this.content = before + after;
    this.cursorPosition -= deleteCount;
    console.log(`  [Editor] Xóa ${deleteCount} ký tự -> Nội dung: "${this.content}" (cursor: ${this.cursorPosition})`);
  }

  public moveCursor(position: number): void {
    this.cursorPosition = Math.max(0, Math.min(position, this.content.length));
    console.log(`  [Editor] Di chuyển cursor đến vị trí ${this.cursorPosition}`);
  }

  public save(): TextEditorMemento {
    console.log(`  [Editor] Lưu snapshot: "${this.content}"`);
    return new TextEditorMemento(this.content, this.cursorPosition);
  }

  public restore(memento: TextEditorMemento): void {
    this.content = memento.getContent();
    this.cursorPosition = memento.getCursorPosition();
    console.log(`  [Editor] Khôi phục snapshot: "${this.content}" (cursor: ${this.cursorPosition})`);
  }

  public getContent(): string {
    return this.content;
  }

  public getCursorPosition(): number {
    return this.cursorPosition;
  }
}

// ============================================================================
// 3. CARETAKER — Quản lý lịch sử undo/redo
// ============================================================================
class EditorHistory {
  private undoStack: TextEditorMemento[] = [];
  private redoStack: TextEditorMemento[] = [];

  public saveState(memento: TextEditorMemento): void {
    this.undoStack.push(memento);
    this.redoStack = [];
  }

  public undo(editor: TextEditor): boolean {
    if (this.undoStack.length === 0) {
      console.log("  [History] Không có trạng thái nào để undo.");
      return false;
    }
    const currentState = editor.save();
    this.redoStack.push(currentState);

    const previousState = this.undoStack.pop()!;
    editor.restore(previousState);
    console.log(`  [History] Undo thành công. Còn lại ${this.undoStack.length} bước có thể undo.`);
    return true;
  }

  public redo(editor: TextEditor): boolean {
    if (this.redoStack.length === 0) {
      console.log("  [History] Không có trạng thái nào để redo.");
      return false;
    }
    const currentState = editor.save();
    this.undoStack.push(currentState);

    const nextState = this.redoStack.pop()!;
    editor.restore(nextState);
    console.log(`  [History] Redo thành công. Còn lại ${this.redoStack.length} bước có thể redo.`);
    return true;
  }

  public getUndoCount(): number {
    return this.undoStack.length;
  }

  public getRedoCount(): number {
    return this.redoStack.length;
  }
}

// ============================================================================
// THỬ NGHIỆM CHẠY VÍ DỤ
// ============================================================================
function runExample(): void {
  console.log("=== CHẠY VÍ DỤ MINH HỌA MEMENTO PATTERN ===\n");

  const editor = new TextEditor();
  const history = new EditorHistory();

  console.log("--- Gõ văn bản và lưu các snapshot ---");
  history.saveState(editor.save());

  editor.type("Xin chào");
  history.saveState(editor.save());

  editor.type(" thế giới");
  history.saveState(editor.save());

  editor.type("!");
  history.saveState(editor.save());

  console.log(`\nNội dung hiện tại: "${editor.getContent()}"`);
  console.log(`Có thể undo: ${history.getUndoCount()} lần\n`);

  console.log("--- Undo 2 lần ---");
  history.undo(editor);
  console.log(`  => Hiện tại: "${editor.getContent()}"\n`);

  history.undo(editor);
  console.log(`  => Hiện tại: "${editor.getContent()}"\n`);

  console.log("--- Redo 1 lần ---");
  history.redo(editor);
  console.log(`  => Hiện tại: "${editor.getContent()}"\n`);

  console.log("--- Gõ thêm (xóa redo history) ---");
  editor.type(" Việt Nam");
  history.saveState(editor.save());
  console.log(`  => Hiện tại: "${editor.getContent()}"`);
  console.log(`  Có thể redo: ${history.getRedoCount()} lần (redo history bị xóa)\n`);

  console.log("--- Thử redo khi không còn history ---");
  history.redo(editor);

  console.log("\n--- Undo về trạng thái rỗng ban đầu ---");
  while (history.getUndoCount() > 0) {
    history.undo(editor);
  }
  console.log(`\nNội dung cuối: "${editor.getContent()}"`);
}

runExample();
