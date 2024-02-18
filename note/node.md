# 命令行窗口

常用的指令:

1. dir:列出当前目录下的所有文件
2. cd 目录名:进入到指定的目录
3. md 目录名:创建一个文件夹其实就是mkdir
4. rd 目录名:删除一个文件夹

目录:

1. `.`表示在当前目录下寻找
2. `..`表示上一级目录下寻找

Path(环境变量):在命令行窗口打开一个文件,或调用一个程序时，系统会首先在当前目录下寻找文件程序，如果找到了则直接打开,如果没有找到则会依次到环境变量path的路径中寻找，直到找到为止,如果没找到则报错

**可以将常访问的程序和文件的路径添加到path中,以便在任意位置访问这些文件和程序**

# 进程与线程

I/O(Input/Output)md:I/O操作指的是对磁盘的读写操作

进程:进程就是一个一个的工作计划（工厂中的车间）负责为程序的运行提供必备的环境

线程:线程是计算机最小的运算单位（工厂中的工人）,线程是干活的,负责执行进程中的程序

传统的服务器都是多线程:每进来一个请求,就创建一个线程去处理请求

Node的服务器和JS是单线程:Node处理请求时是单线程，但是在后台拥有一个I/O线程池

# Node简介

Node是对ES标准一个实现,Node也是一个JS引擎:通过Node可以使JS代码在服务器端执行

Node中可以使用所有的内建对象:String Number Boolean Math Date RegExp Function Object Array

Node仅仅对ES标准进行了实现,所以不能使用BOM和DOM,但是可以使用console setTimeout() setInterval()

# 使用Node执行JS

能直接执行的都是`.html`后缀的文件,而`.js`需要通过Node才能执行,否则就需要通过`.html`文件中引入

# Node整合webstorm

webstorm是一个类似VSCode的软件,所以本节跳过

# 模块化简介

1. 通过Node可以使JS在服务器中运行
2. Node就是一款使用JS编写的web服务器,使用的是chrome的**JS引擎**
3. Node底层是使用C++的编写的

# 模块化详解

Node特点:

1. 非阻塞,异步的I/O
2. 事件和回调函数
3. 单线程（主线程单线程，后台I/O线程池）
4. 跨平台

```javascript
//设此文件名为 6.js
exports.x = "maaya"
exports.y = "sister"//向外暴露两个变量
```

```javascript
//此为另外一个js文件
var m = require("./6.js")//引入路径文件中的变量
console.log(m)//输出对象{x::"maaya",y:"sister"}
```

模块的定义:Node中一个JS文件就是一个模块

默认情况下在js文件中编写的内容，其实都是运行在一个独立的函数中，外部的模块无法访问

```javascript
exports.x = "maaya"//使用exports导出1变量
exports.fn = function(){}//导出函数
```

# exports和module.exports

```javascript
exports.x = "maaya"//必须将函数或变量添加为exprots的方法和属性才可以
exprots = {x:"maaya"}//这是错误的
module.exports = {x:"maaya"}//这是可以的
module.exports.x = "maaya"//这也是正确的
```

```javascript
//在此代码块中,obj.a相当于module.exports,而a相当于exports[5]
var obj = {}
obj.a = {name::"maaya"}
var a = obj.a
a = new Object()
console.log(obj.a.name)//问输出的是什么.思考可得exports和module.exports的关系
```

# 包简介

模块的标识就是模块的名字或路径:我们node通过模块的标识来寻找模块的

核心模块（npm中下载的模块）:直接使用模块的名字对其进行引入

```javascript
var fs = require("fs");
var express = require("express")//fs和express均为模块的名字
```

自定义的文件模块:需要通过文件的路径来对模块进行引入,路径可以是绝对路径,如果是相对路径必须以./或 ../开头

```javascript
var router = require("./router");
```

# npm简介

npm -v:查看npm的版本
npm version:查看所有模块的版本
npm search 包名:搜索包
npm install/i 包名:安装包(i为缩写,即npm install 包/npm i 包;两种写法都可以)
npm remove/r 包名:删除包(同上)
npm install 包名 --save:安装包并添加到依赖中,用的会很多 ,但是新版好像不需要了
npm install:下载当前项目所依赖的包
npm install 包名 -g:全局安装包（全局安装的包一般都是一些工具）

```javascript
var fs = require("fs")//fs是核心模块不需要下载
```

# 配置cnpm

# node搜索包的流程

# Buffer(缓冲区)

Buffer和数组的结构的非常类似，Buffer是用来存储二进制数据的 因为数组不能存储二进制文件

```javascript
var str = "Maaya 姐姐"//一个汉字占2byte=16bit(不同编码方式不同),一个英文1byte,空格也占字节
var buf = Buffer.from(str)//Buffer.form(String),将一个字符串保存到变量buf中
console.log(buf.length)//输出占用内存的大小
console.log(str.length)//字符串的长度
var buf1 = Buffer.alloc(10)//创建一个10byte的Buffer
buf1[0] = 10//通过索引来操作buf中的元素
buf1[2] = 0xaa //这是16进制的数,16进制是以0x开头的,最后数字在控制或页面中输出一定是10进制
buf1[3] = 555//结果是555%255=的值
buf1[9] = 15//Buffer的大小一旦确定,是不能够在更改的,因为这是直接在内存中分配了10byte的空间
console.log(buf1[3].toString(10))//转换成10进制
var buf3 = Buffer.allocUnsafe(10)//创建一个指定大小的buffer,但是可能会有未擦除的敏感数据(但是性能更好)
```

# 同步文件写入与读取

文件的操作步骤:1)打开文件(创建文件),2)向文件中写入内容,**3)保存并关闭文件**

读取(打开)文件:fs.openSync(path,flags,mode) 

1. path:路径
2. flags:打开文件要做的操作的类型
3. r/w:只读/可写
4. mode:设置文件的操作权限,一般不传

打开后:该方法会返回一个文件的描述符作为结果,我们可以通过该描述符来对文件进行各种操作

```javascript
var fd = open.Sync("maaya","r")//定义变量接收文件的描述符,只有同步方法才由这个返回值
console.log(fd)
```

向文件中写入内容:fs.writeSync(fd,string,position,encoding)

1. fd:文件的描述符,需要传递要写入的文件的描述符
2. string:要写入的内容
3. postion:要写入的起始位置
4. encoding:写入的编码格式,默认utf-8

```javascript
fd.openSync("maaya","w")//定义变量接收文件的描述符,因为上面的是只读,所以要重新定义接收可写入的描述符
fs.writeSync(fd,"姐姐我爱你",2)//写入完成之后,已开的文件不会自动保存并关闭
fs.closeSync(fd)//保存并关闭文件
console.log("继续向下执行")//上面的同步操作如果未完成,不可以继续向下,因为是单线程
```

# 异步文件的写入与读取

异步函数的open方法必须上传callback参数,并且它得是一个函数:

异步调用的方法,得到的结果都是通过回调函数的参数返回的

callback回调函数的两个参数:

1. err错误对象,如果没有错误则为null
2. fd:文件的描述符

异步的方法不可能由返回值,但它所调用的回调函数会产生一个返回值描述符

```javascript
fs.open("maa.txt","w",function(err,fd){//var fd = fs.open(path,flags,callback)
  console.log(fd)//描述符参数名可以改
  console.log("我在[22]之后执行")//因为异步的方法是在整个界面读完了,线程才会开始调用
})

fs.open("maaya.txt","w",function(err,fd){
  if(!err){//正确的异步,是应该做嵌套的
    fs.write(fd,"姐姐我爱你",2,function(err){//似乎这个写入方法是直接覆盖
      if(!err){//fs.write(fd,string,position,encoding,callback)
        console.log("写入成功")
      }
      fs.close(fd,function(err){
        if(!err){
          console.log("写入成功")
        }
      })
    })
  }else{
    console.log(err)
  }
}
console.log("我在后面执行")//在初始代码执行完之后,再执行回调函数
```

# 简单文件写入

简单文件写入,简单是因为writeFile已经把其他方法封装进去了,但这个方法的问题是**会直接覆盖,而同步与异步的fs.write()方法似乎也会直接覆盖**

- `fs.writeFile(file,data,options,callback)`
- `fs.writeFileSync(file,data,options)`
- file:要操作的文件的路径
- data:要写入的数据
- options:可以对写入进行一些设置,`flag:"w"`中的w操作会直接覆盖要写入内容的文件的所有内容,flag的多种状态可以查看文档,或者node.pdf
- callback:当写入完成以后执行的函数,callback的arguments只有err

```javascript
var fs = require("fs")
fs.writeFile("D:\\OneDrive\\Node\\1","Kisaragi_Maaya",{flag:"a"},function(err){//路径如果要用绝对路径的话,需要再使用一个转义字符或者D:/OneDrive/Node/1
  if(!err){
    console.log("写入成功")
  }else{
    console.log("写入失败")
  }
})
```

# 流式文件写入

同步,异步,简单文件的写入都不适合大文件的写入,性能较差,容易导致内存溢出

流式文件写入:`fs.createWriteStream(path,options)`

```javascript
var fs = require("fs")
var ws = fs.createWriteStream("Maaya1.txt")//创建了一个可写流
ws.once("open",function(){//给ws绑定事件监听,on是绑定一个事件监听,once是绑定一个一次性事件监听
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
```

# 简单文件读取

```javascript
var fs = require("fs")
fs.readFile("Maaya.txt", function (err, data) {//简单文件读取
  if (!err) {
    console.log(data)//返回的buffer,因为buffer的2进制可以读取所有的文件内容,这样通用性最高
    fs.writeFile("C:/Users/lilichao/Desktop/hello.jpg", data, function (err) {
      if (!err) {
        console.log("文件写入成功");
      }
    })
  }
})
```

# 流式文件读取

流式文件读取也适用于一些比较大的文件,可以多次将文件读取到内存中

```javascript
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
```

# fs模块的其它方法

可以参考Node.pdf和Node.js的中文网站

```javascript
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
```

