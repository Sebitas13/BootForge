import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const entries = [
  'index.html',
  'tutorial.html',
  'playground.html',
  'cheatsheet.html',
  'quiz.html',
  'github-pages.html',
  '404.html',
  'robots.txt',
  'sitemap.xml',
  'site.webmanifest',
  '.nojekyll',
  'lecciones',
  'assets',
];

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const entry of entries) {
  const source = path.join(root, entry);
  if (!fs.existsSync(source)) throw new Error(`Falta ${entry} para empaquetar.`);
  const target = path.join(dist, entry);
  fs.cpSync(source, target, { recursive: true });
}

const bytes = fs.readdirSync(dist, { recursive: true }).reduce((total, file) => {
  const full = path.join(dist, file);
  return fs.statSync(full).isFile() ? total + fs.statSync(full).size : total;
}, 0);

console.log(`Paquete de Pages listo en dist/ (${(bytes / 1024).toFixed(1)} KB).`);
