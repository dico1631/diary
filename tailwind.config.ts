import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        sand: "#f6f0e8",
        clay: "#c46d3b",
        moss: "#6d7c5a",
        sea: "#2f6f72"
      },
      fontFamily: {
        sans: ["'IBM Plex Sans KR'", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 16px 40px rgba(23, 23, 23, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
