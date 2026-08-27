# Full SEO Audit — farmologic.io

**Audited:** 25 August 2026 · **Scope:** 5 indexable URLs · **Tooling:** claude-seo 2.2.4

---

## Executive Summary

### SEO Health Score: 69 / 100

| Category | Weight | Score |
|---|---|---|
| Content Quality | 23% | 64 |
| Technical SEO | 22% | 74 |
| On-Page SEO | 20% | 76 |
| Schema / Structured Data | 10% | 58 |
| Performance (CWV) | 10% | **not measured** |
| AI Search Readiness | 10% | 61 |
| Images | 5% | 72 |

Supplementary, outside the weighted score:
**Search Experience (SXO) 34** · **Visual / Mobile 84**

> **On the score.** The Performance weight was excluded and the remaining weights
> renormalised, because PageSpeed Insights returned `rate limit exceeded
> (240 QPM / 25,000 QPD)` on the shared public quota and no CWV figure was
> obtained. That category is **unmeasured, not clean.** A real number could move
> the composite in either direction.

**Business type detected:** B2B ingredient supplier — wellness / nutraceutical raw
material, pre-harvest, Bengaluru. Not e-commerce (no cart, price on request), not
local-service (no map-pack intent), not publisher.

---

### The headline finding is not an SEO finding

**The enquiry form posts into a 404.** `site/index.html:369` submits to
`data-endpoint="/api/enquiry"`. Both `GET` and `POST` to that endpoint return
**404**. `api/enquiry.js` exists in the repo and was committed in `7815089` — it
simply is not deployed.

"Register interest" is the single call to action on all five pages. Every
submission is currently being lost. This was found while investigating a
missing-headers symptom and is the most consequential thing in this document.

### One root cause explains five separate findings

Everything inside `site/` works. Everything at the repository root is invisible to
the deployment:

| Repo-root file | Deployed | Symptom |
|---|---|---|
| `vercel.json` headers | ✗ | 4 security headers absent live |
| `vercel.json` `/assets/*` | ✗ | `max-age=0` instead of 1-year immutable |
| `vercel.json` `trailingSlash` | ✗ | `/about/` returns 200 |
| `api/enquiry.js` | ✗ | form posts into a 404 |
| `site/404.html` | ✗ | generic 79-byte `text/plain` served |

The most likely cause is the Vercel project's **Root Directory being set to
`site`**, placing `vercel.json` and `api/` outside deployment scope. `cleanUrls`
behaviour matches by coincidence — it is Vercel's default for static output —
which is exactly what made this look like a partial failure rather than a total
one. It is a project-settings change, not a code change.

Timeline rules out a stale deploy: the headers block landed 2026-08-21 09:49 and
the live document reports `Last-Modified: Sat, 22 Aug 2026 16:22`.

### Top 5 issues

1. **Enquiry endpoint 404s** — the only conversion path on the site is broken.
2. **`vercel.json` inert in production** — security headers, asset caching and
   trailing-slash handling all silently absent.
3. **Trailing-slash URLs serve visibly broken pages.** `/about/`, `/learn/`,
   `/standard/`, `/manifesto/` return 200, but relative stylesheet paths resolve
   one level too deep and 404 — those URLs render **completely unstyled.**
4. **Page-type mismatch (SXO 34/100).** All five pages are one type. Four of six
   target queries reward product, directory or comparison pages that don't exist.
5. **No named authority, no external citations.** HPLC, ICP-MS and microbiology
   claims are asserted with total confidence, unattributed, on a YMYL-adjacent
   wellness ingredient.

### Top 5 quick wins

1. Fix the Vercel Root Directory — one settings change closes five findings.
2. Add `BreadcrumbList` — breadcrumbs already render visibly on all four
   subpages; only the markup is missing.
3. Rewrite `Nothing to hide | Farmologic` — 28 characters matching no query, on
   the joint-longest page of the site.
4. Front-load "Bengaluru" in the 85-character homepage title before truncation
   removes the only geographic qualifier — on a site whose most critical query
   gap is *supplier india*.
5. Move the Google Fonts `@import` out of `tokens.css` into a `<link>` — removes
   a serial round-trip from every page's render path.

---

## What this site does well

Worth stating plainly, because the score understates it:

- **Trustworthiness scored 78/100** — the highest single sub-score in the audit.
  The pre-harvest candour is unusual and commercially brave: *"we name a
  certification once it is held, and never before."*
- **Mobile above-the-fold does real work.** Value proposition, substantiation,
  and two CTAs, no scrolling required — better than the brand-led structure
  would predict.
- **Alt text and image dimensions are at 100%.** The two things that are
  genuinely painful to retrofit are already done.
- **Species disambiguation is a real asset.** *Cordyceps militaris* vs
  *Ophiocordyceps sinensis* is explicitly distinguished — the entity clarity that
  stops a language model conflating the two.
- **`.html` duplicate-URL risk is fully closed**, canonicals are correct on all
  five pages, and `hreflang` was correctly judged unnecessary.
- **Motion degrades correctly** for both no-JS and `prefers-reduced-motion`
  users across 77 `.reveal` elements.

---

## Category detail

Full evidence, per-finding falsifiability checks and ready-to-paste code are in
`findings/`:

| File | Category | Score |
|---|---|---|
| `findings/technical.md` | Technical SEO | 74 |
| `findings/content.md` | Content / E-E-A-T | 64 |
| `findings/onpage.md` | On-Page | 76 |
| `findings/schema.md` | Structured Data | 58 |
| `findings/geo.md` | AI Search Readiness | 61 |
| `findings/images.md` | Images | 72 |
| `findings/sxo.md` | Search Experience | 34 |
| `findings/visual.md` | Visual / Mobile | 84 |

Screenshots: `screenshots/` — 16 captures, desktop and mobile, all 5 pages.

---

## Method and limitations

Stated so the findings can be checked rather than trusted.

**Verified live** against production on 25 August 2026: redirect matrix, header
presence on cache-busted requests, `/api/enquiry` status, 404 body and content
type, trailing-slash asset resolution, `robots.txt`, `sitemap.xml`, `llms.txt`,
and crawler access via `curl -A GPTBot`.

**Limitations:**

- **No Core Web Vitals.** PSI rate-limited on the public quota. No lab or field
  number appears anywhere in this audit, and none was estimated.
- **No Search Console or analytics access.** Nothing here reflects actual
  rankings, impressions or traffic.
- **SERP classification in `sxo.md` came from search snippets**, not rendered
  live SERPs.
- **Schema `datePublished` values were derived from first git-commit dates** and
  must be confirmed against real publish dates before shipping.
- **Two specialist agents stalled** mid-run (performance, visual). The visual
  work was redone directly; the performance gap is the PSI limit above, not the
  stall.
- The health score is a prioritisation heuristic. It is **not** a Google score
  and not a prediction of rankings, traffic or citations. The findings and their
  evidence matter more than the aggregate.

---

## Next step

`ACTION-PLAN.md` sequences the work by dependency across six phases. Phase 0 is
a single settings change that resolves five findings including the broken form,
and should happen before anything else in this document.
