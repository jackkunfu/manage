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
    port: 8888, // 端口号
    host: '0.0.0.0',
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    proxy: {
      '/api': {
        // target: 'http://47.99.201.236:9000',
        target: 'http://vid6av.natappfree.cc',
        pathRewrite: { '^/api': '' },
        changeOrigin: true
      }
    }
  }
}
