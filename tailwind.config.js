/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./app/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit Variable", "Outfit", defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
