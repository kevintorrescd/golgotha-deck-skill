# Golgotha Academy — Brand Assets

Guía de uso para los assets reutilizables incluidos en la skill.

## Logo

Todos los logos derivados salen de `assets/logo.svg`. Si el logo fuente cambia, ejecuta:

```bash
node scripts/generate-brand-assets.js
```

## Versiones disponibles

| Archivo | Uso |
|---|---|
| `assets/brand/logo-lockup-light.svg` | Fondo claro: símbolo verde + texto negro |
| `assets/brand/logo-lockup-white.svg` | Fondo verde, oscuro o sobre imagen oscura |
| `assets/brand/logo-lockup-black.svg` | Pieza monocroma negra |
| `assets/brand/logo-lockup-gray.svg` | Baja jerarquía, anexos o grayscale |
| `assets/brand/logo-mark-green.svg` | Símbolo solo en verde |
| `assets/brand/logo-mark-white.svg` | Símbolo solo en blanco |
| `assets/brand/logo-mark-black.svg` | Símbolo solo en negro |
| `assets/brand/logo-mark-gray.svg` | Símbolo solo en gris |

## Reglas de uso

- No reconstruir el logo con texto suelto.
- No aplicar `filter: invert()` para simular versiones del logo.
- Usar lockup completo cuando la marca deba reconocerse de inmediato.
- Usar solo símbolo cuando el contexto ya dice Golgotha Academy o cuando el espacio sea pequeño.
- Mantener zona de seguridad equivalente a la altura del símbolo alrededor del logo.
- No colocar el logo sobre fotografía compleja sin una zona limpia o contraste suficiente.

## Fondos y placeholders

| Archivo | Uso |
|---|---|
| `assets/backgrounds/grid-light.svg` | Fondo claro sutil |
| `assets/backgrounds/grid-green.svg` | Sección verde, portada o cierre |
| `assets/backgrounds/grid-dark.svg` | Pregunta grande, cita, pausa oscura |
| `assets/backgrounds/presenter-placeholder.svg` | Espacio para imagen de presentador |
| `assets/backgrounds/media-placeholder.svg` | Espacio para imagen, captura, gráfico o recurso visual |

## Tokens

`assets/tokens.css` concentra los colores base:

- `--ga-accent`: verde vivo.
- `--ga-accent-deep`: verde institucional.
- `--ga-bg`: fondo claro.
- `--ga-dark`: fondo oscuro.
- `--ga-fg`: texto principal.

Usa estos tokens como fuente de verdad cuando el formato final permita estilos reutilizables.
