/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        inkGreen: {
          DEFAULT: '#1a2f23',
          50: '#2a4a38',
          100: '#1e3829',
          200: '#1a2f23',
          300: '#15261c',
          400: '#0f1c15',
          500: '#0a120e',
        },
        cream: {
          DEFAULT: '#faf6f0',
          50: '#fdfaf5',
          100: '#faf6f0',
          200: '#f5efe5',
          300: '#ede5d5',
          400: '#e0d4c0',
        },
        amberGold: {
          DEFAULT: '#d4a853',
          50: '#f5ecd3',
          100: '#e8d5a0',
          200: '#dcc07a',
          300: '#d4a853',
          400: '#c49530',
          500: '#a37a20',
        },
        softRed: {
          DEFAULT: '#c45c5c',
          50: '#f5dede',
          100: '#e8b0b0',
          200: '#d67a7a',
          300: '#c45c5c',
          400: '#a84040',
          500: '#8c2e2e',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'serif'],
        sans: ['"Noto Sans SC"', 'sans-serif'],
      },
      animation: {
        'glow-border': 'glow-border 2s ease-in-out infinite',
        'score-ring': 'score-ring 1.5s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.4s ease-out forwards',
      },
      keyframes: {
        'glow-border': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(212, 168, 83, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(212, 168, 83, 0.6), 0 0 40px rgba(212, 168, 83, 0.2)' },
        },
        'score-ring': {
          '0%': { strokeDashoffset: '283' },
          '100%': { strokeDashoffset: 'var(--ring-offset)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
