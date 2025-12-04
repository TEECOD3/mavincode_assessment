/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          blue: '#3B82F6',
          'light-blue': '#EFF6FF',
          'dark-blue': '#1E40AF',
        },
        status: {
          success: '#10B981',
          danger: '#EF4444',
          warning: '#F59E0B',
          info: '#6B7280',
        },
        background: {
          DEFAULT: '#F9FAFB',
          primary: '#FFFFFF',
          secondary: '#F9FAFB',
          card: '#FFFFFF',
          border: '#E5E7EB',
        },
        text: {
          DEFAULT: '#111827',
          primary: '#111827',
          secondary: '#6B7280',
          muted: '#9CA3AF',
        },
      },
    },
  },
  plugins: [],
}