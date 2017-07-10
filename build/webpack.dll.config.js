/**
 * webpack.DllPlugin的打包文件，通过把一些第三方js库与先打包成dll（dll这个名词是webpack创造的，类似C#的dll和java的jar，就是把一部分代码打包好供其他代码引用）
 */
const path = require('path');
const webpack = require('webpack');

//打包的第三方库，这里的名称是使用（require）时的模块名
const vendors = [
    'element-ui',
    'async-validator',
    'moment',
    'echarts',
    'zrender',
];

module.exports = {
    entry: {
        vendor: vendors
    },
    output: {
        //打包后dll文件的输出目录，在当前文件目录的dist文件夹
        path: path.join(__dirname, 'dist'),
        //打包后dll文件的文件名，其中[name]是指上方
        // entry: {
        //     vendor: vendors
        // },
        //的第一个vendor，现在输出的文件名是vendor.dll.js
        //下面的[name]都是这样

        //dll文件的文件名，扩展名是js
        filename: '[name].dll.js',
        //library名称
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            //manifest文件输出位置，在当前文件的dist目录下，文件名为[name]-manifest.json
            //manifest文件是dll文件以外的另一个重要文件
            path: path.join(__dirname, 'dist', '[name]-manifest.json'),
            //library名称
            name: '[name]_library'
        })
    ]
};