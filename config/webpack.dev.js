const {
    mergeWithCustomize,
    customizeArray,
    customizeObject,
} = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common.js');

const devConfig = {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        allowedHosts: [
            process.env.ALLOWED_HOST || 'localhost',
        ],
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: [path.resolve(__dirname, '../src/styles/')],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[name]__[local]',
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
};

module.exports = mergeWithCustomize({
    customizeArray: customizeArray({
        'module.rules': 'append',
    }),
    customizeObject: customizeObject({
        'devServer': 'append',
        'module': 'append',
    }),
})(commonConfig, devConfig);
