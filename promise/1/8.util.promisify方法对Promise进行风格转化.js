const util = require("util")
const fs = require("fs")
//util模块的promisify方法是传入一个遵循常见的错误有限的回调风格的函数如[4]中的fs.readfile,并返回一个promise的版本
let mineReadFile = util.promisify(fs.readFile)//这个方法返回的是一个新的Promise函数
mineReadFile("./resource/content.txt").then(value=>{//这就是个模块化的Promise函数,可以直接被使用
    console.log(value.toString())
},reason=>{
    console.log(reason.code)
})