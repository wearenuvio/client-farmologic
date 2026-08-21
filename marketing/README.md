# Launch posters — farmologic.io

Two directions, each in five placements. `launch/` holds the finished PNGs.

**`photo--`** — full-bleed photography, type set on the image. No panel and no
card: the frame runs edge to edge and a feathered scrim gives the type its
ground. Leads with the species. The one that stops a scroll.

**`studio--`** — no photograph. A bone ground, the logo set directly on it
because a light ground needs no tile, and the cordyceps drawn as line art and
ghosted back to a watermark. Leads with the domain. The quiet one, and the one
that keeps working after launch week.

| Placement | Size |
| --- | --- |
| `instagram-post` | 1080×1080 — Instagram / Facebook feed, square |
| `instagram-portrait` | 1080×1350 — the largest a feed post can occupy |
| `instagram-story` | 1080×1920 — story, WhatsApp status, reel cover |
| `linkedin-x` | 1200×630 — LinkedIn, X, any link preview |
| `whatsapp-square` | 800×800 — WhatsApp Business, lighter for messaging |

## The motif

The cordyceps line art is generated, not drawn by hand: `cordyceps_svg()` in
the build script lays out club-shaped stromata with varied height, lean and
width from a fixed seed, so it is reproducible but not mechanical. Change
`seed` for a different cluster.

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

The `photo--` set uses the same photography as the website, and its licensing
is still unresolved — see `site/assets/img/CREDITS.md`. That applies here too,
and more sharply: a social post travels further than a page does. The
`studio--` set uses no photography at all, so it is clear on that count.
