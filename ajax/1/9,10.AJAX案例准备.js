//引入express
const express = require('express');
//创建应用对象
const app = express();
//创建路由规则
app.get('/server',(request,response)=>{//如果url的路径也就是请求行的第二段是server , 则会对它做出响应
	response.setHeader('Access-Control-Allow-Origin', '*');//设置响应头,设置允许跨域
	response.send('HELLO AJAX');
})
app.get('/server',(request,response)=>{ //request是对请求报文的封装,response是对响应报文的封装,接收get的请求
	response.setHeader('Access-Control-Allow-Origin', '*');//设置响应体,设置允许跨域
	response.send('HELLO AJAX');
})
app.post('/server',(request,response)=>{ //接收post的请求
	response.setHeader('Access-Control-Allow-Origin', '*');//设置响应头 ,设置允许跨域
	response.setHeader('Access-Control-Allow-Headers', '*');//设置接收所有请求头信息(如自定义),设置允许跨域
	response.send('HELLO AJAX');
})
app.all('/server',(request,response)=>{ //接收所有类型
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', '*');
	response.send('HELLO AJAX');
})
app.all('/json-server',(request,response)=>{ //接收json-server的所有类型
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Headers', '*');
	const data = {
		name:'姐姐'
	}
	let Maaya = JSON.stringify(data)//对对象进行字符串转换
	response.send(Maaya);
})
app.get('/ie',(request,response)=>{ //IE缓存内容
	response.setHeader('Access-Control-Allow-Origin', '*');//设置响应体,设置允许跨域
	response.send('HELLO IE');
})
app.get('/Delay',(request,response)=>{ 
	response.setHeader('Access-Control-Allow-Origin', '*');//设置响应体,设置允许跨域
	setTimeout(()=>{//针对延时响应
		response.send('延时响应')
	},3000)
})
//监听端口启动服务 必须在对应的JS文件中打开集成终端,然后集成终端中输入 node xxx.js
app.listen(8000,()=>{
	console.log('服务已经启动,8000端口监听中...');
})