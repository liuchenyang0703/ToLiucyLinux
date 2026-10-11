<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRouteLocale, useRouter } from "vuepress/client";
import MainLayout from "@theme-hope/components/base/MainLayout";

interface MissingChild {
  name?: string;
  sex?: string;
  birth_time?: string;
  lost_time?: string;
  lost_place?: string;
  child_feature?: string;
  child_pic?: string;
  url?: string;
}

declare global {
  interface Window {
    jsondata?: { data?: MissingChild[] };
  }
}

const routeLocale = useRouteLocale();
const router = useRouter();
const child = ref<MissingChild>();
const loading = ref(true);
const failed = ref(false);
let timeoutId: number | undefined;
let createdScript: HTMLScriptElement | undefined;

const safeUrl = (value?: string): string => {
  if (!value) return "#";
  try {
    const url = new URL(value, window.location.href);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "#";
  } catch {
    return "#";
  }
};

const pickRandomChild = (): boolean => {
  const list = window.jsondata?.data;
  if (!Array.isArray(list) || list.length === 0) return false;
  child.value = list[Math.floor(Math.random() * list.length)];
  loading.value = false;
  failed.value = false;
  if (timeoutId) window.clearTimeout(timeoutId);
  return true;
};

const loadPublicData = (): void => {
  if (pickRandomChild()) return;
  const existing = document.querySelector<HTMLScriptElement>('script[data-public-404="tencent"]');
  const script = existing ?? document.createElement("script");
  script.dataset.public404 = "tencent";
  script.src = "https://qzone.qq.com/gy/404/data.js";
  script.charset = "utf-8";
  script.onload = () => {
    if (!pickRandomChild()) {
      loading.value = false;
      failed.value = true;
    }
  };
  script.onerror = () => {
    loading.value = false;
    failed.value = true;
  };
  if (!existing) {
    createdScript = script;
    document.head.appendChild(script);
  }
  timeoutId = window.setTimeout(() => {
    if (!child.value) {
      loading.value = false;
      failed.value = true;
    }
  }, 8000);
};

const goHome = () => router.push(routeLocale.value);

onMounted(loadPublicData);
onBeforeUnmount(() => {
  if (timeoutId) window.clearTimeout(timeoutId);
  if (createdScript && !createdScript.dataset.loaded) createdScript.remove();
});
</script>

<template>
  <MainLayout container-class="public-not-found" :no-sidebar="true" :no-toc="true">
    <main id="main-content" class="vp-page baby-page">
      <div class="baby-mod">
        <div class="backcrumb"><button type="button" @click="goHome">返回首页 »</button></div>

        <section class="baby-card">
          <h1 class="title">您访问的页面找不回来了！ <span>但我们可以一起寻找失踪宝贝</span></h1>

          <div v-if="loading" class="state">正在加载公益寻人信息…</div>
          <div v-else-if="failed || !child" class="state state-error">公益数据暂时加载失败，请刷新页面重试。</div>
          <div v-else class="baby-data">
            <div class="baby-pic">
              <a :href="safeUrl(child.url)" target="_blank" rel="noopener noreferrer">
                <img :src="safeUrl(child.child_pic)" :alt="child.name || '失踪儿童照片'">
              </a>
            </div>

            <div class="baby-info">
              <table>
                <tbody>
                  <tr><th>姓 名：</th><td>{{ child.name || "暂无" }}</td></tr>
                  <tr><th>性 别：</th><td>{{ child.sex || "暂无" }}</td></tr>
                  <tr><th>出生日期：</th><td>{{ child.birth_time || "暂无" }}</td></tr>
                  <tr><th>失踪时间：</th><td>{{ child.lost_time || "暂无" }}</td></tr>
                  <tr><th>失踪地点：</th><td>{{ child.lost_place || "暂无" }}</td></tr>
                  <tr><th>失踪人特征描述：</th><td>{{ child.child_feature || "暂无详细特征" }} <a :href="safeUrl(child.url)" target="_blank" rel="noopener noreferrer">详细</a></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div class="source-row">
          <div class="charity-marks"><span>公益 404</span><strong>宝贝回家</strong></div>
          <div class="source-copy">
            <div>公益 404 接入地址：<a href="https://h5.news.qq.com/static/babyhome.htm" target="_blank" rel="noopener noreferrer">h5.news.qq.com/static/babyhome.htm</a></div>
            <div>失踪儿童信息来自<a href="https://bbs.baobeihuijia.com/" target="_blank" rel="noopener noreferrer">宝贝回家寻子网</a></div>
          </div>
          <button class="change-button" type="button" :disabled="loading || failed" @click="pickRandomChild">换一位</button>
        </div>

        <p class="notice">页面数据由腾讯公开公益 404 数据脚本提供；个案当前状态请以“宝贝回家”详情页为准。</p>
      </div>
    </main>
  </MainLayout>
</template>

<style scoped lang="scss">
.baby-page{box-sizing:border-box;min-height:calc(100vh - var(--navbar-height));padding:calc(var(--navbar-height) + 1.2rem) 1rem 2.5rem!important;background:var(--vp-c-bg)}.baby-mod{width:min(880px,100%);margin:0 auto;font-family:"Microsoft YaHei","PingFang SC",sans-serif}.backcrumb{padding:10px 0;text-align:right}.backcrumb button{padding:0;color:var(--vp-c-accent);font:inherit;font-size:16px;cursor:pointer;background:none;border:0}.backcrumb button:hover{text-decoration:underline}.baby-card{overflow:hidden;background:var(--vp-c-bg) url(https://ossweb-img.qq.com/images/game/404/new/baobei_bg.png) right bottom/auto no-repeat;border:1px dashed var(--vp-c-border)}.title{margin:0;padding:20px 24px 20px 47px;border:0;color:var(--vp-c-text);font-size:clamp(1.45rem,3.2vw,2rem);font-weight:700;line-height:1.35}.title span{color:#86af2b}.state{padding:70px 30px 90px;color:var(--vp-c-text-mute);text-align:center}.state-error{color:#c45b5b}.baby-data{display:grid;grid-template-columns:197px minmax(0,1fr);gap:28px;padding:0 40px 32px 46px}.baby-pic{box-sizing:border-box;width:197px;height:282px;padding:6px;overflow:hidden;background:var(--vp-c-bg);border:1px solid var(--vp-c-border);box-shadow:0 4px 14px rgba(0,0,0,.08)}.baby-pic a{position:relative;display:block;width:185px;height:270px;overflow:hidden}.baby-pic img{position:absolute;top:0;left:50%;width:auto;max-width:none;height:270px;margin:0;transform:translateX(-50%)}.baby-info{min-width:0;padding-top:2px}.baby-info table{width:100%;border-collapse:collapse;font-size:16px;line-height:30px}.baby-info tr,.baby-info th,.baby-info td{border:0}.baby-info th{width:130px;padding:0;color:var(--vp-c-text-mute);font-weight:400;text-align:right;vertical-align:top}.baby-info td{padding:0 0 0 4px;color:var(--vp-c-text)}.baby-info td a{display:inline-block;padding:1px 5px;color:#fff;line-height:21px;text-decoration:none;background:#86af2b}.source-row{display:flex;align-items:center;gap:18px;min-height:72px;padding:14px 30px}.charity-marks{display:flex;align-items:center;gap:8px;white-space:nowrap}.charity-marks span,.charity-marks strong{padding:8px 10px;border-radius:999px}.charity-marks span{color:#fff;background:var(--vp-c-accent)}.charity-marks strong{color:#d87991;background:#fff0f4}.source-copy{flex:1;color:var(--vp-c-text-mute);font-size:13px;line-height:21px}.source-copy a{color:var(--vp-c-accent);text-decoration:none}.change-button{padding:.45rem .8rem;color:var(--vp-c-accent);font:inherit;cursor:pointer;background:var(--vp-c-bg-alt);border:1px solid var(--vp-c-border);border-radius:6px}.change-button:disabled{cursor:not-allowed;opacity:.5}.notice{margin:8px auto 0;color:var(--vp-c-text-mute);font-size:12px;text-align:center}
@media(max-width:700px){.baby-page{padding-inline:.75rem!important}.title{padding:20px;font-size:1.35rem;text-align:center}.baby-data{grid-template-columns:1fr;padding:0 5% 26px}.baby-pic{margin:0 auto}.baby-info table{font-size:14px;line-height:26px}.baby-info th{width:102px}.source-row{flex-wrap:wrap;justify-content:center;padding:14px 5%}.source-copy{flex-basis:100%;text-align:center}.baby-card{background-image:none}}
</style>
