<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, resolveComponent } from "vue";
import { useSiteData } from "vuepress/client";
import { Layout, useDarkMode } from "vuepress-theme-hope/client";
import { travelList } from "./travel.js";

const site = useSiteData();
const CommentService = resolveComponent("CommentService");
const { isDarkMode } = useDarkMode();
const assetPath = (path: string): string => /^https?:\/\//u.test(path) ? path : `${site.value.base}${path}`;
const currentIndex = ref(0);
const currentTravel = computed(() => travelList[currentIndex.value]);
let carouselTimer: ReturnType<typeof setInterval> | undefined;

const showNext = (): void => {
  currentIndex.value = (currentIndex.value + 1) % travelList.length;
};

const showPrevious = (): void => {
  currentIndex.value = (currentIndex.value - 1 + travelList.length) % travelList.length;
};

const startCarousel = (): void => {
  if (!carouselTimer) carouselTimer = setInterval(showNext, 4500);
};

const stopCarousel = (): void => {
  if (carouselTimer) clearInterval(carouselTimer);
  carouselTimer = undefined;
};

onMounted(() => {
  document.body.setAttribute("data-type", "travel");
  startCarousel();
});

onUnmounted(() => {
  document.body.removeAttribute("data-type");
  stopCarousel();
});
</script>

<template>
  <Layout>
    <template #default>
      <main id="main-content" class="vp-page travel-page">
        <div class="travel-shell">
          <header class="travel-hero" @mouseenter="stopCarousel" @mouseleave="startCarousel">
            <Transition name="travel-hero-fade">
              <img
                :key="currentTravel.image"
                :src="assetPath(currentTravel.image)"
                :alt="`${currentTravel.city}旅行照片`"
              />
            </Transition>
            <div class="travel-hero-mask" />
            <div class="travel-hero-content">
              <span>TRAVEL MEMORIES</span>
              <h1>旅行足迹</h1>
              <p>走过山川湖海，把沿途的故事留在这里</p>
              <strong>{{ travelList.length }} 个目的地</strong>
            </div>
            <div class="travel-carousel">
              <button type="button" aria-label="上一张旅行照片" @click="showPrevious">‹</button>
              <span>{{ String(currentIndex + 1).padStart(2, "0") }} / {{ String(travelList.length).padStart(2, "0") }}</span>
              <button type="button" aria-label="下一张旅行照片" @click="showNext">›</button>
            </div>
          </header>

          <div class="travel-heading">
            <div>
              <span>MY JOURNEY</span>
              <h2>去过的地方</h2>
            </div>
            <p>每一次出发，都是生活写下的新章节。</p>
          </div>

          <section class="travel-grid" aria-label="旅游相册">
            <figure v-for="(item, index) in travelList" :key="item.city" class="travel-card">
              <a class="travel-photo" :href="assetPath(item.image)" target="_blank" rel="noopener noreferrer">
                <img :src="assetPath(item.image)" :alt="`${item.city}旅行照片`" loading="lazy" />
                <span class="travel-index">{{ String(index + 1).padStart(2, "0") }}</span>
              </a>
              <figcaption>
                <h3>{{ item.city }}</h3>
                <p>{{ item.description }}</p>
                <a class="travel-view" :href="assetPath(item.image)" target="_blank" rel="noopener noreferrer">查看照片 →</a>
              </figcaption>
            </figure>
          </section>

          <div class="travel-end">
            <span>✦</span>
            <p>旅途仍在继续，下一站见</p>
          </div>

          <div class="travel-comments">
            <component :is="CommentService" :darkmode="isDarkMode" />
          </div>
        </div>
      </main>
    </template>
  </Layout>
</template>

<style lang="scss">
.travel-page {
  box-sizing: border-box;
  width: 100%;
  max-width: none;
  min-height: calc(100vh - var(--navbar-height));
  background: radial-gradient(circle at 10% 10%, rgba(82, 151, 126, 0.1), transparent 28rem), radial-gradient(circle at 90% 35%, rgba(217, 156, 94, 0.1), transparent 25rem);
}

.theme-container.no-sidebar .vp-page.travel-page {
  padding: calc(var(--navbar-height) + 2rem) 1.25rem 3rem;
}

.travel-shell { width: 100%; max-width: 1120px; margin-inline: auto; }
.travel-hero { position: relative; min-height: 430px; overflow: hidden; color: #fff; border-radius: 28px; box-shadow: 0 20px 55px rgba(24, 42, 35, 0.2); }
.travel-hero > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 75%; }
.travel-hero-mask { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(10, 25, 22, 0.76), rgba(10, 25, 22, 0.2) 65%, rgba(10, 25, 22, 0.08)); }
.travel-hero-content { position: absolute; z-index: 1; left: clamp(1.5rem, 6vw, 4.5rem); bottom: clamp(2rem, 8vw, 4.5rem); max-width: 580px; }
.travel-hero-content > span, .travel-heading span { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.22em; opacity: 0.82; }
.travel-hero h1 { margin: 0.5rem 0 0.8rem; color: inherit; font-size: clamp(2.8rem, 8vw, 5.2rem); line-height: 1; border: 0; }
.travel-hero p { margin: 0 0 1.3rem; font-size: clamp(0.95rem, 2vw, 1.12rem); opacity: 0.88; }
.travel-hero strong { display: inline-block; padding: 0.45rem 0.85rem; font-size: 0.78rem; background: rgba(255, 255, 255, 0.16); border: 1px solid rgba(255, 255, 255, 0.32); border-radius: 999px; backdrop-filter: blur(10px); }
.travel-hero-fade-enter-active, .travel-hero-fade-leave-active { transition: opacity 0.8s ease, transform 1.2s ease; }
.travel-hero-fade-enter-from { opacity: 0; transform: scale(1.04); }
.travel-hero-fade-leave-to { opacity: 0; }
.travel-carousel { position: absolute; z-index: 2; right: 1.5rem; bottom: 1.5rem; display: flex; align-items: center; gap: 0.65rem; padding: 0.35rem 0.45rem; color: #fff; background: rgba(8, 18, 16, 0.28); border: 1px solid rgba(255, 255, 255, 0.28); border-radius: 999px; backdrop-filter: blur(10px); }
.travel-carousel span { min-width: 3.6rem; font-size: 0.7rem; font-variant-numeric: tabular-nums; text-align: center; }
.travel-carousel button { display: grid; width: 1.9rem; height: 1.9rem; padding: 0; place-items: center; color: #fff; font-size: 1.35rem; line-height: 1; cursor: pointer; background: rgba(255, 255, 255, 0.08); border: 0; border-radius: 50%; transition: background 0.2s ease; }
.travel-carousel button:hover { background: rgba(255, 255, 255, 0.24); }
.travel-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 2rem; margin: 3.5rem 0 1.4rem; }
.travel-heading span { color: var(--vp-c-accent); }
.travel-heading h2 { margin: 0.3rem 0 0; font-size: clamp(1.8rem, 4vw, 2.6rem); border: 0; }
.travel-heading p { margin: 0 0 0.3rem; color: var(--vp-c-text-mute); }
.travel-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.1rem; }
.travel-card { position: relative; min-width: 0; aspect-ratio: 3 / 4; overflow: hidden; margin: 0; background: var(--vp-c-bg-alt); border-radius: 18px; box-shadow: 0 8px 28px rgba(26, 38, 34, 0.1); }
.travel-photo { display: block; width: 100%; height: 100%; color: #fff; }
.travel-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.55s ease; }
.travel-card::after { position: absolute; inset: 38% 0 0; pointer-events: none; content: ""; background: linear-gradient(transparent, rgba(7, 16, 13, 0.82)); }
.travel-card:hover img { transform: scale(1.055); }
.travel-index { position: absolute; z-index: 2; top: 1rem; right: 1rem; display: grid; width: 2.2rem; height: 2.2rem; place-items: center; font-size: 0.7rem; background: rgba(0, 0, 0, 0.24); border: 1px solid rgba(255, 255, 255, 0.35); border-radius: 50%; backdrop-filter: blur(8px); }
.travel-card figcaption { position: absolute; z-index: 2; right: 1.25rem; bottom: 1.25rem; left: 1.25rem; }
.travel-card h3 { margin: 0; color: #fff; font-size: 1.55rem; }
.travel-card p { margin: 0.45rem 0 0.8rem; color: rgba(255, 255, 255, 0.78); font-size: 0.82rem; line-height: 1.55; }
.travel-view { color: #fff; font-size: 0.75rem; font-weight: 600; text-decoration: none; opacity: 0; transition: opacity 0.25s ease; }
.travel-view:hover { color: #fff; text-decoration: underline; }
.travel-card:hover .travel-view { opacity: 1; }
.travel-end { margin: 3.5rem auto 0; color: var(--vp-c-text-mute); text-align: center; }
.travel-end span { color: var(--vp-c-accent); font-size: 1.5rem; }
.travel-end p { margin: 0.4rem 0 0; }
.travel-comments { width: 100%; margin: 2.5rem auto 0; }

@media (max-width: 850px) {
  .travel-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .travel-heading { align-items: flex-start; flex-direction: column; gap: 0.5rem; }
}

@media (max-width: 560px) {
  .theme-container.no-sidebar .vp-page.travel-page { padding: calc(var(--navbar-height) + 1rem) 0.8rem 2rem; }
  .travel-hero { min-height: 350px; border-radius: 20px; }
  .travel-grid { grid-template-columns: 1fr; }
  .travel-card { aspect-ratio: 4 / 5; }
  .travel-view { opacity: 1; }
}
</style>
