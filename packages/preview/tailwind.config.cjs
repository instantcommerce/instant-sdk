const defaultTheme = require('tailwindcss/defaultTheme');

const primaryColors = {
  50: '#FFF2B9',
  100: '#EFF8FF', //
  200: '#D1E9FF', //
  300: '#84CAFF',
  400: '#FFD82A',
  500: '#2E90FA', //
  600: '#1570EF', //
  700: '#175CD3', //
  800: '#584800',
  900: '#201A00',
};

const secondaryColors = {
  50: '#F0F9FF',
  100: '#E0F2FE',
  200: '#BAE6FD',
  300: '#7DD3FC',
  400: '#38BDF8',
  500: '#0EA5E9',
  600: '#0284C7',
  700: '#0369A1',
  800: '#075985',
  900: '#0C4A6E',
};

const neutralColors = {
  50: '#F9FAFB',
  100: '#F4F4F5',
  200: '#E4E4E7',
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#71717A',
  600: '#4B5563',
  700: '#3F3F46',
  800: '#27272A',
  900: '#18181B',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Patron', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: '#FFD101',
        primary: primaryColors,
        secondary: secondaryColors,
        gray: neutralColors,
      },
      width: {
        50: '12.5rem',
      },
      spacing: {
        1.5: '0.375rem',
      },
      space: {
        1.5: '0.375rem',
      },
    },
  },
  plugins: [require('tailwindcss-radix')(), require('@tailwindcss/typography')],
};
