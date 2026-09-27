/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Contact.jsx",
    // Only the NextUI components the app uses (see src/components/Modal.jsx);
    // scanning the whole theme package added ~140KB of unused, render-blocking CSS.
    "./node_modules/@nextui-org/theme/dist/components/{modal,button,checkbox,input,link}.{js,mjs}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        secondary: "#2563EB",
        accent: "#0F172A",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(37, 99, 235, 0.1)", // Lightened tech blue
        // DigitalGeeks design tokens — values live in src/index.css
        dg: {
          blue: "var(--dg-blue)",
          "blue-strong": "var(--dg-blue-strong)",
          "blue-soft": "var(--dg-blue-soft)",
          orange: "var(--dg-orange)",
          green: "var(--dg-green)",
          ink: "var(--dg-ink)",
          "ink-2": "var(--dg-ink-2)",
          "ink-3": "var(--dg-ink-3)",
          line: "var(--dg-line)",
          surface: "var(--dg-surface)",
          "surface-2": "var(--dg-surface-2)",
          "surface-warm": "var(--dg-surface-warm)",
          dark: "var(--dg-dark)",
          "on-dark": "var(--dg-on-dark)",
          "on-dark-2": "var(--dg-on-dark-2)",
        },
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        poppins: ["var(--font-inter)", "sans-serif"], 
        sans: ["var(--font-inter)", "sans-serif"],
        google: ["var(--font-inter)", "sans-serif"], // Fallback if font-google is used
        jakarta: ["var(--font-plus-jakarta)", "sans-serif"],
        // Plus Jakarta Sans is the display face; Inter remains the text face.
        display: ["var(--font-plus-jakarta)", "var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "dg-hero": ["var(--dg-text-hero)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        "dg-h2": ["var(--dg-text-h2)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "dg-h3": ["var(--dg-text-h3)", { lineHeight: "1.25", letterSpacing: "-0.015em" }],
        "dg-lead": ["var(--dg-text-lead)", { lineHeight: "1.5" }],
        "dg-body": ["var(--dg-text-body)", { lineHeight: "1.6" }],
      },
      maxWidth: {
        "dg-content": "var(--dg-content)",
      },
      spacing: {
        "dg-gutter": "var(--dg-gutter)",
        "dg-section": "var(--dg-section-y)",
        "dg-nav": "var(--dg-nav-h)",
      },
      borderRadius: {
        "dg-sm": "var(--dg-radius-sm)",
        "dg-md": "var(--dg-radius-md)",
        "dg-lg": "var(--dg-radius-lg)",
      },
      transitionTimingFunction: {
        dg: "var(--dg-ease)",
      },
      animation: {
        shimmer: "shimmer 1.5s infinite linear",
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("@tailwindcss/typography")],
};
