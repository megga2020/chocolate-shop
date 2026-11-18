/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        choco: {
          50: '#FBF9F7',
          100: '#F5EFEB',
          200: '#E8DBD3',
          300: '#D2BEB0',
          400: '#A9856F',
          500: '#7E5842',
          600: '#5F3C29',
          700: '#482B1D',
          800: '#331D13',
          900: '#22120B',
          950: '#140905',
        },
        cream: {
          50: '#FFFDF9',
          100: '#FDF8F0',
          200: '#F8F1E4',
          300: '#EFE2CC',
          400: '#DFC8A5',
          500: '#C7A97E',
          DEFAULT: '#F8F1E4',
        },
        gold: {
          50: '#FCF9EE',
          100: '#F8F1D4',
          200: '#EFE0A2',
          300: '#E4CB6A',
          400: '#D4AF37',
          500: '#C59A2F',
          600: '#A6801E',
          700: '#7D5F13',
          800: '#5A430E',
          DEFAULT: '#D4AF37',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F8F1D4 0%, #D4AF37 50%, #9B7817 100%)',
        'choco-gradient': 'linear-gradient(180deg, #22120B 0%, #331D13 50%, #140905 100%)',
      },
    },
  },
  plugins: [],
};
