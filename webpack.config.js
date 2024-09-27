const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const package = require('./package.json');

const commonConfig = {
    entry: ['./index.js'],
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        node: 'current',
                                    },
                                    modules: 'commonjs', // Ensure babel compiles to CommonJS modules
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },
};

const nodeConfig = {
    ...commonConfig,
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'simpleab-sdk.node.js',
        libraryTarget: 'commonjs2',
        globalObject: 'this'
    },
    externals: {
        'cross-fetch': 'commonjs2 cross-fetch', // Exclude cross-fetch from the bundle
    },
    optimization: {
        minimize: false, // Disable minification to test
    }
};

const browserConfig = {
    ...commonConfig,
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'simpleab-sdk.browser.js',
        library: 'SimpleABSDK',
        libraryTarget: 'umd',
        globalObject: 'typeof self !== "undefined" ? self : this'
    }
};

const es5Config = {
    ...commonConfig,
    target: ['web', 'es5'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'simpleab-sdk.es5.js',
        library: 'SimpleABSDK',
        libraryTarget: 'umd',
        globalObject: 'typeof self !== "undefined" ? self : this'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    browsers: ['ie >= 11'],
                                    node: '6'
                                }
                            }]
                        ]
                    }
                }
            }
        ]
    }
};

module.exports = [
    nodeConfig,
    browserConfig,
    es5Config,
    {
        ...browserConfig,
        output: {
            ...browserConfig.output,
            filename: 'simpleab-sdk.browser.min.js',
        },
        optimization: {
            minimizer: [new TerserPlugin({
                extractComments: false,
            })],
        },
    },
    {
        ...es5Config,
        output: {
            ...es5Config.output,
            filename: 'simpleab-sdk.es5.min.js',
        },
        optimization: {
            minimizer: [new TerserPlugin({
                extractComments: false,
            })],
        },
    }
];