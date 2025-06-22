
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: 'class', // Enables toggle-based dark mode

  plugins: [require('@tailwindcss/forms'),
  require('@tailwindcss/typography'),],
};
