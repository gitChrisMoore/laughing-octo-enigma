/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00639c",
        primary_on: "#ffffff",
        primary_container: "#cee5ff",
        primary_container_on: "#001d33",
        secondary: "#625b71",
        secondary_on: "#ffffff",
        secondary_container: "#e8def8",
        secondary_container_on: "#1e192b",
        third: "#984061",
        third_on: "#ffffff",
        third_container: "#ffd9e2",
        third_container_on: "#3e001d",
        three: "#a73732",
        three_on: "#ffffff",
        four: "#f2c94c",
        four_on: "#ffffff",
        tertiary: "#3F3F3F",
        quaternary: "#4F4F4F",
        quinary: "#5F5F5F",
        senary: "#6F6F6F",
        septenary: "#7F7F7F",
        octonary: "#8F8F8F",
      },
    },
  },
  plugins: [],
};
