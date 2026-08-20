export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* ambient background: large slow-sweeping credibility arc */}
      <div className="pointer-events-none absolute right-[-10%] top-1/2 hidden -translate-y-1/2 md:block lg:right-[2%]">
        <svg
          width="620"
          height="620"
          viewBox="0 0 100 100"
          className="animate-sweep opacity-[0.30]"
        >
          <circle cx="50" cy="50" r="46" fill="none" stroke="#9A6B12" strokeWidth="0.4" strokeDasharray="1 3" />
        </svg>
        <svg
          width="620"
          height="620"
          viewBox="0 0 100 100"
          className="absolute inset-0 opacity-[0.35]"
        >
          <circle cx="50" cy="50" r="34" fill="none" stroke="#157F77" strokeWidth="0.3" strokeDasharray="0.5 2.5" />
        </svg>
      </div>

      <div className="grain pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-grid-fade" />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <p className="eyebrow mb-6 animate-fade-up opacity-0" style={{ animationDelay: "80ms" }}>
          Sultanate of Oman
        </p>

        <h1
          className="animate-fade-up font-display text-5xl font-semibold leading-[1.05] tracking-tight text-text opacity-0 sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "160ms" }}
        >
          Alzahra Ali
          <br />
          Nasser Al Jabri
        </h1>

        <p
          className="animate-fade-up mt-6 max-w-xl text-lg text-text-muted opacity-0 sm:text-xl"
          style={{ animationDelay: "260ms" }}
        >
          <span className="text-gold">Artificial Intelligence Graduate</span>{" "}
          &middot; AI &amp; Software Developer
        </p>

        <p
          className="animate-fade-up mt-4 max-w-lg text-base text-text-muted/90 opacity-0"
          style={{ animationDelay: "340ms" }}
        >
          Building intelligent, practical solutions with AI, Python, and
          modern software technologies.
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-wrap items-center gap-4 opacity-0"
          style={{ animationDelay: "440ms" }}
        >
          <a
            href="#projects"
            className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(227,179,65,0.35)]"
          >
            View My Projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-line px-6 py-3 text-sm font-medium text-text transition-colors hover:border-gold/50 hover:text-gold"
          >
            Contact Me
          </a>
          <a
            href="https://linkedin.com/in/alzahra-al-jabri-0164ab416"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm font-medium text-text-muted transition-colors hover:border-teal/50 hover:text-teal"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.11 20.45H3.56V9h3.55v11.45z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
