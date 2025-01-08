/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        romanticPink: "#FFC0CB",
        elegantGold: "#FFD700",
      },
      fontFamily: {
        primary: ['"Dancing Script"', 'cursive'],
        secondary: ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
