const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const CopyWebpackPlugin =   require('copy-webpack-plugin');

const PATHS = {
    source: path.join(__dirname, 'src'),
    build: path.join(__dirname, 'build')
};

const common = merge([
    {
        entry: {
            'index': PATHS.source + '/js/index.js',
        },
        output: {
            path: PATHS.build,
            filename: '[name].js'
        },

        resolve: {
            modules: [path.resolve('src'), "node_modules"],
            alias: {
                'jquery-ui': 'jquery-ui/ui/widgets',
                'jquery-ui-css': 'jquery-ui/../../themes/base'
            }
        },

        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: PATHS.source + '/pug/index.pug'
            }),
            new HtmlWebpackPlugin({
                filename: 'configure.html',
                template: PATHS.source + '/pug/configure.pug'
            }),
            new HtmlWebpackPlugin({
                filename: 'geek.html',
                template: PATHS.source + '/pug/geek.pug'
            }),
            // new webpack.ProvidePlugin({
            //     $: 'jquery',
            //     jQuery: 'jquery'
            // }),
            new CopyWebpackPlugin([
                { context: PATHS.source + '/images', from: '**/*', to: 'images' },
                { context: PATHS.source + '/fonts', from: '**/*', to: 'fonts' }
            ])
        ]
    },

    pug(),
]);

module.exports = function() {
    return merge([
        common,
        extractCSS(),
        uglifyJS()
    ]);
};
