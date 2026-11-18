# Seguridad

## Versiones soportadas

La rama `main` recibe correcciones de seguridad. Las versiones anteriores del tutorial no se mantienen.

| Versión | Soporte |
|---|---|
| 2.x | Sí |
| 1.x | No |

## Reportar una vulnerabilidad

**No abras un issue público para una vulnerabilidad de seguridad.**

Usa el [reporte privado de vulnerabilidades de GitHub](https://github.com/Sebitas13/BootForge/security/advisories/new). Incluye, si puedes:

- Descripción del problema y su impacto.
- Página o archivo afectado.
- Pasos para reproducirlo en local.
- Navegador, sistema operativo y versión.
- Una prueba de concepto mínima, sin datos personales ni ataques a terceros.

El reporte privado es el canal preferido. Si GitHub no está disponible, abre un issue **sin detalles sensibles** pidiendo un canal alternativo.

## Alcance

Este proyecto es un sitio estático. El alcance incluye:

- El HTML, CSS y JavaScript publicados en `https://sebitas13.github.io/BootForge/`.
- El generador de contenido y los scripts de `tools/`.
- El sandbox del editor y del playground.
- Los workflows de GitHub Actions del repositorio.

Quedan fuera de alcance:

- La infraestructura de GitHub, GitHub Pages o sus CDN.
- Ataques de denegación de servicio.
- Ingeniería social contra mantenedores o colaboradores.
- Pruebas contra cuentas, repositorios o datos de terceros.
- Contenido de sitios externos enlazados desde el curso.

No se ofrece recompensa económica. Sí se reconoce públicamente la contribución si la persona lo desea y la corrección se publica.

## Modelo de seguridad

- El código del usuario se ejecuta en un `<iframe>` con `sandbox="allow-scripts allow-forms"` y **sin** `allow-same-origin`. `allow-forms` permite probar formularios de ejemplo sin acceso al documento padre.
- El playground no usa `eval` ni `new Function` en el documento padre.
- La consola del preview usa `postMessage` con un token aleatorio; el padre valida el token y `event.source`. Como el iframe sandbox tiene un origen opaco (`null`), la comprobación se apoya en la referencia de `source` y el token, no en `event.origin`.
- Bootstrap, CSS y JavaScript se sirven localmente. No hay CDN, fuentes externas ni scripts de terceros.
- No hay backend, cookies, analytics, cuentas ni almacenamiento de datos en servidores.
- El progreso y los borradores viven en `localStorage`.
- Los enlaces externos usan `rel="noopener noreferrer"`.
- Los workflows usan permisos mínimos (`contents: read`, `pages: write`, `id-token: write`).

## Limitaciones conocidas

- El código del playground puede hacer peticiones de red desde dentro del iframe. Está aislado del padre, pero no es un entorno de ejecución de confianza para secretos.
- GitHub Pages no permite configurar cabeceras HTTP personalizadas. La protección del sitio se apoya en HTML estático, sandbox y ausencia de datos sensibles.
- Un bucle infinito en el código del usuario puede bloquear el iframe de vista previa; el resto de la página sigue funcionando y el botón “Recargar” reinicia el preview.
- Los ejemplos educativos no sustituyen una auditoría de seguridad de una aplicación real.

## Buenas prácticas para contribuir

- No añadas secretos, tokens ni claves al repositorio.
- No introduzcas `innerHTML` con datos no confiables.
- No elimines el `sandbox` ni añadas `allow-same-origin`.
- No incorpores CDNs sin integridad y justificación.
- Ejecuta `npm test` antes de abrir un pull request.

Gracias por ayudar a mantener el proyecto seguro.
