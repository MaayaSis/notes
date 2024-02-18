<template>
	<div>
		<h1 class="title">你好啊</h1>
		<School/>
		<Student/>
	</div>
</template>

<script>
/* 
脚手架在扫描vue文件时d额工作流程:1.先引入,2.读取vue.extends中的配置项,3.最后再解析模板

1. 作用：让样式在局部生效，防止冲突。
2. 写法：<style scoped>
3. 如果在App中的style使用scoped样式,那么只有App中的标签才能使用这些样式,而其它的例如School,和Student中的标签即使符合需求也不会被应用
 */
	import Student from './components/Student'
	import School from './components/School'

	export default {
		name:'App',
		components:{School,Student}
	}
</script>

<style lang="css" scoped>/* style中使用lang样式可以指定style的语法为less或者其它,如果为less的话需要安装less-loader插件 */
	.title{
		color: red;
	}
</style>
