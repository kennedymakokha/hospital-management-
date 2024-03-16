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
          100: '#82c7fe',
          200: "#8fcdfe", 300: "#9bd2fe", 400: "#a8d8fe", 500: "#b4ddfe", 600: "#c1e3ff", 700: "#cde9ff", 800: "#daeeff", 900: "#e6f4ff", 1000: "#f3f9ff"
        },
        secondary: {
          100: "#001d44",
          200: "#1a3457",
          300: "#334a69",
          400: "#4d617c",
          500: "#66778f",
          600: "#808ea2",
          700: "#99a5b4",
          800: "#b3bbc7",
          900: "#ccd2da", 1000: "#e6e8ec"
        }
      }
    },
  },
  plugins: [],
}

