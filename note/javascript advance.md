# 准备

# 数据类型

**基础数据类型:**

1. String: 字符串,任意文本
2. Number: 任意数值
3. Boolean: true/false
4. undefined: undefined
5. null: null

**对象(引用)数据类型:**

1. Object:任意对象
2. Array:特别的对象类型(下标/内部数据有序)
3. Function:特别的对象类型(可执行)

**判断**

- **===:可以判断:undefined和null**
- **typeof:**
  1. **可以区别**:数值,字符串,布尔值,**undefined**,function
  2. 不能区别:null与对象,一般对象与数据
  3. typeof返回值的类型是String

```javascript
var a
console.log(a, typeof a, a===undefined)//undefined "undefined" true
console.log(a === typeof a)//false
a = null
console.log(a===null)//true
console.log(typeof a)//"object",typeof无法判断null
```

- **instanceof:判断对象数据的类型,Object,Array与Function,返回值是Boolean**

```javascript
var b1 = {
  b2: [2, 'abc', console.log],
  b3: function () {
    console.log('b3()')
  }
}
console.log(b1 instanceof Object, typeof b1)//true,"object"
console.log(b1.b2 instanceof Array, typeof b1.b2)//true,"object",typeof无法判断Array
console.log(b1.b3 instanceof Function, typeof b1.b3)//true,"function"typeof可以判断Function
console.log(typeof b1.b2[2])//"function",console.log也是一个函数
console.log(b1.b2[2]('abc'))//"abc",(为什么会出现undefined?)
```

# 相关问题

1. 实例:实例对象
2. 类型:类型对象
3. undefined：是已定义，但是未赋值
4. **null：是已定义已赋值，但是值是null，null是Object**
5. 什么时候给变量赋值为null呢？
   1. 初始赋值，表明将要赋值为对象；
   2. **结束前，让指向的对象成为垃圾对象（被垃圾回收器回收）**
   3. 数据的类型：基本类型，对象类型
6. 变量的类型（变量内存值的类型）：
   1. 基本类型：保存就是基本类型的数据
   2. 引用类型：保存的是地址值（堆内存的地址） 

```javascript
function Person(name,age){//创建一个构造函数
  this.name = name;
  this.age = age;
  //console.log(this.name);当添加上此行代码后,控制台会出现"maaya"和"Maaya"
}
var p = new Person('maaya',17);//创建一个Person构造函数的实例对象
Person('Maaya',18);//以调用方法的的方式,调用Person构造函数,语法上是可行的,但逻辑上不是很好
```

```javascript
var a = null//初始负值为null,因为typeof检查null是Object,表明a将要赋值为对象；
var o = {name:"maaya"}
o = null//当对象o无人使用的时候,为o赋值null,代表o执行的对象称为垃圾对象(将被垃圾回收期回收)
```

```javascript
var f = function(){}//本质是,将函数的内存值地址给b,这样就可以用由b指向函数
console.log(f)//返回的是函数,是console.log获得了赋值给C的内存地址值，再由console.log通过地址值找到了函数，从而知道了类型
```

# 数据,变量,内存

1. 数据
   - 存储在内存中代表特定信息的东西,本质上是0101的数字流
   - 数据的特点，可传递，可运算
   - 内存中所有操作的目标都是数据:算术运算，逻辑运算，赋值，运行函数
2. 内存
   - 内存条通电后产生的可存储数据的空间（临时的）
   - 内存产生和死亡，内存条（电路板）→通电→产生内存空间→存储数据→处理数据→断电→内存空间和数据都消失
   - 栈：全局变量/局部变量，较小
   - 堆：对象，较大

```javascript
var a = 1
var obj = {
  name:"Maaya"
}
vra b = obj
function fun(){//fun在栈中
  var obj1 = {//obj1也在栈中
    name:"Maaya"//只有属性name在堆中
  }
}
```

# 相关问题

**var a = xxx时，a内存中保存的是什么？**

```javascript
var a = 3//xxx是基本数据时，保存的就是这个数据
var a = function(){}//xx是对象，保存的是对象的地址值
var b = "变量"
a = b//xxx是一个变量时，保存的就是xxx的内存内容（此时xxx可能是基本数据，也可能是地址值）
```

**关于引用变量赋值问题**

```javascript
var obj = {name:'Maaya'};//将obj的内存内容保存给obj1，只是这个内容恰好是地址值
var obj1 = obj;

obj.name = 'Kisaragi';//多个变量引用同一个对象,其中一个变量修改了对象的数据后，其它所有变量看到的是修改之后的数据
console.log(obj1.name);

function fun(obj2){//传入实参ojb1,即令函数创建的形参ojb2 = obj1
  obj2.name = 'D';//因为obj2 = obj1,所以修改obj2.name会使ojb1.name也同时修改
}
fun(obj1);
console.log(obj1.name)//输出"d"

var a = {age:'18'};
var b = a;//将a的地址值复制给了变量b
a = {age:'1',name:'1'};
console.log(b.age,a.age,a.name);

function fun1(o){//传入实参a,令函数创建的形参o = a,即o获得了a的地址值
  o = {age:'15'}//修改形参o的地址值
}
fun1(a);
console.log(a.age);//因为函数fun1始终只修改形参o的地址值,对传入的实参无改变
```

# 相关问题1

**JS中调用函数时传递变量参数时，是值传递还是引用传递**

1. 理解一：都是值（基本/地址值）传递
2. 理解二：可能是值传递，也可能是引用传递（地址值）

**JS引擎如何管理内存:**

1. 内存生命周期
2. 分配小内存空间，得到它的使用权
3. 存储数据，可以反复进行操作
4. 释放小内存空间

**释放内存**:

局部变量：函数执行完自动释放

对象：成为垃圾对象(赋值为null) → 垃圾回收器回收（null）

全局变量不会被释放

```javascript
var a = 3;
function fn(a) {
  a = a + 1;
}
fn(a);
console.log(a)
//理解1.obj把自己的内存内容传给函数中的obj
//理解2.obj把自己的地址（是基本数据的时传的就是基本数据，是引用数据类型时，就直接把name：'maaya'传入）传给函数中的obj
```

```javascript
var b = 3; 
var obj = {};//创建一个对象,并将地址值赋值给变量obj
var obj = null;//当对象不再有人指向它时,即null,该对象成为垃圾对象被回收
//只有在被执行的时候fn2才会占两个空间，因为是局部变量，所以执行完之后等待垃圾回收器某个时候自动释放回收
function fn2(){
  var c = {}
}
fn2();
```

# 对象

**对象:**

1. 多个数据的封装体
2. 用来保存多个数据的容器
3. 一个对象代表现实中的一个事物，这个事物由多个数据组成

**为什么要用对象:统一管理多个数据**

**对象的组成:**

1. 属性：属性名（字符串）和属性值（任意类型）组成
2. 方法：一种特别的属性，属性值是函数

**如何访问对象内部的数据:**

1. .属性名:编码简单，有时不能用
2. ["属性名"]=:编码麻烦，通用

**什么时候不能使用.属性名？**

1. 属性名包含特殊字符:"-",空格
2. 变量名不确定，例如数组,例如属性名是一个变量

```javascript
var p = {
  name:"maaya",
  age:18
  setName:function(name){
    this.name = name
  }
	setAge:function(age){
  this.age = age
	}
}
p.setName('1');//等于p['setName']('2')写法
console.log(p.name,p.setName)//输出2,函数
```

```javascript
var a = {};//特殊情况(属性名有特殊字符):a.content-type = 'text/json'
a['content-type'] = 'text/json';
console.log(a['content-type']);

var propName = 'myAge';
var value = 18;
a['propName'] = value;//特殊情况(属性名是个变量):p.propName = value;
console.log(a[propName]);
```

# 函数

**什么是函数？**

1. 实现特定功能的n条语句的封装体
2. 只有函数是可以执行的，其它类型的数据不能执行

**为什么要用函数？**

1. 提高代码复用率
2. 便于阅读交流

**如何定义函数？**

1. 函数表达式
2. 函数声明

**如何调用（执行）函数**

1. test()：直接调用
2. obj.test()：通过对象调用
3. new.test()：new调用
4. test.call/apply(obj)：临时让test成为obj的方法进行调用

```javascript
//test.call(obj)
var obj = {};
function fun1() {
  this.name = 'xxx'
}
fun1.call(obj);//将一个函数成为指定对象的方法进行调用（临时的）
console.log(obj.name);
```

# 回调函数

**什么是回调函数？**

1. 由你定义的
2. 但你没有调用它
3. 但最终它执行了（在某个时刻，某个条件下）

**常见的回调函数**

1. dom事件回调函数→this是发生事件的dom元素
2. 定时器回调函数 → window
3. Ajax请求回调函数（后面的内容）
4. 生命周期回调函数（后面的内容）

```javascript
btn.getElementById("btn").onclick = function(){//dom事件回调函数
  console.log(this.innerHTMl)
}
setInterval(function(){//定时器回调函数
  document.write("1")
},20000)
```

# IIFE

IIFE:Immediately-Invoked Funciton Expression(立即调用函数表达式),又名**匿名函数自调用**

作用:1)隐藏实现,2)不会污染外部（全局）命名空间,3)用它来编码JS模块

```javascript
(function(){//匿名函数自调用
  var a = 3
  console.log(a)
})
```

```javascript
(function(){
  var a = 1
  function test(){
    console.log(a++);
  }
  function test1(){
    console.log(a++);
  }
  window.$ = function(){//向外暴露一个全局函数,因为全局变量中已经存在$,所以可以直接赋值
    return{
      test:test
    }
  }
})()
$().test();//$是一个函数,$执行后返回的是一个对象{test:test}
```

# 函数中的this

**this是什么?**

1. 任何函数本质上都是通过某个对象调用，既必须由对象调用，默认的是window
2. 所有函数内部都有一个变量this
3. 它的值是调用函数的当前对象

**如何确定this的值?**

1. test():window
2. p.test():p
3. new test():p
4. new test():新创建的对象
5. p.call(obj):obj

```javascript
function Person(color){
  console.log(this)
  this.color = color;
  this.getcolor = function(){
    console.log(this)
    return this.color;
  };
  this.setcolor = function(color){
    console.log(this) 
    this.color = color
  }
}
Preson('red')//this是谁? window
var p = new Person('yello')//this是谁? p
p.getcolor();//this是谁? p
var obj = {};
p.setcolor.call(obj,'black');//this是谁? obj
var test = p.setcolor;//将函数的地址值赋值为test,test指向的是一个函数
test();//this是谁? window

function fun1(){
  function fun2(){
    console.log(this);
  }
}
fun2();//this是谁? window
fun1();//this是谁? window
```

# 关于语句分号的问题

1. JS一条语句的后面可以不加分号
2. 是否加分号是编码风格问题，只看喜不喜欢
3. **以下两种语句行首前不加分号会有问题**
   1. **小括号开头的前一条语句**
   2. **中方括号开头的前一条语句**
4. 强有力的例子：Vue.js库

```javascript
//不加括号浏览器会错误理解为 var a = 3(function(){})()
var a = 3
;(function(){})()
//不加括号浏览器会错误理解为 var b = 4[1,3].forEach(function(){})
var b = 4
;[1,3].forEach(function(){})
```

# 软件的设置

# 复习

# 函数的prototype

**函数的Prototype属性:**

1. 每个函数都有一个prototype属性,它默认指向一个Object空对象（即成为原型对象）
2. **原型对象中有一个属性constructor，他指向this.函数对象**

**给原型对象添加属性(一般都是方法)的作用:函数的所有实例对象自动拥有原型对象的属性（方法）**

```javascript
console.log(Date.prototype, typeof Date.prototype)//输出原型对象Object,"object"
function Fun() {}
Fun.prototype.test = function () {//给原型对象添加属性（一般是方法）,实例对象可以访问
  console.log('test()')
}
Fun.prototype.sister = "maaya"//给原型对象添加属性,实例对象可以直接访问
console.log(Fun.prototype)//指向一个Object空对象（没有我们的属性）
console.log(Date.prototype.constructor)//原型对象中有一个属性constructor,他指向函数对象Date
//给原型对象添加属性（一般是方法）→实例对象可以访问
var fun = new Fun()
fun.test()
```

![](D:\OneDrive\JavaScript Advance\1\15.png)

**解析:构造函数Type中存在一个属性是prototype原型对象`Type.prototype`,而这个原型对象中存在属性constructor,它又指向了Type**

# 显示原型与隐式原型

**函数的prototype属性：在定义函数时自动添加的，默认值时一个空Object对象**

**对象的`__proto__`属性：创建对象时自动添加的，默认值为构造函数的prototype属性值**

**程序员能直接操作显示原型，但不能直接操作隐式原型（ES6之前）**

```javascript
function Fun(sister){
  //当创建一个构造函数时,它的内部会自动生成一条语句
  //即给Fun构造函数,添加一个prototype属性,这个属性指向的是一个对象{}
  //this.prototype = {}
}
var fn = new Fun()//与上面同理,当创建一个构造函数的实例对象时,内部也自动产生语句
//this.__proto__= Fun.prototype,即将Fun的属性prototype原型对象的地址值赋值给this.__proto__
```

# 原型链

# 原型链

![](D:\OneDrive\JavaScript Advance\1\18：原型链.png)

1. 函数的显示原型指向的对象默认是空Object实例对象（只有Object不满足）[5]
2. 所有**函数(注意Fun是构造函数,但fn是对象)**都是是Function的实例（包括Function）
3. **Object的原型对象的`__proto__`是null,所以Object的原型对象是原型链的尽头**

```javascript
function Fun(name){
  this.name = name
}
var fn = new Fun()
console.log(Object.prototype instanceof Object);//false
console.log(Function.prototype instanceof Object);//true

console.log(Object.__proto__ === Function.prototype)
console.log(Object.__proto__ === Function.__proto__)
console.log(Function.prototype === Function.__proto__)
console.log(Fun.__proto__ === Function.prototype)
console.log(Fun.__proto__ === Function.__proto__)
console.log(Fun.prototype === Function.prototype)
console.log(Fun.prototype === Function.__proto__)
console.log(Fun.prototype.__proto__ === Object.prototype)
console.log(fn.__proto__ === Function.prototype)
console.log(fn.__proto__ === Function.__proto__)
console.log(fn.__proto__ === Fun.prototype)
console.log(fn.prototype)
```

# 原型链的属性问题

1. 读取对象的属性值时：会自动到原型链中查找
2. 设置对象的属性值时：不会查找原型链，如果当前对象中没有此属性，直接添加此属性并设置其值
3. **方法一般定义在原型对象中,属性一般通过构造函数定义在对象本身上**

```javascript
function Fun() {}
Fun.prototype.a = 'xxx'
var fun1 = new Fun()
console.log(fun1.a,fun1)
var fun2 = new Fun()
fun2.a = 'yyy'
console.log(fun1.a,fun2.a,fun2)

function Person(name,age) {
  this.name = name;
  this.age = age;
}
Person.prototype.set = function (name,age) {
  this.name = name
  this.age = age
}
var p1 = new Person("姐姐",1)
p1.set('爱情','18')
console.log(p1)
var p2 = new Person("如月",15)
p1.set('Kisaragi','17')
console.log(p2)
console.log(p2.__proto__ === p1.__proto__)//true
```

# 探索instanceof

instanceof是如何判断的？

如果**B函数**的显示原型对象出现在**A对象**的原型链上,返回true,否则返回false

```javascript
function Foo(){ }
var f1 = new Foo()
console.log(f1 instanceof Foo) //true
console.log(f1 instanceof Object) //true

console.log(Object instanceof Function) 
console.log(Object instanceof Object) 
console.log(Function instanceof Function) 
console.log(Function instanceof Object) 
function Foo() { }
console.log(Object instanceof Foo) 
```

# 面试题

```javascript
//测试题1
function A() {}
A.prototype.n = 1
var b = new A()
A.prototype = {
  n: 2,
  m: 3
}
var c = new A()
console.log(b.n, b.m, c.n, c.m)//输出?
//测试题2
var F = function () { }
Object.prototype.a = function () {
  console.log('a()')
}
Function.prototype.b = function () {
  console.log('b()')
}
var f = new F()
f.a()//输出?
f.b()//输出?
F.a()//输出?
F.b()//输出?
```

# 变量提升与函数提升

1. 变量声明提升:通过var定义(声明)的变量，在定义语句之前就可以访问到,但变量值是undefined
2. 函数声明提升:**通过function声明的函数**，在之前就可以直接调用,函数值就是函数定义(对象)
3. **问题:变量提升和函数提升是如何产生的？:[9]无法调用fun2()函数,是因为fun2使用的var定义的,要遵从变量声明提升的规则**

```javascript
var a = 3
function fun(){
  console.log(a)//输出?
  var a = 4
  }
fun()
console.log(b)//输出?
fun1()//能否调用?
fun2()//能否调用?
var b = 3?
function fun1(){
  console.log('fun2()')
}
var fun2 = function(){
  console.log('fun3()')
}
```

# 执行上下文

**代码分类（位置）:**

1. 全局代码
2. 函数代码

**全局执行上下文:**

1. 在执行全局代码前将window确定为 全局执行上下文对象
2. 对全局数据进行预处理
3. var定义的全局变量→添加为window的属性
4. function声明的全局函数→赋值(fun),添加为window的方法
5. this→赋值(window)
6. 开始执行全局代码

**函数执行上下文**:

在调用函数，准备执行函数体之前,创建对应的函数执行上下文对象（虚拟的,存在于栈中）

对局部数据进行预处理

形参变量→赋值（实参→添加为执行上下文的属性)

arguments→赋值（实参列表），添加为执行上下文的属性

var定义的全局变量→添加为执行上下文的属性

function声明的全局函数→赋值(fun)，添加为执行上下文的属性

this→赋值(调用函数的对象)

执行函数体的变量

```javascript
//全局执行上下文
console.log(a1,window.a1)
console.log(window.a2)
console.log(this)
var a1 = 3
function a2(){
  console.log('a2')
}

//函数执行上下文
function fun(a1){
  console.log(a1)
  console.log(a2)
  a3()
  console.log(this)
  console.log(arguments)//arguments封装实参的伪数组
  var a2 = 3
  function a3(){
    console.log('a3()')
  }
}
fun(2,3)//分别输出申明
```

# 执行上下文栈

**上下文对象的产生次数=函数调用次数+1(window)**

```javascript
//产生了几个上下文对象?
//1.window
var a = 10
var bar = function(x){
  var b = 5
  foo(x + b)//2.调用了foo函数
}
var foo = function(y){
  var c = 5
  console.log(a + c + y)
}
bar(10)//调用bar函数,截止[12]产生过3个上下文对象,
bar(10)//截止[13]产生过5个上下文对象
```

**队列:先进先出,f1()调用函数f2()和函数调用f3(),此时同时存在3个上下文对象**

**栈:后进先出,f1()调用函数f2(),f2()调用函数f3(),此时同时存在4个上下文对象**

![](D:\OneDrive\JavaScript Advance\1\24.执行上下文栈.png)

# 面试题

**先执行变量提升,在执行函数提升,这是贯穿本节的核心**

```javascript
//1:依次输出了什么
console.log('gb'+i)//gbundefined
var i = 1
foo(1)
function foo(i){
  if(i == 4){
    return;
  }
  console.log('fb'+i)  //fb1
  foo(i+1) 
  console.log('fe'+i)
}
console.log('ge'+i)
//2:先执行函数提升还是变量提升
function a(){}
var a;
console.log(typeof a)
//3:
if(!(b in window)){
  var b = 1//虽然var b=1是在if语句中,但它仍然会先定义出window.b,但要等if语句执行才会赋值1给b,但又因为var的变量声明提前,导致if的判断为false,所以这个if语句只会定义b而不赋值1给它
  }
console.log(b) 
//4:
var c = 1
function c(c){
  console.log(c)
}
c(2) 
```

```javascript
//4:解析,第四题的代码执行顺序如下
var c
function c(c){
  console.log(c)
}
c = 1
c(2)
```

# 复习

# 作用域与作用域链

1. 分类:
   1. 全局作用域
   2. 函数作用域
   3. 块作用域（ES6之后才有）
2. 作用:隔离变量,不同作用域下同名变量不会有冲突

```javascript
//存在n+1个作用域(n:定义的函数数量)
var a = 10
b = 20
function fun(x) {
  var a = 100,
      c = 300
  console.log('fun()', a, b, c, x)
  function bar(x) {
    var a = 1000,
        d = 400
    console.log('bar()', a, b, c, d, x)
    bar(100)
    bar(200)
  }
}
fun(10)
```

1. 区别1
   1. 全局作用域外，每个函数都会创建自己的作用域，作用域在函数定义时就已经确定了，而不是在函数调用时
   2. **全局执行上下**文环境是在**全局作用域**确定之后，JS代码即将执行前创建
   3. **函数执行上下文是在调用函数时，函数体代码执行之前创建**
2. 区别2
   1. 作用域是静态的，只要函数定义好了就一直存在，且不会再变化
   2. 上下文环境是动态的，调用函数时创建，函数调用结束时上下文环境就会被释放
3. 联系
   1. 上下文环境（对象）是从属于所在的作用域
   2. 全局上下文环境→全局作用域
   3. 函数上下文环境→对应的函数作用域

# 作用域面试题

```javascript
var x = 10
function fun() {
  console.log(x)
}
function show(f) {
  var x = 20
  f()
}
show(fun)
//
var fun = function () {
  console.log(fun)
}
//没有对象作用域
fun()
var obj = {
  fun1: function () {
    console.log(fun1)//console.log(obj.fun1)
  }
}
obj.fun1()
```

# 循环遍历加监听

```javascript
var btns = document.getElementsByTagName('button')
for (var i = 0,length = btns.length; i < length; i++) {//因为每一次for循环的时候,都会重复计算btns.length,所以可以通过赋值的方法固定下来,优化性能
  var btn = btns[i];
  btn.index = i
  console.log(btn)
  btn.onclick = function() {//实际上本行的写法应该是 btn[i].onclick = function(){}
    alert('第' + (this.index + 1) + '个 ')//所以不会出现bug
  }
}
console.log(btn)
console.log(i)
```

# 闭包理解

1. **如何产生闭包:当一个嵌套的内部（子函数）引用了嵌套的外部（父）函数的变量（函数）时，产生了闭包**
2. **闭包到底是什么:**
   1. **理解一：闭包是嵌套的内部函数（大多数人的理解）**
   2. **理解二：包含被引用变量（函数）的对象（少数人理解）**
3. **产生闭包的条件:**
   1. **函数嵌套**
   2. **内部函数引用了外部函数的数据（变量/函数）**
   3. **外部函数需要被执行**

```javascript
function fn1(){
  var a = 1
  var b = 1
  function fn2(){
    console.log(a)//产生了闭包,闭包中有a,没有b
  }
  return fn2
}
fn1()
```

```javascript
function fn1(){
  var a = 1
  var b = 1
  var fn2 = function {//没有产生闭包,因为var的
    console.log(a)
  }
  return fn2
}
fn1()
```

# 常见的闭包

闭包也是一个对象,产生了几个内部函数对象就产生了几个闭包

```javascript
function fun1(){
  var a = 2
  function fun2() {
    a++
    console.log(a)
  }
  return fun2
}
var f = fun1()//本行产生了内部函数对象
f()//3,如果没有闭包,这里调用的话,则a报错,v is not defined
f()//4
var f1 = fun1()//本行产生了内部函数对象,
f1()//3
f()//5
```

```javascript
function showDelay(msg,time){
  setTimeout(function(){//如果本行中function(msg){}传入msg参数
    console.log(msg)//则输出undefined,因为没有闭包存在了,
  },time)
}
```

# 闭包的作用

1. 使函数内部的变量在函数执行后，仍然存活在内存中（延长了局部变量的声明周期）
2. 让函数外部可以操作（读写）到函数内部的数据（变量、函数）

```javascript
function fun1(){
  var a = 2//函数执行完后还存在,存活函数对象中的闭包中
  function fun2() {//fun2不存在
    a++
    console.log(a)
  }
  function fun3() {//fun3变量不存在,但是fun3变量指向的这个函数对象还在,被变量f接手,由f指向所以会一直存在
    a--
    console.log(a)
  }
  return fun3
}
var f = fun1()//如果本行只是fun1(),而不使用一个变量接收fun3函数,则[7]注释中的说法:fun3变量执行的这个函数对象还在为错,现在就不存在了
```

# 闭包的生命周期

1. 产生：在嵌套**内部函数定义**执行完时就产生了（不是在调用）
2. 死亡：在嵌套的内部函数称为垃圾对象时

```javascript
function fun1(){
  var a = 2
  function fun2() {
    a++
      console.log(a)
  }
  return fun2
}
var f = fun1()
f() //3
f() //4
f =  null //此时死亡（包含闭包的函数对象成为垃圾对象，因为这个对象没有人指向它)
```

# 自定义JS模块

通过闭包先外部暴露对象

```javascript
//JS模块的写法一
function myModule(){
  var msg = 'myatguigu'
  function doSomething(){
    console.log('doSomething() '+msg.toUpperCase())
  }
  function doOtherthing(){
    console.log('doOtherthing() '+msg.toLowerCase())
  }
  return {//向外暴露对象（给外部使用的方法）
    doSomething:doSomething,
    doOtherthing:doOtherthing
  }
}
```

```javascript
//JS模块的写法二(优先级更高)
(function (window){
  var msg = 'myatguigu'
  function doSomething(){
    console.log('doSomething() '+msg.toUpperCase())
  }
  function doOtherthing(){
    console.log('doOtherthing() '+msg.toLowerCase())
  }
  //直接函数自调用，然后将自己给window
  window.myModule2 = {
    doSomething: doSomething,
    doOtherthing: doOtherthing
  }
})(window)
```

# 闭包的缺点

1. 缺点:函数执行完后，函数内的局部变量没有释放，占用内存时间会边长,容易造成内存泄漏
   1. 内存溢出:一种程序运行出现的错误,当程序运行需要的内存超过了剩余的内存时，就会抛出内存溢出的错误
   2. 内存泄漏:占用的内存没有及时释放,内存泄露积累多了就容易导致内存溢出,内存泄露积累多了就容易导致内存溢出
   3. 常见的内存泄露:意外的全局变量,没有及时清理的计时器或回调函数,闭包
2. 解决:能不用闭包就不用,及时释放

```javascript
//内存溢出
var obj = {}
for(var i=o ; i<100000 ; i++ ){
  obj[i]= new Array(1000000)
}
//意外全局
function fun() {
  a  = new Array(100000)  //直接赋值相当于定义全局变量？
  console.log(a)
}
fun()
//启动循环定时器后不清理
var IntervalId = setInterval(function(){
  console.log('----')
},time)
//clearInterval(IntervalId)
//闭包
function fun() {
  var arr = new Array[10000]
  function fun2() {
    console.log(arr.length)
  }
  return fun2
}
var f = fun()
f()
```

# 面试题

```javascript
var name = "the window'"
var object = {
  name:'My Object',
  getNameFunc:function(){
    return function(){
      return this.name
    }
  }
}
alert(object.getNameFunc()()) 

var name = 'the window'
var object = {
  name:'My Object',
  getNameFunc:function(){
    var that = this
    return function(){
      return that.name
    }
  }
}
alert(object.getNameFunc()()) 
```

```javascript
function fun(n,o){
  console.log(o)
  return {
    fun:function(m){
      return fun(m,n)
    }
  }
}
var a = fun(0); a.fun(1); a.fun(2); a.fun(3)//
var b = fun(0).fun(1).fun(2).fun(3)//
var c = fun(0).fun(1); c.fun(2); c.fun(3)//
```

# 对象创建模式

```javascript
//Object构造函数模式
var a = new Object()
p.name = 'tom'
p.age = 12
p.setName = function (name) {
  this.name = name
}
//对象字面量模式
var b = {
  name: 'Tom',
  age: 12,
  setName: function (name) {
    this.name = name
  }
}
//工厂模式
function createPerson(name, age) {
  var c = {
    name: name,
    age: age,
    setName: function (name) {
      this.name = name
    }
  }
  }
var p1 = createPerson('Maaya',18)
var p1 = createPerson('Maaya',19)
//自定义构造函数
function Person(name,age){
  this.name = name,
    this.age = age,
    this.setName = function(name){
    this.name = name
  }
}
var person = new Person('人',90)
console.log(person instanceof Person)

function Student(name ,age){
  this.name = name,
    this.age = age,
    this.setName = function(name){
    this.name = name
  }
}
var student = new Student('学生',90)
console.log(student instanceof Student)
//自定义构造函数+原型
function Person(name,age){
  this.name = name,
    this.age = age
}
Person.prototype.setName = function(name){
  this.name = name
}
```

# 原型链继承

原型链继承:

1. 定义父类型构造函数
2. 给父类型的原型添加方法
3. 定义子类型的构造函数
4. 创建父类型的对象赋值给子类型的原型
5. 将子类型原型的构造属性设置为子类型
6. 给子类型原型添加方法
7. 创建子类型的实例对象: 可以调用父类型的方法

**关键:子类型的原型为父类型的一个实例对象**

```javascript
function F(){}
F.prototype.showFather = function(){
  console.log("father")
}
S.prototype = new F()
function S(){}
var son = new S()
son.showFather()
```

# 组合继承

```javascript
//原型链继承方法
function Supper(){
  this.supProp = 'Supper property'
}
Supper.prototype.showSupperProp = function(){
  console.log(this.supProp)
}
Sub.prototype = new Supper()
Sub.prototype.constructor = Sub
function Sub(){
  this.subProp = 'Sub property'
}
Sub.prototype.showSubProp = function(){
  console.log(this.subProp)
}
var sub = new Sub()
sub.showSupperProp()
// 方式二：借用构造函数继承属性,1)定义夫类型构造函数
function Person(name,age){
  this.name = name
  this.age = age
}
function Student(name,age,price){
  Person.call(this,name,age) //相当于this.person(name.age)
  this.price = price
}
var a = new Student('Maaya',18,100000)
console.log(a.name,a.age,a.price)
//方式三:原型链+借用构造函数继承的组合继承,1)利用原型链实现对夫类型对象的方法继承2)利用super()借用父类型构建函数初始化相同属性
function Person(name,age){
  this.name = name
  this.age = age
}
Person.prototype.setName = function(){
  this.name = name
}
function Student(name,age,price){
  Person.call(this,name,age)
  this.price = price
}
Student.prototype = new Person()
Student.prototype.constructor = Student
Student.prototype.setPrice = function(){
  this.price = price
}
var a = new Student('Maaya',18,5000)
console.log(a.name,a.age,a.price)
```

# 进程与线程

1. 进程：程序的一次执行,它占有一片独有的内存空间
2. 线程：CPU的基本调度单位,是程序执行的一个完整流程
3. 进程与线程
   1. 一个进程中一般至少有一个运行的线程:主线程
   2. 一个进程中也可以同时运行多个线程,我们会说程序是多线程运行的
   3. 一个进程内的数据可以供其中的多个线程直接共享
   4. 多个进程之间的数据是不能直接共享的
4. 浏览器运行是单进程还是多进程?
   1. 有的是单进程:firefox,老版IE
   2. 有的是多进程:chrome,新版IE
5. 如何查看浏览器是否是多进程运行?:任务管理器==>进程
6. 浏览器运行是单线程还是多线程?:都是多线程运行的
7. 比较单线程和多线程:
   1. 多线程:
      1. 优点:能有效提升CPU的利用率
      2. 缺点:创建多线程开销,线程切换会增加开销
      3. 单核多线程:一会执行线程1,一会执行线程2,死锁与状态同步问题
   2. 单线程:
      1. 优点:顺序编程容易简单
      2. 缺点:效率低

JS为单线程运行,但使用Web Workers可以多线程运行

# 浏览器内核

什么是浏览器内核?:支持浏览器运行的最核心的程序

不同的浏览器可能不太一样

内核由很多模块组成:1-4在主线程中执行,5-7在分线程中执行

1. html,css文档解析模块:负责页面文本的解析
2. dom/css模块:负责dom/css在内存中的相关处理
3. 布局和渲染模块:负责页面的布局和效果的绘制
4. 布局和渲染模块:负责页面的布局和效果的绘制
5. 定时器模块:负责定时器的管理
6. 网络请求模块:负责服务器请求(常规/Ajax)
7. 事件响应模块:负责事件的管理