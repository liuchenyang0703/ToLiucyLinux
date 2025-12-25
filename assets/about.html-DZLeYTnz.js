import{_ as o,c as u,a as n,b as a,f as t,d,n as e,g as l,w as h,r as p,o as v,e as m}from"./app-8QWr0M4S.js";const b={};function g(k,s){const i=p("VPCard"),c=p("RouteLink"),r=p("LoveTimer");return v(),u("div",null,[s[1]||(s[1]=n("p",null,"一个基于 VuePress Theme Hope 主题创建的个人博客，主要记录日常问题和一些学习笔记。",-1)),s[2]||(s[2]=n("h2",{id:"服务提供",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#服务提供"},[n("span",null,"服务提供")])],-1)),s[3]||(s[3]=n("p",null,"本站由以下内容提供服务",-1)),a(i,e(l({title:"Cloudflare",desc:"提供免费的 CDN 服务。",logo:"https://cf-assets.www.cloudflare.com/slt3lc6tev37/1wf4qdGsPqa2UUSEoa4Yyg/3250a65f210bbb7062ab4dd9a9bdf213/logo-cloudflare-dark.svg",link:"https://www.cloudflare.com/",background:"rgb(253, 230, 138, 0.15)"})),null,16),a(i,e(l({title:"VuePress",desc:"博客驱动引擎。",logo:"https://vuepress.vuejs.org/images/hero.png",link:"https://vuepress.vuejs.org/zh/",background:"rgb(253, 230, 138, 0.15)"})),null,16),a(i,e(l({title:"VuePress Theme Hope",desc:"本站博客所用主题",logo:"https://theme-hope-assets.vuejs.press/logo.svg",link:"https://theme-hope.vuejs.press/zh/",background:"rgb(253, 230, 138, 0.15)"})),null,16),a(i,e(l({title:"Giscus",desc:"本站评论所用服务。",logo:"https://avatars.githubusercontent.com/in/106117",link:"https://giscus.app/",background:"rgb(253, 230, 138, 0.15)"})),null,16),a(i,e(l({title:"iconfont",desc:"本站图标所用服务",logo:"https://img.alicdn.com/imgextra/i4/O1CN01XZe8pH1USpiUNT1QN_!!6000000002517-2-tps-114-114.png",link:"https://www.iconfont.cn/",background:"rgb(253, 230, 138, 0.15)"})),null,16),a(i,e(l({title:"umami",desc:"网站统计其一（umami）",logo:"https://umami.is/favicon.ico",link:"https://umami.is/",background:"rgb(253, 230, 138, 0.15)"})),null,16),a(i,e(l({title:"百度统计",desc:"网站统计其一（百度统计）",logo:"https://tongji.baidu.com/favicon.ico",link:"https://tongji.baidu.com/",background:"rgb(253, 230, 138, 0.15)"})),null,16),a(i,e(l({title:"高德地图API",desc:"用于本站天气预报",logo:"https://a.amap.com/pc/static/favicon.ico",link:"https://lbs.amap.com/",background:"rgb(253, 230, 138, 0.15)"})),null,16),a(i,e(l({title:"音乐插件",desc:"用于本站的音乐播放",logo:"https://s1.music.126.net/style/favicon.ico",link:"https://github.com/OrageKK/vuepress-plugin-meting2",background:"rgb(253, 230, 138, 0.15)"})),null,16),t(" ```component VPCard\ntitle: \ndesc: \nlogo: \nlink: \nbackground: rgb(253, 230, 138, 0.15) \n``` "),s[4]||(s[4]=n("h2",{id:"图床",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#图床"},[n("span",null,"图床")])],-1)),n("ul",null,[n("li",null,[a(c,{to:"/document/other/%E5%9B%BE%E5%BA%8Aoss.html"},{default:h(()=>[...s[0]||(s[0]=[m("Typora+PicGo搭建博客图床",-1)])]),_:1})])]),s[5]||(s[5]=n("h2",{id:"仓库连接",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#仓库连接"},[n("span",null,"仓库连接")])],-1)),s[6]||(s[6]=n("p",null,"本站所有内容及代码均开源，可通过下面 👇 的链接访问，方便的话可以点个免费的Star，谢谢！",-1)),t(" [ToLiucyLinux 个人博客](https://github.com/liuchenyang0703/ToLiucyLinux) "),s[7]||(s[7]=d(`<p><a href="https://github.com/liuchenyang0703/ToLiucyLinux" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/badge/Github/ToLiucyLinux/blue?icon=github" alt="github" loading="lazy"></a><img src="https://badgen.net/badge/Star/2k ⭐/blue?icon=github" alt="" loading="lazy"></p><h2 id="项目文件结构" tabindex="-1"><a class="header-anchor" href="#项目文件结构"><span>项目文件结构</span></a></h2><ul><li>最外层目录</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>.</span></span>
<span class="line"><span>├── .git → Git 版本控制系统的隐藏文件夹，包含了版本控制的所有信息，如提交历史、分支、标签等。</span></span>
<span class="line"><span>├── .github → 存放与 GitHub 相关的配置文件，如 GitHub Actions 工作流、GitHub Pages 配置等。提交到github上会自动通过里面的配置文件来进行自动构建部署（可以修改仓库路径、名称）。</span></span>
<span class="line"><span>├── node_modules → 存放通过 npm 或 pnpm 安装的项目依赖包。这些依赖包是项目运行所必需的第三方库。</span></span>
<span class="line"><span>├── src → 由你指定的文档文件夹，主要存放的是项目的源代码（下面会讲）</span></span>
<span class="line"><span>├── .gitignore → 是git的一个配置文件，指定哪些文件或文件夹不应该被 Git 版本控制系统跟踪。例如，忽略编译生成的文件、依赖包node_modules目录等。</span></span>
<span class="line"><span>├── git_push.bat → 我自己写的一个自动提交更改信息到github仓库上。</span></span>
<span class="line"><span>├── package.json → 项目的配置文件，包含了项目的元数据（如名称、版本、描述等）、依赖包列表、脚本命令等。</span></span>
<span class="line"><span>├── pnpm-lock.yaml → 由 pnpm 包管理器生成的锁定文件，确保项目依赖的版本一致性，避免因依赖版本不同导致的构建问题。</span></span>
<span class="line"><span>├── tsconfig.json → TypeScript 编译器的配置文件，定义了编译选项、文件包含/排除规则等。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>src内目录</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>.</span></span>
<span class="line"><span>├── src → 由你指定的文档文件夹，主要存放的是项目的源代码</span></span>
<span class="line"><span>│    │</span></span>
<span class="line"><span>│    ├── .vuepress (可选的) → 用于存放全局的配置、组件、静态资源等</span></span>
<span class="line"><span>│    │    │</span></span>
<span class="line"><span>│    │    ├── components → 存放的一些自定义插件</span></span>
<span class="line"><span>│    │    │</span></span>
<span class="line"><span>│    │    ├── dist → 构建输出目录，用于部署到服务器上，例如：nginx（只有构建的时候才会有此目录）</span></span>
<span class="line"><span>│    │    │</span></span>
<span class="line"><span>│    │    ├── plugins → 也是存放了一个插件这里是鼠标点击特效插件</span></span>
<span class="line"><span>│    │    │</span></span>
<span class="line"><span>│    │    ├── public  → 静态资源目录，存放图标、背景等静态资源</span></span>
<span class="line"><span>│    │    │</span></span>
<span class="line"><span>│    │    ├── styles  → 用于存放样式相关的scss文件，比如页面宽度、颜色等配置</span></span>
<span class="line"><span>│    │    │</span></span>
<span class="line"><span>│    │    ├── client.ts → 客户端文件（用于引用一些样式，比如：雪花效果、虫洞、博客运行时间等）</span></span>
<span class="line"><span>│    │    │</span></span>
<span class="line"><span>│    │    ├── config.ts → 项目的配置文件（必须要）</span></span>
<span class="line"><span>│    │    │</span></span>
<span class="line"><span>│    │    ├── theme.ts → 项目的配置文件2（必须要）</span></span>
<span class="line"><span>│    │    │</span></span>
<span class="line"><span>│    │    ├── navbar.ts → 导航栏配置（必须要）</span></span>
<span class="line"><span>│    │    │</span></span>
<span class="line"><span>│    │    ├── sidebar.ts → 侧边栏配置（必须要）</span></span>
<span class="line"><span>│    │    │</span></span>
<span class="line"><span>│    │    ├── document.ts → 文档指南侧边栏配置</span></span>
<span class="line"><span>│    │    │</span></span>
<span class="line"><span>│    │    └── interview.ts → 面试题文章侧边栏配置</span></span>
<span class="line"><span>│    │</span></span>
<span class="line"><span>│    ├── document → 文档指南文件存储目录</span></span>
<span class="line"><span>│    │</span></span>
<span class="line"><span>│    ├── interview → 面试题文件存储目录</span></span>
<span class="line"><span>│    │</span></span>
<span class="line"><span>│    ├── update_history → 历史更新记录目录</span></span>
<span class="line"><span>│    │</span></span>
<span class="line"><span>│    ├── about.md → 关于本站页面</span></span>
<span class="line"><span>│    │</span></span>
<span class="line"><span>│    ├── blog.md → 博客个人页面</span></span>
<span class="line"><span>│    │</span></span>
<span class="line"><span>│    ├── document-all.md → 运维文库汇总页面</span></span>
<span class="line"><span>│    │</span></span>
<span class="line"><span>│    ├── donate.md → 打赏页面</span></span>
<span class="line"><span>│    │</span></span>
<span class="line"><span>│    ├── friendship.md → 友情链接页面</span></span>
<span class="line"><span>│    │</span></span>
<span class="line"><span>│    ├── honor.md → 荣誉墙页面</span></span>
<span class="line"><span>│    │</span></span>
<span class="line"><span>│    ├── person.md → 关于作者页面</span></span>
<span class="line"><span>│    │</span></span>
<span class="line"><span>│    ├── website-all.md → 运维服务官网页面</span></span>
<span class="line"><span>│    │</span></span>
<span class="line"><span>│    ├── tools-all.md → 运维工具配置页面</span></span>
<span class="line"><span>│    │</span></span>
<span class="line"><span>│    └── README.md → 主页页面</span></span>
<span class="line"><span>│  </span></span>
<span class="line"><span>└── 其他外层目录上面有讲解</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">注意</p><p>请注意 VuePress 对目录大小写敏感。</p></div><h2 id="在一起❤在一起" tabindex="-1"><a class="header-anchor" href="#在一起❤在一起"><span>在一起❤在一起</span></a></h2>`,8)),a(r),s[8]||(s[8]=d(`<h2 id="test-gfm警告案例" tabindex="-1"><a class="header-anchor" href="#test-gfm警告案例"><span>test GFM警告案例</span></a></h2><div class="hint-container important"><p class="hint-container-title">重要</p><p>重要文字</p></div><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>信息文字</p></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>提示文字</p></div><div class="hint-container warning"><p class="hint-container-title">注意</p><p>注意文字</p></div><div class="hint-container caution"><p class="hint-container-title">警告</p><p>警告文字</p></div><div class="hint-container note"><p class="hint-container-title">注</p><p>注释文字</p></div><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">:::</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> important</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">重要文字</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">:::</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">:::</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> info</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">信息文字</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">:::</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">:::</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> tip</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">提示文字</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">:::</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">:::</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> warning</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">注意文字</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">:::</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">:::</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> caution</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">警告文字</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">:::</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">:::</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> note</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">注释文字</span></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">:::</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8))])}const f=o(b,[["render",g]]),C=JSON.parse('{"path":"/about.html","title":"关于本站","lang":"zh-CN","frontmatter":{"icon":"jisuanji","title":"关于本站","order":2,"category":["关于本站"],"description":"一个基于 VuePress Theme Hope 主题创建的个人博客，主要记录日常问题和一些学习笔记。 服务提供 本站由以下内容提供服务","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"关于本站\\",\\"image\\":[\\"https://badgen.net/badge/Github/ToLiucyLinux/blue?icon=github\\",\\"https://badgen.net/badge/Star/2k%20%E2%AD%90/blue?icon=github\\"],\\"dateModified\\":\\"2025-11-11T02:17:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"𝑴𝒓.𝑳𝒊𝒖𝒄𝒚\\",\\"url\\":\\"http://liuchenyang.top\\"}]}"],["meta",{"property":"og:url","content":"http://liuchenyang.top/ToLiucyLinux/about.html"}],["meta",{"property":"og:site_name","content":"ToLiucyLinux"}],["meta",{"property":"og:title","content":"关于本站"}],["meta",{"property":"og:description","content":"一个基于 VuePress Theme Hope 主题创建的个人博客，主要记录日常问题和一些学习笔记。 服务提供 本站由以下内容提供服务"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://badgen.net/badge/Github/ToLiucyLinux/blue?icon=github"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-11-11T02:17:02.000Z"}],["meta",{"property":"article:modified_time","content":"2025-11-11T02:17:02.000Z"}]]},"git":{"createdTime":1739338920000,"updatedTime":1762827422000,"contributors":[{"name":"liuchenyang","username":"liuchenyang","email":"2162059863@qq.com","commits":9,"url":"https://github.com/liuchenyang"}]},"readingTime":{"minutes":3.97,"words":1191},"filePathRelative":"about.md","excerpt":"<p>一个基于 VuePress Theme Hope 主题创建的个人博客，主要记录日常问题和一些学习笔记。</p>\\n<h2>服务提供</h2>\\n<p>本站由以下内容提供服务</p>\\n","copyright":"著作权归 Mr.Liucy 所有，本站内容遵循 MIT 协议，转载请注明出处。\\n原文链接：https://liuchenyang.top/about.html","autoDesc":true}');export{f as comp,C as data};
