/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'skyBlue-rgba': 'rgb(200, 245, 253)',
        'LightSkyBlue-rgba': 'rgb(232, 252, 255)',
        'WhiteLoading-rgba':'rgb(255, 255, 255, 0.918)'
      },
    },
  },
  plugins: [],
}