const fs = require("fs");//1. 引入 fs 模块
function readWeiXue() {//读取『为学』
    return new Promise((resolve, reject) => {
        fs.readFile("./resources/为学.md", (err, data) => {
            if (err) reject(err);//如果失败
            resolve(data);//如果成功
        })
    })
}
function readChaYangShi() {
    return new Promise((resolve, reject) => {
        fs.readFile("./resources/插秧诗.md", (err, data) => {
            if (err) reject(err);//如果失败
            resolve(data);//如果成功
        })
    })
}
function readGuanShu() {
    return new Promise((resolve, reject) => {
        fs.readFile("./resources/观书有感.md", (err, data) => {
            if (err) reject(err);//如果失败
            resolve(data);//如果成功
        })
    })
}
async function main(){//声明一个 async 函数
    let weixue = await readWeiXue();//获取为学内容
    let chayang = await readChaYangShi();//获取插秧诗内容
    let guanshu = await readGuanShu();// 获取观书有感
    console.log(weixue.toString());
    console.log(chayang.toString());
    console.log(guanshu.toString());
}
main();