/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
        background: 'hsl(var(--background))',
        surface: 'hsl(var(--surface))',
        'text-primary': 'hsl(var(--text-primary))',
        'text-secondary': 'hsl(var(--text-secondary))',
        border: 'hsl(var(--border))',
      },
      animation: {
        'pulse-success': 'pulse-success 0.3s ease-in-out',
        'pulse-error': 'pulse-error 0.3s ease-in-out',
        'level-up': 'level-up 0.6s ease-out',
        'streak-flame': 'streak-flame 0.5s ease-in-out infinite',
      },
      keyframes: {
        'pulse-success': {
          '0%, 100%': { transform: 'scale(1)', backgroundColor: 'var(--surface)' },
          '50%': { transform: 'scale(1.1)', backgroundColor: 'var(--success)' },
        },
        'pulse-error': {
          '0%, 100%': { transform: 'scale(1)', backgroundColor: 'var(--surface)' },
          '50%': { transform: 'scale(1.1)', backgroundColor: 'var(--error)' },
        },
        'level-up': {
          '0%': { transform: 'scale(0.8) rotate(-5deg)', opacity: '0' },
          '50%': { transform: 'scale(1.1) rotate(2deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        'streak-flame': {
          '0%, 100%': { transform: 'scale(1) translateY(0)' },
          '50%': { transform: 'scale(1.05) translateY(-2px)' },
        },
      },
    },
  },
  plugins: [],
}
