<template>
  <div>
    <h1>User 组件</h1>
    <!-- 显示用户信息 -->
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      userInfo: null // 初始化用户数据为空
    }
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    /**
     * fetchUserData函数
     * 功能：异步获取用户数据并更新组件状态
     * 参数：无
     * 返回值：无
     * 使用示例：在mounted钩子中调用此函数
     */
    async fetchUserData() {
      try {
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({ name: 'John Doe', age: 30 });
          }, 500);
        });
        this.userInfo = response;
      } catch (error) {
        console.error('获取用户数据失败:', error);
      }
    }
  }
}
</script>

<style scoped>
h1 {
  color: #0066cc;
}
</style>
