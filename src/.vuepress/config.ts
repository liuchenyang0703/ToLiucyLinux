import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils";
import { execFileSync } from "node:child_process";
import theme from "./theme.js";
import { viteBundler } from "@vuepress/bundler-vite";
// 鼠标点击
import { popperPlugin } from "./plugins/vuepress-plugin-popper/index.js";
import { PopperShape } from "@moefy-canvas/theme-popper";
// 音乐插件
import metingPlugin from "vuepress-plugin-meting2";
// umami访客统计
import {umamiAnalyticsPlugin} from "@vuepress/plugin-umami-analytics";

export default defineUserConfig({
  // 在github上部署的时候构建base需要带：/ToLiucyLinux
  base: "/ToLiucyLinux/",
  // 在服务器上部署的时候构建base只需要：/
  // base: "/",

  // 文章展示的标题等级，默认为2、3级。
  markdown: {
    headers: {
      level: [2, 3, 4, 5, 6],
    },
  },

  lang: "zh-CN",
  title: "ToLiucyLinux",
  description: "ToLiucyLinux 运维技术知识库，分享 Linux、Docker、Kubernetes、数据库、自动化运维与系统安全实战教程。",

  // 统一 VueUse 实例，避免图标与透明导航栏的样式 ID 冲突。
  bundler: viteBundler({ viteOptions: {
    define: { __GIT_COMMIT_ACTIVITY__: JSON.stringify(getGitActivity()) },
    optimizeDeps: { exclude: ["@vueuse/core"] },
    resolve: { dedupe: ["@vueuse/core"] },
  } }),

  // 引入theme.ts配置
  theme,
  
  head: [

    ["meta", { name: "robots", content: "all" }],
    ["meta", { name: "author", content: "Liucy" }],
    [
      "meta",
      {
        "http-equiv": "Cache-Control",
        content: "no-cache, no-store, must-revalidate",
      },
    ],
    ["meta", { "http-equiv": "Pragma", content: "no-cache" }],
    ["meta", { "http-equiv": "Expires", content: "0" }],
    // 将第三方脚本内部生成的 HTTP 子资源请求自动升级为 HTTPS。
    [
      "meta",
      {
        "http-equiv": "Content-Security-Policy",
        content: "upgrade-insecure-requests",
      },
    ],
    [
      "meta",
      {
        name: "keywords",
        content:
            "Linux, Docker, kubernetes, 数据库, 自动化运维, 虚拟机, redis, 高可用, Python, Windows, Zabbix, Go, JAVA, 前端, 系统安全",
      },
    ],

    // 全屏
    ["meta", { name: "apple-mobile-web-app-capable", content: "true" }],

    // 百度统计新版代码：全站写入 <head>，并根据部署域名只加载对应的统计 ID。
    [
      "script",
      {},
      `var _hmt = window._hmt || [];
        (function() {
          var siteIds = {
            "liuchenyang.top": "891de2bc8f3b2f9c423b3993af701dcb",
            "www.liuchenyang.top": "891de2bc8f3b2f9c423b3993af701dcb",
            "liuchenyang0703.github.io": "1404449d13f81f463912cf1bf29d941e"
          };
          var siteId = siteIds[location.hostname];
          if (!siteId || document.getElementById("baidu-tongji")) return;
          var hm = document.createElement("script");
          hm.id = "baidu-tongji";
          hm.src = "https://hm.baidu.com/hm.js?" + siteId;
          hm.async = true;
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();`,
    ],
  ],
  pagePatterns: ["**/*.md", "!**/*.snippet.md", "!.vuepress", "!node_modules"],

  plugins: [
    // 鼠标特效插件
    popperPlugin({
      config: {
        shape: PopperShape.Star,
        size: 1.95,
        numParticles: 8,
      },
    }),
    // 音乐插件,官方:https://github.com/OrageKK/vuepress-plugin-meting2
    metingPlugin({
      metingOptions: {
        // 全局可以播放
        global: true,
        // 使用网易云音乐
        server: "netease",
        // 官方api不用改
        api: "https://api.injahow.cn/meting/?server=:server&type=:type&id=:id&auth=:auth&r=:r",
        // 表示播放一个歌单
        type: "playlist",
        // 歌单id
        mid: "9711752353",
        // 配置音乐播放器的选择
        aplayerOptions: {
          // 默认折叠播放列表
          listFolded: 'true',
          // 默认不显示歌词为:hide,显示歌词为:show
          lrcDisplay: 'hide',
          // 音乐列表随机播放
          order: 'random',
        }
      },
    }),
	
    // 添加umami访客统计
    umamiAnalyticsPlugin({
      id: 'fb6319ef-d539-4cf9-ae36-9bd5846f9911',
      link: 'https://cloud.umami.is/script.js',
      autoTrack: true,
      cache: true,
      hostUrl: 'https://cloud.umami.is/',
    }),
	
  ],
  
  alias: {
    "@MyCoverLink": path.resolve(__dirname, "./components/友情链接.vue"),
    // 首屏 Hero 图片直接带高优先级请求属性，改善 LCP 加载优先级。
    "@theme-hope/components/home/HeroInfo": path.resolve(__dirname, "./components/HeroInfo.vue"),
  },
  
  // 页面启用预加载
  shouldPrefetch: false,
});
// export 配置结束



// 获取git提交活跃度日历数据 - 开始
interface GitActivityDay {
  date: string;
  count: number;
}

function getGitActivity(): GitActivityDay[] {
  try {
    const dates = execFileSync("git", ["log", "--format=%cs"], {
      cwd: getDirname(import.meta.url),
      encoding: "utf8",
    }).trim().split(/\r?\n/u).filter(Boolean);
    const counts = new Map<string, number>();
    dates.forEach((date) => counts.set(date, (counts.get(date) ?? 0) + 1));
    return [...counts].map(([date, count]) => ({ date, count }));
  } catch {
    return [];
  }
}
// 获取git提交活跃度日历数据 - 结束
