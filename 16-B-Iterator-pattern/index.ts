/**
 * ============================================================================
 * VÍ DỤ MINH HỌA: ITERATOR PATTERN
 * Thư mục: 16-B-Iterator-pattern/index.ts
 *
 * Ngữ cảnh: Danh sách phát nhạc (Playlist) hỗ trợ 2 chế độ duyệt:
 * - SequentialIterator: Duyệt lần lượt từ bài đầu đến bài cuối.
 * - ShuffleIterator: Duyệt ngẫu nhiên (shuffle), mỗi bài chỉ phát một lần.
 * ============================================================================
 */

// ============================================================================
// 1. ITERATOR INTERFACE
// ============================================================================
interface MusicIterator {
  hasNext(): boolean;
  next(): string;
  reset(): void;
}

// ============================================================================
// 2. ITERABLE INTERFACE
// ============================================================================
interface MusicCollection {
  createIterator(): MusicIterator;
  createShuffleIterator(): MusicIterator;
}

// ============================================================================
// 3. CONCRETE ITERATORS
// ============================================================================

class SequentialIterator implements MusicIterator {
  private index: number = 0;

  constructor(private readonly songs: ReadonlyArray<string>) {}

  public hasNext(): boolean {
    return this.index < this.songs.length;
  }

  public next(): string {
    if (!this.hasNext()) {
      throw new Error("Không còn bài hát nào trong danh sách phát.");
    }
    return this.songs[this.index++];
  }

  public reset(): void {
    this.index = 0;
  }
}

class ShuffleIterator implements MusicIterator {
  private shuffled: string[];
  private index: number = 0;

  constructor(songs: ReadonlyArray<string>) {
    this.shuffled = this.shuffle([...songs]);
  }

  private shuffle(arr: string[]): string[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  public hasNext(): boolean {
    return this.index < this.shuffled.length;
  }

  public next(): string {
    if (!this.hasNext()) {
      throw new Error("Đã phát hết tất cả bài hát ở chế độ ngẫu nhiên.");
    }
    return this.shuffled[this.index++];
  }

  public reset(): void {
    this.shuffled = this.shuffle(this.shuffled);
    this.index = 0;
  }
}

// ============================================================================
// 4. CONCRETE COLLECTION
// ============================================================================
class Playlist implements MusicCollection {
  private readonly songs: string[] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public addSong(song: string): void {
    this.songs.push(song);
  }

  public getName(): string {
    return this.name;
  }

  public createIterator(): MusicIterator {
    return new SequentialIterator(this.songs);
  }

  public createShuffleIterator(): MusicIterator {
    return new ShuffleIterator(this.songs);
  }
}

// ============================================================================
// THỬ NGHIỆM CHẠY VÍ DỤ
// ============================================================================
function runExample(): void {
  console.log("=== CHẠY VÍ DỤ MINH HỌA ITERATOR PATTERN ===\n");

  const playlist = new Playlist("Chill Vibes 2024");
  playlist.addSong("Lofi Hip Hop - Beats to Study");
  playlist.addSong("Rainy Day Jazz");
  playlist.addSong("Acoustic Morning");
  playlist.addSong("Midnight Synthwave");
  playlist.addSong("Coffee Shop Bossa Nova");

  console.log(`Playlist: "${playlist.getName()}"\n`);

  // --- Chế độ phát tuần tự ---
  console.log("▶  Chế độ phát TUẦN TỰ:");
  const seqIterator = playlist.createIterator();
  let order = 1;
  while (seqIterator.hasNext()) {
    console.log(`  ${order++}. ${seqIterator.next()}`);
  }

  console.log();

  // --- Chế độ phát ngẫu nhiên ---
  console.log("🔀  Chế độ phát NGẪU NHIÊN (Shuffle):");
  const shuffleIterator = playlist.createShuffleIterator();
  let shuffleOrder = 1;
  while (shuffleIterator.hasNext()) {
    console.log(`  ${shuffleOrder++}. ${shuffleIterator.next()}`);
  }

  console.log();

  // --- Demo reset và phát lại ---
  console.log("↺  Reset về đầu danh sách (Sequential) và phát 2 bài đầu:");
  seqIterator.reset();
  console.log(`  1. ${seqIterator.next()}`);
  console.log(`  2. ${seqIterator.next()}`);

  console.log("\n--- Kết luận ---");
  console.log("Iterator Pattern cho phép Playlist có nhiều cách duyệt khác nhau");
  console.log("mà không cần thay đổi bất kỳ dòng nào trong class Playlist.");
}

runExample();
