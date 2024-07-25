/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",],
    theme: {
      extend: {
        colors: {
          'custom-dark': '#181E29',
        'custom-border': '#353C4A',
        'custom-text': '#FFFFFF',
        'custom-icon': '#C9CED6',
        }
      },
      borderRadius: {
        'custom': '48px',
      },
      boxShadow: {
        'custom': '0px 4px 10px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'awesome': ['Font Awesome 6 Pro', 'sans-serif'],
      },
    },
    plugins: [ require('@tailwindcss/typography'),],
  }
  
  