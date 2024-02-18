#  初见less

# less基础

less 中以 // 开头的注释,不会被编译到 CSS 文件中 , 以 /* */ 开头的注释 , 会被编译到 CSS 文件中 ;

```less
//可以使用 @ 来申明一个变量 ：@pink : pink;
@color:pink;
//可以使用 @{} 来申明一个属性名或选择器 , 
@{m}:margin;
#inner{
				width: 100px;
				height: 100px;
				background: @color;
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				margin: auto;
			}
```

变量的延迟加载

```less
@var:0;
.class{
  @var:1;
  .brass{
    @var:2
    three:@var //值为3
    @var:3
  }
  one:@var;  //值为1
}
```

less 的嵌套规则

```less
#inner{
				width: 100px;
				height: 100px;
				background: pink;
				&hover:blue //  代表的是inner直接引用hover  , 和hover是平级关系
			}
```

#  less混合

混合 : 将一系列属性从一个规则集引入到另一个规则集的方式 :

普通混合 : `.juzhong{}`

不输出的混合 : `.juzhong(){}`

带参数输出的混合 : `.juzhong(@a,@b,@c){}` 

带参数且有默认值的混合 : `.juzhong(@a:100,@b:100,@c:100){}`

命名参数 :  当形参和实参不匹配时可以将实参指定给形参 `.juzhong{ @c:500 }`

```less
.juzhong{ 
  width: 100px;
  height: 100px;
  background: blue;
}
#wrap{
  #inner{
    .juzhong; //相当于直接将.juzhong复制到inner中
  }
  #inner2{
    .juzhong;
  }
}
```

CSS中的一个正方形是由四个三角形组合构成

此行为匹配参数

```less
.triangle(@_){}  //  当调用下面的混合时,会将本行带@_的同名混合带上
.triangle(L,@w,@c){  // L相当于是左标识符
  width:0px;
  height:0px;
  border-width:@w;
  border-style:dashed solid dashed dashed;
  border-color:transparent;@c;transparenttransparent
}
```

引用

```less
//可以将定义一个三角形的库放到一个新建的less文件中,然后引用它
@import './triangle.less'
```

# less混合

arguments : 实参列表

```less
.border(@1,@2,@3){
  border:@arguments
}
#box1{
  .boder(1px,solid,black)
}
```

# less的计算

```less
#box1{
  width:(100 +100px) //  只要其中一方带单位即可
}
```

#  less复习

#  less继承

参考超哥	

继承实质上将 .father 选择器和 #test 组合成一个选择器 , 声明块使用 .father 的 

all: 继承所有和 .father 相关的声明块 , 切记父类不能定义成混合

继承的灵活性能高 , 混合灵活性

#  less避免编译

```less
*{
  margin:100 * 10px;
  padding:~'calc(100px + 100 '; //使用 ~'' 这两个组合符号时,可以避免编译
}
```

