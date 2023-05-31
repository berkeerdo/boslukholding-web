/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customButtonBackground: "#FF6F00",
        customBackground: "#2E2E2E",
        primary: "#FF6F00",
        customButtonBackgroundHover: "#FF8C00",
      },
    },
  },
  plugins: [],
  important: true,
};
