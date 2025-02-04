<template>
  <div id="app">
    <h1>Hello, Webpack + Vue!</h1>
    <button @click="loadModule">加载模块</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    loadModule() {
      // 动态导入模块，Webpack 会自动进行代码分割
      import('./lazy-module')
        .then(module => {
          // 假设 lazy-module.js 导出了 default 方法
          module.default();
        })
        .catch(err => {
          console.error('模块加载失败:', err);
        });
    }
  }
}
</script>
