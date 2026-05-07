/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#000000',
          50: '#0a0a0a',
          100: '#141414',
          200: '#1f1f1f',
          300: '#2a2a2a',
          400: '#363636',
          500: '#424242',
          600: '#4f4f4f',
          700: '#5c5c5c',
          800: '#6a6a6a',
          900: '#787878',
        },
        gold: {
          50: '#fffdf0',
          100: '#fefce8',
          200: '#fef9c3',
          300: '#fef08a',
          400: '#fde047',
          500: '#facc15',
          600: '#eab308',
          700: '#ca8a04',
          800: '#a16207',
          900: '#854d0e',
          950: '#713f12',
          DEFAULT: '#FFD700',
          bright: '#FFA500',
          dark: '#B8860B',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d2d2d 100%)',
        'gradient-gold': 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #B8860B 100%)',
        'gradient-subtle': 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
      },
      fontFamily: {
        'sport': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Bebas Neue', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-gold': 'pulseGold 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 215, 0, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
