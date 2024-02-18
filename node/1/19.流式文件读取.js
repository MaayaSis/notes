/*
流式文件读取也适用于一些比较大的文件,可以多次将文件读取到内存中
*/
var fs = require("fs")

var rs = fs.createReadStream("19的可读流.txt")//创建了一个可读流
var ws = fs.createWriteStream("19的可写流.txt");//创建一个可写流
rs.once("open",function(){
    console.log("可读流打开了")
})
rs.once("close",function(){
    console.log("可读流关闭了")
    ws.end()
})
ws.once("open",function(){
    console.log("可写流打开了")
})
ws.once("close",function(){
    console.log("可写流关闭了")
})
rs.on("data",function(data){
    ws.write(data)
})
rs.pipe(ws);//pipe()可以将可读流中的内容，直接输出到可写流中
