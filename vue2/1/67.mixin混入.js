//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
import {hunhe,hunhe2} from './mixin'
//关闭Vue的生产提示
Vue.config.productionTip = false

/* 
mixin混入功能：可以把多个组件共用的配置提取成一个混入对象
1.定义混入：
2.使用混入：全局混入,局部混入
 */

Vue.mixin(hunhe)
Vue.mixin(hunhe2)


//创建vm
new Vue({
	el:'#app',
	render: h => h(App)
})