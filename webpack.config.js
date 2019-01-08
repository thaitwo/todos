const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: "css/style.compile.css"
});

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './index.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].compile.js',
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  devServer: {
    contentBase: path.resolve(__dirname, './'),
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