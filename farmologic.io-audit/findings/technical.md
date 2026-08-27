# Technical SEO Findings — farmologic.io

Audited: 2026-08-25. Live checks against `https://www.farmologic.io`, cross-referenced with
source at `/Users/4bhinav/devroar/client-farmologic` (site/, vercel.json). Lab Core Web Vitals
(LCP/INP/CLS measurement) intentionally out of scope here — covered by a separate agent with
Chromium. Image alt/dimensions and structured-data validity are covered in
`findings/images.md` and `findings/schema.md` and are not re-derived below.

## Category score: 74 / 100

Crawlability and indexability are clean. The recurring theme dragging the score down is a
**mismatch between what `vercel.json`/`site/404.html` declare and what production actually
serves** — three independent checks (custom response headers, `/assets/` cache-control, and
the custom 404 page) all show the deployed behavior does not match the repo source.

---

## Critical

### 1. Security headers declared in vercel.json are not present on the live site
`vercel.json`'s `headers` block declares `X-Content-Type-Options`, `Referrer-Policy`,
`X-Frame-Options`, and `Permissions-Policy` on `"source": "/(.*)"` (all routes). Verified via
`curl -sSD -` (both HTTP/2 and HTTP/1.1, with and without cache-busting query strings) against
`/` and `/standard`: **none of the four headers are present** in the live response. Only
`strict-transport-security: max-age=63072000` shows up, which Vercel injects automatically at
the platform level for verified custom domains — it is not evidence the `headers` block is
being applied.
```
HTTP/2 200
accept-ranges: bytes
access-control-allow-origin: *
cache-control: public, max-age=0, must-revalidate
content-type: text/html; charset=utf-8
server: Vercel
strict-transport-security: max-age=63072000
x-vercel-cache: HIT
```
This corroborates finding #2 below (the `/assets/(.*)` cache-control rule in the same
`headers` block is also not applied), so the entire `headers` array in `vercel.json` appears
inert in production — this is not a single-header typo.
**Action:** confirm the production deployment/alias is actually built from the current
`vercel.json` (check `vercel ls` / deployment inspector for the commit hash tied to the
production alias, and check Project Settings for any dashboard-level header overrides that
might be shadowing the file), redeploy, then re-verify with `curl -sSD - https://www.farmologic.io/`.

### 2. `/assets/(.*)` immutable cache-control rule not applied
`vercel.json` declares `Cache-Control: public, max-age=31536000, immutable` for `/assets/(.*)`.
Live: `curl -sSD - https://www.farmologic.io/assets/css/site.css` and `.../tokens.css` both
return `cache-control: public, max-age=0, must-revalidate` — the default Vercel static
cache-control, not the declared immutable rule. Static assets are being revalidated on every
request instead of cached for a year, which is a real (if secondary, non-SEO) performance
cost, and further confirms the `headers` block isn't taking effect. Same fix as #1.

### 3. Custom 404 page (`site/404.html`) is not served for real 404s
Status code behavior is correct — `curl -o /dev/null -w '%{http_code}'` on
`https://www.farmologic.io/nonexistent-page-xyz` and on `/404.html` itself both return `404`.
But the **response body** for an unmatched path is Vercel's generic platform placeholder, not
the repo's branded page:
```
The page could not be found

NOT_FOUND

bom1::vmngv-...
```
(`content-type: text/plain`, `content-length: 79`). The actual `site/404.html` is 3,393 bytes,
has `<meta name="robots" content="noindex, follow">`, and links back into Standard/Manifesto/the
enquiry form. None of that is reaching real visitors who mistype a URL or follow a dead link —
they get a bare, unbranded, dead-end error page. This is a UX/conversion issue more than a
crawl-signal issue (the 404 status itself is correct for search engines), but it means the
noindex meta tag baked into the custom page is also not doing anything live (moot, since the
platform placeholder is `text/plain` and unindexable anyway). **Action:** verify the static
`site/404.html` is actually present in the deployed output at the path Vercel expects for
automatic not-found handling, and re-test after a clean redeploy.

---

## High

### 4. Render-blocking Google Fonts loaded via CSS `@import`
`site/assets/css/tokens.css` line 7:
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Montserrat:wght@400;500;600&display=swap');
```
`@import` at the top of a blocking `<link rel="stylesheet">` file forces the browser to fetch
and parse the imported Google Fonts CSS **serially** before it can finish parsing/applying the
rest of `tokens.css` — an extra round-trip inserted into the critical rendering path on every
page. `<link rel="preconnect">` to `fonts.googleapis.com`/`fonts.gstatic.com` is present in
`<head>` on all 6 pages, which helps with connection setup but does not remove the extra
request itself. `display=swap` is set (avoids invisible-text/FOIT), which caps the downside,
but this remains a direct, source-verifiable LCP/render-path risk for the headline font
(`Cormorant Garamond`, used for all `.h1`/`.h2`/display elements).
**Recommendation:** replace the `@import` with a `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?...">` tag in `<head>` (loads in parallel with `tokens.css`/`site.css`
instead of after them), or self-host the two font families and drop the external dependency
entirely.

---

## Medium

### 5. Trailing-slash URLs serve 200 directly instead of redirecting (contradicts `trailingSlash: false`)
`vercel.json` sets `"trailingSlash": false`, which per Vercel's documented behavior should
308-redirect trailing-slash requests to the non-slash form. Live testing (with cache-busting
query strings to rule out a stale CDN hit) shows the opposite:
```
GET /about/   → 200 (identical content to /about)
GET /learn/   → 200
GET /manifesto/ → 200
GET /standard/  → 200
```
Both `/about` and `/about/` self-report the same canonical (`<link rel="canonical"
href="https://www.farmologic.io/about">`), which correctly tells search engines which URL is
authoritative and limits the practical indexing risk — but it's still two crawlable 200 URLs
per page, doubling nominal crawl surface across all 5 pages, and it doesn't match what
`vercel.json` says should happen. Note double trailing slashes (`/about//`) *do* correctly
308-redirect — but only to `/about/` (still trailing-slash), not all the way to the canonical
`/about`, so the redirect chain doesn't fully resolve the duplicate either.
**Recommendation:** confirm this is the same deployment/config-sync issue as findings #1–3; if
it persists after a clean redeploy, add an explicit `redirects` rule in `vercel.json` for
trailing-slash normalization.

### 6. Sitemap has no `<lastmod>` on any URL
`site/sitemap.xml` (validated live via `sitemap_discovery.py`, HTTP 200, valid `urlset`,
correctly declared in and matching `robots.txt`) sets `changefreq`/`priority` per URL but omits
`<lastmod>` entirely on all 5 entries. Live `Last-Modified` response headers show pages do get
updated independently (e.g. `/standard` and `/` have different Last-Modified timestamps),
so Google has real signal it could use to prioritize recrawl of the pages that actually
changed. `changefreq`/`priority` are largely ignored by modern Google crawling; `lastmod`, when
accurate, is the one sitemap field Google still weights for scheduling.
**Recommendation:** populate `<lastmod>` from each page's real content-modified date (e.g., in
CI, from `git log -1 --format=%cI -- site/<page>.html` or the build's own file mtime) and keep
it in sync going forward.

### 7. No `Content-Security-Policy` header (not even declared)
Unlike the other four security headers, no CSP is declared anywhere in `vercel.json`, so this
isn't a deploy-sync issue — it's simply absent from source. Not an SEO ranking factor directly,
but part of the security-header baseline requested for this audit and a defense-in-depth gap
worth closing (the site does load a third-party `fetch()` to `/api/enquiry` and Google Fonts,
so a CSP with `default-src 'self'`, explicit `font-src`/`connect-src` allowances would be
low-effort to add).

### 8. Two-hop redirect chain from bare HTTP apex to canonical host
Tested all four scheme/host permutations live:
- `http://www.farmologic.io/` → 308 → `https://www.farmologic.io/` (1 hop) — fine.
- `http://farmologic.io/` → 308 → `https://farmologic.io/` (protocol only, still non-www)
- `https://farmologic.io/` → 308 → `https://www.farmologic.io/` (host only)

So a crawler or user starting at `http://farmologic.io/` (bare HTTP, no www) traverses **two**
308s before reaching the canonical `https://www.farmologic.io/`. Not broken, and link equity
is preserved through 308s, but it's an easy, no-risk optimization to collapse to a single hop
directly from the apex-HTTP request to the final canonical URL.

---

## Low

### 9. `Permissions-Policy` includes a dead FLoC-era token
The declared (but currently non-live, see #1) `Permissions-Policy` value includes
`interest-cohort=()`. FLoC was abandoned; this token has no effect in any current browser.
Harmless, but safe to drop when the header block is fixed, in favor of currently-relevant
directives if more restriction is wanted.

### 10. HSTS lacks `includeSubDomains`/`preload`
Live HSTS is `max-age=63072000` only (no `includeSubDomains; preload`). The 2-year max-age is
good; adding `includeSubDomains; preload` and submitting to the HSTS preload list would close
the small first-request-over-HTTP window entirely, if the team is comfortable committing every
subdomain to HTTPS-only.

---

## Pass

- **Crawlability:** `robots.txt` (`User-agent: * / Allow: /`) correctly allows all crawling and
  declares the sitemap; live-validated with `sitemap_discovery.py --json` — sitemap found via
  the robots.txt declaration, HTTP 200, `kind: urlset`, `valid: true`. Common index-sitemap
  fallback paths (`sitemap_index.xml`, `sitemap-index.xml`, `wp-sitemap.xml`) correctly 404 (not
  needed — single flat sitemap is appropriate for 5 URLs).
- **Indexability:** all 5 canonical URLs (`/`, `/about`, `/learn`, `/manifesto`, `/standard`)
  carry self-referencing canonicals and `meta robots: index, follow, max-image-preview:large`;
  `404.html` correctly carries `noindex, follow`.
- **`.html` duplicate-URL risk: none.** `cleanUrls: true` is working as intended — live checks
  confirm `/index.html`, `/about.html`, `/learn.html`, `/manifesto.html`, `/standard.html`, and
  `/404.html` **all return 404** when requested directly. Only the extensionless routes are
  reachable/indexable. This is the one area where `vercel.json`'s routing behavior *does* match
  what's declared, in contrast to findings #1–3, #5.
- **JS rendering:** confirmed static/SSR, not an SPA (`render_page.py --mode never` returns full
  HTML with `is_spa: false`); no client-side rendering dependency for crawlers.
- **`lang="en-IN"` / hreflang:** correctly used as the page-content-language declaration on
  `<html>`. Hreflang tags are **not warranted** here — hreflang exists to map *alternate
  language/region versions of the same content* to each other, and there is exactly one version
  of each page (no `/en/`, no ccTLD or subdomain variants, no region-specific pricing/content
  fork). Adding hreflang without alternates would be a no-op at best. No action needed unless
  Farmologic ships a second locale/region variant, at which point defer to the `seo-hreflang`
  sub-skill.
- **JS delivery:** `assets/js/site.js` loads via `<script ... defer>`, not blocking; no
  document.write or synchronous third-party scripts found in source.
- **Compression:** Brotli confirmed live (`content-encoding: br`) on HTML responses.
- **URL structure:** clean, lowercase, extensionless, hyphen/param-free single-segment paths
  (`/about`, `/learn`, `/manifesto`, `/standard`) — no session IDs, tracking params, or
  case-sensitivity duplicates observed (`/ABOUT` correctly 404s).
- **Mobile viewport:** `<meta name="viewport" content="width=device-width, initial-scale=1">`
  present and correct on all 6 pages; base body font-size is `16px` (`--text-body-size` token);
  mobile breakpoint (`max-width: 640px`) sets button/tap-target `min-height` to 44–46px, meeting
  the ~44px touch-target guideline.

---

## Files referenced
- `/Users/4bhinav/devroar/client-farmologic/vercel.json`
- `/Users/4bhinav/devroar/client-farmologic/site/robots.txt`
- `/Users/4bhinav/devroar/client-farmologic/site/sitemap.xml`
- `/Users/4bhinav/devroar/client-farmologic/site/404.html`
- `/Users/4bhinav/devroar/client-farmologic/site/index.html`
- `/Users/4bhinav/devroar/client-farmologic/site/about.html`
- `/Users/4bhinav/devroar/client-farmologic/site/learn.html`
- `/Users/4bhinav/devroar/client-farmologic/site/manifesto.html`
- `/Users/4bhinav/devroar/client-farmologic/site/standard.html`
- `/Users/4bhinav/devroar/client-farmologic/site/assets/css/tokens.css`
- `/Users/4bhinav/devroar/client-farmologic/site/assets/css/site.css`
