/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        fixed: "1200px"
      }
    },
    extend: {
      backgroundImage: {
        'tab': 'linear-gradient(64.85deg,#fca600 23.67%,#ffd41d 106.12%)'
      }
    },
  },
  plugins: [],
}