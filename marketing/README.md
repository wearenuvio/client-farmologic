# Launch posters — farmologic.io

Full-bleed photography, type set on the image. No panel, no card: the
photograph runs edge to edge and a feathered scrim gives the type its ground.

## Files

`launch/` holds the finished PNGs, one per placement:

| File | Size | Placement |
| --- | --- | --- |
| `instagram-post-1080x1080.png` | 1080×1080 | Instagram / Facebook feed, square |
| `instagram-portrait-1080x1350.png` | 1080×1350 | Instagram feed, portrait — the largest a feed post can occupy |
| `instagram-story-1080x1920.png` | 1080×1920 | Instagram / Facebook story, WhatsApp status, reel cover |
| `linkedin-x-1200x630.png` | 1200×630 | LinkedIn, X, and any link preview |
| `whatsapp-square-800x800.png` | 800×800 | WhatsApp Business, lighter for messaging |

## Rebuilding

```
python3 marketing/build_posters.py    # artboards -> marketing/boards/
bash    marketing/export.sh           # PNGs      -> marketing/launch/
```

`build_posters.py` writes one self-contained HTML file per artboard, with the
brand webfonts and the photography inlined as data URIs. `export.sh` renders
each one with headless Chrome at its exact pixel size, so the typography is
what Chrome draws rather than an approximation of it.

Copy lives in `COPY`, sizes and crops in `BOARDS`. Changing a headline is a
one-line edit and a re-run — no design tool in the loop.

## Type and colour

Cormorant Garamond and Montserrat, the site's own faces, in `fonts/`
(SIL Open Font License). Palette is taken from `site/assets/css/tokens.css`:
forest `#132A1D`, ivory `#F6F4EE`, gold `#C8A24A`.

The logo is never recoloured. On photography it sits on a cream tile, which is
the design system's rule for the logo on dark grounds.

## Before posting

The photography is the same set as the website, and its licensing is still
unresolved — see `site/assets/img/CREDITS.md`. That applies here too, and more
sharply: a social post travels further than a page does.
