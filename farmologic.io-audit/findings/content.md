# Content Quality & E-E-A-T Audit — farmologic.io

Audited: 2026-08-25 · Pages: `/` (1016w), `/about` (713w), `/learn` (808w), `/manifesto` (1020w), `/standard` (615w)
Source: `site/*.html` (index, about, learn, manifesto, standard), last touched 2026-08-21.
Context: YMYL-adjacent B2B ingredient site (Cordyceps militaris, wellness supply chain), pre-revenue/pre-harvest stage disclosed openly across the site.

## Category Score: 64 / 100

Solid foundation of stated-standard transparency and an unusually honest "pre-harvest" disclosure pattern, but the site is a brand-voice narrative wrapped around a not-yet-existent product, has no named/credentialed technical author on the science content, no citations to any external literature, and two pages (`/manifesto`, `/standard`) overlap heavily in claims and could partially collapse or need clearer differentiation. `/learn` is the strongest asset for AI-citation and topical-authority purposes but is thin relative to what serious formulators actually need to evaluate a supplier.

---

## E-E-A-T Breakdown

| Factor | Weight | Score /100 | Notes |
|---|---|---|---|
| Experience | 20% | 55 | Founder's family farming background and first-person voice on `/about` and `/manifesto` read as genuine. But the company is pre-harvest — there is no harvested batch, no shipped COA, no customer story, no photograph confirmed as this facility's actual output (hero images may be stock/rendered; unverifiable from HTML alone). "Experience" signals are about lineage/intent, not about the product this site is asking buyers to trust. |
| Expertise | 25% | 50 | `/learn` demonstrates real domain fluency (correct on cordycepin = 3′-deoxyadenosine, correct on HPLC as the assay method, correct on the fruiting-body vs. mycelium-on-grain distinction, correctly separates *C. militaris* from *Ophiocordyceps sinensis*). This is a genuine strength. But **no author byline, credential, or reviewer is attached to any technical claim** — not on `/learn`, not on the specification table on `/standard`. Founder's bio (MS Psychology, MA Political Science) establishes entrepreneurial credibility, not food-science/mycology/analytical-chemistry expertise, and the site never names who *is* the technical authority behind the cultivation protocol or COA panel. For a YMYL-adjacent ingredient page, this is the single biggest expertise gap. |
| Authoritativeness | 25% | 40 | Zero external citations anywhere in the crawled pages — no links to peer-reviewed cordycepin research, no pharmacopoeia references (e.g., no citation for the HPLC method, ICP-MS metals method, or microbiological limits mentioned on `/learn` and `/standard`), no industry-standard references (FSSAI/AYUSH, USP, WHO Guidelines for GACP), no third-party mentions, press, or backlinkable signals visible in the HTML. The site is entirely self-referential: every claim about the standard is sourced to Farmologic itself. Registered-company status is stated but no CIN/registration number, no LinkedIn/founder profile link, no industry-association membership is shown. |
| Trustworthiness | 30% | 78 | This is the site's real strength. Explicit "pre-harvest" / "pre-revenue" disclosure appears on `/`, `/about`, and `/standard` — unusually candid for a commercial site and a strong trust signal per Sept 2025 QRG's emphasis on honesty about limitations. Contact info (email, physical city, "a registered Indian company") is present sitewide in the footer and on `/about`. Explicit "we name a certification once it is held, and never before" appears three times (index, about, standard) — good anti-overclaim discipline. No privacy policy, terms of service, or refund/data-handling page linked anywhere in the footer — a real gap for a form that collects company/name/work email. No HTTPS/security signal check was performed in this pass (out of scope for static HTML) but should be verified separately. |

**Weighted E-E-A-T score: 0.20×55 + 0.25×50 + 0.25×40 + 0.30×78 = 58.9**

---

## Findings by Severity

### Critical

1. **No named technical/scientific authority behind any health-adjacent or lab-methodology claim.** `/learn` and `/standard` state specific analytical methods (HPLC for cordycepin/adenosine, ICP-MS for heavy metals) and specific micro-organism testing (E. coli, Salmonella) with total confidence, but no page names who designed this protocol, what lab will run it, or any technical advisor/consultant. For a wellness-ingredient supplier making assay claims, Google's YMYL guidance expects a demonstrable expert or a named, checkable authority behind formulation/safety claims. Currently the only named human is the founder, whose stated credentials (psychology, political science) do not establish food-science or analytical-chemistry expertise. **Recommendation:** name the lab (once selected/contracted), name any food technologist/microbiologist/QA consultant involved, or add credentialed reviewer attribution to `/learn`.

2. **Zero external citations or references anywhere on the crawled pages.** No links to PubMed/peer-reviewed cordycepin studies, no pharmacopoeial or regulatory reference (FSSAI nutraceutical rules are *described* in `/manifesto` — "every pack must list its ingredients in order and declare how much of each active ingredient" — but not linked or cited), no reference for why HPLC is the correct method, no citation for the ICP-MS/heavy-metal limits mentioned. All authority is self-asserted. This is the largest single gap for both E-E-A-T and AI-citation readiness, since LLMs and Google's ranking systems weight independently corroborated facts far more than brand-stated ones.

3. **COA/certification claims are entirely prospective, not evidenced, with no sample artifact.** Every certificate-of-analysis claim across `/`, `/about`, `/standard`, `/learn` is written in future/conditional tense ("will be tested," "each certificate is issued... available on request," "no batch will be released until..."). This is honest given the pre-harvest stage, but there is currently no viewable specimen COA, no lab accreditation number (e.g., NABL) named, and no way for a visitor to verify a single real test result exists yet. Flag this as regulatory-risk-adjacent: statements like "Independent laboratory testing before any batch is released" read as an operational guarantee, not a hope, and should be checked against what can actually be demonstrated if challenged (Sept 2025 QRG cares about whether trust signals are *substantiated*, not just asserted).

### High

4. **Heavy duplication of core claims between `/manifesto` (1020w) and `/standard` (615w), and overlap with `/` and `/about`.** The same claims recur near-verbatim across pages:
   - "We name a certification once it is held, and never before" — appears on `/`, `/about`, `/standard`.
   - "Trust before marketing. Quality before profit. Science before claims. Transparency before sales." — appears on `/` and `/about`.
   - Independent lab testing / HPLC for cordycepin+adenosine / heavy metals+microbiology+pesticide panel — repeated near-identically on `/`, `/learn`, and `/standard`.
   - The four-obligations structure on `/standard` ("Strain & substrate," "Controlled grow," "Harvest & drying," "Independent testing") is nearly identical in wording and order to the four-card "Farmologic Standard" band on the homepage.
   `/manifesto` is a distinct rhetorical piece (an essay about industry trust problems) and is differentiated in *tone*, but its underlying claims ("every claim carries the number that backs it," "no cure, no hack, no boost by a multiple") substantively restate what `/standard` already states more concretely. **Risk:** search engines may see this as a site expressing one thin core idea five different ways rather than five pages each adding unique value — a classic low-value-add signal from the Sept 2025 QRG's "does this content exist to help the user or to occupy another search result" test. **Recommendation:** either (a) cross-link explicitly and narrow each page's job — `/manifesto` = the "why," `/standard` = the "how" with the concrete spec table only, no restated obligations — or (b) merge `/manifesto`'s unique persuasive content into `/about` and repoint `/manifesto` to redirect, keeping `/standard` as the sole spec-of-record page.

5. **Topical depth on `/learn` is good but noticeably short of what a formulator/QA/procurement buyer actually needs to research before a first order.** At 808 words across three subtopics (cordycepin, indoor vs. wild cultivation, reading a COA), each subtopic gets roughly 250-270 words — enough for orientation, not enough to be the definitive resource this audience would bookmark or an LLM would prefer to cite over a longer competitor piece. Missing angles that formulators/buyers commonly search for:
   - Recommended/typical cordycepin % w/w ranges seen in commercial *C. militaris* fruiting-body extracts (even citing published ranges, without claiming Farmologic's own number yet)
   - Dosage/serving-size context common in finished-product formulation (careful: framed as formulation guidance, not a health claim)
   - Solubility/format considerations (powder vs. extract vs. standardized extract) relevant to beverage/capsule/gummy formulators
   - Regulatory status of cordycepin/cordyceps ingredients in India (FSSAI nutraceutical schedule status), a natural extension of the FSSAI mention already made in `/manifesto`
   - Shelf-life/stability data or at least a framework for evaluating a supplier's stability claims
   - A glossary or FAQ block (`/learn` currently has no FAQPage schema, unlike the homepage) covering common buyer questions specific to sourcing/formulating cordycepin

6. **No visible content-freshness or update signal on any page.** No `dateModified`/`datePublished` in HTML or schema (JSON-LD on the homepage has Organization/WebSite/FAQPage types but no `dateModified`). No "last reviewed" note on `/learn`, which is the page most likely to be treated as an evergreen reference and most in need of a freshness signal given it discusses assay methods and species claims that read as authoritative.

### Medium

7. **JSON-LD structured data present only on the homepage.** The `@graph` on `/` (Organization, WebSite, FAQPage) is a good practice, but `/learn` — the page with the most extractable, citable factual content (definitions, a 6-point COA checklist, 3 supplier-vetting questions) — has **no schema at all**. Adding `Article`/`FAQPage`/`HowTo`-style markup to `/learn`, and `Organization`/`Person` markup naming the founder on `/about`, would materially improve AI-citation readiness and rich-result eligibility. `/manifesto` and `/standard` also lack any structured data.

8. **AI-citation readiness is uneven.** `/learn`'s "How to read a cordyceps COA" checklist (6 numbered items, each self-contained with a clear claim) and the "Three questions for any supplier" block are genuinely well-formed for extraction — short, factual, quotable, non-dependent on surrounding context. By contrast, `/manifesto`'s content is rhetorical/narrative ("Ask anyone who grows for a living... a dozen hands each take a small, forgivable cut of the truth") — evocative brand copy, but low citation value: it contains no extractable facts, only sentiment. This is fine for its purpose as a brand piece, but it means 1 of 5 pages (1020 of ~4172 total crawled words, ~24%) is functionally uncitable for factual AI answers. Recommend keeping `/manifesto`'s voice but ensure the *factual* commitments (the 8 numbered items) are also independently stated in more extractable form elsewhere (they partly already are, on `/standard`).

9. **Regulatory-risk language worth tightening.** Several passages sit close to implied-efficacy territory even though the site is otherwise disciplined about not making health claims:
   - Footer/meta description: "premium wellness solutions" — vague but low risk.
   - `/` FAQ: "Are you certified?" answer states testing exists ("Farmologic is a registered company working to a written specification backed by independent laboratory testing") while `/standard` clarifies elsewhere that this is prospective — a first-time reader of just the FAQ answer could reasonably read this as already-completed testing rather than a written protocol awaiting its first batch. Recommend adding explicit tense/status cues ("will be backed by," or "protocol specifies... to be run on the first batch") directly in the FAQ answer, not just on `/standard`.
   - No page currently includes a standard supplement-industry disclaimer (e.g., "these statements have not been evaluated..." equivalent under Indian FSSAI rules, or an explicit non-claim about efficacy for finished consumer products). Given the manifesto explicitly invokes India's health-supplement labeling rules, adding Farmologic's own compliance-disclaimer footer line would reduce regulatory-risk-language ambiguity and reinforce trustworthiness.

### Low

10. **Word counts meet or exceed the topical floors for their page types** (Homepage 1016w > 500 min; Service-like page `/standard` 615w vs. 800 typical service-page min — slightly under, though `/standard` functions partly as a spec/product page where 300-400+ may be more appropriate; `/about` 713w close to a service-page floor and fine for an About page; `/manifesto` 1020w as a blog-adjacent essay is under the 1,500 blog-post floor but is not structured as an SEO blog post, so this is a soft flag, not a hard one). None of these are the limiting factor for quality — topical coverage/depth (finding 5) matters more than raw count here.

11. **Readability is strong.** Sentences are generally short-to-medium, plain register, minimal jargon left unexplained (e.g., "cordycepin," "HPLC," "ICP-MS" are each defined or contextualized on first use in `/learn`). Estimated Flesch Reading Ease in the mid-50s to low-60s (accessible but not oversimplified) — appropriate for a technical B2B buyer audience. No readability concerns to flag.

12. **No obvious AI-generated-content red flags.** Voice is distinctive and consistent (short declarative sentences, repeated rhetorical structures like "X before Y," specific concrete details — jar labelling, still-air environment, defined maturity). This reads as deliberately human-authored brand copywriting rather than generic AI filler. The main quality risk is not "is this AI slop" but "is this asserted-but-unsubstantiated" (see Critical findings 1-3).

---

## AI Citation Readiness Score: 58 / 100

- Strong: `/learn`'s definitions and checklists are self-contained, factual, and quotable.
- Weak: no schema on `/learn`/`/manifesto`/`/standard`; no external citations for an LLM to cross-verify; no named expert to attribute claims to; heavy repetition across pages could cause an LLM/search system to treat the site as one thin idea rather than a well-differentiated knowledge base.

---

## Priority Recommendations

1. Name a technical authority (lab partner, food scientist, or QA consultant) behind the cultivation/testing protocol and attribute the assay methodology to them — single highest-leverage E-E-A-T fix.
2. Add 3-5 external citations to `/learn` (peer-reviewed cordycepin literature, FSSAI nutraceutical schedule, relevant pharmacopoeial method references) to break the fully self-referential authority pattern.
3. Differentiate `/manifesto` and `/standard` explicitly — move all restated concrete obligations out of `/manifesto` into cross-links to `/standard`, keep `/manifesto` purely as brand narrative.
4. Add `Article`/`FAQPage` schema to `/learn`, and `Person` schema for the founder on `/about`.
5. Expand `/learn` with the missing formulator-relevant subtopics (typical potency ranges, format/solubility, India regulatory status, stability/shelf-life framework) — turn it into the definitive buyer resource it's positioned to be.
6. Add a privacy policy / data-handling page linked from the footer, given the enquiry form collects PII.
7. Tighten the homepage FAQ "Are you certified?" answer to match `/standard`'s more careful prospective framing, and consider a compliance-disclaimer footer line given the manifesto's direct reference to India's supplement labeling rules.
