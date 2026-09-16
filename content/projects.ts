// The three featured projects, in their fixed order. Every statement here was
// confirmed by Alzahra or taken from the live products' own English copy; add
// nothing that isn't. Screenshots are deliberately not part of the model.

export type Fact = { label: string; value: string };

export type Figure = {
  /** "sequence" numbers its steps; "columns" shows parallel parts. */
  kind: "sequence" | "columns";
  items: string[];
  caption: string;
};

export type Decision = { title: string; body: string };

export type Project = {
  slug: string;
  numeral: "i" | "ii" | "iii";
  /** Short title used on the homepage. */
  title: string;
  /** Full title used as the case-study heading. */
  fullTitle: string;
  kicker: string;
  standfirst: string;
  /** Homepage paragraph, and a shorter version for small screens. */
  body: string;
  bodyShort: string;
  recognition?: string[];
  homeFacts: Fact[];
  caseFacts: Fact[];
  live?: { href: string; display: string };
  /** Shown instead of a live link when the project can't be visited. */
  noDemo?: boolean;
  quote?: { text: string; caption: string };
  origin?: string;
  question: string;
  built: string[];
  decisions: Decision[];
  figures: Figure[];
  howBuilt: string;
  howChecked?: string;
  outcome: string;
  metaDescription: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "timora",
    numeral: "i",
    title: "TIMORA",
    fullTitle: "TIMORA",
    kicker: "Live product · Designed and built solo",
    standfirst:
      "An Arabic-first web app for the things that repeat every few weeks, months or years.",
    body: "Log a task with one tap and TIMORA works out when it is due next. Water filters, AC servicing, car oil, passport renewals, even something lent to a friend. There are no nagging reminders and no complicated schedules.",
    bodyShort: "Log a task with one tap and TIMORA works out when it is due next.",
    homeFacts: [
      {
        label: "Role",
        value:
          "Sole designer and developer: idea, UX/UI, brand, front end, database and auth, testing, deployment",
      },
      { label: "Built with", value: "Next.js · React · TypeScript · Supabase" },
      { label: "Status", value: "Live · free to start" },
    ],
    caseFacts: [
      { label: "Role", value: "Sole designer and developer" },
      { label: "Type", value: "Web app with Arabic and English interfaces" },
      { label: "Status", value: "Live · free to start" },
      { label: "Built with", value: "Next.js 16 · React 19 · TypeScript · Supabase" },
    ],
    live: { href: "https://timora-five.vercel.app/", display: "timora-five.vercel.app" },
    quote: {
      text: "When did I last do this? When should I do it again?",
      caption: "The question on TIMORA’s opening screen",
    },
    question:
      "Some responsibilities come around too irregularly for a calendar and are too easy to forget: a kitchen water filter, AC servicing, car oil, a toothbrush, feeding plants, a pet’s treatment, passport and insurance renewals, a fire extinguisher check, something lent to a friend. TIMORA is built around two questions about each of them.",
    built: [
      "One-tap “Done now”: the date is saved instantly and the next one is calculated, with one-touch undo.",
      "A dashboard that answers at once: overdue, due today, coming up and recently done.",
      "QR labels you stick on the thing itself. Scanning one with a phone camera opens the item and shows when it was last done.",
      "The next date can be added to any calendar with an .ics file, without connecting accounts.",
      "Arabic and English interfaces, with privacy and terms pages.",
    ],
    decisions: [
      {
        title: "No nagging",
        body: "No reminder emails. The dashboard answers the question as soon as you open it.",
      },
      {
        title: "A QR code that reveals nothing",
        body: "Every item belongs to one account; a label tells anyone else nothing.",
      },
      {
        title: "Calendars without linking",
        body: "A downloadable .ics event instead of a calendar integration.",
      },
      {
        title: "Privacy in the database",
        body: "Row-level security on every table, not just checks in the interface.",
      },
      {
        title: "A logo that reads right to left",
        body: "Its direction follows Arabic reading order and is never mirrored for English.",
      },
    ],
    figures: [
      {
        kind: "sequence",
        items: [
          "Add what you want to track, and how often it comes around",
          "Tap “Done now” when you do it",
          "TIMORA works out the next date",
        ],
        caption: "The core loop, from TIMORA’s “How it works”.",
      },
    ],
    howBuilt:
      "Next.js 16 with the App Router, Server Components and Server Actions; React 19; strict TypeScript; Tailwind CSS 4 with Radix, Lucide and Sonner. Data and sign-in run on Supabase Postgres and Auth, with row-level security on every table. Zod validates the same rules in the browser and on the server. The app refuses to start if it is given a secret service-role key.",
    howChecked:
      "Unit and database tests run in Vitest, including row-level-security tests in PGlite with two separate users. End-to-end tests run in Playwright, with accessibility checks by axe-core.",
    outcome:
      "A live, free product, designed, branded, built, tested and deployed by one person. The interface is open about its limits: TIMORA records the intervals you choose and doesn’t give medical or technical advice.",
    metaDescription:
      "TIMORA, a web app for recurring tasks that come around every few weeks, months or years. Designed and built solo by Alzahra Al Jabri with Next.js, React, TypeScript and Supabase.",
  },
  {
    slug: "nasek",
    numeral: "ii",
    title: "NASEK",
    fullTitle: "NASEK",
    kicker: "Live product · Registered intellectual property",
    standfirst: "An Omani platform that brings Hajj and Umrah campaigns together in one place.",
    body: "Travellers compare campaigns by price, included services, remaining seats and reviews from people who actually travelled, then send a booking request. Campaign owners manage their trips in a separate portal.",
    bodyShort:
      "Compare campaigns by price, services, seats and reviews, then send a booking request.",
    recognition: [
      "1st place in Oman, Ibda’at Shabab (smartphone applications)",
      "Stage 5, INJAZ Oman",
      "Registered work, Reg. No. CPRG0003420354",
    ],
    homeFacts: [
      {
        label: "Role",
        value:
          "Led the original seven-member team as CEO; designed and built the live platform alone",
      },
      { label: "Built with", value: "React · TypeScript · Vite · Supabase" },
    ],
    caseFacts: [
      { label: "Role", value: "CEO of the original team · sole designer and developer of the live platform" },
      { label: "Type", value: "Three web applications" },
      { label: "Status", value: "Customer platform live" },
      { label: "Built with", value: "React 19 · TypeScript · Vite · Supabase" },
    ],
    live: { href: "https://nasek.vercel.app/", display: "nasek.vercel.app" },
    quote: {
      text: "Every price is per traveller and lists what it includes. NASEK adds nothing to it — you pay the campaign the price you see.",
      caption: "From NASEK’s promise to travellers",
    },
    origin:
      "NASEK began as a student project at Gulf College, built on the idea that a sharing-economy model could connect Omani Hajj and Umrah campaigns with the people looking for them. It started with 500 OMR of capital and a seven-member team that I led as CEO. It took 1st place in Oman at Ibda’at Shabab in the smartphone applications category, reached stage 5 of INJAZ Oman, and was registered as intellectual property on 01 May 2023. I later designed and built the live platform on my own.",
    question:
      "Pilgrims struggled to find campaigns near them, to learn what a price actually included, to know how many seats were left, and to judge which campaigns people were actually happy with. Campaign owners struggled to organise registrations and to reach beyond their own wilayah.",
    built: [
      "Search in your own words, in Arabic or English, turned into search filters.",
      "Smart Match: seven short questions, then the campaigns that fit best.",
      "A map of Oman showing campaigns by departure wilayah.",
      "Campaign pages with per-person prices, included services, hotels and reviews.",
      "Booking requests, saved campaigns, a traveller dashboard and notifications.",
      "Sign-in for pilgrims with a one-time code, so there is no password to create or remember.",
      "A report button on every campaign.",
      "NASEK Giving: a planned programme page, clearly marked as not yet accepting contributions.",
    ],
    decisions: [
      {
        title: "Three separate applications",
        body: "Customer platform, campaign-owner portal and administration each have their own build and host.",
      },
      {
        title: "NASEK doesn’t handle money",
        body: "A booking request produces an invoice the traveller sends to the campaign owner on WhatsApp; the owner shares payment details and confirms the booking once paid.",
      },
      {
        title: "Nothing added to the price",
        body: "Travellers pay the campaign the price they see.",
      },
      {
        title: "Only real travellers review",
        body: "Only travellers with a completed booking can review a campaign.",
      },
      {
        title: "Operators are checked first",
        body: "Every owner registers with their trade permit and is approved by NASEK before a single trip appears.",
      },
    ],
    figures: [
      {
        kind: "columns",
        items: [
          "Travellers use the customer platform",
          "Campaign owners use their own portal",
          "The NASEK team uses a separate administration app",
        ],
        caption:
          "Three applications, one Supabase backend. The portals are deliberately not linked from the public site.",
      },
      {
        kind: "sequence",
        items: [
          "The traveller sends a booking request",
          "NASEK issues an invoice, which the traveller sends to the campaign owner on WhatsApp",
          "The owner replies with payment details and is paid directly",
          "The owner confirms the booking",
        ],
        caption: "Booking without handling payment.",
      },
    ],
    howBuilt:
      "React 19 with React Router 7; TypeScript; Vite, with one shared configuration and four entry points; Tailwind CSS 4, lucide-react and Recharts. The backend is Supabase: Postgres, Auth, row-level security and Edge Functions. Each application is its own Vercel project.",
    howChecked:
      "Every push runs GitHub Actions: type checks, a build of all three applications and a verification suite. One check reads the compiled output and fails if owner or administration code has reached the public app.",
    outcome:
      "A live customer platform; 1st place in Oman at Ibda’at Shabab; stage 5 of INJAZ Oman; registered intellectual property (Reg. No. CPRG0003420354). The site itself reminds travellers that NASEK lists campaigns published by their owners, doesn’t issue licences, and that they should confirm a campaign’s licence with the Ministry of Endowments and Religious Affairs before paying.",
    metaDescription:
      "NASEK, an Omani platform that brings Hajj and Umrah campaigns together in one place. 1st place in Oman at Ibda’at Shabab and registered intellectual property; live platform designed and built by Alzahra Al Jabri.",
  },
  {
    slug: "fake-news-detection",
    numeral: "iii",
    title: "Fake News Detection",
    fullTitle: "AI-Powered Fake News Detection Platform",
    kicker: "Graduation project, 2026 · Designed and built solo",
    standfirst: "Arabic and English news, scored for credibility from 0 to 100.",
    body: "The platform analyses a submitted news text with the OpenAI API, cross-checks it against sources through the Google Search API at the moment of the request, and returns a credibility score.",
    bodyShort: "Analyses a news text and returns a credibility score from 0 to 100.",
    homeFacts: [
      { label: "Role", value: "Sole designer and developer" },
      {
        label: "Built with",
        value: "Next.js · TypeScript · Tailwind CSS · OpenAI API · Google Search API",
      },
    ],
    caseFacts: [
      { label: "Role", value: "Sole designer and developer" },
      { label: "Type", value: "Full-stack web application · graduation project, 2026" },
      { label: "Status", value: "No public live demo" },
      {
        label: "Built with",
        value: "Next.js · TypeScript · Tailwind CSS · OpenAI API · Google Search API",
      },
    ],
    noDemo: true,
    question:
      "Readers often have no fast, reliable way to check whether a news article is credible, especially across Arabic and English sources.",
    built: [
      "Credibility analysis of Arabic and English news text.",
      "A credibility score from 0 to 100.",
      "Real-time cross-checking against sources at the moment of each request.",
      "User accounts with a personal analysis history.",
      "An administrative dashboard.",
    ],
    decisions: [],
    figures: [
      {
        kind: "sequence",
        items: [
          "A news text is submitted, in Arabic or English",
          "The OpenAI API analyses the content",
          "The Google Search API cross-checks it against sources",
          "The platform returns a credibility score, 0–100",
        ],
        caption: "From text to score, simplified.",
      },
    ],
    howBuilt:
      "Next.js and TypeScript with Tailwind CSS, integrating the OpenAI API for content analysis and the Google Search API for cross-referencing.",
    outcome:
      "Delivered as the graduation project for the B.Sc. in Computer Science (Artificial Intelligence) at Gulf College, where the degree was awarded with an academic rating of Excellent. It brings two external APIs together in one credibility-scoring platform.",
    metaDescription:
      "An AI-powered platform that scores Arabic and English news for credibility from 0 to 100, using the OpenAI and Google Search APIs. Graduation project by Alzahra Al Jabri.",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
