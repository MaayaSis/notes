<template>
	<h1>一个人的信息</h1>
	<h2>姓名：{{name}}</h2>
	<h2>年龄：{{age}}</h2>
	<h2>性别：{{sex}}</h2>
	<h2>a的值是：{{a}}</h2>
	<button @click="sayHello">说话(Vue3所配置的——sayHello)</button>
	<br>
	<button @click="sayWelcome">说话(Vue2所配置的——sayWelcome)</button>
	<br>
	<button @click="test1">测试一下在Vue2的配置中去读取Vue3中的数据、方法</button>
	<br>
	<button @click="test2">测试一下在Vue3的setup配置中去读取Vue2中的数据、方法</button>
</template>
<script>
	// import {h} from 'vue' //引入渲染函数
    //以下为vue2和vue3混合配置
    /* 
    vue2中可以正常读取vue3的方法和属性
    vue3不能正常都去vue2的方法属性
    当vue2和vue3重名时以vue3的setup的优先
    setup(){}不能是一个async函数
     */
	export default {
		name: 'App',
		data() {
			return {
				sex:'男',
				a:100
			}
		},
		methods: {
			sayWelcome(){
				alert('欢迎来到尚硅谷学习')
			},
			test1(){
				console.log(this.sex)
				console.log(this.name)
				console.log(this.age)
				console.log(this.sayHello)
			}
		},
		//此处只是测试一下setup，暂时不考虑响应式的问题。
		async setup(){
			//数据
			let name = '张三'
			let age = 18
			let a = 200
			//方法
			function sayHello(){
				alert(`我叫${name}，我${age}岁了，你好啊！`)
			}
			function test2(){
				console.log(name)
				console.log(age)
				console.log(sayHello)
				console.log(this.sex)
				console.log(this.sayWelcome)
			}
			//返回一个对象（常用）
			return {
				name,
				age,
				sayHello,
				test2,
				a
			}
			//返回一个函数:渲染函数,渲染函数会将template中的内容完全替换
			//return ()=> h('h1','尚硅谷') //完整写法:`return ()=>{return h("h1","尚硅谷")}`
		}
	}
</script>

