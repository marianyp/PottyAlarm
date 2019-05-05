module.exports = {
  plugins: [
    require('tailwindcss')('tailwind.js'),
    // Only add purgecss in production
    process.env.NODE_ENV === 'production'
      ? require('@fullhuman/postcss-purgecss')({
        content: ['./src/**/*.html', './src/**/*.vue'],
        extractors: [
          {
            extractor: class TailwindExtractor {
              static extract(content) {
                // eslint-disable-next-line no-useless-escape
                return content.match(/[A-Za-z0-9-_:\/]+/g) || []
              }
            },
            extensions: ['css', 'html', 'vue']
          }
        ]
      })
      : '',
    require('autoprefixer')
  ]
}
