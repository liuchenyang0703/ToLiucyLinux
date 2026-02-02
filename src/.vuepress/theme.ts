import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "http://liuchenyang.top",

  author: {
    name: "𝑴𝒓.𝑳𝒊𝒖𝒄𝒚",
    url: "http://liuchenyang.top",
  },


  logo: "logo.png",
  favicon: "favicon.ico",
  //github导航栏及文章中的编辑链接配置
  repo: "liuchenyang0703/ToLiucyLinux",
  repoLabel: "GitHub",
  repoDisplay: true,
  docsBranch: "main",
  docsDir: "src",
  // 禁用文章github编辑链接
  editLink: false,
  // 是否展示面包屑导航
  breadcrumb: true,
  // 文章最后更新时间
  lastUpdated: true,


  // 暗黑模式切换-在深色模式，浅色模式和自动之间切换 (默认根据设备自动检测)
  darkmode: "switch",
  // 全屏按钮
  fullscreen: true,
  //提取到h6级标题（已失效，默认到4级，也就是2-5级）
  // headerDepth: 6,

  // 导航栏
  navbar,
  // 侧边栏
  sidebar,

  // 是否显示页脚
  displayFooter: true,
  // 页脚支持
  footer: '<a href="http://beian.miit.gov.cn/" target="_blank">京ICP备2023037493号-1</a>',

  // navbarLayout：用于定义导航栏的布局；start、center 和 end，分别表示导航栏的起始部分、中间部分和结束部分。
  navbarLayout: {
    // Brand：表示导航栏的起始部分放置的是品牌（Logo 或网站名称）这是导航栏的最左侧部分。
    start: ['Brand', 'WeatherWidget'],
    // Links：表示导航栏的中间部分放置的是导航链接，这是导航栏的中间部分。
    center: ['Links'],
    // Repo：表示仓库链接，通常用于指向项目的代码仓库（如 GitHub、GitLab 等）。
    // Wormhole：这是一个自定义组件或链接，名称为“虫洞”。
    // Travelling：这是一个自定义组件或链接，名称为“友链接力”。
    // Outlook：包括主题色、外观、全屏组件。
    // Search：表示搜索功能，通常用于在网站中搜索内容。
    end: ['Repo', 'Wormhole', 'Travelling', 'Outlook', 'Search'],
  },
  
  // 加密配置
  encrypt: {
    config: {
      "/document/database/《MySQL数据库入门到大牛》/": ["3306"],
      "/update_history/":["5555"],
      "/document/Linux_linshi/": ["5555"],
	  "/interview/intervie_record/": ["202109"],
    },
  },
  // 加密文章的提示信息
  encryptLocales:{
    iconLabel: '文章已加密',
    placeholder: '关注公众号【小刘Linux】, 回复暗号：001',
    // 如果输入不对，会提示
    errorHint: "哈哈，别调戏人家啦，按规则来嘛\n关注公众号【小刘Linux】, 回复暗号：001",
  },

  // 文章信息，可以填入数组，数组的顺序是各条目显示的顺序
  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "Word","ReadingTime", "PageView"],
  //           作者      是否原创    日期       分类      标签    字数    阅读时间        浏览量

  // markdown支持的文档配置
  markdown: {
	  // 自定义对齐
    align: true,
	  // 启用属性功能，允许在 Markdown 元素上使用 HTML 属性
    attrs: true,
	  // 启用代码选项卡功能
    codeTabs: true,
	  // 启用组件功能，允许在 Markdown 文件中嵌入 Vue 组件。这意味着你可以在 Markdown 文件中直接使用 Vue 组件，就像在 Vue 单文件组件（.vue 文件）中一样。
    component: true,
	  // 启用代码演示功能，允许在 Markdown 中嵌入代码演示，通常用于展示代码的运行效果。
    demo: true,
	  // 启用图片描述功能，允许为图像添加描述文本。
    figure: true,
	  // 启用 GitHub Flavored Markdown (GFM) 支持，确保 Markdown 语法与 GitHub 保持一致。
    gfm: true,
	  // 启用图片懒加载，可以提高页面加载速度，只有当图片进入视口时才会加载。
    imgLazyload: true,
	  // 启用图片大小
    imgSize: true,
	  // 启用文件包含功能，允许在 Markdown 文件中包含其他文件的内容。这在需要复用某些内容或模块化文档时非常有用。
    include: true,
	  // 启用标记功能，允许在文本中使用 == 来高亮显示部分文本。
    mark: true,
	  // 启用剧透功能，允许将部分内容隐藏，用户点击后显示。这在需要隐藏某些内容（如答案、提示等）时非常有用。
    spoiler: true,
	  // 启用样式化功能，允许自定义特定文本的样式。这里配置了一个匹配器和替换器
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    // 启用下标功能，允许使用 _ 来表示下标。
    sub: true,
    // 启用上标功能，允许使用 ^ 来表示上标。
    sup: true,
    // 启用选项卡功能，允许将内容组织成标签页形式，方便用户切换查看不同部分的内容。
    tabs: true,
    // 支持任务列表
    tasklist: true,
    // 启用 v-pre 指令功能，允许在 Vue 组件中使用 v-pre 指令来防止内容被 Vue 解析。
    vPre: true,
    // 在启用之前安装 echarts，支持折线图、饼图、柱状图、散点图、雷达图、地图、K线图、热力图、仪表盘、漏斗图、词云图、混合图表等；
    echarts: true,
    // 在启用之前安装 mermaid，支持流程图、时序图、甘特图、类图、状态图、用例图、依赖图、代码结构图、数据流图、 网络拓扑图等;
    mermaid: true,
    // 启用 PlantUML 支持，允许在 Markdown 文件中直接写出 PlantUML 图表，例如：用例图、类图、序列图、活动图、状态图、组件图、部署图等；
    plantuml: true,
    // 在启用之前安装 markmap-lib markmap-toolbar markmap-view，主要支持思维导图；
    markmap: true,
    // 在启用之前安装 flowchart.ts，主要支持流程图；
    flowchart: true,
	
    // 添加 Shiki 配置
    highlighter: {
      // 选择要使用的代码块高亮器,有shiki和Prism.js两种,默认是 shiki
      type: "shiki",
      // 被 Shiki 解析的额外语言。
      langs: ['ts', 'json', 'vue', 'md', 'bash', 'diff', 'shell', 'yaml', 'yml', 'bat'],
      // Shiki 主题，应用于代码块,简称:代码块主题。
      theme: 'one-dark-pro',
    },
	
    // 取消注释它们如果你需要 TeX 支持
    // markdownMath: {
    //   // 启用前安装 katex
    //   type: "katex",
    //   // 或者安装 mathjax-full
    //   type: "mathjax",
    // },

    // 如果你需要幻灯片，安装 @vuepress/plugin-revealjs 并取消下方注释
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },

    // 在启用之前安装 chart.js，chart.js 和 echarts 对比，前者更轻量级，后者功能更强大；
    // chartjs: true,

    // playground: {
    //   presets: ["ts", "vue"],
    // },

    // 在启用之前安装 @vue/repl
    // vuePlayground: true,

    // 在启用之前安装 sandpack-vue3
    // sandpack: true,
  },


  blog: {
    // 个人介绍页地址
    intro: "/person.md",
    // 侧边栏显示设置，这里设置为移动端显示（rc.99版本已失效）
    // sidebarDisplay: "mobile",
    // 博主头像
    avatar: "picture.jpg",
    // 座右铭
    description:"没有什么使我停留--除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟。",
    // 社交媒体链接
    // 社交媒体链接
    medias: {
      Email: "person.html#交个朋友-👬🏻",
      WechatMP: "./assets/image/公众号.png",
      GitHub: "https://github.com/liuchenyang0703/",
      Gitee: "https://gitee.com/liu-chenyang",
      Weibo: "https://weibo.com/u/6350216849",
      XiaoHongShu: "https://xhslink.com/m/5wagZ8CE1o0",
      Soul: "https://www.soulapp.cn/",
      Twitter: "https://x.com/home",
      IdleFish: "https://m.tb.cn/h.75FKfBL?tk=Ka1WfywGAE3",
      "163Music": "https://music.163.com/#/artist?id=50843863",
      QQMusic: "https://y.qq.com/n/ryqq/singer/002w4tXt2LlT2T",
      Kugou: "https://www.kugou.com/singer/info/749K9K2D607AF7/",
      Kuwo: "https://www.kuwo.cn/singer_detail/8900358",
      BiliBili: "https://space.bilibili.com/39814207",
      csdn: {
        icon: "https://g.csdnimg.cn/static/logo/favicon32.ico",
        link: "https://blog.csdn.net/liu_chen_yang?type=blog",
      },
      bokeyuan: {
        icon: "https://liuchenyang0703.github.io/nav/assets/images/logos/%e5%8d%9a%e5%ae%a2%e5%9b%ad.png",
        link: "https://home.cnblogs.com/u/lcyL",
      },
      junjie: {
        icon: "https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/static/favicons/favicon-32x32.png",
        link: "https://juejin.cn/user/1522190805637534",
      },
      Zhihu: "https://www.zhihu.com/people/liu_chen_yang",
      "51cto": {
        icon: "https://blog.51cto.com/favicon.ico",
        link: "https://blog.51cto.com/u_16017669",
      },
      infoq: {
        icon: "https://liuchenyang0703.github.io/nav/assets/images/logos/infoq.webp",
        link: "https://www.infoq.cn/u/liucy/",
      },
      tengxunyun: {
        icon: "https://cloud.tencent.com/favicon.ico",
        link: "https://cloud.tencent.com/developer/user/10755554",
      },
      huaweiyun: {
        icon: "https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602021050737.svg",
        link: "https://bbs.huaweicloud.com/community/usersnew/id_1661843828089234",
      },
      aliyun: {
        icon: "https://liuchenyang0703.github.io/nav/assets/images/logos/%e9%98%bf%e9%87%8c%e4%ba%91.jpg",
        link: "https://developer.aliyun.com/profile/7yu26jk3lfqxg",
      },
      AliPay: "https://open.alipay.com/portal/forum/developer/2406012047/article",
    },
    // 时间轴的顶部文字展示。
    timeline: "创作时间",
    // 每页的文章数量。
    articlePerPage: 5,
  },

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // 在这里配置主题提供的插件
  plugins: {
    // 图标库
    icon: {
      assets: "//at.alicdn.com/t/c/font_4791124_w5ymvmolao.css", // 使用阿里图标库
    },
    // 启用博客类型
    blog: true,

    // 评论系统
    comment: {
      // Giscus注意: 此评论功能为我的仓库地址! 你必须自行生成自己的评论仓库并在生产环境中使用自己的评论服务，详细请看官方地址：https://theme-hope.vuejs.press/zh/guide/feature/comment.html#giscus
      // provider: "Giscus",
      // repo :"liuchenyang0703/ToLiucyLinux",
      // repoId:"R_kgDOMUbAoQ",
      // category:"Announcements",
      // categoryId:"DIC_kwDOMUbAoc4CmBak",

      // 启用 Waline 评论系统，此评论地址为我的，需要改为自己的，详细请看官方地址：https://theme-hope.vuejs.press/zh/guide/feature/comment.html#waline
      provider: "Waline",
      // Waline 的服务端地址
      serverURL: "https://waline.liuchenyang.top",
      // 暗黑模式支持。设置为 true 开启，'auto' 跟随设备偏好；
      dark: "auto",
      // 登录模式。可选值：'enable' - 启用登录（默认）、'disable' - 禁用登录，用户填写信息、'force' - 强制登录
      login: 'force',
      // 评论字数限制
      wordLimit: 3000,
      // 每页评论数量
      pageSize: 10,
      // 文章表情反应。设置 true 使用默认表情，或提供自定义表情 URL 数组（最多8个）。
      reaction: true,
      // 评论系统的表情设置
      emoji: [
        "https://unpkg.com/@waline/emojis@1.4.0/alus",
        "https://unpkg.com/@waline/emojis@1.4.0/bilibili",
        "https://unpkg.com/@waline/emojis@1.4.0/bmoji",
        "https://unpkg.com/@waline/emojis@1.4.0/qq",
        "https://unpkg.com/@waline/emojis@1.4.0/tieba",
        "https://unpkg.com/@waline/emojis@1.4.0/tw-emoji",
        "https://unpkg.com/@waline/emojis@1.4.0/weibo",
        "https://unpkg.com/@waline/emojis@1.4.0/soul-emoji",
        "https://unpkg.com/@waline/emojis@1.1.0/tieba",
        "https://emoji.shojo.cn/bili/webp/tv_小电视_动图",
        "https://emoji.shojo.cn/bili/webp/罗小黑战记",
        "https://emoji.shojo.cn/bili/webp/2233娘",
        "https://emoji.shojo.cn/bili/webp/装扮小姐姐梦幻冬季",
        "https://emoji.shojo.cn/bili/webp/装扮小姐姐·秋日午后",
        "https://emoji.shojo.cn/bili/webp/星尘",
        "https://emoji.shojo.cn/bili/webp/池年"
      ],
      // 在Waline配置中添加locale设置
      locale: {
        placeholder: "欢迎留言~ _(≧∇≦」∠)_ (请使用QQ、Github等登录或注册后评论哦~)",
        // 等级名称配置
        level0: '炼体',
        level1: '炼气',
        level2: '筑基',
        level3: '金丹',
        level4: '元婴',
        level5: '化神',
        level6: '炼虚',
        level7: '合体',
        level8: '大乘',
        level9: '真仙',
        level10: '金仙',
        level11: '太乙',
        level12: '大罗',
        level13: '道祖',
      },
    },
    
    // 公告栏
    // notice: [
    //   {
    //     path: "/", // 指定通知显示的路径，"/" 表示在首页显示
    //     title: "2025年总结", // 通知的标题
    //     content: `
    //       <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5; margin: 15px;">
    //         <h1 style="color: #333;">2025年总结</h1>
    //         <p>亲爱的朋友们：</p>
    //         <p>2025年即将过去，这一年对我来说充满了挑战与成长。在工作中，我参与了多个项目，不断提升自己的专业技能。在生活中，我尝试了新的运动和爱好，结识了许多新朋友。感谢每一位支持我的人，你们的鼓励是我前进的动力。</p>
    //         <p>回顾这一年，虽然有起有落，但每一步都让我更加坚定。希望在新的一年里，我们都能继续追逐梦想，创造更多美好的回忆。</p>
    //         <p>感谢大家的支持！</p>
    //         <p>[ToLiucyLinux]</p>
    //         <p>[2025年12月25日]</p>
    //       </div>
    //     `, // 通知的内容，支持 HTML 字符串
    //     actions: [
    //       {
    //         text: "开始阅读", // 按钮文本
    //         link: "./", // 按钮点击后跳转的链接
    //         type: "primary", // 按钮类型，"primary" 表示主要按钮
    //       },
    //       {
    //         text: "去看烟花🎇", // 按钮文本
    //         link: "https://liuchenyang0703.github.io/fireworks/", // 按钮点击后跳转的链接
    //         type: "primary", // 按钮类型，"primary" 表示主要按钮
    //       },
    //     ],
    //     showOnce: false, // 是否只显示一次，用户关闭后不再显示
    //     fullscreen: true, // 是否全屏显示通知
    //     confirm: true, // 是否需要用户确认（点击按钮）才能关闭通知，false表示可以直接关闭（有关闭按钮）
    //   },
    // ],

    // 内置组件，官方讲解地址：https://theme-hope.vuejs.press/zh/guide/component/built-in.html
    // ArtPlayer: 由 ArtPlayer 驱动的视频播放器。
    // Badge: 多彩的徽章组件
    // BiliBili: 嵌入 BiliBili 视频
    // CodePen: 嵌入 CodePen 演示
    // PDF: 嵌入 PDF 查看器
    // Share: 通过社交媒体分享当前页面
    // StackBlitz: 嵌入 StackBlitz 演示
    // SiteInfo: 显示站点
    // VPBanner: 一个横幅组件
    // VPCard: 一个卡片组件
    // VidStack: 由 VidStack 驱动的音频/视频播放器
    components: {
      components: ["ArtPlayer", "Badge", "BiliBili", "CodePen", "PDF", "Share", "StackBlitz", "SiteInfo", "VPBanner", "VPCard", "VidStack"],
    },

    // 代码复制功能-vuepress-plugin-copy-code2
    copyCode: {
      // 在移动端也可以实现复制代码
      showInMobile: true,
      // 代码复制成功提示消息的时间-ms
      duration: 3000,
    },

    // 版权保护
    copyright: {
      // 是否全局启用，复制出现版权信息，例如：看到版本已经是jdk1.8的了，著作权归LiucyLinux(http://liuchenyang.top)所有基于MIT协议原文链接：http://liuchenyang.top/Java/Linux%E4%B8%AD%E5%AE%89%E8%A3%85jdk1.8%E5%92%8C%E9%85%8D%E7%BD%AE%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.html
      global: true,
      // 版权作者信息
      author: "Mr.Liucy",
      // 协议
      license: "MIT",
      // 复制多少字符才展示协议信息
      triggerLength: 100,
      // 许复制的最大内容长度，0 意味着无限制。
      maxLength: 0,
      // 首选部署位置。
      canonical: "https://liuchenyang.top",
      // 自定义版权信息
      copyrightGetter: (page) => {
        const postUrl = 'https://liuchenyang.top' + page.path
        return (
          `著作权归 Mr.Liucy 所有，本站内容遵循 MIT 协议，转载请注明出处。\n` + 
          `原文链接：${postUrl}`
        )
      },
    },

    // 搜索插件 - search
    // search: {
    //   // 多语言支持
    //   locales: {
    //     "/": {
    //       placeholder: "搜索本站",
    //     },
    //   },
    //   // 热键支持
    //   hotKeys: ["command", "k"],
    //   // 最大推荐文章个数
    //   maxSuggestions: 10,
    //   // 排除首页
    //   isSearchable: (page) => page.path !== "/",
    //   // 允许搜索 Frontmatter 中的 `tags`
    //   getExtraFields: (page) => {
    //     // 确保返回值是一个字符串数组
    //     const tags = page.frontmatter.tags;
    //     if (Array.isArray(tags)) {
    //       return tags;
    //     } else if (typeof tags === "string") {
    //       return [tags];
    //     } else {
    //       return [];
    //     }
    //   },
    // },

    // 搜索插件 - docsearch
    docsearch:({
      appId: "DJTP2DCRA4",
      apiKey: "39fd99a761874fc7dbe00d0e3076035c",
      indexName: "liuchenyang",
  
      // locales: {
      //   "/": {
      //     placeholder: "搜索文档",
      //     translations: {
      //       button: {
      //         buttonText: "搜索文档",
      //         buttonAriaLabel: "搜索文档",
      //       },
      //       modal: {
      //         searchBox: {
      //           resetButtonTitle: "清除查询条件",
      //           resetButtonAriaLabel: "清除查询条件",
      //           cancelButtonText: "取消",
      //           cancelButtonAriaLabel: "取消",
      //         },
      //         startScreen: {
      //           recentSearchesTitle: "搜索历史",
      //           noRecentSearchesText: "没有搜索历史",
      //           saveRecentSearchButtonTitle: "保存至搜索历史",
      //           removeRecentSearchButtonTitle: "从搜索历史中移除",
      //           favoriteSearchesTitle: "收藏",
      //           removeFavoriteSearchButtonTitle: "从收藏中移除",
      //         },
      //         errorScreen: {
      //           titleText: "无法获取结果",
      //           helpText: "你可能需要检查你的网络连接",
      //         },
      //         footer: {
      //           selectText: "选择",
      //           navigateText: "切换",
      //           closeText: "关闭",
      //           // searchByText: "搜索提供者",
      //         },
      //         noResultsScreen: {
      //           noResultsText: "无法找到相关结果",
      //           suggestedQueryText: "你可以尝试查询",
      //           reportMissingResultsText: "你认为该查询应该有结果？",
      //           reportMissingResultsLinkText: "点击反馈",
      //         },
      //       },
      //     },
      //   },
      // },
    }),
  },
},
{
  // 主题行为选项
  custom: true, // 启用自定义支持
}
);
