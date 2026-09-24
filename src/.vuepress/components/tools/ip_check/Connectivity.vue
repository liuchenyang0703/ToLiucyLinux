<template>
  <div>
    <div v-if="anyLoading" class="hint-container note">
      正在测试连接...
    </div>
    <section v-for="group in groupedResults" :key="group.key" class="connectivity-group">
      <h3 class="group-title">{{ group.name }}</h3>
      <div v-for="result in group.results" :key="result.name" :class="['hint-container', getStatusClass(result)]">
        <p class="hint-container-title">{{ result.name }}</p>
        <div v-if="result.error">
          {{ result.error === 'timeout' ? '连接超时' : '访问失败' }}
        </div>
        <div v-else-if="result.loading">
          测试中: {{ result.time || 0 }} ms...
        </div>
        <div v-else>
          访问时间：{{ result.time }} ms
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      results: [
        { group: 'domestic', name: 'Taobao', url: 'https://www.taobao.com', time: null, error: false, loading: false },
        { group: 'domestic', name: 'Baidu', url: 'https://www.baidu.com', time: null, error: false, loading: false },
        { group: 'domestic', name: 'WeChat', url: 'https://pc.weixin.qq.com/', time: null, error: false, loading: false },
        { group: 'overseas', name: 'GitHub', url: 'https://github.com', time: null, error: false, loading: false },
        { group: 'overseas', name: 'YouTube', url: 'https://www.youtube.com', time: null, error: false, loading: false },
        { group: 'overseas', name: 'OpenAi', url: 'https://chat.openai.com/', time: null, error: false, loading: false },
        { group: 'personal', name: 'ToLiucyLinux', url: 'https://liuchenyang.top/', time: null, error: false, loading: false },
        { group: 'personal', name: 'ToLiucyLinux - github', url: 'https://liuchenyang0703.github.io/ToLiucyLinux/', time: null, error: false, loading: false },
        { group: 'personal', name: 'ToLiucyLinux网址导航', url: 'https://liuchenyang.top/nav/', time: null, error: false, loading: false },
        { group: 'personal', name: 'K8s YAML Generator', url: 'https://liuchenyang.top/kubernetes/', time: null, error: false, loading: false },
      ]
    };
  },
  computed: {
    anyLoading() {
      return this.results.some(result => result.loading);
    },
    groupedResults() {
      return [
        { key: 'domestic', name: '国内网站' },
        { key: 'overseas', name: '国外网站' },
        { key: 'personal', name: '个人站点' },
      ].map(group => ({
        ...group,
        results: this.results.filter(result => result.group === group.key),
      }));
    }
  },
  mounted() {
    this.testConnectivity();
  },
  methods: {
    getStatusClass(result) {
      if (result.loading) return 'note';
      return result.error ? 'caution' : 'tip';
    },

    createTimeout(timeout = 60000) {
      return new Promise((_, reject) => {
        setTimeout(() => reject(new Error('timeout')), timeout);
      });
    },

    async testSingleUrl(result) {
      result.loading = true;
      const startTime = performance.now();
      const updateTime = () => {
        if (result.loading) {
          result.time = Math.round(performance.now() - startTime);
          requestAnimationFrame(updateTime);
        }
      };
      updateTime();

      try {
        await Promise.race([
          fetch(result.url, { mode: 'no-cors' }),
          this.createTimeout()
        ]);
        result.time = Math.round(performance.now() - startTime);
      } catch (error) {
        result.error = error.message === 'timeout' ? 'timeout' : 'error';
      } finally {
        result.loading = false;
      }
    },

    async testConnectivity() {
      const promises = this.results.map(result => this.testSingleUrl(result));
      await Promise.allSettled(promises);
    }
  }
};
</script>

<style scoped>
.connectivity-group {
  margin: 1.25rem 0;
}

.group-title {
  margin: 0 0 0.65rem;
  padding: 0 0.2rem 0.45rem;
  color: var(--vp-c-text);
  font-size: 1rem;
  border-bottom: 1px solid var(--vp-c-border);
}
</style>
