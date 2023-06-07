module.exports = {
  style: {
    postcss: {
      plugins: [
        require("postcss-import"),
        require("postcss-advanced-variables"),
        require("tailwindcss/nesting"),
        require("tailwindcss")("./tailwind.config.js"),
        require("autoprefixer")
      ],
    },

  },
  plugins: {
    'postcss-import': {},
    'postcss-advanced-variables': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
}
