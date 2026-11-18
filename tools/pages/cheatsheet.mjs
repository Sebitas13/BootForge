import { site } from '../../content/site.mjs';
import { cheatsheet } from '../../content/cheatsheet.mjs';
import { icon } from '../icons.mjs';
import { escapeAttr, escapeHtml } from '../utils.mjs';
import { pageShell } from '../templates.mjs';

export function cheatsheetPage() {
  const total = cheatsheet.reduce((count, group) => count + group.items.length, 0);
  const cards = cheatsheet
    .flatMap((group) =>
      group.items.map(
        (item) => `<article class="cheat-card" data-category="${escapeAttr(group.category)}" data-search="${escapeAttr(
          `${group.category} ${item.code} ${item.description}`.toLowerCase(),
        )}">
      <span class="cheat-category">${escapeHtml(group.category)}</span>
      <div class="cheat-code-row">
        <code class="cheat-code">${escapeHtml(item.code)}</code>
        <button class="cheat-copy" type="button" data-copy="${escapeAttr(item.code)}" aria-label="Copiar ${escapeAttr(
          item.code,
        )}" title="Copiar clase">${icon('copy')}</button>
      </div>
      <p class="cheat-description">${escapeHtml(item.description)}</p>
    </article>`,
      ),
      )
    .join('\n');

  const chips = `<button class="filter-chip active" type="button" data-filter="all" aria-pressed="true">Todas</button>
    ${cheatsheet
      .map(
        (group) =>
          `<button class="filter-chip" type="button" data-filter="${escapeAttr(group.category)}" aria-pressed="false">${escapeHtml(
            group.category,
          )}</button>`,
      )
      .join('\n    ')}`;

  const content = `<section class="page-hero">
  <div class="container">
    <p class="eyebrow">${icon('list')} Referencia rápida</p>
    <h1>Cheatsheet de Bootstrap 5</h1>
    <p class="page-lead">${total} clases y patrones que usarás una y otra vez. Busca, filtra por categoría y copia con un clic.</p>
  </div>
</section>

<section class="section pt-0">
  <div class="container">
    <div class="cheatsheet-toolbar">
      <div class="search-input-wrap">
        ${icon('search')}
        <label class="visually-hidden" for="cheatSearch">Buscar en la cheatsheet</label>
        <input type="search" class="form-control" id="cheatSearch" placeholder="Busca una clase o concepto..." autocomplete="off" spellcheck="false">
      </div>
      <div class="filter-chips" role="group" aria-label="Filtrar por categoría">
        ${chips}
      </div>
    </div>
    <p class="cheat-status" id="cheatStatus" aria-live="polite">${total} clases disponibles.</p>
    <div class="cheat-grid" id="cheatGrid">
      ${cards}
    </div>
    <p class="search-empty" id="cheatEmpty" hidden>No encontramos coincidencias. Prueba con otra clase o categoría.</p>
  </div>
</section>`;

  return pageShell({
    title: 'Cheatsheet de Bootstrap 5 — BootForge',
    description: `Referencia rápida de Bootstrap 5: ${total} clases de layout, componentes, formularios, utilidades y más, con búsqueda y copia.`,
    canonical: `${site.url}cheatsheet.html`,
    active: 'cheatsheet',
    content,
    mainClass: 'cheatsheet-page',
    scripts: ['assets/js/cheatsheet.js'],
  });
}
