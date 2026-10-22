import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        film: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
          950: "#0b0716",
        },
        cinema: {
          gold: "#eab308",
          amber: "#f59e0b",
          neon: "#06b6d4",
          surface: "#111827",
          card: "#182234",
          border: "#1f293d",
          accent: "#6366f1",
        }
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(168, 85, 247, 0.35)",
        goldglow: "0 0 25px -5px rgba(234, 179, 8, 0.35)",
      }
    },
  },
  plugins: [],
};

export default config;
