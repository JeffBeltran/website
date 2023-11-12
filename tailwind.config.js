import type { Config } from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["GeistSans", ...defaultTheme.fontFamily.sans],
        mono: ["GeistMono", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;