var str = "Maaya 姐姐"//一个汉字占2byte=16bit(不同编码方式不同),一个英文1byte,空格也占字节
var buf = Buffer.from(str)//将一个字符串保存到buffer中
console.log(buf.length)//占用内存的大小
console.log(str.length)//字符串的长度
var buf1 = Buffer.alloc(10)//创建一个10byte的Buffer
buf1[0] = 10//通过索引来操作buf中的元素
buf1[2] = 0xaa //这是16进制的数,16进制是以0x开头的,最后数字在控制或页面中输出一定是10进制
buf1[3] = 555//结果是555%255 = 的值
buf1[9] = 15//Buffer的大小一旦确定,是不能够在更改的,因为这是直接在内存中分配了10byte的空间
console.log(buf1[2].toString(10))//转换成10进制
var buf3 = Buffer.allocUnsafe(10)//创建一个指定大小的buffer,但是可能会有为擦除的敏感数据(但是性能更好)