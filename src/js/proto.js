import axios from 'axios'
import { Loading } from 'element-ui'
export default function (Vue) {
  Vue.prototype.goLogin = function () {
    this.$store.commit('setStoreData', { key: 'isLogin', value: true })
  }

  Vue.prototype._fetch = async function (url, data, type) {
    let res = await axios({
      method: type || 'post',
      url,
      data: data || {},
      headers: {
        token: 123456789
      }
    })
    if (res) return res.data || {}
    else throw new Error('请求失败')
  }

  Vue.prototype.$loading = function (url, data, type) {
    let loading = Loading.serveice()
    return loading
  }

  Vue.prototype._goUrl = function (path, data = {}) {
    this.$router.push({
      path: path, query: data.query || {}, params: data.params
    })
  }

  Vue.prototype._messageFn = function (message = '', type = 1) {
    this.$message({
      message, type: type === 1 ? 'error' : type === 2 ? 'success' : 'warn'
    })
  }
}
