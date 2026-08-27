# Search Experience Optimization (SXO) Audit — farmologic.io

**Site:** https://www.farmologic.io (5 pages: `/`, `/about`, `/learn`, `/manifesto`, `/standard`)
**Business:** B2B ingredient supplier — indoor-cultivated Cordyceps militaris, Bengaluru, India. No products/ pricing/ cart pages; contact form (`#enquiry`) is the only conversion point.
**Method:** Live pages fetched via `render_page.py --mode auto` (confirmed byte-identical to `site/*.html` in repo — static HTML, no JS-dependent content), parsed via `parse_html.py`, cross-referenced against live Google SERPs for six target queries.

**SXO Gap Score: 34 / 100** (this is a distinct metric from the SEO Health Score — it measures how well the page *experience* matches what Google currently rewards for the site's real buyer queries, not crawlability/indexation)

---

## Lead Finding: Page-Type Mismatch (CRITICAL)

Farmologic's entire site is built as a **Brand/Manifesto + Service-Hybrid** page type (hero narrative → quality-journey story → FAQ → single "Register interest" form, repeated across all five pages). This is a coherent, well-written trust-building format for **branded/navigational** searches (e.g., "Farmologic"), but four of the six commercial and informational queries this business should win are dominated by SERP page types the site does not offer at all: **Product/Directory-listing pages** (with MOQ, price-on-request, certifications) and **Comparison pages** (vs-tables). The site's strongest asset — the /standard specification table and /learn COA-literacy content — is real and well-matched to two of the six queries, but it is wrapped in poetic, non-scannable prose ("Five stages. No skipped steps.") rather than the scan-first, data-first format the SERP rewards.

---

## SERP-Backwards Analysis: Query-by-Query

| Query | SERP-dominant page type | What ranks | Farmologic's actual page type | Mismatch severity |
|---|---|---|---|---|
| **cordyceps militaris supplier india** | Product/Directory listing (B2B marketplace) | IndiaMART, TradeIndia, ExportersIndia category pages; individual supplier profile pages with "Get Best Price," MOQ, city, certifications | Brand homepage — no MOQ, no price band, no directory-style profile, no city-level NAP on-page | **CRITICAL** |
| **cordyceps militaris manufacturer** | Mixed: listicle/roundup articles ranking manufacturers + supplier profile pages | Azoth Biotech (explicitly cites dual FSSAI + AYUSH approval), Rejoice Life Ingredients, Himadri Bio Tech — all lead with certifications and capacity claims | No dedicated manufacturer/capability page; certifications are stated as "under way" in an FAQ answer, not showcased | **HIGH** |
| **cordycepin content (cordyceps militaris)** | Scientific/technical Blog/Article (NCBI, ResearchGate, academic journals) with numeric data tables and methodology | Papers citing specific mg/100g cordycepin figures, extraction/culture-condition comparisons | Home FAQ answer is deliberately non-numeric ("We grow to a target and will confirm it by HPLC"); /learn section "What cordycepin actually is" (767-word page total) has no data table, no citations | **HIGH** |
| **how to read a COA cordyceps** | Blog Post / checklist (acslab.com, nutricel, mycogenius buying guide) | Structured how-to: potency, heavy metals, microbials, lot number, ISO/IEC 17025 lab accreditation | /learn page **structurally matches** — literal H2 "How to read a cordyceps COA" with H3s "Whose laboratory?", "Which batch, which date?", "Safety panel complete?" | **MEDIUM** (best-aligned page-type match on the site, but missing schema, byline/date, and a sample COA visual) |
| **cordyceps militaris vs sinensis** | Comparison Page (vs-table format) — realmushrooms, mycogenius, hifasdaterra, nutripartners "formulator's analysis" | Origin, cost, cordycepin vs. polysaccharide profile, side-by-side tables | No comparison page exists. Only signal is an image filename (`militaris-vs-sinensis.jpeg`) on /learn — no H2, no table, no verdict | **CRITICAL** |
| **bulk cordyceps militaris extract** | Product Page — bulk suppliers with %polysaccharide standardization, pack size, buy/quote CTA | ingredientsonline.com, biosaninternational.com, mushrooms-extract.com | Site sells whole fruiting-body powder per /standard spec, not a standardized extract; no /products page, no % standardization stated, no format options | **CRITICAL** (compound page-type gap + possible product-form gap — worth validating with the business whether an extract SKU is even planned) |

**SERP consensus:** 4 of 6 target queries reward Product/Directory or Comparison page types (0% present on site); 2 of 6 reward deep technical Blog content (partially present but thin and non-numeric). Dominant SERP type across the query set: **Product/Directory-listing (~50%)**, confidence: high (consistent across supplier, manufacturer, and bulk-extract queries).

---

## User Stories (derived from SERP signals)

1. **As a procurement buyer** comparing Indian suppliers, I want to see price band, MOQ, and certifications on one page, because I need to shortlist 3–5 vendors before a call, **but I'm blocked by** the site's "price on request... we quote to what you actually need" framing, which reads as evasive next to competitor listings that show "Get Best Price" and stated capacity.
   *(Source: dominant Product/Directory format on "supplier india" and "manufacturer" SERPs)*

2. **As a formulator** deciding between militaris and sinensis for a label claim, I want a side-by-side comparison of cordycepin vs. polysaccharide profile and cost, because my brief requires a defensible ingredient choice, **but I'm blocked by** the total absence of a comparison page or table — only an image filename hints the topic was ever considered.
   *(Source: "vs" comparison-page dominance in "cordyceps militaris vs sinensis" SERP)*

3. **As a skeptical QA lead** vetting a new raw-material vendor, I want to know which lab tests the batch and whether it's ISO/IEC 17025-accredited, because unverifiable COAs are a compliance risk, **but I'm blocked by** /learn asking the right questions ("Whose laboratory?") without answering them — no named lab, no sample certificate shown.
   *(Source: "how to read a COA" SERP requires lab-accreditation disclosure as the top trust signal)*

4. **As a contract manufacturer** evaluating capacity for a private-label run, I want batch documentation (MSDS, allergen/non-GMO statements, spec sheet) available before I request a sample, because time-to-decision matters, **but I'm blocked by** these being *promised* in the /standard spec table's "Documentation" row rather than downloadable now, and by a single generic "Register interest" CTA instead of a "Request specification sheet" action.
   *(Source: /standard spec table row "Documentation... issued with the first batch"; competitor manufacturer pages lead with stated capacity/certifications)*

5. **As a technical evaluator researching cordycepin dosage/potency** (awareness stage), I want a concrete number or range, because I'm scoping whether this ingredient fits my formulation's actives budget, **but I'm blocked by** the site's answer being intentionally non-numeric pending batch testing, while every competing SERP result (NCBI, ResearchGate) leads with specific mg/100g figures.
   *(Source: numeric-data-table format dominating "cordycepin content" SERP)*

Journey stages covered: awareness (#5), consideration (#2, #3), decision (#1, #4).

---

## Persona Scoring

| Persona | Relevance /25 | Clarity /25 | Trust /25 | Action /25 | Total /100 | Rating |
|---|---|---|---|---|---|---|
| **Procurement Buyer** | 8 | 14 | 12 | 8 | **42** | Needs Work |
| **Formulator** | 14 | 10 | 12 | 10 | **46** | Needs Work |
| **Contract Manufacturer** | 20 | 12 | 14 | 15 | **61** | Good |
| **Skeptical QA Lead** | 22 | 20 | 12 | 10 | **64** | Good |

### Weakest Persona: Procurement Buyer (42/100)
**Top issue:** No price band, MOQ, lead time, or displayed certification anywhere on the site — every competing SERP result for "supplier india" / "manufacturer" leads with exactly these. The "price on request... quote to what you actually need" copy (homepage FAQ) is honest brand voice but reads as a stall to a buyer comparing five tabs of IndiaMART listings.
**Recommended fix:** Add an indicative pricing/MOQ range or tier structure (even "Under 25kg / 25–100kg / 100kg+" bands) to /standard, and surface "Certifications: applications under way — FSSAI [status], AYUSH [status]" explicitly rather than only in a buried FAQ accordion answer.

### Second Weakest: Formulator (46/100)
**Top issue:** No numeric cordycepin content, extraction ratio, or standardization data anywhere on the site — the one place the topic is addressed (home FAQ, /learn) explicitly avoids stating a number.
**Recommended fix:** Publish a real or provisional cordycepin range (mg/100g) with the testing method (HPLC) on /learn, plus a militaris-vs-sinensis comparison table with cited compound profiles.

### Systemic Issues (across all four personas)
- **Action dimension** is the lowest-scoring dimension site-wide (avg. 10.75/25): every page funnels to the same generic "Register interest" button regardless of persona or intent, even where the copy explicitly promises a differentiated path (/about: "Enquiries, specifications, samples and facility visits all start in the same place. One form, one working day.")
- **Trust dimension** is capped by the honest-but-unresolved "certifications under way" and "pre-harvest" framing — good E-E-A-T tone, but no named lab, no third-party badge, no client/brand reference anywhere on the site.

### Priority Actions
1. Split the single enquiry form into persona-routed CTAs: "Request a quote" (procurement), "Request a sample COA" (QA lead), "Request the spec sheet" (contract manufacturer) — reusing the existing `/api/enquiry` endpoint with a `reason` field.
2. Add a numeric cordycepin range + HPLC methodology note and a militaris-vs-sinensis comparison table to /learn — this single addition would close two of the six CRITICAL/HIGH query mismatches.
3. Surface certification status and indicative pricing/MOQ bands on /standard rather than leaving them to a single FAQ accordion answer on the homepage.

---

## Gap Analysis (7 dimensions, contributing to the 34/100 SXO Gap Score)

| Dimension | Score | Evidence |
|---|---|---|
| Page Type | 4/15 | 4 of 6 target queries reward Product/Directory or Comparison formats; 0% present on site |
| Content Depth | 6/15 | /learn covers 3 topics (cordycepin, indoor-vs-wild, COA reading) in 767 words combined; no data tables, no citations vs. NCBI/ResearchGate-style competitors |
| UX Signals | 6/15 | One repeated generic CTA ("Register interest") site-wide; no sample COA, no downloadable spec PDF, no quote calculator |
| Schema | 4/15 | Only homepage carries schema (Organization/WebSite/FAQPage); /about, /learn, /manifesto, /standard have none — full detail in `findings/schema.md` |
| Media | 7/15 | Authentic jar/harvest/clean-room photography present; no video, no lab/chromatogram imagery, no sample-COA image, no facility certification badges |
| Authority | 4/15 | No third-party certification badges, no client/brand logos, no case studies, no press; founder is named with photo (/about) which is a genuine E-E-A-T positive, but not extended to /learn or /manifesto with bylines/dates |
| Freshness | 3/10 | No visible "last updated" date on /learn or /manifesto content, despite recent site edits (HTTP Last-Modified: 22 Aug 2026) |

**Total: 34/100**

---

## Where Brand-Forward Structure Fails Commercial Intent

The manifesto-heavy voice ("Nothing to hide," "Eight commitments," "Watched as it grows") is a genuine differentiator for **trust-building on the homepage and for branded search** — it is not, on its own, a liability. The failure mode is that this same narrative register is applied to pages that should instead behave like **reference/spec/comparison documents**:

- /standard wraps a genuinely good spec table (botanical name, part used, cultivation, allergens, documentation) inside "Five stages. No skipped steps." journey copy. A procurement buyer or contract manufacturer scanning for MOQ/lead time/certifications has to read narrative prose to reach the one table that matters.
- /learn asks the right QA-lead questions ("Whose laboratory? Which batch, which date?") but answers none of them with a name, accreditation, or sample image — it reads as a set of questions the *site* wants the buyer to ask Farmologic directly, not a self-serve answer page, which is a reasonable design choice for a pre-harvest company but currently invisible as a stated CTA.
- /manifesto (1020 words, 8 commitments) has no query in the target set that rewards this format — it serves brand/trust for someone already on the site, not someone arriving from a commercial or comparison SERP.

## Missing Page Types Worth Building

1. **Comparison page** (`/learn/militaris-vs-sinensis` or a new H2 section) — directly addresses a CRITICAL mismatch with a table: origin, cultivation method, cordycepin vs. polysaccharide profile, cost basis, "which to choose for X use case."
2. **Manufacturer/capability page** — capacity, batch size, lead time, certification status stated plainly (not narrative), consolidating what's currently split across /about's "trade desk" line and /standard's documentation row.
3. **Sample COA / downloadable spec sheet** (even a redacted/sample PDF) — resolves the QA-lead persona's Trust and Action gaps simultaneously; this is the single highest-leverage asset given /learn's content is otherwise well-aligned to this query.
4. **Data-backed cordycepin content page** — a real or provisional numeric range with HPLC methodology, positioned as a citable technical reference (candidate for Article/ScholarlyArticle-style schema — coordinate with `/seo schema`).

## Cross-Skill Recommendations

- E-E-A-T gaps (no named lab, no third-party certification badges, no case studies) → recommend `/seo content` for deep E-E-A-T analysis.
- Schema absent on 4 of 5 pages → recommend `/seo schema` for generation (full technical detail already captured in `findings/schema.md` by the schema audit agent; not duplicated here).
- Thin, non-numeric content on /learn relative to competing technical sources → recommend `/seo page` for a page-level content audit of /learn specifically.
- No local-pack or "near me" signal observed in the "supplier india" SERP (it is dominated by marketplace listings, not a local pack) → local optimization is lower priority than commercial page-type fixes; `/seo local` not currently recommended as a priority.

## Limitations

- SERP analysis used WebSearch result snippets and AI-generated summaries, not a live rendered Google SERP screenshot — PAA box content, ad density, and featured-snippet formatting were inferred from result composition and summary framing, not directly observed. Treat "dominant page type" classifications as directionally reliable, not pixel-verified.
- No access to Google Search Console or analytics for farmologic.io, so actual current rankings, impressions, and click-through for these six queries could not be confirmed — this audit assesses potential/opportunity, not current position.
- Schema/structured-data technical detail intentionally not re-derived here per coordinator instruction; see `findings/schema.md` for the full JSON-LD audit.
- Only the five listed pages were assessed; no crawl of assets/sitemap for additional undiscovered URLs was performed.
- Business-model note: two CRITICAL mismatches ("bulk cordyceps militaris extract," and partially "supplier india"/"manufacturer") may reflect a genuine product-form gap (whole fruiting body vs. standardized extract) rather than a pure content/SEO gap — recommend confirming with the business whether an extract SKU is planned before building a page that can't be fulfilled.

---

Generate a PDF report? Use `/seo google report`
