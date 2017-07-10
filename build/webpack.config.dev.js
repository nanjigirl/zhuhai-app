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
        //webpack2.0后loaders不再使用，换成rules，rules里面的子节点变化也较大，要注意
        // loaders: [
        //     {test: /\.css$/, loader: 'style-loader!css-loader'},
        //     {test: /\.html$/, loader: 'html-loader'},
        //     {
        //         test: /\.js$/,
        //         exclude: /node_modules/,
        //         loader: 'babel-loader',
        //     },
        //     {test: /\.(png|jpg|jpeg|gif)$/, loader: "url?limit=8192"},
        //     {
        //         // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
        //         test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
        //         loader: 'file?name=./static/fonts/[name].[ext]',
        //     }
        // ]
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
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        //DllReferencePlugin可以引用一个预先打包好的dll，但这里直接引用的是manifest文件（扩展名json）
        new webpack.DllReferencePlugin({
            context: __dirname,
            //通过manifest文件加载（文件扩展名json）
            manifest: require('./dist/vendor-manifest.json')
        }),
    ],
    devtool: "source-map"
}