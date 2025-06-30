module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Yeseva One"', 'serif'],
        sans: ['"IBM Plex Sans"', 'sans-serif'],
      },
       colors: {
        'persian-orange': '#EC9860',
        'gunmetal': '#0C2F34',
        'beaver': '#A37966',
        'tan': '#D0AF87',
        'feldgrau': '#586D5A',
        'sage': '#A0AA7F',
        'coffee': '#755847',
      },
    },
  },
  plugins: [],
};
