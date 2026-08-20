# Alzahra Al Jabri — Portfolio

A production-ready personal portfolio built with **Next.js 14, TypeScript, and Tailwind CSS**, using only the information from your CV. The visual signature is a "credibility dial" motif (a nod to the 0–100 scoring mechanic in your fake news detection project) used in the nav mark, hero background, and the project case study.

## 1. How to run the project

You'll need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install
npm run dev
```

Then open **http://localhost:3000** in your browser. The site auto-reloads as you edit files.

To build for production:

```bash
npm run build
npm run start
```

## 2. How to edit your information

Everything is plain text/data inside the components — no CMS needed.

| Section | File |
|---|---|
| Name, title, hero statement | `components/Hero.tsx` |
| About text | `components/About.tsx` |
| Skill categories & items | `components/Skills.tsx` (`CATEGORIES`, `STRENGTHS`) |
| Featured project + case study | `components/Projects.tsx` (`TECH`, `FEATURES`, and the JSX text) |
| "Nasek" project details | `components/Projects.tsx` (bottom card) |
| Timeline entries | `components/Timeline.tsx` (`EVENTS` array) |
| Achievements | `components/Achievements.tsx` (`ACHIEVEMENTS` array) |
| Contact details | `components/Contact.tsx` (`DETAILS` array) |
| Page title/SEO/social preview | `app/layout.tsx` (`metadata` object) |

## 3. Where to add project images/screenshots

1. Drop image files into `public/images/` (e.g. `public/images/dashboard.png`).
2. Reference them in `components/Projects.tsx`, e.g.:
   ```tsx
   import Image from "next/image";
   <Image src="/images/dashboard.png" alt="Dashboard screenshot" width={800} height={500} className="rounded-xl border border-line" />
   ```
3. A good spot is inside the case-study grid in the featured project card, or the dial preview panel next to the project description.

## 4. How to add your GitHub later

- Add a GitHub button next to the LinkedIn button in `components/Hero.tsx` (copy the LinkedIn `<a>` block, swap the icon path/text for GitHub, and set `href` to your profile URL).
- You can also link individual repos from each project card in `components/Projects.tsx`.

## 5. How to deploy it online

**Easiest: Vercel (made by the Next.js team, free tier)**
1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, and click "New Project."
3. Select your repo — Vercel auto-detects Next.js and deploys it. You'll get a live URL in a couple of minutes.
4. Once you have a custom domain, set `NEXT_PUBLIC_SITE_URL` in the host's
   environment variables. `app/site.ts` falls back to the Vercel URL, and
   metadata, `robots.txt` and `sitemap.xml` all follow from it.

Other options: Netlify, Cloudflare Pages, or any Node-compatible host.

## 6. Contact details (no form)

The contact section links straight to email and LinkedIn — there is no form to
submit. A form needs a server running somewhere to turn a submission into an
email; a plain `mailto:` link needs nothing, cannot silently fail, and opens the
visitor's own mail app with the address filled in.

- Email: aljabrialzahra1@gmail.com
- LinkedIn: linkedin.com/in/alzahra-al-jabri-0164ab416

Both are defined at the top of `components/Contact.tsx`.

### The `backend/` folder

`backend/` holds a working Flask + SMTP service written for an earlier version
of this site that did have a form. **Nothing on the live site calls it** — it is
kept as a standalone piece of work, and it still runs on its own:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows  (macOS/Linux: source .venv/bin/activate)
pip install -r requirements.txt
python app.py                   # http://127.0.0.1:5000
```

It needs `backend/.env` (copy `backend/.env.example`) with a Gmail App Password
in `SMTP_PASSWORD`. `python test_email.py` sends one real test email, and
<http://127.0.0.1:5000/api/health> reports whether the SMTP settings loaded.

Delete the folder if you would rather not keep it.

## Files & components created

```
app/
  layout.tsx        → root layout, fonts, SEO/Open Graph metadata
  page.tsx           → assembles all sections
  globals.css         → design tokens, base styles, reduced-motion & focus states
  favicon.svg         → dial-motif favicon
components/
  Navbar.tsx           → responsive nav with mobile menu
  Hero.tsx             → landing section
  About.tsx            → About Me
  Skills.tsx           → categorized skill cards + strengths
  Projects.tsx         → featured project (with expandable case study) + Nasek card
  Timeline.tsx         → "Professional Journey" timeline
  Achievements.tsx     → achievements grid
  Contact.tsx          → contact details + form
  Footer.tsx           → footer
  CredibilityDial.tsx  → the signature dial visual (reused across the site)
  Reveal.tsx           → scroll-reveal animation wrapper
tailwind.config.ts      → color/type/animation design tokens
```

## Design notes

- **Palette:** graphite/ink base (`#0B0F14`) with a signal-gold accent (`#E3B341`) and a verified-teal secondary (`#3FB8AF`) — chosen to evoke trust/verification rather than a generic neon "hacker" theme.
- **Type:** Space Grotesk (display), Inter (body), JetBrains Mono (labels/data) — loaded via `next/font/google`, no extra setup needed.
- **Motion:** subtle fade-up on load, scroll-reveal on each section, and a slow ambient sweep behind the hero. Respects `prefers-reduced-motion`.
- No fabricated statistics, employers, or skill percentages — every line of content traces back to your CV.
