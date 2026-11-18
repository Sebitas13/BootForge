export default {
  id: 'formularios',
  title: 'Formularios',
  description: 'Controles, validación y patrones de entrada que no frustran al usuario.',
  icon: 'form',
  lessons: [
    {
      id: 'forms',
      title: 'Formularios básicos',
      minutes: 7,
      level: 'Principiante',
      summary:
        'La estructura correcta de un formulario: labels reales, controles consistentes y feedback claro.',
      objectives: [
        'Crear inputs, selects, textareas y checkboxes con estilo Bootstrap.',
        'Asociar cada control con su etiqueta mediante for e id.',
        'Añadir texto de ayuda sin sustituir la etiqueta.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p>Un formulario accesible empieza por una etiqueta <code>label</code> real asociada a su control. El placeholder no es una etiqueta: desaparece al escribir y muchos lectores de pantalla lo ignoran.</p>
<p>Bootstrap estiliza con <code>.form-control</code> los inputs y textareas, y con <code>.form-select</code> los desplegables. Los grupos se separan con <code>.mb-3</code> o con el grid.</p>`,
        },
        {
          type: 'code',
          title: 'Formulario de contacto',
          code: `<form class="row g-3" novalidate>
  <div class="col-md-6">
    <label for="demoName" class="form-label">Nombre</label>
    <input type="text" class="form-control" id="demoName" placeholder="Ana" required>
    <div class="form-text">Como quieres que te llamemos.</div>
  </div>
  <div class="col-md-6">
    <label for="demoEmail" class="form-label">Email</label>
    <input type="email" class="form-control" id="demoEmail" placeholder="ana@ejemplo.com" required>
  </div>
  <div class="col-12">
    <label for="demoTopic" class="form-label">Tema</label>
    <select class="form-select" id="demoTopic">
      <option selected>Elige una opción</option>
      <option>Bootstrap</option>
      <option>Accesibilidad</option>
      <option>Otro</option>
    </select>
  </div>
  <div class="col-12">
    <label for="demoMessage" class="form-label">Mensaje</label>
    <textarea class="form-control" id="demoMessage" rows="3" required minlength="10"></textarea>
  </div>
  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="demoTerms" required>
      <label class="form-check-label" for="demoTerms">Acepto los términos</label>
    </div>
  </div>
  <div class="col-12 d-flex flex-wrap align-items-center gap-3">
    <button class="btn btn-primary" type="submit">Enviar</button>
    <span class="form-status small text-success" role="status"></span>
  </div>
</form>`,
          previewJs: `const form = document.querySelector('form');
const status = form.querySelector('.form-status');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  form.classList.add('was-validated');
  if (!form.checkValidity()) { status.textContent = ''; return; }
  status.textContent = '¡Enviado! (demo)';
  form.reset();
  form.classList.remove('was-validated');
  window.setTimeout(function () { status.textContent = ''; }, 2500);
});`,
          note: 'La vista previa intercepta el envío y usa novalidate para controlar la validación sin recargar el iframe. En una app real, aquí llamarías a tu API y validarías también en el servidor.',
        },
        {
          type: 'table',
          caption: 'Controles y clases principales',
          head: ['Control', 'Clase', 'Nota'],
          rows: [
            ['Texto, email, password', '<code>form-control</code>', 'El tipo define el teclado y la validación del navegador.'],
            ['Select', '<code>form-select</code>', 'Añade una opción por defecto con <code>selected</code>.'],
            ['Textarea', '<code>form-control</code>', 'Controla la altura con <code>rows</code>.'],
            ['Checkbox / radio', '<code>form-check-input</code>', 'La etiqueta usa <code>form-check-label</code>.'],
            ['Switch', '<code>form-switch</code>', 'Envoltorio adicional alrededor del checkbox.'],
          ],
        },
        {
          type: 'tip',
          tone: 'tip',
          title: 'Placeholder vs. help text',
          html: 'El placeholder es un ejemplo efímero. El texto de ayuda (<code>.form-text</code>) permanece visible y se asocia con <code>aria-describedby</code> si hace falta. La etiqueta siempre debe existir.',
        },
      ],
      quiz: {
        question: '¿Cuál es la forma correcta de asociar una etiqueta con un input?',
        options: [
          'Poner el texto dentro del placeholder.',
          'Usar <label for="email"> y <input id="email">.',
          'Añadir un title al input.',
          'Usar solo un span encima del input.',
        ],
        answer: 1,
        explanation:
          'El atributo for del label debe coincidir con el id del control. Así el clic en la etiqueta enfoca el campo y los lectores de pantalla anuncian su nombre.',
      },
    },
    {
      id: 'validation',
      title: 'Validación de formularios',
      minutes: 6,
      level: 'Intermedio',
      summary:
        'Combina la validación nativa del navegador con los estilos de Bootstrap y mensajes que explican cómo corregir.',
      objectives: [
        'Usar las pseudo-clases :valid e :invalid de Bootstrap.',
        'Mostrar feedback solo después de un intento de envío.',
        'Entender por qué la validación del servidor sigue siendo obligatoria.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p>Bootstrap ofrece estilos para <code>.is-valid</code> e <code>.is-invalid</code>, pero el patrón recomendado es dejar que el navegador valide y añadir <code>.was-validated</code> al formulario después del primer envío. Así no marcas en rojo un campo que el usuario aún no ha tocado.</p>`,
        },
        {
          type: 'code',
          title: 'Validación con feedback',
          code: `<form id="validationDemo" class="row g-3 needs-validation" novalidate>
  <div class="col-md-6">
    <label for="valName" class="form-label">Nombre</label>
    <input type="text" class="form-control" id="valName" required minlength="2">
    <div class="valid-feedback">Se ve bien.</div>
    <div class="invalid-feedback">Escribe al menos 2 caracteres.</div>
  </div>
  <div class="col-md-6">
    <label for="valEmail" class="form-label">Email</label>
    <input type="email" class="form-control" id="valEmail" required>
    <div class="invalid-feedback">Introduce un email válido.</div>
  </div>
  <div class="col-12">
    <button class="btn btn-primary" type="submit">Validar formulario</button>
    <p class="validation-status small mt-2 mb-0" role="status"></p>
  </div>
</form>`,
          previewJs: `const form = document.querySelector('#validationDemo');
const status = form.querySelector('.validation-status');
form.addEventListener('submit', function (event) {
  event.preventDefault();
  event.stopPropagation();
  form.classList.add('was-validated');
  if (form.checkValidity()) {
    status.className = 'validation-status small mt-2 mb-0 text-success';
    status.textContent = 'Formulario válido. Listo para enviar.';
  } else {
    status.textContent = '';
    const firstInvalid = form.querySelector(':invalid');
    if (firstInvalid) firstInvalid.focus();
  }
});`,
          note: 'El atributo novalidate desactiva los globos del navegador para que podamos usar nuestro propio feedback. La validación HTML5 no sustituye la del servidor.',
        },
        {
          type: 'tip',
          tone: 'danger',
          title: 'El servidor manda',
          html: 'Cualquier usuario puede desactivar JavaScript o modificar el HTML. Valida siempre en el servidor y devuelve errores asociados al campo correspondiente.',
        },
        {
          type: 'tip',
          tone: 'info',
          title: 'Un mensaje por campo',
          html: 'El <code>invalid-feedback</code> debe explicar qué falta y cómo corregirlo. “Campo inválido” no ayuda; “Introduce un email válido” sí.',
        },
      ],
      quiz: {
        question: '¿Cuándo conviene añadir la clase .was-validated al formulario?',
        options: [
          'Al cargar la página.',
          'Después del primer intento de envío.',
          'Solo cuando el usuario escribe en el primer campo.',
          'Nunca; Bootstrap lo hace solo.',
        ],
        answer: 1,
        explanation:
          'Marcar el formulario al cargar muestra errores antes de que el usuario interactúe. El patrón habitual es añadir was-validated en el evento submit, después de comprobar la validez.',
      },
    },
    {
      id: 'input-groups',
      title: 'Input groups y floating labels',
      minutes: 5,
      level: 'Intermedio',
      summary:
        'Añade prefijos, sufijos y botones a un campo, o usa etiquetas flotantes sin perder claridad.',
      objectives: [
        'Construir input groups con texto, iconos y botones.',
        'Usar floating labels correctamente.',
        'Evitar input groups para acciones que no están relacionadas con el campo.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p>Un <strong>input group</strong> une un control con texto o botones adyacentes. Es útil para prefijos monetarios, dominios de email o botones de búsqueda. La regla es simple: todo lo que pongas dentro debe estar relacionado con ese campo.</p>`,
        },
        {
          type: 'code',
          title: 'Prefijos, sufijos y botón',
          code: `<div class="input-group mb-3">
  <span class="input-group-text">@</span>
  <input type="text" class="form-control" placeholder="usuario" aria-label="Usuario">
</div>

<div class="input-group mb-3">
  <input type="email" class="form-control" placeholder="tu nombre" aria-label="Nombre de usuario">
  <span class="input-group-text">@ejemplo.com</span>
</div>

<div class="input-group">
  <input type="search" class="form-control" placeholder="Buscar en el curso" aria-label="Buscar">
  <button class="btn btn-primary" type="button">Buscar</button>
</div>`,
        },
        {
          type: 'code',
          title: 'Floating label',
          code: `<div class="form-floating mb-3">
  <input type="email" class="form-control" id="floatingEmail" placeholder="nombre@ejemplo.com">
  <label for="floatingEmail">Email</label>
</div>

<div class="form-floating">
  <select class="form-select" id="floatingSelect" aria-label="Elige un módulo">
    <option selected>Elige un módulo</option>
    <option value="1">Layout</option>
    <option value="2">Componentes</option>
    <option value="3">Formularios</option>
  </select>
  <label for="floatingSelect">Módulo</label>
</div>`,
          note: 'El placeholder es obligatorio en las floating labels: Bootstrap lo usa para saber cuándo mostrar la etiqueta arriba.',
        },
        {
          type: 'tip',
          tone: 'warning',
          title: 'No mezcles acciones',
          html: 'No pongas “Eliminar cuenta” dentro del input group de “Buscar”. El usuario puede pulsar el botón equivocado y la relación visual es engañosa.',
        },
      ],
      quiz: {
        question: '¿Qué clase crea el contenedor de un input group?',
        options: ['form-group', 'input-group', 'form-control-group', 'input-addon'],
        answer: 1,
        explanation:
          'input-group es el contenedor. Dentro van el control y los addons (input-group-text o botones). form-group era el patrón de Bootstrap 3/4.',
      },
    },
  ],
};
