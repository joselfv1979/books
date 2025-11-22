module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "system-ui", "Segoe UI", "Arial", "sans-serif"],
      mono: ["JetBrains Mono", "monospace"],
    },
    extend: {
      colors: {
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#b9e6fd",
          300: "#7cd3fb",
          400: "#36bffa",
          500: "#0891b2",
          600: "#0e7490",
          700: "#155e75",
          800: "#164e63",
          900: "#0c3c4d",
        },
        accent: {
          500: "#f59e0b",
          600: "#d97706",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f5f7fa",
          subtle: "#eef2f6",
          elevated: "#ffffff",
        },
        danger: {
          500: "#dc2626",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
  ],
};
