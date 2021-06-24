module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: {
            DEFAULT: '#ffffff',
        },
        blue: {
            light: '#99CCFF',
            DEFAULT: ' #66CCFF',
            dark: '#0099CC',
            darker: '#003399',
        },
        red: {
            light: '#FFEAEA',
            DEFAULT: '#EB5757',
            dark: '#C20D0D',
        },
        orange: {
            light: '#FFEBDA',
            DEFAULT: '#F66A0A',
            dark: '#A04100',
        },
        primary: {
            DEFAULT: '#24292E',
        },
        warning: {
            DEFAULT: '#D1711C',
        }
    },
    extend: {
        boxShadow: {
            default: '0px 10px 20px rgba(150, 150, 187, 0.1)',
        },
        fontSize: {
            '2rem': '2rem',
        },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
