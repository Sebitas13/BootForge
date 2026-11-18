# Changelog

Todos los cambios relevantes se documentan aquí. El formato sigue [Keep a Changelog](https://keepachangelog.com/es/1.1.0/) y el proyecto usa [Versionado Semántico](https://semver.org/lang/es/).

## [2.0.0] — 2026-11-18

Reescritura completa del proyecto para convertirlo en un curso de portafolio mantenible.

### Añadido

- 9 módulos y 24 lecciones con objetivos, ejemplos ejecutables y mini quiz.
- Landing page real, página de curso y 24 páginas de lección estáticas.
- Generador propio en Node (`tools/build.mjs`) sin dependencias en runtime.
- Playground con HTML, CSS y JS, 6 plantillas, consola y descarga standalone.
- Cheatsheet con 69 clases, búsqueda, filtros y copia al portapapeles.
- Quiz final de 12 preguntas con explicaciones, revisión y mejor puntaje.
- Guía de publicación en GitHub Pages.
- Buscador global con `Ctrl/Cmd + K` e índice JSON generado.
- Progreso persistente, borradores del editor y botón de continuación.
- Modo claro/oscuro con preferencia guardada.
- Página 404, sitemap, robots, manifest y metadatos Open Graph.
- Workflows de CI y despliegue en GitHub Pages.
- `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md` y este changelog.
- Validación HTML, chequeo de enlaces/ids/labels y empaquetado `dist/`.

### Cambiado

- Bootstrap actualizado a **5.3.9** y servido localmente.
- Todos los assets pesados y duplicados fueron retirados del repositorio.
- El sitio ya no depende de `script1.js` ni de un CRUD de estudiantes.
- La tabla de ejemplo y los formularios ya no se corrompen ni recargan la página.
- Las rutas son relativas y respetan mayúsculas/minúsculas de GitHub Pages.
- El editor usa un iframe con `sandbox="allow-scripts allow-forms"` y consola por `postMessage`.
- Diseño responsive probado a 320px, 390px, 768px, 1000px y 1440px.

### Corregido

- Enlaces internos rotos, páginas vacías y navegación duplicada.
- Contraste de títulos de código y badges de reto.
- Skip link enfocable, landmarks únicos, labels y jerarquía de encabezados.
- Respuesta correcta del quiz y persistencia del mejor puntaje.
- Rutas de imágenes y placeholder del avatar.
- `localStorage` compartido entre páginas y progreso engañoso.

### Seguridad

- Eliminado `allow-same-origin` de todos los iframes.
- Sin CDNs, sin scripts de terceros y sin analytics.
- Validación de `event.source` y token en la consola del preview.
- Permisos mínimos en GitHub Actions.

## [1.0.0] — 2025

- Versión inicial del tutorial de Bootstrap 5 con página principal, lecciones de componentes y un editor básico.
- Publicación inicial en GitHub Pages.

[2.0.0]: https://github.com/Sebitas13/BootForge/compare/v1.0.0...v2.0.0
