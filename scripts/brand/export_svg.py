"""Export the Byline brand kit as SVG, drawn from lib/brand.ts.

Writes, relative to --out (default: the repository root):
  brand/*.svg          marks, wordmarks, primary logo and plates, with text
                       converted to outlines so the files render anywhere
  public/favicon.svg   plate favicon that switches plum/rose with the OS theme

Wordmark text is shaped with HarfBuzz (kerning included) from Newsreader,
downloaded from Google Fonts into a cache in the system temp folder.

Usage:
  python scripts/brand/export_svg.py [--out DIR]
"""
import argparse
import io
import os
import re
import tempfile
import urllib.request

import uharfbuzz as hb
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
parser.add_argument("--out", default=REPO, help="root to write brand/ and public/ into")
args = parser.parse_args()
OUT_ROOT = os.path.abspath(args.out)

# --- geometry from lib/brand.ts ---------------------------------------------
SRC = io.open(os.path.join(REPO, "lib", "brand.ts"), encoding="utf-8").read()


def drawing(name):
    block = re.search(r"export const %s: MarkDrawing = \{(.*?)\n\};" % name, SRC, re.S).group(1)
    bowl = re.search(
        r"bowl: \{ cx: ([\d.]+), cy: ([\d.]+), rx: ([\d.]+), ry: ([\d.]+), stroke: ([\d.]+) \}", block
    ).groups()
    stem = re.search(r'stem: \{ d: "([^"]+)", stroke: ([\d.]+) \}', block).groups()
    transform = re.search(r'transform: "([^"]+)"', block)
    return dict(
        bowl=[float(x) for x in bowl],
        stem=(stem[0], float(stem[1])),
        cut=re.search(r'cut: "([^"]+)"', block).group(1),
        rule=re.search(r'rule: "([^"]+)"', block).group(1),
        transform=transform.group(1) if transform else None,
    )


MARKS = {
    "primary": drawing("MARK_PRIMARY"),
    "compact": drawing("MARK_COMPACT"),
    "italic": drawing("MARK_ITALIC"),
    "plate": drawing("PLATE_KNOCKOUT"),
}


def mark_g(m, color, x=0, y=0, scale=1):
    cx, cy, rx, ry, sw = m["bowl"]
    inner = (
        f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="none" stroke="{color}" stroke-width="{sw}"/>'
        f'<path d="{m["stem"][0]}" fill="none" stroke="{color}" stroke-width="{m["stem"][1]}"/>'
        f'<path d="{m["cut"]}" fill="{color}"/><path d="{m["rule"]}" fill="{color}"/>'
    )
    if m["transform"]:
        inner = f'<g transform="{m["transform"]}">{inner}</g>'
    return f'<g transform="translate({x} {y}) scale({scale})">{inner}</g>'


# --- fonts -------------------------------------------------------------------
CACHE = os.path.join(tempfile.gettempdir(), "alzahra-brand-fonts")
FONT_QUERIES = {
    # Google serves static TTF instances to old user agents.
    "Newsreader-normal-400.ttf": "Newsreader:ital,opsz,wght@0,72,400",
    "Newsreader-italic-400.ttf": "Newsreader:ital,opsz,wght@1,72,400",
}


def font_path(name):
    path = os.path.join(CACHE, name)
    if not os.path.exists(path):
        os.makedirs(CACHE, exist_ok=True)
        request = urllib.request.Request(
            "https://fonts.googleapis.com/css2?family=" + FONT_QUERIES[name],
            headers={"User-Agent": "Mozilla/4.0"},
        )
        css = urllib.request.urlopen(request).read().decode()
        url = re.search(r"url\((.*?)\)", css).group(1)
        with open(path, "wb") as f:
            f.write(urllib.request.urlopen(url).read())
    return path


def outline(text, font_file, size, x, y, color):
    """Shape with HarfBuzz and return (svg path, advance width)."""
    path = font_path(font_file)
    with open(path, "rb") as f:
        data = f.read()
    font = hb.Font(hb.Face(data))
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(font, buf, {"kern": True, "liga": True})
    tt = TTFont(path)
    glyphs, order = tt.getGlyphSet(), tt.getGlyphOrder()
    s = size / tt["head"].unitsPerEm
    pen, cursor = SVGPathPen(glyphs), 0
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        tp = TransformPen(pen, (s, 0, 0, -s, x + (cursor + pos.x_offset) * s, y - pos.y_offset * s))
        glyphs[order[info.codepoint]].draw(tp)
        cursor += pos.x_advance
    return f'<path fill="{color}" d="{pen.getCommands()}"/>', cursor * s


# --- brand kit ---------------------------------------------------------------
SCHEMES = {
    "light": dict(mark="#6B2740", text="#121212"),
    # Plum is 1.8:1 on ink; rose is 10.3:1.
    "dark": dict(mark="#D9B8C3", text="#F3F1EE"),
    "black": dict(mark="#000000", text="#000000"),
    "white": dict(mark="#FFFFFF", text="#FFFFFF"),
}
NAME = "Alzahra Al Jabri"
BRAND = os.path.join(OUT_ROOT, "brand")
PUBLIC = os.path.join(OUT_ROOT, "public")
os.makedirs(BRAND, exist_ok=True)
os.makedirs(PUBLIC, exist_ok=True)
written = []


def save(path, text):
    with io.open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)


def write(filename, w, h, body, title):
    save(
        os.path.join(BRAND, filename),
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" '
        f'width="{w:.0f}" height="{h:.0f}" role="img"><title>{title}</title>{body}</svg>\n',
    )
    written.append(filename)


def plate(fill):
    """The plate with the mark knocked out (transparent)."""
    return (
        '<mask id="p" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">'
        f'<rect width="48" height="48" fill="#fff"/>{mark_g(MARKS["plate"], "#000")}</mask>'
        f'<rect width="48" height="48" fill="{fill}" mask="url(#p)"/>'
    )


for scheme, c in SCHEMES.items():
    for kind in ("primary", "compact", "italic"):
        write(f"mark-{kind}-{scheme}.svg", 48, 48, mark_g(MARKS[kind], c["mark"]), f"{NAME} mark")

    # Horizontal wordmark: mark, clear space, name on the rule's baseline.
    text, tw = outline(NAME, "Newsreader-normal-400.ttf", 30, 56, 35, c["text"])
    write(f"wordmark-horizontal-{scheme}.svg", 56 + tw + 2, 48, mark_g(MARKS["primary"], c["mark"]) + text, NAME)

    # Short wordmark: italic mark, clear space so it never reads as a letter, "alzahra".
    text, tw = outline("alzahra", "Newsreader-italic-400.ttf", 34, 58, 35, c["text"])
    write(f"wordmark-short-{scheme}.svg", 58 + tw + 2, 48, mark_g(MARKS["italic"], c["mark"]) + text, "alzahra")

    # Primary logo: mark stacked above the name, left-aligned.
    text, tw = outline(NAME, "Newsreader-normal-400.ttf", 40, 2, 100, c["text"])
    write(f"logo-primary-{scheme}.svg", tw + 6, 112, mark_g(MARKS["primary"], c["mark"], 0, 0, 1.25) + text, NAME)

for scheme, fill in dict(plum="#6B2740", rose="#D9B8C3", black="#000000", white="#FFFFFF").items():
    write(f"plate-{scheme}.svg", 48, 48, plate(fill), f"{NAME} icon")

save(
    os.path.join(PUBLIC, "favicon.svg"),
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">'
    "<style>.plate{fill:#6B2740}@media (prefers-color-scheme:dark){.plate{fill:#D9B8C3}}</style>"
    '<mask id="k" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">'
    f'<rect width="48" height="48" fill="#fff"/>{mark_g(MARKS["plate"], "#000")}</mask>'
    '<rect class="plate" width="48" height="48" mask="url(#k)"/></svg>\n',
)
print(f"Wrote {len(written)} brand SVGs and public/favicon.svg under {OUT_ROOT}")
