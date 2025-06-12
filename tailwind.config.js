/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./public/index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Inter', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
            },
            colors: {
                primary: '#2563eb',
                secondary: '#64748b',
                accent: '#f59e42',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}
