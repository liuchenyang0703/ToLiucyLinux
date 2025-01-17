import { defineUserConfig } from "vuepress";
import theme from "./theme.js";


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
  // description: "Liucy知识库",

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

    // 添加百度统计
    // liuchenyang.top统计
    [
      "script",
      {},
      `var _hmt1 = _hmt1 || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?891de2bc8f3b2f9c423b3993af701dcb";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();`,
    ],
    // liuchenyang0703.github.io/ToLiucyLinux/统计
    [
      "script",
      {},
      `var _hmt2 = _hmt2 || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?1404449d13f81f463912cf1bf29d941e";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();`,
    ],
    // 添加统计
    [
      "script",
      {},
      `const btw = new BTWPlugin();
        btw.init({
        id: 'container',
        blogId: '32863-1711898538696-276',
        name: 'Liucy',
        qrcode: 'https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202312142008812.png',
        keyword: 'vip',
    });`,
    ],
    [
      "script",
      {
        src: "https://readmore.openwrite.cn/js/readmore.js"
      }
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "no-chttps://cdn.jsdelivr.net/npm/@docsearch/css@3ache"
      }
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/@docsearch/js@3"
      }
    ]
  ],
  pagePatterns: ["**/*.md", "!**/*.snippet.md", "!.vuepress", "!node_modules"],

  // 页面启用预加载
  shouldPrefetch: false,
});
