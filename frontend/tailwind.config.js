/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100:'#82c7fe'
        },
        secondary: {
          100: '#1075f7',
          200:'#0f91f6'
        },
        // ...
      }
    },
  },
  plugins: [],
}

