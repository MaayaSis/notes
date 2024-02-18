<template>
	<Demo @hello="showHelloMsg" msg="你好啊" school="尚硅谷"><!-- 绑定自定义事件 -->
		<template v-slot:qwe>
			<span>尚硅谷</span>
		</template>
		<template v-slot:asd><!-- 使用具名插槽时使用v-slot绑定 -->
			<span>尚硅谷</span>
		</template>
	</Demo>
</template>

<script>
	import Demo from './components/Demo'
	export default {
		name: 'App',
		components:{Demo},
		setup(){
			function showHelloMsg(value){
				alert(`你好啊，你触发了hello事件，我收到的参数是:${value}！`)
			}
			return {
				showHelloMsg
			}
		}
	}
</script>

