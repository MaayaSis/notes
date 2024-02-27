# Vue3 和 TypeScript 公开课

1. `Vue3`的改变
   1. `Vue3`使用了`monorrepo`的形式来管理源代码,即每一个功能模块其实都是一个单独的项目
   2. `Vue3`使用了`TypeScript`记性了重写
   3. 使用了`proxy`替代`Object.defineProperty`进行劫持
   4. 从`Options API`到`Composition API`
   5. `mixin`的缺陷是重复命名冲突,且本身也是由许`Options API`组成,因此被`hooks`函数替代
2. `TpyeScript`的作用:`JavaScript`是弱类型语言,因此可能导致许多危险及报错的推迟



# vue3 **基础知识**

## vue 的引入方式

1. `CDN`引入
2. 下载`vue3`的`JavaScript`文件并且手动引入
3. 通过`npm`安装使用
4. `vue-cli`创建项目

## CDN 引入

1. 它是指通过相互连接的网络系统,利用最靠近每个用户的服务器
2. 更快,更可靠地将音乐,图片,视频,应用程序及其他文件发送给用户
3. 来提供高性能,可扩展性及低成本的网络内容传递给用户

```vue
<script src="https://unpkg.com/vue@next"></script>

<script>
  const app = vue.createApp({  // 传入 app 对象,返回整个项目的源码
    template: `<h2>Hello World<h2>`
  })
  app.mount('#app') // 将所有源码挂载到 public/index.html 中 id 为 app 的标签上
</script>
```

## 下载和引入

## 计数器 vue 实现

1. 原生`innerHTML`实现
2. `vue`的响应式实现

## 声明式和命令式

1. 声明式关注结果
2. 命令式关注过程

## MVVM 模型

`Model-View-ViewModel`:`Model`是`script`,`View`是`template`,`vue`则是`viewModel`黑盒

## template 属性

## template 写法

1. `template`标签及标签中的内容不会被浏览器渲染
2. 依靠上面的特性, 将`template`传入`vue`中,浏览器只会出现一份内容
3. 如果将非`template`标签传入`createApp`中那么页面将会出现两份内容

## data 属性

1. `vue3`中`data`属性必须传入一个函数,并且需要有返回值,否则将在浏览器中报错
2. `data `中返回的数据会被`vue`响应式系统劫持

## methods 属性

`methods`中的方法不能是箭头函数

## 其他属性

`props`,`computed`,`watch`,`emits`,`setup`

## vue 的源码

1. `github`下载`vue-next`
2. `yarn install`安装依赖
3. `yarn dev`编译项目:执行前修改`package.json`中的脚本为`"dev": "node script/dev.js --sourcemap"`,方便断点调试映射本地文件
4. 编译后
5. 通过`packages/vue/dist/vue.global.js`调试代码



# vue3 模板语法的常见命令

## methods 方法绑定 this

- [this指向规则](https://mp.weixin.qq.com/s/hYm0JgBI25grNG_2sCRlTA)
- `vue`创建组件实例时,将`methods`的方法进行遍历通过`bind`绑定到组件实例上

- 当`methods`的方法是箭头函数时由于箭头函数绑定了父级作用域的上下文,因此`this`不会按期望指向组件实例,this.a`将是`undefined`

- 严格模式下,普通函数输出`this`,且`this`没有被对象调用,或被`call`,`apply`方法重定向`this`,将会返回`undefined`
- 非严格模式下`this`执行调用此函数的对象

```javascript
const fun = function() {
  return this
}

// 严格模式
fun() === 'undefined' // expected output:true

// 非严格迷失
fun() === window // expected output:true
```

- 箭头函数没有自己的指向,因此它会去找上一层的`this`,一直找到`window`

```javascript
const name = 'sis'

// 1. 外层无 this,则一直向上找直到 window 为止
const test = {
  name: 'maaya', 
  fun: () => this.name
}
console.log(test.fun()) // expected output: 'sis'

// 2. 外层有 this,则箭头函数的 this 就是外层的 this
const test = {
  name: 'maaya', 
  fun: function() {
    var x = (() => this.name) // 自执行函数
    return x // 
  }
}
console.log(test.fun()) // expected output:'maaya'
```

## vscode 代码片段

1. 复制需要生成代码片段的代码
2. [通过此网站格式化代码片段](https://snippet-generator.app/)
3. 在`vscode`设置中的代码片段中配置

## 模板语法

1. `React`使用的是`jsx`语法,`babel`将`jsx`编译成`React.createElement`函数调用
2. `Vue`也支持`jsx`的开发模式,但大多数情况下,使用基于`HTML`的模板语法

## Mustache 双括号大语法

`Mustache`中不仅仅可以是`data`中的属性,也可以是一个`JavaScript`的表达式

1. 不支持赋值语句
2. `if`控制流也不支持

## v-once

1. `v-once`用于指定元素或者组件只渲染一次
2. 当数据发生变化时,元素或者组件以及其所有的子元素将视为静态内容并且跳过
3. 该指令可以用于性能优化
4. 子节点,也只会渲染一次

```html
<div>
  <h2>{{ count }}</h2>
  <button @click="increment">count增加1</button>
</div>
```

## v-text

相当于`Mustache`语法,因此此指令几乎不使用

## v-html

1. 默认情况下,如果展示的内容是`HTML`片段,`vue`是不会对其进行特殊的解析的
2. 如果希望进行特殊解析,那么可以使用`v-html`表示

```vue
<span v-html="info" />

<script>
  export default {
    data() {
      return {
        info: '<span>我是HTML标签<span>'
      }
    }
  }
</script>
```

## v-pre

`v-pre`用于跳过元素和它的子元素的编译过程,显示原始的`Mustache`标签

## v-cloak

1. 编译时小概率出现编译时`Mustache`语法模板未解析完全就在浏览器上显示即`{{ count }}`,之后才替换为`count`变量对应值的情况
2. `DOM`节点添加`v-cloak`后相当于`vue`给此`DOM`添加了`css`属性`dispaly: none`,并在编译完成后关闭隐藏
3. 基本不会出现未编译就显示的情况

## v-bind

- `v-bind`用于绑定一个或多个属性值,或者向另一个组件传递`props`值
- 语法糖缩写:`:`
- 修饰符:`.camel`将`kebab-case`,`attribute`属性名转换为`camelCase`(横杠转小驼峰)

## 绑定 class

- `CSS property`名可以用驼峰式`camelCase`或短横线分隔`'kebab-case'`但需要用引号括起来

- 对象语法:通过一个布尔值控制是否绑定此类名

```vue
<!-- 控制 active 类名是否使用 -->
<span :class="{active: true}">test</span>

<!-- 默认 class 和动态 class 的结合 -->
<span class="test" :class="{active: true}">test</span> 
```

- 数组语法:默认激活

```vue
<!-- 在数组中嵌套对象语法可实现动态绑定 -->
<span :class="['test',  'temp',  {active: true}]">test</span> 
```

## 绑定 style

- 对象语法

```vue
<!-- 可使用: 1. 驼峰语法; 2. kebab-case 语法(需要用引号括起来) -->
<span :style="{color: 'red',  fontSize: width + '30px',  'margin-top': '10px'}"></span>
```

- 数组语法

```vue
<!-- 多个对象引用到同一元素上 -->
<span :style="[styleProp1,  styleProp2]" />
```

## 动态绑定属性

某些情况下,属性的名称可能也不固定

```vue
<span :[name]="value" />
```

## 绑定一个对象

将一个对象的所有属性,绑定到元素上的所有属性

```vue
<!-- object 对象会被拆分成 span 的各个属性 -->
<span v-bind="object" />

<!-- 可读性较差 -->
<span :="object" /> 
```

## v-on

- 缩写: `@`
- 预期: `Function` | `Inline statement` | `Object`
- 参数: `event`
- 修饰符:
  - `stop`:调用`event.stopPropagation()`阻止冒泡
  - `.prevent`:调用`event.preventDefault()`
  - `.capture`:添加事件侦听器时使用`capture`模式
  - `.self`:只当事件是从侦听器绑定的元素本身触发时才触发回调
  - `.{keyAlias}`:仅当事件是从特定键触发时才触发回调
  - `.once`:只触发一次回调
  - `.left`:只当点击鼠标左键时触发
  - `.right`:只当点击鼠标右键时触发
  - `.middle`:只当点击鼠标中键时触发
  - `.passive`:`{ passive: true }`模式添加侦听器

```vue
<!-- 语法糖 -->
<span @click="handlerClick">点击事件</span>

<!-- 绑定内联表达式 -->
<span @click="count++">点击事件</span>

<!-- 绑定对象:同时绑定多个事件 -->
<span v-on="{click: handlerClick,  mouseMove: handlerMouseMove}">点击事件</span>

<!-- v-on 参数传递 -->
<span @click="handlerClick">点击事件</span> <!-- 不要额外参数,则默认传入原生事件event -->
<span @click="handlerClick($event,  'why')">点击事件</span> <!-- 要额外参数,则使用 $event -->
```



# diff 算法

## 条件渲染

1. `v-if`:不会被创建, 切换开销大, 创建开销小
2. `v-else`:与`v-if`是配套的
3. `v-show`:会被创建但不被渲染, 是通过`css`的`dispaly`控制显隐的;切换开销小,创建开销大
4. `template`:在`vue`中只有里面的标签会被渲染,小程序中的`block`相当于`template`

## 列表渲染

从服务器拿到数据,并对其渲染,可以使用`v-for`

1. `v-for`的基本格式是`item in data`
2. `data`可以是`String`,`Number`,`Object`,`Array`
3. 需要注意的是,遍历出的值始终在前, 索引在后
4. 可以使用`template`元素循环渲染一段包含多个元素的内容

```vue
<!-- v-for 遍历对象也能拿到索引 -->
<span v-for="(value, key, index) in Object">点击事件</span>
```

## 数组更新检测

仅用以下方法更新数组,才会触发视图更新:`push`,`pop`,`shift`,`unshift`,`splice`,`sort` `reverse`

## v-for 中 key 的作用

`key`属性主要用在`Vue`的虚拟`DOM`算法,在新旧`nodes`对比时辨识`VNodes`

使用`key`时,它会基于`key`的变化重新排列元素顺序,并且会移除/销毁`key`不存在的元素

## 认识 v-node

- `v-node`:虚拟节点
- 事实上,无论是组件还是元素,它们最终在`vue`中表示出来的都是一个个`v-node`
- `v-node`:本质是一个`JavaScript`的对象

- `template` => `v-node` => `DOM`:`vue`将模板转给对象,再将对象渲染成`DOM`节点

## 虚拟 DOM

1. 如果不只是一个简单的`div`,而是有一大堆的元素,那么会形成一个`v-node Tree`
2. 因此虚拟`DOM`就是许多`v-node`组成的节点树

## 案例

`vue`事实上针对有没有`key`会调用两个不同的方法

- 有`key`:使用效率较高的`diff`算法,直接在已存在的`DOM`节点中间插入新生成的`'f'`
- 没有`key`:使用效率较低的`diff`算法, `'c' => 'f'`, `'d' => 'c'`,最后再生成一个`'d'`
  1.  使用`patchUnkeyedChildren()`对新旧`node`进行遍历对比直到已无法从新旧`node`其中一个取出值
  2.  旧`node`无值:将新`node`多出的值挂载至旧`node`   
  3.  新`node`无值:将旧`node`中多出的`node`删除


```vue
<li v-for="item in letters" />
<span @click="handlerInsert">insert f</span>

<script>
  data() {
    return {
      letters: ['a', 'b', 'c', 'd']
    }
  },
  methods: {
    handlerInsert(){
      this.letters.splice(2, 0, 'f')
    }
  }
</script>
```

## 有 key 的 diff 算法

- 比较是否存在相同`node`

  - 通过节点的`type`即标签类型是否相同

  - 且节点的`key`相同, 就是相同`node`

- `diff`过程:
  1. 从头部开始遍历`while`:直到遍历出不同就跳出循环
  2. 从尾部开始遍历`while`:直到遍历出不同就跳出循环
  3. 此时头尾遍历循环都跳出,且新旧`node`中有一个已经遍历完毕
     1. 旧`node`遍历完成:依然有新节点,则新增节点
     2. 新`node`遍历完成:依然有纠结点,则删除节点
  4. 如果此时,新旧`node`中都未遍历完成,则对比两者中是否存在相同的`node`尽量复用
  5. 因此有`key`时的性能一般是更高的
- 如果`v-for`的遍历结果一般不变,或者始终进行头尾更新,不做插入,可以使用`index`作为`key`



# computed 与 watch

## 复杂 data 的处理方式

1. 模板语法
   1. 模板中存在大量的复杂逻辑,不便于维护
   2. 当有多次一样的逻辑时,存在重复的代码
   3. 多次使用的时候,需要多次执行, 没有缓存
2. `method`
   1. 显示的是结果,但实际都是对方法的调用
   2. 没有缓存
3. `computed`
   1. 看起来像函数,但实际不需要加`()`
   2. 有缓存

## 计算属性的介绍

1. 对于任何包含响应式数据的复杂逻辑,你都应该使用计算属性(官方描述)
2. 计算属性将被混入到组件实例中,所有`getter`和`setter`的`this`上下文自动地绑定为组件实例
3. 计算属性用法:
   1. 选项:`computed`
   2. 类型:`{ [key:string]: Function | { get:Function, set:Function } }`

## 计算属性的缓存

1. 计算属性会基于它们的依赖关系进行缓存
2. 第一次使用时调用计算属性的`getter`方法
3. 第二次使用是调用了`getResult`方法

## 计算属性的 getter 与 setter

```vue
<script>
  computed: {
    // 相当于只使用了计算属性的 getter 方法
    test: function() {
      return this.name + "Maaya"
    },
    // 完整写法
    all: {
      get: function() {
        return this.name + 'Sis'
      },
      set: function(newValue) {
        console.log(newValue)
        this.name = newValue // 改变 this.name 引起 get 的改变
      }
    }
  },
  methods: {
    changeAll() {
      this.all = 'test' // 此时会执行 all.set()
    }
  }
</script>
```

## watch 侦听器

1. 选项:`watch`
2. 类型:`{ [key:string]: String | Function | Object | Array }`

```vue
<script>
  watch: {
    // 监听对象 name
    name: {
      handler: function (newValue, oldValue) {
        // 当更改对象 name 中的 age 属性时是获取不到 old 数据的
        // 因为 name 是一个对象,而 oldValue 是 name 的浅拷贝, 因此 newValue 和 oldValue 的地址值一样
        console.log(newValue, oldValue) 
      },
      deep: true,
      immediate: true,
    }
  }
  methods: {
    changeName() {
      this.name.age = '18'
    }
  }
</script>
```

## 侦听器的其他方式

```JavaScript
// 1. 监听的键值是 string 时
watch: {
  name: 'handlerName' // 监听到改变时,执行 methods 中定义的方法
},
methods: {
  handlerName(newValue) {
    console.log(newValue)
  }
}
```

```JavaScript
// 2. 监听的键值是 array 时
watch: {
  name: [ // name 改变后会逐步调用 array 中的函数
    'handle1',
    function(newValue) {
      console.log(newValue)
    }
  ] // 监听到改变时,执行 methods 中定义的方法
},
methods: {
  handlerName(newValue) {
    console.log(newValue)
  }
}
```



```JavaScript
// 此种方式创建的监听可以取消
created() {
  const unwatch = this.$watch('name', (newValue, oldValue) => {
    console.log(newValue)
  })
}
```

## 案例

1. `vue3` 不支持过滤器,官方推荐使用全局方法或者计算属性来实现
2. 监听数组时,建议将数组遍历后,把`item`传入创建的基础组件,在基础组件中监听`item`的变动即可



# v-model 和注册组件

1. 修饰符`lazy`:如果在`v-model`后加上`lazy`修饰符,那么`input`事件将会变成`change`事件(在按下回车,提交时才会触发)
2. `v-model`会将值变成`string`类型
3. 修饰符`number`:将输入的内容可转化为数字的部分截取下来(始终截取最前面的部分)
4. 修饰符`trim`:自动过滤用户输入的首尾空白字符
5. `SFC`单文件应用:项目中将`HTML`,`JavaScript`,`CSS`抽出放在一个文件中



# Webpack 基础

## 模块化

1. `ES Module`:`export default`
2. `CommonJs`:`module.export`

## 依赖 	

- 生产依赖
- 开发依赖:`npm install webpack -D`
- 执行依赖的时候,将会在`.node_modules/.bin`目录下查找对应的依赖的名字去执行

```JavaScript
// 举例执行:webpack
// 1. 终端执行 .node_modules/.bin/webpack 命令
// 2. 方法 1 不简洁,因此还可以在终端使用命令 npx webpack
// 3. 方法 2 不符合使用习惯,可以在 package.json 的 script 对象中配置属性 "build":"webpack",在终端执行 npm run build
```

- `webpack`打包时默认的入口文件是`src/index`
- 可以通过命令/配置更改打包的默认入口文件及出口文件

## loader

举例`css-loader`:

1. `loader`可以用于对模块的源代码进行转换
2. 将`css`文件看做是一个模块,可以通过`import`来引用这个模块
3. 在加载这个模块时,`webpack`并不知道如何解析`css`类型的文件,所以需要订制`loader`来完成这个功能
4. 此时就可以使用`css-loader` 

## 使用 loader

1. `import  "css-loader!../css/style.css"`
2. 脚手架`CLI`
3. `export.module`

## loader 的配置方法

null

## 样式 loader

1. `css-loder`只能对`.css`文件进行解析
2. `style-loader`可以对将样式插入`dom`节点
3. `css-loader`需要先于`style-loader`执行`loader`是放在后面的先执行
4. 如果编写的`less`,还需要在`webpack.config.js`中添加对`less`文件的解析`rule`,`rule`中需要依次调用`less`,`css`,`style`三个`loader`

## PostCSS

1.安装`PostCss`,`PostCSS-CLI`以及所需要的插件`autoprefixer`(给浏览器自动添加前缀)



# Webpack 高级

1. 通过`import`,`require`对例如`.jpg`,`.png`等资源进行引用的解析可以使用`file-loader`进行解析处理
2. 在`Webpack5`已经不推荐使用`file-loader`和`url-loader`等进行处理
3. 在实际项目的中创建`img`标签使用图片,如果直接赋值相对路径`src="./img.png"`,因为赋值的是字符串,导致编译后无法识别到路径,并且这个`png`资源也不会被打包,需要使用`import/require()`

## 文件的命名规则

对`webpack`处理后的文件借用`placeholder`按照一定的规则进行命名

常用的`placeholder`:

1. `[ext]`:处理文件的扩展名
2. `[name]`:处理文件的名称
3. `[hash]`:文件的内容,使用`MD4`散列函数处理,生成的一个128位的`hash`值(32个十六进制)
4. `[contentHash]`:在`file-loader`中与`[hash]`是一致的,在`webpack`其他地方不一致
5. `[hash:length]`:截图`hash`的长度,默认32个太长
6. `[path]`:文件相对于`webpack`配置的路径
7. 更多的`placeholder`请查看文档

```JavaScript
export module = {
  rules: [
    {
      test: /\.(jpe?g|png|gif|svg)$/,
      use: {
        loader: 'file-loader',
        options: {
          // outputPath: 'img', // 省略
          name: 'img/[name]_[hash:6].[ext]' // 省略路径 img 的写法
        }
      }
    }
  ]
}
```

## url-loader

1. `url-loader`和`file-loader`相似,但可以将较小的文件,转化成`base64`的`URL`
2. 可以完全覆盖`file-loader`

```JavaScript
export module = {
  rules: [
    {
      test: /\.(jpe?g|png|gif|svg)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: 'img/[name]_[hash:6].[ext]', // 省略路径 img 的写法
          limit: 100 * 1024 // 小于 100kb 的进行打包
        }
      }
    }
  ]
}
```

## webpack 版本

1. `webpack5`之前加载资源需要使用一些`loader`,例如`css-loader`等
2. `webpack5`直接使用资源模块类型(`asset module type`),来替代`loader`

## asset module type

资源模块类型(`asset module type`),通过添加4种新的模块类型,来替换所有`raw-loader`,`file-loader`,`url-loader`:

1. `asset/resource`:发送一个单独的文件并导出`URL`,之前通过使用`file-loader`实现
2. `asset/inline`:导出一个资源的`data URI`,之前通过使用`url-loader`实现
3. `asset/source`:导出资源的源代码,之前通过使用`raw-loader`实现
4. `asset`:在导出一个`data URI`,和发送一个单独的文件之间自动选择,之前通过使用`url-loader`,并且配置资源体积限制实现；

```JavaScript
module.export = {
  output: {
    assetModuleFilename: 'img/[name]_[hash:6][ext]' // 文件的另外一种输出路径方式
  }
  module: {	
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        type: 'asset', // 最常用
        generator: {
          filename: 'img/[name]_[hash:6][ext]' // webpack5 不需要符号"."
        },
        parse: { // 
          dataUrlCondition: {
            maxSize: 100 * 1024
          }
        }
      }
    ]
  }
}
```

## 字体加载

对项目中引用的字体资源

```JavaScript
module.export = {
  module: {	
    rules: [
      {
        test: /\.(eot|ttf|woff2?)$/,
        type: 'asset/resource', // 相当于 file-loader
        generator: {
          filename: 'font/[name]_[hash:6][ext]' // webpack5 不需要符号"."
        }
      }
    ]
  }
}
```

## Plugin 

1. `Loader`是用于特定模块类型的转换
2. `Plugin`可以用于执行更广泛的任务,比如打包优化,资源关闭,环境变量注入
3. `Plugin`是没有执行顺序的@@

## CleanWebpackplugin 

`Loader`可以直接使用,而`Plugin`需要引用

```JavaScript
// plugin 一般是一个封装的 class
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.export = {
  entry: '', // 打包入口
  output: {}, // 打包输入配置
  module: {}, // 模块打包
  plugin: [
    new cleanWebpackPlugin()
  ]
}
```

## HtmlWebpackPlugin

1. `HTML`文件是编写在根目录下,而最终的`dist`文件夹是没有`index.html`文件的
2. 在部署时,是必须要有对应入口的`index.html`文件
3. 因此需要`HtmlWebpackPlugin`对`index.html`文件进行处理

```JavaScript
// 可以使用现有的 index 模板进行编译
plugin: [
  new HtmlWebpackPlugin({
    template: './public/index.html',
    title: '我是项目的title'
  })
]
```

## DefinePlugin

配置默认的`BASE_URL`

```JavaScript
const { DefinePlugin } = require('webpack') // 此插件 webpack 自带
plugin: [
  new DefinePlugin({
    BASE_URL: "variable" // 此时的 variable 是一个变量;如果想直接使用字符串写法为:"'./'"
  })
]
```



# Babel 解析和 Vue 打包

## Babel 的底层执行原理

`Babel`拥有和编译器一样的工作流程:

1. 解析阶段
2. 转换阶段
3. 生成阶段

详细工作流程:

1. 原生代码
2. 词法分析
3. `tokens`数组
4. 语法分析
5. `AST`抽象语法树
6. 遍历
7. 访问
8. 应用插件
9. 新的`AST`抽象语法树
10. 目标源代码

## babel-loader

```JavaScript
module.export = {
  module: {	
    rules: [
      {
        test: /\.js$/,
        // loader: "babel-loader" // 仅使用 loader 不使用 plugin 是不行的,相当于源码转换成 AST 抽象语法树后不经过处理又转回成源码
        user: {
          loader: 'babel-loader',
          options: {
            plugin: [
              '@babel/preset-env',
              ['@babel/preset-env', {}] // 如果需要给插件配置额外的选项使用此写法
            ]
          }
        }
      }
    ]
  }
}
```

## Babel的配置文件

抽离出`babel`配置成文件

```JavaScript
// webpack.config.js
module.export = {
  module: {	
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader" 
      }
    ]
  }
}
// babel.config.js
module.export = {
  presents: [
    "@babel/preset-env"
  ]
}
```

## Vue 打包

`vue`打包分为两种方式:

1. `runtime` + `compiler`:项目中存在`template`时必须使用此方法
2. `runtime-only`

## Vue 打包后不同版本解析

引用不同版本的`vue`包,可以做到更多的操作

## vue-loader

1. `.vue`单文件组件也需要使用`vue-loader`对源码进行转换
2. `vue-loader`还依赖于`@vue/compiler-next`
3. 除了使用`vue-loader`,还需要将`vue-loader`中`require`引出插件`VueLoaderPlugin`并使用它

## GlobalFeatureFlag

1. `__VUE_OPTIONS_API__`:是否需要在`vue3`中支持`Options API`的使用,默认是`true`,如果设置为`false`,就会进行`tree-shaking`
2. `__VUE_PROD_DEVTOOLS__`:是否需要在生产环境也支持`Vue Tools`



# devServer, resolve, 环境分离

## Webpack watch

`webpack`提供了`watch`模式,一旦依赖图中的文件进行变更,就会重新打包编译

1. 配置中添加`watch:true`配置启用
2. 在启动`webpack`的命令中,添加`--watch`的命令,会被`webpack-cli`转成`watch:true`写入打包编译后的配置中,只要执行一次`--watch`后续可不用执行
3. `watch`项目中使用的较少,因为还需要配合`VS Code`的`live-server`插件使用

## webpack-dev-server

`webpack-dev-server`编译之后不会输入任何文件,而是将编译的结果留在了内存中;这是为了提高效率简化了从文件提取到内存这一步

`memfs(memory-fs webpack)`库来实现将编译存储到内存

## contentBase

在开发时,可能存在某些资源不希望打包时使用`copyWebpackPlugin`复制,只在生产时复制;可以使用`contentBase`

## 模块热替换

1. `Hot Module Replacement`:模块热替换
2. 指在应用程序运行过程中,替换,添加,删除模块,而无需重新刷新页面
3. 不重新加载整个页面,可以保留某些状态不丢失
4. 只更新改变的内容,提高开发效率
5. 修改了`css`,`js`源代码,会立即在浏览器更新
6. `webpack-dev-server`已集成`HMR`,配置开启即可

## HMR 的原理

1. `webpack-dev-server`会创建两个服务:提供静态资源的服务`express`和`Socket`服务`net.Socket`
2. `express server`负责直接提供静态资源的服务(打包后的资源直接被浏览器请求和解析)
3. `HMR Socket Server`是一个`socket`的长连接
4. 长连接的好处是建立连接后双方可以通信(服务器可以直接发送文件到客户端)
5. 当服务器监听到对应的模块发生变化时,会生成两个文件`.json`文件`manifest`和`.js`文件`update chunk`
6. 通过长连接,可以直接将这两个文件主动发送给客户端(浏览器)
7. 浏览器拿到两个新的文件后,通过`HMR runtime`机制,加载这两个文件,并且针对修改的模块进行更新;

## host port open compress

1. `host`:`localhost`|`0.0.0.0`
   1. 设置为`localhost`时,只接受本机的请求
   2. 设置为`0.0.0.0`时,可接受同网段的下的所有请求
2. `port`:设置项目的端口
3. `open`:`ture`|`false`,编译完成后是否自动打开浏览器
4. `compress`:对项目资源进行压缩为`gzip`格式,浏览器识别到`gzip`为自动进行解压,但不会对`index.html`(又或者是所有`.html`文件)压缩

```JavaScript
// webpack.config.js
modules.export = {
  target: 'web', // 标识在 web 环境下打包,不添加此标识,热更新可能会有问题(官方文档未提交, codewhy 提出)
  devServer: {
    contentBase: './public',
    hot: true,
    host: '0.0.0.0',
    port: 9539,
    open: true,
    compress: true
  }
}
// main.js
// 还需要声明哪些模块是需要热更新
if(module.hot) {
  module.hot.accept('./js/test.js', () => console.log('模块更新'))
}
// 但真实项目不需要每一个文件单独设置,例如 vue-loader 就支持 vue 组件的 HMR
```

## webpack.config.js 拆分

当`webpack.config.js`中可能存在不同场景(`dev`和`prod`)下的配置项,此时可以提取出公共及不同环境的配置,使用`webpack-merge`合并

## context

不同插件的`context`上下文可能不一样,导致在`webpack`中有的路径查询方式不同

```JavaScript
// 例如在不同插件中对 public 的使用不同,如以下两种可能都是对的
require('./public')
require('../public')
```



# Vue-CLI 和 Vite 的使用及原理

## .browserslistrc 文件

控制对市面上的哪些浏览器进行`css`样式适配,一般直接使用默认的即可

## vue 脚手架 cli-service 源码

结合教学视频学习

## vite 介绍

1. `vite`默认是支持`css`,`less`,`ES Module`,`TypeScript`等,不需要进行配置即可使用(但是依赖还是要自行安装,例如`less`的依赖)
2. `webpack`本地搭建服务器使用的是`express`,`vite1`使用`koa`,`vite2`使用`Connect`
3. 服务器框架改变的原因是,`vite2`时发现需要对浏览器的请求进行拦截及转发,例如4中的举例
4. 在项目对`ts`,`css`,`less`等浏览器无法解析文件类型引用时,在浏览器向本地服务器请求这些文件,`vite2`会拦截后将这些无法识别类型的文件转换成`js`类型的代码,转发给浏览器
5. `vite`会对依赖进行预打包,来提升编译的速度

## vite 依赖的 ESBuild 的原理

`vite`使用`ESBuild`进行打包,性能更好

## vite 脚手架工具

1. `vue`中使用`webpack`打包时用`vue-cli`脚手架初始化项目
2. 使用`vite`打包时用`vitejs/create-app`



# 组件化开发及组件间通信 

## 样式 scoped

```vue
<!-- parent.vue -->
<style scoped>
  h2 {
    color: blue
  }
</style>
<!-- child.vue -->
<template>
	<!-- 父组件的样式即使添加了 scoped,也仍然会将样式穿透到子组件的最外层元素上 -->
	<h1>我是 vue3 下 child 组件的最外层 h1 元素</h1>
	<h2>我是 vue3 下 child 组件的最外层 h2 元素</h2> <!-- 所以此处会变为蓝色 -->
</template>
```

## prop 的大小写命名

1. `HTML`中的`attribute`名是大小写不敏感的,所以浏览器会把所有大写字符截石位小写字符
2. 因此在使用`DOM`中模板的时候,需要将`camelCase`(驼峰命名)的`prop`名需要使用等价的`kebab-case`(短横线分割命名)

## 非 props 的 attribute

非`props`的`attribute`:在父组件中给子组件传递了的属性,但在子组件中未申明`props`去接受

```vue
<!-- parent.vue -->
<child class="child" name="MaayaSis"></child>
<!-- child.vue -->
<template>
	<!-- 1. 单根节点 -->
	<div></div>
	<!-- 2. 禁用继承后,可去所有未被继承的存放点 $attrs 中取值手动继承 -->
	<div :class="$attrs.class" v-bind="$attrs"></div>
	<!-- 3. 多根节点浏览器会警告提示未继承的非 props 的 attribute,手动继承即可解除警告 -->
</template>
<script>
  export default {
    inheritAttrs true // 禁用继承
    // 此时 class 为非 props 的 attribute
    // 场景1: 子组件为单根节点,那么 class 会被这个单根节点继承
    // 场景2: 子组件禁用了继承或者子组件是多根节点	
    props: {
      name: String
    }
  }
</script>
```

## 父子组件传参

```vue
<template>
	<button @click="handleAdd"></button>
</template>

<script>
  export default {
    // emits 的两种写法
    // 1. 数组定义
  	emits: ['add'],
    // 2. 对象定义(一般是为了对传入的参数进行验证)
    emits: {
      add: value => {
        if(value > 10) {
          return true 
        }
        return false // 此时控制台会 warning 
      }
    }
    methods: {
      handleAdd() {
        this.$emit('add')
      }
    }
	}
</script>
```



# 跨组件通信和插槽的使用

## provide 和 inject

1. 在一些深层嵌套的组件,无论层级结构多深,父组件都可以作为其所有子组件的依赖提供者
2. 父组件有`provide`选项来提供数据
3. 子组件有`inject`选项来使用这些数据

```vue
<script>
  // 父组件 App.vue
  export default {
    data() {
     	return {
        male: 'female'
      }
    },
    provide() { // 当需要取到 data 中的数据需要使用 this 时, provide 需使用函数形式声明,如果是对象形式声明则此时的 this 指向 script 是 undefined;使用 函数时 vue 框架在执行 provide() 后会给函数绑定一个 this
      return {
        name: 'maaya',
      	age: 18,
        male: this.male // 但是此时是非响应式的,如需响应式还要将 this.male 变成一个 computed 属性
      }
    }
  }
  // 子组件 parent.vue
  export default {
    inject: ['name', 'age']
  }
  // 孙组件 child.vue
  export default {
    inject: ['name', 'age']
  }
</script>
```

## 全局事件总线 mitt 库

`$on`,`$off`,`$once`,`$eventBus`都已经从`vue3`中移除,所以如果希望继续使用全局事件总线,要通过第三方的库

1. `mitt`
2. `tiny-emitter`

```JavaScript
// src/utils/events
import mitt from 'mitt'
export default const emitter = mitt()
// src/views/test-emitter.vue: 测试全局事件总线的发起者
import emitter from 'src/utils/events'
export default {
  methods: {
    test() {
      emitter.emit('handleTest', '测试全局事件总线')
    }
  }
}
// src/views/receive.vue
import emitter from 'src/utils/events'
export default {
  created() {
    // 监听指定名称的全局事件总线
    emitter.on('handleTest', (info) => {
      console.log(info)
    })
    // 监听所有事件
    emitter.on('*', (eventsArguments1, eventsArguments2) => {
      console.log(info)
    })
	}
}
```

```javascript
// mitt 取消监听
// 1. 取消所有监听
emitter.all.clear()
// 2. 取消指定监听:必须是在设置监听时传入的执行函数是一个引用的值时,才能被取消
emitter.on('watch', handleChange)
emitter.off('watch', handleChange)
handleChange() {
  console.log('我是监听触发时执行的函数')
}
```

## 插槽基本

- 插槽的默认内容:使用插槽却不插入内容且插槽组件有定义默认值,则显示默认值

```vue
<!-- slot.vue -->
<template>
	<div>
    <slot>我是默认内容</slot> 
  </div>
</template>
```

- 多个插槽:向在插槽组件传入多个标签,则每个标签都会在插槽中渲染一遍

```vue
<!-- app.vue -->
<template>
	<slotComponent>
    <h1>标题1</h1>
    <h2>标题2</h32>
    <h3>标题3</h3>
  </slotComponent>
</template>
<!-- slotComponent.vue -->
<template>
	<div>
    <slot></slot> <!-- 插槽1:会渲染标题1,2,3 -->
    <slot></slot> <!-- 插槽2:会渲染标题1,2,3:会渲染标题1,2,3 -->
    <slot></slot> <!-- 插槽3:会渲染标题1,2,3 -->
  </div>
</template>
```

- 具名插槽:将标签插入指定的具名插槽中;如果不给插槽声明名称,则默认为`default`

```vue
<!-- app.vue -->
<template>
	<slotComponent>
    <template v-slot:first>
      <h1>标题1</h1>
    	<h2>标题2</h32>
    	<h3>标题3</h3>
		</template>
  </slotComponent>
</template>
<!-- slotComponent.vue -->
<template>
	<div>
    <slot name="first"></slot>
    <slot></slot> <!--插槽2默认名称 default -->
    <slot></slot> <!--插槽3默认名称 default -->
  </div>
</template>
```

- 动态插槽名:可以通过`v-slot:[dynamicSlotName]`绑定一个动态的插槽名称

 ```vue
<!-- app.vue -->
<template>
	<slotComponent :name="name">
    <template v-slot:[name]> <!-- 会取 data 中的 name -->
      <h1>标题1</h1>
    	<h2>标题2</h2>
    	<h3>标题3</h3>
		</template>
  </slotComponent>
</template>
<script>
  export default {
    data() {
      return {
        name: 'change'
      }
    }
  }
</script>

<!-- slotComponent.vue -->
<template>
	<div>
    <slot :name="name"></slot>
  </div>
</template>
<script>
  export default {
    props: {
      name: String
    }
  }
</script>
 ```

-  符号省略写法:`v-slot:name` -> `#name`

## 渲染作用域

父级模板里的所有内容都是在父级作用域中编译的,子模板里的所有内容都是在子作用域中编译的

## 作用域插槽

1. 父级模板传给子模板传入的标签要使用子元素中的数据,就需要使用作用域插槽
2. 具名插槽与作用域插槽同时使用的声明方式`v-slot:slotName="name"`

```vue
<!-- app.vue -->
<template>
	<slotComponent :names="names">
    <template v-slot="slotProps"> <!-- slotProps 就是子组件传回值的集合 -->
      <h1>{{ slotProps.name }} + {{ slotProps.index }}</h1>
		</template>
  </slotComponent>
</template>

<!-- slotComponent.vue -->
<template>
	<div>
    <template v-for="(item, index) in names" :key="item">
    	<slot :name="names" :index="index"></slot>
		</template>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        names: ['1', '2', '3']
      }
    }
  }
</script>
```



# 动态,异步,keepalive,生命周期,组件 v-model

## 动态组件

1. 动态组件可以实现使用`if eles`来手动切换的效果,但更简洁
2. 此处也可以使用路由切换,但对于比较小的内容,使用动态组件更好
3. 动态组件的性能必路由切换更好

```vue
<!-- componentName 可以是通过 component 函数注册的全局组件,也可以是在组件对象的 components 对象中注册的组件 --> 
<component is="componentName"></component>
<script>
  components: {
    a,
    b,
    c,
  },
  data() {
    componentName: 'a'
  }
</script>
```

## keep-alive 使用

```vue
<!-- app.vue -->
<!-- 切换顺序 a.vue(更新 num 后) -> app.vue -> a.vue(num 是第一次切换并更新后的值,而非初始值)  -->
<template>
	<keep-alive>
    <a v-if="name === 1"></a>
  </keep-alive>
	<b v-if="name === 2"></b>
	<c v-if="name === 3"></c>
	<button @click="updateActiveComponent()">button</button>
</template>
<script>
  data() {
    name: 1
	}
  methods: {
    updateActiveComponent(value) {
      this.name++
    }
  }
</script>
<!-- a.vue -->
<script>
  export default {
    data() {
      num: 1
    }
  }
</script>
```

## keep-alive 属性

- `include`:`string|RegExp|Array`只有名称匹配的组件会被缓

- `exclude`:`string|RegExp|Array`任何名称匹配的组件都不会被缓存

- `max`:`number|string`最多可以缓存多少组件实例,一旦达到这个数字,那么缓存组件中最近没有被访问的实例会被销毁
- 以上的名称是组件的`name`属性定义的名字
- 动态组件加`keep-alive`缓存的场景就可能会用到以上属性

```vue
<keep-alive include="a,b"><!-- 使用字符串时,此处的两个组件名称间只能有逗号,不能有空格 -->
  <component is="componentList"></component>
</keep-alive>
```

## 缓存组件的生命周期

1. 被缓存的组件,再次进入时不会执行`created`或者`mounted`等生命周期函数
2. 可以通过缓存组件独有的`activated`,`deactivated`生命周期来判断

## Webpack 的代码分包

1. 默认在构建整个组件树的过程中,因为组件和组件通过模块化直接依赖,所以`webpack`在打包时就会将组件模块打包到一起(比如一个`app.js`文件中)
2. 项目的不断庞大,`app.js文件`的内容也过大,会造成首屏的渲染速度变慢
3. 不需要立即使用的组件,可以单独对它们进行拆分,拆分成一些小的代码块`chunk.js`
4. `chunk.js`会在需要时从服务器加载下来,并且运行代码,显示对应的内容

```js
// utils/math.js
export function (num1, num2) {
  return num1 + num2
}
// main.js
// 以 import() 方法引入的文件会被 webpack 分包	
import('@/utils/math').then(res => { // res 即为 math.js 文件对象
  console.log(res.sum(20, 30))
})
```

## 异步组件

如果希望对某些`vue`组件通过异步的方式来进行加载(目的是可以对其进行分包处理),可以通过`defineAsyncComponent`函数

`defineAsyncComponent`接受两种类型的参数:

1. 工厂函数,该工厂函数需要返回一个`Promise`对象
2. 接受一个对象类型,对异步函数进行配置

```vue
<script>
  // app.vue
  import { defineAsyncComponent }  from 'vue'
  import Loading from '@/components/Loading.vue' // 未加载异步组件时的占位组件
  // 异步组件定义方式1:Promise 方式
	const AsyncHomeComponent = defineAsyncComponent(() => import('@/views/home.vue'))
  // 异步组件定义方式2:对象方式,
  const AsyncHomeComponent = defineAsyncComponent({
    // 更多的配置在官网中查找
    loader: () => import('@/views/home.vue'),
    loadingComponent: Loading, // 可能在 app.vue 页面已经加载完成时,被分包的异步组件 AsyncHomeComponent 还没加载完成,此时可以用配置的未加载展示组件来弥补
    delay: 2000 // 延迟展示异步组件
  })
  export default {
    components: {
      AsyncHomeComponent // 引用异步组件,将会被打包到单独的 chunk.js 包中
    }
  }
</script>
```

## 异步组件和 Suspense

`Suspense`是一个内置的全局组件,该组件有两个插槽:

1. 如果默认插槽`default`可以显示,那么显示`default`的内容
2. 如果`default`无法显示,那么会显示`fallback`插槽的内容

## $refs 的使用

组件实例有一个`$refs`属性,它是一个对象`Object`,持有注册过`ref attribute`的所有`DOM`元素和组件实例

## `$parent` 和 `$root`

`$parent`:获取父元素

`$root`:获取根组件`App.vue`

`$children`:在`vue3`已经被移除了

## 生命周期

组件的八个通用生命周期及`keep-alive`缓存组件的两个生命周期

## 组件 v-model 的实现

```vue
<!-- 父组件 app.vue -->
<template> 
	<my-div v-model="message">我是测试组件 v-model 的简写</my-div>
	<my-div :modelValue="message" @update:model-value="message = $event">我是测试组件 v-model 实现</my-div> <!-- 子组件传递的更改后的值就是 $event -->
</template>
<script>
  export default {
    data() {
      return {
        message: '我是在子组件中展示的数据'
      }
    }
  }
</script>
<!-- 子组件 MyDiv.vue -->
<template> 
	<div>展示 v-model 绑定值: {{ modelValue }}</div>
	<button @click="handleUpdateModelValue"></button>
	<!-- 如果要在组件使用 input,那这个 input 不能使用 v-model 绑定,只能手写实现 -->
	<input :value="modelValue" @input="handleUpdateModelValue" />
</template>
<script>
  export default {
    props() {
      modelValue: String
    },
    emits: ['update:modelValue'], // 此处的大驼峰最后会被 vue 转译成横杆写法
    methods: {
      handleUpdateModelValue(event) {
        this.$emit('update:modelValue', event ? event.target : 'test data' )
      }
    }
  }
</script>
```

## computed 实现

1. 上一节中子组件的`input`标签,不能直接使用`v-model api`绑定父组件通过`v-model`传来的值
2. 因为当传的值是基础数据类型时,子组件改变不会影响到父组件;而如果是引用类型的数据,则违背了单向数据流通原则
3. 因此需要通过`computed`的方式实现

```vue
<input v-model="value" />
<script>
  export default {
    props() {
      modelValue: String
    },
    emits: ['update:modelValue'], // 此处的大驼峰最后会被 vue 转译成横杆写法
    computed: {
      value: {
        get() {
          return this.modelValue
        },
        set(value) {
          this.$emit('update:modelValue', value )
        }
      }
    }
  }
</script>
```

## 组件绑定多个 v-model 属性 

在一个组件上绑定多个属性

```vue
<!-- app.vue -->
<my-input v-model="name" v-model:age="age"></my-input>
<!-- MyInput.vue -->
<input v-model="name" />
<input v-model="childAge" />
<script>
  export default {
    props() {
      modelValue: String,
      age: String
    },
    emits: [
      'update:modelValue', // 此处的大驼峰最后会被 vue 转译成横杆写法
			'update:age',
    ],
    computed: {
      name: {
        get() {
          return this.modelValue
        },
        set(value) {
          this.$emit('update:modelValue', value )
        }
      },
      // 第二个 v-model 属性
      childAge: {
        get() {
          return this.modelValue
        },
        set(value) {
          this.$emit('update:modelValue', value )
        }
      },
    }
  }
</script>
```



# 动画 animate-gsap

## vue 的 transition 动画

`Vue`提供了`transition`的封装组件,在下列情形中,可以给任何元素和组件添加进入/离开过渡

1. 条件渲染`v-if`
2. 条件展示`v-show`
3. 动态组件
4. 组件根节点

```vue
<transaction name="maaya">
  <div v-if="show">
    test
  </div>
  <button @click="show = !show">
    change
  </button>
</transaction>
<script>
  export default {
    data() {
      return {
        show: false
      }
    }
  }
</script>
<style>
  .maaya-enter-from,
  .maaya-leave-to {
    opacity: 0;
  }
  .maaya-enter-active,
  .maaya-leave-active {
    transaction: opacity 2s ease;
  }
</style>
```



## transition 组件的原理

当插入或删除包含在`transition`组件中的元素时,`vue`将会做以下处理

1. 自动嗅探目标元素是否应用了`CSS`过渡或者动画,如果有,那么在恰当的时机添加/删除`CSS`类名
2. 如果`transition`组件提供了`JavaScript`钩子函数,这些钩子函数将在恰当的时机被调用
3. 如果没有找到`JavaScript`钩子并且也没有检测到`CSS`过渡/动画,DOM插入和删除操作将会立即执行

## 过渡动画 class

1. `v-enter-from`:定义进入过渡的开始状态,在元素被插入之前生效,在元素被插入之后的下一帧移除
2. `v-enter-active`:定义进入过渡生效时的状态,在整个进入过渡的阶段中应用,在元素被插入之前生效,在过渡/动画完成之后移除,这个类可以被用来定义进入过渡的过程时间,延迟和曲线函数
3. `v-enter-to`:定义进入过渡的结束状态,在元素被插入之后下一帧生效(与此同时`v-enter-from`被移除),在过渡/动画完成之后移除
4. `v-leave-from`:定义离开过渡的开始状态,在离开过渡被触发时立刻生效,下一帧被移除
5. `v-leave-active`:定义离开过渡生效时的状态,在整个离开过渡的阶段中应用,在离开过渡被触发时立刻生效,在过渡/动画完成之后移除,这个类可以被用来定义离开过渡的过程时间,延迟和曲线函数
6. `v-leave-to`:离开过渡的结束状态,在离开过渡被触发之后下一帧生效(与此同时`v-leave-from`被删除),在过渡/动画完成之后移除,

## class 的添加时机和命名规则

## 过渡 css 动画

过渡动画与过渡`css`动画不一样

```vue
<transaction name="maaya">
  <div v-if="show">
    test
  </div>
  <button @click="show = !show">
    change
  </button>
</transaction>

<script>
  export default {
    data() {
      return {
        show: false
      }
    }
  }
</script>
<style>
  .maaya-enter-active {
    animation: maaya 1s ease;
	}
  .maaya-leave-active {
    animation: maaya 1s reverse; /* 离开的时候执行翻转动画 */
	}
  
  @keyframes maaya {
    0% {
      transform: scale(0)
    }
    50% {
      transform: scale(1.2)
    }
    100% {
      transform: scale(1.0)
    }
  }
</style>
```

## 动画拓展

1. `vue`在内部监听`animation`和`transaction`
2. 如果两个同时存在,那么两个都会生效
3. 如果同时使用两个,且一个动画失效,另外一个没有失效,可以通过`type`属性来设置动画以哪个为基准结束
4. 可以在`transaction`标签中添加`duration`属性,来控制动画执行时间,优先级高于`css`中设置的时间

```vue
<transaction name="maaya" type="transaction" :duration="1000"> <!-- 此时,只有在过渡动画结束后,动画效果才会结束 -->
<!-- <transaction :duration="{enter: 800, leave: 1000}"> duration 的对象 写法 --> 
  <div v-if="show">
    test
  </div>
</transaction>
```

## transaction 的属性

  ```vue
<!-- 1. mode: 控制动画的展示顺序; 2. appear: 控制首次加载页面的时候是否需要展示对应动画效果 -->
<transaction mode="out-in"></transaction> <!-- 为删除动作动画结束后再执行插入动作动画 -->
  ```

## 自定义过渡 class

1. `enter-from-class`
2. `enter-active-class`
3. `enter-to-class`
4. `leave-from-class`
5. `leave-active-class`
6. `leave-to-class`

```vue
<!-- animate__animated 基础样式必须添加 -->
<!-- 指定进入动画的 class -->
<transaction 
	enter-active-class="animate__animated animate__rubberBand"
	leave-active-class="animate__animated animate__rubberBand"
>
  <div v-if="show">
    enter
  </div>
</transaction>
```

## transaction 的生命周期

```vue
<!-- 1. beforeEnter -->
<!-- 2. enter -->
<!-- 3. afterEnter -->
<!-- 4. beforeLeave -->
<!-- 5. leave -->
<!-- 6. afterLeave -->
<!-- 在动画的生命周期中使用动画时,需要调用 done 函数来结束调用,否则动画生命周期的代码会被视为同步代码,执行动画函数后立刻进入下个生命周期 -->
<!-- class 属性为 false 时将会跳过 <stlye></style> 中的 css 渲染 -->
<transaction @enter="enter" @leave="@leave" :class="false"></transaction>
<script>
  methods: {
    enter(el, done) {
      gsap.for(el, {
        scale: 0,
        x: 200,
        onComplete: done // gsap 执行后会执行 done 函数,相当于下面的 done 函数
      })
      done() // 卡主周期,直到 gsap 函数执行完成再进入下个周期
    }
  }
</script>
```

## gsap 实现数字变化

`gspa`是`JavaScript`的动画库

```vue
<input v-model="counter" />
<div>
  {{ counter1 }}
</div>
<script>
  export default {
    data: function () {
      return {
        counter: 0,
        counter2: 0
      }
    },
    // computed: {
    //   counter1() {
    //     return counter.toFixed(0)
    //   }
    // },
    watch: {
      counter(newValue) {
        gasp.to(this, { duration: 1, counter2: newValue}) // 当 counter 改变时,调用gasp.to() 去实现所有元素的数字变化效果
      }
    }
  }
</script>
```

## 认识列表的过渡 

1. `transaction` 只能渲染单个节点,或者同一时间渲染多个节点中的一个
2. `transaction-group`组件
   1. 不会渲染一个元素的包裹器,但可以指定一个元素并以`tag attribute`进行渲染
   2. 过渡模式不可用,因为不再相互切换特有的元素,例如`mode="in-out"`
   3. 内部元素总是需要提供唯一的`key attribute`值
   4. `css`过渡的类将应用在内部的元素中,而非容器上
   5. 原先只有删除或新增的节点是有动画的,现在新增`v-move`这个`class`类来实现移动动画,它会在元素改变位置时应用
   6. 像之前一样可以通过`name`来定义前缀

```vue
<transaction-group tag="p" name="maaya"> <!-- 最外层用 p 元素包裹 -->
  <span v-for="item in 10" class="item">item</span>
</transaction-group>
<style>
  .item {
   display: inline-block  /* 改为块元素后,插入或删除的特效就会从下往上插入 */
  }
  .maaya-move { /* 移动的类 */
    transaction: transform 1s ease
  }
  .maaya-leave-active { /* 删除导致的位移动画如果想要生效,需要添加这个效果,因为被删除完之前,这个元素都存在并占据着空间,导致其他元素无法填充过去,如果添加上了绝对定位,这个被删除的元素就等于跳出了这个元素轴不再占据空间了 */
    position: absolute 
  }
</style>
```

## 列表的交错过渡案例

简单的动画效果可以使用`css`的动画实现,复杂的需要用`JavaScript`库`gasp`来实现

```vue
<transaction-group 
                   tag="url" 
                   name="maaya" 
                   :css="false"
                   @enter="enter"
                   @leave="leave"
                   >
  <li 
      v-for="(item, index) in nameList" 
      :data-index="index"
      :key="index"
      >{{ item }}</li>
</transaction-group>
<script>
  export default {
    methods: {
      beforeEnter(el) {
        el.style.opacity = 0
        el.style.height = 0
      },
      enter(el, done) {
        gsap.to(el, {
          opacity: 1,
          height: "1.5em",
          delay: el.dataset.index * 0.5 // 依次增加
          onComplete: done
        })
      },
      leave(el, done) {
        gasp.to(el, {
          opacity: 0,
          height: 0,
          delay: el.dataset.index * 0.5, // 依次删除
          onComplete: done
        })
      }
    }
  }
</script>
```



# vue3 的 Mixin 和 CompositionApi

## Mixin 的合并规则

1. 如果是`data`函数的返回值对象
   1. 返回值对象默认情况下进行合并
   2. 如果`data`返回值对象的属性发生了冲突,那么保留组件自身的数据
2. 如何生命周期钩子函数
   1. 生命周期的钩子函数会被合并到数组中,都会被调用
3. 值为对象的选项,例如`methods` `components` `directives`,将被合并为同一个对象
   1. 比如都有`methods`选项,并且都定义了方法,那么它们都会生效
   2. 但是如果对象的`key`相同,那么会取组件对象的键值对

## 掌握 setup 的 props 参数和 context 参数

```vue
<!-- 子组件 child.vue -->
<script>
  export default {
    props: {
      message: {
        type: String,
        required: true
      }
    }
    // 1. setup 中拿不到 this
    // 2. setup 主要有两个参数, props 和 context
    // 3. props: 父组件传递数据
    // 4. context: 包含三个属性, 1. attrs: 所有非 prop 的 attribute, 2. slots: 父组件传递的 slot 插槽, 3. emit: 因为不能访问 this, 所以用 emit 来触发时间
    setup(props, context) {
    setup(props, {attrs, slots, emit}) {
      console.log(props.message)
      console.log(context.attrs,id, context.attrs.class) // 父组件传递的属性
      console.log(context.slots) // 父组件传递的插槽
      console.log(context.emit) // 触发父组件的属性
    }
  }
</script>
```

## setup 的返回值

```vue
<template>
	<div>
 		{{sister}} : {{name}}
  </div>
	<div>
  	{{count}}
    <button @click="increment">count + 1</button>
  </div>
</template>	
<script>
  export default {
    data() {
      return {
        name: 'kisragi' // 会被 setup 的返回值覆盖
      }
    },
    setup() {
      const count = 100
      const increment = () => count++
      return {
        name: 'Maaya',
        sister: '姐姐',
        count, // 非响应式
        increment
      }
    }
  }
</script>
```

## setup 执行过程的源码概述

1. `setup`中不能使用`this`是因为它会找不到组件实例
2. `setup`的调用发生在 `data`,`computed`,`methods`被解析之前,所以无法在`setup`中被获取
3. 源码部分请观看`15`节

## Reactive API

1. 在使用`reactive`函数处理某个数据后,这个数据再次被使用时会进行依赖收集
2. 当数据发生改变时,所有收集到的依赖都是进行对应的响应式操作(比如更新界面)
3. 我们编写的`data`选项,也是在内部交给了`reactive`函数将其编程响应式对象

 ```vue
 <!-- vue2 中的 data() 能够将返回的属性变成响应式是使用了 reactive 函数 -->
 <script>
   import { reactive } from 'vue'
   export default {
     setup() {
       const state = reactive({ counter: '100' })
       const increment = () => state.counter++
       return {
         state,
         increment
       }
     }
   }
 </script>
 ```

## Ref API

```vue
<template>
  <div>
    {{count}} <!-- 因为 ref() 返回的是一个对象,实际上应该是 count.value; 但 vue 会在 template 做自行解包的操作 -->
  </div>
	<button @click=increment>
    
  </button>
</template>
<script>
  import { reactive } from 'vue'
  import { ref } from 'vue'
  export default {
    setup(){
      const string = reactive('Maaya') // reactive API对传入的类型有限制,必须传入一个对象或者数组类型,如果是 String Number Boolean 将会报错
      const count = ref(100)
      const increment = () => {
        count.value++ // setup 函数内部,依然是一个 ref 引用,所以对其进行操作时,我们依然需要使用 ref.value 的方式
      }
      return {
        string,
        count,
        increment
      }
    }
  }
</script>
```

## Ref 自动解包

```vue
<template>
  <div>
    {{ num.count }} <!-- vue 只能对浅层 ref 对象解包 -->
    {{ object.count }} <!-- 如果最外层也是 ref 对象,那也能自动解包 -->
  </div>
	<button @click=increment>
    
  </button>
</template>
<script>
  import { ref } from 'vue'
  export default {
    setup(){
      const count = ref(100)
      const info = { count }
      const obj = ref({ count })
      return {
        num,
        object
      }
    }
  }
</script>
```

## readonly

1. `readonly`:保证响应式对象在传给其他组件时,可以不被其他组件修改
2. 原理是,`readonly`只会返回原生对象的只读代理,这个代理仍然是一个`proxy`,但是`set`方法被劫持了,并且不能对这个`set`方法修改
3. `readonly`方法常见会传入的参数有三种,普通对象,`reactive`返回的对象,`ref`的对象

```vue
<script>
  export default {
    setup(){
      // 1. 普通对象
      const info1 = { name: 'Maaya' } // 如果传递的是非引用类型,则readonly
      const readonly1 = readonly(info1) // 处理后仍然是非响应式
      // 2. reactive 响应式对象
      const info2 = reactive({ name: 'Maaya' }) // 
      const readonly2 = readonly(info2)
      // 3. ref 响应式对象
      const info3 = ref({ name: 'Maaya' })
      const readonly3 = readonly(info3)
      
      const update = () => {
        readonly2.value = '姐姐' // 不能修改,会报错
        info2.value = '姐姐' // 可以修改,并且是响应式的
      }
    }
  }
</script>
```



# computed 和 watch 等 API

## Reactive 判断的 API

1. `isProxy`:检查对象是否是由`reactive`或`readonly`创建的`proxy``
2. `isReactive`
   1. 检查对象是否是由`reactive`创建的响应式代理
   2. 如果该代理是`readonly`建的,但包裹了由`reactive`创建的另一个代理,也会返回`true`

3. `isReadonly`:检查对象是否是由`readonly`创建的只读代理。
4. `toRaw`:返回`reactive`或`readonly`代理的原始对象(不建议保留对原始对象的持久引用,请谨慎使用)
5. `shallowReactive`:创建一个响应式代理,它跟踪其自身`property`的响应性,但不执行嵌套对象的深层响应式转换(深层还是原生对象)
6. `shallowReadonly`:创建一个`proxy`,使其自身的`property`为只读,但不执行嵌套对象的深度只读转换(深层还是可读,可写的)

## toRef 和 toRefs

1. 如果使用ES6的解构语法,对`reactive`返回的对象进行解构获取值,那么之后无论是修改结构后的变量,还是修改`reactive`返回的`state`对象,数据都不再是响应式的
2. 可以通过`toRef`和`toRefs`将`reactive`返回的对象中的属性转成`ref`

```vue
<script>
  export default {
    setup() {
      const info = reactive({
        name: 'Maaya',
        type: 'Sister'
      })
      // const { name, type } = info // 此时 name type 非响应式
      const { name, type } = toRefs(info) // 全都是响应式,但 toRefs 会转换所有 info 响应式对象中的值
      const name  = toRef(info, 'name') // 仅将 info.name 转换为响应式
      const updateName = () => name = 'Kisragi Maaya' // info.name 会变, name 也会变
    }
  }
</script>
```

## Ref 的其他 API

1. `unref`:要获取一个`ref`引用中的`value`
   1. 如果参数是一个`ref`,则返回内部值,否则返回参数本身
   2. 它是`val = isRef(val) ? val.value: val`的语法糖函数
2. `isRef`:判断是否是一个`ref`对象
3. `shallowRef`:创建一个浅层的`ref`对象,例如只有`const name = ref({ name:'Maaya' })`,如下修改才会产生响应式`name.value = 'Sister'`
4. `triggerRef`:手动触发和`shallowRef`相关联的副作用

## 使用 customRef 实现指定响应式对象更改时的节流

```JavaScript
export default function(value) {
  let timer = null
 	return customRef((track, trigger) => {
    {
      get: function(){
        track() // 收集依赖
        return value
      },
      set: function(newValue) {
        clearTimeout(timer) // 清除定时器
        timer = setTimeout(() => { // 延迟更新
          value = newValue 
          trigger() // 触发所有依赖的响应式更新
        }, 1000)
      }
    }
  })
}
```

## computed

```vue
<script>
  import { ref, computed } from 'vue'
  export default {
    setup() {
      const first = ref('kisaragi')
      const second = ref('Maaya')
      // 1.仅传入 getter 函数
      const fullName = computed(() => first.value + second.value)
    	// 2.传入 getter 和 setter 函数
      const fullName = computed({
        get: () => first.value + second.value,
        set: (newValue) =>{
          const names = newValue.split('')
          first.value = names[0]
          second.value = names[1]
        }
      })
      const updateName = () => fullName.value = 'kisaragi maaya'
      return {
        first,
        second,
        fullName,
        updateName
      }
    }
  }
</script>
```

## watchEffect

在`watchEffect`传入的函数被回调时,可以获取到一个参数`onInvalidDate`

1. 在副作用即将重新执行或者侦听器被停止时会执行该函数传入的回调函数
2. 我们可以在传入的回调函数中,执行一些清除工作
3. 类似防抖,但和防抖不同,因为这里如果是放的请求那可以将已发送的请求取消

```vue
<script>
  import { ref, watchEffect } from 'vue'
  export default {
    setup() {
      const name = ref('Maaya')
      const age = ref(18)
      const updateName = () => name.value = 'kisaragi'
      const updateAge = () => {
        age.value++
        // if(age > 25) stop() // 停止监听
      }
      // 监听 watch: 自动收集函数中所有用到的响应式的依赖
      const stop =  watchEffect((onInvalidDate) => { // 执行完成后会完成一个 watch stop 的函数
        onInvalidDate(() => request.cancel() ) // 取消上次更改 age 时发送的请求
        request.get(age) // 假设 age 改变时会发送请求,那每一次改变 age 都会发送请求,可以使用inInvalidDate 去取消请求
      })
      return {
        name,
        age,
        updateName,
        updateAg e
      }
    }
  }
</script>
```

## setup 中使用 ref 引用元素 和 watchEffect 执行时机

```vue
<template>
	<div ref="title">title</div>
</template>
<script>
  import { ref, watchEffect } from 'vue'
  export default {
    setup() {
      // const title = this.$refs.title 无法使用 vue2 的写法,因为 setup 中没有 this 指向
      const title = ref(null)
      watchEffect(() => {
        console.log(title.value)
      }, {
        flush: 'post' // 决定在 watchEffect 监听到的响应式数据改变后,何时执行传入的回调,'pre' 是提前执行(例如挂载 DOM), 'post' 完成后执行, 'sync' 同步执行(vue 不推荐)
      })
      retrun {
        title
      }
    }
  }
</script>
```

## watch 的使用

1. `watch`的`API`完全等同于组件`watch`选项的`Property`
   1. `watch`需要侦听特定的数据源,并在回调函数中执行副作用
   2. 默认情况下它是惰性,只有当被侦听的源发生变化时才会执行回调
2. 与`watchEffect`的比较,`watch`有以下特点
   1. 懒执行副作用(第一次不会直接执行)
   2. 更具体的说明当哪些状态发生变化时,触发侦听器的执行
   3. 访问侦听状态变化前后的值

```vue
<template>
	<div ref="title">title</div>
</template>
<script>
  import { ref, reactive, watchEffect } from 'vue'
  export default {
    setup() {
      // 场景1 监听 reactive 创建的响应式对象
      const infoReact = reactive({
        naem: 'Maaya',
        age: 18
      // 场景2 监听 ref 创建的响应式对象
   		const infoRef = ref('Maaya')
      // 1. getter 方式传入参数
      watch(() => { ...infoReact } , (newVal, oldVal) =>{ // 解构的方式可以让 newValue 接收到非代理响应值Proxy,而是一个正常的对象
      })
      watch(infoRef , (newVal, oldVal) =>{ // 监听 ref 对象, newVal 接收到的是 value 值
      })
      return {
        title
      }
    }
  }
</script>
```

## watch 监听的数据源类型

```JavaScript
setup() {
  const name = ref('why')
  const age = reactive({ name: '' })
  watch([age, name], (newValue, oldvalue) => {
    console.log(newValue, oldvalue) 
  })
  // 此时对于 reactive 响应式对象进行了解构,因此不会进入源码中对 isReacitve 的判断从而加上 deep = true
  watch([() => ({...age}), name], (newValue, oldvalue) => {
    console.log(newValue, oldvalue) 
  }, {
    deep: true,
    immediate: true
  })
  
    watch([() => ({...age}), name], ([newValName, newValAge], oldvalue) => {
    console.log(newValue, oldvalue) 
  })
}
```



# Composition API 和组件高级用法

## 生命周期

```JavaScript
// 在 vue3 中 beforeCreated 和 created 被删除了
setup() {
  onMounted(() => console.log('mount'))
  console.log('sis') // 相当于在 beforeCreated 和 created 中执行
}
```

## provide 和 inject

```JavaScript
// parent.vue
setup() {
  const count = ref('sis')
  provide('count', readonly(count)) // 将注入后代组件的数据设置为 readonly 保证单向数据流
  return {
    count
  }
}
// child.vue
setup() {
  const count = inject('count')
  return {
    count
  }
}
```

## hooks 的封装

```JavaScript
// app.vue
import useCount from './useCount.js'
setup() {
  const { count, increament, delet } = useCount()
  return {
    count,
    increment,
    delet
    // ...useCount() // 补推荐直接解构,不利于后续维护
  }
}
// useCount.js
export function () {
  const count = ref(18)
  const increment = count.value++
  const delet = count.value++
  const dobuleCount = computed(() => count.value * 2)
  return {
    count,
    increment,
    delet,
    dobuleCount
  }
}
```

## script 顶层编写 setup

```vue
<script setup>
  import { defineProperty, defineEmit } from 'vue'
  
  const message = ({
  	message: {
      type: Sting,
      default: 'Maaya'
    }
  })
  const emit = defineEmit(["incremnet", 'decrement'])
  emit('increment', {value: 18})
</script>
```

## h 函数与 render 函数

```vue
<script>
  import { h } from 'vue'
  export default {
    setup() {
      const counter = ref(16)
      return () => {
        render() {
          return h('h2', { class: 'w200'}, `宽度200的h2标签${counter.value}`) // 无子元素
          return h('h2', { class: 'w200'}, [
            h('button', { onclicj: () => counter.value++ }, '+1') 
            h('div', null, '无样式的div') 
          ]) 
        }
      }
    }
  }
</script>

<!-- render 渲染组件及传入插槽 -->
<!-- parent.vue -->
<script>
  import { h } from 'vue'
  import { Child } from './Child'
  export default {
    render() {
      return h('div', null, [
        h(Child, null, {
          default: props => h('span', null, `props.value`) // 作用域插槽接受子组件传参
        }),
        h(Child, null, {}) // 多个组件传参及子组件不使用插槽
      ])
    }
  }
</script>
<!-- child.vue -->
<script>
  import { h } from 'vue'
  export default {
    render() {
      return h('div', null, [
        h('div', null, 'Child'),
        this.$slots.default ? this.$slots.default({ value: 18 }) : h('div', null, '我是插槽的默认值')
      ])
    }
  }
</script>
```

## `jsx` 的 babel 配置

引入`jsx`的`babel`插件

`jsx`写法参照视频

# vue3 的高级语法补充和 vue3 的源码1

## 自定义指令基础

``````vue
<input v-focus />
<!-- 1. 局部自定义指令 -->
<script>
  export default {
    directive: {
      focus: {
        mounted(el, bindings, vnode, preVnode) {
          el.focus()
        }
      }
    }
  }
</script>
<!-- 2. main.js 中全局自定义指令 -->
<script>
  app.directive('focus', {
    focus: {
      mounted(el, bindings, vnode, preVnode) {
        el.focus()
      }
    }
  })
</script>
``````

## 自定义指令的声明周期

1. `created`:在绑定元素的`attribute`或事件监听器被应用之前调用
2. `beforeMount`:当指令第一次绑定到元素并且在挂载父组件之前调用
3. `mounted`:在绑定元素的父组件被挂载后调用
4. `beforeUpdate`:在更新包含组件的`VNode`之前调用
5. `updated`:在包含组件的`VNode`及其子组件的`VNode`更新后调用
6. `beforeUnmount`:在卸载绑定元素的父组件之前调用
7. `unmounted`:当指令与元素解除绑定且父组件已卸载时,只调用一次

## 指定义指定的参数

```vue
<button v-maaya.test="Maaya">
  
</button>
<script>
  directives: {
    maaya: {
      created: function (el, bindings, vnode, preVnode) {
        console.log(bingings.modefire, bindings.value) // 输出 {test: true}, Maaya
      }
    } 
  }
</script>
```

## teleport 内置组件

可以通过选择器将`teleport`包裹的元素挂载到指定的`DOM`节点上

``````vue
<div id="app">
  <teleport to="#maaya"> <!-- 通过选择器指定挂载的节点 -->
    <div>
      挂载到其他节点上
    </div>
  </teleport>
</div>
``````

## vue 插件

```JavaScript
 <!-- plugin_object.js -->
export default {
  install(app)  {
    // 可以在里面做任何操作,灵活性很高,例如写一个组件并挂载到全局等,mixin混入等 ...
    app.config.globalPropertie.$name = 'maaya'
  }
}
// import plugin from './plugin_object.js'
app.use(plugin) // 注册插件,之后 vue 内部会执行 plugin.install(app)
// app.vue
mounted() {
  console.log(this,$name)
}
// 在组件中获取全局变量
import { getCurrentInstance } from 'vue'
setup() {
  const instance = getCurrentInstance()
  console.log(instance.APPContext.config.globalProperties,$name)
}
```

## 虚拟 DOM 的优势

1. 将真实节点抽象成`VNode`虚拟节点,可以方便做一些`JavaScript`操作
2. 更方便的实现跨平台,可以将`VNode`渲染成任意想要的节点,例如在`Windows`上图片是`image`,而在`IOS`上是`UI-image`
3. `vue`还允许开发者将`VNode`节点渲染成任意格式的真实节点
4. 虚拟DOM的渲染过程: `template`标签 => `AST`抽象语法树 => `render`渲染函数 => 虚拟节点 =>真实元素 => 浏览器展示 

## vue 三大核心系统

1. `Compiler`:编译模板系统
2. `Runtime`:渲染模块,还可以成为`Render`模块
3. `Reactivity`:响应式系统
4. 在被响应式声明的数据时,会被收集依赖,当依赖改变后会生成新的`VNode`节点,然后通过`diff`算法进行对比出不同点并进行渲染

## 实现 Mini-Vue 之渲染系统

实现一个简单的`Mini-Vue`框架,包含三个模块:

1. 渲染系统模块 

2. 响应式系统

3. 应用文件入口系统

   - `h`函数,用于返回一个`VNode`对象

   ```JavaScript
   const h = (tag, props, children) => {
     return {
       tag,
       props,
       children
     }
   }
   ```

   - `mount`函数,用于将`VNode`挂载到`DOM`上

   ```JavaScript
   const mount = (vnode, container) => {
     vnode = vnode.el = document.createElement(vnode.tag)
     // 处理子节点
     if(vnode.props) {
       for(const key in vnode.props) {
         const value = vnode.props[key]
         // 判断是否是监听
         if(key.startWith('on')) {
           el.addEventListener(key.slice(2).toLowerCase(), value)
         } else {
           el.setAttribute(key, value)
         }
       }
     }
     // 处理 children, 简单搭建框架, 因此此处未判断许多场景, 例如插槽
     if(vnode.children) {
       if(typeof vnode.children === 'string') {
          el.textContent = vnode.children
       } else if(Array.isArray(vnode.children)) {
         vnode.children.forEach(item => {
           mount(item, el)
         })
       }
     }
     
     // 挂载到 container 上
     container.appendChild(el)
   }
   ```

   - `patch`函数,用于对两个`VNode`进行对比,决定如何处理新的`VNode`

   ```JavaScript
   export default function(vnode1, vnode2) {
     if(vnode2.tag !== vnode1.tag) {
       const parent = vnode1.el.parentElement
       parent.removeChild(vnode1.el)
       mount(vnode2, parent)
     } else {
       // 当新旧 dom 节点的标签不改变时,不移除就节点,仅在旧节点上新增移除属性及子节点
   
       // 旧节点是被挂载过的,所以在 mount 函数中被赋值上了 el,但新节点没有 el 属性
       const el = vnode2.el = vnode1.el // 相当于 const el = (vnode2.el = vnode1.el)
       const oldProps = vnode1.props || {}
       const newProps = vnode2.props || {}
       object.keys(newProps).forEach(key => {
         const oldValue = oldProps[key]
         const newValue = newProps[key]
         if(newValue !== oldValue) {
           if(key.startWith('on')) {
             el.addevenListener(key.slice(2).toLowerCase, newValue)
           } else {
             el.setAttribute(key, newValue)
           }
         }
       })
       // 移除不存在的属性 
       for(const key of oldValue) {
         if(!(key in newValue)) {
           el.removeAttribute(key)
         }
       }
   
       // 对 children 处理
       const oldChildren = vnode1.children
       const newChildren = vnode2.children
       // 新子节点是字符串
       if(typeof newChildren === 'string') {
         el.textContent = newChildren
         // 新子节点是数组
       } else {
         // 旧节点是字符串
         if(typeof oldChildren === 'string') {
           el.innerHTML = ''
           newChildren.forEach(item => {
             mount(item, el)
           })
           // 旧节点是数组
         } else {
           const compareLength = Math.min(oldChildren.length. newChildren.length)
           // 将同一顺序的子节点进行递归对比
           for(const i = 0; i < compareLength; i++) {
             patch(oldChildren[i], newChildren[i])
           }
          	// 如果新节点长度大于旧节点,则将之前未对比到的进行挂载
           if(newChildren.length > oldChildren.length) {
           	newChildren.slice(oldChildren.length).forEach(item => {
               mount(item, el)
             })
           }
           // 如果旧节点长度大与新节点,则移除旧节点多于出的节点
           if(oldChildren.length > newChildren.length) {
           	oldChildren.slice(newChildren.length).forEach(item => {
               el.removeChild(item.el)
             })
           }
         }
       }
     }
   }
   ```


## 实现依赖收集系统

```javascript
// 依赖收集系统
class Dep {
  // 设置初始收集者
  constructor() {
    this.subscriber = new Set()
  }
  // 手动添加依赖
  depend() {
    if(activeEffect) {
      this.subscriber.add(activeEffect)
    }
  }
  // 通知依赖更新
  notify() {
    this.subscriber.forEach(effect => {
      effect()
    })
  }
}

// watchEffect 监听者
const dep = new Dep()
let activeEffect = null
function watchEffect(effect) {
  activeEffect = effect // 进入 addEffect 的添加判断中
  dep.depend() // 执行依赖收集(在下文 19.10 中此行与 get 中重复了,需要注释)
  effect() // 执行原本的操作
  activeEffect = null // 清空判断
}

// 依赖收集的使用
const info = { count: 10 }
watchEffect(() => {
  console.log("执行回调1")
})
watchEffect(() => {
  console.log(info.count * info.count)
})
info.count++ // 更新之后触发已收集的依赖,并让它们去更新
dep.notify()
```

## 响应式系统的 Vue2 实现

```javascript
// 省略了 19.9 中 创建 Dep 类依赖收集系统和 watchEffect 的代码
const targetMap = new WeakMap()

// 创建获取指定对象的属性的依赖收集对象 dep, 保证任意属性被更改时,只会触发对这个属性有依赖的方法去更新
function getDep(target, key) {
  let depsMap = targetMap.get(target) // 拿到 target 对象的所有深层依赖 map
  if(!depsMap) { // 如果 target 的深层依赖不存在, 则新建一个
    depsMap = new Map()
    targetMap.set(target, depsMap) // 以 target 对象为键名, depsMap 深层依赖为键值存入
  }
  let dep = depsMap.get(key)
  if(!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }
  return dep
}
// 实现 vue2 的响应式对象, 默认前提 raw 是对象
function reactive(raw) {
  Object.keys(raw).forEach(key => {
    const dep = getDep(raw, key)
    let value = raw[key] // 
    Object.defineProperty(raw, key, {
      get() {
        dep.depend() // 使用指定值时,将使用者收集到指定 dep 依赖中
        return value
      },
      set(newValue) {
        // 如果是 raw[key] = newValue 会循环调用 set 方法占满内存
        // 所以定义在外层,形成闭包, get 方法也只需要返回 value 而不需要返回 raw[key]
        value = newValue
        dep.notify()
      }
    })
  })
  return raw
}

// 测试依赖收集函数 dep 及响应式对象创建函数 reactive
const info = reactive({ name: 'Maaya', age: 17 })
watchEffect(() => {
  console.log('effect1:', name + '1')
})
watchEffect(() => {
  console.log('effect2:', name +'2')
})
watchEffect(() => {
  console.log('effect3:', age + 1)
})
watchEffect(() => {
  console.log('effect4:', age * age)
})
info.name = 'Sis'
info.age = 10
```

## 响应式系统的 vue3 实现

```JavaScript
function reactive(raw) {
  return new Proxy(raw, {
    get(target, key, receiver) {
      const dep = getDep(target, key) 
      dep.depend()
      return Reflect.get(target, key, receiver) // 可以直接返回 target[key] 而不会循环调用
    },
    set(target, key, value, newValue) {
      const dep = getDep(target, key)
      const result = Reflect.set(target, key,value, receiver) // 直接使用 target[key] = newValue 也可以
      dep.notify()
      return result
    }
  })
}
```

## vue3 选择 Proxy 的理由

1. 新增元素时:
   1. `vue2`需要再次调用`definedProperty`,因为它劫持的是对象的**属性**
   2. `Proxy`劫持的是整个对象.所以不需要特殊处理
2. 修改对象的不同:
   1. 使用`defineProperty`时,修改原来的`Object`对象就可以触发拦截
   2. 使用`proxy`就必须修改代理对象,即`Proxy`的实例才可以触发拦截
3. `Proxy`能观察的类型比`defineProperty`更丰富:
   1. `has:in`操作符的捕获器
   2. `deleteProperty:delete`操作符的捕捉器
   3. 等等其他操作,不止`get`和`set`
4. `Proxy`作为新标准将受到浏览器厂商重点持续的性能优化
5. 缺点:
   1. `Proxy`不兼容`IE`,也没有`polyfill`
   2. `defineProperty`能支持到`IE9`

```JavaScript
// 对于 proxy 代理深层属性的一些理解
const obj = {
  name: 'Maaya',
  children: {
    name: 'sis'
  }
}
let proxy = new Proxy(obj, {
  get(target, key, receiver) {
    return target[key]
  },
  set(target, key, newValue) {
    target[key] = newValue
  }
})
obj.children.name = 'name' // 此时的赋值操作逻辑是: 取出被代理的 obj 对象的 children 属性所引用的原始对象(此时的读取就会触发 get) -> 变更 obj.children 原始对象的 name 属性的
```

## 结合渲染系统,响应式系统实现 mini-vue

框架外层`APi`设计

```JavaScript
const createApp = (rootComponent) =>{
  return {
    mount(selector) {
      let isMounted = false
      let preVNode = null
      watchEffect(() => {
        if(!isMounted) {
          preVNode = rootComponent.render()
          mount(preVNode, document.querySelector(selector)) // 此处的 mount 是全局的渲染函数
          isMounted = true
        } else {
          const newVNode = root.Component(render)
          patch(preVNode, newVNode)
          preVNode = newVNode
        }
      })
    }
  }
}
```

结合实现代码

```html
<body>
  <div id='app'></div>
  <script src='render.vue'></script>
  <script src='reactive.vue'></script>
  <script src='vue.vue'></script>
  <script>
    // 创建根组件
    const app = {
      data: reactive({
        counter: 0
      }),
      render() {
        return h('div', null, [
          h('h2', null, `当前计数: ${this.data.counter}`),
          h('button', {
            onClick: () => {
              this.data.counter++
            }
          }, '+1')
        ])
      }
    }
    
    // 挂载根组件
    createApp(app).mount('#app')
  </script>v
</body>
```

# vue3 源码精度和调试技巧

1. `const app = Vue.createApp(App)`:为了得到一个包含`use`,`mixin`,`mount`等方法的对象,并赋值
   1. `createApp`:最终目的是拿到`app`对象
      1. `ensureRenderer`:渲染器函数,包含了所有的渲染逻辑
      2. `createRenderer`
      3. `baseCreateRenderer`渲染器函数:返回含有`render`,`hydrate`,`createApp`属性的对象;其中`creatApp`属性是调用了`createAppAPI()`的返回值,这是一个函数
   2. 对`app`对象的`mount`函数进行重写
      1. 调用`normalizeContainer`函数保证,`mount`方法中传入的选择器支持各种场景及平台
      2. 其他逻辑
2. `app.mount(selector)`:
   1. `createVNode`:将在创建`app`对象时通过闭包保留下的`rootComponent`根组件对象变成一个`VNode`(应该是闭包)
   2. `render`:`baseCreateRenderer`传入的`render`函数进行渲染
      1. 如果`VNode`是空,则代表卸载
      2. 非空则调用`patch`函数进一步挂载
      3. 判断`VNode`类型,执行匹配的挂载组件逻辑
      4. 如果是组件类型的`VNode`,则执行`processComponent`函数
      5. 对组件鞥可以
