import { site } from '../../content/site.mjs';
import { icon } from '../icons.mjs';
import { escapeAttr } from '../utils.mjs';
import { pageShell } from '../templates.mjs';

export function guidePage() {
  const content = `<section class="page-hero">
  <div class="container">
    <p class="eyebrow">${icon('rocket')} Publicación</p>
    <h1>Publica tu sitio en GitHub Pages</h1>
    <p class="page-lead">Del repositorio local a una URL con HTTPS. Sin servidores, sin tarjeta y sin configuración rara.</p>
  </div>
</section>

<section class="section pt-0">
  <div class="container guide-layout">
    <aside class="guide-toc" aria-label="Contenido de la guía">
      <p>En esta guía</p>
      <ul>
        <li><a href="#preparar">1. Prepara el repositorio</a></li>
        <li><a href="#activar">2. Activa Pages</a></li>
        <li><a href="#revisar">3. Revisa la URL</a></li>
        <li><a href="#errores">4. Errores clásicos</a></li>
        <li><a href="#dominio">5. Dominio propio</a></li>
        <li><a href="#checklist">6. Checklist final</a></li>
      </ul>
    </aside>

    <article class="guide-content">
      <h2 id="preparar">1. Prepara el repositorio</h2>
      <p>Necesitas una cuenta de GitHub y Git instalado. Crea un repositorio <strong>público</strong> sin README ni licencia si ya tienes esos archivos en local; así evitas el primer conflicto.</p>
      <div class="guide-code-wrap">
        <pre class="guide-code"><code>git init
git add .
git commit -m "Mi primer sitio con Bootstrap"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main</code></pre>
        <button class="guide-copy" type="button" data-copy="git init
git add .
git commit -m &quot;Mi primer sitio con Bootstrap&quot;
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main" aria-label="Copiar comandos de Git">Copiar</button>
      </div>
      <div class="callout callout-tip guide-callout">
        <span class="callout-icon">${icon('lightbulb')}</span>
        <div><p class="callout-title">Tu entrada debe ser index.html</p><div class="callout-body">GitHub Pages busca <code>index.html</code> en la raíz (o en la carpeta que configures). Si tu archivo principal tiene otro nombre, renómbralo o crea un redirect.</div></div>
      </div>

      <h2 id="activar">2. Activa GitHub Pages</h2>
      <ol class="step-list">
        <li><span class="step-number" aria-hidden="true">1</span><div class="step-content"><h3>Abre Settings → Pages</h3><p>En el repositorio, entra en <strong>Settings</strong> y busca <strong>Pages</strong> en la barra lateral.</p></div></li>
        <li><span class="step-number" aria-hidden="true">2</span><div class="step-content"><h3>Elige la fuente</h3><p>Selecciona <strong>Deploy from a branch</strong>, rama <code>main</code> y carpeta <code>/ (root)</code>. Guarda.</p></div></li>
        <li><span class="step-number" aria-hidden="true">3</span><div class="step-content"><h3>Espera el deploy</h3><p>GitHub tarda uno o dos minutos. La URL aparece en la misma pantalla: <code>https://TU-USUARIO.github.io/TU-REPO/</code>.</p></div></li>
      </ol>
      <p>Si prefieres un flujo reproducible, usa GitHub Actions con <code>actions/configure-pages</code>, <code>upload-pages-artifact</code> y <code>deploy-pages</code>. En <strong>Settings → Pages → Source</strong> elige <strong>GitHub Actions</strong>.</p>
      <div class="guide-code-wrap">
        <pre class="guide-code"><code># .nojekyll
# Desactiva el procesamiento de Jekyll. Útil si tu sitio es HTML estático.
# Crea el archivo vacío en la raíz del repositorio.</code></pre>
        <button class="guide-copy" type="button" data-copy=".nojekyll" aria-label="Copiar nombre del archivo">Copiar</button>
      </div>

      <h2 id="revisar">3. Revisa la URL publicada</h2>
      <p>No basta con que la página de inicio cargue. Abre la consola del navegador y revisa:</p>
      <ul class="guide-checklist">
        <li>${icon('check')} <span>No hay errores 404 de CSS, JS, imágenes o fuentes.</span></li>
        <li>${icon('check')} <span>Los enlaces internos funcionan y respetan mayúsculas y minúsculas.</span></li>
        <li>${icon('check')} <span>El sitio se ve bien en móvil y en escritorio.</span></li>
        <li>${icon('check')} <span>La consola no muestra errores de JavaScript.</span></li>
        <li>${icon('check')} <span>El favicon y los metadatos sociales cargan correctamente.</span></li>
      </ul>

      <h2 id="errores">4. Errores clásicos (y cómo evitarlos)</h2>
      <div class="table-responsive lesson-table">
        <table class="table table-bordered align-middle">
          <caption>Problemas frecuentes al publicar en GitHub Pages</caption>
          <thead><tr><th scope="col">Síntoma</th><th scope="col">Causa probable</th><th scope="col">Solución</th></tr></thead>
          <tbody>
            <tr><td>La página se ve sin estilos</td><td>Ruta con mayúsculas distintas o ruta absoluta <code>/assets/...</code></td><td>Usa rutas relativas y copia el nombre exacto de la carpeta.</td></tr>
            <tr><td>404 al entrar a una ruta</td><td>No existe el archivo o el enlace tiene un error</td><td>Revisa el enlace y añade un <code>404.html</code> en la raíz.</td></tr>
            <tr><td>El sitio tarda en actualizarse</td><td>Caché del navegador o deploy en cola</td><td>Espera un minuto, recarga con <kbd>Ctrl</kbd> + <kbd>F5</kbd> y revisa Actions.</td></tr>
            <tr><td>La página principal no aparece</td><td>Falta <code>index.html</code> o está en otra carpeta</td><td>Colócalo en la raíz o ajusta la carpeta de publicación.</td></tr>
            <tr><td>Enlaces a <code>localhost</code></td><td>Quedaron URLs de desarrollo</td><td>Busca <code>localhost</code> y <code>127.0.0.1</code> antes de publicar.</td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="dominio">5. Dominio propio (opcional)</h2>
      <p>Si tienes un dominio, puedes apuntarlo a GitHub Pages. Añade un archivo <code>CNAME</code> en la raíz con tu dominio y configura los registros DNS que indica GitHub. Después activa <strong>Enforce HTTPS</strong>.</p>
      <div class="callout callout-warning guide-callout">
        <span class="callout-icon">${icon('warning')}</span>
        <div><p class="callout-title">El CNAME no es magia</p><div class="callout-body">Si cambias el dominio, actualiza también las URLs canónicas, el sitemap y las etiquetas Open Graph. Un dominio mal configurado puede dejar el sitio inaccesible durante horas.</div></div>
      </div>

      <h2 id="checklist">6. Checklist final</h2>
      <ul class="guide-checklist">
        <li>${icon('check')} <span><code>index.html</code> existe en la raíz y tiene un <code>title</code> único.</span></li>
        <li>${icon('check')} <span>No hay enlaces rotos ni recursos 404 en la consola.</span></li>
        <li>${icon('check')} <span>El sitio funciona a 360px, 768px y 1440px.</span></li>
        <li>${icon('check')} <span>Puedes navegar con Tab y el foco siempre es visible.</span></li>
        <li>${icon('check')} <span>Las imágenes tienen <code>alt</code> y dimensiones declaradas.</span></li>
        <li>${icon('check')} <span>El repositorio tiene README, licencia y descripción.</span></li>
        <li>${icon('check')} <span>HTTPS está activo y no hay contenido mixto.</span></li>
        <li>${icon('check')} <span>Probaste la URL publicada en un dispositivo real.</span></li>
      </ul>

      <div class="callout callout-info guide-callout">
        <span class="callout-icon">${icon('info')}</span>
        <div><p class="callout-title">Este sitio es un ejemplo real</p><div class="callout-body">BootForge se publica en <a href="${site.url}">${site.url}</a> con GitHub Actions. El repositorio incluye el workflow, el <code>404.html</code> y un chequeo de enlaces en CI. Puedes copiar el patrón.</div></div>
      </div>
    </article>
  </div>
</section>`;

  return pageShell({
    title: 'Publica tu sitio en GitHub Pages — BootForge',
    description:
      'Guía paso a paso para publicar un sitio estático con Bootstrap en GitHub Pages: repositorio, configuración, errores clásicos y checklist final.',
    canonical: `${site.url}github-pages.html`,
    active: 'guia',
    content,
    mainClass: 'guide-page',
  });
}
