const webpack = require('webpack')
const path = require('path')
const WebpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const CommonWebpackConfig = require('./webpack.common.config')

const smp = new SpeedMeasureWebpackPlugin()

const config = WebpackMerge(CommonWebpackConfig, {
    /**
     * 模式，默认是 production
     * development: 开启
     *              NamedChunksPlugin
     *              NamedModulesPlugin
     * production: 开启 
     *             FlagDependcyUsagePlugin
     *             ModuleConcatenationPlugin
     *             NoEmitOnErrorsPlugin
     *             OccurrenceOrderPlugin
     *             SideEffectsFlagPlugin
     *             UglifyJsPlugin
     */
    mode: 'production',

    // 如何生成代码映射关系，生产环境建议设置为 source-map
    devtool: 'source-map',

    // 优化
    optimization: {
        // 运行时
        runtimeChunk: {
            name: 'mainfest'
        },
        // 代码压缩
        minimizer: [
            // js 压缩
            // new UglifyJsPlugin({
            //     cache: true,
            //     parallel: true,
            //     sourceMap: true
            // }),

            // js 压缩
            new TerserWebpackPlugin({
                parallel: true
            }),

            // css 压缩
            new OptimizeCssAssetsWebpackPlugin()
        ],
        // 代码分割
        splitChunks: {
            cacheGroups: {
                // 抽离 node_modules 下的库
                vendor: {
                    name: 'chunk-vendor',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: false,
                    test: /[\\/]node_modules[\\/]/
                },
                // 
                common: {
                    name: 'chunk-common',
                    chunks: 'initial',
                    minChunks: 2,
                    priority: -10,
                    reuseExistingChunk: true
                }
            }
        }
    },

    // 插件
    plugins: [
        // 抽离 style 样式为 css 文件
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[contenthash].css'
        }),

        // 创建 html 文件，并把 webpack 打包后的静态文件插入到这个 html 文件中
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../public/index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        }),

        // 缓存
        new webpack.HashedModuleIdsPlugin()
    ]
})

// smp 分析打包总耗时，loader 和 plugin 的耗时
module.exports = smp.wrap(config)