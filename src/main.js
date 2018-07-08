import Vue from 'vue'
import Vuex from 'vuex'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import App from './App'
import router from './router'
import store from './store'
import { colors } from './config'

Vue.use(Vuex)
Vue.use(VueMaterial)

Vue.config.productionTip = false
Vue.material.registerTheme('default', {
  primary: {
    color: colors.primary.color,
    hue: colors.primary.hue,
  },
  accent: {
    color: colors.accent.color,
    hue: colors.accent.hue,
  },
  warn: 'red',
  background: {
    color: colors.background.color,
    hue: colors.background.hue,
  },
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})
