export const finalQuiz = [
  {
    id: 'grid-12',
    module: 'Layout y grid',
    question: '¿Cuántas columnas suma una fila completa del grid de Bootstrap?',
    options: ['6 columnas', '10 columnas', '12 columnas', '16 columnas'],
    answer: 2,
    explanation:
      'El grid se divide en 12 columnas. Las clases como col-4, col-6 o col-md-3 indican cuántas unidades ocupa cada elemento.',
  },
  {
    id: 'container-fluid',
    module: 'Layout y grid',
    question: 'Necesitas una sección que ocupe todo el ancho de la ventana. ¿Qué contenedor usas?',
    options: ['.container', '.container-fluid', '.container-md', '.container-fixed'],
    answer: 1,
    explanation:
      '.container-fluid no impone un ancho máximo. .container sí aplica anchos máximos según el breakpoint.',
  },
  {
    id: 'breakpoint-md',
    module: 'Layout y grid',
    question: '¿Desde qué ancho se aplica .col-md-6?',
    options: ['576px', '768px', '992px', '1200px'],
    answer: 1,
    explanation:
      'md equivale a 768px. La clase aplica desde ese ancho en adelante; por debajo se usa el estilo base.',
  },
  {
    id: 'img-fluid',
    module: 'Contenido',
    question: '¿Qué clase evita que una imagen desborde su contenedor?',
    options: ['img-responsive', 'img-fluid', 'img-auto', 'img-contain'],
    answer: 1,
    explanation:
      'img-fluid aplica max-width: 100% y height: auto. En Bootstrap 3 se llamaba img-responsive, pero cambió en Bootstrap 5.',
  },
  {
    id: 'boton-secundario',
    module: 'Componentes',
    question: '¿Qué botón expresa mejor una acción secundaria frente a un botón primario?',
    options: ['btn-danger', 'btn-lg', 'btn-outline-secondary', 'btn-primary'],
    answer: 2,
    explanation:
      'btn-outline-secondary tiene menos peso visual. btn-primary es para la acción principal; btn-danger comunica una acción destructiva.',
  },
  {
    id: 'label-for',
    module: 'Formularios',
    question: '¿Cómo se asocia correctamente una etiqueta con su campo?',
    options: [
      'Con el placeholder del input.',
      'Con <label for="email"> y <input id="email">.',
      'Con un title en el input.',
      'Con un span encima del input.',
    ],
    answer: 1,
    explanation:
      'El atributo for del label debe coincidir con el id del control. Así el clic enfoca el campo y el lector de pantalla anuncia su nombre.',
  },
  {
    id: 'table-responsive',
    module: 'Datos',
    question: '¿Qué envoltorio permite hacer scroll horizontal en una tabla ancha sin romper el móvil?',
    options: ['.table-scroll', '.table-responsive', '.table-fluid', '.table-mobile'],
    answer: 1,
    explanation:
      '.table-responsive añade overflow-x: auto. La tabla conserva su ancho y el scroll ocurre dentro del contenedor.',
  },
  {
    id: 'modal-labelledby',
    module: 'Interacción',
    question: '¿Qué atributo del modal debe apuntar al ID de su título?',
    options: ['aria-describedby', 'aria-labelledby', 'data-bs-title', 'for'],
    answer: 1,
    explanation:
      'aria-labelledby asocia el diálogo con su título visible. aria-describedby se reserva para una descripción adicional.',
  },
  {
    id: 'mt-3',
    module: 'Utilidades',
    question: '¿Qué hace la clase mt-3?',
    options: [
      'Añade padding horizontal de 3rem.',
      'Añade margin-top en el nivel 3 de la escala.',
      'Hace el texto tres veces más grande.',
      'Muestra el elemento desde md.',
    ],
    answer: 1,
    explanation:
      'm = margin, t = top, 3 = nivel de la escala. Los niveles van de 0 a 5 y equivalen a múltiplos del espaciador base.',
  },
  {
    id: 'navbar-target',
    module: 'Navegación',
    question: '¿Qué atributo del toggler indica qué menú debe abrirse?',
    options: ['href="#menu"', 'data-bs-target="#menu"', 'aria-label="menu"', 'data-menu="true"'],
    answer: 1,
    explanation:
      'data-bs-target contiene el selector del elemento que se colapsa. aria-controls también es importante, pero no lo usa Bootstrap para localizar el menú.',
  },
  {
    id: 'toast-guardado',
    module: 'Interacción',
    question: '¿Qué componente es más adecuado para confirmar que un formulario se guardó sin interrumpir?',
    options: ['Un modal', 'Un toast', 'Un alert rojo', 'Un offcanvas'],
    answer: 1,
    explanation:
      'Un toast confirma de forma efímera y no bloquea. Un modal obliga a interactuar; un alert rojo sugiere un error.',
  },
  {
    id: 'pages-index',
    module: 'Proyecto',
    question: '¿Qué archivo debe existir en la raíz para que GitHub Pages muestre tu página de inicio?',
    options: ['home.html', 'main.html', 'index.html', 'default.html'],
    answer: 2,
    explanation:
      'GitHub Pages busca index.html como documento de entrada. Sin él, la raíz no muestra tu sitio correctamente.',
  },
];
