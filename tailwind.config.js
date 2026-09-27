/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF8EE',
          100: '#FAF6E8',
          200: '#F3E5AB',
          300: '#E6C251',
          400: '#D4AF37',
          500: '#C19A2E',
          600: '#9A7B1C',
          700: '#7A6216',
          800: '#5E4B10',
        },
        charcoal: {
          50: '#F5F4F2',
          100: '#E8E2D9',
          200: '#C4BDB1',
          300: '#9A9186',
          400: '#6B6358',
          500: '#4A453E',
          600: '#3A352F',
          700: '#2A2723',
          800: '#1C1A17',
          900: '#121110',
        },
        cream: '#FAF8F5',
        burgundy: '#8B261D',
      },
      fontFamily: {
        serif: ['Cinzel', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 2px 8px rgba(28, 26, 23, 0.04)',
        md: '0 8px 24px rgba(28, 26, 23, 0.07)',
        lg: '0 16px 48px rgba(28, 26, 23, 0.12)',
        gold: '0 4px 20px rgba(212, 175, 55, 0.25)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'bar-grow': {
          '0%': { width: '0%' },
          '100%': { width: 'var(--bar-width)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.4s ease forwards',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        shimmer: 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
};
