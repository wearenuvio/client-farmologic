# Schema.org Audit — farmologic.io

Source checked directly against repo: `/Users/4bhinav/devroar/client-farmologic/site/*.html`
Pages: `index.html` (/), `about.html` (/about), `learn.html` (/learn), `manifesto.html` (/manifesto), `standard.html` (/standard)

**Category score: 58 / 100**

Rationale: the one JSON-LD block that exists is technically clean and correctly scoped (no syntax errors, no deprecated types, absolute URLs, proper `@id` linking). But structured data lives on only 1 of 5 pages — the other four (80% of the site) carry zero JSON-LD, including a founder bio page with strong E-E-A-T content and three pages that already render a visible breadcrumb trail in HTML with no matching `BreadcrumbList`. The score reflects solid execution on a narrow footprint rather than any broken markup.

---

## 1. Detection results

| Page | JSON-LD blocks | Types found |
|---|---|---|
| `/` (index.html) | 1 (3,139 bytes) | `Organization`, `WebSite`, `FAQPage` (in one `@graph`) |
| `/about` | 0 | — |
| `/learn` | 0 | — |
| `/manifesto` | 0 | — |
| `/standard` | 0 | — |

No Microdata or RDFa detected on any page. `@context` is `https://schema.org` (correct, HTTPS). All URLs inside the existing block are absolute.

---

## 2. Validation of the existing block (homepage)

**Verdict: valid, no blocking errors.**

| Node | Check | Result |
|---|---|---|
| `Organization` | `@id`, `name`, `url`, `logo`, `description`, `address` (PostalAddress), `email`, `contactPoint` all present and correctly typed | Pass |
| `Organization.logo` | Absolute URL to `assets/img/logo-full.png`, confirmed 500×500 px (square, well above Google's 112×112 minimum) | Pass |
| `ContactPoint` | `contactType: "sales"` is a valid enum value; `areaServed: "IN"` and `availableLanguage: ["en"]` correctly typed as Text | Pass |
| `WebSite` | `@id`, `url`, `name`, `publisher` (correctly references `Organization` via `@id`) | Pass — no `potentialAction`/`SearchAction` needed since the site has no internal search box |
| `FAQPage` | 6 `Question`/`Answer` pairs, each with `acceptedAnswer.text` as plain text, no HTML, no duplicate questions | Structurally valid |

**Gaps (not errors, but recommended additions to the existing block):**
- `Organization` has no `founder` property, despite `/about` carrying a full founder bio (Mandeep Mahadevaiah) with a dedicated portrait image. This is a real entity/E-E-A-T opportunity — see §4.
- No `sameAs` — expected, since no social profiles were found linked anywhere in the site (checked all five pages for `linkedin.com`, `twitter.com`/`x.com`, `instagram.com`, `facebook.com` — none present). Not a defect; add `sameAs` once official social profiles exist.

### Finding: FAQPage present — Info

- **Severity: Info**
- Google retired FAQ rich results for all sites on **May 7, 2026**, so this block no longer produces a SERP feature (rich snippet/expandable FAQ) regardless of correctness.
- **Do not remove it.** The markup itself is valid, and any AI/GEO-assistant citation benefit from having clean Q&A structured data is plausible but **unconfirmed** — do not represent it as a guaranteed benefit when reporting this to stakeholders.
- No action required beyond awareness. If new FAQ content is added later, do **not** add it expecting a Google SERP feature; if the goal is a genuine user-question format instead (e.g., a support/Q&A page where visitors post questions), use `QAPage`, not `FAQPage`.

---

## 3. Missing schema opportunities (severity: Warning unless noted)

1. **`/about` — zero JSON-LD** (Warning). This page has the strongest entity signal on the site (founder name, credentials, portrait, bio) and nothing captures it in structured data. Recommend `Organization` (matching homepage `@id`) + `Person` (founder) + `AboutPage` + `BreadcrumbList`.
2. **`/learn` — zero JSON-LD** (Warning). Long-form educational content for formulators (cordycepin, indoor cultivation, reading a COA) with no `Article`/`WebPage` or `BreadcrumbList` markup.
3. **`/manifesto` — zero JSON-LD** (Warning). Page is already marked `og:type: article` in its Open Graph tags but carries no matching `Article` JSON-LD, and no `BreadcrumbList`.
4. **`/standard` — zero JSON-LD** (Warning). The quality-standard/specification page has no `WebPage` or `BreadcrumbList` markup.
5. **`BreadcrumbList` missing sitewide** (Warning). All four subpages already render a visible breadcrumb trail in HTML (e.g. `<p class="breadcrumb">Farmologic / About</p>`) — there is no matching `BreadcrumbList` JSON-LD anywhere on the site, so Google can't associate that visible hierarchy with structured data (breadcrumb rich result in search snippets, plus clearer site-hierarchy signal for crawling).
6. **`founder` / `Person` entity missing** (Warning). Mandeep Mahadevaiah is named as founder on `/about` (with portrait image `assets/img/founder-portrait.jpg`, 1000×1250 px) and referenced again on `/manifesto`, but no `Person` entity exists anywhere in structured data.
7. **No `Product`/`Offer` schema — correctly absent, recommend against adding it** (Info, guidance only). Farmologic sells Cordyceps militaris B2B against a written spec with pricing explicitly "on request" (confirmed in the homepage FAQ). `Offer` requires a `price`/`priceCurrency` (or a valid `priceSpecification`) to validate cleanly for Google's Product structured data — forcing one in here without real pricing risks Search Console errors or a misleading rich result. Do not add Product/Offer schema until there is a public, quotable price or a defined `priceSpecification` model the business is comfortable publishing.
8. **No `HowTo` on the `/learn` numbered "how to read a COA" steps — correctly absent.** The page has a 6-step numbered list that could tempt a `HowToStep` markup; this is deprecated (removed from Google rich results September 2023) and must not be added. Leave it as plain `Article` body content (see §4).

---

## 4. Recommended JSON-LD (ready to paste)

All blocks use `https://schema.org`, absolute URLs, ISO 8601 dates, and consistent `@id`s so the `Organization` and `Person` nodes are recognizable as the same entities across pages.

**Note on dates:** `datePublished`/`dateModified` below use each file's first-commit date in this repo (`about.html`, `learn.html`, `standard.html`, `index.html` = `2026-08-04`; `manifesto.html` = `2026-08-20`) as a working value so the JSON is not left with placeholder brackets. **Confirm these against the actual public-launch/editorial dates before shipping** — swap in the real dates if they differ from the repo history.

### 4.1 Homepage (`/`) — add `founder` to the existing `Organization` node

Merge this property into the existing `Organization` object in `index.html` (do not create a second script block):

```json
"founder": {
  "@type": "Person",
  "@id": "https://www.farmologic.io/about#founder",
  "name": "Mandeep Mahadevaiah",
  "jobTitle": "Founder",
  "image": "https://www.farmologic.io/assets/img/founder-portrait.jpg",
  "url": "https://www.farmologic.io/about"
}
```

### 4.2 `/about` — new `<script type="application/ld+json">` block

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.farmologic.io/#org",
      "name": "Farmologic",
      "url": "https://www.farmologic.io/",
      "logo": "https://www.farmologic.io/assets/img/logo-full.png",
      "founder": { "@id": "https://www.farmologic.io/about#founder" }
    },
    {
      "@type": "Person",
      "@id": "https://www.farmologic.io/about#founder",
      "name": "Mandeep Mahadevaiah",
      "jobTitle": "Founder",
      "worksFor": { "@id": "https://www.farmologic.io/#org" },
      "image": "https://www.farmologic.io/assets/img/founder-portrait.jpg",
      "url": "https://www.farmologic.io/about",
      "description": "Founder of Farmologic. Comes from a multi-generational farming family and holds an MS in Psychology and an MA in Political Science."
    },
    {
      "@type": "AboutPage",
      "@id": "https://www.farmologic.io/about#webpage",
      "url": "https://www.farmologic.io/about",
      "name": "About Farmologic: science-backed ingredients, starting with Cordyceps militaris",
      "description": "Farmologic is farm and logic: science-backed ingredients for the next generation of wellness, starting with Cordyceps militaris, cultivated under controlled indoor conditions in Bengaluru.",
      "isPartOf": { "@id": "https://www.farmologic.io/#site" },
      "mainEntity": { "@id": "https://www.farmologic.io/#org" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Farmologic", "item": "https://www.farmologic.io/" },
        { "@type": "ListItem", "position": 2, "name": "About" }
      ]
    }
  ]
}
```

### 4.3 `/learn` — new `<script type="application/ld+json">` block

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.farmologic.io/learn#article",
      "headline": "Learn: cordycepin, cultivation and reading a COA",
      "description": "Practical notes for formulators and buyers evaluating Cordyceps militaris: what cordycepin is, why indoor cultivation matters, and how to read a certificate of analysis.",
      "image": "https://www.farmologic.io/assets/img/militaris-vs-sinensis.jpeg",
      "author": { "@id": "https://www.farmologic.io/#org" },
      "publisher": { "@id": "https://www.farmologic.io/#org" },
      "datePublished": "2026-08-04",
      "dateModified": "2026-08-04",
      "mainEntityOfPage": "https://www.farmologic.io/learn",
      "isPartOf": { "@id": "https://www.farmologic.io/#site" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Farmologic", "item": "https://www.farmologic.io/" },
        { "@type": "ListItem", "position": 2, "name": "Learn" }
      ]
    }
  ]
}
```

Note: the 6-item "how to read a COA" numbered list on this page should stay as `Article` body content — do not wrap it in `HowTo`/`HowToStep` (deprecated).

### 4.4 `/manifesto` — new `<script type="application/ld+json">` block

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://www.farmologic.io/manifesto#article",
      "headline": "Nothing to hide",
      "description": "Farmologic, founded by Mandeep Mahadevaiah, on measurement, declaration and the things that hold true across every product we put our name to. Eight commitments, written before the first harvest.",
      "image": "https://www.farmologic.io/assets/img/harvest-in-hand.jpeg",
      "author": { "@id": "https://www.farmologic.io/about#founder" },
      "publisher": { "@id": "https://www.farmologic.io/#org" },
      "datePublished": "2026-08-20",
      "dateModified": "2026-08-20",
      "mainEntityOfPage": "https://www.farmologic.io/manifesto",
      "isPartOf": { "@id": "https://www.farmologic.io/#site" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Farmologic", "item": "https://www.farmologic.io/" },
        { "@type": "ListItem", "position": 2, "name": "Manifesto" }
      ]
    }
  ]
}
```

### 4.5 `/standard` — new `<script type="application/ld+json">` block

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.farmologic.io/standard#webpage",
      "url": "https://www.farmologic.io/standard",
      "name": "The Farmologic Standard: how material is grown and verified",
      "description": "The Farmologic Standard: the five-stage quality journey, the four obligations and the specification we grow to. Written before the first harvest, so it can be checked.",
      "isPartOf": { "@id": "https://www.farmologic.io/#site" },
      "about": { "@id": "https://www.farmologic.io/#org" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Farmologic", "item": "https://www.farmologic.io/" },
        { "@type": "ListItem", "position": 2, "name": "The Standard" }
      ]
    }
  ]
}
```

Deliberately not recommended for this page: `Product`/`Offer` (no public price — see §3.7).

---

## 5. Summary of findings by severity

| Severity | Finding |
|---|---|
| Warning | `/about` has zero JSON-LD despite carrying the site's strongest entity/founder content |
| Warning | `/learn` has zero JSON-LD |
| Warning | `/manifesto` has zero JSON-LD (despite `og:type: article`) |
| Warning | `/standard` has zero JSON-LD |
| Warning | No `BreadcrumbList` anywhere, despite visible breadcrumb UI on 4 of 5 pages |
| Warning | No `Person`/`founder` entity anywhere, despite a fully documented founder bio |
| Info | `FAQPage` present on homepage — valid, but Google retired FAQ rich results for all sites (May 7, 2026); keep it, no SERP benefit, do not remove, AI/GEO benefit unconfirmed |
| Info | No `sameAs` — no social profiles found linked on the site; add once official profiles exist |
| Info | `Product`/`Offer` correctly absent given "price on request" B2B model — do not add without a public price |
| Info | `HowTo` correctly absent from the `/learn` numbered COA-reading steps — keep it that way (deprecated Sept 2023) |
| Pass | Existing homepage `Organization` + `WebSite` + `FAQPage` block: valid `@context`, no deprecated types, all required properties present, absolute URLs, no placeholder text |
