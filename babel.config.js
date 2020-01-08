const config = {
    presets: [
        [
            '@babel/preset-env',
            {
                // 不转化 ES6 模块
                modules: false,

                // 按需引入 polyfill
                useBuiltIns: 'usage',

                // 指定 corejs 版本 为 3，proposals 兼容处于提议的标准
                corejs: {
                    version: 3,
                    proposals: true
                }
            }
        ]
    ],
    plugins: [
        // 按需加载
        ['@babel/plugin-transform-runtime']
    ]
}

module.exports = config