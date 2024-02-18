<template>
	<div class="app">
		<h1>{{msg}}，学生姓名是:{{studentName}}</h1>
		<!-- 通过父组件给子组件传递函数类型的props实现：子给父传递数据 -->
		<School :getSchoolName="getSchoolName"/>

		<!-- 通过父组件给子组件绑定一个或多个自定义事件实现：子给父传递数据（第一种写法，使用@或v-on） -->
		<!-- <Student @atguigu="getStudentName" @demo="m1"/> -->

		<!-- 通过父组件给子组件绑定一个自定义事件实现：子给父传递数据（第二种写法，使用ref） -->
		<Student ref="student" @click.native="show"/><!-- .native:表示这个事件是原生事件 -->
	</div>
</template>

<script>
/* 
1. 一种组件间通信的方式，适用于：子组件 ===> 父组件
2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件的回调在A中）。
3. 绑定自定义事件：
   1. 第一种方式，在父组件中：<Demo @atguigu="test"/>  或 <Demo v-on:atguigu="test"/>
   2. 第二种方式，在父组件中：
   3. 若想让自定义事件只能触发一次，可以使用once修饰符，或$once方法。
4. 触发自定义事件：this.$emit('atguigu',数据)		
5. 解绑自定义事件this.$off('atguigu')
6. 组件上也可以绑定原生DOM事件，需要使用native修饰符。
7. 注意：通过this.$refs.xxx.$on('atguigu',回调)绑定自定义事件时，回调要么配置在methods中，要么用箭头函数，否则this指向会出问题！

*/
	import Student from './components/Student'
	import School from './components/School'

	export default {
		name:'App',
		components:{School,Student},
		data() {
			return {
				msg:'你好啊！',
				studentName:''
			}
		},
		methods: {
			getSchoolName(name){
				console.log('App收到了学校名：',name)
			},
			getStudentName(name,...params){//ES6语法:...
				console.log('App收到了学生名：',name,params)
				this.studentName = name
			},
			m1(){
				console.log('demo事件被触发了！')
			},
			show(){
				alert(123)
			}
		},
		mounted() {
			this.$refs.student.$on('atguigu',this.getStudentName) //给子组件绑定自定义事件
			/* this.$refs.student.$on('atguigu',function(name){ //除非将函数写为箭头函数否则this指向会出错
				console.log("app收到了学生名");
				this.studentName = name
			})  */
			// this.$refs.student.$once('atguigu',this.getStudentName) //给子组件绑定自定义事件（一次性）
		},
	}
</script>

<style scoped>
	.app{
		background-color: gray;
		padding: 5px;
	}
</style>
