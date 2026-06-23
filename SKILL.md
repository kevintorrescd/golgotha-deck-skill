# Golgotha Academy Deck System

Sistema agnóstico para crear presentaciones de Golgotha Academy. Define narrativa, diseño visual, layouts, reglas de contenido, assets de marca y criterios de calidad sin imponer una herramienta ni un formato de producción específico.

## Cuándo usar

- Presentaciones educativas, cursos, lecciones, módulos o talleres de Golgotha Academy.
- Presentaciones institucionales, propuestas, reportes o materiales de marca.
- Cualquier deck que deba sentirse claro, moderno, sobrio, accesible y alineado con la identidad visual de Golgotha Academy.

## Principio central

La skill produce una **presentación Golgotha**, no un formato específico. Usa el formato que el entorno permita: PPTX, documento editable, lienzo de diseño, HTML de referencia u otro soporte equivalente. El archivo `assets/template.html` existe como representación opcional del sistema visual, útil para inspeccionar o reutilizar patrones, pero no es una obligación.

La estética esperada es pulida, amplia y audiovisual: fondos claros limpios, fondos oscuros profundos, fondos verdes vivos con grilla sutil, bloques grandes para imagen/presentador y logo real en positivo o negativo. No uses líneas decorativas debajo de títulos ni barras verdes como adorno recurrente.

## Flujo de trabajo

1. **Leer la entrada**
   - Puede ser un documento fuente, brief, notas, temario, guion, investigación o contenido estructurado.
   - Identifica objetivo, audiencia, contexto, tono, duración esperada y entrega final.

2. **Extraer narrativa**
   - Define tesis central en una frase.
   - Agrupa el contenido en secciones.
   - Conserva datos, citas, referencias y matices importantes.
   - No inventes métricas, fuentes, citas, resultados ni claims.

3. **Diseñar la estructura**
   - Asigna una idea principal por slide.
   - Elige layouts desde `references/layouts.md` según el tipo de contenido.
   - Usa `references/source-to-deck.md` para convertir documentos largos en una secuencia clara.

4. **Aplicar el sistema visual**
   - Sigue `DESIGN.md` para marca, color, tipografía, composición, ritmo y jerarquía.
   - Predominan fondos claros, con contrapuntos verdes vivos u oscuros.
   - Usa los assets de `assets/brand/` y `assets/backgrounds/` cuando el formato lo permita.
   - Mantén el contenido legible aunque no haya animaciones.

5. **Validar antes de entregar**
   - Ejecuta `node scripts/verify-presentation.js <archivo-final> --out <carpeta-qa>` cuando exista un archivo final verificable.
   - Si el formato final no se puede inspeccionar automaticamente, sigue `references/delivery-qa.md` y revisa renders o imagenes de cada slide.
   - Corrige cualquier error P0 y vuelve a verificar antes de entregar.
   - Usa `references/checklist.md` para revisar la presentación.
   - Si usas la plantilla HTML opcional, ejecuta `node scripts/validate-package.js` para auditar la consistencia del paquete.

## Reglas de contenido

- Cada slide comunica una sola idea.
- El título debe revelar la conclusión, no solo nombrar el tema.
- Los datos deben estar presentes en la fuente o marcados como faltantes con `—`.
- Las citas deben conservar atribución.
- Los placeholders deben ser honestos: imagen pendiente, dato pendiente, fuente pendiente.
- Evita relleno genérico, lorem ipsum, frases vagas y métricas de marketing sin evidencia.
- No recrees el logo manualmente; usa las versiones incluidas en `assets/brand/`.
- No agregues subrayados, líneas decorativas o barras de acento bajo los títulos.

## Archivos de la skill

- `DESIGN.md` — sistema visual canónico y reglas universales de presentación.
- `references/source-to-deck.md` — método para convertir documentos fuente en decks.
- `references/brand-assets.md` — guía de logos, fondos, placeholders y tokens reutilizables.
- `references/delivery-qa.md` — compuerta final de QA antes de entregar una presentacion.
- `references/layouts.md` — catálogo de layouts con estructura conceptual y ejemplos opcionales.
- `references/checklist.md` — auditoría universal y validación opcional de HTML.
- `assets/template.html` — plantilla opcional de referencia visual.
- `assets/logo.svg` — logo fuente de Golgotha Academy.
- `assets/brand/` — versiones del logo en positivo, negativo, color, negro y gris.
- `assets/backgrounds/` — grillas, placeholders y superficies reutilizables.
- `assets/tokens.css` — tokens CSS reutilizables.
- `examples/` — ejemplos sintéticos que muestran cómo se ve el sistema.
- `scripts/validate-package.js` — validador local sin dependencias para consistencia del paquete.
- `scripts/verify-presentation.js` — verificador previo a entrega para detectar superposicion, desbordes y otros riesgos.
- `scripts/generate-brand-assets.js` — regenera assets desde el SVG fuente del logo.

## Entrega y QA

- `references/delivery-qa.md` define la compuerta final antes de entregar.
- `scripts/verify-presentation.js` detecta superposicion, objetos fuera del canvas, lineas decorativas, placeholders y otros riesgos cuando el formato lo permite.
- El reporte del verificador no reemplaza la revision visual: siempre inspecciona renders o previews de cada slide antes de entregar.
