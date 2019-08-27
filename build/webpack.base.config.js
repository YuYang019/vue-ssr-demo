const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : '#cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
    },
    resolve: {
        alias: {
            public: path.resolve(__dirname, '../public')
        },
        extensions: ['.js', '.json', '.vue', '.scss', '.css']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: file =>
                    /node_modules/.test(file) && !/\.vue\.js/.test(file)
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
        ]
    },
    performance: {
        hints: false
    },
    optimization: {
        concatenateModules: true
    },
    plugins: isProd
        ? [
              new VueLoaderPlugin(),
          ]
        : [new VueLoaderPlugin(), new FriendlyErrorsPlugin()]
};
