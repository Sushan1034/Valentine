/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'romantic-dark': '#1a0a0a',
                'romantic-red': '#cc3333',
                'romantic-pink': '#ffb7b2',
            },
            fontFamily: {
                playfair: ['Playfair Display', 'serif'],
                inter: ['Inter', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
