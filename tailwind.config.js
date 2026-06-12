module.exports = {
  purge: [],
  safelist: [
    'embla__dot',
    'embla__dot--selected'
  ],
  darkMode: false, // or 'media' or 'class'
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        muted: "hsl(var(--muted))",
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
