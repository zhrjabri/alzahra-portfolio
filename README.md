# Alzahra Al Jabri Portfolio

Portfolio of Alzahra Al Jabri — AI graduate and software developer based in the
Sultanate of Oman. The site is designed as an editorial publication about her
work ("Folio"): an editorial homepage and a text-led case study for each
project.

**Live site:** https://alzahra-portfolio.vercel.app/

## Pages

| Route | Contents |
|---|---|
| `/` | Opening statement, "In this issue" contents, the three features (TIMORA as the lead), technology index, About, Journey and Contact |
| `/work/timora` | Case study: TIMORA — lead project |
| `/work/nasek` | Case study: NASEK |
| `/work/fake-news-detection` | Case study: AI-Powered Fake News Detection Platform |

Each case study has an at-a-glance facts row, an "On this page" contents list
that tracks the section being read, the question, what was built, text-only
figures, how it's built, how it's checked (where verified), the outcome and,
for TIMORA and NASEK, the design and engineering decisions in the margin.

## Featured projects

1. **TIMORA** — a web app for the things that repeat every few weeks, months or
   years. Designed and built solo. Live at https://timora-five.vercel.app/
2. **NASEK** — an Omani platform that brings Hajj and Umrah campaigns together
   in one place. 1st place in Oman at Ibda’at Shabab (smartphone applications),
   stage 5 of INJAZ Oman, and registered intellectual property (Reg. No.
   CPRG0003420354). Live at https://nasek.vercel.app/
3. **AI-Powered Fake News Detection Platform** — graduation project that scores
   Arabic and English news for credibility from 0 to 100 using the OpenAI and
   Google Search APIs. No public live demo is currently available.

Projects are presented without screenshots, by design.

## Design system — Folio

- **Colour** (light edition only): paper `#FFFFFF`, vellum `#F3F1EE`, ink
  `#121212`, ink-2 `#3A3633`, stone `#5E5A57`, hairline `#DCD7D2`, plum
  `#6B2740` (the single accent), rose `#D9B8C3` (logo on dark grounds only).
  Every text colour meets WCAG AA; the lowest pair is stone on vellum, 6.1:1.
- **Type**: Newsreader (headings and narrative, variable with optical sizes)
  and Hanken Grotesk (navigation, labels, facts), both through
  `next/font/google`. Newsreader uses a metric-matched Georgia fallback declared
  in `app/globals.css`, because Next 14 ships no fallback metrics for it.
- **Structure**: ink rules and hairlines, a margin column for labels and notes,
  roman numerals only where order matters. No cards, shadows, radii, gradients
  or decorative imagery.
- Tokens live in `tailwind.config.ts`; editorial components in the
  `@layer components` block of `app/globals.css`.

## Brand

The mark ("Byline") is a lowercase single-storey *a* whose stem curves into a
tapering baseline rule. Its geometry is defined once in `lib/brand.ts` and
drawn by `components/site/LogoMark.tsx`:

| Drawing | Use |
|---|---|
| A · Byline (`primary`) | Primary mark, 32px and up |
| A · Byline (`compact`) | Heavier drawing for 32px and below |
| B · Italic Byline (`italic`) | With the italic short wordmark *alzahra* |
| C · Plate (`plate`) | Favicon, app icons and social cards |

Plum is used on light grounds and rose on dark ones. Clear space around the
mark is a quarter of its height. Never mirror, rotate or outline it.

Exported files are in `brand/` (SVG with outlined text, plus PNG in
`brand/png/`): primary logo, horizontal wordmark, short wordmark, the three
marks and the plate — each in light, dark, black and white versions (plates in
plum, rose, black and white). Site icons (`favicon.svg`, `favicon.ico`,
`apple-touch-icon.png`, `icon-192.png`, `icon-512.png`) and social cards
(`og.png`, `og/*.png`) are in `public/`.

### Regenerating the brand kit

Everything in `brand/`, the site icons and the social cards is generated from
`lib/brand.ts` and `scripts/og-image.html` by the scripts in `scripts/brand/`.
Change the geometry or the card template there, never the exported files.

The tools are not dependencies of the site. Install them once:

```bash
python -m pip install -r scripts/brand/requirements.txt   # fonttools, uharfbuzz, pillow
npm install --no-save playwright
npx playwright install chromium   # or set PLAYWRIGHT_CHANNEL=chrome to use Google Chrome
```

Then, from the repository root:

```bash
python scripts/brand/export_svg.py   # brand/*.svg and public/favicon.svg
node scripts/brand/rasterize.cjs     # brand/png/, favicon.ico, app icons, social cards
```

To check that the committed files are reproducible, export into a scratch
folder and compare (SVGs must match byte for byte, rasters pixel by pixel):

```bash
python scripts/brand/export_svg.py --out ../brand-check
node scripts/brand/rasterize.cjs --out ../brand-check
python scripts/brand/compare.py ../brand-check
```

The wordmarks are outlined from Newsreader, which `export_svg.py` downloads
from Google Fonts into the system temp folder, and the social cards load the
site fonts from Google Fonts, so both steps need a network connection. If
Google publishes a new version of Newsreader, the outlines may change slightly;
review the result before committing.

## Tech stack

- **Next.js 14** (App Router) with React 18
- **TypeScript**
- **Tailwind CSS** with the Folio token layer
- **next/font/google** — Newsreader and Hanken Grotesk
- Deployed on **Vercel**

The site is static and frontend-only: no server, database or API.

## Accessibility and responsiveness

- English only; `<html lang="en">`
- Skip link, landmark regions, one `h1` per page and sequential headings
- Visible 2px plum focus ring on every interactive element
- Accessible mobile menu: `aria-expanded`, Escape to close with focus
  returned to the button, scroll lock while open
- External links open in a new tab with `rel="noopener noreferrer"`, a visible
  external-link icon and screen-reader text saying so
- Primary controls (menu, navigation, live-site links, case-study links and
  contents) have touch areas of at least 44px; every other target meets the
  WCAG 2.2 minimum of 24px. `prefers-reduced-motion` is respected, and content
  is never hidden waiting for an animation
- Laid out and tested at 360, 390, 768, 1024 and 1440px with no horizontal
  overflow; checked with axe (WCAG 2.2 AA)

## Running locally

Requires [Node.js](https://nodejs.org) 18 or newer.

```bash
git clone https://github.com/zhrjabri/alzahra-portfolio.git
cd alzahra-portfolio
npm install
npm run dev
```

Open http://localhost:3000.

### Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create the optimised production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint (`next/core-web-vitals`) |
| `npm run typecheck` | Type-check without emitting files (`tsc --noEmit`) |
| `npm run check:emoji` | Fail on any emoji or arrow glyph in a source file |
| `npm run validate` | Type-check, lint, the emoji check and the production build |

The site has no emoji anywhere: arrows and external-link marks are hairline
SVGs in `components/icons`, never glyphs. `npm run check:emoji` enforces that,
reporting the file, line and column of anything it finds. It skips
dependencies, build output, lockfiles and binary assets, and deliberately
allows editorial punctuation (`—` `–` `’` `“ ”` `·` `…` `©`).

### Environment

One optional variable, used for canonical URLs, share previews, `robots.txt`
and `sitemap.xml`:

```
NEXT_PUBLIC_SITE_URL=https://alzahra-portfolio.vercel.app
```

Copy `.env.example` to `.env.local` for local development, and set the same
key in the host's environment variables for production. `app/site.ts` falls
back to the deployed URL when it is not set.

## Project structure

```
app/
  layout.tsx            fonts, metadata, masthead and footer
  page.tsx              editorial homepage
  work/[slug]/page.tsx  case-study pages (static, one per project)
  not-found.tsx         404
  globals.css           Folio base styles and editorial components
  manifest.ts           web app manifest
  robots.ts, sitemap.ts robots.txt and sitemap.xml
  site.ts               canonical site URL
content/
  projects.ts           the three projects — single source of truth
  profile.ts            name, contact, About, Journey, technology index
components/
  site/                 Masthead, Footer, LogoMark
  home/                 Opening, Features, Sections (index, about, journey, contact)
  case/                 CaseStudy template, OnThisPage
  editorial/            Facts, LiveLink, TextFigure
  icons/                ArrowLeft, ArrowRight, ExternalLink (hairline SVGs)
lib/brand.ts            logo geometry and brand colours
brand/                  exported logo files (SVG + PNG)
public/                 favicons, app icons, social cards
scripts/
  check-no-emoji.mjs    fails the build on emoji or arrow glyphs
  og-image.html         source for the social cards
  brand/                brand-kit export: export_svg.py, rasterize.cjs, compare.py
```

## Editing the content

All copy lives in `content/projects.ts` and `content/profile.ts`. Only add
facts that are confirmed; dates appear only where they are known. Page titles
and share metadata come from `app/layout.tsx` and each project's
`metaDescription`.

## Deployment

Deployed on Vercel from the `main` branch. Vercel detects Next.js
automatically; set `NEXT_PUBLIC_SITE_URL` once a custom domain is live.

## Contact

- Email: aljabrialzahra1@gmail.com
- LinkedIn: https://linkedin.com/in/alzahra-al-jabri-0164ab416
- GitHub: https://github.com/zhrjabri

---

© 2026 Alzahra Al Jabri. All rights reserved.
