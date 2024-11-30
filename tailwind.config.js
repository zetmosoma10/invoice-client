/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      colors: {
        RED: "#EC5757",
        RED_LIGHTER: "#9277FF",
        ORANGE: "#FF8F00",
        GREEN: "#33D69F",
        LIGHT_GREY: "#373B53",
        LIGHT: "#F8F8FB",
        LIGHT_BLUE: "#DFE3FA",
        GREY: "#888EB0",
        GREYISH_BLUE: "#7E88C3",
        BLUE: "#7C5DFA",
        LIGHT_BLUE: "#9277FF",
        DARK_BLUE: "#252945",
        VERY_BLUE: "#1E2139",
        BLACK: "#0C0E16",
        BLUE_BLACK: "#141625",
      },
    },
  },
  darkMode: "selector",
  plugins: [require("@tailwindcss/forms"), require("preline/plugin")],
};
