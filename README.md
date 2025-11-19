# BootForge — Tutorial interactivo de Bootstrap 5

**BootForge** (aka *Bootstrap 5 Tutorial*) es un proyecto educativo, open-source y práctico que reúne lecciones, ejemplos interactivos y herramientas para aprender y aplicar Bootstrap 5 en proyectos reales.

---

## Tabla de contenidos
- [Demo](#demo)
- [Características](#características)
- [Estado](#estado)
- [Instalación y ejecución local](#instalación-y-ejecución-local)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Cómo contribuir](#cómo-contribuir)
- [Guía rápida para profesores / instructores](#guía-rápida-para-profesores--instructores)
- [Internacionalización (i18n)](#internacionalización-i18n)
- [Editor en vivo — especificaciones técnicas](#editor-en-vivo---especificaciones-técnicas)
- [Seguridad y sandboxing](#seguridad-y-sandboxing)
- [Deploy en GitHub Pages (rápido)](#deploy-en-github-pages-rápido)
- [Tests y Calidad](#tests-y-calidad)
- [Licencia](#licencia)
- [Créditos y contacto](#créditos-y-contacto)
- [Changelog / Releases](#changelog--releases)

---

## Demo
*(Inserta la URL de tu GitHub Pages o el demo aquí — por ejemplo `https://Sebitas13.github.io/bootforge/`)*

---

## Características principales
- Lecciones organizadas por módulos: Containers, Grid, Typography, Colors, Components (Buttons, Cards, Modals, Tooltips...), Utilities y más.
- Playground con editor en vivo (Try it), copiar/pegar, y vista previa.
- Linting en tiempo real (configurable) y botón `Fix` con Prettier/ESLint.
- TOC/Sidebar con progreso por secciones (persistente en localStorage).
- Botón one-click para crear un repo en tu GitHub y guiar al alumno a publicar en GitHub Pages.
- Arquitectura pensada para i18n (traducciones automáticas + post-edición).
- Accesibilidad: checks con axe-core y recomendaciones integradas.
- Buenas prácticas de performance y checklist (optimización de imágenes, critical CSS, lazy-load).
- Plantillas de ejercicios, quiz y auto-grader (extensible).

---

## Estado
- **Versión:** 1.0 (release inicial)
- **Visibilidad:** pública
- **Notas:** Proyecto listo para iteración. Muchas features funcionales en frontend; backend (sandbox/LSP/orquestador) opcional por ahora.

---

## Instalación y ejecución local (desarrollador)

**Requisitos**
- Node.js >= 16 (si vas a usar herramientas de build / dev server)
- Git

**Clonar el repo**
```bash
git clone https://github.com/Sebitas13/bootforge.git

cd bootforge

<p align="center">
  <a href="https://sebitas13.github.io/BootForge/" target="_blank">
    <img src="https://img.shields.io/badge/🚀 Ver%20Sitio%20Web-BootForge-blueviolet?style=for-the-badge" alt="Ver BootForge">
  </a>
</p>

