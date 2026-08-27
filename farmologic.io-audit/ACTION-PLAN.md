# Action Plan — farmologic.io

Ordered by dependency, not just severity. Items in Phase 0 unblock several later
items, so doing them out of order wastes work.

Every item carries a falsifiability check — how you would know the fix failed —
because "shipped" and "working" have already diverged once on this site.

---

## Phase 0 — Restore the deployment contract (Do first, today)

**Everything in this phase is one root cause.** The Vercel deployment is not
reading the repo-root `vercel.json`, and is not deploying repo-root `api/`.
The signature: everything inside `site/` works, everything at repo root is
invisible. Most likely the project's **Root Directory is set to `site`**, which
places `vercel.json` and `api/` outside deployment scope. `cleanUrls` behaviour
matches by coincidence (Vercel's default for static output), which is what makes
this look like a partial failure rather than a total one.

### 0.1 — The enquiry form posts into a 404 [CRITICAL — not an SEO issue, a revenue one]

`site/index.html:369` posts to `data-endpoint="/api/enquiry"`.
`GET` and `POST` to that endpoint both return **404**. `api/enquiry.js` exists in
the repo and was committed in `7815089`, but is not deployed.

This is the site's only conversion path. Every "Register interest" submission —
the single CTA on all five pages — is currently lost.

- **Fix:** correct the Vercel project scope so `api/` deploys.
- **Failed if:** `curl -X POST https://www.farmologic.io/api/enquiry` still returns 404.
- **Leading indicator:** a test submission arrives at `contact@farmologic.io`.

### 0.2 — Four security headers declared but absent [Critical]

`vercel.json` sets `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`
and `Permissions-Policy` for `/(.*)`. None are present live. Only
platform-injected HSTS appears.

- **Failed if:** `curl -sI` still shows none of the four.

### 0.3 — Asset caching is 1000x weaker than declared [High]

`/assets/(.*)` is declared `max-age=31536000, immutable`; it serves
`max-age=0, must-revalidate`. Every repeat visitor re-validates all 3.4 MB of
imagery on every page view.

- **Failed if:** `curl -sI` on any asset still shows `max-age=0`.

### 0.4 — Trailing-slash URLs serve visibly broken pages [High]

`trailingSlash: false` is declared but not enforced. `/about/`, `/learn/`,
`/standard/`, `/manifesto/` all return **200**. Because stylesheet hrefs are
relative (`href="assets/css/tokens.css"`), under a trailing slash they resolve to
`/about/assets/css/site.css` → **404**. Those URLs render completely unstyled.

Canonicals point at the non-slash form, so index risk is contained — but any
human or crawler landing there sees a broken page.

- **Failed if:** `/about/` still returns 200 instead of a 308 to `/about`.

### 0.5 — Custom 404 page never reaches visitors [Medium]

Status code is correctly 404, but the body is Vercel's generic 79-byte
`text/plain` `NOT_FOUND`. The branded 3,393-byte `site/404.html` — which carries
`noindex` and recovery links — is never served.

- **Failed if:** the 404 body is still `text/plain`.

---

## Phase 1 — Close the page-type gap (Weeks 1–3)

This is the highest-ceiling work in the audit. SXO scored **34/100**, the lowest
category, because all five pages are one page type (brand/manifesto) while four
of six target queries are dominated by page types the site does not have.

### 1.1 — Build a *Cordyceps militaris* vs *sinensis* comparison page [Critical]

The SERP for this query rewards comparison pages. The site already contains the
strongest raw material for one — `geo.md` singles out the species disambiguation
as unusually good — but it is buried inside `/learn` rather than being its own
addressable page.

- **Failed if:** the new page does not rank in the top 50 for the comparison query within 8 weeks of indexation.

### 1.2 — Publish a specification / sample COA page [Critical]

Serves three unmet needs at once: the "bulk extract" and "supplier india"
queries need a product-shaped page; the procurement buyer (scored **42/100**,
weakest persona) needs MOQ and price band; the QA lead needs a viewable specimen
COA rather than a promise of one.

Honest constraint: the business is pre-harvest. A specimen or template COA
clearly labelled as such is legitimate; a fabricated one is not.

### 1.3 — Publish numeric cordycepin data [High]

The formulator persona scored **46/100** specifically because no numeric
cordycepin figure appears anywhere. "Cordycepin content" is a HIGH-severity query
gap. A stated assay range with method attribution converts this page from prose
into evaluable data.

### 1.4 — Differentiate the CTA [Medium]

One generic "Register interest" serves every persona, even though `/about` states
that "enquiries, specifications, samples and facility visits all start in the
same place". Split at minimum into *request specification* and *request sample*.

---

## Phase 2 — Authority and evidence (Weeks 2–6)

### 2.1 — Attribute the technical claims to a named person [Critical]

HPLC, ICP-MS and microbiology panels are asserted with complete confidence and
nobody credentialed is attached to any of them. Content scored Authoritativeness
**40/100** on this. For a YMYL-adjacent wellness ingredient, an unattributed
assay claim is the weakest possible form of the strongest available argument.

### 2.2 — Add external citations [Critical]

Zero external citations anywhere on the site. Every claim is self-referential —
including `/manifesto` invoking FSSAI supplement-labelling rules without linking
to them. Cite the peer-reviewed cordycepin literature and the actual regulatory
text.

### 2.3 — Soften the certification FAQ answer [High — regulatory risk]

The homepage "Are you certified?" answer reads as a completed guarantee when the
underlying reality is a written protocol and applications in progress. The rest
of the site is scrupulously honest about pre-harvest status; this one answer is
out of step with it and is the sentence most likely to cause a problem.

### 2.4 — Establish external entity corroboration [High]

GEO scored Authority & Brand Signals **30/100** — no `sameAs`, no LinkedIn, no
external mention of Farmologic as an entity anywhere. This cannot be fixed on-page.

---

## Phase 3 — Structured data and on-page (Weeks 3–5)

### 3.1 — JSON-LD on the four bare pages [High]
`/about`, `/learn`, `/manifesto`, `/standard` carry zero structured data.
Ready-to-paste blocks with consistent cross-page `@id`s are in `findings/schema.md`.
**Verify the `datePublished` values before shipping** — they were derived from
first git-commit dates, not confirmed publish dates.

### 3.2 — `BreadcrumbList` [High]
Breadcrumbs already render visibly on all four subpages (`FARMOLOGIC / LEARN`)
but exist nowhere in structured data. Pure gap, no design change needed.

### 3.3 — `Person` entity for the founder [High]
Full bio and portrait for Mandeep Mahadevaiah on `/about`, referenced again on
`/manifesto`, with no `Person` markup anywhere. Directly supports 2.1.

### 3.4 — Fix the three over-length titles and the keyword-free one [Medium]
Homepage title is 85 chars and truncates away "| Bengaluru" — the only
geographic qualifier, on the site whose CRITICAL query gap is "supplier india".
`/manifesto` is `Nothing to hide | Farmologic`, matching no query at all.

### 3.5 — Add date signals [Medium]
No `datePublished`/`dateModified`/`<time>` anywhere, against explicitly
perishable claims ("pre-harvest", "applications are under way").

### 3.6 — Contextual internal links [Medium]
Linking is complete but flat — 4 nav-driven targets per page, zero in-body
contextual links. Highest value: `/learn` COA section → `/standard` spec;
homepage certification FAQ → `/standard`.

### 3.7 — Consolidate duplicated claims [Medium]
The four-obligations structure and lab-panel description repeat near-verbatim
across `/`, `/about`, `/manifesto` and `/standard`.

---

## Phase 4 — Delivery performance (Weeks 4–6)

### 4.1 — AVIF/WebP with responsive `srcset` [High]
3.4 MB of imagery, zero modern formats, zero `srcset`/`<picture>` (confirmed: 0
occurrences site-wide). Sources are 1800px; a 390px phone at DPR 2 fetches ~5x
the pixels it can render. Do both in one markup pass — they touch the same
elements. Keep the existing `width`/`height`, which are already at 100% coverage.

### 4.2 — Compress overlaid heroes harder [Medium]
Hero images sit under a heavy dark scrim that destroys most of the visual
information their bytes encode. Overlaid heroes can take much heavier compression
with no perceptible change.

### 4.3 — Move the Google Fonts `@import` out of `tokens.css` [High]
Current chain is `index.html → tokens.css → @import fonts` — the font request
cannot begin until `tokens.css` lands. A `<link>` in `<head>` removes one serial
round-trip from the render path.

### 4.4 — Add a Content-Security-Policy [Medium]
Absent from source entirely, not merely undeployed.

### 4.5 — Measure CWV [Blocked]
No Core Web Vitals number appears anywhere in this audit. PSI returned
`rate limit exceeded (240 QPM / 25,000 QPD)` on the shared public quota.
Supply a Google API key or retry. **Do not treat the Performance category as
passing — it is unmeasured, not clean.**

---

## Phase 5 — Monitoring (Ongoing)

- `claude-seo run drift_baseline.py https://www.farmologic.io` once Phase 0 lands,
  so future config regressions are caught by diff rather than by audit.
- Re-run PSI with a key once available.
- Watch: `/api/enquiry` returning 200; the four headers present; assets serving
  `immutable`; trailing-slash URLs 308ing.
