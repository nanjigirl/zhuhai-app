/**
 * Created by czzou on 2016/1/20.
 */
var webpack = require('webpack');
var path = require('path');
module.exports = {
    //这里写成数组是为了dev server插入服务配置
    entry: {
        "app": ['../src/app.js'],
    },
    resolve: {
        //把src目录添加到require时的根目录
        root: [path.resolve(__dirname, '../src')],
        resolve: {
            //把src目录添加到require时的根目录
            root: [path.resolve(__dirname, '../src')],
            alias: {
                services: path.resolve(__dirname, '../src/services'),
                controllers: path.resolve(__dirname, '../src/controllers'),
                utils: path.resolve(__dirname, '../src/utils')
            }
        },
    },
    output: {
        path: path.resolve(__dirname, "../release"),//__dirname+'/../release',
        publicPath: "/release/",//dev server 会从此路径去拿hot-update.json
        filename: '[name].bundle.js'
    },
    externals: {
        'vue': 'Vue'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.html$/, loader: 'html-loader'},
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {test: /\.(png|jpg|jpeg|gif)$/, loader: "url?limit=8192"},
            {
                // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                loader: 'file?name=./static/fonts/[name].[ext]',
            }
        ]
    },
    babel: {
        presets: ['es2015']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    devtool: "source-map"
}