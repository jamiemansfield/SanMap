const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CnameWebpackPlugin = require('cname-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractCss = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: './src/index.js',
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        extractCss,
        new HtmlWebpackPlugin({
            title: 'San Andreas Interactive Map'
        }),
        new CnameWebpackPlugin({
            domain: 'sanmap.jamiemansfield.me',
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: extractCss.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
