/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        'index.html',
    ],
    theme: {
        colors: {
            'yellow': '#FFD15B',
            'white': '#FFFFFF',
            'black': '#000000',
        },
        fontFamily: {
            'anton': ['Anton', 'sans-serif'],
        },
        fontSize: {
            '5xl': '44px',
        },
        extend: {
            backgroundImage: theme => ({
                'bg': 'url("/assets/bg.png")',
            }),
        },
    },
    plugins: [],
}
