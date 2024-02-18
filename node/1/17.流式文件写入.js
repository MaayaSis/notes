/*
同步,异步,简单文件的写入都不适合大文件的写入,性能较差,容易导致内存溢出
流式文件写入:fs.createWriteStream(path,options)
*/
var fs = require("fs")

var ws = fs.createWriteStream("Maaya1.txt")//创建了一个可写流
ws.once("open",function(){//给ws绑定一个事件监听,on是绑定一个事件监听,once是绑定一个一次性事件监听
    console.log("流打开了")
})
ws.once("close",function(){
    console.log("流关闭了")
})
 ws.write("1姐姐我爱你")//通过ws持续向可写流中输出内容
 ws.write("2姐姐我爱你")
 ws.write("3姐姐我爱你")
 ws.write("4姐姐我爱你")
 ws.write("5姐姐我爱你")
 ws.write("6姐姐我爱你")
ws.end()//不能用close(),水管左边传输到右边,内容已经全在水管里了,close是把右边的水龙头关了,end是关左边的

