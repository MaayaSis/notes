var fs = require('fs')//fs是核心模块不需要下载
//文件的操作步骤:1)打开文件(创建文件),2)向文件中写入内容,3)保存并关闭文件
/*
读取文件:fs.openSync(path,flags,mode) path是路径,flags是打开文件要做的操作的类型,r只读的,w可写的,莫得 设置文件的操作权限,一般不传
打开后:该方法会返回一个文件的描述符作为结果,我们可以同过该描述符来对文件进行各种操作
*/
var fd = fs.openSync('Maaya.txt','w')//定义文件的描述符 , 只有同步方法才会有这个返回值
console.log(fd)
/*
向文件中写入内容:fs.writeSync(fd, string, position, encoding)
fd:文件的描述符,需要传递要写入的文件的描述符
string:要写入的内容
postion:要写入的起始位置
encoding:写入的编码格式,默认utf-8
*/

fs.writeSync(fd,'今天的天气真不错',2)
/*
fs.closeSync(fd)
fd:文件的描述符
*/
fs.closeSync(fd)
console.log("继续向下执行")//上面的同步操作如果未完成,不可以继续向下,因为是单线程
