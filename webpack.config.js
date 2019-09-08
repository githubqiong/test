var webpack = require('webpack');
var path = require('path');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');

// variables
var isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production';
var isDevServerMode = process.argv.indexOf('--hot') >= 0;
var sourcePath = path.join(__dirname, './src');
var outPath = path.join(__dirname, './dist');
var chunkhashName = '[name].[chunkhash:8].js';
var hashName = '[name].[hash:8].js';

module.exports = {
  context: sourcePath,
  entry: {
    app: './index.js'
  },
  output: {
    path: outPath,
    filename: isProduction ? chunkhashName : hashName,
    chunkFilename: isProduction ? chunkhashName : hashName
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx'],
    mainFields: ['module', 'browser', 'main'],
  },
  module: {
    rules: [
      // .js, .jsx
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        include: sourcePath
      },
      // css
      {
        test: /\.less$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: !isProduction,
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-import')({ addDependencyTo: webpack }),
                require('postcss-url')(),
                require('postcss-preset-env')({
                  stage: 2
                }),
                require('postcss-px-to-viewport')({
                  viewportWidth: 375,
                }),
                require('postcss-reporter')(),
                require('postcss-browser-reporter')({
                  disabled: isProduction
                })
              ]
            }
          },
          { loader: "less-loader" }
        ]
      },
      { test: /\.html$/, use: 'html-loader' },
      {
        test: /\.(png|jpe?g|gif|bmp)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: 'image/[name]-[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          filename: isProduction ? 'vendor.[chunkhash:8].js' : 'vendor.[hash:8].js',
          priority: -10
        }
      }
    },
    runtimeChunk: {
      name: () => 'runtime'
    }
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: isProduction ? 'production' : 'development',
      ISSERVER: isDevServerMode,
      DEBUG: false
    }),
    new webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
    new webpack.NamedModulesPlugin(),
    new CleanWebpackPlugin(),
    new ManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[contentHash:8].css' : '[name].css',
      chunkFilename: isProduction ? '[name].[contentHash:8].css' : '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: 'assets/index.html',
      minify: {
        minifyJS: true,
        minifyCSS: true,
        removeComments: true,
        useShortDoctype: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true
      }
    })
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal',
    clientLogLevel: 'warning',
  },
  devtool: isProduction ? 'hidden-source-map' : 'source-map',
  node: {
    fs: 'empty',
    net: 'empty'
  }
};
