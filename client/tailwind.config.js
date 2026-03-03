/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Web3 Theme Colors
        'web3-bg': '#0D0D0D',
        'web3-primary': '#00FF9D',
        'web3-purple': '#7F00FF',
        'web3-pink': '#E100FF',
        'web3-card': 'rgba(255, 255, 255, 0.05)',
        'web3-border': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00FF9D 0%, #00D4FF 100%)',
        'gradient-purple': 'linear-gradient(135deg, #7F00FF 0%, #E100FF 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(127, 0, 255, 0.1) 0%, rgba(225, 0, 255, 0.1) 100%)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glow-green': '0 0 20px rgba(0, 255, 157, 0.3)',
        'glow-purple': '0 0 20px rgba(127, 0, 255, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
