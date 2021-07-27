/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
    entry: path.resolve(__dirname, 'src/scripts/index.js'),
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './', // untuk debugging
        // publicPath: '/resto-vite-demo/', // deploy to github pages
    },
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 50000,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
                use: [
                    {
                        loader: 'file-loader?name=[name].[ext]',
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'src/templates/index.html'),
            filename: 'index.html',
            scriptLoading: 'defer',
            inject: 'body',
            favicon: path.resolve(__dirname, 'src/public/favicon.ico'),
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/public/'),
                    to: path.resolve(__dirname, 'dist/'),
                    globOptions: {
                        ignore: ['**/raw-images/**', '**/raw-icon-images/**'],
                    },
                },
            ],
        }),
        new WorkboxPlugin.InjectManifest({
            swSrc: path.resolve(__dirname, './sw-worker.js'),
        }),
        new WebpackPwaManifest({
            name: 'Restoran Vite',
            short_name: 'Resto Vite',
            description:
                'Daftar restoran di sekitar anda yang siap pesan antar',
            background_color: '#ffffff',
            theme_color: '#f55c47',
            start_url: './index.html',
            display: 'standalone',
            icons: [
                {
                    src: path.resolve(
                        'src/public/raw-icon-images/vite-pwa.png',
                    ),
                    sizes: [36, 48, 72, 96, 128, 144, 192, 256, 384, 512],
                    destination: path.join('icons', 'android'),
                },
                {
                    src: path.resolve(
                        'src/public/raw-icon-images/vite-pwa.png',
                    ),
                    size: '1024x1024',
                    destination: path.join('icons'),
                },
                {
                    src: path.resolve(
                        'src/public/raw-icon-images/vite-pwa.png',
                    ),
                    size: '1024x1024',
                    purpose: 'maskable',
                    destination: path.join('icons'),
                },
                {
                    src: path.resolve(
                        'src/public/raw-icon-images/vite-pwa.png',
                    ),
                    sizes: [120, 152, 167, 180, 1024],
                    destination: path.join('icons', 'ios'),
                    ios: true,
                },
                {
                    src: path.resolve(
                        'src/public/raw-icon-images/vite-pwa.png',
                    ),
                    size: 1024,
                    destination: path.join('icons', 'ios'),
                    ios: 'startup',
                },
            ],
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 4200,
        hot: false,
        liveReload: true,
        publicPath: '/',
        watchContentBase: true,
    },
};
