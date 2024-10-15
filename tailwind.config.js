/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
  },
  plugins: [
    require("daisyui"),
    require("tw-elements-react/dist/plugin.cjs"),
  ],
}

