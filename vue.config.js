const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'docs/.vuepress/components')
      }
    }
  }
}
