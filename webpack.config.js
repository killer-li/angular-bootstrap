var webpack = require('webpack');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

module.exports = {
    //页面入口文件配置
    entry: {
        index: './src/index.js'
    },
    //入口文件输出配置
    output: {
        path: 'src/target/',
        filename: 'index.bundle.js'
    },
    module: {
        //加载器配置
        loaders: [{
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(png|jpg|gif|woff|woff2|eot|ttf)$/,
            loader: 'url-loader?limit=102040'
        }, {
            test: /\.html$/,
            loader: 'html',
        }],
        htmlLoader: {
            ignoreCustomFragments: [/\{\{.*?}}/]
        }
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./src/target/jquery-manifest.json'),
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./src/target/angular-manifest.json')
        })
        // new webpack.HotModuleReplacementPlugin(),
        /* 处理angular的依赖注入 */
        // new ngAnnotatePlugin({
        //     add: true
        // }),
        /* 处理代码压缩 */
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     output: {
        //         comments: false
        //     }
        // })
    ]
};