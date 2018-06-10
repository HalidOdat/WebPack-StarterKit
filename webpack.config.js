const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const SRC_PATH = path.resolve(__dirname, './src');
const DIST_PATH = path.resolve(__dirname, './dist/assets');

const config = {
    entry: {
        main: path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: DIST_PATH,
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // fallback to style-loader in development
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            //chunkFilename: "[id].css"
        })
    ],
    watch: true,
    mode: 'development'
};

module.exports = config;
