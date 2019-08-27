const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.config');
const { GenerateSW } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const isProd = process.env.NODE_ENV === 'production';

const config = merge(base, {
  entry: {
    app: './src/entry-client.js'
  },
  output: {
    filename: 'static/js/[name].[chunkhash].js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: isProd
          ? [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'stylus-loader'
          ]
          : ['vue-style-loader', 'css-loader', 'stylus-loader']
      }
    ]
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"client"'
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[chunkhash].css',
    }),
    new VueSSRClientPlugin()
  ]
});

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    // auto generate service worker
    new GenerateSW({
      cacheId: 'vue-hn',
      dontCacheBustURLsMatching: /./,
      globIgnores: ['node_modules/**/*', '**/*.map', '**/*.json'],
      // staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'NetworkFirst'
        },
        {
          urlPattern: /\/(foo|bar)/,
          handler: 'NetworkFirst'
        },
      ]
    })
  );
}

module.exports = config;
