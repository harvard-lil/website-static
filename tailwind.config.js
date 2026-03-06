/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    'app/_drafts/**/*.html',
    'app/_includes/**/*.html',
    'app/_layouts/**/*.html',
    'app/_posts/**/*.md',
    'app/about/**/*.html',
    'app/about/**/*.md',
    'app/jobs/**/*.html',
    'app/jobs/**/*.md',
    'app/events/**/*.html',
    'app/events/**/*.md',
    'app/contact/**/*.html',
    'app/contact/**/*.md',
    'app/blog/**/*.html',
    'app/blog/**/*.md',
    'app/404.html',
    'app/*.md',
    'app/*.html',
    'app/assets/javascripts/main.js',
  ],
  theme: {
    colors: {
      black: '#121212',
      white: '#ffffff',
      blue: '#A7E2FF',
      pink: '#FFA7A7',
      yellow: '#FFF069',
      green: '#8AAFBA',
      purple: '#F0D0FF',
      gray: '#DCE2E5',
    },
    fontFamily: {
      sans: ["NeueHaasGrotesk", "sans-serif"],
      mono: ["DMMono", "monospace"],
    },
    screens: {
      'sm': '586px',
      'tbl': '860px',
      'md': '992px',
      'lg': '1030px',
      'xl': '1300px',
      '2xl': '1520px'
    },
    keyframes: {
      'rotate': {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      },
    },
    animation: {
      'spin': 'rotate 30s linear infinite',
    }
  },
  plugins: [],
  safelist: [
    'bg-blue',
    'bg-pink',
    'bg-yellow',
    'bg-green',
    'bg-purple',
    'bg-gray',
  ]
}
