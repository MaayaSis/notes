//可以参考 Node.pdf和Node.js的中文网站

var fs = require("fs")

var isexist = fs.existsSync("Maaya.txt")//检查一个文件是否存在，这个方法会返回一个值true or false
console.log(isexist)

fs.state(path,function(err,state){//有异步,检查一个文件的大小
    console.log(state.size)
})

//isFile() 是否是一个文件  isDirectory() 是否是一个文件夹

fs.unlink(path,callback)//删除一个文件

fs.readdir(path,function(err,files){//读取一个目录的目录解构
    console.log(files)//files是一个数组,每个索引放的都是一个文件夹或这文件
})

fs.truncate(path,length,callback)//把一个文件改成指定的大小

fs.mkdir(path,mode,callback)//创建一个目录

fs.rmdir(path,callback)//删除一个目录

fs.rename("Maaya.txt","new Maaya.txt",function(err){//重命名文件,如果把文件名改成路径,重命名就会变成剪切
    console.log("修改成功")
})

fs.watchFile(filename,options,listener)//filename:要监视的文件的名字,options:配置选项,listener:回调函数,当文件发生变化时,回调函数会执行
fs.watchFile("Maaya.txt",function(curr,prev){//listener可选参数:curr prev,这两个都是state对象
    console.log("修改前文件的状态:"+curr)//curr.size
    console.log("修改后文件的状态:"+prev)//实际上是每隔一段时间会检测文件的变化,只要时间间隔找到,就可以不出现提示
})//optiions中有参数可以更改检测间隔时间