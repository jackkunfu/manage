import axios from 'axios'
import { Loading } from 'element-ui'
export default function (Vue) {
  Vue.prototype.goLogin = function () {
    this.$store.commit('setStoreData', { key: 'isLogin', value: true })
    this.$router.push({ path: '/' })
    localStorage.removeItem('MToken')
    localStorage.removeItem('EVENGFRONTUSER')
  }

  Vue.prototype._fetch = async function (url, data, type) {
    let res = await axios({
      method: type || 'post',
      url: '/api' + url,
      // data: data || {},
      params: data || {},
      dataType: 'json',
      headers: {
        token: localStorage.MToken || ''
      }
    })
    let result = res.data
    if (result) {
      if (result.code === -1) {
        if (result.msg) {
          if (result.msg.indexOf('token') > -1) this.goLogin()
          else this._messageTip(result.msg)
        } else this._messageTip('请求失败')
      } else return result || {}
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

  Vue.prototype._confirm = function (str, fn) {
    return this.$confirm(str, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(_ => {
      return _
    })
  }
}
