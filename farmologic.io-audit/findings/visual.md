# Visual & Mobile Rendering — farmologic.io

Method: Chromium captures via `claude-seo run capture_screenshot.py` at desktop and
mobile viewports for all 5 indexable pages (16 files in `../screenshots/`).
Assessed from the rendered captures plus source verification of anything the
captures implied.

Note: the originally assigned visual agent stalled without producing output. These
captures and findings were produced directly.

## What works

- **Above-the-fold on mobile is genuinely strong.** The homepage fold carries, in
  order: eyebrow positioning line, the species name, the qualifying claim
  ("cultivated under controlled indoor conditions"), a one-sentence substantiation
  naming Bengaluru and own-substrate cultivation, and **two** CTAs — primary
  "Register interest" and secondary "How we grow it" — plus the reassurance line
  "every enquiry is read and answered by a person". Value proposition and
  conversion path both clear without scrolling. This is better than the
  brand-led structure would predict.
- **`/learn` names its audience in the first paragraph** — "a formulator, a QA lead
  or a procurement manager" — and immediately discloses pre-harvest status. Strong
  intent match and honest framing in the same block.
- **Breadcrumb renders visibly** (`FARMOLOGIC / LEARN`) on subpages. Worth noting
  because it is present visually but absent from structured data — see
  `schema.md` finding on missing `BreadcrumbList`.
- **Typography holds at 390px.** Serif display headings remain legible, body copy
  is comfortable, no clipped or overflowing text observed in any capture.
- **Nav collapses to a hamburger** with an adequately sized tap target; the
  open-menu state renders correctly.
- **Reveal animations degrade correctly.** 77 `.reveal` elements across the site,
  and `site.css` provides both `.no-js .reveal { opacity: 1 }` and a
  `prefers-reduced-motion` override forcing `opacity: 1 !important`. Content is
  not gated behind JS. Verified in source, not assumed from the captures.

## Findings

### 1. Hero photography is spent almost entirely under a dark overlay (Medium)

**Evidence:** In `home-mobile-fold.png` the hero image is barely discernible behind
a heavy dark-green scrim — enough to read as texture, not as a photograph. The
underlying file `harvest-in-hand.jpeg` is 121 KB, and the equivalent heroes on
other pages are heavier (`grow-room.jpeg` 508 KB on `/standard`).

**First principle:** the hero image is the likely LCP element, so its bytes sit
directly on the critical path — but the overlay destroys most of the visual
information those bytes encode. The site is paying full transfer cost for detail
the design deliberately hides.

**Dependency:** compounds with the format/responsive findings in `images.md`.
Fixing those reduces the cost; this finding argues the quality ceiling can also
be lowered specifically for overlaid heroes.

**Recommendation:** For overlaid hero images, compress far more aggressively than
for content photography — the overlay masks the artifacts. Combined with AVIF
this should take the heroes well under 60 KB with no perceptible change.

**How we'd know this failed:** side-by-side capture at mobile viewport shows a
visible quality difference through the overlay.

### 2. Screenshot payloads confirm page weight is photography-driven (Info)

Full-page mobile captures: `/learn` 1849 KB, `/` 1193 KB, `/about` 898 KB,
`/standard` 855 KB, `/manifesto` 524 KB. Rendered page weight tracks image
count almost exactly, reinforcing that image delivery — not CSS or JS — is the
dominant performance lever on this site. Not a defect in itself; recorded as
supporting evidence for the `images.md` recommendations.

### 3. One generic CTA across every persona (Medium — see `sxo.md`)

Visually confirmed: "Register interest" is the single repeated primary action on
every page. `/about` copy states that "enquiries, specifications, samples and
facility visits all start in the same place", so the undifferentiated CTA is
deliberate — but it means a procurement buyer wanting an MOQ and a QA lead
wanting a specimen COA are funnelled into identical, unlabelled intent.
Full analysis and persona scoring in `sxo.md`; recorded here as visual
corroboration.

## Not assessed

Core Web Vitals were not measured — the PageSpeed Insights API returned
`rate limit exceeded (240 QPM / 25,000 QPD)` on the shared public quota. No
lab or field CWV numbers appear anywhere in this audit. Supply a Google API key
or retry later to close that gap.

## Category score

**Visual / Mobile: 84 / 100**

Mobile rendering is the strongest category in this audit. The fold does real
work on every page, type holds at 390px, and motion degrades correctly for both
no-JS and reduced-motion users. Deductions are for overlay-wasted hero bytes and
the undifferentiated CTA, both of which are design decisions with SEO
consequences rather than rendering defects.
