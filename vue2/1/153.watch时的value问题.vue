<template>
	<h2>当前求和为：{{sum}}</h2>
	<button @click="sum++">点我+1</button>
	<hr>
	<h2>当前的信息为：{{msg}}</h2>
	<button @click="msg+='！'">修改信息</button>
	<hr>
	<h2>姓名：{{person.name}}</h2>
	<h2>年龄：{{person.age}}</h2>
	<h2>薪资：{{person.job.j1.salary}}K</h2>
	<button @click="person.name+='~'">修改姓名</button>
	<button @click="person.age++">增长年龄</button>
	<button @click="person.job.j1.salary++">涨薪</button>
</template>

<script>
	import {ref,reactive,watch} from 'vue'
	export default {
		name: 'Demo',
		setup(){
			//数据
			let sum = ref(0)
			let msg = ref('你好啊')
			let person = ref({
				name:'张三',
				age:18,
				job:{
					j1:{
						salary:20
					}
				}
			})
			watch(sum,(newValue,oldValue)=>{//监视ref生成的基本数据类型不需要添加`.value`属性,是由于这个`ref.value`是一个数字
				console.log('sum的值变化了',newValue,oldValue)
			})

            //监视ref生成的基本数据类型需要添加`.value`属性,是由于这个`ref.value`是一个对象
			watch(person,(newValue,oldValue)=>{//如果不开启深度监视,那么除非这个对象的地址值被改变,否则这个对象中的属性被改变的化是不会被监视到
				console.log('person的值变化了',newValue,oldValue)
			},{deep:true})


			//返回一个对象（常用）
			return {
				sum,
				msg,
				person
			}
		}
	}
</script>

