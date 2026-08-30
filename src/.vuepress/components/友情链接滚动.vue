<template>
  <div class="auto-scroll-container">
    <h2 class="section-title">🍂 友情链接滚动条</h2>
    <p class="section-description">友情链接架起探索的桥梁，连接精彩资源，开启无限灵感的旅程。</p>
    <div class="scroll-wrapper" ref="scrollWrapper">
      <div class="scroll-container" ref="scrollContainer">
        <div class="vp-project-panel">
          <template v-if="linkDatas.length > 0" v-for="(item, index) in linkDatas" :key="index">
            <div class="link-card">
              <a class="card-body" :href="item.link" target="_blank">
                <img class="link-picture" :src="item.icon" alt="" rel="noopener noreferrer external" />
                <div class="card-content">
                  <div class="link-avatar my-auto">
                    <img :src="item.icon" onerror='this.onerror=null,this.src=this.srcset="/assets/avatar.webp"' />
                  </div>
                  <div class="link-text">
                    <div class="link-name">{{ item.name }}</div>
                    <div class="link-desc">{{ item.desc }}</div>
                  </div>
                </div>
              </a>
            </div>
          </template>
          <!-- 复制一份内容用于无缝滚动 -->
          <template v-if="linkDatas.length > 0" v-for="(item, index) in linkDatas" :key="index + linkDatas.length">
            <div class="link-card">
              <a class="card-body" :href="item.link" target="_blank">
                <img class="link-picture" :src="item.icon" alt="" rel="noopener noreferrer external" />
                <div class="card-content">
                  <div class="link-avatar my-auto">
                    <img :src="item.icon" onerror='this.onerror=null,this.src=this.srcset="/assets/avatar.webp"' />
                  </div>
                  <div class="link-text">
                    <div class="link-name">{{ item.name }}</div>
                    <div class="link-desc">{{ item.desc }}</div>
                  </div>
                </div>
              </a>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { friends, LinkData } from './友情链接';

let linkDatas: LinkData[] = friends;

const scrollWrapper = ref<HTMLElement | null>(null);
const scrollContainer = ref<HTMLElement | null>(null);
let scrollInterval: ReturnType<typeof setInterval> | undefined;

function autoScroll() {
  const wrapper = scrollWrapper.value;
  const container = scrollContainer.value;
  if (wrapper && container) {
    const containerWidth = container.clientWidth / 2; // 因为内容复制了一份，所以实际内容宽度是容器宽度的一半
    let scrollPosition = 0;
    const scrollSpeed = 1;
    scrollInterval = setInterval(() => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= containerWidth) {
        scrollPosition = 0;
      }
      wrapper.scrollLeft = scrollPosition;
    }, 20);
  }
}

onMounted(() => {
  autoScroll();
});

onBeforeUnmount(() => {
  if (scrollInterval) {
    clearInterval(scrollInterval);
  }
});
</script>

<style scoped>
.auto-scroll-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
}

.section-title {
  font-size: 24px;
  margin-bottom: 10px;
  color: #00E8AF;
}

.section-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.scroll-wrapper {
  width: 100%;
  overflow-x: hidden;
  position: relative;
  height: 220px;
}

.scroll-container {
  display: flex;
  width: max-content;
}

.vp-project-panel {
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
}

.link-card {
  position: relative;
  display: inline-block;
  margin: 8px 11px;
  border-radius: 0.5rem;
  overflow: hidden;
  min-height: 180px;
  color: inherit;
  background-image: linear-gradient(to top,
    #7873f5 0%,
    #97d9e1 33%,
    #ec77ab 100%);
  box-shadow: 1px 1px 8px var(--card-shadow);
  cursor: pointer;
  transition: box-shadow var(--transform-transition) transform var(--transform-transition);
  width: 180px;
}

.link-card:hover {
  transform: scale(0.98, 0.98);
  box-shadow: 0;
}

a.card-body {
  --light: #f8f9fa;
  border-radius: 0.5rem;
  box-shadow: 0 0.2rem 1rem 0 rgba(0, 0, 0, 0.5),
    0 0 0 2px rgba(255, 255, 255, 0.15);
  display: inline-block;
  width: 100%;
  height: 100%;
}

.card-content {
  display: flex;
  align-items: center;
  height: auto;
  justify-content: center;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-direction: column;
  width: 100%;
}

.link-avatar {
  flex: none;
  transition: transform 0.6s ease-in-out, opacity 0.5s ease-in-out;
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.link-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid var(--border-color);
  background-color: var(--light);
  object-fit: contain;
  box-shadow: 0 0 0 0.2rem rgba(195, 195, 195, 0.2),
    0 0 0 0.4rem rgba(195, 195, 195, 0.1);
  pointer-events: none !important;
}

.link-text {
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  line-height: 1.5;
  flex: none;
  text-align: center;
  padding: 0 10px;
  font-family: ZWZT,
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", STHeiti, "Microsoft YaHei", SimSun, sans-serif';
}

.link-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--light);
  font-weight: 700;
  font-size: 16px;
}

.link-desc {
  max-height: 2rem;
  color: #f8f9fa;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 12px;
  line-height: 1.2;
}

@media (any-hover: hover) {
  a.card-body:hover .link-picture {
    transform: scale(1);
    filter: opacity(1) blur(0px) saturate(150%);
  }

  a.card-body:hover .link-avatar {
    transform: rotate(360deg) scale(1.3);
    opacity: 0;
  }

  a.card-body:hover .link-text {
    transform: translateX(100%);
    opacity: 0;
  }
}

.card-body .link-picture {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  border-radius: 0.5rem;
  filter: opacity(0.5) blur(10px) saturate(0.5) brightness(0.5);
  transform: scale(0.96);
  transition: all var(--transform-transition);
}
</style>