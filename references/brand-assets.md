# Golgotha Academy — Brand Assets

Guía de uso para los assets reutilizables incluidos en la skill.

## Logo

Las versiones de uso son PNG con fondo transparente. No incluyas SVG de marca en entregables ni en assets empaquetados. Si necesitas regenerar logos desde una fuente vectorial externa, pasa su ruta con `GA_LOGO_SOURCE`:

```bash
$env:GA_LOGO_SOURCE="C:\ruta\externa\logo-vector-source"; node scripts/generate-brand-assets.js
```

## Versiones disponibles

| Archivo | Uso |
|---|---|
| `assets/brand/logo-lockup-light.png` | Fondo claro: símbolo verde + texto negro |
| `assets/brand/logo-lockup-white.png` | Fondo verde, oscuro o sobre imagen oscura |
| `assets/brand/logo-lockup-black.png` | Pieza monocroma negra |
| `assets/brand/logo-lockup-gray.png` | Baja jerarquía, anexos o grayscale |
| `assets/brand/logo-mark-green.png` | Símbolo solo en verde |
| `assets/brand/logo-mark-white.png` | Símbolo solo en blanco |
| `assets/brand/logo-mark-black.png` | Símbolo solo en negro |
| `assets/brand/logo-mark-gray.png` | Símbolo solo en gris |

## Reglas de uso

- Usar los archivos `.png` de `assets/brand/` en presentaciones, HTML de referencia, documentos y exportaciones.
- No incrustar SVG de logo ni variantes SVG en entregables.
- No reconstruir el logo con texto suelto.
- No aplicar `filter: invert()` para simular versiones del logo.
- Usar lockup completo cuando la marca deba reconocerse de inmediato.
- Usar solo símbolo cuando el contexto ya dice Golgotha Academy o cuando el espacio sea pequeño.
- Mantener zona de seguridad equivalente a la altura del símbolo alrededor del logo.
- No colocar el logo sobre fotografía compleja sin una zona limpia o contraste suficiente.

## Fondos y placeholders

Los fondos y placeholders de uso final son PNG. Usarlos directamente en slides, plantillas, documentos o exportaciones para conservar la textura de marca. No incrustar ni depender de SVG de fondos en entregables.

| Archivo | Uso |
|---|---|
| `assets/backgrounds/grid-light.png` | Fondo claro sutil |
| `assets/backgrounds/grid-green.png` | Sección verde, portada o cierre |
| `assets/backgrounds/grid-dark.png` | Pregunta grande, cita, pausa oscura |
| `assets/backgrounds/presenter-placeholder.png` | Espacio para imagen de presentador |
| `assets/backgrounds/media-placeholder.png` | Espacio para imagen, captura, gráfico o recurso visual |

## Tokens

`assets/tokens.css` concentra los colores base:

- `--ga-accent`: verde vivo.
- `--ga-accent-deep`: verde institucional.
- `--ga-bg`: fondo claro.
- `--ga-dark`: fondo oscuro.
- `--ga-fg`: texto principal.

Usa estos tokens como fuente de verdad cuando el formato final permita estilos reutilizables.
