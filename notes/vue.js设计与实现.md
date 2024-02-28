# 权衡的艺术

## 命令式和声明式

1. 命令式编程关注过程
2. 声明式编程关注结果

## 性能与可维护性的权衡

1. 框架通过封装了命令式代码才实现了面向用户的声明式
2. 因此声明式代码的性能不优于命令式代码的性能
3. 框架设计者要做的就是:在保持可维护性的同时让性能损失最小化
4. **声明式代码的更新性能消耗= 找出差异的性能消耗 + 直接修改的性能消耗**,因此,如果我们能够最小化**找出差异的性能消耗**,就可以让声明式代码的性能无限接近命令式代码的性能

## 虚拟DOM的性能到底如何

虚拟`DOM`就是为了最小化找出差异的性能消耗

- 通过`JavaScript`创建标签性能:**创建`JavaScript`对象的计算量 + 创建真实`DOM`的计算量**

```javascript
const app = []
for (let i = 0; i < 1000; i++) {
  const div = { tag: 'div' }
  app.push(div)
}
```

- 通过对`DOM`操作创建标签性能:**`HTML`字符串拼接的计算量 + `innerHTML`的`DOM`计算量**

```javascript
const app = document.querySelector('#app')
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div')
  app.appenChild(div)
}
```

- 两者相比,通过`JavaScript`渲染的性能会低于通过操作`DOM`创建
- 且如果通过`diff`算法,只做必要的`DOM`更新还可以进一步降低性能

![](D:\OneDrive\picture\study\vue设计与实现1.png)

## 运行时和编译时

- 运行时:通过`render`函数将树形结构的数据对象渲染成`DOM`节点

```javascript
// 例如render渲染函数就是运行时
function Render(obj, root) { // render渲染函数通过递归的方式实现
  const el = document.createElement(obj.tag)
  if (typeof obj.children === 'string') {
    const text = document.createTextNode(obj.children)
    el.appendChild(text)
  } else if (obj.children) {
    // 数组,递归调用Render,使用el作为root参数
    obj.children.forEach((child) => Render(child, el))
  }
  // 将元素添加到root
  root.appendChild(el) 
}
const obj = {
  tag: 'div',
  children: [
    { tag: 'span', children: 'hello world' }
  ]
}
// 渲染到body下
Render(obj, document.body)
```

- 编译时:将`HTML`标签编译成`DOM`节点

<img src="D:\OneDrive\picture\study\vue设计与实现\2.png" style="zoom:40%;" />

- 运行时+编译时:先将`HTML`编译为树型结构的数据对象,再将对象渲染成`DOM`节点

# 框架设计的核心要素

## 提升用户的开发体验

好的警告信息可以提升用户的开发体验

## 控制框架代码的体积

`Vue.js`使用`rollup.js`对项目进行构建,这里的`__DEV__`常量实际上是通过`rollup.js`的插件配置来预定义的,其功能类似于`webpack`中的`DefinePlugin`插件

```javascript
// __DEV__在开发环境下是true,生产环境下是false,因此在生产环境中框架自身的代码量不随警告信息的增加而增加
// 为false时不被执行,是死代码,因此在构建资源时会被移除
if (__DEV__ && !res) {
warn( `Failed to mount app: mount target selector "${container}" returned null.`)
}
```

## 框架要做到良好的Tree-Shaking

`Tree-Shaking`指的就是消除那些永远不会被执行的代码,也就是排除`dead code`,现在无论是`rollup.js`还是`webpack`,都支持`Tree-Shaking`

```javascript
// input.js
import { foo } from './utils.js'
foo()
// utils.js
export function foo(obj) {
  obj && obj.foo
}
export function bar(obj) {
  obj && obj.bar
}
```

```javascript
// 对基于以上两个进行构建(打包),得到以下的输出结果文件bundle.js
function foo(obj) {
  obj && obj.foo
}
foo();
```

1. `foo`函数的执行没有什么意义,仅仅是读取了对象的值,但并没有被移除
2. 这就涉及`Tree-Shaking`中的第二个关键点——副作用,如果一个函数调用会产生副作用,那么就不能将其移除
3. 简单地说,副作用就是,当调用函数的时候会对外部产生影响,如修改了全局变量
4. `foo`函数的副作用是如果`obj`对象是一个通过`Proxy`创建的代理对象,那么当我们读取对象属性时,就会触发代理对象的`get`夹子(`trap`),在`get`夹子中是可能产生副作用的,例如我们在`get`夹子中修改了某个全局变量
5. 到底会不会产生副作用,只有代码真正运行的时候才能知道,`JavaScript`本身是动态语言,因此想要静态地分析哪些代码是`dead code`很有难度
6. 注释代码`/*#__PURE__*/`,其作用就是告诉`rollup.js`,对于`foo` 函数的调用不会产生副作用,你可以放心地对其进行`Tree-Shaking`

```javascript
import {foo} from './utils'
/*#__PURE__*/ foo()
```

```javascript
foo() // 顶级调用:有可能产生副作用
function bar() {
  foo() // 函数内调用:只要函数bar没有被调用,那foo函数的调用自然不会产生副作用
}
```

## 框架应该输出怎样的构建产物

框架要输出不同类型的产物,例如可以通过`<script>`来引入`IIFE`自调用的`vue.js`文件,又或者是`ESM`格式的文件,每种产物都一定有相应的需求场景

例如:通过`require`语句引用资源,其目的是“服务端渲染”,当进行服务端渲染时,`Vue.js`的代码是在`Node.js`环境中运行的,而非浏览器环境,`在Node.js`环境中,资源的模块格式应该是`CommonJS`,简称`cjs`,为了能够输出`cjs`模块的资源,我们可以通过修改`rollup.config.js`的配置`format: 'cjs'`来实现

## 特性开关

在设计框架时,框架会给用户提供诸多特性(或功能),例如我们提供`A、B、C`三个特性给用户,同时还提供了 `a、b、c`三个对应的特性开关,用户可以通过设置`a、b、c`为`true`或 `false`来代表开启或关闭对应的特性,这将会带来很多益处

1. 用户关闭的特性,利用`Tree-Shaking`机制让其不包含在最终的资源中,避免资源体积变大
2. 框架升级,也可以通过特性开关来支持遗留`API`,这样用户可以选择不使用遗留`API`,使最终打包的资源体积最小化

## 错误处理

```javascript
// 将错误处理程序封装为一个函数,代替用户统一处理错误
// utils.js
let handleError = null // 预声明为函数
export default {
  foo(fn) {
    callWithErrorHandling(fn)
  },
  // 用户可以调用该函数注册统一的错误处理函数
  registerErrorHandler(fn) {
    handleError = fn
  }
}
function callWithErrorHandling(fn) {
  try {
    fn && fn()
  } catch (e) {
    // 将捕获到的错误传递给用户的错误处理程序
    handleError(e)
  }
}
```

```javascript
// 用户侧代码
import utils from 'utils.js'
// 需要时再注册错误处理程序
// handleError才会错误处理函数
utils.registerErrorHandler((e) => {
  console.log(e)
})
utils.foo(() => {/*...*/})
utils.bar(() => {/*...*/})
```

## 良好的TypeScript类型支持

只需牢记使用`TS`编写代码与对`TS`类型支持友好是两件事

## 总结

null

# vue.js的设计思路

## 声明式地描述 UI

```vue
<!-- 声明式不关注过程 -->
<!-- 使用@或v-on来描述事件,例如点击事件 -->
<div @click="handler"></div>
<script>
  // JavaScript声明式创建DOM元素,相比用HTML一个个创建要快捷很多
  render() {
    return {
      tag: 'h1',
      props: { onClick: handler }
    }
  }
</script>
```

## 初识渲染器

```vue
<!-- 以下渲染器未实现更新节点功能,仅做到了运行时 -->
<script>
  // 生产树形结构数据对象,并调用custRender函数渲染它
  click() {
    const custVnode = {
      tag: 'div',
      props: {
        onclick: () => alert('如月真绫')
      },
      children: '如月真绫'
    }
    const container = document.getElementById('root')
    this.custRender(custVnode, container)
  }
  // 自定义渲染函数
  custRender(vnode, container) {
    const el = document.createElement(vnode.tag)
    for (const key in vnode.props) {
      if (/^on/.test(key)) {
        el.addEventListener(key.substr(2).toLowerCase(), vnode.props[key])
        console.log(1);
      }
    }
    if (typeof vnode.children === 'string') {
      el.appendChild(document.createTextNode(vnode.children))
    } else if (Array.isArray(vnode.children)) {
      vnode.children.forEach(element => {
        this.custRender(element, el)
      })
    }
    container.appendChild(el)
  }
</script>
```

## 组件的本质

1. 虚拟`DOM`是用来描述真实`DOM`的普通`JavaScript`对象
2. 虚拟`DOM`还能用来描述组件
3. 组件:本质就是一组`DOM`元素的封装

```vue
<!-- 组件渲染实现1 -->
<script>
  const MyComponent = function () { // 返回一个组件的DOM
    return {
      tag: 'div',
      props: {
        onClick: () => alert('hello')
      },
      children: 'click me'
    }
  }
  function renderer(vnode, container) { // 渲染函数
    if (typeof vnode.tag === 'string') { // vnode标签元素
      mountElement(vnode, container)
    } else if (typeof vnode.tag === 'function') { // vnode是组件
      mountComponent(vnode, container)
    }
  }
  function mountComponent(vnode, container) {
    const subtree = vnode.tag() // 组件函数,获取组件要渲染的内容(虚拟DOM)
    renderer(subtree, container) // 递归地调用renderer渲染subtree
  }
  const vnode = { // 创建虚拟DOM节点
    tag: MyComponent
  }
  renderer(vnode, container) // 开始渲染
</script>
```

```vue
<script>
  <!-- 组件渲染实现2 -->
  const MyComponent = {
    render() {
      return {
        tag: 'div',
        props: {
          onClick: () => alert('hello')
        },
        children: 'click me'
      }
    }
  }
  function renderer(vnode, container) {
    if (typeof vnode.tag === 'string') {
      mountElement(vnode, container)
    } else if (typeof vnode.tag === 'object') { // vnode是组件
      mountComponent(vnode, container)
    }
  }
  function mountComponent(vnode, container) {
    const subtree = vnode.tag.render()// 组件对象,调用它的属性render函数得到组件要渲染的内容(虚拟DOM)
    renderer(subtree, container) // 递归地调用renderer渲染subtree
  }
  const vnode = { // 创建虚拟DOM节点
    tag: MyComponent
  }
  renderer(vnode, container) // 开始渲染
</script>
```

# 模板的工作原理











































