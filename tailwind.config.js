/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // font-medium is the heaviest weight used in the design system (600)
      fontWeight: {
        medium: '600',
      },
    },
  },
  plugins: [],
};
