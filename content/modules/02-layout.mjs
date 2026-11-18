export default {
  id: 'layout',
  title: 'Layout y grid',
  description: 'Containers, sistema de 12 columnas y breakpoints para dominar cualquier pantalla.',
  icon: 'layout',
  lessons: [
    {
      id: 'containers',
      title: 'Containers',
      minutes: 4,
      level: 'Principiante',
      summary:
        'El contenedor define el ancho máximo del contenido y lo centra. Elegir bien evita scroll horizontal y layouts rotos.',
      objectives: [
        'Diferenciar container, container-fluid y container-{breakpoint}.',
        'Elegir el contenedor adecuado para una landing o un panel.',
        'Combinar contenedores con filas y columnas sin romper el layout.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p>Bootstrap ofrece tres familias de contenedores. Todos añaden padding horizontal y centran el contenido, pero cambian su ancho máximo:</p>
<ul>
  <li><code>.container</code>: ancho máximo responsive en cada breakpoint.</li>
  <li><code>.container-fluid</code>: ocupa el 100% del ancho disponible.</li>
  <li><code>.container-sm</code>, <code>.container-md</code>, etc.: fluido hasta ese breakpoint y luego fijo.</li>
</ul>`,
        },
        {
          type: 'code',
          title: 'Compara los tres contenedores',
          code: `<div class="container border rounded p-3 mb-3">
  <strong>.container</strong> — ancho máximo centrado
</div>

<div class="container-fluid border rounded p-3 mb-3">
  <strong>.container-fluid</strong> — todo el ancho
</div>

<div class="container-md border rounded p-3">
  <strong>.container-md</strong> — fluido hasta md
</div>`,
          note: 'El borde y el padding son solo para visualizar el ancho. En un proyecto real normalmente no los verás.',
        },
        {
          type: 'table',
          caption: 'Anchos máximos de .container según breakpoint',
          head: ['Breakpoint', 'Ancho máximo'],
          rows: [
            ['<code>sm</code> · ≥576px', '540px'],
            ['<code>md</code> · ≥768px', '720px'],
            ['<code>lg</code> · ≥992px', '960px'],
            ['<code>xl</code> · ≥1200px', '1140px'],
            ['<code>xxl</code> · ≥1400px', '1320px'],
          ],
        },
        {
          type: 'tip',
          tone: 'tip',
          title: 'Un contenedor por sección',
          html: 'No anides <code>.container</code> dentro de otro <code>.container</code>: duplicarás padding y perderás ancho útil. Si necesitas una franja a todo el ancho con contenido centrado, usa un <code>div</code> exterior con fondo y dentro un <code>.container</code>.',
        },
      ],
      quiz: {
        question: '¿Qué contenedor ocupa siempre el 100% del ancho de la ventana?',
        options: ['.container', '.container-fluid', '.container-md', '.container-fixed'],
        answer: 1,
        explanation:
          '.container-fluid no impone un ancho máximo: ocupa todo el ancho disponible. .container sí tiene anchos máximos por breakpoint.',
      },
    },
    {
      id: 'grid',
      title: 'Grid de 12 columnas',
      minutes: 8,
      level: 'Principiante',
      summary:
        'Filas y columnas con 12 unidades: el patrón que usarás para casi cualquier composición responsive.',
      objectives: [
        'Construir filas con columnas de distintos anchos.',
        'Usar las clases col, col-6, col-md-4 y sus variantes.',
        'Controlar el espaciado entre columnas con las utilidades g-*.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p>El grid de Bootstrap se basa en tres piezas:</p>
<ol>
  <li><strong>Contenedor:</strong> <code>.container</code> o <code>.container-fluid</code>.</li>
  <li><strong>Fila:</strong> <code>.row</code>, que activa flexbox y compensa los gutters.</li>
  <li><strong>Columnas:</strong> <code>.col</code> o <code>.col-{breakpoint}-{n}</code>, donde <code>n</code> suma 12 por fila.</li>
</ol>
<p>Si una fila supera 12 columnas, las extra bajan a la siguiente línea. Ese comportamiento es intencional y muy útil en responsive.</p>`,
        },
        {
          type: 'code',
          title: 'Tres columnas que se apilan en móvil',
          code: `<div class="row g-3">
  <div class="col-12 col-md-6 col-lg-4">
    <div class="p-3 bg-primary-subtle border rounded">Columna 1</div>
  </div>
  <div class="col-12 col-md-6 col-lg-4">
    <div class="p-3 bg-success-subtle border rounded">Columna 2</div>
  </div>
  <div class="col-12 col-md-6 col-lg-4">
    <div class="p-3 bg-warning-subtle border rounded">Columna 3</div>
  </div>
</div>`,
          note: 'En móvil cada columna ocupa 12/12. Desde md, dos por fila (6/12). Desde lg, tres por fila (4/12).',
        },
        {
          type: 'text',
          html: `<h2>Columnas automáticas y anchos mixtos</h2>
<p><code>.col</code> sin número reparte el espacio disponible a partes iguales. También puedes combinar una columna fija con otra flexible:</p>`,
        },
        {
          type: 'code',
          title: 'Sidebar fija + contenido flexible',
          code: `<div class="row g-3">
  <div class="col-12 col-md-4">
    <div class="p-3 bg-body-secondary border rounded">Sidebar (4/12)</div>
  </div>
  <div class="col-12 col-md-8">
    <div class="p-3 bg-body-secondary border rounded">Contenido (8/12)</div>
  </div>
</div>`,
        },
        {
          type: 'challenge',
          title: 'Construye una galería de 4 tarjetas',
          prompt:
            '<p>Crea una fila con cuatro tarjetas que se vean una por fila en móvil, dos por fila en tablet (<code>md</code>) y cuatro por fila en escritorio (<code>lg</code>). Usa <code>g-3</code> para el espaciado.</p>',
          hint: 'La base es <code>col-12</code>. Añade <code>col-md-6</code> y <code>col-lg-3</code>.',
          solution: {
            title: 'Solución',
            code: `<div class="row g-3">
  <div class="col-12 col-md-6 col-lg-3"><div class="p-3 bg-primary-subtle border rounded">1</div></div>
  <div class="col-12 col-md-6 col-lg-3"><div class="p-3 bg-primary-subtle border rounded">2</div></div>
  <div class="col-12 col-md-6 col-lg-3"><div class="p-3 bg-primary-subtle border rounded">3</div></div>
  <div class="col-12 col-md-6 col-lg-3"><div class="p-3 bg-primary-subtle border rounded">4</div></div>
</div>`,
          },
        },
        {
          type: 'tip',
          tone: 'warning',
          title: 'Columnas solo dentro de filas',
          html: 'Una <code>.col</code> debe ser hija directa de una <code>.row</code>. Si necesitas un contenedor interno, añade un <code>div</code> dentro de la columna, no otra columna suelta.',
        },
      ],
      quiz: {
        question: '¿Cuántas columnas forman una fila completa del grid de Bootstrap?',
        options: ['6', '10', '12', '16'],
        answer: 2,
        explanation:
          'El grid usa 12 columnas. Una fila con col-4 + col-4 + col-4 suma 12. Si sumas más de 12, las columnas extra se envuelven.',
      },
    },
    {
      id: 'breakpoints',
      title: 'Breakpoints y diseño responsive',
      minutes: 5,
      level: 'Principiante',
      summary:
        'Los breakpoints son los puntos donde tu diseño cambia. Bootstrap los aplica con un enfoque mobile-first.',
      objectives: [
        'Memorizar los breakpoints estándar de Bootstrap.',
        'Entender por qué las clases base aplican a todos los tamaños.',
        'Evitar el error clásico de diseñar primero para escritorio.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p>Bootstrap define seis breakpoints. Los infijos <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code> y <code>xxl</code> significan <strong>“desde este ancho en adelante”</strong>. El estilo sin infijo es la base móvil.</p>`,
        },
        {
          type: 'table',
          caption: 'Breakpoints de Bootstrap 5',
          head: ['Infijo', 'Ancho mínimo', 'Ejemplo de uso'],
          rows: [
            ['<em>(ninguno)</em>', '0px', '<code>.col-12</code>'],
            ['<code>sm</code>', '576px', '<code>.col-sm-6</code>'],
            ['<code>md</code>', '768px', '<code>.col-md-4</code>'],
            ['<code>lg</code>', '992px', '<code>.col-lg-3</code>'],
            ['<code>xl</code>', '1200px', '<code>.col-xl-2</code>'],
            ['<code>xxl</code>', '1400px', '<code>.col-xxl-1</code>'],
          ],
        },
        {
          type: 'code',
          title: 'Mobile-first en acción',
          code: `<div class="row g-3">
  <div class="col-12 col-sm-6 col-lg-3">
    <div class="p-3 bg-body-secondary border rounded">1</div>
  </div>
  <div class="col-12 col-sm-6 col-lg-3">
    <div class="p-3 bg-body-secondary border rounded">2</div>
  </div>
  <div class="col-12 col-sm-6 col-lg-3">
    <div class="p-3 bg-body-secondary border rounded">3</div>
  </div>
  <div class="col-12 col-sm-6 col-lg-3">
    <div class="p-3 bg-body-secondary border rounded">4</div>
  </div>
</div>`,
          note: 'Prueba a estrechar la vista previa: 1 columna → 2 columnas desde sm → 4 columnas desde lg.',
        },
        {
          type: 'tip',
          tone: 'tip',
          title: 'No necesitas todos los breakpoints',
          html: 'La mayoría de interfaces se resuelven con dos o tres puntos de cambio. Añadir clases para cada tamaño suele generar CSS innecesario y más difícil de mantener.',
        },
        {
          type: 'tip',
          tone: 'info',
          title: 'Prueba el zoom, no solo el ancho',
          html: 'Un diseño responsive también debe funcionar al 200% de zoom. Usa unidades relativas, evita alturas fijas y deja que el texto fluya.',
        },
      ],
      quiz: {
        question: '¿Desde qué ancho se aplica la clase .col-md-6?',
        options: ['Desde 576px', 'Desde 768px', 'Desde 992px', 'Desde 1200px'],
        answer: 1,
        explanation:
          'md corresponde a 768px. La clase aplica desde ese ancho en adelante, no solo en ese rango. En pantallas menores se usa la clase base (por ejemplo, .col-12).',
      },
    },
  ],
};
