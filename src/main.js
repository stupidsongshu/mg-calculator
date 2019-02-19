// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import polyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './config/rem'
import MintUI, { Picker } from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false

Vue.use(MintUI)
Vue.component(Picker.name, Picker)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
Vue.prototype.modifiedLocalPopState = function () {
  this.$store.commit('saveLocalPopState', true)
}
