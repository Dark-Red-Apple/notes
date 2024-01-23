const path = require('path'),
settings = require('./settings');

module.exports = {
  entry: {
    App: settings.themeLocation + "src/index.js"
  },
  output: {
    path: path.resolve(__dirname, settings.themeLocation + "src"),
    filename: "scripts-bundled.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  mode: 'development'
}