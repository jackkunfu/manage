/* eslint-disable no-eval */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: !localStorage.MToken
  },
  mutations: {
    setStoreData (state, data) {
      let { key, value } = data
      if (Array.isArray(key)) {
        let zhizhen = ''
        while (key.length > 0) {
          zhizhen += "['" + key.shift() + "']"
        }
        eval('state' + zhizhen + '=' + JSON.stringify(value))
      } else {
        state[key] = value
      }
    }
  },
  actions: {

  }
})
