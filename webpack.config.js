const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: "css/style.compile.css"
});

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './js/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].compile.js',
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  devServer: {
    contentBase: './',
    compress: true,
    port: 8000
  },
  module: {
    rules: [{
      test: /\.scss$/,
      loader: extractSass.extract({
        use: [{ loader: 'css-loader' }, { loader: 'sass-loader' }],
        fallback: 'style-loader'
      })
    }]
  },
  plugins: [
    extractSass
  ]
};