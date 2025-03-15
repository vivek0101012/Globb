/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lemonMilk: ['"Lemon Milk"', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'], // Custom font family
      },
    },
  },
  plugins: [],
}
