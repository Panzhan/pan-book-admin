// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// eslint-disable-next-line import/first
import ElementUI from 'element-ui'
// eslint-disable-next-line import/first
import 'element-ui/lib/theme-chalk/index.css'
import store from './store/index'
import router from './router'
// eslint-disable-next-line import/first
import VueClipboard from 'vue-clipboard2'

// eslint-disable-next-line import/first
// import echarts from 'echarts';

// Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueClipboard)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
})
