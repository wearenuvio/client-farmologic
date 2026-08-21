# Image provenance — `site/assets/img/`

## ⚠️ Licensing — resolve before launch

The *Cordyceps militaris* photographs below were **supplied by the client team**. Their origin
is not documented, and several carry signs of third-party origin: one frame has a visible
watermark, and one has captions burned into the artwork in a typeface that is not ours. They
are the right subject and they read far better than generic stock, so they are in place — but
**written permission or a licence must be confirmed for each before the site goes public.**

If any turns out to be unlicensed, the fix is the same as the plan already records: the
cycle-1 photo shoot at the trainer's cultivation facility, then the client's own facility from
cycle 2 (`docs/client-brief.md` §4.6).

| File | Used on | Subject |
| --- | --- | --- |
| `harvest-in-hand.jpeg` | Home — hero background; Home og:image | Harvested fruiting body held in a gloved hand, cultivation shelves behind |
| `jars-close.jpeg` | Home — grow section, pinned beside the cycle steps | Fruiting bodies in sealed jars, close |
| `harvest-sorting.jpeg` | Home — philosophy section | Technician in a clean room checking harvested material |
| `grow-room.jpeg` | The Standard — quality journey; Standard og:image | Cultivation shelves under controlled lighting |
| `fruiting-body.jpeg` | Learn — "What cordycepin actually is" | A single cluster, held |
| `militaris-vs-sinensis.jpeg` | Learn — "Indoor-grown versus wild-collected"; Learn og:image | Cultivated *C. militaris* beside wild-collected *C. sinensis*. Captions are baked into the image. |
| `grow-jars-row.jpeg` | About og:image | A row of jars in the fruiting room |
| `grow-room-pair.jpeg` | **not currently used** | Two-panel grow room and jars. Carries a visible watermark — do not publish as-is. |

The green wash (`.figure-dark--tint`) is deliberately **not** applied to any of these. The
orange fruiting body is the product; tinting it green would misrepresent the material. The
modifier is kept in the stylesheet for off-palette imagery.

## Founder portrait

| File | Used on | Source |
| --- | --- | --- |
| `founder-portrait.jpg` | Manifesto — opening section | Client-supplied studio headshot (`founder.jpeg`, 1600×1600) |

Processing: cropped 4:5 around the head, resized to 1000×1250, and the white studio
background flood-filled to the page ivory (`#F6F4EE`) from the border inward, so the portrait
knocks out to the page ground instead of sitting on a white rectangle. The shirt is enclosed by
the jacket and collar, so the fill never reaches it. Bottom 22% is faded with a CSS mask so the
chest crop does not end on a hard edge. The subject is not retouched or recoloured.

**Two things are outstanding:**

1. **Name.** The caption currently reads "Founder / Farmologic, Bengaluru". A portrait with no
   name attached is weaker than either a named portrait or no portrait. Send the name and it
   goes in the `.founder-portrait__role` line above the role.
2. **Consent to publish.** This is an identifiable photograph of a real person on a public
   commercial site. Confirm the subject has agreed to its use here.

Note that the design system's founder-anonymity rule is now effectively lifted by this
placement. Earlier passes kept quotes attributed to "Farmologic" rather than a person on the
strength of that rule; those attributions have been left as they are.

## Client-owned brand assets (from the Farmologic Design System)

| File | Source | Notes |
| --- | --- | --- |
| `logo-full.png` | `design-system/assets/logo-full.png` | Locked master lockup, untouched. schema.org logo only. |
| `logo-lockup.png` | Cropped from `logo-full.png` | Trimmed to its content box. Used on the footer tile. Not redrawn, not recoloured. |
| `logo-header.png` | Rendered from the brand deck's vector art | Header lockup: mark and wordmark, no micro-tagline, which is illegible at header size. 986x527, replacing a 359x214 crop of a crop. Used in the site nav and on the poster artboards, so both carry the same lockup. Not redrawn, not recoloured. |
| `logo-lockup-hi.png` | Rendered from the brand deck's vector art | Full lockup, dark, on transparency. Page 04 of `Farmologic-Brand-Presentation.pdf` rendered at 6000px and knocked out. The only high-resolution source there is: `logo-full.png` is 500x500. Used on the poster artboards. |
| `logo-lockup-reversed.png` | Same source, cover page | Full lockup reversed to ivory, for dark grounds. |
| `logo-lockup-reversed-nt.png` | Cropped from the above | Reversed lockup without the tagline and rule, which lose legibility over photography. |
| `logo-mark.png`, `favicon-180.png`, `apple-touch-icon.png` | Cropped from the monogram inside `logo-full.png` | The brand sheet lists the monogram as an approved variation. A proper mark-only export is still outstanding. |

## Removed

`hero-c.jpg`, `stock-soil.jpg`, `stock-grow-dusk.jpg` — Unsplash placeholders, replaced by the
real cordyceps photography above. `products-hero.jpeg`, `editorial-*.jpeg` and
`lifestyle-banner.jpeg` were removed earlier when the product range and those sections changed.

## Make in India

| File | Used on | Source |
| --- | --- | --- |
| `make-in-india.png` | All five footers | Client-supplied `Make-in-India.webp`, 1200x675 |

Processing: the white surround was flood-filled to transparent from the border inward, so the
gear texture inside the lion is untouched, then trimmed to its bounding box and resized to 520px
wide. The mark itself is not redrawn, recoloured or altered. It is dark artwork, so on the forest
footer it sits on a cream tile — the same treatment the Farmologic logo gets on dark grounds.

**Permission is still outstanding.** The Make in India lion is a registered trademark of the
Government of India, administered by DPIIT. The artwork was supplied by the client and is now on
the site on that basis, but displaying it requires DPIIT permission, and that permission has not
been evidenced here. Confirm it before launch.

Two further notes: the file supplied is a web-resolution raster, not an official vector, so it
will not scale cleanly beyond its current footer size; and DPIIT's usage guidance covers
placement, spacing and minimum size, which should be checked against how it is used here.

