import { site } from '../../content/site.mjs';
import { icon, githubIcon } from '../icons.mjs';
import { escapeHtml, jsonLd } from '../utils.mjs';
import { pageShell } from '../templates.mjs';

const showcaseCode = `<div class="card shadow-sm">
  <div class="card-body">
    <span class="badge text-bg-success mb-2">Nuevo</span>
    <h3 class="card-title h5">Tu primer componente</h3>
    <p class="card-text text-body-secondary">
      Código claro, resultado inmediato.
    </p>
    <button class="btn btn-primary btn-sm">Empezar</button>
  </div>
</div>`;

export function landingPage({ modules, totalLessons, totalMinutes, totalExamples }) {
  const timeLabel = totalMinutes >= 60 ? `${Math.round(totalMinutes / 60)} h` : `${totalMinutes} min`;

  const learningResource = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: 'BootForge — Curso interactivo de Bootstrap 5',
    description: site.description,
    url: site.url,
    inLanguage: 'es',
    isAccessibleForFree: true,
    learningResourceType: 'Tutorial',
    teaches: [
      'Sistema de grid y layout responsive',
      'Componentes de Bootstrap 5',
      'Formularios y validación',
      'Accesibilidad y buenas prácticas',
      'Publicación en GitHub Pages',
    ],
    author: { '@type': 'Person', name: site.author, url: site.authorUrl },
    isPartOf: { '@type': 'WebSite', name: 'BootForge', url: site.url },
  };

  const curriculum = `<div class="curriculum-grid">
    ${modules
      .map(
        (module, index) => `<a class="curriculum-item" href="tutorial.html#${module.id}">
      <span class="curriculum-number">${String(index + 1).padStart(2, '0')}</span>
      <span class="curriculum-body">
        <strong>${module.title}</strong>
        <span>${module.lessons.length} lecciones · ${module.lessons.reduce((total, lesson) => total + lesson.minutes, 0)} min</span>
      </span>
      ${icon('arrow-right')}
    </a>`,
      )
      .join('')}
  </div>`;

  const content = `<section class="hero">
  <div class="container">
    <div class="hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">${icon('sparkles')} Curso interactivo · Bootstrap ${site.bootstrapVersion}</p>
        <h1>Aprende Bootstrap 5. <span class="text-gradient">Construyendo de verdad.</span></h1>
        <p class="hero-lead">${totalLessons} lecciones en español, ejemplos que puedes editar en vivo y un proyecto final. Sin instalar nada. Sin cuenta. Sin relleno.</p>
        <div class="hero-actions">
          <a class="btn btn-brand btn-lg" href="tutorial.html">Empezar el curso ${icon('arrow-right')}</a>
          <a class="btn btn-outline-secondary btn-lg" href="playground.html">${icon('terminal')} Abrir playground</a>
        </div>
        <div class="hero-meta">
          <span>${icon('book')} ${totalLessons} lecciones</span>
          <span>${icon('layers')} ${modules.length} módulos</span>
          <span>${icon('clock')} ${timeLabel} de contenido</span>
          <span>${icon('shield')} 100% gratis</span>
          <a class="hero-continue" href="tutorial.html" data-landing-continue data-total="${totalLessons}" hidden>Continuar donde lo dejaste</a>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="window">
          <div class="window-bar">
            <span class="window-dots"><i></i><i></i><i></i></span>
            <span class="window-title">index.html</span>
          </div>
          <div class="window-body">
            <pre class="window-code"><code><span class="tok-comment">&lt;!-- Tu primera sección --&gt;</span>
<span class="tok-tag">&lt;section</span> <span class="tok-attr">class</span>=<span class="tok-str">"container py-5"</span><span class="tok-tag">&gt;</span>
  <span class="tok-tag">&lt;div</span> <span class="tok-attr">class</span>=<span class="tok-str">"row align-items-center"</span><span class="tok-tag">&gt;</span>
    <span class="tok-tag">&lt;div</span> <span class="tok-attr">class</span>=<span class="tok-str">"col-lg-7"</span><span class="tok-tag">&gt;</span>
      <span class="tok-tag">&lt;h1&gt;</span>Hola, mundo<span class="tok-tag">&lt;/h1&gt;</span>
      <span class="tok-tag">&lt;p</span> <span class="tok-attr">class</span>=<span class="tok-str">"lead"</span><span class="tok-tag">&gt;</span>
        Construye algo que se vea bien.
      <span class="tok-tag">&lt;/p&gt;</span>
      <span class="tok-tag">&lt;button</span> <span class="tok-attr">class</span>=<span class="tok-str">"btn btn-primary"</span><span class="tok-tag">&gt;</span>
        Empezar
      <span class="tok-tag">&lt;/button&gt;</span>
    <span class="tok-tag">&lt;/div&gt;</span>
  <span class="tok-tag">&lt;/div&gt;</span>
<span class="tok-tag">&lt;/section&gt;</span></code></pre>
            <div class="window-preview">
              <div class="mini-card">
                <span class="mini-card-badge">Lección 01</span>
                <h3>Hola, mundo</h3>
                <p>Tu primera sección responsive en menos de un minuto.</p>
                <span class="mini-btn">Empezar</span>
              </div>
            </div>
          </div>
        </div>
        <span class="float-chip chip-html">HTML</span>
        <span class="float-chip chip-css">CSS</span>
        <span class="float-chip chip-js">JS</span>
      </div>
    </div>
    <div class="stats-strip">
      <div class="stat"><strong>${totalLessons}</strong><span>lecciones</span></div>
      <div class="stat"><strong>${modules.length}</strong><span>módulos</span></div>
      <div class="stat"><strong>${totalExamples}</strong><span>ejemplos de código</span></div>
      <div class="stat"><strong>0</strong><span>dependencias npm en runtime</span></div>
    </div>
  </div>
</section>

<section class="section" id="por-que">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Por qué BootForge</p>
      <h2>Un curso que se siente como un buen editor.</h2>
      <p class="section-lead">Menos vídeos pasivos y más teclado. Cada concepto viene con código que puedes ejecutar, editar y romper sin miedo.</p>
    </div>
    <div class="feature-grid">
      <article class="feature-card reveal">
        <span class="feature-icon">${icon('code')}</span>
        <h3>Aprende haciendo</h3>
        <p>Cada ejemplo se ejecuta en un iframe aislado. Copia, prueba y edita sin salir de la lección.</p>
      </article>
      <article class="feature-card reveal">
        <span class="feature-icon is-accent">${icon('check')}</span>
        <h3>Progreso que se guarda</h3>
        <p>Marca lecciones como completadas y retómalas después. Todo vive en tu navegador, sin cuentas.</p>
      </article>
      <article class="feature-card reveal">
        <span class="feature-icon is-cyan">${icon('search')}</span>
        <h3>Buscador instantáneo</h3>
        <p>Pulsa <kbd>Ctrl</kbd> + <kbd>K</kbd> y encuentra una clase, un componente o un concepto en segundos.</p>
      </article>
      <article class="feature-card reveal">
        <span class="feature-icon">${icon('palette')}</span>
        <h3>Claro y oscuro</h3>
        <p>El tema sigue tu sistema y se recuerda entre visitas. Contraste cuidado en ambos modos.</p>
      </article>
      <article class="feature-card reveal">
        <span class="feature-icon is-accent">${icon('target')}</span>
        <h3>Retos y quiz</h3>
        <p>Un mini quiz por lección y un examen final de 12 preguntas con explicaciones, no solo una nota.</p>
      </article>
      <article class="feature-card reveal">
        <span class="feature-icon is-cyan">${icon('rocket')}</span>
        <h3>Publicación incluida</h3>
        <p>Termina con una landing real y una guía paso a paso para publicarla en GitHub Pages.</p>
      </article>
    </div>
  </div>
</section>

<section class="section section-muted" id="contenido">
  <div class="container">
    <div class="section-head section-head-split">
      <div>
        <p class="eyebrow">Ruta de aprendizaje</p>
        <h2>${modules.length} módulos. ${totalLessons} lecciones. Cero relleno.</h2>
        <p class="section-lead">Empiezas con el documento HTML y terminas publicando una landing. Cada módulo tiene un objetivo concreto y un quiz para comprobarlo.</p>
      </div>
      <a class="btn btn-outline-secondary" href="tutorial.html">Ver el curso completo ${icon('arrow-right')}</a>
    </div>
    ${curriculum}
    <p class="curriculum-note">${icon('clock')} Tiempo estimado: ${timeLabel} de lectura y práctica. A tu ritmo, sin fechas límite.</p>
  </div>
</section>

<section class="section" id="demo">
  <div class="container">
    <div class="showcase">
      <div>
        <p class="eyebrow">Así se ve una lección</p>
        <h2>Código a la izquierda. Resultado a la derecha.</h2>
        <p class="section-lead">Sin capturas estáticas ni “imagina que esto funciona”. El código y el resultado son reales, y puedes abrir el editor para cambiarlos.</p>
        <ul class="showcase-list">
          <li>${icon('check')} Vista previa dentro de un iframe con <code>sandbox</code>.</li>
          <li>${icon('check')} Consola de errores para tus pruebas.</li>
          <li>${icon('check')} Borradores guardados en tu navegador.</li>
        </ul>
        <a class="btn btn-brand" href="lecciones/cards.html">Ver la lección de cards ${icon('arrow-right')}</a>
      </div>
      <div class="showcase-visual">
        <div class="showcase-code">
          <div class="code-head">
            <span class="code-file"><span class="code-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="code-lang">HTML</span></span>
          </div>
          <pre><code>${escapeHtml(showcaseCode)}</code></pre>
        </div>
        <div class="showcase-result">
          <p class="showcase-result-label">Resultado</p>
          <div class="card shadow-sm">
            <div class="card-body">
              <span class="badge text-bg-success mb-2">Nuevo</span>
              <h3 class="card-title h5">Tu primer componente</h3>
              <p class="card-text text-body-secondary">Código claro, resultado inmediato.</p>
              <button type="button" class="btn btn-primary btn-sm">Empezar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section-muted">
  <div class="container">
    <div class="section-head">
      <p class="eyebrow">Después de cada lección</p>
      <h2>Tres herramientas para seguir practicando.</h2>
      <p class="section-lead">El curso te da la base. Estas páginas te ayudan a convertirla en memoria muscular.</p>
    </div>
    <div class="practice-grid">
      <a class="practice-card" href="playground.html">
        <span class="practice-icon">${icon('terminal')}</span>
        <h3>Playground</h3>
        <p>HTML, CSS y JS en tres paneles, plantillas y consola. Prueba una idea sin crear un proyecto.</p>
        <span class="practice-link">Abrir playground ${icon('arrow-right')}</span>
      </a>
      <a class="practice-card" href="cheatsheet.html">
        <span class="practice-icon">${icon('list')}</span>
        <h3>Cheatsheet</h3>
        <p>Las clases que más se usan, agrupadas y buscables. Copia la que necesites sin recordar la sintaxis.</p>
        <span class="practice-link">Ver cheatsheet ${icon('arrow-right')}</span>
      </a>
      <a class="practice-card" href="quiz.html">
        <span class="practice-icon">${icon('target')}</span>
        <h3>Quiz final</h3>
        <p>12 preguntas, explicación en cada respuesta y revisión al final. Sin temporizador ni presión.</p>
        <span class="practice-link">Empezar quiz ${icon('arrow-right')}</span>
      </a>
    </div>
  </div>
</section>

<section class="section" id="faq">
  <div class="container">
    <div class="row g-5">
      <div class="col-lg-4">
        <p class="eyebrow">Preguntas frecuentes</p>
        <h2>Antes de empezar.</h2>
        <p class="section-lead">Si algo no está claro, abre un issue en GitHub. El curso también mejora con preguntas.</p>
        <a class="btn btn-outline-secondary mt-2" href="${site.repo}/issues" target="_blank" rel="noopener noreferrer">${icon('mail')} Abrir un issue</a>
      </div>
      <div class="col-lg-8">
        <div class="accordion faq" id="faqAccordion">
          <div class="accordion-item">
            <h3 class="accordion-header"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1" aria-expanded="true" aria-controls="faq1">¿Necesito saber JavaScript?</button></h3>
            <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion"><div class="accordion-body">No para empezar. Las primeras lecciones son HTML y CSS. Cuando llegamos a componentes interactivos, Bootstrap se encarga del JavaScript; tú solo añades atributos <code>data-bs-*</code>.</div></div>
          </div>
          <div class="accordion-item">
            <h3 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2" aria-expanded="false" aria-controls="faq2">¿Cuánto tarda el curso?</button></h3>
            <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion"><div class="accordion-body">Alrededor de ${timeLabel} de lectura y práctica. Puedes hacer una lección por día o sentarte una tarde. El progreso se guarda, así que no pierdes dónde ibas.</div></div>
          </div>
          <div class="accordion-item">
            <h3 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3" aria-expanded="false" aria-controls="faq3">¿Es realmente gratis?</button></h3>
            <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion"><div class="accordion-body">Sí. El código está bajo licencia MIT y el sitio no tiene anuncios, cookies ni analytics. Si te sirve, compártelo o abre un issue con una mejora.</div></div>
          </div>
          <div class="accordion-item">
            <h3 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4" aria-expanded="false" aria-controls="faq4">¿Funciona sin conexión?</button></h3>
            <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion"><div class="accordion-body">El sitio carga Bootstrap de forma local, así que una vez descargado puedes navegar sin CDN. Para el editor y el buscador necesitas JavaScript; para leer las lecciones, no.</div></div>
          </div>
          <div class="accordion-item">
            <h3 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq5" aria-expanded="false" aria-controls="faq5">¿Dónde se guarda mi progreso?</button></h3>
            <div id="faq5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion"><div class="accordion-body">En <code>localStorage</code>, dentro de tu navegador. No viaja a ningún servidor y no se comparte entre dispositivos. Puedes borrarlo desde el botón “Reiniciar progreso”.</div></div>
          </div>
          <div class="accordion-item">
            <h3 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq6" aria-expanded="false" aria-controls="faq6">¿Puedo contribuir?</button></h3>
            <div id="faq6" class="accordion-collapse collapse" data-bs-parent="#faqAccordion"><div class="accordion-body">Claro. El contenido vive en archivos de módulo y el sitio se genera con un script de Node sin dependencias. Lee el README y abre un pull request con una lección, una corrección o una mejora de accesibilidad.</div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section pt-0">
  <div class="container">
    <div class="cta-band">
      <p class="eyebrow text-white-50">Empieza hoy</p>
      <h2>Tu próximo proyecto empieza con una clase.</h2>
      <p>No necesitas instalar nada ni crear una cuenta. Abre la primera lección y escribe tu primer componente en menos de cinco minutos.</p>
      <div class="d-flex flex-wrap gap-2 mt-4">
        <a class="btn btn-light btn-lg" href="tutorial.html">Empezar el curso ${icon('arrow-right')}</a>
        <a class="btn btn-outline-light btn-lg" href="${site.repo}" target="_blank" rel="noopener noreferrer">${githubIcon()} Ver en GitHub</a>
      </div>
    </div>
  </div>
</section>`;

  return pageShell({
    title: 'BootForge — Curso interactivo de Bootstrap 5 en español',
    description: site.description,
    canonical: site.url,
    active: 'inicio',
    content,
    mainClass: 'landing-page',
    extraHead: `<script type="application/ld+json">${jsonLd(learningResource)}</script>`,
  });
}
