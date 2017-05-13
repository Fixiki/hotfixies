require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Data Science School',
    head: {
      titleTemplate: 'Data Science School: %s',
      meta: [
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Data Science School'},
        {property: 'og:title', content: 'Data Science School'},
      ]
    }
  },

}, environment);
