const config = {
    // 解析器，默认是 espree，这里要检验 vue 文件的 script 的代码
    parser: 'vue-eslint-parser',

    // 解析器参数
    parserOptions: {
        // 指定解析器
        parser: 'babel-eslint',

        // 指定 ECMAScript 版本，默认是 5
        ecmaVersion: 6,

        // 设置代码类型，默认是 script
        sourceType: 'module'
    },

    // 指定环境，每个环境都有自己预定义的全局变量，可以同时指定多个环境
    env: {
        es6: true,
        browser: true,
        node: true
    },

    // 扩展，选择 eslint 的规则
    extends: [
        'airbnb-base',
        'plugin:vue/essential',
        'plugin:prettier/recommended'
    ],

    // 规则
    rules: {
        // 关闭 console 的检验
        'no-console': 'off',
        'prettier/prettier': 'error'
    }
}

module.exports = config
