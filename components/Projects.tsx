"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const TECH = ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI API", "Google Search API"];

const FEATURES = [
  "User authentication",
  "Per-user analysis history",
  "Administrative dashboard",
  "Arabic and English news analysis",
  "Credibility scoring on a 0–100 scale",
];

const NASEK_STATS = [
  { value: "1st", label: "Nationally" },
  { value: "80%", label: "Platform live" },
];

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [nasekOpen, setNasekOpen] = useState(false);

  return (
    <section id="projects" className="relative border-t border-line py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="section-label mb-4">03 — Featured Work</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Projects
          </h2>
        </Reveal>

        {/* Featured project */}
        <Reveal delay={100} className="mt-14">
          <div className="overflow-hidden rounded-2xl border border-accent/25 bg-surface">
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
              <div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-accent/40 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-accent">
                    Graduation Project · 2026
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold sm:text-3xl">
                  AI-Powered Fake News Detection Platform
                </h3>
                <p className="mt-4 text-base leading-relaxed text-text-muted">
                  A full-stack AI-powered web application for analysing
                  Arabic and English news and evaluating credibility on a
                  0–100 scale — cross-referencing content against trusted
                  sources in real time.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {TECH.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-line bg-surface-2 px-3 py-1 font-mono text-xs text-text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  aria-controls="case-study"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03]"
                >
                  {open ? "Hide Case Study" : "View Case Study"}
                  <span className={`transition-transform ${open ? "rotate-180" : ""}`}>↓</span>
                </button>
              </div>

              <div className="flex items-center justify-center">
                <figure className="w-full overflow-hidden rounded-xl border border-line bg-surface-2">
                  <div className="flex items-center gap-2 border-b border-line px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-line" />
                    <span className="h-2 w-2 rounded-full bg-line" />
                    <span className="h-2 w-2 rounded-full bg-line" />
                    <span className="ml-2 font-mono text-[0.6rem] text-text-faint">
                      Fake News Detector — Home
                    </span>
                  </div>
                  <img
                    src="/images/fake-news-platform-home.png"
                    alt="Home screen of the Fake News Detector platform, showing the credibility analysis features and the news input field."
                    width={1920}
                    height={870}
                    loading="lazy"
                    className="block w-full"
                  />
                  <figcaption className="border-t border-line px-3 py-2 font-mono text-[0.6rem] uppercase tracking-wider text-text-faint">
                    Home screen
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* Case study */}
            <div
              id="case-study"
              className={`grid overflow-hidden border-t border-line transition-[grid-template-rows] duration-500 ease-out ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0">
                <div className="grid gap-10 p-8 sm:p-10 md:grid-cols-2">
                  <CaseBlock title="Overview">
                    A full-stack platform that evaluates the credibility of
                    Arabic and English news content, built as my AI
                    graduation project.
                  </CaseBlock>
                  <CaseBlock title="Problem">
                    Readers often have no fast, reliable way to check whether
                    a news article is credible, especially across both
                    Arabic and English sources.
                  </CaseBlock>
                  <CaseBlock title="Solution">
                    An AI-powered web app that analyses submitted news
                    content and scores its credibility from 0–100, cross-
                    referencing claims against trusted sources.
                  </CaseBlock>
                  <CaseBlock title="Technologies">
                    <div className="flex flex-wrap gap-2">
                      {TECH.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </CaseBlock>
                  <CaseBlock title="Key Features">
                    <ul className="space-y-2">
                      {FEATURES.map((f) => (
                        <li key={f} className="flex gap-2 text-sm text-text-muted">
                          <span className="text-teal">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </CaseBlock>
                  <CaseBlock title="My Contribution">
                    Designed and developed the full-stack application end to
                    end — integrating the OpenAI API for content analysis
                    and the Google Search API for cross-referencing, and
                    building authentication, history, and the admin
                    dashboard.
                  </CaseBlock>
                </div>
                <div className="border-t border-line px-8 py-6 sm:px-10">
                  <CaseBlock title="Result / Achievement">
                    Delivered as my Artificial Intelligence graduation
                    project — a working, full-stack AI application
                    integrating two external APIs into a single credibility-
                    scoring platform.
                  </CaseBlock>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Nasek project */}
        <Reveal delay={150} className="mt-8">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="p-8 sm:p-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="rounded-full border border-teal/40 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-teal">
                    Registered Intellectual Property · 2023
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold">
                    &ldquo;Nasek&rdquo; — Hajj &amp; Umrah Booking Platform
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted">
                    A digital platform bringing every Omani Hajj and Umrah
                    campaign into one place, connecting campaign owners with
                    travellers on a sharing-economy model. Led as Chief
                    Executive Officer and registered with the Intellectual
                    Property Department on 01 May 2023.
                  </p>
                </div>
                <div className="shrink-0 rounded-xl border border-line bg-surface-2 px-5 py-4 text-center sm:text-left">
                  <p className="font-mono text-[0.65rem] uppercase tracking-wider text-text-faint">
                    Copyright Reg. No.
                  </p>
                  <p className="mt-1 font-mono text-sm text-accent">CPRG0003420354</p>
                  <p className="mt-2 text-xs text-text-faint">
                    Ministry of Commerce and Industry, Oman
                  </p>
                </div>
              </div>

              <button
                onClick={() => setNasekOpen((v) => !v)}
                aria-expanded={nasekOpen}
                aria-controls="nasek-case-study"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-teal/40 px-5 py-2.5 text-sm font-medium text-teal transition-colors hover:bg-teal/10"
              >
                {nasekOpen ? "Hide Case Study" : "View Case Study"}
                <span className={`transition-transform ${nasekOpen ? "rotate-180" : ""}`}>↓</span>
              </button>
            </div>

            <div
              id="nasek-case-study"
              className={`grid overflow-hidden border-t border-line transition-[grid-template-rows] duration-500 ease-out ${
                nasekOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="min-h-0">
                <div className="grid gap-10 p-8 sm:p-10 md:grid-cols-2">
                  <CaseBlock title="Problem">
                    Travellers had no single place to compare Omani Hajj and
                    Umrah campaigns by budget, location or departure date —
                    and campaign owners struggled to register customers and
                    reach an audience beyond word of mouth.
                  </CaseBlock>
                  <CaseBlock title="Solution">
                    One unified platform with filtering by governorate, price
                    and route — land or air — plus visible seat availability,
                    customer ratings, and online booking and payment.
                  </CaseBlock>
                  <CaseBlock title="My Role">
                    Chief Executive Officer. Led a seven-member team across
                    operations, marketing, finance and human resources, and
                    carried the platform from market research and surveys
                    through to a registered, revenue-generating product.
                  </CaseBlock>
                  <CaseBlock title="Result">
                    First place nationally in the Ibda&apos;at competition and
                    a registered intellectual property deliverable — built on
                    a 1,000 OMR starting capital.
                  </CaseBlock>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-line px-8 py-6 sm:px-10">
                  {NASEK_STATS.map((s) => (
                    <div key={s.label}>
                      <p className="font-display text-2xl font-semibold text-teal">{s.value}</p>
                      <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-wider text-text-faint">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CaseBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow mb-3">{title}</p>
      <div className="text-sm leading-relaxed text-text-muted">{children}</div>
    </div>
  );
}
