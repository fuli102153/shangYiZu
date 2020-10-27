import Vue from 'vue'
import App from './App'



Vue.config.productionTip = false;

Vue.prototype.userInfo = {};//存储用户的信息
Vue.prototype.accessToken = {};//存储用户的TOKEN值
Vue.prototype.HOST = "https://app.wan0wan.com/"

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
