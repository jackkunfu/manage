import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";

import proto from "./js/proto";

Vue.use(ElementUI, { size: "small" });
Vue.use(proto);

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
