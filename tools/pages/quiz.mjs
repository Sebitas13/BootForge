import { site } from '../../content/site.mjs';
import { finalQuiz } from '../../content/final-quiz.mjs';
import { icon } from '../icons.mjs';
import { pageShell } from '../templates.mjs';

export function quizPage() {
  const content = `<section class="page-hero">
  <div class="container">
    <p class="eyebrow">${icon('target')} Evaluación final</p>
    <h1>Quiz de Bootstrap 5</h1>
    <p class="page-lead">${finalQuiz.length} preguntas para comprobar qué se quedó. Cada respuesta viene con una explicación; no hay temporizador ni nota que se guarde fuera de tu navegador.</p>
  </div>
</section>

<section class="section pt-0">
  <div class="container quiz-page-container">
    <div class="quiz-panel" id="quizStart">
      <div class="quiz-start-icon">${icon('target')}</div>
      <h2 class="h3">${finalQuiz.length} preguntas. Cero presión.</h2>
      <p class="lead">Puedes repetirlo tantas veces como quieras. Al final verás qué acertaste, qué falló y por qué.</p>
      <div class="quiz-facts">
        <span>${icon('book')} ${finalQuiz.length} preguntas</span>
        <span>${icon('clock')} Unos 8 minutos</span>
        <span>${icon('reset')} Reintentos ilimitados</span>
      </div>
      <p class="text-body-secondary small" id="quizBest" data-best-score hidden></p>
      <button class="btn btn-brand btn-lg" type="button" id="startQuiz">Empezar el quiz ${icon('arrow-right')}</button>
    </div>

    <div class="quiz-panel" id="quizGame" hidden>
      <div class="quiz-progress-head">
        <span>Pregunta <strong id="quizQuestionCount">1</strong> de ${finalQuiz.length}</span>
        <span id="quizScoreLabel">0 correctas</span>
      </div>
      <div class="progress quiz-progress" role="progressbar" aria-label="Progreso del quiz" aria-valuemin="0" aria-valuemax="${finalQuiz.length}" aria-valuenow="0" id="quizProgressTrack">
        <div class="progress-bar" id="quizProgressBar"></div>
      </div>
      <p class="eyebrow" id="quizModule">Módulo</p>
      <h2 class="quiz-question" id="quizQuestion" tabindex="-1">Pregunta</h2>
      <div class="quiz-options" id="quizOptions" role="group" aria-labelledby="quizQuestion"></div>
      <p class="quiz-feedback" id="quizFeedback" role="status" aria-live="polite"></p>
      <div class="quiz-actions">
        <button class="btn btn-brand" type="button" id="quizNext" hidden>Siguiente ${icon('arrow-right')}</button>
      </div>
    </div>

    <div class="quiz-panel" id="quizResult" hidden>
      <div class="quiz-result-head">
        <div class="score-ring" id="quizScoreRing">
          <div class="score-ring-inner">
            <div><strong id="quizScoreValue">0%</strong><span>de aciertos</span></div>
          </div>
        </div>
        <h2 id="quizResultTitle" tabindex="-1">Resultado</h2>
        <p class="lead" id="quizResultText"></p>
      </div>
      <ul class="quiz-review" id="quizReview"></ul>
      <div class="d-flex flex-wrap gap-2 justify-content-center">
        <button class="btn btn-brand" type="button" id="retryQuiz">${icon('reset')} Repetir quiz</button>
        <a class="btn btn-outline-secondary" href="tutorial.html">Volver al curso</a>
        <a class="btn btn-outline-secondary" href="cheatsheet.html">Abrir cheatsheet</a>
      </div>
    </div>
    <script type="application/json" id="quizData">${JSON.stringify(finalQuiz).replaceAll('<', '\\u003c')}</script>
  </div>
</section>`;

  return pageShell({
    title: 'Quiz de Bootstrap 5 — BootForge',
    description: `Pon a prueba lo aprendido con ${finalQuiz.length} preguntas de Bootstrap 5, explicaciones y revisión final. Sin temporizador.`,
    canonical: `${site.url}quiz.html`,
    active: 'quiz',
    content,
    mainClass: 'quiz-page',
    scripts: ['assets/js/quiz.js'],
  });
}
