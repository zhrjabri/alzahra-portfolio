# Alzahra Al Jabri Portfolio

Personal portfolio of Alzahra Ali Nasser Al Jabri — Artificial Intelligence
graduate and AI & Software Developer based in the Sultanate of Oman. A
single-page site presenting her background, skills, featured projects,
professional journey, achievements and contact details.

**Live site:** https://alzahra-portfolio.vercel.app/

## Sections

| Section | Contents |
|---|---|
| Hero | Name, title and the primary calls to action |
| About | Background and the kind of work she is looking for |
| Skills | Six categories: AI & machine learning, Python, APIs, data, application development, automation |
| Projects | AI-Powered Fake News Detection Platform (graduation project) and "Nasek", each with an expandable case study |
| Journey | Dated timeline from secondary education through to the AI degree |
| Achievements | First place nationally, registered software work, degree, graduation project |
| Contact | Email, LinkedIn and location |

## Featured projects

**AI-Powered Fake News Detection Platform** — graduation project. A full-stack
application that analyses Arabic and English news content and scores its
credibility from 0–100, cross-referencing claims against trusted sources via
the OpenAI and Google Search APIs.

**"Nasek" — Hajj & Umrah Booking Platform** — live at
https://nasek.vercel.app/. A platform bringing Omani Hajj and Umrah campaigns
into one place. Registered with the Intellectual Property Department,
Ministry of Commerce and Industry, Oman (Reg. No. CPRG0003420354), and first
place nationally in the Ibda'at competition.

## Tech stack

- **Next.js 14** (App Router) with React 18
- **TypeScript**
- **Tailwind CSS** with a custom token layer for colour and type
- **next/font/google** — Cormorant Garamond (display and body) and JetBrains
  Mono (labels and data)
- Deployed on **Vercel**

The site is frontend-only. There is no server, database or API to run.

## Features

- Fixed header with a scroll-aware treatment and an active-section indicator
- Expandable case studies for both projects
- Scroll-reveal transitions on each section
- SEO metadata via the Next.js Metadata API — title, description, canonical
  URL, Open Graph and Twitter card
- Generated `robots.txt` and `sitemap.xml`, both driven by the same site URL

### Responsive design

- Laid out for phone, tablet and desktop, tested from 360px upward
- Fluid display type via `clamp()`, so headings scale with the viewport
  without overflowing narrow screens
- Navigation collapses to a menu below 1024px, with body-scroll locking and
  Escape-to-close
- Line lengths capped in `ch` units to keep body copy readable at every width

### Accessibility

- All text meets WCAG AA contrast on every surface
- Skip-to-content link and a `<main>` landmark
- Visible keyboard focus on every interactive element
- Collapsed case studies stay out of the tab order
- Anchor links account for the fixed header, so headings are never hidden
  underneath it
- `prefers-reduced-motion` is respected; content is never left hidden
- Touch targets sized for comfortable tapping

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
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Type-check without emitting files |

### Environment

One optional variable, used for canonical metadata, share previews,
`robots.txt` and `sitemap.xml`:

```
NEXT_PUBLIC_SITE_URL=https://alzahra-portfolio.vercel.app
```

Copy `.env.example` to `.env.local` for local development, and set the same
key in the host's environment variables for production. `app/site.ts` falls
back to the deployed URL when it is not set.

## Project structure

```
app/
  layout.tsx        root layout, fonts and SEO metadata
  page.tsx          assembles the sections
  globals.css       base typography, focus and motion styles
  site.ts           canonical site URL
  robots.ts         robots.txt
  sitemap.ts        sitemap.xml
components/
  Navbar.tsx        fixed header, active-section nav, mobile menu
  Hero.tsx          landing section
  About.tsx         About
  Skills.tsx        skill categories
  Projects.tsx      featured project and Nasek, with case studies
  Timeline.tsx      professional journey
  Achievements.tsx  achievements grid
  Contact.tsx       contact details
  Footer.tsx        footer
  Logo.tsx          the AZ monogram, shared by the nav and footer
  Reveal.tsx        scroll-reveal wrapper
public/             favicon, logo, share image and project screenshots
tailwind.config.ts  colour, type and animation tokens
```

## Editing the content

Every section's text lives in its own component as plain data or JSX — there
is no CMS. Skills, timeline entries and achievements are arrays at the top of
their files; the rest is written inline. Page title and share metadata are in
the `metadata` object in `app/layout.tsx`.

## Deployment

Deployed on Vercel from the `main` branch. Vercel detects Next.js
automatically, so no build configuration is required beyond setting
`NEXT_PUBLIC_SITE_URL` once a custom domain is live.

## Contact

- Email: aljabrialzahra1@gmail.com
- LinkedIn: https://linkedin.com/in/alzahra-al-jabri-0164ab416

---

© 2026 Alzahra Al Jabri. All rights reserved.
