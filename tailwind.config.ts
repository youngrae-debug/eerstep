import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0B0F",
        card: "#15151C",
        primaryText: "#FFFFFF",
        secondaryText: "#A1A1AA",
        accent: "#22C55E"
      }
    }
  },
  plugins: []
};

export default config;
