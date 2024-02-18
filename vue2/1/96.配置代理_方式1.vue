<template>
	<div>
		<button @click="getStudents">获取学生信息</button>
		<button @click="getCars">获取汽车信息</button>
	</div>
</template>

<script>
/* 
代理服务器:通过vue-cli开启代理服务器
1.在vue-cli的脚手架中的vue.config.js文件的对象添加属性:这个代理服务器会跟随本身服务器的端口号保持一致,而proxy的值是要请求数据的服务器的地址
devServer: { //缺点1.只能配置一个代理
	roxy: 'http://localhost:5000'
},
 */
	import axios from 'axios'
	export default {
		name:'App',
		methods: {
			getStudents(){
				axios.get('http://localhost:8080/students').then(//缺点2:向代理服务器请求数据,如果代理服务器上存在同名文件则直接返回,不存在则向5000端口号索取
					response => {
						console.log('请求成功了',response.data)
					},
					error => {
						console.log('请求失败了',error.message)
					}
				)
			},
			getCars(){
				axios.get('http://localhost:8080/demo/cars').then(
					response => {
						console.log('请求成功了',response.data)
					},
					error => {
						console.log('请求失败了',error.message)
					}
				)
			}
		},
	}
</script>
