export default {
  id: 'componentes',
  title: 'Componentes',
  description: 'Botones, badges, alerts y cards: las piezas que más vas a repetir.',
  icon: 'layers',
  lessons: [
    {
      id: 'buttons',
      title: 'Botones',
      minutes: 5,
      level: 'Principiante',
      summary:
        'Variantes, tamaños y estados. Un botón bien elegido comunica la acción antes de que el usuario lea.',
      objectives: [
        'Elegir entre botón sólido, outline y link según la jerarquía.',
        'Usar tamaños y estados disabled correctamente.',
        'Agrupar acciones relacionadas sin romper la accesibilidad.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p>La clase base es <code>.btn</code>. A partir de ahí combinas una variante (<code>btn-primary</code>, <code>btn-outline-danger</code>...) y, opcionalmente, un tamaño (<code>btn-sm</code>, <code>btn-lg</code>).</p>
<p>Usa <strong>un solo botón sólido por zona</strong> para la acción principal. Los outline y link son para acciones secundarias.</p>`,
        },
        {
          type: 'code',
          title: 'Variantes y jerarquía',
          code: `<button type="button" class="btn btn-primary">Guardar cambios</button>
<button type="button" class="btn btn-outline-secondary">Cancelar</button>
<button type="button" class="btn btn-link">Más información</button>

<div class="d-flex flex-wrap gap-2 mt-3">
  <button type="button" class="btn btn-success">Success</button>
  <button type="button" class="btn btn-danger">Danger</button>
  <button type="button" class="btn btn-warning">Warning</button>
  <button type="button" class="btn btn-dark">Dark</button>
</div>`,
        },
        {
          type: 'code',
          title: 'Tamaños, estados y grupo',
          code: `<button type="button" class="btn btn-primary btn-lg">Grande</button>
<button type="button" class="btn btn-primary">Normal</button>
<button type="button" class="btn btn-primary btn-sm">Pequeño</button>

<button type="button" class="btn btn-primary" disabled>Deshabilitado</button>

<div class="btn-group mt-3" role="group" aria-label="Alineación del texto">
  <button type="button" class="btn btn-outline-secondary">Izquierda</button>
  <button type="button" class="btn btn-outline-secondary active" aria-pressed="true">Centro</button>
  <button type="button" class="btn btn-outline-secondary">Derecha</button>
</div>`,
          note: 'En un grupo de botones, marca el activo con .active y aria-pressed="true" para que también se anuncie a lectores de pantalla.',
        },
        {
          type: 'challenge',
          title: 'Diseña la barra de acciones de un formulario',
          prompt:
            '<p>Crea una barra con un botón primario “Guardar”, un botón outline “Guardar borrador” y un botón link “Cancelar”. Alinéalos a la derecha con flexbox y deja espacio entre ellos.</p>',
          hint: 'Usa <code>d-flex justify-content-end gap-2</code> en un contenedor.',
          solution: {
            title: 'Solución',
            code: `<div class="d-flex flex-wrap justify-content-end gap-2">
  <button type="button" class="btn btn-primary">Guardar</button>
  <button type="button" class="btn btn-outline-secondary">Guardar borrador</button>
  <button type="button" class="btn btn-link">Cancelar</button>
</div>`,
          },
        },
        {
          type: 'tip',
          tone: 'tip',
          title: 'Siempre declara el type',
          html: 'Un <code>button</code> dentro de un formulario actúa como <code>submit</code> por defecto. Si no quieres enviar, escribe <code>type="button"</code>. Evita el clásico “el botón recarga la página”.',
        },
      ],
      quiz: {
        question: '¿Qué clase usarías para una acción secundaria que no debe competir con el botón principal?',
        options: ['btn-primary', 'btn-danger', 'btn-outline-secondary', 'btn-lg'],
        answer: 2,
        explanation:
          'btn-outline-secondary tiene menos peso visual que un botón sólido y sigue siendo claramente interactivo. btn-primary es para la acción principal y btn-lg solo cambia el tamaño.',
      },
    },
    {
      id: 'badges-alerts',
      title: 'Badges y alerts',
      minutes: 5,
      level: 'Principiante',
      summary:
        'Etiquetas compactas y mensajes que el usuario puede cerrar. Úsalos para estados y feedback, no para decorar.',
      objectives: [
        'Integrar badges en títulos, botones y listas.',
        'Crear alerts con el rol y el color adecuados.',
        'Permitir que un alert se cierre sin perder accesibilidad.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p>Los <strong>badges</strong> son etiquetas pequeñas para conteos, estados o categorías. Los <strong>alerts</strong> son mensajes de mayor tamaño para confirmar, advertir o explicar algo.</p>
<p>Un alert debe tener un <code>role</code> coherente: <code>alert</code> para urgencia, <code>status</code> para información no crítica.</p>`,
        },
        {
          type: 'code',
          title: 'Badges en contexto',
          code: `<h2 class="h4">Notificaciones <span class="badge text-bg-primary">4</span></h2>

<p class="mb-2">
  Estado del pedido:
  <span class="badge text-bg-success">Enviado</span>
  <span class="badge text-bg-warning">Pendiente</span>
  <span class="badge text-bg-secondary">Archivado</span>
</p>

<button type="button" class="btn btn-primary">
  Mensajes <span class="badge text-bg-light">12</span>
</button>`,
        },
        {
          type: 'code',
          title: 'Alert dismissible',
          code: `<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Revisa tu conexión.</strong> Los cambios se guardarán en local hasta que vuelvas a estar en línea.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar aviso"></button>
</div>

<div class="alert alert-success" role="status">
  <strong>Guardado.</strong> Tu progreso se actualizó correctamente.
</div>`,
          note: 'El botón de cierre necesita Bootstrap JS. El atributo aria-label describe la acción; no dejes un “×” sin nombre.',
        },
        {
          type: 'tip',
          tone: 'warning',
          title: 'No uses alerts para todo',
          html: 'Un alert rojo para un guardado correcto entrena al usuario a ignorar el color. Reserva <code>alert-danger</code> para errores que requieren acción y <code>alert-success</code> para confirmaciones.',
        },
      ],
      quiz: {
        question: '¿Qué atributo permite que un alert se cierre con el botón de la X?',
        options: [
          'data-bs-toggle="alert"',
          'data-bs-dismiss="alert"',
          'aria-dismiss="alert"',
          'role="dismiss"',
        ],
        answer: 1,
        explanation:
          'El botón con data-bs-dismiss="alert" cierra el alert cuando Bootstrap JS está cargado. El atributo debe ir en el botón, no en el contenedor.',
      },
    },
    {
      id: 'cards',
      title: 'Cards',
      minutes: 6,
      level: 'Principiante',
      summary:
        'El contenedor más versátil de Bootstrap: contenido, imágenes, acciones y variantes en una misma pieza.',
      objectives: [
        'Construir cards con header, body y footer.',
        'Igualar alturas dentro de una fila con h-100.',
        'Elegir entre card vertical, horizontal y con imagen.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p>Una card agrupa contenido relacionado. Su estructura mínima es <code>.card &gt; .card-body</code>. A partir de ahí puedes añadir <code>card-header</code>, <code>card-footer</code>, <code>card-img-top</code> o <code>list-group</code>.</p>`,
        },
        {
          type: 'code',
          title: 'Tres cards en una fila',
          code: `<div class="row g-4">
  <div class="col-12 col-md-4">
    <div class="card h-100">
      <div class="card-body">
        <h3 class="card-title h5">Rápido</h3>
        <p class="card-text">Componentes listos para usar y un grid que responde solo.</p>
        <a href="#" class="btn btn-primary btn-sm">Ver más</a>
      </div>
    </div>
  </div>
  <div class="col-12 col-md-4">
    <div class="card h-100 text-bg-dark">
      <div class="card-header">Destacado</div>
      <div class="card-body">
        <h3 class="card-title h5">Accesible</h3>
        <p class="card-text">Contraste, foco visible y HTML semántico desde la base.</p>
      </div>
      <div class="card-footer">Actualizado hoy</div>
    </div>
  </div>
  <div class="col-12 col-md-4">
    <div class="card h-100 border-primary">
      <div class="card-body">
        <h3 class="card-title h5">Personalizable</h3>
        <p class="card-text">Variables CSS y utilidades para adaptarlo a tu marca.</p>
        <a href="#" class="btn btn-outline-primary btn-sm">Explorar</a>
      </div>
    </div>
  </div>
</div>`,
          note: 'h-100 hace que las cards de una misma fila compartan altura. El enlace href="#" es solo de ejemplo: en producción apunta a una URL real.',
        },
        {
          type: 'code',
          title: 'Card horizontal con imagen',
          code: `<div class="card overflow-hidden">
  <div class="row g-0">
    <div class="col-4">
      <img src="assets/img/demo-photo.svg" class="img-fluid rounded-start h-100 object-fit-cover" alt="Paisaje abstracto">
    </div>
    <div class="col-8">
      <div class="card-body">
        <h3 class="card-title h5">Card horizontal</h3>
        <p class="card-text">Ideal para listados de artículos, productos o personas.</p>
        <p class="card-text"><small class="text-body-secondary">Hace 3 minutos</small></p>
      </div>
    </div>
  </div>
</div>`,
          note: 'object-fit-cover recorta la imagen para llenar la columna sin deformarla. En pantallas muy pequeñas quizá prefieras apilar los bloques.',
        },
        {
          type: 'challenge',
          title: 'Convierte una card en un producto',
          prompt:
            '<p>Añade a una card una imagen superior, un título, una descripción corta, un precio destacado y un botón “Añadir al carrito”. Mantén la imagen con <code>card-img-top</code> y una altura consistente.</p>',
          hint: 'Usa <code>card-img-top</code> con <code>object-fit-cover</code> y una altura de 180px mediante una clase propia.',
          solution: {
            title: 'Solución',
            code: `<div class="card h-100">
  <div class="ratio ratio-16x9">
    <img src="assets/img/demo-photo.svg" class="w-100 h-100 object-fit-cover" alt="Paisaje abstracto">
  </div>
  <div class="card-body d-flex flex-column">
    <h3 class="card-title h5">Poster abstracto</h3>
    <p class="card-text text-body-secondary">Impresión en papel mate de 250 g.</p>
    <p class="fs-4 fw-bold mt-auto mb-3">$24.00</p>
    <button type="button" class="btn btn-primary w-100">Añadir al carrito</button>
  </div>
</div>`,
          },
        },
        {
          type: 'tip',
          tone: 'tip',
          title: 'Una card no es un botón',
          html: 'Si toda la card es clicable, envuelve el título en un enlace y usa el patrón <code>stretched-link</code>. No conviertas un <code>div</code> en botón sin rol, foco y teclado.',
        },
      ],
      quiz: {
        question: '¿Qué clase iguala la altura de varias cards dentro de una fila?',
        options: ['h-50', 'h-100', 'card-equal', 'align-items-stretch'],
        answer: 1,
        explanation:
          'h-100 hace que la card ocupe el 100% de la altura de su columna. Como las columnas de una fila se estiran, las cards terminan con la misma altura.',
      },
    },
  ],
};
