import { defineClientConfig } from "vuepress/client";
import { onMounted } from 'vue';
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
// 全局：页脚运行时间
// import { setupRunningTimeFooter } from "vuepress-theme-hope/presets/footerRunningTime.js";
import { setupRunningTimeFooter } from "./components/runtime.js";
// 全局-自定义：开往-友链接力
import Travelling from "./components/开往.js";
// 全局-自定义：虫洞
import Wormhole from "./components/虫洞.js";
// 全局-自定义：404页面
// import NotFound from "./components/layouts/404.vue";
// 访问量组件
import DataPanel from "./components/访问量.vue";
// 爱情倒计时组件
import LoveTimer from "./components/LoveTimer.vue"; 
// 友情链接滚动条
import roll from "./components/友情链接滚动.vue";
// 添加访问页面缓冲加载配置
const jz = defineAsyncComponent(() => import('./components/缓冲.vue'));
// 添加网站运行时间配置
// const yx = defineAsyncComponent(() => import('./components/运行时间.vue'));
// 天气预报大组件
// const Weather = defineAsyncComponent(() => import("./components/Weather.vue"));

export default defineClientConfig({
  setup() {
    // 动态加载不蒜子脚本
    const loadBusuanzi = () => {
      const script = document.createElement("script");
      script.src = "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
      document.body.appendChild(script);
    };

    onMounted(() => {
      // 在页面加载完成后加载不蒜子
      loadBusuanzi();
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
    jz,
    yx,
//	Weather,
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
    // 天气预报大组件
    // app.component("Weather", Weather);
    // if (typeof window !== 'undefined') { // 确保在客户端执行
    //  window._AMapSecurityConfig = {
    //    securityJsCode: '1744fd88983e27519b32046ce99d36eb', // 替换为你的安全密钥
    //  }
    // }
  },
  
  // 你可以在这里覆盖或新增布局
  layouts: {
	// 404页面
    // NotFound,
    // 博客必应壁纸及一言描述
    Blog,
  },
});