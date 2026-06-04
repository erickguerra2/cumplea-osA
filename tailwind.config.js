/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta cinematografica: noche profunda -> rosa/oro romantico
        midnight: {
          DEFAULT: '#05030f',
          50: '#1a1530',
          100: '#120e25',
          900: '#05030f',
        },
        cosmos: '#0a0820',
        nebula: '#2a1b4a',
        rose: {
          glow: '#ff8fb1',
          soft: '#ffc2d4',
          deep: '#e0507a',
        },
        gold: {
          DEFAULT: '#f5d491',
          soft: '#ffe9c2',
          deep: '#d9a85c',
        },
        aurora: '#7c5cff',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
