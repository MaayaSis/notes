var fs = require("fs")
/*
var fd = fs.open(path,flags,callback),异步函数的open方法必须上传callback参数,并且它得是一个函数
异步调用得方法,结果都是通过回调函数的参数返回的
回调函数两个参数: err错误对象,如果没有错误则为null  fd:文件的描述符
*/
fs.open("Maaya.txt","w",function(err,fd){//异步方法不可能有返回值
    if(!err){
        console.log(fd)
        console.log("我后面执行")//异步的方法是在整个界面读完了,线程才会开始调用
/*
fs.write(fd, string, position, encoding, callback)
*/
        fs.write(fd,"我爱你姐姐",2,function(err){//如果没有出错,则对文件进行写入操作
            if(!err){
                console.log("写入成功")
            }
            fs.close(fd,function(err){
                if(!err){
                    console.log("文件以关闭")
                }
            })
        })
    }else{
        console.log(error)
    }
})
console.log("我在前面执行")//即使上面的异步操作未完成,这一步也可以继续,包括继续向下
