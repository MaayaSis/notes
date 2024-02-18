//此文件应位于:src/store/index.js路径
/* 
	1.npm i Vuex
	2.vue.ues(Vuex)
	3.store
	4.让所有vc获取store 
*/
//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件:由于在main.js中应用插件,vue会将所有的import引入提前到首先执行的位置,所以导致应用Vuex插件会是始终位于import Store之后而报错
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {}
//准备mutations对象——修改state中的数据
const mutations = {}
//准备state对象——保存具体的数据
const state = {}

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state
})
