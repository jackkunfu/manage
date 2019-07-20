module.exports = {
  assetsDir: 'static',
  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      'axios': 'axios',
      'element-ui': 'ELEMENT'
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/reset.scss";`
      }
    }
  },
  devServer: {
    port: 7777, // 端口号
    host: '0.0.0.0',
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    proxy: {
      '/dsp': {
        target: 'http://10.10.0.244:10080',
        // pathRewrite: { '^/dsp': ''},
        changeOrigin: true
      },
      '/boss': {
        target: 'http://10.10.0.244:10090',
        // pathRewrite: { '^/boss': ''},
        changeOrigin: true
      }
    }
  }
}
