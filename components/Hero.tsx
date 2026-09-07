export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-24"
    >
      {/* ambient background: the AZ cipher blown up and cropped by the right edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-22%] top-1/2 hidden -translate-y-1/2 md:block lg:right-[-16%]"
      >
        <svg
          viewBox="0 0 200 120"
          className="w-[760px] opacity-[0.11] lg:w-[980px]"
          fill="none"
          stroke="#1B3A6B"
          strokeWidth="1.2"
          strokeLinejoin="miter"
          strokeMiterlimit={8}
        >
          <path d="M25 102 L67 18 L109 102" />
          <path d="M43 70 H91" />
          <path d="M77 18 H159 L95 102 H177" />
        </svg>
      </div>

      <div className="grain pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-grid-fade" />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <p className="eyebrow mb-6 animate-fade-up opacity-0" style={{ animationDelay: "80ms" }}>
          Sultanate of Oman
        </p>

        <h1
          className="animate-fade-up font-display font-semibold leading-[1.02] tracking-[-0.02em] text-text opacity-0"
          style={{
            animationDelay: "160ms",
            fontSize: "clamp(2.75rem, 9.5vw, 5.5rem)",
          }}
        >
          Alzahra Ali
          <br />
          Nasser Al Jabri
        </h1>

        <p
          className="animate-fade-up mt-7 max-w-[40ch] text-lg text-text-muted opacity-0 sm:text-xl"
          style={{ animationDelay: "260ms" }}
        >
          <span className="text-accent">Artificial Intelligence Graduate</span>
          {" · "}
          <span className="whitespace-nowrap">AI &amp; Software Developer</span>
        </p>

        <p
          className="animate-fade-up mt-4 max-w-[52ch] text-base text-text-muted opacity-0"
          style={{ animationDelay: "340ms" }}
        >
          Building intelligent, practical solutions with AI, Python, and
          modern software technologies.
        </p>

        <div
          className="animate-fade-up mt-11 flex flex-wrap items-center gap-x-4 gap-y-3 opacity-0"
          style={{ animationDelay: "440ms" }}
        >
          <a
            href="#projects"
            className="rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-200 hover:bg-accent-dim"
          >
            View My Projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-accent/35 px-7 py-3.5 text-sm font-medium text-accent transition-colors duration-200 hover:border-accent/70 hover:bg-accent/5"
          >
            Contact Me
          </a>
          <a
            href="https://linkedin.com/in/alzahra-al-jabri-0164ab416"
            target="_blank"
            rel="noopener noreferrer"
            className="group ml-1 inline-flex items-center gap-2 py-3.5 text-sm font-medium text-text-muted transition-colors duration-200 hover:text-accent"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45z" />
            </svg>
            <span className="border-b border-transparent transition-colors duration-200 group-hover:border-accent/40">
              LinkedIn
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
