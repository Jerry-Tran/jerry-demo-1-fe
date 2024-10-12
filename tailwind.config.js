/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        'primary-800': '#0A2FB6',
        'primary-500': '#365ff5',
        'system-primary': '#fafafa',
        'system-text': '#bfbfbf'
      },
      boxShadow: {
        'custom': '0 0 0 0.2rem #C7D2FE',
      }
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' }
      },
      slideUp: {
        '0%': { transform: 'translateY(20px)' },
        '100%': { transform: 'translateY(0)' }
      }
    },
    animation: {
      fadeIn: 'fadeIn 0.5s ease-in-out',
      slideUp: 'slideUp 0.5s ease-in-out'
    }
  },
  plugins: []
}
