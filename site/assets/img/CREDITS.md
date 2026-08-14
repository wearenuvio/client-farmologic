# Image provenance — `site/assets/img/`

## Client-owned (from the Farmologic Design System)

| File | Source | Notes |
| --- | --- | --- |
| `logo-full.png` | `design-system/assets/logo-full.png` | Locked master lockup, untouched. OG image / schema.org logo only. |
| `logo-lockup.png` | Cropped from `logo-full.png` | Same artwork trimmed to its content box so it sets at a usable size. Not redrawn, not recoloured. |
| `logo-mark.png`, `favicon-180.png`, `apple-touch-icon.png` | Cropped from the monogram inside `logo-full.png` | The brand sheet lists the monogram as an approved variation. A proper mark-only export is still outstanding. |
| `products-hero.jpeg` | `design-system/assets/photo-hero-dark.jpeg` | Full-bleed in the hero, and CSS-cropped three ways for the product cards. |
| `editorial-quality.jpeg` | `design-system/assets/photo-editorial-quality.jpeg` | Brand collateral, shown framed and captioned. |
| `editorial-infographic.jpeg` | `design-system/assets/photo-editorial-infographic.jpeg` | Brand collateral, shown framed and captioned. |
| `lifestyle-banner.jpeg` | `design-system/assets/photo-lifestyle-banner.jpeg` | Brand campaign visual, shown framed and captioned. |

## Licensed stock — **placeholder, replace before or shortly after launch**

The client's recorded position (`docs/client-brief.md` §4.6) is that hero and cultivation imagery
must be real, not stock, because the brand's whole pitch is transparency. These two are in place
so the pages are not empty, are captioned "illustrative", and are marked with `TODO(imagery)`
comments in the HTML.

| File | Source | Used on | Licence |
| --- | --- | --- | --- |
| `stock-soil.jpg` | Unsplash `photo-1492496913980-501348b61469` | `index.html` — philosophy section ("living soil, clean water") | Unsplash Licence — free for commercial use, attribution appreciated but not required |
| `stock-grow-dusk.jpg` | Unsplash `photo-1783104083982-f5c1e8fc6384` | `index.html` — grow-cycle section | Unsplash Licence — as above |

Retrieve the originals at `https://images.unsplash.com/<id>` (append `?w=1800&q=78&fm=jpg`).

### What was rejected, and why

Roughly ten candidates were reviewed. Most failed the design system's imagery rules:

- Indoor mushroom-farm photography on Unsplash is overwhelmingly amateur oyster-mushroom
  grow-bag imagery — wrong species, wrong colour, and it would misrepresent a controlled lab
  for a brand whose claim is traceability.
- Laboratory stock is almost universally cool-toned and clinical (blue trays, magenta pipettes,
  blue gloves). The design system rules out cool and blue tones outright.
- Botanical macros were too saturated for a muted forest / sage / ivory palette.

Nothing was used that implies it depicts the Farmologic facility.

### Replacement plan

`docs/client-brief.md` §4.6 records the agreed workaround: the team training Farmologic already
runs a working cultivation lab, so stage-by-stage photography can be shot there for cycle 1, and
in Farmologic's own facility from cycle 2. When those land, swap both files and delete the
`TODO(imagery)` comments in `index.html`.
