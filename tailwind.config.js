/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: {
          50: '#f0f9ff',
          500: '#0052ff',
          600: '#0041cc',
          700: '#003399',
        }
      }
    },
  },
  plugins: [],
}
