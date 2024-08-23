import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/core/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  container: {
    center: true,
  },
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
      inter: ["Roboto", "sans-serif"],
      display: ["Roboto", "sans-serif"],
    },
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1140px",
      "2xl": "1280px",
    },
    extend: {
      keyframes: {
        animateGradient: {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@headlessui/tailwindcss"),
    require("tailwind-scrollbar"),
    // ...
  ],
};
export default config;
