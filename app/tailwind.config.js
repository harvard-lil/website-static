/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './_drafts/**/*.html',
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/*.md',
    './about/**/*.html',
    './about/**/*.md',
    './jobs/**/*.html',
    './jobs/**/*.md',
    './*.md',
    './*.html',
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
      mono: ["DM Mono", "monospace"],
    },
    fontWeight: {
      normal: 400,
      medium: 500,
    },
    letterSpacing: {
      2: '0.02em',
      8: '0.08em',
    },
    lineHeight: {
      100: '100%',
      110: '110%',
      115: '115%',
      120: '120%',
      130: '130%',
      140: '140%',
      150: '150%',
    },
    extend: {
      fontSize: {
        'announcement': [
          '16px',
          {
            lineHeight: '18px',
            letterSpacing: '0.07em',
          }
        ],
        16: '16px',
        18: '18px',
        24: '24px',
        50: '50px',
      },
      borderWidth: {
        0: '0px',
        1: '1px',
      },
      // Auto generate spacing values up to 200px, will be purged if not used
      spacing: (() => {
        let spacing = {};
        for (let i = 0; i <= 300; i++) {
          spacing[i] = `${i}px`;
        }
        return spacing;
      })(),
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

