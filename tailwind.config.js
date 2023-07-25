const { transform } = require('typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-cabin)', 'var(--font-montserrat)'],
      },
      keyframes: {
        rotate: {
          '100%': { transform: 'rotate(0deg)' },
          '0%': { transform: 'rotate(180deg)' },
        },
      },
      animation: {
        'rotate': 'rotate 0.3s linear',
      },
    },
  },
  plugins: [],
}
