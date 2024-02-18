//引入express
const { response } = require('express');
const express = require('express');
//创建应用对象
const app = express();
//创建路由规则
app.get('/server', (request, response) => { //request是对请求报文的封装,response是对响应报文的封装,接收get的请求
	response.setHeader('Access-Control-Allow-Origin', '*');//设置响应体,设置允许跨域
	response.send('HELLO AJAX');
})
app.post('/server', (request, response) => { //接收post的请求
	response.setHeader('Access-Control-Allow-Origin', '*');//设置响应体,设置允许跨域
	response.setHeader('Access-Control-Allow-Headers', '*');//设置所有头响应体,设置允许跨域
	response.send('HELLO AJAX');
})
app.all('/server', (request, response) => { //接收所有类型
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', '*');
	response.send('HELLO AJAX');
})
app.all('/json-server', (request, response) => { //接收json-server的所有类型
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', '*');
	const data = {
		name: '姐姐'
	}
	let Maaya = JSON.stringify(data)
	response.send(Maaya);
})
app.get('/ie', (request, response) => { //针对IE
	response.setHeader('Access-Control-Allow-Origin', '*');//设置响应体,设置允许跨域
	response.send('HELLO IE');
})
app.get('/Delay', (request, response) => { //针对延时响应
	response.setHeader('Access-Control-Allow-Origin', '*');//设置响应体,设置允许跨域
	setTimeout(() => {
		response.send('延时响应')
	}, 3000)
})
app.all('/jquery-server', (request, response) => { //针对jQuery
	response.setHeader('Access-Control-Allow-Origin', '*');//设置响应体,设置允许跨域
    response.setHeader('Access-Control-Allow-Headers', '*');
	const data = {
		name:'姐姐'
	}
	let Maaya = JSON.stringify(data)
	response.send(Maaya)//对象转换成字符串
})
app.all('/axios-server', (request, response) => { //针对axios
	response.setHeader('Access-Control-Allow-Origin', '*');//设置响应体,设置允许跨域
    response.setHeader('Access-Control-Allow-Headers', '*');
	const data = {
		name:'姐姐'
	}
	response.send(JSON.stringify(data))
})
app.all('/fetch-server', (request, response) => { //针对fetch
	response.setHeader('Access-Control-Allow-Origin', '*');//设置响应体,设置允许跨域
    response.setHeader('Access-Control-Allow-Headers', '*');
	const data = {
		name:'姐姐'
	}
	response.send(JSON.stringify(data))
})
app.all('/fetch-server', (request, response) => { //针对fetch
	response.setHeader('Access-Control-Allow-Origin', '*');//设置响应体,设置允许跨域
    response.setHeader('Access-Control-Allow-Headers', '*');
	const data = {
		name:'姐姐'
	}
	response.send(JSON.stringify(data))
})
app.all('/check-username',(request,response) => {
	const data = {
		exist:1,
		msg:'用户名已存在'
	};
	let str = JSON.stringify(data)
	response.end(`handle(${str})`)
})
app.all('/jQuery-jsonp-server',(request,response)=>{//使用jQuery发送JSNOP请求
	const data = {
		name:'Maaya',
		city:'home'
	}
	let str = JSON.stringify(data);
	let cb = request.query.callback//接收请求参数callback=后面的?,这个?其实是一串数字.可以在请求体中看出
	response.end(`${cb}(${str})`)//ES6内容
})
app.all('/cros-server',(request,response)=>{
	response.setHeader('Access-Control-Allow-Origin', '*')//所有网页都可以使用跨域
	response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')//只有这个才能跨域
	response.send('hello CROS')
})
//监听端口启动服务 必须在对应的JS文件中打开集成终端,然后集成终端中输入 node xxx.js
app.listen(8000, () => {
	console.log('服务已经启动,8000端口监听中...');
})