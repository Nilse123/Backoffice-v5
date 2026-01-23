import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': {
          '50': '#f0f4ff',
          '100': '#e6edff',
          '200': '#ccdaff',
          '300': '#99b5ff',
          '400': '#6685ff',
          '500': '#3355ff',
          '600': '#030213',
          '700': '#0202b8',
          '800': '#010294',
          '900': '#000050',
          '950': '#030213',
        },
        'background-light': '#f6f8f8',
        'background-dark': '#101d22',
      },
      fontFamily: {
        'display': ['Inter', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        'DEFAULT': '0.25rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        'full': '9999px',
      },
      // Configuración de anchos máximos (max-w-...)
      maxWidth: {
        'xs': '20rem',    // 320px
'sm': '24rem',    // 384px
'md': '28rem',    // 448px
'lg': '32rem',    // 512px
'xl': '36rem',    // 576px
'2xl': '42rem',   // 672px
'3xl': '48rem',   // 768px
'4xl': '56rem',   // 896px
'5xl': '64rem',   // 1024px
        '6xl': '72rem',   // 1152px
        '7xl': '80rem',   // 1280px
        '8xl': '90rem',   // 1440px
      },
      spacing: {
        '7': '1.75rem',  // Esto habilita px-7, py-7, m-7, w-7, h-7, etc.
        '9': '2.25rem',  // 36px
        '11': '2.75rem', // 44px
        '13': '3.25rem', // 52px
        '15': '3.75rem', // 60px
        '18': '4.5rem',   // 72px
        '20': '5rem',     // 80px
        '24': '6rem',     // 96px
        '32': '8rem',     // 128px
        '40': '10rem',    // 160px
        '48': '12rem',    // 192px
        '56': '14rem',    // 224px
        '64': '16rem',    // 256px
        '72': '18rem',    // 288px
        '80': '20rem',    // 320px
      },
    },
  },
} satisfies Config
