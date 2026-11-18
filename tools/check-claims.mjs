import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { site } from '../content/site.mjs';
import { cheatsheet } from '../content/cheatsheet.mjs';
import { finalQuiz } from '../content/final-quiz.mjs';

const root = path.resolve(import.meta.dirname, '..');
const modulesDir = path.join(root, 'content', 'modules');
const moduleFiles = fs
  .readdirSync(modulesDir)
  .filter((file) => file.endsWith('.mjs'))
  .sort();
const modules = await Promise.all(
  moduleFiles.map(async (file) => (await import(pathToFileURL(path.join(modulesDir, file)).href)).default),
);

const lessons = modules.flatMap((module) => module.lessons);
const minutes = lessons.reduce((total, lesson) => total + lesson.minutes, 0);
const codeBlocks = lessons.reduce(
  (total, lesson) =>
    total +
    lesson.blocks.filter((block) => block.type === 'code').length +
    lesson.blocks.filter((block) => block.type === 'challenge' && block.solution).length,
  0,
);
const cheatsheetEntries = cheatsheet.reduce((total, group) => total + group.items.length, 0);
const rootPages = fs.readdirSync(root).filter((file) => file.endsWith('.html')).length;
const lessonPages = fs.readdirSync(path.join(root, 'lecciones')).filter((file) => file.endsWith('.html')).length;
const htmlPages = rootPages + lessonPages;
const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');

const claims = [
  [`${modules.length} módulos`, 'número de módulos'],
  [`${lessons.length} lecciones`, 'número de lecciones'],
  [`${minutes} min`, 'minutos estimados'],
  [`${codeBlocks} bloques`, 'bloques de código'],
  [`${cheatsheetEntries} clases`, 'entradas de la cheatsheet'],
  [`${finalQuiz.length} preguntas`, 'preguntas del quiz final'],
  [`${htmlPages} páginas`, 'páginas HTML'],
];

const errors = claims.filter(([text]) => !readme.includes(text)).map(([text, label]) => `${label}: falta «${text}» en README.md`);

const manifest = JSON.parse(fs.readFileSync(path.join(root, 'site.webmanifest'), 'utf8'));
const lessonClaim = `${lessons.length} lecciones`;
if (!site.description.includes(lessonClaim)) {
  errors.push(`content/site.mjs: la descripción debe incluir «${lessonClaim}»`);
}
if (!manifest.description.includes(lessonClaim)) {
  errors.push(`site.webmanifest: la descripción debe incluir «${lessonClaim}»`);
}

if (errors.length) {
  console.error('Las cifras del README no coinciden con el contenido:');
  for (const error of errors) console.error(`  - ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `OK: README coincide (${modules.length} módulos, ${lessons.length} lecciones, ${minutes} min, ${codeBlocks} bloques, ${cheatsheetEntries} clases, ${finalQuiz.length} preguntas, ${htmlPages} páginas).`,
  );
}
