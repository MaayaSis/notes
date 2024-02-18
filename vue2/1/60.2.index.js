import App from  './60.3.单文件组件_app.vue'//因为浏览器无法直接支持ES6语法,所以此行如在非脚手架环境下使用将会报错

new Vue({
	el:'#root',
	template:`<App></App>`,
	components:{App},
})