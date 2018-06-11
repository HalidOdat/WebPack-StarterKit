const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const HWP = HtmlWebpackPlugin;

const SRC_PATH = path.resolve(__dirname, 'src/js/app.js');
const DIST_PATH = path.resolve(__dirname, 'dist');

const config = {
    entry: {
        index: path.resolve(__dirname, 'src/js/app.js'),
        users: path.resolve(__dirname, 'src/js/users.js')
    },
    output: {
        path: DIST_PATH,
        filename: '[name].bundle.js',
    },
    devtool: "eval-source-map",
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [{
                test: /\.css$/,
            use: [
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader", options: { sourceMap: true } },
                    { loader: "postcss-loader", options: { sourceMap: true } },
            ]},
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader", options: {sourceMap: true}},
                    {loader: "postcss-loader", options: {sourceMap: true}},
                    {loader: "sass-loader", options: {sourceMap: true}}
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpeg|png)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath: 'img/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css",
            chunkFilename: "[id].css"
        }),
        new CleanWebpackPlugin(['dist']),

        // Html Web Pages:
        new HWP({filename:'index.html',chunks:['app'],template:'src/index.html'}),
        new HWP({filename:'users.html',chunks:['users'],template:'src/users.html'})
    ],
    watch: true
};

module.exports = config;
