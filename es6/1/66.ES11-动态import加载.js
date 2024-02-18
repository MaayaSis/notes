import * as m66 from "./66.附属文件" //正常调用模块,即我不管你用不用,我现给你加载了
 
const btn = document.getElementById("jiejie ")
 btn.onclcik = function(){
	 import("./66.附属文件").then(module=>{
		 module.hello()//最后暴露的模块会作为module参数传入 所以最后使用模块.方法即可调用暴露出来的方法
	 })
 }