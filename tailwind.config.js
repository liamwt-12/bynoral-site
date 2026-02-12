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
        background: '#0b0f14',
        surface: '#11161d',
        'text-primary': '#f5f5f3',
        'text-muted': '#cfc8bb',
        border: 'rgba(30,30,30,0.12)',
        accent: '#c18745'
      },
      fontFamily: {
        heading: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif']
      }
    }
  },
  plugins: []
};
