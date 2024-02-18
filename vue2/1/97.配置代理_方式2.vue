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
//开启代理服务器（方式二）
	devServer: {
    proxy: {
      '/atguigu': {//
        target: 'http://localhost:5000',
				pathRewrite:{'^/atguigu':''},//正则匹配所有以/atguigu开头的字符串替换为""
        // ws: true, //用于支持websocket
        // changeOrigin: true //用于控制请求头中的host值:为true时.它与target中的端口号一致
      },
      '/demo': {
        target: 'http://localhost:5001',
				pathRewrite:{'^/demo':''},
        // ws: true, //用于支持websocket
        // changeOrigin: true //用于控制请求头中的host值
      }
    }
  }
 */
	import axios from 'axios'
	export default {
		name:'App',
		methods: {
			getStudents(){
				axios.get('http://localhost:8080/students').then(
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
