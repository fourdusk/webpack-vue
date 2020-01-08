const webpack = require('webpack')
const path = require('path')
const WebpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CommonWebpackConfig = require('./webpack.common.config')
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')

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
    mode: 'development',

    // 如何生成代码映射关系，开发环境建议设置为 eval-source-map
    devtool: 'eval-source-map',

    // 配置开发服务器
    devServer: {
        quiet: true,
        inline: true,
        compress: true,
        hot: true,
        progress: true,
        clientLogLevel: 'warning',
        contentBase: path.resolve(__dirname, '../dist'),
        historyApiFallback: true
    },

    // 插件
    plugins: [
        // 热重载
        new webpack.HotModuleReplacementPlugin(),

        // 创建 html 文件，并把 webpack 打包后的静态文件插入到这个 html 文件中
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../public/index.html')
        }),

        // 错误友好提示
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [
                    'your application is running.'
                ]
            }
        })
    ]
})

// smp 分析打包所用的时间
module.exports = smp.wrap(config)