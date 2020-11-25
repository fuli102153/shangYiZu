import Vue from 'vue'
import App from './App'



Vue.config.productionTip = false;

Vue.prototype.userDetail = {};
Vue.prototype.accessToken = {};//存储用户的TOKEN值
Vue.prototype.location = {};//当前坐标
Vue.prototype.$Localtion = {
	city:""
};//当前城市
Vue.prototype.address = {};//当前地址
Vue.prototype.HOST = "https://app.wan0wan.com/"
Vue.prototype.Dict = {};
Vue.prototype.Configs = {};
Vue.prototype.global = {
	"error":"服务器出现问题！"
};

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
