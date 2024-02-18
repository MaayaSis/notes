//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
//引入插件
import plugins from './plugins'
//关闭Vue的生产提示
Vue.config.productionTip = false

/* 
1. 功能：用于增强Vue
2. 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。
3. 定义插件
4. 使用插件：Vue.use()
 */

//应用（使用）插件:插件被应用之后,install里面的代码就会按顺序执行
Vue.use(plugins,1,2,3)
//创建vm
new Vue({
	el:'#app',
	render: h => h(App)
})