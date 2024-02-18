<template>
	<div>
		<button @click="isShow = !isShow">显示/隐藏</button>
		<transition-group name="hello" appear><!-- 当transition标签中包裹多个标签时,需要改为用transition-group,并且要给每个标签添加一个key值 -->
			<h1 v-show="!isShow" key="1">你好啊！</h1>
			<h1 v-show="isShow" key="2">尚硅谷！</h1>
		</transition-group>
	</div>
</template>
<script>
	export default {
		name:'Test',
		data() {
			return {
				isShow:true
			}
		},
	}
</script>
<style scoped>
/* 
.hello.enter和.hello.leave这两个类被添加一瞬间后消失了,因为只要直到是从哪来的之后就没有用了
 */
	h1{
		background-color: orange;
		/* transition:0.5s linear */
	}
	/* 进入的起点、离开的终点 */
	.hello-enter,.hello-leave-to{/* 相同的样式的类可以这样合并写减少代码量 */
		transform: translateX(-100%);
	}
	.hello-enter-active,.hello-leave-active{
		transition: 0.5s linear;
	}
	/* 进入的终点、离开的起点 */
	.hello-enter-to,.hello-leave{
		transform: translateX(0);
	}

</style>