import axios from 'axios'
import { Loading } from 'element-ui'
export default function (Vue) {
  Vue.prototype.goLogin = function () {
    this.$store.commit('setStoreData', { key: 'isLogin', value: true })
  }

  Vue.prototype.fetch = async function (url, data, type) {
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
}
