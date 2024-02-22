# javascript

```JavaScript
// 获取浏览器根节点样式
(document.documentElement.currentStyle ? document.documentElement.currentStyle : window.getComputedStyle(document.documentElement)).fontFamily
```

# feature 

## return

```JavaScript
// Array.map,Array.forEach无法使用return打破循环
```

## vnode

```JavaScript
// 通过$this.$createElement可以创建一个vnode节点
// 可以在elment-ui的messageBox中使用
handler(){
  const h = this.$createElement
  this.$confirm({
    message: h('p',{class: 'test'}, [
      h('p',null, 'html_innerText'),
      h('p',null, 'html_innerText'),
    ])
  })
}
```

## number计算

```JavaScript
// bigDecimal用来解决计算的精度问题,如0.2*0.3
```

## v-model实现

```JavaScript
// 实现v-model语法糖
<input :value="value" @change="inpChange($event.target.value, secPramams)" />
```

## cookie

1. 客户机第一次向服务器发送请求时不会携带`cookie`
2. 在服务器第一次向客户机返回响应数据的时候,会在响应头上携带`set-cookie`,告诉客户机如何创建`cookie`
3. `set-cookie`中`path-value`存在时,只有符合`path-value`的路径请求资源时才会携带`cookie`,`path-value`不存在或为`/`时,则默认所有路径都会携带`cookie`

## 遍历属性键名

```vue
<script>
  // 方法1:for...in遍历对象的属性名,v-for的实现或许也是通过for...in
  // 且当被遍历的对象是number或是整数类型的字符串时,遍历得到的键名将会被排序
  const obj = {
    name: '如月真绫',
    age: 18,
    gender: 'female'
  }
  for( const key in obj){
  	console.log(key) // 输出name,age,gender
  }
  // 方法2:Object.keys()返回一个由一个给定对象的自身可枚举属性组成的数,数组属性名的排列顺序和正常循环遍历该对象时返回的顺序一致
  const object1 = {
    a: 'somestring',
    b: 42,
    c: false
  } 
  console.log(Object.keys(object1))// expected output: Array ["a", "b", "c"]
</script>
```

## 遍历属性键值

```vue
<script>
  // 直接获取对象所有的键值
  const obj = {
    a:1,
    b:2
  }
  const arr = Object.values(obj)
</script>
```

## 解构函数

```vue
<script>
  // 1.解构函数赋值对象的部分属性到目标属性上
  // 剔除差异属性:targetObj有a,b,c,d四个属性;originObj有a,b,c三个属性
  let {d, ...targetObj} = originObj
  // 2. 自执行行数
  const targetObj = (({a, d, e}) => ({a, d, e}))(originObj)
</script>
```

## 三元运算符

```vue
<script>
  x ?:y // 相当于 x ? x : y
  a > b ?:b // 相当于 a > b ? a > b : b 
  // 三元运算符的结果语句可以执行多个操作,每个操作用逗号分隔就可以
  var age = 23;
  var car,school;
  age > 18 ? (
    car = "奇瑞QQ",
    school = "清华第一幼儿园"
    //do someting
  ) : (
    alert("Sorry, you are much too young!")
  );
</script>
```

## 可选链符号

- 可选链符号是一个语法糖
- vue3打包后是ES2016,在TS会将可选链转换为更冗长的代码
- 可选链主要是易维护

## 关于输入框非空的判断

```vue
<script>
  // if(value !== null && value !== undefined && value !== ''){}
  if((value??'') !== ''){}
</script>
```

## 扁平化数组

```vue
<script>
  const deps = {
    '采购部':[1,2,3],
    '人事部':[5,8,12],
    '行政部':[5,14,79],
    '运输部':[3,64,105],
  }
  // 其中使用Infinity作为flat的参数，使得无需知道被扁平化的数组的维度
  let member = Object.values(deps).flat(Infinity) 
</script>
```

## vue标签style绑定对象

```javascript
// vue中可以给标签的style绑定一个对象来设置样式
```



# element-ui

## 插槽

```vue
<!-- Elment-UI通过作用域插槽传值的第二种写法 -->
<template #default="scope"> <!-- 第一种写法为 slot-scope="scope" -->
	<div v-if="scope.row.open"></div>  
</template>
```

## col

```html
<!-- el-col:使一行元素el-row分为24个等分列表,如有两个col,且都具备span则此两个span之和必须为24 -->
<el-col></el-col> 
  <el-col></el-col><!-- 不添加:span属性时,单个col将独占一行 -->
	<el-col></el-col>
<el-col></el-col>
```

## form校验

```JavaScript
// el-form自带的表单校验,但是是对全部带有prop=""属性的输入框进行校验
this.$refs[formName].validate((valid) => {
  if (valid) {}
})
// 根据某事件单独控制某个输入框进行校验需要,参数error为自定义检验中callback(params)中的参数
this.$refs[formName].validateField('phoneNumber',(error)=>{
  if(!error) {}
})
// 重置表单某一项校验的错误提示
this.$refs[formName].clearValidate([propName])
```

## options选中对象

```vue
<!-- el-select的value接收一个对象,value-key的值只要是:value里的任一属性名即可 -->
<el-select v-model="model.object" value-key="propName">
  <el-options :value="{propName:'name', propId:'id'}"></el-options> 
</el-select> 
```

## table表头

```vue
<!-- 多行table表头 -->
<!-- // 1.头部插槽 -->
<el-table-column align="center">
	<template slot="header">
		<div>工具箱</div>
		<div>零件名称</div>
</el-table-column>
<!-- 2.使用\n换行符,加上css的white-space控制 -->
<el-table-column :label="labelFn()" align="center"></el-table-column>

```

## form深层次对象校验

```vue
<!-- el-form中的深层次对象校验 -->
<el-form-item label="true" prop="insuredCompany.insuranceServices">
  <el-checkbox v-model="form.insuredCompany.insuranceServices" />
</el-form-item>
<script>
  form: {
    insuredCompany: { insuranceServices: [] }
  }
  rules: {
    insuredCompany: {
      insuranceServices: [
        { required: true, message: 'warning', trigger: 'change' }
      ]
    }
  }
</script>
```





# plugin

```JavaScript
// 通过插件来简化全局组件的声明过程
// component/index.js:插件插件
import MessageBox from "./MessageBox"// 引入组件
const components = [ MessageBox ]
components.install = (vue) => {// 插件添加install方法,
  vue.component(MessageBox.name,MessageBox)
}
// vue会调用install后执行里面的方法
vue.use(xibui.component)
```



# router

## 重复点击路由跳转功能按键

```JavaScript
// 解决同一个路由多次点击的问题
route.beforeEach(to,from,next()){
  if(to.path === from.path && to.name === from.name) {return}
}
```



## 路由传参

```javascript
// 1.query传参,在url中携带也要传递的字段,页面刷新不会丢失
// 2.params传参,相当于上个页面传递到跳转页面的props,因此页面刷新就会丢失
```



# reg

```vue
<!-- 只能输入数字,且精度为2 -->
<el-form-item label="价格" prop="price">
  <!-- 将非数字和.的内容删除 -->
  <el-input v-model="ruleForm.price" oninput="value=value.replace(/[^0-9.]/g,'')"/>
</el-form-item>
<script>
data() {
    const validateMoney = (rule,value,callback) =>{
        if(!value){
            callback(new Error('价格不能为空'))
         }else if(value.indexOf(".") != -1 && value.split('.').length > 2){
            callback(new Error('请输入正确格式的金额')) //防止输入多个小数点
         }else if(value.indexOf(".") != -1 && value.split('.')[1].length > 2){
           callback(new Error('请输入正确的小数位数')) //小数点后两位
        }else{
          callback();
        }
    };
    return{
     rules: {
        price:[
          { type: 'string',required: true,trigger: 'blur', validator:validateMoney},
        ]
      },
    }
  }
</script>

<!-- 将非数字和英文删除 -->
<el-input v-model="ruleForm.price" oninput="value=value.replace(/[^\d|chun]/g,'')"/>
<!-- 将非字母和数字删除 -->
<el-input v-model="ruleForm.price" oninput="value=value.replace(/[^\w\.\/]/ig,'')"/>
```

```JavaScript
// 只能输入中 英 数字 空格
const reg = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\ ]/

```

```javascript
// 只能输入中 英 某些符号
const reg = /^(?![A-z0-9]+$)(?![A-z~@*()_]+$)(?![0-9~@*()_]+$)([A-z0-9~@*()_]{10,})$/
```

```javascript
// 必须包含一个英文字母
```

```javascript
const ua = window.navgiator.appversion.toLowerCase
ua.match(/edge\/([\d.]+)/))
ua.match(/rv:([\d.]+)\) like gecko/)) // ie
ua.match(/msie ([\d.]+)/)) // ie
ua.match(/firefox\/([\d.]+)/))
ua.match(/chrome\/([\d.]+)/))
ua.match(/opera.([\d.]+)/)) // opera
ua.match(/version\/([\d.]+).*safari/)) // safari
```



# http

## 状态码分类

| 分类 |                   分类描述                    |
| :--: | :-------------------------------------------: |
| 1**  |  信息,服务器收到请求,需要请求者继续执行操作   |
| 2**  |           成功,操作被成功接收并处理           |
| 3**  |       重定向,需要进一步的操作以完成请求       |
| 4**  |   客户端错误,请求包含语法错误或无法完成请求   |
| 5**  | 服务器错误,服务器在处理请求的过程中发生了错误 |

## 状态码列表

| 状态码 | 状态码英文名称                  | 中文描述                                                     |
| ------ | ------------------------------- | ------------------------------------------------------------ |
| 100    | Continue                        | 继续。客户端应继续其请求                                     |
| 101    | Switching Protocols             | 切换协议。服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到HTTP的新版本协议 |
|        |                                 |                                                              |
| 200    | OK                              | 请求成功。一般用于GET与POST请求                              |
| 201    | Created                         | 已创建。成功请求并创建了新的资源                             |
| 202    | Accepted                        | 已接受。已经接受请求，但未处理完成                           |
| 203    | Non-Authoritative Information   | 非授权信息。请求成功。但返回的meta信息不在原始的服务器，而是一个副本 |
| 204    | No Content                      | 无内容。服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档 |
| 205    | Reset Content                   | 重置内容。服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域 |
| 206    | Partial Content                 | 部分内容。服务器成功处理了部分GET请求                        |
|        |                                 |                                                              |
| 300    | Multiple Choices                | 多种选择。请求的资源可包括多个位置，相应可返回一个资源特征与地址的列表用于用户终端（例如：浏览器）选择 |
| 301    | Moved Permanently               | 永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替 |
| 302    | Found                           | 临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI |
| 303    | See Other                       | 查看其它地址。与301类似。使用GET和POST请求查看               |
| 304    | Not Modified                    | 未修改。所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源 |
| 305    | Use Proxy                       | 使用代理。所请求的资源必须通过代理访问                       |
| 306    | Unused                          | 已经被废弃的HTTP状态码                                       |
| 307    | Temporary Redirect              | 临时重定向。与302类似。使用GET请求重定向                     |
|        |                                 |                                                              |
| 400    | Bad Request                     | 4                                                            |
| 401    | Unauthorized                    | 请求要求用户的身份认证                                       |
| 402    | Payment Required                | 保留，将来使用                                               |
| 403    | Forbidden                       | 服务器理解请求客户端的请求，但是拒绝执行此请求               |
| 404    | Not Found                       | 服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面 |
| 405    | Method Not Allowed              | 客户端请求中的方法被禁止                                     |
| 406    | Not Acceptable                  | 服务器无法根据客户端请求的内容特性完成请求                   |
| 407    | Proxy Authentication Required   | 请求要求代理的身份认证，与401类似，但请求者应当使用代理进行授权 |
| 408    | Request Time-out                | 服务器等待客户端发送的请求时间过长，超时                     |
| 409    | Conflict                        | 服务器完成客户端的 PUT 请求时可能返回此代码，服务器处理请求时发生了冲突 |
| 410    | Gone                            | 客户端请求的资源已经不存在。410不同于404，如果资源以前有现在被永久删除了可使用410代码，网站设计人员可通过301代码指定资源的新位置 |
| 411    | Length Required                 | 服务器无法处理客户端发送的不带Content-Length的请求信息       |
| 412    | Precondition Failed             | 客户端请求信息的先决条件错误                                 |
| 413    | Request Entity Too Large        | 由于请求的实体过大，服务器无法处理，因此拒绝请求。为防止客户端的连续请求，服务器可能会关闭连接。如果只是服务器暂时无法处理，则会包含一个Retry-After的响应信息 |
| 414    | Request-URI Too Large           | 请求的URI过长（URI通常为网址），服务器无法处理               |
| 415    | Unsupported Media Type          | 服务器无法处理请求附带的媒体格式                             |
| 416    | Requested range not satisfiable | 客户端请求的范围无效                                         |
| 417    | Expectation Failed              | 服务器无法满足Expect的请求头信息                             |
|        |                                 |                                                              |
| 500    | Internal Server Error           | 服务器内部错误，无法完成请求                                 |
| 501    | Not Implemented                 | 服务器不支持请求的功能，无法完成请求                         |
| 502    | Bad Gateway                     | 作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应 |
| 503    | Service Unavailable             | 由于超载或系统维护，服务器暂时的无法处理客户端的请求。延时的长度可包含在服务器的Retry-After头信息中 |
| 504    | Gateway Time-out                | 充当网关或代理的服务器，未及时从远端服务器获取请求           |
| 505    | HTTP Version not supported      | 服务器不支持请求的HTTP协议的版本，无法完成处理               |

# life

## 交通

1. 做鉴定的时候去事故发生地所在区的物价局。然后坚决不调节，必须全额赔偿。修车期间就打出租车，每次都保留好发票。
2. 把视频发给交警和对方的保险公司，一旦这个人被拘留，那么保险公司就会拒赔，然后你就向你投保的保险公司申请代位赔偿。假设修车需要一万块，物价局的鉴定结果很可能是两万。修车费用+误工费+路费+鉴定费，对方大概要配两万五左右。
3. 因为你申请了代位赔偿，所以后续打官司啥的不用你操心，省心又省力。因为是在物价局做的鉴定，所以定损价格会比四儿子店都高，还多了一笔按照百分比来决定鉴定费。物价局做鉴定还有个好处就是法院和保险公司百分百会认可。
