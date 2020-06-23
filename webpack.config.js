const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  entry: {
    app: path.join(__dirname, 'src', 'index.tsx'),
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {},
        },
      },
    ],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
