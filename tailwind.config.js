/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
  "./node_modules/flowbite/**/*.js"],
    theme: {
    extend: {},
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px"
    }
  },
  plugins: [require('tailwind-scrollbar-hide'),
  require('flowbite/plugin')]
}

