# 课程简介

null

# 什么是模板引擎

使用纯DOM法将数据转变为可视数据

```javascript
var arr = [
  { "name": "小明", "age": 12, "sex": "男" },
  { "name": "小红", "age": 11, "sex": "女" },
  { "name": "小强", "age": 13, "sex": "男" }
];

var list = document.getElementById('list');

for (var i = 0; i < arr.length; i++) {
  // 每遍历一项，都要用DOM方法去创建li标签
  let oLi = document.createElement('li');
  // 创建hd这个div
  let hdDiv = document.createElement('div');
  hdDiv.className = 'hd';
  hdDiv.innerText = arr[i].name + '的基本信息';
  // 创建bd这个div
  let bdDiv = document.createElement('div');
  bdDiv.className = 'bd';
  // 创建三个p
  let p1 = document.createElement('p');
  p1.innerText = '姓名：' + arr[i].name;
  bdDiv.appendChild(p1);
  let p2 = document.createElement('p');
  p2.innerText = '年龄：' + arr[i].age;
  bdDiv.appendChild(p2);
  let p3 = document.createElement('p');
  p3.innerText = '性别：' + arr[i].sex;
  bdDiv.appendChild(p3);

  // 创建的节点是孤儿节点，所以必须要上树才能被用户看见
  oLi.appendChild(hdDiv);
  // 创建的节点是孤儿节点，所以必须要上树才能被用户看见
  oLi.appendChild(bdDiv);
  // 创建的节点是孤儿节点，所以必须要上树才能被用户看见
  list.appendChild(oLi);
}
```

# 数组join()法介绍

```javascript
var arr = [
  { "name": "小明", "age": 12, "sex": "男" },
  { "name": "小红", "age": 11, "sex": "女" },
  { "name": "小强", "age": 13, "sex": "男" }
];

var list = document.getElementById('list');

// 遍历arr数组，每遍历一项，就以字符串的视角将HTML字符串添加到list中
for (let i = 0; i < arr.length; i++) {
  list.innerHTML += [
    '<li>',
    '    <div class="hd">' + arr[i].name + '的信息</div>',
    '    <div class="bd">',
    '        <p>姓名：' + arr[i].name + '</p>',
    '        <p>年龄：' + arr[i].age  + '</p>',
    '        <p>性别：' + arr[i].sex + '</p>',
    '    </div>',
    '</li>'
  ].join('')
}
```

# 反引号法

反引号法:模板字符串

```javascript
var arr = [
    { "name": "小明", "age": 12, "sex": "男" },
    { "name": "小红", "age": 11, "sex": "女" },
    { "name": "小强", "age": 13, "sex": "男" }
];
var list = document.getElementById('list');
// 遍历arr数组，每遍历一项，就以字符串的视角将HTML字符串添加到list中
for (let i = 0; i < arr.length; i++) {
    list.innerHTML += `
        <li>
            <div class="hd">${arr[i].name}的基本信息</div>    
            <div class="bd">
                <p>姓名：${arr[i].name}</p>    
                <p>性别：${arr[i].sex}</p>    
                <p>年龄：${arr[i].age}</p>    
            </div>    
        </li>
    `;
}
```

# mustache的基本语法

mustache:可以在浏览器中使用也可以在node中使用

```javascript
// 可以在boot通过script标签引入
// 也可以通过npm下载
```

```html
<!-- 模板 -->
<script type="text/template" id="mytemplate"> 
	<ul>
    {{#arr}}
        <li>
            <div class="hd">{{name}}的基本信息</div>    
            <div class="bd">
                <p>姓名：{{name}}</p>    
                <p>性别：{{sex}}</p>    
                <p>年龄：{{age}}</p>    
            </div>
        </li>
    {{/arr}}
</ul>
</script>
<script src="jslib/mustache.js"></script>
<script>
  var templateStr = document.getElementById('mytemplate').innerHTML;

  var data = {
    arr: [
      { "name": "小明", "age": 12, "sex": "男" },
      { "name": "小红", "age": 11, "sex": "女" },
      { "name": "小强", "age": 13, "sex": "男" }
    ]
  };

  var domStr = Mustache.render(templateStr, data);
  var container = document.getElementById('container');
  container.innerHTML = domStr;
</script>
```

# mustache的底层核心机理

通过正则表达实现简单模板数据填充

```javascript
var templateStr = '<h1>我买了一个{{thing}}，花了{{money}}元，好{{mood}}</h1>';
var data = {
    thing: '白菜',
    money: 5,
    mood: '激动'
};
// 最简单的模板引擎的实现机理，利用的是正则表达式中的replace()方法。
// replace()的第二个参数可以是一个函数，这个函数提供捕获的东西的参数，就是$1
// findeStr:表示完整的正则匹配到的字符串;caputredStr:表示被()即捕获到的字符串(thing和good)
// 结合data对象，即可进行智能的替换
function render(templateStr, data) {
    return templateStr.replace(/\{\{(\w+)\}\}/g, function (findStr,caputredStr,c,d) {
        return data[caputredStr];
    });
}
var result = render(templateStr, data);// result的值就是被替换后的templateStr
console.log(result);
```

# 底层tokens思想

![](D:\OneDrive\Vue_mustacheu\6.mustache的底层核心机理.png)

![](D:\OneDrive\Vue_mustacheu\7.底层tokens思想.png)

![](D:\OneDrive\Vue_mustacheu\7.底层tokens思想1.png)

# 手写实现mustache环境配置

# 手写实现Scanner类

```javascript
/* 扫描器类 */
export default class Scanner {
    constructor(templateStr) {
        // 将模板字符串写到实例身上
        this.templateStr = templateStr;
        // 指针
        this.pos = 0;
        // 尾巴，一开始就是模板字符串原文
        this.tail = templateStr;
    }
    // 功能弱，就是走过指定内容，没有返回值
    scan(tag) {
        if (this.tail.indexOf(tag) == 0) {
            // tag有多长，比如{{长度是2，就让指针后移多少位
            this.pos += tag.length;
            // 尾巴也要变，改变尾巴为从当前指针这个字符开始，到最后的全部字符
            this.tail = this.templateStr.substring(this.pos);
        }
    }

    // 让指针进行扫描，直到遇见指定内容结束，并且能够返回结束之前路过的文字
    scanUtil(stopTag) {
        // 记录一下执行本方法的时候pos的值
        const pos_backup = this.pos;
        // 当尾巴的开头不是stopTag的时候，就说明还没有扫描到stopTag
        // 写&&很有必要，因为防止找不到，那么寻找到最后也要停止下来
        while (!this.eos() && this.tail.indexOf(stopTag) != 0) {
            this.pos++;
            // 改变尾巴为从当前指针这个字符开始，到最后的全部字符
            this.tail = this.templateStr.substring(this.pos);
        }

        return this.templateStr.substring(pos_backup, this.pos);
    }
    // 指针是否已经到头，返回布尔值。end of string
    eos() {
        return this.pos >= this.templateStr.length;
    }
};
```

# 手写将Html变为tokens

# 手写将tokens嵌套起来

# 手写将tokens注入数据

# 手写lookup函数

# 手写passArray函数

# 课程总结





