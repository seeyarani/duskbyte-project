/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',  // Ensure these paths match your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),  // Add this line if you want to use the forms plugin
  ],
}

