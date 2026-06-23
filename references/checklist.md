# Golgotha Academy — Checklist

## P0 — Universal, debe pasar antes de entregar

- [ ] La presentación tiene una tesis central clara y una audiencia definida.
- [ ] Cada slide comunica una sola idea principal.
- [ ] Ningún slide depende de animaciones, hover, audio o video para entenderse.
- [ ] Predominan fondos claros (~60–70 %) y los fondos verdes/oscuros funcionan como contraste intencional.
- [ ] El verde se ve vivo e institucional, no opaco, oliva o apagado.
- [ ] El logo sale de `assets/brand/`; no fue reconstruido manualmente ni invertido con filtros.
- [ ] El logo se muestra correctamente en fondos claros, verdes, oscuros y sobre imagen.
- [ ] No hay líneas decorativas, subrayados o barras verdes debajo de títulos.
- [ ] El verde de acento se usa máximo dos veces por slide.
- [ ] No hay métricas inventadas; los datos están citados o marcados como faltantes con `—`.
- [ ] No hay lorem ipsum, "feature one", "placeholder text" ni contenido de relleno.
- [ ] No hay emojis como iconos de características.
- [ ] No hay gradientes morados, azules brillantes o beige genérico fuera del sistema.
- [ ] Ningún texto o elemento visual desborda su slide.
- [ ] Se ejecuto `node scripts/verify-presentation.js <archivo-final> --out <carpeta-qa>` si el formato lo permite.
- [ ] El verificador no reporta errores P0 de superposicion, desborde, lineas decorativas o placeholders no resueltos.
- [ ] Se revisaron renders, montaje o previews de cada slide antes de entregar.
- [ ] Las imágenes tienen propósito y no son placeholders externos genéricos.
- [ ] El cierre incluye síntesis o próximo paso, no una frase genérica.

## P1 — Debería pasar

- [ ] Los títulos revelan una conclusión, no solo nombran el tema.
- [ ] Los textos en mayúsculas tienen tracking amplio.
- [ ] Los títulos grandes tienen tracking ligeramente negativo.
- [ ] Los bloques de media/presentador tienen escala generosa y esquinas amplias.
- [ ] Las tarjetas, imágenes y tablas usan radios consistentes.
- [ ] Las tablas tienen máximo 4 columnas y 5 filas visibles.
- [ ] Las líneas de tiempo tienen máximo 4 pasos por slide.
- [ ] Las fuentes, citas y notas están cerca del dato correspondiente.
- [ ] La voz se siente específica de Golgotha Academy.
- [ ] La jerarquía guía la mirada a un punto obvio por slide.

## P2 — Calidad extra

- [ ] Hay un ritmo visual claro entre explicación, dato, cita, imagen y síntesis.
- [ ] El deck se puede leer como documento estático sin presentador.
- [ ] Las imágenes refuerzan el contenido, no solo decoran.
- [ ] Los ejemplos y ejercicios están conectados con el objetivo del módulo.
- [ ] Si hay presentador, su imagen tiene un bloque propio y no parece pegada como adorno.

## Validación opcional si se usa la plantilla HTML

- [ ] El framework está intacto: `.deck-shell`, `.deck-stage`, `.slide`, `.deck-counter`, `.deck-hint`, `@media print` y navegación.
- [ ] Canvas fijo de 1920 × 1080 px.
- [ ] La primera slide tiene `.active`; solo una slide está activa por defecto.
- [ ] El contador muestra el número correcto de slides.
- [ ] Navegación por teclado funciona: flechas, espacio, PgUp, PgDn, Home y End.
- [ ] `@media print` genera una página por slide.
- [ ] Las clases usadas por layouts existen en el CSS del template.
- [ ] La plantilla usa logos reales de `assets/brand/`, no filtros CSS para simular versiones.
- [ ] Ejecutar `node scripts/validate-package.js` no reporta errores P0.
