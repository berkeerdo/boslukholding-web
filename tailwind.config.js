/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customButtonBackground: "#FF6F00",
      },
    },
  },
  plugins: [],
  important: true,
};
