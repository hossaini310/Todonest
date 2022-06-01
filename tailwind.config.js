/* eslint-disable no-undef */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {},
    colors: {
      highlight: '#e94b7c',
      mako: {
        50: '#f8f8f9',
        100: '#a3acb9',
        200: '#727881',
        300: '#484f59',
        400: '#3c424a',
        500: '#343a40',
        600: '#2e3238',
      },
    },
  },
  variants: {
    backgroundColor: [
      'group-focus-within',
      'group-focus-visible',
      'group-active',
      'group-visited',
      'group-disabled',
      'hocus',
      'group-hocus',
      'can-hover',
      'no-hover',
    ],

    hfc: ['hover', 'focus', 'checked'],
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-interaction-variants'),
    require('tw-elements/dist/plugin'),
  ],
};
