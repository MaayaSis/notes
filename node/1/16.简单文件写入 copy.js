/*
简单文件写入,简单是因为writeFile已经把其他方法封装进去了,这个方法的问题是会直接覆盖
fs.writeFile(file, data, options, callback)  
fs.writeFileSync(file, data, options)
    file:要操作的文件的路径
    data:要写入的数据
    options:选项,可以对写入进行一些设置,flag:"w"中的w操作会直接覆盖要写入内容的文件的所有内容,flag的多种状态可以查看文档,或者node.pdf
    callback:当写入完成以后执行的函数,callback的arguments只有err

fs.readFile(path, options, callback)
fs.readFileSync(path, options)
*/
var fs = require("fs")

fs.writeFile("D:\\OneDrive\\Node\\1","Kisaragi_Maaya",{flag:"a"},function(err){//路径如果要用绝对路径的话,需要再使用一个转义字符或者D:/OneDrive/Node/1
    if(!err){
        console.log("写入成功")
    }else{
        console.log("写入失败")
    }
})
