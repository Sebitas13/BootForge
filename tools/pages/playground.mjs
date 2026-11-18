import { site } from '../../content/site.mjs';
import { icon } from '../icons.mjs';
import { pageShell } from '../templates.mjs';

export function playgroundPage() {
  const content = `<section class="page-hero">
  <div class="container">
    <p class="eyebrow">${icon('terminal')} Laboratorio</p>
    <h1>Playground</h1>
    <p class="page-lead">Escribe HTML, CSS y JavaScript, elige una plantilla y mira el resultado al instante. La vista previa corre aislada en un iframe con <code>sandbox</code>.</p>
  </div>
</section>

<section class="section pt-0">
  <div class="container">
    <div class="playground-toolbar">
      <div class="playground-toolbar-group">
        <label class="visually-hidden" for="templateSelect">Plantilla inicial</label>
        <select class="form-select form-select-sm" id="templateSelect">
          <option value="hero">Hero + features</option>
          <option value="card">Card de producto</option>
          <option value="form">Formulario de contacto</option>
          <option value="navbar">Navbar responsive</option>
          <option value="modal">Modal de confirmación</option>
          <option value="blank">Empezar en blanco</option>
        </select>
        <button class="btn btn-brand btn-sm" type="button" id="runPlaygroundBtn">${icon('play')} Ejecutar</button>
        <button class="btn btn-outline-secondary btn-sm" type="button" id="resetPlaygroundBtn">${icon('reset')} Reiniciar</button>
      </div>
      <div class="device-switch" role="group" aria-label="Ancho de la vista previa">
        <button class="device-btn active" type="button" data-device="desktop" aria-pressed="true" title="Escritorio" aria-label="Vista de escritorio">${icon('monitor')}</button>
        <button class="device-btn" type="button" data-device="tablet" aria-pressed="false" title="Tablet" aria-label="Vista de tablet">${icon('tablet')}</button>
        <button class="device-btn" type="button" data-device="mobile" aria-pressed="false" title="Móvil" aria-label="Vista de móvil">${icon('phone')}</button>
      </div>
      <div class="playground-toolbar-group">
        <button class="btn btn-outline-secondary btn-sm" type="button" id="copyPlaygroundBtn">${icon('copy')} Copiar HTML</button>
        <button class="btn btn-outline-secondary btn-sm" type="button" id="downloadPlaygroundBtn">${icon('download')} Descargar</button>
      </div>
    </div>

    <div class="playground-shell">
      <div class="playground-editor">
        <div class="editor-tabs" role="tablist" aria-label="Archivos del playground">
          <button class="editor-tab active" type="button" id="htmlTab" role="tab" aria-selected="true" aria-controls="htmlPane" data-editor-tab="html">HTML</button>
          <button class="editor-tab" type="button" id="cssTab" role="tab" aria-selected="false" aria-controls="cssPane" tabindex="-1" data-editor-tab="css">CSS</button>
          <button class="editor-tab" type="button" id="jsTab" role="tab" aria-selected="false" aria-controls="jsPane" tabindex="-1" data-editor-tab="js">JS</button>
        </div>
        <div class="editor-tab-pane active" id="htmlPane" role="tabpanel" aria-labelledby="htmlTab">
          <label class="visually-hidden" for="htmlEditor">Código HTML</label>
          <textarea class="playground-code" id="htmlEditor" spellcheck="false" autocomplete="off" autocapitalize="off" placeholder="Escribe tu HTML aquí..."></textarea>
        </div>
        <div class="editor-tab-pane" id="cssPane" role="tabpanel" aria-labelledby="cssTab" hidden>
          <label class="visually-hidden" for="cssEditor">Código CSS</label>
          <textarea class="playground-code" id="cssEditor" spellcheck="false" autocomplete="off" autocapitalize="off" placeholder="Escribe tu CSS aquí..."></textarea>
        </div>
        <div class="editor-tab-pane" id="jsPane" role="tabpanel" aria-labelledby="jsTab" hidden>
          <label class="visually-hidden" for="jsEditor">Código JavaScript</label>
          <textarea class="playground-code" id="jsEditor" spellcheck="false" autocomplete="off" autocapitalize="off" placeholder="Escribe tu JavaScript aquí..."></textarea>
        </div>
        <div class="playground-status">
          <span id="playgroundStatus">Listo para ejecutar.</span>
          <span id="playgroundStats">HTML · CSS · JS</span>
        </div>
      </div>

      <div class="playground-preview">
        <div class="preview-bar">
          <span>Vista previa</span>
          <div class="d-flex align-items-center gap-1">
            <button class="preview-reload" type="button" id="reloadPreviewBtn">${icon('reset')} Recargar</button>
            <button class="preview-reload" type="button" id="clearConsoleBtn">Limpiar consola</button>
          </div>
        </div>
        <div class="device-frame" id="deviceFrame">
          <iframe id="playgroundPreview" sandbox="allow-scripts allow-forms" title="Vista previa del código del playground"></iframe>
        </div>
        <div class="preview-console" id="playgroundConsole" aria-live="polite"></div>
      </div>
    </div>

    <div class="playground-tips">
      <div class="playground-tip"><strong>Sandbox real</strong> El iframe solo tiene <code>allow-scripts</code>. Tu código no puede leer el DOM del curso ni tu <code>localStorage</code>.</div>
      <div class="playground-tip"><strong>Consola integrada</strong> Los <code>console.log</code>, warnings y errores de tu JS aparecen debajo de la vista previa.</div>
      <div class="playground-tip"><strong>Descarga standalone</strong> “Descargar” genera un HTML con Bootstrap desde CDN y tus estilos listos para abrir en cualquier navegador.</div>
    </div>
  </div>
</section>`;

  return pageShell({
    title: 'Playground — BootForge',
    description:
      'Playground de Bootstrap 5 con HTML, CSS y JavaScript en vivo. Plantillas, vista previa responsive, consola y descarga standalone.',
    canonical: `${site.url}playground.html`,
    active: 'playground',
    content,
    mainClass: 'playground-page',
    scripts: ['assets/js/playground.js'],
  });
}
