//引入的不再是Vue构造函数了，引入的是一个名为createApp的工厂函数
/* 
构造函数和工厂函数:

构造函数使用new Vue()的形式创建,必须使用new 且构造函数名首字母大写

工厂函数直接调用即可

 */
import { createApp } from 'vue'
import App from './App.vue'

//创建应用实例对象——app(类似于之前Vue2中的vm，但app比vm更“轻”)
const app = createApp(App)
//挂载app组件
app.mount('#app')
// 以下为完整写法
// createApp(app).mount('#app')

setTimeout(()=>{//延时卸载app组件
    app.unmount("#app")
},1000)

 //vue.config.js中也可以使用vue2的lint关闭语法检查
