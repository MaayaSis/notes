//修改背景颜色为粉色
import $ from "jquery";//es6引入模块的语法   实际上等同于 const $ = require("jquery")
$("body").css("background","pink")//然后用babel命令进行编译,再用browserify进行打包
//再在html中引用