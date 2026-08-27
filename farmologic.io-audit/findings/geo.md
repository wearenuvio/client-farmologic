# GEO / AI Search Readiness — farmologic.io

Scope: `site/*.html` (index, standard, manifesto, learn, about, 404), `site/robots.txt`,
`site/sitemap.xml`. Live checks against `https://www.farmologic.io/` on 2026-08-25
(curl with `-A GPTBot`, plus robots.txt / llms.txt status codes) confirm the repo
matches production. Method: static inspection of markup and JSON-LD — no rendering
divergence to check, since the site is server-rendered static HTML with no SPA shell.

Context that shapes every score below: Farmologic is a pre-harvest, pre-revenue
Bengaluru brand with essentially zero external footprint (no Wikipedia entity, no
Reddit threads, no YouTube, no LinkedIn company page found linked anywhere in the
site). Brand-mention correlation with AI citation (YouTube ~0.737, Wikipedia and
Reddit "high") is the single biggest lever GEO work *cannot* pull for this site yet —
on-page optimization can make Farmologic maximally citable the day a crawler or model
does encounter it, but it cannot manufacture the external corroboration that platforms
weight most heavily. This audit does not promise citations; it identifies what's
blocking or enabling them.

## What works

- **Crawler access is clean.** `robots.txt` is `User-agent: * / Allow: /` plus a
  sitemap line. No disallow rules anywhere. GPTBot, OAI-SearchBot, ClaudeBot and
  PerplexityBot are all implicitly allowed; nothing blocks CCBot/anthropic-ai/cohere-ai
  either (not a defect — the brief lists those as *optional* to block, not required).
- **No JS-rendering barrier.** Confirmed live: `curl -A GPTBot https://www.farmologic.io/`
  returns full HTML with title, meta description and body content in the raw response.
  Every page in `site/*.html` is static markup; no SPA shell, no client-side content
  injection to defeat a non-JS crawler.
- **Sitemap is valid and complete.** `site/sitemap.xml` lists all five indexable URLs
  with sensible priority/changefreq. No orphaned or missing pages.
- **Homepage carries real structured data.** Organization + WebSite + FAQPage JSON-LD
  (`site/index.html:31-79`). The FAQPage entries are genuine self-contained Q&A pairs —
  40-90 words each, direct answer in the first sentence, e.g. "Fruiting body only.
  Farmologic does not supply mycelium-on-grain material, and the specification states
  the part used so your label claim can be accurate." That is close to the shape AI
  Overviews and chat answers actually lift.
- **Entity disambiguation on the core confusion point is unusually good.**
  `site/learn.html:78` states plainly: "*Cordyceps militaris* — the orange, cultivated
  species — produces cordycepin in its fruiting body... *Ophiocordyceps sinensis*, the
  wild Himalayan species, is harder to source." This is exactly the kind of explicit
  species disambiguation that lets a model answer "is Farmologic's cordyceps the same
  as the Himalayan one" correctly instead of conflating militaris/sinensis, which is a
  common error in general web content on this topic.
- **Founder identity is named and detailed**, not hidden behind "our team": Mandeep
  Mahadevaiah, credentials (MS Psychology, MA Political Science), personal narrative on
  `about.html` and `manifesto.html`. Good raw material for E-E-A-T; not yet
  machine-readable (see Finding 2).
- **`llms.txt` absence is correctly a non-issue, not a violation.** It 404s at
  `https://www.farmologic.io/llms.txt`. There is no ratified standard here — no major
  AI crawler is confirmed to fetch or honor it, and Google has stated Search does not
  use it. Treat this as optional and cheap, not as a compliance gap; it is listed as
  Low severity below for that reason.

## Findings

### 1. Structured data exists on one page out of five (High)

**Evidence:** `grep -c 'application/ld+json'` returns `0` on `about.html`,
`manifesto.html`, `standard.html`, `learn.html`, `404.html`. Only `index.html` carries
Organization/WebSite/FAQPage JSON-LD.

**Why it matters:** `learn.html` and `standard.html` are the two pages with the most
extractable, factual, non-promotional content on the site (cordycepin chemistry, the
militaris/sinensis distinction, the specification table, the COA-reading checklist) —
exactly the material an AI answer engine would want to lift. None of it is wrapped in
schema that tells a crawler "this is a definitional answer" or "this is a
specification." The spec table on `standard.html:190-208` is a strong candidate for
`Product`/`additionalProperty` markup (deferred appropriately, since price/certs are
"on request" — a partial `Product` with `offers.availability` as pre-order-equivalent
is defensible once the first batch specification is issued). The COA checklist and
cordycepin/indoor-vs-wild sections on `learn.html` are strong `FAQPage` or
`Article`+`DefinedTerm` candidates.

**Recommendation:** Add `Article` schema (with `author`, `datePublished`,
`dateModified` — see Finding 4) to `learn.html`, `standard.html`, `manifesto.html`,
`about.html`. Convert the "Three questions for any supplier" and COA checklist on
`learn.html` into a second `FAQPage` block. Add `BreadcrumbList` schema everywhere —
the visual breadcrumb ("Farmologic / Learn") already exists in markup on every
subpage but isn't in JSON-LD.

**Effort:** Low — templating change, no new content required, ld+json blocks already
exist as a pattern to copy from `index.html`.

### 2. No entity corroboration outside the site (High)

**Evidence:** `grep -rn "sameAs\|linkedin\|youtube\|wikipedia\|instagram"
site/*.html` returns nothing. The Organization node in `index.html`'s JSON-LD has no
`sameAs` array. No external link anywhere on the site points to a LinkedIn company
page, Crunchbase profile, industry directory, or any third-party listing.

**Why it matters:** This is the dimension the brief flags as weighing most on AI
citation likelihood — Wikipedia/Reddit/YouTube presence correlates far more strongly
with being cited than on-page optimization or Domain Rating (~0.266, "weak"). A brand
with zero `sameAs` targets and zero external mentions gives a knowledge graph nothing
to disambiguate "Farmologic" against (there is at least one unrelated "Farmologic"-ish
name collision risk in agtech naming conventions generally — worth a defensive check).
On-page schema alone cannot fix this; it can only make sure that when an external
profile *does* exist, it's linked bidirectionally.

**Recommendation:** (a) Add `sameAs` to the Organization JSON-LD the moment any of the
following exist: LinkedIn company page, Crunchbase/Tracxn listing, industry
association membership (AYUSH/nutraceutical body), YouTube channel. (b) Prioritize
creating a LinkedIn company page and a founder LinkedIn profile referencing the company
by name — LinkedIn presence is cheap to establish and directly addressable via
`sameAs`. (c) Consider a short founder-narrated video (even a static-site-hosted
one) for YouTube, given it's the single strongest correlate in the brief's table. This
is a business-development action, not a code change, but it's the highest-leverage
single thing not currently blocked by the codebase.

**Effort:** Medium — schema change is trivial once profiles exist; creating the
profiles themselves is outside this repo's scope but should be flagged to the client
as the top non-technical priority.

### 3. No dates anywhere — no freshness signal for any page (Medium)

**Evidence:** `grep -rn "datePublished\|dateModified\|<time"` across all HTML returns
zero matches. No visible "last updated" text, no `<time>` element, no date in any
JSON-LD (the only JSON-LD present, on `index.html`, has no `datePublished`/
`dateModified` on any node).

**Why it matters:** AI answer engines use recency as a ranking/trust signal, especially
for a claim-heavy, pre-harvest brand whose factual status ("first cultivation is under
way," "certification applications are under way") is explicitly time-sensitive per the
site's own copy. Without a machine-readable date, a crawler has no way to know whether
"Farmologic is pre-harvest" was true yesterday or two years ago — which actively works
against the brand's own "we say plainly where we are" positioning once the facility
moves past pre-harvest and old cached claims linger uncorrected in any index.

**Recommendation:** Add `dateModified` to the Organization/WebSite JSON-LD and to new
`Article` schema per Finding 1, tied to real content-change dates. Add a visible
"Updated [date]" line near the "Where we are today" callouts on `index.html` and
`standard.html` — this is the kind of content that will factually change (pre-harvest
→ first batch shipped) and should carry a date so both AI systems and human buyers can
tell how current the claim is.

**Effort:** Low — one field per page plus a build-time or manual date stamp.

### 4. Body prose is fragmented below the optimal citation length (Medium)

**Evidence:** Sampled paragraphs from `learn.html`'s cordycepin and indoor-cultivation
sections — the two most fact-dense, non-promotional passages on the site — run 24, 66,
34, 24, 38 and 48 words each. None reach the 134-167 word range the brief identifies
as optimal for a single self-contained AI-citable passage; most are well under half of
it.

**Why it matters:** Short, punchy paragraphs are good for human scanning and match the
site's editorial voice, but a model extracting a citable answer block generally
prefers one paragraph that fully answers a question, not three or four disconnected
sentences it has to stitch together (and risk losing attribution/context across). The
FAQ answers on the homepage already hit a good short-form target (40-90 words, single
self-contained block) — the gap is specifically in the longer-form `learn.html` /
`manifesto.html` prose, where a genuinely citable 150-word answer is currently spread
across 3-4 separate `<p>` tags.

**Recommendation:** For the highest-value definitional passages — "what is cordycepin,"
"militaris vs. sinensis," "how to read a COA" — merge the first 2-3 short paragraphs of
each section into one dense ~150-word paragraph that stands alone as a complete answer,
then keep any additional nuance in the shorter paragraphs that already follow. Don't
do this site-wide; it only matters for the sections you'd want a model to quote
directly.

**Effort:** Low-Medium — editorial pass, no code change.

### 5. Headings on manifesto.html are voice-driven, not query-matched (Low)

**Evidence:** `manifesto.html` headings: "It doesn't start on the farm," "Why wellness
is worse," "What this is," "What you can hold us to." Compare to `learn.html`, which
mixes better: "What cordycepin actually is," "How to read a cordyceps COA" (closer to
natural-language query shape).

**Why it matters:** Evocative brand-voice headlines are a legitimate editorial choice
for a manifesto page, and this audit isn't recommending Farmologic sound like a generic
FAQ generator. But manifesto content ("why wellness supplement labeling doesn't
guarantee anything you can verify," "why we publish commitments before harvest") is
genuinely answer-shaped content that a question-form heading would make easier for a
crawler to match to a query like "why don't wellness supplement labels mean anything"
— currently that answer exists but isn't signposted as answering it.

**Recommendation:** Where it doesn't cost the brand voice, pair the existing headline
with a smaller sub-label already used elsewhere on the site (the `fm-label` "eyebrow"
pattern is already in every section) phrased as the implicit question — e.g. keep "Why
wellness is worse" as the `<h2>` but make the `fm-label` above it something closer to
"Why supplement labels don't guarantee anything." This is already the site's own
pattern (see `standard.html`'s `fm-label` eyebrows), just not used for query-matching
here.

**Effort:** Low — copy tweak within existing template pattern, no structural change.

### 6. No external citations for the scientific claims underpinning "science-backed" (Low)

**Evidence:** `learn.html` correctly explains cordycepin's chemistry and testing
methodology (HPLC, ICP-MS) in detail, and the brand's tagline is "Nature. Science.
Wellness." — but no page links to a single external source (PubMed, a peer-reviewed
study, a pharmacopeial monograph) for any claim about cordycepin's structure or
significance.

**Why it matters:** This doesn't undermine the accuracy of what's written — the
chemistry described is correct — but a claim "backed by science" with zero citations
to the science is a weaker authority signal than the same claim with one or two
linked references. This is low severity because the site's actual strength is
procedural transparency (COA methodology, spec table) rather than scientific-literature
review, and overreaching into citation-heavy content that isn't the brand's expertise
would be a worse trade.

**Recommendation:** Add 1-2 references (e.g., a foundational cordycepin/HPLC
methodology paper) as plain links from the `learn.html` cordycepin section. Keep it
minimal — this page's authority comes from operational specificity, not literature
review, so don't over-invest here.

**Effort:** Low.

## AI Crawler Access Status

| Crawler | Status |
|---|---|
| GPTBot | Allowed (wildcard `Allow: /`, confirmed live via `curl -A GPTBot`) |
| OAI-SearchBot | Allowed (wildcard) |
| ClaudeBot | Allowed (wildcard) |
| PerplexityBot | Allowed (wildcard) |
| CCBot | Allowed (not blocked — optional per brief, not a defect) |
| anthropic-ai | Allowed (not blocked — optional per brief, not a defect) |
| cohere-ai | Allowed (not blocked — optional per brief, not a defect) |

## llms.txt Status

**Missing** (`https://www.farmologic.io/llms.txt` → 404). Treated as Low severity and
optional: there is no confirmed major AI crawler that fetches or prioritizes it, and
Google Search has stated it does not use it for Search or AI Overviews. If added, it
costs little and can't hurt — a short file pointing to `standard.html` (spec/testing
protocol) and `learn.html` (definitional content) as primary sources would be
reasonable — but it should not be sold internally as something that will move
citation odds meaningfully.

## Brand Mention Analysis

| Signal | Status |
|---|---|
| Wikipedia entity | None found. Expected for a pre-revenue company; not fixable via on-page work. |
| Reddit presence | None found in site content or linked; not verified externally beyond scope of this static audit. |
| YouTube | None. Highest-correlation signal in the brief's table (~0.737) and currently the single biggest gap. |
| LinkedIn | No company or founder page linked anywhere on the site. Cheapest of the four to establish. |
| sameAs in schema | Empty/absent — no bidirectional link exists even where a profile might. |

## Platform-Specific Notes

- **Google AI Overviews:** Technical foundation (crawlability, FAQPage schema, clean
  robots.txt) is solid, but AIO draws heavily on domains with existing organic ranking
  history and corroborating signals this site doesn't have yet. Expect low AIO
  visibility in the near term regardless of further on-page work — this is a
  time-and-authority problem, not a markup problem.
- **ChatGPT:** Training-data recall of a brand this new will be effectively zero. Live
  browsing/search citations depend on the page being indexed and well-formed when
  fetched — the FAQPage content and direct-answer paragraphs on `learn.html` are
  well-shaped for this *if* the crawler reaches the page. Only 11% of domains get
  cited by both ChatGPT and Google AIO, so treat these as separate optimization
  targets, not one problem.
- **Perplexity:** Historically more willing to surface niche, low-authority,
  direct-answer sources than Google AIO, and PerplexityBot is unblocked here. The
  Q&A-shaped content (homepage FAQ, `learn.html`'s COA checklist) is the best-fit
  content on the site for this platform's citation style — plausibly the
  highest-near-term-odds platform of the four, precisely because it weights domain
  authority less heavily.
- **Bing Copilot:** Indexation-dependent like ChatGPT's browsing mode. Confirm the
  site is submitted to Bing Webmaster Tools (not verifiable from this repo) — this
  matters more here than any further on-page GEO change.

## Top 5 Highest-Impact Changes

1. **[High / Medium effort]** Establish external entity corroboration — LinkedIn
   company page at minimum, then wire it into `sameAs` on the Organization JSON-LD.
   This is the one lever the brief's own correlation data says matters most, and it's
   currently at zero.
2. **[High / Low effort]** Roll out `Article` + `BreadcrumbList` schema to
   `learn.html`, `standard.html`, `manifesto.html`, `about.html` — currently only the
   homepage has any structured data, and the other four pages hold the site's most
   citable, non-promotional content.
3. **[Medium / Low effort]** Add `dateModified`/visible "updated" dates to the
   pre-harvest status claims on `index.html` and `standard.html` — these are
   explicitly time-sensitive statements with no freshness signal today.
4. **[Medium / Low-Medium effort]** Densify the cordycepin and militaris-vs-sinensis
   explanations on `learn.html` into single ~150-word self-contained paragraphs
   instead of the current 4-6 fragmented sentences per section.
5. **[Low / Low effort]** Publish `llms.txt` pointing to `standard.html` and
   `learn.html` as primary sources, framed internally as a low-cost hygiene item, not
   a citation guarantee — and add 1-2 external references for the cordycepin chemistry
   claims.

## Category Score

**GEO / AI Search Readiness: 61 / 100**

| Dimension | Weight | Score | Weighted |
|---|---|---|---|
| Citability | 25% | 62 | 15.5 |
| Structural Readability | 20% | 75 | 15.0 |
| Multi-Modal Content | 15% | 45 | 6.75 |
| Authority & Brand Signals | 20% | 30 | 6.0 |
| Technical Accessibility | 20% | 88 | 17.6 |
| **Total** | | | **60.85 ≈ 61** |

Technical accessibility is essentially solved — no crawler blocks, no JS barrier,
valid sitemap. The ceiling on this score right now is Authority & Brand Signals: a
new, pre-revenue brand with zero external corroboration cannot be optimized to a high
score through on-page changes alone, and that dimension carries real weight (20%)
precisely because it's what the brief's correlation data says matters most for actual
citation. Multi-Modal Content is the other clear laggard — no video, no downloadable
structured spec sheet, no infographics — on a site whose subject matter (a visible,
inspectable cultivation process) would benefit unusually well from short video.
