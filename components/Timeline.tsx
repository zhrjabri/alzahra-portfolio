import Reveal from "./Reveal";

const EVENTS = [
  {
    date: "2021",
    title: "General Education Diploma",
    place: "Sultanate of Oman",
    desc: "Completed secondary education.",
  },
  {
    date: "2022 – 2023",
    title: "Team Leader — Ibda'at Shabab Competition",
    place: "Oman",
    desc: "Achieved first place in Oman in the smartphone applications category.",
  },
  {
    date: "01 May 2023",
    title: "Registered Software / Database Work — \u201cNasek\u201d",
    place: "Ministry of Commerce and Industry, Oman",
    desc: "Co-authored a registered work, officially deposited with the Intellectual Property Department (Reg. No. CPRG0003420354).",
  },
  {
    date: "Feb – Mar 2025",
    title: "Trainee — Innovation & Scientific Olympiad Department",
    place: "General Directorate of Education, Al Dhahirah — Ministry of Education",
    desc: "Training program (23 Feb – 06 Mar 2025) supporting educational innovation and scientific Olympiad initiatives.",
  },
  {
    date: "Jun – Jul 2026",
    title: "Python & Automation Training",
    place: "Under Control Oman",
    desc: "40-hour course covering coding, data structures, software automation concepts, and applications of automation.",
  },
  {
    date: "2026",
    title: "AI-Powered Fake News Detection Platform",
    place: "Graduation Project",
    desc: "Full-stack AI application for credibility analysis of news content, integrating the OpenAI and Google Search APIs.",
  },
  {
    date: "2026",
    title: "Bachelor's Degree — Computer Science, Artificial Intelligence",
    place: "Gulf College, Sultanate of Oman",
    desc: "Academic Rating: Excellent.",
  },
];

export default function Timeline() {
  return (
    <section id="journey" className="relative border-t border-line py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="section-label mb-4">04 — Journey</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Professional Journey
          </h2>
        </Reveal>

        <div className="relative mt-14 border-l border-line pl-8 sm:pl-10">
          {EVENTS.map((e, i) => (
            <Reveal key={e.title} delay={i * 60} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[41px] top-1 h-3 w-3 rounded-full border-2 border-accent bg-ink sm:-left-[45px]" />
              <p className="font-mono text-xs uppercase tracking-wider text-accent">
                {e.date}
              </p>
              <h3 className="mt-2 font-display text-lg font-medium text-text sm:text-xl">
                {e.title}
              </h3>
              <p className="mt-1 text-sm text-text-faint">{e.place}</p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
                {e.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
