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
        background: 'var(--color-dark)',
        surface: 'var(--color-daylight)',
        'text-primary': 'var(--text-on-dark)',
        'text-muted': 'var(--text-on-dark-secondary)',
        border: 'var(--border-on-dark)',
        accent: 'var(--color-accent)',
        'text-light-primary': 'var(--text-on-light)',
        'text-light-muted': 'var(--text-on-light-secondary)',
        'border-light': 'var(--border-on-light)',
        'border-dark': 'var(--border-on-dark)'
      },
      fontFamily: {
        heading: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif']
      }
    }
  },
  plugins: []
};
