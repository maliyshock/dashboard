const path =                require('path');
const webpack =             require('webpack');
const autoprefixer =        require('autoprefixer');

const HtmlWebpackplugin =   require('html-webpack-plugin');
const ExtractTextPlugin =   require("extract-text-webpack-plugin");
const CopyWebpackPlugin =   require('copy-webpack-plugin');


const PATHS = {
    source:  __dirname + '/src',
    dev:  __dirname + '/dev',
}

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    entry: [
        'babel-polyfill',
        PATHS.source + '/js/index.js',
    ],

    devServer: {
     contentBase:  PATHS.dev,
    },

    resolve: {
        modules: [path.resolve('src'), "node_modules"],
        alias: {
            'jquery-ui': 'jquery-ui/ui/widgets',
            'jquery-ui-css': 'jquery-ui/../../themes/base'
        }
    },

    output: {
        path:  PATHS.dev,
        publicPath:   PATHS.dev,
        filename: '[name].js',
    },

    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },

    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new HtmlWebpackplugin({
            filename: 'index.html',
            template: PATHS.source + '/pug/index.pug'
        }),
        new ExtractTextPlugin("app.css"),
        new webpack.ProvidePlugin({ // inject ES5 modules as global vars
            $: 'jquery',
            jQuery: 'jquery',
            "window.jQuery": "jquery"
        }),
        new CopyWebpackPlugin([
            { context: PATHS.source + '/images', from: '**/*', to: 'images' },
            { context: PATHS.source + '/fonts', from: '**/*', to: 'fonts' }
        ])
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader', 'eslint-loader']
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: { importLoaders: 1, url: false}
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers:['IE 10', 'last 2 version'],
                                        grid: true
                                    })
                                ],
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                use:  ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: {importLoaders: 1, url: false}
                        }
                    ]
                })
            },
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'pug-loader',
                        options: {
                            pretty: true
                        }
                    }
                ],
            }
        ]
    }
}
