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
      },
	{
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          //'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ]
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
}
}