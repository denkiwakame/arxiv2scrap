const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [{
    entry: {
        popup: path.join(__dirname, "src", "js", "popup.js"),
        options: path.join(__dirname, 'src', 'js', 'options.js'),
        scss: path.join(__dirname, "src", "scss", "custom.scss"),
        vendor: ['jquery', 'lodash']
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    optimization: {
      splitChunks: {
        name: 'vendor',
        chunks: 'initial',
      }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            chunks: ['popup', 'vendor'],
            template: path.join(__dirname, "src", "html", "popup.html")
        }),
        new HtmlWebpackPlugin({
            filename: 'options.html',
            chunks: ['options', 'vendor'],
            template: path.join(__dirname, 'src', 'html', 'options.html')
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, 'manifest.json'),
                to: path.join(__dirname, 'dist')
            },
            {
                from: 'images/icon128.png' ,
                to: path.join(__dirname, 'dist')
            }
        ])
    ],
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                {
                    loader: 'file-loader',
                    options: { name: 'bundle.css' }
                },
                {
                    loader: 'sass-loader',
                    options: { includePaths: ['./node_modules'] }
                },
            ]
        },
        {
            test: /\.html$/,
            use: [
                {
                    loader: 'html-loader',
                    options: {includePaths: ['./src/html']}
                } ]
        }]
    }
}];
