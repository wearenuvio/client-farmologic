# On-Page SEO — farmologic.io

## What works

- **Exactly one `<h1>` per page**, all 6 files including `404.html`. No duplicates, no missing.
- **Unique, self-referencing canonicals** on all 5 indexable pages.
- **Unique meta descriptions** on all 5, each written to the page's actual subject rather than boilerplate.
- **`index, follow, max-image-preview:large`** consistently applied; `404.html` correctly `noindex, follow`.
- **Heading hierarchy is coherent** — 7–10 `<h2>` and 4–12 `<h3>` per page, no level skipping observed.

## Findings

### 1. Three titles exceed SERP display width (Medium)

| Page | Chars | Title |
|---|---|---|
| `/` | **85** | Farmologic: science-backed ingredients, starting with Cordyceps militaris \| Bengaluru |
| `/about` | **79** | About Farmologic: science-backed ingredients, starting with Cordyceps militaris |
| `/standard` | **72** | The Farmologic Standard: how material is grown and verified \| Farmologic |

Google truncates around 580px, roughly 60 characters. The homepage loses
"| Bengaluru" — the single geographic qualifier, and the one term that
distinguishes it for "cordyceps militaris supplier india" style queries
(see `sxo.md`, where that query is a CRITICAL gap).

**Recommendation:** Front-load the distinguishing terms. Move Bengaluru/India
earlier in the homepage title and shorten the descriptive tail.

**How we'd know this failed:** the rendered SERP snippet still ellipsizes before
the geographic term.

### 2. `/manifesto` title carries no query-matching term (Medium)

`Nothing to hide | Farmologic` — 28 characters, entirely brand-voice. It matches
no informational or commercial query. The page is 1,020 words, the joint-longest
on the site, and it is the page carrying the eight commitments that constitute
the trust argument.

**Recommendation:** Keep the voice, add the substance — e.g. a title that pairs
the phrase with what the page actually contains (commitments on testing,
declaration and sourcing). This is the cheapest single title fix on the site.

### 3. Internal linking is complete but flat (Medium)

Every page links to all four others — 4 unique internal targets from each page,
8–11 total link instances. Coverage is total, which means no orphan pages.

But the links are structural (nav and footer), not contextual. There are no
in-body links from a claim to the page that substantiates it — e.g. the homepage
FAQ answer about certification does not link to `/standard`, and `/learn`'s COA
discussion does not link to the specification it references.

**First principle:** contextual links pass topical association in a way nav links
do not, and they route a reader mid-intent rather than after they finish.

**Recommendation:** Add in-body contextual links on the specific claims that have
a supporting page. Highest value: `/learn` COA section → `/standard` spec, and
homepage certification FAQ → `/standard`.

**Leading indicator:** internal links per page rising above the flat 4 without
adding nav items.

### 4. No date signals anywhere (Medium — overlaps `geo.md`)

No `datePublished`, `dateModified`, or visible `<time>` element on any page,
while the copy makes explicitly perishable claims ("pre-harvest", "certification
applications are under way"). Those claims will silently become false. Covered
from the AI-citation angle in `geo.md`; recorded here because it is equally an
on-page freshness signal.

## Category score

**On-Page SEO: 76 / 100**

The fundamentals — one H1, unique canonicals, unique descriptions, clean
hierarchy — are all correct, which is the hard part. Deductions are for title
truncation on the three pages that most need to rank, one title with no
query surface at all, and internal linking that covers everything but
contextualises nothing.
