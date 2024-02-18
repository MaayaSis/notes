const fs = require("fs")
fs.readFile("模板.html", function (err, data) {//回调地狱问题1,变量易重名
	fs.readFile("模板.html", function (err, data1) {
		fs.readFile("模板.html", function (err, data2) {
			let result = data1 + '\r\n' +data2  +'\r\n'+ data3;
			console.log(result )
		})
	})
})
p.then(value => {
    return new Promise((resolve, reject) => {
        fs.readFile("模板.html", (err, data) => {
            resolve([value, data]);
        });
    });
}).then(value => {
    return new Promise((resolve, reject) => {
        fs.readFile("模板.html", (err, data) => {
            //压入
            value.push(data);
            resolve(value);
        });
    })
}).then(value => {
    console.log(value.join('\r\n'));
});