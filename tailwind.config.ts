import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#F7F5F0",
        surface: "#FFFFFF",
        "surface-2": "#F0ECE4",
        line: "#E0DAD0",
        text: {
          DEFAULT: "#17202B",
          muted: "#556170",
          // Darkened from #8A94A2 (2.82:1) to clear WCAG AA on every surface.
          faint: "#5F6A78",
        },
        accent: {
          DEFAULT: "#1B3A6B",
          dim: "#142C52",
        },
        // Darkened from #157F77 (4.45:1) to clear WCAG AA on the page ground.
        teal: {
          DEFAULT: "#12736C",
          dim: "#0E5D57",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
        // Geometric/circled marks Cormorant Garamond has no glyphs for.
        glyph: ["Segoe UI Symbol", "Apple Symbols", "Noto Sans Symbols 2", "sans-serif"],
      },
      // Cormorant Garamond has a small x-height and light stems, so the stock
      // Tailwind ramp reads a size too small. Each step is nudged up and given
      // the extra leading a serif needs; display steps get optical tracking.
      fontSize: {
        xs: ["0.8125rem", { lineHeight: "1.5" }],
        sm: ["0.9688rem", { lineHeight: "1.65" }],
        base: ["1.0938rem", { lineHeight: "1.72" }],
        lg: ["1.25rem", { lineHeight: "1.55" }],
        xl: ["1.4375rem", { lineHeight: "1.45" }],
        "2xl": ["1.75rem", { lineHeight: "1.3", letterSpacing: "-0.005em" }],
        "3xl": ["2.125rem", { lineHeight: "1.18", letterSpacing: "-0.01em" }],
        "4xl": ["2.625rem", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(27,58,107,0.045), transparent 60%)",
      },
      keyframes: {
        "sweep": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        sweep: "sweep 14s linear infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
