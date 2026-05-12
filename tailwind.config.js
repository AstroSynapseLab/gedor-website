/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const plugin = require('tailwindcss/plugin');
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  plugins: [
    require('@tailwindcss/typography'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animate-duration': value => ({
            animationDuration: value,
          }),
        },
        { values: theme('transitionDuration') }
      );
      matchUtilities(
        {
          'animate-ease': value => ({
            animationTimingFunction: value,
          }),
        },
        { values: theme('transitionTimingFunction') }
      );
      matchUtilities(
        {
          'animate-delay': value => ({
            animationDelay: value,
          }),
        },
        { values: theme('transitionDelay') }
      );
    }),
  ],
};
