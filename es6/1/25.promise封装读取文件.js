//引入fs模块,并且调用方法读取文件
const fs = require("fs")
fs.readFile("1.课程介绍.html",(err,data)=>{
	if(err) throw err
	console.log(data.toString())
})
//使用promise封装
const p = new Promise(function(resolve,reject){
	if(err) throw reject (err)
	resolve(data)
})
p.then(function(value){
	console.log(value.toString())
},function(reason){
	console.log("读取失败")
})