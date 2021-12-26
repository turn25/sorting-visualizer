const colors = ["green", "teal", "green", "blue", "red"];

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    ...colors.map((color) => `bg-${color}-400`),
    ...colors.map((color) => `text-${color}-500`),
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
            transform: "translateX(25%)",
            opacity: "70%",
          },
          "50%": {
            transform: "translateX(0)",
            opacity: "100%",
          },
        },

        customWiggleRight: {
          "0%, 100%": {
            transform: "translateX(-25%)",
            opacity: "70%",
          },
          "50%": {
            transform: "translateX(0)",
            opacity: "100%",
          },
        },
      },
      animation: {
        customBounce: "customBounce 1s infinite",
        customWiggleLeft: "customWiggleLeft 1s ease-in-out infinite",
        customWiggleRight: "customWiggleRight 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/custom-forms")],
};
