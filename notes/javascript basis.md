# JS简介

# Null

# JS的编写位置

# 基本语法

在script中注释使用://此为单行注释;/**/为多行注释;

JS中严格区分大小写,结尾中会忽略多个空格和换行,可以用来对代码进行格式化

# Null

# 数据类型

在JS中一共有六种数据类型:

1. String字符串
2. Number数值
3. Boolean布尔值
4. Null空值
5. Undefined未定义
6. Object对象

其中String Number Boolean Null Undefined属于基本数据类型

而Object属于引用数据类型

# 字符串

String:字符串,字符串中的内容必须要加 "" 引起来,引号可以使用 ""或'',可以使用\作为转义字符,\n是换行的意思,\t是制表符

```javascript
var str='Maaya';
var str1 = "我说:\"姐姐是我最爱的人\"";
alert(str1);
```

# number

JS中的所有数值都是number类型包括整数和浮点数(小数),如果使用Number表示的数字超过了最大值,那么会返回一个 Infinity:表示正无穷;-Infinity:表示负无穷

```javascript
var num = 123;
//可以使用typeof检查变量类型
alert(typeof str);
//JS中可以表示的数字的最大值
console.log(Number.MAX_VALUE);
//JS中可以表示的数字的最小值
console.log(Number.MIN_VALUE);
//NaN是一个特殊的数字,表示Not A Number,使用typeof检查一个NaN也会返回number
console.log(NaN);//显示的就是NaN
//在JS中整数的运算基本可以保证精确,但是浮点运算,可能得到一个不精确的结果,所以不要用JS进行对精确度要求比较高的运算
var c = 0.142352355 + 0.2;
console.log(c);//得到的是一个错误的结果
```

# 布尔值

Boolean布尔值:布尔值只有两个,主要用做逻辑判断,true表示真,false表示假

# Null和Undefined

Null(空值)类型的值只有一个,就是null,null这个值专门用来表示一个为空的对像,使用typeof检查一个 null值时,会返回object

Undefined(未定义)类型的值只有一个,就是undefined,当声明一个变量,但是并不给变量赋值时,它的值就是undefined,使用typeof检查一个undefined时也会返回undefined

```javascript
var nul =  null
console.log(nul,typeof nul)//打印出来的是null,Object
var und;
console.log(und,typeof und);//同理
```

# 强制类型转换String

强制类型转换,是将一个数据类型强制转换为其他的数据类型,主要指将其他的数据类型,转换为String Number Boolean

将其他数据类型转换为 String

(1) 调用 toString() 方法,不影响原变量,只将转换的结果返回,但是null和undefined这两个值没有 toString() 方法,如果调用他们的toString()方法,会报错

(2) 调用 String() 函数,要转换的数据作为参数传递给函数,实际是调用toString() 方法,但对于 null和undefined,并不会调用 toString() 方法,它只是将null直接转为"null",将undefined直接转为"undefined"

```javascript
var a = 123;
a = a.toString();//调用函数
var b =true;
a = b.toString();//调用函数
var c = null;
c = String(c);.//调用方法
var d = undefined;
d = toString(d);//调用方法
console.log(typeof a);
console.log(a);
console.log(typeof b);
console.log(b);
console.log(typeof c);
console.log(c);
console.log(typeof d);
console.log(d);
```

# 强制类型转换Number

将其他的数据类型转换为Number,其他的数据类型转换为Number

一、使用Number()函数:

1. 字符串→数字:如果是纯数字的字符串,则直接将其转换为数字;如果字符串中有非数字的内容,则转换为NaN,**包括全为字符的情况**;如果字符串是一个**空串**或者是一个**全是空格的字符串**,则转换为0,
2. 布尔→数字:true转成1,false转成0
3. null→数字:0
4. undefined→数字:NaN

二、这种方式专门用来对付字符串,但必须是数字打头的字符串

1. parseInt()把一个字符串转换为一个整数,同样可以对一个Number类型的值直接取整

2. parseFloat()把一个字符串转换为一个浮点数,对字符串以外的数据类型的做法是先将他们转换成String,再转换成Number


# 其它进制转数字

JS中,表示16进制的数字,以0X开头,表示八进制以0开头,以二进制表示则以0b开头,但是兼容性不好

```javascript
var a = 0X10;
//识别出的是8进制的8
var b = 010;
b = parseInt(b,10);//可以用parseInt解析成10进制,
var a = "070";// 我要表示的是70但是会被识别成56,变成八进制
a = parseInt(a,10);//这样就不会了
```

# 转换为boolean

调用Boolean()函数,将被转换的数据作为参数传递给函数,Number除了0和NaN其它都是true;**String除了空串""外其他都是true,''是空串,' '是空格**;null是false;undefined是false;对象也会转换成true

```javascript
var a = 123;
a = Boolean(a);
```

# 算数运算符

运算符(操作符),通过运算符可以对一个或多个值进行运算,获得计算结果,typeof就是运算符,可以获得一个值的类型,但typeof会以字符串的形式返回

算数运算符:+ - * /:对非Number的值运算时,会先转换成Number才运行,除字符串的加法外都适用,任何值和字符串做加法运算,都会先转换成字符串,%是取模运算(取余数)

任何值和NaN运算都是NaN;任何值和- * /运算都转换成Number,通过-0 1 /1都可以变成Number,并且不改变原来的值

```javascript
var a = 123;
var reuslt = a;
result = 任意数据类型 + "";//最后任意数据类型都可以转变成字符串
```

# 一元运算符

一元运算符,只需要一个操作数,+正号不会对数字产生任何影响,-负号可以对数字进行负号的取反

对于非Number类型的值,它会先转为Number,然后再运算,可以对其他数据类型使用+,来将其转换为number,原理和Number()函数一样

```javascript
var reuslt = 1 + +'2' + 3;//结果是6,因为 +"2"并没有通任何数据类型的值进行运算,所以会被转化为Number
var reuslt = 1 + -'2' + 3;//结果是2,因为-号将String转换为Number类型的值,并且取反了
```

# 自增和自减

自增++,a++的值等于原变量的值(自增前的值),++a的值等于新值(自增后的值);

自减--,a--是变量的原值(自减前的值),--a 是变量的新值(自减以后的值).

# null

# 逻辑运算符

JS提供了三种逻辑运算符

!非:(1)!可以对一个值进行非运算,(2)非运算是对布尔值进行取反, true变false,false变true,(3)对值进行两次取反,不会变化,**(4)对非布尔值进行运算,会转换为布尔值,然后再取反**

为一个任意数据类型取两次反,来将其转换为布尔值,原理和Boolean()函数一样

&&与:对符号两侧的值进行与运算并返回结果,两个值中有一个值为false就返回false,两个值都为true时,才返回true,JS中的“与”属于短路的与,如果第一个值为false,则不看第二个值

||或:对符号两侧的值进行或运算并返回结果,两个值中只要有一个true,就返回true, 如果两个值都为false,才返回false,JS中的“或”属于短路的或,如果第一个值为true,则不检查第二个值

**&&和||的运算最后返回的值是原值,而非true和false**

```javascript
//返回的是原值,不是true和false
console.log(-1 || true);//返回的-1
```

# 非布尔值的与或运算

**非布尔值使用&&和||运算符的情况:非布尔值进行与或运算时,会先将其转换为布尔值,然后再运算,并返回原值**

&&:当第一个值时true时,返回的必定是第二个值;当第一个值时false时,返回的必定是第一个值

||:当第一个值时true时,返回的必定是第一个值;当第一个值时false时,返回的必定是第二个值

```JavaScript
//与运算的两个值都为true时,返回后一个;
var result = 2 && 3;
//或运算的两个值都为true时,返回前一个;
var result = 2 || 3;
//与运算的第一个值为false时,返回第一个;
var result = 2 && 3;
//或运算的两个值都为false时,返回后一个;
var result = 2 || 3;
```

# 赋值运算符

=:将符号右侧的值赋值给符号左侧的变量;a += 5 等价于 a = a + 5

```javascript
var a = 1;
var a += 1;
var a -= 1;
var a = 1;
var a /= 1;
var a %= 5
```

# 关系运算符

关系运算符可以比较两个值间的大小关系,**关系成立返回true**,**关系不成立返回false**;\>,\>=,<,<=

**非数值比较时,会转为数字后再比较,当符号两侧的值都是字符串时,不会转换为数字进行比较,而会比较字符串中字符的Unicode编码**

**任何值和NaN做任何比较都是false**

```javascript
//比较字符编码时是一位一位进行比较,如果两位一样,则比较下一位,所以借用它来对英文进行排序
console.log("abc" < "bcd");//true
//比较两个字符串型的数字,可能会得到不可预期的结果,在比较两个字符串型的数字时,一定要用 + 转型
console.log("11123123123123123123" < +"5"); //true
```

# Unicode编码表

在字符串中使用要转义字符输入Unicode编码,\u+四位编码

```javascript
console.log('\u2620');//输出的是一个符号
```

在网页中使用Unicode编码,&#+编码,这里的编码必必须要先转换为10进制

```less
<h1 style="font-size: 200px;">&#9760;</h1>;//&#+Unicode编码的方式可以填写对应的东西
```

# 相等运算符

相等运算符:比较两个值是否相等,相等返回true,否则返回false

1. ==相等:比较两个不同类型的值,**会自动进行类型转换**,会先进行**数值**转化
2. !=不等:比较两个值,如果不相等返回true,否则返回false,也会对变量进行**自动类型转换**
3. ===全等:判断两个值是否全等,**和相等不同的是它不做自动类型转换**,如果两个值类型不同,直接返回false
4. !==不全等:判断两个值是否不全等,和不等不同的是它不做自动类型转换,如果两个值的类型不同,直接返回true

```javascript
//undefined衍生自null,所以这两个值做相等判断时,会返回true
console.log(undefined == null);
//NaN不和任何值相等,包括他本身
console.log(b == NaN);
//isNaN()函数可以判断一个值是否是NaN,如果该值是NaN则返回true,否则返回false
var b = NaN;
console.log(isNaN(b));
```

# 条件运算符

条件运算符(三元运算符)

**执行的流程:条件运算符执行时,先对条件表达式求值,该值为true,执行语句1,并返回执行结果;该值为false,则执行语句2,并返回执行结果**

**当条件的表达式的求值结果是一个非布尔值,会转换为布尔值然后运算**

```javascript
var a = null == undefined ? console.log(1) : alert("错误");//语法:条件表达式 ? 语句1 : 语句2;
```

# 运算符的优先级

```less
var a , b , c;//" , "运算符可以分割多个语句,一般在同时声明多个变量时使用,
```

JS中运算符有优先级:先乘除,后加减;在JS中有一个运算符优先级的表,在表中越靠上优先级越高,优先级越高越优先计算;优先级一样,则从左往右计算

```javascript
//优先级不清楚,可以使用()来改变优先级;var reuslt = 1 || 2 && 3//优先级一样,本行返回3
```

# 代码块

程序由一条一条语句构成,语句按自上向下的顺序一条一条执行

JS中可以使用{}为语句进行分组,同一个{}中的语句称为是一组语句,要么都执行,要么都不执行, 一个{}中的语句称为叫一个代码块,在代码块的后边就不用再使用";"进行分割代码

JS中的代码块,只具有分组的的作用,没有其他的用途,**代码块内容的内容,在外部是完全可见的**

# if语句(一)

流程控制语句:JS的程序是从上到下一行一行执行,通过流程控制语句可以控制程序执行流程,使程序可以根据一定条件来选择执行

语句的分类:1)条件判断语句,2)条件分支语句,3)循环语句

条件判断语句:在执行某个语句前进行判断,条件成立执行语句,不成立则语句不执行

if语句只能控制紧随其后的那个语句,如果希望if语句可以控制多条语句,可以将这些语句统一放到代码块中,**if语句后的代码块不是必须的,但在开发中尽量写上代码块,即使if后只有一条语句.**

```javascript
if(a>10 && a<=20){//if语句语法一
  alert("a大于10,并且 a小于等于20");
}
```

# if语句(二)

```javascript
var age;
if(age >= 60){//if语句语法二,有两种情况时
  alert("你已经退休了");
}else{
  alert("你还没退休");
}
if(age >= 100){//if语句语法三,有多种情况时
  alert("活着挺没意思的");
}else if(age >= 80){
  alert("你也老大不小的了");
}else{
  alert("还行");
}
```

# if练习(一)

从键盘输入小明的期末成绩:按成绩给予奖励

```javascript
var scl = prompt('请输入成绩');//prompt()可以弹出一个带文本框的提示框
if (scl > 100 || scl < 0 || isNaN(scl)) {//isNaN是为了判断输入的是否为非Number类型的值
	alert('错误');
}else{
	if (scl == 100) {
		console.log('满分')
	}else if(scl >= 80 && scl <= 99) {
  	console.log('优秀')
	} else if (scl >= 60 && scl < 80) {
  	console.log('及格')}
	}else{
    console.log("不及格")
	}
}
```

# if练习(二)

```javascript
var height = prompt("请输入你的身高(CM):");
var money = prompt("请输入你的财富(万):");
var face = prompt("请输入你的颜值(PX):");
if(height > 180 && money > 1000 && face > 500){
  alert("我一定要嫁给他~~");
}else if(height > 180 || money > 1000 || face > 500){
  alert("嫁吧,比上不足,比下有余.");
}else{
  alert("不嫁.");
}
```

# if练习(三)

```javascript
var num1 = +prompt("请输入第一个数:");
var num2 = +prompt("请输入第二个数:");
var num3 = +prompt("请输入第三个数:");
if(num1 < num2 && num1 < num3){
  if(num2 < num3){
    alert(num1 + ',' + num2 + ',' + num3)
  }else{
    alert(num1 + ',' + num3 + ',' + num2)
  }
}else if(num2 < num1 && num2 < num3){
  if(num1 < num3){
    alert(num2 + ',' + num1 + ',' + num3)
  }else{
    alert(num2 + ',' + num3 + ',' + num1)
  }
}else{
  if(num1 < num2){
    alert(num3 + ',' + num1 + ',' + num2)
  }else{
    alert(num3 + ',' + num2 + ',' + num1)
  }
}
```

# 条件分支语句

执行流程:执行case命令后的条件,与switch的条件进行是否全等比对,比对结果是true,则执行case后的语句,无论该case后有多少个case;如果比较结果是false,则继续向下比较,如果所有结果都是false,则只执行default后的语句

使用break打破命令的执行,使用switch可实现if的功能,使用if也可实现switch的功能,可以根据习惯选择

```JavaScript
var num = 1;
switch(num){//switch(条件表达式){
  case 1: //case + 条件表达式:
    alert('一');//要执行的语句
    break;//打破循环
  case 2://第二个case语句
    alert('二');
    break;
  default://如果所有case语句条件都不满足
    alert('错误数字')
}
```

# switch练习

成绩大于60分

```JavaScript
var score = prompt('成绩')
switch(true){
  case score >= 60: console.log("合格");
    break;
  default: console.log("合格");
    break;
}
```

从键盘接收整数参数,1-7提示星期数,其它提醒非法字符

```JavaScript
var date = + prompt('数字');
switch(date){
  case (1)://(1)等同于date
    alert('星期一');
    break;
  case (2):
    alert('星期二');
    break;
  case (3):
    alert('星期三');
    break;
  case (4):
    alert('星期四');
    break;
  case (5):
    alert('星期五');
    break;
  case (6):
    alert('星期六');
    break;
  case (7):alert('星期天');
    break;
  default:
    alert('非法参数');
}
```

# while循环语句

循环语句:通过循环语句反复的执行一段代码多次

1. while循环语法:while (条件表达式) {语句...},在执行时,先对条件表达式进行求值判断,为 true,执行循环体,执行一次循环体后,继续对表达式进行判断,为 true,执行循环体,继续执行,为 false,则终止循环

2. do...while 循环语法:do{ 语句... }while表达式,与while的区别在它先运行在判断,while先判断才成立;

3. **do...while可以保证循环体至执行一次**

```javascript
//在页面中打印连续的数字
var n = 1;
document.write(n++ + <br/>);//经过这条打印语句后n == 2
//死循环
while(true){
  alert('n'+n)
  if(n>10){
    break;
  }
}
```

将条件表达式写死为 true 的是死循环,该循环不停止,除非浏览器关闭,死循环慎用,可用break终止;

```javascript
//创建一个循环
var a = 1;
while(a<=10){
  document.write(n++,<br />);
}
```

# while练习

投资年利率5%,求1000块增长到5000块,要花多少年

```javascript
var money = 1000;
var y = 1;
while(money<=5000){
  money *= 1.05
  n++
}
alert(n);
```

从键盘输入小明的期末成绩

```javascript
while(true){
  var score = prompt("请输入小明的期末成绩(0-100):");
  if(score >= 0 && score <= 100){
    break;
  }
  alert("请输入有效的分数!");
}
```

# for循环

for是一个循环语句,称为for循环,for有专门位置放三要素,while是随便放的;

for语法:for(初始表达式;条件表达式;更新表达式){语句};1)执行初始表达式,初始化变量;2)执行条件表达式,判断是否执行循环,true执行,false不执行;3)执行更新表达式 ;

```javascript
var i = 1;
for(; i<10 ; i++){//for的循环三要素可以省略,也可以写在外部,但是" ; "必须都要有?
  console.log(i);
}
```

```javascript
{var i = 1}
{var i = 2}	
{var i = 3}
console.log(i)//i = 3
```



# for循环的练习

打印1-100奇数之和

```javascript
var sum=0;
for(var i=1 ; i<=100 ; i++){
  if(i%2 != 0){
    sum += i
  }
}
console.log(sum);
```

水仙花数之和,水仙花每个位上的数字的3次幂之和等于它本身

```javascript
var b;
var s;
var g;
for(i=100 ; i<=1000 ; i++){
  b = parseInt(i/100)
  s = parseInt((i-b*100)/10);
  g = parseInt(i%10);//用%最快
  sum = b*b*b + s*s*s + g*g*g
  if(i == sum ){
    console.log(i + '是水仙花数')
  }
}
```

# 质数练习

```javascript
var num = prompt("请输入一个质数")
var z = 2
var flag = true
if(num <= 1){
  while(num <= 1){
    var num = prompt("请重新输入一个质数")
  }
}
for(;z <num;z++){
  if(num % z == 0){
    flag = false
    break
  }
}
if(flag){
  console.log("这不是一个质数")
}else{
  console.log()
}
```

# 质数练习1

内容与30:质数练习合并

# 嵌套的for循环练习

```javascript
for(var i=1;i<5;i++){
  for(var j=1;j<5;j++){
    document.wirte("*")
  }
  doucment.wirte("<br/>")
}
for(i=0;i<5:i++){
  for(j=0;j<5;j+=){
    document.write("*&nbsp")
  }
  document.write("<br/>")
}
```

# 嵌套的for循环练习1

内容同41:嵌套的for循环练习合并

# for循环练习

```javascript
for(var i=1;i<10;i++){
  for(j=1;j<10;j++){
    document.write("<span"+ j + "*" + i + "=" + j*i + "</span>" )
  }
  document.write("</br>")
}
for(i = 2; i <= 100; i++){
  flag = true
  for (j = 2; j < i; j++){
    if(i%j == 0){
      flag = false
    }
  }
  if(flag){
    console.log("这是一个质数")
  }
}
```

# break和continue

**break**:可以用来退出switch或循环语句,但**只对当前循环有效**,作用是打破循环**节约性能**

**continue:**可以用来跳过当前循环,它只对最近的一个循环产生影响,也可以用label进行改变

```JavaScript
end://为当前的循环添加一个label标签
for(var i=1;i<5;i++){
  if(i=3){//break仅在if循环中无法起作用,但也不会报错
    break;
  }
  for(var j=2;j<5;j++){
    break end;//此时break对end标签的循环生效,而不是对当前循环生效
  }
}
```

# 质数练习的改进

Math.sqrt()的优化思路:因为任意一个数的计算可以归类为num/2至num/(num/2),如果在这个范围都没办法取余为0,那么剩下的可能则在0-1.2之间寻找

```javascript
console.time("test")
for(let i=2;i<=100000;i++){
  var flag=true;
  for(let j=2;j<Math.sqrt(i);j++){//Math.sqrt()是数学方法,可以将一个数字变成它的开方
    if(i % j == 0){
      flag=false;
      break;
    }
  }
  if(flag){
    console.log(i+'是一个质数');
  }
}
console.timeEnd("test")
```

# 对象的介绍

JavaScript的基础数据类型:String,Number,Boolean,Null,Undefined

1. 基本数据类型都是单一的值,值和值之间没有任何关系
2. 如果是使用基本数据类型的数据,那么所创建的变量都是独立的,没有联系

引用数据类型:Object对象

1. 内建对象:由ES标准中定义的对象,在任何的ES的实现中都可以使用,比如Math String Number Function Object,是JS就可以使用
2. 宿主对象:由JS的运行环境提供的对象,目前来讲主要指由浏览器提供的对象,比如Bom Dom
3. 自建对象:开发人员自己创建的对象

特殊数据类型:Symbol

**使用构造函数创建对象,这种情况下是没办法直接指定对象的**

```javascript
var obj = new Object()//使用new关键字调用的函数,是构造函数constructor,是专门用来创造对象的函数
obj.name = "Sister"//对象中保存的值称为属性,向对象中添加属性:Obj.property/name = prop/value
obj.name = "Maaya"//对象属性得重新赋值
console.log(obj.gender)//特别注意,读取对象中不存在的属性,只会返回undefined
delete obj.name//删除对象的属性
```

# 对象的介绍1

内容同46:对象的介绍合并

# 属性名和属性值

使用[]形式去操作属性更加的灵活;在[]可以直接创建一个变量,这样变量值是多少就会读取那个属性

属性值:JS对象的属性值,可以是任意的数据类型

```JavaScript
obj.var = "hello"//相对象中添加属性时,.var是可以使用得,因为对象的属性不强制要求遵守标识符的规范
obj["123"] = "Sister"//特殊的属性名,不能采用.的方式,语法:对象["属性名"]=属性值
console.log(obj["123"])//必须这样读取
var n = "123"//直接创建一个变量
console.log(obj[n])//然后通过读取变量的值得到对应的属性值
var result = 'a' in obj//in检查对象是否含有指定的属性,有返回true没有返回false
```

# 基本数据类型和引用数据类型

1. JS中的变量都保存在栈内存中,栈内存分成两列,左列是变量名,右列是变量值
2. 基本数据类型变量都是在栈内存中操作的,值与值之间是独立存在的,互相不会影响
3. 引用数据类型(对象)是保存到堆内存中的:
   - 对象本身是没有名字的,变量会保存的是对象在堆内存的地址(0X123)
   - 一个变量的值是保存的同一个对象,那么因为地址相同会映射到同一个对象

```JavaScript
var a = 123,b=a
a++
console.log(a,b)//a变b不变
```

```javascript
var obj = new Object()
obj.name = "Maaya"
var obj1 = obj
obj.name = "姐姐"
console.log(obj.name,obj.name1)//值相同
```

比较两个基本数据类型,比较的是他们的值

比较两个对象时,比的时他们的地址

# 对象字面量

使用对象字面量创建对象,这种方法可以直接指定对象中的属性

```javascript
var obj = {//属性名可以加引号也可以不加,但在面对特殊的属性名时,必须加""
  maaya:"姐姐",
  age:18,
  gender:"女",
  test:{name:"对象"}
}
```

# 函数的简介

函数也是一个对象,函数中可以封装一些功能(代码),在需要时可以执行

函数中的代码会在函数被调用的时候执行

```javascript
//使用构造函数创建对象的方法创建函数对象
var fun = new function("console.log('这是我的第一个函数')")//其中传入代码的形式需要是"code"
fun()//调用函数对象,运行结果是控制台中打印 "这是我的第一个函数"

//使用函数声明创建一个函数
function fun1(){ }//()中是各个形参

var fun2 = function(){}//使用函数表达式创建函数
```

# 函数的参数

函数中的多个形参之间使用","隔开,声明形参等与在函数内声明了对应变量

调用函数时,可以在()中指定实参,实参会赋值给函数中对应的形参

**但是调用函数时解析器不会检查实参的类型,所以要注意,是否有可能会接收到非法的类型,如果有可能则要对参数进行类型的检查**

函数的实参可以是任意数据类型

```javascript
var fun = function (a,b){
  return a+b
}
console.log(fun(123,456))//只有这样才会返回结果
console.log(fun(1,2,3))//最终打印出的是3,多余的实参不会被赋值
console.log(fun(1))//最终返回结果是NaN,因为实参数量少于形参,没有实参对象的形参将是undefined
```

# 返回值

return后面的代码是不会被执行,是死代码

```javascript
let und = fun()//设置一个变量来接收函数对象的返回值
function fun(a,b)//当函数对象中不写return,会返回undefined
  return//当函数对象中return后不跟任何值,也返回undefined
}//return后可以跟任意类型的值
```

# 实参可以是任何值

```javascript
function hello(o){
  console.log(o.name,o.age)
}
var obj = {
  name:"maaya",
  name:"age"
}
hello(obj)//实参可以是任意的数据类型,包括对象和函数,当参数过多时,可以封装到一个对象中,并通过对象传递
```

# 返回指定的类型

```javascript
function fun(){
  return {name:"Maaya"}//可以是一个对象
}
function fun1(){
  function fun2(){
    console.log("姐姐")
  }
  return fun2()//也可以是一个函数
}
```

# 匿名函数

匿名函数也可以叫做立即执行函数

```javascript
(function(){//函数声明的方式创建函数时,是需要命名的
  console.log("我是一个匿名函数,加括号后不报错")//但在这里加括号变成匿名函数之后是没关系的
})()
```

# 对象

对象的属性值可以是任何的数据类型,也可以是个函数

函数可以成为对象的属性:如果函数作为对象的属性保存,那么称这个函数是这个对象的方法,此时调用函数就说调用对象的方法(method)

但只是名称上的区别,没有其它区别

```javascript
var obj = {}
obj.name = function(){//对象的属性值可以是任何的数据类型,包括函数
  return
}
fun()//这是调用一个函数
obj.name()//这是调用一个方法,和上面都是一样的,只是名字不同
document.write()//这是document调用write方法
```

**遍历对象中的属性,是ES**

```javascript
var obj = {
  name:"Maaya",
  age:"18",
  gender:"female"
}
for(var n in obj){//for...in语句中对象有几个属性,循环体就执行几次
  console.log("属性名="+n)//每次执行时都将一个对象的属性名赋值给变量
  console.log("属性值="+obj[n])//因为n是一个变量所以用[]
}
```

```javascript
var obj = {
  name:"Maaya",
  age:"18",
  gender:"female"
}
var n = []
for(n in obj){
  console.log(n)//ES6新特性,直接将对象的属性名遍历到数组里了
}
```

# 全局作用域

**JS中一共有两种作用域:**

1. 全局作用域

   1. 直接编写在script标签中的JS代码,都在全局作用域
   2. 全局作用域在页面打开时创建,关闭时销毁
   3. 全局作用域中有一个**全局对象window**,可以直接使用
   4. window代表浏览器的窗口,它由浏览器创建,可以直接使用
   5. 全局作用域下:创建的变量都作为window对象的属性保存
   6. 全局作用域下:创建的函数都变成window对象的方法保存

2. 函数作用域

   - ```javascript
     function fun(){
       var a = 123
     }
     fun()
     console.log(a)//此时报错,这就是函数作用域
     ```

```javascript
var a = 1;
console.log(window.a);//证明全局作用域中的对象都变成widows属性保存
console.log(window.c);//输出undefined,因为window存在
console.log(c);//此时error
function fun(){
  console.log("我是一个函数")
}
window.fun();//全局作用域中,函数是window对象的方法
```

**变量的声明提前:**使用var关键字声明的变量,都会在所有代码执行前被声明

```JavaScript
a = 123
console.log('a=' + a);//此时error
//
console.log('a=' + a);//此时undefined
var a = 123;
```

**函数的声明提前:**

1. **函数声明形式**创建的函数function(){}会在所有的代码执行之前就被创建
2. **使用函数表达形式则不会**

```JavaScript
fun();
fun2();//fun2被var定义成window对象的属性,fun2先声明,但赋值是在代码执行后,所以此时fun2=undefined
function fun(){
  console.log('我是fun函数');
}
var fun2 = function(){
  console.log('我是fun2函数');
}
```

# 函数作用域

1. 调用函数时创建函数作用域,函数执行完后,函数作用域销毁
2. 每调用一次函数就会创建一个新的函数作用域,他们相互独立
3. 在全局作用域中无法访问到函数作用域的变量
4. 当在函数作用域中操作一个变量时,会先在自身作用域中寻找,如果有则直接使用,没有则向上一级寻找
5. 如果在全局作用域中也找不到,则error

```JavaScript
var a = 2
function fun2(){
  console.log('a=' + a);//输出a=undefined,因为声明提前
  var a = 1;
  fun3();//函数声明提前
  function fun3(){
    console.log('我是fun3的声明')
  }
}
var b = 222;
function fun4(){
  console.log('b=' + b);//输出222
  b = 2222;
}
fun4();
console.log('b=' + b);//输出2222
```

# 习题Debug

```JavaScript
var a = 123
function fun(a){
  console.log(a)//a=
  a = 456//
}
fun()
console.log(a)//a=
```

```javascript
var a = 123
function fun(a){
  console.log(a)//a=
  a = 456//
}
fun(123)
console.log(a)//a=
```

```JavaScript
var a = 1
function fun(a){//这里的形参a和外面var定义的a,是不同的存在
  console.log(a)
  a=123//这里的是对形参a进行赋值
}
fun(2)
console.log(a)//所以输出的还是1
```

# this

解析器调用函数时会向函数内部传进一个**隐含参数this**,this指向的是一个对象

根据函数的调用方式不同,this会指向不同的对象

- 以函数的形式调用时,this永远都是window


```JavaScript
var a = 1//a在全局下声明即window.a
function fun(){
  console.log(this.a)//this=window
}
fun()//输出1
```

- 以方法的形式调用时,this就是调用方法的对象


```javascript
var obj = {//在这里的fun指的是上面的fun,但是this.a,要改成this
  name:'Maaya',
  sayname:fun
};
var obj2 = {
  name:'姐姐',
  sayname:fun
};
obj.sayname();//输出obj
obj2.sayname();//输出obj2
```

- 当以构造函数的形式调用时,this就是新创建的那个对象

# this补充

老师做this的实际应用场景举例

# 使用工厂方法创建对象

```JavaScript
function creatPerson(name,age,gender){
  var obj = new Object();
  obj.name = name;
  obj.age = age;
  obj.gender = gender;
  obj.sayName = function(){
    alert("大家好我是"+this.name);
  };
  return obj;
}
var obj1 = creatPerson("Maaya",18,"Female");//最后必须进行赋值
var obj2 = creatPerson("Yu",18,"male");
```

# 构造函数

使用工厂方法创建的对象,都是用Object构造函数创建的,所以创建的对象都是Object这个类型,导致我们无法区分多种不同类型的对象

```JavaScript
function creatPerson(name,age,gender){
  var obj = new Object()//输出的是Object
}
function creatDog(name,age,gender){
  var dog = new Object()//输出的是Object
}
```

可以创建一个构造函数,专门用来创建需要对象

构造函数是一个普通的函数,创建方式和普通的函数没有区别,不同的是构造函数习惯上首字母大写

普通函数是直接调用,而构造函数需要使用new关键字来调用

**构造函数的执行流程:**

1. **立刻创建一个新的对象**
2. **将新建的对象设置为函数中的this,在构造函数中可以使用this来引用新建的对象**
3. **逐行执行函数中的代码**
4. **将新建的对象作为放回值返回**

将用同个构造函数创建的对象,称为一类对象,也将一个构造函数称为一个类

我们将一个构造函数创建的对象,称为是该类的实例

```javascript
function Person(name,age,gender){
  this.name = name;//当下面使用构造函数创建一个对象
  this.age = age;//并上传了参数
  this.gender = gender//this指向per,this.gender = per.gender
}
var per = new Person()
```

使用instance of检查一个对象是否是实例

```javascript
console.log(per instance of Person)//是则返回true,false
```

# 构造函数优化

在Person构造函数中,为每个对象都添加了一个sayName方法

sayName方法是在构造函数内部创建:

1. 构造函数每执行一次就创建一个新的sayName方法
2. 所有实例的sayName都是唯一的,执行10000次就创建10000个一样的方法
3. 这没必要,可以使所有的对象共享同一个方法

```javascript
function Person(name){
  this.name = name
  this.sayName = fun;
};
function fun(){
  alert('大家好我是' + this.name);
};
var per = new Person('Maaya',18,'Female');
var per1 = new Person('kisaragi',18,'male');
per.sayName();
console.log(per.sayName == per1.sayName);//true,方法没有执行,所以相等的是方法,而非方法的结果
```

# 原型对象

原型Pototype:我们创建的每个函数,解析器都会向函数中添加一个属性prototype,这个属性对应着一个对象,这个对象就是我们所谓的原型对象

当函数以构造函数的形式调用时,他所创建的对象中都会有一个隐含的属性指向该构造函数的原型对象,我们可以通过`__proto__`来访问该属性

原型对象相当于一个公共区域,所有同一个类的实例都可以访问到这个原型对象

我们可以将对象中共有的内容,统一设置到原型对象中

```JavaScript
function Person(name){
  this.name = name
}
Person.prototype.sayName = function(){
	console.log(this.name)
}
let fun = new Person("Maaya")//我们访问对象的一个属性或方法时,他会先在对象自身中寻找,如果有则直接使用,
fun.sayName()//如果没有则去原型对象中寻找,如果找到可以直接使用,即不用通过__proto__.sayName调用
```

# 原型对象1

原型对象也是对象,所以它也有原型:

1. 当我们使用一个对象的属性或方法时,会先在自身中寻找
2. 自身中如果没有则去原型对象中寻找,如果原型对象中有,则使用
3. 如果没有则去原型的原型对象中寻找,直到找到Object对象的原型
4. Object对象的原型没有原型,如果在Object中依然没有找到,则返回undefined

```javascript
function Myclass(){}
Myclass.prototype.name = '我是原型中的名字';
var mc = new Myclass();//mc这个实例对象中没有任何属性
console.log('name' in mc);//返回true,in检查对象是否有某个属性,但它会查找原型,所以得出的结果错误了
console.log(mc.hasOwnProperty("name"))//返回false,要注意in和hasOwnProperty()中属性名要加""
```

```JavaScript
function Myclass(){}
var mc = new Myclass()
console.log(mc.__proto__.hasOwnproperty("hasOwnproperty"))//返回false,证明原型无此方法
console.log(mc.__proto__.__proto__.hasOwnproperty("hasOwnproperty"))//true,证明原型的原型中有此方法
console.log(mc.prototype.__proto__.hasOwnproperty("hasOwnproperty"))//false,证明无prototype

//可知构造函数的原型中无Prototype但是存在__proto__
console.log(Myclass.prototype.prototype.hasOwnProperty('hasOwnProperty'));//false
console.log(Myclass.prototype.__proto__.hasOwnProperty('hasOwnProperty'));//true
console.log(Myclass.__proto__.__proto__.hasOwnProperty('hasOwnProperty'));//true
console.log(Myclass.__proto__.__proto__.__proto__)//Object对象的原型没有原型,但是原型中存在__proto__属性,而这个属性的值是null
```

# toString()

在页面打印一个对象时,实际上输出的对象的是toString()方法的返回值

如果希望在输出对象时不输出[Object Object],可以为对象添加一个toString()方法,即覆盖原型中的`__proto__`中的toString()方法

```javascript
function Person(){}
var fun = new Person()
Person.prototype.toString() = function(){
  return "Person[name=" + this.name + ",age=" + this.age + "]"
}
```

# 垃圾回收

垃圾回收:

1. 程序运行中会产生垃圾,垃圾过多导致程序运行变慢
2. 需要一个垃圾回收机制,来处理程序运行过程中产生的垃圾
3. JS中有自动的垃圾回收机制,会自动将这些垃圾对象从内存中销毁,我们不需要进行操作
4. 我们需要做的是将不再使用的对象设置为null(但是为什么不直接删除该对象呢)

**垃圾:当一个对象没有任何的变量或属性对它进行引用,此时我们将永远无法操作该对象,这就是一个垃圾**

```JavaScript
var fun = new Object()//在堆内存中产生了一块空间
obj = null//obj不再是构造函数的一个实例,上面的空间仍存在,但是无人指向它
```

# 数组简介

数组(Array):数组也是对象,和普通对象一样,也用来存储一些值

普通对象:以字符串为**属性名**,而数组是以**数字作为索引操作元素**

索引(index):从0开始的整数是索引

**数组的存储性能比普通对象好**,在开发中常用数组来存储一些数据

```javascript
var arr = new Array();//用构造函数的方法创建数组对象,
console.log(typeof arr);//typeof检查数组返回Object
arr[0] = 0;//向数组添加元素
arr[1] = 1;
console.log(arr);
console.log(arr[2]);//单独读数组中的元素(值)
console.log(arr[4]);//读不存在的索引,出现undefined
console.log(arr.length);//返回数组的长度

var arr1 = new Array();//不连续的数组
arr1[1] = 1;
arr1[2] = 2;
arr1[60] = 60;
console.log(arr1.length);//打印61

arr1.length = 6;//修改lenght
console.log(arr1);//打印结果,索引0,3,4,5为空

arr[arr.length] = 71;//始终在数组的最后一个位置添加元素
console.log(arr);//打印arr[0,1,71]
```

# 数组字面量

```JavaScript
var arr = []//无论使用构造函数还是字面量创建
arr.hello = "hello"//数组也是对象,可以添加属性

var arr1 = new Array(10,20,30);//用构造函数创建时,可以添加元素,该元素作为构造函数的参数传递
var arr2 = new Array(10)//只上传一个参数时,该参数为数组对象的length
console.log(arr1);
console.log(arr2.length);//输出10
```

```JavaScript
var arr5 = ['字符串',1,true,null,undefined,obj,{name:'test'},function(){console.log('1')}];
arr5[arr5.length] = fun;//在最后一位添加函数fun
console.log(arr5);//数组中的元素可以是任意的数据类型,包括对象及函数,和数组
arr5[8]();

arr6 = [[1,2,3],[4,5,6]];//数组里可以放数组,这就是二维数组,还能产生三维数组
console.log(arr6);
```

# 数组的四个方法

```javascript
var arr = []
var a = arr.push(1,2,3)//push()向数组末尾添加新元素,数组的新长度成为返回值
var b = arr.pop()//删除数组末尾的值,调用一次删除一次,删除的值成为返回值
var c = arr.unshift(0)//向数组开头添加新元素,数组的新长度成为返回值,且其它索引的顺序依次后延
var d = arr.shift()//删除数组开头的值,调用一次删除一次,删除的值成为返回值
```

# 数组的遍历

```JavaScript
var arr = [1,2,3]
for(var i=0;i<arr.length;i++){//遍历数组就是将数组中的所有元素取出来
  console.log(arr[i])
}
```

# 数组的练习

```JavaScript
function Person(name,age){
  this.name = name;
  this.age = age;
}
Person.prototype.toString = function(){//添加原型方法,使输出值美观
  return 'Person[name' + this.name + ',age' + this.age + ']';
}
var per = new Person('零',10);
var per1 = new Person('一',15);
var per2 = new Person('二',20);
var per3 = new Person('三',25);
var perArr = [per,per1,per2,per3];
function getAdult(arr){//创建一个函数对象提高复用性,不污染全局变量,这是核心思想
  var newArr = [];
  for(var i=0 ; i<arr.length ; i++){
    var p = arr[i];
    if(p.age >= 18){
      newArr.push(p); 
    }
  }
  return newArr;
}
```

# forEach()

```JavaScript
var arr = [1,2,3]
arr.forEach(function(a,b,c){//可以只设置一个参数,此时这个参数代表正在遍历的元素
  console.log(a)//正在遍历的元素
  console.log(b)//正在遍历的元素的索引
  console.log(c)//当前遍历的数组
})
```

# slice和splice

slice():从选定的数组提取指定的元素

1. 数组.sclie(start,end),start参数是开始的索引,end参数是结束的索引
2. 不会影响原数组,包含开始索引,**不包含结束索引**
3. end参数省略,会截取start索引后的所有元素
4. end参数可以为负值,当为负值时,从后往前截取

```JavaScript
var arr = [1,2,3]
var result = arr.slice(0,-1)
console.log(result)//打印结果为arr[1,2],截取的元素不包括end索引的元素,无3
```

splice()删除数组中的指定元素:

1. 数组.splice(start,end,elemnet),start参数是开始的索引,end参数是删除的数量
2. element参数的值会替换到被删除的元素的位置上
3. **会影响到原数组**,被删除的元素称为返回值

```javascript
var arr = [1,2,3,4,5,6,7]
var result = arr.splice(2,2,"我替换了被删除的元素")
console.log(arr)//打印arr[1,2,"我替换了被删除的元素",5,6,7]
console.log(result)//打印arr[3,4]
```

# 数组去重练习

```JavaScript
var arr = [1,2,3,3,2,1,4,3,3,4]
for(var i=0;i<arr.length;i++){
  for(var j=i+1;j<arr.length;j++){
    if(arr[i] == arr[j]){
      arr.splice[j,1]//对比出了第j个元素重复,故删除
      j--//因为第j个元素被删除,第j+1个元素变为j个元素,而下个循环会从第j+1开始,所以少对比了一个要j--
    }
  }
}
```

# 数组的剩余方法

concatenate():可以连接两个或多个数组,产生新的数组返回,不改变原数组

```JavaScript
var arr = [1,2,3]
var arr1 = [1,2,3]
var result = arr.concatemer(arr1)
```

join():将数组转换成字符串,不影响原数组,转换后的字符串称为返回值

```JavaScript
 var result = arr.join("--")//传入字符串作为参数,它会称为数组中元素的连接符
```

reverse():反转数组,对原数组产生影响,也产生返回值

```JavaScript
var result = arr.reverse()
```

sort():对数组中的元素默认按照Unicode编码排序,对原数组产生影响

1. 按照Unicode编码数字排序,可能会出错
2. 自定义排序规则:在sort()中添加一个回调函数,来自定义
   1. 回调函数中需要定义两个形参
   2. 数组中的元素作为实参上传,每次上传的两个元素随机,但a索引一定在b之前
   3. 当回调函数返回大于0的值,则元素交换顺序
   4. 返回小于0的值,元素不变
   5. 等于0,两个元素相等,也不变

```JavaScript
arr.sort(function(a,b){//完成数组中所有元素的排序后停止
  return a - b
})
```

# call和apply

call()和apply()都是**函数对象**的方法,需要通过**函数对象**调用,可以将**一个对象**指定为第一个参数,这个参数会成为函数执行时的this

call():可以将实参在对象之后依次传递

```javascript
function fun(a,b){
  console.log(this.name)
  console.log(a)
  console.log(b)
}
let obj = {name:"maaya"}
fun.call(obj,2,3)//obj只作为this,不替代形参,可以在obj后上传实参
```

apply():需要将实参封装到数组中传递

```javascript
function fun(a,b){
  console.log(this.name)
  console.log(a)
  console.log(b)
}
let obj = {name:"maaya"}
fun.call(obj,[2,3])//obj只作为this,不替代形参,可以在obj后上传实参
```

# arguments

调用函数时,浏览器会传递进两个隐含的参数:1)函数的上下文对象this,2)封装实参的对象

arguments:当调用函数时,传递的实参都在arguments中保存

**arguments是一个类数组对象**

```JavaScript
function fun(){
  console.log(arrguments instanceof Array)//证明不是数组对象的实例,false
  console.log(Array.isArray(arguments))//isArray方法确认是否时数组,false
  console.log(arguments[0])//即使没有定义形参,也可以通过arguemnts使用实参
  console.log(arguments.length)
  console.log(arguments.callee == fun)//arguments有一个callee属性,它对应一个函数对象,即当前正在执行的函数对象
}
fun("hello",0)//输出"hello"和2,分别对应arguments类数组的第一个属性和类数组长度
```

# Data对象

时间戳:格林威治时间1970年1月1日0时0分0秒到现在的**毫秒数**,1s=1000ms,计算机底层保存时间都使用时间戳

```JavaScript
var d = new Date()
console.log(d)//使用构造函数创造Date对象,则会封装当前代码执行的时间

var d1 = new Date('12/03/2020')//创建一个指定时间的对象,要上传一个表示时间的字符串作为参数
console.log(d1);
var date = d1.getDate();//返回当前的日值,即12/03中的3
console.log(date);
var date1 = d1.getDay();//星期四,返回4
console.log(date1);
var date2 = d1.getMonth();//返回月份
console.log(date2);
var date3 = d1.getFullYear();//返回年份
console.log(date3);
var date4 = d1.getTime();//返回时间戳
console.log(date4);

let const = Date.now()//获取当前的时间戳

var strat = Date.now();
for(var i=0 ; i<100 ; i++){
  console.log(i);
};
var end = Date.now();
console.log(end - strat);//利用时间戳来测试代码的执行性能
```

# Math对象

Math:不是一个构造函数,它属于一个工具类,封装了数学运算相关的属性和方法

```javascript
console.log(Math.PI)//返回圆周率
console.log(Math.abs(5-100));//返回绝对值计算结果
console.log(Math.ceil(1.4));//向上取等,小数位有值就自动进1
console.log(Math.floor(1.4));//向下取等,小数位有值就舍去
console.log(Math.round(1.4));//四舍五入
console.log(Math.random());//生成一个0-1间的随机数

console.log(Math.random()*(Y-X)+X)//生成X-Y的随机数

for(var i=0 ; i<100 ; i++){
  console.log(Math.random()*10);//生成一个0-10之间的随机数,*X以生成0-X间的随机数
};

for(var i=0 ; i<100 ; i++){
  console.log(Math.round(Math.random()*10));//0-10的整数
};
var max = Math.max(10,35,5672,6,342);//获取最大值
var min = Math.min(10,35,5672,6,342);//获取最小值
console.log(Math.pow(2,3))//返回2的3次幂,输出8
console.log(Math.sqrt(2))//开方
```

# 包装类

JS提供了三个包装类,可以将基本数据类型转换为对象:

1. **new String()**将基本数据类型字符串转化为String对象
2. **new Number()**将基本数据类型字符串转化为Number对象
3. **new Boolean()**将基本数据类型字符串转化为Boolean对象

**但在实际开发中不适用**

```JavaScript
var str = new String("maaya")
var num = new Number(3)
var num1 = new Number(3)
var num2 = 3
console.log(num1 == num)//false,因为这是两个对象
console.log(num == num2)//true,因为会自动做类型转换
```

方法和属性只能添加给对象,不能添加给基本数据类型

但对基本数据类型的值去调用属性和方法时,浏览器会临时使用包装类将其转换为对象,然后再调用方法和属性,调用完后转回基本数据类型

```JavaScript
const str = "maaya"
 console.log(str.toString())//基本数据类型直接调用了方法
```

# 字符串的方法

以下方法均不改变原字符串

```JavaScript
var str = 'Maaya'
console.log(str.length);//获取长度
console.log(str[3]);//提取指定索引元素

var result = str.charAt(0);//根据索引获取指定的字符
console.log(result);

var result1 = str.charCodeAt(0);//返回指定位置字符的unicode编码
console.log(result1);

result2 = String.fromCharCode(22222);//根据字符编码去获取字符
console.log(result2);

result3 = str.concat('Kisaragi','Maaya')//concat用来连接两个或多个字符串
console.log(result3);


result4 = str.indexOf('M');//检测字符串是否有指定内容,找到返回其首次出现的索引,未找到返回-1
result5 = str.indexOf('a',3);//第二个位置指定查找的开始索引,并从它的后一位索引向下检索
console.log(result4);//输出0
console.log(result5);//输出4
//lastIndexOF()和indexOf相反,他是从后往前找,也可以指定位置

result6 = str.slice(0,2);//slice截取字符串指定的内容,同数组的slice()
console.log(result6);

//substring()和slice()大致一样,但参数不能为负值,如果是负值会默认变为0,且自动调整参数位置,第二个参数小于第一个参数则位置调换

//substr()截取字符串,第一个字符为开始索引,第二个是截取长度

str = 'abc,bcd,efg';
var result7 = str.split('c');//将字符串拆分为数组,需要一个字符串作为参数,将会根据该字符串去拆分数组,上传的是空串则分开每一个字符
console.log(typeof result7);
console.log(Array.isArray(result7));
console.log(result7.length);
console.log(result7[0]);

str = "姐姐"
var result8 = str.toUpperCase();//toUpperCase()将字符串转换为大写并返回,toLowerCase()将字符串转换为小写并返回
console.log(result8);//当字符串为汉字时,不转换
var result = str.toLowerCase();
console.log(result9);
```

# 正则表达式的简介

定义一些字符串的规则,计算机可以根据正则表达式来检查一个字符串是否符合规则,或者将字符串符合规则的内容提取

```Javascript
//构造一个正则对象实例,第一个参数为正则表达式
var reg = new RegExp("ab","i")//第二个参数:1)"i"代表不区分大小写,2)"g"代表全局匹配模式
var str = "abc"
var result = reg.test(str)//test()是正则表达式的方法,检查字符串是否符合规则,返回true&false
```

# 正则表达语法

使用字面量创建正则表达式更简单,使用构造函数则更灵活,因为构造函数的参数可以传一个对象

[ab] == a|b;

[a-z]表示任意小写字母

[A-Z]表示任意大写字母

[A-z]表示任意字母

[^ab]检查是否有除了ab以外的字符

[0-9]表示任意的数字

```javascript
var reg = /姐姐/i// /正则表达式/匹配模式
var r = "姐姐我爱你"
console.log(reg.test(r))//输出true

reg2  = /c|D/;//检查字符串中有a或b,[ab]也是|的关系 
console.log(reg2.test(r));

reg3  = /a[bde]c/;//检查是否有abc,adc,aec
console.log(reg3.test(r));

reg4  = /[^ab]/;//true
console.log(reg4.test(r));
```

# 字符串和正则表达相关

```javascript
var str = "1M2a3a4y5a"
var result = str.split(/[A-z]/)//拆分为数组,结果为1,2,3,4,5,默认全局匹配

var result = str.search(/a[0-9]/)//检索字符串是否有指定内容,有则返回第一次出现的索引,没有返回-1,全局匹配无法生效

var result = str.match(/[0-9]y[0-9]/gi)//传递正则表达式为参数,将字符串符合正则的内容提取到一个数组中,可以使用全局匹配多次寻找

var result = str.replace(/sister/g,"姐姐我爱你")//将字符串中指定内容替换为新的内容,参数1)被替换的内容,可以接受一个正则表达式作为参数,参数2)新的内容
```

# 正则表达式语法

通过**量词**设置一个内容出现的次数:

- {n}:正好出现n次,只对括号前的字符串起作用,但是可以加上一个(),这样只对括号内容起效

```javascript
var reg = /(ab){3}/;
console.log(reg.test('abababbabc'))//true
```

- {m,n}:出现m-n次都行

```javascript
var reg1 = /b{1,3}/;
console.log(reg1.test('abbbababbabc'))//true
```

- {m,}:出现m次以上

```javascript
var reg3 = /ab{3,}/;
console.log(reg3.test('abababbbabc'))//true
```

- +:至少一个,相当于{1,}

```javascript
var reg4 = /ab+c/;
console.log(reg4.test('abababbabc'))
```

- *:0个或多个,相当于{0,}

```javascript
var reg4 = /ab*c/;
console.log(reg4.test('abababbabc'))
```

- ?:0个或一个,{0,1}

```javascript
var reg4 = /ab?c/;
console.log(reg4.test('abababbabc'))
```

- /^a/:检查一个字符串是否以a开头 

```javascript
var reg6 = /^a/;
console.log(reg6.test('abababbabc'))
```

- /a$/:检查一个字符串是否以a结尾

```javascript
var reg7 = /^a$/;//符合该正则表达式的为 "a"
console.log(reg7.test('aaa'))//false
var reg8 = /^a|a$/;
console.log(reg8.test('aaa'))
```

```javascript
var phone = 15280753549
var reg = /^1[3-9][0-9]{9}$/g
var result = reg.test(phone)//true
```

# 字面量和变量

在正则中`.`表示任意字符

正则表达式中:使用`\`作为转义字符

```javascript
//要先转义之后才可以直接使用
//  \. == .
//  \\ == \
```

**注意:使用构造函数时,由于它的参数是一个字符串,而`\`是字符串中的转义字符,如果要使用`\`则需要使用`\\`来代替,比如正则表达式**

\W:表示除了任意字母,数字,下划线

\w:表示任意字母,数字,下划线 

\D:除了数字

\d:任意的数字

\S:除了空格

\s:空格

\B:除了单词边界(来表示是否是一个单独的单词)

\b:单词边界

```javascript
var reg4= /\bchild\b/;//创建正则表达式检查字符串是否含有单词child,但是children也符合,可以用单词边界解决
console.log(reg4.test('hello children'))//false
var str = prompt('输入用户名:');
str1 = str.replace(/^\s*|\s*$/g,'');//去除开头和结尾的空格,使用''空串来替换
console.log(str1)
```

# 邮件的正则

电子邮件:任意字母数字下划线 .任意字母下划线 @ 任意字母数字 .任意字母(2-5位) .任意字母(2-5位)

```javascript
var Email = 877097131@qq.com
var emailReg = /^\w{3,}(\.\w)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}
```

# 事件的简介

事件:文档或浏览器窗口发生一些特定交互的瞬间

```javascript
//onclick,ondblclick,onmousemove,上面的行为被称为结构和行为的耦合,不利于维护,不推荐
<button id="btn" ondblclick="alert('Maaya')">我是一个按钮</button> 
```

```javascript
window.onload = function(){
  var btn = document.getElemnetById("btn");
  btn.onclick = function(){//为单击事件绑定的函数,被称为单击响应函数
    alert("姐姐我爱你")//当事件被触发时,对应的函数被调用
  }
}
```

# dom简介

DOM(document object mode):JS通过DOM对HTML进行操作,只要了解了DOM就可以随意的操作WEB页面

1. 文档(document):整个HTML网页文档
2. 对象(Object):将网页中的每一个部分都转换成了一个对象
3. 模型(mode):使用模型表示对象之间的关系,方便我们获取对象

节点Node:常用节点有四种

1. 文档节点:整个HTML文档,nodeName是#document,nodeType是9,nodeValue是null
2. 元素节点:HTML中的HTML标签,nodeName是标签名,nodeType是1,nodeValue是null
3. 属性节点:元素的属性,nodeName是属性名,nodeType是2,nodeValue是属性值
4. 文本节点:HTML标签中的文本内容,nodeName是#text,nodeType是3,nodeValue是文本内容

```javascript
var btn = document.getElementById('btn');//获取btn对象
console.log(btn);
btn.innerHTML  = '这个按钮的名字变了'//修改btn按钮的文本值
```

# 文档的加载

浏览器加载一个页面时,是从上向下的顺序加载的

如果JS代码写在页面上边时,代码执行时,页面还没加载,则onload事件会在整个页面加载完成之后才触发

```html
<body>
  <button id="btn">我是一个按钮</button>
  <script type='text/javascript'>//script标签写在body中是最优性能
  </script>
</body>
```

# DOM查询

getElementById:通过id属性获取一个元素节点对象

getElementsByTagName:通过标签名获取一组元素节点对象

getElementsByName:通过name属性获取一组元素节点对象

**innerHtml:用于获取元素内部的HTML代码,即<div>姐姐</div>中间的姐姐,但是自结束标签没有HTML代码,如果要读取元素节点属性则采用:元素.属性名的方法**
**但是class属性除外,它不能采用这种方式,读取class要用.className,因为class是自保留字符**

```Javascript
var btn01 = document.getElementById("btn01")
btn01.onclick = function(){
  var bj = document.getElementById("bj")
  }

var btn02 = document.getElementById("btn02")
btn02.onclick = function(){
  var lis = docuemnt.getElementByTagName("li")//返回的是一个类数组对象,所有查询到的都封装到其中,即使只有一个
  alert(lis.length)
  for(var i=0;i<lis.length;,i++){
    console.log(lis[i].innerHTML)//如果不加上innerHTML返回的则是object HTMLLIElement
  }
}

var btn03 = document.getElementById("btn03")
btn03.onclick = function(){
  var inputs = document.getElementsByName("gender")
  for (var i = 0; i < inputs.length; i++) {//无法使用innerHTML,因为input是自结束标签    
    alert(inputs[i].value);//元素.属性名 读取元素节点属性
  }
}

```

# 图片切换的练习

```javascript
window.onload = function(){
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  var img = document.getElementByTagName("img")[0]
  var imgArr = ['/img/1.png', '/img/2.png', '/img/3.png', '/img/4.png', '/img/5.png', '/img/6.png']//用数组存放所有照片
  var inner = document.getElementById('inner');
  var index = 0
  inner.innerHTML = '一共' + imgArr.length + '图片,当前第' + (index + 1) + '张';
  prev.onclick = function(){
    index--
    if (index < 0) {//循环
      index = imgArr.length - 1;
    }
    img.src = imgArr[index];
    inner.innerHTML = '一共' + imgArr.length + '图片,当前第' + (index + 1) + '张';
  }
}
next.onclick = function () {
  index++;//循环
  if (index == imgArr.length -1) {                                                                                                                                                           
    index = 0;
  }
  img.src = imgArr[index];
  inner.innerHTML = '一共' + imgArr.length + '图片,当前第' + (index + 1) + '张';
}
```

# dom查询

**获取元素节点的子节点:通过具体的元素节点调用**

- **getElementsByTagName():是一种方法,返回当前节点的指定标签名后代节点**

```javascript
var btn04 = doucment.getElementById("btn04")
var city = document.getElementById("city")//获取city下的所有li节点,li为id为city元素的子元素
var lis = city.getElementById("li")
```

- **childNodes:属性,表示当前节点的所有子节点,会获得属性节点,文本节点,将空格即换行识别成文本,根据dom标签,标签间的空白也会被当成文本节点,**
- **在IE8及以下的浏览器不会将空白作为文本节点**
- **childern可以返回当前元素的所有子元素,推荐使用这个**

```Javascript
var btn05 = document.getElementById('btn05');
btn05.onclick = function () {
  var city = document.getElementById('city');
  var cns = city.childNodes;//cns总共有9个值,5个换行空白,4个标签(标签包括里面的文本)
  for (var i = 0; i < cns.length; i++) {
    alert(cns[i].innerHTML);
  }
  var cns2 = city.children//clidren返回的是当前节点的所有子元素节点,不包括空白文本,返回4
}
```

**firstChild:属性,返回当前节点的第一个子节点,包括空白文本节点**

**firstElementChild:属性,返回当前节点的第一个子元素节点,不兼容IE8及以下**

```Javascript
var cns3 = city.firstElementClild
```

**lastChild:属性,返回当前节点的最后一个子节点,包括空白文本节点**

**lastElementChild:属性,返回当前节点的最后一个子元素节点**

```javascript
var cns3 = city.lastElementClild
```

# dom查询1

```JavaScript
var city1 = city.parentNode//获取父节点
var city1 = city.parentElementNode//获取父元素节点
var city1 = city.previousSibling//当前节点的前一个兄弟节点
var city1 = city.previousElementSibling//当前节点的前一个兄弟元素节点
var city1 = city.nextSibling//当前节点的后一个兄弟节点
var city1 = city.nextElementSibling//当前节点的后一个兄弟元素节点
var city1 = city.innerText//获取元素的所有文本,不包括标签,会自动将HTML节点去除
var city1 = city.innerHTML//获取元素的所有文本,包括标签
```

# 全选练习

# 全选练习

# 全选练习

```javascript
window.onload = function(){
  var checkedAllBox = document.getElementById('checkedAllBox');
  var items = document.getElementsByName("items")
  var checkedAllBtn = document.getElementById('checkedAllBtn');
  checkedAllBtn.onclick = function () {
    for (var i = 0; i < items.length; i++) {
      items[i].checked = true;
      checkedAllBox.checked = true;
    }
  }

  var checkedNoBtn = document.getElementById('checkedNoBtn');
  checkedNoBtn.onclick = function () {
    for (var i = 0; i < items.length; i++) {
      items[i].checked = false;
      checkedAllBox.checked = false;
    }
  }

  var checkedRevBtn = document.getElementById('checkedRevBtn');
  checkedRevBtn.onclick = function () {
    checkedAllBox.checked = true;
    for (var i = 0; i < items.length; i++) {
      items[i].checked = !items[i].checked;
      if (!items[i].checked) {
        checkedAllBox.checked = false;
      }
    }
  }

  var sendBtn = document.getElementById('sendBtn');
  sendBtn.onclick = function () {
    for (var i = 0; i < items.length; i++) {
      if (items[i].checked) {
        alert(items[i].value)
      }
    }
  }

  checkedAllBox.onclick = function () {
    for (var i = 0; i < items.length; i++) {
      items[i].checked = this.checked;
    }
  }

  for (var i = 0; i < items.length; i++) {//为四个多选框分别绑定点击事件
    items[i].onclick = function () {
      checkedAllBox.checked = true;
      for (var j = 0; j < items.length; j++) {
        if (!items[j].checked) {
          checkedAllBox.checked = false;
          //一旦进入判断,则已经的得出结果,不需要继续计算
          break;
        }
      }
    }
  }
} 
```

# dom查询的剩余方法

```javascript
let body = document.body//document中有属性body,保存的是body的引用
let all = document.all//document属性all,将页面中的所有元素保存在一个数组中
let html = document.documentElement//保存的是html根标签
let all1 = document.getElementsTagName('*')//表达的也是页面的中的所有元素

//查找class属性是class的元素
let box1 = document.getElementsByClassName('class');//兼容性很差,IE8及一下不兼容
var div = document.querySelector('.class div');//需要一个选择器的字符串作为参数,以css选择器的方式来查询一个元素节点对象
console.log(div.innerHTML);//
```

# dom的增删改查

1. removeChild:删除节点,父节点.removeChild(子节点);
2. document.createElement():创建一个元素节点对象,并返回改对象
3. document.createTextNode():创建一个文本节点对象,并返回改对象
4. appendChild:把新的子节点添加到指定节点,父节点.appendChild(节点)
5. insertBefore:把新的的节点插入到指定的节点前面,父节点.insertBefore(新节点,旧节点)
6. replaceChild:把新的的节点替换指定的节点前面,父节点.replaceChild(新节点,旧节点)
7. parentNode:子节点.parentNode.replaceChild(子节点)

```javascript
myClick("btn01",function(){
  var li = document.creatElement("li")//creatElement创建一个元素节点
  var gettext = doucemnt.creatTextNode("广州")//creatTextNode创建一个文本节点
  var city = document.getElementById("city")
  li.appendChild = gettext//将文本节点gettext添加到li节点下
  city.appendChild = li//li节点添加到city节点下
})
myClick("btn02",function(){
  var li = document.creatElement("li")
  var gettext = doucemnt.creatTextNode("广州")
  var city = document.getElementById("city")
  var bj = document.getElementById('bj');
  li.appendChild = gettext
  city.insertBefore(li,bj)//将li节点插入bj节点之前
})
myClick('btn03', function () {
  var li = document.createElement('li')
  var gztext = document.createTextNode('广州')
  li.appendChild(gztext);
  var bj = document.getElementById('bj');
  var city = document.getElementById('city');
  city.replaceChild(li, bj)//使用replaceClild将li节点替换掉bj节点
})
myClick('btn04', function () {
  var li = document.createElement('li')
  var gztext = document.createTextNode('广州')
  li.appendChild(gztext);
  var bj = document.getElementById('bj');
  var city = document.getElementById('city');
  city.removeChild(bj)//移除某个节点
  //bj.parentNode.replaceChild('bj');通过bj.parentNode直接获得父节点
})
myClick('btn05', function () {
  var bj = document.getElementById('bj');
  alert(bj.innerHTML);//读取对应节点中的HTML的代码
})
myClick('btn06', function () {
  var bj = document.getElementById('bj');
  bj.innerHTML = '昌平'//通过innerHTML可以进行dom的增删改查
})
myClick('btn07', function () {
  var city = document.getElementById('city');
  bj.innerHTML += '<li>广州</li>';
  /* var li = document.createElement('li');
           * li.innerHTML = '广州';
           * city.appendChild(li);
           */
})
function myClick(idstr,fun){
  var btn = document.getElement(idstr)
  btn.onclick = fun
}
```

# 添加删除记录

# 添加删除记录

# 添加删除记录

```javascript
window.onload = function(){
  //设置一个点击delete的删除函数
  function delA(){//用于弹出一个带有确认和取消按钮的提示框了,需要输入一个参数作为文字提示
    var tr = this.parentNode.parentNode//this
    var name = tr.getElementsByTagName('td')[0].innerHTML
    var flag = confirm('确认删除' + name + '吗');
    if(flag == true){
      tr.parentNode.removeChild(tr)
    }
    return false;
  }
  
  var allA = document.getElementsByTagName('a')
  for(var i=0 ; i<allA.length ; i++){//绑定删除时间,通过this,指定要删除的事allA[i]的父元素tr
    allA[i].onclick = delA//
  }
  
  var  addEmpButton = document.getElementById('addEmpButton');
  addEmpButton.onclick = function(){//绑定添加事件
    var name = document.getElementById('empName').value;
    var email = document.getElementById('email').value;
    var salary = document.getElementById('salary').value;
    var tr = document.createElement('tr');
    
    //也可以在Tbody中添加,但是会改变Tbody中的其他代码,不推荐使用,因为其他代码也会被改变
    tr.innerHTML = '<td>'+name+'</td>'+'<td>'+email+'</td>'+'<td>'+salary+'</td>'+'<td><a href="javascript:;">delete</a></td>';//拼串
    
    a = tr.getElementsByTagName('a')[0];
    a.onclick = delA;//为新添加的a链接绑定点击事件
    var employeeTable = document.getElementById('employeeTable');
    var tbody = employeeTable.getElementsByTagName('tbody')[0];
    tbody.appendChild(tr); //将新创建的tr添加到table下

  }
}
```

# for循环的问题

105添加删除记录问题,**[16]为105代码块第十六行**

```javascript
//[16]allA[i].onclick = delA:因为for循环在页面加载完后直接执行,此时for循环已经创建了三行代码
//1.
all[0].onclcik = delA
all[1].onclcik = delA
all[2].onclcik = delA
//并且由于for遍历完i++,此时i==3,3==allA.length,不继续执行for循环,但i==3的值仍在函数中
//如果 allA[i].onclick = allA[i].parentNode.removerChild(tr)
//即恒等于
allA[0].onclick = allA[3].parentNode.removerChild(tr)
allA[1].onclick = allA[3].parentNode.removerChild(tr)
allA[2].onclick = allA[3].parentNode.removerChild(tr)
```

# 获取元素的样式

# 操作内联样式

通过JS修改元素的样式:元素名.style.样式名 = 样式值

**注意:如果CSS的样式名中含有"-",例如background-color,border-left等,需将样式名修改成驼峰命名法,去掉"-",backgroundColor,borderLeft**

通过style属性设置的样式为内联样式:内联样式有较高的优先级,所以通过JS修改的样式往往会立即显示

```Javascript
div.style.width = red !important//样式中的 !important 具有最高优先级,通过js也无法覆盖

var btn02 = document.getElementById('btn02');
btn02.onclick = function(){
  alert(box1.style.backgroundColor);//通过style读取的都是内联样式,无法读取到CSS样式
}
button id="btn02">我没有内联样式</button>
```

# 获取元素的样式

**getComputersStyle():**

1. 属于window的方法,可以直接使用获取元素样式
2. 参数(1)要获取样式的元素id,参数(2)传递一个伪元素,一般传null
3. **方法会返回一个对象,封装了当前元素对应的样式**
4. **通过对象.样式名读取样式**
5. **IE中不兼容**
6. **用来读取的是当前正在使用的那个样式**

```javascript
var div = getComputerStyle(box1,null).backgroundColor//获取div的backgroundColor样式
```

**currentStyle:**

1. 只能在IE中使用
2. 元素.currentStyle.样式
3. 用来读取的是当前正在使用的那个样式

```javascript
var width = box1.currentStyle.width
```

**通过函数实现IE和其它浏览器的兼容性**

```javascript
function getStyle(obj,name){//obj为元素id,name为属性名
  if(window.getComputerStyle(){
    return getComputedStyle(obj, null)[name]//因为属性名是变量,所以用[name]代替,".name"
	}else{
  	return obj.currentStyle[name];
	}
}
```

# 其它样式的相关属性

```css
#box1 {
  width: 200px;
  height: 100px;
  padding: 100px;
  border: 10px solid red;
  background-color: blue;
}
#box2 {
  position:relative;
}
```

**clientWidth&clentHeight**:获取元素的可见高度和可见宽度,并且返回的是纯数字,可以直接计算

1. 获取的是内容区和内边距,不包括边框(border)
2. 这些属性都是只读的,不能改,想改只能通过style

```javascript
var btn01 = document.getElementById('btn01');
var box1 = document.getElementById('box1');
btn.onclick = function(){
  console.log(box1.clientWidth)//输出width+2padding == 400
}
```

**offsetWidth&offsetHeight**:获取元素的全部大小,包括边框

```javascript
btn.onclick = function(){
  console.log(box1.offsetWidth)//输出420
    console.log(box1.offsetHeight)//输出320
}
```

**offsetParent:**获取当前元素的定位父元素

1. 获取到离当前元素最近的开启**相对定位**的祖先元素
2. 如果所有的祖先元素都没有开启定位,则返回body

```JavaScript
console.log(box1.offsetParent)//返回的元素是一个对象
console.log(box1.offsetParent.id)//通过对象的属性调出ID
```

**offsetTop&offsetLeft:**当前元素相对于其定位父元素的垂直偏移量(水平偏移量)

```javascript
console.log(box1.offsetTop);
console.log(box1.offsetTop);
```

**scrollHeigh&scrollWith:**可以获得整个滚动区域的宽度和高度

```javascript
console.log(box4.scrollHeight);
console.log(box4.scrollWidth);
```

**scrollLeft&scrollTop:**获取水平与垂直滚动条滚动的距离

```javascript
console.log(box4.scrollLeft);
console.log(box4.scrollTop);
```

**当满足scorllHeight-scrollTop == clientHeight时说明滚动条滚动到底了,可以用在协议上,必须阅读完协议才可以进行下一步**

```javascript
info.onscroll = function(){
  if (info.scrollHeight - info.scrollTop == info.clientHeight) {
    inputs[0].disabled = false;//object.disabled=ture/false,可以设置一个元素是否被禁用
    inputs[1].disabled = false;
  }
}
```

# 事件对象

所有的事件对象:

1. 当事件的响应函数被触发时,浏览器会每次都将该事件对象作为实参传递响应于函数
2. 在事件对象中封装了所有事件相关的一切信息,例如:鼠标的坐标,键盘哪个键被按下,鼠标滚轮滚动的方向

```javascript
var btn = document.getElementById("maaya")
btn.onclick = function(event){
  console.log(event)
}
```

**IE8中,响应函数被触发时,浏览器不会传递事件对象,因为他们将事件对象作为window对象的属性保存**

```javascript
var areaDiv = document.getElementById('areaDiv')
var showMsg = document.getElementById('showMsg')
areaDiv.onmousemove = function(event){
  console.log(event)
  if(!event){//if语句可以直接替换成 event = event || window.event
    event = window.event;
  }
  var x = event.clientX;//clientX,clientY可以获取鼠标水平和垂直的坐标,但只是个数值
  var y = event.clientY;
  showMsg.innerHTML = 'x=' + x +'y=' + y;
}
```

# div跟着鼠标移动

1. chrome浏览器认为滚动条是body的
2. 火狐等浏览器认为滚动条是html根标签的
2. **pageX&pageY:可以获取鼠标相当于当前页面的坐标,但是不支持IE8及以下**

```javascript
var box1 = document.getElementById('box1');
document.onmousemove = function (event) {
  //chrome通过body.scorllTop获取,火狐等通过documentElement获取
  var st = document.body.scrollTop || document.documentElement.scrollTop;
  var sl = document.body.scrollLeft || document.documentElement.scrollLeft;
  event = event || window.event;
  var x = event.clientX;
  var y = event.clientY;
  box1.style.left = x  + sl + 'px';//又或者将定位改为fix固定定位
  box1.style.top = y  + st + 'px';//又或者使用pageX和pageY属性
}
```

# 事件的冒泡

**事件的冒泡(buddle):**

1. **冒泡指的是事件的向上传导,当后代元素上的事件被触发时其祖先元素的相同事件也会被触发**
2. **开发中大部分情况下冒泡都是有用的,如果不希望发生冒泡事件可以通过事件对象来取消冒泡**

```javascript
//如果不取消冒泡,则点击s1会顺序触发s1,box1,body的单击事件
var s1 = document.getElementById('s1');
s1.onclick = function(event){
  event = event || event.window;
  alert(s1);
  event.cancelBubble = true;//取消冒泡:可以将事件对象的灿cancelBubble设置为true,即可取消冒泡
}
var box1 = document.getElementById('box1')
box1.onclick = function(){
  alert(box1);
  event = event || event.window;
  event.cancelBubble = true;//取消冒泡
}
document.body.onclick = function(){
  alert("我是body的响应函数");
}
```

# 事件的委派

事件的委派:将事件统一绑定给元素的共同祖先元素,当后代元素上的事件出发时,会一直冒泡到祖先元素从而通过祖先元素的响应函数来处理事件

通过事件的委派利用冒泡,减少了时间的绑定次数,提高程序的性能

```javascript
var u1 = document.getElementById('u1');
var btn01 = document.getElementById('btn01');
btn01.onclick = function(){
  var li = document.getElementById("li")
  li.innerHTML = "<a href='javascript:;' class='link'>新建的超链接</a>"
  u1.appendChild(li)
}
u1.onclick = function(event){
  if(event.target.class == "link"){
    console.log(event.target)
  }
}
```

# bind函数

# bing函数

对象.事件 = 函数的形式绑定响应函数:它只能同时为一个元素的一个事件绑定一个响应函数,如果重复绑定,则后绑定的覆盖之前的额

addEventListener():可以为元素的同一个事件多次绑定响应函数,响应函数按顺序执行,但不支持IE8及以下

1. 参数:时间的字符串,不要on
2. 回调函数,当事件触发时该响应函数被调用
3. 是否在捕获阶段触发事件,需要一个布尔值,一般传false

```javascript
var btn = document.getElementById("btn01")
btn.addEventListener("click",function(){
  alert("this")
},false)
btn.addEventListener("click",function(){
  alert(this)
},false)
```

attachEvent():只支持IE8以下的浏览器,能为一个事件绑定多个响应函数,但他是后绑定先执行,执行顺序和addEventListener()相反

```javascript
btn01.attachEvent('onclcik', function () {
  alert.log(this);
});
btn01.attachEvent('onclcik', function () {
  alert.log("1");
});
```

同时兼容所有浏览器

```javascript
function bind(obj,eventStr,callBack){
  if(obj.addEventListener){
    obj.addEventListener(eventStr, callback, false);
  }else{
    obj.attachEvent("on"+eventStr,function(){//修改回调函数callBack的this,
      callback.call(obj)//因为attachEvent()中的this是window
    })
  }
}
```

# 事件的传播

事件的传播:

1. 微软认为事件应该**由内向外传播**,当事件触发时,应先触发当前元素上的事件,然后向当前元素的祖先元素传播,也就是说事件应该在冒泡阶段执行

2. 网景认为事件应该**由外向内**传播,当事件触发时,应先触发当前元素的最外层的祖先元素的事件,然后再向内传播给后代元素

3. W3C综合了两个公司的方案,**将事件传播分成了三个阶段**

   1. **捕获阶段**:捕获阶段时,从最外层的祖先元素,向目标元素进行事件的捕获,默认此时不会触发事件
   2. **目标阶段**:事件向内捕获到了目标元素,捕获结束开始在目标元素上触发事件
   3. **冒泡阶段**:事件从当前元素向它的祖先元素传递,依次触发祖先元素的事件
      1. 如果希望在捕获阶段就触发事件,可以将addEventListenter()第三个参数改成true即可
      2. 但一般不希望在捕获阶段触发事件,所以都是false,而且IE8及以下的浏览器不支持

# 拖拽

# 拖拽

# 拖拽

```javascript
window.onload = function(){
  var box1 = document.getElementById("box1");
  var box2 = document.getElementById("box2");
  var img1 = document.getElementById("img1");
  drag(box1);//调用拖拽函数
  drag(box2);
  drag(img1);
}
function drag(obj){
  obj.mousedown = function(event){//绑定鼠标按下的事件
    obj.setCapture && obj.setCapture()//如果有捕获属性,则启用,没有不启用给
    event = event || window.event
    var ol = event.clientX - obj.offsetLeft;//获取鼠标按下时,和该元素边界top&left的距离
    var ot = event.clientY - obj.offsetTop;//
    obj.mousemove = function(event)}{//绑定鼠标移动的事件
      var left = event.clientX - ol;//设置拖拽元素的偏移量
      var top = event.clientY - ot;
      obj.style.left = left+"px";//设置拖拽元素的偏移量
      obj.style.top = top+"px";
    }
  }
  document.onmouseup = function(){//绑定鼠标松开的事件
    document.onmousemove = null;//
    document.onmouseup = null;//当鼠标松开后,该元素的移动和松开事件都删除
    obj.releaseCapture && obj.releaseCapture();//取消捕获
  };
  return false//setCapture这个捕获的属性无法在IE8及以下版本使用,通过return false取消默认事件
```

# 滚轮事件

```javascript
box.onmousewheel = function(event){//给chrome和IE浏览器绑定滚轮事件
  event = event || window.event
  if(wheelData>0 || datail<0){//chrome支持wheelData属性,火狐支持detail属性
    box.style.height = box.clientHeight - 10 + "px" //向上滚是减小元素高度
  }eles{
    box.style.height = box.clientHeight + 10 + "px" 
  }
  event.preventDefault && event.preventDefault()//取消在box元素中滚动滚轮也会滚动有页面的事件
  return false//IE不支持event.preventDefault属性,用return false取得相同效果
}
bind(box,"DOMMouseScroll",box.onmousewheel){}
function bind(obj,eventStr,callback){//单独给火狐浏览器绑定监听滚轮事件
  if(obj.addEventListener){
    obj.addEventListener(eventStr,callback,false)
  }else{//else无作用
    obj.attachEvent("on"+eventStr,function(){
      callback.call(obj)
    })
  }
}
```

# 键盘事件

1. **onkeydown&onkeyup(键盘事件):必须绑定给可以获取焦点的对象,例如document和input标签**
2. **onkeydown:**
   1. **如果一直按着某个按键不放,事件会一直触发,**
   2. **当onkeydown连续触发时,第一次和第二次的间隔会稍微长一点,其它的都很快,是为了防止误操作**
3. **onkeyup:不会连续触发**
4. keyCode属性有按下按键的unicode编码,判断哪个按键被按下
5. 除了keyCode,事件对象中还提供altkey;ctrlkey;shiftkey属性,用来判断alt,ctrl,shift是否被按下,如果按下则返回true,否则返回false

```javascript
document.onkeydown = function(event){
  event = event || window.event
  if (event.keyCode == 89 && event.ctrlKey) {
    alert('y和ctrl被按下了');
  }
}
var input = document.getElementsByTagName('input')[0];
input.onkeydown = function (event) {
  event = event || window.event;
  if (event.keyCode > 48 && event.keyCode <= 57) {
    //在文本框中输入内容,属于默认行为
    return false//如果取消默认行为,即使按下按键,文本框中也不会出现内容
  }
}
```

# 键盘移动div

```javascript
var box = document.getElementById
document.onkeydown = function(event){
  event = event || window.event
  var speed = 10;
  if(event.ctrlKey){
    speed = 50;
  }
  switch(event.keyCode){
    case 37:
      box1.style.left = box1.offsetLeft - speed + 'px';
      break;
    case 38:
      box1.style.top = box1.offsetTop - speed + 'px';
      break;
    case 39:
      box1.style.left = box1.offsetLeft + speed + 'px';
      break;
    case 40:
      box1.style.top = box1.offsetTop + speed + 'px';
      break;
  }
}
```

# Navigator

BOM模型:浏览器对象模型,BOM可以通过JS操作浏览器,以下都是BOM对象

**Navigator:可以通过Navigator来识别不同的浏览器吗,因为它代表的是当前浏览器的信息**

1. 由于历史原因,Navigator对象中的大部分属性已经不能帮助我们使用浏览器信息了
2. 一般只会使用userAgent(用户代理)来判断浏览器的信息
3. userAgent是一个字符串,这个字符串中包含有用来描述浏览器信息的内容
4. 在IE11中已经将微软和IE相关的表示都已经去除了,所以我们基本不能通过识别IE了

```javascript
var nav = navigator.userAgent
if(/chrome/i.test(nav)){
  console.log("这是谷歌浏览器")
}
```

**Screen:代表用户的屏幕信息,通过该对象可以获取到用户的显示器的相关信息,一般用在移动端**

```javascript
//如果userAgent不能判断,我们还可以通过一些浏览器中特有的对象,来判断浏览器的信息,比如ActiveXObject
if(!!window.ActiveXObject || 'ActiveXObject' in window){
  alert('抓住你了');
}else{
  alert('不是IE')
}
```

# History

**History:代表浏览器的历史记录,可以通过该对象来操作浏览器的历史记录**

1. 由于隐私原因,该对象不能获取到具体的历史记录,只能操作浏览器向前或向后翻页
2. 而且该操作只在当次访问时有效

```javascript
alert(history.length)//History的长度代表的是所有的页面
var btn = document.getElementById('btn');
btn.addEventListener("click",function(){
  history.back()//返回上一个界面
},false)
btn.addEventListener("click",function(){
  history.forward()//进入下一个界面
},false)
btn.addEventListener("click",function(){//go()中传入一个整数参数,可以为负数
  history.go(1)//1代表向前跳转一个界面,2代表向前两个,-1代表向后,-2,-3...
},false)
```

# Location

**Location:代表的是浏览器的地址栏信息,通过Location可以获取地址栏信息,或者操作浏览器跳转页面**

1. 直接打印location,可以获取到地址栏的信息(当前页面的完整路径)
2. 如果将location对象修改为一个完整的路径,或相对路径,则我们的页面会自动跳转到该路径,并生成相应的历史记录
3. assign():用来跳转到其他的页面,作用和直接修改location一摸一样
4. reload():用于刷新当前页面,和刷新一样,如果在方法中传递一个true,作为参数,则会强制清空缓存率先你页面
5. replace:可以用新的页面替换当前页面,调用完毕也会跳转页面,但是不会生成历史记录,不能使用回退按钮回退

```javascript
var btn = document.getElementById('btn');
btn.onclick = function(){
  location = 'http://www.baidu.com';
  // location.assign('https://www.baidu.com');
  // location.reload();//效果和刷新一样
  // location.replace('www.taobao.com');
}
```

# 定时器简介

setInterval():

1. **定时调用,可以将一个函数,每隔一段时间调用一次,会重复执行多次**
2. 每次调用间隔的时间,单位是毫秒
3. 定时器函数会返回一个Number类型的数据,**这个数字用来作为定时器的唯一标识**

```javascript
var count = getElementById("count")
var num = 0
var timer = setInterval(function(){
  count.innerHTML = num++
  if(num == 10){
    clearInterval(timer)//
  }
},2000)
```

# 切换图片练习

**clearInterval():用来关闭一个定时器,方法中需要传定时器的标识作为参数,这样将关闭标识对应的定时器,可以传入任意的参数,但如果是无效的定时器标识参数,则不会做任何操作[15]**

```javascript
var btn = document.getElementById('btn');
var timer;//在监听事件外定义timer
btn.onclick = function(){//每一次点击btn都会开启一个定时器,定时器的速度会叠加
  var imgArr = []
  var num = 0
  var img = document.getelementById("img")
  clearInterval(timer);//因此在启动一个定时器前,把当前元素上的所有之前的定时器清除关闭
  timer = setInterval(function(){
    num++
    num %= imgArr.length //相当于if(num>5){num = 0},因为0%5==0,和1%5至4%5也是等于1-4
    img.src = imgArr[num]
  },1000)
}
var btn1 = document.getElementById('btn1');
btn1.onclick = function(){
  clearInterval(timer);
}
```

# 修改div移动练习

```javascript
var box1 = document.getElementById('box1');
var speed = 10;
var dir = 0;
setInterval(function () {//当页面window.onload之后,定时器每30ms执行一次函数
  switch (dir) {//30ms远小于第二次为了避免误操作的延迟,所以变得丝滑
    case 37:
      box1.style.left = box1.offsetLeft - speed + 'px';
      break;
    case 38:
      box1.style.top = box1.offsetTop - speed + 'px';
      break;
    case 39:
      box1.style.left = box1.offsetLeft + speed + 'px';
      break;
    case 40:
      box1.style.top = box1.offsetTop + speed + 'px';
      break;
  }
}, 30);
//开启一个定时器,控制div的移动
document.onkeydown = function (event) {
  event = event || window.event
  if (event.ctrlKey) {
    speed = 50;
  } else{
    speed = 10;
  }
  dir = event.keyCode;
}
document.onkeyup = function(){
  dir = 0;
}
```

# 延时调用

setTimeout():延时调用一个函数不马上执行,而是隔一段时间以后再执行,**且只执行一次**

**延时调用和定时调用的区别:定制调用会执行多次,而延时调用只会执行一次**

```javascript
var num = 1;
var timer = setTimeout(function () {
  console.log('真绫姐姐')
}, 3000)
clearTimeout(timer);//清除延时调用,使延时调用不再输出真绫姐姐
```

**延时调用和定时调用是可以互相替代的**

# 定时器的应用

```javascript
window.onload = function () {
  var box1 = document.getElementById('box1')
  var btn01 = document.getElementById('btn01')
  var timer;
  btn01.onclick = function () {das
    clearInterval(timer);//考虑多次点击造成的定时间器叠加问题
    timer = setInterval(function () {
      //获取box1原来的值,parseInt是为了将字符串中的值合法的取出来,考虑不是移动数值不是整数的情况
      var oldvalue = parseInt(getStyle(box1, 'left'))//定时器每次执行时,都获取元素当前的位置
      var newvalue = oldvalue + 19;
      if (newvalue >= 800) {
        newvalue = 800;
      }
      box1.style.left = newvalue + 'px';
      if (newvalue == 800) {//停止定时器
        clearInterval(timer);
      }
    }, 30)
  }
  function getStyle(obj, name) {//获取元素的样式的函数
    if (window.getComputedStyle) {
      return getComputedStyle(obj, null)[name];
    } else { return obj.currentStyle[name]; };
  };
}
```

# 定时器的应用1

```javascript
var box1 = document.getElementById('box1')
var btn01 = document.getElementById('btn01')
var btn02 = document.getElementById('btn02')
var timer;
btn01.onclick = function(){
  move(box1,800,10)
}
btn02.onclick = function(){
  move(box1,0,10)
}
function move(name, target, speed) {
  var current = parseInt(getStyle(name, 'left'))
  if(current > target){
    speed = -speed;
  }
  //考虑多次点击造成的定时间器叠加问题
  clearInterval(timer);
  timer = setInterval(function () {
    //获取box1原来的值,parseInt是为了将字符串中的值合法的取出来
    var oldvalue = parseInt(getStyle(name, 'left'))
    //考虑不是移动数值不是整数的情况
    var newvalue = oldvalue + speed;
    if ((speed < 0 && newvalue < target) || (speed > 0 && newvalue > target)) {
      newvalue = target;
    }
    name.style.left = newvalue + 'px';
    if (newvalue == target) {
      clearInterval(timer);
    }
  }, 30)
}
function getStyle(obj, name) {
  if (window.getComputedStyle) {
    return getComputedStyle(obj, null)[name];
  } else { return obj.currentStyle[name]; };
};
```

# 定时器的应用

```javascript
function move(name,attr,target,speed,callback) {
  var current = parseInt(getStyle(name, attr))
  if(current > target){
    speed = -speed;
  }
  //考虑多次点击造成的定时间器叠加问题
  clearInterval(name.timer);
  //因为页面一加载的时候就会载入JS代码,所以会先运行一遍,这样就存在了obj.timer属性,这样在点击时,就会加载timer属性了
  name.timer = setInterval(function () {//添加name参数,这是个对象,将自己的定时器保存为自己的属性,避免了清除定时器将自己清除
    //获取box1原来的值,parseInt是为了将字符串中的值合法的取出来
    var oldvalue = parseInt(getStyle(name, attr))
    //考虑不是移动数值不是整数的情况
    var newvalue = oldvalue + speed;
    if ((speed < 0 && newvalue < target) || (speed > 0 && newvalue > target)) {
      newvalue = target;
    }
    //因为这里要放的是一个变量,所以attr要加[],因为常量用点,变量用中括号
    name.style[attr] = newvalue + 'px';
    if (newvalue == target) {
      clearInterval(name.timer);
      //回调函数,但是如果有的不想使用回调函数,那么就先判断是否有回调函数,有就执行,没有不执行
      callback && callback();
    }
  }, 30)
}
function getStyle(obj, name) {
  if (window.getComputedStyle) {
    return getComputedStyle(obj, null)[name];
  } else { return obj.currentStyle[name]; };
};
```

# 轮播图

# 轮播图

# 轮播图

# 类的操作

**通过style属性来修改元素的样式,没修改一个样式,浏览器就需要重新渲染一次页面,这样的代码执行起来性能比较差**

```javascript
box.style.width = "200px"
box.style.height = "200px"
box.style.backgroundColor = "red"//通过style修改样式,有300的样式要修改就要修改三百次 
```

```javascript
box.className = "box1" //可以通过修改元素的class属性间接操作修改样式,浏览器也只要渲染一次,且代码小
```

**addClass:修改一个元素中的指定的class的属性**

```javascript
function addClass(obj , cn){
  if(!hasClass(obj , cn)){//调用正则表达式检查类名是否已存在
    obj.className += " "+cn;////通过添加类名的方法来添加样式, 两个类中共同的样式,后添加的class样式会覆盖之前的class样式
  }
}
function hasClass(obj , cn){//判断obj中有没有cn class
  var reg = new RegExp("\\b"+cn+"\\b");//var reg = /\bb2\b/;
  return reg.test(obj.className);
}
```

**removeClss函数:删除一个元素中的指定的class属性**

```javascript
function removeClass(obj , cn){
  var reg = new RegExp("\\b"+cn+"\\b");//创建一个正则表达式
  obj.className = obj.className.replace(reg , "");//删除class
}
```

**toggleClass函数:可以用来切换一个类,如果元素中具有该类,则删除;如果元素中没有该类,则添加**

```javascript
function toggleClass(obj , cn){
  if(hasClass(obj , cn)){//判断obj中是否含有cn 
    removeClass(obj , cn);//有,则删除
  }else{
    addClass(obj , cn);//没有,则添加
  }
}
```

# 二级菜单

# 二级菜单

```javascript
//获取className但是为了兼容IE8所以用的时querySelectorAll,加.是为了变成CSS选择器
var menuspan = document.querySelectorAll('.menuspan');
for(var i=0;i<menuspan.length;i++){
  menuspan[i].onclick = function(){
    var parentDiv = this.parentNode;
  }
}
```

# JSON

**JSON:JS中的对象,只有JS认识,但是需要把对象传到其他语言的设备去,而其他语言不识别对象**

1. 将对象转换成所有语言都认识的基础数据类型,123,true,;"字符串";
2. **JSON就是一个特殊格式的字符串,可以被所有语言识别并且可以转换成任意语言中的对象,其他语言也一样**
3. JSON在开发中主要用来做数据的交互
4. JSON:JavaScript Object Notation,JS对象表示法 
5. JSON和JS对象的格式一样,只不过JSON字符传中的属性名必须加双引号

```javascript
var obj = '{"name":"maaya","age":18,"Female":true}'//JSON对象
var arr = '[1,2,3,4,"Maaya"]'//JSON数组
```

**JSON分类:1)对象{},2)数组[]**

JSON中允许的值有:字符串,布尔值,数值,null,对象,数组,不可以是函数

```javascript
//JS中存在一个工具类,名字就叫JSON,可以帮我们将一个JSON转换为JS对象,也可以将一个JS对象转换成JSON
var obj1 = JSON.parse(obj);//JSON → JS
var arr1 = JSON.parse(arr);//JSON.Parse(),需要一个JSON字符串作为参数,会将该字符串转换为JS对象
console.log(obj1.name);
console.log(arr1[4]);

var js = {name:'sister',like:'yes'};//JS对象 → JSON
var json = JSON.stringify(js);//JSON.stringify():将一个JS对象转换为JSON字符串,需要一个JS对象作为参数,会返回一个JSON字符串
console.log(json);
```

# JSON1

JSON在IE7以下不支持

**eval():这个函数可以执行一段字符串形式的JS代码,并将结果返回**

1. 如果使用eval()执行的字符串中含有{},它会将{}当成是代码块
2. 如果不希望被当成一个代码块解析,则需要在字符串前后() 
3. eval()这个函数的功能很强大,可以直接执行一个字符串中的JS代码但是开发中尽量不使用
4. 首先它的执行性能比较差,然后它还具有安全隐患
5. 如果一定需要兼容IE7以下的代码,那么直接执行应用一个JS外部文件就好了
6. 文件是day18的js文件夹中的json2.js,这一个自己写的JSON对象

```javascript
var str = '{"name":"Maaya","age":"18","gender":"Female"}';
var str1 = "alert('我是一段JS代码的字符串')"
var obj = eval('('+str+')');
console.log(obj); 
```

