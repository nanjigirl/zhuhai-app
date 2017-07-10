var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
//ExtractTextPlugin更新2.x版本后，格式有变
// var cssExtract = new ExtractTextPlugin("app.[contenthash:8].css");
var cssExtract = new ExtractTextPlugin({filename: "app.[contenthash:8].css"});
module.exports = {
    entry: {
        index: '../src/app.js'
    },
    resolve: {
        //把src目录添加到require时的根目录
        root: [path.resolve(__dirname, '../src')],
        alias: {
            services: path.resolve(__dirname, '../src/services'),
            controllers: path.resolve(__dirname, '../src/controllers'),
            utils: path.resolve(__dirname, '../src/utils')
        }
    },
    output: {
        path: path.resolve(__dirname, "../release"),
        publicPath: "",//TODO 填写生产环境静态文件路径
        filename: 'app.[chunkhash:8].bundle.js'
    },
    babel: {
        presets: ['es2015']
    },

    externals: {
        'vue': 'Vue',
        'jquery': 'window.$'
    },
    module: {
        loaders: [
            {
                //ExtractTextPlugin更新2.x版本后，格式有变
                test: /\.css$/, loader: cssExtract.extract({
                fallback: "style-loader",
                loader: "css-loader"
            })
            },
            {test: /\.html$/, loader: 'html-loader'},
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                loader: 'file?name=./static/fonts/[name].[ext]',
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                drop_console: true,
                warnings: false
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        cssExtract
    ]
}