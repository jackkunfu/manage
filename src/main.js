import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

import proto from './js/proto'

// import VueQuillEditor from 'vue-quill-editor'
 
// // require styles
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
 
// Vue.use(VueQuillEditor, /* { default global options } */)

Vue.use(ElementUI)
Vue.use(proto)

Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
