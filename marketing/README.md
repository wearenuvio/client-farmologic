# Launch posters — farmologic.io

Two directions, each in five placements. `launch/` holds the finished PNGs.

**`photo--`** — full-bleed photography, type set on the image. No panel and no
card: the frame runs edge to edge and a feathered scrim gives the type its
ground. Leads with the species. The one that stops a scroll.

**`studio--`** — no photograph. A bone ground, the logo set directly on it
because a light ground needs no tile, and the cordyceps drawn as line art and
ghosted back to a watermark. Leads with the domain and closes on the brand's
own line rather than a call to action. The quiet one, and the one that keeps
working after launch week.

In both sets the logo sits at the head of the type stack rather than in a
corner, so the whole composition reads as one block anchored to the foot.

| Placement | Size |
| --- | --- |
| `instagram-post` | 1080×1080 — Instagram / Facebook feed, square |
| `instagram-portrait` | 1080×1350 — the largest a feed post can occupy |
| `instagram-story` | 1080×1920 — story, WhatsApp status, reel cover |
| `linkedin-x` | 1200×630 — LinkedIn, X, any link preview |
| `whatsapp-square` | 800×800 — WhatsApp Business, lighter for messaging |

## How sizing works

Every dimension is `calc(var(--u) * n)`. `--u` is one number per artboard,
computed by `scale_for()`, so a single set of numbers holds its proportions at
1200×630 and at 1080×1920 alike. There are no per-format font sizes to drift
apart. Change `112` on `h1` and every board moves together.

`--u` is the width bounded by the height, softened so the spread between
formats is a nudge rather than a cliff, with a floor so a short landscape board
still reads at thumbnail size:

| Board | `--u` |
| --- | --- |
| 1080×1080 | 0.837 |
| 1080×1350 | 1.0 |
| 1080×1920 | 1.0 |
| 1200×630 | 0.62 |
| 800×800 | 0.658 |

Stories keep Instagram's roughly 250px of UI clear at top and bottom.

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

The logo is never recoloured. Both lockups are rendered from the vector art in
the brand deck rather than upscaled from `logo-full.png`, which is only
500x500: the dark one for the bone ground, the reversed one for photography.
That removed the cream tile the logo used to sit on, since the reversed lockup
needs no box. On photography the tagline and its rule are dropped, because at
poster size they lose against the picture.

## Before posting

The `photo--` set uses the same photography as the website, and its licensing
is still unresolved — see `site/assets/img/CREDITS.md`. That applies here too,
and more sharply: a social post travels further than a page does. The
`studio--` set uses no photography at all, so it is clear on that count.
