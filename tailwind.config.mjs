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
        dark: 'var(--dark)',
        accent: 'var(--accent)',
        'gr-start': 'var(--gr-start)',
        'gr-middle': 'var(--gr-middle)',
        'gr-end': 'var(--gr-end)',
      },
      fontFamily: {
        serif: ['Onest', ...defaultTheme.fontFamily.serif],
        'road-radio': ['RoadRadio', ...defaultTheme.fontFamily.serif],
        'sov-mod': ['SovMod', ...defaultTheme.fontFamily.serif],
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
