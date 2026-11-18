export default {
  id: 'primeros-pasos',
  title: 'Primeros pasos',
  description: 'Qué es Bootstrap, cómo instalarlo y cómo se estructura una página moderna.',
  icon: 'rocket',
  lessons: [
    {
      id: 'que-es-bootstrap',
      title: '¿Qué es Bootstrap 5?',
      minutes: 5,
      level: 'Principiante',
      summary:
        'El framework CSS que transforma HTML plano en interfaces responsivas con clases reutilizables.',
      objectives: [
        'Entender qué problema resuelve Bootstrap y cuándo conviene usarlo.',
        'Reconocer sus ventajas frente a escribir todo el CSS desde cero.',
        'Crear tu primer componente funcional en menos de un minuto.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p><strong>Bootstrap</strong> es una colección de estilos CSS, componentes y utilidades de JavaScript que te permite construir sitios responsivos con muy poco código propio. En lugar de inventar cada botón, tarjeta o barra de navegación, aplicas clases como <code>btn btn-primary</code> y obtienes un resultado consistente en todos los navegadores.</p>
<p>Su enfoque es <strong>mobile-first</strong>: los estilos base están pensados para pantallas pequeñas y las variantes <code>sm</code>, <code>md</code>, <code>lg</code> los adaptan a pantallas mayores. Bootstrap 5 eliminó jQuery, así que todo su JavaScript es vanilla.</p>`,
        },
        {
          type: 'code',
          title: 'Tu primer componente',
          code: `<div class="alert alert-primary" role="alert">
  <strong>¡Hola, Bootstrap!</strong> Este componente ya es responsivo y accesible.
</div>`,
          note: 'Un solo bloque de HTML produce un aviso con color, espaciado, tipografía y contraste coherentes.',
        },
        {
          type: 'text',
          html: `<h2>¿Cuándo te conviene usarlo?</h2>
<ul>
  <li><strong>Prototipos y MVPs:</strong> consigues una interfaz presentable en horas, no semanas.</li>
  <li><strong>Paneles y herramientas internas:</strong> los componentes estándar reducen decisiones de diseño.</li>
  <li><strong>Sitios de documentación o portafolios:</strong> tienes una base accesible y probada.</li>
  <li><strong>Equipos pequeños:</strong> una convención compartida evita reinventar patrones.</li>
</ul>
<p>Si necesitas una identidad visual muy específica, probablemente termines personalizando variables y añadiendo CSS propio. Eso no es un defecto: Bootstrap está diseñado para ser extendido.</p>`,
        },
        {
          type: 'table',
          caption: 'Ventajas y límites de Bootstrap 5',
          head: ['Ventajas', 'Límites que debes conocer'],
          rows: [
            ['Sistema de grid y utilidades probadas', 'Puede parecer genérico si no personalizas la paleta'],
            ['Componentes accesibles y responsivos', 'No sustituye una auditoría de accesibilidad real'],
            ['Documentación extensa y comunidad enorme', 'Incluye más CSS del que usarás en una página pequeña'],
            ['Sin jQuery y con soporte moderno', 'Requiere adaptar patrones si vienes de Bootstrap 4'],
          ],
        },
        {
          type: 'tip',
          tone: 'tip',
          title: 'Bootstrap no es magia',
          html: 'Las clases te dan una base sólida, pero la jerarquía, el contenido y la accesibilidad siguen siendo responsabilidad tuya. Usa HTML semántico siempre que puedas.',
        },
      ],
      quiz: {
        question: '¿Qué aporta principalmente Bootstrap a un proyecto web?',
        options: [
          'Un servidor y una base de datos listos para producción.',
          'Un conjunto de estilos, componentes y utilidades reutilizables.',
          'Un lenguaje de programación que reemplaza a JavaScript.',
          'Un sistema operativo para desplegar sitios estáticos.',
        ],
        answer: 1,
        explanation:
          'Bootstrap es principalmente una biblioteca de CSS y JavaScript. No incluye backend ni base de datos; tú eliges dónde alojar el sitio y cómo obtener los datos.',
      },
    },
    {
      id: 'instalacion',
      title: 'Instala Bootstrap en 3 formas',
      minutes: 6,
      level: 'Principiante',
      summary:
        'CDN, archivos locales o npm: elige la opción que encaje con tu proyecto y evita versiones mezcladas.',
      objectives: [
        'Agregar Bootstrap con CDN y verificar la versión exacta.',
        'Descargar los archivos para trabajar sin conexión.',
        'Instalarlo con npm en un proyecto con build.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p>Hay tres formas habituales de incorporar Bootstrap. En todos los casos necesitas <strong>el CSS</strong> para los estilos y <strong>el bundle de JavaScript</strong> para componentes interactivos como modales, dropdowns o tabs.</p>
<p>Fija siempre una versión exacta. Una URL como <code>@5/dist/...</code> puede cambiar de comportamiento sin que toques tu código.</p>`,
        },
        {
          type: 'code',
          title: 'Opción 1: CDN con integridad',
          code: `<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.9/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-yEPZ7jP9S0QKiUQ0m3jjsO4ProIW7wvR9gXkI7JOGa2XVsw53Yke2bsdkBbjmmiX"
  crossorigin="anonymous">

<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.9/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-WyOxWvTyr1QaMPfiPJSv76iReVthorl5uWlFtZPyK0IEB0hGzo9y5Bp9mYanr8Bu"
  crossorigin="anonymous"></script>`,
          preview: `<div class="alert alert-success" role="alert">
  <strong>Bootstrap cargado.</strong> El CSS va en el <code>&lt;head&gt;</code> y el JavaScript antes de cerrar <code>&lt;/body&gt;</code>.
</div>`,
          note: 'El atributo integrity verifica que el archivo descargado sea exactamente el que esperas. Si cambias de versión, actualiza también el hash.',
        },
        {
          type: 'text',
          html: `<h2>Opción 2: archivos locales</h2>
<p>Descarga el ZIP desde la documentación oficial y copia <code>bootstrap.min.css</code> y <code>bootstrap.bundle.min.js</code> a tu proyecto. Esta opción funciona sin internet y te da control total sobre la versión.</p>
<pre class="mini-tree"><code>mi-proyecto/
├── assets/
│   ├── css/bootstrap.min.css
│   └── js/bootstrap.bundle.min.js
└── index.html</code></pre>
<p>En el HTML usa rutas relativas: <code>assets/css/bootstrap.min.css</code>. Evita rutas absolutas como <code>/assets/...</code> si vas a publicar en un subdirectorio de GitHub Pages.</p>`,
        },
        {
          type: 'code',
          title: 'Opción 3: npm',
          language: 'bash',
          code: `npm install bootstrap@5.3.9`,
          preview: false,
          note: 'Con un bundler puedes importar solo lo que usas: import "bootstrap/dist/css/bootstrap.min.css" y el JS necesario.',
        },
        {
          type: 'tip',
          tone: 'warning',
          title: 'No mezcles versiones',
          html: 'Si el CSS es 5.3.9, el JavaScript debe ser 5.3.9. Mezclar parches puede provocar componentes que se ven bien pero fallan al abrirse.',
        },
      ],
      quiz: {
        question: '¿Dónde conviene colocar el script de Bootstrap?',
        options: [
          'Dentro del <head>, antes del CSS.',
          'Antes de cerrar </body>, después del contenido.',
          'Al inicio del <body>, antes del HTML visible.',
          'No hace falta incluirlo nunca.',
        ],
        answer: 1,
        explanation:
          'El bundle se coloca al final del body para que el HTML exista cuando Bootstrap inicialice sus componentes. El CSS sí va en el head para evitar parpadeos de estilo.',
      },
    },
    {
      id: 'estructura',
      title: 'La estructura de una página',
      minutes: 5,
      level: 'Principiante',
      summary:
        'Un documento HTML limpio, semántico y listo para Bootstrap: doctype, idioma, viewport y landmarks.',
      objectives: [
        'Escribir el esqueleto mínimo de un documento HTML5.',
        'Configurar idioma, codificación y viewport correctamente.',
        'Usar header, nav, main y footer con intención.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p>Antes de añadir clases, asegúrate de que el documento tenga una base correcta. Estos cinco elementos evitan la mayoría de problemas de codificación, zoom móvil y accesibilidad:</p>
<ol>
  <li><code>&lt;!doctype html&gt;</code> activa el modo estándar del navegador.</li>
  <li><code>lang="es"</code> indica el idioma a lectores de pantalla y buscadores.</li>
  <li><code>charset="utf-8"</code> permite tildes y símbolos sin errores.</li>
  <li><code>viewport</code> hace que el sitio se adapte al ancho real del dispositivo.</li>
  <li>Un <code>title</code> único describe la página en la pestaña y en Google.</li>
</ol>`,
        },
        {
          type: 'code',
          title: 'Esqueleto completo',
          code: `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mi primera página con Bootstrap</title>
  <link rel="stylesheet" href="assets/css/bootstrap.min.css">
</head>
<body>
  <header class="bg-dark text-white p-3">
    <h1 class="h3 mb-0">Mi sitio</h1>
  </header>

  <main class="container py-4">
    <p class="lead">Contenido principal de la página.</p>
  </main>

  <footer class="border-top py-3 text-center text-body-secondary">
    <small>© 2026 Mi sitio</small>
  </footer>

  <script src="assets/js/bootstrap.bundle.min.js"></script>
</body>
</html>`,
          preview: `<header class="bg-dark text-white p-3 rounded-top">
  <p class="h3 mb-0">Mi sitio</p>
</header>
<main class="container border border-top-0 rounded-bottom py-4">
  <p class="lead mb-0">Contenido principal de la página.</p>
</main>`,
          note: 'En la vista previa se muestra solo el contenido del body; el documento completo es el que debes copiar en tu editor.',
        },
        {
          type: 'text',
          html: `<h2>Landmarks: el mapa de tu página</h2>
<p>Los elementos semánticos permiten que las tecnologías de asistencia salten directamente a las zonas importantes. No son decoración: son la estructura del documento.</p>`,
        },
        {
          type: 'table',
          caption: 'Elementos estructurales y su función',
          head: ['Elemento', 'Uso recomendado'],
          rows: [
            ['<code>&lt;header&gt;</code>', 'Cabecera de la página o de una sección; puede contener logo y navegación.'],
            ['<code>&lt;nav&gt;</code>', 'Bloque de enlaces de navegación. Añade <code>aria-label</code> si hay más de uno.'],
            ['<code>&lt;main&gt;</code>', 'Contenido principal único de la página. Debe existir una sola vez.'],
            ['<code>&lt;footer&gt;</code>', 'Pie de página o de una sección: créditos, licencia, enlaces secundarios.'],
            ['<code>&lt;section&gt;</code>', 'Agrupación temática con un encabezado propio.'],
          ],
        },
        {
          type: 'tip',
          tone: 'tip',
          title: 'Un solo h1 por página',
          html: 'El <code>h1</code> describe el tema principal. Los <code>h2</code> y <code>h3</code> construyen la jerarquía interna. No los elijas por su tamaño: para eso están las clases <code>h2</code>, <code>h3</code> o <code>display-*</code>.',
        },
      ],
      quiz: {
        question: '¿Qué meta etiqueta es imprescindible para que el diseño responsivo funcione en móvil?',
        options: [
          '<meta charset="utf-8">',
          '<meta name="viewport" content="width=device-width, initial-scale=1">',
          '<meta name="theme-color" content="#000">',
          '<meta http-equiv="refresh" content="0">',
        ],
        answer: 1,
        explanation:
          'Sin la meta viewport, los navegadores móviles usan un lienzo virtual de escritorio y reducen la página. Bootstrap necesita el ancho real del dispositivo para aplicar sus breakpoints.',
      },
    },
  ],
};
