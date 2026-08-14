# Farmologic — farmologic.com

The client-facing website for **Farmologic**, built directly on the *Farmologic Design System*
(claude.ai/design project `069f79f9-1516-450c-91cd-99f8cfe4ddf8`).

```
client-farmologic/
├── design-system/     ← the imported design system, verbatim. Reference only; don't edit.
├── site/              ← the website. This is the deliverable.
├── docs/
│   ├── client-brief.md  ← cleaned from the 4 Aug 2026 call. Read this first; it wins on facts.
│   └── brand-brief.md   ← brand platform, voice and locked visual identity, from the brand deck.
└── check.mjs          ← dependency-free integrity check. Run before every handoff.
```

**Read `docs/client-brief.md` before changing any copy.** It carries the hard messaging rules (no
competitor comparison, no "only brand" claim, no unsupported health claims, "purest" not "largest"),
the agreed launch dates, and a gap list of what the call asked for that the site does not yet do.

To change a colour, a type size, a radius or an easing: change it in the design system, re-export,
and re-concatenate `design-system/tokens/*.css` into `site/assets/css/tokens.css`. Do not edit
token values in `site/`.

## The site

Static HTML, CSS and vanilla JS. **No build step, no dependencies, no framework.** Open
`site/index.html` in a browser, or drop the `site/` folder onto Netlify / Vercel / Cloudflare
Pages / S3 / any shared host and it is live.

```bash
cd site && python3 -m http.server 4173   # → http://localhost:4173
```

Why static: the brief is a pre-revenue B2B lead-generation site with a single conversion goal.
Every word of copy has to exist in server-rendered HTML for SEO (the design system says so
explicitly), the client needs to be able to hand it to any host, and there is no application
state to manage. Motion is progressive enhancement on top.

### Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home. Hero → the Standard → grow timeline → the three formats → trade terms → philosophy → Learn teaser → CTA → enquiry form. |
| `cordyceps.html` | The material: formats, full target specification, packing/storage/documentation, FAQ. |
| `standard.html` | The Farmologic Standard: five-stage quality journey, four obligations, grow set points, release testing panel. |
| `learn.html` | Four editorial notes — cordycepin, indoor vs wild, reading a COA, choosing a format. SEO surface. |
| `about.html` | Company, purpose, why a single crop, values, contact. |
| `enquiry.html` | Full bulk-enquiry / sample-request form. |
| `404.html` | Not found. |

Plus `robots.txt`, `sitemap.xml`, `site.webmanifest`.

### Assets

| File | Origin |
| --- | --- |
| `assets/css/tokens.css` | The design system's five token files, concatenated verbatim. **Single source of truth for every colour, type, spacing and effect value.** |
| `assets/css/site.css` | Site stylesheet. Implements each design-system component as a `.fm-*` class (Button, Badge, SectionLabel, GoldRule, Card, GlassCard, Seal, SpecReadout, Stat, ProductCard, CTABand, Input/Select/Textarea/Checkbox). |
| `assets/js/site.js` | Header state, staggered reveals, scroll-driven grow timeline, ambient spore canvas, form validation and submit, footer year. |
| `assets/img/logo-full.png` | The locked master lockup, untouched (used for OG image / schema.org logo). |
| `assets/img/logo-lockup.png` | Same artwork cropped to its content box so it sets at a usable size in the header and footer. Not redrawn, not recoloured. |
| `assets/img/logo-mark.png`, `favicon-180.png`, `apple-touch-icon.png` | Favicon set, cropped from the monogram inside the locked lockup (the brand sheet shows the monogram as an approved variation; no separate mark file was supplied — see *Open items*). |
| `assets/img/products-hero.jpeg` | `design-system/assets/photo-hero-dark.jpeg`. Used full-bleed in the hero **and** CSS-cropped three ways for the product cards, so each card shows its own pack from the one locked photograph. |
| `assets/img/editorial-quality.jpeg`, `editorial-infographic.jpeg`, `lifestyle-banner.jpeg` | Client editorial collateral, presented as framed collateral (with captions) rather than as page photography — the text is baked into these images. |

## Design-system fidelity

- Every colour, size, radius, shadow, duration and easing resolves to a token in `tokens.css`.
  The only literals in `site.css` are the two hover shades the design system itself specifies
  (`#26492F`, `#D4B05C`), white form fields, and one error red.
- Palette ratio holds at roughly 60 % ivory / 30 % forest / 7 % sage-olive / 3 % gold.
  **Gold is never a block** — hairlines, the seal, single highlighted words, and the one gold
  button.
- Type is Cormorant Garamond (display) and Montserrat (body/UI) only, loaded from Google Fonts
  via the design system's own `@import`.
- Corners stay tight: 2 px cards and inputs, 6 px glass, pill only for seals and icon rings.
- Icons are Lucide-style 1.5 px line icons inside 1 px rings, inlined as an SVG sprite per page
  (the design system flags Lucide as the sanctioned substitute until the client supplies
  `~/Farmologic/04-icons/`).
- No hand-drawn botanicals were invented; decoration is limited to gold hairlines, rules and
  inset frames, per the design system's instruction.
- **Founder anonymity is respected everywhere.** No name, photo or bio appears anywhere on the
  site, and quotes are attributed to "— Farmologic". `design-system/assets/brand-sheet.jpeg`
  and `photo-collateral-kit.jpeg` both contain a business-card mockup bearing a name, so
  neither is used on the site at all.

## Accessibility & SEO

Skip link, semantic landmarks, one `<h1>` per page, labelled form fields with inline errors,
`aria-current` on the active nav item, gold `:focus-visible` rings, `prefers-reduced-motion`
honoured (reveals, parallax and the spore canvas all switch off). Per-page title, description,
canonical, Open Graph and Twitter tags; `Organization` + `WebSite` JSON-LD on the home page,
`Product` + `FAQPage` on the cordyceps page; sitemap and robots included.

## Wiring the enquiry form — do this before launch

Both forms (`index.html#enquiry` and `enquiry.html`) carry `data-endpoint="mailto"`, which opens
the visitor's mail client with the enquiry pre-filled so no lead is ever silently dropped. To
post to a real endpoint instead, change the attribute on the `<form>`:

```html
<form data-enquiry data-endpoint="https://formspree.io/f/XXXX" novalidate>
```

Anything that accepts a `POST` of `FormData` and returns 2xx works (Formspree, Netlify Forms,
Basin, a CRM webhook). A honeypot field and client-side validation are already in place; on
failure the visitor is given the `trade@farmologic.com` address as a fallback.

## Open items for the client

1. **Spec numbers are targets, not results.** Cordycepin ≥ 0.5 % w/w, moisture ≤ 8 %, ash ≤ 8 %,
   80 mesh, 24-month shelf life, 1 kg MOQ, 50 g sample, 4–6 week lead time and the grow set
   points are all plausible for indoor *C. militaris* but need sign-off before launch. They are
   labelled as targets on the site; replace them with confirmed values once the first COA lands.
2. **Email address.** The site uses `trade@farmologic.com` throughout. Confirm or change.
3. **Registrations.** FSSAI and AYUSH are stated as "on request". Add the numbers when issued.
4. **Icons.** Swap the inline Lucide-style sprite for the original brand icon SVGs when the
   client supplies `~/Farmologic/04-icons/`.
5. **Favicon.** Ask for a proper mark-only / favicon export; the current one is cropped from the
   locked lockup.
6. **Photography.** Only one clean product photograph exists (`photo-hero-dark.jpeg`). A facility
   / grow-room shoot would materially strengthen the Standard and grow-timeline sections.
7. **Analytics and consent.** Nothing is loaded and nothing is tracked. Add an analytics tag plus
   a privacy policy and a consent banner if required for the client's markets.

## Editing notes

Header and footer markup is duplicated across the seven pages rather than templated — deliberate,
so the deliverable stays buildless. If you change navigation, change it in all seven, then run:

```bash
node check.mjs
```

`check.mjs` has no dependencies. It verifies that every local link, in-page anchor and SVG symbol
resolves, that ids are unique, that each page has a title, a description, exactly one `<h1>` and
alt text on every image, that every class used in HTML exists in `site.css`, that every
`var(--…)` in `site.css` is defined in `tokens.css`, and that the primary nav has not drifted
between pages. Run it before every handoff.
