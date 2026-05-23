import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-merriweather)", "serif"],
      },
      colors: {
        warm: {
          50: "#FDFDFD",
          100: "#F9F8F6",
          200: "#F3F1ED",
          300: "#E6E2D8",
          400: "#D3CDBE",
        },
        navy: {
          50: "#ECEEF2",
          100: "#D1D6E2",
          200: "#A3AECA",
          800: "#1A202C",
          900: "#0E131F",
        },
        clinic: {
          teal: "#4FD1C5",
          tealHover: "#3BB8AC",
          blue: "#4A90E2",
          blueHover: "#357ABD",
        },
      },
    },
  },
  plugins: [],
};
export default config;
