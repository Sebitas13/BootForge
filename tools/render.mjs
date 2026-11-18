import { escapeHtml } from './utils.mjs';
import { icon } from './icons.mjs';

const calloutIcons = {
  tip: 'lightbulb',
  info: 'info',
  warning: 'warning',
  success: 'check',
  danger: 'alert',
};

const calloutLabels = {
  tip: 'Consejo',
  info: 'Nota',
  warning: 'Atención',
  success: 'Buena práctica',
  danger: 'Cuidado',
};

function codeBlock(block, ctx, counter) {
  counter.n += 1;
  const id = `${ctx.lessonId}-code-${counter.n}`;
  const language = block.language || 'html';
  const languageLabel = language === 'bash' ? 'Bash' : language === 'css' ? 'CSS' : language === 'js' ? 'JavaScript' : 'HTML';
  const hasPreview = block.preview !== false && language === 'html';
  const previewHtml = typeof block.preview === 'string' ? block.preview : null;
  const previewJs = block.previewJs || '';
  const previewAttr = [
    previewJs ? `data-preview-js="${Buffer.from(previewJs, 'utf8').toString('base64')}"` : '',
    previewHtml ? `data-preview-html="${Buffer.from(previewHtml, 'utf8').toString('base64')}"` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const actions = hasPreview
    ? `<div class="code-actions">
        <button type="button" class="code-action" data-code-action="copy">${icon('copy')}<span>Copiar</span></button>
        <button type="button" class="code-action" data-code-action="run" aria-expanded="false" aria-controls="preview-${id}">${icon('play')}<span>Probar</span></button>
        <button type="button" class="code-action" data-code-action="edit">${icon('edit')}<span>Editar</span></button>
      </div>`
    : `<div class="code-actions">
        <button type="button" class="code-action" data-code-action="copy">${icon('copy')}<span>Copiar</span></button>
      </div>`;

  return `<figure class="code-example" id="ejemplo-${id}"${previewAttr ? ` ${previewAttr}` : ''}>
  <figcaption class="code-head">
    <span class="code-file"><span class="code-dots" aria-hidden="true"><i></i><i></i><i></i></span><span class="code-lang">${languageLabel}</span>${block.title ? `<span class="code-title">${escapeHtml(block.title)}</span>` : ''}</span>
    ${actions}
  </figcaption>
  <pre class="code-pre" tabindex="0" aria-label="Código de ejemplo: ${escapeHtml(block.title || languageLabel)}"><code class="language-${language}">${escapeHtml(block.code)}</code></pre>
  ${block.note ? `<p class="code-note">${block.note}</p>` : ''}
  ${hasPreview ? `<div class="code-preview" id="preview-${id}" hidden></div>` : ''}
</figure>`;
}

function tableBlock(block) {
  const head = block.head.map((cell) => `<th scope="col">${cell}</th>`).join('');
  const rows = block.rows
    .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`)
    .join('\n      ');
  return `<div class="table-responsive lesson-table">
    <table class="table table-bordered align-middle">
      ${block.caption ? `<caption>${block.caption}</caption>` : ''}
      <thead><tr>${head}</tr></thead>
      <tbody>
      ${rows}
      </tbody>
    </table>
  </div>`;
}

function challengeBlock(block, ctx, counter) {
  const solution = block.solution
    ? `<details class="challenge-solution">
        <summary>Ver una solución</summary>
        ${codeBlock({ ...block.solution, type: 'code' }, ctx, counter)}
      </details>`
    : '';
  const hint = block.hint
    ? `<details class="challenge-hint"><summary>Ver pista</summary><p>${block.hint}</p></details>`
    : '';
  return `<details class="challenge">
    <summary><span class="challenge-kicker">Reto</span><span>${block.title || 'Ponlo en práctica'}</span></summary>
    <div class="challenge-body">
      <div class="challenge-prompt">${block.prompt}</div>
      ${hint}
      ${solution}
    </div>
  </details>`;
}

function stepsBlock(block) {
  return `<ol class="step-list">
    ${block.items
      .map(
        (item, index) => `<li>
      <span class="step-number" aria-hidden="true">${index + 1}</span>
      <div class="step-content"><h3>${item.title}</h3>${item.html}</div>
    </li>`,
      )
      .join('\n    ')}
  </ol>`;
}

function checklistBlock(block) {
  return `<ul class="checklist">
    ${block.items.map((item) => `<li>${icon('check')}<span>${item}</span></li>`).join('\n    ')}
  </ul>`;
}

export function renderBlocks(blocks, ctx) {
  const counter = { n: 0 };
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'text':
          return `<div class="lesson-text">${block.html}</div>`;
        case 'code':
          return codeBlock(block, ctx, counter);
        case 'tip':
          return `<div class="callout callout-${block.tone || 'tip'}">
  <span class="callout-icon">${icon(calloutIcons[block.tone] || 'lightbulb')}</span>
  <div>
    <p class="callout-title">${block.title || calloutLabels[block.tone] || 'Nota'}</p>
    <div class="callout-body">${block.html}</div>
  </div>
</div>`;
        case 'table':
          return tableBlock(block);
        case 'challenge':
          return challengeBlock(block, ctx, counter);
        case 'steps':
          return stepsBlock(block);
        case 'checklist':
          return checklistBlock(block);
        default:
          throw new Error(`Tipo de bloque desconocido: ${block.type} (${ctx.lessonId})`);
      }
    })
    .join('\n');
}
