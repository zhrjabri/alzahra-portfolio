import type { Config } from "tailwindcss";

// Folio tokens. The site ships a single light edition: paper, ink and one plum
// accent. Contrast on paper: ink 18.7:1, ink-2 12.0:1, stone 6.8:1 (6.1:1 on
// vellum), plum 10.6:1. Hairline is decorative only and never carries meaning.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FFFFFF",
        vellum: "#F3F1EE",
        ink: {
          DEFAULT: "#121212",
          2: "#3A3633",
        },
        stone: "#5E5A57",
        hairline: "#DCD7D2",
        plum: {
          DEFAULT: "#6B2740",
          deep: "#4E1C2F",
        },
        rose: "#D9B8C3",
      },
      fontFamily: {
        // Variables are set on <html> by next/font in app/layout.tsx.
        display: ["var(--font-newsreader)", "Georgia", "Times New Roman", "serif"],
        ui: ["var(--font-hanken)", "system-ui", "Segoe UI", "sans-serif"],
      },
      maxWidth: {
        page: "77.5rem",
        measure: "64ch",
      },
      spacing: {
        gutter: "clamp(1rem, 4vw, 3.5rem)",
      },
    },
  },
  plugins: [],
};
export default config;
