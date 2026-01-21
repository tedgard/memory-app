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
        primary: '#6366f1',        // Indigo - focus/brain
        secondary: '#8b5cf6',      // Purple - creativity/learning
        success: '#10b981',        // Green - correct response
        error: '#ef4444',          // Red - incorrect response
        warning: '#f59e0b',        // Amber - attention
        background: '#0f172a',     // Dark slate
        surface: '#1e293b',        // Slate - cards
        'text-primary': '#f1f5f9', // Light slate
        'text-secondary': '#94a3b8', // Gray
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
