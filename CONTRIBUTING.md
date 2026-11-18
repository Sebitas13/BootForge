# Contribuir a BootForge

Gracias por querer mejorar el curso. Este documento explica cómo preparar el entorno, añadir contenido y enviar cambios sin romper la calidad del sitio.

Al participar aceptas el [Código de Conducta](CODE_OF_CONDUCT.md). Los cambios se publican bajo la licencia MIT del proyecto.

## Antes de empezar

- Busca un [issue](https://github.com/Sebitas13/BootForge/issues) existente o abre uno para discutir el cambio.
- Para cambios grandes (un módulo nuevo, una sección completa, un rediseño), espera confirmación antes de invertir horas.
- Para errores pequeños (una tilde, un enlace, un ejemplo), abre directamente un pull request.

## Entorno local

Requisitos: Node.js 22.22+ (rama 22) o 24.8+ y npm.

```bash
git clone https://github.com/Sebitas13/BootForge.git
cd BootForge
npm ci
npm run build
npx serve .
```

Comandos útiles:

```bash
npm test          # build + HTML + enlaces
npm run build     # regenera el sitio
npm run package   # genera dist/ para Pages
```

## Estructura del contenido

Cada módulo vive en `content/modules/` y exporta un objeto:

```js
export default {
  id: 'mi-modulo',
  title: 'Mi módulo',
  description: 'Qué aprende la persona.',
  icon: 'rocket',
  lessons: [
    {
      id: 'mi-leccion',
      title: 'Mi lección',
      minutes: 5,
      level: 'Principiante',
      summary: 'Una frase que resume la lección.',
      objectives: ['Objetivo 1', 'Objetivo 2'],
      blocks: [
        { type: 'text', html: '<p>Explicación.</p>' },
        {
          type: 'code',
          title: 'Ejemplo',
          code: '<button class="btn btn-primary">Hola</button>',
          note: 'Una nota opcional.',
        },
        { type: 'tip', tone: 'tip', title: 'Consejo', html: '<p>...</p>' },
      ],
      quiz: {
        question: '¿Pregunta?',
        options: ['A', 'B', 'C', 'D'],
        answer: 1,
        explanation: 'Por qué B es correcta.',
      },
    },
  ],
};
```

Tipos de bloque disponibles: `text`, `code`, `tip`, `table`, `challenge`, `steps`, `checklist`.

### Reglas de contenido

- Español claro, inclusivo y sin relleno.
- Una lección = un objetivo concreto.
- Ejemplos ejecutables y autocontenidos; evita dependencias externas.
- No uses `style="..."` en los ejemplos: el validador lo rechaza y enseñamos buenas prácticas.
- No uses `<script>` dentro de los ejemplos salvo que sea imprescindible y esté justificado.
- Las imágenes deben ser locales, tener `alt` y dimensiones.
- Si el ejemplo necesita JavaScript, usa `previewJs` y explica qué hace.
- No copies texto de la documentación oficial; escribe con tus palabras y enlaza la fuente.

### Accesibilidad

- Un `h1` por página y jerarquía de encabezados sin saltos.
- Formularios con `label` asociada mediante `for`/`id`.
- Botones con texto visible o `aria-label`; siempre `type`.
- Contraste mínimo 4.5:1 para texto normal.
- No comuniques información solo con color.
- Respeta `prefers-reduced-motion`.

## Pull requests

Antes de enviar:

- [ ] `npm test` pasa sin errores.
- [ ] `npm run build` no deja cambios inesperados.
- [ ] Probaste la página en móvil (320–390px) y escritorio.
- [ ] El ejemplo se ejecuta y no hay errores en la consola.
- [ ] No hay enlaces rotos ni rutas absolutas.
- [ ] El cambio tiene una descripción clara y capturas si es visual.

Formato del título: `tipo: descripción breve` (`feat:`, `fix:`, `docs:`, `a11y:`, `chore:`).

## Reportar errores

Incluye página, navegador, ancho de pantalla, pasos y mensaje de consola. Si es visual, una captura ayuda. No incluyas datos personales.

## Seguridad

No reportes vulnerabilidades en issues públicos. Sigue [SECURITY.md](SECURITY.md).
