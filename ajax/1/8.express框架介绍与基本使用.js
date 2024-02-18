//引入express框架
const express = require('express');
//创建应用对象
const app = express();
//创建路由规则
app.get('/',(request,response)=>{ //request是对请求报文的封装,response是对响应报文的封装
	response.send('HELLO EXPRESS');
})
app.post('/',(request,response)=>{ //request是对请求报文的封装,response是对响应报文的封装
	response.send('HELLO EXPRESS POST');
})
//监听端口启动服务
app.listen(8000,()=>{
	console.log('服务已经启动,8000端口监听中...');
})
//首先安装node.js,之后再在集成终端中输入:
//1. npm init --yes npm初始化
//2. npm i express 安装express框架
//2. node 8.express框架介绍与基本使用  必须在对应目录下启动 8.express框架介绍与基本使用 这个服务
