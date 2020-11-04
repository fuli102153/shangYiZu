import Vue from 'vue'
import App from './App'



Vue.config.productionTip = false;

Vue.prototype.userDetail = {};
Vue.prototype.accessToken = {};//存储用户的TOKEN值
Vue.prototype.location = {};
Vue.prototype.HOST = "https://app.wan0wan.com/"
Vue.prototype.Dict = {};
Vue.prototype.Configs = {};

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
