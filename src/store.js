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
      let key = data.key
      if (Array.isArray(key)) {
        let zhizhen = ''
        while (key.length > 0) {
          zhizhen += "['" + key.shift() + "']"
        }
        eval('state' + zhizhen + '=' + JSON.stringify(data.value))
      } else {
        state[data.key] = data.value
      }
    }
  },
  actions: {

  }
})
