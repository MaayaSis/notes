//D:\OneDrive\Vue\1\maaya\src\main.js

import { createApp } from 'vue'//引入vue
import App from './App.vue'//引入App组件,他是所有组件的父组件

//创建vue实例独享vm,
createApp(App).mount('#app')//.mount("#app")相当于:el:"#app"