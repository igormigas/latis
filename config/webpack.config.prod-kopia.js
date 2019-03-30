//
// WEBPACK.CONFIG.JS
//

// Environment switch
// Must have NODE_ENV set in package.json script
console.log(process.env.NODE_ENV.toUpperCase());

// Plugins & optimizers
const webpack = require('webpack');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// Useful modules
const path = require('path');

//
// Paths & directories
//
const ROOT = path.resolve(__dirname, '../');
const dirDistribution = 'dist/';
const dirSrc = 'src/';

//
// Start of config
//
module.exports = {
  mode: 'production',
  devtool: false,
  entry: {
    index: path.resolve(ROOT, dirSrc, 'index.js'),
  },
  output: {
    path: path.resolve(ROOT, dirDistribution),
    filename: '[name].js',
    publicPath: '/',
    library: '',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  resolve: {
    // only to use jsx extensions for component files
    extensions: ['*', '.js', '.jsx'],
    modules: [
      path.resolve(ROOT, dirSrc),
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
        exclude: path.resolve(ROOT, dirSrc, 'styles'),
        use: [
          MiniCssExtractPlugin.loader,
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
        include: path.resolve(ROOT, dirSrc, 'styles'),
        use: [
          MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin({
      filename: 'styles/[name].dist.css',
      chunkFilename: 'styles/[id].dist.css',
    }),

  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new UglifyJsPlugin(),
    ],
  },
  stats: {
    colors: true,
  },
};
