const colors = ["green", "teal", "green", "blue"];

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    ...colors.map((color) => `bg-${color}-400`),
    ...colors.map((color) => `text-${color}-500`),
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
      },
      animation: {
        customBounce: "customBounce 1s infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/custom-forms")],
};
