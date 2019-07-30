import axios from 'axios'
import { Loading } from 'element-ui'
export default function (Vue) {
  Vue.prototype.goLogin = function () {
    this.$store.commit('setStoreData', { key: 'isLogin', value: true })
    this.$router.push({ path: '/' })
    localStorage.removeItem('MToken')
  }

  Vue.prototype._fetch = async function (url, data, type) {
    let res = await axios({
      method: type || 'post',
      url: '/api' + url,
      data: data || {},
      params: data || {},
      dataType: 'json',
      headers: {
        token: localStorage.MToken || ''
      }
    })
    let result = res.data
    if (result) {
      if (result.code === -1) this.goLogin()
      else return result || {}
    } else throw new Error('请求失败')
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

  Vue.prototype._messageTip = function (message = '', type) {
    this.$message({
      message, type: type === 1 ? 'success' : type === 2 ? 'warn' : 'error'
    })
  }
}
