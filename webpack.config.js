const path = require('path');
const os = require('os');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isDevMode = process.env.NODE_ENV.includes('dev');

const plugins = [
  new HtmlWebpackPlugin({
    template: './public/index.html',
    filename: 'index.html',
  }),
  new ForkTsCheckerWebpackPlugin(),
  new CleanWebpackPlugin(),
];

if (!isDevMode) {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash].css',
    }),
  );
}

module.exports = {
  mode: isDevMode ? 'development' : 'production',
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
  },

  //* MODULE
  module: {
    rules: [
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
        use: [isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        // write image files under 10k to inline or copy image files over 10k
        test: /\.(jpg|jpeg|gif|png|svg|ico)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: 'assets/images/[name].[ext]',
            },
          },
        ],
      },
      {
        // write files under 10k to inline or copy files over 10k
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: 'assets/fonts/[name].[ext]',
            },
          },
        ],
      },
    ],
  },

  //* PLUGINS
  plugins,

  //* OPTIMIZATION
  optimization: {
    // ??????
    minimize: !isDevMode,
    // ???????????????
    minimizer: [
      // ???????????? ???????????? ??????
      new CssMinimizerPlugin({
        // CPU ?????? ???????????? ????????? ?????? (?????? ???: true)
        parallel: os.cpus().length - 1,
      }),
    ],
  },

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
