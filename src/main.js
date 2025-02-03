import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.mount('#app');

// 开发环境下启用模块热替换
if (module.hot) {
  module.hot.accept();
}
