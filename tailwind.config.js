/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#1a8fff",
      },
      fontSize: {
        'biggie': '17rem',
      },
      
      fontFamily: {
        agnes: ['Agnes', 'sans-serif'],
        alexbrush: ['AlexBrush', 'sans-serif'],
        budmojiggler: ['BudmoJiggler', 'sans-serif'],
        helvetica: ['Helvetica', 'sans-serif'],
        murmure: ['Murmure', 'sans-serif'],
        pilowlava: ['Pilowlava', 'sans-serif'],
        typefessobscure: ['Typefesse-Obscure', 'sans-serif'],
        typefesse: ['Typefesse', 'sans-serif'],
        abril: ['Abril', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
