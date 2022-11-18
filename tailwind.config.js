/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html', 'node_modules/daisyui/dist/**/*.js', 'node_modules/react-daisyui/dist/**/*.js'],
  theme: {
      extend: {}
  },
  variants: {
      extend: {}
  },
  plugins: [require('daisyui')]
};

// module.exports = {
//   content: ['node_modules/daisyui/dist/**/*.js', 'node_modules/react-daisyui/dist/**/*.js'],
//   plugins: [require('daisyui')],
// }
