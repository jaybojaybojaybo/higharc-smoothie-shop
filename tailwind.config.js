module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'smoothie-blue': '#00bae9',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
