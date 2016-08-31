var webpack = require('webpack');

module.exports = {
    entry: {
        'jquery': ['jquery'],
        'angular': ['angular', 'angular-ui-router', 'angular-translate']
    },
    output: {
        filename: '[name].bundle.js',
        path: 'src/target',
        library: '[name]_lib'
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'src/target/[name]-manifest.json',
            name: '[name]_lib',
            context: __dirname,
        })
    ]
};