# Golgotha Academy - Delivery QA

Compuerta final para revisar una presentacion antes de entregarla. No depende de un formato unico: usa chequeos automaticos cuando el archivo lo permite y revision visual cuando no.

## Regla de entrega

No entregar una presentacion con errores P0 abiertos. Si el verificador o la revision visual encuentra superposicion, recorte, texto ilegible, placeholders no intencionales o logos mal usados, corrige y vuelve a revisar.

## Flujo recomendado

1. Exporta o guarda la presentacion final en el formato de entrega.
2. Ejecuta el verificador automatico cuando el formato lo permita:

```bash
node scripts/verify-presentation.js outputs/deck.pptx --out outputs/qa/deck
```

Para generar montaje y previews cuando el entorno lo soporte:

```bash
node scripts/verify-presentation.js outputs/deck.pptx --out outputs/qa/deck --render
```

3. Abre el montaje, previews o renders disponibles en `outputs/qa/deck`.
4. Revisa cada slide a tamano completo.
5. Corrige hallazgos P0 y vuelve a ejecutar el verificador.
6. Entrega solo cuando el reporte indique cero errores y la revision visual sea limpia.

## Que detecta el verificador

- Objetos fuera del canvas.
- Superposicion probable entre textos, imagenes, tablas o graficos.
- Formas delgadas que parecen lineas decorativas bajo titulos.
- Texto de relleno.
- Placeholders pendientes.
- Posibles logos reconstruidos como texto cuando deberian usarse assets reales.
- Problemas basicos de plantilla HTML cuando se usa la representacion opcional.

## Revision visual obligatoria

El reporte automatico ayuda, pero no reemplaza el ojo final. Revisa:

- Titulo, subtitulo y notas no se pisan.
- Ningun texto se corta al borde del slide.
- Las imagenes estan bien recortadas y no tapan contenido.
- El logo se ve nitido y corresponde a la version correcta: color, blanco, negro o gris.
- No hay lineas decorativas, subrayados o barras de acento bajo titulos.
- Los graficos conservan labels, unidades, fuente y contraste.
- Las fuentes o notas estan cerca del dato que respaldan.
- La composicion respira y tiene un foco visual claro.

## Si el formato no puede inspeccionarse automaticamente

Renderiza o exporta la presentacion a imagenes por slide y aplica esta misma revision. Documenta que la verificacion fue visual/manual y no automatica.

## Resultado esperado

La carpeta de QA debe contener, cuando el formato lo permita:

- `report.json`: hallazgos estructurados.
- `inspect.ndjson`: inspeccion del archivo.
- `montage.webp`: vista general del deck, si se uso `--render`.
- `slides/`: previews y layouts por slide, si se uso `--render`.
