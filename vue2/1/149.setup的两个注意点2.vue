<template>
	<h1>一个人的信息</h1>
	<h2>姓名：{{person.name}}</h2>
	<h2>年龄：{{person.age}}</h2>
	<button @click="test">测试触发一下Demo组件的Hello事件</button>
</template>

<script>
	import {reactive} from 'vue'
	export default {
		name: 'Demo',
		props:['msg','school'],//需要声明已经接收到props才能在setup中使用props参数
		emits:['hello'],//vue3中需要声明已经接收到自定义事件,否则会warning
		setup(props,context){//context:包含attr,emit,slot;如果存在props,但是不使用它就会warning,并且props已经被proxy代理了,是响应式数据
			// console.log('---setup---',props)
			// console.log('---setup---',context)
			// console.log('---setup---',context.attrs) //相当与Vue2中的$attrs
			// console.log('---setup---',context.emit) //触发自定义事件的。
			console.log('---setup---',context.slots) //插槽
			//数据
			let person = reactive({
				name:'张三',
				age:18
			})
			//方法
			function test(){
				context.emit('hello',666)//调用自定义事件
			}
			//返回一个对象（常用）
			return {
				person,
				test
			}
		}
	}
</script>

