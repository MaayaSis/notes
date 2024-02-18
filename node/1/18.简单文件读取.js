/*

*/
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
