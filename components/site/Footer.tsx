import { PROFILE } from "@/content/profile";
import LogoMark from "./LogoMark";

export default function Footer() {
  return (
    <footer className="site-footer">
      <span className="flex items-center gap-3">
        <LogoMark variant="compact" size={22} className="text-plum" />
        {PROFILE.name} · {PROFILE.role} · {PROFILE.location}
      </span>
      <span className="tabular-nums">&copy; {new Date().getFullYear()}</span>
    </footer>
  );
}
