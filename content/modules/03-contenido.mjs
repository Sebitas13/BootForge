export default {
  id: 'contenido',
  title: 'Contenido',
  description: 'Tipografía, color e imágenes con criterio visual y accesibilidad.',
  icon: 'type',
  lessons: [
    {
      id: 'typography',
      title: 'Tipografía',
      minutes: 5,
      level: 'Principiante',
      summary:
        'Escalas, pesos y espaciado listos para usar. La jerarquía correcta hace que el contenido se lea solo.',
      objectives: [
        'Usar display-*, lead y las clases de encabezado sin romper la semántica.',
        'Crear listas, citas y texto secundario coherentes.',
        'Mantener una jerarquía de encabezados accesible.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p>Bootstrap define una escala tipográfica base y varias utilidades. La regla más importante no es visual, sino semántica: <strong>elige la etiqueta por su significado</strong> y luego ajusta el tamaño con clases.</p>
<p>Si quieres que un <code>h2</code> se vea como un <code>h1</code>, usa <code>class="h1"</code>. No conviertas un párrafo en encabezado solo porque quieres texto grande.</p>`,
        },
        {
          type: 'code',
          title: 'Jerarquía y texto de apoyo',
          code: `<h1 class="display-5 fw-bold">Un titular que se recuerda</h1>
<p class="lead">Una introducción breve que explica de qué trata la página.</p>

<h2>Sección principal</h2>
<p>El cuerpo del texto usa el tamaño base y un interlineado cómodo. <span class="text-body-secondary">Este fragmento es secundario.</span></p>

<blockquote class="blockquote">
  <p>La simplicidad es la máxima sofisticación.</p>
  <footer class="blockquote-footer">Leonardo da Vinci</footer>
</blockquote>`,
        },
        {
          type: 'table',
          caption: 'Clases tipográficas que más vas a usar',
          head: ['Clase', 'Efecto'],
          rows: [
            ['<code>display-1</code> … <code>display-6</code>', 'Titulares de gran tamaño para héroes.'],
            ['<code>lead</code>', 'Párrafo introductorio con más tamaño y peso.'],
            ['<code>text-body-secondary</code>', 'Texto secundario con contraste reducido.'],
            ['<code>fw-bold</code>, <code>fw-semibold</code>', 'Peso de fuente.'],
            ['<code>text-center</code>, <code>text-lg-start</code>', 'Alineación responsive.'],
            ['<code>blockquote</code>, <code>blockquote-footer</code>', 'Citas con atribución.'],
          ],
        },
        {
          type: 'tip',
          tone: 'warning',
          title: 'No saltes niveles',
          html: 'La secuencia correcta es <code>h1</code> → <code>h2</code> → <code>h3</code>. Un lector de pantalla usa esa jerarquía para navegar. Si necesitas un título visualmente pequeño, cambia la clase, no el nivel.',
        },
      ],
      quiz: {
        question: 'Tienes un h2 y quieres que se vea como un h1. ¿Qué haces?',
        options: [
          'Cambiar la etiqueta a h1 aunque haya otro h1 en la página.',
          'Añadir la clase h1 al h2.',
          'Usar la etiqueta font size="7".',
          'Convertirlo en un párrafo con negrita.',
        ],
        answer: 1,
        explanation:
          'La clase .h1 aplica el estilo visual del h1 sin cambiar el nivel semántico. Así mantienes una jerarquía correcta para lectores de pantalla y buscadores.',
      },
    },
    {
      id: 'colors',
      title: 'Colores y helpers',
      minutes: 4,
      level: 'Principiante',
      summary:
        'Una paleta consistente comunica estados y jerarquía. Aprende a usar color sin sacrificar contraste.',
      objectives: [
        'Aplicar colores de texto, fondo y bordes con las utilidades de Bootstrap.',
        'Usar variantes subtle para fondos suaves.',
        'Comprobar el contraste antes de publicar.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p>Bootstrap genera utilidades de color a partir de su paleta: <code>primary</code>, <code>secondary</code>, <code>success</code>, <code>danger</code>, <code>warning</code>, <code>info</code>, <code>light</code> y <code>dark</code>. Las variantes <code>*-subtle</code> son perfectas para fondos suaves; <code>text-bg-*</code> combina fondo y texto con contraste garantizado.</p>`,
        },
        {
          type: 'code',
          title: 'Texto, fondos y bordes',
          code: `<p class="text-primary">Texto primary</p>
<p class="text-success">Texto success</p>
<p class="text-danger">Texto danger</p>

<div class="p-3 mb-2 bg-primary-subtle border border-primary-subtle rounded">
  Fondo primary-subtle
</div>

<span class="badge text-bg-dark">text-bg-dark</span>
<span class="badge text-bg-warning">text-bg-warning</span>
<span class="badge text-bg-info">text-bg-info</span>`,
        },
        {
          type: 'tip',
          tone: 'info',
          title: 'El color no es el único mensaje',
          html: 'No comuniques un estado solo con color. Acompáñalo de texto, un icono o un patrón. Un usuario con daltonismo o en modo de alto contraste debe poder entenderlo igual.',
        },
        {
          type: 'tip',
          tone: 'warning',
          title: 'Contraste mínimo 4.5:1',
          html: 'Para texto normal, busca una relación de contraste de al menos 4.5:1. <code>text-warning</code> sobre blanco suele fallar; usa <code>text-warning-emphasis</code> o un fondo oscuro.',
        },
      ],
      quiz: {
        question: '¿Qué clase combina fondo y texto con contraste automático?',
        options: ['bg-primary', 'text-primary', 'text-bg-primary', 'border-primary'],
        answer: 2,
        explanation:
          'text-bg-* aplica un fondo y un color de texto pensados para mantener el contraste. bg-primary solo cambia el fondo y puede dejar el texto ilegible.',
      },
    },
    {
      id: 'images',
      title: 'Imágenes y figuras',
      minutes: 4,
      level: 'Principiante',
      summary:
        'Imágenes fluidas, proporciones estables y pies de foto. Menos saltos de layout y más claridad.',
      objectives: [
        'Hacer que una imagen nunca desborde su contenedor.',
        'Usar figure y figcaption para dar contexto.',
        'Evitar el layout shift con width, height y relaciones de aspecto.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p>La clase <code>img-fluid</code> aplica <code>max-width: 100%</code> y altura automática. Es la base para cualquier imagen responsive. Para redondear, añade <code>rounded</code>; para una sombra suave, <code>shadow-sm</code>.</p>`,
        },
        {
          type: 'code',
          title: 'Imagen responsive con pie de foto',
          code: `<figure class="figure">
  <img
    src="assets/img/demo-photo.svg"
    class="figure-img img-fluid rounded shadow-sm"
    alt="Ilustración abstracta de montañas al atardecer"
    width="800"
    height="500">
  <figcaption class="figure-caption">
    Una imagen con proporción estable y texto alternativo descriptivo.
  </figcaption>
</figure>`,
          note: 'La ruta es relativa a la raíz del sitio. En tu proyecto usa la ruta de tu propia imagen.',
        },
        {
          type: 'code',
          title: 'Relación de aspecto sin saltos',
          code: `<div class="ratio ratio-16x9">
  <img src="assets/img/demo-photo.svg" alt="Paisaje abstracto en formato 16:9">
</div>`,
          note: 'ratio reserva el espacio antes de que la imagen cargue, así el contenido no salta (CLS).',
        },
        {
          type: 'tip',
          tone: 'tip',
          title: 'Alt útil, no decorativo',
          html: 'Describe la información que aporta la imagen. Si es puramente decorativa, usa <code>alt=""</code>. Nunca escribas “imagen” o “foto”: el lector de pantalla ya lo sabe.',
        },
      ],
      quiz: {
        question: '¿Qué clase hace que una imagen se adapte al ancho de su contenedor?',
        options: ['img-responsive', 'img-fluid', 'img-auto', 'img-full'],
        answer: 1,
        explanation:
          'img-fluid aplica max-width: 100% y height: auto. En Bootstrap 3 se llamaba img-responsive, pero en Bootstrap 5 es img-fluid.',
      },
    },
  ],
};
