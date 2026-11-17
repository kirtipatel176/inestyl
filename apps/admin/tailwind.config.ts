import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/*/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        outlet: {
          red: "#E50010",
          black: "#111111",
          gold: "#D4AF37",
          dark: "#1A1A1A",
          gray: "#F5F5F7",
        },
      },
    },
  },
  plugins: [],
};
export default config;
