const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/',
    },
    devServer: {
        contentBase: '../dist',
    },
    module: {
        rules: [
            {
                test: /\.(eot|gif|otf|jpg|png|ttf|woff|woff2)(\?[a-zA-Z0-9.=]+)?$/,
                use: ['file-loader'],
            },
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, '../src/styles/')],
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    resolve: {
        alias: {
            commons: path.resolve(__dirname, '../src/commons/'),
            components: path.resolve(__dirname, '../src/components/'),
            constants: path.resolve(__dirname, '../src/constants/'),
            styles: path.resolve(__dirname, '../src/styles/'),
        },
        extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
        ],
    },
};
