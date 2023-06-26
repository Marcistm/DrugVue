import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/style.css';
import ElementUI from 'element-ui';
import './router/permission'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 全局注册指令
import vPermission from './directive/permission'
Vue.directive('permission',vPermission)
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.directive("init", {
  inserted: function (el) {
    el.addEventListener("change", function (e) {
      let num = e.target.value.trim() // trim() 方法用于去除字符串两端的空格
      if (!num || String(Number(num)) == 'NaN') { // 如果值为空字符串或不是有效的数字，则将值设置为 null
        num = null
      }
      // 以下代码不变
      num = String(Number(num))

      if (num == 0 || num == null) num = 0

      e.target.value = num
      e.target.dispatchEvent(new Event("input"))
    })
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
