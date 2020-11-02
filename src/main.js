import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './components/common/toast'
import FastClick from 'fastclick'

Vue.config.productionTip = false

//使用一个空的vue实例作为一个事件中心（事件总线）
Vue.prototype.$bus = new Vue()
Vue.use(toast)

//解决移动端300ms的延迟
FastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


