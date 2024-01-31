/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      fontFamily: {
        'lato':['Lato', 'sans-serif'],
        'roboto':['Roboto', 'sans-serif'],
        'nunito':['Nunito Sans', 'sans-serif' ],
        'popins': ['Poppins','sans-serif'],
      },
      boxShadow: {
        'mo': '0px 0px 25px -10px rgba(0, 0, 0, 0.38)',
      }
    },
  },
  plugins: [],
}