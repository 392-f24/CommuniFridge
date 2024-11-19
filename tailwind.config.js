/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        produce: '#8EC97C',
        preMadeMeal: '#F1A87D',
        frozen: '#66B7FF',
        beverage: '#F08491',
      },
    },
  },
  plugins: [],
}
