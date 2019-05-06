import path from 'path'
import purgecss from '@fullhuman/postcss-purgecss'
import pkg from './package'

const tailwindConfig = path.join(__dirname, 'tailwind.js')

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [] // eslint-disable-line no-useless-escape
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
      plugins: [
        require('tailwindcss')(tailwindConfig),
        require('autoprefixer'),
        require('cssnano')({
          preset: 'default'
        }),
        purgecss({
          content: [
            './pages/**/*.vue',
            './layouts/**/*.vue',
            './components/**/*.vue'
          ],
          extractors: [
            {
              extractor: TailwindExtractor,
              extensions: ['vue', 'js', 'html']
            }
          ],
          whitelist: ['html', 'body', 'nuxt-progress']
        })
      ]
    }
  }
}
