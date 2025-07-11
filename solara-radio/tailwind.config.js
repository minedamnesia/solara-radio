module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Yeseva One"', 'serif'],
        sans: ['"IBM Plex Sans"', 'sans-serif'],
      },
       colors: {
        'persian-orange': '#EC935E',
        'gunmetal': '#0C2F34',
        'beaver': '#A37966',
        'tan': '#f2c79d',
        'feldgrau': '#586D5A',
        'sage': '#6c8d6a',
        'coffee': '#4B3621',
      },
    },
  },
  plugins: [],
};

