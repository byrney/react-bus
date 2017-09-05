const webpack = require('webpack');
const path = require('path');
// polyfill for old version of nodejs required for css-loader
const Promise = require('es6-promise');
// relocate libraries from packages.json into a vendor bundle
const packages = require('./package.json');
const npmLibs = Object.keys(packages.dependencies);
const optimize = new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor-bundle.js'});
const Notifier = require('webpack-error-notification');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    entry: {
        app: './main.js',
        vendor: npmLibs // node libs will go into vendor bundle
    },

    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '*']
    },

    plugins: [
        new Notifier(),
        optimize,
        new ExtractTextPlugin('[name].css')
    ],

    module: {
        rules: [ {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
        },
        {
            enforce: 'pre',
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/
        },
        {
            test: /\.json$/, use: ['json-loader']
        },
        {// underscore templates
            test: /\.ejs$/, use: ['ejs-loader']
        },
        {// output the index file directly
            test: /main\.html$/, use: ['file-loader?name=index.html']
        },
        {// other html files
            test: /kpstats\.html$/, use: ['file-loader?name=kpstats.html']
        },
        {// other html files
            test: /warnings\.html$/, use: ['file-loader?name=warnings.html']
        },
        {// inline or emit fonts and images depending on size
            test: /\.(png|woff|woff2|eot|ttf|svg|otf)$/, use: ['url-loader?limit=500&name=[name].[ext]']
        },
        {// load css
            test: /\.css$/, use: ['style-loader', 'css-loader']
        },
        // font-awesome loaders
        {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader?limit=10000&mimetype=application/font-woff']
        },
        {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader?limit=10000&mimetype=application/font-woff']
        },
        {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader?limit=10000&mimetype=application/octet-stream']
        },
        {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: ['file-loader']
        }
        ]
    },

    devServer: {
        historyApiFallback: true,
        host: 'localhost',
        port: 9099,
        inline: true
    }

};
