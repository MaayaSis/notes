import { createApp } from 'vue' //此处引入的vue是残缺版的vue,完整的应为vue/vue.js下的文件
import App from './App.vue'

createApp(App).mount('#app')

//vue-cli3
new vue({
    el:"#root",

    //箭头函数的简写形式:render函数中可以传入参数,这个参数是一个函数,这个函数中传入标签和标签的内容,即可在页面上渲染出来
    render:createElement => createElement("h1","你好")
})
//vue-cli2
new vue({
    el:"#root",
    render:p => p(App)
})

//vue = vue核心 + vue模板解析器
//不使用完整版的vue是因为在项目开发时需要模板解析器的功能解析模板,但在开发完成后已经将vue转换成了js文件,此处为举例不是非常正确
//所以用精简版的vue可以节约最终打包的体积
//但这只针对vm中的template,其余vc中的template标签则不会
/* 
关于不同版本的Vue：
	1.vue.js与vue.runtime.xxx.js的区别：
		(1).vue.js是完整版的Vue，包含：核心功能+模板解析器。
		(2).vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。

	2.因为vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用
	render函数接收到的createElement函数去指定具体内容。 
*/