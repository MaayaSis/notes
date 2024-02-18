//引入其它文件,此处省略
//引入store
import store from './store'

//创建vm
new Vue({
	el:'#app',
	render: h => h(App),
	store
})