const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    layers: ['components', 'utilities'],
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    options: {
      safelist: [
        'bg-yellow-400',
        'bg-green-400',
        'bg-blue-400',
        'bg-purple-400',
        'bg-red-400',
        'bg-pink-400',
        'text-right',
        'text-left',
        'has-text-align-right',
        'has-text-align-left',
        'my-8',
        'flex',
        'flex-col',
        'items-center',
        'self-center',
        'w-full',
        'sm:w-5/6',
        'md:w-4/5',
        'lg:w-3/4',
        'border-2',
        'border-black',
        'shadow-md',
        'w-full',
        'mt-4',
        'text-sm',
        'self-center',
      ],
    }
  },
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
    extend: {
      fontWeight: ['hover'],
    },
  },
  plugins: [],
}
