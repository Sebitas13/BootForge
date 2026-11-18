(function () {
  'use strict';

  var doc = document.documentElement;
  var THEME_KEY = 'bootforge:theme';
  var PROGRESS_KEY = 'bootforge:progress:v1';
  var LAST_KEY = 'bootforge:last';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  doc.classList.add('js');

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

  function currentTheme() {
    return doc.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light';
  }

  function updateThemeToggle(theme) {
    var toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    var dark = theme === 'dark';
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
    toggle.setAttribute('title', dark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro');
  }

  function applyTheme(theme, persist) {
    var next = theme === 'dark' ? 'dark' : 'light';
    doc.setAttribute('data-bs-theme', next);
    doc.style.colorScheme = next;
    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (error) {
        /* El tema sigue funcionando aunque localStorage esté bloqueado. */
      }
    }
    updateThemeToggle(next);
    document.dispatchEvent(new CustomEvent('bf:themechange', { detail: { theme: next } }));
  }

  function initTheme() {
    updateThemeToggle(currentTheme());
    var toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
      });
    }
    if (window.matchMedia) {
      var media = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function (event) {
        try {
          if (!localStorage.getItem(THEME_KEY)) applyTheme(event.matches ? 'dark' : 'light', false);
        } catch (error) {
          /* Sin preferencia guardada, seguimos el sistema. */
        }
      };
      if (media.addEventListener) media.addEventListener('change', onChange);
      else if (media.addListener) media.addListener(onChange);
    }
  }

  function initNavbar() {
    var header = document.querySelector('.site-header');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    var nav = document.getElementById('siteNav');
    if (nav) {
      nav.addEventListener('click', function (event) {
        if (!event.target.closest('a')) return;
        if (window.bootstrap && nav.classList.contains('show')) {
          var collapse = window.bootstrap.Collapse.getInstance(nav) || new window.bootstrap.Collapse(nav, { toggle: false });
          collapse.hide();
        }
      });
    }
  }

  function initYear() {
    var year = String(new Date().getFullYear());
    document.querySelectorAll('[data-year]').forEach(function (node) {
      node.textContent = year;
    });
  }

  function toast(message, variant) {
    var container = document.getElementById('toastContainer');
    if (!container) return;
    while (container.children.length >= 3) container.firstElementChild.remove();

    var el = document.createElement('div');
    el.className = 'toast bf-toast toast-' + (variant || 'success');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');

    var flex = document.createElement('div');
    flex.className = 'd-flex';
    var body = document.createElement('div');
    body.className = 'toast-body';
    body.textContent = message;
    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'btn-close btn-close-sm me-2 m-auto';
    close.setAttribute('data-bs-dismiss', 'toast');
    close.setAttribute('aria-label', 'Cerrar aviso');
    flex.append(body, close);
    el.append(flex);
    container.append(el);

    if (window.bootstrap && window.bootstrap.Toast) {
      var instance = new window.bootstrap.Toast(el, { delay: 3400 });
      el.addEventListener('hidden.bs.toast', function () {
        el.remove();
      });
      instance.show();
    } else {
      el.classList.add('show');
      window.setTimeout(function () {
        el.remove();
      }, 3400);
    }
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(
        function () {
          return true;
        },
        function () {
          return fallbackCopy(text);
        },
      );
    }
    return Promise.resolve(fallbackCopy(text));
  }

  function fallbackCopy(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.top = '-1000px';
    area.style.opacity = '0';
    document.body.append(area);
    area.select();
    var ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (error) {
      ok = false;
    }
    area.remove();
    return ok;
  }

  function initCopyButtons() {
    document.addEventListener('click', function (event) {
      var button = event.target.closest('[data-copy]');
      if (!button) return;
      var targetId = button.getAttribute('data-copy-target');
      var target = targetId ? document.getElementById(targetId) : null;
      var text = button.getAttribute('data-copy') || (target ? target.textContent : '');
      if (!text) return;
      copyText(text).then(function (ok) {
        toast(ok ? 'Copiado al portapapeles.' : 'No se pudo copiar. Selecciona el texto manualmente.', ok ? 'success' : 'danger');
      });
    });
  }

  function initDemoForms() {
    document.querySelectorAll('form[data-demo-form]').forEach(function (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
        if (!form.checkValidity()) {
          var firstInvalid = form.querySelector(':invalid');
          if (firstInvalid && firstInvalid.focus) firstInvalid.focus();
          return;
        }
        toast(form.getAttribute('data-success') || 'Formulario validado. En una app real, aquí enviarías los datos.', 'success');
        form.reset();
        form.classList.remove('was-validated');
      });
    });
  }

  function initBackToTop() {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'back-to-top';
    button.setAttribute('aria-label', 'Volver arriba');
    button.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M6 11l6-6 6 6"/></svg>';
    document.body.append(button);
    button.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    var onScroll = function () {
      button.classList.toggle('is-visible', window.scrollY > 700);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initExternalLinks() {
    document.querySelectorAll('a[target="_blank"]').forEach(function (link) {
      var rel = (link.getAttribute('rel') || '').split(/\s+/).filter(Boolean);
      if (rel.indexOf('noopener') === -1) rel.push('noopener');
      if (rel.indexOf('noreferrer') === -1) rel.push('noreferrer');
      link.setAttribute('rel', rel.join(' '));
    });
  }

  function initLandingProgress() {
    var continueLink = document.querySelector('[data-landing-continue]');
    var progressLabel = document.querySelector('[data-landing-progress]');
    if (!continueLink && !progressLabel) return;

    var progress = readJson(PROGRESS_KEY, {});
    var completed = Object.keys(progress).length;
    var total = Number((continueLink && continueLink.getAttribute('data-total')) || 24);
    var percent = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;

    if (progressLabel) {
      progressLabel.textContent = completed > 0 ? percent + '% completado' : 'Empieza hoy';
    }
    if (continueLink) {
      continueLink.hidden = completed === 0;
      var last = readJson(LAST_KEY, null);
      if (completed > 0 && last && last.title) {
        continueLink.href = /^lecciones\/[a-z0-9-]+\.html$/.test(last.url || '')
          ? last.url
          : 'lecciones/que-es-bootstrap.html';
        continueLink.innerHTML =
          'Continuar: <span class="continue-title"></span>' +
          '<svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
        var titleNode = continueLink.querySelector('.continue-title');
        if (titleNode) titleNode.textContent = String(last.title).slice(0, 120);
      }
    }
  }

  initTheme();
  initNavbar();
  initYear();
  initCopyButtons();
  initDemoForms();
  initBackToTop();
  initExternalLinks();
  initLandingProgress();

  window.BF = {
    toast: toast,
    copyText: copyText,
    readJson: readJson,
    writeJson: writeJson,
    reduceMotion: reduceMotion,
    theme: currentTheme,
  };
})();
