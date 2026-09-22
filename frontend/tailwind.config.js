/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        nn: {
          bg:       '#faf8f3',
          surface:  '#ffffff',
          card:     '#f3efe7',
          border:   '#d9ddd7',
          blue:     '#23665a',
          'blue-d': '#174a43',
          cyan:     '#2e8175',
          green:    '#16805d',
          amber:    '#c77b18',
          red:      '#b83a32',
          muted:    '#7c8984',
          text:     '#172522',
          dim:      '#53635f',
          teal:     '#2e8175',
          plum:     '#7556a3',
          terracotta: '#c96b4b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-blue':  '0 8px 24px rgba(35,102,90,0.08)',
        'glow-green': '0 8px 24px rgba(22,128,93,0.08)',
        'glow-red':   '0 8px 24px rgba(184,58,50,0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'fade-in':    'fadeIn 0.3s ease-in-out',
        'slide-up':   'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(8px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      },
    },
  },
  plugins: [],
};
