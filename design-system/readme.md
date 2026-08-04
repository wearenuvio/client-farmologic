# Farmologic Design System

**Farmologic** (farm + logic) — Bengaluru, India. Grows *Cordyceps militaris* in a controlled indoor lab. Pre-revenue: first cultivation Sep 2026, first harvest Dec 2026. **B2B only, cordyceps only** — buyers are supplement/nutraceutical brands, contract manufacturers, functional-beverage startups, AYUSH formulators, sports-nutrition brands. Single conversion goal: a qualified bulk enquiry / sample request. No cart; D2C is Phase 2.

- Domain: farmologic.com · Tagline: **Nature. Science. Wellness.**
- Purpose: "Harnessing nature through science to create premium wellness solutions for a better tomorrow."
- Box line: "Goodness Inside. Better You. Outlook."
- Named brand promise: **The Farmologic Standard** — *Every batch. Watched as it grows. Verified in the lab. Certified.* Use as a named, repeated device.
- Narrative: sell the harvest before it's grown — "Reserve your allocation from the first harvest." Scarcity is real.
- Rule: **brand leads, product proves.** Never "cordyceps" alone; always pair with Farmologic.
- ⚠️ **Founder anonymity is a hard rule.** No founder name, photo, or bio anywhere. Quotes attributed to "— FARMOLOGIC". (Note: `assets/photo-collateral-kit.jpeg` shows a mockup business card with a name — never reproduce that name.)

**Sources given:** `uploads/Farmologic-Brand-Presentation.pdf` + 38 client creatives (`uploads/farmologic-creative-00…36`, incl. `-28-nobg.png` transparent logo). Key: `-05` dark hero (tonal north star for the dark side), `-10` official brand sheet, `-30` collateral kit, `-00`/`-20` editorial layouts. Client-side paths referenced in the brief (not attached): `~/Farmologic/01-logo/official/` logo masters, `05-social-templates/`, `10-website/` SEO plan.

## Design direction: futuristic-organic hybrid
Client wants "very futuristic"; the creative library is warm/editorial/botanical. Resolution: keep the locked palette and typefaces exactly; deliver futurism through **interaction and atmosphere** — dark "living lab" sections (`--gradient-dark`), glass data cards over dark grounds, a scroll-driven grow timeline (spore → colonisation → fruiting → harvest), monospace-feel lab readouts, restrained micro-motion. All motion is progressive enhancement; copy must exist in server-rendered HTML; respect `prefers-reduced-motion`.

## CONTENT FUNDAMENTALS
- **Tone:** calm, assured, premium; declarative short sentences with full stops. "Nature. Science. Wellness." "Clean energy. Clear mind. Better you." Never hypey, no exclamation marks, no emoji.
- **Casing:** Headlines in serif use sentence/title case with a highlighted word often in gold or olive ("Why Quality Starts **Before Harvest**"). Labels/eyebrows are UPPERCASE Montserrat with wide tracking ("HERO PRODUCTS", "BUILT FOR YOUR BEST").
- **Voice:** first-person plural "we" speaking to "you"; promise-framing ("That's our promise to you."). B2B copy is precise: MOQ, lead time, cordycepin %, COA, FSSAI/AYUSH numbers stated plainly.
- **Benefit triads:** ENERGY | FOCUS | STAMINA — three uppercase words separated by thin vertical bars.
- **Device lines:** paired oppositions — "We don't just follow nature. We honour it — from farm to formula." Second clause often gold.
- **Numbers:** real figures, "Price on request" for pricing. Market context: dried cordyceps ~₹20,000–36,000/kg in India.

## VISUAL FOUNDATIONS
- **Palette ratio:** ~60% ivory / 30% forest / 7% sage / 3% gold. Gold is NEVER a block — hairlines, seals, small marks, single highlighted words only.
- **Type:** Cormorant Garamond 600/500 display (the "Nature" half; large, tight leading ~1.08); Montserrat 400/500/600 body/UI (the "Science" half; uppercase labels tracked .22–.32em). No other faces. Both on Google Fonts — loaded via `tokens/fonts.css` (no binaries shipped; brand sheet confirms these exact faces).
- **Backgrounds:** flat ivory `#F6F4EE` canvas; dark sections use `linear-gradient(180deg,#132A1D,#1E3D2B)`; occasional full-bleed warm photography with ivory text. Subtle paper grain acceptable on ivory. No other gradients ever.
- **Rules & frames:** thin gold hairline (1px, ~64px wide) centered/left under headlines; 1px gold inner frame inset ~12–20px on featured cards/quote bands.
- **Botanicals:** line-drawn leaf/vine accents in gold (on dark) or olive (on light), always decorative, low-contrast, corner-anchored. Use copied imagery, don't hand-draw new SVG botanicals.
- **Cards:** ivory/near-white, square-ish corners (2px), hairline `#D8D3C6` border, very soft shadow. On dark: glass — `rgba(246,244,238,.06)` bg, `.14` border, 14px blur, 6px radius.
- **Corner radii:** tight — 0–2px editorial, 6px glass cards, pill only for seals/icon rings/eyebrow chips.
- **Icons:** thin-stroke line icons inside 1px circles ("icon-in-ring"), gold on dark, forest/olive on light.
- **Seal:** circular "NATURE · SCIENCE · WELLNESS" text ring around the F mark; gold "LAB-VERIFIED" variant.
- **Imagery:** warm, natural light, cream/green palette; moody deep-green product shots for dark sections (see `assets/photo-hero-dark.jpeg`). No cool/blue tones, no b&w.
- **Motion:** staggered fade-up reveals (700ms, ease-out), gentle parallax, ambient particle/mycelium layer on dark heroes. Hover: gold underline growth, slight lift (shadow-lift), background tint shift; press: 1px translate-down, no shrink-scale. Respect reduced motion.
- **Layout:** 1200px content max; 720px reading measure; generous 96px section rhythm; centered editorial compositions or 60/40 photo-panel splits.
- **Logo rules:** locked image, never redrawn or recoloured. Dark-on-light; on dark backgrounds it sits on a cream card/tile. `assets/logo-full.png` (transparent).

## ICONOGRAPHY
- Style: 1.5px-stroke line icons, usually inside a 1px circle ring (32–56px). Colors: gold `#C8A24A` on dark, forest/olive on light. Five brand benefit icons: Natural (leaf), Science (flask), Immunity (shield+), Energy (bolt), Wellness (heart).
- No icon font or SVG set was provided. **Substitution: use Lucide (CDN, 1.5px stroke)** — closest match to the creatives' thin-line style. Flagged: ask client for original icon SVGs (`~/Farmologic/04-icons/`).
- Never emoji. Unicode used sparingly as separators only: thin vertical bar `|` in benefit triads, middot `·` in seals.

## Index
- `styles.css` → `tokens/` (colors, typography, spacing, effects, fonts)
- `assets/` — logo-full.png (transparent, locked), brand-sheet.jpeg, photo-hero-dark.jpeg, photo-editorial-{infographic,quality}.jpeg, photo-collateral-kit.jpeg, photo-lifestyle-banner.jpeg
- `guidelines/` — foundation specimen cards (Design System tab)
- `components/core/` — Button, Input, Select, Textarea, Badge, SectionLabel, GoldRule, Card, GlassCard, Seal, SpecReadout, Stat, ProductCard, CTABand (see each `*.prompt.md`)
- `ui_kits/website/` — farmologic.com home page recreation-by-brief (no existing site: this is the reference build of the agreed direction)
- `SKILL.md` — agent skill entry point

**Intentional additions** (no component source existed; authored from the creatives + brief): the component set above is derived from devices visible in the creatives (seal, icon-ring, benefit triads, gold rules, glass cards) plus the forms the B2B site needs (enquiry inputs, CTA band).

**Caveats:** no separate mark-only/favicon logo files attached (only full lockup); no original icon SVGs; the website is a new build (no existing site to recreate) — the UI kit implements the brief's agreed direction.
