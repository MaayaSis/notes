# 目标

# 小程序简介

1. 无法使用`DOM`和`BOM`的`API`
2. 可以使用微信给小程序提供的`API`,例如地理定位,扫码,支付
3. 网页和小程序的开发模式不同
   1. 申请开发账号
   2. 安装开发工具
   3. 创建和配置小程序项目

# 注册小程序账号和安装开发者工具

# 创建第一个小程序项目

# 认识小程序项目的基本组成结构

项目结构:

1. `pages`:存放小程序的页面,每个页面由四个基本文件组成
   - `.js`:存放当前页面的数据,事件处理函数等
   - `.json`:当前页面的配置文件,例如窗口外观
   - `wxml`:当前页面的模板结构文件
   - `wxss`:当前页面的样式表文件
2. `utils`:存放工具性质的模块(例如:格式化时间的自定义模块)
3. `app.js`:小程序项目的入口文件
4. `app.wxss`:小程序项目的全局样式文件
5. `project`.config.json:项目的配置文件
6. `sitemap.json`:用来配置小程序及其页面是否允许被微信索引

`JSON`配置文件:

- `app.json`

```json
// 当前小程序的全局配置,包括小程序的所有页面路径,窗口外观,界面表现,底部tab等
{
  "pages":[],// 用来记录当前小程序所有页面的路径
  "window":{},// 全局定义小程序所有页面的背景色、文字颜色等
  "style":"",// 全局定义小程序组件所使用的样式版本
  "sitemapLocation":"sitemap.json"// 指明sitemap.json的位置
}
```

- `project.config.json`

```json
// 记录对小程序开发工具所做的个性化配置
// setting:保存编译相关的配置
// projectname:保存项目名称
// appid:保存小程序的账号ID

// 在setting中将"checkSiteMap"修改为false,则可以关闭热重载的提示
```

- `sitemap.json`:效果类似于SEO,用来配置小程序页面是否允许微信索引

```javascript
// 修改是否允许索引
"rules":[
  "actions":"disallow" // 不允许
]
```

- `.json`:使用`.json`来对本页面的窗口外观进行配置,配置会覆盖`app.json`的`window`中相同的配置项

# 认识小程序页面

1. 在`app.json`的`pages`中新增页面的存放路径,小程序开发者工具将自动创建对应的页面文件
2. 调整`pages`数组中页面路径的前后顺序,索引为0的页面路径成为首页被渲染
3. `WXML`类似于`HTML`,但有区别
   1. 标签名称不同
      - `HTML`:`div span img a`
      - `WXML`:`view text image navigator`
   2. `属性节点不同`
      - `<a href="#"></a>`
      - `<navigator url="/pages/home/home"></navigator>`
   3. 提供了类似于`vue`中的模板语法:数据绑定;列表渲染;条件渲染
4. `WXSS`类似`CSS`
   1. `rpx`:类似于`rem`,使用了`rpx`作为尺寸单位,在不同大小的屏幕上小程序会自动进行换算
   2. 提供全局样式和局部样式:`app.wxss`全局生效,局部页面的`wxss`只在对应的网页生效
   3. `WXSS`仅支持部分`CSS`选择器
5. 小程序中的三类`.js`文件
   1. `.js`:小程序的入口文件,调用`App()`函数启动小程序
   2. 页面`.js`:页面的入口文件,调用`Page()`函数创建并运行页面
   3. 普通`.js`:普通的功能模块文件,用来封装公共的函数或属性供页面使用

# 小程序的宿主环境

宿主环境`host environment`:程序运行所必须的依赖环境

- `Android`和`iOS`的宿主环境不同
- 小程序可以使用宿主环境微信提供的能力,因此`Android`与`iOS`是不同的
- 小程序宿主环境包含的内容

```javascript
// 通信主体:小程序中通信的主体是渲染层和逻辑层
// 1.WXML模板和WXSS样式工作在渲染层
// 2.JS脚本工作在逻辑层
// 通信模型:
// 1.渲染层和逻辑层之间的通信由微信客户端进行转发
// 2.逻辑层和第三方服务器之间的通信也由微信客户端进行转发,初始数据从第三方服务器请求获得

// 组件
// API
```

```javascript
// 运行机制
// 1.小程序启动的过程
// 1.1.把小程序的代码包下载到本地
// 1.2.解析app.json全局配置文件
// 1.3.执行app.js小程序入口文件,调用App()创建小程序实例
// 1.4.渲染小程序首页
// 1.5.小程序启动完成
// 2.页面渲染的过程
// 2.1.加载解析.json配置文件
// 2.2.加载WXML和WXSS
// 2.3.执行.js文件,调用Page()创建页面实例
// 2.4.页面渲染完成
```

# view和scroll-view组件的基本使用

小程序中的组件由宿主环境提供

- 视图容器

- 基础内容
- 表单组件
- 导航组件
- 媒体组件
- `map`地图组件
- `canvas`画布组件
- 开放能力
- 无障碍访问

视图容器:

1. `view`:类似`div`,是一个块级元素
2. `scroll-view`:可滚动的试图区域,常用来实现滚动列表效果
3. `swiper和swiper-item`:轮播图容器组件和每一张轮播图`item`组件

```javascript
// 给三个不同颜色的块元素实现横向布局
<!--pages/list/list.wxml-->
<view class="container">
    <view>A</view>
    <view>B</view>
    <view>C</view>
</view>
/* pages/list/list.wxss */
.container view {
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
}
.container view:nth-child(1) {
    background-color: red;
}
.container view:nth-child(2) {
    background-color: green;
}

.container view:nth-child(3) {
    background-color: blue;
}
.container {
    display: flex;
    justify-content: space-around;
}
```

```javascript
// 实现纵向滚动的效果
<!--pages/list/list.wxml-->
<scroll-view class="container" scroll-y>// 开启y轴滚动
    <view>A</view>
    <view>B</view>
    <view>C</view>
</scroll-view> 
/* pages/list/list.wxss */
.container {
    height:120px // 必须给出一个固定高度
}
```

# swiper和swpier-item的基本用法

```javascript
<!--pages/swiper_test/swiper_test.wxml-->
<swiper class="swiper">
	<swiper-item class="item"><view>A</view></swiper-item>
	<swiper-item class="item"><view>B</view></swiper-item>
	<swiper-item class="item"><view>C</view></swiper-item>
</swiper>
/* pages/swiper_test/swiper_test.wxss */
.swiper{
  height: 150px;
}
.item{
    height: 100%;
    line-height: 150px;
    text-align: center;
}
swiper-item:nth-child(1){
    background-color: red;
}
swiper-item:nth-child(2){
    background-color: green;
}
swiper-item:nth-child(3){
    background-color: blue;
}
```

`swiper`组件的常用属性:

|          属性名          |   类型    |      默认值      |         说名         |
| :----------------------: | :-------: | :--------------: | :------------------: |
|     `indicator-dots`     | `boolean` |     `false`      |  是否显示面板指示点  |
|    `indicator-color`     |  `color`  | `rgba(0,0,0,.3)` |      指示点颜色      |
| `indicator-active-color` |  `color`  |    `#000000`     | 当前选中的指示点颜色 |
|        `autoplay`        | `boolean` |     `false`      |     是否自动切换     |
|        `interval`        | `number`  |      `5000`      |   自动切换时间间隔   |
|        `circular`        | `boolean` |     `false`      |   是否采用闭环滑动   |

# text和rich-text组件的用法

- `text`:文本组件,类似`span`,是一个行内元素

```javascript
// 小程序中仅text支持长按选中文本内容的操作,且需要带上selectable属性
<text selectable></text> 
```

- `rich-text`:富文本组件,支持把**HTML字符串**渲染为`WXML`的`UI`结构

```javascript
// 通过rich-text组件的nodes属性节点,把HTML字符串渲染为对应wxml的UI结构
<rich-text nodes="<h1 sytle='color:red;'>MaayaSis</h1>"></rich-text>
```

# button和img组件的基本用法

- `button`:按钮组件,通过`open-type`属性可以调用微信提供的各种功能(客服,转发,获取用户授权,获取用户信息等)

```javascript
<!--pages/button_test/button_test.wxml-->
<!-- type:warn;警告类型按钮 -->
<button type="default">默认按钮</button>
<!-- button默认独占一行,加上size:mini后不独占一行 -->
<button size="mini">小按钮</button>
<!-- plain 镂空按钮-->
<button type="default" plain>镂空按钮</button>
```

- `image`:图片组件,默认宽度约300px,高度约240px

```javascript
<image src="/image/test.jpg" mode="aspectFill"></image>
```

|   `mode`值    |                             说明                             |
| :-----------: | :----------------------------------------------------------: |
| `scaleToFill` | (默认值)不保持纵横比缩放图片,使图片的宽高完全拉伸至填满`image`元素 |
|  `aspectFit`  |           保持纵横比缩放图片,图片的长边能完全显示            |
| `aspectFill`  |           保持纵横比缩放图片,图片的短边能完全显示            |
|  `widthFix`   |           宽度不变,高度自动变化,保持原图宽高比不变           |
|  `heightFix`  |           宽度不变,高度自动变化,保持原图宽高比不变           |

- `navigator`:页面导航组件,类似`a`标签

# 小程序API的三个分类

1. 事件监听`API`
   1. 以`on`开头,用来监听某些事件的触发
   2. `wx.onWindowResize(callback)`监听窗口尺寸变化的事件
2. 同步`API`
   1. 以`Sync`结尾的`API`都是同步`API`
   2. 同步`API`的执行结果,可以通过函数返回值直接获取,如果执行出错会抛出异常
   3. `wx.setStorageSync('key','value')`向本地存储中写入内容
3. 异步`API`
   1. 类似`jQuery`中的$.ajax(options)函数,需要通过`success`,`fail`,`complete`接收调用的结果
   2. `wx.request()`发起网络数据请求,通过`success`回调函数接收数据

# 小程序权限管理的概念及成员管理的两个方面

`null`

# 开发者权限说明以及如何维护项目成员

`null`

# 了解小程序的版本阶段与上线的主要步骤

`null`

# 小程序的推广与运行数据的查看

`null`

# 总结

`null`

# 学习目标

`null`

# 数据绑定

```javascript
// 数据绑定与vue有所不同,不需要`:`,但需要`{{}}`
<div id="{{MaayaSis}}"></div> 
page({
  data:{
    name:"MaayaSis"
  }
})
```

# 事件绑定

事件:将用户在渲染层产生的行为,反馈到逻辑层进行业务处理

1. `tap`:通过`bindtap`或bing:tap绑定;手指触摸后马上离开,类似于`click`事件
2. `input`:通过`bindinput`或`bind:input`绑定;文本框的输入事件
3. `change`:通过`bindchange`或`bind:change`绑定,状态改变时触发

```javascript
<!-- 组件绑定触摸事件 -->
<view bindtap="handlerTap" style="text-align: center;"> 姐姐
<button type="primary" >MaayaSis</button>
</view>
<!-- 业务逻辑 -->
handlerTap(e){
  console.log(e.target,e.currentTarget);// 点击button,冒泡到view触发tap事件,target为button
},
```

1. `target`:触发事件的组件的一些属性的集合
2. `currenttarget`:当前组件的一些属性的集合
3. `detail`:额外的信息

# 事件传参与数据同步

```javascript
// 小程序中传值与修改data中的数据
// 传值的原理是原生js的自定义属性,注意如果不加`{{}}`则53为String
<button bindtap="changeCount" data-info="{{1}}"></button>
// 
data:{
  count:0
}
changeCount(e){
  this.setData({
    count:this.data.count + e.target.dataset.info
  })
  console.log(this.data.count)// count:1
}
```

```javascript
// 小程序中v-model的实现
<input value="{{message}}" bindinput="userInput"/>
  //
data:{
	message:""
}
userInput(e) {
  this.setData({
    message:e.detail.value
  })
},
```

# 条件渲染

```javascript
// block只是一个容器,不是组件,所以不会被渲染,相当于template
// wx:if wx:elif wx:else
<block wx:if="{{message}}">
  <view>输入了{{message}}</view>
</block>
// hidden
<view hidden="{{!message}}">hidden的输入{{message}}</view>
```

# 列表渲染

```javascript
<view wx:for="{{arrayTest}}" wx:key="id">
  名字:{{item.name}}
</view>
// 
data:{
  arrayTest:[
    {id:0,name:"如月佑"},
    {id:1,name:"如月真绫"}
  ]
}
```

```javascript
// 自定义索引名和遍历项名,使用场景
<view wx:for="{{arrayTest}}" wx:for-index="idx" wx:for-item="itemName">
  名字:{{item.name}}
</view>
```

# wxss和css

1. `wxss`相比`css`多了`rpx`尺寸单位和`@import`样式导入
2. `wxss`和`css`有部分选择器和样式规则是相同的

# rpx单位

1. `rpx`:将所有设备上将都等分为750rpx,因此在小屏幕设备上1rpx代表的宽度较小,而2rpx代表的宽度较大,并且将`rpx`单位换算成对应的像素单位来渲染
2. `rpx`与`px`的单位换算:以iPhone6为例子750px=375px=750物理像素

# 样式导入

`@import`后跟需要导入的外联样式表的相对路径,用`;`表示语句结束

```javascript
// 在当前页面的`.wxss`中引入
@import "common.wxss"
```

# 全局样式和局部样式

1. `.wxss`局部样式:只作用于当前页面
2. `app.wxss`全局样式:作用所有页面
3. 局部样式和全局样式冲突时,根据就近原则,局部样式会覆盖全局样式
4. 局部样式的权重大于或等于全局样式的权重时,才会覆盖全局的样式

# 常用的全局配置项以及小程序窗口的组成部分

`app.json`全局配置文件:

1. `pages`:记录当前小程序所有页面的存放路径
2. `window`:全局设置小程序窗口的外观
3. `tabBar`:设置小程序顶部和底部的`tabBar`效果
4. `style`:是否启用新版的组件样式

```javascript
// window:小程序窗口
// 1.navigationBar:导航栏区域
// 2.background:背景区域,默认不可见,下拉才显示
// 3.页面主题区域,用来显示wxml的布局
```

# 全局配置_window:导航栏

|             属性名             |    类型    |   默认值   |                    说明                     |
| :----------------------------: | :--------: | :--------: | :-----------------------------------------: |
|    `navigationBarTitleText`    |  `String`  |   字符串   |             导航栏标题文字内容              |
| `navigationBarBackgroundColor` | `HexColor` | ``#000000` | 导航栏背景颜色,只支持十六进制颜色如`#00000` |
|    `navigationBarTextStyle`    |  `String`  |  `white`   |     导航栏标题颜色,仅支持`black/white`      |

# 全局配置_window:下拉刷新

在开启刷新后,被下拉的页面不会自动回弹,后续需要进行处理

|         属性名          |    类型    |  默认值  |                    说明                    |
| :---------------------: | :--------: | :------: | :----------------------------------------: |
|    `backgroundColor`    | `HexColor` | `#fffff` |                窗口的背景色                |
|  `backgroundTextStyle`  |  `String`  |  `dark`  | 下拉`loading`圆点的样式,仅支持`dark/light` |
| `enablePullDownRefresh` | `Boolean`  | `false`  |            是否全局开启下拉刷新            |

# 全局配置_window:设置上拉触底的距离

上拉触底:

1. 移动端专有名词,通过手指在屏幕上的上拉滑动操作,从而加载更多数据的行为
2. 当滚动条`scoll`距离页面底部的距离不足设定值时,触发上拉触底事件
3. 没有特殊需求则使用默认值,且不需要带上单位

|         属性名          |   类型   | 默认值 |                      说明                       |
| :---------------------: | :------: | :----: | :---------------------------------------------: |
| `onReachBottomDistance` | `Number` |   50   | 页面上拉触底事件触发时距页面底部距离,单位为`px` |

# tabBar

- `tabBar`:移动端应用常见的页面效果,用于实现多页面的快速切换
  1. 底部`tabBar`
  2. 顶部`tabBar`
  3. `tabBar`中只能配置最少2个、最多5个`tab`页签
  4. 当渲染顶部`tabBar`时,不显示`icon`,只显示文本;而底部会正常显示`icon`
- `tabBar`的六个组成部分
  - `backgroundColor`:tabBar的背景色
  - `borderStyle`:`tabBar`上边框的颜色
  - `selectedlconPath`:被选中时的图片路径
  - `iconPath`:未选中时的图片路径
  - `selectedColor`:`tab`上的文字选中时的颜色
  - `color`:`tab`上文字的默认(未选中)颜色
- `tabBar`节点的配置项

|       属性        |    类型    | 必填 |  默认值  |                  `描述`                  |
| :---------------: | :--------: | :--: | :------: | :--------------------------------------: |
|    `position`     |  `String`  |  否  | `bottom` |    `tabBar`的位置,仅支持`bottom/top`     |
|   `borderStyle`   |  `String`  |  否  | `black`  | `tabBar`上边框的颜色,仅支持`black/white` |
|      `color`      | `HexColor` |  否  |          |      `tab`上文字的默认(未选中)颜色       |
|  `selectedColor`  | `HexColor` |  否  |          |        `tab`上的文字选中时的颜色         |
| `backgroundColor` | `HexColor` |  否  |          |             `tabBar`的背景色             |
|      `list`       |  `Array`   |  是  |          |   `tab`页签的列表,最少2个,最多5个`tab`   |

- 每个`tab`项的配置选项

|        属性        |   类型   | 必填 |                         描述                         |
| :----------------: | :------: | :--: | :--------------------------------------------------: |
|     `pagePath`     | `String` |  是  |         页面路径,页面必须在`pages`中预先定义         |
|       `text`       | `String` |  是  |                  `tab`上显示的文字                   |
|     `iconPath`     | `String` |  否  | 未选中时的图标路径;当`postion`为`top`时,不显示`icon` |
| `selectedlconPath` | `String` |  否  |  选中时的图标路径;当`postion`为`top`时,不显示`icon`  |

```javascript
// list中tab页签path指向的页面必须有一个c
"tabBar": {
  "list": [{
      "pagePath": "pages/index/index",
      "text": "text"
    },
    {
      "pagePath": "pages/swiper_test/swiper_test",
      "text": "teswiper_testxt"
    }
  ]
},
```

# 小程序的页面配置

1. 小程序每个页面的`json`配置文件,用来对当前页面的窗口外观,页面效果等进行配置
2. 全局配置和页面配置冲突时,页面配置的优先级更高
3. 猜测:或许时全局配置先加载,页面配置后加载而覆盖导致的

|              属性              |    类型    |  默认值   |                      描述                       |
| :----------------------------: | :--------: | :-------: | :---------------------------------------------: |
| `navigationBarBackgroundColor` | `HexColor` | `#000000` |       当前页面导航栏背景颜色,如`#000000`        |
|    `navigationBarTextStyle`    |  `String`  |  `white`  |   当前页面导航栏标题颜色,仅支持`black/white`    |
|    `navigationBarTitleText`    |  `String`  |           |           当前页面导航栏标题文字内容            |
|       `backgroundColor`        | `HexColor` | `#ffffff` |              当前页面窗口的背景色               |
|     `backgroundTextStyle`      |  `String`  |  `dark`   |  当前页面下拉`loading`的样式,仅支持dark/light   |
|    `enablePullDownRefresh`     | `Boolean`  |  `false`  |        是否为当前页面开启下拉刷新的效果         |
|    `onReachBottomDistance`     |  `Number`  |   `50`    | 页面上拉触底事件触发时距页面底部距离,单位为`px` |

# 数据请求_POST和GET请求

为了保证安全,小程序对网络数据请求的限制

1. 只能请求`HTTPS`类型的接口
2. 必须将接口的域名添加到信任列表中,需要通过小程序管理后台设置

```javascript
// 小程序中发送请求需要调用全局对象wx.request
<button type="default" bindtap="getRequest">默认按钮</button>
getRequest(){// 和data平级
  wx.request({
    url: 'https://www.escook.cn/api/get',
    method: 'GET',// 改为POST即可发送POST请求
    data: {
      name: 'MaayaSis',
      age: 25
    },
    success: (res)=>{
      console.log(res.data);
    }
  })
},
// 在页面加载时请求数据
onLoad(options) {
  this.getRequest()
},
```

# request请求的注意事项

当后端仅提供了`http`协议的接口暂时没有提供`https`,可以在微信开发者工具中开启:开发环境不校验请求域名,`TLS`,版本及`HTTPS`证书三项,来跳过`request`的校验

1. 跨域问题只存在于基于浏览器的Web开发中,小程序的宿主环境不是浏览器,而是微信客户端,所以不存在跨域问题
2. `Ajax`技术的核心是依赖于浏览器中的`XMLHttpRequest`这个对象,由于小程序的宿主环境是微信客户端,所以小程序时发起网络数据请求

# 实现本地生活的首页基础布局

1. 新建项目并梳理项目结构:创建三个页面`home`,`message`,`contact`
2. 配置导航栏效果
   1. 修改标题文本,颜色设置为白色
   2. 修改导航栏背景颜色
3. 配置`tabBar`效果
4. 实现轮播图效果:`[GET]https://www.escook.cn/slides`
5. 实现九宫格效果:`[GET]https://www.escook.cn/categories`
6. 实现图片布局

```html
<!--pages/home/home.wxml-->
<view class="body">
  <!-- 轮播图 -->
  <swiper class="swiper" indicator-dots="true" circular>
    <swiper-item wx:for="{{swiperList}}" wx:key="id" class="swiperItem">
      <image src="{{item.image}}" class="swiperImg"></image>
    </swiper-item>
  </swiper>
  <!-- 九宫格 -->
  <view class="gird">
    <view class="girdItem" wx:for="{{girdList}}" wx:key="id">
      <image class="girdImg" src="{{item.icon}}"></image>
      <text class="girdText">{{item.name}}</text>
    </view>
  </view>
  <!-- 图片区域 -->
  <view class="life">
    <image class="lifeImg" src="../../static/image/Skadi.jpg" mode="widthFix"></image>
    <image class="lifeImg" src="../../static/image/illust.png" mode="widthFix"></image>
  </view>
</view>
```

```javascript
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    girdList:[]
  },
  getSwiperList(){
    wx.request({
      url: 'https://www.escook.cn/slides',
      method: 'GET',
      success: (res)=>{
        this.setData({
          swiperList:res.data
        })
      }
    })
  },
  getGirdList(){
    wx.request({
      url: 'https://www.escook.cn/categories',
      method: 'GET',
      success: (res)=>{
        this.setData({
          girdList: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSwiperList()
    this.getGirdList()
  },
})
```

```css
.swiperImg {
  width: 100%;
}
.gird {
  display: flex;
  flex-wrap: wrap;
  border-left: #efefef solid 1px;
  border-top: #efefef solid 1px;
}
.girdItem {
  width: 33.33%;
  display: flex;
  height: 120rpx;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: #efefef solid 1px;
  border-bottom: #efefef solid 1px;
  box-sizing: border-box;
}
.girdImg {
  width: 60rpx;
  height: 60rpx;
}
.girdText {
  font-size: 24rpx;
}
.life{
  display: flex;
  padding: 20rpx 10rpx;
  justify-content: space-around;

}
.lifeImg{
  width: 40%;
}
```

# 总结

`null`

# 学习目标

`null`

# 声明式导航

小程序实现页面导航的方式:

1. 声明式导航:通过点击在页面上声明的`<navigator>`导航组件实现
2. 编程式导航:调用导航`API`实现

```javascript
// 声明式:跳转到tabBar类型的页面:必须使用open-type属性,且属性值为switchTab
<navigator url="/pages/message/message" open-type="switchTab"></navigator>
// 声明式:跳转到非tabBar类型的页面:open-type属性可省略
<navigator url="/pages/info/info"></navigator>
// 声明式:回退,open-type的值必为navigateBack;delta值必为数字,表示要后退的层级,delta为1时可省略
<navigator open-type="navigateBack" delta="1">声明式导航后退</navigator>
```

# 编程式导航

`wx.switchTab(Object object)`:跳转到`tabBar`页面

`wx.navigateTo(Object object)`:跳转到非`tabBar`页面

`wx.navigateBack(Object object)`:回退页面

其中`0bject`参数对象的属性列表如下:`url`为跳转专有属性,`delta`为回退专有属性

|    属性    |    类型    | 是否必选 |                          说明                          |
| :--------: | :--------: | :------: | :----------------------------------------------------: |
|   `url`    |  `string`  |    是    | 跳转`tabBar`页面,路径后不能带参数;跳转非`tabBar`则可以 |
|  `delta`   |  `number`  |    否    |     默认为1,返回的页面数,如大于现有页面则返回首页      |
| `success`  | `function` |    否    |                 接口调用成功的回调函数                 |
|   `fail`   | `function` |    否    |                 接口调用失败的回调函数                 |
| `complete` | `function` |    否    |     接口调用结束的回调函数(调用成功,失败都会执行)      |

```html
<button bindtap="goToMessage" style="width:100%;">编程式跳转tabBar</button>
<button bindtap="goToInfo" style="width:100%;">编程式跳转非tabBar</button>
<button bindtap="goBack" style="width: 100%;">编程式后退</button>
```

```javascript
goToMessage(){
  wx.switchTab({
    url: '/pages/message/message',
  })
},
goToInfo(){
  wx.navigateTo({
    url: '/pages/info/info',
  })
},
goBack(){
  wx.navigateBack() // 默认回退一层页面则可以不使用delta参数
},
```

# 导航传参

```html
<!-- 声明式导航:不确定是否跳转tabBar类型页面无法携带参数 -->
<navigator url="/pages/info/info?name='姐姐'&age=18">声明式跳转非tabBar</navigator>
<!-- 编程导航 -->
<button bindtap="goToInfo" style="width:100%;">编程式跳转非tabBar类型的info页面</button>
```

```javascript
// home.js
goToInfo(){
  wx.navigateTo({
    url: '/pages/info/info?name="姐姐"&age=18',
  })
},
// info.js
data: {
	query:{}
},
onLoad(options) { // options为导航传递的参数,且options只在onLoad块级作用域存在
  this.setData({  // 在页面中挂载
    query:options 
  })
},
```

# 下拉刷新

下拉刷新:通过手指在屏幕上的下拉滑动操作,使重新加载页面数据重新加载

启用下拉刷新:

1. 全局开启:在`app.json`的`window`节点中,将`enablePullDownRefresh`设置为`true`
2. 局部刷新:在页面的`.json`中,将`enablePullDownRefresh`设置为`true`
3. 开发中推荐使用第二种

```javascript
// 配置页面的下拉刷新及下拉刷新窗口的样式:与全局不同,不需要再window下配置
{
  "enablePullDownRefresh": true,
  "backgroundColor": "#efefef",
  "backgroundTextStyle": "dark"
}
```

```javascript
// 监听用户下拉操作
onPullDownRefresh() {
  console.log("用户下拉刷新页面了");
  wx.stopPullDownRefresh({ // 在操作完成后关闭刷新
    success: (res) => {
      console.log("关闭刷新操作了");
    },
  })
},
```

# 上拉触底

```javascript
// 监听页面的上拉触底事件,但是需要配合节流一起使用
onReachBottom:function(){
  console.log('上拉触发触底事件')
}
```

```javascript
// 可以在全局或页面的json配置文件中,通过onReachBottomDistance属性来配置上拉触底的距离
// 默认的触底距离是50px
{
  "onReachBottomDsitance": 150 // 不需要加单位
}
```

# 初步实现上拉触底效果

1. 定义获取随机颜色的方法
2. 在页面加载时获取初始数据
3. 渲染UI结构并美化页面效果
4. 在上拉触底时调用获取随机颜色的方法
5. 添加`loading`提示效果
6. 对上拉触底进行节流处理

```javascript
// 1-4点
// html
<view class="colorItem" wx:for="{{colorList}}" wx:key="index" style="background-color: rgba({{item}});">{{item}}</view>
// js
getColorList() {
  wx.request({
    url: 'https://www.escook.cn/api/color',
    method: 'GET',
    success: ({
      data: res // 因为返回的res.data也是一个数据所以先解构用起来方便
    }) => {
      this.setData({
        colorList: [...this.data.colorList, ...res.data] // 扩展运算符浅拷贝
      })
    }
  })
}
```

# 添加loading效果和节流

```javascript
Page({
  data: {
    colorList: [],
    isLoading: true
  },
  // 44.获取随机颜色
  getColorList() {
    this.setData({
      isLoading:true
    })
    wx.showLoading({ // 添加loading框
      title: '数据加载中',
    })
    wx.request({
      url: 'https://www.escook.cn/api/color',
      method: 'GET',
      success: ({
        data: res
      }) => {
        this.setData({
          colorList: [...this.data.colorList, ...res.data]
        })
      },
      complete: ()=>{
        wx.hideLoading() // 自动关闭loading框
        this.setData({
          isLoading:false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getColorList() // 调用获取随机颜色的方法
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if(this.data.isLoading) return console.log("稍等片刻,数据正在加载中");
    this.getColorList()
  },
})
```

# 自定义编译模式

`null`

# 声明周期的概念与分类

`null`

# 声明周期函数的概念与分类

1. 应用的生命周期函数:小程序从启动,运行,销毁期间依次调用的函数
2. 页面的生命周期函数:每个页面从加载,渲染,销毁期间依次调用的函数

# 应用和页面的生命周期函数

```javascript
// 应用的生命周期函数在app.js中声明
App({
  // 当小程序初始化完成时,会触发 onLaunch（全局只触发一次）
  onLaunch: function () {},
  // 当小程序启动,或从后台进入前台显示,会触发 onShow/
  onShow: function (options) {},
  // 当小程序从前台进入后台,会触发 onHide
  onHide: function () {},
  // 当小程序发生脚本错误,或者 api 调用失败时,会触发 onError 并带上错误信息
  onError: function (msg) {}
})
```

```javascript
// 页面的声明周期在页面的.js文件中声明
page({
  onLoad:function(options) { }, // 监听页面加载,一个页面只调用1次
  onShow:function() { }, // 监听页面显示
  onReady:function() { }, //监听页面初次渲染完成,一个页面只调用1次
  onHide:function() { }, // 监听页面隐藏
  onUnload: function() { } //监听页面卸载,一个页面只调用1次
})
```

# wxs的概念

1. `WXS(WeiXin Script)`是小程序独有的一套脚本语言,结合wxml,可以构建出页面的结构
2. `wxml`中无法调用在页面的`js`中定义的函数,但可以调用`wxs`中定义的函数
3. 小程序中`wxs`的典型应用场景就是“过滤器”

**`wxs`和`JavaScript`的关系**

1. `wxs`不支持`ES6`及以上的语法形式
   - 不支持:`let`,`const`,解构赋值,展开运算符,箭头函数,对象属性简写等
   - 支持:`var`定义变量,普通`function`函数等类似于`ES5`的语法
2. `wxs`支持`CommonJS`规范
   1. `module`对象
   2. `require()`函数
   3. `module.exports`对象

# wxs的基本用法

1. 小程序中`wxs`的典型应用场景就是“过滤器”
2. 在`wxs`中定义的函数不能作为组件的事件回调函数
3. `wxs`不能调用`js`中定义的函数,以及小程序提供的`API`
4. 在`iOS`中`wxs`比`JavaScript`快2-20倍数,在`Android`中两者差别不大

```javascript
// message.wxml:内嵌的wxs脚本
<view>{{m1.toUpper(userName)}}</view>
// 将data中的userName作为参数传入
<wxs module="m1">
  module.exports.toUpper = function (str) { 
    return str.toUpperCase()
  }
</wxs>
```

```javascript
// 定义外联的wxs脚本
function toLower(str){
  return str.toLowerCase()
}
module.exports = {
  toLower:toLower
}
// wxml中使用外联的wxs脚本:需要为wxs标签添加上src和module属性
<view>{{m2.toLower(gender)}}</view>
<wxs src="../../utils/tools.wxs" module="m2"></wxs>
```

# 演示案例效果并实现导航栏跳转

列表页面功能:

1. 页面导航并传参
2. 上拉触底时加载下一页数据
3. 下拉刷新列表数据

```javascript
// 通过
<navigator class="grid-item" wx:for="{{gridList}}" wx:key="id" url="/pages/shopListshopList?id={{item.id}}&title={{item.title}}">
  <image src="{{item.icon}}"></image>
  <text>{{item.name}}</text>
</navigator>
```

# 案例_设置标题内容并创建编译模式

```javascript
// 生命周期函数--监听页面初次渲染完成
onReady() {
  // wx.setNavigationBarTitle()只能在onReady时被使用
	wx.setNavigationBarTitle({
		title: this.data.params.title,
	})
},
```

# 案例_获取并渲染商铺列表的数据

1. 接口地址`https://www.escook.cn/categories/:cate_id/shops`
2. 请求方式:`GET`请求
3. 请求参数:`_page`表示请求第几页的数据,`_limit`表示每页请求几条数据

```html
<view class="shop-item" wx:for="{{shopList}}" wx:key="id">
	<view class="shop-img">
		<image src="{{item.images[0]}}"></image>
	</view>
	<view class="shop-info">
		<text>{{item.name}}</text>
		<text>电话:{{item.phone}}</text>
		<text>地址:{{item.address}}</text>
		<text>营业时间:{{item.businessHours}}</text>
	</view>
</view>
```

```javascript
data: {
	params: {},
	shopList: [],
	page: 1,
	limit: 10,
	total: 0
},
getShopList() {
	wx.request({
		url: `https://www.escook.cn/categories/${this.data.params.id}/shops`,
		method: 'GET',
		data: {
			_page: this.data.page,
			_limit: this.data.limit
		},
		success: (res) => {
			this.setData({
				shopList: [...this.data.shopList,...res.data],
				total: res.header['x-Toatal-Count'] - 0 // total是字符串所以通过一元运算转为数字
			})
		}
	})
},
// 生命周期函数--监听页面加载
onLoad(options) {
	this.setData({
		params: options
	})
	this.getShopList()
},
```

```css
.shop-item{
	display: flex;
}
.shop-img image{
	width: 250rpx;
	height: 250rpx;
	display: block;
}
.shop-info{
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
```

# 初步实现上拉加载效果

`null`

# 判断数据是否加载完毕

```javascript
// 当前页数*每页的数据>=总数据数目时,不再发送请求加载数据
wx.showToast({ // 弹出框
  title:'数据加载完毕',
  icon: 'none'
})
```

# 实现下拉刷新效果

```javascript
// 1.重置关键数据,从第一页开始重新请求获取数据
// 2.下拉刷新在真机中,用户松手并不会停止刷新,需调用api关闭
wx.pullDownRefresh()
this.getShopList(()=>{
  wx.stopPullDownRefresh()
})
getShopList(callBack){
  complete: ()=>{
    callBack && callBack()
  }
}
```

# 使用wxs处理手机号

```javascript
// toosl.wxs
function splitPhone(str){
  if(str.length !== 11) return str
  var arr = str.split('')
  // 从索引3或8的位置开始删除0个元素,并添加一个元素'-'
  arr.splice(3,0,'-')
	arr.splice(8,0,'-')
  // 将数组转换为字符串并返回
  return arr.join('')
}
module.exports = {
  splitPhone:splitPhone
}
```

# 总结

`null`

# 学习目标

`null`

# 准备要用到的项目

# 初步插件并使用自定义组件

- 在``component``文件夹中右键新建`component`即可创建组件
- 组件和页面的`.js`,`.json`有明显的不同
  - 组件的`.json`文件中需要声明`"component": true`属性
  - 组件的`.js`文件中调用的是`Component()`函数
  - 组件的事件处理函数需要定义到`methods`节点中

- 局部引用

```javascript
// 在页面的.json文件中配置
{
  "usingComponents":{
    "my-test":"/component/test/test"
  }
}
```

- 全局引用

```javascript
// app.json中引用:和window平级
{
  "usingComponents":{
    "my-test":"/component/test/test"
  }
}
```

```html
<my-test></my-test>
```

# 自定义组建的样式

自定义组件的样式只对当前组件生效,同样页面也不会影响组件的样式

1. 全局样式`app.wss`对组件无效
2. 但只有`class`选择器会有样式隔离效果,`id`选择器,属性选择器,标签选择器不受样式隔离的影响
3. 备注:在组件和引用组件的页面中建议使用`class`选择器

```JavaScript
// 组件.js:可以通过options选项修改样式隔离
Component({
   options:'apply-shared'
})
```

|     可选值     | 默认值 |                             描述                             |
| :------------: | :----: | :----------------------------------------------------------: |
|   `isolated`   |   是   | 启用样式隔离,在自定义组件内外,使用`class`指定的样式将不会相互影响 |
| `apply-shared` |   否   | 页面`wxss`样式将影响自定义组件,自定义组件`WXSS`中的样式不影响页面 |
|    `shared`    |   否   | 页面`wxss`样式将影响到自定义组件,自定义组件`wxss`中样式也会影响页面和其他设置了`apply-shared`或`shared`的自定义组件 |

# 自定义组件中的data和methods

小程序组件中,事件处理函数和自定义方法需要定义到`methods`节点中

# 自定义组件的properties

`data`和`propertie`的区别:

1. `data`更倾向于存储组件的私有数据
2. `properties`更倾向于存储外界传递到组件中的数据

```JavaScript
// MyTest组件js中接收properties
Component({
  properties: {
    // 1.简化形式,无法设置默认值
    max: Number,
    // 2.完整形式
    max: {
      type: Number,
      value: 10,
    }
  }
})
// 使用my-test组件:并传递属性值
<my-test max='9'></my-test>
```

```JavaScript
// 和vue不同,小程序中的properties是可读可写的
Component({
  methods: {
    showInfo(){
      // 输出:true,表示两者是一样的
      console.log(this.data === this.properties)
    }
  }
})
// 因此properties的值也可以通过setData()修改
```

# 自定义组件的数据监听器

数据监听器:类似`watch`侦听器

 ```JavaScript
 // 监听对象的单个属性或多个属性
 Component({
   data:{
     obj:{
       attrFirst: 1,
       attrSecond: 2,
       sum: ''
     }
   },
   observes:{
     // 传递的参数可以自定义名字
     'obj.attrFirst, obj.attrSecond': function(val1, val2){
       this.setData({
         sum: val1 + val2
       })
     }
   }
 })
 ```

# 自定义组件的数据监听器案例

```JavaScript
// 通过模板字符串来组合rgb值
```

# 自定义组件的纯数据字段

1. 纯数据字段:不用于界面渲染的`data`字段
2. 应用场景:`data`中的字段既不展示在界面上,也不传递给其他组件,仅在当前组件内部使用;带有这种特性的`data`字段适合被设置为纯数据字段
3. 纯数据字段有助于提升页面更新的性能

```JavaScript
// 定义纯数据字段
Component({
  options:{
    // 指定所有`_`开头的数据字段为纯数据字段
    pureDataPattern: /^_/
  },
  data:{
    _obj:{
      attrFirst: 1,
      attrSecond: 2,
      sum: ''
    }
  }
})
```

# 自定义组件的生命周期函数

| 生命周期函数 |     参数     |                 描述说明                 |
| :----------: | :----------: | :--------------------------------------: |
|   created    |      无      |        在组件实例刚刚被创建时执行        |
|   attached   |      无      |  在组件实例进入页面节点树时(渲染前)执行  |
|    ready     |      无      |    在组件在视图层布局(渲染)完成后执行    |
|    moved     |      无      | 在组件实例被移动到节点树另一个位置时执行 |
|   detached   |      无      |    在组件实例被从页面节点树移除时执行    |
|    error     | Object Error |        每当组件方法抛出错误时执行        |

1. `created`:组件实例刚被创建好时触发
   - 此时不能调用`setData`
   - 通常在这个生命周期函数中,只应该用于给组件的`this`添加一些自定义的属性字段
2. `attached`:在组件完全初始化完毕,进入页面节点树后触发
   - `this.data`已被初始化完毕
   - 绝大多数初始化的工作可以在这个时机进行(例如发请求获取初始数据)
3. `detached`:组件离开页面节点树后触发
   - 退出一个页面时会触发页面内每个自定义组件的detached生命周期函数
   - 适合做一些清理性质的工作

```JavaScript
// 生命周期函数的两种定义方法
Component({
  data:{},
  // 1.推荐用法,且两种同时
  lifetimes:{
    attached(){},
    detached(){}
  },
  // 2.不推荐
  attached(){},
  detached(){}
})
```

# 组件所在页面的生命周期

自定义组件的行为依赖于页面状态的变化,此时就需要用到组件所在页面的生命周期

| 生命周期函数 |    参数     |             描述             |
| :----------: | :---------: | :--------------------------: |
|     show     |     无      |  组件所在的页面被展示时执行  |
|     hide     |     无      |  组件所在的页面被隐藏时执行  |
|    resize    | Object Size | 组件所在的页面尺寸变化时执行 |

```JavaScript
// 组件所在页面的生命周期函数,需要定义在pageLifetimes节点中
Component({
  data:{
    _rgb:''
  },
  methods:{
    // 非事件处理函数建议以`_`开头
    _rendorColor(){
      this.setData({
        _rgb:{
          // 随机生成颜色
          r: Math.floor.(Math.random()*256),
        }
      })
    }
  },
  pageLifetimes:{
    attached(){},
    detached(){}
  }
})
```

# 自定义组件中的插槽

插槽:用于承载组件使用者提供的`wxml`结构

- 单个插槽:一个组件中只允许存在一个插槽
- 启用多个插槽

```JavaScript
Component({
  data:{},
  options:{
    multipleSlotes: true
  }
})
```

- 自定义多个插槽

```HTML
<!-- 组件模板 -->
<view>
  <slot name='before'></slot>
  <viwe>组件的默认结构</viwe>
  <slot name="after"></slot>
</view>
```

```html
<viwe>
  <view slot='before'>通过插槽填充到before的内容</view>
  <view slot='after'>通过插槽填充到after的内容</view>
</viwe>
```

# 使用属性绑定实现父向子共享数据

属性绑定:父组件向子组件的指定属性设置数据,仅能设置JSON兼容的数据,无法传递方法

```JavaScript
// 父组件的data节点
data:{
  count: 0
},
// 父组件的wxml结构
<my-test count='{{count}}'></my-test>
<view>父组件中count的值为:{{count}}</view>
```

```JavaScript
// 子组件的properties节点
properties:{
  count: Number
},
// 子组件的wxml结构
<test>子组件中count的值为:{{count}}<test>
```

# 使用自定义事件实现子向父共享数据

事件绑定:子组件向父组件传递数据,可以传递任意数据

1. 父组件的`js`中,定义一个函数,这个函数即将通过自定义事件的形式,传递给子组件
2. 父组件的`wxml`中,通过自定义事件的形式,将定义的函数引用,传递给子组件
3. 在子组件的`js`中,通过调用`this.triggerEvent('eventName',{params})` ,将数据发送到父组件
4. 父组件的`js`中,通过`e.detail`获取到子组件传递过来的数据

```JavaScript
// 1.父组件.js中定义eventCount()
eventCount(e){ // 参数接收子组件传来的数据
  console.log(e.detail)
},

<!-- 2.父组件.wxml中使用自定义事件 -->
<!-- 自定义事件的两种绑定方法,推荐第一种 -->
<!-- 2_1.bind:eventName -->
<my-test count='count' bind:eventName='eventCount'></my-test>
<!-- 2_2.bindeventName -->
<my-test bindeventName='eventCount'></my-test>

// 3.子组件中触发eventCount()
<button bindtap='addCount'></button>
methods:{
  addCount(){
    //  触发回调
    this.triggerEvent('eventCount',this.properties.count)
  }
}
```

# 使用selectComponent来获取组件实例

获取组件实例:父组件还可以通过`this. selectComponent()`获取子组件实例对象

```javascript
// .wxml
<my-test class='testA' id='tA'></my-test>
<button bindtap='getChildComponent'>获取组件实例</button>
// .js
getChildComponent(){
  // this. selectComponent('id或class选择器')
  const childComponent = this. selectComponent('#tA')
  // 调用子组件的属性及setData方法
  childComponent.setData({count: childComponent.properties.count + 1})
  // 调用子组件的addCount方法
  child.addCount()
}
```

# 自定义组件的behaviors

- `behavior`:类似于`mixins`
- 每个`behavior`可以包含一组属性,数据,生命周期函数和方法;组件引用它时,它的属性,数据和方法会被合并到组件中

```JavaScript
// 调用Behavior()方法,创建实例对象
// 使用module.exports共享behavior实例对象
module.exports = Behavior({
  // 属性节点
  properties: {},
  // 私有数据节点
  data:{
    userName: 'zs'
  },
  // 事件处理函数和自定义方法节点
  methods:{},
  // 其他节点
})
```

```JavaScript
// 导入并使用behavior
// 1.require()导入需要的自定义behavior模块;此模块存放在与pages同级的behavior下
const myBehavior = require("../.. /behaviors/mybehavior" )
Component({
  // 导入后组件就能使用behavior中的属性和方法
  behavior: [myBehavior]
})
```

- `behavior`中可用的节点

| 可用的节点   | 类型           | 是否必填 | 描述                |
| ------------ | -------------- | -------- | ------------------- |
| `properties` | `Object Map`   | 否       | 同组件的属性        |
| `data`       | `Object`       | 否       | 同组件的属性        |
| `methods`    | `0bject`       | 否       | 同自定义组件的方法  |
| `behaviors`  | `String Array` | 否       | 引入其它的`behavio` |
| `created`    | `Function`     | 否       | 生命周期函数        |
| `attached`   | `Function`     | 否       | 生命周期函数        |
| `ready`      | `Function`     | 否       | 生命周期函数        |
| `moved`      | `Function`     | 否       | 生命周期函数        |
| `detached`   | `Function`     | 否       | 生命周期函数        |

- 同名字段的覆盖和组合规则
  1. 同名的数据字段`data`
     1. 同名的数据字段都是对象类型,会进行对象合并
     2. 其余会覆盖,规则为:组件>父`behavlor`>子`behavlor`;靠后的`behavlor`>靠前的`behavior`(组件优先级最高,会覆盖其余)
  2. 同名的属性`properties`或方法`methods`
     1. 组件有此属性或方法,则`behavlor`中的同名属性或方法被组件覆盖
     2. 组件无此属性或方法,则在组件的`behavlors`字段中定义靠后的`behav1or`的属性或方法会覆盖靠前的同名属性或方法
     3. 在`2`的基础上,若存在嵌套引用`behavior`的情况,则规则为:父`behavior`覆盖子`behavior`中的同名属性或方法
  3. 同名的生命周期函数
     1. 生命周期函数不会相互覆盖,而是在对应触发时机被逐个调用
     2. 对于不同的生命周期函数之间,遵循组件生命周期函数的执行顺序
     3. 对于同种生命周期函數,遵循如下规则:
        1. `behavior`优先于组件执行
        2. 子`behavior`优先于父`behavior`执行
        3. 靠前的`behavior`,优先于掌后的`behavior`执行
        4. 同一个`behavior`被一个组件多次引用,它定义的生命周明函数只会被执行一次。

# 总结

`null`

# 导入需要用到的小程序项目

`null`

# 初步安装和使用vant组件库

小程序中使用`npm`有限制:

1. 不支持依赖于`Node.js`内置库的包
2. 不支持依赖于浏览器内置对象的包
3. 不支持依赖于`C++`插件的包

```JavaScript
// 使用vant组件:在app.json中引用
"usingComponents" :{
  "vant-button": "@vant/weapp/button/index"
}
```

# 使用css样式定制vant主题样式

一个颜色值在项目中的多个地方应用,如果需要修改,就得一个个替换,通过自定义属性可以解决这个问题

```JavaScript
// wxss中定义变量属性与使用,变量属性也有作用域,如果要全局使用,则定义在根节点中
// wxss的根节点是`page`
elment {
  // 变量名需要使用`--`开头
  --main-bg-color: brown
  // 使用var()包裹变量
  background-color: var(--main-bg-color)
}
```

# 小程序API的Promise化

- 小程序官方提供的异步`API`都是基于回调函数实现的,例如网络请求的`API`

```JavaScript
// 因此容易造成回调地狱:小程序不支持箭头函数,以下仅为演示
wx.request({
  method: '',
  url: '',
  data: {},
  success: ()=> {},
  fail: ()=> {},
  complete: ()=> {}
})
```

- `API Promise`:通过配置,将官方提供的基于回调函数的异步`API`,改造为基于`Promise`的异步`API`

```JavaScript
// 通过第三方npm包:miniprogram-api-promise@
// 安装
npm i --save miniprogram-api-promise@1.0.4
// 在app.js中通过ES6语法进行引入,只需要调用一次promisifyAll(),即可实现异步API的Promise化
// 将所有的promise化后的APi挂载到全局对象wx的属性wxp上
const wxp = wx.p = {}
promisifyAll(wx,wxp)
```

```JavaScript
// 使用Promise化后的异步API
async getInfo() {
  const {data: res} = await wx.request({
    method: 'post',
    url: '',
    data: {}
  })
}
```

# 全局数据共享_了解全局数据共享方案和MobX

- 全局数据共享(状态管理):解决组件之间数据共享的问题
- 小程序中,使用`mobx-miniprogram`配合`mobx-miniprogram-bindings`实现全局数据共享:
  1. `mobx-miniprogram`:用来创建`Store`实例对象
  2. `mobx-miniprogram-bindings`:用来把`Store`中的共享数据或方法,绑定到组件或页面中使用

```JavaScript
// 安装:老版本还需要使用npm构建,如果已经存在miniprogram_npm文件夹则还需提前删除再npm构建
npm install --save mobx-miniprogram@4.13.2 mobx-miniprogram-bindings@1.2.1
```

# 全局数据共享_创建store实例并定义计算属性与actions方法

```JavaScript
// 项目根目录下:store/store.js
import {obserable, action} from 'mobx-miniprogram'
// 创建store实例
export const store = obserable({
  // 共享属性
  numA: 1,
  numB: 2,
  // 计算属性:get为修饰符代表只读,因为计算属性不需要被修改,sum为计算属性的变量名
  get sum(){
    return this.numA + this.numB
  },
  // actions(): 用来修改store中的数据
  // step外部传入的参数
  updateNumA: action(funciton(step){
  	this.numA += step
  })
})
```

# 全局数据共享_在页面中使用store中的成员

```JavaScript
// store中的成员绑定到页面中
// 页面的.js文件
import {creatStoreBindings} from 'mobx-miniprogram-bindings'
import {sotre} from '../../store/sotre'
page({
  onLoad: function(){
    // 将返回值绑定到一个变量上,方便页面卸载时删除
    this.storeBindings = creatStoreBindings(this,{
      // 源仓库
      store,
      // 属性
      fields: ['numA', 'numB', 'sum'],
      // 方法
      actions: ['updateNumA']
    })
  },
  onUnload: function(){
    this.storeBindings.destroyStoreBindings()
  }
})
```

```JavaScript
// 在页面中使用Store中的成员
// data-step:HTML标签的自定义属性
<van-button type="primary" bindtap="btnHandler1" data-step="{{1}}">numA + 1</van-button>
// 操作store中的属性
btnHandler1() {
  // e.target是dom元素,dataset是修饰符
  this.updateNum1(e.target.dataset.step)
}
```

# 全局属性_在组件中中使用store中的成员

```JavaScript
// Store中的成员绑定到组件中
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store'
Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    // 数据源
    store,
    fields: {
      // 绑定字段方法1
      numA: () => store.numA,
      // 绑定字段方法2
      numB: (store) => store.numA,
      // 绑定字段方法3
      sum: 'sum'
    },
    actions: {
      updateNum2: 'updateNum2'
    }
  }
)}
```

# 分包的基础概念

- 把完整的小程序项目,按照需求划分为不同的子包(模块),在构建时打包成不同的分包:
  1. 可以优化小程序首次启动的下载时间
  2. 在多团队共同开发时可以更好的解耦协作
  3. 主包:一般只包含项目的启动页面或`TabBar`页面,以及公共资源
  4. 分包:只包含和当前分包有关的页面和私有资源,无法被主包和其他分包访问
  5. 分包:可以引用主包的公共资源
- 加载规则:
  1. 小程序启动时,默认会下载主包并启动主包内页面
  2. `tabBar`页面需要放到主包中
  3. 当用户进入分包内某个页面时,客户端会把对应分包下载下来,下载完成后再进行展示
  4. 非`tabBar`页面可以按照功能的不同,划分为不同的分包之后,进行按需下载
- 分包的体积限制
  - 整个小程序所有分包大小不超过16M(主包及所有分包)
  - 单个分包/主包大小不能超过2M

# 分包的基本用法

分包原则:

1. 小程序会按`subpackages`的配置进行分包,`subpackages`之外的目录将被打包到主包中
2. 主包也可以有自己的`pages`(即最外层的`pages`字段)
3. `tabBar`页面必须在主包内
4. 分包之间不能互相嵌套

```JavaScript
{ // app.json中声明分包的结构
  "subpackages": [
    {
      "root": "packageA", // 分包的根目录
      "name": "p1", // 别名
      "pages": [
        "pages/cat/cat", // 当前根目录下页面存放的相对路径
        "pages/dog/dog"
      ]
    },
    {
      "root": "packageB",
      "name": "p2",
      "pages": [
        "pages/apple/apple"
        "pages/banana/banana"
      ],
      "independent": true // ?
    }
  ]
}
```

# 独立分包

- 独立分包:本质上是分包,特殊在可以独立于主包和其他分包而单独运行
- 分包:普通分包必须依赖于主包才能运行
- 不依赖于主包的即独立分包
- 将具有功能独立性的页面配置独立分包,可以提高它的启动速度
- 引用规则:主包,分包无法引用独立分包的资源,同样独立分包也无法引用主包,分包的资源包括公共资源

```JavaScript
// 小程序的目录解构
├── app.js
├── app.json
├── app.wxss
├── pages // 主包的所有页面
│		├── index
│		├── logs
├── packageA // 第一个分包
│		├── pages // 第一个分包的所有页面
│		│		├── cat
│		│		├── dog
├── packageB // 第二个分包
│		├── pages // 第二个分包的所有页面
│		│		├── apple
│		│		├── banana
├── packageC // 独立分包
│		├── pages
│		│		├── moduleA
│		│		├── moduleB
// 在app.json的分包属性subpackages数组中的对象中声明
"independent": "true" // 声明后当前分包成为独立分包
```

# 分包预下载

分包预下载限制:同一个分包中的页面享有共同的预下载大小限额2M

```json
// app.json
{
  preloadRule: { // 分包预下载规则
    "pages/contact/contact": { // 触发的路径
      // network: 在指定的环境下触发分包
      "network": "all", // 有值all和wifi,默认wifi
      "packages": ["packagesName"] // 预下载包的包名
    }
  }
}
```

# 在app.josn中配置tabBar的信息

```JavaScript
{ // 1.app.json中开启自定义tabBar
  "tabBar": {
    "custom": true // 自定义tabBar开启选项
    "list": [ // 需要保留,来保证低版本兼容以及区分哪些是tab页面
      {
        "pagePath": "page/component/index",
        "text": "组件"
      }, {
        "pagePath": "page/API/index",
        "text": "接口"
      }
    ]
  },
}
// 2.项目根目录下添加入口文件
custom-tab-bar/index.js
custom-tab-bar/index.json
custom-tab-bar/index.wxml
custom-tab-bar/index.wxss
```

# 初步实现自定义的tabBar效果

创建了`custom-tab-bar`文件并声明了`custom:true`后,原来的`tab`标签就会被`custom-tab-bar`的结构替换

```JavaScript
// 1.引入vant组件库,实现自定义tabBar,自定义部分使用slot实现
// 2.将app.json的tabBar.list数组数据复制到custom-tab-bar/index.js的data作为属性
// 3.vant-tabBar-item通过wx:for循环data.list的数据来渲染每一项tabBar
```

# 渲染tabBar上的数字图标

```vue
<!--custom-tab-bar/index.wxml-->
<!-- 模板部分 -->
<van-tabbar active="{{active}}" bind:change="onChange" active-color="#13A7A0">
	<van-tabbar-item wx:for="{{list}}" wx:key="index" info="{{item.info ? item.info : ''}}">
		<image slot="icon" src="{{item.iconPath}}" mode="aspectFit" style="width: 25px; height: 25px;" />
		<image slot="icon-active" src="{{item.selectedIconPath}}" mode="aspectFit" style="width: 25px; height: 25px;" />
		{{item.text}}
	</van-tabbar-item>
</van-tabbar>
```

```vue
<script>
  // custom-tab-bar/index.js
  component({
    options: {
      styleIsolation 'shared' // 必须要设置此项,下面的css样式覆盖才可以生效
    }
  })
</script>
```

```css
/* custom-tab-bar/index.wxml */
/* 修改vant的默认样式变量 */
.van-tabbar-item {
  --tabbar-item-margin-bottom: 0;
}
```

将`store`中的数据映射到组件中:参考视频或者官方文档

# 实现tabBar页面的切换效果

1. `redirectTo`:关闭当前页(卸载),跳转到指定页
2. `navigateTo`：保留当前页(隐藏),跳转到指定页
3. `switchTap`：只能用于跳转到`tabbar`页面,并关闭其他非`tabbar`页面,`tabbar`之间做切换

# 修改tabBar选中项目文本的颜色

参考`vant`官网文档

#  总结

`null`























