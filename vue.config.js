const { defineConfig } = require('@vue/cli-service')
const packageName = require('./package.json').name
const { getEnvUrl } = require('arkfun/lib/main.js')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath:
    process.env.NODE_ENV == 'production'
      ? getEnvUrl('other', 'login-config', false) // 函数入参  1.环境目前app,wx  2.上下文(项目名)  3.是否进行鉴权
      : './',
  filenameHashing: true,
  assetsDir: 'selfstatic',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/www': {
        target: 'http://192.168.2.16:8080',
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
    },
  },
})
