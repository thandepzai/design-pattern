import fs from 'fs';
import path from 'path';

export interface PatternItem {
  id: string;
  number: string;
  type: 'C' | 'S' | 'B';
  typeName: string;
  name: string;
  title: string;
  status: 'todo' | 'in-progress' | 'completed';
}

export interface PatternDetail extends PatternItem {
  readme: string;
  exercisesMd: string;
  exercisesCode: string;
  exampleCode: string;
  hasIllustration: boolean;
}

const getRootPath = () => {
  // process.cwd() is /Users/.../design-pattern/design-pattern-web
  return path.join(process.cwd(), '..');
};

const getTypeName = (type: 'C' | 'S' | 'B'): string => {
  switch (type) {
    case 'C': return 'Creational (Khởi tạo)';
    case 'S': return 'Structural (Cấu trúc)';
    case 'B': return 'Behavioral (Hành vi)';
  }
};

export function getPatternsList(): PatternItem[] {
  const rootDir = getRootPath();
  const files = fs.readdirSync(rootDir);
  const patterns: PatternItem[] = [];

  const patternRegex = /^(\d{2})-([CSB])-(.*-pattern)$/;

  for (const file of files) {
    const match = file.match(patternRegex);
    if (!match) continue;

    const fullPath = path.join(rootDir, file);
    if (!fs.statSync(fullPath).isDirectory()) continue;

    const [, number, type, namePart] = match;
    const name = namePart.replace('-pattern', '');

    // Đọc README.md để lấy tiêu đề dòng 1
    let title = name + ' Pattern';
    const readmePath = path.join(fullPath, 'README.md');
    if (fs.existsSync(readmePath)) {
      const firstLine = fs.readFileSync(readmePath, 'utf8').split('\n')[0];
      const readmeTitle = firstLine.replace(/^#\s+/, '').trim();
      // Chỉ dùng README title nếu không phải tên folder thô (vd: "17-B-Mediator-pattern")
      if (readmeTitle && !/^\d{2}-[A-Z]-/.test(readmeTitle)) {
        title = readmeTitle;
      }
    }

    // Đọc exercises.ts để check trạng thái hoàn thành
    let status: 'todo' | 'in-progress' | 'completed' = 'todo';
    const exercisesPath = path.join(fullPath, 'exercises.ts');
    if (fs.existsSync(exercisesPath)) {
      const code = fs.readFileSync(exercisesPath, 'utf8');
      const hasTodo = code.includes('TODO');
      const hasCodeModifications = code.includes('//') && code.length > 500; // Tiêu chí đơn giản
      
      if (!hasTodo) {
        status = 'completed';
      } else if (hasCodeModifications && code.match(/\/\/\s*TODO/g)?.length !== code.match(/TODO/g)?.length) {
        // Đã sửa đổi một phần TODO
        status = 'in-progress';
      } else {
        status = 'todo';
      }
    }

    patterns.push({
      id: file,
      number,
      type: type as 'C' | 'S' | 'B',
      typeName: getTypeName(type as 'C' | 'S' | 'B'),
      name,
      title,
      status
    });
  }

  return patterns.sort((a, b) => parseInt(a.number) - parseInt(b.number));
}

export function getPatternDetail(id: string): PatternDetail | null {
  const rootDir = getRootPath();
  const patternDir = path.join(rootDir, id);

  if (!fs.existsSync(patternDir) || !fs.statSync(patternDir).isDirectory()) {
    return null;
  }

  const list = getPatternsList();
  const basicInfo = list.find(p => p.id === id);
  if (!basicInfo) return null;

  const readmePath = path.join(patternDir, 'README.md');
  const exercisesMdPath = path.join(patternDir, 'EXERCISES.md');
  const exercisesCodePath = path.join(patternDir, 'exercises.ts');
  const exampleCodePath = path.join(patternDir, 'index.ts');

  const readme = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, 'utf8') : '';
  const exercisesMd = fs.existsSync(exercisesMdPath) ? fs.readFileSync(exercisesMdPath, 'utf8') : '';
  const exercisesCode = fs.existsSync(exercisesCodePath) ? fs.readFileSync(exercisesCodePath, 'utf8') : '';
  const exampleCode = fs.existsSync(exampleCodePath) ? fs.readFileSync(exampleCodePath, 'utf8') : '';

  const illustrationPath = path.join(process.cwd(), 'public', 'images', `${id}.png`);
  const hasIllustration = fs.existsSync(illustrationPath);

  return {
    ...basicInfo,
    readme,
    exercisesMd,
    exercisesCode,
    exampleCode,
    hasIllustration
  };
}

export function savePatternExercise(id: string, code: string): boolean {
  const rootDir = getRootPath();
  const exercisesPath = path.join(rootDir, id, 'exercises.ts');

  if (!fs.existsSync(path.dirname(exercisesPath))) {
    return false;
  }

  fs.writeFileSync(exercisesPath, code, 'utf8');
  return true;
}
