// Sinh ảnh PNG minh hoạ (sơ đồ UML) cho mọi design pattern.
// Đọc block ```mermaid đầu tiên trong README.md của từng pattern,
// áp dụng đúng bộ transform cleanMermaidChart của site, rồi render ra
// public/images/{id}.png bằng mermaid-cli (mmdc).
//
// Chạy:  node scripts/generate-images.mjs

import fs from 'fs';
import path from 'path';
import os from 'os';
import { execFileSync } from 'child_process';

const webRoot = process.cwd(); // .../design-pattern-web
const rootDir = path.join(webRoot, '..');
const outDir = path.join(webRoot, 'public', 'images');
const mmdc = path.join(webRoot, 'node_modules', '.bin', 'mmdc');

// Giữ đồng bộ với cleanMermaidChart trong src/components/PatternDetailClient.tsx
function cleanMermaidChart(chartText) {
  let clean = chartText;
  clean = clean.replace(/^\s*([+\-#~])\s*(\w+)\s*:\s*([\w\[\]<>]+)/gm, (m, visibility, name, type) => {
    const cleanType = type.replace(/\[\]/g, 'Array').replace(/[<>]/g, '_');
    return `    ${visibility}${cleanType} ${name}`;
  });
  clean = clean.replace(/\(([^)]+)\)/g, (m, p1) => {
    if (p1.includes('<<') || p1.includes('>>')) return m;
    const params = p1.split(',').map((param) => param.split(':')[0].trim());
    return `(${params.join(', ')})`;
  });
  clean = clean.replace(/^\s*([+\-#~])\s*(\w+)\(([^)]*)\)\s+(\w+)/gm, (m, visibility, name, params, returnType) => {
    return `    ${visibility}${returnType} ${name}(${params})`;
  });
  return clean;
}

function extractMermaid(readme) {
  const match = readme.match(/```mermaid\s*\n([\s\S]*?)```/);
  return match ? match[1].trim() : null;
}

// Cấu hình puppeteer (no-sandbox cho môi trường CI/headless)
const puppeteerCfg = path.join(os.tmpdir(), 'mmdc-puppeteer.json');
fs.writeFileSync(puppeteerCfg, JSON.stringify({ args: ['--no-sandbox'] }));

fs.mkdirSync(outDir, { recursive: true });

const patternRegex = /^(\d{2})-([CSB])-(.*-pattern)$/;
const dirs = fs.readdirSync(rootDir).filter((f) => {
  return patternRegex.test(f) && fs.statSync(path.join(rootDir, f)).isDirectory();
});

let ok = 0;
let skipped = 0;
let failed = 0;

for (const id of dirs.sort()) {
  const readmePath = path.join(rootDir, id, 'README.md');
  if (!fs.existsSync(readmePath)) { skipped++; continue; }

  const chart = extractMermaid(fs.readFileSync(readmePath, 'utf8'));
  if (!chart) {
    console.log(`SKIP  ${id} (không có block mermaid)`);
    skipped++;
    continue;
  }

  const cleaned = cleanMermaidChart(chart);
  const tmpIn = path.join(os.tmpdir(), `${id}.mmd`);
  fs.writeFileSync(tmpIn, cleaned);
  const outPng = path.join(outDir, `${id}.png`);

  try {
    execFileSync(mmdc, [
      '-i', tmpIn,
      '-o', outPng,
      '-t', 'dark',
      '-b', '#09090b',
      '-s', '2',
      '-p', puppeteerCfg,
    ], { stdio: 'pipe' });
    console.log(`OK    ${id}.png`);
    ok++;
  } catch (err) {
    console.error(`FAIL  ${id}: ${err.stderr ? err.stderr.toString().split('\n')[0] : err.message}`);
    failed++;
  } finally {
    fs.rmSync(tmpIn, { force: true });
  }
}

console.log(`\nXong: ${ok} ảnh, ${skipped} bỏ qua, ${failed} lỗi.`);
process.exit(failed > 0 ? 1 : 0);
