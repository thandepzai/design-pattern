# BÀI TẬP THỰC HÀNH: MEMENTO PATTERN

## BÀI TẬP 1: Lịch Sử Trạng Thái Nhân Vật Trong Game (Player Checkpoint)

### Ngữ cảnh

Trong một trò chơi nhập vai, nhân vật có các chỉ số: HP (máu), MP (mana), Level và Position (vị trí). Khi người chơi đến một checkpoint quan trọng hoặc trước khi vào dungeon khó, họ muốn lưu trạng thái nhân vật. Nếu sau đó nhân vật chết hoặc bị mất chỉ số quá nhiều, người chơi có thể load lại checkpoint đó.

Hãy áp dụng **Memento Pattern**:
- Tạo class `PlayerMemento` (snapshot) lưu trữ `hp`, `mp`, `level`, `position` — tất cả readonly, không thể thay đổi sau khi tạo.
- Tạo class `Player` (Originator) với các phương thức `save()` (tạo PlayerMemento) và `restore(memento)` (phục hồi trạng thái từ memento). Ghi log khi save và restore.
- Tạo class `GameSaveManager` (Caretaker) với phương thức `saveCheckpoint(memento)` và `loadCheckpoint()` — dùng stack để quản lý nhiều checkpoint.
- Ghi log vào `operationLogs` theo đúng format.

**Log format yêu cầu:**
- Khi lưu checkpoint: `"GAME: Lưu checkpoint - HP:${hp} MP:${mp} Level:${level} Pos:${pos}"`
- Khi khôi phục checkpoint: `"GAME: Khôi phục checkpoint - HP:${hp} MP:${mp} Level:${level} Pos:${pos}"`

---

## BÀI TẬP 2: Configuration Manager Với Rollback

### Ngữ cảnh

Một ứng dụng có hệ thống cấu hình với các thông số: `theme` (giao diện), `language` (ngôn ngữ), và `fontSize` (kích thước chữ). Khi admin thay đổi cấu hình hệ thống, đôi khi thay đổi đó gây ra lỗi hoặc người dùng phàn nàn. Hệ thống cần khả năng rollback về cấu hình trước đó một cách nhanh chóng.

Hãy áp dụng **Memento Pattern**:
- Tạo class `ConfigMemento` (snapshot) lưu `theme`, `language`, `fontSize` — immutable.
- Tạo class `AppConfig` (Originator) quản lý cấu hình hiện tại, có `save()` và `restore(memento)`. Ghi log khi save và restore.
- Tạo class `ConfigManager` (Caretaker) với `snapshot()` (lưu trạng thái hiện tại của config), `rollback(config)` (khôi phục config về snapshot gần nhất) và `hasHistory()`.
- Ghi log vào `operationLogs` theo đúng format.

**Log format yêu cầu:**
- Khi lưu snapshot: `"CONFIG: Lưu snapshot - theme:${theme} lang:${lang} fontSize:${fontSize}"`
- Khi rollback: `"CONFIG: Rollback về - theme:${theme} lang:${lang} fontSize:${fontSize}"`

---

## Hướng dẫn hoàn thành bài tập

1. Mở file `exercises.ts`.
2. Thực hiện các phần có đánh dấu `// TODO`.
3. Chạy lệnh sau trong terminal để kiểm tra kết quả:
   ```bash
   npx tsx 18-B-Memento-pattern/exercises.ts
   ```
4. Đảm bảo tất cả các test case đều hiển thị `[OK]`.
