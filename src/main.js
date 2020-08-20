import Vue from 'vue'
import { firebase } from './firebaseinit'
import App from './App.vue'
import i18n from './plugins/i18n'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import { router } from './router/router'
import store from './store/store'

Vue.use(VueRouter)

Vue.prototype.$firebase = firebase;

Vue.config.productionTip = false

new Vue({
  vuetify,
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')