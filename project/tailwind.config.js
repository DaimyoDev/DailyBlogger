/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: "Lato",
      },
      screens: {
        tablet: "600px",
        desktop: "1200px",
      },
    },
  },
  plugins: [],
};
