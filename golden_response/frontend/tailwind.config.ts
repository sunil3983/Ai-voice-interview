import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14213d',
        mint: '#2ec4b6',
        coral: '#ff6b6b',
        gold: '#f4d35e'
      },
      boxShadow: {
        soft: '0 16px 48px rgba(20, 33, 61, 0.12)'
      }
    }
  },
  plugins: []
} satisfies Config;
