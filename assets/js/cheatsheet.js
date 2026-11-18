(function () {
  'use strict';

  var input = document.getElementById('cheatSearch');
  var grid = document.getElementById('cheatGrid');
  var status = document.getElementById('cheatStatus');
  var empty = document.getElementById('cheatEmpty');
  var chips = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
  if (!input || !grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll('.cheat-card'));
  var activeFilter = 'all';

  function normalize(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function apply() {
    var query = normalize(input.value.trim());
    var visible = 0;

    cards.forEach(function (card) {
      var category = card.getAttribute('data-category');
      var haystack = normalize(card.getAttribute('data-search') + ' ' + card.textContent);
      var matchesCategory = activeFilter === 'all' || category === activeFilter;
      var matchesQuery = !query || haystack.indexOf(query) !== -1;
      var show = matchesCategory && matchesQuery;
      card.hidden = !show;
      if (show) visible += 1;
    });

    if (empty) empty.hidden = visible > 0;
    if (status) {
      if (query) {
        status.textContent = visible + (visible === 1 ? ' resultado' : ' resultados') + ' para «' + input.value.trim() + '»';
      } else if (activeFilter !== 'all') {
        status.textContent = visible + ' clases en ' + activeFilter + '.';
      } else {
        status.textContent = cards.length + ' clases disponibles.';
      }
    }
  }

  input.addEventListener('input', apply);

  input.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      input.value = '';
      apply();
    }
  });

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      activeFilter = chip.getAttribute('data-filter');
      chips.forEach(function (item) {
        var active = item === chip;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      apply();
    });
  });

  document.addEventListener('keydown', function (event) {
    var target = event.target;
    var typing =
      target &&
      (target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable);
    if (event.key === '/' && !typing) {
      event.preventDefault();
      input.focus();
      input.select();
    }
  });

  apply();
})();
