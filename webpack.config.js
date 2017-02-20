const ExtractTextPlugin = require("extract-text-webpack-plugin");
var combineLoaders = require('webpack-combine-loaders');

module.exports = {
  entry: './frontend/src/js/main.js',

  output: {
    filename: './frontend/public/js/main.js',
    publicPath: ''
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })  
      }
    ],
    loaders: [
      { test: /\.css$/,
        loader: combineLoaders([
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
        ])
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2'],
          plugins: ['transform-decorators-legacy']
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
  ]
};
