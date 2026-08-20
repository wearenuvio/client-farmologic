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
| `logo-header.png` | Cropped from `logo-lockup.png` | Header lockup: mark and wordmark only, micro-tagline removed because it is illegible at header size. Not redrawn, not recoloured. |
| `logo-mark.png`, `favicon-180.png`, `apple-touch-icon.png` | Cropped from the monogram inside `logo-full.png` | The brand sheet lists the monogram as an approved variation. A proper mark-only export is still outstanding. |

## Removed

`hero-c.jpg`, `stock-soil.jpg`, `stock-grow-dusk.jpg` — Unsplash placeholders, replaced by the
real cordyceps photography above. `products-hero.jpeg`, `editorial-*.jpeg` and
`lifestyle-banner.jpeg` were removed earlier when the product range and those sections changed.

## Make in India

`site.css` `.made-in-india` renders a **placeholder** badge: a CSS tricolour chip plus the words
"Made in India". It is typographic and makes no claim to the official mark.

The Make in India lion is a registered trademark of the Government of India, administered by
DPIIT. **Do not scrape, redraw or approximate it.** To use the real mark, the client must supply
the official artwork file and confirm they hold DPIIT permission to display it.
