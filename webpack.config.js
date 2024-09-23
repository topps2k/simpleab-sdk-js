const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const package = require('./package.json');

module.exports = [
    {
        entry: ['isomorphic-fetch', './index.js'],
        output: {
            filename: `simpleab-sdk.js`,
            path: path.resolve(__dirname, 'dist'),
            library: 'SimpleABSDK',
            libraryTarget: 'umd',
            globalObject: 'this'
        },
        mode: 'production',
    },
    {
        entry: ['isomorphic-fetch', './index.js'],
        output: {
            filename: `simpleab-sdk.min.js`,
            path: path.resolve(__dirname, 'dist'),
            library: 'SimpleABSDK',
            libraryTarget: 'umd',
            globalObject: 'this'
        },
        mode: 'production',
        optimization: {
            minimizer: [new TerserPlugin({
                extractComments: false,
            })],
        },
    }
];