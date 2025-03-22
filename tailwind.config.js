/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fffffF",
        textColor: "#3a3845",
        boxBg: "#3a3845",
        liteGold: "#ffd39a",
        semiLiteGold: "#ffd39ab7",
        navColor: "#6a6a75",
      },
    },
  },
  plugins: [],
};
