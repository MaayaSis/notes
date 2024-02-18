<template>
	<h1>一个人的信息</h1>
	<h3>工作种类：{{job.type}}</h3>
	<h3>工作薪水：{{job.salary}}</h3>
	<button @click="changeInfo">修改人的信息</button>
</template>

<script>
	import {ref} from 'vue'
	export default {
		name: 'App',
		setup(){
			//ref函数处理对象类型数据:返回的是一个ref引用对象,通过引用对象的`.value`值获得的是一个object对象转为的proxy对象
            //ref函数处理对象类型数据也是求助了reactive函数
			let job = ref({
				type:'前端工程师',
				salary:'30K'
			})

			//方法
			function changeInfo(){
				console.log(job.value)
				job.value.type = 'UI设计师'//type之后不需要带上属性value
				job.value.salary = '60K'
			}

			//返回一个对象（常用）
			return {
				job,
				changeInfo
			}
		}
	}
</script>

