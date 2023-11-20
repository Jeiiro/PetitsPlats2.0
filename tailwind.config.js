/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    colors: {
      transparent: 'transparent',
      'black': '#1B1B1B',
      'white': '#ffffff',
      'yellow': '#FFD15B',
    },
    fontFamily: {
      'sans': 'Anton, sans-serif',
    },
    // Commentez la partie problématique
    // extend: {},
  },
  plugins: [],
}

