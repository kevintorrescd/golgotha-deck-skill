# Golgotha Academy — Design System for Decks

Sistema visual canónico para presentaciones de Golgotha Academy. Aplica a cualquier formato de producción: PPTX, lienzo editable, documento visual, HTML de referencia u otro soporte equivalente.

---

## 1. Propósito

Crear presentaciones educativas e institucionales con una estética pulida, moderna y clara. El sistema debe sentirse más como una pieza audiovisual/editorial cuidada que como una plantilla genérica de oficina.

---

## 2. Dirección visual

Inspiración general:

- Fondos claros muy limpios con mucho espacio en blanco.
- Fondos oscuros profundos, casi negros, con textura o grilla sutil.
- Fondos verdes vivos con grilla suave y sensación de estudio/curso.
- Bloques grandes para imagen, gráfico o presentador, con esquinas amplias.
- Composición sobria: pocos elementos, gran escala, jerarquía fuerte.
- El logo real se usa en versiones preparadas; no se reconstruye manualmente.

No usar:

- Líneas decorativas debajo de títulos.
- Barras de acento como adorno recurrente.
- Subrayados, rayas laterales o separadores verdes sin función.
- Verde apagado u oliva como color principal.
- Sombras pesadas de presentación corporativa genérica.

---

## 3. Principios universales

1. **Estructura antes que decoración** — la organización surge del espacio, escala y alineación.
2. **Respirar** — el espacio vacío es parte activa del diseño.
3. **Un acento, con intención** — el verde vivo se reserva para jerarquía, acción o estado positivo.
4. **Imagen como escena** — cuando haya foto, captura o presentador, debe tener presencia real.
5. **Movimiento no esencial** — las animaciones son decorativas; el slide debe entenderse estático.
6. **Datos reales u honestos** — no inventar métricas; usar `—` o una nota de pendiente cuando falte un dato.

---

## 4. Marca y tono

- Voz: clara, formativa, directa y humana.
- En cursos: objetivo, práctica, lectura, módulo, evidencia, reflexión.
- En presentaciones institucionales: propuesta, alcance, metodología, impacto, próximos pasos.
- Evita frases vacías si la fuente no las sostiene.
- Prefiere verbos concretos: comprender, practicar, comparar, aplicar, evaluar.

---

## 5. Tokens visuales

### 5.1 Color

| Token | Hex | Uso principal |
|---|---|---|
| `--bg` | `#F8FAFC` | Fondo claro principal |
| `--surface` | `#FFFFFF` | Paneles, tarjetas, marcos de contenido |
| `--fg` | `#111111` | Texto principal |
| `--muted` | `#4B5563` | Texto secundario, metadata |
| `--neutral` | `#F3F4F6` | Zonas de imagen, placeholders, fondos suaves |
| `--border` | `#E5E7EB` | Bordes sutiles |
| `--accent` | `#00D47E` | Verde vivo de énfasis |
| `--accent-deep` | `#059669` | Verde institucional para fondos y bloques |
| `--accent-soft` | `#ECFDF5` | Verde suave para superficies claras |
| `--dark` | `#111111` | Fondo oscuro principal |
| `--dark-soft` | `#242424` | Panel oscuro secundario |
| `--danger` | `#FF4444` | Contraste negativo o alerta, solo si la fuente lo exige |

**Reglas de color**

- El verde no debe verse opaco: usa `#00D47E` para acentos vivos y `#059669` para bases institucionales.
- En fondos claros, el texto principal va en `#111111`.
- En fondos oscuros/verdes, el texto principal va en blanco.
- El verde de acento aparece máximo dos veces por slide.
- No usar morados/azules brillantes como acento de marca.

### 5.2 Tipografía

```css
--font-display: 'Montserrat', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
--font-body:    'Inter', 'Montserrat', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
--font-mono:    'JetBrains Mono', 'IBM Plex Mono', ui-monospace, Menlo, monospace;
```

| Nivel | Tamaño guía | Peso | Uso |
|---|---:|---:|---|
| Display | 84–112 px | 800 | Portadas, cierres, frases de impacto |
| H1 | 56–72 px | 700–800 | Títulos principales |
| H2 | 40–48 px | 700 | Subtítulos y secciones |
| H3 | 28–32 px | 700 | Tarjetas, pasos, módulos |
| Body grande | 28–32 px | 400–500 | Bajadas y contexto |
| Body | 22–24 px | 400 | Texto de apoyo |
| Caption | 12–14 px | 500 | Fuentes, metadatos, folios |

**Reglas tipográficas**

- Montserrat domina títulos y portadas.
- Inter puede usarse para cuerpo, tablas, captions e interfaces.
- El cuerpo nunca usa tracking negativo.
- Kicker y caption usan mayúsculas espaciadas.
- Texto de cuerpo: máximo 56–65 caracteres por línea.

### 5.3 Espaciado y forma

- Unidad base: 8 px.
- Márgenes amplios; no llenar la diapositiva hasta el borde.
- Separación entre bloques: 32, 48, 64 o 80 px.
- Bloques de imagen/presentador: radio 44–64 px.
- Paneles de contenido: radio 20–32 px.
- Evitar contornos innecesarios; usar borde solo si mejora separación.

---

## 6. Logo y versiones

Usar los PNG transparentes incluidos en `assets/brand/`. No recrear el logo con texto suelto, no dibujar el símbolo desde cero y no incrustar SVG de logo en entregables.

| Uso | Asset recomendado |
|---|---|
| Fondo claro | `assets/brand/logo-lockup-light.png` |
| Fondo oscuro o verde | `assets/brand/logo-lockup-white.png` |
| Pieza monocroma negra | `assets/brand/logo-lockup-black.png` |
| Pieza de baja jerarquía o grayscale | `assets/brand/logo-lockup-gray.png` |
| Solo símbolo en verde | `assets/brand/logo-mark-green.png` |
| Solo símbolo en blanco | `assets/brand/logo-mark-white.png` |
| Solo símbolo en negro | `assets/brand/logo-mark-black.png` |
| Solo símbolo en gris | `assets/brand/logo-mark-gray.png` |

**Reglas**

- El logo vive en esquina superior o centro de cierre.
- No aplicar filtros CSS para invertir el logo si existe una versión correcta.
- No poner el logo sobre fondos sin contraste.
- En fondos con imagen, usar versión blanca con sombra muy sutil o moverlo a una zona limpia.

---

## 7. Fondos y assets reutilizables

Usar los PNG de `assets/backgrounds/` como fuente visual predeterminada para grillas, fondos de sección y placeholders. No reconstruir estas superficies con gradientes, patrones CSS o formas manuales salvo que el formato final no pueda insertar imágenes.

| Asset | Uso |
|---|---|
| `assets/backgrounds/grid-light.png` | Fondos claros con textura apenas visible |
| `assets/backgrounds/grid-green.png` | Portadas, cierres, secciones verdes |
| `assets/backgrounds/grid-dark.png` | Citas, grandes preguntas, pausas oscuras |
| `assets/backgrounds/presenter-placeholder.png` | Reserva de espacio para imagen del presentador |
| `assets/backgrounds/media-placeholder.png` | Reserva de espacio para gráfico, captura o imagen |
| `assets/tokens.css` | Tokens CSS reutilizables |

Los fondos con grilla son textura, no contenido. Deben ser sutiles y nunca competir con texto, datos o imagen. Si una herramienta requiere reconstruirlos, copiar proporción 16:9, color base y densidad de grilla desde el PNG correspondiente.

---

## 8. Ritmo de fondos

- Aproximadamente 60–70 % de las diapositivas deben ser claras.
- Usa verde para portada de sección, síntesis o cierre optimista.
- Usa oscuro para pregunta grande, cita o contraste.
- Nunca más de dos slides seguidas con el mismo fondo.
- Alterna densidad: texto amplio → dato/visual → síntesis → práctica.

---

## 9. Layout y composición

- Una idea principal por slide.
- Un punto focal claro: título, dato, cita, imagen o diagrama.
- Las tarjetas solo se usan para elementos realmente comparables.
- Evita contenedores dentro de contenedores. Usa espacio, alineacion, escala y acentos laterales antes que tarjetas para cada bloque.
- Usa paneles o tarjetas solo cuando resalten algo especifico: tabla, media, placeholder, metrica aislada o conjunto comparable.
- Las tablas no deben superar 4 columnas ni 5 filas visibles.
- Las líneas de tiempo no deben superar 4 pasos por slide.
- Las galerías funcionan mejor con 2–4 imágenes.
- Los gráficos deben mostrar fuente o nota de procedencia.
- Los gráficos deben respirar en el canvas; no encierres el gráfico y el texto explicativo en tarjetas o paneles si la composición ya los separa con espacio, escala y alineación.
- Los bloques de presentador o media deben tener escala generosa y esquinas amplias.

---

## 10. Componentes universales

- **Hero claro**: texto grande en la izquierda, logo discreto, mucho aire.
- **Hero oscuro**: frase grande centrada o lateral con grilla oscura.
- **Hero verde**: fondo verde vivo con grilla, logo negativo, frase breve.
- **Media + presentador**: gráfico/captura grande + bloque de presentador.
- **Dato principal**: cifra grande con soporte mínimo y fuente.
- **Tarjetas editoriales**: 3 elementos, sin iconos decorativos.
- **Tabla compacta**: comparación breve y legible.
- **Código / terminal**: superficie oscura con mono, sin exceso de chrome.
- **Cierre**: síntesis y próximo paso.

---

## 11. Datos, citas y fuentes

- Nunca inventes datos.
- Si un dato falta, usa `—` o "dato pendiente".
- Si una cita viene del documento fuente, conserva texto y autor.
- Si una cita no tiene autor, marca "fuente no especificada".
- No conviertas opiniones en cifras.
- No exageres claims institucionales sin evidencia.

---

## 12. Reglas opcionales para representación HTML

Estas reglas aplican solo si se usa `assets/template.html` como referencia visual o fuente editable.

- Canvas fijo: 1920 × 1080 px.
- La estructura `.deck-shell`, `.deck-stage`, `.slide`, `.deck-counter`, `.deck-hint`, `@media print` y el script de navegación no debe romperse.
- La primera slide usa `.active`; las demás no.
- Los fondos usan `.s-white`, `.s-green` o `.s-dark` junto con las imágenes PNG de `assets/backgrounds/`.
- Usar los logos PNG de `assets/brand/`; no aplicar filtros para simular versiones.
- Las animaciones son decorativas.
- El contenido debe ser legible si todas las animaciones se desactivan.

---

## 13. Anti-patterns

- Líneas decorativas bajo títulos.
- Barras verdes usadas como separador automático.
- Logos invertidos con filtros cuando existe una versión real.
- Verde opaco, oliva o apagado como color principal.
- Presentaciones dominadas por tarjetas pequeñas.
- Gradientes decorativos sin propósito.
- Emojis como iconos de características.
- Lorem ipsum, "feature one", "sample content" o relleno similar.
- Más de dos usos visibles del verde de acento por slide.
- Métricas inventadas o sin fuente.
- Slides que dependen de hover, audio, video o animación para entenderse.
