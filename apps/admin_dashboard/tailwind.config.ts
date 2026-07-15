import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f3f9',
          100: '#d9e0f0',
          200: '#b3c1e0',
          300: '#8da2d1',
          400: '#6683c1',
          500: '#4064b2',
          600: '#1a458e',
          700: '#0f2d6b',
          800: '#0a1f4a',
          900: '#05102e',
          950: '#020815',
        },
        gold: {
          50: '#fef9e7',
          100: '#fdf0c4',
          200: '#fce19d',
          300: '#fbd275',
          400: '#f9c34e',
          500: '#f8b426',
          600: '#d99a0f',
          700: '#a6780c',
          800: '#735408',
          900: '#403004',
          950: '#201802',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
