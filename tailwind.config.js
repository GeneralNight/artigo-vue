/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      boxShadow: {
        special: '0 0 8px rgba(0,0,0,.1)'
      }
    },
  },
  plugins: [],
}

