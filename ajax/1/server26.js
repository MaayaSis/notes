const express = require('express')
const app = express()
app.get('/home',(request,response)=>{
	response.sendFile(__dirname + '/26.同源策略.html')
})
app.get('/data', (request, response)=>{
    response.send('用户数据');
});
app.listen(9000,()=>{
	console.log('服务已经启动,9000端口监听中')
})