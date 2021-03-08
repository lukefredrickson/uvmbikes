const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    boxShadow: {
      sm: '1px 1px 0px 0px rgba(0,0,0,1)',
      DEFAULT: '2px 2px 0px 0px rgba(0,0,0,1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      md: '3px 3px 0px 0px rgba(0,0,0,1)',
      lg: '4px 4px 0px 0px rgba(0,0,0,1)',
      none: 'none',
    },
    fontFamily: {
      'header': [
        'Montserrat',
      ],
      'display': [
        'Teko',
      ]
    },
    extend: {
      fontFamily: {
        sans: [
          '"Roboto Slab"',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      backgroundImage: theme => ({
        'topo': "url('../img/topo.svg')",
        'electro': "url('../img/electro.svg')",
        'wood': "url('../img/wood.svg')",
        'texture': "url('../img/texture.svg')",
        'texture-white': "url('../img/texture-gray.svg')",
        'cogs': "url('../img/cogs.svg')",
        'bubbles': "url('../img/bubbles.svg')",
      })

    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
