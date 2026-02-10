/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#F6F3EE',
        surface: '#FFFFFF',
        'text-primary': '#1E1E1E',
        'text-muted': '#585858',
        border: 'rgba(30,30,30,0.12)',
        accent: '#2F6F5E'
      },
      fontFamily: {
        heading: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif']
      }
    }
  },
  plugins: []
};
