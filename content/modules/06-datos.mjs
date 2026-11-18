export default {
  id: 'datos',
  title: 'Datos',
  description: 'Tablas legibles, listas agrupadas y paginación con semántica correcta.',
  icon: 'table',
  lessons: [
    {
      id: 'tables',
      title: 'Tablas',
      minutes: 5,
      level: 'Principiante',
      summary:
        'Presenta datos tabulares sin romper el móvil y sin perder la relación entre encabezados y celdas.',
      objectives: [
        'Usar table-responsive para evitar desbordes en móvil.',
        'Añadir caption y scope para mejorar la accesibilidad.',
        'Elegir variantes de tabla según la densidad de datos.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p>Una tabla HTML debe usarse para <strong>datos tabulares</strong>, no para maquetar. Bootstrap añade estilos con <code>.table</code> y variantes como <code>table-striped</code>, <code>table-hover</code> o <code>table-sm</code>.</p>
<p>En móvil, envuelve la tabla en <code>.table-responsive</code> para permitir scroll horizontal sin romper la página.</p>`,
        },
        {
          type: 'code',
          title: 'Tabla con encabezados correctos',
          code: `<div class="table-responsive">
  <table class="table table-striped table-hover align-middle">
    <caption>Últimos pedidos de la tienda</caption>
    <thead class="table-dark">
      <tr>
        <th scope="col">Pedido</th>
        <th scope="col">Cliente</th>
        <th scope="col">Total</th>
        <th scope="col">Estado</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>#1042</td>
        <td>Ana Torres</td>
        <td>$48.00</td>
        <td><span class="badge text-bg-success">Pagado</span></td>
      </tr>
      <tr>
        <td>#1041</td>
        <td>Luis Méndez</td>
        <td>$32.50</td>
        <td><span class="badge text-bg-warning">Pendiente</span></td>
      </tr>
      <tr>
        <td>#1040</td>
        <td>María Rojas</td>
        <td>$75.00</td>
        <td><span class="badge text-bg-secondary">Enviado</span></td>
      </tr>
    </tbody>
  </table>
</div>`,
          note: 'Usa scope="col" en los encabezados de columna y scope="row" si la primera celda de cada fila es un encabezado de fila.',
        },
        {
          type: 'table',
          caption: 'Variantes de tabla',
          head: ['Clase', 'Cuándo usarla'],
          rows: [
            ['<code>table-striped</code>', 'Filas alternas para facilitar el seguimiento horizontal.'],
            ['<code>table-hover</code>', 'Filas grandes o clicables; ayuda a saber dónde está el cursor.'],
            ['<code>table-bordered</code>', 'Datos densos donde cada celda importa.'],
            ['<code>table-sm</code>', 'Paneles con muchas filas y poco espacio vertical.'],
            ['<code>table-responsive</code>', 'Siempre que la tabla pueda superar el ancho del móvil.'],
          ],
        },
        {
          type: 'tip',
          tone: 'tip',
          title: 'La tabla no es un layout',
          html: 'Si estás usando una tabla para colocar el logo, el menú y el contenido, usa grid o flexbox. Las tablas tienen semántica de datos y los lectores de pantalla las anuncian como tal.',
        },
      ],
      quiz: {
        question: '¿Qué envoltorio permite que una tabla ancha haga scroll en móvil sin romper la página?',
        options: ['.table-scroll', '.table-responsive', '.table-fluid', '.table-mobile'],
        answer: 1,
        explanation:
          '.table-responsive añade overflow-x: auto en el contenedor. La tabla mantiene su ancho y el usuario puede desplazarse horizontalmente dentro de ese bloque.',
      },
    },
    {
      id: 'lists-pagination',
      title: 'List groups y pagination',
      minutes: 5,
      level: 'Principiante',
      summary:
        'Listas con estados y navegación entre páginas. Componentes pequeños que aparecen en casi todos los paneles.',
      objectives: [
        'Construir list groups con elementos activos, deshabilitados y badges.',
        'Usar pagination con etiquetas accesibles.',
        'Elegir entre list group, nav y tabla según el contenido.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p>Un <strong>list group</strong> es una lista de elementos relacionados: menús, tareas, resultados de búsqueda o pasos. Puedes usar <code>ul/li</code>, <code>div</code> o enlaces; elige la etiqueta que corresponda al comportamiento.</p>`,
        },
        {
          type: 'code',
          title: 'List group con estados',
          code: `<ul class="list-group">
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Diseño de la landing
    <span class="badge text-bg-primary rounded-pill">3</span>
  </li>
  <li class="list-group-item active" aria-current="true">
    Revisar accesibilidad
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    Publicar en GitHub Pages
    <span class="badge text-bg-success rounded-pill">Hecho</span>
  </li>
  <li class="list-group-item disabled" aria-disabled="true">
    Configurar dominio propio
  </li>
</ul>`,
          note: 'El elemento activo usa aria-current="true". El deshabilitado usa aria-disabled y, si fuera un enlace, conviene quitarle el href para que no sea enfocable.',
        },
        {
          type: 'code',
          title: 'Paginación accesible',
          code: `<nav aria-label="Páginas de resultados">
  <ul class="pagination">
    <li class="page-item disabled">
      <span class="page-link">Anterior</span>
    </li>
    <li class="page-item"><a class="page-link" href="#pagina-1">1</a></li>
    <li class="page-item active" aria-current="page">
      <span class="page-link">2</span>
    </li>
    <li class="page-item"><a class="page-link" href="#pagina-3">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#pagina-3">Siguiente</a>
    </li>
  </ul>
</nav>`,
          note: 'La página actual no debe ser un enlace. Usa un span con aria-current="page" para que el lector de pantalla sepa dónde está.',
        },
        {
          type: 'tip',
          tone: 'info',
          title: 'Paginación vs. scroll infinito',
          html: 'La paginación es predecible y accesible; el scroll infinito puede ser cómodo pero dificulta volver a un elemento. Si eliges scroll infinito, ofrece también una forma de navegar por páginas o de buscar.',
        },
      ],
      quiz: {
        question: '¿Cómo se marca la página actual en una paginación de Bootstrap?',
        options: [
          'Con la clase .active en el li y aria-current="page".',
          'Con un enlace href="#".',
          'Con la clase .disabled en el enlace.',
          'Con un botón sin texto.',
        ],
        answer: 0,
        explanation:
          'La página actual se marca con .active en el elemento de la lista y aria-current="page". No debe ser un enlace porque ya estás en esa página.',
      },
    },
  ],
};
