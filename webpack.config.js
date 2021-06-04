const path = require("path")
const {VueLoaderPlugin} = require('vue-loader')
const CopyPlugin = require("copy-webpack-plugin")
const isProduction = process.env.NODE_ENV === "production"

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        index: './src/js/index.js',
        // menu: './src/js/menu.js',
        script: './src/js/script.js'
    },
    output: {
        path: path.resolve(__dirname, 'crx/js/'),
        filename: '[name].js',
    },
    devtool: isProduction ? false : "source-map",
    module: {
        rules: [
            {
                test: /\.txt$/i,
                use: 'raw-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyPlugin({
            patterns: [
                {from: "./src/manifest.json", to: "./../manifest.json"},
                {from: "./src/css", to: "./../css"},
                {from: "./src/icons", to: "./../icons"},
            ],
        }),
    ]
}