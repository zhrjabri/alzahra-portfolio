// Personal details, About copy, the Journey chronology and the technology
// index. Dates appear only where Alzahra confirmed them; undated milestones
// stay out of the chronology until a date is known.

export const PROFILE = {
  name: "Alzahra Al Jabri",
  fullName: "Alzahra Ali Nasser Al Jabri",
  role: "Software developer",
  location: "Sultanate of Oman",
  email: "aljabrialzahra1@gmail.com",
  linkedin: {
    href: "https://linkedin.com/in/alzahra-al-jabri-0164ab416",
    display: "alzahra-al-jabri",
  },
  github: { href: "https://github.com/zhrjabri", display: "zhrjabri" },
};

export const HOME = {
  kicker: "AI graduate · Software developer · Sultanate of Oman",
  headline: {
    before: "I build software that turns ",
    emphasis: "uncertain decisions",
    after: " into clear answers.",
  },
  standfirst: [
    "I’m an AI graduate and software developer based in Oman.",
    "Three products, each built around a question people are unsure how to answer: when a recurring task is due again, which Hajj or Umrah campaign to trust, and whether a news story is credible. I designed and built all three — NASEK’s live platform on my own, after leading the seven-member team that started it.",
  ],
};

export const ABOUT =
  "I’m an Artificial Intelligence graduate (B.Sc. Computer Science — Artificial Intelligence, Gulf College, rated Excellent) who builds complete, working software: interface, data, authentication and testing. My work sits where AI meets practical software engineering, and most of it is built for Arabic speakers first. I’m looking for roles in artificial intelligence, Python development, software development and IT.";

export const CONTACT_HEADING =
  "Open to roles in AI, Python and software development, and to collaboration.";

export type JourneyEntry = {
  when: string;
  /** ISO date or year for <time>, when the date is exact enough to mark up. */
  datetime?: string;
  title: string;
  detail: string;
  recognition?: string;
};

export const JOURNEY: JourneyEntry[] = [
  {
    when: "2021",
    datetime: "2021",
    title: "General Education Diploma",
    detail: "Sultanate of Oman",
  },
  {
    when: "2022 – 2023",
    title: "Team leader and CEO, NASEK",
    detail: "Seven-member team, 500 OMR starting capital.",
    recognition: "1st place in Oman, Ibda’at Shabab, smartphone applications",
  },
  {
    when: "01 May 2023",
    datetime: "2023-05-01",
    title: "NASEK registered as intellectual property",
    detail:
      "Intellectual Property Department, Ministry of Commerce and Industry · Reg. No. CPRG0003420354 · co-author",
  },
  {
    when: "Feb – Mar 2025",
    title: "Trainee, Innovation & Scientific Olympiad Department",
    detail: "General Directorate of Education, Al Dhahirah, Ministry of Education",
  },
  {
    when: "Jun – Jul 2026",
    title: "Python & Automation Training",
    detail: "Under Control Oman · 40 hours",
  },
  {
    when: "2026",
    datetime: "2026",
    title: "B.Sc. Computer Science — Artificial Intelligence",
    detail: "Gulf College · Graduation project: AI-Powered Fake News Detection Platform",
    recognition: "Academic rating: Excellent",
  },
];

export const TECH_INDEX: { tech: string; usedIn: string }[] = [
  { tech: "TypeScript", usedIn: "TIMORA · NASEK · Fake News Detection" },
  { tech: "Tailwind CSS", usedIn: "TIMORA · NASEK · Fake News Detection" },
  { tech: "Next.js", usedIn: "TIMORA · Fake News Detection" },
  { tech: "React", usedIn: "TIMORA · NASEK" },
  { tech: "Supabase: Postgres, Auth, row-level security", usedIn: "TIMORA · NASEK" },
  { tech: "Vercel", usedIn: "TIMORA · NASEK" },
  { tech: "OpenAI API · Google Search API", usedIn: "Fake News Detection" },
  { tech: "Vite · React Router · Recharts · GitHub Actions", usedIn: "NASEK" },
  { tech: "Zod · React Hook Form · Radix", usedIn: "TIMORA" },
  { tech: "Vitest · Playwright · axe-core", usedIn: "TIMORA" },
  { tech: "Python · automation", usedIn: "Training, Under Control Oman" },
];
