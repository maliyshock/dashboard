const webpack = require('webpack');
module.exports = function() {
    return {
        module: {
            rules: [
                {
                    test: /\.js/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                },
            ]
        },

        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compress: {
                    warnings: false,
                }
            })
        ]
    }
}

