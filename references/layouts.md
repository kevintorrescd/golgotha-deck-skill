# Golgotha Academy — Layouts

Catálogo de layouts para presentaciones Golgotha. Cada patrón describe intención, uso y estructura. Los ejemplos HTML son opcionales y sirven solo como representación visual si el entorno usa `assets/template.html`.

## Reglas generales

- Elige layout por función narrativa, no por decoración.
- Cada slide debe tener una idea principal.
- Usa fondos claros como base y alterna con verde vivo u oscuro.
- Usa logos reales de `assets/brand/`.
- No uses líneas decorativas bajo títulos ni barras verdes como separador.
- Si el formato final no es HTML, replica la estructura visual equivalente.

---

## 01 — Hero claro

**Concepto:** apertura limpia con mucho aire.

**Uso recomendado:** inicio de curso, módulo, propuesta o reporte.

**Estructura:** logo positivo, kicker, título principal, subtítulo breve.

```html
<section class="slide s-white active" data-screen-label="01 Hero claro">
  <div class="frame grid-bg-light">
    <img class="brand-mark left" src="brand/logo-lockup-light.png" alt="Golgotha Academy" />
    <div class="cover-content">
      <p class="kicker a-rise delay-1">Módulo 01</p>
      <h1 class="display a-rise delay-2">Título principal</h1>
      <p class="body-lg a-fade delay-3" style="margin-top:32px;">Subtítulo o promesa de aprendizaje.</p>
    </div>
  </div>
</section>
```

## 02 — Dos columnas editorial

**Concepto:** explicación + evidencia visual generosa.

**Uso recomendado:** concepto, captura, diagrama, caso o ejemplo.

**Estructura:** texto a un lado, bloque visual grande al otro.

```html
<section class="slide s-white" data-screen-label="02 Dos columnas">
  <div class="frame">
    <img class="brand-mark right" src="brand/logo-lockup-light.png" alt="Golgotha Academy" />
    <div class="col-2-wide" style="height:100%;">
      <div>
        <p class="kicker a-rise">Concepto</p>
        <h2 class="h1 a-rise delay-1">Idea principal del slide</h2>
        <p class="body a-fade delay-3" style="margin-top:32px;">Explicación breve en máximo dos frases.</p>
      </div>
      <div class="media-frame a-scale delay-3" style="height:560px;">
        <img src="backgrounds/media-placeholder.png" alt="Espacio para recurso visual" />
      </div>
    </div>
  </div>
</section>
```

## 03 — Media + presentador

**Concepto:** recurso principal acompañado por imagen del presentador.

**Uso recomendado:** clases, explicaciones con gráfico, captura, foto o demo.

**Estructura:** media grande, presentador en bloque redondeado, logo negativo o positivo según fondo.

```html
<section class="slide s-green grid-bg-green" data-screen-label="03 Media y presentador">
  <div class="frame">
    <img class="brand-mark right" src="brand/logo-lockup-white.png" alt="Golgotha Academy" />
    <div class="col-2-wide" style="height:100%;">
      <div class="media-frame a-scale" style="height:560px;">
        <img src="backgrounds/media-placeholder.png" alt="Espacio para recurso visual" />
      </div>
      <div class="media-frame a-scale delay-1" style="height:560px;">
        <img src="backgrounds/presenter-placeholder.png" alt="Espacio para imagen del presentador" />
      </div>
    </div>
  </div>
</section>
```

## 04 — Hero verde

**Concepto:** síntesis o transición con energía.

**Uso recomendado:** cierre de sección, promesa de aprendizaje, siguiente lección o conclusión positiva.

**Estructura:** fondo verde vivo con grilla, logo negativo, frase breve centrada.

```html
<section class="slide s-green grid-bg-green" data-screen-label="04 Hero verde">
  <div class="frame" style="display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center;">
    <img class="brand-mark right" src="brand/logo-lockup-white.png" alt="Golgotha Academy" />
    <p class="kicker a-rise">Nueva lección</p>
    <h2 class="display display-sm a-rise delay-1" style="max-width:16ch;">Construimos la próxima generación de aprendizaje</h2>
    <p class="body-lg a-fade delay-3" style="margin-top:40px; color:rgba(255,255,255,0.84); max-width:36ch;">Contexto breve.</p>
  </div>
</section>
```

## 05 — Hero oscuro

**Concepto:** pregunta, afirmación o pausa de alto contraste.

**Uso recomendado:** grandes preguntas, citas, afirmaciones de impacto o cambio de capítulo.

**Estructura:** fondo oscuro con grilla, logo negativo, texto grande.

```html
<section class="slide s-dark grid-bg-dark" data-screen-label="05 Hero oscuro">
  <div class="frame" style="display:flex; flex-direction:column; justify-content:center;">
    <img class="brand-mark right" src="brand/logo-lockup-white.png" alt="Golgotha Academy" />
    <p class="kicker a-rise">Pregunta guía</p>
    <h2 class="display display-sm a-rise delay-1" style="max-width:15ch;">La frase central de la sección</h2>
  </div>
</section>
```

## 06 — Dato principal

**Concepto:** una cifra dominante con contexto.

**Uso recomendado:** indicador clave, resultado, avance, diagnóstico o contraste.

**Estructura:** kicker, número grande, explicación, fuente.

```html
<section class="slide s-white" data-screen-label="06 Dato">
  <div class="frame stat-content">
    <img class="brand-mark right" src="brand/logo-lockup-light.png" alt="Golgotha Academy" />
    <p class="kicker a-rise">Dato clave</p>
    <div class="stat-huge a-scale delay-1">—</div>
    <p class="body-lg a-fade delay-2" style="margin-top:24px;">Contexto del dato.</p>
    <div class="slide-footer a-fade delay-3"><span class="caption">Fuente pendiente</span><span class="caption">06</span></div>
  </div>
</section>
```

## 07 — Barras

**Concepto:** comparación cuantitativa simple.

**Uso recomendado:** progreso, resultados, distribución por categoría o contraste antes/después.

**Estructura:** título con conclusión, contexto, 3–5 barras, fuente.

```html
<section class="slide s-white" data-screen-label="07 Barras">
  <div class="frame">
    <img class="brand-mark right" src="brand/logo-lockup-light.png" alt="Golgotha Academy" />
    <p class="kicker a-rise">Datos ilustrativos</p>
    <h2 class="h1 a-rise delay-1">La tendencia principal en una frase</h2>
    <p class="body a-fade delay-2" style="margin-top:16px;">Contexto del dato y periodo.</p>
    <div class="chart a-rise delay-3" style="margin-top:40px;">
      <div class="bar-col"><div class="bar-value">—</div><div class="bar a-bar delay-1" style="height:120px;"></div><div class="bar-label">A</div></div>
      <div class="bar-col"><div class="bar-value">—</div><div class="bar a-bar delay-2" style="height:220px;"></div><div class="bar-label">B</div></div>
      <div class="bar-col"><div class="bar-value">—</div><div class="bar a-bar delay-3" style="height:300px;"></div><div class="bar-label">C</div></div>
    </div>
  </div>
</section>
```

## 08 — Tarjetas editoriales

**Concepto:** tres elementos comparables.

**Uso recomendado:** módulos, principios, fases, perfiles o variantes.

**Estructura:** título, contexto, 3 tarjetas con mini visual, título y texto corto.

```html
<section class="slide s-white" data-screen-label="08 Tarjetas">
  <div class="frame">
    <img class="brand-mark right" src="brand/logo-lockup-light.png" alt="Golgotha Academy" />
    <p class="kicker a-rise">Fundamentos</p>
    <h2 class="h1 a-rise delay-1">Principios de diseño</h2>
    <div class="specimen-grid a-rise delay-3">
      <div class="specimen"><div class="thumb"></div><h3 class="h3">Estructura</h3><p class="body-sm">Descripción breve.</p></div>
      <div class="specimen"><div class="thumb"></div><h3 class="h3">Respirar</h3><p class="body-sm">Descripción breve.</p></div>
      <div class="specimen"><div class="thumb"></div><h3 class="h3">Acento</h3><p class="body-sm">Descripción breve.</p></div>
    </div>
  </div>
</section>
```

## 09 — Cita

**Concepto:** autoridad, testimonio o pausa reflexiva.

**Uso recomendado:** citas de fuente, docente, autor, estudiante o documento institucional.

**Estructura:** kicker, cita, atribución, imagen opcional.

```html
<section class="slide s-dark grid-bg-dark" data-screen-label="09 Cita">
  <div class="frame" style="display:flex; flex-direction:column; justify-content:center;">
    <img class="brand-mark right" src="brand/logo-lockup-white.png" alt="Golgotha Academy" />
    <p class="kicker a-rise">Cita</p>
    <p class="quote a-rise delay-1" style="max-width:16ch;">“Texto citado.”</p>
    <div class="slide-footer a-fade delay-4"><span class="caption">Autor / fuente</span><span class="caption">09</span></div>
  </div>
</section>
```

## 10 — Línea

**Concepto:** evolución temporal.

**Uso recomendado:** progreso del curso, crecimiento, tendencia o secuencia medible.

**Estructura:** título, contexto, línea con puntos, etiquetas, fuente.

## 11 — Donut

**Concepto:** distribución porcentual.

**Uso recomendado:** categorías de contenido, resultados, participación o composición.

**Estructura:** título, contexto, donut, valor central, leyenda.

## 12 — Tabla

**Concepto:** comparación precisa.

**Uso recomendado:** calendario, rúbrica, módulos, recursos o alcance.

**Estructura:** título, contexto, tabla compacta, fuente.

## 13 — Imagen completa

**Concepto:** una imagen como evidencia principal.

**Uso recomendado:** fotografía, captura, diagrama grande, mapa o composición visual.

**Estructura:** imagen dominante, caption con kicker, título y pie.

## 14 — Galería

**Concepto:** conjunto visual comparable.

**Uso recomendado:** 2–4 fotos, capturas, tarjetas visuales o evidencias.

**Estructura:** título, contexto, grilla de imágenes, pie.

## 15 — Código / terminal

**Concepto:** ejemplo técnico legible.

**Uso recomendado:** comandos, salida de consola, fragmentos de código o configuración.

**Estructura:** título, contexto, ventana de código, fuente o archivo.

## Uso

1. Identifica el tipo de contenido.
2. Elige el layout por función narrativa.
3. Replica la estructura en el formato disponible.
4. Si usas la plantilla HTML opcional, copia el ejemplo correspondiente y reemplaza todo placeholder.
5. Revisa `checklist.md` antes de entregar.
