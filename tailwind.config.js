/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        "nav-bg-color": "#0EA5E9",
        "card-bg-color": "#050E12",
        "card-text-color": "#B6B6B6",
      },
    },
  },
  plugins: [],
};
