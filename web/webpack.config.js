var path = require('path');

var prod = process.argv.indexOf('-p') != -1;

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var prodPlugins = prod ? [
    new CompressionPlugin({
        test: /\.(js|css|html)$/
    })
] : [];

var tsLoaderOptions = prod ? { } : {
    useCache: true,
    useTranspileModule: true,
    transpileOnly: true,
    useBabel: true,
    compilerOptions: {
        "target": "es6",
        "module": "es6"
    }
};

module.exports = {
    entry: ['babel-polyfill', './index.tsx'],
    output: {
        filename: '[name]-app.[hash].bundle.js',
        publicPath: '/',
        path: path.resolve('build/bundled')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        unsafeCache: true
    },
    plugins: [
        new webpack.NamedModulesPlugin(),

        new ExtractTextPlugin({
            filename: 'style.[hash].bundle.css',
            disable: !prod
        }),

        new HtmlWebpackPlugin({
            template: 'www/index.html'
        })
    ].concat(prodPlugins),

    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                use: [
                    { loader: 'awesome-typescript-loader', options: tsLoaderOptions }
                ],
                exclude: /node_modules/,
            },
            {
                test    : /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test    : /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test    : /\.(png|jpg|gif)$/,
                loader  : 'url-loader?limit=8192'
            },
            {
                test    : /\.(ttf|otf|eot|svg|woff2?)(\?[a-z0-9]+)?$/,
                loader  : 'file-loader'
            }
        ]
    },
    devtool: prod ? 'source-map' : 'eval-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: 'build',

        port: 3000,

        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                secure: false
            }
        }
    }
};