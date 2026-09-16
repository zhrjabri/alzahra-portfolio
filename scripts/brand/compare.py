"""Check that a fresh brand export matches the committed assets.

Export into a scratch folder, then compare it with the repository:
  python scripts/brand/export_svg.py --out /tmp/brand-check
  node scripts/brand/rasterize.cjs --out /tmp/brand-check
  python scripts/brand/compare.py /tmp/brand-check

SVGs must match byte for byte. Raster files are compared pixel by pixel;
a difference of at most --tolerance (0–255) per channel is allowed, which
absorbs anti-aliasing noise between browser builds. Exits 1 on any mismatch.
"""
import argparse
import glob
import os
import sys

from PIL import Image, ImageChops

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))

parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
parser.add_argument("candidate", help="root folder written by export_svg.py and rasterize.cjs")
parser.add_argument("--tolerance", type=int, default=2)
args = parser.parse_args()
CANDIDATE = os.path.abspath(args.candidate)

FILES = sorted(
    [os.path.relpath(p, REPO) for p in glob.glob(os.path.join(REPO, "brand", "*.svg"))]
    + [os.path.relpath(p, REPO) for p in glob.glob(os.path.join(REPO, "brand", "png", "*.png"))]
    + [os.path.join("public", f) for f in ("favicon.svg", "favicon.ico", "apple-touch-icon.png",
                                           "icon-192.png", "icon-512.png", "og.png")]
    + [os.path.relpath(p, REPO) for p in glob.glob(os.path.join(REPO, "public", "og", "*.png"))]
)


def frames(path):
    """Every image in the file as RGBA (an .ico holds several sizes)."""
    img = Image.open(path)
    if path.endswith(".ico"):
        return [img.ico.getimage(size).convert("RGBA") for size in sorted(img.ico.sizes())]
    return [img.convert("RGBA")]


def max_difference(a, b):
    fa, fb = frames(a), frames(b)
    if [f.size for f in fa] != [f.size for f in fb]:
        return None
    worst = 0
    for x, y in zip(fa, fb):
        extrema = ImageChops.difference(x, y).getextrema()
        worst = max(worst, max(hi for _, hi in extrema))
    return worst


failures = 0
for rel in FILES:
    ours, theirs = os.path.join(REPO, rel), os.path.join(CANDIDATE, rel)
    if not os.path.exists(theirs):
        print(f"MISSING  {rel}")
        failures += 1
        continue
    if rel.endswith(".svg"):
        same = open(ours, "rb").read() == open(theirs, "rb").read()
        print(f"{'ok      ' if same else 'DIFFERS '} {rel}")
        failures += not same
        continue
    diff = max_difference(ours, theirs)
    if diff is None:
        print(f"SIZE     {rel}")
        failures += 1
    elif diff > args.tolerance:
        print(f"DIFFERS  {rel} (max channel difference {diff})")
        failures += 1
    else:
        print(f"ok       {rel}" + (f" (max channel difference {diff})" if diff else ""))

print(f"\n{len(FILES) - failures} of {len(FILES)} files reproduced")
sys.exit(1 if failures else 0)
