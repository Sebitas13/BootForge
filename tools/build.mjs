import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { site } from '../content/site.mjs';
import { finalQuiz } from '../content/final-quiz.mjs';
import { lessonPage, tutorialPage } from './templates.mjs';
import { landingPage } from './pages/landing.mjs';
import { playgroundPage } from './pages/playground.mjs';
import { cheatsheetPage } from './pages/cheatsheet.mjs';
import { quizPage } from './pages/quiz.mjs';
import { guidePage } from './pages/guide.mjs';
import { notFoundPage } from './pages/not-found.mjs';
import { stripHtml } from './utils.mjs';

const root = path.resolve(import.meta.dirname, '..');
const modulesDir = path.join(root, 'content', 'modules');
const lessonsDir = path.join(root, 'lecciones');
const dataDir = path.join(root, 'assets', 'data');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function writeHtml(file, html) {
  fs.writeFileSync(file, html.replace(/[ \t]+$/gm, ''));
}

function loadModules() {
  const files = fs
    .readdirSync(modulesDir)
    .filter((file) => file.endsWith('.mjs'))
    .sort();
  return Promise.all(
    files.map(async (file) => {
      const module = (await import(pathToFileURL(path.join(modulesDir, file)).href)).default;
      return { ...module, source: file };
    }),
  );
}

function validate(modules) {
  const moduleIds = new Set();
  const lessonIds = new Set();
  const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  assert(modules.length > 0, 'No hay módulos para construir.');

  for (const module of modules) {
    assert(slug.test(module.id), `ID de módulo inválido: ${module.id}`);
    assert(!moduleIds.has(module.id), `ID de módulo duplicado: ${module.id}`);
    moduleIds.add(module.id);
    assert(module.title && module.description, `Módulo incompleto: ${module.id}`);
    assert(Array.isArray(module.lessons) && module.lessons.length > 0, `Módulo sin lecciones: ${module.id}`);

    for (const lesson of module.lessons) {
      assert(slug.test(lesson.id), `ID de lección inválido: ${lesson.id}`);
      assert(!lessonIds.has(lesson.id), `ID de lección duplicado: ${lesson.id}`);
      lessonIds.add(lesson.id);
      assert(lesson.title && lesson.summary, `Lección incompleta: ${lesson.id}`);
      assert(Number.isInteger(lesson.minutes) && lesson.minutes > 0, `Minutos inválidos: ${lesson.id}`);
      assert(Array.isArray(lesson.objectives) && lesson.objectives.length >= 2, `Objetivos insuficientes: ${lesson.id}`);
      assert(Array.isArray(lesson.blocks) && lesson.blocks.length >= 2, `Bloques insuficientes: ${lesson.id}`);
      assert(lesson.quiz, `Falta quiz: ${lesson.id}`);
      assert(
        Number.isInteger(lesson.quiz.answer) &&
          lesson.quiz.answer >= 0 &&
          lesson.quiz.answer < lesson.quiz.options.length,
        `Respuesta de quiz inválida: ${lesson.id}`,
      );
      assert(lesson.quiz.options.length >= 3, `Opciones insuficientes: ${lesson.id}`);
    }
  }

  assert(finalQuiz.length >= 10, 'El quiz final necesita al menos 10 preguntas.');
  for (const question of finalQuiz) {
    assert(question.id && question.question && question.explanation, `Pregunta final incompleta: ${question.id || '?'}`);
    assert(Array.isArray(question.options) && question.options.length >= 3, `Opciones insuficientes: ${question.id}`);
    assert(
      Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.options.length,
      `Respuesta final inválida: ${question.id}`,
    );
  }
}

function buildSearchIndex(modules) {
  return {
    generated: site.updated,
    lessons: modules.flatMap((module, moduleIndex) =>
      module.lessons.map((lesson, lessonIndex) => {
        const blockText = lesson.blocks
          .map((block) => {
            const parts = [block.title, block.note, block.html, block.caption, block.prompt, block.hint];
            if (block.type === 'table') {
              parts.push(block.head.join(' '), block.rows.flat().join(' '));
            }
            if (block.type === 'steps' || block.type === 'checklist') {
              parts.push(
                block.items
                  .map((item) => (typeof item === 'string' ? item : `${item.title} ${item.html}`))
                  .join(' '),
              );
            }
            if (block.type === 'challenge' && block.solution) {
              parts.push(block.solution.code);
            }
            if (block.type === 'code') {
              parts.push(block.code, block.preview && typeof block.preview === 'string' ? block.preview : '');
            }
            return parts.filter(Boolean).join(' ');
          })
          .join(' ');
        return {
          id: lesson.id,
          title: lesson.title,
          module: module.title,
          moduleId: module.id,
          moduleIndex,
          lessonIndex,
          minutes: lesson.minutes,
          summary: lesson.summary,
          text: stripHtml(`${lesson.summary} ${lesson.objectives.join(' ')} ${blockText}`).slice(0, 2400),
          url: `lecciones/${lesson.id}.html`,
        };
      }),
    ),
  };
}

function buildSitemap(lessons) {
  const paths = [
    '',
    'tutorial.html',
    'playground.html',
    'cheatsheet.html',
    'quiz.html',
    'github-pages.html',
    ...lessons.map((item) => `lecciones/${item.lesson.id}.html`),
  ];
  const urls = paths
    .map(
      (item) => `  <url>
    <loc>${new URL(item, site.url).href}</loc>
    <lastmod>${site.updated}</lastmod>
    <changefreq>${item === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${item === '' ? '1.0' : item === 'tutorial.html' ? '0.9' : '0.8'}</priority>
  </url>`,
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

async function main() {
  const modules = await loadModules();
  validate(modules);

  const lessons = modules.flatMap((module, moduleIndex) =>
    module.lessons.map((lesson, lessonIndex) => ({ lesson, module, moduleIndex, lessonIndex })),
  );
  const totalMinutes = lessons.reduce((total, item) => total + item.lesson.minutes, 0);
  const totalExamples = lessons.reduce(
    (total, item) =>
      total +
      item.lesson.blocks.filter((block) => block.type === 'code').length +
      item.lesson.blocks.filter((block) => block.type === 'challenge' && block.solution).length,
    0,
  );

  fs.mkdirSync(lessonsDir, { recursive: true });
  fs.mkdirSync(dataDir, { recursive: true });

  lessons.forEach(({ lesson, module, moduleIndex }, index) => {
    const html = lessonPage({
      modules,
      lesson,
      module,
      moduleIndex,
      index,
      total: lessons.length,
      prev: lessons[index - 1]?.lesson,
      next: lessons[index + 1]?.lesson,
    });
    writeHtml(path.join(lessonsDir, `${lesson.id}.html`), html);
  });

  writeHtml(
    path.join(root, 'tutorial.html'),
    tutorialPage({ modules, totalLessons: lessons.length, totalMinutes }),
  );
  writeHtml(
    path.join(root, 'index.html'),
    landingPage({ modules, totalLessons: lessons.length, totalMinutes, totalExamples }),
  );
  writeHtml(path.join(root, 'playground.html'), playgroundPage());
  writeHtml(path.join(root, 'cheatsheet.html'), cheatsheetPage());
  writeHtml(path.join(root, 'quiz.html'), quizPage());
  writeHtml(path.join(root, 'github-pages.html'), guidePage());
  writeHtml(path.join(root, '404.html'), notFoundPage());
  fs.writeFileSync(path.join(dataDir, 'search-index.json'), JSON.stringify(buildSearchIndex(modules), null, 2));
  fs.writeFileSync(path.join(root, 'sitemap.xml'), buildSitemap(lessons));

  console.log(
    `BootForge build: ${modules.length} módulos, ${lessons.length} lecciones, ${totalMinutes} min, ${finalQuiz.length} preguntas finales.`,
  );
}

main().catch((error) => {
  console.error(`\nBuild falló: ${error.message}\n`);
  process.exitCode = 1;
});
