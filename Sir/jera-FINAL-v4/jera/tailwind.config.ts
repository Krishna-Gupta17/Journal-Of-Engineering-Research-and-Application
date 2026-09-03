import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f9',
          100: '#dce6f1',
          200: '#b8cde4',
          300: '#8eaed2',
          400: '#6490be',
          500: '#4676ab',
          600: '#345d90',
          700: '#123458',
          800: '#0e2843',
          900: '#091c2e',
        },
        ocean: {
          500: '#1E88E5',
          600: '#1976D2',
          700: '#1565C0',
        },
        teal: {
          600: '#0F766E',
          700: '#0d6961',
        },
        bg: '#F7F9FC',
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: 'Inter, system-ui, sans-serif',
            h1: { fontFamily: 'Merriweather, Georgia, serif' },
            h2: { fontFamily: 'Merriweather, Georgia, serif' },
            h3: { fontFamily: 'Merriweather, Georgia, serif' },
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
