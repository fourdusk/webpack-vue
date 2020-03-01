const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const isDevelopment = process.env.NODE_ENV === 'development'

const config = {
    // 根路径上下文
    context: path.resolve(__dirname, '..'),

    // 入口文件
    entry: {
        app: './src/main.js'
    },

    // 输出
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].[hash].js',
        publicPath: '/',
        chunkFilename: 'js/[name].[chunkhash].js'
    },

    // 模块
    module: {
        rules: [
            // 处理 css, sass 和 scss 文件
            {
                test: /\.(css|s[ac]ss)$/,
                use: [
                    // 开发环境使用 style-loader，生产环境用 MiniCssExtractPlugin.loader，这两个 loader 不能共存
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
                include: [path.resolve(__dirname, '../src')]
            },
            // 处理图片
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            fallback: 'file-loader',
                            name: 'img/[hash].[ext]'
                        }
                    }
                ]
            },
            // 把 es6 语法转成 es5 语法
            {
                test: /\.js$/,
                use: ['babel-loader'],
                include: [path.resolve(__dirname, '../src')]
            },
            // 处理 vue 文件
            {
                test: /\.vue$/,
                use: ['vue-loader'],
                include: [path.resolve(__dirname, '../src')]
            }
        ]
    },

    // 解析
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),

            /**
             * 解析 vue
             * 因为 vue 有不同的构建版本，这里是以 es6 模块引入，所以要引入对应的 esm 文件
             * import Vue from 'vue' 转换成 import Vue from 'vue/dist/vue.esm.js'
             */
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: [
            '.mjs',
            '.js',
            '.jsx',
            '.vue',
            '.json',
            '.wasm'
        ]
    },

    // 插件
    plugins: [
        // 配合 vue-loader 使用
        new VueLoaderPlugin(),

        // 清除构建文件
        new CleanWebpackPlugin(),

        // 分析打包体积
        // new BundleAnalyzerPlugin(),

        // 打包进度条
        new ProgressBarWebpackPlugin()
    ]
}

module.exports = config