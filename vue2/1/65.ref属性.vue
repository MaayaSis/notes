<template>
	<div>
		<h1 v-text="msg" ref="title"></h1>
		<button ref="btn" @click="showDOM">点我输出上方的DOM元素</button>
		<School ref="sch"/>
	</div>
</template>

<script>
/* 
ref属性
1. 被用来给元素或子组件注册引用信息（id的替代者）
2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）
3. 使用方式：
   1. 打标识：<h1 ref="xxx">.....</h1> 或 <School ref="xxx"></School>
   2. 获取：this.$refs.xxx
 */
	//引入School组件
	import School from './components/School'

	export default Vue.extends({
		name:'App',
		components:{School},
		data() {
			return {
				msg:'欢迎学习Vue！'
			}
		},
		methods: {
			showDOM(){
				console.log(this.$refs.title) //获得真实DOM元素
				console.log(this.$refs.btn) //获得真实DOM元素
				console.log(this.$refs.sch) //获得School组件的实例对象（vc）
                //console.log(document.getElementById("sch")); [5]中的ref改为id,那么获得的就是School的template内容
			}
		},
	})
</script>
