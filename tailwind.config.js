/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors :{
        primary : '#2E8B57',
        accent:'#FF7F50' , // call to action buttons
        background: '#F8F8F8',
        text : '#333333',
        success: '#4CAF50',
        error:'#FF5252',
      } ,
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'], 
        clash: ['Clash Display', 'sans-serif'] 
      }
    },
  },
  plugins: [],
}