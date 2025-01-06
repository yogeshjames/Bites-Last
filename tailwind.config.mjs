/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable manual class-based dark mode
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        foreground: 'var(--foreground)',
        background: 'var(--background)',
      },
    },
  },
  plugins: [],
};
