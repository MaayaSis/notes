# Promise视频简介

null

# Promise的介绍

**面试必答:Promise支持链式调用,解决地狱回调问题,并且解决回调的形式更灵活**

异步编程:

```javascript
//1.fs文件操作
require("fs").readfile("./Promise/test.txt",(err,data)=>{})
//2.AJAX
$.get("server",(data)=>{})
//3.定时器
setTimeout(()=>{},1000)
```

# Promise的初体验

[4] Promise的初体验1

# Promise的初体验1

```javascript
function rand(m,n){
  return Math.round(Math.random()*(y-x)+x)
}
const btn = document.querySelector("btn")
//1.点击按钮2s后显示是否中奖,中奖概率为30%
btn.addEventListener("click",()=>{
  setTimeout(()=>{
    let result = rand(1,100)
    if (n <= 30) resolve("中奖")
    reject("没中奖")
  },2000)
})
//2.Promise形式实现
btn.addEventListener('click', function () {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      let n = rand(1, 100);
      if (n <= 30) resolve("n")
      reject("n")
    }, 100);
  });
  p.then((value) => {
    alert("中奖,您的中奖数字为" + value);
  }, (reason) => {
    alert("再接再厉,您的号码为" + reason);
  });
});
```

```html
<button id="btn">中奖</button>
```

# fs读取文件

```js
const fs = requir("fs")
//1.正常方法
fs.readfile("./Promise",(err,data)=>{//异步读取
  if(err) throw err
  console.log(data.toString())
})
//2.Promise形式
let p = new Promise((resolve, rejects) => {
  fs.readFile("./resource/content.txt", (err, data) => {
    if (err) throw err
    resolve(data)
  })
})
p.then(value => {
  console.log(value.toString())
}, reason => {
  console.log(reason)
})
```

# AJAX请求

```javascript
//1.Promise实现
const btn = document.querySelector('#btn');
btn.addEventListener('click', function () {
  const p = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.apiopen.top/getJoke');
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.status);
        }
      }
    }
  });
  p.then(value => {
    console.log(value);
  }, reason => {
    console.warn(reason);
  });
});
```

# 封装fs读取文件操作

```js
function mineReadFile (path){
  return new Promise((resolve,reject)=>{
    require("fs").readFile(path,(err,data)=>{
      if(err) reject(err)
      resolve(data)
    })
  })
}
mineReadFile('./resource/content.txt')//和下面的是一行连续的代码,但是可以书写成这样的形式
.then(value=>{
  console.log(value.toString());
}, reason=>{
  console.log(reason);
});

```

# util.promisify()对Promise进行风格转化

```js
const util = require("util")
const fs = require("fs")
//util模块的promisify方法是传入一个遵循常见的错误有限的回调风格的函数如[4]中的fs.readfile,并返回一个promise的版本
let mineReadFile = util.promisify(fs.readFile)//这个方法返回的是一个新的Promise函数
mineReadFile("./resource/content.txt").then(value=>{//这就是个模块化的Promise函数,可以直接被使用
  console.log(value.toString())
},reason=>{
  console.log(error)
})
```

# 封装AJAX请求

```javascript
function sendAJAX(url){
  return new Promise((resolve,reject)=>{
    const xhr = new XMLHttpRequest()
    xhr.open("GET",url)
    xhr.send()
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
        if(xhr.status >= 200 && xhr.status <300) resolve(xhr.response)//ES简写特性
        reject(status)
      }
    }
  })
}
sendAJAX("https://api.apiopen.top/getJoke").then(value=>{
  console.log(value.toString())
},reason=>{
  console.log(status)
})
```

# Promise对象状态属性介绍

promise的状态:

1. **实例对象**中的一个属性[PromiseState],它有三个值,pending,resolve/fullfilled,rejected
2. 状态的值只能从pending向resolve和rejected转换

# Promise对象结果值属性介绍

Promise对象的值:

1. **实例对象**中的另一个属性[PromiseResult]保存着对象[成功/失败的结果]
2. [PromiseResult]属性的值是resolve()和rejected()中传入的参数

# Promise的工作流程

null

# Promise的API的构造函数then_catch

```javascript
let p = new Promise((resolve, reject) => {//Promise()传入的参数只能是函数,可以是匿名函数和箭头函数
  console.log(222)//new Promise()是一个同步调用,即在声明时立刻执行代码,222会先与111输出
  reject("error")
})
console.log(111)
//2.只捕获错误的结果,并进行回调
p.then().catch(reason => {//在链式回调中,then方法位于catch方法之前,但出现reject时,catch会位于第一序列,先于then调用
  console.log(reason)
})
```

# promise.resolve()

resolve():返回一个成功/失败的Promise对象

1. 传入的参数为非promise类型的对象,则返回的结果为成功的promise对象
2. 传入的参数是promise对象,则Promise对象参数的结果决定了resolve的结果

```javascript
let p = Promise.resolve(521)
console.log(p)//State:fulfilled,value:521
let p1 = Promise.resolve(new Promise((resolve,reject)=>{
  reject("error")
}))
console.log(p1)//state:rejected,value:error
```

# promise.reject()

promise.reject():始终返回一个失败的Promise对象

1. 传入的参数为非promise类型的对象,返回的结果为失败的promise对象
2. 传入的参数是promise对象,返回的结果仍是失败的promise对象

```javascript
let p = Promise.reject(521)
console.log(p)//此时,State:rejected,value:521
let p1 = Promise.reject(new Promise((resolve, reject) => {
  resolve("ok")//传入的是成功的Promise对象
}))
console.log(p1)//state:rejected,value:ok
```

# promise.all()

```javascript
//传入一个包含多个promise对象的数组,只要有一个失败了就直接失败,全部promise成功才能成功
let p1 = new Promise((resolve,reject)=>{
  resolve("ok")
})
let p2 = Promise.resolve(p1)
let p3 = Promise.resolve(p2)
const result = Promise.all([p1,p2,p3])//结果值包含三个promise成功的结果值;如有一个失败则value只包括失败的结果
console.log(result)
```

# promise.race()

```javascript
//与promise.all()相似,上传的参数也是promise对象组成的数组,第一个完成promise的结果状态就是最终的结果状态,值也相同
let p1 = new Promise((resolve,reject)=>{
  setTimeout(()=>{//异步回调
    resolve("ok")
  },1000)
})
let p2 = Promise.resolve("success")//因此,p2首先改变状态
let p3 = Promise.resolve("right")
const result = Promise.race([p1,p2,p3])
console.log(result)
```

# 如何修改对象的状态

# 能否执行多个回调

```javascript
let p = new Promise((resolve, reject) => {
  resolve("ok")
})
//只要符合状态,那么所有的回调都会被执行
p.then(value => {
  console.log(value)
})
p.then(value => {
  alert(value)
})
```

# 改变状态与指定回调的顺序问题

```javascript
//只是运行顺序不同,但是结果都是输出ok
let p = new Promise((resolve, reject) => {
  //resolve("ok")//同步任务
  setTimeout(()=>{//异步任务
    resolve("ok")
  },1000)
})
//可以给then方法加一个延时更长的回调函数就能先改变状态,再指定回调
p.then(value => {//改变状态的是同步任务时,先改变状态,再指定回调
  console.log(value)
},reason=>{
  console.log(value)//改变状态的是异步任务时,先指定回调,再改变状态
})
```

# then方法返回结果由什么决定

```javascript
let p = new Promise((resolve, reject) => {
  resolve("ok")
})
let result = p.then(value => {
  //1.抛出错误
  throw "error"//state:rejected; result:"error"
  //2.返回一个非prosmie类型的对象,不return相当于return undefined
  return 123//state:fulfilled; result:123
  //3.返回结果是Promise对象
  return new Promise((resolve,reject)=>{
    resolve("ok")//则then方法的state和result,跟随返回的Promise对象的state和result
  })
}, reason => {
  console.log(resson)
})
console.log(result)
```

# 串联多个任务

```javascript
let p = new Promise((resolve,reject)=>{
  setTimeout(() => {
    resolve("ok")
  },1000);
})
p.then(value=>{
  return new Promise((resolve,reject)=>{
    resolve("success")
  })
}).then(value=>{//无return,相当于return undefined,即state:fulfilled; result:undefiend
  console.log(value)
}).then(value=>{//判断[13]的输出结果
  console.log(value)//undefined
})
```

# 异常穿透

```javascript
//在链式调用的最后指定一个catch(reason=>{}),即可捕获所有环节中失败的回调
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("ok")
  }, 1000);
})
p.then(value => {
  throw "error"//或者返回一个失败的Promise
}).then(value => {
  console.log(1)
}).then(value => {
  console.log(2)
}).catch(reason => {//只会捕获第一个reject的结果,[8]不会被捕获,[4]状态改变后跳转到[13]
  console.warn(reason)
})
```

# 中断Promise链式调用

```javascript
let p = new Promise((resolve,reject)=>{
  setTimeout(() => {
    resolve("ok")
  },1000);
})
p.then(value=>{
  return new Promise(()=>{})//中断promise链有且只有一个方法:返回一个state:pending的promise对象
}).then(value=>{
  console.log(value)
}).then(value=>{
  console.log(value)
})
```

# Promise初始结构搭建

```javascript
function Promise(executor){//创建Promise的构造函数
  this.PromiseState = "pending"//设置属性
  this.PromiseResult = null
  function resolve(){}//pending=>fulfilled
  function reject(){}//pending=>rejected
  executor(resolve,reject)//执行传入的函数参数改变Promise对象的状态
}
Promise.prototype.then = function(){}//创建then方法
```

# resolve与reject结构的搭建

# resolve与reject结构的搭建

```javascript
function Promise(executor){
  this.PromiseState = "pending"
  this.PromiseResult = null
  function resolve(data){
    this.PromiseState = "fulfilled"//pending=>fulfilled
    this.PromiseResult = data
  }
  function reject(data){
    this.PromiseState = "rejected"//pending=>rejected
    this.PromiseResult = data
  }
  executor(resolve,reject)
}
Promise.prototype.then = function(){}
```

# throw抛出异常改变状态

```javascript
function Promise(executor){
  this.PromiseState = "pending"
  this.PromiseResult = null
  function resolve(data){
    this.PromiseState = "fulfilled"
    this.PromiseResult = data
  }
  function reject(data){
    this.PromiseState = "rejected"
    this.PromiseResult = data
  }
  try {//捕获异常
    executor(resolve,reject)
  } catch (err) {//throw抛出的错误值作为实参传入
    reject(err)
  }
}
Promise.prototype.then = function(onResolved,onRejected){}
```

# Promise对象的状态只能修改一次

```javascript
function Promise(executor){
  this.PromiseState = "pending"/
  this.PromiseResult = null
  function resolve(data){
    if(this.PromiseState != "pending") return//状态只能修改一次
    this.PromiseState = "fulfilled"
    this.PromiseResult = data
  }
  function reject(data){
    if(this.PromiseState != "pending") return//状态只能修改一次
    this.PromiseState = "rejected"
    this.PromiseResult = data
  }
  try {
    executor(resolve,reject)
  } catch (err) {
    reject(err)
  }
}
Promise.prototype.then = function(onResolved,onRejected){}
```

# then方法执行回调

```javascript
function Promise(executor){
  this.PromiseState = "pending"
  this.PromiseResult = null
  function resolve(data){
    if(this.PromiseState != "pending") return
    this.PromiseState = "fulfilled"
    this.PromiseResult = data
  }
  function reject(data){
    if(this.PromiseState != "pending") return
    this.PromiseState = "rejected"
    this.PromiseResult = data
  }
  try {
    executor(resolve,reject)
  } catch (err) {//throw抛出的值作为实参传入
    reject(err)
  }
}
Promise.prototype.then = function(onResolved,onRejected){
  if(this.PromiseState === "fulfilled"){//状态改变时,执行回调函数
    onResolved()
  }
  if(this.PromiseState === "rejected"){
    onRejected()
  }//状态改变时,执行回调函数
  if(this.PromiseState === "pending"){}
}
```

# 异步任务回调的执行

```javascript
function Promise(executor){
  this.PromiseState = "pending"
  this.PromiseResult = null
  this.callbacks = {}
  const self = this
  function resolve(data){
    if(self.PromiseState != "pending") return
    self.PromiseState = "fulfilled"
    self.PromiseResult = data
    if(self.callbacks.onResolvd) self.callbacks.onResolved(data)//改变状态后执行then的回调
  }
  function reject(data){
    if(self.PromiseState != "pending") return
    self.PromiseState = "rejected"
    self.PromiseResult = data
  	if(self.callbacks.onRejected) self.callbacks.onRejected(data)//改变状态后执行then的回调
  }
  try {
    executor(resolve,reject)
  } catch (err) {
    reject(err)
  }
}
Promise.prototype.then = function(onResolved,onRejected){
  if(this.PromiseState === "fulfilled"){
    onResolved(this.PromiseResult)
  }
  if(this.PromiseState === "rejected"){
    onRejected(this.PromiseResult)
  }
  if(this.PromiseState === "pending"){
    this.callbacks = {
      onResolved:onResolved,
      onRejected:onRejected
    }
  }
}
```

# 指定多个回调的实现

```javascript
function Promise(executor){
  this.PromiseState = "pending"
  this.PromiseResult = null
  this.callbacks = []//创建对象存储then方法中的回调函数,[32]优化多个回调的实现
  const self = this
  function resolve(data){
    if(self.PromiseState != "pending") return
    self.PromiseState = "fulfilled"
    self.PromiseResult = data
    self.callbacks.forEach(item=>{//从callbacks数组中遍历出then的回调函数
      item.onResolved(data)
    })
  }
  function reject(data){
    if(self.PromiseState != "pending") return
    self.PromiseState = "rejected"
    self.PromiseResult = data
  	self.callbacks.forEach(item=>{//从callbacks数组中遍历出then的回调函数
      item.onResolved(data)
    })
  }
  try {
    executor(resolve,reject)
  } catch (err) {
    reject(err)
  }
}
Promise.prototype.then = function(onResolved,onRejected){
  if(this.PromiseState === "fulfilled"){
    onResolved(this.PromiseResult)
  }
  if(this.PromiseState === "rejected"){
    onRejected(this.PromiseResult)
  }
  if(this.PromiseState === "pending"){//push():压入数组末尾
    this.callbacks.push({
      onResolved:onResolved,
      onRejected:onRejected
    })
  }
}
```



# 同步修改状态then方法结果返回

```javascript
function Promise(executor){
  this.PromiseState = "pending"
  this.PromiseResult = null
  this.callbacks = []
  const self = this
  function resolve(data){
    if(self.PromiseState != "pending") return
    self.PromiseState = "fulfilled"
    self.PromiseResult = data
    self.callbacks.forEach(item=>{
      item.onResolved(data)
    })
  }
  function reject(data){
    if(self.PromiseState != "pending") return
    self.PromiseState = "rejected"
    self.PromiseResult = data
    self.callbacks.forEach(item=>{
      item.onResolved(data)
    })
  }
  try {
    executor(resolve,reject)
  } catch (err) {
    reject(err)
  }
}
Promise.prototype.then = function(onResolved,onRejected){
  return new Promise((resolve,reject)=>{//使then返回Promise对象
    if(this.PromiseState === "fulfilled"){
      try {//throw捕获
        let res = onResolved(this.PromiseResult)
        if(res instanceof Promise){//对then指定回调返回的数据进行判断
          res.then(v=>{//Promise
            resolve(v)
          },r=>{
            reject(r)
          })
        }else{//非Promise
          resolve(result)
        }
      } catch(err){
        reject(err)
      }
    }
    if(this.PromiseState === "rejected"){
      try {//throw捕获
        let res = onRejected(this.PromiseResult)
        if(res instanceof Promise){//对then指定回调返回的数据进行判断
          res.then(v=>{//Promise
            resolve(v)
          },r=>{
            reject(r)
          })
        }else{//非Promise
          resolve(result)
        }
      } catch(err){
        reject(err)
      }
    }
    if(this.PromiseState === "pending"){
      this.callbacks.push({
        onResolved:onResolved,
        onRejected:onRejected
      })
    }
  })
}
```

# 异步修改状态then方法结果返回

```javascript
function Promise(executor){//创建Promise的构造函数
  this.PromiseState = "pending"//设置属性
  this.PromiseResult = null
  this.callbacks = []//创建对象存储then的指定回调,[32]优化多个回调的实现
  const self = this
  function resolve(data){
    if(self.PromiseState != "pending") return//状态只能修改一次
    self.PromiseState = "fulfilled"//pending=>fulfilled
    self.PromiseResult = data
    self.callbacks.forEach(item=>{//从callbacks数组中遍历出then的指定回调
      item.onResolved(data)
    })
  }
  function reject(data){
    if(self.PromiseState != "pending") return//状态只能修改一次
    self.PromiseState = "rejected"//pending=>rejected
    self.PromiseResult = data
    self.callbacks.forEach(item=>{//从callbacks数组中遍历出then的指定回调
      item.onResolved(data)
    })
  }
  try {//捕获异常
    executor(resolve,reject)
  } catch (err) {//throw抛出的值作为实参传入
    reject(err)
  }
}
Promise.prototype.then = function(onResolved,onRejected){//创建then方法
  return new Promise((resolve,reject)=>{//使then返回Promise对象
    if(this.PromiseState === "fulfilled"){//状态改变时执行then的指定回调
      try {//throw捕获
        let res = onResolved(this.PromiseResult)
        if(res instanceof Promise){//对then指定回调返回的数据进行判断
          res.then(v=>{//Promise
            resolve(v)
          },r=>{
            reject(r)
          })
        }else{//非Promise
          resolve(result)
        }
      } catch(err){
        reject(err)
      }
    }
    if(this.PromiseState === "rejected"){//状态改变时执行then的指定回调
      try {//throw捕获
        let res = onRejected(this.PromiseResult)
        if(res instanceof Promise){//对then指定回调返回的数据进行判断
          res.then(v=>{//Promise
            resolve(v)
          },r=>{
            reject(r)
          })
        }else{//非Promise
          resolve(result)
        }
      } catch(err){
        reject(err)
      }
    }
    if (this.PromiseState === "pending") {//push():压入数组末尾
      this.callbacks.push({//指定多个回调的实现
        onResolved: function () {
          try {
            let result = onResolved(self.PromiseResult)
            if (result instanceof Promise) {
              result.then(v => {
                resolve(v)
              }, r => {
                reject(r)
              })
            } else {
              resolve(result)
            }
          } catch (error) {
            reject(error)
          }
        },
        onRejected: function () {
          try {
            let result = onRejected(self.PromiseState)
            if (result instanceof Promise) {
              result.then(v => {
                resolve(v)
              }, r => {
                reject(r)
              })
            } else {
              resolve(result)
            }
          } catch (error) {
            reject(error)
          }
        }
      })
    }
  })
}
```

# then方法完善与优化

```javascript
function Promise(executor) {//创建Promise的构造函数
  this.PromiseState = "pending"//设置属性
  this.PromiseResult = null
  this.callbacks = []//创建对象存储then的指定回调,[32]优化多个回调的实现
  const self = this
  function resolve(data) {
    if (self.PromiseState != "pending") return//状态只能修改一次
    self.PromiseState = "fulfilled"//pending=>fulfilled
    self.PromiseResult = data
    self.callbacks.forEach(item => {//从callbacks数组中遍历出then的指定回调
      item.onResolved(data)
    })
  }
  function reject(data) {
    if (self.PromiseState != "pending") return//状态只能修改一次
    self.PromiseState = "rejected"//pending=>rejected
    self.PromiseResult = data
    self.callbacks.forEach(item => {//从callbacks数组中遍历出then的指定回调
      item.onRejected(data)
    })
  }
  try {//捕获异常
    executor(resolve, reject)
  } catch (err) {//throw抛出的值作为实参传入
    reject(err)
  }
}
Promise.prototype.then = function (onResolved, onRejected) {
  const self = this
  return new Promise((resolve, reject) => {
    function callback(type) {//增加代码复用性
      try {//throw捕获
        let result = type(self.PromiseResult)
        if (result instanceof Promise) {//对then指定回调返回的数据进行判断
          result.then(v => {
            resolve(v)
          }, r => {
            reject(r)
          })
        } else {
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }
    if (this.PromiseState === "fulfilled") callback(onResolved)
    if (this.PromiseState === "rejected") callback(onRejected)
    if (this.PromiseState === "pending") {
      this.callbacks.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        }
      })
    }
  })
}
```

# promise.catch()_异常穿透与值传递

```javascript
Promise.prototype.then = function (onResolved, onRejected) {
  const self = this
  if(typeof onRejected != "function"){//异常穿透的实现
    onRejected = reason=>{
      throw reason
    }
  }
  return new Promise((resolve, reject) => {
    function callback(type) {
      try {
        let result = type(self.PromiseResult)
        if (result instanceof Promise) {
          result.then(v => {
            resolve(v)
          }, r => {
            reject(r)
          })
        } else {
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    }
    if (this.PromiseState === "fulfilled") callback(onResolved)
    if (this.PromiseState === "rejected") callback(onRejected)
    if (this.PromiseState === "pending") {
      this.callbacks.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        }
      })
    }
  })
}
Promise.prototype.catch = function(){//catch方法的实现
  return this.then(undefined,onRejected)
}
```

# promise.resolve()封装

```javascript
Promise.resolve = function(value){
    return new Promise((resolve,reject)=>{
        if(value instanceof Promise) {
            value.then(v=>{
                resolve(v)
            },r=>{
                reject(r)
            })
        }else{
            resolve(value)
        }
    })
}
```

# promise.reject()封装

```javascript
Promise.reject = function(reason){
    return new Promise((resolve, reject)=>{
        reject(reason);
    });
}
```

# promise.all()封装

```javascript
Promise.all = function(promises){
    return new Promise((resolve, reject) => {
        let count = 0;
        let arr = [];
        for(let i=0;i<promises.length;i++){
            promises[i].then(v => {
                count++;
                arr[i] = v;
                if(count === promises.length){
                    resolve(arr);
                }
            }, r => {
                reject(r);
            });
        }
    });
}
```

# promise.race()封装

```javascript
Promise.race = function(promises){
    return new Promise((resolve, reject) => {
        for(let i=0;i<promises.length;i++){
            promises[i].then(v => {
                resolve(v);
            },r=>{
                reject(r);
            })
        }
    });
}
```

# then方法回调的异步执行

以下为自定义Promise的全部代码

```javascript
function Promise(executor){
    this.PromiseState = 'pending';//添加属性
    this.PromiseResult = null;
    this.callbacks = [];
		const self = this;//保存实例对象的 this 的值
    function resolve(data){//resolve()
        if(self.PromiseState !== 'pending') return;//判断状态
        
        self.PromiseState = 'fulfilled';////1. resolve修改promiseState
        self.PromiseResult = data;//2.resolve设置promiseResult        
        setTimeout(() => {//指定回调的异步执行
            self.callbacks.forEach(item => {//异步修改状态
                item.onResolved(data);
            });
        });
    }
    function reject(data){
        if(self.PromiseState !== 'pending') return;
        self.PromiseState = 'rejected';
        self.PromiseResult = data;
        setTimeout(() => {
            self.callbacks.forEach(item => {
                item.onRejected(data);
            });
        });
    }
    try{//捕获异常
        executor(resolve, reject);
    }catch(e){
        reject(e);
    }
}
Promise.prototype.then = function(onResolved, onRejected){//添加then()
    const self = this;
    if(typeof onRejected !== 'function'){//判断回调函数参数
        onRejected = reason => {
            throw reason;
        }
    }
    if(typeof onResolved !== 'function'){
        onResolved = value => value;
    }
    return new Promise((resolve, reject) => {
        function callback(type){//封装函数,增加代码复用性
            try{
                let result = type(self.PromiseResult);
                if(result instanceof Promise){//判断
                    result.then(v => {
                        resolve(v);
                    }, r=>{
                        reject(r);
                    })
                }else{
                    resolve(result);
                }
            }catch(e){
                reject(e);
            }
        }
        if(this.PromiseState === 'fulfilled'){
            setTimeout(() => {//指定回调的异步执行
                callback(onResolved);
            });
        }
        if(this.PromiseState === 'rejected'){
            setTimeout(() => {
                callback(onRejected);
            });
        }
        if(this.PromiseState === 'pending'){//判断pending状态
            this.callbacks.push({//保存回调函数
                onResolved: function(){
                    callback(onResolved);
                },
                onRejected: function(){
                    callback(onRejected);
                }
            });
        }
    })
}
Promise.prototype.catch = function(onRejected){//添加catch()
    return this.then(undefined, onRejected);
}
Promise.resolve = function(value){//添加resolve()
    return new Promise((resolve, reject) => {
        if(value instanceof Promise){
            value.then(v=>{
                resolve(v);
            }, r=>{
                reject(r);
            })
        }else{
            resolve(value);
        }
    });
}
Promise.reject = function(reason){//添加reject()
    return new Promise((resolve, reject)=>{
        reject(reason);
    });
}
Promise.all = function(promises){//添加all()
    return new Promise((resolve, reject) => {
        let count = 0;
        let arr = [];
        for(let i=0;i<promises.length;i++){
            promises[i].then(v => {
                count++;
                arr[i] = v;
                if(count === promises.length){
                    resolve(arr);
                }
            }, r => {
                reject(r);
            });
        }
    });
}
Promise.race = function(promises){//添加race()
    return new Promise((resolve, reject) => {
        for(let i=0;i<promises.length;i++){
            promises[i].then(v => {
                resolve(v);
            },r=>{
                reject(r);
            })
        }
    });
}
```

# class版本封装

# async函数

**async:**

1. 函数的返回值是一个Promise对象
2. Proimse对象的状态由async函数执行后的返回值决定

```javascript
async function main(){// main函数返回的是一个Promised
  //1.返回非Promise
  return 521//State:fulfledd;Result:521
  //2.
  return new Promise((resolve,reject)=>{//返回Promise:状态由Promise的状态决定,值由Promise的值决定
    resolve("ok")//State:fulfledd;Result:ok
  })
  //3.抛出异常:rejected
  retrun throw "error"//Result:error
}
```

# await表达式

1. await右侧的表达式一般为Promise对象,但也可以是其它的值
2. 如果表达式是Promise对象,await返回的是Promise成功的值
3. 如果表达式是其它值,直接将此值作为await的返回值
4. await必须写在async函数中,但async函数中可以没有await
5. 如果await的promise失败了,就回抛出异常,需要通过try...catch捕获处理

```javascript
async function main() {
  let p = new Promise((resolve, reject) => {
    resolve("ok")//reject("error")
  })
  //1.右侧为Promise:返回成功的值
  let res = await p//res:ok
  console.log(res)
  
  //2.右侧为失败的Promise对象
  try {//修改p为reject或throw
    let res2 = await p//返回成功的值
    } catch (error) {
      console.log(error);//返回失败的值
    }
  //3.右侧为其它类型的数据:直接将此值输出
  let res1 = await 20//res1:20
  console.log(res1);
}
main()
```

# async和await结合

``````javascript
const fs = require("fs")
const util = require("util")
const mineReadFile = util.promisify(fs.readfile)
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
``````

# async结合await发送AJAX请求

```javascript
function sendAJAX(url){
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("GET", url);
    xhr.send();
    //处理结果
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4){
        //判断成功
        if(xhr.status >= 200 && xhr.status < 300){
          //成功的结果
          resolve(xhr.response);
        }else{
          reject(xhr.status);
        }
      }
    }
  });
}
//段子接口地址 https://api.apiopen.top/getJoke
let btn = document.querySelector('#btn');
btn.addEventListener('click',async function(){
  //获取段子信息
  let duanzi = await sendAJAX('https://api.apiopen.top/getJoke');
  console.log(duanzi);
});
```

