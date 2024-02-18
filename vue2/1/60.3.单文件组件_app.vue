<template>
		<School></School>
</template>

<script>
	//引入组件
	import School from './60.4.单文件组件_school.vue'
	//默认暴露方法暴露组件
	export default Vue.extends({
		name:'App',
		components:{
			School
		}
	})
</script>
