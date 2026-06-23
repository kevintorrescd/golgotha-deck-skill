# Golgotha Academy — Source to Deck

Guía para convertir un documento fuente, brief o contenido estructurado en una presentación clara de Golgotha Academy.

## 1. Lectura inicial

Extrae estos elementos antes de diseñar slides:

- Audiencia: estudiantes, líderes, equipo interno, aliados, docentes u otro grupo.
- Objetivo: informar, enseñar, persuadir, reportar, entrenar o cerrar una decisión.
- Tesis central: una frase que explique qué debe entender o hacer la audiencia.
- Secciones naturales: capítulos, módulos, problemas, argumentos, pasos o evidencias.
- Evidencia disponible: datos, citas, ejemplos, imágenes, tablas, cronogramas.
- Restricciones: duración, cantidad máxima de slides, tono, formato final y assets.

## 2. Decidir número de slides

- 3–5 slides: actualización breve o introducción.
- 6–9 slides: clase corta, propuesta simple o resumen ejecutivo.
- 10–15 slides: lección completa, reporte o presentación institucional.
- Más de 15 slides: dividir por módulos o secciones; cada bloque debe tener una transición clara.

Si el documento es largo, no intentes cubrir cada párrafo. Convierte secciones en ideas, no en transcripción.

## 3. Mapeo de contenido a layouts

| Tipo de contenido | Layout recomendado |
|---|---|
| Tesis, título o apertura | Portada |
| Concepto + explicación | Dos columnas |
| Evidencia numérica | Dato principal, barras, líneas o donut |
| Comparación | Tabla o tarjetas |
| Secuencia de aprendizaje | Línea de tiempo |
| Frase clave con atribución | Cita |
| Captura, foto, diagrama o mapa | Imagen o galería |
| Ejemplo técnico | Código / terminal |
| Síntesis o llamado final | Cierre |

## 4. Regla de una idea por slide

Cada slide debe poder resumirse en una oración:

- Malo: "Módulo 2"
- Mejor: "El módulo 2 convierte la teoría en una práctica guiada"

Si una slide necesita dos conclusiones, divídela.

## 5. Manejo de datos faltantes

- No completes porcentajes, fechas, nombres o cifras por intuición.
- Usa `—` cuando el dato simplemente no está.
- Usa "fuente pendiente" cuando hay un dato sin atribución.
- Usa "imagen pendiente" si la composición necesita un asset que no fue entregado.
- Si el documento contradice un dato, conserva la contradicción como nota o pide revisión fuera del deck.

## 6. Voz y edición

- Reduce texto, no significado.
- Mantén términos propios de Golgotha Academy cuando aparezcan en la fuente.
- Convierte párrafos largos en titulares, bajadas y bullets cortos.
- Evita claims absolutos si el documento solo muestra intención o propuesta.
- No cambies el sentido teológico, académico o institucional de una cita para hacerla más comercial.

## 7. Secuencia recomendada

1. Portada: tema y promesa concreta.
2. Contexto: por qué importa.
3. Marco: idea central o estructura.
4. Desarrollo: 3–6 slides con conceptos, datos, ejemplos o pasos.
5. Síntesis: lo que debe quedar claro.
6. Cierre: próximo paso, práctica, decisión o reflexión.
7. QA final: ejecutar `node scripts/verify-presentation.js <archivo-final> --out <carpeta-qa>` cuando el formato lo permita y revisar renders o previews de cada slide antes de entregar.
