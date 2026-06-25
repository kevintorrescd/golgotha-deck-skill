# Production Engines

Use this guide before generating the final deck file.

## First decision

Identify the production engine before designing final implementation details:

| Engine | Use when | Asset rule | Motion rule |
|---|---|---|---|
| `pptxgenjs` | JavaScript/Node generation, chart-heavy decks, browser-adjacent workflows | Insert PNG files with image APIs; do not use SVG logo/background variants | Keep motion as slide-level intent unless the project already has a tested transition helper |
| `python-pptx` | Python pipelines, data/report automation, existing `.pptx` manipulation | Insert PNG files with picture APIs; do not rebuild logos/backgrounds with shapes | Treat transitions/animations as optional OOXML/template work, not baseline public API behavior |
| HTML reference | Visual proof, browser preview, export pipeline, or fast iteration | Use relative PNG paths from `assets/brand/` and `assets/backgrounds/` | CSS animation may preview the intended rhythm, but final PPTX must still work as static slides |
| Other canvas/design tool | Manual or semi-automated visual production | Place PNG assets as real image layers | Use only subtle transitions supported by the target tool |

## Motion intent

Motion is secondary. Every slide must work as a static image.

Use transitions only to support narrative:

- `fade`: default between most slides.
- `push` or directional move: only when showing progression, sequence, or before/after.
- `morph`: only when duplicating a slide and moving the same object intentionally.
- No spinning, bouncing, random object entrances, or decorative per-element animation.

## Implementation notes

- Document the selected engine in working notes before building.
- If using `pptxgenjs` or `python-pptx`, check the installed version and available API before adding transitions.
- If a desired transition is not available through the chosen library, keep the deck static or use a tested OOXML/template approach.
- Do not sacrifice asset fidelity, layout, or QA to force animation.
