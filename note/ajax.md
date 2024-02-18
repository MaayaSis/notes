# 课程介绍

# 介绍与网页应用

AJAX全称为Asynchronous JavaScript And XML,就是异步的JS和XML

通过AJAX可以在浏览器中向服务器发送异步请求,最大的优势:无刷新就能获取数据

AJAX不是新的编程语言,而是一种将现有的标准组合在一起使用的新方式

# XML的介绍

XML:可扩展标记语言

XML:被设计用来传输和存储数据

XML和HTML类似,不同的是HTML中都是**预定义标签**,而XML中全都是**自定义标签**,用来表示一些数据

# Ajax的优缺点

1. 优点:
   1. 可以无需刷新页面而与服务器端进行通信
   2. 允许你根据用户事件来更新部分页面内容
2. 缺点:
   1. **没有浏览历史,不能回退**
   2. 存在跨域问题(同源)(A页面上的Ajax请求,无法对B网页生效)
   3. SEO(搜索引擎优化)不友好

# Ajax与http协议请求报文与响应文本结构

http:

- 请求报文:

```javascript
//行
POST  /s?ie=utf-8  HTTP/1.1//类型 url 协议类型
//头
Host: atguigu.com
Cookie: name=guigu
Content-type: application/x-www-form-urlencoded
User-Agent: chrome 83
//空行
//体
username=admin&password=admin//如果是Get请求,那么请求体为空,即只能读取数据;而Post请求都有可能即可传输也可读取
```

- 响应报文

```javascript
//行
HTTP/1.1  200  OK//协议类型 响应状态码 响应状态
//头
Content-Type: text/html;charset=utf-8
Content-length: 2048
Content-encoding: gzip
//空行
//体
<html>
  <head></head>
	<body>
  	<h1>尚硅谷</h1>
	</body>
</html>
```

# 浏览器网络控制台查看通信报文

浏览器network中三部分:

1. 常规
2. Response Headers:包含了以下内容
   1. 响应行
   2. 响应头
   3. 响应体在Response中
3. Request Headers:**需要点击查看源**
   1. 请求行
   2. 请求头
4. Query String Parameters(对响应的url进行解析)/Form Data(请求体,目前仅post类型有)

# Node.js的安装与介绍

使用的服务端是express,express是基于node.js的

# express框架介绍与基本使用

**express的安装方法:**

```javascript
//首先安装node.js,之后再在集成终端中输入:
//1.npm init --yes		npm初始化
//2.npm i express		安装express框架
//2.node 8.express框架介绍与基本使用		必须在对应目录下启动:8.express框架介绍与基本使用,这个js
```

**express的使用方法**:

```javascript
const express = require("express")
const app = express()
app.get('/',(request,response)=>{//request是对请求报文的封装,response是对响应报文的封装
	response.send('HELLO EXPRESS');
})
app.post('/',(request,response)=>{//这是服务器端,所以是response
	response.send('HELLO EXPRESS POST');
})
app.listen(8000,()=>{//运行该js后,启动8000端口,并输出console.log的内容
	console.log('服务已经启动,8000端口监听中...');
})
```

# Ajax案例准备

**更多内容查看Ajax文件夹中的server.js文件**

```javascript
//文件名:9.Ajax案例准备.js
cosnt express = require("express")
const app = express()
app.get('/server',(request,response)=>{//如果url的路径也就是请求行的第二段是server,则做出响应
  //不需要添加相应行,浏览器应该会自己生成
	response.setHeader('Access-Control-Allow-Origin','*');//设置响应头,设置允许跨域
  response.setHeader('Access-Control-Allow-Headers','*');//设置接收所有请求头信息(如自定义),设置允许跨域
	response.send('HELLO AJAX');//设置响应体
})
app.post('/server',(request,response)=>{//如果url的路径也就是请求行第二段是server,则做出响应
	response.setHeader('Access-Control-Allow-Origin','*');
  response.setHeader('Access-Control-Allow-Headers','*');
	response.send('HELLO AJAX');
})
```

# Ajax的基本请求

```javascript
windwo.onload = function(){
  const btn = document.getElementsByTagName('button')[0];//获取button元素
  const result = document.getElementById("result");
  btn.onclick = function(){
    const xhr = new XMLHttpRequest();//创建对象
    xhr.open('GET','http://127.0.0.1:8000/server');//初始化,设置请求的方法和url
    xhr.send();//发送
    xhr.onreadystatechange = function(){//onreadystatechange表示在状态变化时触发该事件
      //readystate:是xhr对象中的属性,表示状态,0)open未初始化,1)open调用完毕,2)send调用完毕,3)服务端返回部分结果,4)完全返回结果					
      if (xhr.readyState === 4) {//判断现在是什么状态(服务端返回了所有的结果)
        if (xhr.status >= 200 && xhr.status < 300) {//判断响应状态码200,404,403,401,500,以2开头的都是成功的
          //处理结果顺序为响应行,头,空行,体
          console.log(xhr.status);//状态码
          console.log(xhr.statusText);//状态字符串
          console.log(xhr.getAllResponseHeaders());//所有响应头
          console.log(xhr.response);//响应体
          result.innerHTML = xhr.response;//设置result的文本
        } else {}
      }
    }
  }
}
```

```html
<button>点击发送请求</button>
<div id="result"></div>
```

# Ajax设置请求参数

```javascript
const btn = document.getElementsByTagName('button')[0];
const result = document.getElementById("result");
btn.onclick = function () {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://127.0.0.1:8000/server?a=100&b=200');//请求参数在本行的url参数中修改,格式为:url + ?a(参数的名字)=100(值)&b=200
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log(xhr.status);
        console.log(xhr.statusText);
        console.log(xhr.getAllResponseHeaders());
        console.log(xhr.response);
        result.innerHTML = xhr.response;
      } else { }
    }
  }
}
```

# Ajax发送Post请求

```javascript
const result = document.getElementById("result")
result.addEventListener('mouseover',function(){
  const xhr = new XMLHttpRequest()
  xhr.open('POST','http://127.0.0.1:8000/server')
  xhr.send()
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status >=200 && xhr.status < 300){
        result.innerHTML = xhr.response
      }
    }
  }
})
```

# Post请求体设置

```javascript
const result = document.getElementById("result")
result.addEventListener('mouseover',function(){
  const xhr = new XMLHttpRequest()
  xhr.open('POST','http://127.0.0.1:8000/server')
  xhr.send('a=100&b=200')//post设置请求参数,在括号内添加即可,可以随便写,但是对应的服务端要有能够处理才行
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if(xhr.status >=200 && xhr.status < 300){
        result.innerHTML = xhr.response
      }
    }
  }
})
```

# Ajax设置请求头信息

```javascript
const result = document.getElementById("result")
result.addEventListener('mouseover', function () {//鼠标移入事件
  const xhr = new XMLHttpRequest()//创建对象
  xhr.open('POST', 'http://127.0.0.1:8000/server')//初始化,设置类型与URL
  xhr.setRequestHeader('Content-Type','Maaya')//设置默认请求头,单词不能错
  xhr.setRequestHeader('name','Maaya')//可以设置自定义请求头,只是这样还不行,还得依靠9.AJAX案例准备.js中第12行
  xhr.send('a=100&b=200&c=300')
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        result.innerHTML = xhr.response
      }
    }
  }
})
```

# 服务端响应JSON请求

项目中服务端返回的结果大多是JSON格式的数据:

```javascript
const result = document.getElementById('result');
window.onkeydown = function () {//绑定键盘按下事件
  const xhr = new XMLHttpRequest();//发送请求
  xhr.responseType = 'json';//设置响应体数据的类型
  xhr.open('GET', 'http://127.0.0.1:8000/json-server');//初始化
  xhr.send();//发送
  xhr.onreadystatechange = function () {//事件绑定
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        //1.手动对数据转化
        let data = JSON.parse(xhr.response);
        console.log(data);
        result.innerHTML = data.name;
        //2.自动转换,依靠的是29行
        console.log(xhr.response);
        result.innerHTML = xhr.response.name;
      }
    }
  }
}
```

# nodemon自动重启工具安装

# IE缓存问题解决

**IE浏览器在第一次获取Ajax缓存之后,在下一次得到Ajax请求之后会直接走本地Ajax**

```javascript
const btn = document.getElementsByTagName('button')[0];
const result = document.querySelector('#result');
btn.addEventListener('click', function () {
  const xhr = new XMLHttpRequest();
  //给出一个时间戳,让每一次的请求都不同
  xhr.open("GET", 'http://127.0.0.1:8000/ie?t=' + Date.now());///ie?t,?后面的是参数,前面的ie是url
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        result.innerHTML = xhr.response;
      }
    }
  }
})
```

# 请求超时与网络

在项目运行过程中可能会出现网络超时的情况,这时候可以出一个提醒,让用户明白当前情况

```javascript
const btn = document.getElementsByTagName('button')[0];
const result = document.querySelector('#result');

btn.addEventListener('click', function () {
  const xhr = new XMLHttpRequest();
  xhr.timeout = 2000;//超时设置2s
  xhr.ontimeout = function () {//超时回调
    alert("网络异常, 请稍后重试!!");
  }
  xhr.onerror = function () {//网络异常回调,即断网等情况时
    alert("你的网络似乎出了一些问题!");
  }
  xhr.open("GET", 'http://127.0.0.1:8000/delay');
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        result.innerHTML = xhr.response;
      }
    }
  }
})
```

# 取消请求

手动取消Ajax请求

```javascript
const btns = document.querySelectorAll('button');//获取元素对象
let x = null;
btns[0].onclick = function () {
  x = new XMLHttpRequest();
  x.open("GET", 'http://127.0.0.1:8000/delay');
  x.send();
}
btns[1].onclick = function () {///放弃
  x.abort();
}
```

# 请求重复发送问题

```javascript
const btns = document.querySelectorAll('button');//获取元素对象
let x = null;
let isSending = false; //标识变量,是否正在发送AJAX请求
btns[0].onclick = function () {
  //判断标识变量,如果正在发送,则取消该请求,创建一个新的请求
  if (isSending) x.abort();//单行if的语句可以不用加{}
  x = new XMLHttpRequest();
  isSending = true;
  x.open("GET", 'http://127.0.0.1:8000/delay');
  x.send();
  x.onreadystatechange = function () {
    if (x.readyState === 4) {
      //修改标识变量
      isSending = false;
    }
  }
}
```

# jQuery中的Ajax请求

```javascript
$('button').eq(0).click(function () {
  $.get('http://127.0.0.1:8000/jquery-server', { a: 100, b: 200 }, function (data) {
    console.log(data);
  }, 'json');
});
$('button').eq(1).click(function () {
  $.post('http://127.0.0.1:8000/jquery-server', { a: 100, b: 200 }, function (data) {
    console.log(data);
  });
});
```

# jQuery中的通用方法

```javascript
$('button').eq(2).click(function () {//通用型回调请求
  $.ajax({
    url: 'http://127.0.0.1:8000/jquery-server',//url	
    data: { a: 100, b: 200 },//请求参数
    type: 'GET',//请求类型
    dateType:'json',//响应体结果类型
    success: function (data) {//成功的回调
      console.log(data)
    },
    timeout:2000,//超时时间
    error:function(){//当前的url:jQuery-server没有设置超时,所以不会出现,把url换成Delay即可
      console.log('出错了')
    },
    headers:{
      c:300,
      d:400
    }
  })
})
```

# Axios发送Ajax请求

```html
<script crossorigin="anonymous" src="https://cdn.bootcdn.net/ajax/libs/axios/0.19.2/axios.js"></script>
```

```javascript
const btns = document.querySelectorAll('button')
axios.defaults.baseURL = 'http://127.0.0.1:8000';//配置baseURL,可以简化url的请求
btns[0].onclick = function () {
  axios.get('/axios-server', {//相当于http://127.0.0.1:8000/server
    params: {//设置请求参数
      id: 100,
      vip: 7
    },
    headers: {//设置请求头信息
      name: 'Maaya',
      age: 20
    }
  }).then(value => {//对响应结果进行处理使用then
    console.log(value);
  });
}
btns[1].onclick = function () {
  axios.post('/axios-server', {//设置url,请求体
    username: 'admin',
    password: 'admin'
  }, {
    params: {//设置请求参数
      id: 200,
      vip: 10
    },
    headers: {//请求头参数
      width: 100,
      height: 100
    },
  })
}
```

# Axios函数发送Ajax请求

```javascript
const btns = document.querySelectorAll('button');
axios.defaults.baseURL = 'http://127.0.0.1:8000';//baseurl
btns[1].onclick = function () {
  axios({
    method:'POST',//请求方法
    url: '/axios-server',//url
    params: {//url参数
      vip: 10,
      level: 10
    },
    headers: {//请求头
      a: 100,
      b: 100
    },
    data: {//请求具体参数
      username: 'admin',
      password: 'admin'
    }
  }).then(response=>{
    console.log(response.status);//响应状态码
    console.log(response.statusText);//响应状态字符串
    console.log(response.headers);//响应头信息
    console.log(response.data);//响应体
  })
}
```

# 使用fetch函数发送Ajax请求

```javascript
const btn = document.querySelector('button');
btn.onclick = function () {
  fetch('http://127.0.0.1:8000/fetch-server?a=199', {//如果要加请求参数则在server后 +?a=100
    method: 'POST',
    headers: {
      name: 'maaya'//字符串填写姐姐会报错
    },
    body: 'username=admin&password=admin'
  }).then(response => {
    // return response.text();
    return response.json();
  }).then(response => {
    console.log(response);
  });
}
```

# 同源策略

看老师视频,再结合代码块

```javascript
const express = require('express')
const app = express()
//在浏览器地址栏中输入:127.0.0.1:9000/home
app.get('/home',(request,response)=>{//响应home的请求,返回/26.同源策略网页
	response.sendFile(__dirname + '/26.同源策略.html')//此网页域名http://127.0.0.1:9000
})
app.get('/data', (request, response)=>{//所有的JS的域名都是http://127.0.0.1
    response.send('用户数据');
});
app.listen(9000,()=>{//端口号则按定义来
	console.log('服务已经启动,9000端口监听中')
})
```

# JSNOP

**JSNOP是为了结局跨域问题诞生的,结合对应小节的视频复习**

```javascript
const express = require("express")
const app = express()
app.all("/jsnop-server",(request,response)=>{
  const data = {
    name:"我是一个对象"
}
  let str = JSON.stringify(data)
  repsonse.send(`handle(${str})`)
})
app.listen(8000,()=>{
  console.log("8000端口正在监听中")
})
```

```javascript
function handle(data){
  const div = getElementById("div")
  div.innerHTML = data.name
}
```

```html
<script src="http://127.0.0.1:8000/jsnop-server"></script>
```

# 原生JSNOP的实践

```javascript
const input = document.querySelector('input')//用的为什么是querySelector
const p = document.querySelector('p');
function handle(data){//声明handle函数
  input.style.border = 'solid 1px red';//调用handle函数后修改input的边框颜色
  p.innerHTML = data.msg//修改p的文本
}

input.onblur = function(){//绑定鼠标聚焦事件
  let username = this.value//获取用户的输入值
  const script = document.createElement('script')//
  script.src = 'http://127.0.0.1:8000/check-username'
  document.body.appendChild(script);
}
```

# jQuery发送JSNOP请求

```javascript
$('button').eq(0).click(function(){
  $.getJSON('http://127.0.0.1:8000/jQuery-jsonp-server?callback=?',function(data){//在使用jQuery发送JSNOP请求时,需要在url后面加上?callback=?
    $('#result').html(`
    	名称:${data.name}<br>
			校区:${data.city}
		`)
  })
})
```

# 设置CORS响应头实现跨域

CORS:跨域资源共享,CORS是光放的跨域解决方案吗,他的特点是**不需要在客户端做任何特殊的操作,完全在服务器中进行处理**

```javascript
app.all('/cros-server',(request,response)=>{
  response.setHeader('Access-Control-Allow-Headers', '*')//接收所有类型的请求头,例如自定义的
  //接收所有类型的请求方法"post","get"等
  response.setHeader('Access-Control-Allow-Method', '*')//method:方法
	response.setHeader('Access-Control-Allow-Origin', '*')//所有网页都可以使用跨域
	response.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')//只有这个才能跨域
	response.send('hello CROS')
})
```

