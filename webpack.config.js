const path = require('path');
const webpack = require('webpack');

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
  }
};