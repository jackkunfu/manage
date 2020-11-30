import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

import proto from './js/proto'

// import Editor from './components/TinyEditor.vue'

Vue.use(ElementUI)
Vue.use(proto)

Vue.component('Editor', () => import('./components/TinyEditor.vue'))

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
