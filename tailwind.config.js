/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#DC2626',
          dark: '#991B1B',
          light: '#EF4444',
        },
        dark: {
          DEFAULT: '#1F1F1F',
          light: '#2A2A2A',
          lighter: '#3A3A3A',
        },
        gray: {
          light: '#9CA3AF',
          DEFAULT: '#6B7280',
          dark: '#4B5563',
        }
      }
    },
  },
  plugins: [],
}
