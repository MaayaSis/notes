const { rejects } = require("assert")
const fs = require("fs")
fs.readFile("./resource/content.txt", (err, data) => {
    if (err) throw err//如果错误则抛出错误
    console.log(data.toString())//输出读取结果
})
//2.通过Promise形式读取
let p = new Promise((resolve, rejects) => {
    fs.readFile("./resource/content.txt", (err, data) => {
        if (err) throw err//如果错误则抛出错误
        resolve(data)//输出读取结果
    })
})
p.then(value => {
    console.log(value.toString())
}, reason => {
    console.log(reason)
})