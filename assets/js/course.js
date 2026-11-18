(function () {
  'use strict';

  var base = document.documentElement.getAttribute('data-base') || '';
  var PROGRESS_KEY = 'bootforge:progress:v1';
  var DRAFTS_KEY = 'bootforge:drafts:v1';
  var LAST_KEY = 'bootforge:last';
  var CHECK_ICON =
    '<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>';
  var RELOAD_ICON =
    '<svg class="icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/></svg>';

  var originalCodes = new WeakMap();
  var previewTokens = new Map();
  var editorState = { figure: null, original: '', dirty: false, token: null, debounce: null };

  function readJson(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  function lessonLinks() {
    return Array.prototype.slice.call(document.querySelectorAll('[data-lesson-link]'));
  }

  function getProgress() {
    return readJson(PROGRESS_KEY, {});
  }

  function updateProgressUI() {
    var progress = getProgress();
    var links = lessonLinks();
    var totalNode = document.querySelector('[data-total]');
    var total = links.length || (totalNode ? Number(totalNode.getAttribute('data-total')) : 0) || 24;
    var completed = links.filter(function (link) {
      return Boolean(progress[link.getAttribute('data-lesson-link')]);
    }).length;
    var percent = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;

    document.querySelectorAll('[data-progress-text]').forEach(function (node) {
      node.textContent = percent + '%';
    });
    document.querySelectorAll('[data-progress-count]').forEach(function (node) {
      node.textContent = completed + ' de ' + total + ' lecciones completadas';
    });
    document.querySelectorAll('[data-progress-track]').forEach(function (node) {
      node.setAttribute('aria-valuenow', String(percent));
    });
    document.querySelectorAll('[data-progress-bar]').forEach(function (node) {
      node.style.width = percent + '%';
    });

    links.forEach(function (link) {
      var id = link.getAttribute('data-lesson-link');
      var done = Boolean(progress[id]);
      link.classList.toggle('completed', done);
      var title = link.querySelector('.module-lesson-title');
      var label = title ? title.textContent.trim() : link.textContent.trim();
      link.setAttribute('aria-label', label + (done ? ' — completada' : ''));
    });

    var continueLink = document.querySelector('[data-continue-link]');
    if (continueLink && links.length) {
      var next = null;
      var last = readJson(LAST_KEY, null);
      var lastIndex = -1;
      if (last && last.id) {
        lastIndex = links.findIndex(function (link) {
          return link.getAttribute('data-lesson-link') === last.id;
        });
      }

      if (lastIndex !== -1 && !progress[last.id]) {
        next = links[lastIndex];
      } else {
        var start = lastIndex !== -1 ? lastIndex + 1 : 0;
        for (var i = 0; i < links.length; i += 1) {
          var candidate = links[(start + i) % links.length];
          if (!progress[candidate.getAttribute('data-lesson-link')]) {
            next = candidate;
            break;
          }
        }
      }

      if (!next) {
        next = links[0];
        continueLink.textContent = 'Repasar desde el inicio';
      } else {
        var nextTitle = next.querySelector('.module-lesson-title');
        var nextLabel = nextTitle ? nextTitle.textContent.trim() : next.textContent.trim();
        continueLink.textContent = completed > 0 ? 'Continuar: ' + nextLabel : 'Empezar la primera lección';
      }
      continueLink.href = next.href;
    }
  }

  function saveLastLesson() {
    var article = document.querySelector('[data-lesson-id]');
    if (!article) return;
    var title = document.querySelector('.lesson-header h1');
    var module = document.querySelector('.lesson-header .eyebrow');
    writeJson(LAST_KEY, {
      id: article.getAttribute('data-lesson-id'),
      title: title ? title.textContent.trim() : 'Lección',
      module: module ? module.textContent.trim() : '',
      url: 'lecciones/' + article.getAttribute('data-lesson-id') + '.html',
    });
  }

  function initComplete() {
    var article = document.querySelector('[data-lesson-id]');
    if (!article) return;
    var id = article.getAttribute('data-lesson-id');
    var button = document.querySelector('[data-complete-btn]');

    function render() {
      if (!button) return;
      var done = Boolean(getProgress()[id]);
      button.classList.toggle('is-complete', done);
      button.setAttribute('aria-pressed', String(done));
      button.innerHTML = done ? CHECK_ICON + ' Lección completada' : 'Marcar como completada';
    }

    if (button) {
      button.addEventListener('click', function () {
        var progress = getProgress();
        if (progress[id]) delete progress[id];
        else progress[id] = Date.now();
        writeJson(PROGRESS_KEY, progress);
        render();
        updateProgressUI();
        if (progress[id]) saveLastLesson();
        window.BF.toast(
          progress[id] ? 'Lección completada. ¡Buen trabajo!' : 'Lección marcada como pendiente.',
          progress[id] ? 'success' : 'info',
        );
      });
    }

    document.addEventListener('bf:progressreset', render);
    render();
    saveLastLesson();
  }

  function initReset() {
    var confirm = document.getElementById('confirmResetBtn');
    if (!confirm) return;
    confirm.addEventListener('click', function () {
      try {
        localStorage.removeItem(PROGRESS_KEY);
        localStorage.removeItem(DRAFTS_KEY);
        localStorage.removeItem(LAST_KEY);
      } catch (error) {
        /* Sin almacenamiento no hay nada que borrar. */
      }
      resetDrafts();
      updateProgressUI();
      document.dispatchEvent(new CustomEvent('bf:progressreset'));
      var modalEl = document.getElementById('resetProgressModal');
      if (modalEl && window.bootstrap) {
        var instance = window.bootstrap.Modal.getInstance(modalEl);
        if (instance) instance.hide();
      }
      window.BF.toast('Progreso y borradores reiniciados.', 'info');
    });
  }

  function randomToken() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    return 'bf-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  function decodeBase64Utf8(value) {
    try {
      var binary = atob(value);
      var bytes = new Uint8Array(binary.length);
      for (var i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
      return new TextDecoder().decode(bytes);
    } catch (error) {
      return '';
    }
  }

  function getCode(figure) {
    var code = figure.querySelector('.code-pre code');
    return code ? code.textContent : '';
  }

  function getPreviewHtml(figure) {
    if (figure.classList.contains('has-draft')) return getCode(figure);
    var encoded = figure.getAttribute('data-preview-html');
    return encoded ? decodeBase64Utf8(encoded) : getCode(figure);
  }

  function getPreviewJs(figure) {
    var value = figure.getAttribute('data-preview-js');
    return value ? decodeBase64Utf8(value) : '';
  }

  function buildPreviewDoc(html, js, token) {
    var cssUrl = new URL(base + 'assets/vendor/bootstrap/bootstrap.min.css', window.location.href).href;
    var bootstrapUrl = new URL(base + 'assets/vendor/bootstrap/bootstrap.bundle.min.js', window.location.href).href;
    var baseUrl = new URL(base || './', window.location.href).href;
    var theme = document.documentElement.getAttribute('data-bs-theme') || 'light';
    var instrumentation =
      '<script>' +
      'window.addEventListener("error",function(e){parent.postMessage({token:' +
      JSON.stringify(token) +
      ',type:"error",message:e.message||"Error de script",line:e.lineno||0},"*");});' +
      'window.addEventListener("unhandledrejection",function(e){parent.postMessage({token:' +
      JSON.stringify(token) +
      ',type:"error",message:String(e.reason||"Promesa rechazada")},"*");});' +
      'function __bfFmt(v){if(typeof v==="string")return v;if(v&&v.stack)return v.stack;try{return JSON.stringify(v);}catch(e){return String(v);}}' +
      '["log","info","warn","error"].forEach(function(level){var original=console[level];console[level]=function(){var args=[].slice.call(arguments).map(__bfFmt);parent.postMessage({token:' +
      JSON.stringify(token) +
      ',type:level,message:args.join(" ")},"*");original.apply(console,arguments);};});' +
      '</script>';

    return (
      '<!doctype html><html lang="es" data-bs-theme="' +
      theme +
      '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><base href="' +
      baseUrl +
      '"><link rel="stylesheet" href="' +
      cssUrl +
      '"><style>html,body{min-height:100%;}body{margin:0;padding:1.25rem;background:var(--bs-body-bg);color:var(--bs-body-color);font-family:var(--bs-body-font-family);font-size:var(--bs-body-font-size);line-height:var(--bs-body-line-height);overflow-wrap:break-word;}.bf-empty{color:var(--bs-secondary-color);font-style:italic;}</style>' +
      instrumentation +
      '</head><body>' +
      (html.trim() || '<p class="bf-empty">Escribe algo de HTML para ver el resultado.</p>') +
      '<script src="' +
      bootstrapUrl +
      '"></script>' +
      (js ? '<script>' + js.replace(/<\/script/gi, '<\\/script') + '</script>' : '') +
      '</body></html>'
    );
  }

  function registerPreview(iframe, consoleEl, html, js, previousToken) {
    if (previousToken) previewTokens.delete(previousToken);
    var token = randomToken();
    iframe.srcdoc = buildPreviewDoc(html, js, token);
    if (consoleEl) consoleEl.replaceChildren();
    previewTokens.set(token, { iframe: iframe, consoleEl: consoleEl });
    return token;
  }

  function mountCodePreview(container, figure) {
    container.replaceChildren();
    var bar = document.createElement('div');
    bar.className = 'preview-bar';
    var label = document.createElement('span');
    label.textContent = 'Vista previa';
    var reload = document.createElement('button');
    reload.type = 'button';
    reload.className = 'preview-reload';
    reload.innerHTML = RELOAD_ICON + ' Recargar';
    bar.append(label, reload);

    var iframe = document.createElement('iframe');
    iframe.setAttribute('sandbox', 'allow-scripts allow-forms');
    iframe.setAttribute('title', 'Vista previa del ejemplo');
    iframe.setAttribute('loading', 'lazy');

    var consoleEl = document.createElement('div');
    consoleEl.className = 'preview-console';
    consoleEl.setAttribute('aria-live', 'polite');

    container.append(bar, iframe, consoleEl);
    var html = getPreviewHtml(figure);
    var js = getPreviewJs(figure);
    var token = registerPreview(iframe, consoleEl, html, js, container.getAttribute('data-token'));
    container.setAttribute('data-token', token);

    reload.addEventListener('click', function () {
      token = registerPreview(iframe, consoleEl, html, js, container.getAttribute('data-token'));
      container.setAttribute('data-token', token);
    });
  }

  function addDraftBadge(figure) {
    var file = figure.querySelector('.code-file');
    if (!file || file.querySelector('.draft-badge')) return;
    var badge = document.createElement('span');
    badge.className = 'draft-badge';
    badge.textContent = 'borrador';
    file.append(badge);
  }

  function removeDraftBadge(figure) {
    var badge = figure.querySelector('.draft-badge');
    if (badge) badge.remove();
  }

  function applyDrafts() {
    var drafts = readJson(DRAFTS_KEY, {});
    document.querySelectorAll('.code-example').forEach(function (figure) {
      var code = figure.querySelector('.code-pre code');
      if (!code) return;
      originalCodes.set(figure, code.textContent);
      if (typeof drafts[figure.id] === 'string') {
        code.textContent = drafts[figure.id];
        figure.classList.add('has-draft');
        addDraftBadge(figure);
      }
    });
  }

  function resetDrafts() {
    document.querySelectorAll('.code-example').forEach(function (figure) {
      var code = figure.querySelector('.code-pre code');
      var original = originalCodes.get(figure);
      if (code && typeof original === 'string') code.textContent = original;
      figure.classList.remove('has-draft');
      removeDraftBadge(figure);
    });
    writeJson(DRAFTS_KEY, {});
    if (editorState.figure) editorState.figure = null;
  }

  function initCodeExamples() {
    applyDrafts();

    document.addEventListener('click', function (event) {
      var button = event.target.closest('[data-code-action]');
      if (!button) return;
      var figure = button.closest('.code-example');
      if (!figure) return;
      var action = button.getAttribute('data-code-action');

      if (action === 'copy') {
        window.BF.copyText(getCode(figure)).then(function (ok) {
          window.BF.toast(ok ? 'Código copiado.' : 'No se pudo copiar el código.', ok ? 'success' : 'danger');
        });
        return;
      }

      if (action === 'run') {
        var container = figure.querySelector('.code-preview');
        if (!container) return;
        var isOpen = !container.hidden;
        if (isOpen) {
          container.hidden = true;
          button.setAttribute('aria-expanded', 'false');
          var span = button.querySelector('span');
          if (span) span.textContent = 'Probar';
        } else {
          mountCodePreview(container, figure);
          container.hidden = false;
          button.setAttribute('aria-expanded', 'true');
          var openSpan = button.querySelector('span');
          if (openSpan) openSpan.textContent = 'Ocultar';
        }
        return;
      }

      if (action === 'edit') openEditor(figure);
    });
  }

  function updateEditorStatus(saved) {
    var status = document.getElementById('editorStatus');
    if (!status) return;
    var code = document.getElementById('editorCode');
    var lines = code ? code.value.split('\n').length : 0;
    status.textContent = 'HTML · ' + lines + ' líneas · ' + (saved ? 'guardado' : 'sin guardar');
  }

  function renderEditorPreview() {
    var iframe = document.getElementById('editorPreview');
    var consoleEl = document.getElementById('editorConsole');
    var code = document.getElementById('editorCode');
    if (!iframe || !consoleEl || !code || !editorState.figure) return;
    editorState.token = registerPreview(
      iframe,
      consoleEl,
      code.value,
      getPreviewJs(editorState.figure),
      editorState.token,
    );
  }

  function saveDraft(silent) {
    if (!editorState.figure) return;
    var code = document.getElementById('editorCode');
    if (!code) return;
    var value = code.value;
    var original = editorState.original;
    var drafts = readJson(DRAFTS_KEY, {});
    var codeEl = editorState.figure.querySelector('.code-pre code');

    if (value.trim() === original.trim()) {
      delete drafts[editorState.figure.id];
      editorState.figure.classList.remove('has-draft');
      removeDraftBadge(editorState.figure);
      if (codeEl) codeEl.textContent = original;
    } else {
      drafts[editorState.figure.id] = value;
      editorState.figure.classList.add('has-draft');
      addDraftBadge(editorState.figure);
      if (codeEl) codeEl.textContent = value;
    }

    writeJson(DRAFTS_KEY, drafts);
    editorState.dirty = false;
    updateEditorStatus(true);
    if (!silent) window.BF.toast('Borrador guardado en este navegador.', 'success');
  }

  function openEditor(figure) {
    var modalEl = document.getElementById('editorModal');
    var code = document.getElementById('editorCode');
    if (!modalEl || !code) return;
    editorState.figure = figure;
    editorState.original = originalCodes.get(figure) || getCode(figure);
    editorState.dirty = false;
    code.value = getCode(figure);
    updateEditorStatus(true);
    if (window.bootstrap) window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }

  function initEditor() {
    var modalEl = document.getElementById('editorModal');
    var code = document.getElementById('editorCode');
    if (!modalEl || !code) return;

    modalEl.addEventListener('shown.bs.modal', function () {
      renderEditorPreview();
      code.focus();
    });

    modalEl.addEventListener('hidden.bs.modal', function () {
      if (editorState.dirty) saveDraft(true);
      editorState.figure = null;
      editorState.dirty = false;
    });

    code.addEventListener('input', function () {
      editorState.dirty = true;
      updateEditorStatus(false);
      window.clearTimeout(editorState.debounce);
      editorState.debounce = window.setTimeout(renderEditorPreview, 350);
    });

    code.addEventListener('keydown', function (event) {
      if (event.key !== 'Tab' || event.shiftKey) return;
      event.preventDefault();
      var start = code.selectionStart;
      var end = code.selectionEnd;
      code.setRangeText('  ', start, end, 'end');
      editorState.dirty = true;
      updateEditorStatus(false);
    });

    var save = document.getElementById('editorSaveBtn');
    if (save) save.addEventListener('click', function () { saveDraft(false); });

    var reset = document.getElementById('editorResetBtn');
    if (reset) {
      reset.addEventListener('click', function () {
        if (!editorState.figure) return;
        code.value = editorState.original;
        editorState.dirty = true;
        var drafts = readJson(DRAFTS_KEY, {});
        delete drafts[editorState.figure.id];
        writeJson(DRAFTS_KEY, drafts);
        editorState.figure.classList.remove('has-draft');
        removeDraftBadge(editorState.figure);
        var codeEl = editorState.figure.querySelector('.code-pre code');
        if (codeEl) codeEl.textContent = editorState.original;
        updateEditorStatus(false);
        renderEditorPreview();
        window.BF.toast('Ejemplo restablecido. Guarda si quieres conservar el cambio.', 'info');
      });
    }

    var copy = document.getElementById('editorCopyBtn');
    if (copy) {
      copy.addEventListener('click', function () {
        window.BF.copyText(code.value).then(function (ok) {
          window.BF.toast(ok ? 'Código copiado.' : 'No se pudo copiar el código.', ok ? 'success' : 'danger');
        });
      });
    }

    var reload = document.getElementById('editorReloadBtn');
    if (reload) reload.addEventListener('click', renderEditorPreview);
  }

  function initPreviewMessages() {
    window.addEventListener('message', function (event) {
      var data = event.data;
      if (!data || !data.token || typeof data.token !== 'string') return;
      var entry = previewTokens.get(data.token);
      if (!entry || event.source !== entry.iframe.contentWindow) return;
      var consoleEl = entry.consoleEl;
      if (!consoleEl) return;
      var line = document.createElement('p');
      line.className = 'preview-console-line preview-console-' + (data.type || 'log');
      line.textContent = (data.type === 'error' ? 'Error: ' : '') + String(data.message || '').slice(0, 600);
      consoleEl.append(line);
      consoleEl.classList.add('has-output');
      while (consoleEl.children.length > 30) consoleEl.firstElementChild.remove();
      consoleEl.scrollTop = consoleEl.scrollHeight;
    });
  }

  function initQuiz() {
    document.querySelectorAll('[data-quiz]').forEach(function (quiz) {
      var answer = Number(quiz.getAttribute('data-answer'));
      var options = Array.prototype.slice.call(quiz.querySelectorAll('[data-option]'));
      var feedback = quiz.querySelector('[data-quiz-feedback]');
      var explanation = quiz.querySelector('.quiz-explanation');
      var explanationHtml = explanation ? explanation.innerHTML : '';
      var answered = false;

      options.forEach(function (option) {
        option.addEventListener('click', function () {
          if (answered) return;
          answered = true;
          var selected = Number(option.getAttribute('data-option'));
          var correct = selected === answer;
          options.forEach(function (item) {
            item.disabled = true;
            item.setAttribute('aria-disabled', 'true');
            if (Number(item.getAttribute('data-option')) === answer) item.classList.add('correct');
          });
          if (correct) {
            option.classList.add('correct');
            if (feedback) {
              feedback.className = 'quiz-feedback is-correct';
              feedback.innerHTML = '<strong>Correcto.</strong> ' + explanationHtml;
            }
          } else {
            option.classList.add('wrong');
            var letter = String.fromCharCode(65 + answer);
            if (feedback) {
              feedback.className = 'quiz-feedback is-wrong';
              feedback.innerHTML = '<strong>Casi. La respuesta correcta es ' + letter + '.</strong> ' + explanationHtml;
            }
          }
        });
      });
    });
  }

  function normalize(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlight(text, query) {
    var safe = escapeHtml(text);
    var term = escapeHtml(query.trim());
    if (!term) return safe;
    try {
      return safe.replace(new RegExp('(' + escapeRegExp(term) + ')', 'gi'), '<mark>$1</mark>');
    } catch (error) {
      return safe;
    }
  }

  function initSearch() {
    var modalEl = document.getElementById('searchModal');
    if (!modalEl) return;
    var input = document.getElementById('courseSearchInput');
    var results = document.getElementById('searchResults');
    var status = document.getElementById('searchStatus');
    var empty = document.getElementById('searchEmpty');
    var indexPromise = null;
    var timer = null;
    var currentResults = [];

    function loadIndex() {
      if (!indexPromise) {
        var indexUrl = new URL(base + 'assets/data/search-index.json', window.location.href);
        var version = document.querySelector('meta[name="bf-version"]');
        if (version && version.content) indexUrl.searchParams.set('v', version.content.replaceAll('-', ''));
        indexPromise = fetch(indexUrl.href, {
          credentials: 'same-origin',
        }).then(function (response) {
          if (!response.ok) throw new Error('HTTP ' + response.status);
          return response.json();
        });
      }
      return indexPromise;
    }

    function renderResults(items, query) {
      currentResults = items;
      results.innerHTML = items
        .map(function (item) {
          return `<a class="search-result" href="${base}${item.url}" data-search-result>
            <span class="search-result-module">${escapeHtml(item.module)} · ${item.minutes} min</span>
            <span class="search-result-title">${highlight(item.title, query)}</span>
            <span class="search-result-snippet">${highlight(item.summary, query)}</span>
          </a>`;
        })
        .join('');
      if (status) status.textContent = items.length ? items.length + (items.length === 1 ? ' resultado' : ' resultados') + ' para «' + query + '»' : '';
      if (empty) empty.hidden = items.length > 0;
    }

    function runSearch() {
      var query = input.value.trim();
      if (query.length < 2) {
        results.innerHTML = '';
        currentResults = [];
        if (status) status.textContent = '';
        if (empty) empty.hidden = true;
        return;
      }
      loadIndex()
        .then(function (index) {
          var normalized = normalize(query);
          var scored = index.lessons
            .map(function (item) {
              var title = normalize(item.title);
              var module = normalize(item.module);
              var summary = normalize(item.summary);
              var text = normalize(item.text);
              var score = 0;
              if (title === normalized) score += 100;
              else if (title.indexOf(normalized) === 0) score += 60;
              else if (title.indexOf(normalized) !== -1) score += 40;
              if (module.indexOf(normalized) !== -1) score += 14;
              if (summary.indexOf(normalized) !== -1) score += 12;
              if (text.indexOf(normalized) !== -1) score += 6;
              return { item: item, score: score };
            })
            .filter(function (entry) {
              return entry.score > 0;
            })
            .sort(function (a, b) {
              return b.score - a.score || a.item.moduleIndex - b.item.moduleIndex || a.item.lessonIndex - b.item.lessonIndex;
            })
            .slice(0, 10)
            .map(function (entry) {
              return entry.item;
            });
          renderResults(scored, query);
        })
        .catch(function () {
          results.innerHTML = '';
          currentResults = [];
          if (status) status.textContent = 'No se pudo cargar el índice de búsqueda. Abre el sitio con un servidor local.';
          if (empty) empty.hidden = true;
        });
    }

    modalEl.addEventListener('shown.bs.modal', function () {
      input.focus();
      input.select();
      loadIndex().catch(function () {});
    });

    modalEl.addEventListener('hidden.bs.modal', function () {
      input.value = '';
      results.innerHTML = '';
      currentResults = [];
      if (status) status.textContent = '';
      if (empty) empty.hidden = true;
    });

    input.addEventListener('input', function () {
      window.clearTimeout(timer);
      timer = window.setTimeout(runSearch, 140);
    });

    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' && currentResults.length) {
        event.preventDefault();
        window.location.href = base + currentResults[0].url;
      }
      if (event.key === 'ArrowDown' && currentResults.length) {
        event.preventDefault();
        var first = results.querySelector('[data-search-result]');
        if (first) first.focus();
      }
    });

    results.addEventListener('keydown', function (event) {
      var items = Array.prototype.slice.call(results.querySelectorAll('[data-search-result]'));
      var index = items.indexOf(document.activeElement);
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (items[index + 1]) items[index + 1].focus();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (items[index - 1]) items[index - 1].focus();
        else input.focus();
      }
    });

    document.addEventListener('keydown', function (event) {
      var target = event.target;
      var typing =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (window.bootstrap) window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
        return;
      }
      if (event.key === '/' && !typing && !modalEl.classList.contains('show')) {
        event.preventDefault();
        if (window.bootstrap) window.bootstrap.Modal.getOrCreateInstance(modalEl).show();
      }
    });
  }

  function refreshOpenPreviews() {
    document.querySelectorAll('.code-preview:not([hidden])').forEach(function (container) {
      var figure = container.closest('.code-example');
      if (figure) mountCodePreview(container, figure);
    });
    if (editorState.figure) renderEditorPreview();
  }

  document.addEventListener('bf:themechange', refreshOpenPreviews);

  initCodeExamples();
  initEditor();
  initPreviewMessages();
  initQuiz();
  initComplete();
  initReset();
  updateProgressUI();
  initSearch();
})();
