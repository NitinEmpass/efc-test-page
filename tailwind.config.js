/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gsl-dark-orange": "#5271FF",
        "gsl-light-green": "#5271FF",
      },
      animation: {
        "fade-left": "fadeLeft 0.75s ease-in forwards",
        fade: "fade 0.5s ease-in-out forwards",
      },
      keyframes: {
        fadeLeft: {
          "0%": {
            opacity: "0",
            transform: "translateX(2rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        fade: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
    },
  },
};
