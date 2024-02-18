# ES6

## 课程介绍

ECMA(European Computer Manufacturers Association)中文名称为欧洲计算机制造商协会

ECMAScript是由Ecma国际通过ECMA-262标准化的脚本程序设计语言

ES6:ES6的版本变动内容最多,具有里程碑意义,加入许多新的语法特性,编程实现更简单,高效

http://kangax.github.io/compat-table/es6/可查看兼容性

ES6是一套文件,每个浏览器根据发展,会出现各家支持的功能可能不同

## ECMA script相关概念和名词

## let变量声明以及声明特性

声明变量推荐使用let

**let特性:1)不存在变量提升,2)变量不能重复声明,3)变量是块级作用域,4)不影响作用域链**

```JavaScript
let a;//let声明变量,可以在之后赋值
let f = 66423 , g = 'Maaya'
{//1.变量不能重复声明,2.块级作用域 ES5中有三种作用域:全局,函数,eval,只在代码块中生效即块级作用域
  var boy = 'my'//var可以在全局中生效
  let boy = 'me'//boy变量已经被var声明了,此处无发用let重复声明,即使[4][5]两行调换顺序也不行
  }
console.log(boy)//可以读取到var声明的boy,但因为let的重复声明导致了error

console.log(song)//var有变量提升
var song = '姐姐'
console.log(sister)//3.let不存在变量提升
let sister = '姐姐'
{//不影响作用域链
  let school = '尚硅谷'
  function fn(){
    console.log(school)//本作用域链找不到school
  }
  fn()
}
```

## let经典案例实践

```JavaScript
//点击方框更改方框的颜色
let items = documents.getElementsById('item')
for(let i=0,i<items.length,i++){//for(){},相当于循环创造多个{}块级作用域
  items[i].onclick = function(){
    items.style.background = blue
  }
}
```

```javascript
{var a = 1}
{var a = 2}
{var a = 3}
console.log(a)//a = 3
```

## const声明常量以及特点

**const特点:**

1. 必须要赋初始值
2. 一般常量使用大写(潜规则),小写可以但不推荐
3. 常量的值不能再次赋值修改
4. 是块级作用域
5. 对于数组和对象的元素修改,不算做对常量的修改,因为常量指向的地址没有变化,因此不会报错

```javascript
const SCHOOL = '尚硅谷';//声明常量用const
const A//false,1.必须要赋初始值
const a = 100//2.一般常量使用大写(潜规则),小写可以但不推荐
SCHOOL = 'ATGUIGU'//false,3.常量的值不能再次赋值修改
{const PLAYER = 'UZI'} 
console.log(PLAYER) //4. 是块儿级作用域
const TEAM = ['UZI', 'MXLG', 'Ming', 'Letme']
TEAM.push('Meiko');//5.对于数组和对象的元素修改,不算做对常量的修改,因为常量指向的地址没有变化,因此不会报错
```

## 变量的解构赋值

ES6允许按照一定模式,从数组和对象中提取值,对变量进行赋值,这被称为解构赋值

```javascript
const arr = ['姐姐','真绫','如月']//创建数组
let [sis,maaya,ry] = arr;
console.log(sis)//解构之后,成为当前作用域对象的属性.此时为window的属性
const ry = {
  name:'ruyue',
  age:18,
  sister:function(){
    console.log('姐姐')//此时sister()是ry对象的方法
  }
}
let {sister} = ry//只能解构ry对象的中名字相同的属性
sister()//this指向window
```

## 模板字符串

模板字符串(template string)是增强版的字符串,用反引号(``)标识

特点:1)字符串中可以出现换行符,2)可以使用${xxx}形式输出变量

```javascript
const str = `我也是一个字符串`
console.log(str,typeof str) 
let sister = `<ul>
                <li>Maaya</li>
                <li>Maaya</li>
                <li>Maaya</li>
              </ul>`//可以直接使用换行符
console.log(sister)
let lovest = 'Maaya'
let out = `${lovest}是我的姐姐`//可以直接进行变量拼接
console.log(out)
```

## 对象的简化写法

ES6允许在大括号里面,直接写入变量和函数,作为对象的属性和方法,这样的书写更加简洁

```javascript
let Sis = '姐姐'
let fn = function(){
  console.log('姐姐')
}
const ry = {
  Sis,
  fn,
  improve(){
    console.log("书写简化")//简化了function
  }
} 
```

## 箭头函数以及声明特点

**ES6允许使用箭头`=>`定义函数**

```javascript
window.name = "maaya"
const sister = {name:"ruyue"}
let fn = function(){//普通函数定义方式是谁调用,就指向谁
  console.log(this.name)
}
let fn1 = ()=>{//箭头函数是this静态的,this始终指向函数声明时所在作用域下的this的值
  console.log(this.name)
}
fn.call(sister)//ruyue,this指向sister
fn1.call(sister)//maaya,this指向window
```

```javascript
let Person = () => {//箭头函数不能作为构造实例化对象
  this.name = name,
    this.age = age
}
let me = new Person('maaya', 18)
console.log(me)//报错
```

```javascript
let fn2 = () => {
  console.log(arguments)
}
fn2(1,2,3)//箭头函数中不能使用arguments变量,输出的arguments数组中不存在实参1,2,3
function fn3(){
  console.log(arguments)
}
fn3(1,2,3)//arguments数组存在1,2,3
```

```javascript
let add = n => {//当形参有且只有一个的时候,省略小括号,
  return n;
}
```

```javascript
let add1 = n => n//当只有一条代码语句的时候可以省去花括号,如果此语句是return的话,return也可以去掉
//等于let add1 = (n) => {return n;}
let fn = n  => console.log(n)
```

## 箭头函数的实践与应用场景

箭头函数:

1. 适合与this无关的回调,例如定时器,数组的方法回调
2. 不适合与this有关的回调,事件回调,对象的方法

```javascript
//点击div,div元素在2s后变为蓝色
let ad = document.getElementById('ad')//获取元素
ad.addEventListener('click', function () {//绑定事件
  //let _this = this; 1.保存this的值
  setTimeout(() => {//不使用箭头函数写法时,因为定时器是回调函数,所以是被window调用的
    //_this.style.background = 'blue'; 2.修改颜色
    this.style.background = 'blue'//箭头函数的this静态的,thi始终指向函数声明时所在作用域下的this的值,此时setTimeout属于ad
  }, 2000)
})
```

```javascript
//从数组中返回偶数的方法
const arr  = []
const result = arr.filter(item => item % 2 === 0)
```

## 函数参数的默认值设置

ES6允许给函数参数赋值初始值

形参初始值,具有默认值的参数,一般位置要靠后(默认规则),否则会导致报错

形参可以直接解构,并且设置初始值

```javascript
function fn(a,b,c=10){//b和c两个参数互换位置
  return a+b+c
}
fn(1,2)//b和c位置调换,则return NaN,因为c=2,b=undefined
function connect({host='127.0.0.1',username}){
  console.log(host)
}
connect({//解构赋值域函数参数默认值的结合使用
  host:'localhost',
  username:'Maaya'
})

```

## rest参数

ES6引入**rest参数`...`**,用于获取函数的实参,**用来代替arguments**

```javascript
//ES5获取实参
function date(){
  console.log(arguments)
}
data('RY','Maaya')
```

```javascript
//ES6获取实参....arguments也可以是全部参数,arguments可以是任意单词
function fn(a,b,...arguments){//function(...arguments){}
  console.log(a)
	console.log(b)
	console.log(args)//输出时不用加...,且arguments是一个真数组
}
fn(1,3,5,7,9)
//function(a,..arguments,b){}:这个格式不行
```

## 扩展运算符的介绍

**扩展运算符(spread)**也是三个点**`...`**,它好比rest参数的逆运算,将一个数组转为用逗号分隔的参数序列,对数组进行解包

```javascript
const sis = ['如','月','真','绫']
function sister(){
  console.log(arguments[0])
}
sister(name)//输出数组['如','月','真','绫']
sister(...name)//输出"如"
```

## 扩展运算符的应用

**浅拷贝:只复制指要拷贝的引用数据类型元素的地址,即复制者和被复制者指向的仍然是同一块堆内存**

```javascript
const Sis = ['姐姐','如月']
const Ry = ['如月','真绫']
const love = [...Sis,...Ry]//数组合并
const Sis1 = [...Sis]//数组克隆,如果拷贝的元素有引用数据类型的话,本克隆就是一个浅拷贝
const FalseArr = document.querySelectorAll('div')
const arr = [...FalseArr]//伪数组转化为真正的数组
```

## Symbol的介绍

ES6引入了一种新的原始数据类型Symbol,表示独一无二的值.它是JavaScript语言的第七种数据类型,类似于字符串的数据类型

1. Symbol的值是唯一的,用来解决命名冲突的问题
2. Symbol值不能与其他数据进行运算
3. Symbol定义的对象属性不能使用for…in循环遍历,但是可以使用**`Reflect.ownKeys`**来获取对象的所有键名

```javascript
let s = symbol()
let sis = s + 100//error,无法将symbol类型的值转换为number
```

```javascript
//方法1.symbol
const Sis = Symbol('我是描述字符串')//在本部分中symbol是作为函数
console.log(Sis,typeof Sis)
const Sis1 = Symbol('我是描述字符串')
console.log(Sis === Sis1)//false
```

```javascript
//方法2.Symbol.for()
let s3 = Symbol.for("姐姐")//在本部分中symbol作为对象,被称为函数对象
let s4 = Symbol.for("姐姐")//如果描述字符串不是"姐姐",则下面输出:false
console.log(s3 === s4)//true,就像同名的两个人,身份证号码不同

```

## 对象添加Symbol类型的属性

```javascript
//向对象中添加方法up down
let game =  {
  up:"姐姐",
  down:"真绫"
}
let methods = {
  up:Symbol(),
  down:Symbol()
}
game[methods.up] = function(){//不确定game中有哪些变量,所以我创建了一个Symbol()函数,它具有唯一的值,然后代到game中用它创建属性名,相当于随机的UID
  console.log('我可以改变形状')
}
game[methods.down] = function(){
  console.log('我可以快速下降')
}
console.log(game)//虽然后两个属性名显示的是Symbol(),但本质上就是一个随机不重复的数据
```

```javascript
let game1 = {
  name:'姐姐',
  [Symbol('如月')]:function(){
    console.log('真绫')
  },
  [Symbol('如月')]:function(){//使用Symbol的好处就是,这样属性名重复也没关系了
    console.log('姐姐')
  }
}
console.log(game1)
```

## Symbol的内置属性

除了定义自己使用的Symbol值以外,**ES6还提供了11个内置的Symbol的属性值**,指向语言内部使用的方法.可以称这些方法为魔术方法,因为它们会**在特定的场景下自动执行**

```javascript
class Person{//class暂时没学到
  static [Symbol.hasinstance](parameter){//对象o作为参数传入,
    console.log(parameter)
    console.log('我被用来检测了')
    return false//[11]行返回的值,就等于这个属性对象返回的值
  }
}
let o = {
  name:'Maaya
}
console.log(o instanceof Person)
```

```javascript
const arr = [1,2]
const arr1 = [3,4]
console.log(arr.concat(arr1));//将arr和arr1合并,输出[1,2,3,4]
arr1[Symbol.isConcatSpreadable] = false//设置arr1不可展开
console.log(arr.concat(arr1))//输出[1,2,[3,4]]
```

## 迭代器的介绍

**遍历器(Iterator)是一种机制:**

它是一种接口,为各种不同的数据结构提供统一的访问机制,**任何数据结构只要部署Iterator接口,就可以简单完成遍历操作**

1. ES6创造了一种新的遍历命令for...of循环,Iterator接口主要提供for...of方法
2. **原生具备Iterator接口的数据(可用for...of遍历):Array;Arguments;Set;Map;String; TypedArray;NodeList**

```javascript
const arr = ['m','a','a','y','a']
for(let v in arr){//使用for...in遍历数组,得到的是索引
  console.log(v)//console.log(arr[v]):这样输出的才与[6]相同
}
for(let v of arr){//for of循环遍历得到的是键值
  console.log(v)//因为数组里带有Symbol.iterator方法所以可以直接用for..of遍历数组,
}
```

iterator工作原理:

1. 创建一个指针对象,指向当前数据结构的起始位置
2. 第一次调用对象的next方法,指针自动指向数据结构的第一个成员
3. 接下来不断调用next方法,指针一直往后移动,直到指向最后一个成员
4. 每调用next方法返回一个包含value和done属性的对象

```javascript
const arr = ['m','a','a','y','a']
for(let v in arr){
  console.log(v)
}
for(let v in arr){
  console.log(v)
}
let itertor = arr[Symbol.itertor]()//直接调用数组的Symbol属性,这是一个方法,arr.方法,输出了一个对象
console.log(typeof iterator)//输出Object
console.log(iterator.next());//调用对象的next()方法,并且指针自动指向数据结构的第一个成员"m"
console.log(iterator.next());//继续调用,指针指向下一个成员
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());//最后一个成员
console.log(iterator.next());//调用完之后,最后一个值会是undefined,done:true,true代表遍历已经结束
```

## 迭代器应用_自定义遍历数据

```javascript
const Sis = {
  name:'姐姐',
  status:[
    'M',
    'a',
    'a',
    'y',
    'a'
  ],
  [Symbol.itertor](){//对象方法的简写:[Symbol.itertor]:function(){}
    let index = 0 
    let _this = this
    return {
      next: function(){
        if(idnex < _this.stus.length){
          const result = {value:_this.stus.length,done:false}
          index++
          return result
        }else{
          return {value: undefined, done: true};
        }
      }
    }
  }
}
for (let s of Sis){//对象是没有iterator接口的
  console.log(s)
}
for (let c of Sis.stus) {//和[26]-[28]效果一样
  console.log(c);
}
```

## 生成器函数声明与调用

生成器其实就是一个特殊的函数,是专门针对异步编程的解决方案

异步编程:纯回调函数,node,fs,ajax,mongodb

```javascript
function* gen() {//无法直接执行生成器函数
  console.log(111)
  console.log("姐姐我爱你")
  yield '一只没有耳朵'//生成器函数可以出现yield语句,作为函数代码的分隔符
  console.log(222)
  yield '一只没有尾部'
  console.log(333)
  yield '真奇怪'
  console.log(444)
}
let iterator = gen();//变量iterator指向的是一个对象
console.log(iterator)
console.log(iterator.next());//从一个yield语句开始,每调用一次next()方法,就输出一个对象
//这个对象是 {value:"一只没有耳朵",done:false}
//并且这个yield语句之前的代码也会被执行

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());//最后一个是输出:{value:undefined,done:true}
//遍历
for (let v of gen()) {
  console.log(v);
}
```

## 生成器函数的参数传递

```javascript
function* gen(arg) {
  console.log(arg);
  let one = yield 111;//one的value是[13]传入的参数"BBB"
  console.log(one);
  let two = yield 222;//two的value是[14]传入的参数"CCC"
  console.log(two);
  let three = yield 333;//同理
  console.log(three);
}
//执行获取迭代器对象
let iterator = gen('AAA');
console.log(iterator.next());//此处不能传参
console.log(iterator.next('BBB'));//在next语句传入一个实参时,相当于在gen("")中传入实参
console.log(iterator.next('CCC'));//第一次在next方法中传入实参后,必定会执行第一段代码+第一个yield语句
console.log(iterator.next('DDD'));//第二次在在next方法中传入实参后,必定会执行第一段代码+第二个yield语句
```

## 生成器函数实例

异步编程:文件操作,网络操作(Ajax,request),数据库操作等都是异步操作

```javascript
//1s后控制台输出1,2s后输出2,3s后输出3
setTimeout(() => {//回调地狱
  console.log(111);
  setTimeout(() => {
    console.log(222);
    setTimeout(() => {
      console.log(333);
    }, 3000);
  }, 2000);//输出完1后,再过2s再输出2
}, 1000);
```

```javascript
function one() {
  setTimeout(() => {
    console.log(111);
    iterator.next();
  }, 1000)
}
function two() {
  setTimeout(() => {
    console.log(222);
    iterator.next();
  }, 2000)
}
function three() {
  setTimeout(() => {
    console.log(333);
    iterator.next();
  }, 3000)
}
function * gen() {
  yield one();//yield语句后面跟随的是一个函数或方法,那么它将会被执行,不会被保存到对象中
  yield two();//如果是一个基础数据类型的值,则保存到对象中{value:"xxx",done:false}
  yield three();
}
let iterator = gen();//调用生成器函数
iterator.next;
}
```

## 生成器函数实例

```javascript
//模拟获取按顺序用户数据,订单数据,商品数据
function getUsers() {
  setTimeout(() => {
    let data = '用户数据';
    iterator.next(data);
  }, 3000);
}
function getOrders() {
  setTimeout(() => {
    let data = '订单数据';
    iterator.next(data);
  }, 3000)
}
function getGoods() {
  setTimeout(() => {
    let data = '商品数据';
    iterator.next(data);
  }, 3000)
} 
function* gen() {
  console.log("我最先执行")
  let users = yield getUsers();
  console.log(users)
  let orders = yield getOrders();
  console.log(orders)
  let goods = yield getGoods();
  console.log(goods)
}
//调用生成器函数
let iterator = gen();
iterator.next();
```

## Promise介绍与基本使用

Promise是一个构造函数,用来封装异步操作并可以获取其成功或失败的结果,是ES5引入的异步编程的新解决方案

```javascript
//实例化Promise 对象
const p = new Promise(function (resolve, reject) {//只能是reject和resolve
  setTimeout(function () {=
    let data = '数据库中的用户数据'
    resolve(data);//上传data参数,并且将p的状态改变为reject,或者resolve
    let err = "失败"//reject(err)
  }, 1000)
})
p.then(function (resolve) {//这里的resolve和reject可以是任意的参数名,因为上面的resolve和reject不是调用参数,而是接收返回值,并且执行成功或失败的函数
  console.log(resolve)
}, function (reject) {
  console.log(reject)
})
```

## Promise封装读取文件

```javascript
//异步读取文件方法一
const fs = require("fs")
fs.readFile("1.课程介绍.html",(err,data)=>{
  if(err) throw err
  console.log(data.toString())
})
//使用promise封装,异步读取文件方法二
const p = new Promise(function(resolve,reject){//
  fs.readFile("1.课程介绍.html",(err,data)=>{
    if(err) throw reject (err)//当if函数只有一行代码时,(){}可以省略
    resolve(data)
  })
})
p.then(function(value){
  console.log(value.toString())
},function(reason){
  console.log("读取失败")
})
```

## Promise封装Ajax

```javascript
const p = new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest()
  xhr.open("GET", "https://api.apiopen.top/getJoke")
  xhr.send()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response)//成功:返回xhr.response且执行第一个函数
      } else {
        reject(xhr.status)//失败执行
      }
    }
  }
})
p.then((value)=>{
  console.log(value)
},(reason)=>{
  console.log(reason)
})
```

## Promise.prototype

链式调用解析:

```javascript
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Maaya")
  }, 1000)
})
const result = p.then(value=>{//then方法的返回结果是Promise对象,对象状态由回调函数的执行结果决定,即result返回的是一个Promise对象
  console.log(value)
  //非Promise类型的值
  return 123//123是一个非Promise类型的值,且是成功(resove)的回调函数,则返回值为对象的成功的值
  
  //Promise类型的值
  return new Promise((resolve, reject) => {//这时候回调函数返回的promise类型的属性
    reject("ok")//这时候的状态决定了回调函数的状态,而返回值也是此时的值
  })
  
  //抛出错误
  throw new Error("出错了")//此时的状态时reject,值也是"出错了"
},reason=>{
  console.log(error)
})
```

实例:有点不好理解,需要配合视频

```javascript
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Maaya")
  }, 1000)
})
//链式调用
p.then(value=>{
  
},reason=>{
  
}).then(value=>{
  
},reason=>{
   
})
```

## 多个文件内容的读取

```javascript
//回调地狱方式解决
const fs = require("fs")
fs.readFile("模板.html", function (err, data) {//问题1:变量易重名
  fs.readFile("模板.html", function (err, data1) {
    fs.readFile("模板.html", function (err, data2) {
      let result = data1 + '\r\n' +data2  +'\r\n'+ data3;
      console.log(result )
    })
  })
})
```

```javascript
//Promise解决回调地狱
const p = new Pormise((resove,reject)=>{
  fs.readfile("./Maaya.txt",(err,data)=>{
    resolve(data)
  })
})
p.then(value=>{
  return new Promise((resolve,reject)=>{
    fs.readfile("./Maaya.txt",(err,data)=>{
      resolve([value,data])
    })
  })
}).then(value => {
    return new Promise((resolve, reject) => {
        fs.readFile("模板.html", (err, data) => {            
            value.push(data);//压入
            resolve(value);
        });
    })
}).then(value => {
    console.log(value.join('\r\n'));
});
```

## Promise的catch方法

```javascript
const p = new Promise((resolve,reject)=>{
  setTimeout(()=>{
    reject("出错啦")
  },1000)
})
p.then(value=>{},reason=>{console.error(reason)})//指定回调
//catch是一个语法糖
p.catch(reason=>{//不指定第一个参数,那么catch() = then()
  console.error(reason)
})
```

## 集合介绍与API

**set:是一个集合和数组类似,但本质还是一个对象,可以使用iterator接口**

```javascript
let s = new Set()
let s2 = new Set(["1","2","1","2"])//会自动去重
console.log(s2,typeof s)//返回Object
console.log(s2.size)//查看长度
s2.add("3")//添加元素
console.log(s2)
s2.delete("2")//删除
console.log(s2)
console.log(s2.has("2"))//检测
//s2.clear()//清空
console.log(s2)
for(let v of s2){
  console.log(v)
}
```

## 集合实践

```javascript
let arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];
console.log([...new Set(arr)])//数组去重:先转换为集合去重,再通过扩展符转为数组
```

```javascript
//item应该是[..new Set(arr)]
let result = [...new Set(arr)].filter(item => new Set(arr2).has(item));//测试数组的交集,filter是过滤函数
```

```javascript
let union = [...new Set([...arr, ...arr2])];//并集
console.log(union);
```

```javascript
//差集:两个数组,一个数组为主体,它拥有另一个数组中没有的元素,两个数组主体则结果也可能不一样
let diff = [...new Set(arr)].filter(item => !(new Set(arr2).has(item)));//差集
```

## Map的介绍与API

ES6提供了Map数据结构,类似于对象,并且有iterator接口可以使用个扩展运算符,和`for...of`遍历方法(API)

```javascript
let m = new Map();
m.set('name', '尚硅谷');//添加元素
console.log(m)//输出:Map{"name"=>"尚硅谷"}
m.set('change', function () {//[4]:键名是字符串,键值是一个函数
  console.log("我们可以改变你!!");
});
```

```javascript
let key = {
  school: 'ATGUIGU'
};
m.set(key, ['北京', '上海', '深圳']);//键名是一个对象,键值是一个字符串
console.log(m.size)//长度
m.delete('name')//通过键名删除键

console.log(m.get('change'));//可以通过键名或者键值获取对应的另一个值
```

```javascript
for(let v of m){//遍历出的结果是一个 键名+键值的数组
  console.log(v);
```

## class的介绍与初体验

```javascript
//使用class类创建构造函数
class Phone{
  constructor(name,age){//这里的方法名必须是constructor
    this.name = name,//这里为实例对象添加属性
    this.age = age
  }
  fn(){//必须使用该格式添加方法
    console.log("我是一个方法")
  }
}
let sis = new Phone()//创建实例对象是一样的流程
```

## class静态成员

```javascript
function Phone() {}
Phone.name = "手机"//但是构造函数本身也是一个对象,所以可以给他添加属性
Phone.change = function () {
  console.log("我可以改变世界");
}
Phone.prototype.size = "5.5yc"
//但是Phone实例对象的属性无法指向Phone函数对象的属性
let nokia = new Phone();
console.log(nokia.name);//输出undefined,这就是静态属性
nokia.change();//error
nokia.size//但是原型对象上添加是可以解决这个问题的
```

```javascript
class Phone {
  static name = '手机';//静态属性
  static change() {//静态方法
    console.log("我可以改变世界");
  }
}
let nokia = new Phone();
console.log(nokia.name);
console.log(Phone.name);
```

## ES6构造函数继承

**ES5中的构造继承**

**父级构造函数与子级构造函数**

```javascript
function Phone(brand, price) {//假设为父类构造方法,父类和子类只是我们随意定义关系
  this.brand = brand;
  this.price = price;
}
Phone.prototype.call = function () {
  console.log("我可以打电话");
}
function SmartPhone(brand, price, color, size) {//假设为子类构造方法
  Phone.call(this, brand, price);//万一父类的属性变了,这里直接写this.brand到时候也要变,所以用call
  this.color = color;
  this.size = size;
}
//设置子级构造函数的原型
SmartPhone.prototype = new Phone;//调用父类的方法
SmartPhone.prototype.constructor = SmartPhone;//这一行可以不要,老师说的

//声明子类的方法
SmartPhone.prototype.photo = function () {
  console.log("我可以拍照")
}
const chuizi = new SmartPhone('锤子',2499,'黑色','5.5inch');
console.log(chuizi);
```

## class构造继承的继承

```javascript
class Phone {//父类构造方法
  constructor(brand, price) {//父类的成员属性
    this.brand = brand;
    this.price = price;
  }
  call() {
    console.log("我可以打电话!!");
  }
}
class SmartPhone extends Phone {//子类构造方法,这里必须加extends才能继承父类的属性和方法
  constructor(brand, price, color, size) {
    super(brand, price);//调用父类的构造方法作为初始化 相当于Phone.call(this, brand, price)
    this.color = color;
    this.size = size;
  }
  photo() {
    console.log("拍照");
  }
}
const xiaomi = new SmartPhone('小米',799,'黑色','4.7inch');
xiaomi.call();
```

## 子类对父类方法的重写

```javascript
class Phone {//父类构造方法
  call() {
    console.log("我可以打电话!!");
  }
}
class SmartPhone extends Phone {//子类构造方法
  call() {//对父类的构造方法进行重写
    console.log("我对方法进行重写");
  }
}
```

## class的getter和setter设置

```javascript
class Phone {
  get price() {//可以没有构造函数,即constructor(){}
    console.log("价格属性被读取了")
    return "sister"
  }
  set price(newVal) {
    console.log('价格属性被修改了');
  }
}
let s = new Phone();
console.log(s.price)//执行[3],并且返回"sister",因为return的值就是s.price的值
s.price = 'free';//可以直接读取price进行修改
```

## 扩展方法

1. `Number.EPSILON`:JavaScript能表示的最小精度,当两个数的差值小于EPSILON属性的值2.2204460492503130808472633361816E-16时,可以认为这两个数相等
2. `Number.isFinite()`:检测一个数值是否为有限数
3. `Number.isNaN()`:检测一个数值是否为NaN 
4. `Number.parseInt()`:字符串转整数
5. `Number.parseFloat`:字符串转浮点数
6. `Number.isInteger()`:判断一个数是否为整数
7. `Math.trunc()`:将数字的小数部分抹掉  
8. `Math.sign()`:判断一个数到底为正数 负数 还是零   

```javascript
console.log(0.1 + 0.3 === 0.4)//用于浮点数的运算,但是现在好像0.1+0.3就是等于0.4,老师视频里是等于0.400000000004的
function equal(a,b){
  if(Math.abs(a-b) < Number.EPSILON){//利用数学方法进行计算
    return true
  }else{
    return false
  }

let b = 0b1010;//二进制0b开头
let o = 0o777;//八进制0o开头
let x = 0xff;//16进制0x
console.log(Number.isFinite(100));
```

## 对象方法的扩展

```javascript
//1. Object.is判断两个值是否完全相等 
console.log(Object.is(120, 120));// === 
console.log(Object.is(NaN, NaN));// true
console.log(NaN === NaN);// false
```

```javascript
//2. Object.assign对象的合并
const maaya = {
  name: "姐姐",
  age: "18",
  basis: "基准"
}
const maaya1 = {
  name: "如月",
  age: "19",
  sj: "1111"//对方没有的属性那么会合并
}
console.log(Object.assign(maaya, maaya1))//如果属性重名,后面的对象属性会覆盖前面的对象属性
```

```javascript
//3. Object.setPrototypeOf设置原型对象Object.getPrototypeof
const school = {
  name: '尚硅谷'
}
const cities = {
  xiaoqu: ['北京', '上海', '深圳']
}
Object.setPrototypeOf(school, cities);//将cities添加为school的原型对象
console.log(Object.getPrototypeOf(school));//获取的school原型对象
console.log(school);//以上都是隐式原型对象
```

## 模块化介绍

## 模块化引入模块

```javascript
//分别暴露
export let school = "尚硅谷"//分别暴露:即每个要暴露的变量语句前都添加export
export function teach(){//分别暴露
  console.log("教你开发技能")
}
```

```javascript
//统一暴露
let school = "尚硅谷"
function teach(){
  console.log("教你开发技能")
}
export {school,teach}
```

```html
<script type="module">//另外一种是<script src="用src引入"><script>
  import * as m1 from "./42,43.js"//将模块引入到变量m1中
  console.log(m1.school)
</script>
```

## 数据暴露语法汇总

```javascript
export default{//默认暴露:暴露出去的会是一个属性default对象,maaya和ry就是default对象的属性
  maaya:"姐姐",
  ry:function(){
    console.log("这是默认暴露")
  }
}
```

```html
<script type="module">//另外一种是<script src="用src引入"><script>
  import * as m1 from "./42,43.js"//将模块引入到变量m1中
  console.log(m1.default.change)//如果是默认暴露,则要多添加一层属性名
</script>
```

## 引入模块数据语法汇总

```javascript
import * as m1 from "./src/js/m1.js";//通用的导入方式
```

```javascript
import {school, teach} from "./src/js/m1.js";//用解构赋值的形式,引入分别暴露的模块代码
console.log(school)
console.log(teach)

//因为和[1]school变量重名,所以使用as代码将其改名为guigu
import {school as guigu, findJob} from "./src/js/m2.js";//用解构赋值的形式,引入统一暴露的模块代码
console.log(guigu)
console.log(findJob)
```

```javascript
import {default as m3} from "./src/js/m3.js";//用解构赋值的形式,引入默认暴露,要注意as
console.log(m3)//此时m3等于未使用解构赋值时的`m3.default`
```

```javascript
//简便形式  只针对默认暴露
import m3 from "./src/js/m3.js";
console.log(m3);
```

## 浏览器使用ES6模块化方式2

```javascript
import * as m1 from "./42,43"//在js中统一引入模块,然后再在html中
import * as m2 from "./42,43"
import * as m3 from "./42,43"
import * as m4 from "./42,43"
//使用<script src="引入本js代码" type="module"> ,并添加module
```

## babel对象ES6模块化代码转换

```html
<script src="引入本js代码" type="module"></script><!-- 实际开发中不会用这种方式引入,因为IE等默写浏览器不支持ES6 -->
```

通过工具转换为IE可以识别的模块

安装工具:1)babel-cli;2)babel-preset-env;3)browserify(webpack)

```cmd
//集成端输入
npm i babel-cli babel-preset-env browserify -D//D是安装依赖环境
```

开始使用:

1. 在cmd中:`npx(npm) babel src/js -d dist/js --preset=babel-preset-env`(src/js是源文件路径, -d Maaya/Sister中Maaya/Sister是编码后文件要存储的路径)
2. 打包`npx borwserify Maaya/Sister/app.js -o Maaya/bundle.js`(-o是输出到的意思)
3. 最后在script中只要引入bundle.js就行了,而且不用加module 

```html
<script src="Maaya/bundle.js"></script>
```

## 模块化引入npm包

```javascript
//修改背景颜色为粉色
import $ from "jquery";//es6引入模块的语法   实际上等同于 const $ = require("jquery")
$("body").css("background","pink")//然后用babel命令进行编译,再用browserify进行打包
//再在html中引用
```

# ES7

## ES7新特性

```javascript
//arr.includes():判断数组中是否包含某一个元素,并返回布尔类型值
const mingzhu = ['西游记', '红楼梦', '三国演义', '水浒传'];
console.log(mingzhu.includes('西游记'));
//指数运算符
console.log(2 ** 10)//1024
console.log(Math.pow(2, 10))//1024
```

# ES8

## async函数

async和await两种语法结合可以让异步代码像同步代码一样

```javascript
async function fn(){//声明一个 async 函数
  return '尚硅谷';//返回的结果不是一个Promise类型的对象时,那么返回的结果会变成一个成功的Promise对象
  throw new Error('出错啦!');//如果是抛出错误,返回的结果是一个失败的Promise,返回的值就是错误的值
  return new Promise((resolve, reject)=>{//返回的结果是Promise对象,那它的状态就是async的状态
    resolve('成功的数据');//[4]promise返回的是resolve,那么上面的async获得的就是一个resolve结果
    //reject("失败的错误");[4]是reject则async返回的是reject结果
  });
}
const result = fn()
result.then(value => {//这里会直接调用value,因为async获得的是成功resolve的状态
  console.log(value);
}, reason => {
  console.warn(reason);
})
```

## await表达式

1. await必须写在async函数中
2. await右侧的表达式一般为promise对象
3. await返回的是promise成功的值
4. awaite的promise失败了,就会抛出异常,需要通过`try..catch`处理

```javascript
const p = new Promise((resolve, reject) => {//创建一个promise对象
  // resolve("用户数据");
  reject("失败啦!");
})
async function main() {
  try {
    let result = await p//await p 是获得promise成功返回的值
    console.log(result)
  } catch (e) {//catch捕获promise失败返回的值,e是reject中传入的参数
    console.log(e)
  }
}
main()
```

## async与await的结合

```javascript
const fs = require("fs");//引入fs模块
function readWeiXue() {//读取为学
    return new Promise((resolve, reject) => {
        fs.readFile("./resources/为学.md", (err, data) => {//简单读取文件返回的是buffer
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
async function main(){//声明一个async函数
    let weixue = await readWeiXue()//获取为学内容
    let chayang = await readChaYangShi()//获取插秧诗内容
    console.log(weixue.toString());
    console.log(chayang.toString());
}
main();
```

## async与await的结合发送Ajax请求

```javascript
function sendAJAX(url) {// 发送 AJAX 请求, 返回的结果是 Promise 对象
  return new Promise((resolve, reject) => {//必须在这一层用return,这样返回值才能是一个promise对象
    const x = new XMLHttpRequest();//创建对象
    x.open('GET', url);//初始化
    x.send();//发送
    x.onreadystatechange = function () {//事件绑定
      if (x.readyState === 4) {
        if (x.status >= 200 && x.status < 300) {
          resolve(x.response);//成功
        } else {
          reject(x.status);//失败
        }
      }
    }
  })
}
async function main() {
  let result = await sendAJAX("https://api.apiopen.top/getJoke");//发送 AJAX 请求
  let tianqi = await sendAJAX('https://www.tianqiapi.com/api/?version=v1&city=%E5%8C%97%E4%BA%AC&appid=23941491&appsecret=TXoD5e8P')//再次测试
  console.log(tianqi);
}
main();
```

## 对象方法扩展

```javascript
const school = {
  name: "尚硅谷",
  cities: ['北京', '上海', '深圳'],
  xueke: ['前端', 'Java', '大数据', '运维']
}
console.log(Object.keys(school));//获取对象所有的键
console.log(Object.values(school));//获取对象所有的值
console.log(Object.entries(school));//entries,返回的是一个两个值的数组,每个数组里的第一个值是键第二个值是值
```

```javascript
const result = Object.entries(school)//将一个对象转化为二维数组
console.log(result)
const m = new Map(result);//将一个二维数组转化为map
console.log(m);
```

```javascript
const obj = Object.creat(null,{//第一个参数是原型对象(不理解,而且老师也没说)
  name:{//属性名
    value:"姐姐",//即对象obj.name = "姐姐"
    //属性特性
    writeable:true,//可写
    configurable:true,//可以删除
    enumerable:true//可以?
  },
  Ry:{
    value:"maaya"
  }
})
console.log(Object.getOwnPropertyDescriptors(school));//获取对象属性的描述对象
```

# ES9

## 扩展运算符与rest

Rest参数与spread扩展运算符在ES6中已经引入,不过ES6中只针对于数组

在ES9中为对象提供了像数组一样的rest参数和扩展运算符

```javascript
function connect(host,port,...user){
  console.log(host)
    console.log(port)
    console.log(user)
}
connect({
  host:"127.0.0.1",
  port:"8000",
  username:"root",
  password:"root",
  type:"master"
})
const sis = {
  name:"姐姐"
}
const maaya = {
  name:"如月真绫",
  gender:"Female"
}
//对象的合并
const result = {..sis,..maaya}//相同的属性名,处在后面的属性值覆盖前面的
```

## 正则扩展_命名捕获分组

**reg.exec(String):通过此正则方法获得的结果会是一个数组,数组中的值如下**

1. **第一个是完整String**
2. **第二个:[2]中第一个`(.*)`匹配到的值,`(.*)`是通配的意思**
3. **第三个:[2]中第二个`(.*)`匹配到的值**

```javascript
let str = '<a href="http://www.atguigu.co m">尚硅谷</a>';
const reg = /<a href="(.*)">(.*)<\/a>/;
const result = reg.exec(str);//执行正则通配
console.log(result);
console.log(result[1]);
console.log(result[2]);//这是无命名捕获分组使用的方法
```

```javascript
const reg = /<a href="(?<url>.*)">(?<text>.*)<\/a>/;//分组命名,即在原有的基础在,在通配的(.*)中添加?<对应的命名>
const result = reg.exec(str);
console.log(result.groups.url);
console.log(result.groups.text);
```

## 正则扩展_反向断言

正向断言:通过要匹配内容后面的内容判断要匹配的内容是否符合要求

```javascript
let str = 'JS5211314你知道么555啦啦啦';
const reg = /\d+(?=啦)/;//正向断言,\d代表0-9,?代表逻辑是否,即数字后面是否是啦,是的话符合
const result = reg.exec(str);
console.log(result);
```

反向断言:

```javascript
const reg1 = /(?<=么)\d+/;//反向断言,在要匹配内容的前面直接加(?<=某个字符串),?<=是固定写法
const result1 = reg1.exec(str);
console.log(result1);
```

## dotAll模式

**dot是`.`, `.`是元字符,即代表除换行符以外的任意单个字符**

**禁止贪婪模式:为了防止通配符`*`继续匹配之后的内容,所以需要加`+`禁止贪婪模式**

```javascript
//配合视频复习
```

# ES10

## 对象扩展方法

```javascript
const result = Object.fromEntries([//将二维数组转化为对象,可以说是Object.Entries的逆方法
  ['name', '尚硅谷'],
  ['xueke', 'Java,大数据,前端,云计算']
]);

const m = new Map()//Map的组成就是二维数组?
m.set("name","姐姐")
const result = Object.fromEntries(m)//jiang
```

## 字符串扩展方法

```javascript
let str = '   iloveyou   ';
console.log(str);
console.log(str.trimStart());//修剪字符串左边的空白字符
console.log(str.trimEnd());//修剪字符串右边的空白字符
```

## 数组扩展方法

**flat有平的意思:它将多维数组转化为低维数组**

```javascript
//一维数组:[1,2,3]
const arr = [1, 2, 3, 4, [5, 6]]
const arr1 = [1, 2, 3, 4, [5, 6, [7, 8, 9]]]
console.log(arr.flat());//将二维数组转化为一维数组
console.log(arr1.flat(2));//将三维数组转化为一维数组
```

```javascript
const arr2 = [1, 2, 3, 4];
const result = arr2.map(item => item * 10)//Map方法:Arr[10,20,30,40]
const result1 = arr2.flatMap(item => [item * 10]); //flatMap方法,当map方法返回的是一个多维数组,那么flat将会起效将多维转换为一维
console.log(result);
console.log(result1);
```

## Symbol.prototype.descrition