/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFB6C1', // Light Pink
        'primary-dark': '#FF69B4',
        'primary-light': '#FFE4E9',
        dark: '#1a1a1a',
        'dark-secondary': '#2a2a2a',
      },
    },
  },
  plugins: [],
};
