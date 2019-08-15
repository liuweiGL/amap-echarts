import Vue from 'vue'
import VueAMap from 'vue-amap'
import App from './App.vue'

Vue.use(VueAMap)

VueAMap.initAMapApiLoader({
  key: '2893975e83e14a62e8d1dd452ffcd4fe',
  plugin: [],
  v: '1.4.5'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
