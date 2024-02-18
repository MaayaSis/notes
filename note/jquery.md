# 了解jQuery

- 原理: 
  - 一个JS函数库:write less,do more
  - 封装简化DOM操作(CRUD)/Ajax
- 作用: 
  - 强大选择器:方便快速查找DOM元素
  - **隐式遍历(迭代):一次操作多个元素**
  - **读写合一:读数据/写数据用的是一个函数**
  - **链式调用:可以通过不断调用jQuery对象的方法**
  - 事件处理
  - DOM操作(CUD)
  - 样式操作
  - 动画
  - 浏览器兼容

# jQuery的基本使用

- 引入jQuery库
  - 本地引入与CDN远程引入
  - 测试版与生产版(压缩版)
- ****
  
- ```javascript
  //使用jQuery对象
  var $btn2 = $('#btn2')
  //使用jQuery函数
   $('#btn2').click()
  ```

# jQuery的两把利器

- jQuery核心函数
  - 当函数用: $(xxx)
  - 当对象用(方法): $.xxx()
- jQuery核心对象
  - 得到jQuery对象: 执行jQuery函数返回的就是jQuery对象
  - 使用jQuery对象: $obj.xxx()

# jQuery函数的使用

jQuery库向外暴露的就是jQuery函数,可以直接使用

* 当成一般函数使用人:$(param)
  * param是function:相当于window.onload=function(文档加载完成的监听)
  * param是选择器字符串:查找所有匹配的DOM元素,返回包含所有DOM元素的jQuery对象
  * param是DOM元素:将DOM元素对象包装为jQuery对象返回
  * param是标签字符串:创建标签DOM元素对象并包装为jQuery对象返回
* 当成对象使用: $.xxx
  * each(obj/arr,function(key,value){})
  * trim(str)

1. 需求:点击按钮,显示按钮的文本,显示一个新的输入框

   ```javascript
   //1.1 参数为函数:dom加载完后,执行此回调函数,等于window.onload = function(文档加载完成的监听)
   $(function(){
     //1.2 参数作为选择器字符串,查找所有匹配的DOM元素,返回包含所有DOM元素的jQuery对象,绑定点击事件的监听
     $('#btn1').click(function(){ 
       //1.3 参数this是发生事件的DOM元素<button>
       alert(this.innerHTML) 
       //1.4 参数this是DOM元素,将this使用jQuery函数封装成jQuery对象,这样可以使用jQuery方法了
       aleer($(this).html() 
       //1.5 参数是标签字符串: 创建标签DOM元素对象并包装为jQuery对象返回
   		$('<input type='text' name='msg'><br/>').appendTo()
     })
   })
   ```

2. 需求

   ```javascript
   //2.1 $.each,隐式变量数组
   var arr = [2,4,7]
   $.each(arr,function(index,item){
     console.log(index,item)
   })
   //2.2 $.trim(),去除两端的空格
   var str = ' maaya '
   console.log('---'+$.trim(str)+'---')
   ```



# jQuery对象的使用

1. jQuery核心对象:
   - 执行jQuery()函数返回的对象
   - jQuery对象内部包含的是DOM元素对象的伪数组(可能只有一个元素)
   - jQuery对象拥有很多的属性和方法,让程序员方便的操作DOM

2. jQuery核心行为:
   - length/size():得到dom元素的个数
   - [index]/get(index):得到指定下标对应的dom元素
   - each(function(index, domEle){}): 遍历所有dom元素
   - index(): 得到当前dom元素在所有兄弟中的下标

```javascript
//需求1. 统计一共有几个按钮
var $buttons = $('button')
console.log($buttons.length,$buttons.size()
//需求2. 取出第二个button里的文本
console.log($buttons[1].innerHTML,$buttons.get(1).innerHTML)//两者都行
//需求3. 呼出所有button标签的文本
$buttons.each(function(index,domElm){
  console.log(index,domElm.innerHTML,this)//this是整个DOM元素
})
//需求4.输出'测试三'按钮是所有按钮中的第几个
console.log($('#btn3').index())
```

伪数组:是Object对象,有length属性,有数值下标属性

```javascript
//建立一个伪数组
var weiArr = {}
weiArr.length = 0
weiArr[0] = 1
weiArr.length = 1
weiArr[1] = 2
for(i=0;i<weiArr.length;i++){
  var obj = weiArr[i]
  console.log(i,obj)
}
console.log(weiArr.forEach,$buttons.forEach)//调用数组特有的方法来判断这两个是否是数组
```

# 基本选择器

- 选择器:
  - 有特定语法规则(css选择器)的字符串
  - 用来查找某个/些DOM元素: $(selector)

- 基本
  - #id
  - tagName
  - .class
  - selector1,selector2,selector3: 并集
  - selector1selector2selector3: 交集

# 层次选择器

- 找子孙后代, 兄弟元素
- selector1>selector2: 子元素
- selector1 selector2: 后代元素

# 过滤选择器

- 在原有匹配元素中筛选出其中一些
  - :first 第一个元素
  - :last 最后一个元素
  - :eq(index) 符合索引的元素
  - :lt 
  - :gt
  - :odd
  - :even
  - :not(selector) 不选择某一类元素
  - :hidden
  - :visible
  - [attrName]
  - [attrName=value]

- 表单
  - :input 提交
  - :text 输入框
  - :checkbox 勾选框
  - :radio 音频
  - :checked 被选中的

# 表格隔行变色

```javascript
$('#data > tbody >tr:odd').css('background','#bbffaa')
```

# 表单选择器

```javascript
//选择不可用的文本输入框
$(function(){
	$(':text:disabled').css('background','red')
})
//显示选择爱好的个数
console.log($(':checkbox:checked').length)
//显示选择的城市名称
$(':submit').onclick(function(){
	var city = $('select>option:selected').html()
	alert(city)
})
```

# 工具方法

- $.each(): 遍历数组或对象中的数据
- $.trim(): 去除字符串两边的空格
- $.type(obj): 得到数据的类型
- $.isArray(obj): 判断是否是数组
- $.isFunction(obj): 判断是否是函数
- $.parseJSON(json) : 解析json字符串转换为js对象/数组

```javascript
var obj = {}
$.each(obj,function(key,value){
  console.log(key, value)
})
console.log($.type(obj))
console.log($.isArray(obj))
console.log($.parseJSON(json))
```

 json整体就2种类型:

- json对象 : {key1:value1,key2:value2}
- json数组: [value1,value2]
- key只能是字符串
- value的类型:string,number,boolean,null,[],{}

# 多Tab点击切换