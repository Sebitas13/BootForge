import { site } from '../content/site.mjs';
import { icon, githubIcon } from './icons.mjs';
import { escapeHtml, escapeAttr, jsonLd, formatDate } from './utils.mjs';
import { renderBlocks } from './render.mjs';

const ogImage = `${site.url}assets/img/og-cover.png`;
const assetVersion = `?v=${site.updated.replaceAll('-', '')}`;

export function head({
  base = '',
  title,
  description,
  canonical,
  ogType = 'website',
  extraHead = '',
  noindex = false,
}) {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeAttr(description);
  return `<!DOCTYPE html>
<html lang="es" data-bs-theme="light" data-base="${base}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${safeTitle}</title>
  <meta name="description" content="${safeDescription}">
  ${canonical ? `<link rel="canonical" href="${escapeAttr(canonical)}">` : ''}
  ${noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow">'}
  <meta name="bf-version" content="${site.updated}">
  <meta name="theme-color" content="#0b1020" media="(prefers-color-scheme: dark)">
  <meta name="theme-color" content="#f7f8fc" media="(prefers-color-scheme: light)">
  <meta property="og:type" content="${ogType}">
  <meta property="og:site_name" content="BootForge">
  <meta property="og:locale" content="es_ES">
  <meta property="og:title" content="${safeTitle}">
  <meta property="og:description" content="${safeDescription}">
  ${canonical ? `<meta property="og:url" content="${escapeAttr(canonical)}">` : ''}
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${safeTitle}">
  <meta name="twitter:description" content="${safeDescription}">
  <meta name="twitter:image" content="${ogImage}">
  <link rel="icon" href="${base}assets/img/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="${base}assets/img/icon-192.png">
  <link rel="manifest" href="${base}site.webmanifest">
  <script src="${base}assets/js/theme-init.js${assetVersion}"></script>
  <link rel="stylesheet" href="${base}assets/vendor/bootstrap/bootstrap.min.css${assetVersion}">
  <link rel="stylesheet" href="${base}assets/css/main.css${assetVersion}">
  ${extraHead}
</head>`;
}

export function navbar({ base = '', active = '', showSearch = false }) {
  const link = (key, href, label) =>
    `<li class="nav-item"><a class="nav-link${active === key ? ' active' : ''}" href="${base}${href}"${active === key ? ' aria-current="page"' : ''}>${label}</a></li>`;

  return `<header class="site-header">
  <nav class="navbar navbar-expand-lg navbar-glass" aria-label="Navegación principal">
    <div class="container">
      <a class="navbar-brand" href="${base}index.html" aria-label="BootForge, inicio">
        <img src="${base}assets/img/logo.svg" alt="" width="34" height="34">
        <span class="brand-word">Boot<span>Forge</span></span>
      </a>
      <button class="navbar-toggler navbar-toggler-custom" type="button" data-bs-toggle="collapse" data-bs-target="#siteNav" aria-controls="siteNav" aria-expanded="false" aria-label="Abrir menú de navegación">
        ${icon('menu')}
      </button>
      <div class="collapse navbar-collapse" id="siteNav">
        <ul class="navbar-nav mx-lg-auto mb-2 mb-lg-0">
          ${link('inicio', 'index.html', 'Inicio')}
          ${link('curso', 'tutorial.html', 'Curso')}
          ${link('playground', 'playground.html', 'Playground')}
          ${link('cheatsheet', 'cheatsheet.html', 'Cheatsheet')}
          ${link('quiz', 'quiz.html', 'Quiz')}
          ${link('guia', 'github-pages.html', 'Guía')}
        </ul>
        <div class="nav-actions">
          ${
            showSearch
              ? `<button class="btn btn-icon js-only" type="button" data-bs-toggle="modal" data-bs-target="#searchModal" aria-label="Buscar en el curso" title="Buscar (Ctrl + K)">${icon('search')}</button>`
              : ''
          }
          <a class="btn btn-icon" href="${site.repo}" target="_blank" rel="noopener noreferrer" aria-label="Repositorio en GitHub" title="GitHub">${githubIcon()}</a>
          <button class="btn btn-icon" id="themeToggle" type="button" aria-label="Cambiar a tema oscuro" aria-pressed="false" title="Cambiar tema">
            <span class="theme-icon theme-icon-moon">${icon('moon')}</span>
            <span class="theme-icon theme-icon-sun">${icon('sun')}</span>
          </button>
          <a class="btn btn-brand btn-sm nav-cta" href="${base}tutorial.html">Empezar curso</a>
        </div>
      </div>
    </div>
  </nav>
</header>`;
}

export function footer({ base = '' }) {
  return `<footer class="site-footer">
  <div class="container">
    <div class="row g-4">
      <div class="col-lg-4">
        <a class="footer-brand" href="${base}index.html">
          <img src="${base}assets/img/logo.svg" alt="" width="30" height="30">
          <span>Boot<span>Forge</span></span>
        </a>
        <p class="footer-tagline">Aprende Bootstrap 5 construyendo interfaces reales. Curso gratuito, open source y sin tracking.</p>
        <p class="footer-small">Código bajo licencia ${site.license} · Actualizado el ${formatDate(site.updated)}</p>
      </div>
      <div class="col-6 col-lg-2">
        <h2 class="footer-title">Curso</h2>
        <ul class="footer-links">
          <li><a href="${base}tutorial.html">Todas las lecciones</a></li>
          <li><a href="${base}playground.html">Playground</a></li>
          <li><a href="${base}cheatsheet.html">Cheatsheet</a></li>
          <li><a href="${base}quiz.html">Quiz final</a></li>
        </ul>
      </div>
      <div class="col-6 col-lg-2">
        <h2 class="footer-title">Proyecto</h2>
        <ul class="footer-links">
          <li><a href="${site.repo}" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="${site.repo}/issues" target="_blank" rel="noopener noreferrer">Issues</a></li>
          <li><a href="${site.repo}#readme" target="_blank" rel="noopener noreferrer">README</a></li>
          <li><a href="${site.repo}/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">Licencia MIT</a></li>
        </ul>
      </div>
      <div class="col-12 col-lg-4">
        <h2 class="footer-title">Recursos</h2>
        <ul class="footer-links footer-links-grid">
          <li><a href="https://getbootstrap.com/docs/5.3/" target="_blank" rel="noopener noreferrer">Docs de Bootstrap</a></li>
          <li><a href="https://developer.mozilla.org/es/docs/Web/HTML" target="_blank" rel="noopener noreferrer">HTML en MDN</a></li>
          <li><a href="https://docs.github.com/es/pages" target="_blank" rel="noopener noreferrer">GitHub Pages</a></li>
          <li><a href="https://www.w3.org/WAI/tutorials/" target="_blank" rel="noopener noreferrer">Accesibilidad WAI</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© <span data-year>2026</span> ${site.author}. Hecho con Bootstrap ${site.bootstrapVersion}.</p>
      <p>Sin cookies. Sin analytics. Tu progreso vive en tu navegador.</p>
    </div>
  </div>
</footer>`;
}

export function searchModal() {
  return `<div class="modal fade" id="searchModal" tabindex="-1" aria-labelledby="searchTitle">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content search-modal">
      <div class="modal-header">
        <h2 class="modal-title h5" id="searchTitle">Buscar en el curso</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar búsqueda"></button>
      </div>
      <div class="modal-body">
        <label class="visually-hidden" for="courseSearchInput">Buscar lecciones, componentes o conceptos</label>
        <div class="search-input-wrap">
          ${icon('search')}
          <input type="search" class="form-control form-control-lg" id="courseSearchInput" placeholder="Busca «grid», «modal», «formulario»..." autocomplete="off" spellcheck="false">
        </div>
        <p class="search-hint">Escribe al menos 2 caracteres. Usa <kbd>Ctrl</kbd> + <kbd>K</kbd> desde cualquier lección.</p>
        <p class="search-status" id="searchStatus" aria-live="polite"></p>
        <div class="search-results" id="searchResults"></div>
        <p class="search-empty" id="searchEmpty" hidden>No encontramos resultados. Prueba con otro término.</p>
      </div>
    </div>
  </div>
</div>`;
}

export function resetProgressModal() {
  return `<div class="modal fade" id="resetProgressModal" tabindex="-1" aria-labelledby="resetProgressTitle">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title h5" id="resetProgressTitle">Reiniciar tu progreso</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <p>Se borrarán las lecciones marcadas como completadas y los borradores del editor guardados en este navegador.</p>
        <p class="mb-0">Esta acción no se puede deshacer.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-danger" id="confirmResetBtn">Sí, reiniciar</button>
      </div>
    </div>
  </div>
</div>`;
}

export function toastContainer() {
  return `<div class="toast-container position-fixed bottom-0 end-0 p-3" id="toastContainer" aria-live="polite" aria-atomic="true"></div>`;
}

export function editorModal() {
  return `<div class="modal fade" id="editorModal" tabindex="-1" aria-labelledby="editorTitle">
  <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content editor-modal">
      <div class="modal-header">
        <div>
          <p class="eyebrow mb-1">Editor en vivo</p>
          <h2 class="modal-title h5" id="editorTitle">Editar ejemplo</h2>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar editor"></button>
      </div>
      <div class="modal-body">
        <div class="editor-toolbar">
          <span class="editor-status" id="editorStatus">HTML</span>
          <div class="editor-toolbar-actions">
            <button type="button" class="btn btn-sm btn-outline-secondary" id="editorResetBtn">${icon('reset')} Restablecer</button>
            <button type="button" class="btn btn-sm btn-outline-secondary" id="editorCopyBtn">${icon('copy')} Copiar</button>
            <button type="button" class="btn btn-sm btn-brand" id="editorSaveBtn">${icon('check')} Guardar borrador</button>
          </div>
        </div>
        <div class="editor-grid">
          <div class="editor-pane">
            <label class="visually-hidden" for="editorCode">Código HTML del ejemplo</label>
            <textarea id="editorCode" class="editor-code" spellcheck="false" autocomplete="off" autocapitalize="off"></textarea>
          </div>
          <div class="editor-pane editor-preview-pane">
            <div class="preview-bar">
              <span>Vista previa</span>
              <button type="button" class="preview-reload" id="editorReloadBtn">${icon('reset')} Recargar</button>
            </div>
            <iframe id="editorPreview" sandbox="allow-scripts allow-forms" title="Vista previa del código editado"></iframe>
            <div class="preview-console" id="editorConsole" aria-live="polite"></div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <span class="editor-hint">Los borradores se guardan solo en este navegador.</span>
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>`;
}

export function pageShell({
  base = '',
  title,
  description,
  canonical,
  active = '',
  content,
  mainClass = '',
  scripts = [],
  showSearch = false,
  showReset = false,
  showEditor = false,
  ogType = 'website',
  extraHead = '',
  noindex = false,
}) {
  const extraScripts = scripts
    .map((src) => `<script src="${base}${src}${assetVersion}" defer></script>`)
    .join('\n  ');
  return `${head({ base, title, description, canonical, ogType, extraHead, noindex })}
<body>
  <a class="skip-link" href="#main">Saltar al contenido</a>
  <noscript>
    <div class="noscript-banner" role="status">El contenido y los ejemplos funcionan sin JavaScript, pero el editor, el progreso y el quiz necesitan que lo actives.</div>
  </noscript>
  ${navbar({ base, active, showSearch })}
  <main id="main" class="${mainClass}" tabindex="-1">
${content}
  </main>
  ${footer({ base })}
  ${showSearch ? searchModal() : ''}
  ${showReset ? resetProgressModal() : ''}
  ${showEditor ? editorModal() : ''}
  ${toastContainer()}
  <script src="${base}assets/vendor/bootstrap/bootstrap.bundle.min.js${assetVersion}" defer></script>
  <script src="${base}assets/js/app.js${assetVersion}" defer></script>
  ${extraScripts}
</body>
</html>`;
}

function sidebar(modules, activeId, hrefForLesson, base) {
  return `<aside class="course-sidebar offcanvas-lg offcanvas-start" tabindex="-1" id="courseSidebar" aria-label="Lecciones del curso">
  <div class="offcanvas-header">
    <p class="offcanvas-title h6 mb-0">Contenido del curso</p>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#courseSidebar" aria-label="Cerrar índice"></button>
  </div>
  <div class="offcanvas-body">
    <div class="sidebar-progress">
      <div class="sidebar-progress-head"><span>Tu progreso</span><strong data-progress-text>0%</strong></div>
      <div class="progress" role="progressbar" aria-label="Progreso del curso" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" data-progress-track>
        <div class="progress-bar" data-progress-bar></div>
      </div>
      <p class="sidebar-progress-count" data-progress-count>0 de ${modules.reduce((n, m) => n + m.lessons.length, 0)} lecciones</p>
    </div>
    <nav class="course-nav" aria-label="Lecciones del curso">
      ${modules
        .map(
          (module, moduleIndex) => `<div class="course-group">
        <p class="course-group-title"><span>${String(moduleIndex + 1).padStart(2, '0')}</span>${module.title}</p>
        <ul>
          ${module.lessons
            .map(
              (lesson) => `<li><a class="course-link${lesson.id === activeId ? ' active' : ''}" href="${hrefForLesson(lesson)}"${lesson.id === activeId ? ' aria-current="page"' : ''} data-lesson-link="${lesson.id}">
              <span class="course-link-dot" aria-hidden="true"></span>
              <span class="course-link-title">${lesson.title}</span>
              <span class="course-link-check" aria-hidden="true">${icon('check')}</span>
            </a></li>`,
            )
            .join('')}
        </ul>
      </div>`,
        )
        .join('')}
    </nav>
    <div class="sidebar-footer">
      <a class="btn btn-sm btn-outline-secondary w-100" href="${base}tutorial.html">${icon('layout')} Ver el curso completo</a>
      <button class="btn btn-sm btn-link w-100" type="button" data-bs-toggle="modal" data-bs-target="#resetProgressModal">Reiniciar progreso</button>
    </div>
  </div>
</aside>`;
}

export function lessonPage({ modules, lesson, module, moduleIndex, index, total, prev, next }) {
  const base = '../';
  const canonical = `${site.url}lecciones/${lesson.id}.html`;
  const modifiedIso = site.updated;
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Curso', item: `${site.url}tutorial.html` },
      { '@type': 'ListItem', position: 3, name: module.title, item: `${site.url}tutorial.html#${module.id}` },
      { '@type': 'ListItem', position: 4, name: lesson.title },
    ],
  };
  const lessonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: lesson.title,
    description: lesson.summary,
    learningResourceType: 'Lesson',
    inLanguage: 'es',
    isAccessibleForFree: true,
    teaches: lesson.objectives,
    dateModified: site.updated,
    author: { '@type': 'Person', name: site.author, url: site.authorUrl },
    isPartOf: { '@type': 'Course', name: 'BootForge — Curso de Bootstrap 5', url: site.url },
  };

  const pager = `<nav class="lesson-pager" aria-label="Lecciones anterior y siguiente">
    ${
      prev
        ? `<a class="pager-card pager-prev" href="${prev.id}.html"><span class="pager-label">${icon('arrow-left')} Anterior</span><span class="pager-title">${prev.title}</span></a>`
        : `<span class="pager-card pager-empty" aria-hidden="true"></span>`
    }
    ${
      next
        ? `<a class="pager-card pager-next" href="${next.id}.html"><span class="pager-label">Siguiente ${icon('arrow-right')}</span><span class="pager-title">${next.title}</span></a>`
        : `<a class="pager-card pager-next" href="../quiz.html"><span class="pager-label">Quiz final ${icon('arrow-right')}</span><span class="pager-title">Pon a prueba todo lo aprendido</span></a>`
    }
  </nav>`;

  const quiz = lesson.quiz;
  const quizBlock = `<section class="lesson-quiz js-only" data-quiz data-answer="${quiz.answer}" aria-labelledby="quiz-title">
    <div class="quiz-topline"><span class="eyebrow">Comprueba lo aprendido</span><span class="quiz-badge">1 pregunta</span></div>
    <h2 id="quiz-title">Mini quiz</h2>
    <p class="quiz-question">${escapeHtml(quiz.question)}</p>
    <div class="quiz-options" role="group" aria-labelledby="quiz-title">
      ${quiz.options
        .map(
          (option, i) => `<button type="button" class="quiz-option" data-option="${i}">
        <span class="quiz-letter" aria-hidden="true">${String.fromCharCode(65 + i)}</span>
        <span>${escapeHtml(option)}</span>
      </button>`,
        )
        .join('')}
    </div>
    <p class="quiz-feedback" data-quiz-feedback role="status" aria-live="polite"></p>
    <template class="quiz-explanation">${quiz.explanation}</template>
  </section>`;

  const content = `<div class="container course-layout">
  ${sidebar(modules, lesson.id, (item) => `${item.id}.html`, base)}
  <div class="course-main">
    <div class="lesson-topbar">
      <button class="btn btn-sm btn-outline-secondary d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#courseSidebar" aria-controls="courseSidebar">${icon('menu')} Lecciones</button>
      <nav class="breadcrumb-wrap" aria-label="Migas de pan">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="${base}index.html">Inicio</a></li>
          <li class="breadcrumb-item"><a href="${base}tutorial.html">Curso</a></li>
          <li class="breadcrumb-item"><a href="${base}tutorial.html#${module.id}">${module.title}</a></li>
          <li class="breadcrumb-item active" aria-current="page">${lesson.title}</li>
        </ol>
      </nav>
      <span class="lesson-position">Lección ${index + 1} / ${total}</span>
    </div>

    <article class="lesson" data-lesson-id="${lesson.id}" data-total="${total}">
      <header class="lesson-header">
        <p class="eyebrow">Módulo ${String(moduleIndex + 1).padStart(2, '0')} · ${module.title}</p>
        <h1>${lesson.title}</h1>
        <p class="lesson-summary">${lesson.summary}</p>
        <div class="lesson-meta">
          <span>${icon('clock')} ${lesson.minutes} min</span>
          <span>${icon('graduation')} ${lesson.level}</span>
          <span>${icon('book')} Lección ${index + 1} de ${total}</span>
        </div>
      </header>

      <section class="objectives" aria-labelledby="objetivos-title">
        <div class="objectives-icon">${icon('target')}</div>
        <div>
          <h2 id="objetivos-title">Lo que vas a aprender</h2>
          <ul>${lesson.objectives.map((objective) => `<li>${objective}</li>`).join('')}</ul>
        </div>
      </section>

      <div class="lesson-body">
        ${renderLessonBlocks(lesson, module)}
      </div>

      ${quizBlock}

      <section class="lesson-complete" aria-labelledby="complete-title">
        <div>
          <p class="eyebrow">Progreso</p>
          <h2 id="complete-title">¿Terminaste esta lección?</h2>
          <p>Márcala como completada para actualizar tu progreso. Se guarda solo en este navegador.</p>
        </div>
        <button class="btn btn-brand js-only" type="button" data-complete-btn>Marcar como completada</button>
      </section>

      ${pager}
    </article>
  </div>
</div>`;

  return pageShell({
    base,
    title: `${lesson.title} — BootForge`,
    description: lesson.summary,
    canonical,
    active: 'curso',
    content,
    mainClass: 'course-page',
    scripts: ['assets/js/course.js'],
    showSearch: true,
    showReset: true,
    showEditor: true,
    ogType: 'article',
    extraHead: `<meta property="article:section" content="${escapeAttr(module.title)}">
  <meta property="article:modified_time" content="${modifiedIso}">
  <script type="application/ld+json">${jsonLd(breadcrumbLd)}</script>
  <script type="application/ld+json">${jsonLd(lessonLd)}</script>`,
  });
}

function renderLessonBlocks(lesson, module) {
  return renderBlocks(lesson.blocks, { lessonId: lesson.id, lessonTitle: lesson.title, module });
}

export function tutorialPage({ modules, totalLessons, totalMinutes }) {
  const canonical = `${site.url}tutorial.html`;
  const timeLabel = totalMinutes >= 60 ? `${Math.round(totalMinutes / 60)} h` : `${totalMinutes} min`;
  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Curso de Bootstrap 5 — BootForge',
    description: site.description,
    url: canonical,
    inLanguage: 'es',
    isPartOf: { '@type': 'WebSite', name: 'BootForge', url: site.url },
    hasPart: modules.map((module) => ({
      '@type': 'LearningResource',
      name: module.title,
      description: module.description,
      url: `${site.url}tutorial.html#${module.id}`,
      learningResourceType: 'Module',
    })),
  };

  const content = `<section class="course-hero">
  <div class="container">
    <div class="course-hero-grid">
      <div class="course-hero-copy">
        <p class="eyebrow">${icon('sparkles')} Curso completo · Bootstrap ${site.bootstrapVersion}</p>
        <h1>Forja tu dominio de <span class="text-gradient">Bootstrap 5</span>.</h1>
        <p class="lead">${totalLessons} lecciones cortas, ejemplos que puedes editar en vivo y un proyecto final. Sin instalar nada, sin cuenta y sin relleno.</p>
        <div class="hero-actions">
          <a class="btn btn-brand btn-lg" href="lecciones/que-es-bootstrap.html">Empezar por el inicio ${icon('arrow-right')}</a>
          <button class="btn btn-outline-secondary btn-lg js-only" type="button" data-bs-toggle="modal" data-bs-target="#searchModal">${icon('search')} Buscar una lección</button>
        </div>
        <div class="hero-meta">
          <span>${icon('book')} ${totalLessons} lecciones</span>
          <span>${icon('layers')} ${modules.length} módulos</span>
          <span>${icon('clock')} ${timeLabel} de contenido</span>
          <span>${icon('shield')} 100% gratis</span>
        </div>
      </div>
      <aside class="course-progress-card" aria-labelledby="tu-progreso-title">
        <p class="eyebrow">Tu progreso</p>
        <h2 id="tu-progreso-title" class="h3">Construye tu racha</h2>
        <p class="progress-big" data-progress-text>0%</p>
        <div class="progress" role="progressbar" aria-label="Progreso del curso" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" data-progress-track>
          <div class="progress-bar" data-progress-bar></div>
        </div>
        <p class="progress-caption" data-progress-count>0 de ${totalLessons} lecciones completadas</p>
        <a class="btn btn-outline-primary w-100" href="lecciones/que-es-bootstrap.html" data-continue-link>Empezar la primera lección</a>
        <p class="progress-note">${icon('shield')} Se guarda solo en este navegador. Sin cuentas ni tracking.</p>
      </aside>
    </div>
  </div>
</section>

<section class="section" id="modulos">
  <div class="container">
    <div class="section-head section-head-split">
      <div>
        <p class="eyebrow">Ruta de aprendizaje</p>
        <h2>De cero a una landing publicada</h2>
        <p class="section-lead">Cada módulo termina con un mini quiz. Cada lección tiene código que puedes copiar, probar y editar sin salir de la página.</p>
      </div>
      <a class="btn btn-outline-secondary" href="github-pages.html">${icon('rocket')} Guía de publicación</a>
    </div>
    <div class="module-grid">
      ${modules
        .map((module, moduleIndex) => {
          const moduleMinutes = module.lessons.reduce((total, lesson) => total + lesson.minutes, 0);
          return `<section class="module-card" id="${module.id}" aria-labelledby="module-${module.id}">
        <div class="module-card-top">
          <span class="module-icon">${icon(module.icon)}</span>
          <div>
            <p class="module-number">Módulo ${String(moduleIndex + 1).padStart(2, '0')}</p>
            <h3 id="module-${module.id}">${module.title}</h3>
          </div>
        </div>
        <p class="module-description">${module.description}</p>
        <p class="module-meta">${module.lessons.length} lecciones · ${moduleMinutes} min</p>
        <ol class="module-lessons">
          ${module.lessons
            .map(
              (lesson, lessonIndex) => `<li><a href="lecciones/${lesson.id}.html" data-lesson-link="${lesson.id}">
              <span class="module-lesson-index">${moduleIndex + 1}.${lessonIndex + 1}</span>
              <span class="module-lesson-title">${lesson.title}</span>
              <span class="module-lesson-time">${lesson.minutes} min</span>
            </a></li>`,
            )
            .join('')}
        </ol>
        <a class="module-start" href="lecciones/${module.lessons[0].id}.html">Empezar módulo ${icon('arrow-right')}</a>
      </section>`;
        })
        .join('')}
    </div>
  </div>
</section>

<section class="section section-muted">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Después del curso</p>
      <h2>Sigue practicando</h2>
      <p class="section-lead">Tres herramientas para convertir lo aprendido en músculo.</p>
    </div>
    <div class="practice-grid">
      <a class="practice-card" href="playground.html">
        <span class="practice-icon">${icon('terminal')}</span>
        <h3>Playground</h3>
        <p>Escribe HTML, CSS y JS, elige una plantilla y mira el resultado al instante. Consola de errores incluida.</p>
        <span class="practice-link">Abrir playground ${icon('arrow-right')}</span>
      </a>
      <a class="practice-card" href="cheatsheet.html">
        <span class="practice-icon">${icon('list')}</span>
        <h3>Cheatsheet</h3>
        <p>Las clases que más vas a usar, agrupadas y buscables. Copia la que necesites sin recordar la sintaxis exacta.</p>
        <span class="practice-link">Ver cheatsheet ${icon('arrow-right')}</span>
      </a>
      <a class="practice-card" href="quiz.html">
        <span class="practice-icon">${icon('target')}</span>
        <h3>Quiz final</h3>
        <p>12 preguntas para comprobar qué se quedó. Con explicación en cada respuesta y revisión al final.</p>
        <span class="practice-link">Empezar quiz ${icon('arrow-right')}</span>
      </a>
    </div>
  </div>
</section>`;

  return pageShell({
    title: 'Curso de Bootstrap 5 — BootForge',
    description: `Curso interactivo de Bootstrap 5 en español: ${totalLessons} lecciones, ejemplos editables, retos y proyecto final. Gratis y open source.`,
    canonical,
    active: 'curso',
    content,
    mainClass: 'tutorial-page',
    scripts: ['assets/js/course.js'],
    showSearch: true,
    extraHead: `<script type="application/ld+json">${jsonLd(collectionLd)}</script>`,
  });
}
