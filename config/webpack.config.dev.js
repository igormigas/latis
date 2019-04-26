//
// WEBPACK.CONFIG.JS
//

// Environment switch
// Must have NODE_ENV set in package.json script
const devMode = process.env.NODE_ENV.trim() !== 'production';
console.log(process.env.NODE_ENV.toUpperCase());

// Plugins & optimizers
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// Useful modules
const path = require('path');

//
// Paths & directories
//
const ROOT = path.resolve(__dirname, '../');
const dirHostRoot = 'demo/';
const dirDistribution = 'dist/';
const dirApp = 'dev/';
const dirLib = 'src/';


//
// Start of config
//
module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    index: path.resolve(ROOT, dirApp, 'index.js'),
  },
  output: {
    path: path.resolve(ROOT, dirDistribution),
    filename: 'scripts/[name].dist.js',
    publicPath: '',
  },
  resolve: {
    // only to use jsx extensions for component files
    extensions: ['*', '.js', '.jsx'],
    modules: [
      path.resolve(ROOT, dirLib),
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-export-default-from',
          ],
        },
      },
      {
        test: /\.s?css$/,
        exclude: path.resolve(ROOT, dirApp, 'styles'),
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]_[local]_[hash:base64:5]',
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        include: path.resolve(ROOT, dirApp, 'styles'),
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT, dirApp, 'template.html'),
      filename: path.resolve(ROOT, dirDistribution, 'index.html'),
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].dist.css',
      chunkFilename: 'styles/[id].dist.css',
    }),
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  stats: {
    colors: true,
  },
  devServer: {
    port: 4000,
    open: false,
    contentBase: path.resolve(ROOT, dirHostRoot),
    historyApiFallback: true,
    publicPath: '/',
    https: false,
  },
};
