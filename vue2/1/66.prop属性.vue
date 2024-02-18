
<template>
	<div>
		<Student name="李四" sex="女" :age="18"/><!-- 通过v-bind动态绑定则="18"中的18是一个表达式,所以他是number类型的值 -->
	</div>
</template>

<script>
	import Student from './66.student.vue'

	export default {
		name:'App',
		components:{Student}
	}
</script>
