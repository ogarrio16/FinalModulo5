const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
  rules: [
    {
      test: /\.s[ac]ss$/i,
      use: ['style-loader', 'css-loader', 'sass-loader']
    },
    {
      test: /\.ya?ml$/i,
      use: ['yaml-loader']
    },
    {
      test: /\.json5$/i,
      type: 'json',
      parser: {
        parse: require('json5').parse
      }
    },
    {
      test: /\.csv$/i,
      use: 'csv-loader'
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/i,
      type: 'asset/resource'
    }
  ]
},

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      title: 'Proyecto Webpack Simple'
    }),
    new CopyPlugin({
      patterns: [{ from: 'public/service-worker.js', to: '' }]
    })
  ],
  devServer: {
    port: 8080,
    open: true,
    hot: true
  },
  mode: 'development'
};
