// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // keyframes: {
      //   "accordion-down": {
      //     from: { height: "0" },
      //     to: { height: "var(--radix-accordion-content-height)" },
      //   },
      //   "accordion-up": {
      //     from: { height: "var(--radix-accordion-content-height)" },
      //     to: { height: "0" },
      //   },
      //   blob: {
      //     "0%": { transform: "translate(0px, 0px) scale(1)" },
      //     "33%": { transform: "translate(30px, -50px) scale(1.1)" },
      //     "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
      //     "100%": { transform: "translate(0px, 0px) scale(1)" },
      //   },
      //   float: {
      //     "0%": { transform: "translateY(0px)" },
      //     "50%": { transform: "translateY(-10px)" },
      //     "100%": { transform: "translateY(0px)" },
      //   },
      //   slideIn: {
      //     from: { opacity: "0", transform: "translateY(20px)" },
      //     to: { opacity: "1", transform: "translateY(0)" },
      //   },
      // },
      // animation: {
      //   "accordion-down": "accordion-down 0.2s ease-out",
      //   "accordion-up": "accordion-up 0.2s ease-out",
      //   blob: "blob 7s infinite",
      //   float: "float 3s ease-in-out infinite",
      //   slideIn: "slideIn 0.3s ease-out",
      // },
    },
  },
  plugins: [require("tailwindcss-animate"),[require('@tailwindcss/typography')]],
};