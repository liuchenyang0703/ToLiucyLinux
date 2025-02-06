<template>
  <div>
    <!-- 包裹计时器的容器 -->
    <div 
      v-if="isVisible" 
      :style="positionStyle" 
      @click="toggleVisibility" 
      class="container"
    >
      <!-- 计时器和导航栏 -->
      <div class="timer-container">
        <div v-if="runningTimeMessage" class="timer-message">{{ runningTimeMessage }}</div>
        <nav :class="navbarClass"></nav>
      </div>
    </div>

    <!-- 贴边箭头 -->
    <button 
      v-else 
      @click="toggleVisibility" 
      class="arrow-button" 
      :style="arrowStyle"
    >
      →
    </button>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "RunningTimeFooter",
  data() {
    return {
      runningTimeMessage: "",
      navbarClass: "",
      isVisible: false,
    };
  },
  props: {
    startDate: {
      type: Date,
      default: () => new Date("2023-11-16"),
    },
    messages: {
      type: Object,
      default: () => ({
        "/": "本站已运行 :day 天 :hour 小时 :minute 分钟 :second 秒",
      }),
    },
    isTransparent: {
      type: Boolean,
      default: true,
    },
    position: {
      type: Object,
      default: () => ({
        bottom: "10px",
        right: "10px",
      }),
    },
  },
  computed: {
    positionStyle() {
      return {
        position: "fixed",
        ...this.position,
        zIndex: 1000,
        cursor: "pointer",
      };
    },
    arrowStyle() {
      return {
        position: "fixed",
        bottom: this.position.bottom,
        right: "0px",
        zIndex: 1001,
        cursor: "pointer",
      };
    },
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
    setupRunningTimeFooter() {
      const updateRunningTime = () => {
        const now = new Date();
        const diff = Math.floor((now - this.startDate) / 1000);

        const days = Math.floor(diff / 86400);
        const hours = Math.floor((diff % 86400) / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        const seconds = diff % 60;

        const message = this.messages["/"]
          .replace(":day", days)
          .replace(":hour", hours)
          .replace(":minute", minutes)
          .replace(":second", seconds);

        this.runningTimeMessage = message;
      };

      updateRunningTime();
      setInterval(updateRunningTime, 1000);
    },
    setupTransparentNavbar() {
      this.navbarClass = this.isTransparent ? "transparent-navbar homepage" : "navbar";
    },
  },
  mounted() {
    this.setupRunningTimeFooter();
    this.setupTransparentNavbar();
  },
});
</script>

<style scoped>
.container {
  position: relative;
  z-index: 1000;
}

.timer-container {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  position: relative;
}

.timer-message {
  font-size: 14px;
  color: #333;
}

.transparent-navbar {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.navbar {
  background: #fff;
}

.arrow-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0 5px 5px 0;
  padding: 8px 12px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.arrow-button:hover {
  background-color: #0056b3;
}
</style>
