module.exports = {
  entry: './frontend/src/js/main.js',

  output: {
    filename: './frontend/public/js/main.js',
    publicPath: ''
  },

  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2'],
          plugins: ['transform-decorators-legacy']
        }
      }
    ]
  }
};
