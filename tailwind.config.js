/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf8f0',
          100: '#f9edda',
          200: '#f2d7b0',
          300: '#e9bb7d',
          400: '#df9a4a',
          500: '#d6822e',
          600: '#c86a23',
          700: '#a6511f',
          800: '#854220',
          900: '#6c381d',
          950: '#3a1b0d',
        },
        charcoal: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#1a1a1a',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdf9f0',
          200: '#faf2de',
          300: '#f5e6c4',
          400: '#eed5a0',
          500: '#e5c07c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}