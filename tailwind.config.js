const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        screens: {
            'xs': '480px',
            ...defaultTheme.screens,
            '2xl': '1536px',
        },
        extend: {
            colors: {
                primary: '#8072DB',
                primaryLight: '#B86FBF',
                primaryDark: '#5A8BEA',
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            backgroundImage: {
                'primary-gradient': 'linear-gradient(to right, #B86FBF, #8072DB, #5A8BEA)',
            },
            backgroundSize: {
                '200': '200% 100%',
            },
            animation: {
                'gradient': 'gradient 8s ease infinite',
            },
            keyframes: {
                gradient: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
