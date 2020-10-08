import Vue from 'vue'
import App from './App'
import Vant from 'vant';
import BaiduMap from 'vue-baidu-map'

Vue.use(Vant);
Vue.use(BaiduMap, {
    /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
    ak: 'aHuQcqxYQDEaDDeGmL4SviEf6DAPjSTO'
  })

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
