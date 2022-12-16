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

const warningColors = {
  50: '#FFFAEB',
  100: '#FEEFC7',
  200: '#FEDF89',
  300: '#FEC84B',
  400: '#FDB022',
  500: '#F79009',
  600: '#DC6803',
  700: '#B54708',
  800: '#93370D',
  900: '#792E0D',
};

const errorColors = {
  50: '#FEF2F2',
  100: '#FEE2E2',
  200: '#FECACA',
  300: '#FCA5A5',
  400: '#F87171',
  500: '#EF4444',
  600: '#DC2626',
  700: '#B91C1C',
  800: '#991B1B',
  900: '#7F1D1D',
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
        error: errorColors,
        warning: warningColors,
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
      // modal animations
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 0.4 },
        },
        contentShow: {
          from: {
            opacity: 0,
            transform: 'translate(-50%, -48%) scale(0.96)',
          },
          to: {
            opacity: 1,
            transform: 'translate(-50%, -50%) scale(1)',
          },
        },
      },
      animation: {
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-radix')(), require('@tailwindcss/typography')],
};
