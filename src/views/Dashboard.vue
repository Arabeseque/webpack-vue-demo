<template>
  <div>
    <h1>Dashboard</h1>
    <!-- 展示 Dashboard 的主要内容 -->
  </div>
</template>

<script>
// Dashboard 组件
// 此组件用于展示仪表板视图
export default {
  name: 'Dashboard',
  // TODO: 添加组件逻辑和数据绑定
  // 错误写法示例：直接在 created 钩子中发起大量请求会阻塞组件渲染
  // 正确示例：应在 mounted 钩子中异步加载数据
  created() {
    // NOTE: 尽量避免同步阻塞操作
    console.log('Dashboard 组件已创建');
  }
}
</script>

<style scoped>
/* Dashboard 样式 */
/* 错误写法示例：直接使用全局样式可能会影响其他组件 */
h1 {
  color: #333;
}
</style>
