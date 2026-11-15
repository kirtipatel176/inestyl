import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Apple Minimal System Tokens */
        primary: "#0071E3",
        "primary-strong": "#0066CC",
        secondary: "#2997FF",
        tertiary: "#1D1D1F",
        neutral: "#F5F5F7",
        surface: "#FFFFFF",
        "on-surface": "#1D1D1F",
        muted: "#E5E7EB",
        backdrop: "#000000",
        error: "#D92D20",

        /* Brand aliases mapped to Apple Minimal */
        brand: {
          black: "#1D1D1F",
          ivory: "#F5F5F7",
          gold: "#0071E3",
          white: "#FFFFFF",
          cream: "#F5F5F7",
          border: "#E5E7EB",
          charcoal: "#86868B",
        },
        semantic: {
          stock: "#2E7D32",
          "stock-bg": "#E8F5E9",
          low: "#E65100",
          whatsapp: "#25D366",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        heading: [
          "SF Pro Display",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
        body: [
          "SF Pro Text",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
        nav: [
          "SF Pro Text",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      maxWidth: {
        luxury: "1380px",
        content: "1380px",
        editorial: "1140px",
        narrow: "1040px",
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
        luxury: "8px",
        pill: "9999px",
      },
      spacing: {
        gutter: "16px",
        section: "54px",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0, 0, 0, 0.04)",
        card: "0 2px 8px rgba(0, 0, 0, 0.04)",
        "card-hover": "0 6px 18px rgba(0, 0, 0, 0.06)",
        dropdown: "0 8px 24px rgba(0, 0, 0, 0.08)",
        hover: "0 6px 18px rgba(0, 0, 0, 0.06)",
      },
      letterSpacing: {
        eyebrow: "0.08em",
        brand: "0.14em",
      },
      animation: {
        "fade-in": "fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "subtle-zoom": "subtleZoom 8s ease-out forwards",
        "pulse-subtle": "pulseSubtle 2.5s infinite",
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 2.5s infinite linear",
        marquee: "marquee 32s linear infinite",
        "marquee-slow": "marquee 45s linear infinite",
        "marquee-reverse": "marqueeReverse 32s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        subtleZoom: {
          "0%": { transform: "scale(1.0)" },
          "100%": { transform: "scale(1.04)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
