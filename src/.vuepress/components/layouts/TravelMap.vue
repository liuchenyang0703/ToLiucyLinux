<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useSiteData } from "vuepress/client";
import { Layout, useDarkMode } from "vuepress-theme-hope/client";
import { travelList } from "./travel.js";
import type { ECharts } from "echarts";

const site = useSiteData();
const { isDarkMode } = useDarkMode();
const assetPath = (path: string): string => `${site.value.base}${path}`;
const mapElement = ref<HTMLDivElement>();
const mapError = ref(false);
const selectedCity = ref(travelList[0]?.city ?? "");
const selectedTravel = computed(() => travelList.find((item) => item.city === selectedCity.value));
const provinceCount = new Set(travelList.map((item) => item.province)).size;
let chart: ECharts | undefined;
let resizeObserver: ResizeObserver | undefined;
let echartsModule: typeof import("echarts") | undefined;

const selectCity = (city: string): void => {
  selectedCity.value = city;
  renderMap();
};

const renderMap = (): void => {
  if (!chart || !echartsModule) return;
  const dark = isDarkMode.value;
  const visited = [...new Set(travelList.map((item) => item.province))];
  chart.setOption({
    backgroundColor: "transparent",
    tooltip: {
      trigger: "item",
      formatter: (params: { name: string; seriesType: string }) => {
        if (params.seriesType === "scatter") return `${params.name} · 已点亮`;
        const cities = travelList.filter((item) => item.province === params.name).map((item) => item.city);
        return cities.length ? `${params.name}<br/>${cities.join("、")}` : params.name;
      },
    },
    geo: {
      map: "travel-china",
      roam: true,
      scaleLimit: { min: 1, max: 5 },
      layoutCenter: ["50%", "52%"],
      layoutSize: "94%",
      itemStyle: {
        areaColor: dark ? "#253c42" : "#e7eeea",
        borderColor: dark ? "#567078" : "#ffffff",
        borderWidth: 1,
      },
      emphasis: { itemStyle: { areaColor: dark ? "#426c62" : "#b7d7c4" } },
    },
    series: [
      {
        type: "map",
        geoIndex: 0,
        data: visited.map((name) => ({
          name,
          itemStyle: { areaColor: dark ? "#327767" : "#9bc9ad" },
        })),
        silent: false,
      },
      {
        type: "scatter",
        coordinateSystem: "geo",
        data: travelList.map((item) => ({ name: item.city, value: item.coordinates })),
        symbolSize: (value: number[], params: { dataIndex: number }) =>
          travelList[params.dataIndex]?.city === selectedCity.value ? 16 : 10,
        itemStyle: { color: "#ec7752", borderColor: "#fff", borderWidth: 2, shadowBlur: 10, shadowColor: "#a44d35" },
        emphasis: { scale: 1.4 },
        z: 3,
      },
    ],
  }, true);
};

onMounted(async () => {
  document.body.setAttribute("data-type", "travel-map");
  try {
    const [echarts, response] = await Promise.all([
      import("echarts"),
      // 边界数据来自 https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json，已保存为站点静态资源。
      fetch(assetPath("travel-china.json")),
    ]);
    if (!response.ok) throw new Error(`地图数据请求失败：${response.status}`);
    const geoJson = await response.json();
    if (!mapElement.value) return;
    echartsModule = echarts;
    echarts.registerMap("travel-china", geoJson);
    await nextTick();
    if (!mapElement.value) return;
    chart = echarts.init(mapElement.value);
    renderMap();
    chart.on("click", (params: { seriesType?: string; name: string }) => {
      if (params.seriesType === "scatter") selectCity(params.name);
      else {
        const item = travelList.find((travel) => travel.province === params.name);
        if (item) selectCity(item.city);
      }
    });
    resizeObserver = new ResizeObserver(() => chart?.resize());
    resizeObserver.observe(mapElement.value);
  } catch (error) {
    console.error("旅行地图加载失败", error);
    mapError.value = true;
  }
});

watch(isDarkMode, renderMap);

onUnmounted(() => {
  document.body.removeAttribute("data-type");
  resizeObserver?.disconnect();
  chart?.dispose();
});
</script>

<template>
  <Layout>
    <template #default>
      <main id="main-content" class="vp-page travel-map-page">
        <div class="travel-map-shell">
          <header class="travel-map-heading">
            <div>
              <span class="travel-map-eyebrow">MY TRAVEL MAP</span>
              <h1>旅行足迹地图</h1>
              <p>每到一处，点亮一座城。点击地图上的光点，看看沿途的照片。</p>
            </div>
            <div class="travel-map-stats" aria-label="旅行统计">
              <span><strong>{{ travelList.length }}</strong> 个目的地</span>
              <span><strong>{{ provinceCount }}</strong> 个省级地区</span>
            </div>
          </header>

          <div class="travel-map-content">
            <section class="travel-map-panel" aria-label="中国旅行足迹地图">
              <div v-if="mapError" class="travel-map-error" role="status">地图暂时无法加载，请稍后重试。下方仍可浏览全部旅行地点。</div>
              <div ref="mapElement" class="travel-map-canvas" role="img" aria-label="已到访省份和城市的交互式中国地图" />
              <p class="travel-map-hint">拖动浏览 · 滚轮缩放 · 点击城市光点查看照片</p>
            </section>

            <aside v-if="selectedTravel" class="travel-map-detail" aria-live="polite">
              <img :src="assetPath(selectedTravel.image)" :alt="`${selectedTravel.city}旅行照片`" />
              <div class="travel-map-detail-body">
                <span>已点亮 · {{ selectedTravel.province }}</span>
                <h2>{{ selectedTravel.city }}</h2>
                <p>{{ selectedTravel.description }}</p>
                <a :href="assetPath(selectedTravel.image)" target="_blank" rel="noopener noreferrer">查看照片 ↗</a>
              </div>
            </aside>
          </div>

          <section class="travel-map-places" aria-label="已点亮的目的地">
            <div class="travel-map-places-heading">
              <h2>已点亮的地方</h2>
              <span>{{ travelList.length }} 个目的地</span>
            </div>
            <div class="travel-map-chips">
              <button v-for="item in travelList" :key="item.city" type="button" :class="{ active: selectedCity === item.city }" :aria-pressed="selectedCity === item.city" @click="selectCity(item.city)">
                <span class="travel-map-dot" />{{ item.city }}
              </button>
            </div>
          </section>
        </div>
      </main>
    </template>
  </Layout>
</template>

<style lang="scss">
.travel-map-page { box-sizing: border-box; width: 100%; max-width: none; min-height: 100vh; padding: calc(var(--navbar-height) + 2rem) 1.25rem 4rem; background: var(--vp-c-bg); }
.theme-container.no-sidebar .vp-page.travel-map-page { max-width: none; }
.travel-map-shell { max-width: 1240px; margin: auto; }
.travel-map-heading { display: flex; align-items: end; justify-content: space-between; gap: 2rem; margin-bottom: 1.75rem; }
.travel-map-eyebrow { color: var(--vp-c-accent); font-size: .72rem; font-weight: 700; letter-spacing: .2em; }
.travel-map-heading h1 { margin: .4rem 0 .6rem; border: 0; font-size: clamp(2.2rem, 5vw, 3.5rem); }
.travel-map-heading p { margin: 0; color: var(--vp-c-text-mute); }
.travel-map-stats { display: flex; gap: 1.2rem; white-space: nowrap; }
.travel-map-stats span { display: flex; flex-direction: column; color: var(--vp-c-text-mute); font-size: .8rem; }
.travel-map-stats strong { color: var(--vp-c-accent); font-size: 1.8rem; line-height: 1.2; }
.travel-map-content { display: grid; grid-template-columns: minmax(0, 1fr) 280px; gap: 1.25rem; }
.travel-map-panel, .travel-map-detail, .travel-map-places { overflow: hidden; background: var(--vp-c-bg-alt); border: 1px solid var(--vp-c-border); border-radius: 22px; }
.travel-map-panel { position: relative; min-width: 0; }
.travel-map-canvas { width: 100%; height: 520px; }
.travel-map-hint { position: absolute; bottom: .9rem; left: 1.2rem; margin: 0; color: var(--vp-c-text-mute); font-size: .75rem; pointer-events: none; }
.travel-map-error { position: absolute; z-index: 2; inset: 0; display: grid; place-items: center; padding: 1.5rem; color: var(--vp-c-text-mute); text-align: center; }
.travel-map-detail { align-self: stretch; }
.travel-map-detail > img { display: block; width: 100%; height: 285px; object-fit: cover; }
.travel-map-detail-body { padding: 1.3rem; }
.travel-map-detail-body span { color: var(--vp-c-accent); font-size: .75rem; font-weight: 700; }
.travel-map-detail-body h2 { margin: .35rem 0; border: 0; font-size: 1.8rem; }
.travel-map-detail-body p { min-height: 3.5em; margin: .5rem 0 1rem; color: var(--vp-c-text-mute); font-size: .9rem; line-height: 1.7; }
.travel-map-detail-body a { font-size: .85rem; font-weight: 600; }
.travel-map-places { margin-top: 1.25rem; padding: 1.25rem 1.5rem 1.5rem; }
.travel-map-places-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; }
.travel-map-places h2 { margin: 0 0 1rem; border: 0; font-size: 1.2rem; }
.travel-map-places-heading span { color: var(--vp-c-text-mute); font-size: .8rem; }
.travel-map-chips { display: flex; flex-wrap: wrap; gap: .65rem; }
.travel-map-chips button { display: inline-flex; align-items: center; gap: .5rem; padding: .5rem .85rem; color: var(--vp-c-text); background: var(--vp-c-bg); border: 1px solid var(--vp-c-border); border-radius: 999px; cursor: pointer; transition: border-color .2s, background .2s; }
.travel-map-chips button:hover, .travel-map-chips button.active { background: var(--vp-c-bg-elv); border-color: var(--vp-c-accent); }
.travel-map-dot { width: .5rem; height: .5rem; background: #ec7752; border-radius: 50%; }
@media (max-width: 900px) { .travel-map-content { grid-template-columns: 1fr; } .travel-map-detail { display: grid; grid-template-columns: minmax(0, 220px) 1fr; } .travel-map-detail > img { height: 100%; min-height: 220px; } }
@media (max-width: 600px) { .travel-map-page { padding: calc(var(--navbar-height) + 1.2rem) .8rem 2.5rem; } .travel-map-heading { display: block; } .travel-map-stats { margin-top: 1.3rem; } .travel-map-canvas { height: 400px; } .travel-map-detail { display: block; } .travel-map-detail > img { height: 240px; } .travel-map-detail-body p { min-height: 0; } .travel-map-hint { font-size: .68rem; } }
</style>
