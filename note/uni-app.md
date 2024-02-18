# 理解

1. `uni`是`uni-app`创建的全局对象,用来挂载独有的方法
2. `uni-app`中`.vue`文件的`this`仍然执行`vm`实例对象

# 项目初始化配置

## 项目文档

[Headline | uniapp - 黑马优购 (escook.cn)](https://www.escook.cn/docs-uni-shop/)

## 开发环境

配置`Scss/Sass`编译插件

## 初始化 uni-app 项目

- 通过`vue-cli`创建`uni-app`项目
- 将项目存放到`git`仓库

## 配置 tabbar 效果

- `tabbar`对象和`page`同级
- `tabbar`页面要作为启动页,放在`page`数组第一个
- `globalStyle`中可以配置全局样式,例如`navigationBar`相关

# 首页

## 轮播图效果

- 封装用于微信开发的请求`API`
- 通过`uni-app`的`swiper`轮播组件渲染轮播图

## 小程序分包

- 在`package.json`中定义`subPackages`分包数组,与`pages`主包同级别
- 分包数组每个元素均代表一个分包对象,分包对象需要包含属性`root`和`pages`

```vue
<script>
  "subPackages": [
    {
      "root": "sub-package", // 分包所处目录
      "pages": [
        { // 分包页面1
          "path": "goods-detail/index", // 路径
          "style": { // 样式
            "navigationBarTitleText": "goods-detail"
          }
        }
      ]
    }
  ]
</script>
```

## 点击轮播图跳转商品详情页

- 点击`navigator`标签后实现路由跳转`url`属性指定的页面
- 通过`query`路由传参

## 封装请求失败提示组件

二次封装`showToast`全局`api`

## 实现分类导航区域

- 使用`view`以及`v-for`实现
- 使用`switchTab`全局`api`跳转到`tabbar`页面并销毁所有非`tabbar`页面

## 获取楼层数据并渲染楼层的标题

## 渲染楼层中的图片

## 点击楼层图片跳转到商品列表页面

## 分支的合并,提交,删除

# 分类

## 创建分支及wx tools编译模式

设置`wx tools`的编译模式,提高开发效率

例如设为仅编译`cate`页面,并在编译完成后进入`cate`页面

## 初始化分类页面的布局

- `uni.getSystemInfoSync`:可以获取当前设备的信息
- `scroll-view`:滚动条组件
  - 设置滚动方向`scroll-y`|`scroll-x`
  - 通过`api`获取设备的信息来求出窗口可用高度,并作为`scroll-view`组件的高度
  - 窗口可用高度 = 屏幕高度 - `navigationBar`高度 - `tabbar`高度


## 一级分类

```javascript
.left-scroll-view-item {
  // 激活项的样式
  &.active { // 表示 left-scroll-view-item 样式的标签要同时存在active,&active中的内容才会生效
    // 渲染激活项左侧的红色指示边线
    &::before {
      content: ' ';
      display: block;
      width: 3px;
      height: 30px;
      background-color: #c00000;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
```

## 二级,三级分类

`image`组件使用本地图片时,需要`../../`回到最初目录再往下找才能不报错

## 优化分类页面

`uni.navigateTo()`:从主包跳转到分包

# 搜索

## 搜索组件初始化

## 渲染 my-search 组件的基本结构

## 封装自定义属性和 click 事件

## 导航跳转与吸顶效果

## 自动获得焦点与防抖效果

1. 自动聚焦:修改`uni-ui`依赖中`uni-search-bar`组件`show`和`showSync`属性为`true`即可
1. 防抖:在启用一个定时器前,现将此定时器即可

## 实现搜索建议列表

1. 用户完成输入后,发送请求通过用户输入的关键词返回商品建议
2. 因为是输入后发送请求,因此需要防抖,让规定超过规定时间没有输入才发送请求

## 点击搜索 item 项导航到商品详情页

通过`navigator`跳转

## 渲染搜索历史

通过`uni-tags`组件渲染标签

## 处理搜索关键词

1. 最新搜索历史纪录插入到数组第一项
2. 重复的搜索历史纪录不添加
3. 使用`setStorageSync`和`getStorageSync`达到本地持久化存储历史纪录并读取的效果

## 清空搜索历史纪录

## 点击搜索历史跳转到商品列表页面

## 搜索分支的合并与提交

# 商品列表

## 分支创建

## 请求并渲染商品列表的数据

 `onLoad(params)`在页面载入的生命周期函数中,接收一些参数,例如上个页面的路由跳转的参数

## 把商品项 item 封装为自定义组件

## 使用过滤器处理商品价格

通过`vue.filter`注册一个过滤器来过滤价格;但过滤器在`vue3`已经被移除了

## 上拉加载更多商品

1. `onReachBottom`:上拉触底事件,还需要在根目录的`package.json`中设置触底的距离
2. 上拉加载需要考虑到节流,因为触底发送请求后数据为返回时,用户可能重复触发触底事件

## 下拉刷新列表数据

1. `onPullDownRefresh`:下拉刷新事件,即用户下拉时手动帮用户刷新页面
2. `stopPullDownRefresh`:不使用此方法,则刷新事件不会停止

## 点击商品 item 项导航到详情页面

## 分支的合并与提交

# 商品详情

## 创建分支,添加编译模式

## 获取商品详情的数据

## 轮播图效果

通过`uni-app`的预览`api`:`uni.previewImage`展示预览图片

## 渲染美化商品信息区域

## 渲染商品详情的数据并优化详情页的显示

通过富文本`rich-text`标签将`HTML`结构的数据渲染成`DOM`节点

## 渲染商品导航区域

1. 基于`uni-ui`提供的[GoodsNav](https://ext.dcloud.net.cn/plugin?id=865)组件来实现商品导航区域的效果
2. `tabbar`页面的跳转可以通过`uni.switchTab`

## 分支的合并与提交

# 加入购物车

## 初始化vuex

1. 创建`store`文件仓库及`store.js`文件
2. 在`store.js`中引入`vue`和`vuex`
3. 将`vuex`安装为`vue`的插件
4. 创建`store`的实例对象
5. 向外`store`的实例对象

## 实现加入购物车的功能

1. 直接将`vuex`模块中的`mutations`通过`...mapMutations(moduleName, ['methodName'])`的形式解构到组件实例中
2. 通过`this['methodName']`的形式直接调用`vuex`的`mutations`方法来操作`state`
3. 在`computed`中通过`...mapState(moduleName, ['propName'])`解构出`vuex`的`state`属性,并实现监听的效果

## 动态统计购物车中商品的数量

1. 在`store`仓库的`getters`中计算出当前的所有商品,
2. 在`computed`通过`...mapGetters`返回当前的商品总数量`total`
3. 通过`watch`监听商品总数量计算属性`total`,来动态更改`data`中的购物车角标

## 持久化存储购物车中的商品

1. 在`vuex`的模块中打开了命名空间`namespaced`
2. `mutations`中的方法可以通过`this.commit('moudleName/mutationsName')`来调用所有模块的任一`mutations`方法,未知能否调用`actions`
3. 通过命名空间调用本模块的`mutations:saveToStorge`进行持久化存储

## 优化商品详情页的 total 侦听器

添加`immediate:true`在页面初始化时就监听

## 动态设置 tabbar 的数字徽标

- 在`tabbar`的`cart`页面`onShow`声明周期调用`uni-app`的`api`修改徽标

```javascript
uni.setTabBarBadge({ tabbarIndex: 2, text: badgeText }) // text只能是string
```

- 所有`tabbar`页面相互跳转时都要刷新购物车`tabbar`的角标
- 因此可以抽离出设置徽标的方法作为`mixins`混入

```javascript
export default { // vue中引入 mixin 混入
  mixins: [TabbarBadge],
}
```

# 购物车

## 演示效果并创建渲染模式

## 渲染商品列表的区域的结构

## 基于 props 封装 radio 的勾选状态

## 修改购物车的勾选状态

## 封装 num-change 事件

## 优化 number-change 事件

## 修改购物车中商品的数量

## 实现滑动删除功能

## 初步封装 my-address 组件

## 实现收货地址功能

通过`uni-chooseAddress`的`api`,需要预先在`mainfest.json`中进行配置

## 渲染收货人的信息

## 把 address 存储到 vuex 中

## 将 vuex 的 address 持久化存储到本地

## 将 addstr 抽离为 getters

## 重新选择收货地址-取消授权时的问题

微信已对此`api`更新,不会出现此问题了

## 解决重新授权的问题

微信已对此`api`更新,不会出现此问题了

## 封装结算区域的组件

## 动态计算已勾选的商品数量与状态

## 实现商品的全选与反选功能

## 动态渲染已勾选的商品总价

## 动态计算 tabbar 中徽标的值

## 渲染购物车为空时的页面结构

## 分支的合并与提交

# 登录与支付

## 点击结算按钮进行判断

## 初步渲染页面的布局结构

## 获取用户的基本信息

登录的`button`按钮绑定`open-type="getUserInfo"`属性,表示点击按钮时,希望获取用户的基本信息

```vue
<!-- open-type 设置当前 button 的功能类型,点击后进行操作的返回值会通过 emit 的形式传递结果值 -->
<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
<script>
  methods: {
    // 获取微信用户的基本信息
    getUserInfo(e) {
      if (e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！') // 判断是否获取用户信息成功
      // 获取用户信息成功, e.detail.userInfo 就是用户的基本信息
      console.log(e.detail.userInfo)
    }
  }
</script>
```

## 将用户的基本信息存储到 vuex

## 调用 uni.login 获取当前微信用户的唯一身份标识code

```javascript
const [err, res] = await uni.login().catch(err => err) // res.code就是唯一身份标识
```

## 进一步完善 uni.login 登录失败后的 if 判断条件

## 获取登录的 token 并存储到 vuex 中

```javascript
// 将唯一身份标识发送给小程序的后端,来换取token,即登录操作
const { data: loginResult } = await uni.$api.get('/api/public/v1/users/wxlogin', query)
```

## 渲染用户的头像和昵称

## 渲染第一个面板区域

## 渲染第二个面板区域

## 渲染第三个面板区域

## 实现退出登录的功能

## 初步实现3秒倒计时跳转的功能

## 登录成功后导航到登录前的页面

## 在请求头中添加 Token 身份认证的字段

## 了解微信支付的流程

1. **创建订单**
   - 请求创建订单的 `API` 接口: 把(订单金额,收货地址,订单中包含的商品信息)发送到服务器
   - 服务器响应的结果: *订单编号*
2. **订单预支付**
   - 请求订单预支付的 `API` 接口: 把(订单编号)发送到服务器
   - 服务器响应的结果: *订单预支付的参数对象*,里面包含了订单支付相关的必要参数
3. **发起微信支付**
   - 调用 `uni.requestPayment()` 这个 `API`,发起微信支付;把步骤2得到的"订单预支付对象"作为参数传递给 `uni.requestPayment()` 方法
   - 监听 `uni.requestPayment()` 这个 `API` 的 `success`,`fail`,`complete` 回调函数

## 创建订单

## 订单预支付

## 实现微信支付

## 分支的合并预提交

# 发布
