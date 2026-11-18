export default {
  id: 'navegacion',
  title: 'Navegación',
  description: 'Navbars, tabs y dropdowns que funcionan con teclado y en móvil.',
  icon: 'navigation',
  lessons: [
    {
      id: 'navbar',
      title: 'Navbar',
      minutes: 6,
      level: 'Intermedio',
      summary:
        'La barra de navegación responsive: marca, enlaces, menú colapsable y acciones.',
      objectives: [
        'Construir una navbar que colapse en móvil.',
        'Conectar correctamente el toggler con el menú mediante IDs y ARIA.',
        'Añadir un dropdown y una acción principal sin saturar.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p>Una <strong>navbar</strong> agrupa la marca, la navegación principal y las acciones de cuenta. La clase <code>navbar-expand-lg</code> indica el breakpoint a partir del cual el menú se muestra completo; por debajo, aparece el botón hamburguesa.</p>`,
        },
        {
          type: 'code',
          title: 'Navbar completa',
          code: `<nav class="navbar navbar-expand-lg navbar-dark bg-dark rounded" aria-label="Navegación de ejemplo">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Mi Sitio</a>
    <button class="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#demoNav"
            aria-controls="demoNav" aria-expanded="false"
            aria-label="Abrir menú">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="demoNav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item"><a class="nav-link active" aria-current="page" href="#">Inicio</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Productos</a></li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button"
             data-bs-toggle="dropdown" aria-expanded="false">Recursos</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Guías</a></li>
            <li><a class="dropdown-item" href="#">Plantillas</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Contacto</a></li>
          </ul>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar">
        <button class="btn btn-outline-light" type="submit">Buscar</button>
      </form>
    </div>
  </div>
</nav>`,
          note: 'Achica la vista previa para ver el botón hamburguesa. El ID demoNav debe ser único en la página; el toggler lo referencia en data-bs-target.',
        },
        {
          type: 'table',
          caption: 'Atributos que no debes olvidar',
          head: ['Elemento', 'Atributo', 'Para qué'],
          rows: [
            ['Botón toggler', '<code>data-bs-target="#id"</code>', 'Indica qué menú se colapsa.'],
            ['Botón toggler', '<code>aria-controls="id"</code>', 'Relaciona el botón con el menú.'],
            ['Botón toggler', '<code>aria-expanded="false"</code>', 'Bootstrap lo actualiza al abrir y cerrar.'],
            ['Enlace activo', '<code>aria-current="page"</code>', 'Anuncia la página actual.'],
            ['Dropdown', '<code>aria-expanded="false"</code>', 'Estado del menú desplegable.'],
          ],
        },
        {
          type: 'challenge',
          title: 'Añade una acción principal',
          prompt:
            '<p>Añade a la navbar un botón “Empezar” alineado a la derecha, después del formulario de búsqueda. En móvil debe quedar dentro del menú colapsado.</p>',
          hint: 'Coloca el botón después del <code>form</code>, dentro de <code>.navbar-collapse</code>.',
          solution: {
            title: 'Solución',
            code: `<div class="collapse navbar-collapse" id="demoNav">
  <ul class="navbar-nav me-auto">
    <li class="nav-item"><a class="nav-link active" href="#">Inicio</a></li>
    <li class="nav-item"><a class="nav-link" href="#">Productos</a></li>
  </ul>
  <a class="btn btn-primary" href="#">Empezar</a>
</div>`,
          },
        },
        {
          type: 'tip',
          tone: 'warning',
          title: 'No anides navbars',
          html: 'Una navbar dentro de otra genera IDs duplicados y un comportamiento impredecible. Si necesitas una segunda fila de navegación, usa un <code>nav</code> separado debajo.',
        },
      ],
      quiz: {
        question: '¿Qué atributo del botón toggler indica al menú que debe abrir?',
        options: ['href="#menu"', 'data-bs-target="#menu"', 'aria-label="menu"', 'data-menu="true"'],
        answer: 1,
        explanation:
          'data-bs-target contiene el selector del elemento que se colapsa. aria-controls es importante para accesibilidad, pero no es lo que usa Bootstrap para encontrar el menú.',
      },
    },
    {
      id: 'navs-dropdowns',
      title: 'Navs, tabs y dropdowns',
      minutes: 5,
      level: 'Intermedio',
      summary:
        'Organiza contenido en pestañas y acciones secundarias en menús desplegables sin perder el foco del usuario.',
      objectives: [
        'Crear tabs con nav-tabs y tab-content.',
        'Usar dropdowns para acciones secundarias.',
        'Mantener el estado y la accesibilidad al cambiar de pestaña.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p>Los <strong>navs</strong> son listas de enlaces. Cuando añades <code>data-bs-toggle="tab"</code>, se convierten en pestañas que muestran y ocultan paneles. Los <strong>dropdowns</strong> agrupan acciones secundarias detrás de un botón.</p>`,
        },
        {
          type: 'code',
          title: 'Tabs con contenido',
          code: `<ul class="nav nav-tabs" id="demoTabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="tabUnoBtn" data-bs-toggle="tab"
            data-bs-target="#tabUno" type="button" role="tab"
            aria-controls="tabUno" aria-selected="true">Diseño</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="tabDosBtn" data-bs-toggle="tab"
            data-bs-target="#tabDos" type="button" role="tab"
            aria-controls="tabDos" aria-selected="false">Código</button>
  </li>
</ul>
<div class="tab-content border border-top-0 rounded-bottom p-3" id="demoTabsContent">
  <div class="tab-pane fade show active" id="tabUno" role="tabpanel"
       aria-labelledby="tabUnoBtn" tabindex="0">
    <p class="mb-0">Contenido del panel de diseño.</p>
  </div>
  <div class="tab-pane fade" id="tabDos" role="tabpanel"
       aria-labelledby="tabDosBtn" tabindex="0">
    <p class="mb-0">Contenido del panel de código.</p>
  </div>
</div>`,
          note: 'Cada botón debe tener aria-controls y aria-selected. Cada panel debe tener role="tabpanel", aria-labelledby y tabindex="0" para que sea enfocable.',
        },
        {
          type: 'code',
          title: 'Dropdown de acciones',
          code: `<div class="dropdown">
  <button class="btn btn-outline-secondary dropdown-toggle" type="button"
          data-bs-toggle="dropdown" aria-expanded="false">
    Acciones
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Editar</a></li>
    <li><a class="dropdown-item" href="#">Duplicar</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item text-danger" href="#">Eliminar</a></li>
  </ul>
</div>`,
        },
        {
          type: 'tip',
          tone: 'tip',
          title: 'Tabs no son navegación',
          html: 'Las tabs cambian contenido dentro de la misma página. Si cada opción lleva a una URL distinta, usa enlaces de navegación normales, no tabs. Los buscadores y los usuarios esperan URLs compartibles.',
        },
      ],
      quiz: {
        question: '¿Qué atributo convierte un enlace de nav en una pestaña de Bootstrap?',
        options: ['data-bs-toggle="tab"', 'role="tab"', 'class="tab-link"', 'data-tab="true"'],
        answer: 0,
        explanation:
          'data-bs-toggle="tab" activa el comportamiento de pestaña. role="tab" y aria-selected son necesarios para accesibilidad, pero el comportamiento lo aporta data-bs-toggle.',
      },
    },
  ],
};
