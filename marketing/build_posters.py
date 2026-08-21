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
        "domain": "Register interest",
        "note": "B2B ingredient supply \u00b7 Bengaluru, India",
    },
}


def css(fonts, logo):
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

:root{{--ivory:#F6F4EE;--gold:#C8A24A;--deep:#132A1D;}}
*{{box-sizing:border-box;margin:0;padding:0}}

.board{{position:relative;overflow:hidden;background:#111;isolation:isolate;
  font-family:'Montserrat',system-ui,sans-serif;color:var(--ivory)}}

/* the photograph, edge to edge. no panel over it. */
.board .shot{{position:absolute;inset:0;z-index:0;background-size:cover;
  background-repeat:no-repeat}}

/* just enough shade for type to hold. feathered over half the frame so it
   reads as depth in the picture rather than a box laid on top of it. */
.board .shade{{position:absolute;inset:0;z-index:1;pointer-events:none;
  background:
    radial-gradient(120% 70% at 8% 100%, rgba(19,42,29,.55) 0%, rgba(19,42,29,0) 62%),
    linear-gradient(180deg,
      rgba(19,42,29,0) 0%, rgba(19,42,29,0) 26%,
      rgba(19,42,29,.28) 42%, rgba(19,42,29,.60) 58%,
      rgba(19,42,29,.84) 74%, rgba(19,42,29,.95) 88%, rgba(19,42,29,.98) 100%);}}
.wide .shade{{background:linear-gradient(100deg,
    rgba(19,42,29,.93) 0%, rgba(19,42,29,.80) 34%,
    rgba(19,42,29,.30) 60%, rgba(19,42,29,0) 84%);}}

.inner{{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;
  justify-content:space-between;padding:7.4%}}
.wide .inner{{padding:6% 5.6%;align-items:flex-start}}
.wide .foot{{max-width:56%}}

.tile{{display:inline-block;background:var(--ivory);border-radius:9px;
  padding:2.6% 3.4%;line-height:0}}
.square .tile img{{height:44px}} .portrait .tile img{{height:48px}}
.story .tile img{{height:56px}}  .wide .tile img{{height:36px}}
.tile img{{display:block;width:auto}}

.eyebrow{{display:flex;align-items:center;gap:.85em;color:var(--gold);
  font-weight:600;letter-spacing:.30em;text-transform:uppercase;font-size:20px}}
.eyebrow i{{width:.4em;height:.4em;border-radius:50%;background:var(--gold);flex:0 0 auto}}
.story .eyebrow{{font-size:23px}} .wide .eyebrow{{font-size:16px}}

h1{{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;font-weight:500;
  font-size:104px;line-height:1.04;letter-spacing:-.004em;margin-top:.30em;
  text-shadow:0 2px 30px rgba(9,20,14,.5)}}
.portrait h1{{font-size:112px}} .story h1{{font-size:120px}} .wide h1{{font-size:76px}}

.sub{{margin-top:.95em;font-size:25px;line-height:1.55;font-weight:400;
  color:rgba(246,244,238,.80)}}
.story .sub{{font-size:28px}} .wide .sub{{font-size:20px}}

.hair{{display:block;height:2px;width:100%;margin:1.5em 0 1.1em;
  background:linear-gradient(90deg,var(--gold) 0%,rgba(200,162,74,.22) 74%,rgba(200,162,74,0) 100%)}}
.wide .hair{{margin:1.3em 0 .95em}}

.domain{{font-weight:600;font-size:40px;letter-spacing:.055em}}
.story .domain{{font-size:46px}} .wide .domain{{font-size:31px}}
.note{{margin-top:.7em;font-size:17px;letter-spacing:.14em;text-transform:uppercase;
  font-weight:500;color:rgba(246,244,238,.55)}}
.wide .note{{font-size:14px}}

/* ---------------------------------------------------------------------------
   Studio: no photograph. Bone ground, the logo set directly on it because a
   light ground needs no tile, and the cordyceps drawn as line art, ghosted
   back so it reads as a watermark rather than an illustration.
--------------------------------------------------------------------------- */
.board.studio{{background:
  radial-gradient(120% 100% at 12% 8%, #FBFAF6 0%, #F6F4EE 46%, #EFEDE4 100%);
  color:#1E3D2B}}
.board.studio .motif{{position:absolute;z-index:0;opacity:.17;
  background-repeat:no-repeat;background-size:contain;background-position:bottom right}}
.square.studio .motif{{right:5%;bottom:30%;width:40%;height:44%}}
.portrait.studio .motif{{right:5%;bottom:34%;width:42%;height:40%}}
.story.studio .motif{{right:0;bottom:33%;width:72%;height:28%}}
.wide.studio .motif{{right:4%;bottom:14%;width:26%;height:70%}}

/* the text column keeps clear of the motif */
.square.studio .foot,
.portrait.studio .foot{{max-width:74%}}
.story.studio .foot{{max-width:88%}}
.wide.studio .foot{{max-width:64%}}

.studio .tile{{background:none;padding:0;border-radius:0}}
.square.studio .tile img{{height:56px}} .portrait.studio .tile img{{height:60px}}
.story.studio .tile img{{height:70px}}  .wide.studio .tile img{{height:46px}}

/* Brand gold fails contrast on bone, so text uses the site's derived
   --gold-text; pure gold is kept for rules and the dot, which are not text. */
.studio .eyebrow{{color:#7E611F}}
.studio .eyebrow i{{background:var(--gold)}}
.studio h1{{font-style:normal;font-weight:600;color:#1E3D2B;text-shadow:none;
  letter-spacing:-.012em}}
.studio .sub{{color:rgba(30,61,43,.74)}}
.studio .sub em{{font-family:'Cormorant Garamond',Georgia,serif;font-style:italic;
  font-size:1.14em;color:#1E3D2B}}
.studio .hair{{background:linear-gradient(90deg,var(--gold) 0%,
  rgba(200,162,74,.30) 70%,rgba(200,162,74,0) 100%)}}
.studio .domain{{color:#1E3D2B;font-size:30px;letter-spacing:.02em}}
.square.studio .domain{{font-size:30px}} .portrait.studio .domain{{font-size:32px}}
.story.studio .domain{{font-size:36px}}  .wide.studio .domain{{font-size:24px}}
.studio .domain::after{{content:"  →";color:var(--gold)}}
.studio .note{{color:rgba(30,61,43,.55)}}
.studio .foot{{position:relative;z-index:2}}
"""


def board_markup(variant, shape, w, h, photo_uri, focal, logo_uri, motif_uri):
    c = COPY[variant]
    if variant == "studio":
        ground = f'<div class="motif" style="background-image:url({motif_uri})"></div>'
    else:
        ground = (f'<div class="shot" style="background-image:url({photo_uri});'
                  f'background-position:{focal}"></div><div class="shade"></div>')
    return f"""<div class="board {shape} {variant}" style="width:{w}px;height:{h}px">
  {ground}
  <div class="inner">
    <header><span class="tile"><img src="{logo_uri}" alt="Farmologic"></span></header>
    <div class="foot">
      <p class="eyebrow"><i></i>{c['eyebrow']}</p>
      <h1>{c['head']}</h1>
      <p class="sub">{c['sub']}</p>
      <span class="hair"></span>
      <p class="domain">{c['domain']}</p>
      <p class="note">{c['note']}</p>
    </div>
  </div>
</div>"""


def main():
    fonts = {k: data_uri(os.path.join(FONTS, v), "font/ttf") for k, v in FONT_FILES.items()}
    logo = data_uri(os.path.join(IMG, "logo-header.png"), "image/png")
    photos = {}
    style = css(fonts, logo)

    shutil.rmtree(BOARD_DIR, ignore_errors=True)
    os.makedirs(BOARD_DIR, exist_ok=True)

    sheet_boards = []
    for variant in ("photo", "studio"):
        for name, w, h, shape, photo, focal in BOARDS:
            if photo not in photos:
                photos[photo] = data_uri(os.path.join(IMG, photo), "image/jpeg")
            motif = cordyceps_svg(seed=3 if shape != "wide" else 5,
                                  n=9 if shape != "wide" else 7)
            markup = board_markup(variant, shape, w, h, photos[photo], focal, logo, motif)

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
