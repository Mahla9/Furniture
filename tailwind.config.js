/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  
  theme: {
    extend: {
      keyframes: {
        scalePulse: {
          '0%, 100%': { transform: 'scale(2)' },
          '50%': { transform: 'scale(2.8)' },
        },
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'scale-pulse': 'scalePulse 2.5s ease-in-out infinite'
      },
    },
  },
  plugins: [],
}

