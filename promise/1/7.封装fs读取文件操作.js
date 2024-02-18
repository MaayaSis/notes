function mineReadFile (path){
    return new Promise((resolve,reject)=>{
        require("fs").readFile(path,(err,data)=>{
            if(err) reject(err)
             resolve(data)
        })
    })
}
mineReadFile('./resource/content.txt')//和下面的是一行连续的代码
.then(value=>{
    console.log(value.toString());
}, reason=>{
    console.log(reason);
});
