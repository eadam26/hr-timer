/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'salmon': '#FF9984',
      'grey': {
        DEFAULT: '#848484',
        light: '#B5B5B5',
        lightest: '#DBDBDB',
        xlight: '#F4F4F4',
        dark: '#707070',
        darkest: '#5D5D5D',
        xdark: '#3F3F3F',
      },
      'teal': {
        DEFAULT: '#50B59B',
        light: '#D8F2EC'
      },
    },
  },
  plugins: [],
}
