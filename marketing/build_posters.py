#!/usr/bin/env python3
"""Launch posters for farmologic.io — full-bleed photography, type on the image.

Writes one self-contained HTML file per artboard into marketing/boards/, plus a
contact sheet at marketing/posters.html for reviewing them all at once. The
export step renders each board with headless Chrome at its exact pixel size, so
the typography is whatever Chrome draws — no approximation.

    python3 marketing/build_posters.py
    bash    marketing/export.sh

Fonts and images are inlined as data URIs so a board is a single portable file.
Copy lives in COPY, sizes in BOARDS.
"""

import base64
import os
import random
import shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(ROOT, "marketing", "fonts")
IMG = os.path.join(ROOT, "site", "assets", "img")
BOARD_DIR = os.path.join(ROOT, "marketing", "boards")
SHEET = os.path.join(ROOT, "marketing", "posters.html")


def cordyceps_svg(w=900, h=1000, n=9, seed=3, stroke="#1E3D2B", sw=2.4):
    """Cordyceps militaris stromata as line art: a slim stalk swelling into a
    blunt club. Outlined rather than filled, so it ghosts back behind type."""
    rnd = random.Random(seed)
    y0, cx = h * 0.88, w * 0.5
    spread = w * 0.34
    out = []
    order = sorted(range(n), key=lambda i: abs(i - (n - 1) / 2), reverse=True)
    for i in order:
        t = (i / (n - 1)) * 2 - 1
        x = cx + t * spread * rnd.uniform(0.85, 1.05)
        ht = h * (0.66 - 0.26 * abs(t) ** 1.6) * rnd.uniform(0.88, 1.08)
        lean = t * w * 0.055 * rnd.uniform(0.7, 1.2)
        bw = w * rnd.uniform(0.013, 0.019)
        cw = bw * rnd.uniform(2.5, 3.4)
        shoulder = ht * rnd.uniform(0.66, 0.76)
        tx = x + lean
        out.append(
            f'<path d="M{x-bw:.1f},{y0:.1f} '
            f'C{x-bw*1.5:.1f},{y0-ht*0.30:.1f} {tx-cw*0.92:.1f},{y0-shoulder*0.72:.1f} '
            f'{tx-cw:.1f},{y0-shoulder:.1f} '
            f'C{tx-cw:.1f},{y0-ht*0.95:.1f} {tx-cw*0.62:.1f},{y0-ht:.1f} {tx:.1f},{y0-ht:.1f} '
            f'C{tx+cw*0.62:.1f},{y0-ht:.1f} {tx+cw:.1f},{y0-ht*0.95:.1f} '
            f'{tx+cw:.1f},{y0-shoulder:.1f} '
            f'C{tx+cw*0.92:.1f},{y0-shoulder*0.72:.1f} {x+bw*1.5:.1f},{y0-ht*0.30:.1f} '
            f'{x+bw:.1f},{y0:.1f}"/>')
    out.append(f'<path d="M{cx-spread*1.25:.1f},{y0:.1f} '
               f'Q{cx:.1f},{y0+h*0.045:.1f} {cx+spread*1.25:.1f},{y0:.1f}"/>')
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
           f'width="{w}" height="{h}"><g fill="none" stroke="{stroke}" stroke-width="{sw}" '
           f'stroke-linecap="round" stroke-linejoin="round">{"".join(out)}</g></svg>')
    return "data:image/svg+xml;base64," + base64.b64encode(svg.encode()).decode("ascii")


def data_uri(path, mime):
    with open(path, "rb") as fh:
        return f"data:{mime};base64," + base64.b64encode(fh.read()).decode("ascii")


FONT_FILES = {
    "corm_600": "CormorantGaramond-SemiBold.ttf",
    "corm_500i": "CormorantGaramond-MediumItalic.ttf",
    "mont_400": "Montserrat-Regular.ttf",
    "mont_500": "Montserrat-Medium.ttf",
    "mont_600": "Montserrat-SemiBold.ttf",
}

# name, w, h, shape class, photo, focal point (background-position)
BOARDS = [
    ("instagram-post",     1080, 1080, "square",   "fruiting-body.jpeg",   "58% 42%"),
    ("instagram-portrait", 1080, 1350, "portrait", "fruiting-body.jpeg",   "60% 36%"),
    ("instagram-story",    1080, 1920, "story",    "fruiting-body.jpeg",   "62% 30%"),
    ("linkedin-x",         1200,  630, "wide",     "harvest-in-hand.jpeg", "62% 44%"),
    ("whatsapp-square",     800,  800, "square",   "fruiting-body.jpeg",   "58% 42%"),
]

COPY = {
    "photo": {
        "eyebrow": "Now live",
        "head": "Cordyceps militaris",
        "head_italic": True,
        "sub": "Cultivated under controlled indoor conditions.<br>Bengaluru, India.",
        "domain": "farmologic.io",
        "note": "B2B ingredient supply",
    },
    "studio": {
        "eyebrow": "The site is live",
        "head": "farmologic.io",
        "head_italic": False,
        "sub": "Science-backed ingredients for the next generation of wellness. "
               "Starting with <em>Cordyceps militaris</em>, cultivated under "
               "controlled indoor conditions in Bengaluru.",
        "quote": "The finest harvest begins with the highest standards.",
    },
}


def scale_for(w, h):
    """One number per artboard that every dimension derives from.

    Scaling by width alone makes a short landscape board look shouty and a tall
    story board look timid, so the base is the width bounded by the height, then
    softened so the spread between formats is a nudge rather than a cliff.
    """
    base = min(w, h * 0.8) / 1080.0
    # A short landscape board still needs type big enough to read as a link
    # card at thumbnail size, so the scale has a floor.
    return round(max(base ** 0.8, 0.62), 4)


def css(fonts):
    face = lambda fam, w, st, k: (
        f"@font-face{{font-family:'{fam}';font-weight:{w};font-style:{st};"
        f"font-display:block;src:url({fonts[k]}) format('truetype')}}"
    )
    return f"""
{face('Cormorant Garamond',600,'normal','corm_600')}
{face('Cormorant Garamond',500,'italic','corm_500i')}
{face('Montserrat',400,'normal','mont_400')}
{face('Montserrat',500,'normal','mont_500')}
{face('Montserrat',600,'normal','mont_600')}

:root{{--ivory:#F6F4EE;--gold:#C8A24A;--gold-text:#7E611F;--forest:#1E3D2B;--deep:#132A1D}}
*{{box-sizing:border-box;margin:0;padding:0}}

/* Every size below is calc(var(--u) * n). --u is set per board, so one set of
   numbers holds its proportions at 1200x630 and at 1080x1920 alike. */
.board{{position:relative;overflow:hidden;background:#111;isolation:isolate;
  font-family:'Montserrat',system-ui,sans-serif;color:var(--ivory);
  --pad:calc(var(--u) * 88)}}

.board .shot{{position:absolute;inset:0;z-index:0;background-size:cover;
  background-repeat:no-repeat}}

/* Enough shade for type to hold, feathered across half the frame so it reads
   as depth in the picture rather than a panel laid over it. */
.board .shade{{position:absolute;inset:0;z-index:1;pointer-events:none;
  background:
    radial-gradient(130% 82% at 4% 100%, rgba(19,42,29,.62) 0%, rgba(19,42,29,0) 68%),
    linear-gradient(180deg,
      rgba(19,42,29,0) 0%, rgba(19,42,29,0) 20%,
      rgba(19,42,29,.30) 36%, rgba(19,42,29,.62) 53%,
      rgba(19,42,29,.85) 70%, rgba(19,42,29,.95) 86%, rgba(19,42,29,.98) 100%)}}
.wide .shade{{background:linear-gradient(100deg,
    rgba(19,42,29,.93) 0%, rgba(19,42,29,.80) 34%,
    rgba(19,42,29,.30) 60%, rgba(19,42,29,0) 84%)}}

.inner{{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;
  justify-content:flex-end;padding:var(--pad)}}
.wide .inner{{justify-content:center}}

/* Instagram lays its own UI over roughly the top and bottom 250px of a story,
   so the content is kept inside that. */
.story .inner{{padding-top:calc(var(--u) * 150);padding-bottom:calc(var(--u) * 250)}}

/* The lockups are lifted from the brand deck's vector art, one dark and one
   reversed, so neither ground needs the logo boxed on a tile any more. */
.tile{{display:inline-block;line-height:0;margin-bottom:calc(var(--u) * 54)}}
.tile img{{display:block;width:auto;height:calc(var(--u) * 150)}}
.photo .tile img{{filter:drop-shadow(0 calc(var(--u) * 2) calc(var(--u) * 26) rgba(9,20,14,.62))}}

.eyebrow{{display:flex;align-items:center;gap:.85em;color:var(--gold);
  font-weight:600;letter-spacing:.30em;text-transform:uppercase;
  font-size:calc(var(--u) * 22)}}
.eyebrow i{{width:.4em;height:.4em;border-radius:50%;background:var(--gold);flex:0 0 auto}}

h1{{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:500;
  font-size:calc(var(--u) * 112);line-height:1.04;letter-spacing:-.004em;
  margin-top:calc(var(--u) * 26);
  text-shadow:0 calc(var(--u) * 2) calc(var(--u) * 30) rgba(9,20,14,.5)}}

.sub{{margin-top:calc(var(--u) * 26);font-size:calc(var(--u) * 27);line-height:1.56;
  font-weight:400;color:rgba(246,244,238,.80)}}
.sub em{{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;
  font-size:1.34em;line-height:1;color:var(--ivory)}}

.hair{{display:block;height:max(1px, calc(var(--u) * 2));width:100%;
  margin:calc(var(--u) * 46) 0 calc(var(--u) * 30);
  background:linear-gradient(90deg,var(--gold) 0%,rgba(200,162,74,.22) 74%,
    rgba(200,162,74,0) 100%)}}

.domain{{font-weight:600;font-size:calc(var(--u) * 42);letter-spacing:.055em}}
.note{{margin-top:calc(var(--u) * 12);font-size:calc(var(--u) * 18);letter-spacing:.14em;
  text-transform:uppercase;font-weight:500;color:rgba(246,244,238,.55)}}

.square .foot,.portrait .foot{{max-width:calc(var(--u) * 900)}}
.story .foot{{max-width:calc(var(--u) * 950)}}
.wide  .foot{{max-width:58%}}

/* ---------------------------------------------------------------------------
   Studio: no photograph. Bone ground, the logo set straight on it because a
   light ground needs no tile, and the cordyceps as line art ghosted back.
--------------------------------------------------------------------------- */
.board.studio{{background:
  radial-gradient(120% 100% at 12% 8%, #FBFAF6 0%, #F6F4EE 46%, #EFEDE4 100%);
  color:var(--forest)}}
.board.studio .motif{{position:absolute;z-index:0;opacity:.17;
  background-repeat:no-repeat;background-size:contain;background-position:bottom right}}
.square.studio   .motif{{right:5%;bottom:30%;width:40%;height:44%}}
.portrait.studio .motif{{right:5%;bottom:34%;width:42%;height:40%}}
.story.studio    .motif{{right:0;bottom:40%;width:88%;height:30%}}
.wide.studio     .motif{{right:4%;bottom:14%;width:26%;height:70%}}

.studio .tile img{{height:calc(var(--u) * 210)}}
.studio .foot{{position:relative;z-index:2}}

/* Brand gold is 2.19:1 on bone and fails as text, so text here takes the
   site's derived --gold-text at 5.28:1. Pure gold stays on rules and marks. */
.studio .eyebrow{{color:var(--gold-text)}}
.studio .eyebrow i{{background:var(--gold)}}
.studio h1{{font-style:normal;font-weight:600;color:var(--forest);text-shadow:none;
  letter-spacing:-.012em}}
.studio .sub{{color:rgba(30,61,43,.74)}}
.studio .sub em{{color:var(--forest)}}
.studio .hair{{background:linear-gradient(90deg,var(--gold) 0%,
  var(--gold) 34%,rgba(200,162,74,.45) 76%,rgba(200,162,74,0) 100%)}}
.studio .domain{{color:var(--forest);font-size:calc(var(--u) * 32);letter-spacing:.02em}}
.studio .domain::after{{content:"  →";color:var(--gold-text)}}
.studio .note{{color:rgba(30,61,43,.55)}}

/* Replaces the call to action: a short gold tick, then the line, set quietly
   in the display face so it reads as a closing remark rather than a headline. */
.tick{{display:block;width:calc(var(--u) * 54);height:max(1px, calc(var(--u) * 2));
  background:var(--gold);margin:calc(var(--u) * 50) 0 calc(var(--u) * 26)}}
.quote{{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:500;
  font-size:calc(var(--u) * 34);line-height:1.32;color:rgba(30,61,43,.62);
  max-width:calc(var(--u) * 800)}}
"""


def board_markup(variant, shape, w, h, photo_uri, focal, logo_uri, motif_uri):
    c = COPY[variant]
    if variant == "studio":
        ground = f'<div class="motif" style="background-image:url({motif_uri})"></div>'
    else:
        ground = (f'<div class="shot" style="background-image:url({photo_uri});'
                  f'background-position:{focal}"></div><div class="shade"></div>')
    if variant == "studio":
        tail = (f'<span class="tick"></span>'
                f'<p class="quote">{c["quote"]}</p>')
    else:
        tail = (f'<span class="hair"></span>'
                f'<p class="domain">{c["domain"]}</p>'
                f'<p class="note">{c["note"]}</p>')

    return f"""<div class="board {shape} {variant}" style="width:{w}px;height:{h}px;--u:{scale_for(w, h)}px">
  {ground}
  <div class="inner">
    <div class="foot">
      <span class="tile"><img src="{logo_uri}" alt="Farmologic"></span>
      <p class="eyebrow"><i></i>{c['eyebrow']}</p>
      <h1>{c['head']}</h1>
      <p class="sub">{c['sub']}</p>
      {tail}
    </div>
  </div>
</div>"""


def main():
    fonts = {k: data_uri(os.path.join(FONTS, v), "font/ttf") for k, v in FONT_FILES.items()}
    logos = {
        "studio": data_uri(os.path.join(IMG, "logo-lockup-hi.png"), "image/png"),
        "photo": data_uri(os.path.join(IMG, "logo-lockup-reversed-nt.png"), "image/png"),
    }
    photos = {}
    style = css(fonts)

    shutil.rmtree(BOARD_DIR, ignore_errors=True)
    os.makedirs(BOARD_DIR, exist_ok=True)

    sheet_boards = []
    for variant in ("photo", "studio"):
        for name, w, h, shape, photo, focal in BOARDS:
            if photo not in photos:
                photos[photo] = data_uri(os.path.join(IMG, photo), "image/jpeg")
            motif = cordyceps_svg(seed=3 if shape != "wide" else 5,
                                  n=9 if shape != "wide" else 7)
            markup = board_markup(variant, shape, w, h, photos[photo], focal,
                                  logos[variant], motif)

            slug = f"{variant}--{name}-{w}x{h}"
            with open(os.path.join(BOARD_DIR, f"{slug}.html"), "w") as fh:
                fh.write(f"<!doctype html><meta charset='utf-8'><title>{slug}</title>"
                         f"<style>{style}\nhtml,body{{background:#000}}</style>{markup}")

            sheet_boards.append(
                f"<figure class='wrap'><figcaption>{variant} &middot; {name} &middot; "
                f"{w}&times;{h}</figcaption>"
                f"<div class='scale' style='width:{w*0.30:.0f}px;height:{h*0.30:.0f}px'>"
                f"<div class='shrink' style='transform:scale(.30)'>{markup}</div></div></figure>"
            )

    with open(SHEET, "w") as fh:
        fh.write(f"""<!doctype html><meta charset="utf-8"><title>Farmologic — launch posters</title>
<style>{style}
body{{background:#0d1712;padding:44px;display:flex;flex-wrap:wrap;gap:44px;align-items:flex-start;
     font-family:'Montserrat',sans-serif}}
.wrap{{display:flex;flex-direction:column;gap:9px}}
figcaption{{color:#7f8f84;font-size:11px;letter-spacing:.18em;text-transform:uppercase}}
.scale{{overflow:hidden}} .shrink{{transform-origin:0 0}}
</style>{''.join(sheet_boards)}""")

    print(f"{len(BOARDS)*2} boards -> marketing/boards/")
    print(f"contact sheet -> marketing/posters.html")


if __name__ == "__main__":
    main()
