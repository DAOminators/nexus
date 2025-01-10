/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255, 255, 255, 0.35)",
          "0 0px 65px rgba(255, 255, 255, 0.2)"
        ]
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#1a8fff",
        secondary: "#0f0f0f",
      },
      fontSize: {
        'biggie': '28rem',
        'smallie': '18rem',
      },
      height:{
        'line': '1px',
      },
      width:{
        'line': '1px',
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
        sddystopian: ['Sddystopian', 'sans-serif'],
        cyberalert: ['CyberAlert', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
