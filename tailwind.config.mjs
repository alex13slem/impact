const defaultColors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        ...defaultColors,
        dark: '#00203d',
        accent: '#fbcb6a',
        'gr-start': '#c3963c',
        'gr-middle': '#fadb9e',
        'gr-end': '#c6942f',
      },
      fontFamily: {
        sans: ['Onest', ...defaultTheme.fontFamily.sans],
        'road-radio': ['RoadRadio', ...defaultTheme.fontFamily.sans],
        'sov-mod': ['SovMod', ...defaultTheme.fontFamily.sans],
      },
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        DEFAULT: '1472px',
      },
    },
  },

  plugins: [],
};
