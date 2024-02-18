# attr&prop

1. attribute:html的预定义和自定义属性
2. property:js对象身上的直接属性
3. property所对应的属性值是非布尔类型则是非布尔值属性
4. attribute和property的同步关系
   1. 非布尔值属性:实时同步
   2. 布尔值属性:
      1. 没有动过property:
         - attribute会同步property
         - property不会同步attribute
      2. 动过property:
         - attribute不会同步property
         - property不会同步attribute

```javascript
<input type="checkbox"   name="qhf"/>
var qhf = document.querySelector("input[type=checkbox]");
qhf.setAttribute("name", "qhf1")
qhf.name = "qhf4"
```

# H5中的小功能

```javascript
<div id="test" data-atguigu-qhf="qhf"></div>var testNode = document.querySelector("#test");
testNode.classList.add("qhf4");
testNode.classList.remove("qhf1");
testNode.classList.toggle("qhf2");//有则删除,无则新增
<div id="test" class="qhf qhf1 qhf2 qhf3"></div>
```

```javascript
var testNode = document.querySelector("#test");
testNode.dataset.atguiguQhf = "111";
<div id="test" data-atguigu-qhf="qhf"></div>
```

```javascript
//H5中增加了一个contentditable属性,可以直接修改文本
<div id="test" contenteditable="true">djhaldhaskj</div>
```

# H5和H4的区别

HTML5约等于HTML+CSS+JS

HTML5优势:

1. 跨平台:唯一一个通吃PC,MAC,IPhone,Android等主流平台的跨平台语言
2. 快速迭代
3. 降低成本
4. 导流入口多
5. 分发效率高

```javascript
<meta charset="UTF-8"> //表示的是浏览器要用UTF-8来对代码进行解码
```

```javascript
<!DOCTYPE html>//有是正常模式,没有则是变异模式
```

- 在ie9往上的浏览器中,三种模式在渲染方面几乎没有区别
- 在ie 7 8 9中,理论上存在怪异模式,实际只有标准模式
- 在ie6中,标准模式和怪异模式渲染的区别最大
- 在ie6以下的浏览器中,只有怪异模式

`<html> = <html xmlns="http://www.w3.org/1999/xhtml" lang="en">`

# 语义化标签

# 复习

# canvas的基本用法

convas:

- 是H5新增的元素,可用于通过JavaScript中的脚本来绘制图形
- 默认颜色和body,html的颜色一样
- IE8及以下的浏览器版本不支持
- 有默认的宽高,必须在内联框架中修改,如果在CSS中修改宽高,则画布的比例也会被修改
- getContext()的方法,这个方法是用来获得渲染上下文和它的绘画功能,它只有一个参数,就是上下文的格式

```html
<canvas id="test" width="300" height="300">
		<span>您的浏览器不支持画布元素</span><!-- 在支持convas属性的浏览器中,span会被隐藏 -->
</canvas>
```

```javascript
var canvas = document.querySelector('test')
if(canvas.getContext){ //确认是否有画笔
	var ctx = convas.getContext('2D')
}
```

# 绘制矩形

- 画布默认高宽300*150,切记一定要使用html的attribute的形式来定义画布宽高
- 通过css形式定义会缩放画布内的图像
- canvas的api只支持一种图像的直接渲染：矩形
- 我们没法使用选择器来选到canvas中的图像

画布api

```javascript
//ctx.getContext='2d' ctx.width ctx.height
if(canvas.getContext){ //确认是否有画笔}
```

上下文api:

1. ctx.fillRect(x,y,w,h):填充矩形
2. ctx.strokeRect(x,ymwmh):带边框的矩形
3. ctx.clearRect(0,0,oc.width,oc.height):清除整个画布,注意原点的位置
4. ctx.fillStyle
5. ctx.strokeStyle
6. ctx.lineWidth
7. ctx.lineCap
8. ctx.lineJoin
9. ctx.moveTo(x,y):将画笔抬起点到x,y处
10. ctx.lineTo(x,y):将画笔移到x,y处
11. ctx.beginpath():清除路径容器
12. ctx.closepath():闭合路径

```javascript
var ctx = canvas.getContext('2d') //给画笔定义一个变量名称			
ctx.fillStyle='red'//给fillRect使用的
ctx.fillRect(0,0,100,100) //填充矩形,不用加单位,10和10为相对画布原点,100*100为长宽
//带边框的矩形  100:99.5 --- 100.5(99-101)  
ctx.lineWidth=10//线段宽度
ctx.strokeRect(100.5,100.5,100,100)//100.5: 100  --- 101 
ctx.clearRect(100.5,100.5,100,100) //使用了一个和背景色一样的矩形,填充进去
//ctx.linejoin='round' bevel miter  分别是圆角 斜角 直角
```

```javascript
//三角形,就像像素一样
var ctx1 = canvas.getContext('2d')
ctx1.fillStyle='blue'
ctx1.strokeStyle='blue'
ctx1.moveTo(200,200)//起始点
ctx1.lineTo(200,250)//确定第二个点
ctx1.lineTo(250,250)//确定第三个点
ctx1.lineTo(200,200)//连线
//ctx1.closePath() 合并路路径, ctx1.fill()也会自动合并路径
ctx1.fill()
```

# 绘制路径

每次调用路径api时,都会往路径容器里做登记,调用beginPath()时,清空整个路径容器

```javascript
//清空路径容器
ctx1.beginPath() //如果不清空,则称这个三角形和上一个三角形存在于同一个路径中
ctx1.moveTo(300,300)//起始点
ctx1.lineTo(300,350)//确定第二个点
ctx1.lineTo(350,350)//确定第三个点
ctx1.fill()
```

```javascript
ctx1.strokeStyle='blue'
ctx1.linewidth=10
ctx1.linCap='round' //默认是butt 线段两头的形状:圆形round 方形butt square末端以方形结束,但是增加了一个宽度和线段相同,高度是线段厚度一半的矩形区域
ctx1.lineTo(200,250)
ctx1.stroke()
```

# save&restore

1. ctx.save是压栈,第一个压入栈中的是黑色,第二个是粉色;ctx.restore弹出栈;save和restore必须同时出现
2. ctx.save();ctx.beginPath();ctx.restore();这是一套封装,也是一个作用域
3. 样式容器:
   1. 每次调用样式api时,都会往路径容器里做登记
   2. 调用save时,将样式容器里的状态压入样式栈
   3. 调用restore时,将样式栈的栈项状态弹出到样式容器里,进行覆盖

```javascript
if(canvas.getContext){
	var ctx = canvas.getContext("2d");
	ctx.save();
	ctx.fillStyle="deeppink"; //没有被压入
	ctx.fillStyle="blue";
	ctx.save();
	ctx.fillStyle="green";
	ctx.save();
	ctx.beginPath();//beginPath不清除样式,只清楚路径
	ctx.restore();
	ctx.restore();
	ctx.restore();
	ctx.restore();
	ctx.fillRect(50,50,100,100);
}
```

# 签名

```javascript
if(canvas.getContext){
  var canvas = canvas.getContext('2d')
}
canvas.onmousedown = function(ev){
	ev = event||window.event
	canvas.save()
	canvas.fillStyle='red'
	if(canvas.setCapture){
    canvas.setCapture//在指定窗体里设置鼠标捕获
  }
  ctx.beginPath();
  ctx.moveTo(ev.clientX-canvas.offsetLeft,ev.clientY-canvas.offsetRight)
  document.onmousemove = function (ev) {
		ctx.save();
		ctx.strokeStyle = "pink";
		ev = ev || event;
		ctx.lineTo(ev.clientX - canvas.offsetLeft, ev.clientY - canvas.offsetTop);
		ctx.stroke();
		ctx.restore();
	}
}
return false
```

# 曲线

```javascript
ctx.beginPath()
ctx.moveTo(100,100)
ctx.arc(100,100,50,0,270*Math.PI/180) //曲线API,参数分别是,圆心X,圆心Y,半径,起始位置,弧度),这也是个路径,弧度参数之后可加true顺时针
```

# 变换

save()时canvas 2D api通过将当前状态放入栈中,保存canvas全部状态的方法

会被保存的有:当前的变换相关,当前的剪切区域,当前样式相关

ctx.translate变换原点位置

ctx.rotate()变换X,Y轴方向

ctx.scale()缩放画笔的比例

```javascript
ctx.translate(50,50)
ctx.translate(50,50)//连续变换两次原点,即最后位置距离画布左上角100,100
ctx.rotate(45*Math.PI/180)//只接受一个参数,按照中心的原点旋转,也是累加的
ctx.scale(2,2)//缩放画笔的比例
```

# 变换实例

ctx.translate(x,y):将原点按当前坐标轴位移x，y个单位

ctx.rotate(弧度):将坐标轴按顺时针方向进行旋转

ctx.scale(因子):(对画笔的比例进行缩放)

```javascript
window.onload = function(){
	var flag = 0;
	var scale = 0;
	var flagScale = 0;
	var canvas = document.querySelector("#test");  
  if(canvas,getContext){
    var ctx = canvas.getContext('2d')
    setInterval(function(){
      flag++
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(150, 150);
      ctx.rotate(flag * Math.PI / 180);
      if(scale==100){
        flagScale = -1
      }else if(scale==0){
        flagScale=1
      }
      scale+=flagScale
      ctx.scale(scale/50,scale/50);
      ctx.beginPath()
			ctx.fillRect(-50,-50,100,100);
			ctx.restore()
    },10)
  }
}
```

# 放大缩小原理

# 表盘实例

# 

# 复习表盘

# 使用图片

使用canvas操作图片时,必须等图片加载完成

```javascript
var img = new Image()//Image()函数会创建一个新的HTMLElement实例
img.src = ''//定义图片路径
img.onload = function (){
  draw()
}
function draw(){
  ctx.drawImage(img,0,0,img.width,img.height) //在原点位置绘出图片
}
```

```JavaScript
//创建一个背景对象,并且引用img图片作为背景
img.onload = function (){
  draw()
}
function draw(){
 var pattern = ctx.createPattern(img,'repeat') //repeat重复
 ctx.fillStyle = pattern
 ctx.fillRect(0,0,200,200)
}
```

```javascript
img.onload = function (){
  draw()
}
function draw(){
 	var gradient =  ctx.createLinearGradient(0, 0, 200, 200); //创建一个渐变对象并返回
	gradient.addColorStop(0,"red"); //0的时候的颜色
	gradient.addColorStop(0.5,"yellow");//0.5的颜色
	gradient.addColorStop(0.7,"pink");
	gradient.addColorStop(1,"green");
	ctx.fillStyle=gradient;
	ctx.fillRect(0,0,300,300);
}
```

```javascript
img.onload = function (){
  draw()
}
function draw(){
 	var gradient = ctx.createRadialGradient(150, 150, 50, 150, 150, 100) //前三个参数是一个圆的圆心和半径,后三个也一样
	gradient.addColorStop(0,"red");
	gradient.addColorStop(0.5,"yellow");
	gradient.addColorStop(0.7,"pink");
	gradient.addColorStop(1,"green");
	ctx.fillStyle=gradient;
	ctx.fillRect(0,0,300,300);
}
```

# 飞鸟

```javascript
window.onload = function(){
  var canvas = document.querySelector("#test");
  canvas.width = document.documentElement.clientWidth;//视口的宽度
	canvas.height = document.documentElement.clientHeight;
  if(canvas.getContext){
    var ctx = ctx.getContext('2d')
    var flag = 0
    var value = 0
    setInterval(function(){
      value+=10
      flag++
      if(flag==9){
        flag = 1
      }
      var img = new Image()
    	img.src = '18.canvas/q_r' + (flag) + '.jpg'
    	img.onload = function(){
      	draw()
    	}
    	function draw(){
     	 ctx.drawImgae(img,value,0)
    	}
    },100)
  }
}
```



# 文本相关

```javascript
ctx.font = '40px sans-serif'//第二个参数是字体,只支持这一种字体,而且字体和大小都必须有
ctx.textAlign = "center";//以文字的起始位置为轴平分三个字right,left,center
ctx.textBaseline = "bottom" //以最顶端的线为基线,bottom指的是基线在文字的下面 bottom top middle
var obj = ctx.measureText("邱海峰");//返回该方法传入参数现在的宽度
ctx.fillText("邱海峰", 100, 100);
ctx.strokeText("邱海峰", 100, 100);
```

```javascript
//文字水平居中
var oC = document.getElementById('c1');
var oGC = oC.getContext('2d');
oGC.font = '60px impact';
oGC.textBaseline = 'middle';  //middle bottom 这是必须的
var w = oGC.measureText('尚硅谷').width;
oGC.fillText('尚硅谷', (oC.width - w) / 2, (oC.height - 60) / 2);
```

# 像素操作

ctx.getImageData:返回一个imageData对象

属性有:

- width横向上像素点的个数
- height:纵向上像素点的个数
- data:是数组,放着每一个像素点的rgba信息数组总共有40000个数据,是因为一个像素点是包含了RGBA(颜色,和透明度四个数值)

```javascript
var ctx = canvas.getContext("2d");
ctx.fillStyle="rgba(255, 192, 203,1)";//可以修改imageData对象的透明度
ctx.fillRect(0, 0, 100, 100)
var img = ctx.getImageData(0,0,100,100)//获取以原点为起点,到100,100像素
//修改imageData对象的透明度,或者其它
for (var i = 0; i < imageData.data.length; i++) {
	img.data[4 * i + 3] = 100;
}
ctx.putImageData(img, 0, 0)//重新放入,2,3的参数表示imageData重新放入画布时的位置
```

```javascript
//创建一个imageData对象,默认创建出来 rgba(0,0,0,0)
var imageData = ctx.createImageData(100,100);//参数为imageData大小
for(var i=0;i<imageData.data.length;i++){
	imageData.data[4*i+3]=255;
}
ctx.putImageData(imageData,100,100)
```

# 单像素操作1

# 单像素操作2

画布的颜色默认是黑色透明,会出现灰色是因为CSS中将canvas设置成了灰色

```

```

