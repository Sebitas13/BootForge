(function () {
    // --- Search index builder ---
    var searchIndex = null;
    
    // Asegurarnos de que setProgressFor esté disponible
    if (typeof window.setProgressFor === 'undefined') {
        window.setProgressFor = function(id) {
            console.log('setProgressFor llamado con:', id);
            // Función de respaldo si no está definida en main.js
            var seen = JSON.parse(localStorage.getItem('tutorialProgress') || '{}');
            seen[id] = Date.now();
            localStorage.setItem('tutorialProgress', JSON.stringify(seen));
            if (typeof window.updateProgressUI === 'function') {
                window.updateProgressUI();
            }
        };
    }

    function buildSearchIndex() {
        searchIndex = [];
        var main = document.getElementById('mainContent') || document.body;
        // headings
        [].slice.call(main.querySelectorAll('h1,h2,h3,h4')).forEach(function (h) {
            if (!h.id) h.id = 'sec_' + Math.random().toString(36).slice(2, 8);
            searchIndex.push({
                type: 'heading',
                title: h.textContent.trim(),
                snippet: (h.nextElementSibling && h.nextElementSibling.textContent.slice(0, 200)) || '',
                id: h.id
            });
        });
        // code snippets
        [].slice.call(main.querySelectorAll('pre.code-block code')).forEach(function (code, i) {
            var parent = code.closest('section') || code.closest('main') || document.body;
            var nearestHeading = parent.querySelector('h2, h1, h3') || null;
            searchIndex.push({
                type: 'code',
                title: nearestHeading ? nearestHeading.textContent.trim() : 'Ejemplo de código',
                snippet: code.textContent.slice(0, 250),
                code: code.textContent,
                sectionId: (nearestHeading && nearestHeading.id) || null
            });
        });
    }

    // helper fuzzy (simple)
    function textMatch(term, text) {
        if (!term) return false;
        term = term.toLowerCase();
        return (text || '').toLowerCase().indexOf(term) !== -1;
    }

    // performSearch: invoked by header form onsubmit
    window.performSearch = function (e) {
        if (e && e.preventDefault) e.preventDefault();
        var q = (document.getElementById('globalSearchInput') && document.getElementById('globalSearchInput').value.trim()) || '';
        var list = document.getElementById('searchResultsList');
        if (!list) return false;
        
        list.innerHTML = '';
        if (!searchIndex) buildSearchIndex();
        if (!q) {
            list.innerHTML = '<p class="text-muted small m-2">Ingrese términos para buscar.</p>';
            new bootstrap.Modal(document.getElementById('searchResultsModal')).show();
            return false;
        }
        var matches = searchIndex.filter(function (item) {
            return textMatch(q, item.title) || textMatch(q, item.snippet) || textMatch(q, item.code || '');
        });
        if (!matches.length) {
            list.innerHTML = '<p class="text-muted small m-2">No se encontraron resultados.</p>';
            new bootstrap.Modal(document.getElementById('searchResultsModal')).show();
            return false;
        }
        // create list items
        matches.forEach(function (m) {
            var el = document.createElement('a');
            el.href = m.id ? ('#' + m.id) : (m.sectionId ? ('#' + m.sectionId) : '#inicio');
            el.className = 'list-group-item list-group-item-action';
            el.innerHTML = '<strong>' + (m.title || '') + '</strong><div class="small text-muted">' + (m.snippet || (m.code ? m.code.slice(0, 120) : '')) + '</div>';
            el.addEventListener('click', function (ev) {
                ev.preventDefault();
                // navigate and mark progress
                scrollToSectionSafe(el.getAttribute('href').slice(1));
                var modal = bootstrap.Modal.getInstance(document.getElementById('searchResultsModal'));
                if (modal) modal.hide();
            });
            list.appendChild(el);
        });
        new bootstrap.Modal(document.getElementById('searchResultsModal')).show();
        return false;
    };

    // safer scroll that uses history and marks progress
    function scrollToSectionSafe(id) {
        if (!id) return;
        var el = document.getElementById(id);
        if (!el) {
            // try headings text match
            var found = [].slice.call(document.querySelectorAll('h2,h3,h1')).find(function (h) {
                return h.textContent.trim().toLowerCase().indexOf(id.toLowerCase()) !== -1;
            });
            el = found || el;
        }
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(function () { 
                if (typeof window.setProgressFor === 'function') {
                    window.setProgressFor(el.id || ('h_' + Math.random().toString(36).slice(2, 6))); 
                }
            }, 450);
        }
    }
    window.scrollToSectionSafe = scrollToSectionSafe; // export if needed

    // IntersectionObserver: marca headings como "vistas" para progreso
    function initSectionObserver() {
        var main = document.getElementById('mainContent') || document.body;
        var headings = [].slice.call(main.querySelectorAll('h2'));
        if (!headings.length) return;
        var options = { root: null, rootMargin: '0px', threshold: 0.55 };
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.id || (entry.target.id = 'h_' + Math.random().toString(36).slice(2, 6));
                    if (typeof window.setProgressFor === 'function') {
                        window.setProgressFor(id);
                    }
                }
            });
        }, options);
        headings.forEach(function (h) { obs.observe(h); });
    }

    // enhance updateProgressUI to set aria- attributes and color classes
    var originalUpdate = window.updateProgressUI;
    window.updateProgressUI = function () {
        if (typeof originalUpdate === 'function') originalUpdate();
        var bar = document.getElementById('courseProgress');
        if (!bar) return;
        var pct = parseInt(bar.textContent, 10) || parseInt(bar.style.width || 0, 10) || 0;
        bar.setAttribute('role', 'progressbar');
        bar.setAttribute('aria-valuenow', pct);
        bar.setAttribute('aria-valuemin', 0);
        bar.setAttribute('aria-valuemax', 100);
        // color logic
        bar.classList.remove('bg-success', 'bg-warning', 'bg-danger');
        if (pct >= 61) bar.classList.add('bg-success');
        else if (pct >= 59) bar.classList.add('bg-warning');
        else bar.classList.add('bg-danger');
    };

    // init runner: build index + observer after DOMContent loaded
    document.addEventListener('DOMContentLoaded', function () {
        buildSearchIndex();
        initSectionObserver();
        // re-build index if DOM changes (e.g. navigating, injecting examples)
        new MutationObserver(function () { buildSearchIndex(); }).observe(document.getElementById('mainContent') || document.body, { childList: true, subtree: true });
    });
})();