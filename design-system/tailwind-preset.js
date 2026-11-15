/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
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
      },
      fontFamily: {
        heading: ["SF Pro Display", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        body: ["SF Pro Text", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        nav: ["SF Pro Text", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1380px",
        luxury: "1380px",
        narrow: "1040px",
        editorial: "1140px",
      },
      borderRadius: {
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
        hover: "0 6px 18px rgba(0, 0, 0, 0.06)",
        dropdown: "0 8px 24px rgba(0, 0, 0, 0.08)",
      },
      letterSpacing: {
        eyebrow: "0.08em",
        brand: "0.14em",
      },
    },
  },
};
