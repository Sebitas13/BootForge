export default {
  id: 'proyecto',
  title: 'Utilidades y proyecto',
  description: 'Las clases que resuelven el 80% del trabajo diario y una landing publicada.',
  icon: 'rocket',
  lessons: [
    {
      id: 'utilities',
      title: 'Utilidades clave',
      minutes: 5,
      level: 'Intermedio',
      summary:
        'Espaciado, flexbox, display y bordes: pequeñas clases que evitan escribir CSS nuevo.',
      objectives: [
        'Aplicar la escala de spacing de Bootstrap con criterio.',
        'Usar flexbox y display para alinear contenido sin CSS propio.',
        'Saber cuándo una utilidad es suficiente y cuándo necesitas una clase semántica.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p>Las utilidades son clases de un solo propósito. La escala de espaciado va de <code>0</code> a <code>5</code> y se combina con lados: <code>m</code> (margin), <code>p</code> (padding), <code>t</code> (top), <code>b</code> (bottom), <code>s</code> (start), <code>e</code> (end), <code>x</code> (horizontal), <code>y</code> (vertical).</p>
<p>Ejemplo: <code>mt-3</code> es margin-top nivel 3; <code>px-4</code> es padding horizontal nivel 4.</p>`,
        },
        {
          type: 'code',
          title: 'Spacing, flex y display',
          code: `<div class="p-3 mb-3 bg-body-secondary border rounded">
  <strong>p-3</strong> añade padding interno; <strong>mb-3</strong> separa del siguiente bloque.
</div>

<div class="d-flex flex-wrap justify-content-between align-items-center gap-2 p-3 bg-body-tertiary border rounded">
  <span>Izquierda</span>
  <span class="text-body-secondary">Centro</span>
  <span class="badge text-bg-primary">Derecha</span>
</div>

<div class="d-none d-md-block mt-3 p-2 bg-primary-subtle rounded">
  Visible solo desde md
</div>`,
        },
        {
          type: 'table',
          caption: 'Utilidades que usarás cada semana',
          head: ['Grupo', 'Ejemplos', 'Para qué'],
          rows: [
            ['Spacing', '<code>mt-3</code>, <code>p-4</code>, <code>gap-2</code>', 'Ritmo vertical y separación.'],
            ['Flex', '<code>d-flex</code>, <code>justify-content-between</code>', 'Alinear y distribuir elementos.'],
            ['Display', '<code>d-none</code>, <code>d-md-block</code>', 'Mostrar u ocultar por breakpoint.'],
            ['Texto', '<code>text-center</code>, <code>text-truncate</code>', 'Alineación y recorte controlado.'],
            ['Bordes', '<code>border</code>, <code>rounded-3</code>', 'Delimitadores y radios.'],
            ['Sombras', '<code>shadow-sm</code>, <code>shadow-lg</code>', 'Profundidad visual.'],
          ],
        },
        {
          type: 'tip',
          tone: 'tip',
          title: 'Utilidades sí, pero con orden',
          html: 'Si una combinación de utilidades se repite diez veces, conviértela en una clase con nombre semántico en tu CSS. Las utilidades son para ajustes puntuales, no para construir un sistema entero inline.',
        },
      ],
      quiz: {
        question: '¿Qué hace la clase mt-3?',
        options: [
          'Añade padding horizontal de 3rem.',
          'Añade margin-top en el nivel 3 de la escala.',
          'Hace el texto 3 veces más grande.',
          'Muestra el elemento desde el breakpoint md.',
        ],
        answer: 1,
        explanation:
          'm = margin, t = top, 3 = nivel de la escala. En Bootstrap, los niveles van de 0 a 5 y equivalen a múltiplos del espaciador base.',
      },
    },
    {
      id: 'proyecto-landing',
      title: 'Proyecto: landing page',
      minutes: 10,
      level: 'Intermedio',
      summary:
        'Integra navbar, hero, features y footer en una página completa que puedes publicar.',
      objectives: [
        'Componer una landing con secciones semánticas.',
        'Reutilizar el grid y las cards en un caso real.',
        'Revisar el resultado en móvil antes de publicar.',
      ],
      blocks: [
        {
          type: 'text',
          html: `<p>Vamos a construir una landing mínima pero completa. Incluye una navbar, un hero con llamada a la acción, tres features y un footer. Todos los estilos salen de Bootstrap; no hay CSS propio.</p>
<p>Copia el bloque en un archivo <code>index.html</code>, añade Bootstrap y tendrás una base publicable.</p>`,
        },
        {
          type: 'code',
          title: 'Landing completa',
          code: `<nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom">
  <div class="container">
    <a class="navbar-brand fw-bold" href="#">Nova</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#landingNav" aria-controls="landingNav"
            aria-expanded="false" aria-label="Abrir menú">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="landingNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link" href="#features">Features</a></li>
        <li class="nav-item"><a class="nav-link" href="#precios">Precios</a></li>
        <li class="nav-item"><a class="nav-link" href="#contacto">Contacto</a></li>
      </ul>
    </div>
  </div>
</nav>

<header class="py-5 bg-body-tertiary">
  <div class="container py-4">
    <div class="row align-items-center g-4">
      <div class="col-lg-7">
        <span class="badge text-bg-primary mb-3">Nuevo</span>
        <h1 class="display-5 fw-bold">Tu producto, listo para despegar.</h1>
        <p class="lead text-body-secondary">Una landing clara, rápida y responsive construida con Bootstrap 5.</p>
        <div class="d-flex flex-wrap gap-2">
          <a class="btn btn-primary btn-lg" href="#precios">Empezar gratis</a>
          <a class="btn btn-outline-secondary btn-lg" href="#features">Ver features</a>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="ratio ratio-4x3 bg-primary-subtle border rounded-3 d-flex align-items-center justify-content-center">
          <span class="fs-1">🚀</span>
        </div>
      </div>
    </div>
  </div>
</header>

<section class="py-5" id="features">
  <div class="container">
    <div class="text-center mb-4">
      <h2>Todo lo que necesitas</h2>
      <p class="text-body-secondary">Menos configuración, más producto.</p>
    </div>
    <div class="row g-4">
      <div class="col-md-4">
        <div class="card h-100"><div class="card-body">
          <h3 class="h5">Rápido</h3>
          <p class="text-body-secondary mb-0">Carga en segundos y funciona en cualquier dispositivo.</p>
        </div></div>
      </div>
      <div class="col-md-4">
        <div class="card h-100"><div class="card-body">
          <h3 class="h5">Accesible</h3>
          <p class="text-body-secondary mb-0">HTML semántico, foco visible y contraste cuidado.</p>
        </div></div>
      </div>
      <div class="col-md-4">
        <div class="card h-100"><div class="card-body">
          <h3 class="h5">Escalable</h3>
          <p class="text-body-secondary mb-0">Un grid de 12 columnas para crecer sin dolor.</p>
        </div></div>
      </div>
    </div>
  </div>
</section>

<footer class="py-4 border-top" id="contacto">
  <div class="container d-flex flex-wrap justify-content-between gap-2">
    <span class="text-body-secondary">© 2026 Nova</span>
    <a href="#contacto">hola@nova.example</a>
  </div>
</footer>`,
          note: 'La vista previa muestra la landing dentro de un iframe. En un proyecto real, coloca este contenido dentro de <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code> y <code>&lt;body&gt;</code>.',
        },
        {
          type: 'challenge',
          title: 'Personaliza la landing',
          prompt:
            '<p>Cambia la paleta a <code>success</code>, reemplaza el emoji por una imagen con <code>img-fluid</code> y añade una sección de precio con una card y un botón. Mantén la jerarquía de encabezados.</p>',
          hint: 'Usa <code>bg-success-subtle</code> para el hero, <code>text-bg-success</code> para el badge y una card con <code>h-100</code>.',
          solution: {
            title: 'Idea de solución',
            code: `<header class="py-5 bg-success-subtle">
  <div class="container py-4 text-center">
    <h1 class="display-5 fw-bold">Tu plan, sin sorpresas.</h1>
    <p class="lead text-body-secondary">Todo lo esencial por un precio simple.</p>
  </div>
</header>
<section class="py-5">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <div class="card-body text-center">
            <h2 class="h4">Pro</h2>
            <p class="display-6 fw-bold">$12<span class="fs-6 fw-normal">/mes</span></p>
            <a class="btn btn-success w-100" href="#">Elegir Pro</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>`,
          },
        },
        {
          type: 'tip',
          tone: 'tip',
          title: 'Revisa en 360px y en 1440px',
          html: 'Antes de publicar, prueba la landing en el ancho más pequeño que puedas y en escritorio. Revisa que no haya scroll horizontal, que los botones se puedan pulsar con el dedo y que el foco del teclado sea visible.',
        },
      ],
      quiz: {
        question: '¿Qué clase de Bootstrap mantiene una proporción estable para un bloque multimedia?',
        options: ['.ratio', '.aspect', '.media', '.proportion'],
        answer: 0,
        explanation:
          '.ratio con una variante como ratio-16x9 o ratio-4x3 reserva el espacio según la proporción indicada, evitando saltos de layout.',
      },
    },
    {
      id: 'publicar',
      title: 'Publica en GitHub Pages',
      minutes: 6,
      level: 'Intermedio',
      summary:
        'Del repositorio local a una URL pública con HTTPS, en menos de diez minutos.',
      objectives: [
        'Crear un repositorio y subir el proyecto.',
        'Activar GitHub Pages desde la configuración o con Actions.',
        'Evitar los errores clásicos de rutas y 404.',
      ],
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: 'Crea el repositorio',
              html: '<p>En GitHub, crea un repositorio público. No añadas README ni licencia si ya los tienes en local; así evitas conflictos en el primer push.</p>',
            },
            {
              title: 'Sube tu proyecto',
              html: '<p>Desde la carpeta del proyecto, inicializa Git y sube la rama principal. Cambia la URL por la de tu repositorio.</p>',
            },
            {
              title: 'Activa Pages',
              html: '<p>Ve a <strong>Settings → Pages</strong>, elige <strong>Deploy from a branch</strong>, rama <code>main</code> y carpeta <code>/ (root)</code>. Guarda y espera unos minutos.</p>',
            },
            {
              title: 'Comprueba la URL',
              html: '<p>Tu sitio estará en <code>https://TU-USUARIO.github.io/TU-REPO/</code>. Abre la consola y verifica que no haya 404 de CSS, JS o imágenes.</p>',
            },
          ],
        },
        {
          type: 'code',
          title: 'Comandos de Git',
          language: 'bash',
          code: `git init
git add .
git commit -m "Publicar mi primera landing"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main`,
          preview: false,
          note: 'Si ya tienes un repositorio, omite git init y git remote add. Revisa siempre con git status antes de hacer commit.',
        },
        {
          type: 'checklist',
          items: [
            'Tu archivo principal se llama <code>index.html</code> y está en la raíz (o en la carpeta configurada).',
            'Todas las rutas son relativas y respetan mayúsculas y minúsculas.',
            'No hay enlaces a <code>localhost</code> ni archivos que solo existen en tu máquina.',
            'Incluyes un <code>404.html</code> para las rutas que no existan.',
            'El sitio carga por HTTPS y no tiene contenido mixto.',
            'Probaste la URL publicada en móvil y en escritorio.',
          ],
        },
        {
          type: 'tip',
          tone: 'warning',
          title: 'Rutas sensibles a mayúsculas',
          html: 'En Windows una ruta <code>CSS/estilos.css</code> puede funcionar aunque escribas <code>css/estilos.css</code>. En GitHub Pages (Linux) no. Usa exactamente el mismo nombre y prueba la URL publicada.',
        },
        {
          type: 'tip',
          tone: 'info',
          title: 'Errores 404 personalizados',
          html: 'GitHub Pages sirve <code>404.html</code> para rutas inexistentes. Incluye navegación y un enlace al inicio para que el usuario no se quede atrapado.',
        },
      ],
      quiz: {
        question: '¿Qué archivo debe existir para que GitHub Pages muestre tu página al entrar a la raíz?',
        options: ['home.html', 'main.html', 'index.html', 'default.html'],
        answer: 2,
        explanation:
          'GitHub Pages busca index.html como documento de entrada. Si no existe, muestra el contenido del repositorio o un 404, según la configuración.',
      },
    },
  ],
};
