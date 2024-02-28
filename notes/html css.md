# Introduce

## 实体

多个空格默认会自动被浏览器解析为一个空格;

HTML中有时候,不能直接书写一些特殊符号;多个连续的空格,比如字母两侧的大于和小于号;

-比如:多个连续的空格,比如字母两侧的大于和小于号;

如果需要在网页中书写特殊的符号,则需要使用html中的**实体(转义字符)**;

实体的语法:

```html
&nbsp; 空格
&gt; 大于号
&lt; 小于号
&copy; 版权符号
<p>今天&nbsp;&nbsp;&nbsp;&nbsp;&gt;&lt;&copy; 天气真不错！</p>
```

## meta标签

meta主要用于设置网页中的一些元数据,元数据不是给用户看:

**charset 指定网页的字符集  **

**name 指定的数据的名称 **

**content 指定的数据的内容**

```html
<!--keywords表示网站的关键字,可以同时指定多个关键字,关键字间使用,隔开 -->
 <meta name="keywords" content="网购,网上购物,在线购物,网购网站">

<!-- description指定网站的描述,网站的描述会显示在搜索引擎的搜索的结果中 -->
<meta name="description" content="京东JD.COM-专业的综合网上购物商城,销售家电、数码通讯、电脑、家居百货、服装服饰、母婴、图书、食品等数万个品牌优质商品.便捷、诚信的服务,为您提供愉悦的网上购物体验!"/>

<title>Maaya</title><!-- title标签的内容会作为搜索结果的超链接上的文字显示 -->
<meta http-equiv="refresh" content="3;url=https://www.baidu.com"><!-- 将页面重定向到另外一个网站 -->  
```

## 语义化标签

### 标签意义

HTML负责网页的结构,在使用html标签时,应该关注的是标签的语义,而不是它的样式;

标题标签:

h1-h6一共有六级标题,从h1-h6重要性递减,h1最重要,h6最不重要,h1在网页中的重要性仅次于title标签,一般情况下一个页面中只会有一个h1,一般情况下标题标签只会使用到h1~h3,h4~h6很少用;

**标题标签都是块元素,在页面中独占一行的元素称为块元素(block element);**

```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
<hgroup><!-- hgroup标签用来为标题分组,可以将一组相关的标题同时放入到hgroup -->
  <h1></h1>
  <h2></h2>
</hgroup>
<p>我是一个块元素</p><!-- p标签表示页面中的一个段落,p也是一个块元素 -->
<p>今天天气<em>真</em>不错！</p><!-- em标签用于表示语音语调的一个加重在页面中不会独占一行的元素称为行内元素(inline element) -->
<p>你今天必须要<strong>完成作业</strong>！</p><!-- strong表示强调,重要内容！-->
鲁迅说:
<blockquote>这句话我是从来没有说过的！</blockquote><!-- blockquote表示一个长引用 -->
子曰<q>学而时习之,乐呵乐呵！</q><!-- q表示一个短引用 -->
<br><!-- br标签表示页面中的换行 --
<br>
<p>今天天气真不错</p>
```

### 块元素和行内元素

在块元素中放行内元素,不在行内元素中放块元素,块元素中基本上什么都能放,**p元素是块元素,但不能放任何的块元素;**

行内元素:对页面进行布局,用来包裹文字,高度和宽度只由内容决定,无法设置

浏览器解析网页时,会自动对网页中不符合规范的内容进行修正,比如:标签写在了根元素的外部,p元素中嵌套了块元素,根元素中出现了除head和body以外的子元素;

### 标签

```html
<div></div><!-- 没有语义,就用来表示一个区块,目前来讲div还是我们主要的布局元素 -->
<span></span> <!-- 行内元素,没有任何的语义,一般用于在网页中选中文字 -->
<header></header><!-- 表示网页的头部 -->
<main></main><!-- 表示网页的主体部分(一个页面中只会有一个main) -->
<footer></footer><!-- 表示网页的底部 -->
<nav></nav><!-- 表示网页中的导航 -->
<aside></aside><!-- 和主体相关的其他内容(侧边栏) -->
<article></article><!-- 表示一个独立的文章 -->
<section></section><!-- 表示一个独立的区块,上边的标签都不能表示时使用section -->
```

## 列表

 在html中可以创建列表,html列表一共有三种:unordered list;ordered list;definition list

```html
<!-- 无序列表,使用ul标签来创建无序列表,使用li表示列表项 -->
<ul>
	<li>结构</li>
	<li>表现</li>
	<li>行为</li>
</ul>
```

```html
<!-- 有序列表,使用ol标签来创建无序列表,使用li表示列表项 -->
<ol>
	<li>结构</li>
	<li>表现</li>
	<li>行为</li>
</ol>
```


```html
<!-- 定义列表,使用dl标签来创建一个定义列表 -->
<dl>
	<dt>结构</dt>
	<dd>结构表示网页的结构,结构用来规定网页中哪里是标题,哪里是段落</dd>
	<dd>结构表示网页的结构,结构用来规定网页中哪里是标题,哪里是段落</dd>
</dl>
<!-- 效果是 -->
结构
	结构表示网页的结构,结构用来规定网页中哪里是标题,哪里是段落
	结构表示网页的结构,结构用来规定网页中哪里是标题,哪里是段落
	结构表示网页的结构,结构用来规定网页中哪里是标题,哪里是段落
```

## 超链接

### a元素(标签)

超链接可以让我们从一个页面跳转到其他页面, 或者是当前页面的其他的位置;

**../表示上一级目录,../../表示上两级目录,./表示同级目录,/表示根目录**

```html
<a href="https://www.baidu.com">内部</a><!-- 可以是一个外部网站的地址,也可以写一个内部页面的地址 -->
<br><br>
<a href="07.列表.html">外部</a>
<a href="#bottom">去底部</a><!-- a的属性值# -->
<a href="#p3">p3指id</a>
<a href="#">这是一个新的超链接,可以直接跳转到本页面顶部</a><!-- 在开发中可以将#作为超链接的路径的展位符使用 -->
<a href="javascript:;">这是一个新的超链接</a><!-- 可以使用javascript:;来作为href的属性,此时点击这个超链接什么也不会发生 -->
```

### target

target属性,用来指定超链接打开的位置

```html
<!-- _self在当前页面打开超链接 -->
<a href="07.列表.html" target="_self">超链接</a>
<!-- _blank在一个新的页面打开超链接 -->
<a href="07.列表.html" target="_blank">超链接</a>
```

## 图片标签

img标签是一个自结束标签, img这种元素属于替换元素(块和行内元素之间,具有两种元素的特点)

```less
//src属性指定的是外部图片的路径,alt图片的描述,这个描述默认情况下不会显示,有些浏览器会图片无法加载时显示
<img src="./img/1.gif" alt="松鼠">
```

图片的格式:

jpeg(jpg):颜色丰富,不支持透明效果,不支持动图,用来显示照片;

gif:颜色较少,支持简单透明,支持动图,用来显示颜色单一的图片,动图;

png:颜色丰富,支持复杂透明,不支持动图, 专为网页而生

webp:谷歌推出专门用来表示网页中图片的一种格式,具备其他格式的所有优点,且文件特别小;但兼容性不好

base64:图片使用base64编码,将图片转换为字符,通过字符的形式来引入图片,一般是需要和网页一起加载的图片才会使用base64

## 内联框架

```html
<!-- 内联框架,用于向当前页面中引入一个页面,src指定要引入的网页的路径,frameborder指定内联框架的边框 -->
<iframe src="https://www.qq.com" width="800" height="600" frameborder="0"></iframe>
```

## 音频和视频

```html
<!-- audio(video)标签用来向页面中引入一个外部的音频文件的属性,默认是不允许用户控制播放停止
     1、controls 是否允许用户控制播放
     2、autoplay 音频文件是否自动播放
       - 如果设置了autoplay 则音乐在打开页面时会自动播放
       -但是目前来讲大部分浏览器都不会自动对音乐进行播放 
     3、loop 音乐是否循环播放
     4、src 引入指定外部文件 -->
<audio src="./source/audio.mp3" controls autoplay loop></audio>
<!--除了通过src来指定外部文件的路径以外,还可以通过source来指定文件的路径 -->
<audio controls>
   <source src="./source/audio.mp3">
</audio>
```

## 属性

**属性和标签名或其他属性应该使用空格隔开**

## 编码

```html
<!-- 可以通过meta标签来设置网页的字符集,避免乱码问题 -->
<meta charset="utf-8">
```

编码:李立超 → 110000110110 将字符转换为二进制码的过程称为编码;

解码:110000110110 → 李立超 将二进制码转换为字符的过程称为解码;

字符集(charset):编码和解码所采用的规则称为字符集;

# CSS

## CSS简介

**内部样式表:**将样式编写到head中的style标签里,通过**CSS的选择器**选中元素并为其设置各种样式,可以同时为多个标签设置样式,并且修改时只需要修改一处即可全部应用,内部样式表只对一个网页起作用;

**外部样式表:**将CSS样式编写到一个外部CSS文件中,通过**link**标签来引入至HTML的外部CSS文件;

**网页三部分:**结构(HTML),表现(CSS),行为(JavaScript);

**内联样式,行内样式:**在标签内部通过style属性来设置元素的样式;

```html
<div style="width:100px background-color:red"></div>
```



## CSS语法

```less
//CSS的基本语法:选择器 声明块
p{
  color: red;
  font-size: 40px;
}
```

## 常用选择器

```less
//元素选择器
p{
  color: red;
}
//id选择器
#Maaya{
  color: red
} 
//类选择器
.blue{
  color: blue;
}
//通配选择器
*{
  color: red;
}
//<body> <p id='maaya' class='blue'></p> <\body>

```

## 复合选择器

```less
//交集选择器:选中同时复合多个条件的元素,交集选择器中如果有元素选择器,必须使用元素选择器开头
div.red{
  font-size: 30px;
}
.a.b.c{
  color: blue
}
//并集选择器:同时选择多个选择器对应的元素,h1和span都被选中
h1,span{
  color: green
}
<body>
	<div class="red">我是红色</div>
	<p class="red">我是p元素</p>
	<div class="red2 a b c">我是多类</div>
	<h1>标题</h1>
	<span>行内元素</span>   
</body>
```

## 关系选择器

```less
//子元素选择器:选中指定父元素的指定子元素
div.box > span{
  color: orange;
} 
//后代元素选择器:选中指定元素内的指定后代元素
div span{
  color: skyblue
}
//选择下一个兄弟:前一个+下一个
p + span{
  color: red;
}
//选择下边所有的兄弟:兄~弟
p ~ span{
  color: red;
}
```

## 属性选择器

```css
/* [属性名] 选择含有指定属性的元素
[属性名=属性值] 选择含有指定属性和属性值的元素
[属性名^=属性值] 选择属性值以指定值开头的元素
[属性名$=属性值] 选择属性值以指定值结尾的元素
[属性名*=属性值] 选择属性值中含有某值的元素的元素 */
p[title]{}
p[title=abc]{}
p[title^=abc]{}
p[title$=abc]{}
<p title='abcdef'></p>
```

## 伪类选择器

伪类(不存在的类,特殊的类):伪类用来描述一个元素的**特殊状态**,第一个子元素、被点击的元素、鼠标移入的元素

伪类一般情况下都是使用 `:` 开头

`:first-child`

`:last-child`

`:nth-child()`

特殊值:n第n个,n的范围0到正无穷,2n或even表示选中偶数位的元素,2n+1或odd 表示选中奇数位的元素;

以上这些伪类都是根据**所有的子元素**进行排序;

这几个伪类的功能和上述的类似,不通点是他们是在**同类型元素**中进行排序;

`:first-of-type`

`:last-of-type`

`:nth-of-type( )`

```less
//:first-child( )选中li的第一个子元素;
ul > li:first-child{
	color: red;
}
//:last-of-type( )选中li的最后一个元素;
ul > li:last-child{
	color: red;
}
//:last-child( )选中li的最后一个子元素;
ul > li:last-child{
	color: red;
}
//:not( ) 否定伪类,将符合条件的元素从选择器中去除;
ul > li:not(:nth-of-type(3)){
  color: yellowgreen;
}
<body>
    <ul>
        <span>我是一个span</span>
        <li>第〇个</li>
        <li>第一个</li>
        <li>第二个</li>
        <li>第三个</li>
        <li>第四个</li>
        <li>第五个</li>
    </ul>
</body>
```

## a元素的伪类

伪类使用:开头

```less
//:link 用来表示没访问过的链接(正常的链接)
a:link{
	color: red;   
}
//:visited 用来表示访问过的链接,由于隐私的原因,所以visited这个伪类只能修改链接的颜色
a:visited{
	color: orange; 
	//font-size: 50px; 不行
}
//:hover 用来表示鼠标移入的状态
a:hover{
	color: aqua;
	font-size: 50px;
}
//:active 用来表示鼠标点击
a:active{
	color: yellowgreen;         
}
```

## 伪元素选择器

伪元素,表示页面中一些特殊的并不真实的存在的元素(**特殊的位置**),伪元素使用::开头

before和after必须结合content属性来使用

```less
//表示第一个字母
p::first-letter{
	font-size: 50px;
}
//表示第一行
p::first-line{
	background-color: yellow; 
}
//表示被选中的内容
p::selection{
	background-color: greenyellow;
}
//表示元素的开始
div::before{
	content: '(';
}
//表示元素的结束
div::after{
	ontent: ')';
}
```

## 样式的继承

我们为一个元素设置的样式同时也会应用到它的后代元素上;但不是所有的样式都会被继承,比如背景相关的,布局相关等的这些样式都不会被继承

## 选择器的权重

当通过不同的选择器,选中相同的元素,并且为相同的样式设置不同的值时,此时就发生样式的冲突。

发生样式冲突时,应用哪个样式由选择器的权重(优先级)决定

- 内联样式       1,0,0,0

- id选择器       0,1,0,0

- 类和伪类选择器  0,0,1,0

- 元素选择器     0,0,0,1

- 通配选择器     0,0,0,0

- 继承的样式     没有优先级


比较优先级时,需要将所有的选择器的优先级进行相加计算,最后优先级越高,则越优先显示(分组选择器是单独计算的),选择器的累加不会超过其最大的数量级,类选择器在高也不会超过id选择器,如果优先级计算后相同,此时则优先使用靠下的样式

可以在某一个样式的后边添加 `!important `,则此时该样式会获取到**最高**的优先级,甚至超过内联样式,在开发中要慎用！

```css
.d1{
	 background-color: purple !important;
}
```

## 单位

- 长度单位:像素、百分比、em、rm

- 百分比:将属性值设置为相对于其父元素属性的百分比,可以使子元素跟随父元素属性的改变而改变

- 1em = 1font-size

- rem:相对于根元素的字体大小来计算


## 颜色单位

1. RGB值:

   - R red,G green,B blue,语法:RGB(红色,绿色,蓝色)
   
   - 每一种颜色的范围在0-255(0%-100%) 之间
   
   - ```less
     test{
       background-color: rgb(255, 0, 0);
     }
     ```
   
2. RGBA:

   - 就是在RGB的基础上增加了一个A表示不透明度

   - 1表示完全不透明,0表示完全透明,.5半透明

   - ```less
     test{
       background-color: rgba(17, 20, 16, 0.5);
     }
     ```

3. 十六进制的RGB值:

   - 语法:#红色绿色蓝色

   - 颜色浓度通过 00-ff

   - 如果颜色两位两位重复可以进行简写,#aabbcc --> #abc

   - ```less
     test{
       background-color: #ff0000;
     }
     ```

4. HSLA值:

   - H:色相(0-360),S:饱和度,颜色的浓度0% -100%,L:亮度,颜色的亮度0%-100%

   - ```less
     test{
        background-color: hsla(98, 48%, 40%, 0.658);
     }
     ```

# layout

## 文档流

文档流(normal flow):网页是一个多层的结构,一层摞着一层,作为用户来讲只能看到最顶上一层,这些层中,最底下的一层称为文档流,文档流是网页的基础,我们所创建的元素默认都是在文档流中进行排列;

元素主要有两个状态:在文档流中,不在文档流中(脱离文档流);

元素在文档流中有什么特点:

- 块元素
  - **块元素会在页面中独占一行(自上向下垂直排列)**
  - **默认宽度是父元素的全部(会把父元素撑满)**
  - **默认高度是被内容撑开(子元素)**

- 行内元素
  - 行内元素不独占页面的一行,只占自身的大小
  - 行内元素在页面从左向右水平排列,如果一行容纳不下所有的行内元素则元素会换到第二行继续自左向右排列
  - 行内元素的默认宽度和高度被内容撑开(子元素)

## 盒模型

每一个盒子都由以下几个部分组成:

1. 内容区(content)

2. 内边距(padding)

3. 边框(border)

4. 外边距(margin)


内容区(content),元素中的所有的子元素和文本内容都在内容区中排列,内容区的大小由width和 height两个属性来设置:

1. width设置内容区的宽度

2. height设置内容区的高度    


边框(border),边框属于盒子边缘,边框里边属于盒子内部,出了边框都是盒子的外部,边框的大小会影响到整个盒子的大小,要设置边框,需要至少设置三个样式:

1. border-width

2. border-color

3. border-style

盒子可见框大小:由内容区,内边距和,边框共同决定;在计算盒子大小时,要将三个区域加到一起计算

```less
div{
  border: red 10px solid
}
```

## 盒模型_边框

边框的大小会影响到整个盒子的大小,border-width可以用来指定四个方向的边框的宽度值的情况:

- 四个值:上 右 下 左

- **三个值:上 左右 下**

- 两个值:上下 左右

- 一个值:上下左右


border-style指定边框的样式:

- solid表示实线

- dotted点状虚线

- dashed虚线

- double双线

border-color指定边框的颜色

```less
border{
  border-top: red 10px solid
}
```

## 盒模型_内边距

padding:内容区和边框之间的距离是内边距,边距会影响到盒子的大小,背景颜色会延伸到内边距上

```less
test{
  //padding是padding-width的缩写,书写规则和border-width一样
  padding:10px 20px 10px
}
```

## 盒模型_外边距

- margin:外边距不会影响盒子可见框的大小,但是会影响盒子的位置,外边距会影响到盒子实际占用空间

- margin-top:上外边距,设置一个正值,元素会向下移动

- margin-right:右外边距,默认情况下设置元素不会产生任何效果

- **margin-bottom:下外边距,设置一个正值,元素会向下移动**

- margin-left:左外边距,设置一个正值,元素会向右移动

- ```less
  test{
    //margin是margin-width的缩写,书写规则和border-width一样
    margin:10px 20px 10px
  }
  ```

## 盒子的水平布局

一个元素在其父元素中,水平布局必须要满足以下的等式:

margin-L+border-L+padding-L+width+padding-R+border-R+margin-R=父元素内容区的宽度

以上等式必须满足,如果相加结果使等式不成立,则称为**过度约束**,等式会自动调整,如果这七个值中没有auto的情况,则浏览器会自动调整margin-right值以使,满足,这七个值中有三个值可设置为auto:

- width

- margin-left

- margin-right

**width**为**100%**和**auto**是两个不同的概念,当width为100%时,padding在窗口最左边,内容区width占据整个窗口的大小,被padding占据了部分空间,所以width会超出窗口,产生滚动条的情况;auto则是padding占据窗口左右两侧空间,剩余的为width

- 宽度和一个外边距设置为auto,宽度会调整到最大,设置为auto的外边距自动为0
- 三个值设置为auto,外边距都是0,宽度最大
- 两个外边距设置为auto,宽度固定值,外边距设置为相同的值,于是居中

## 垂直方向的布局

子元素是在父元素的内容区中排列的,如果子元素的大小超过了父元素,则子元素会从父元素中溢出;

使用overflow(overflow-x)(overflow-y) 属性来设置父元素如何处理溢出的子元素,可选值:

- visible:默认值,子元素会从父元素中溢出,在父元素外部的位置显示

- hidden:溢出内容将会被裁剪不会显示

- scroll:生成两个滚动条,通过滚动条来查看完整的内容

- auto:根据需要生成滚动条

```less
//默认情况下父元素的高度被内容撑开
.outer{
	background-color: #bfa;
	height: 100px;
}
.inner{
	width: 100px;
	background-color: yellow;
	height: 200px;
	margin-bottom: 100px;
  overflow: auto;
}
<div class="outer">
	<div class='inner'></div>
</div>
```

## 外边距的折叠

**垂直**外边距的重叠(折叠),相邻的垂直方向外边距会发生重叠现象

- 兄弟元素:兄弟元素间的相邻垂直外边距会取两者之间的较大值(两者都是正值)
- 特殊情况:
  - 如果相邻外边距一正一负,则取两者的和(一个远离,一个靠近)
  - 如果相邻外边距都为负值,则取两者中绝对值较大的(相互排斥远离)
- 父子元素
  - 父子元素间相邻外边距,子元素的会传递给父元素(上外边距)
  - 父子外边距的折叠会影响到页面的布局,必须要进行处理

## 行内元素的盒模型

 行内元素不支持设置宽度和高度,但border,margin,padding都可以设置,垂直方向的这三个属性不会影响页面的布局;

- display用来设置元素显示的类型,可选值:
  - inline:行内元素,
  - block:块元素,
  - inline-block:行内块元素 (既能设置宽度又能设置高度,也不会独占一行),
  - table:元素设为表格,
  - none:元素不在页面中显示
- visibility用来设置元素的显示状态,可选值:
  - visible:默认值,元素在页面中正常显示
  - hidden:元素在页面中隐藏不显示,但是依然占据页面的位置

```less
p{
	dispaly:inline-block;
	visibility:visible;
}
```

## 默认样式

重置样式表:专门用来对浏览器的样式进行重置的

- reset.css 直接去除了浏览器的默认样式

- normalize.css 对默认样式进行了统一


## 盒子的尺寸

box-sizing用来设置盒子尺寸的计算方式(设置width和height的作用)

- content-box默认值,宽度和高度用来设置内容区的大小

- border-box宽度和高度用来设置整个盒子可见框的大小


width和height指的是内容区和内边距和边框的总大小

```less
.box1{
  width:100px
  height:100px
  box-sizing:boder-box
}
```

## 轮廓和圆角

box-shadow用来设置元素的阴影效果,阴影不会影响页面布局 

```less
// 值的效果:水平偏移量 垂直偏移量 阴影的模糊半径 阴影的颜色
p{
	box-shadow: 0px 0px 50px rgba(0, 0, 0, .3) ;       
}
```

outline用来设置元素的轮廓线,用法和border一模一样,轮廓和边框不同的点,就是轮廓不会影响到可见框的大小 ;

```less
p{
	outline: 10px red solid;      
}
```

border-radius: 用来设置圆角 圆角设置的圆的半径大小;

```less
p{
	//border-radius 可以分别指定四个角的圆角
	border-top-left-radius:50px 100px;
	//将元素设置为一个圆形
	border-radius: 50%;
}
```

# float

## 浮动简介

浮动:元素设置浮动后,水平布局等式不需要强制成立

特点:

1. **浮动元素会完全脱离文档流,不再占据文档流中的位置,元素下仍在文档流中的元素会自动上移**
2. 使一个元素向其父元素的左侧或右侧移动
3. **浮动元素默认不会从父元素中移出**
4. 下边的还在文档流中的元素会自动向上移动
5. 浮动元素向左或向右移动时,不会超过它前边的其他浮动元素
6. **如果浮动元素的上边是一个没有浮动的块元素,则浮动元素无法上移(应为上面的位置被占据了)**
7. 浮动元素不会超过它上边的浮动的兄弟元素,最多最多就是和它一样高

## 浮动其它的特点

浮动元素不会盖住文字,文字会自动环绕在浮动元素的周围,所以我们可以利用浮动来设置文字环绕图片的效果

元素设置浮动以后,会从文档流中脱离,脱离后,元素的一些特点会发生变化,脱离文档流的特点:

1. 块元素:
   - 块元素不再独占页面的一行
   - 脱离文档流以后,块元素的宽度和高度默认都被内容撑开
2. 行内元素:
   - 行内元素脱离文档流以后会变成块元素,特点和块元素一样
   - 脱离文档流以后,不需要再区分块和行内了

## 网页的布局

## 高度塌陷的问题

BFC(Block Formatting Context)块级格式化环境,BFC是一个CSS中的一个隐含的属性,可以为一个元素开启BFC,开启BFC该元素会变成一个独立的布局区域

- 元素开启BFC后的特点:
  - 1.开启BFC的元素不会被浮动元素所覆盖(只有行内元素会被覆盖?)
  - 2.开启BFC的元素子元素和父元素外边距不会重叠
  - 3.开启BFC的元素可以包含浮动的子元素
- 可以通过一些特殊方式来开启元素的BFC
  - 设置元素的浮动(不推荐)
  - 将元素设置为行内块元素(不推荐)
  - 将元素的overflow设置为一个非visible的值
  - 常用的方式为元素设置overflow:hidde开启其BFC以使其可以包含浮动元素

-  高度塌陷的问题:
  - 在浮动布局中,父元素的高度默认是被子元素撑开的,
  - 当子元素浮动后,其会完全脱离文档流,子元素从文档流中脱离
  - 将会无法撑起父元素的高度,导致父元素的高度丢失
  - 父元素高度丢失以后,其下的元素会自动上移,导致页面的布局混乱
  - 所以高度塌陷是浮动布局中比较常见的一个问题,这个问题我们必须要进行处理!

## BFC

## clear

由于box1的浮动,导致box3位置上移,也就是box3收到了box1浮动的影响,位置发生了改变

不希望某个元素因为其他元素浮动的影响而改变位置,可以通过clear属性来清除浮动元素对当前元素所产生的影响

```less
//测试浮动是否会导致子元素脱离父元素,并且覆盖其它元素,
div{
  width:100px;
  height:100px;
}
.box1{
  float:left;
}
.box2{
  float:right;
}
.box3{
  clear:both;
}
```

## 高度塌陷的最终解决方案(需看视频复习)

```less
.box1{
  border:1px solid red;
}
.box2{ 
	width: 100px;
	height: 100px;
	background-color: #bfa;
	float: left;
}
.box1::after{
  content:'';
  display:block;
  clear:both;
}
```

## clearfix(需看视频复习)

clearfix可以同时解决高度塌陷和外边距重叠的问题,当遇到这些问题时,直接使用clearfix这个类

# position

## 定位的简介

通过定位可以将元素摆放到页面的任意位置,可选属性值:

- static默认值,元素是静止的没有开启定位
- relative开启元素的相对定位
- absolute开启元素的绝对定位
- fixed开启元素的固定定位
- sticky开启元素的粘滞定位

相对定位的特点:

- 元素开启相对定位后,如果不设置偏移量元素不会发生任何的变化
- 相对定位是参照于元素在文档流中的位置进行定位的
- 相对定位会提升元素的层级
- 相对定位不会使元素脱离文档流
- 相对定位不会改变元素的性质,块还是块,行内还是行内

偏移量(offset):元素开启了定位以后,可以通过偏移量来设置元素的位置

top:定位元素和定位位置上边的距离

bottom:定位元素和定位位置下边的距离

left:定位元素和定位位置的左侧距离

right:定位元素和定位位置的右侧距离

定位元素水平和垂直方向的位置由两个属性控制,通常情况下只会使用一个(左右和上下)

```less
div{
  position:relative;
  left:10px;
  right:10px;
}
```

## 绝对定位

绝对定位的特点:

- 开启绝对定位后,如果不设置偏移量元素的位置不会发生变化
- 开启绝对定位后,元素会从文档流中脱离
- 绝对定位会改变元素的性质,行内变成块,块的宽高被内容撑开
- 绝对定位会使元素提升一个层级
- 绝对定位元素是相对于其包含块进行定位的

包含块(containing block)

- 正常情况下:包含块是离当前元素最近的祖先块元素
- 绝对定位的包含块:包含块是离它最近的开启了定位的祖先元素,如果所有的祖先元素都没有开启定位则根元素就是它的包含块,如html(根元素,初始包含块)

```less
//box1是box2的祖先元素
.box1{
  position:relative;
}
.box2{
  position:absolute;
}
```

## 固定定位

固定定位:固定定位也是一种绝对定位,所以大部分特点和绝对定位一样,唯一不同的是固定定位永远参照于浏览器的视口进行定位,固定定位的元素不会随网页的滚动条滚动

```less
div{
	position:fixed;
}
```

## 粘滞定位

粘滞定位:粘滞定位和相对定位的特点基本一致,不同的是粘滞定位可以在元素到达某个位置时将其固定

```less
div{
  margin:500px auto;
  position:sticky;
  top:10px
}
test{
  height:100px;
  line-height:100px;//文字居中
  text-decoration:none;//去除下划线
}
```

## 绝对定位元素的布局

当我们开启了绝对定位后:水平方向的布局等式需要添加left和right两个值,此时规则和之前一样只是多添加了两个值;

当发生过度约束:如果9个值中没有auto则自动调整right值以使等式满足,如果有auto,则自动调整auto的值以使等式满足;

可设置auto的值:margi,width,left,right,因为left和right的值默认是auto,所以如果不指定left和right,则等式不满足时,会自动调整这两个值;

垂直方向等式:top+margin-top/bottom+padding-top/bottom+border-top/bottom+height=包含块的高度

## 元素的层级

开启了定位的元素,可以通过z-index属性来指定元素的层级

z-index需要一个整数作为参数,值越大元素的层级越高,元素的层级越高越优先显示,如果元素的层级一样,则优先显示靠下的元素,祖先的元素的层级再高也不会盖住后代元素

```less
div{
  z-index:999;
}
```

# font&background

## 字体

`@font-face`将服务器中的字体直接提供给用户去使用

```less
@font-face{//添加字体
  font-family:'myfont';
  src:url('./font/ZCOOLKuaiLe-Regular.ttf')format("truetype");//设置路径以及符号格式(存疑)
}
p{
  font-family:myfont
}
```

## 图标字体

fontawesome 使用步骤

1. 下载 https://fontawesome.com/
2. 解压
3. 将css和webfonts移动到项目中
4. 将all.css引入到网页中
5. 使用图标字体
6. 直接通过类名来使用图标字体

```html
 <i class="fas fa-bell-slash"></i>
```

## 图标字体

```less
div{
  content:'\f1b0';//直接在CSS中添加图标字体
}
<span class='fas'>&#xf0f3;</span>//
```

## 阿里的字体库

## 行高

可以将行高设置为和高度一样的值,使单行文字在一个元素中垂直居中

行高(line-height):行高指的是文字占有的实际高度,行高可以直接指定一个大小(px em),也可以直接为行高设置一个整数(行高将会是字体的指定的倍数)

行高经常还用来设置文字的行间距:行间距=行高-字体大小

```less
#css{
  line-height:20px;
  line-height:2;
}
```

## 字体的简写属性

font可以设置字体相关的所有属性语法:font:字体大小/行高,字体族;行高可以省略不写,如果不写使用默认值

```less
//font-weight: bold;字重,字体的加粗,可选值normal,bold
//font-style:字体的风格,可选值noramal,intalize(斜体)
//font-family: 'Times New Roman', Times, serif;
//font-weight: bold;
font: bold italic 50px/2  微软雅黑, 'Times New Roman', Times, serif;
```

## 文本的样式

```less
#css{
  text-align:justify;//文本的水平对齐,可选值left,right,center,justify
  vertical-align:middle;//设置元素垂直对齐的方式,可选值baseline,top,bottom,middle
}
```

## 文本的样式1

设置文本修饰text-decoration,可选值underline,overline,line-through,none

```less
#css{
  text-decoration:none;
  text-overflow:ellipsis;
  white-space:pre;
  overflow:hidden
}
```

## 背景

1. background-color:设置背景颜色
2. background-image:设置背景图片
   - 可以同时设置背景图片和背景颜色,这样背景颜色将会成为图片的背景色
   - 如果背景的图片小于元素,则背景图片会自动在元素中平铺将元素铺满
   - 如果背景的图片大于元素,将会一个部分背景无法完全显示
   - 如果背景图片和元素一样大,则会直接正常显示
3. background-repeat:设置背景的重复方式
4. background-position:设置背景图片的位置

```less
#css{
  background-color:blue;
  background-image:url('./img/1.png');
  background-repeat:repeat-x;//可选值repeat,repeat-x,repeat-y,no-repeat
  background-position;left top;//1)通过top,left,right,bottom,center几个方位词设置图片位置,方位词必须指定两个值,只写一个则第二个默认center;2)通过偏移量来指定背景图片的位置,水平方向的偏移量,垂直方向变量
}
```

## 背景1

backgound:背景相关的简写属性,所有背景相关的样式都可以通过该样式来设置,并且该样式没有顺序要求,也没有哪个属性是必须写的,注意,size要写在position后面position/size,origin要在clip前面

- background-color
- background-image
- background-repeat
- background-position
- background-size
- background-origin
- background-clip
- background-attachment

```less
#css{
  background-clip:border-box;//背景的范围:可选值border-box,padding-box,content-box
  background-origin:border-box;//背景图片的偏移量计算的原点:可选值content-box,padding-box,border-box
  background-size:-50px,50px;//背景图片的大小:两个数值或者contain&cover
  background-attachment:scroll;//背景图片是否跟随元素移动:scoll,fixed
  background:url('./img') blue left center/contain content-box;
}
```

## 渐变

 渐变可以设置复杂的背景颜色,实现从一个颜色向其他颜色过渡的效果,渐变是图片,通过background-image来设置

```less
#css{
  background-image:linear-gradient(to right,red,green,blue);//渐变的开头可以指定一个渐变的方向:to left,to right,to bottom,to top,deg(度数),turn(圈)
  background-image: linear-gradient(red 50px,yellow 100px,green 120px,orange 200px);//渐变指定多个颜色,颜色可平均分布也可手动指定分布情况
  background-image: repeating-linear-gradient(to right ,red, yellow 50px);//可平铺的线性渐变
}
```

## 径向渐变

默认径向渐变的形状根据元素的形状来计算的:正方形-->圆形,长方形-->椭圆形

语法:radial-gradient(大小 at 位置,颜色 位置,颜色 位置,颜色 位置)

大小:circle圆形,ellipse椭圆,closest-side近边,closest-corner近角,farthest-side远边farthest-corner远角

```less
#css{
	background-image: radial-gradient(farthest-corner at 100px 100px, red , #bfa)
}
```

# HTML

## 表格

合并单元格的本质并不是合并而是创建

```html
<table border='1' width='50%' align='center'>
  <tr><!--在table中使用tr表示表格中的一行,有几个tr就有几行-->
    <td>A1</td><!--在tr中使用td表示一个单元格,有几个td就有几个单元格-->
    <td>B1</td>
    <td>C1</td>
  </tr>
  <tr>
    <td>A2</td>
    <td>B2</td>
    <td>C2</td>
    <td rowspan="2">D2</td><!--rowspan纵向的合并单元格-->
  </tr>
  <tr>
    <td>A3</td>
    <td>B3</td>
    <td>C3</td>
  </tr>
  <tr>
    <td>A4</td>
    <td>B4</td>
    <td colspan="2">C4</td><!--colspan横向的合并单元格-->
  </tr>
</table>
```

## 长表格

可以将一个表格分成三个部分:头部thead,主体tbody,底部tfoot

```html
<table boder='1' width='50%' align='center'>
  <thead>
    <tr>
      <th>如月</th><!-->th表示头部的单元格<-->
      <th>真绫</th>
      <th>姐姐</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
   	  <td>1</td>
      <td>1</td>
    </tr>
    <tr>
      <td>1</td>
   	  <td>1</td>
      <td>1</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>1</td>
   	  <td>1</td>
      <td>1</td>
    </tr>
  </tfoot>
</table>
```

## 表格的样式

```less
box1{
  width:100px;
  height:100px;
  background-color:blue;
  vertical-align:middle;
  display:table-cell;//将元素设置为单元格
}
box2{
  width:10px;
  height:10px;
  margin:0 auto;
  background-color:white;
}
table{
  width:50%;
  border:1px solid black;
  border-collapse:collapse;//
  margin:0 auto;
}
td{
  border:1px solid black;
  height:100px;
  vertical-align:middle;
  text-align:center
}
tbody>tr:nth-child(odd){
  background-color:white;//表格中没使用tbody而直接用tr,那么浏览器自动创建一个tbody,并将tr全都放到tbody中,tr不是table的子元素而是tobody的子元素
}
```

## 表单

元素form:创建一个表单,用来将本地的数据提交给远程的服务器

```html
<form action='target.html'><!--属性action:表单要提交的服务器的地址-->
  文本框<input type='text' name='username'><!--数据要提交到服务器中,必须为元素指定一个name属性-->
  <br><br>
  密码框<input type='password' name='password'><!--type的书写是有规定的要求的-->
  <br><br>
  单选框<input type='radio' name='hello' value='1'><!--input是行内元素-->
  <input type='radio' name='hello' value='1' checked><!--checked表示已被选定-->
  多选框<input type='checkbox' name='hello' value='1' checked>
  <input type='checkbox' name='hello' value='2' checked>
  <input type='checkbox' name='hello' value='3' checked>
  下拉列表<select name='haha'>
  	<options value='1'>选项一</options>
  	<options value='2' selected>选项一</options><!--selected属性表示预选值-->
  	<options value='3'>选项一</options>
  </select>
  提交按钮<input type='submit' value='注册'>
</form>
```

## 表单1

```html
<form action>
	<input type="text" name="username" value="hello" readonly>
	<input type="text" name="username" disabled>
	<input type="text" name="username" autofocus>
  <input type="color">
  <input type="email">
  <input type="reset"><!--重置按钮-->
  <input type="button" value="按钮"><!--普通按钮-->
</form>
```

# animation

## 过度

过渡(transition):通过过渡可以指定一个属性发生变化时的切换方式,创建好的效果,提升用户体验

transition-timing-function过渡函数可选值:

1. ease默认值:慢速开始,先变速,在加速
2. linear:匀速运动
3. ease-in:加速运动
4. ease-out:减速运动
5. ease-in-out:先加速 后减速
6. cubic-bezier():来指定时序函数https://cubic-bezier.com
7. steps():分步执行过渡效果

```less
.div{
    margin-left:0px;
}
.box2{
  transition-property:all,weight;//指定要执行过渡的属性,多个属性要用','隔开,如全部属性都要过渡则用all,并且过渡须是从一个有效数值向另外一个有效数值进行过渡
  transition-duration:2s;//指定过渡效果的持续时间;
  transition-timing-function:ease;//过渡的时序函数
  transition-timing-function:step(2,start);//分步执行过渡效果
  transition-delay:3s;//过渡效果的延迟,等待一段时间后在执行过渡
  transition:2s margin-left 1s cubic-bezier(.24,.95,.82,-0.88);//transition可以同时设置过渡相关的所有属性,只有一个要求,如果要写延迟,则两个时间中第一个是持续时间,第二个是延迟
}
.box3{
    transition-poperty:all;
}
.box1:hover div{
    margin-left:700px
}

<div class="box1">
	<div class="box2"></div>
	<div class="box3"></div>
</div>
```

## 动画

```less
@keyfarmes Maaya{//设置关键帧
  from{
    margin-left:0;//可以设置为百分比,也可以是具体位置的数值
    background-color:blue;
  }
  to{
    margin-left:80%;
    background-color:yellow;
  }
}
#css1{
  animation-name:Maaya;//要对当前元素生效的关键帧的名字
  animation-duration:4s;//动画的执行时间
  animation-delay:2;//动画的延时
  animation-iteration-count:2;//动画执行的次数:2次,infinite无限次
  animation-timing-function: ease-in-out;//时间函数
  animation-direction: alternate-reverse;//指定动画运行的方向:normal默认(from-to),reverse(to-from),alternate(from-to后又从to-from),alternate-reverse(to-from后又从from-to)
  animation-fill-mode:forwards;;//动画的填充模式
}
.box1:hover{
    animation-play-state:paused;//设置动画的执行状态,running默认值
}
```

## 动画1

```less
@keyfarme maaya{
  from{
    margin-top:0
  },
  to{
    margin-top:400
  }
}
.outer{
  height:500px;
  border-bottom:10px solid black;
  margin:50px auto
}
.outer div{
  animation:maaya .5s forwards linear infinite alternate;
  float:left;
  border-radius:50%
}
div.box1{
  background-color:blue;
  animation-delay:.1s
}
```

## 变形

变形:指通过CSS来改变元素的形状或位置,但不影响页面的布局

transform:用来设置元素的变形效果

```less
.box1{
    transform: translateX(100%);//translateX()沿着x轴方向平移,还有translateY(),translateZ(),平移元素,如果计量单位是百分比,则百分比是相对于自身大小计算的
}
.box2{
    postion:absolute;
    left:50%;
    top:50%;
    transform:translateX(-50%),translateY(-50%)//此时因为left,top各平移50%,所以字体是从50%开始的,如果要居中,则将字体各平移回50%
}
```

## z轴平移

z轴平移:调整元素在z轴的位置,正常情况就是调整元素和人眼之间的距离,距离越大,元素离人越近

z轴平移属于立体效果(近大远小),默认情况下网页是不支持透视,如果需要看见效果必须要设置网页的视距

```less
html{
	perspective: 800px;/* 设置当前网页的视距为800px,人眼距离网页的距离 */
}
body:hover .box1{
	transform: translateZ(8000px);
}
```

## 旋转

通过旋转可以使元素沿着x轴,y轴或z轴旋转指定的角度

```less
#css{
    transform:rotateZ(45deg)//旋转45度
    transform:rotateZ(1turn)//旋转1圈
}
```

## 缩放

变形的原点是默认值 center

```less
#css{
    transform-origin:20px 20px;//从20,20开始缩放
    transform-origin:scale(2);//scaleX()水平方向缩放,scaleY()垂直方向缩放,scale()方向的缩放
}
```

# less

## less的简介

less是一门css的预处理语言

1. less是一个css的增强版,通过less可以编写更少的代码实现更强大的样式
2. 在less中添加了许多的新特性:像对变量的支持,对mixin的支持...
3. less的语法大体上和css语法一致,但是less中增添了许多对css的扩展
4. 所以浏览器无法直接执行less代码,要执行必须向将less转换为css,然后再由浏览器执行

## less的语法

通过视频复习

# flex

## 弹性盒

flex(弹性盒,伸缩盒)是CSS中的又一种布局手段,它主要用来代替浮动来完成页面的布局

flex可以使元素具有弹性,让元素可以跟随页面的大小的改变而改变

弹性容器:要使用弹性盒,必须先将一个元素设置为弹性容器

弹性元素:弹性容器的子元素是弹性元素(弹性项),弹性元素可以同时是弹性容器

**flex-direction可选值:默认值row,弹性元素在容器中水平排列(左向右),row-reverse弹性元素在容器中反向水平排列(右向左),以及column自上向下,column-reverse自下向上**

```less
#css{
    display:flex;//通过display来设置弹性容器,这是设置为块级弹性容器
    display:inline-flex://设置为行内的弹性容器
    flex-direction:row;//指定容器中弹性元素的排列方式
}
#css > div{//这两个样式一般用在弹性容器内的元素上
    flex-grow: 1;//指定弹性元素的伸展的系数,当父元素有多余空间的时,子元素如何伸展,父元素的剩余空间会按照比例进行分配
    flex-shrink:0.5;//指定弹性元素的收缩的系数,当父元素中的空间不足以容纳所有的子元素时,如果对子元素进行收缩
}
```

## 弹性容器的样式

**justify-content可选值:**

1. **flex-start:元素沿着主轴起边排列**
2. **flex-end:元素沿着主轴终边排列**
3. **center:元素居中排列**
4. **space-around:空白分布到元素两侧**
5. **space-between:空白均匀分布到元素间**
6. **space-evenly:空白分布到元素的单侧**

```less
#css{
    flex-direction: row;
    flex-wrap: wrap;//设置弹性元素是否在弹性容器中自动换行,可选值:nowrap默认值,元素不自动换行,wrap元素沿辅轴方向自动换行,wrap-reverse元素沿着辅轴反方向换行
    flex-flow: row wrap;//是wrap和direction的合并简写属性 
    justify-content:center//如何分配主轴上的空白空间(主轴上的元素如何排列)
}
```

## 弹性容器的样式1

**align-items可选值:**

1. **stretch:默认值,将元素的长度设置为相同的值**
2. **flex-start:元素不会拉伸,沿着辅轴起边对齐**
3. **flex-end:沿着辅轴的终边对齐**
4. **center:居中对齐**
5. **baseline:基线对齐**

```less
#css{
    align-items: flex-start;//定义元素在辅轴上如何对齐
    align-content:space-between;//辅轴空白空间的分布
    
}
#css > li{
    align-self:stretch//用来覆盖当前弹性元素上的align-items
}
```

## 弹性容器的样式2

**flex-basis:指定的是元素在主轴上的基础长度**

1. **如果主轴是横向的则该值指定的就是元素的宽度**
2. **如果主轴是纵向的则该值指定的是就是元素的高度**
3. **默认值是auto,表示参考元素自身的高度或宽度**
4. **如果传递了一个具体的数值,则以该值为准**

```less
#css{// flex样式可以设置弹性元素所有的三个样式,即flex:增长 缩减 基础;
    flex: initial;//相当于flex: 0 1 auto
    flex:auto;//"flex: 1 1 auto"
    flex:none;//"flex: 0 0 auto"弹性元素没有弹性
}
#css > li{
    order:2;//可以决定弹性元素的排列顺序
}
```

## 像素

像素:屏幕是由一个一个发光的小点构成,这一个个的小点就是像素

1. 分辨率:1920×1080说的就是屏幕中小点的数量
2. 在前端开发中像素要分成两种情况讨论:CSS像素和物理像素
3. 物理像素:上述所说的小点点就属于物理像素
4. CSS像素:编写网页时,我们所用像素都是CSS像素
5. 浏览器在显示网页时,需要将CSS像素转换为物理像素然后再呈现
6. 一个css像素最终由几个物理像素显示,由浏览器决定:
7. 默认情况下在pc端,一个css像素 = 一个物理像素

视口(viewport)

1. 视口就是屏幕中用来显示网页的区域
2. 可以通过查看视口的大小,来观察CSS像素和物理像素的比值
3. 默认情况下:视口宽度 1920px(CSS像素),1920px(物理像素),此时,css像素和物理像素的比是 1:1
4. 放大两倍的情况:视口宽度 960px(CSS像素),1920px(物理像素),此时,css像素和物理像素的比是1:2
5. 我们可以通过改变视口的大小,来改变CSS像素和物理像素的比值

## 移动端

在不同的屏幕,单位像素的大小是不同的,像素越小屏幕会越清晰

智能手机的像素点远远小于计算机的像素点

问题:一个宽度为900px的网页在iphone6中要如何显示呢？

默认情况下,移动端的网页都会将视口设置为980像素(css像素)以确保pc端网页可以在移动端正常访问,但是如果网页的宽度超过了980,移动端的浏览器会自动对网页缩放以完整显示网页https://material.io/resources/devices/

为了解决这个问题,大部分网站都会专门为移动端设计网页

## 移动端页面

移动端默认的视口大小是980px(css像素),默认情况下,移动端的像素比就是980/移动端宽度(980/750)

如果我们直接在网页中编写移动端代码,这样在980的视口下,像素比是非常不好,导致网页中的内容非常非常的小,

编写移动页面时,必须要确保有一个比较合理的像素比:

1. 1css像素对应2个物理像素
2. 1css像素对应3个物理像素

可以通过meta标签来设置视口大小,每一款移动设备设计时,都会有一个最佳的像素比,一般我们只需要将像素比设置为该值即可得到一个最佳效果,将像素比设置为最佳像素比的视口大小我们称其为完美视口

```html
<html>
    <head>
        <!-- 初始缩放比难道永远是1.0? -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!--将网页的视口设置为完美视口,结论:以后再写移动端的页面,就把上边这个玩意先写上-->
    </head>
</html>
```

## 视口

不同的设备完美视口的大小是不一样的,iphone6是375,iphone6plus是414

由于不同设备视口和像素比不同,所以同样的375个像素在不同的设备下意义是不一样,比如在iphone6中 375就是全屏,而到了plus中375就会缺一块

所以在移动端开发时,就不再使用px来进行布局了

vw 表示的是视口的宽度(viewport width)

100vw=一个视口的宽度

1vw=1%视口宽度

vw这个单位永远相当于视口宽度进行计算

设计图的宽度:750px 1125px,设计图750px,使用vw作为单位100vw,创建一个48px×35px大小的元素

100vw=750px(设计图的像素) 0.1333333333333333vw=1px

6.4vw=48px(设计图像素)

4.667vw=35px

## vw适配

网页中字体大小最小是12px,不能设置一个比12像素还小的字体

如果我们设置了一个小于12px的字体,则字体自动设置为12

0.1333333vw=1px

5.3333vw=40px

1rem=1html的字体大小

1rem =40px(设计图)

```less
html{
    font-size: 5.3333vw;
}
.box{
    width: 18.75rem;
    height: 0.875rem;
}
```

## 响应式布局

响应式布局:网页可以根据不通的设备或窗口大小呈现出不同的效果

1. 使用响应式布局,可以使一个网页适用于所有设备
2. 响应布局的关键就是媒体查询
3. 通过媒体查询,可以为不通的设备,或设备不同状态来分别设置样式

使用媒体查询的语法:@media 查询规则 { }

媒体类型:(1)all所有设备,(2)print打印设备,(3)screen带屏幕的设备,(4)speech屏幕阅读器

可以使用" , "连接多个媒体类型,这样它们之间就是一个或的关系

也可以在媒体类型前添加一个only,表示只有此类媒体适用的意思,only的使用主要是为了兼容一些老版本浏览器

```less
@media only screen{
    body{
        background-color:red;
    }
}
```

## 媒体查询

样式切换的分界点,我们称其为断点,也就是网页的样式会在这个点时发生变化,一般比较常用的断点:

1. 小于768超小屏幕max-width=768px
2. 大于768小屏幕min-width=768px
3. 大于992中型屏幕min-width=992px
4. 大于1200大屏幕min-width=1200px

媒体特性:width视口的宽度,height 视口的高度

min-width:视口的最小宽度(视口大于指定宽度时生效)

max-width:视口的最大宽度(视口小于指定宽度时生效)

```less
@media only screen and (min-width: 500px) and (max-width:700px){
	body{
		background-color: #bfa;
	}
}
```

