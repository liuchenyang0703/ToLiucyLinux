import { defineClientConfig, useRouter } from "vuepress/client";
import { onMounted, onUnmounted } from 'vue';
import { defineAsyncComponent } from 'vue';
// 文档：为项目主页的特性添加闪光效果。
import 'vuepress-theme-hope/presets/shinning-feature-panel.scss';
// 其他：为页面图标添加鼠标悬停的跳动效果。
import 'vuepress-theme-hope/presets/bounce-icon.scss'; 
// 博客：将博客博主头像裁切成圆形
import "vuepress-theme-hope/presets/round-blogger-avatar.scss";
// 其他：为所有 hr 元素添加驾驶的车图标：
import "vuepress-theme-hope/presets/hr-driving-car.scss";
// 博客：透明导航栏
import { setupTransparentNavbar } from "vuepress-theme-hope/presets/transparentNavbar.js";
// 博客：必应壁纸及一言描述（壁纸已停，采用url随机壁纸）
import Blog from "./components/layouts/Blog.vue";
// 全局：雪花效果
// import { setupSnowFall } from "vuepress-theme-hope/presets/snowFall.js";
// 全局：页脚运行时间（官方）
// import { setupRunningTimeFooter } from "vuepress-theme-hope/presets/footerRunningTime.js";
// 全局-自定义：页脚运行时间
import { setupRunningTimeFooter } from "./components/runtime.js";
// 全局-自定义：开往-友链接力
import Travelling from "./components/开往.js";
// 全局-自定义：虫洞
import Wormhole from "./components/虫洞.js";
// 全局-自定义：404页面
// import NotFound from "./components/layouts/404.vue";
// 主页-自定义：访问量组件
import DataPanel from "./components/访问量.vue";
// 关于本站-自定义：爱情倒计时组件
import LoveTimer from "./components/LoveTimer.vue"; 
// 主页-自定义：友情链接滚动条
import roll from "./components/友情链接滚动.vue";
// 全局-自定义：天气预报小组件
import WeatherWidget from "./components/WeatherWidget.vue";
// IP查询检测-自定义：IP 检测
import ipcheck from "./components/tools/ip_check/ipcheck.vue";
// IP查询检测-自定义：网站连通性测试
import Connectivity from "./components/tools/ip_check/Connectivity.vue";
// IP查询检测-自定义：WebRTC 测试
import WebRTC from "./components/tools/ip_check/WebRTC.vue";
// IP查询检测-自定义：DNS泄露测试
import DNSLeak from "./components/tools/ip_check/DNSLeak.vue";
// 在线小工具-自定义：Base64 文本编解码
const Base64Tool = defineAsyncComponent(() => import("./components/tools/Base64Tool.vue"));
// 在线小工具-自定义：图片格式转换
const ImageConverter = defineAsyncComponent(() => import("./components/tools/ImageConverter.vue"));
// 在线小工具-自定义：图片Base64编解码
const ImageBase64Tool = defineAsyncComponent(() => import("./components/tools/ImageBase64Tool.vue"));
// 在线小工具-自定义：字节单位换算器
const ByteUnitConverter = defineAsyncComponent(() => import("./components/tools/ByteUnitConverter.vue"));
// 在线小工具-自定义：时间戳转换工具
const TimestampConverter = defineAsyncComponent(() => import("./components/tools/TimestampConverter.vue"));
// 旅游-自定义：用于展示去过的城市与旅途照片
import Travel from "./components/layouts/Travel.vue";
// 旅游-自定义：用于展示去过的城市足迹地图与旅途照片地图
import TravelMap from "./components/layouts/TravelMap.vue";
// 文章归档-自定义：用于展示文章归档与发布日历
import Archive from "./components/layouts/Archive.vue";
// git提交活跃度日历-自定义：用于展示git提交活跃度日历
const GitActivity = defineAsyncComponent(() => import("./components/GitActivity.vue"));

export default defineClientConfig({
  setup() {
    const router = useRouter();
    let removeBaiduRouteHook: (() => void) | undefined;
    let removeMusicPlayerSwitch: (() => void) | undefined;

    // 动态加载不蒜子脚本
    const loadBusuanzi = () => {
      const script = document.createElement("script");
      script.src = "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
      document.body.appendChild(script);
    };

    onMounted(() => {
      // 在页面加载完成后加载不蒜子
      loadBusuanzi();
      removeMusicPlayerSwitch = setupMusicPlayerSwitch();

      // VuePress 是单页应用，页面切换不会重新执行 head 中的百度统计代码，需主动上报。
      removeBaiduRouteHook = router.afterEach((to, from) => {
        if (to.fullPath !== from.fullPath) {
          const baiduQueue = (window as Window & { _hmt?: unknown[][] })._hmt;
          baiduQueue?.push(["_trackPageview", to.fullPath]);
        }
      });

    });

    onUnmounted(() => {
      removeBaiduRouteHook?.();
      removeMusicPlayerSwitch?.();
    });
    // 透明导航栏配置
    setupTransparentNavbar({
      type: "blog-homepage", // 你可以根据需要选择 'homepage', 'blog-homepage', 或 'all'
      threshold: 50,    // 透明的临界距离
      light: "#fff",    // 浅色模式下字体颜色
      dark: "#fff",     // 深色模式下字体颜色
    });

    // 下雪效果配置
    // setupSnowFall({
    //   count: 25,    // 雪花数量
    //   minSize: 5,   // 雪花的最小大小 (像素)
    //   maxSize: 10,  // 雪花的最大大小 (像素)
    //   speed: 1,     // 雪花的下落速度
    // });

   // 运行时间配置
   setupRunningTimeFooter(
     new Date("2023-11-16"), // 站点开始运行的日期
     {
       "/": "本站已运行： :day 天 :hour 小时 :minute 分钟 :second 秒",
     },
     true, // 是否保留页脚的原有内容
   );
 },
  // 加载vue配置
  rootComponents: [
  ],

  // 全局组件（添加某个组件到全局）
  enhance: ({ app }) => {
    // 虫洞
    app.component("Wormhole", Wormhole);
    // 友链接力
    app.component("Travelling", Travelling);
    // 访问量组件
    app.component("DataPanel", DataPanel);
    // 爱情倒计时组件
    app.component("LoveTimer", LoveTimer);
    // 友情链接滚动条
    app.component("roll", roll);
    // 天气预报小组件
    app.component("WeatherWidget", WeatherWidget);
    // IP 检测
    app.component("ipcheck", ipcheck);
    // 网站连通性测试
    app.component("Connectivity", Connectivity);
    // WebRTC 测试
    app.component("WebRTC", WebRTC);
    // DNS泄露测试
    app.component("DNSLeak", DNSLeak);
    // 项目更新记录页：Git 提交活跃度日历
    app.component("GitActivity", GitActivity);
    // 在线小工具：Base64 文本编解码
    app.component("Base64Tool", Base64Tool);
    // 在线小工具：图片格式转换
    app.component("ImageConverter", ImageConverter);
    // 在线小工具：图片Base64编解码
    app.component("ImageBase64Tool", ImageBase64Tool);
    // 在线小工具：字节单位换算器
    app.component("ByteUnitConverter", ByteUnitConverter);
    // 在线小工具：时间戳转换工具
    app.component("TimestampConverter", TimestampConverter);
  },
  
  // 你可以在这里覆盖或新增布局
  layouts: {
	  // 404页面
    // NotFound,
    // 博客必应壁纸及一言描述
    Blog,
    // 旅游足迹相册页面
    Travel,
    // 旅游足迹地图页面
    TravelMap,
    // 文章归档与发布日历
    Archive,
  },
});

// ==================== 音乐播放器开关 start ====================
function setupMusicPlayerSwitch(): () => void {
  let musicEnabled = false;

  const applyMusicState = () => {
    document.documentElement.classList.toggle("music-enabled", musicEnabled);
    document.querySelectorAll<HTMLButtonElement>(".music-switch").forEach((button) => {
      button.ariaPressed = String(musicEnabled);
      button.title = musicEnabled ? "隐藏音乐播放器" : "显示音乐播放器";
    });

    if (!musicEnabled) {
      document.querySelectorAll<HTMLAudioElement>(".aplayer audio").forEach((audio) => audio.pause());
    }
  };

  const addMusicSwitch = () => {
    document.querySelectorAll<HTMLElement>(".vp-appearance-dropdown, .vp-appearance-wrapper").forEach((panel) => {
      if (panel.querySelector(".music-switch-wrapper")) return;

      const wrapper = document.createElement("div");
      wrapper.className = "music-switch-wrapper";
      wrapper.innerHTML = `
        <label class="music-switch-title">音乐</label>
        <button class="music-switch" type="button" aria-pressed="false" title="显示音乐播放器">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 9v6h4l5 4V5L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4.03v8.05A4.5 4.5 0 0 0 16.5 12zm0-8.65v2.07a7 7 0 0 1 0 13.16v2.07a9 9 0 0 0 0-17.3z" />
          </svg>
        </button>`;
      wrapper.querySelector("button")?.addEventListener("click", () => {
        musicEnabled = !musicEnabled;
        applyMusicState();
      });
      panel.appendChild(wrapper);
    });
  };

  const setAPlayerButtonLabels = () => {
    const labels = [
      [".aplayer-icon-order", "切换播放顺序"],
      [".aplayer-icon-loop", "切换循环模式"],
      [".aplayer-icon-menu", "打开播放列表"],
      [".aplayer-icon-lrc", "切换歌词显示"],
      [".aplayer-miniswitcher .aplayer-icon", "展开或收起播放器"],
    ] as const;

    labels.forEach(([selector, label]) => {
      document.querySelectorAll<HTMLButtonElement>(selector).forEach((button) => {
        button.setAttribute("aria-label", label);
        if (!button.title) button.title = label;
      });
    });
  };

  const style = document.createElement("style");
  style.textContent = `
    html:not(.music-enabled) .aplayer { display: none !important; }
    .music-switch-title { display: block; padding: 0 .25rem; color: var(--vp-c-text-subtle); font-weight: 600; font-size: .75rem; line-height: 2; }
    .music-switch { margin: 0; border: 0; padding: .25rem; background: transparent; color: var(--vp-c-text-mute); cursor: pointer; }
    .music-switch:hover, .music-switch[aria-pressed="true"] { color: var(--vp-c-accent-hover); }
    .music-switch svg { display: block; width: 1.25rem; height: 1.25rem; fill: currentcolor; }
  `;
  document.head.appendChild(style);

  applyMusicState();
  setAPlayerButtonLabels();
  addMusicSwitch();

  const observer = new MutationObserver(() => {
    setAPlayerButtonLabels();
    addMusicSwitch();
    applyMusicState();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  return () => {
    observer.disconnect();
    style.remove();
  };
}
// ===================== 音乐播放器开关 end =====================
