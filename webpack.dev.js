/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const devConf = {
    mode: 'development',
    optimization: {},
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true },
                    },
                ],
            },
        ],
    },
};

module.exports = merge(common, devConf);
