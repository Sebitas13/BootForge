(function () {
  'use strict';

  var STORAGE_KEY = 'bootforge:playground:v1';
  var BOOTSTRAP_VERSION = '5.3.9';
  var BOOTSTRAP_CSS_SRI = 'sha384-yEPZ7jP9S0QKiUQ0m3jjsO4ProIW7wvR9gXkI7JOGa2XVsw53Yke2bsdkBbjmmiX';
  var BOOTSTRAP_JS_SRI = 'sha384-WyOxWvTyr1QaMPfiPJSv76iReVthorl5uWlFtZPyK0IEB0hGzo9y5Bp9mYanr8Bu';

  var templates = {
    hero: {
      html: `<nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom">
  <div class="container">
    <a class="navbar-brand fw-bold" href="#">Nova</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#playgroundNav" aria-controls="playgroundNav"
            aria-expanded="false" aria-label="Abrir menú">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="playgroundNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="#features">Features</a></li>
        <li class="nav-item"><a class="nav-link" href="#precios">Precios</a></li>
      </ul>
    </div>
  </div>
</nav>

<header class="py-5 bg-body-tertiary">
  <div class="container py-4">
    <div class="row align-items-center g-4">
      <div class="col-lg-7">
        <span class="badge text-bg-primary mb-3">Nuevo</span>
        <h1 class="display-5 fw-bold">Tu producto, listo para despegar.</h1>
        <p class="lead text-body-secondary">Una landing clara, rápida y responsive construida con Bootstrap 5.</p>
        <div class="d-flex flex-wrap gap-2">
          <a class="btn btn-primary btn-lg" href="#precios">Empezar gratis</a>
          <a class="btn btn-outline-secondary btn-lg" href="#features">Ver features</a>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="ratio ratio-4x3 bg-primary-subtle border rounded-3 d-flex align-items-center justify-content-center">
          <span class="fs-1">🚀</span>
        </div>
      </div>
    </div>
  </div>
</header>

<section class="py-5" id="features">
  <div class="container">
    <div class="text-center mb-4">
      <h2>Todo lo que necesitas</h2>
      <p class="text-body-secondary">Menos configuración, más producto.</p>
    </div>
    <div class="row g-4">
      <div class="col-md-4"><div class="card h-100"><div class="card-body">
        <h3 class="h5">Rápido</h3><p class="text-body-secondary mb-0">Carga en segundos.</p>
      </div></div></div>
      <div class="col-md-4"><div class="card h-100"><div class="card-body">
        <h3 class="h5">Accesible</h3><p class="text-body-secondary mb-0">HTML semántico y foco visible.</p>
      </div></div></div>
      <div class="col-md-4"><div class="card h-100"><div class="card-body">
        <h3 class="h5">Escalable</h3><p class="text-body-secondary mb-0">Un grid de 12 columnas.</p>
      </div></div></div>
    </div>
  </div>
</section>`,
      css: `.hero-badge { letter-spacing: .08em; }`,
      js: `console.log('Playground listo');`,
    },
    card: {
      html: `<div class="container py-5">
  <div class="row justify-content-center">
    <div class="col-md-6 col-lg-4">
      <div class="card shadow-sm">
        <div class="ratio ratio-16x9 bg-primary-subtle d-flex align-items-center justify-content-center">
          <span class="display-6">🎨</span>
        </div>
        <div class="card-body">
          <h2 class="h5 card-title">Poster abstracto</h2>
          <p class="card-text text-body-secondary">Impresión en papel mate de 250 g.</p>
          <p class="fs-4 fw-bold mb-3">$24.00</p>
          <button class="btn btn-primary w-100" type="button">Añadir al carrito</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
      css: `.card { border-radius: 1rem; }`,
      js: `document.querySelector('.btn')?.addEventListener('click', () => console.log('Añadido al carrito'));`,
    },
    form: {
      html: `<div class="container py-5">
  <div class="row justify-content-center">
    <div class="col-lg-7">
      <h1 class="h3 mb-3">Contáctanos</h1>
      <form class="row g-3">
        <div class="col-md-6">
          <label for="pgName" class="form-label">Nombre</label>
          <input type="text" class="form-control" id="pgName" required>
        </div>
        <div class="col-md-6">
          <label for="pgEmail" class="form-label">Email</label>
          <input type="email" class="form-control" id="pgEmail" required>
        </div>
        <div class="col-12">
          <label for="pgMessage" class="form-label">Mensaje</label>
          <textarea class="form-control" id="pgMessage" rows="4" required></textarea>
        </div>
        <div class="col-12">
          <button class="btn btn-primary" type="submit">Enviar</button>
        </div>
      </form>
    </div>
  </div>
</div>`,
      css: '',
      js: `document.querySelector('form')?.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log('Formulario enviado (demo)');
  this.reset();
});`,
    },
    navbar: {
      html: `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="#">Mi Sitio</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#pgNavbar" aria-controls="pgNavbar"
            aria-expanded="false" aria-label="Abrir menú">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="pgNavbar">
      <ul class="navbar-nav me-auto">
        <li class="nav-item"><a class="nav-link active" href="#">Inicio</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Productos</a></li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button"
             data-bs-toggle="dropdown" aria-expanded="false">Recursos</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Guías</a></li>
            <li><a class="dropdown-item" href="#">Plantillas</a></li>
          </ul>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar">
        <button class="btn btn-outline-light" type="submit">Buscar</button>
      </form>
    </div>
  </div>
</nav>
<div class="container py-5">
  <h1 class="h3">Contenido de ejemplo</h1>
  <p class="text-body-secondary">Achica la vista previa para probar el menú colapsable.</p>
</div>`,
      css: '',
      js: '',
    },
    modal: {
      html: `<div class="container py-5 text-center">
  <h1 class="h3 mb-3">Modal de confirmación</h1>
  <button class="btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#pgModal">
    Abrir modal
  </button>
</div>

<div class="modal fade" id="pgModal" tabindex="-1" aria-labelledby="pgModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title h5" id="pgModalLabel">¿Publicar cambios?</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">Los cambios serán visibles para todos.</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Publicar</button>
      </div>
    </div>
  </div>
</div>`,
      css: '',
      js: '',
    },
    blank: {
      html: `<div class="container py-5">
  <h1>Hola, Bootstrap</h1>
  <p class="lead">Empieza a construir aquí.</p>
  <button class="btn btn-primary" type="button">Mi botón</button>
</div>`,
      css: '',
      js: '',
    },
  };

  var els = {};
  var runTimer = null;
  var currentToken = null;
  var currentTemplate = 'hero';

  function readSaved() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (error) {
      return null;
    }
  }

  function saveState() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          template: currentTemplate,
          html: els.html.value,
          css: els.css.value,
          js: els.js.value,
        }),
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  function setStatus(text) {
    if (els.status) els.status.textContent = text;
  }

  function updateStats() {
    if (!els.stats) return;
    var kb = function (value) {
      return (new Blob([value]).size / 1024).toFixed(1) + ' KB';
    };
    els.stats.textContent = 'HTML ' + kb(els.html.value) + ' · CSS ' + kb(els.css.value) + ' · JS ' + kb(els.js.value);
  }

  function loadTemplate(name) {
    var template = templates[name] || templates.blank;
    currentTemplate = name;
    els.html.value = template.html;
    els.css.value = template.css;
    els.js.value = template.js;
    if (els.template) els.template.value = name;
    updateStats();
    run(true);
  }

  function buildPreviewDoc(html, css, js, token) {
    var base = document.documentElement.getAttribute('data-base') || '';
    var cssUrl = new URL(base + 'assets/vendor/bootstrap/bootstrap.min.css', window.location.href).href;
    var jsUrl = new URL(base + 'assets/vendor/bootstrap/bootstrap.bundle.min.js', window.location.href).href;
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
      '"><style>html,body{min-height:100%;}body{margin:0;background:var(--bs-body-bg);color:var(--bs-body-color);font-family:var(--bs-body-font-family);font-size:var(--bs-body-font-size);line-height:var(--bs-body-line-height);}' +
      css +
      '</style>' +
      instrumentation +
      '</head><body>' +
      html +
      '<script src="' +
      jsUrl +
      '"></script>' +
      (js ? '<script>' + js.replace(/<\/script/gi, '<\\/script') + '</script>' : '') +
      '</body></html>'
    );
  }

  function run(silent) {
    var html = els.html.value;
    var css = els.css.value;
    var js = els.js.value;
    currentToken = 'pg-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    els.console.replaceChildren();
    els.preview.srcdoc = buildPreviewDoc(html, css, js, currentToken);
    updateStats();
    var saved = saveState();
    setStatus(saved ? 'Vista actualizada · guardado en este navegador' : 'Vista actualizada · almacenamiento no disponible');
    if (!silent) {
      window.BF.toast('Vista previa actualizada.', 'success');
    }
  }

  function scheduleRun() {
    setStatus('Cambios sin ejecutar...');
    window.clearTimeout(runTimer);
    runTimer = window.setTimeout(function () {
      run(true);
    }, 600);
  }

  function switchTab(name) {
    var tabs = els.tabs;
    tabs.forEach(function (tab) {
      var active = tab.getAttribute('data-editor-tab') === name;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.setAttribute('tabindex', active ? '0' : '-1');
    });
    ['html', 'css', 'js'].forEach(function (key) {
      var pane = document.getElementById(key + 'Pane');
      if (!pane) return;
      var active = key === name;
      pane.classList.toggle('active', active);
      pane.hidden = !active;
    });
  }

  function standaloneHtml() {
    var cssCdn =
      'https://cdn.jsdelivr.net/npm/bootstrap@' +
      BOOTSTRAP_VERSION +
      '/dist/css/bootstrap.min.css';
    var jsCdn =
      'https://cdn.jsdelivr.net/npm/bootstrap@' +
      BOOTSTRAP_VERSION +
      '/dist/js/bootstrap.bundle.min.js';
    return (
      '<!doctype html>\n<html lang="es">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>BootForge Playground</title>\n  <link href="' +
      cssCdn +
      '" rel="stylesheet" integrity="' +
      BOOTSTRAP_CSS_SRI +
      '" crossorigin="anonymous">\n  <style>\n' +
      els.css.value +
      '\n  </style>\n</head>\n<body>\n' +
      els.html.value +
      '\n  <script src="' +
      jsCdn +
      '" integrity="' +
      BOOTSTRAP_JS_SRI +
      '" crossorigin="anonymous"></script>\n  <script>\n' +
      els.js.value.replace(/<\/script/gi, '<\\/script') +
      '\n  </script>\n</body>\n</html>\n'
    );
  }

  function download() {
    var blob = new Blob([standaloneHtml()], { type: 'text/html;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = 'bootforge-playground.html';
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1500);
    window.BF.toast('HTML descargado. Ábrelo en tu navegador.', 'success');
  }

  function readMessage(event) {
    var data = event.data;
    if (!data || data.token !== currentToken) return;
    if (event.source !== els.preview.contentWindow) return;
    if (!els.console) return;
    var line = document.createElement('p');
    line.className = 'preview-console-line preview-console-' + (data.type || 'log');
    line.textContent = (data.type === 'error' ? 'Error: ' : '') + String(data.message || '').slice(0, 800);
    els.console.append(line);
    els.console.classList.add('has-output');
    while (els.console.children.length > 50) els.console.firstElementChild.remove();
    els.console.scrollTop = els.console.scrollHeight;
  }

  function init() {
    els.html = document.getElementById('htmlEditor');
    els.css = document.getElementById('cssEditor');
    els.js = document.getElementById('jsEditor');
    els.preview = document.getElementById('playgroundPreview');
    els.console = document.getElementById('playgroundConsole');
    els.status = document.getElementById('playgroundStatus');
    els.stats = document.getElementById('playgroundStats');
    els.template = document.getElementById('templateSelect');
    els.frame = document.getElementById('deviceFrame');
    els.tabs = Array.prototype.slice.call(document.querySelectorAll('[data-editor-tab]'));
    if (!els.html || !els.preview) return;

    var saved = readSaved();
    if (saved) {
      currentTemplate = templates[saved.template] ? saved.template : 'hero';
      els.html.value = typeof saved.html === 'string' ? saved.html : templates[currentTemplate].html;
      els.css.value = typeof saved.css === 'string' ? saved.css : templates[currentTemplate].css;
      els.js.value = typeof saved.js === 'string' ? saved.js : templates[currentTemplate].js;
      if (els.template) els.template.value = currentTemplate;
      run(true);
      setStatus('Sesión recuperada de este navegador.');
    } else {
      loadTemplate('hero');
    }

    [els.html, els.css, els.js].forEach(function (field) {
      field.addEventListener('input', function () {
        updateStats();
        scheduleRun();
      });
      field.addEventListener('keydown', function (event) {
        if (event.key !== 'Tab' || event.shiftKey) return;
        event.preventDefault();
        var start = field.selectionStart;
        var end = field.selectionEnd;
        field.setRangeText('  ', start, end, 'end');
        updateStats();
        scheduleRun();
      });
    });

    els.tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        switchTab(tab.getAttribute('data-editor-tab'));
      });
      tab.addEventListener('keydown', function (event) {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
        event.preventDefault();
        var next = event.key === 'ArrowRight' ? (index + 1) % els.tabs.length : (index - 1 + els.tabs.length) % els.tabs.length;
        els.tabs[next].focus();
        switchTab(els.tabs[next].getAttribute('data-editor-tab'));
      });
    });

    var runButton = document.getElementById('runPlaygroundBtn');
    if (runButton) runButton.addEventListener('click', function () { run(false); });

    var resetButton = document.getElementById('resetPlaygroundBtn');
    if (resetButton) {
      resetButton.addEventListener('click', function () {
        loadTemplate(currentTemplate);
        window.BF.toast('Plantilla restablecida.', 'info');
      });
    }

    if (els.template) {
      els.template.addEventListener('change', function () {
        loadTemplate(els.template.value);
        window.BF.toast('Plantilla cargada: ' + els.template.options[els.template.selectedIndex].text, 'info');
      });
    }

    var copyButton = document.getElementById('copyPlaygroundBtn');
    if (copyButton) {
      copyButton.addEventListener('click', function () {
        window.BF.copyText(els.html.value).then(function (ok) {
          window.BF.toast(ok ? 'HTML copiado.' : 'No se pudo copiar el HTML.', ok ? 'success' : 'danger');
        });
      });
    }

    var downloadButton = document.getElementById('downloadPlaygroundBtn');
    if (downloadButton) downloadButton.addEventListener('click', download);

    var reloadButton = document.getElementById('reloadPreviewBtn');
    if (reloadButton) reloadButton.addEventListener('click', function () { run(true); });

    var clearButton = document.getElementById('clearConsoleBtn');
    if (clearButton) {
      clearButton.addEventListener('click', function () {
        els.console.replaceChildren();
        els.console.classList.remove('has-output');
      });
    }

    document.querySelectorAll('[data-device]').forEach(function (button) {
      button.addEventListener('click', function () {
        var device = button.getAttribute('data-device');
        document.querySelectorAll('[data-device]').forEach(function (item) {
          item.classList.toggle('active', item === button);
          item.setAttribute('aria-pressed', String(item === button));
        });
        els.frame.className = 'device-frame device-' + device;
      });
    });

    window.addEventListener('message', readMessage);
    document.addEventListener('bf:themechange', function () { run(true); });
  }

  init();
})();
