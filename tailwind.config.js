const colors = ["green", "teal", "green", "blue", "red", "gray"];

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    ...colors.map((color) => `bg-${color}-400`),
    ...colors.map((color) => `text-${color}-500`),
    ...colors.map((color) => `text-${color}-600`),
    ...colors.map((color) => `border-b-${color}-400`),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"M PLUS Rounded 1c"'],
      },
      keyframes: {
        customBounce: {
          "0%, 100%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
          "50%": {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
          },
        },
        customWiggleLeft: {
          "0%, 100%": {
            transform: "translateX(8px)",
            opacity: "70%",
          },
          "50%": {
            transform: "translateX(0)",
            opacity: "100%",
          },
        },
        customWiggleRight: {
          "0%, 100%": {
            transform: "translateX(-8px)",
            opacity: "70%",
          },
          "50%": {
            transform: "translateX(0)",
            opacity: "100%",
          },
        },
        customEnterLeft: {
          "0%": {
            transform: "translateX(0)",
            opacity: "50%",
          },
          "25%": {
            transform: "translateX(-2.5%)",
          },
          "75%": {
            transform: "translateX(2.5%)",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "100%",
          },
        },
        customEnterRight: {
          "0%": {
            transform: "translateX(0)",
            opacity: "50%",
          },
          "25%": {
            transform: "translateX(2.5%)",
          },
          "75%": {
            transform: "translateX(-2.5%)",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "100%",
          },
        },
      },
      animation: {
        customBounce: "customBounce 1s infinite",
        customWiggleLeft: "customWiggleLeft 1s ease-in-out infinite",
        customWiggleRight: "customWiggleRight 1s ease-in-out infinite",
        customEnterLeft: "customEnterLeft 1s cubic-bezier(0.4, 0, 0.6, 1)",
        customEnterRight: "customEnterRight 1s cubic-bezier(0.4, 0, 0.6, 1)",
      },
      boxShadow: {
        navbar: "0 10px 15px rgba(100, 100, 100, 0.25)",
        drawer: "10px 0px 15px rgba(100, 100, 100, 0.25)",
      },
      gridTemplateColumns: {
        "4/2": "4fr 2fr",
        "5/1": "5fr 1fr",
      },
      screens: {
        smMobile: { max: "320px" },
        mobile: { min: "321px", max: "480px" },
      },
    },
  },
  plugins: [require("@tailwindcss/custom-forms")],
};
