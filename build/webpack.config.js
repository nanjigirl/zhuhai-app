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
        modules: [
            path.resolve(__dirname, '../src'),
            "node_modules"
        ],
        alias: {
            services: path.resolve(__dirname, '../src/services'),
            controllers: path.resolve(__dirname, '../src/controllers'),
            utils: path.resolve(__dirname, '../src/utils'),
            lib: path.resolve(__dirname, '../src/lib')
        }
    },
    output: {
        path: path.resolve(__dirname, "../release"),
        publicPath: "",//TODO 填写生产环境静态文件路径
        filename: 'app.[chunkhash:8].bundle.js'
    },
    externals: {
        'vue': 'Vue',
        'jquery': 'window.$'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                //webpack2.0后use多个时有新格式
                // use: 'style-loader!css-loader'
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                //webpack2.0后loader不能简写
                test: /\.(png|jpg|jpeg|gif)$/,
                use: "url-loader?limit=8192"
            },
            {
                // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
                test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                use: 'file-loader?name=./static/fonts/[name].[ext]',
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
        cssExtract,
        //DllReferencePlugin可以引用一个预先打包好的dll，但这里直接引用的是manifest文件（扩展名json）
        new webpack.DllReferencePlugin({
            context: __dirname,
            //通过manifest文件加载（文件扩展名json）
            manifest: require('./dist/vendor-manifest.json')
        }),
    ]
}