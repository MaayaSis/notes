<script>
/* 
路由跳转操作浏览器历史记录就是一个堆:后进先出,而跳转到存在replace属性的router-link标签时,跳转前的那条标签就会被跳转后的标签覆盖
1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：分别为push和replace，push是追加历史记录，replace是替换当前记录。路由跳转时候默认为push
3. 如何开启replace模式：<router-link replace .......>News</router-link>
 
 */
</script>