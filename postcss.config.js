const config = {
    plugins: {
        // 自动添加浏览器前缀
        'autoprefixer': {},

        // 将 px 转成 rem，如果不需要转换，可以在样式后面加 /*no*/，比如 1px 问题
        'postcss-px2rem': {
            // 设计稿一般是 750px 宽，所以这里设为75
            remUnit: 75,
            baseDpr: 1
        },

        // 删除注释，空白，重复规则，过时的浏览器前缀来优化压缩 css 代码
        'cssnano': {},
    }
}

module.exports = config