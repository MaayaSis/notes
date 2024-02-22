# 教程简介

项目流程

1. 先写(拆分)静态页面和静态组件
2. 设置路由跳转关系
3. 发送请求(`api`)
4. `Vuex`三连环
5. 组件获取`Vuex`仓库数据,动态展示

# vue-cli脚手架创建项目

- node_modules:放置项目依赖的地方
- public:一般放置一些共用的静态资源，打包上线的时候，public文件夹里面资源原封不动打包到dist文件夹里面
- src:程序员源代码文件夹
  1. assets：经常放置一些静态资源（图片）,assets文件夹里面资源webpack会进行打包为一个模块（js文件夹里面）
  2. components:放置非路由组件（或者项目共用的组件）
  3. `App.vue`:唯一的根组件
  4. main.js:入口文件
- `babel.config.js:babel`配置文件
- package.json：看到项目描述、项目依赖、项目运行指令
- README.md:项目说明文件

# 项目的其它配置

```javascript
// package.json
scripts": {
"serve": "vue-cli-service serve --open",// --open:在运行项目后,使浏览器自动打开
}
```

```javascript
// vue.config.js
module.exports = {
  lintOnSave:false,// 关闭Eslint语法校验
}
```

```javascript
// jsconfig.json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": [// 为src文件夹配置别名
        "src/*"
      ]
    },
    "exclude": [// 别名无法在数组中的文件夹内使用
    	"node_modules",
    	"dist"
    ]
  }
}
```

# 项目的路由分析

前端路由:K即为URL（网络资源定位符）;V即为相应的路由组件

路由分析:确定项目结构顺序为上中下,只有中间部分的V在发生变化,中间部分应该使用的是路由组件

1. 路由组件:Home、Search、Login（没有底部的Footer组件，带有二维码的）、Register（没有底部的Footer组件，带二维码的）
2. 非路由组件:Header 、Footer

# Header和Footer非路由组件完成

```javascript
// 安装less:浏览器不识别less语法,需要loader进行处理
npm i less less-loader@7 --save// 使用7版本,5版本error
```

# 完成路由组件的搭建

```javascript
// 安装vue-router
npm i vue-router@3 // 使用3版本,4版本的v
```

1. 创建路由:定义,引入,注册,使用
2. 路径:路由组件放置在pages文件夹,非路由组件放置components文件夹
3. 路由组件需要在router文件夹中被引入进行注册
4. 非路由组件:以标签的形式使用
5. $route和$router属性在路由和非路由组件上都存在
   - $route:获取路由信息,路径,query,params等
   - $router:进行编程式导航进行路由跳转,push和replace

# 路由元信息的使用

1. 有的组件会展示在所有组件身上,但恰好在某些路由组件需要被隐藏
1. v-if会频繁操作DOM节点,因此相比v-show会更耗性能
2. 非路由组件存在当前身上所展示的路由组件的$route

```javascript
// 在配置路由的时候,可以给路由组件添加路由元信息meta,需要添加的自定义属性都只能存放在meta中
routes:[
  {
    path:"/home",
    component:"Home",
    meta:{
      show:true
    }
  }
]
// 判断当前路由组件上的show值来决定组件是否展示
<Footer v-show="$route.meta.show"></Footer>
```

# 路由传递参数

路由传参的三种方法:

```javascript
// router配置
{
  path:"/search/:keyword/:number",// 使用占位符后才能以params形式传参
  component:Sarch,
  name:"search"
}
```

- 字符串写法

```javascript
goSearch(){
  // params和query两种可以一起使用
  this.$router.push("/search/"+this.keyword+"?k="+this.keyword.toUpperCase())
}
```

- 模板字符串

```javascript
goSearch(){
  this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
}
```

- 对象写法

```javascript
// 最常用的传参方式:但是必须配置name属性才能使用,同样也是要早path中占位
// 对象写法可以:path和name都可以使用
goSearch(){
  this.$router.push({name:"",params:{keyword:this.keyword},query:{k:this.keyword}})
}
```

# 路由传参相关面试题

- 路由传递参数（对象写法）path是否可以结合params参数一起使用?

```javascript
// 不可以:对象传参写法不能与path一起使用
this.$router.push({path:"/search",params:{keyword:this.keyword},query:{k:this.keyword}})
```

- 如何指定params参数可传可不传?

```javascript
// 如果路由设置了传递params参数,但是使用时不传,会发现URL出现问题
// 在params参数后添加一个?,那么使用时就可传可不传
{
  path:"/search/:keyword?/:number?",// 使用占位符后才能以params形式传参
}
```

- 当params参数可传也可不传时,传递的动态值是空串,该如何解决?

```javascript
// 使用||:当你传递的时一个非空串,那么它必然是true,否则就会跳转到第二个值
this.$router.push({name:"search",params:{keyword:""||undefined},query:{k:this.keyword}})
```

- 路由组件能不能传递props数据?

```javascript
// 可以,但是一般不适用props传参
// 1.布尔值写法:只能将params参数作为props传递给路由组件
{
  path:"/search/:keyword",
  props:true
}
// 2.对象写法:额外的给路由组件传递固定的props
props:{keyword:1,k:2}
// 3.函数写法:params和query都可以传递给路由组件
props:($route)=>{
  return {keyword:$route.params.keyword,k:$route.query.k}
}
// 要跳转的路由组件search
export module {
  props:["keyword","k"]
}
```

# 重写push和replace方法

编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误?

1. 声明式导航内部已经解决这种问题
2. 这种异常,对于程序正常没有任何影响
3. 出现这种现象是
4. 由于vue-router最新版本3.5.2,引入了promise,当传递参数多次且重复,会抛出异常,因此出现上面现象

解决方法:

- 是给push函数,传入相应的成功的回调与失败的回调

```javascript
// 没办法根本解决
this.$router.push({name:"search",params:{keyword:""||undefined},query:{k:this.keyword}},()=>{},()=>{})
```

- push()是this.$router在它的构造函数VueRouter的原型对象上找到的方法

```javascript
// 先将VueRouter原型对象的push先保存一份,这样就可以在选择是用原生的push方法还是重写的push方法
let originPush = VueRouter.prototype.push
// 重写push|replace:将push替换replace即可
VueRouter.prototype.push = function(loactuin,reject,resolve){
  if(reject&&resolve){
    // 因为originPush是在全局window下调用,如果直接调用则this指向window
    // 因此通过call()或者apply,
    // call和apply区别:call传递多个参数使用`,`隔开,apply则使用数组
    originPush.call(this,location,reject,resolve)
  }else{
    originPush.call(this,location,()=>{},()=>{})
	}
}
```

# home首页组件拆分业务分析

# TypeNav三级联动全局组件完成

# home首页拆分静态组件

# 接口说明_补录

# POSTMAN工具测试接口

服务器返回的数据code字段200,代表服务器返回数据成功

整个项目的接口前缀都有/api字样

# axios二次封装

XMLHttpRequest,fetch,Query,axios

二次封装axios:为了设置拦截器

1. 设置请求拦截器:可以在发请求之前处理一些业务
2. 设置响应拦截器:当服务器返回数据后,可以处理一些事情

```javascript
// src/axios.js
// 引入axios
import axios from "axios";

// 1.利用axios对象的方法create,创建一个axios实例
// 2.request就是axios,只不过稍微配置一下
const requests = axios.create({// 传入配置对象
    // 设置基础路径,发请求的时候,路径当中会出现api:bing.com/api
    // 请求超时5s
    baseURL: "/api",
    timeout: "5000"
})
// 请求拦截器
requests.interceptors.request.use((config) => {// config:配置对象,对象里面有一个属性很重要headers请求头
    return config
})
// 响应拦截器
// 传入两个参数作为响应拦截器返回的promise的成功与失败的回调
requests.interceptors.response.use((res) => {// 成功的回调
    return res.data
}, (error) => {
    // 失败的回调
    return Promise.reject(new Error(error))
}) 
export default requests
```

# API接口统一管理

```javascript
// axios/requests.js
const requests = axios.create({// 传入配置对象
  // 设置基础路径,发请求的时候,路径当中会出现api:bing.com/api
  // 请求超时5s
  baseURL: "/api",
  timeout: "5000"
})
```

```javascript
// 对axios请求经行二次封装
// axios/index.js:此模块对API进行统一管理  
// 当有页面需要此数据时,直接调用函数就能发送请求,否则有一百个页面,每个页面都各自发送请求太麻烦
import ajax from './ajax'
export const reqBaseCategoryList = ()=> requests({url:"/product/getBaseCategoryList",method:"get"})
```

```javascript
// vue.config.js相当于webpack.config.js
// 配置代理服务器
// 开启代理服务器后,发送的所有请求默认会变成http://localhost:8080/
// 然后再经过二次封装的函数添加`/api`,添加`/product/reqBaseCategoryList`
devServer: {
  proxy: {
    '/api': { // 只对请求路由以/api开头的请求进行代理转发
    	target: 'http://gmall-h5-api.atguigu.cn', // 转发的目标url
    }
  }
}
```

# nprogress进度条的使用

当项目发送请求时会出现一个进度条

```javascript
// 安装nprogress包
npm i nprogress
```

```javascript
// api/request.js
import nprogress from "nprogress";
import "nprogress/nprogress.css";// 引入样式:在nprogress.css中的 .bar可以修改颜色
// 请求拦截器中
nprogress.start()
// 响应拦截器中
 nprogress.done()
```

# vuex模块式开发

使用vuex模块式开发:避免数据臃肿带来的不便

```javascript
// store/home.js:创建小仓库
const actions = {}
const mutations = {}
const state = {}
const getters = {}
export default {
    actions,
    mutations,
    state,
    getters
}
```

```javascript
// store/index.js:将小仓库引入到大仓库中
import Vuex from "vuex"
import Vue from "vue"

Vue.use(Vuex)

import home from "./home"
import search from "./search

export default new Vuex.Store({
  modules: {
    home,
    search
  }
})
```

```javascript
// main.js
import Vue from 'vue'
import App from './App.vue'
import router from "@/router"
import Store from './store' // 引入vuex仓库

new Vue({
  render: h => h(App),
  router,
  store// 使用vuex仓库
}).$mount('#app')
```

# 动态展示三级联动数据

```vue
<template>
<div v-if="c1 in categoryList" :key="c1.categoryID">{{c1.categoryName}}</div>
</template>
<script>
  import { mapState } from "vuex";
export default {
  name: "TypeNav",
  mounted(){
    this.$store.dispatch("categoryList")
  },
  computed: {
    ...mapState({
      categoryList: state=>state.home.categoryList// 对象形式获取state值,state为大仓库,home为小仓库
    })
  }
};
</script>
```

```javascript
// store/home.js
import { reqBaseCategoryList } from "@/api"
const actions = {
  async categoryList ({commit}){// await必须在async函数中使用
    const result = await reqBaseCategoryList()// await可以直接获得Promise的成功,失败则要用try catch捕获,此处不考虑失败
    if(result.code == 200) commit("CATEGORYLIST",result.data)
  }
}
const mutations = {
  CATEGORYLIST(state,categoryList){// 第二个参数接收commit("moutationsFnName",value)中的value
    state.categoryList = categoryList
  }
}
const state = { categoryList:[] }
const getters = {}
export default {
  actions,
  mutations,
  state,
  getters
}
```

# 完成三级联动动态背景颜色

```vue
<div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryID" :class="{cur:currentIndex == index}"></div>
<h3 @mouseenter="addColor(index)"></h3>
```

# 通过JS控制二三级分类与显示与隐藏

```vue
<div :style="{display:currentIndex==index?'block':'none'}"></div>
```

# 演示卡顿现象引入防抖与节流

正常:事件触发非常频繁,而且每一次的触发,回调函数都要去执行,当时间很短,而回调函数内部有计算,那么很可能出现浏览器卡顿

```javascript
// TypeNav.vue
// 快速进出能触发事件的标签,会发现函数只触发了部分
methods:{ changeIndex(){} }
```

# 函数防抖的理解

防抖:将之前的所有的触发都取消,最后一次执行在规定的时间之后才会触发,也就是说如果连续快速的触发只会执行一次

```javascript
// 防抖:用户操作频繁,但是操作只执行一次
// lodash:封装函数的防抖与节流的业务(闭包+延迟器) 
// 下载lodash包
npm install lodash --save
// 引用:老师使用的是scipt引入,所以npm包的引入方式需要查看官方文档
input = querySelector("input")
// _是lodash封装好并向外暴露的函数
input.onput = _.dobounce(function(){// dobounce可以传入参数:callback,delayData,Options
  console.log("1")
},1000)
```

# 函数节流的理解

节流:在规定的间隔时间范围内不会重复触发回调,只有大于这个时间间隔才会触发回调,把频繁触发变为少量触发

```javascript
// 节流:用户操作频繁,但是操作需要生效多次,因此把频繁的操作变为少量操作(给浏览器充裕的时间解析代码)
let span = document.querySelector('span');
let button = document.querySelector('button');
let count = 0;
// 计数器:在5秒以内，数字只能加上1
button.onclick =_throttle(function(){
  // 节流:目前这个回调函数5S执行次
  // 假如这里面有很多的业务代码，就可以给浏览器很充裕的时间去解析
  count++;
  span.innerHTML = count;
  console.log('执行');
},5000)
```

# 三级联动节流

```javascript
// lodash函数按需引入
// throttled的回调不能使用箭头函数,会导致this指向出问题
import thorttle from 'lodash/thorttle'
methods:{
  changeIndex:thorttle(function(index){
    this.currentIndx = index
  },100)
}
```

# 三级联动路由跳转的分析

`router-link`声明式导航:会创建一个组件,当服务器的数据返回之后,循环出所有的router- link组件,即创建组件实例的1000+,这样很耗内存,会出现卡顿现象

```javascript
// push|replace编程式路由导航
// 通过编程式路由导航+事件委派解决:这样就可以解决委派事件过多的缺点
// 但是无法确定是哪个子元素触发的事件
```

# 完成三级联动的路由跳转与参数传递业务

1. 事件委派存在的问题:h3,dt,dl,em标签都的点击事件都被委派给了父节点
2. 只有点击a标签才能跳转,且是对应级别的a标签才可以,要怎样确认呢

```html
<!-- `:`是v-bind,`data-`可以自定义一个数据属性,此数据会出现在此标签的`dataset`身上 -->
<a :data-categoryname="c2.categoryName" :data-category2Id="c2.categoryID">{{c2.categoryName}}</a>
```

```javascript
// 给父节点绑定委派事件
<div class="all-sort-list2" @click="goSearch">
// 定义事件的回调:里面的变量名有点乱
methods:{
  goSearch(event){
    let {categoryname,category1id,category2id,category3id} = event.target.dataset
    if(categoryname){
      let location = {name:'search'}
      let query = {categoryName:categoryname}
      if(category1id){// 区分一级,二级,三级目录
        query.category1ID = category1id
      }else if(category2id){
        query.category2ID = category2id
      }else{
        query.category3ID = category3id
      }
      location.query = query
      this.$router.push(location)
    }
  }
}
```

# 复习

1. 商品分类的三级列表由静态变为动态形式:获取服务器数据;解决跨域问题
2. 函数防抖与节流:面试频率高
3. 声明式导航(router-link):会创建多个组件,性能表现不好
4. 编程式导航`push|replace`

# search模块中商品分类与过渡动画

```html
<!-- 过渡动画需要通过transition包裹标签 -->
<div @mouseleave="leaveShow" @mouseenter="changeShow">
  <transition name="sort"><!-- 需要添加name属性 -->
    <div v-show="show"></div>
  </transition>
</div>
```

```javascript
data(){
  return{
    show:true
  }
}
methods:{
  leaveShow() {
    this.currentIndex = -1;
    if (this.$route.path == "/search") this.show = false;
  },
  changeShow() {
    this.show = true;
  },
},
mounted() {
  this.$store.dispatch("categoryList");
  // 路由组件跳转时:mounted函数会被加载
  if (this.$route.path == "/search") {
  	this.show = false;
  }
},
```

# typeNav商品分类列表的优化

```javascript
// home.vue跳转到search.vue,hone.vue上的TypeNav.vue就会被销毁一次,同理search跳转到home也会销毁一次TypeNav
// 又因为TypeNave上挂载了请求函数,所以请求会被反复执行
mounted() { this.$store.dispatch("categoryList") }
// 为了考虑性能:使getBaseCategroyList请求只发送一次
// 将发送请求挂载在APP.vue的mounted上
mounted() { this.$store.dispatch("categoryList") }// APP.vue只会被执行一次
// 不能放在main.js上,因为this会变得无指向
```

# 合并参数

合并params和query参数

```javascript
// 在传递params参数时,查询是否路由组件已存在query参数
goSearch() {
  let location = {
    name: "search",
    params: { keyword: this.k || undefined }
  };
  // 如果有则给location添加上query参数,和params一起传递过去
  if (this.$route.query) {
    location.query = this.$route.query
  }
  // 传递query的逻辑也是一样的
  this.$router.push(location);
}
```

# mockjs模拟数据

mock:将浏览器发送的Ajax请求拦截下来,并且生成随机的数据返回给浏览器

1. 安装mock
2. 创建`src/mock/`文件夹
3. 准备JSON数据,在`src/mock/`文件夹中创建相应的JSON文件;将文件格式化一下,文件中留下空格会跑不起来
4. 把mock数据需要的图片放置到`/public`在打包的时候,会把`/public`中相应的资源原封不动打包到dist文件夹
5. 通过mockjs模块实现,虚拟的数据的模拟

```javascript
// 下载mockjs包
npm i mockjs --save
// 省略创建/src/mock/banner.json;/src/mock/floor.json

// 创建/src/mock/mock.js
import Mock from "mockjs"
// json和图片等数据格式不需要对外暴露也可以直接使用
// webpack默认对外暴力的:图片,JSON数据格式
import banner from "./banner"
import floor from "./floor"
// mock:第一个参数请求地址,第二个参数:请求数据
// 虽然调用了方法,并加了(),表示下面的Mock.mock方法执行
// 但没被人引用,实际还是没执行
// 在main.js中被引入即可
Mock.mock("./mock/banner",{code:200,data:banner})
Mock.mock("./mock/floor",{code:200,data:floor})
```

# 获取Banner轮播图的数据

参考[20]动态展示三级联动数据

# swiper基本使用

1. 引包(引入JS|CSS)
2. 页面中必须存在HTML结构
3. 通过new Swiper实例操作HTML结构动态添加轮播图效果

# Banner实现轮播图第一种解决方法

# 获取floor组件mock数据

# 轮播图通过watch和nectTick解决

`vm.nectTick([callback,context])`:在修改数据之后立即使用这个方法,获取因为数据改变而更新后的DOM

```javascript
// watch和$nectTick要绑定一起使用
npm i swiper@5 
// 在对应的HTML标签中加上swiper的类名
// y
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
watch: {
  // 当banners属性开始改变时,调用this.$nextTick并在在下一轮设置轮播图
  banners() {
    //能在这里直接初始化Swiper类的实例吗?
    //不能在当前状态直接初始化Swiper类的实例,因为这里只能保证数据发生变化了[服务器数据回来了],
    //但是你不能保证v-for遍历的结构完事了.
    this.$nextTick(() => {
      //初始化Swiper类的实例
      var mySwiper = new Swiper(this.$ref.cur, {// 为标签设置$ref属性,来为Swiper绑定标签
        //设置轮播图防线
        direction: "horizontal",
        //开启循环模式
        loop: true,
        // 如果需要分页器
        pagination: {
          el: ".swiper-pagination",
          //分页器类型
          type: "bullets",
          //点击分页器，切换轮播
          clickable: true,
        },
        //自动轮播
        autoplay: {
          delay: 1000,
          //新版本的写法：目前是5版本
          // pauseOnMouseEnter: true,
          //如果设置为true，当切换到最后一个slide时停止自动切换
          stopOnLastSlide: true,
          //用户操作swiper之后，是否禁止autoplay
          disableOnInteraction: false,
        },
        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        //切换效果
        // effect: "cube",
      });

      //1:swiper插件,对外暴露一个Swiper构造函数
      //2:Swiper构造函数需要传递参数 1、结构总根节点CSS选择器|根节点真实DOM节点  2、轮播图配置项
      //鼠标进入停止轮播
      mySwiper.el.onmouseover = function () {
        mySwiper.autoplay.stop();
      };
      //鼠标离开开始轮播
      mySwiper.el.onmouseout = function () {
        mySwiper.autoplay.start();
      };
    });
  }
}
```

# 动态展示Floor组件

```javascript
// 因为有两个floor组件
// 需要通过v-for将State.Home仓库中的floorList属性在父组件home传递给子组件
// 子组件通过props接收
props:["list"],
// 不同于listContainer组件中的数据是从服务器中获取
// floor组件的数据是从父组件传递的
// 因此在组件创建之后在`create`周期就有了list属性,因此监听不到`list`的改变,所以使用mounted
mounted(){
  new Swiper(options)
}
```

# 共用组件carousel

```javascript
// 因为存在两个floor组件,他们有共同的轮播图
// 所以将轮播图相关的HTML,JS提取出来
// 创建全局组件carousel,并在main中全局注册
// 放弃在mounted中使用,是为了和listContainer中的写法一样
watch: {
  list: {
    immediate: true,
      handler() {
      this.$nextTick(() => {
        var mySwiper = new Swiper(this.$refs.cur, {
          //设置轮播图防线
          direction: "horizontal",
          //开启循环模式
          loop: true,
          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination",
            //分页器类型
            type: "bullets",
            //点击分页器，切换轮播
            clickable: true
          },
          //自动轮播
          autoplay: {
            delay: 1000,
            //新版本的写法：目前是5版本
            // pauseOnMouseEnter: true,
            //如果设置为true，当切换到最后一个slide时停止自动切换
            stopOnLastSlide: true,
            //用户操作swiper之后，是否禁止autoplay
            disableOnInteraction: false
          },
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }
          //切换效果
          // effect: "cube",
        });
        //1:swiper插件,对外暴露一个Swiper构造函数
        //2:Swiper构造函数需要传递参数 1、结构总根节点CSS选择器|根节点真实DOM节点  2、轮播图配置项
        //鼠标进入停止轮播
        mySwiper.el.onmouseover = function() {
          mySwiper.autoplay.stop();
        };
        //鼠标离开开始轮播
        mySwiper.el.onmouseout = function() {
          mySwiper.autoplay.start();
        };
      });
    }
  }
}
```

# Search模块的静态组件

1. 先写(拆分)静态页面和静态组件
2. 设置路由跳转关系
3. 发送请求(api)
4. Vuex三连环
5. 组件获取Vuex仓库数据,动态展示

# search模块vuex操作

```javascript
// search.vue
mounted(){
  this.$store.dispatch("getSearchInfo",params)
}

// 对axios请求就行二次封装
// 需要注意的是`params`参数要放在`data`属性中,而不是params
export const reqSearchInfo = (params)=> requests({url:"/list",method:"post",data:params})

// /store/search.js
import { reqSearchInfo} from "@/api"
const actions = {
  async getSearchInfo({commit},params={}){
    console.log(params);
    let result = await reqSearchInfo(params)
    console.log(result);
    if(result == 200){
      commit("GETSEARCHINFO",result.data)
    }
  }
}
const mutations = {
  GETSEARCHINFO(state,SearchInfo){
    state.SearchInfo = SearchInfo
  }
}
const state = { SearchInfo:{} }
const getters = { }
export default {
  actions,
  mutations,
  state,
  getters
}
```

#  search模块中动态展示产品列表

```javascript
// /store/search.js
const getters = {
  goAttrs(state) {
    return state.SearchInfo.attrsList
  },
  goGoods(state) {
    // 因为是通过getters获取了state中的goodsList
    // 当用户网络速度慢,服务器还没有返回数据的时候,`state.SearchInfo.goodsList`就是undefined
    // 因为v-for遍历undefined会报错,所以要保证返回的数据至少是一个数组
    return state.SearchInfo.goodsList||[]
  },
  goTrademark(state) {
    return state.SearchInfo.trademarkList
  }
} 
// search.vue
// 因为store仓库下有许多小仓库,而小仓库的state,actions,mutations各自是独立的:state.home.attrs
// 但是所有小仓库的getters是存放在一起的:state.attrs
// 所以无法简写成[22]的格式
computed:{
  ...mapState({attr:(state)=>state.home.attr)
}
// 所以简写形式如[18]
computed:{
  ...mapGetters(["goAttrs","goGoods","goTrademark"])
}
```

# search模块根据不同参数进行展示

```javascript
// 重点:由于dispatch方法被挂载在mounted周期,所以在search页面时无法实现this.$route.query与this.$route.params参数只要改变就重新发送dispatch请求的方法

// /search/search.vue
// 使用v-for遍历样式:此处省略
// 设定数据
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        category1Id: "", //一级分类的id
        category2Id: "", //二级分类的id
        category3Id: "", //三级分类的id
        categoryName: "", //商品的名字
        keyword: "", //用户搜索的关键字
        props: [], //商品属性的搜索条件
        trademark: "", //品牌的搜索条件
        order: "1:desc", //排序的参数 【默认初始值:1:desc】
        pageNo: 1, //当前分页器的页码  【默认初始值:1】
        pageSize: 3 //代表当前一页显示几条数据 【默认初始值:10】
      }
    };
  },
  methods:{
    getData(){
      this.$store.dispatch("getSearchInfo", this.searchParams)
    }
  },
  computed: {
    ...mapGetters(["goAttrs", "goGoods", "goTrademark"])
  },
  // 钩子函数:beforeCreate、created、beforeMount.执行都是在mounted之前
  // 合并整理参数不能在：beforeCreate因为不能获取VC属性、方法
  beforeMount() {
    //商品分类搜索条件
    // 将几个对象合并在一起,但是因为searchParams中存在属性与另外两个相同,所以会替换
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    // this.$store.dispatch("getSearchInfo", {}); 将其封装
    //把请求的函数进行封装,将来需要多次请求数据,调用多次函数[函数可以复用]
    this.getData();
  },
};
```

# search模块中子组件动态开发

# 监听路由的变化再次发请求获取数据

```javascript
watch:{
  $route(newValue,oldValue){
    Object.assign(this.searchParams, this.$route.query, this.$route.params);// 合并对象
    this.getData();
    this.searchParams.category1Id = ""
    this.searchParams.category2Id = ""
    this.searchParams.category3Id = ""
  }
}
```

# 面包屑处理分类的操作

```javascript
removeCategoryName() {
  this.searchParams.categoryName = undefined;
  this.searchParams.category1Id = undefined;
  this.searchParams.category2Id = undefined;
  this.searchParams.category3Id = undefined;
  // 直接重新向服务器发送请求,修改数据,页面会变化,但是路径不会变化
  this.get()
  
  // 有因为categoryName,categoryId,keyword,同属于路径的一部分
  // 所以当这几个属性发送改变而使页面发送变化时,也应该通过路由重新跳转一次页面
  
  // 判断是否有params参数,有则带着params参数一起重新路由跳转
  
  // 但此处有bug,this.$route.params是对象,对象的值始终为true,所以不执行else语句(这或许可以优化)
  if (this.$toute.params) {
    this.$router.psuh({ name: "search", params: this.$route.params });
  }else{
    this.$router.push({ name: "search"});
  }
}
```

# 面包屑处理关键字

```javascript
// 通过全局事件总线
// main.js
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  router,
  store
}).$mount('#app')
// header.vue
mounted(){
  this.$bus.$on("clear",()=>{
    this.k = ""
  })
}
// search.vue
// 设置删除面包屑时触发全局事件总线
methods:{
  removeKeyword() {
    this.searchParams.keyword = undefined;
    this.$bus.$emit("clear");
    if (this.$route.query) {
      this.$router.push({ name: "search", query: this.$route.query });
    }
  },
}
```

# 面包屑处理平牌信息

```js
// 父组件search
// 设置面包屑v-if展示,与点击删除事件
<li class="with-x" v-if="searchParams.trademark">
  {{searchParams.trademark.split(":")[1]}}
  </li>
// 给子组件传递回调方法 
<SearchSelector @tradeMarkHandler="tradeMarkHandler" />
// 子组件SearchSelector
// 绑定点击事件
<li v-for="tradeMark in goTradeMark" :key="tradeMark.tmId" @click="getTradeMark(tradeMark.tmId,tradeMark.tmName)">{{tradeMark.tmName}}</li>
```

```javascript
// 父组件search
// 设置回调方法,删除事件
tradeMarkHandler(tmId,tmName){
  this.searchParams.trademark = `${tmId}:${tmName}`,
  this.getData()
},
removeTradeMark(){
  this.searchParams.trademark = undefined,
  this.getData()
}
// 子组件SearchSelector
methods:{
  getTradeMark(tmId,tmName){
    this.$emit("tradeMarkHandler",tmId,tmName)
  },
}
```

# 平台售卖属性的操作

```javascript
// HTML省略
// search父组件为子组件SearchSelector绑定自定义事件
attrList(attrs, attrValue) {
  let props = `${attrs.attrId}:${attrValue}:${attrs.attrName}`;
  if (this.searchParams.props.indexOf(props) == -1) {// 过滤相同的属性
    this.searchParams.props.push(props);
    this.getData();
  }
},
// 点击删除面包屑事件
removeAttrList(index) {
  this.searchParams.props.splice(index,1)// 通过splice方法删除,vue才能监测到
  this.getData()
}
// 省略子组件触发事件并传递数据
```

# 排序操作上

# 排序操作下

# 分页器静态组件

# 排序复习

```vue
<template>
<li :class="{active:isOne}" @click="sort(1)">
  <a>综合<span v-show="isOne" class="iconfont" :class="{'icon-up1':up,'icon-down-copy':down}"></span></a>
</li>
</template>
<script>
  //默认order: "1:desc", 
sort(index) {
  let originFlag = this.searchParams.order.split(":")[0];
  let originSort = this.searchParams.order.split(":")[1];
  if (index == originFlag) {
    this.searchParams.order = `${originFlag}:${
      originSort == "desc" ? "asc" : "desc"
    }`;
  } else {
    this.searchParams.order = `${index}:${originSort}`;
  }
}
computed: {
  isOne() { return this.searchParams.order.indexOf("1") != -1 },
  isTwo() { return this.searchParams.order.indexOf("2") != -1 },
  down() { return this.searchParams.order.indexOf("desc") != -1 },
  up() { return this.searchParams.order.indexOf("asc") != -1 },
},  
</script>
```

# 分页功能分析

Element-UI中有分页器,但实际项目中可能有自定义的要求,所以在此自定义写一个分页器

分页器展示需要的数据:

1. pageNo:当前的页数
2. pageSize:代表每一页展示多少条数据
3. total:代表整个分页一共要展示多少条数据
4. continues:代表分页连续页码个数
5. 备注:在开发中使用假的数据进行测试,成功后再使用真正的

# 分页器起始与结束计算

```javascript
computed: {
  totalPage() {
    return Math.ceil(this.total / this.pageSize);
  },
  startAndEnd() {
    const { pageNo, continues, totalPage } = this;
    let start = pageNo - parseInt(continues / 2);
    let end = pageNo + parseInt(continues / 2);
    // 关键:当前页为第二页,那么再通过`pageNo - parseInt(continues / 2)`计算开始页`start`会得到一个负值,所以要排除此种情况
    if (start < 1) {
      start = 1;
      end = continues;
    }
    if (end > totalPage) {
      end = totalPage;
      start = totalPage - continues + 1;
    }
    return { start, end };
  }
},
```

# 分页器动态展示

```html
<!-- 重点:每一处的if判定都要仔细思考一遍 -->
<button v-if="startAndEnd.start > 1" @click="respondPagaNo(1)">1</button>
<button v-if="startAndEnd.start > 2">···</button>
<button
	// v-for可以遍历对象,数组,字符串,Number
  v-for="pageNumber in startAndEnd.end"
  :key="pageNumber"
  v-if="pageNumber >= startAndEnd.start"
  @click="respondPagaNo(pageNumber)"
>{{pageNumber}}</button>
<button v-if="startAndEnd.end < totalPage - 1">···</button>
<button v-if="startAndEnd.end < totalPage " @click="respondPagaNo(totalPage)">{{totalPage}}</button>
```

# 分页器完成

```javascript
// 通过父组件给子组件绑定自定义事件完成当前页数的数据的传递
```

# 分页器添加类名

```javascript
:class="{active:pageNumber==pageNo}"
,active{
	background-color: #409eff;
}
```

# 滚动行为

```javascript
// 将/router/index.js中的路由配置信息,单独拆分成一个routes文件,使组成不至于太臃肿
// /router/index.js
export default new VueRouter({
  routes,
  scrollBehavior() {
    //滚动行为这个函数,需要有返回值,返回值为一个对象。
    //经常可以设置滚动条x|y位置 [x|y数值的设置一般最小是零]
    return { y: 0 };
  }
})
```

# 产品详情数据获取

```javascript
// 组件挂载dispatch请求
mounted(){
  this.$store.dispatch("getDetailList",this.$route.params.goodId)
}
// 创建api请求
export const reqDetailList = (params)=> requests({url:`/item/${params}`,method:"get"})
// 创建detail文件的vuex仓库
import { reqDetailList } from "@/api"
const actions = {
  async getDetailList({commit},params){
    let result = await reqDetailList(params)
    if(result.code == 200){
      commit("GETDEATILLIST",result.data)
    }
  }
}
const mutations = {
  GETDEATILLIST(state,DetailList){
    state.DetailList = DetailList
  }
}
const state = {
  DetailList:{}
}
```

# 产品详情展示动态数据

# 分页器复习

# zoom放大镜展示数据

```javascript
// 父组件
// prop传递属性
<Zoom :skuImageList="skuImageList"/>
<ImageList :skuImageList="skuImageList"/>
computed: {
  ...mapGetters(["categoryView", "skuInfo"]),
    skuImageList(){
    // 将undefined的数据转变成空对象{}
    return this.skuInfo.skuImageList || {}
  }
}
// 子组件zoom和ImgList
<img :src="skuImage.imgUrl" />
props:["skuImageList"],
computed: {
  skuImage() {
    // 将undefined的数据转变成空对象{}
    return this.skuImageList[0]
  }
}
```

# detail路由组件展示商品售卖属性

```html
<!-- ImgList组件 -->
<div class="swiper-slide" v-for="slide in skuImageList" :key="slide.id">
  <img :src="slide.imgUrl" />
</div>
```

```html
<dl v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
  <dt class="title">{{saleAttr.saleAttrName}}</dt>
  <dd
      changepirce="0"
      v-for=" saleAttrValue in saleAttr.spuSaleAttrValueList"
      :class="{active:saleAttrValue.isChecked == 1}"
      >{{saleAttrValue.saleAttrValueName}}</dd>
</dl>
```

# 产品售卖属性值排他操作

```html
<!-- 绑定事件 -->
<dd
  changepirce="0"
  v-for=" saleAttrValue in saleAttr.spuSaleAttrValueList"
  :key="saleAttrValue.id"
  :class="{active:saleAttrValue.isChecked == 1}"
  @click="changechecked(saleAttrValue,saleAttr.spuSaleAttrValueList)"
>{{saleAttrValue.saleAttrValueName}}</dd>
```

```javascript
methods:{
  changechecked(saleAttrValue,arr){
    arr.forEach(item => {
      item.isChecked = "0";
    });
    saleAttrValue.isChecked = "1"
  }
},
```

# 放大镜上

```html
<!-- 设置子组件点击函数 -->
<div class="swiper-slide" v-for="(slide,index) in skuImageList" :key="slide.id">
  <img :src="slide.imgUrl"
       :class="{active:currentIndex==index}"
       @click="handler(index)"/>
</div>
```

```javascript
// 子组件调用全局事件总线
methods: {
  handler(index){
    this.currentIndex = index
    this.$bus.$emit("getIndex",index)
    console.log(index);
  }
}// 父组件挂载全局之间总线
data() {
  return {
    index:0
  };
},
computed: {
  skuImage() {
    return this.skuImageList[this.index] || {};
  }
},
mounted() {
// 计算属性无法被修改
// 所以无法将使用参数充值`skuImage`计算属性,只能通过改索引的方法来改变`skuImgae的值`
  this.$bus.$on("getIndex", index => {
  this.index = index;
  });
}
```

# 放大镜

```javascript
methods:{
  // 大图时正常图的两倍大,正常图是遮罩层的两倍大
  handler(event){
    // evnet.offsetX(鼠标距离图片左侧的距离)减去mask.offsetWidth(遮罩层总宽度的一半)
    // 获取蒙板
    let mask = this.$refs.mask;
    let big = this.$refs.big;
    // 计算蒙板的left|top数值
    let l = e.offsetX - mask.offsetWidth / 2;
    let t = e.offsetY - mask.offsetHeight / 2;
    // 约束蒙板的上下左右范围
    if (l < 0) l = 0;
    if (l > mask.offsetWidth) l = mask.offsetWidth;
    if (t < 0) t = 0;
    if (t > mask.offsetHeight) t = mask.offsetHeight;
    mask.style.left = l + "px";
    mask.style.top = t + "px";
    big.style.left = -2 * l + "px";
    big.style.top = -2 * t + "px";
  } 
}

```

# 购买产品个数的操作

```javascript
// 绑定事件@change是当输入内容变化时调用函数
<div class="controls">
  <input autocomplete="off" class="itxt" v-model="skuNum" @change="handler" />
  <a href="javascript:" class="plus" @click="skuNum++">+</a>
  <a href="javascript:" class="mins" @click="skuNum>1 ? skuNum-- : 1">-</a>
</div>
```

```javascript
methods:{
  handler(event){
    // *1可以将非Number类型的数据转变为NaN
    let value = event.target.value * 1
    if(isNaN(value) || value<1){
      value = 1
      this.skuNum = value
    }else{
      this.skuNum = parseInt(value)
    }
  }
}
```

# 加入购物车

```javascript
// 绑定事件省略
// 在vue组件中点击添加购物车触发此事件
methods:{
  addShopCar(){
    //当dispatch方法传递要多个参数,需要将多个参数包裹为一个对象进行传递
    this.$store.dispatch("addCart",{skuId:this.$route.params.goodId,skuNum:this.skuNum})
  }
}
// /store/detail.js中调用requests发送API请求
const actions = {
  async addCart({commit},{skuId,skuNum}){
    let result = awati reqAddOrUpdateCart(skuId,skuNum)
  }
}
// /API/index.js配置API请求
export const reqAddOrUpdateCart = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"})
```

# 加入购物车成功与失败的判断

```javascript
// 核心原理:async函数会根据自己的返回值而返回一个Promise函数
// /store/detail.js
async addCart({ commit }, {skuId, skuNum}) {
  let result = await reqAddOrUpdateCart(skuId, skuNum)
  if(result.code == 200){
    // result不返回数据,只返回添加成功或失败
    return result
  }else{
    return Promise.reject(new Error("faile"))
  }
}
// /pages/detail.vue
async addShopCar() {
  let result = await this.$store.dispatch("addCart", {skuId:this.$route.params.goodId, skuNum:this.skuNum});
  console.log(result.message) // 打印成功
}
```

# 加入购物车操作

```javascript
// /route/route.js
// 配置购物车组件的路由
{
  path:"/AddCartSuccess",
  component:AddCartSuccess,
  name:"AddCartSuccess"
}
// /pages/detail.vue
async addShopCar() {
  try {// 当trycatch中的try部分可以捕捉到他里面出现Promise的返回值
    // 当此返回值状态为成功,那么代码会继续往下执行
    // 当返回值状态为失败,那么会跳转到到catch中执行里面的代码
    let result = await this.$store.dispatch("addCart", {skuId:this.$route.params.goodId, skuNum:this.skuNum});
    this.$router.push({name:"AddCartSuccess"})
  } catch (error) {
    alert("添加购物车失败")
  }
}
```

# 路由传递参数结合会话存储

1. 本地存储:持久化存储,但是上线5M
2. 会话存储:并非持久,会话结束(关闭浏览器)即消失
3. 本地存储和会话存储只能存储字符串

```javascript
// 1.通过路由跳转一级传递参数,但是当params中携带的参数是个对象,那么用户的路径地址栏会很难看
// 2.store仓库储存参数
// 3.全局事件总线bus储存参数
// 加入购物车成功的界面只需要展示一次,所以可以通过会话存储

// /pages/detail.vue
async addShopCar() {
  try {
    let result = await this.$store.dispatch("addCart", {skuId:this.$route.params.goodId, skuNum:this.skuNum});
    this.$router.push({name:"AddCartSuccess"})
    // 将参数转化成JSON字符串
    sessionStorage.setItem('SKUINFO',JSON.stringify(this.skuInfo));
    this.$router.push({name:"AddCartSuccess",query:{skuNum:this.skuNum}})
  } catch (error) {
    alert("添加购物车失败")
  }
}
```

# 购物车静态组件与修改

# uuid游客身份获取购物车数据

```javascript
// 在/utils/getUserId.js中创建uuid
// 引入uuidv4组件,不需要要下载,node_modules中默认存在,直接使用即可
import { v4 as uuidv4 } from 'uuid';
export const getUserID = () =>{
   	// 判断本地得是否存在userId,已存在就不需要创建
    let userId = localStorage.getItem("USERID")
    // 不存在userId,所以在本地存储中创建
    if(!userId){
        userId = uuidv4();
        userId = localStorage.setItem("USERID",userId)
    }
    return userId
}

// 在/store/detail.js中获取绑定uuid
// 在store的任意一个仓库中绑定uuid都可以,detail.js只是随意选择的
// 需要引入/utils/getUserId.js才能得到方法
const state = {
    detailList: {},
    userId:getUserID()
}

// /api/index.js:创建发送api请求的方法
export const reqCartList = ()=> requests({url:"/cart/cartList",method:"get"})
// /api/requests.js:在请求拦截器中添加报头
// 引入store.detail仓库中的userId
import store from "@/store";
requests.interceptors.request.use((config) => {// config:配置对象,对象里面有一个属性很重要headers请求头
    if(store.state.detail.userId){
        config.headers.userTempId = store.state.detail.userId
    }
    nprogress.start()
    return config
})

// /pages/ShopCar.js:挂载阶段发送获取购物车数据的请求
// 因为购物车的数据要经常获取,所以创建一个发送请求的方法
methods:{getDeta(){this.$store.dispatch("getCartList")}},
mounted(){this.getData()}

// /store/shopcar.js 发送请求
import { reqCartList } from "@/api";
const actions = {
    async getCartList({commit}){
        let result = await reqCartList()
        console.log(result);
    }
}
```

# 购物车动态展示数据

```javascript
// /store/shopcar将购物车的数据进行getter简化
// 其它流程都和其它相同,只有两个地方需要注意
computed: {
  // 1.计算商品总价(但要注意的是,商品的总价应该是被勾选的商品的总价)
  totalPrice(){
    let sum = 0
    this.cartInfoList.forEach(item => {
      sum += item.skuNum * item.skuPrice
    });
    return sum
  },
  // 2.每一个商品都有单独的勾选框,全部的单独勾选框被勾选,则全选框也处于被勾选
  allChecked(){
    // every方法,只要有一个是不符合条件即item.isChecked !== 1,难么就返回false
    return this.cartInfoList.every(item => item.isChecked == 1)
  }
},
```

# 处理产品数量

# 修改购物车产品的数量完成

```javascript
// /pages/ShopCar.js

// 修改数量这里需要加上节流函数
// 防抖会导致用户点击减1和加1需要等一会之后才能操作,这样太慢了
// 按需引入节流函数
import throttle from "lodash/throttle";

// 在页面中点击`+`或`-`或修改数量会触发绑定的changeSkuNum点击事件
// type参数为字符串:`add`表示数量+1,`minus`代表数量`-1`,`change`代表通过value值改变数量
// disNum参数特意为`change`情况准备,是为了将`value`的值传入点击事件中
// `change`的disNum参数:`event.target.value * 1`,其余的为正负1
changeSkuNum:throttle(async function (type, disNum, cart) {
  switch (type) {
    case "add":
      disNum = 1;
      break;
    case "minus":
      disNum = cart.skuNum > 1 ? -1 : 0;
      break;
    case "change":
      if (isNaN(disNum) || disNum < 1) {
        disNum = 0;
      } else {
        disNum = parseInt(disNum) - cart.skuNum;
      }
      break;
  }
  try {
    let result = this.$store.dispatch("addOrUpDateShopCart", {
      skuId: cart.skuId,
      skuNum: disNum
    });
    this.getData();
  } catch (error) {
    console.log("修改数量失败");
  }
},2000),
```

# 删除购物车产品的操作

```javascript
// 一样的发送请求操作,这里就省略了
```

# 修改产品的状态

```javascript
// 一样的发送请求操作,这里就省略了
```

# 复习

# 删除全部选中的商品

```javascript
// /pages/ShopCar.js
// 删除全部被选中的商品
async deleteAllCart() {
  try {
    this.$store.dispatch("deleteAllCart");
  } catch (error) {
    alert("删除被选中商品失败");
  }
}
// /store/shopcar
// 通过上下文对象解构出`state`,`diapatch`
deleteAllCart({ state, dispatch }) {
  let promiseAll = []
  // 遍历出每个状态为被选中的商品的skuId后压入到数组中,并且`dispatch`调用`actions`中的`deleteCartById`方法来删除购物车中被选中的商品
  state.shopCartInfo[0].cartInfoList.forEach(item => {
    if (item.isChecked == 1) {
      let result = dispatch("deleteCartById", item.skuId)
      promiseAll.push(result)
    }
  });
  // 通过`Promise.all`判断数组promiseAll中是否有删除失败的promise返回
  return Promise.all(promiseAll)
}
```

# 全部产品的勾选状态修改

```javascript
// /pages/ShopCar.js
async isChecked(checked){
  try {
    this.$store.dispatch("updateAllChecked",checked)
  } catch (error) {
    alert("删除全选失败");
  }
}
// /store/shopcar
updateAllChecked({ state, dispatch }, checked) {
  let isChecked = checked ? 1 : 0
  let promiseAll = []
  state.shopCartInfo[0].cartInfoList.forEach(item => {
    let result = dispatch("changeChecked", { skuId: item.skuId, isChecked })
    promiseAll.push(result)
  });
  return Promise.all(promiseAll)
}
```

# 登录注册静态组件

1. `/src/assets`文件夹:用于放置全部组件共用的静态资源
2. 在样式中可以使用`@`,这是`/src`的别名,但是要在之前加上`~`,`~@`这样使用才可以
3. 组合1,2就可以在`js`文件中,使用`~@/assets`引入全部组件可以使用的静态资源
4. 但是要切记,`/srs/assets`文件中的静态资源,在最后打包时会被打包到js中,不像public中的资源不被打包

# 注册业务上

修改静态组件

# 注册业务下

```javascript
// 1.发送验证码的请求,此处省略
// 2.注册的请求
// /pages/register
async goRegister() {
  try {
    let { phone, code, password, password1 } = this;
     // 四个参数必须存在才执行`dispatch`
    phone&& code&& password&& password1 && await this.$store.dispatch("sendRegister", {phone,code,password,password1});
    this.$router.push({name:"login"})
  } catch (error) {
    alert("注册失败")
  }
}
// /store/register.js
async sendRegister({commit},params){
    let result = await reqRegister(params)
    if(result.code == 200){
        return "成功"
    }else{
        return Promise.reject()
    }
}
```

# 登录业务_token

一般来说,登录之后,后台为了区分你这个登录的用户是谁,就下发了`token`令牌作为唯一标识符,前台会持久化的存储`token`,并带着`token`找服务器要用户的信息

```JavaScript
// vuex的存储不是持久化的,当页面刷新就会消失,然后重新请求获取
// 发送登录请求省略,流程和发送普通请求一样
```

# 用户登录携带token获取用户信息

```JavaScript
// 在报头中携带`token`来获取用户的信息
requests.interceptors.request.use((config) => {// config:配置对象,对象里面有一个属性很重要headers请求头
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    nprogress.start()
    return config
})
// 其余发送请求部分省略
```

# 讲解登录业务中存在的问题

1. 持久化存储token
2. 多个组件要展示用户信息需要在每一个组件的mounted中触发`this.$store.dispatch("getUserInfo")`
3. 已经登录的用户,不应该能通过手动修改路径添加`/login`的方式路由跳转到登录页面

```JavaScript
// /store/user.js
// 以下代码只能解决第一点持久化存储token的问题
actions:{
  async goLogin({ commit }, params) {
    let result = await reqLogin(params)
    console.log(result);
    if (result.code == 200) {
      commit("GOLOGIN", result.data.token)
      // 登录完成后,将返回的令牌本地化存储
      localStorage.setItem('TOKEN', result.data.token);
    } else {
      return Promise.reject();
    }
  },
},
// 除了已经挂载的
mutations:{
  GETUSERINFO(state,userInfo){
    state.token = token
  }
}
state:{
  token:localStorge.getItem("TOKEN")
}
```

# 退出登录

```JavaScript
// 退出登录
// 1.通知服务器退出登录,清除一些数据,token等
// 2.清除项目中的数据,userInfo,token等
// 3.重新跳转到首页

// 省略部分代码
// /components/header.js
async logout(){
  try {
    await this.$store.dispatch("goLogout")
    // 退出后跳转会home首页
    this.$router.push("/home")
  } catch (error) {
    alert("退出失败")
  }
}
// /store/user.js
// 清除所有用户信息
GOLOGOUT(state){
  state.code = ""
  state.userInfo = ""
  state.token = ""
  // 本地令牌清空
  localStorage.removeItem('TOKEN');
}
```

# 导航守卫理解

```JavaScript
// 全局路由守卫:前置路由(在路由跳转之前进行判断)
// /router/index.js
let router = new VueRouter({
  routes//此处的routes是一个外部定义的变量,变量中包含了路由配置,只是为了结构而进行分割
})
router.beforeEach((to,from,next)=>{
  // to:可以获取到你要跳转到的那个路由的信息
  // from:可以获取到你从哪个个路由来的信息
  // next:放行函数,next()全部放行,next(path)将所有跳转的路由都变为指定跳转到`path`参数的路由,next(false)不放行
})
export deafault router
```

# 导航守卫理解

# 导航守卫用户登录操作

```JavaScript
// /router/index.js
router.beforeEach(async (to, from, next) => {
  let name = store.state.user.userInfo.name
  let token = store.state.user.token
  // 进入有无令牌判断
  if (token) {
    // 有令牌
    // 判断是否跳转登录界面,已登录的不能再登录,直接返回home页面
    if (to.path == "/login") {
      next("/home")
    } else {
      // 去非login页面
      // 判断是否有用户信息,有则直接放行
      if (name) {
        next()
      } else {
        // 没有用户信息,向服务器请求用户信息
        try {
          await store.dispatch("getUserInfo")
          next()
        } catch (error) {
          // 存在token,但是拿不到用户信息
          // 表明tFoken失效,登录过期,于是跳到登录界面重新登录
          store.dispatch("goLogout")
          next("/login")
        }
      }
    }
  // 无令牌,游客身份,全部放行
  } else {
    next()
  }
})
```

# trade静态组件

省略

# 获取交易页数据

```JavaScript
// 重复获取数据过程,省略
```

# 用户地址信息的展示

```JavaScript
// 重复动态展示数据过程,省略
// 唯一要注意的是find方法
defaultUser() {
  // find:数组的方法,找到复合条件的元素.回调需要返回布尔值【真|假】，真即为查找结果【如果多个结果都为真，取其中一个】
  // 由于Template中使用了`defaultUser`的属性值,所以它至少要是一个空对象
  return this.address.find(item => item.isDefault == "1") || {};
}
```

# 交易页面完成

# 提交订单

```JavaScript
// 不使用Vuex完成提交订单:即不通过Vuex向服务器提交订单请求,且将服务器返回的数据存储在组件中
// 发送请求的过程省略:以下为不适用Vuex时该如何引入Api请求方法的最简洁方式

// main.js
// 引入api所有向外暴露的变量成为一个对象
// 即Api是一个对象
import * as Api from "@/api/index"
new Vue({
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
    // 和全局事件总线一样,将所有的请求API变为vue原型身上的方法
    Vue.prototype.$Api = Api
  },
  router,
  store
}).$mount('#app')
```

# 获取订单号与展示支付信息

```JavaScript
// 不通过Vuex发送Api请求时要注意
// /pages/pay.js

// 尽量不在生命周期函数中使用async,await函数\
// 错误的在生命周期中使用async和await的例子
async mounted(){
  awati.this.$Api.reqPayInfo(this.orderId)
}
// 正确的在生命周期中使用async和await的例子
mounted(){
  this.getPayInfo()
}
methods:{
  async getPayInfo(){
    awati.this.$Api.reqPayInfo(this.orderId)
  }
}
```

# 支付页面中出现Element-UI以及按需引入

1. `React&Vue`:`antd-PC`,`antd-mobile`
2. `Vue`:`ElementUI-PC`,`vant-mobile`

```JavaScript
// 开发时全部引入,完成测试前再全改为按需引入
// 终端中npm 安装
npm i element-ui -s
// 按需引入
// 1.安装 babel-plugin-component：
npm install babel-plugin-component -D
// 2 修改babel.config.js为
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ["@babel/preset-env", { "modules": false }]
  ],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}

// vscode安装vue-helper插件可以提示Elemnet标签

// Elemnet-UI按需引入的三种注册方法
import { Button, Select } from 'element-ui';
// 1.
Vue.component(Button.name, Button);
// 2.
Vue.use(Button)
// 3.
Vue.prototype.$msgbox = MessageBox;
// 当使用Element时出现`$`符号表示此种标签不仅需要引入,还需要往原型中添加`$`符号后面对应的方法
// 例如
<el-button type="text" @click="open">立即支付</el-button>
methods: {
  open() {
    // 出现`$alert`
    this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
      dangerouslyUseHTMLString: true
    });
  }
}
// 因此要在main.js中
import { MessageBox} from 'element-ui';
new Vue({
  render: h => h(App),
  beforeCreate(){
    //在Vue的原型上挂载对应的方法
    Vue.prototype.$alert = MessageBox.alert;
  },
  router,
  store
}).$mount('#app')

async 
```

# 微信支付业务上

# 微信支付业务下

```JavaScript
// 点击支付跳出支付框
async open() {
  // 因为QRCode.toDataURL返回的是一个Promise对象,所以使用await来接这个Promise的结果,因为用了await所以上面要用async
  let url = await QRCode.toDataURL(this.payInfo.codeUrl);
  console.log(url);
  this.$alert(`<img src=${url} />`, "请你微信扫码支付", {
    dangerouslyUseHTMLString: true, //将字符串转换为标签
    center: true, //居中
    showClose: true, //右上角的关闭按钮显示
    confirmButtonText: "支付成功", //确定按钮的文本
    showCancelButton: true, //显示取消按钮
    cancelButtonText: "支付遇见问题", //取消按钮的文本
    closeOnClickModal: true, //点击遮罩层关闭messagebox
    beforeClose: (action, instance, done) => {
      //在消息盒子关闭之前会触发
      //action:可以区分用户点击的是取消【cancel】、确定【confirm】
      //instance:当前组件实例
      //done参数：是一个函数,使用这个函数可以关闭消息盒子
      if (action == "confirm" && this.code == 200) {
        //清除定时器
        clearInterval(this.timer);
        //关闭盒子
        done();
        //路由跳转
        this.$router.push("/paysuccess");
      } else if (action == "cancel" && this.code != 200) {
        //清除定时器
        clearInterval(this.timer);
        //关闭盒子
        done();
        this.$message.error("支付遇见问题请联系超管豪哥");
      }
    }
  });
  this.timer = setInterval(() => {
    this.$store.dispatch("queryPayStatus", this.$route.query.orderId);
  }, 1000);
}
```

# 个人中心二级路由

```javascript
<router-link :to="{name:'myOrder'}">我的订单</router-link>
// 路由展示
<router-view></router-view>
```

```JavaScript
// /router/route.js
{
    path: "/center",
    component: Center,
    name: "center",
    meta: {
        show: true
    },
    children: [
        {
            path: "myOrder",
            component: MyOrder,
            name:"myOrder"
        },
        {
            path: "groupOrder",
            component: GroupOrder,
            name:"groupOrder"
        },
        {
          // 在进入center时,因为两个耳机组件不展示,所以使用重定向跳转到center的二级路由
            path:"/center",
            redirect:"/center/myOrder"
        }
    ]
},
```

# 我的订单

# 未登录的导航守卫判断

```JavaScript
// /router/index.js
// 接[93]导航守卫用户登录操作
router.beforeEach(async (to,from,next)=>{
  if(token){
    // 此处为[93]的内容,因此省略 
  }else{
    let path = to.path
    if (path.indexOf("trade") != -1 || path.indexOf("pay") != -1 || path.indexOf("center") != -1) {
      // 向login.vue路由组件传递用户想去的页面的路径
      next("/login?redirect="+path)
    } else {
      next()
    }
  }
})
// /pages/login.js
async goLogin() {
  let { phone, password } = this;
  try {
    await this.$store.dispatch("goLogin", { phone, password });
    // 判断路由中是否有参数,有参数则跳转搭配参数书代表的路由去
    let path = this.$route.query.redirect || "/home"
    this.$router.push(path);
  } catch (error) {
    alert("登陆失败");
  }
}
```

# 用户登录_路由独享与组件内守卫

```JavaScript
// /router/route.js
{// 路由独享守卫
    path: "/pay",
    component: Pay,
    name: "pay",
    meta: {
        show: true
    },
    beforEnter(to,from,next){
      	// 来的路径是trade才放行
        if(from.path == "/trade" ){
            next()
        }else{
          // 否则停留在原页面不变
            next(false)
        }
    },
},
// /pages/payScuccess.js
// 组件内路由守卫
// 这里通过组件内路由守卫实现,但也可以通过路由独享守卫实现
export default {
  beforRouteEnter(to,from,next){
    // 在渲染该组件的对应路由被confirm前调用
    // 不能获取组件实例this
    // 因为当守卫执行前，组件实例还没被创建
    if(from.path == "/play"){
      next()
    }else{
      next(false)
    }
	},
  beforRouteUpdate(to,from,next){
    // 在当前路由改变，但是该组件被复用时调用
    // 举例:对于一个带有动态参数的路径/foo/:id, 在/foo/1 和/foo/2 之间跳转的时候
    // 由于会渲染同样的Foo组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用
    // 可以访问组件实例this
  },
  beforRouteLeave(to,from,next){
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例this
  }
}
```

# 图片懒加载

```JavaScript
// 下载懒加载插件
npm i vue-lazyload -s
// main.js
// 引入插件
import lazyload from vue-lazyload
// 使用插件
Vue.use(lazyload,{
  loading// 图片懒加载的资源在哪里:大概是这样的,想要了解看文档
})
```

```JavaScript
// 本节还讲解了自定义插件的过程
// 1.创建一个js文件,并默认向外暴露一个对象,再在这个对象上挂载一个install方法
// 2.Vue.use就是默认使用插件的install方法
// 3.Vue.use在安装插件时会向插件出入Vue的构造函数,方便插件在Vue构造函数的原型上添加方法
// 4.在Vue的原型添加了方法,然后再Vue.use安装插件时,不止会传入Vue的构造函数,如果本身在Vue.use(插件,{options})传入了出插件名字外的其他参数,这些参数也会一并传给插件
```

# vee-validata表单验证的使用

```JavaScript
// 老师的评价是会用即可,里面的文件比较复杂,吃力不讨好
// 老师建议使用@2版本
npm i vee-validata@2 -s
// main.js
import Validata from vee-validata
Vue.use(Validata)
```

```JavaScript
// 需要记得地方的,通过视频复习
// 有一个地方需要注意
// 注册账号的时候,必须每一个类型的数据,例如账号,验证码,密码,确认密码,这些信息都通过正则验证,再发送请求
```

# 路由懒加载

```JavaScript
// 路由组件的懒加载:路由组件的按需引入
// 在项目打包上线后,全部的路由组件都在一起,用户访问一个路由组件,所有的都会加载,所以需要引入路由组件
// /router/route.js
const search = ( )=> impor("@/pages/serarch")// 这里import方法返回的是一个promise对象
{
  path:"/search",
  component:search // 这里就变成了一个import方法,当用户需要访问路由组件时search,这段代码就会执行,返回对应的search组件
}
// 更简略的写法
{
  path:"/search",
  component:( )=> impor("@/pages/serarch")
}
```

# 处理map文件

```JavaScript
// 在生产打包时所有的源文件都会被压缩加密,我们查看打包后的文件哪里发生了错误,就需要通过map文件来查找
// 但真正要上线了,这个map文件应为太大,且已经不被需要了,所以要清除,不能通过直接删除,要通过关闭生成map文件,再重新打包才可以
// vue.config.js:在第一层属性中添加就可以关闭map文件的生成
productionSourceMap:false
```

# 购买服务器

# 安全组与xshell

1. 购买服务器
2. 设置安全组,让服务器一些端口号打开
3. 利用xshell等工具登录服务器

```JavaScript
// linux教学
// 1. `/`根目录
// 2. `ls`查看
// 3 `~`就是`root`目录,又称为家目录,只有这个目录可以用,服务器一登陆就加载了到`~`
```

# nginx反向代理

```JavaScript
// nginx使用户通过访问IP地址就能直接访问到页面
// 1.进入/etc/nginx,没有的话就 yum i nginx,没有安装过nginx的只会有四五个文件
// 2.在/nginx目录下用命令`vim nginx.config`对nginx.config进行编辑
// 3.编辑主要添加两项
// 3.1
// 这里可以解决让用户访问IP就直接访问到项目
location / {
  root /root/jsc/www/shangpinghui/dist;//这个目录是随意创建的,而dist是项目打包后的文件
  index index.html;
  try_files $uri $uri/ /index.html;
}
// 3.2
// 这里可以解决项目需要的数据需要找后端服务要,怎样让前端项目的服务器找后端要
location /api {
  proxy_pass http://39.98.123.2111      // 这里是网址不是注释
}
// 4.运行nginx服务器
// 5.再访问项目就可以直接跑起来了
```

# 组件通信的六种方式

1. props
   - 适用于父子组件通信
   - 如果父组件给子组件传递数据(函数) :本质其实是子组件给父组件传递数据
   - 如果父组件给子组件传递的数据(非函数) :本质就是父组件给子组件传递数据
   - 路由的`props`三种书写方式`:[' todos ' ]`, `{type :Array}`,`{type :Array , default:[]}`;书写形式:布尔值，对象、函数形式
2. 自定义事件
   - 适用于子组件给父组件传递数据
   - `$on`,`$emit`
3. 全局事件总线`$bus`
   - 适用场景:万能
   - `Vue.prototype.$bus =this`
4. `punsub-js`:`React`框架中使用较多
   - 适用场景:万能
5. 插槽
   - 适用场景:父子间通信传递一般`HTML`结构
   - 默认插槽,具名插槽,作用域插槽

# 自定义事件深入

1. 给原生DOM绑定原生事件:正常触发
2. 给原生DOM绑定自定义事件:因为原生DOM无法使用`$emit()`,所以无法触发自定义事件
3. 给组件标签绑定原生事件:正常触发
4. 给子组件标签绑定自定义事件:
   - 子组件中需要使用`$emit()`才能触发自定义事件
   - 即使这个自定义事件的名字和原生事件相同,例如`@click`,但仍然会被视为自定义事件,需要`$emit()`触发,除非在自定义事件的名字之后如`@clcik.native`加上`native`才能变成原生事件
   - 变成原生事件后,只要在子组件上的任意标签做出对应操作,就会触发事件,这是通过了事件的委派原理

# v-model深入

v-mode可以做到父子组件件的通信

```JavaScript
// 原生DOM中有`input`事件,经常与表但元素一起是使用,当表单元素文本内容发生变化的时候就会发出一次回调
// 通过value与input事件实现v-model功能
<input type="text" :value="msg" @input="msg = $event.target.msg">
// 父组件:这里的input应该是自定义事件,@event是子组件传回来的数(组?)
<sonComponent :value="msg" @input="msg = $event" />
// 这里父组件还可以简化成
<sonComponent v-model="msg" />
// 子组件:
<input type="text" :value="msg" @input="$emit('input',$event.target.value)">
props:["msg"]
// 这应该就是v-model的原理
```

# sync属性修饰符

sync可以父子组件件的通信

```JavaScript
// 父组件
// :money.sync:表示:1.父组件给字符串传递props属性money;2.给当前子组件绑定了一个自定义事件，而且事件名称即为update:money
<child :money.sync="money" />
// 子组件
<button @click="$emit("updata:money",money-100)" >
props:["money"]
// 子组件点击button后会将money-100传递给父组件并将父组件的money替换掉
```

# $attrs和$listeners

```JavaScript
// 将element-ui封装到子组件中
// 在父组件中
<child type:"success"> //这就是二次封装
// 子组件还能不需要使用props:[]
// 通过$attrs和$listeners直接获取父组件传递的数据和方法
```

# $children和$parent

```JavaScript
// 通过ref可以操作子组标签的数据和方法
// 父组件身上有一个属性$children可以获取到全部的子组件,是全部的
// 有一点要注意的是,里面子组件的顺序是随机的

// 同理子组件身上也有一个属性$parent可以获取到父组件,进而操作父组件的数据与方法
```

# 混入mixin

```JavaScript
// 将组件中通用的方法封装为一个js文件,并向外暴露
// 在需要用到的组件中
// 先引入
// import mixin from "./"
props:[]// 使用props是表明mixin和它同级
mixin:[mymiixin]
```

# 作用域插槽

建议看视频,不想记笔记了

# 后台管理系统项目简介

# 后台管理系统模板介绍

1. build:index.js webpack配置文件【很少修改这个文件】
   mock:mock数据的文件夹【模拟一些假的数据mockjs实现的】，因为咱们实际开发的时候，利用的是真是接口
2. node_modules:项目依赖的模块

3. public:ico图标,静态页面，publick文件夹里面经常放置一些静态资源，而且在项目打包的时候webpack不会编译这个文件夹，原封不动的打包到dist文件夹里面

4. src:程序员源代码的地方
   - api文件夹:涉及请求相关的
   - assets文件夹：里面放置一些静态资源（一般共享的），放在aseets文件夹里面静态资源，在webpack打包的时候，会进行编译
   - components文件夹：一般放置非路由组件获取全局组件
   - icons这个文件夹的里面放置了一些svg矢量图
   - layout文件夹：他里面放置一些组件与混入
   - router文件夹：与路由相关的
   - store文件夹：一定是与vuex先关的
   - style文件夹：与样式先关的
   - utils文件夹：request.js是axios二次封装文件
   - views文件夹：里面放置的是路由组件
5. App.vue:根组件
6. main.js：入口文件
7. permission.js:与导航守卫先关、
8. settings：项目配置项文件
9. .env.development
10. .env.producation

# 登录业务完成

# 退出登录

# 路由搭建

```JavaScript
// 唯一需要注意的是
// 是将product的路由跳转到layout组件
```

# 品牌管理静态组件

```html
<div>
  <!-- 按钮 -->
  <el-button type="primary" icon="el-icon-plus">添加</el-button>
  <!-- 
   表格组件 
   data:表格组件将来需要展示的数据------数组类型
   border：是给表格添加边框
   column属性
   label：显示标题
   width：对应列的宽度
   align：标题的对齐方式
   prop:对应列内容的字段名
   注意1：elmentUI当中的table组件，展示的数据是以一列一列进行展示数据
  -->
  <el-table style="width: 100%" border>
    <el-table-column prop="prop" label="序号" width="80px" align="center"></el-table-column>
    <el-table-column prop="prop" label="品牌名称" width="width"></el-table-column>
    <el-table-column prop="prop" label="品牌LOGO" width="width"></el-table-column>
    <el-table-column prop="prop" label="操作" width="width"></el-table-column>
  </el-table>
  <!-- 
    分页器 
    当前第几页、数据总条数、每一页展示条数、连续页码数
    @size-change="handleSizeChange":当前每一页要展示的数据条数改变时会触发里面的函数,并将要展示的数据条数作为参数传递给这个函数
    @current-change="handleCurrentChange":当前页改变时会触发里面的函数,而且还会将点击的页码作为参数传递给这个函数
    current-page:代表当前为第几页
    total：代表分页器一共需要展示数据条数
    page-size：代表每一页需要展示多少条数据
    page-sizes：代表可以设置每一页展示多少条数据
    layout：修改分页器布局
    pager-count:按钮的数量为9则连续页码是7,因为减去了开始页和末尾页9-2=7
  -->
  <el-pagination
    style="margin-top: 20px; text-align:center;"
    :current-page="5"
    :page-sizes="[3, 5, 7]"
    :page-size="10"
    layout="prev, pager, next, jumper, ->, total, sizes"
    :total="100"
  ></el-pagination>
</div>
```

# 品牌列表展示

```html
<el-table style="width: 100%" border :data="list">
  
  <!-- prop:可以读取上[1]中的`:data="list"`中的属性 -->
  <!-- 但是这里读取的是图片的`url`地址,读取之后不展示的话就是一串链接 -->
  <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
    
    <!-- 因为el-table或者说所有的element-ui都是被封装好的组件,被作为子组件使用 -->
    <!-- 所以可以在里面使用作用域插槽的方法传递顺序 -->
    <!-- [1]的`:data="list"`相当于给el-table子组件传递一个props属性 -->
    <!-- 子组件收到`:data="list"`传递的`list` -->
    <!-- 因为element-ui的开发者封装时设置了,将收到父组件传递的 数组 属性遍历之后回传给父组件 -->
    
    <!-- 这里的`{row,$index }`就是子组件遍历完成`list`后,将遍历出来的每个索引的索引号`$index`,和这个索引代表的元素,然后传递给父组件 -->
    <template slot-scope="{ row, $index }">
      <!-- 父组件将收到的属性,在想要给子组件添加的结构中使用,就是`:src="row.logoUrl"` -->
      <!-- 这样el-table-column就可以展示将url转化为图片了 -->
      <img :src="row.logoUrl" alt style="width: 100px; height: 100px" />
    </template>
  </el-table-column>
</el-table>
```

```JavaScript
<el-pagination @size-change="handleSizeChange" @current-change="getPageList"></el-pagination>
// 当前页变换,和每一页展示的数据条目数量发送变化而调用的两个函数
methods:{
  methods: {
    // 当第一次加载trademark页面,挂载时会自动加载一次getPageList,所以需要设置默认参数,否则那时参数为undefined
    async getPageList(pager = 1) {// 且参数名不能为page,因为page已经在data中被定义
      this.page = pager;
      let { page, limit } = this;
      let result = await this.$API.trademark.reqTradeMarkList(page, limit);
      this.list = result.data.records;
      this.total = result.data.total;
    },
      handleSizeChange(limit) {
        this.limit = limit
        this.getPageList()
      }
  },
}
```

# 添加品牌与修改品牌静态完成

```JavaScript
// 用到了element-ui的dialog和upload组件完成
```

# 添加品牌完成

# 修改品牌完成

```JavaScript
// 注意:到修改品牌完成调用`this.getPageList()需要传入当前页码`page`保证不会跳到第一页
```

# 品牌的表单验证(自定义校验规则)

```JavaScript
// 要要验证的表单,必须存在:model属性
```

# 删除品牌操作

# 商品管理之三级联动静态组件

# 三级联动动态展示

# 三级联动完成

# 平台属性管理动态展示属性

# 平台属性之添加属性与修改属性静态完成

# 收集属性名的操作

# 收集属性值操作

# 解决返回按钮数据回显问题

# 修改属性操作

 ```JavaScript
 // 将选中的属性赋值给另一个属性,但是由于数据结构当中存在对象里面套数据,数据里面套对象,因此需要是哟个深拷贝解决这类问题
 // 引入深拷贝
 import cloneDeep from "lodash/cloneDeep"
 // 将row对象里的数据深拷贝给attrInfo
 this.attrInfo = cloneDeep(row)
 ```

# 查看模式与修改模式切换 

# 查看模式与编辑模式注意事项

```JavaScript
// 不能添加空属性值与重复属性值的实现
```

# 修改属性的查看与编辑模式的切换

# 表单元素自动聚焦的实现

# 删除属性值的操作

# 保存操作

# 按钮与三级联动的可操作性

# spu管理模块业务介绍

# spu管理模块静态

# 动态展示spu列表

```JavaScript
// 封装el-button成hit-button
// 获取数据并动态展示
```

# spu管理内容的切换

# spuForm静态组件完成

# spuForm请求业务的分析

# 获取spuForm的数据

# spuForm组件数据展示与收集

# spuForm销售属性的数据展示

# 

# 

# 

# 

# 

# 

# 

# 

# 

# 

# 

# 

# 

# 

# 

# 

# 

# 深度选择器

```JavaScript
// style scoped:本质上是vue通过给当前组件的标签打上一个特殊的属性,然后通过css的属性选择器和标签选择器的符合选择器去渲染样式
// 并且如果在组件中存在子组件,那么子组件的根标签也会带上scoped添加的属性
// 以下为子组件
<template>
  <div>// div会带上父组件中scoped赋予的属性,而h1不会
  	<h1></h1> 
  </div>
</template>
```

```JavaScript
// 原生css:通过 ``>>>` 深度选择器来父组件的样式去影响到子组件中的标签样式
// less:通过 /deep/
// scss:通过`::v-deep`
```

# 数据可视化

# canvas绘制线段

```JavaScript
// canvas标签默认宽度与高度300*150
// 浏览器认为canvas标签是一张图片
// 给canvas画布添加文本内容没有任何意义
// 给canvas标签添加子节点没有任何意义的
// 你想操作canvas画布:画布当中绘制图形、显示一个文字，都必须通过JS完成
// canvas标签的w|h务必通过canvas标签属性width和height设置
// 切记不能通过样式去设置画布的宽度与高度
```

# canvas绘制矩形

- `fillRect(x, y, width, height)` 绘制填充颜色的矩形
- `strokeRect(x, y, width, height)` 绘制线条的矩形

```JavaScript
// stroke没有填充颜色的方法
context.strokeRect(120, 0, 100, 100);
// 填充颜色可以替换,且必须在绘制图形之前填充颜色
ctx.fillstyle ="skybule"
ctx.fill()
ctx.fillRect(300,100,100,200)
```

# 绘制圆形

`arc(x, y, radius, starAngle, endAngle, anticlockwise)`

- x : 圆心的 x 坐标
- y：圆心的 y 坐标
- radius ： 半径
- starAngle ：开始角度
- endAngle：结束角度
- anticlockwise ：是否逆时针（true）为逆时针，(false)为顺时针

```JavaScript
// Math.PI*2 = 360°
// 因此1 = 180/Math.PI ≈ 50°左右
context.beginPath();
context.arc(300, 350, 100, 0, Math.PI * 2, true);
```

# 画布清除与绘制文字

```JavaScript
// 当在一个画布反复绘制图形，需要将上一次的图形清空
clearRect(x, y, width, height)
// 绘制文字
fillText(text, x, y, maxWidth)
```

# 绘制柱状图

# svg基本使用

# echarts基本使用

