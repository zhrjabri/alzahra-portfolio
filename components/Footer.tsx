import LogoMark from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <LogoMark size={22} strokeWidth={3.8} className="text-accent" />
          <span className="font-mono text-xs text-text-faint">
            Alzahra Al Jabri &middot; AI &middot; Full-stack &middot; Sultanate of Oman
          </span>
        </div>
        <p className="font-mono text-xs text-text-faint">
          &copy; {new Date().getFullYear()} — All rights reserved
        </p>
      </div>
    </footer>
  );
}
