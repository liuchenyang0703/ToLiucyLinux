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


  // 暗黑模式切换-在深色模式和浅色模式中切换
  darkmode: "toggle",
  // 全屏按钮
  fullscreen: true,
  //提取到h6级标题
  headerDepth: 6,

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
    start: ['Brand'],
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
  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "Word","ReadingTime"],

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
	  // 启用 PlantUML 支持，允许在 Markdown 文件中直接写出 PlantUML 图表。
    plantuml: true,
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
    // 图形（属性图、圆饼图），在启用之前安装 echarts
    echarts: true,
    // 饼形图，在启用之前安装 mermaid
    mermaid: true,
	
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

    // 在启用之前安装 chart.js
    // chartjs: true,

    // insert component easily

    // 在启用之前安装 echarts
    // echarts: true,

    // 在启用之前安装 flowchart.ts
    // flowchart: true,

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
    // 侧边栏显示设置，这里设置为移动端显示
    sidebarDisplay: "mobile",
    // 博主头像
    avatar: "picture.jpg",
    // 座右铭
    description:"没有什么使我停留--除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟。",
    // 社交媒体链接
    medias: {
      Email: "person.html#%E4%B8%AA%E4%BA%BA%E9%82%AE%E7%AE%B1",
      GitHub: "https://github.com/liuchenyang0703/",
      Weibo: "https://weibo.com/u/6350216849",
      WechatMP: "https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202312142008812.png",
      "163Music": "https://music.163.com/#/artist?id=50843863",
      QQMusic: "https://y.qq.com/n/ryqq/singer/002w4tXt2LlT2T",
      Kugou: "https://www.kugou.com/singer/info/749K9K2D607AF7/",
      Kuwo: "https://www.kuwo.cn/singer_detail/8900358",
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
      assets: "//at.alicdn.com/t/c/font_4791124_2b9yilglxg9.css", // 使用阿里图标库
    },
    // 启用博客类型
    blog: true,
    
    // 左边弹窗公告
    // components: {
    //   rootComponents: {
    //     notice: [
    //       {
    //         path: "/",
    //         title: "2023技术年货汇总",
    //         showOnce: true,
    //         content:
    //             "抽空整理了一些优秀的技术团队公众号 2023 年的优质技术文章汇总，质量都挺高的，强烈建议打开这篇文章看看。",
    //         actions: [
    //           {
    //             text: "开始阅读",
    //             link: "https://www.yuque.com/snailclimb/dr6cvl/nt5qc467p3t6s13k?singleDoc# 《2023技术年货》",
    //             type: "primary",
    //           },
    //         ],
    //       },
    //     ],
    //   }
    // },

    // 注意: 此评论功能为我的仓库地址! 你必须自行生成自己的评论仓库并在生产环境中使用自己的评论服务，详细请看官方地址：https://theme-hope.vuejs.press/zh/guide/feature/comment.html#giscus
    comment: {
      provider: "Giscus",
      repo :"liuchenyang0703/ToLiucyLinux",
      repoId:"R_kgDOMUbAoQ",
      category:"Announcements",
      categoryId:"DIC_kwDOMUbAoc4CmBak",
    },
    
    components: {
      components: ["Badge", "VPCard"],
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
      author: "Liucy(https://liuchenyang.top)",
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
        return `著作权归 Mr.Liucy 所有，基于 MIT 协议，原文链接：https://liuchenyang.top`;
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
  
      locales: {
        "/": {
          placeholder: "搜索文档",
          translations: {
            button: {
              buttonText: "搜索文档",
              buttonAriaLabel: "搜索文档",
            },
            modal: {
              searchBox: {
                resetButtonTitle: "清除查询条件",
                resetButtonAriaLabel: "清除查询条件",
                cancelButtonText: "取消",
                cancelButtonAriaLabel: "取消",
              },
              startScreen: {
                recentSearchesTitle: "搜索历史",
                noRecentSearchesText: "没有搜索历史",
                saveRecentSearchButtonTitle: "保存至搜索历史",
                removeRecentSearchButtonTitle: "从搜索历史中移除",
                favoriteSearchesTitle: "收藏",
                removeFavoriteSearchButtonTitle: "从收藏中移除",
              },
              errorScreen: {
                titleText: "无法获取结果",
                helpText: "你可能需要检查你的网络连接",
              },
              footer: {
                selectText: "选择",
                navigateText: "切换",
                closeText: "关闭",
                searchByText: "搜索提供者",
              },
              noResultsScreen: {
                noResultsText: "无法找到相关结果",
                suggestedQueryText: "你可以尝试查询",
                reportMissingResultsText: "你认为该查询应该有结果？",
                reportMissingResultsLinkText: "点击反馈",
              },
            },
          },
        },
      },
    }),
  },
},
{
  // 主题行为选项
  custom: true, // 启用自定义支持
}
);
