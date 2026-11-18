import { site } from '../../content/site.mjs';
import { icon } from '../icons.mjs';
import { pageShell } from '../templates.mjs';

export function notFoundPage() {
  const base = new URL(site.url).pathname;
  const content = `<section class="not-found">
  <div class="container">
    <p class="not-found-code" aria-hidden="true">404</p>
    <h1>Esta página no existe.</h1>
    <p>Puede que el enlace esté mal escrito, que la lección se haya movido o que hayas llegado aquí desde un enlace antiguo.</p>
    <div class="d-flex flex-wrap justify-content-center gap-2">
      <a class="btn btn-brand" href="${base}index.html">${icon('arrow-left')} Volver al inicio</a>
      <a class="btn btn-outline-secondary" href="${base}tutorial.html">Ver el curso</a>
      <a class="btn btn-outline-secondary" href="${base}cheatsheet.html">Abrir cheatsheet</a>
    </div>
  </div>
</section>`;

  return pageShell({
    base,
    title: 'Página no encontrada — BootForge',
    description: 'La página que buscas no existe. Vuelve al curso de Bootstrap 5 de BootForge.',
    canonical: null,
    active: '',
    content,
    mainClass: 'not-found-page',
    noindex: true,
  });
}
