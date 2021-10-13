import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import VueSweetalert2 from 'vue-sweetalert2'
import VueCryptojs from 'vue-cryptojs'
import locale from 'element-ui/lib/locale/lang/ru-RU';
import 'element-ui/lib/theme-chalk/index.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import './assets/css/main.min.css';
import './assets/css/style-touch.css';

Vue.config.productionTip = false
Vue.use(ElementUI, {locale})
Vue.use(VueSweetalert2)
Vue.use(VueCryptojs)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
