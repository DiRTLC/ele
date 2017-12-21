import Vue from 'vue'
// import VueResource from 'vue-resource'
import app from './App.vue'
import router from './router'
import store from './store'

import './common/stylus/fonts.styl'
import './mock/mockServer'

// Vue.use(VueResource)

new Vue({
  el: '#app',
  render: h => h(app),
  router,
  store
})
