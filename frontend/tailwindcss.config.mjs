// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lobster: ['Lobster', 'cursive'],
        spaceGrotesk: ['"Space Grotesk"', 'sans-serif'],
        tinos: ['Tinos', 'serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
