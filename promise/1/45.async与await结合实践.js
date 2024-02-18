const fs = require("fs")
const util = require("util")//util中有一个方法可以将这些API转换为Promise形式的函数
const mineReadFile = util.promisify(fs.readfile)
//读取一个文件夹下的多个文件的内容
//通过回调函数的方式
fs.readfile("./resourc/1.html", (err, data1) => {
	if (err) throw err
	fs.readfile("./resourc/1.html", (err, data2) => {
		if (err) throw err
		fs.readfile("./resourc/1.html", (err, data3) => {
			if (err) throw err
			console.log(data1 + data2 + data3);
		})
	})
})
//await和async结合实现
async function main() {
	try {
		let data1 = await mineReadFile("./resourc/1.html")//读取第一个文件的内容
		let data2 = await mineReadFile("./resourc/2.html")
		let data3 = await mineReadFile("./resourc/3.html")
		console.log(data1 + data2 + data3);
	} catch (error) {
		console.log(error.code);
	}
}
