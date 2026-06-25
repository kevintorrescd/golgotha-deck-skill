# Golgotha Academy Deck System

Sistema agnóstico para crear presentaciones de Golgotha Academy. Define narrativa, diseño visual, layouts, reglas de contenido, assets de marca y criterios de calidad sin imponer una herramienta ni un formato de producción específico.

## Cuándo usar

- Presentaciones educativas, cursos, lecciones, módulos o talleres de Golgotha Academy.
- Presentaciones institucionales, propuestas, reportes o materiales de marca.
- Cualquier deck que deba sentirse claro, moderno, sobrio, accesible y alineado con la identidad visual de Golgotha Academy.

## Principio central

La skill produce una **presentación Golgotha**, no un formato específico. Usa el formato que el entorno permita: PPTX, documento editable, lienzo de diseño, HTML de referencia u otro soporte equivalente. El archivo `assets/template.html` existe como representación opcional del sistema visual, útil para inspeccionar o reutilizar patrones, pero no es una obligación.

La estética esperada es pulida, amplia y audiovisual: fondos claros limpios, fondos oscuros profundos, fondos verdes vivos con grilla sutil, bloques grandes para imagen/presentador y logo real en positivo o negativo. No uses líneas decorativas debajo de títulos ni barras verdes como adorno recurrente.

## Flujo de trabajo de inicio a entrega

1. **Preparar el sistema visual**
   - Lee `references/brand-assets.md` y `DESIGN.md`.
   - Haz inventario de `assets/brand/` y `assets/backgrounds/`.
   - Decide que variantes de logo, fondo y placeholder requiere cada tipo de slide.
   - No empieces a disenar slides sin saber que assets reales vas a usar.

2. **Elegir motor de produccion**
   - Lee `references/production-engines.md`.
   - Identifica si la entrega se producira con `pptxgenjs`, `python-pptx`, HTML de referencia u otra herramienta.
   - Ajusta assets, graficos y transiciones a las capacidades reales del motor elegido.
   - Define la intencion de movimiento antes de implementar: por defecto `fade`; usa `push` o `morph` solo si ayuda a la narrativa.

3. **Leer la entrada**
   - Puede ser un documento fuente, brief, notas, temario, guion, investigacion o contenido estructurado.
   - Identifica objetivo, audiencia, contexto, tono, duracion esperada y entrega final.
   - Marca datos, citas, nombres propios, restricciones y material faltante.

4. **Extraer narrativa**
   - Define tesis central en una frase.
   - Agrupa el contenido en secciones.
   - Conserva datos, citas, referencias y matices importantes.
   - No inventes metricas, fuentes, citas, resultados ni claims.

5. **Disenar la estructura**
   - Asigna una idea principal por slide.
   - Elige layouts desde `references/layouts.md` segun el tipo de contenido.
   - Usa `references/source-to-deck.md` para convertir documentos largos en una secuencia clara.
   - Define para cada slide: titulo-conclusion, cuerpo, visual, asset de fondo, logo y nota de fuente.

6. **Mapear assets antes de producir**
   - Para fondos claros con grilla usa `assets/backgrounds/grid-light.png`.
   - Para portadas, secciones verdes o cierres usa `assets/backgrounds/grid-green.png`.
   - Para citas, preguntas grandes o pausas oscuras usa `assets/backgrounds/grid-dark.png`.
   - Para imagen pendiente usa `assets/backgrounds/media-placeholder.png`.
   - Para presentador pendiente usa `assets/backgrounds/presenter-placeholder.png`.
   - Para logo en fondo claro usa `assets/brand/logo-lockup-light.png`.
   - Para logo en fondo verde, oscuro o imagen oscura usa `assets/brand/logo-lockup-white.png`.

7. **Producir el deck**
   - Usa el formato que el entorno permita: PPTX, documento editable, lienzo de diseno, HTML de referencia u otro soporte equivalente.
   - Si usas la plantilla HTML opcional, parte de `assets/template.html` y conserva sus rutas a `assets/brand/` y `assets/backgrounds/`.
   - Si usas otro formato, inserta los PNG como imagenes reales; no los reconstruyas con formas, filtros o patrones.
   - Sigue `DESIGN.md` para marca, color, tipografia, composicion, ritmo y jerarquia.
   - Predominan fondos claros, con contrapuntos verdes vivos u oscuros.
   - Usa los logos PNG transparentes de `assets/brand/` y los fondos PNG de `assets/backgrounds/` por defecto.
   - Solo recrea una superficie si el formato final no permite insertar imagenes externas; en ese caso replica color, grilla y proporcion desde los PNG existentes.
   - Manten el contenido legible aunque no haya animaciones.

8. **Comparar contra ejemplos y layouts**
   - Usa `references/layouts.md` como catalogo principal de estructuras.
   - Usa `examples/educational-synthetic.html`, `examples/institutional-synthetic.html` y `examples/charts-explanatory.html` como galeria minima de referencia visual, no como limite de casos.
   - Si el deck no encaja con ningun ejemplo, conserva las reglas de assets, jerarquia y QA antes que improvisar decoracion.

9. **Validar antes de entregar**
   - Ejecuta `node scripts/verify-presentation.js <archivo-final> --out <carpeta-qa>` cuando exista un archivo final verificable.
   - Si el formato final no se puede inspeccionar automaticamente, sigue `references/delivery-qa.md` y revisa renders o imagenes de cada slide.
   - Corrige cualquier error P0 y vuelve a verificar antes de entregar.
   - Usa `references/checklist.md` para revisar la presentacion.
   - Si usas la plantilla HTML opcional, ejecuta `node scripts/validate-package.js` para auditar la consistencia del paquete.

10. **Cerrar entrega**
   - Entrega el archivo final y, si aplica, carpeta de QA o renders.
   - Menciona cualquier dato, imagen o fuente que haya quedado pendiente.
   - No entregues si hay logos reconstruidos, fondos omitidos, SVG de marca/fondo en entregables, placeholders accidentales, texto desbordado o superposicion visible.

## Reglas de contenido

- Cada slide comunica una sola idea.
- El título debe revelar la conclusión, no solo nombrar el tema.
- Los datos deben estar presentes en la fuente o marcados como faltantes con `—`.
- Las citas deben conservar atribución.
- Los placeholders deben ser honestos: imagen pendiente, dato pendiente, fuente pendiente.
- Evita relleno genérico, lorem ipsum, frases vagas y métricas de marketing sin evidencia.
- No recrees el logo manualmente; usa las versiones PNG transparentes incluidas en `assets/brand/`.
- No recrees fondos con gradientes o grillas nuevas si existe un PNG equivalente en `assets/backgrounds/`.
- No encierres texto, graficos o pasos en contenedores por defecto; usa contenedores solo para tablas, media, placeholders o elementos que deban resaltarse.
- No agregues subrayados, líneas decorativas o barras de acento bajo los títulos.

## Archivos de la skill

- `DESIGN.md` — sistema visual canónico y reglas universales de presentación.
- `references/source-to-deck.md` — método para convertir documentos fuente en decks.
- `references/brand-assets.md` — guía de logos, fondos, placeholders y tokens reutilizables.
- `references/production-engines.md` - guia para elegir `pptxgenjs`, `python-pptx`, HTML u otro motor antes de producir.
- `references/delivery-qa.md` — compuerta final de QA antes de entregar una presentacion.
- `references/layouts.md` — catálogo de layouts con estructura conceptual y ejemplos opcionales.
- `references/checklist.md` — auditoría universal y validación opcional de HTML.
- `assets/template.html` — plantilla opcional de referencia visual.
- `assets/logo.png` — símbolo base en PNG transparente.
- `assets/brand/` — versiones PNG transparentes del logo en positivo, negativo, color, negro y gris.
- `assets/backgrounds/` — grillas, placeholders y superficies reutilizables en PNG.
- `assets/tokens.css` — tokens CSS reutilizables.
- `examples/` - galerias sinteticas con casos educativos, institucionales y graficos explicativos para validar variedad visual.
- `scripts/validate-package.js` — validador local sin dependencias para consistencia del paquete.
- `scripts/verify-presentation.js` — verificador previo a entrega para detectar superposicion, desbordes y otros riesgos.
- `scripts/generate-brand-assets.js` — regenera los PNG de marca y fondos desde fuentes internas.

## Entrega y QA

- `references/delivery-qa.md` define la compuerta final antes de entregar.
- `scripts/verify-presentation.js` detecta superposicion, objetos fuera del canvas, lineas decorativas, placeholders y otros riesgos cuando el formato lo permite.
- El reporte del verificador no reemplaza la revision visual: siempre inspecciona renders o previews de cada slide antes de entregar.
