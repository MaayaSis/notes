<template>
	<h1>一个人的信息</h1>
	<h2>姓名：{{name}}</h2><!-- vue3检测到name是一个引用对象后自动将name转化为name.value -->
	<h2>年龄：{{age}}</h2>
	<button @click="changeInfo">修改人的信息</button>
</template>

<script>
	import {ref} from 'vue'
	export default {
		name: 'App',
		setup(){
			//通过修改ref实例对象的value值才能实现基本数据类型的响应式
			//数据:通过ref添加的属性本质上都是一个引用对象(引用实现构造函数的实例对象) ref:reference implement
			let name = ref('张三')
			let age = ref(18)

			//方法
			function changeInfo(){
				name.value = '李四'
				age.value = 48
				console.log(name,age)
			}
			//返回一个对象（常用）
			return {
				name,
				age,
				changeInfo
			}
		}
	}
</script>

