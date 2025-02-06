<template>
  <div v-if="isLoading" class="container">
    <div class="loading">
      <i></i><i></i><i></i><i></i>
    </div>
    <div class="welcome-text">
      欢迎来到我的主页
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false, // 控制加载动画的显示
    };
  },
  mounted() {
    // 检查 sessionStorage，判断是否已经显示过加载动画
    const hasShownLoader = sessionStorage.getItem('hasShownLoader');

    // 如果之前没有显示过加载动画，才显示
    if (!hasShownLoader) {
      this.isLoading = true;
      // 设置 2 秒后关闭加载动画
      setTimeout(() => {
        this.isLoading = false;
        // 设置 sessionStorage 标记，防止后续刷新时再显示加载动画
        sessionStorage.setItem('hasShownLoader', 'true');
      }, 2000); // 2秒后关闭加载动画
    }
  },
};
</script>

<style scoped>
/* 基础样式 */
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 适配不同模式背景 */
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffffff; /* 默认白色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  flex-direction: column;
}

/* 加载动画 */
.loading {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50px;
  height: 50px;
}

.loading i {
  width: 10px;
  height: 10px;
  background-color: #000; /* 默认黑色小圆点 */
  border-radius: 50%;
  animation: loadingAnimation 0.6s infinite ease-in-out;
}

.loading i:nth-child(1) {
  animation-delay: 0s;
}
.loading i:nth-child(2) {
  animation-delay: 0.15s;
}
.loading i:nth-child(3) {
  animation-delay: 0.3s;
}
.loading i:nth-child(4) {
  animation-delay: 0.45s;
}

/* 欢迎文本 */
.welcome-text {
  font-size: 24px;
  font-weight: bold;
  color: #2196F3; /* 默认蓝色文字 */
  margin-top: 20px;
  text-align: center;
  animation: fadeIn 2s ease-in-out;
}

/* 动画 */
@keyframes loadingAnimation {
  0%, 100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  /* 背景设置为黑色 */
  .container {
    background: #121212;
  }
  
  /* 加载动画小圆点为白色 */
  .loading i {
    background-color: #fff;
  }
  
  /* 欢迎文本颜色设置为淡色 */
  .welcome-text {
    color: #81D4FA; /* 更亮的蓝色 */
  }
}
</style>