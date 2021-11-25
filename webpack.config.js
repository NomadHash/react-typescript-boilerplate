const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // RESOLVE
  resolve: {
    extensions: ['.ts', '.js', '.tsx', 'jsx'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  //* ENTRY
  entry: {
    'js/app': ['./src/App.tsx'],
  },

  //* OUTPUT
  output: {
    path: path.resolve(__dirname, 'build/'),
    publicPath: './',
  },

  //* MODULE
  module: {
    rules: [
      // For Typescript
      {
        test: /\.(ts|tsx)$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  //* PLUGINS
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    // For typescript
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/app.css',
    }),
  ],

  //* DEV_SERVER
  devServer: {
    hot: true,
    port: 3000,
    open: {
      app: {
        name: 'Google Chrome',
      },
    },
  },
};
