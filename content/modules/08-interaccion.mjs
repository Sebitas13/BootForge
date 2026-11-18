export default {
  id: 'interaccion',
  title: 'Interacción',
  description: 'Modales, offcanvas y toasts: diálogos y feedback sin secuestrar al usuario.',
  icon: 'window',
  lessons: [
    {
      id: 'modals',
      title: 'Modals',
      minutes: 6,
      level: 'Intermedio',
      summary:
        'Diálogos superpuestos para confirmaciones y formularios. La clave está en el foco y en no abusar de ellos.',
      objectives: [
        'Abrir y cerrar un modal con atributos de Bootstrap.',
        'Etiquetar el diálogo y gestionar el foco correctamente.',
        'Evitar modales anidados y acciones destructivas sin confirmación.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p>Un <strong>modal</strong> es un diálogo que bloquea temporalmente el resto de la interfaz. Bootstrap se encarga del fondo, del foco y de cerrar con <kbd>Esc</kbd> si está configurado. Tu trabajo es darle un título claro, una acción principal y una salida.</p>`,
        },
        {
          type: 'code',
          title: 'Modal de confirmación',
          code: `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#demoModal">
  Abrir confirmación
</button>

<div class="modal fade" id="demoModal" tabindex="-1"
     aria-labelledby="demoModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title h5" id="demoModalLabel">¿Publicar cambios?</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body">
        <p class="mb-0">Los cambios serán visibles para todos los visitantes del sitio.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary">Publicar</button>
      </div>
    </div>
  </div>
</div>`,
          note: 'aria-labelledby apunta al título del modal y aria-hidden se actualiza al abrir/cerrar. Bootstrap devuelve el foco al botón que abrió el diálogo.',
        },
        {
          type: 'table',
          caption: 'Buenas prácticas para modales',
          head: ['Práctica', 'Por qué'],
          rows: [
            ['Un título descriptivo', 'El usuario debe saber qué está confirmando.'],
            ['Una acción principal clara', 'Evita dos botones primarios compitiendo.'],
            ['Salida visible', 'Botón de cierre y tecla Esc.'],
            ['No anidar modales', 'El foco y el fondo se vuelven difíciles de manejar.'],
            ['No usarlo para contenido largo', 'Mejor una página o un offcanvas.'],
          ],
        },
        {
          type: 'tip',
          tone: 'warning',
          title: 'Cuidado con las acciones destructivas',
          html: 'Si el botón principal elimina algo, usa <code>btn-danger</code> y explica la consecuencia. No pongas “Aceptar” en un diálogo de borrado: el usuario puede confirmar sin leer.',
        },
      ],
      quiz: {
        question: '¿Qué atributo del modal debe apuntar al ID de su título?',
        options: ['aria-describedby', 'aria-labelledby', 'data-bs-title', 'for'],
        answer: 1,
        explanation:
          'aria-labelledby asocia el diálogo con su título visible. aria-describedby se usa para una descripción adicional, no para el título principal.',
      },
    },
    {
      id: 'offcanvas-toasts',
      title: 'Offcanvas y toasts',
      minutes: 6,
      level: 'Intermedio',
      summary:
        'Paneles laterales para navegación o filtros, y notificaciones breves que no interrumpen.',
      objectives: [
        'Abrir un offcanvas con atributos de Bootstrap.',
        'Mostrar un toast desde JavaScript y cerrarlo solo.',
        'Elegir entre toast, alert y modal según la urgencia.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p>Un <strong>offcanvas</strong> es un panel que entra desde un borde de la pantalla. Es ideal para menús móviles, filtros o detalles secundarios. Un <strong>toast</strong> es una notificación breve que aparece y desaparece sin bloquear.</p>`,
        },
        {
          type: 'code',
          title: 'Panel lateral y toast',
          code: `<button class="btn btn-primary" type="button"
        data-bs-toggle="offcanvas" data-bs-target="#demoOffcanvas"
        aria-controls="demoOffcanvas">
  Abrir panel
</button>

<div class="offcanvas offcanvas-start" tabindex="-1" id="demoOffcanvas"
     aria-labelledby="demoOffcanvasLabel">
  <div class="offcanvas-header">
    <h2 class="offcanvas-title h5" id="demoOffcanvasLabel">Filtros</h2>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
  </div>
  <div class="offcanvas-body">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="filterUno">
      <label class="form-check-label" for="filterUno">Solo disponibles</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="filterDos">
      <label class="form-check-label" for="filterDos">Con envío gratis</label>
    </div>
  </div>
</div>

<button class="btn btn-outline-secondary" type="button" id="demoToastBtn">
  Mostrar toast
</button>

<div class="toast-container position-fixed bottom-0 end-0 p-3">
  <div id="demoToast" class="toast" role="status" aria-live="polite" aria-atomic="true">
    <div class="d-flex">
      <div class="toast-body">Cambios guardados correctamente.</div>
      <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
    </div>
  </div>
</div>`,
          previewJs: `document.querySelector('#demoToastBtn').addEventListener('click', function () {
  const toastEl = document.querySelector('#demoToast');
  new bootstrap.Toast(toastEl, { delay: 3000 }).show();
});`,
          note: 'Los toasts no se muestran solos: hay que inicializarlos con JavaScript. La vista previa ya lo hace para que puedas probarlo.',
        },
        {
          type: 'tip',
          tone: 'tip',
          title: '¿Toast, alert o modal?',
          html: 'Usa un <strong>toast</strong> para confirmaciones efímeras, un <strong>alert</strong> para información que debe permanecer en el flujo y un <strong>modal</strong> solo cuando necesitas una decisión inmediata. No uses un modal para decir “guardado”.',
        },
        {
          type: 'tip',
          tone: 'info',
          title: 'Accesibilidad del toast',
          html: 'Añade <code>role="status"</code> y <code>aria-live="polite"</code> para que el mensaje se anuncie sin interrumpir. Si el mensaje es un error crítico, usa <code>role="alert"</code> y no lo ocultes automáticamente.',
        },
      ],
      quiz: {
        question: '¿Qué componente es más adecuado para confirmar que un formulario se guardó, sin interrumpir?',
        options: ['Un modal', 'Un toast', 'Un alert rojo', 'Un offcanvas'],
        answer: 1,
        explanation:
          'Un toast confirma sin bloquear y desaparece solo. Un modal obliga a interactuar; un alert rojo sugiere un error; un offcanvas es un panel de contenido, no una notificación.',
      },
    },
  ],
};
