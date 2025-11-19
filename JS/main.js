(function () {
    // 1) THEME TOGGLE MEJORADO (con navbar adaptativo y animaciones)
    var themeToggle = document.getElementById('themeToggle');

    function applyTheme(name) {
        // Aplicar transición suave
        document.documentElement.style.transition = 'all 0.3s ease';

        if (name === 'dark') {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-bs-theme');
        }
        localStorage.setItem('tutorialTheme', name);
        if (themeToggle) themeToggle.setAttribute('aria-pressed', String(name === 'dark'));

        // Actualizar navbar y botones según el tema
        updateNavbarTheme(name);
        updateThemeButtonIcon(name);

        // Restaurar transición después del cambio
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
    }

    function updateNavbarTheme(theme) {
        const navbar = document.getElementById('mainNavbar');
        if (!navbar) return;

        // Remover todas las clases de tema
        navbar.classList.remove('navbar-dark', 'navbar-light', 'bg-dark', 'bg-light', 'bg-gradient-primary', 'bg-primary');

        if (theme === 'dark') {
            // Modo oscuro - navbar oscuro con gradiente
            navbar.classList.add('navbar-dark', 'bg-gradient-primary');
        } else {
            // Modo claro - navbar claro con fondo primario sólido
            navbar.classList.add('navbar-light', 'bg-primary', 'navbar-light-custom');
        }

        // Actualizar botones del navbar
        updateNavbarButtons(theme);
    }

    function updateNavbarButtons(theme) {
        const searchBtn = document.querySelector('#mainNavbar .form-control + .btn-outline-light');
        const githubTutorialBtn = document.querySelector('#mainNavbar .btn-outline-light[href*="github-tutorial"]');
        const githubRepoBtn = document.querySelector('#mainNavbar .btn-light[target="_blank"]');
        const themeBtn = document.getElementById('themeToggle');

        if (theme === 'dark') {
            // Modo oscuro - todos los botones outline-light
            if (searchBtn) {
                searchBtn.classList.remove('btn-outline-dark');
                searchBtn.classList.add('btn-outline-light');
            }
            if (githubTutorialBtn) {
                githubTutorialBtn.classList.remove('btn-outline-dark');
                githubTutorialBtn.classList.add('btn-outline-light');
            }
            if (githubRepoBtn) {
                githubRepoBtn.classList.remove('btn-dark');
                githubRepoBtn.classList.add('btn-light');
            }
            if (themeBtn) {
                themeBtn.classList.remove('btn-outline-dark');
                themeBtn.classList.add('btn-outline-light');
            }
        } else {
            // Modo claro - botones con contraste para fondo primario
            if (searchBtn) {
                searchBtn.classList.remove('btn-outline-light');
                searchBtn.classList.add('btn-outline-light');
            }
            if (githubTutorialBtn) {
                githubTutorialBtn.classList.remove('btn-outline-light');
                githubTutorialBtn.classList.add('btn-outline-light');
            }
            if (githubRepoBtn) {
                githubRepoBtn.classList.remove('btn-light');
                githubRepoBtn.classList.add('btn-light');
            }
            if (themeBtn) {
                themeBtn.classList.remove('btn-outline-light');
                themeBtn.classList.add('btn-outline-light');
            }
        }
    }

    function updateThemeButtonIcon(theme) {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        // Animación de transformación
        themeToggle.style.transition = 'all 0.3s ease';

        if (theme === 'dark') {
            // Cambiar a luna (modo oscuro activado) - color azul claro
            themeToggle.innerHTML = `
                <span class="theme-icon moon-icon" title="Cambiar a modo claro">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0dcaf0" stroke-width="2">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </span>
            `;
        } else {
            // Cambiar a sol (modo claro activado) - color amarillo
            themeToggle.innerHTML = `
                <span class="theme-icon sun-icon" title="Cambiar a modo oscuro">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffc107" stroke-width="2">
                        <circle cx="12" cy="12" r="5"></circle>
                        <line x1="12" y1="1" x2="12" y2="3"></line>
                        <line x1="12" y1="21" x2="12" y2="23"></line>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                        <line x1="1" y1="12" x2="3" y2="12"></line>
                        <line x1="21" y1="12" x2="23" y2="12"></line>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                </span>
            `;
        }
    }

    // Inicializar tema
    var savedTheme = localStorage.getItem('tutorialTheme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    themeToggle && themeToggle.addEventListener('click', function () {
        applyTheme((localStorage.getItem('tutorialTheme') === 'dark') ? 'light' : 'dark');
    });

    // 2) TOC generation (busca h2/h3 dentro del main content)
    function buildTOC() {
        var main = document.getElementById('mainContent') || document.body;
        var headings = main.querySelectorAll('h2, h3');
        var toc = document.getElementById('toc');
        if (!toc) return;
        toc.innerHTML = '';
        headings.forEach(function (h, i) {
            if (!h.id) h.id = 'h_' + i;
            var a = document.createElement('a');
            a.className = 'nav-link';
            a.href = '#' + h.id;
            a.innerHTML = (h.tagName.toLowerCase() === 'h2' ? '<strong>' + h.textContent + '</strong>' : '&nbsp;&nbsp;' + h.textContent);
            a.addEventListener('click', function () { setProgressFor(h.id); });
            toc.appendChild(a);
        });
    }

    // 3) Copy + Try handlers for code blocks
    function initCodeTools() {
        document.querySelectorAll('pre.code-block').forEach(function (pre) {
            // create buttons if not present
            if (!pre.querySelector('[data-action="copy"]')) {
                var copyBtn = document.createElement('button');
                copyBtn.className = 'btn btn-sm btn-light pre-copy-btn';
                copyBtn.innerText = 'Copiar';
                copyBtn.setAttribute('data-action', 'copy');
                pre.appendChild(copyBtn);
            }
            if (!pre.querySelector('[data-action="try"]')) {
                var tryBtn = document.createElement('button');
                tryBtn.className = 'btn btn-sm btn-outline-primary pre-copy-btn';
                tryBtn.style.right = '4.5rem';
                tryBtn.innerText = 'Try';
                tryBtn.setAttribute('data-action', 'try');
                pre.appendChild(tryBtn);
            }

            // Agregar botón de "Editar" para interactividad
            if (!pre.querySelector('[data-action="edit"]')) {
                var editBtn = document.createElement('button');
                editBtn.className = 'btn btn-sm btn-success pre-copy-btn';
                editBtn.style.right = '8.5rem';
                editBtn.innerText = 'Editar';
                editBtn.setAttribute('data-action', 'edit');
                pre.appendChild(editBtn);
            }
        });

        document.body.addEventListener('click', function (e) {
            var btn = e.target.closest('button[data-action]');
            if (!btn) return;
            var action = btn.getAttribute('data-action');
            var pre = btn.closest('pre');
            var codeEl = pre && pre.querySelector('code');
            var codeText = codeEl ? codeEl.textContent : '';

            if (action === 'copy') {
                navigator.clipboard && navigator.clipboard.writeText(codeText).then(function () {
                    btn.innerText = 'Copiado ✓';
                    setTimeout(() => btn.innerText = 'Copiar', 1200);
                });
            } else if (action === 'try') {
                // Usar CDN de Bootstrap para garantizar funcionalidad
                var scaffold = codeText;
                if (!/<!doctype html>/i.test(codeText) && !/<html/i.test(codeText)) {
                    scaffold = `<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview - Bootstrap 5</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { padding: 20px; background: #f8f9fa; }
        .container { max-width: 100%; }
    </style>
</head>
<body>
    <div class="container">
        ${codeText}
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
                }
                var iframe = document.getElementById('livePreviewIframe');
                if (iframe) {
                    iframe.srcdoc = scaffold;
                    var m = new bootstrap.Modal(document.getElementById('livePreviewModal'));
                    m.show();
                }
            } else if (action === 'edit') {
                // Abrir editor interactivo
                openInteractiveEditor(codeText, pre);
            }
        });
    }

    // ===== FUNCIONES AUXILIARES QUE FALTABAN =====
    function countHTMLElements(code) {
        if (!code) return 0;
        try {
            const div = document.createElement('div');
            div.innerHTML = code;
            return div.children.length;
        } catch (e) {
            return 0;
        }
    }

    function countBootstrapClasses(code) {
        if (!code) return 0;
        const bootstrapClasses = ['container', 'row', 'col', 'btn', 'alert', 'card', 'modal', 'navbar', 'form-control'];
        let count = 0;
        bootstrapClasses.forEach(className => {
            const regex = new RegExp(className, 'g');
            const matches = code.match(regex);
            count += matches ? matches.length : 0;
        });
        return count;
    }

    function showNotification(message, type = 'info') {
        // Remover notificaciones existentes
        document.querySelectorAll('.custom-notification').forEach(el => el.remove());

        const notification = document.createElement('div');
        notification.className = `custom-notification alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    // ===== EDITOR INTERACTIVO MEJORADO =====
    function createInteractiveEditorModal() {
        // Evitar crear múltiples modales
        if (document.getElementById('interactiveEditorModal')) {
            return;
        }

        var modalHTML = `
        <div class="modal fade" id="interactiveEditorModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header bg-dark text-white d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="modal-title mb-0">🚀 Editor Interactivo Avanzado</h5>
                            <small class="text-white-50">Edita y ve los cambios en tiempo real</small>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-sm btn-outline-light" onclick="toggleFullscreen()" title="Pantalla completa">
                                ⛶
                            </button>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                    </div>
                    
                    <div class="modal-body p-0">
                        <div class="container-fluid h-100">
                            <div class="row h-100" id="editorLayout">
                                <!-- Panel del Editor -->
                                <div class="col-md-6 border-end d-flex flex-column">
                                    <div class="d-flex flex-column h-100">
                                        <!-- Header del Editor -->
                                        <div class="p-3 border-bottom bg-light d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 class="mb-0">📝 Editor de Código</h6>
                                                <small class="text-muted">HTML + Bootstrap 5</small>
                                            </div>
                                            <div class="d-flex gap-2">
                                                <select class="form-select form-select-sm" id="templateSelector" style="width: 150px;">
                                                    <option value="">Plantillas...</option>
                                                    <option value="basic">Básico</option>
                                                    <option value="card">Tarjeta</option>
                                                    <option value="form">Formulario</option>
                                                    <option value="navbar">Navbar</option>
                                                </select>
                                                <button class="btn btn-sm btn-outline-secondary" onclick="formatCode()" title="Formatear código">
                                                    🔧 Formatear
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <!-- Área del Editor -->
                                        <div class="position-relative flex-grow-1">
                                            <textarea id="interactiveCodeEditor" 
                                                      class="form-control h-100 border-0 code-textarea" 
                                                      spellcheck="false"
                                                      placeholder="Escribe tu código HTML aquí..."></textarea>
                                            <div class="position-absolute top-0 end-0 m-2">
                                                <span class="badge bg-primary" id="liveBadge">LIVE</span>
                                            </div>
                                        </div>
                                        
                                        <!-- Consola y Estado -->
                                        <div class="border-top">
                                            <div class="nav nav-tabs" role="tablist">
                                                <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#consoleTab">Consola</button>
                                                <button class="nav-link" data-bs-toggle="tab" data-bs-target="#infoTab">Info</button>
                                            </div>
                                            <div class="tab-content p-2 bg-light" style="max-height: 120px; overflow-y: auto;">
                                                <div class="tab-pane fade show active" id="consoleTab">
                                                    <div id="editorConsole" class="small font-monospace"></div>
                                                </div>
                                                <div class="tab-pane fade" id="infoTab">
                                                    <div class="small">
                                                        <span id="lineCount">0 líneas</span> • 
                                                        <span id="charCount">0 caracteres</span> • 
                                                        <span id="elementCount">0 elementos</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Separador redimensionable -->
                                <div class="col-md-1 border-start border-end resize-handle" style="cursor: col-resize; background: #f8f9fa; max-width: 8px;"></div>
                                
                                <!-- Vista Previa -->
                                <div class="col-md-5 d-flex flex-column">
                                    <div class="d-flex flex-column h-100">
                                        <!-- Header de Vista Previa -->
                                        <div class="p-3 border-bottom bg-light d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 class="mb-0">👁️ Vista Previa en Tiempo Real</h6>
                                                <small class="text-muted">Actualización instantánea</small>
                                            </div>
                                            <div class="d-flex gap-2">
                                                <button class="btn btn-sm btn-outline-secondary" onclick="refreshPreview()" title="Actualizar vista previa">
                                                    🔄
                                                </button>
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input" type="checkbox" id="autoRefresh" checked>
                                                    <label class="form-check-label small" for="autoRefresh">Auto</label>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <!-- Vista Previa -->
                                        <iframe id="interactiveLivePreview" 
                                                class="w-100 flex-grow-1 border-0 preview-frame"
                                                sandbox="allow-scripts"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-footer justify-content-between">
                        <div class="d-flex gap-2">
                            <button class="btn btn-outline-danger" onclick="resetInteractiveEditor()">🔄 Reiniciar</button>
                            <button class="btn btn-outline-success" onclick="saveInteractiveCode()">💾 Guardar</button>
                            <button class="btn btn-outline-primary" onclick="exportCode()">📤 Exportar</button>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-success" onclick="testInteractiveCode()">🧪 Probar en Nueva Pestaña</button>
                            <button class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        initResizablePanels();
        initKeyboardShortcuts();
        initTemplateSelector();
    }

    // Inicializar paneles redimensionables
    function initResizablePanels() {
        const resizeHandle = document.querySelector('.resize-handle');
        if (!resizeHandle) return;

        const editorLayout = document.getElementById('editorLayout');
        let isResizing = false;

        resizeHandle.addEventListener('mousedown', function (e) {
            isResizing = true;
            document.body.style.cursor = 'col-resize';
            document.addEventListener('mousemove', handleResize);
            document.addEventListener('mouseup', stopResize);
        });

        function handleResize(e) {
            if (!isResizing) return;
            const containerRect = editorLayout.getBoundingClientRect();
            const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

            if (newLeftWidth > 20 && newLeftWidth < 80) {
                editorLayout.style.gridTemplateColumns = `${newLeftWidth}% 8px ${100 - newLeftWidth - 2}%`;
            }
        }

        function stopResize() {
            isResizing = false;
            document.body.style.cursor = '';
            document.removeEventListener('mousemove', handleResize);
            document.removeEventListener('mouseup', stopResize);
        }
    }

    // Atajos de teclado profesionales
    function initKeyboardShortcuts() {
        document.addEventListener('keydown', function (e) {
            const editorModal = document.getElementById('interactiveEditorModal');
            if (!editorModal || !editorModal.classList.contains('show')) return;

            const editor = document.getElementById('interactiveCodeEditor');
            if (!editor) return;

            // Ctrl+S para guardar
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                saveInteractiveCode();
            }

            // Ctrl+Enter para probar
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                testInteractiveCode();
            }

            // Ctrl+R para resetear
            if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                resetInteractiveEditor();
            }

            // Ctrl+F para formatear
            if (e.ctrlKey && e.key === 'f') {
                e.preventDefault();
                formatCode();
            }
        });
    }

    // Inicializar selector de plantillas
    function initTemplateSelector() {
        const templateSelector = document.getElementById('templateSelector');
        if (templateSelector) {
            templateSelector.addEventListener('change', function () {
                loadTemplate(this.value);
            });
        }
    }

    // Función mejorada para abrir el editor
    function openInteractiveEditor(initialCode, preElement) {
        if (!document.getElementById('interactiveEditorModal')) {
            createInteractiveEditorModal();
        }

        const editorModal = document.getElementById('interactiveEditorModal');
        const codeEditor = document.getElementById('interactiveCodeEditor');
        const livePreview = document.getElementById('interactiveLivePreview');

        // Configurar editor con valor inicial
        codeEditor.value = initialCode;
        updateInteractivePreview(initialCode, livePreview);
        updateEditorStats(initialCode);

        // Configurar eventos en tiempo real
        let debounceTimer;
        codeEditor.addEventListener('input', function () {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                if (document.getElementById('autoRefresh')?.checked) {
                    updateInteractivePreview(this.value, livePreview);
                }
                updateEditorStats(this.value);
            }, 300);
        });

        // Eventos adicionales
        codeEditor.addEventListener('keydown', function (e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.selectionStart;
                const end = this.selectionEnd;
                this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 4;
            }
        });

        // Mostrar modal
        const modal = new bootstrap.Modal(editorModal);
        modal.show();

        // Enfocar editor después de que se muestre
        setTimeout(() => {
            codeEditor.focus();
            codeEditor.select();
        }, 500);
    }

    // Actualizar estadísticas del editor
    function updateEditorStats(code) {
        if (!code) code = '';
        const lines = code.split('\n').length;
        const chars = code.length;
        const elements = countHTMLElements(code);

        const lineCountEl = document.getElementById('lineCount');
        const charCountEl = document.getElementById('charCount');
        const elementCountEl = document.getElementById('elementCount');
        const consoleEl = document.getElementById('editorConsole');

        if (lineCountEl) lineCountEl.textContent = `${lines} líneas`;
        if (charCountEl) charCountEl.textContent = `${chars} caracteres`;
        if (elementCountEl) elementCountEl.textContent = `${elements} elementos`;

        // Actualizar consola
        if (consoleEl) {
            consoleEl.innerHTML = `
                <span class="text-success">✓ Código válido</span> | 
                <span class="text-info">${new Date().toLocaleTimeString()}</span>
            `;
        }
    }

    // Vista previa mejorada en tiempo real
    function updateInteractivePreview(code, iframe) {
        if (!code) code = '';
        const scaffold = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vista Previa Interactiva - Bootstrap 5</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            transition: all 0.3s ease;
        }
        .preview-container {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 15px 35px rgba(0,0,0,0.1);
            margin: 1rem 0;
            border: 1px solid rgba(255,255,255,0.2);
        }
        .code-info {
            background: rgba(255,255,255,0.95);
            border-radius: 10px;
            padding: 1rem;
            margin: 1rem 0;
            border-left: 4px solid #0d6efd;
        }
        .element-highlight {
            transition: all 0.3s ease;
        }
        .element-highlight:hover {
            box-shadow: 0 0 0 2px #0d6efd;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="preview-container element-highlight">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-primary mb-0">🎯 Vista Previa Interactiva</h4>
                <span class="badge bg-success">Bootstrap 5</span>
            </div>
            <div class="alert alert-info">
                <strong>💡 Editando en tiempo real:</strong> Los cambios se reflejan instantáneamente
            </div>
            ${code}
        </div>
        
        <div class="code-info">
            <h6>📊 Análisis del Código</h6>
            <div class="row">
                <div class="col-md-4">
                    <strong>Elementos HTML:</strong> ${countHTMLElements(code)}
                </div>
                <div class="col-md-4">
                    <strong>Clases Bootstrap:</strong> ${countBootstrapClasses(code)}
                </div>
                <div class="col-md-4">
                    <strong>Estado:</strong> <span class="text-success">✓ Funcionando</span>
                </div>
            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // Scripts para interactividad en la vista previa
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('btn')) {
                console.log('Botón clickeado:', e.target.textContent);
            }
        });
        
        // Resaltar elementos al pasar el mouse
        const elements = document.querySelectorAll('.element-highlight');
        elements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            el.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    </script>
</body>
</html>`;

        if (iframe) {
            iframe.srcdoc = scaffold;
        }
    }

    // ===== FUNCIONES GLOBALES MEJORADAS =====
    window.setProgressFor = function (id) {
        var seen = JSON.parse(localStorage.getItem('tutorialProgress') || '{}');
        seen[id] = Date.now();
        localStorage.setItem('tutorialProgress', JSON.stringify(seen));
        updateProgressUI();
    };

    window.updateProgressUI = function () {
        var main = document.getElementById('mainContent') || document.body;
        var headings = main.querySelectorAll('h2');
        var seen = JSON.parse(localStorage.getItem('tutorialProgress') || '{}');
        var count = 0;
        headings.forEach(function (h) { if (seen[h.id]) count++; });
        var pct = headings.length ? Math.round((count / headings.length) * 100) : 0;
        var bar = document.getElementById('courseProgress');
        if (bar) {
            bar.style.width = pct + '%';
            bar.textContent = pct + '%';
            bar.setAttribute('aria-valuenow', pct);
        }
    };

    window.resetInteractiveEditor = function () {
        const initialBtn = document.querySelector('pre.code-block [data-action="edit"]');
        if (!initialBtn) return;

        const initialCode = initialBtn.closest('pre').querySelector('code').textContent;
        const codeEditor = document.getElementById('interactiveCodeEditor');
        if (codeEditor) {
            codeEditor.value = initialCode;
            updateInteractivePreview(initialCode, document.getElementById('interactiveLivePreview'));
            updateEditorStats(initialCode);
            showNotification('Editor reiniciado correctamente', 'success');
        }
    };

    window.saveInteractiveCode = function () {
        const codeEditor = document.getElementById('interactiveCodeEditor');
        if (!codeEditor) return;

        const editedCode = codeEditor.value;
        localStorage.setItem('bootstrapEditorCode', editedCode);
        showNotification('Código guardado en localStorage', 'success');
    };

    window.testInteractiveCode = function () {
        const codeEditor = document.getElementById('interactiveCodeEditor');
        if (!codeEditor) return;

        const code = codeEditor.value;
        const completeHTML = `<!DOCTYPE html>
<html>
<head>
    <title>Prueba tu Código - Bootstrap 5</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-4">
        ${code}
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;

        const blob = new Blob([completeHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        showNotification('Abriendo en nueva pestaña...', 'info');
    };

    window.refreshPreview = function () {
        const codeEditor = document.getElementById('interactiveCodeEditor');
        if (!codeEditor) return;

        const code = codeEditor.value;
        updateInteractivePreview(code, document.getElementById('interactiveLivePreview'));
        showNotification('Vista previa actualizada', 'info');
    };

    window.formatCode = function () {
        const editor = document.getElementById('interactiveCodeEditor');
        if (!editor) return;

        let code = editor.value;

        // Formateo básico (puedes mejorar esto)
        code = code
            .replace(/\>\s*\</g, '>\n<')
            .replace(/\s{2,}/g, ' ')
            .trim();

        editor.value = code;
        updateEditorStats(code);
        showNotification('Código formateado', 'info');
    };

    window.exportCode = function () {
        const codeEditor = document.getElementById('interactiveCodeEditor');
        if (!codeEditor) return;

        const code = codeEditor.value;
        const blob = new Blob([code], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'codigo-bootstrap.html';
        a.click();
        showNotification('Código exportado', 'success');
    };

    window.toggleFullscreen = function () {
        const modal = document.querySelector('#interactiveEditorModal .modal-dialog');
        if (modal) {
            modal.classList.toggle('modal-fullscreen');
        }
    };

    window.loadTemplate = function (templateType) {
        const templates = {
            basic: `<div class="container">\n  <h1>¡Hola Bootstrap!</h1>\n  <p>Este es un template básico.</p>\n  <button class="btn btn-primary">Botón de ejemplo</button>\n</div>`,
            card: `<div class="card" style="width: 18rem;">\n  <img src="..." class="card-img-top" alt="...">\n  <div class="card-body">\n    <h5 class="card-title">Título de la tarjeta</h5>\n    <p class="card-text">Texto de ejemplo para la tarjeta.</p>\n    <a href="#" class="btn btn-primary">Ir a algún lugar</a>\n  </div>\n</div>`,
            form: `<form>\n  <div class="mb-3">\n    <label for="exampleInput" class="form-label">Email address</label>\n    <input type="email" class="form-control" id="exampleInput">\n  </div>\n  <div class="mb-3">\n    <label for="examplePassword" class="form-label">Password</label>\n    <input type="password" class="form-control" id="examplePassword">\n  </div>\n  <button type="submit" class="btn btn-primary">Submit</button>\n</form>`,
            navbar: `<nav class="navbar navbar-expand-lg navbar-light bg-light">\n  <div class="container-fluid">\n    <a class="navbar-brand" href="#">Navbar</a>\n    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">\n      <span class="navbar-toggler-icon"></span>\n    </button>\n    <div class="collapse navbar-collapse" id="navbarNav">\n      <ul class="navbar-nav">\n        <li class="nav-item">\n          <a class="nav-link active" href="#">Home</a>\n        </li>\n        <li class="nav-item">\n          <a class="nav-link" href="#">Features</a>\n        </li>\n      </ul>\n    </div>\n  </div>\n</nav>`
        };

        if (templates[templateType]) {
            const codeEditor = document.getElementById('interactiveCodeEditor');
            if (codeEditor) {
                codeEditor.value = templates[templateType];
                updateInteractivePreview(templates[templateType], document.getElementById('interactiveLivePreview'));
                updateEditorStats(templates[templateType]);
                showNotification(`Plantilla "${templateType}" cargada`, 'info');
            }
        }
    };

    // 5) small helpers and init
    function init() {
        // make sure there's an id for main content wrapper (if not present, add it)
        if (!document.getElementById('mainContent')) {
            var mainCard = document.querySelector('.col-md-10 > .card');
            if (mainCard) {
                var wrapper = document.createElement('main');
                wrapper.id = 'mainContent';
                mainCard.parentNode.insertBefore(wrapper, mainCard);
                wrapper.appendChild(mainCard);
            }
        }
        buildTOC();
        initCodeTools();
        updateProgressUI();
        // show skip link only on keyboard focus (makes it accessible)
        var skip = document.querySelector('.skip-link');
        if (skip) {
            skip.addEventListener('focus', function () { this.style.display = 'inline-block'; });
            skip.addEventListener('blur', function () { this.style.display = 'none'; });
        }
        initGlobalTooltipsAndPopovers();
        initInformativePopovers();
        initEducationalPopovers();
        initEnhancedTooltips();
        initAlertClosePopovers();
        // show skip link only on keyboard focus (makes it accessible)
        var skip = document.querySelector('.skip-link');
        if (skip) {
            skip.addEventListener('focus', function () { this.style.display = 'inline-block'; });
            skip.addEventListener('blur', function () { this.style.display = 'none'; });
        }
    }
    // ===== TOOLTIPS Y POPOVERS GLOBALES - VERSIÓN CORREGIDA =====
    function initGlobalTooltipsAndPopovers() {
        // Esperar a que Bootstrap esté completamente cargado
        setTimeout(() => {
            try {
                // 1. INICIALIZAR TOOLTIPS EXISTENTES
                const existingTooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
                existingTooltips.forEach(el => {
                    try {
                        new bootstrap.Tooltip(el);
                    } catch (e) {
                        console.log('Error inicializando tooltip existente:', e);
                    }
                });

                // 2. INICIALIZAR POPOVERS EXISTENTES  
                const existingPopovers = document.querySelectorAll('[data-bs-toggle="popover"]');
                existingPopovers.forEach(el => {
                    try {
                        new bootstrap.Popover(el);
                    } catch (e) {
                        console.log('Error inicializando popover existente:', e);
                    }
                });

                // 3. AGREGAR TOOLTIPS AUTOMÁTICOS A ELEMENTOS CLAVE
                initAutomaticTooltips();

                // 4. AGREGAR POPOVERS INFORMATIVOS
                initInformativePopovers();

                console.log('✅ Tooltips y Popovers inicializados correctamente');

            } catch (error) {
                console.error('❌ Error inicializando tooltips/popovers:', error);
            }
        }, 500);
    }

    // TOOLTIPS AUTOMÁTICOS - VERSIÓN MEJORADA
    function initAutomaticTooltips() {
        const tooltipConfigs = [
            // === NAVBAR ===
            {
                selector: '#themeToggle',
                config: {
                    title: '🌙 Alternar tema claro/oscuro',
                    placement: 'bottom'
                }
            },
            {
                selector: '.navbar-brand',
                config: {
                    title: '🏠 Volver al inicio del tutorial',
                    placement: 'bottom'
                }
            },
            {
                selector: '#globalSearchInput + .btn',
                config: {
                    title: '🔍 Buscar en todo el contenido',
                    placement: 'bottom'
                }
            },
            {
                selector: '#mainNavbar .btn-light[target="_blank"]',
                config: {
                    title: '⭐ Ver repositorio en GitHub',
                    placement: 'bottom'
                }
            },
            {
                selector: '#mainNavbar .btn-outline-light[href*="github-tutorial"]',
                config: {
                    title: '📚 Tutorial de GitHub Pages',
                    placement: 'bottom'
                }
            },

            // === BOTONES DE CÓDIGO ===
            {
                selector: '[data-action="copy"]',
                config: {
                    title: '📋 Copiar código al portapapeles',
                    placement: 'left'
                }
            },
            {
                selector: '[data-action="try"]',
                config: {
                    title: '🚀 Probar código en vivo',
                    placement: 'left'
                }
            },
            {
                selector: '[data-action="edit"]',
                config: {
                    title: '🎮 Editor interactivo - ¡Edita en tiempo real!',
                    placement: 'left'
                }
            },

            // === BOTONES DE NAVEGACIÓN ===
            {
                selector: '.btn-outline-primary.btn-sm[href*="ProyectoFinal"], .btn-outline-primary.btn-sm[href="#mainContent"]',
                config: {
                    title: '🏠 Volver al inicio',
                    placement: 'top'
                }
            },
            {
                selector: '.btn-outline-success.btn-sm',
                config: {
                    title: '➡️ Ir a la siguiente lección',
                    placement: 'top'
                }
            },
            {
                selector: '.btn-outline-info.btn-sm[onclick*="resetProgress"]',
                config: {
                    title: '🔄 Reiniciar progreso de aprendizaje',
                    placement: 'top'
                }
            },

            // === FOOTER ===
            {
                selector: '.site-footer .btn-outline-light',
                config: {
                    title: '🌐 Seguirnos en redes sociales',
                    placement: 'top'
                }
            },
            {
                selector: '#footerSubscribe button',
                config: {
                    title: '📩 Suscribirse al newsletter',
                    placement: 'top'
                }
            },

            // === ELEMENTOS DE CONTENIDO ===
            {
                selector: '.card-header h2, .card-header h3',
                config: {
                    title: '📖 Sección de aprendizaje',
                    placement: 'top'
                }
            },
            {
                selector: '.alert strong',
                config: {
                    title: '💡 Información importante',
                    placement: 'top'
                }
            }
        ];

        tooltipConfigs.forEach(({ selector, config }) => {
            try {
                document.querySelectorAll(selector).forEach(element => {
                    // Solo agregar si no tiene tooltip ya
                    if (!element.hasAttribute('data-bs-toggle')) {
                        element.setAttribute('data-bs-toggle', 'tooltip');
                        element.setAttribute('data-bs-title', config.title);
                        element.setAttribute('data-bs-placement', config.placement);

                        // Inicializar el tooltip inmediatamente
                        new bootstrap.Tooltip(element, {
                            delay: { show: 500, hide: 100 }
                        });
                    }
                });
            } catch (error) {
                console.warn(`No se pudo inicializar tooltips para: ${selector}`, error);
            }
        });
    }

    // POPOVERS INFORMATIVOS - VERSIÓN MEJORADA
    function initInformativePopovers() {
        const popoverConfigs = [
            {
                selector: '.dropdown-toggle',
                config: {
                    title: '📚 Más opciones',
                    content: 'Explora todas las secciones disponibles en esta categoría',
                    placement: 'bottom',
                    trigger: 'hover focus'
                }
            },
            {
                selector: '.progress',
                config: {
                    title: '📊 Tu progreso',
                    content: 'Así vas en el tutorial. ¡Completa todas las secciones para llegar al 100%!',
                    placement: 'left',
                    trigger: 'hover'
                }
            },
            {
                selector: 'pre.code-block',
                config: {
                    title: '💻 Código interactivo',
                    content: '¡Usa los botones para copiar, probar o editar este código! Aprende haciendo modificaciones.',
                    placement: 'top',
                    trigger: 'hover'
                }
            },
            {
                selector: '.site-hero .btn',
                config: {
                    title: '🎯 Comienza a aprender',
                    content: 'Estas son las acciones principales para empezar con esta sección',
                    placement: 'bottom',
                    trigger: 'hover'
                }
            }
        ];

        popoverConfigs.forEach(({ selector, config }) => {
            try {
                document.querySelectorAll(selector).forEach(element => {
                    if (!element.hasAttribute('data-bs-toggle')) {
                        element.setAttribute('data-bs-toggle', 'popover');
                        element.setAttribute('data-bs-title', config.title);
                        element.setAttribute('data-bs-content', config.content);
                        element.setAttribute('data-bs-placement', config.placement);
                        element.setAttribute('data-bs-trigger', config.trigger);

                        new bootstrap.Popover(element, {
                            delay: { show: 500, hide: 200 }
                        });
                    }
                });
            } catch (error) {
                console.warn(`No se pudo inicializar popover para: ${selector}`, error);
            }
        });
    }

    // POPOVERS EDUCATIVOS ESPECÍFICOS
    function initEducationalPopovers() {
        // Popovers para alertas según su tipo
        const alertTypes = {
            'alert-info': {
                title: '💡 Información útil',
                content: 'Esta información te ayudará a entender mejor los conceptos'
            },
            'alert-warning': {
                title: '⚠️ Atención importante',
                content: 'Presta especial atención a este punto crítico'
            },
            'alert-danger': {
                title: '🚨 Concepto esencial',
                content: 'No pases por alto esta información fundamental'
            },
            'alert-success': {
                title: '✅ Buenas prácticas',
                content: 'Sigue estas recomendaciones para mejores resultados'
            }
        };

        Object.keys(alertTypes).forEach(alertClass => {
            try {
                document.querySelectorAll(`.alert.${alertClass}`).forEach(alert => {
                    if (!alert.hasAttribute('data-bs-toggle')) {
                        const config = alertTypes[alertClass];
                        alert.setAttribute('data-bs-toggle', 'popover');
                        alert.setAttribute('data-bs-title', config.title);
                        alert.setAttribute('data-bs-content', config.content);
                        alert.setAttribute('data-bs-placement', 'top');
                        alert.setAttribute('data-bs-trigger', 'hover');

                        new bootstrap.Popover(alert);
                    }
                });
            } catch (error) {
                console.warn(`Error con alertas ${alertClass}:`, error);
            }
        });
    }

    // INICIALIZACIÓN MEJORADA - CON MÁS INTELIGENCIA
    function initEnhancedTooltips() {
        // Esperar a que todo esté listo
        if (typeof bootstrap === 'undefined') {
            console.warn('Bootstrap no está cargado, reintentando en 1 segundo...');
            setTimeout(initEnhancedTooltips, 1000);
            return;
        }

        // Inicializar en fases
        setTimeout(() => {
            initGlobalTooltipsAndPopovers();
        }, 100);

        // Re-intentar después de 2 segundos por si hay elementos que cargan después
        setTimeout(() => {
            initAutomaticTooltips();
            initEducationalPopovers();
        }, 2000);

        // Inicializar también cuando se hace clic (para elementos dinámicos)
        document.addEventListener('click', function () {
            setTimeout(initAutomaticTooltips, 100);
        });
    }
    // ===== SOLUCIÓN PARA POPOVERS EN ALERTAS CON CIERRE =====
    // ===== SOLUCIÓN PARA POPOVERS/TOOLTIPS EN ALERTAS CON CIERRE (REEMPLAZAR) =====
    function initAlertClosePopovers() {
        const alertasConCierre = document.querySelectorAll('.alert-dismissible');
        if (alertasConCierre.length === 0) return;

        console.log('🔧 Inicializando manejo de popovers/tooltips en alertas con cierre...');

        // Helper: dispose popover + tooltip for a given element (if existe)
        function disposeIfAny(el) {
            if (!el) return;
            try {
                const popInst = bootstrap.Popover.getInstance(el);
                if (popInst) { popInst.dispose(); console.log('🗑️ disposed Popover for', el); }
            } catch (e) { /* ignore */ }

            try {
                const tipInst = bootstrap.Tooltip.getInstance(el);
                if (tipInst) { tipInst.dispose(); console.log('🗑️ disposed Tooltip for', el); }
            } catch (e) { /* ignore */ }

            // remove attributes so later initializers won't re-create them unintentionally
            try {
                el.removeAttribute('data-bs-toggle');
                el.removeAttribute('data-bs-title');
                el.removeAttribute('data-bs-content');
                el.removeAttribute('data-bs-placement');
                el.removeAttribute('data-bs-trigger');
            } catch (e) { /* ignore */ }
        }

        alertasConCierre.forEach(alerta => {
            // 1) Antes de que Bootstrap remueva el elemento: close.bs.alert
            alerta.addEventListener('close.bs.alert', function () {
                // dispose on the alert itself (if it has a popover/tooltip)
                disposeIfAny(alerta);

                // dispose on any btn-close inside (por si tienen su propio popover)
                const botonCierre = alerta.querySelector('.btn-close');
                disposeIfAny(botonCierre);

                // dispose on cualquier hijo que tenga data-bs-toggle tooltip/popover
                const children = alerta.querySelectorAll('[data-bs-toggle="popover"], [data-bs-toggle="tooltip"]');
                children.forEach(child => disposeIfAny(child));
            });

            // 2) Fallback: después del cierre final (en caso que haya animación y algo haya quedado)
            alerta.addEventListener('closed.bs.alert', function () {
                const botonCierre = this.querySelector('.btn-close');
                disposeIfAny(botonCierre);
                disposeIfAny(this);
                const children = this.querySelectorAll('[data-bs-toggle="popover"], [data-bs-toggle="tooltip"]');
                children.forEach(child => disposeIfAny(child));
                // pequeño timeout para forzar limpieza si algo quedó
                setTimeout(() => {
                    try {
                        const children2 = document.querySelectorAll('[data-bs-toggle="popover"], [data-bs-toggle="tooltip"]');
                        // si hay elementos huérfanos relacionados, no hacemos un dispose global; solo log
                        console.log('🔎 post-closed check, remaining popover/tooltip count:', children2.length);
                    } catch (e) { /* ignore */ }
                }, 120);
            });

            // 3) Extra fallback: si el usuario clickea el botón de cierre directamente
            const botonCierre = alerta.querySelector('.btn-close');
            if (botonCierre) {
                botonCierre.addEventListener('click', function () {
                    // delay cortito para permitir que Bootstrap inicie la transición
                    setTimeout(() => {
                        disposeIfAny(this);
                    }, 40);
                });
            }
        });

        console.log(`✅ ${alertasConCierre.length} alertas con cierre configuradas (cleanup listeners)`);

    }
    // ===== INIT ESPECÍFICO: tooltip estable para el brand (evita duplicados) =====
    function initBrandTooltipSafe() {
        // primer intento por id, si no existe usar .navbar-brand (primer match)
        var el = document.getElementById('brandLogo') || document.querySelector('.navbar-brand');
        if (!el) return;

        // asegurar que el atributo title exista (contenido del tooltip)
        if (!el.getAttribute('title') && !el.getAttribute('data-bs-title')) {
            el.setAttribute('title', 'Volver al inicio del Tutorial');
        }

        // limpiar instancias antiguas en caso de doble-inicialización
        var prev = bootstrap.Tooltip.getInstance(el);
        if (prev) {
            try { prev.dispose(); } catch (e) { /* ignore */ }
        }

        // eliminar tooltips huérfanos en DOM que puedan haber quedado (seguro preventivo)
        document.querySelectorAll('.tooltip').forEach(function (t) {
            // sólo eliminar tooltips que no estén asociados a una instancia actual
            if (!t.closest('[data-bs-original-title]')) {
                t.parentNode && t.parentNode.removeChild(t);
            }
        });

        // crear nueva instancia controlada
        var tt = new bootstrap.Tooltip(el, {
            trigger: 'hover focus',
            container: 'body',
            delay: { show: 100, hide: 140 },
            sanitize: false
        });

        // refuerzo: hide cuando mouseleave del elemento y del tooltip (por si hay flicker)
        var hideTimer;
        el.addEventListener('mouseleave', function () {
            clearTimeout(hideTimer);
            hideTimer = setTimeout(function () { try { tt.hide(); } catch (e) { } }, 160);
        });
        el.addEventListener('mouseenter', function () {
            clearTimeout(hideTimer);
            // show con pequeña protección contra duplicados
            try {
                if (!tt || (tt.getTipElement && !tt.getTipElement())) tt.show();
                else tt.show();
            } catch (e) { /* ignore */ }
        });

        // adicional: asegurar que al hacer click fuera o navegar, tooltip se oculta
        document.addEventListener('click', function (ev) {
            if (!el.contains(ev.target)) {
                try { tt.hide(); } catch (e) { }
            }
        });

        // Exponer la instancia por si quieres manipularla en consola
        el.__brandTooltip = tt;
    }
    // run
    document.addEventListener('DOMContentLoaded', init,initBrandTooltipSafe);




})();
