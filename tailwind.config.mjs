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
        'aleo': ['Aleo', 'serif'],
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
      },
      animation: {
        scroll: "scroll 1s infinite linear",
      },
    },
  },
  plugins: [],
};