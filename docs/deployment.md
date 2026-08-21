# Deploying to Vercel

Static site plus one serverless function. No build step and no dependencies.

## Project settings

| Setting | Value |
| --- | --- |
| Framework preset | Other |
| Build command | *(leave empty)* |
| Output directory | `site` |
| Install command | *(leave empty)* |
| Root directory | repository root |

`vercel.json` already sets the output directory, clean URLs and security
headers, so importing the repo with the defaults should be enough.

## The enquiry form

The form on the home page posts JSON to `/api/enquiry`. The function validates
the fields, drops anything that fills the honeypot, throttles by IP, and then
writes the enquiry to whichever sinks are configured:

1. **Upstash Redis** — the durable record. Pushed onto the list `enquiries` and
   also kept under `enquiry:<id>`.
2. **Resend** — emails the trade desk, with the sender's address as reply-to.
3. **The function log** — always, as one line of JSON. This runs even with
   nothing configured, so an enquiry is never silently lost.

If the request fails outright, the browser falls back to opening the visitor's
mail client with the enquiry pre-filled. A lead has to work quite hard to
disappear.

### Setting up storage

Vercel dashboard → **Storage** → **Upstash Redis** → connect it to the project.
`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are injected for you.

Read the enquiries back with:

```
curl -H "Authorization: Bearer $UPSTASH_REDIS_REST_TOKEN" \
     "$UPSTASH_REDIS_REST_URL/lrange/enquiries/0/49"
```

### Setting up email

Add `RESEND_API_KEY` from resend.com. Until `farmologic.io` is verified there,
Resend only allows sending from `onboarding@resend.dev`, which is the default
`ENQUIRY_FROM`. Verify the domain to send as `trade@farmologic.io`.

## What is stored

Company, name, work email, message, timestamp, the page the form was submitted
from, the sender's IP and user agent. The IP and user agent are kept for abuse
handling. There is no privacy policy on the site yet; one is needed before
launch, and it should say what is collected and how long it is kept.

## Domain and URLs

Live on `https://www.farmologic.io`.

`vercel.json` sets `cleanUrls: true`, so pages are served without the `.html`
extension: `site/standard.html` is served at `/standard`. Every internal link,
including the nav, the footers, the buttons and the calls to action, is
root-relative and extensionless — `/standard`, `/manifesto`, `/#enquiry` — and
the home page is `/` rather than `/index.html`. Canonicals, `og:url`, the
JSON-LD graph, `sitemap.xml` and `robots.txt` all use the same shape.

Vercel redirects `/standard.html` to `/standard`, so anything already shared
with the old shape keeps working.

Note that `check.mjs` understands this: an extensionless link resolves against
`<name>.html` on disk.

**Still on the old domain:** the trade address is `trade@farmologic.com`. That
is a mailbox rather than a URL, so it has been left alone. Confirm whether it
should move to `.io` with the site.

## Before the site goes public

Unresolved at the time of writing, all recorded in `docs/client-brief.md` and
`site/assets/img/CREDITS.md`:

- DPIIT permission for the Make in India mark
- Licensing for the *Cordyceps militaris* photographs
- Consent to publish the founder's portrait
- Confirmation of the two degrees named on the About page
- A privacy policy covering the enquiry form
