/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066CC',
        secondary: '#4B5563',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
      },
    },
  },
  plugins: [],
} 