# Image SEO — farmologic.io

Scope: `site/assets/img/` (3.4 MB across 20 files), image markup in `site/*.html`.
Method: static inspection of files + markup. No Playwright/Chromium available, so no
rendered-viewport or LCP measurement — every finding below rests on file and markup
evidence only.

## What works

- **Alt text: 100% coverage.** All 26 `<img>` elements across the five indexable
  pages carry an `alt` attribute. Nothing to fix.
- **Explicit dimensions: 100% coverage.** Every `<img>` carries `width` and
  `height`, so the browser can reserve layout space. This is the main CLS
  defence and it is already in place.
- **Lazy loading is applied selectively.** Two images per page load eagerly; the
  rest are deferred. Eager-loading the above-fold hero is correct, not a bug.
- **`max-image-preview:large`** is set in the robots meta on every page, so Google
  may use full-size thumbnails in SERPs and Discover.

## Findings

### 1. No modern image formats — every raster asset is JPEG or PNG (High)

**Evidence:** 20 image files, 0 WebP, 0 AVIF. Total payload 3.4 MB.
Largest offenders: `grow-room.jpeg` 508 KB, `jars-close.jpeg` 436 KB,
`grow-room-pair.jpeg` 384 KB, `fruiting-body.jpeg` 285 KB,
`grow-jars-row.jpeg` 270 KB, `founder-portrait.jpg` 226 KB.
Two PNGs are photographic-weight: `logo-lockup-reversed.png` 212 KB,
`make-in-india.png` 185 KB.

**First principle:** LCP is bytes-over-wire divided by connection speed. The
hero image is almost certainly the LCP element on every page here, because
each page opens on a full-bleed photograph. Format is the largest single
lever on those bytes.

**Recommendation:** Emit AVIF with WebP fallback and keep the JPEG as the
final `<img src>` fallback. Expect 50–70% reduction on these photographs.
The two heavy PNGs should be WebP (lossy is fine for the reversed lockup at
display size) or, for `logo-lockup-reversed.png`, SVG if vector art exists —
`logo-mark.png` and `poster-logo.png` suggest source vector may be available.

**How we'd know this failed:** PageSpeed Insights "Serve images in modern
formats" audit still flags the same files after deploy.

**Leading indicator:** total `site/assets/img/` payload drops below ~1.2 MB.

### 2. No responsive image markup — mobile downloads desktop-sized files (High)

**Evidence:** `grep -c "srcset\|<picture"` returns **0** on all six HTML files.
Source images are 1800 px wide (`grow-room` 1800×1800, `grow-room-pair`
1800×1350, `fruiting-body` 1800×1350, `grow-jars-row` 1800×1080,
`logo-lockup-reversed` 1800×1087). A phone at 390 px CSS width with DPR 2
needs ~780 px, so it is downloading roughly 5× the pixels it can display.

**Dependency:** fix this together with finding 1 — both are solved by the same
`<picture>` rewrite, and doing them separately means touching the same markup
twice.

**Recommendation:** Wrap each content image in `<picture>` with AVIF/WebP
`<source>` entries and a `srcset` offering ~600/1000/1800 px widths plus a
`sizes` attribute matching the layout. Keep the existing `width`/`height` on
the `<img>` so the CLS protection survives the rewrite.

**How we'd know this failed:** DevTools network panel on a mobile emulation
still shows the 1800 px variant being fetched.

**Leading indicator:** mobile LCP in CrUX (once the site has enough traffic to
report) or, before that, mobile transfer size for the homepage.

### 3. OG images are not at the recommended aspect ratio (Low)

**Evidence:** `og:image` targets are the same photographs used on-page —
homepage and /manifesto use `harvest-in-hand.jpeg` (1600×1067, ratio 1.50),
/about uses `grow-jars-row.jpeg`, /learn uses `militaris-vs-sinensis.jpeg`
(1536×1024, ratio 1.50), /standard uses `grow-room.jpeg` (1800×1800, ratio
1.00 — square).

Facebook/LinkedIn/X card previews are laid out for 1200×630 (ratio 1.91).
A square source on /standard will be centre-cropped hardest.

**Recommendation:** Produce dedicated 1200×630 social cards per page. Since
these are brand-controlled crops, this is also a chance to place the lockup and
a short line of text so the card carries the claim, not just a photograph.
Also add `og:image:width` and `og:image:height` — currently absent — so
scrapers can lay out the card before fetching the file.

**How we'd know this failed:** the card preview in the LinkedIn Post Inspector
or X Card Validator still crops the subject badly.

### 4. Homepage and /manifesto share one OG image (Info)

Both point at `harvest-in-hand.jpeg`. Not an SEO defect — OG images are not a
ranking input — but it makes the two pages indistinguishable when shared side
by side. Folded into finding 3's per-page card work.

## Category score

**Images: 72 / 100**

Alt text and dimensions — the two things that are genuinely hard to retrofit —
are already at 100%. The deductions are entirely delivery-side: no modern
formats and no responsive variants, which together are the dominant cost on a
photography-led site.
