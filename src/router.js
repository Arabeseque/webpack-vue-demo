/*
- 使用 Vue Router 的懒加载特性，降低首屏加载时间。
- 利用 Webpack 魔法注释指定 chunk 名称和预加载策略，便于调试与性能优化。
*/

import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  {
    path: '/dashboard',
    // NOTE: 懒加载Dashboard组件，并使用webpackChunkName和webpackPrefetch提高性能
    component: () =>
      import(
        /* webpackChunkName: "dashboard", webpackPrefetch: true */
        './views/Dashboard.vue'
      )
  },
  {
    path: '/user',
    // NOTE: 懒加载User组件，并使用webpackChunkName和webpackPrefetch提高性能
    component: () =>
      import(
        // 使用 preload 的方式，我们可以在不影响首屏加载的情况下，提前请求资源，这样在用户点击路由时可以更快地加载组件。
        /* webpackChunkName: "user", webpackPrefetch: true */
        './views/User.vue'
      )
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 学习要点总结
// [CONCEPT]: Vue Router的懒加载与预加载 (参考资料: https://router.vuejs.org/guide/advanced/lazy-loading.html)
// [PERF]: 利用Webpack魔法注释实现按需加载和预加载，提升页面性能

export default router;
