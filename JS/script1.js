
(function () {
    var storageKey = 'studentsData_v1';
    var tbody = document.querySelector('.table tbody');
    var modalEl = document.getElementById('myModal');
    var modalTitle = modalEl.querySelector('.modal-title');
    var avatarInput = document.getElementById('avatarInput');
    var avatarUrlInput = document.getElementById('avatarUrlInput');
    var avatarPreview = document.getElementById('avatarPreview');
    var saveBtn = document.getElementById('saveRecordBtn');
    var form = document.getElementById('addRecordForm');
    var detailsInput = document.getElementById('studentDetails');

    var imageSearchModalEl = document.getElementById('imageSearchModal');
    var imageSearchInput = document.getElementById('imageSearchInput');
    var imageSearchBtn = document.getElementById('imageSearchBtn');
    var imageSearchResults = document.getElementById('imageSearchResults');
    var openImageSearchBtn = document.getElementById('openImageSearchBtn');

    var data = []; // array of records { name, grade, avatarSrc, details }
    var modalState = null; // { type:'add' } or { type:'edit', index: n }
    var lastSaveTimestamp = 0;
    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        return String(str).replace(/[&<>"'`=\/]/g, function (s) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;', '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;' }[s];
        });
    }

    function saveData() {
        try { localStorage.setItem(storageKey, JSON.stringify(data)); } catch (e) { console.warn('Storage error', e); }
    }
    function loadData() {
        try {
            var raw = localStorage.getItem(storageKey);
            return raw ? JSON.parse(raw) : null;
        } catch (e) { return null; }
    }

    // read initial existing rows from DOM (first load)
    function readInitialFromDOM() {
        var arr = [];
        var rows = tbody.querySelectorAll('tr:not(.collapse)');
        rows.forEach(function (r) {
            var avatar = r.querySelector('td img');
            var name = (r.querySelectorAll('td')[2] || {}).textContent || '';
            var prog = r.querySelector('.progress-bar');
            var grade = 0;
            if (prog) grade = parseInt((prog.textContent || '').replace('%', ''), 10) || parseInt((prog.style.width || '').replace('%', ''), 10) || 0;
            // find corresponding collapse by target
            var trigger = r.querySelector('[data-bs-toggle="collapse"]');
            var detailsText = '';
            if (trigger) {
                var target = trigger.getAttribute('data-bs-target') || trigger.getAttribute('href');
                var detailsEl = target && document.querySelector(target);
                if (detailsEl) {
                    var p = detailsEl.querySelector('.details-text') || detailsEl.querySelector('p');
                    if (p) detailsText = p.textContent || '';
                }
            }
            arr.push({
                name: name.trim(),
                grade: grade,
                avatarSrc: avatar && avatar.src ? avatar.src : 'Imagenes/placeholder-avatar.png',
                details: (detailsText || '').trim()
            });
        });
        return arr;
    }

    function gradeClass(n) {
        var g = Number(n);
        if (g >= 59 && g <= 60) return 'bg-warning';
        if (g >= 61 && g <= 100) return 'bg-success';
        return 'bg-danger';
    }

    function attachCollapseToggleListeners(detailsId) {
        var sel = '#' + detailsId;
        var collapseEl = document.querySelector(sel);
        if (!collapseEl) return;
        collapseEl.addEventListener('show.bs.collapse', function () {
            document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(function (t) {
                var tTarget = t.getAttribute('data-bs-target') || t.getAttribute('href');
                if (tTarget === sel) t.classList.add('expanded');
            });
        });
        collapseEl.addEventListener('hide.bs.collapse', function () {
            document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(function (t) {
                var tTarget = t.getAttribute('data-bs-target') || t.getAttribute('href');
                if (tTarget === sel) t.classList.remove('expanded');
            });
        });
    }

    function initTooltipsAndPopovers(context) {
        context = context || document;
        [].slice.call(context.querySelectorAll('[data-bs-toggle="popover"]')).forEach(function (el) {
            try { if (!bootstrap.Popover.getInstance(el)) new bootstrap.Popover(el); } catch (e) { }
        });
        [].slice.call(context.querySelectorAll('[data-bs-toggle="tooltip"], [title]')).forEach(function (el) {
            try { if (!bootstrap.Tooltip.getInstance(el)) new bootstrap.Tooltip(el); } catch (e) { }
        });
    }
    function animateProgress(barEl, from, to, lastChange, duration) {
        from = Number(from) || 0;
        to = Number(to) || 0;
        var classes = ['bg-success', 'bg-warning', 'bg-danger'];
        classes.forEach(function (c) { barEl.classList.remove(c); });
        // set initial color according to `from`
        barEl.classList.add(gradeClass(from));

        // visual pulse class
        if (lastChange === 'up') barEl.classList.add('grade-up');
        else if (lastChange === 'down') barEl.classList.add('grade-down');
        else if (lastChange === 'new') barEl.classList.add('grade-new');

        // duration fallback / scale with diff but keep visible
        var diff = Math.abs(to - from);
        var autoDur = Math.min(2200, Math.max(1000, (duration || 800) + diff * 25));
        var D = autoDur;

        var startTime = null;
        function step(ts) {
            if (!startTime) startTime = ts;
            var elapsed = ts - startTime;
            var t = Math.min(1, elapsed / D);
            var eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            var current = Math.round(from + (to - from) * eased);
            barEl.style.width = current + '%';
            barEl.textContent = current + '%';
            if (t < 1) {
                requestAnimationFrame(step);
            } else {
                // final: switch to target color class (smooth via CSS)
                classes.forEach(function (c) { barEl.classList.remove(c); });
                barEl.classList.add(gradeClass(to));
                // clear temporary pulses shortly after finish
                setTimeout(function () { barEl.classList.remove('grade-up', 'grade-down', 'grade-new'); }, 700);
            }
        }
        // ensure starting visual
        barEl.style.width = from + '%';
        barEl.textContent = from + '%';
        requestAnimationFrame(step);
    }
    function getFilters() {
        // si no hay inputs de filtros en este archivo, devolvemos filtros vacíos
        try {
            return {
                name: (document.getElementById('searchNameInput') && document.getElementById('searchNameInput').value.trim().toLowerCase()) || '',
                min: (document.getElementById('searchMinInput') && document.getElementById('searchMinInput').value !== '') ? Number(document.getElementById('searchMinInput').value) : null,
                max: (document.getElementById('searchMaxInput') && document.getElementById('searchMaxInput').value !== '') ? Number(document.getElementById('searchMaxInput').value) : null,
                status: (document.getElementById('searchStatusSelect') && document.getElementById('searchStatusSelect').value) || 'all'
            };
        } catch (e) {
            return { name: '', min: null, max: null, status: 'all' };
        }
    }

    function applyFilters(arr) {
        var f = getFilters();
        if (!f) return arr;
        return arr.filter(function (rec) {
            if (f.name) {
                if (!rec.name.toLowerCase().includes(f.name)) return false;
            }
            if (f.min !== null && rec.grade < f.min) return false;
            if (f.max !== null && rec.grade > f.max) return false;
            if (f.status && f.status !== 'all') {
                if (f.status === 'passed' && rec.grade < 61) return false;
                if (f.status === 'warning' && !(rec.grade >= 59 && rec.grade <= 60)) return false;
                if (f.status === 'failed' && rec.grade >= 59) return false;
            }
            return true;
        });
    }
    function renderTable() {
        // clear tbody and render rows with progress bars that include data attributes
        tbody.innerHTML = '';
        var visibleList = applyFilters(data);
        visibleList.forEach(function (rec, idx) {
            var i = idx + 1;
            var detailsId = 'details' + i;
            var prev = (typeof rec.prevGrade !== 'undefined' && rec.prevGrade !== null) ? rec.prevGrade : rec.grade || 0;
            // progress bar starts at prev (JS will animate from prev->target)
            var progressHTML = '<div class="progress" style="height:1.1rem"><div class="progress-bar ' + gradeClass(prev) + ' progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-prev="' + prev + '" data-target="' + rec.grade + '" style="width:' + prev + '%">' + prev + '%</div></div>';

            var rowHtml = ''
                + '<tr data-idx="' + data.indexOf(rec) + '">'
                + '<td>' + i + '</td>'
                + '<td><img src="' + escapeHtml(rec.avatarSrc) + '" alt="avatar' + i + '" width="60" class="img-thumbnail rounded-circle clickable" role="button" data-bs-toggle="collapse" data-bs-target="#' + detailsId + '" aria-expanded="false" aria-controls="' + detailsId + '" tabindex="0" title="Ver detalles de ' + escapeHtml(rec.name) + '"></td>'
                + '<td><a href="#' + detailsId + '" class="text-decoration-none fw-semibold clickable" data-bs-toggle="collapse" data-bs-target="#' + detailsId + '" aria-expanded="false" aria-controls="' + detailsId + '" tabindex="0">' + escapeHtml(rec.name) + '</a></td>'
                + '<td class="text-center">' + progressHTML + '</td>'
                + '<td><button type="button" class="btn btn-warning btn-sm me-1" title="Editar registro" data-bs-toggle="popover" data-bs-content="Editar nombre, calificación y avatar" data-bs-trigger="focus">Editar</button>'
                + '<button type="button" class="btn btn-danger btn-small" title="Eliminar registro">Eliminar</button></td>'
                + '</tr>';

            var detailsHtml = ''
                + '<tr class="collapse" id="' + detailsId + '">'
                + '<td colspan="5"><div class="card card-body"><div class="row g-3 align-items-center">'
                + '<div class="col-12 col-md-3 text-center"><img src="' + escapeHtml(rec.avatarSrc) + '" alt="avatar grande" class="img-fluid rounded" style="max-width:170px;"></div>'
                + '<div class="col-12 col-md-9"><h6 class="mb-2">' + escapeHtml(rec.name) + ' — Detalles</h6>'
                + '<p class="mb-0 text-justify details-text">' + escapeHtml(rec.details || ('Información añadida vía formulario. Calificación: ' + rec.grade + ' %.')) + '</p>'
                + '<div class="mt-2"><button type="button" class="btn btn-sm btn-outline-primary open-edit-from-details" title="Editar desde panel de detalles">Editar este registro</button></div>'
                + '</div></div></div></td></tr>';

            tbody.insertAdjacentHTML('beforeend', rowHtml + detailsHtml);
            attachCollapseToggleListeners(detailsId);
        });

        // animate progress bars after DOM insertion (frame-by-frame via requestAnimationFrame)
        var bars = [].slice.call(tbody.querySelectorAll('.progress-bar'));
        bars.forEach(function (bar, idx) {
            var target = Number(bar.getAttribute('data-target')) || 0;
            var prev = Number(bar.getAttribute('data-prev')) || 0;
            // map to the underlying record using data-idx on row
            var row = bar.closest('tr');
            var dataIdx = row && row.getAttribute('data-idx');
            var rec = (dataIdx !== null && dataIdx !== undefined) ? data[Number(dataIdx)] : null;
            var lastChange = rec && rec.lastChange ? rec.lastChange : null;

            var baseStagger = 60 + (idx * 40);
            var additional = 0;
            // if record was just saved/edited we ensure at least 1500ms delay so modal closes visually
            if (rec && rec._justSaved) {
                var elapsed = Date.now() - lastSaveTimestamp;
                additional = Math.max(0, 1500 - elapsed);
            }
            var totalDelay = baseStagger + additional;

            // freshly created should animate from 0
            if (rec && rec.lastChange === 'new') {
                prev = 0;
                bar.setAttribute('data-prev', '0');
                bar.style.width = '0%';
                bar.textContent = '0%';
            } else {
                bar.style.width = prev + '%';
                bar.textContent = prev + '%';
            }

            setTimeout(function () {
                animateProgress(bar, prev, target, lastChange, 900);
                if (rec) {
                    rec.prevGrade = target;
                    var cleanupDelay = Math.max(900, 1200 + Math.abs(target - prev) * 25);
                    setTimeout(function () { if (rec) { delete rec._justSaved; delete rec.lastChange; saveData(); } }, cleanupDelay);
                }
            }, totalDelay);
        });

        initTooltipsAndPopovers(tbody);
    }
    // animate each progress-bar with appropriate direction and numeric counting

    // IMAGE SEARCH handlers
    if (openImageSearchBtn) openImageSearchBtn.addEventListener('click', function () {
        imageSearchResults.innerHTML = '';
        imageSearchInput.value = '';
        new bootstrap.Modal(imageSearchModalEl).show();
        imageSearchInput.focus();
    });
    function performImageSearch(query) {
        imageSearchResults.innerHTML = '';
        if (!query) { imageSearchResults.innerHTML = '<p class="text-muted">Ingrese término de búsqueda.</p>'; return; }
        for (var i = 0; i < 8; i++) {
            (function (idx) {
                var col = document.createElement('div'); col.className = 'col-6 col-md-3';
                var img = document.createElement('img');
                img.src = 'https://source.unsplash.com/400x400/?' + encodeURIComponent(query) + '&sig=' + (Date.now() + idx);
                img.alt = query + '-' + idx; img.className = 'img-fluid rounded selectable-online-image';
                img.style = 'cursor:pointer; object-fit:cover; height:120px; width:100%;';
                img.addEventListener('click', function () {
                    avatarUrlInput.value = img.src; avatarPreview.src = img.src;
                    var m = bootstrap.Modal.getInstance(imageSearchModalEl); if (m) m.hide();
                });
                col.appendChild(img); imageSearchResults.appendChild(col);
            })(i);
        }
    }
    if (imageSearchBtn) imageSearchBtn.addEventListener('click', function () { performImageSearch(imageSearchInput.value.trim() || 'person'); });
    if (imageSearchInput) imageSearchInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); performImageSearch(imageSearchInput.value.trim() || 'person'); } });

    // Preview handlers
    avatarInput && avatarInput.addEventListener('change', function (e) {
        var file = e.target.files && e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function (ev) { avatarPreview.src = ev.target.result; };
        reader.readAsDataURL(file);
    });
    avatarUrlInput && avatarUrlInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); var url = avatarUrlInput.value.trim(); if (url) avatarPreview.src = url; }
    });
    avatarUrlInput && avatarUrlInput.addEventListener('input', function () {
        if (avatarInput.files && avatarInput.files.length) return;
        var url = avatarUrlInput.value.trim(); if (url) avatarPreview.src = url;
    });
    if (avatarUrlInput) avatarUrlInput.addEventListener('paste', function () {
        setTimeout(function () { if (avatarInput.files && avatarInput.files.length) return; var url = avatarUrlInput.value.trim(); if (url) avatarPreview.src = url; }, 50);
    });

    // helpers
    function getRowFromBtn(btn) { return btn.closest('tr:not(.collapse)'); }
    function getIndexFromRow(row) { return parseInt(row.querySelector('td').textContent, 10) - 1; }
    /**
          * Validación robusta del formulario modal.
          * - Nombre: sólo letras/acento/espacio/apóstrofe/guion, 2-80 chars
          * - Detalles: requerido, min 5
          * - Calificación: número 0-100
          * - Avatar: debe haber archivo o URL o preview distinto al placeholder
          */
    function validateForm() {
        var ok = true;
        form.classList.remove('was-validated');
        // limpiar clases previas
        ['studentName', 'studentGrade', 'studentDetails', 'avatarUrlInput', 'avatarInput'].forEach(function (id) {
            var el = document.getElementById(id);
            if (el) { el.classList.remove('is-invalid', 'is-valid'); }
        });
        // NAME
        var nameEl = document.getElementById('studentName');
        var name = nameEl && nameEl.value.trim();
        var nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]{2,80}$/u;
        if (!name || !nameRegex.test(name)) {
            nameEl.classList.add('is-invalid');
            ok = false;
        } else { nameEl.classList.add('is-valid'); }
        // DETAILS
        var detailsEl = document.getElementById('studentDetails');
        var details = detailsEl && detailsEl.value.trim();
        if (!details || details.length < 5) {
            detailsEl.classList.add('is-invalid'); ok = false;
        } else { detailsEl.classList.add('is-valid'); }
        // GRADE
        var gradeEl = document.getElementById('studentGrade');
        var grade = Number(gradeEl && gradeEl.value);
        if (isNaN(grade) || grade < 0 || grade > 100) {
            gradeEl.classList.add('is-invalid'); ok = false;
        } else { gradeEl.classList.add('is-valid'); }
        // AVATAR: file OR url OR preview not placeholder
        var avatarOk = false;
        if (avatarInput && avatarInput.files && avatarInput.files.length) avatarOk = true;
        if (!avatarOk && avatarUrlInput && avatarUrlInput.value.trim()) avatarOk = true;
        var previewSrc = avatarPreview && avatarPreview.src ? avatarPreview.src : '';
        if (!avatarOk && previewSrc && !/placeholder-avatar\.png/i.test(previewSrc)) avatarOk = true;
        var avatarFeedback = document.getElementById('avatarFeedback');
        if (!avatarOk) {
            if (avatarFeedback) { avatarFeedback.style.display = 'block'; }
            if (avatarUrlInput) avatarUrlInput.classList.add('is-invalid');
            ok = false;
        } else {
            if (avatarFeedback) { avatarFeedback.style.display = 'none'; }
            if (avatarUrlInput) avatarUrlInput.classList.add('is-valid');
        }
        // marcar formulario validado para estilos
        form.classList.add('was-validated');
        if (!ok) {
            // llevar foco al primer inválido
            var first = form.querySelector('.is-invalid');
            if (first) first.focus();
        }
        return ok;
    }

    // limpiar estados cuando se abre el modal
    if (modalEl) modalEl.addEventListener('show.bs.modal', function () {
        form.classList.remove('was-validated');
        ['studentName', 'studentGrade', 'studentDetails', 'avatarUrlInput', 'avatarInput'].forEach(function (id) {
            var el = document.getElementById(id);
            if (el) { el.classList.remove('is-invalid', 'is-valid'); }
        });
        var avatarFeedback = document.getElementById('avatarFeedback'); if (avatarFeedback) avatarFeedback.style.display = 'none';
    });
    // --- LIVE VALIDATION HELPERS (Agregar) ---
    function setValid(el, ok) {
        if (!el) return;
        el.classList.remove('is-valid', 'is-invalid');
        el.classList.add(ok ? 'is-valid' : 'is-invalid');
    }

    function validateNameField() {
        var el = document.getElementById('studentName');
        var v = el && el.value.trim();
        var ok = !!v && /^[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]{2,80}$/u.test(v);
        setValid(el, ok);
        return ok;
    }

    function validateDetailsField() {
        var el = document.getElementById('studentDetails');
        var v = el && el.value.trim();
        var ok = !!v && v.length >= 5;
        setValid(el, ok);
        return ok;
    }

    function validateGradeField() {
        var el = document.getElementById('studentGrade');
        var n = Number(el && el.value);
        var ok = !isNaN(n) && n >= 0 && n <= 100;
        setValid(el, ok);
        return ok;
    }

    function validateAvatarField() {
        var avatarOk = false;
        // file chosen -> valid
        if (avatarInput && avatarInput.files && avatarInput.files.length) avatarOk = true;
        // url typed -> valid
        if (!avatarOk && avatarUrlInput && avatarUrlInput.value.trim()) avatarOk = true;
        // preview shows a non-placeholder image -> valid
        var previewSrc = avatarPreview && avatarPreview.src ? avatarPreview.src : '';
        if (!avatarOk && previewSrc && !/placeholder-avatar\.png/i.test(previewSrc)) avatarOk = true;
        var avatarFeedback = document.getElementById('avatarFeedback');
        // tidy up classes deterministically
        if (avatarOk) {
            if (avatarFeedback) avatarFeedback.style.display = 'none';
            if (avatarUrlInput) { avatarUrlInput.classList.remove('is-invalid'); avatarUrlInput.classList.add('is-valid'); }
            if (avatarInput) { avatarInput.classList.remove('is-invalid'); avatarInput.classList.add('is-valid'); }
        } else {
            if (avatarFeedback) avatarFeedback.style.display = 'block';
            if (avatarUrlInput) { avatarUrlInput.classList.remove('is-valid'); avatarUrlInput.classList.add('is-invalid'); }
            if (avatarInput) { avatarInput.classList.remove('is-valid'); /* don't force is-invalid on file until user interacts */ }
        }
        return avatarOk;
    }

    // attach live listeners
    (function attachLiveValidation() {
        var n = document.getElementById('studentName');
        var d = document.getElementById('studentDetails');
        var g = document.getElementById('studentGrade');
        if (n) n.addEventListener('input', validateNameField);
        if (d) d.addEventListener('input', validateDetailsField);
        if (g) g.addEventListener('input', validateGradeField);
        if (avatarUrlInput) {
            avatarUrlInput.addEventListener('input', function () { validateAvatarField(); });
            avatarUrlInput.addEventListener('paste', function () { setTimeout(validateAvatarField, 60); });
            avatarUrlInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') { setTimeout(validateAvatarField, 60); } });
        }
        if (avatarInput) avatarInput.addEventListener('change', function () { setTimeout(function () { validateAvatarField(); }, 50); });
        if (avatarPreview) avatarPreview.addEventListener('load', function () { validateAvatarField(); });
        // checkbox live validation
        var chk = document.getElementById('agreeTerms');
        if (chk) chk.addEventListener('change', function () { validateCheckboxField(); });
    })();
    // checkbox validator
    function validateCheckboxField() {
        var el = document.getElementById('agreeTerms');
        if (!el) return false;
        if (el.checked) {
            el.classList.remove('is-invalid'); el.classList.add('is-valid');
            return true;
        } else {
            el.classList.remove('is-valid'); el.classList.add('is-invalid');
            return false;
        }
    }
    // ensure validateForm reuses field validators (keeps behavior)
    var origValidateForm = validateForm;
    validateForm = function () {
        // run per-field validators to update UI live and then aggregate
        var okName = validateNameField();
        var okDetails = validateDetailsField();
        var okGrade = validateGradeField();
        var okAvatar = validateAvatarField();
        var okCheckbox = validateCheckboxField();
        var ok = okName && okDetails && okGrade && okAvatar && okCheckbox;
        // keep original behavior re: was-validated
        form.classList.add('was-validated');
        return ok;
    };
    // Open "Añadir registro" — ajustar modalState y limpiar validación
    var openAddBtnEl = document.getElementById('openAddBtn');
    if (openAddBtnEl) {
        openAddBtnEl.addEventListener('click', function () {
            modalState = { type: 'add' };
            modalTitle.textContent = 'Añadir registro';
            // reset validation state and preview
            form.reset();
            ['studentName', 'studentGrade', 'studentDetails', 'avatarUrlInput', 'avatarInput'].forEach(function (id) {
                var el = document.getElementById(id);
                if (el) { el.classList.remove('is-invalid', 'is-valid'); }
            });
            avatarPreview.src = 'Imagenes/placeholder-avatar.png';
            var avatarFeedback = document.getElementById('avatarFeedback'); if (avatarFeedback) avatarFeedback.style.display = 'none';
        });
    }
    // ADD
    function insertNewRowFromModal() {
        var name = document.getElementById('studentName').value.trim();
        var grade = Number(document.getElementById('studentGrade').value);
        var detailsText = detailsInput ? detailsInput.value.trim() : '';
        if (!name || isNaN(grade) || grade < 0 || grade > 100) { form.classList.add('was-validated'); return false; }
        data.push({ name: name, grade: grade, avatarSrc: avatarPreview.src || 'Imagenes/placeholder-avatar.png', details: detailsText });
        saveData(); renderTable();
        return true;
    }

    // EDIT
    function openEditModal(row) {
        if (!row) return;
        var idx = getIndexFromRow(row);
        if (isNaN(idx) || !data[idx]) return;
        modalState = { type: 'edit', index: idx };
        modalTitle.textContent = 'Editar registro';
        var rec = data[idx];
        avatarPreview.src = rec.avatarSrc || 'Imagenes/placeholder-avatar.png';
        avatarInput.value = ''; avatarUrlInput.value = '';
        document.getElementById('studentName').value = rec.name;
        document.getElementById('studentGrade').value = rec.grade;
        if (detailsInput) detailsInput.value = rec.details || '';
        form.classList.remove('was-validated');
        new bootstrap.Modal(modalEl).show();
    }

    function updateRowFromModal() {
        var state = modalState;
        if (!state || state.type !== 'edit') return false;
        var idx = state.index;
        if (isNaN(idx) || !data[idx]) return false;
        var name = document.getElementById('studentName').value.trim();
        var grade = Number(document.getElementById('studentGrade').value);
        var detailsText = detailsInput ? detailsInput.value.trim() : '';
        if (!name) { form.classList.add('was-validated'); return false; }
        if (isNaN(grade) || grade < 0 || grade > 100) { form.classList.add('was-validated'); return false; }
        var avatarSrc = avatarPreview.src || 'Imagenes/placeholder-avatar.png';
        data[idx].name = name; data[idx].grade = grade; data[idx].avatarSrc = avatarSrc; data[idx].details = detailsText;
        saveData(); renderTable();
        return true;
    }

    // SAVE handler
    saveBtn && saveBtn.addEventListener('click', function () {
        // marcar tiempo del click para coordinar delay mínimo de animación
        lastSaveTimestamp = Date.now();
        // run custom validation
        if (!validateForm()) return;
        // proceed (existing logic)
        if (!modalState || modalState.type === 'add') {
            if (insertNewRowFromModal()) {
                bootstrap.Modal.getInstance(modalEl).hide();
                form.reset(); avatarPreview.src = 'Imagenes/placeholder-avatar.png'; form.classList.remove('was-validated');
                if (detailsInput) detailsInput.value = '';
                // clear file input programmatically
                if (avatarInput) { avatarInput.value = ''; }
                if (avatarUrlInput) { avatarUrlInput.value = ''; }
                modalState = null;
            }
        } else if (modalState.type === 'edit') {
            if (updateRowFromModal()) { bootstrap.Modal.getInstance(modalEl).hide(); modalState = null; }
        }
    });

    // table delegation edit/delete and edit from details
    tbody && tbody.addEventListener('click', function (e) {
        var btn = e.target.closest('button, a');
        if (!btn) return;
        if (btn.classList.contains('btn-warning')) {
            e.preventDefault(); var row = getRowFromBtn(btn); if (row) openEditModal(row); return;
        }
        if (btn.classList.contains('btn-danger')) {
            e.preventDefault();
            var rowToRemove = getRowFromBtn(btn);
            if (!rowToRemove) return;
            if (!confirm('Eliminar registro ' + rowToRemove.querySelector('td').textContent.trim() + '?')) return;
            var idx = getIndexFromRow(rowToRemove);
            if (!isNaN(idx) && data[idx]) data.splice(idx, 1);
            saveData(); renderTable();
            return;
        }
        if (btn.classList.contains('open-edit-from-details')) {
            var detailsTr = btn.closest('tr.collapse'); if (!detailsTr) return;
            var detailsId = '#' + detailsTr.id;
            var trigger = document.querySelector('[data-bs-toggle="collapse"][data-bs-target="' + detailsId + '"]') || document.querySelector('[data-bs-toggle="collapse"][href="' + detailsId + '"]');
            if (trigger) {
                var row = trigger.closest('tr:not(.collapse)');
                if (row) openEditModal(row);
            }
        }
    });

    // initialization: load from storage or read initial DOM
    (function init() {
        var stored = loadData();
        if (stored && Array.isArray(stored) && stored.length) {
            data = stored;
        } else {
            data = readInitialFromDOM();
            saveData();
        }
        renderTable();
    })();

    // initialize tooltips and popovers once immediately
    initTooltipsAndPopovers();

})();
