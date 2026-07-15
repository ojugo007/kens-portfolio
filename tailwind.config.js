module.exports = {
  purge: [],
  safelist: [
    'embla__dot',
    'embla__dot--selected'
  ],
  darkMode: 'class', // or 'media' or 'class'
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        muted: "hsl(var(--muted))",
        base: "var(--bg-base)",
        surface: "var(--bg-surface)",
        "surface-alt": "var(--bg-surface-alt)",
        card: "var(--bg-card)",
        "card-alt": "var(--bg-card-alt)",
        ink: "var(--text-primary)",
        "ink-muted": "var(--text-muted)",
        edge: "var(--border-subtle)",
        accent: "var(--accent)",
      },
      screens: {
        xs: "370px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
