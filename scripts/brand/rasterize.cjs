// Rasterise the brand kit with a headless browser. Run after export_svg.py.
//
// Writes, relative to --out (default: the repository root):
//   brand/png/*.png                      every SVG in brand/, transparent, at 4x
//                                        (single marks and plates at 512px)
//   public/favicon.ico                   16, 32 and 48px plate, transparent mark
//   public/apple-touch-icon.png, public/icon-192.png, public/icon-512.png
//                                        solid icons (plum plate, white mark)
//   public/og.png, public/og/<slug>.png  1200x630 social cards from
//                                        scripts/og-image.html
//
// Requires Playwright, which is not a dependency of the site:
//   npm install --no-save playwright && npx playwright install chromium
// Set PLAYWRIGHT_CHANNEL=chrome to use an installed Google Chrome instead.
//
// Usage: node scripts/brand/rasterize.cjs [--out DIR]

const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const { chromium } = require("playwright");

const REPO = path.resolve(__dirname, "..", "..");
const outFlag = process.argv.indexOf("--out");
const OUT = outFlag > -1 ? path.resolve(process.argv[outFlag + 1]) : REPO;
const BRAND = path.join(OUT, "brand");
const PUBLIC = path.join(OUT, "public");
const CARDS = [
  ["", "og.png"],
  ["timora", "og/timora.png"],
  ["nasek", "og/nasek.png"],
  ["fake-news-detection", "og/fake-news-detection.png"],
];

function svgSize(svg) {
  const [, , w, h] = svg.match(/viewBox="([^"]+)"/)[1].split(" ").map(Number);
  return { w, h };
}

/** A .ico holding PNG images (supported by every current browser). */
function writeIco(file, pngs) {
  const header = Buffer.alloc(6 + 16 * pngs.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = header.length;
  pngs.forEach(({ size, data }, i) => {
    const e = 6 + 16 * i;
    header.writeUInt8(size >= 256 ? 0 : size, e);
    header.writeUInt8(size >= 256 ? 0 : size, e + 1);
    header.writeUInt8(0, e + 2);
    header.writeUInt8(0, e + 3);
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(data.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  fs.writeFileSync(file, Buffer.concat([header, ...pngs.map((p) => p.data)]));
}

(async () => {
  const browser = await chromium.launch(
    process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {},
  );
  const page = await browser.newPage({ deviceScaleFactor: 1 });

  async function render(svg, w, h, background) {
    await page.setViewportSize({ width: w, height: h });
    const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
    await page.setContent(
      `<html><body style="margin:0;background:${background || "transparent"}">` +
        `<img src="${src}" style="display:block;width:${w}px;height:${h}px"></body></html>`,
    );
    await page.waitForFunction(() => document.images[0].complete);
    return page.screenshot({ omitBackground: !background, clip: { x: 0, y: 0, width: w, height: h } });
  }

  // Brand kit PNGs.
  const pngDir = path.join(BRAND, "png");
  fs.mkdirSync(pngDir, { recursive: true });
  const svgs = fs.readdirSync(BRAND).filter((f) => f.endsWith(".svg")).sort();
  for (const file of svgs) {
    const svg = fs.readFileSync(path.join(BRAND, file), "utf8");
    const { w, h } = svgSize(svg);
    const scale = w <= 48 ? 512 / 48 : 4;
    const png = await render(svg, Math.round(w * scale), Math.round(h * scale));
    fs.writeFileSync(path.join(pngDir, file.replace(/\.svg$/, ".png")), png);
  }

  // Site icons. The favicon keeps the transparent mark; home-screen icons are
  // the plum plate over white, which fills the mark.
  const plate = fs.readFileSync(path.join(BRAND, "plate-plum.svg"), "utf8");
  const icoImages = [];
  for (const size of [16, 32, 48]) icoImages.push({ size, data: await render(plate, size, size) });
  writeIco(path.join(PUBLIC, "favicon.ico"), icoImages);
  for (const [size, name] of [[180, "apple-touch-icon.png"], [192, "icon-192.png"], [512, "icon-512.png"]]) {
    fs.writeFileSync(path.join(PUBLIC, name), await render(plate, size, size, "#FFFFFF"));
  }

  // Social cards.
  fs.mkdirSync(path.join(PUBLIC, "og"), { recursive: true });
  await page.setViewportSize({ width: 1200, height: 630 });
  const template = pathToFileURL(path.join(REPO, "scripts", "og-image.html")).href;
  for (const [hash, out] of CARDS) {
    await page.goto("about:blank");
    await page.goto(template + (hash ? `#${hash}` : ""), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(PUBLIC, out) });
  }

  await browser.close();
  console.log(`Rasterised ${svgs.length} brand PNGs, icons and ${CARDS.length} social cards under ${OUT}`);
})();
