const config = {
  postcss: [
    require('autoprefixer')({
      browsers: ['> 1%', 'last 3 versions']
    })
  ]
}
if (process.env.NODE_ENV === 'production') {
  const ExtractTextPlugin = require('extract-text-webpack-plugin')
  config.loaders = {
    sass: ExtractTextPlugin.extract({
      fallbackLoader: 'vue-style-loader',
      loader: ['css-loader?' + JSON.stringify({ discardComments: { removeAll: true } }), 'sass-loader']
    })
  }
}
module.exports = config

