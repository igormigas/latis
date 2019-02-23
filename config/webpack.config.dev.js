//
// WEBPACK.CONFIG.JS
//

// Environment switch
// Must have NODE_ENV set in package.json script
const devMode = process.env.NODE_ENV.trim() !== 'production';
console.log(process.env.NODE_ENV.toUpperCase());

// Plugins & optimizers
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
const dirApp = 'src/';

// DOTENV
let envKeys = {};
const dotenvFile = devMode ? '.env.development' : '.env.production';
const env = dotenv.config({ path: path.resolve(__dirname, dotenvFile) }).parsed;
if (env) {
  envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
}


//
// Start of config
//
module.exports = {
  mode: devMode ? 'development' : 'production',
  devtool: devMode ? 'eval-source-map' : false,
  entry: {
    index: path.resolve(ROOT, dirApp, 'index.js'),
  },
  output: {
    path: path.resolve(ROOT, dirDistribution),
    filename: 'scripts/[name].dist.js',
    publicPath: '/',
    library: '',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  resolve: {
    // only to use jsx extensions for component files
    extensions: ['*', '.js', '.jsx'],
    modules: [
      path.resolve(ROOT, dirApp),
      'node_modules'
    ]
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
      title: 'tescior',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].dist.css',
      chunkFilename: 'styles/[id].dist.css',
    }),
    new webpack.DefinePlugin(envKeys),
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
    open: true,
    contentBase: path.resolve(ROOT, dirDistribution),
    historyApiFallback: true,
    publicPath: '/',
    https: false,
  },
};
