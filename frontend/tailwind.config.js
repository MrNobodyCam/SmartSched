module.exports = {
    content: [
        "./src/**/*.{html,js,ts,jsx,tsx}", // Adjust paths to match your project structure
    ],
    theme: {
        extend: {},
    },
    plugins: [require('tailwind-scrollbar')],
};