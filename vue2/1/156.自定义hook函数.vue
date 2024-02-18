<template>
	<h2>我是Test组件</h2>
	<h2>当前点击时鼠标的坐标为：x：{{point.x}}，y：{{point.y}}</h2>
</template>

<script>
	import usePoint from '../hooks/usePoint'
	export default {
		name:'Test',
		setup(){
			const point = usePoint()//使用hook封装鼠标坐标获取函数得到的值
			return {point}
		}
	}
</script>