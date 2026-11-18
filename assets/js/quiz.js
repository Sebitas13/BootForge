(function () {
  'use strict';

  var dataNode = document.getElementById('quizData');
  if (!dataNode) return;

  var questions;
  try {
    questions = JSON.parse(dataNode.textContent);
  } catch (error) {
    return;
  }
  if (!Array.isArray(questions) || !questions.length) return;

  var els = {
    start: document.getElementById('quizStart'),
    game: document.getElementById('quizGame'),
    result: document.getElementById('quizResult'),
    best: document.getElementById('quizBest'),
    startBtn: document.getElementById('startQuiz'),
    count: document.getElementById('quizQuestionCount'),
    scoreLabel: document.getElementById('quizScoreLabel'),
    progressTrack: document.getElementById('quizProgressTrack'),
    progressBar: document.getElementById('quizProgressBar'),
    module: document.getElementById('quizModule'),
    question: document.getElementById('quizQuestion'),
    options: document.getElementById('quizOptions'),
    feedback: document.getElementById('quizFeedback'),
    next: document.getElementById('quizNext'),
    resultTitle: document.getElementById('quizResultTitle'),
    resultText: document.getElementById('quizResultText'),
    scoreRing: document.getElementById('quizScoreRing'),
    scoreValue: document.getElementById('quizScoreValue'),
    review: document.getElementById('quizReview'),
    retry: document.getElementById('retryQuiz'),
  };
  if (!els.start || !els.game || !els.result) return;

  var ordered = [];
  var current = 0;
  var score = 0;
  var answers = [];
  var answered = false;

  function shuffle(items) {
    var copy = items.slice();
    for (var i = copy.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }

  function readBest() {
    try {
      var raw = localStorage.getItem('bootforge:quiz:best');
      if (raw === null || raw === '') return null;
      var value = Number(raw);
      return Number.isFinite(value) && value >= 0 && value <= 100 ? value : null;
    } catch (error) {
      return null;
    }
  }

  function saveBest(value) {
    try {
      localStorage.setItem('bootforge:quiz:best', String(value));
    } catch (error) {
      /* El quiz sigue funcionando sin almacenamiento. */
    }
  }

  function showBest() {
    var best = readBest();
    if (!els.best) return;
    if (best === null) {
      els.best.hidden = true;
      return;
    }
    els.best.hidden = false;
    els.best.textContent = 'Tu mejor resultado hasta ahora: ' + best + '%.';
  }

  function setPanel(panel) {
    [els.start, els.game, els.result].forEach(function (item) {
      if (item) item.hidden = item !== panel;
    });
  }

  function start() {
    ordered = shuffle(questions).map(function (question) {
      var options = question.options.map(function (text, index) {
        return { text: text, correct: index === question.answer };
      });
      return {
        id: question.id,
        module: question.module,
        question: question.question,
        options: shuffle(options),
        explanation: question.explanation,
      };
    });
    current = 0;
    score = 0;
    answers = [];
    setPanel(els.game);
    renderQuestion();
  }

  function renderQuestion() {
    answered = false;
    var question = ordered[current];
    if (!question) return;

    els.count.textContent = String(current + 1);
    els.scoreLabel.textContent = score + (score === 1 ? ' correcta' : ' correctas');
    els.progressTrack.setAttribute('aria-valuenow', String(current + 1));
    els.progressBar.style.width = ((current + 1) / ordered.length) * 100 + '%';
    els.module.textContent = question.module;
    els.question.textContent = question.question;
    els.feedback.className = 'quiz-feedback';
    els.feedback.textContent = '';
    els.next.hidden = true;
    els.next.textContent = current === ordered.length - 1 ? 'Ver resultado' : 'Siguiente';
    els.options.replaceChildren();

    question.options.forEach(function (option, index) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'quiz-option';
      button.setAttribute('data-option', String(index));
      var letter = document.createElement('span');
      letter.className = 'quiz-letter';
      letter.setAttribute('aria-hidden', 'true');
      letter.textContent = String.fromCharCode(65 + index);
      var text = document.createElement('span');
      text.textContent = option.text;
      button.append(letter, text);
      button.addEventListener('click', function () {
        selectOption(button, index);
      });
      els.options.append(button);
    });

    els.question.focus();
  }

  function selectOption(button, index) {
    if (answered) return;
    answered = true;
    var question = ordered[current];
    var selected = question.options[index];
    var correctIndex = question.options.findIndex(function (option) {
      return option.correct;
    });
    var buttons = Array.prototype.slice.call(els.options.querySelectorAll('.quiz-option'));

    buttons.forEach(function (item, itemIndex) {
      item.disabled = true;
      item.setAttribute('aria-disabled', 'true');
      if (itemIndex === correctIndex) item.classList.add('correct');
    });

    if (selected.correct) {
      score += 1;
      button.classList.add('correct');
      els.feedback.className = 'quiz-feedback is-correct';
      els.feedback.textContent = 'Correcto. ' + question.explanation;
    } else {
      button.classList.add('wrong');
      els.feedback.className = 'quiz-feedback is-wrong';
      els.feedback.textContent =
        'Casi. La respuesta correcta es ' +
        String.fromCharCode(65 + correctIndex) +
        '. ' +
        question.explanation;
    }

    answers.push({
      question: question,
      selected: index,
      correctIndex: correctIndex,
      correct: selected.correct,
    });
    els.scoreLabel.textContent = score + (score === 1 ? ' correcta' : ' correctas');
    els.next.hidden = false;
    els.next.focus();
  }

  function next() {
    if (!answered) return;
    if (current < ordered.length - 1) {
      current += 1;
      renderQuestion();
      return;
    }
    showResult();
  }

  function showResult() {
    var percent = Math.round((score / ordered.length) * 100);
    var best = readBest();
    if (best === null || percent > best) {
      saveBest(percent);
      best = percent;
    }

    setPanel(els.result);
    els.scoreRing.style.setProperty('--score', String(percent));
    els.scoreValue.textContent = percent + '%';

    var title;
    var message;
    if (percent === 100) {
      title = 'Perfecto. Dominas lo esencial.';
      message = 'Ahora lleva ese conocimiento a un proyecto real: abre el playground y construye algo propio.';
    } else if (percent >= 80) {
      title = 'Muy bien. Ya tienes una base sólida.';
      message = 'Repasa las preguntas falladas y vuelve a intentarlo. La diferencia está en los detalles.';
    } else if (percent >= 60) {
      title = 'Buen trabajo. Hay espacio para pulir.';
      message = 'Usa la cheatsheet para repasar las clases que fallaste y vuelve a intentarlo sin prisa.';
    } else {
      title = 'Sigue practicando. Esto se aprende haciendo.';
      message = 'Vuelve al curso, abre una lección y prueba el código. Después repite el quiz.';
    }
    els.resultTitle.textContent = title;
    els.resultText.textContent = message + ' Tu mejor resultado: ' + Math.max(percent, best || 0) + '%.';

    els.review.replaceChildren();
    answers.forEach(function (answer, index) {
      var li = document.createElement('li');
      var status = document.createElement('strong');
      status.className = answer.correct ? 'review-correct' : 'review-wrong';
      status.textContent = answer.correct ? 'Correcta' : 'Incorrecta';
      var question = document.createElement('p');
      question.className = 'mb-1 mt-1 fw-semibold';
      question.textContent = index + 1 + '. ' + answer.question.question;
      var detail = document.createElement('p');
      detail.textContent =
        'Tu respuesta: ' +
        answer.question.options[answer.selected].text +
        '. Correcta: ' +
        answer.question.options[answer.correctIndex].text +
        '. ' +
        answer.question.explanation;
      li.append(status, question, detail);
      els.review.append(li);
    });

    els.resultTitle.focus();
  }

  els.startBtn.addEventListener('click', start);
  els.next.addEventListener('click', next);
  els.retry.addEventListener('click', start);

  document.addEventListener('keydown', function (event) {
    if (els.game.hidden || answered) return;
    var index = Number(event.key) - 1;
    if (!Number.isInteger(index) || index < 0) return;
    var buttons = els.options.querySelectorAll('.quiz-option');
    if (buttons[index]) {
      event.preventDefault();
      buttons[index].click();
    }
  });

  showBest();
})();
