import path from 'path'
import PurgecssPlugin from 'purgecss-webpack-plugin'
import glob from 'glob-all'
import pkg from './package'

class TailwindExtractor {
  static extract(content) {
    // eslint-disable-next-line no-useless-escape
    return content.match(/[A-z0-9-:\/]+/g) || []
  }
}

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Potty 🚨 Alarm',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
  },

  serverMiddleware: ['~/api/index.js'],

  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#56CE9E' },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/vue-ripple-effect'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,
    postcss: {
      plugins: {
        tailwindcss: path.resolve('./tailwind.js')
      },
      preset: { autoprefixer: { grid: true } }
    },
    extend(config, { isDev }) {
      if (!isDev) {
        config.plugins.push(
          new PurgecssPlugin({
            // purgecss configuration
            // https://github.com/FullHuman/purgecss
            paths: glob.sync([
              path.join(__dirname, './pages/**/*.vue'),
              path.join(__dirname, './layouts/**/*.vue'),
              path.join(__dirname, './components/**/*.vue')
            ]),
            extractors: [
              {
                extractor: TailwindExtractor,
                extensions: ['vue']
              }
            ],
            whitelist: ['html', 'body', 'nuxt-progress']
          })
        )
      }
    }
  }
}
