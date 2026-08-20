import Reveal from "./Reveal";

const ACHIEVEMENTS = [
  {
    mark: "①",
    title: "1st Place in Oman",
    desc: "Ibda'at Shabab Competition — smartphone applications category.",
  },
  {
    mark: "②",
    title: "Registered Software Work",
    desc: "\u201cNasek\u201d — officially registered with the Ministry of Commerce and Industry, Oman (Reg. No. CPRG0003420354).",
  },
  {
    mark: "③",
    title: "B.Sc. Artificial Intelligence",
    desc: "Computer Science — Artificial Intelligence, Gulf College, Oman. Academic Rating: Excellent.",
  },
  {
    mark: "④",
    title: "AI Graduation Project",
    desc: "AI-Powered Fake News Detection Platform, integrating the OpenAI and Google Search APIs.",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative border-t border-line py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="section-label mb-4">05 — Recognition</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Achievements
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.title} delay={i * 80} className="h-full">
              <div className="flex h-full gap-5 rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-gold/30">
                <span className="font-display text-2xl text-gold">{a.mark}</span>
                <div>
                  <h3 className="font-display text-lg font-medium text-text">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {a.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
