/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,vue,svelte}",
    ],
    theme: {
        extend: {
            fontFamily: {
                lobster: ['Lobster', 'cursive'],
                playfair: ['Playfair', 'serif'],
                poppins: ['Poppins', 'sans-serif'],
                spaceGrotesk: ['Space Grotesk', 'sans-serif'],
                tinos: ['Tinos', 'serif'],
            },
        },
    },
    plugins: [],
};