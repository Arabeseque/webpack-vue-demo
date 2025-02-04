/*
设计思路文档
- **预加载策略**: 在入口文件中主动导入Dashboard组件，实现预加载，提升用户点击路由时的响应速度。
*/
// main.js
import './styles/global.css' // 确保存在这个文件

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
