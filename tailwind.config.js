/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        'index.html',
        'script/*.js',
    ],
    theme: {
        colors: {
            'yellow': '#FFD15B',
            'white': '#FFFFFF',
            'black': '#000000',
            'grey': '#7A7A7A',
            'light-grey': '#EDEDED',
        },
        fontFamily: {
            'anton': ['Anton', 'sans-serif'],
            'manrope': ['Manrope', 'sans-serif'],
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
