import{_ as n,c as a,a as i,o as e}from"./app-Dkux0qIq.js";const l={};function p(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h2 id="项目文件结构" tabindex="-1"><a class="header-anchor" href="#项目文件结构"><span>项目文件结构</span></a></h2><ul><li>最外层目录</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>.</span></span>
<span class="line"><span>├── .git → Git 版本控制系统的隐藏文件夹，包含了版本控制的所有信息，如提交历史、分支、标签等。</span></span>
<span class="line"><span>├── .github → 存放与 GitHub 相关的配置文件，如 GitHub Actions 工作流、GitHub Pages 配置等。提交到github上会自动通过里面的配置文件来进行自动构建部署（可以修改仓库路径、名称）。</span></span>
<span class="line"><span>├── node_modules → 存放通过 npm 或 pnpm 安装的项目依赖包。这些依赖包是项目运行所必需的第三方库。</span></span>
<span class="line"><span>├── src → 由你指定的文档文件夹，主要存放的是项目的源代码（下面会讲）</span></span>
<span class="line"><span>├── .gitignore → 是git的一个配置文件，指定哪些文件或文件夹不应该被 Git 版本控制系统跟踪。例如，忽略编译生成的文件、依赖包node_modules目录等。</span></span>
<span class="line"><span>├── git_push.bat → 我自己写的一个自动提交更改信息到github仓库上。</span></span>
<span class="line"><span>├── package.json → 项目的配置文件，包含了项目的元数据（如名称、版本、描述等）、依赖包列表、脚本命令等。</span></span>
<span class="line"><span>├── pnpm-lock.yaml → 由 pnpm 包管理器生成的锁定文件，确保项目依赖的版本一致性，避免因依赖版本不同导致的构建问题。</span></span>
<span class="line"><span>├── tsconfig.json → TypeScript 编译器的配置文件，定义了编译选项、文件包含/排除规则等。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>src内目录</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>.</span></span>
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
<span class="line"><span>│    │    ├── interview.ts → 面试题文章侧边栏配置</span></span>
<span class="line"><span>│    │    │</span></span>
<span class="line"><span>│    │    ├── update_history.ts → 历史更新记录侧边栏配置</span></span>
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
<span class="line"><span>│    ├── person.md → 关于作者页面</span></span>
<span class="line"><span>│    │</span></span>
<span class="line"><span>│    ├── website-all.md → 运维服务官网页面</span></span>
<span class="line"><span>│    │</span></span>
<span class="line"><span>│    ├── structure.md → 项目文件结构介绍页面</span></span>
<span class="line"><span>│    │</span></span>
<span class="line"><span>│    ├── tools-all.md → 运维工具配置页面</span></span>
<span class="line"><span>│    │</span></span>
<span class="line"><span>│    └── README.md → 主页页面</span></span>
<span class="line"><span>│  </span></span>
<span class="line"><span>└── 其他外层目录上面有讲解</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">注意</p><p>请注意 VuePress 对目录大小写敏感。</p></div><h2 id="test-gfm警告案例" tabindex="-1"><a class="header-anchor" href="#test-gfm警告案例"><span>test GFM警告案例</span></a></h2><div class="hint-container important"><p class="hint-container-title">重要</p><p>重要文字</p></div><div class="hint-container info"><p class="hint-container-title">相关信息</p><p>信息文字</p></div><div class="hint-container tip"><p class="hint-container-title">提示</p><p>提示文字</p></div><div class="hint-container warning"><p class="hint-container-title">注意</p><p>注意文字</p></div><div class="hint-container caution"><p class="hint-container-title">警告</p><p>警告文字</p></div><div class="hint-container note"><p class="hint-container-title">注</p><p>注释文字</p></div><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">:::</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> important</span></span>
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
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">:::</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14)]))}const c=n(l,[["render",p],["__file","structure.html.vue"]]),r=JSON.parse('{"path":"/structure.html","title":"项目文件结构介绍","lang":"zh-CN","frontmatter":{"title":"项目文件结构介绍","icon":"wenjianjiegou","order":3,"category":["项目文件结构"],"description":"项目文件结构 最外层目录 src内目录 注意 请注意 VuePress 对目录大小写敏感。 test GFM警告案例 重要 重要文字 相关信息 信息文字 提示 提示文字 注意 注意文字 警告 警告文字 注 注释文字","head":[["meta",{"property":"og:url","content":"http://liuchenyang.top/ToLiucyLinux/structure.html"}],["meta",{"property":"og:site_name","content":"ToLiucyLinux"}],["meta",{"property":"og:title","content":"项目文件结构介绍"}],["meta",{"property":"og:description","content":"项目文件结构 最外层目录 src内目录 注意 请注意 VuePress 对目录大小写敏感。 test GFM警告案例 重要 重要文字 相关信息 信息文字 提示 提示文字 注意 注意文字 警告 警告文字 注 注释文字"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-26T07:44:51.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-26T07:44:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"项目文件结构介绍\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-02-26T07:44:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"𝑴𝒓.𝑳𝒊𝒖𝒄𝒚\\",\\"url\\":\\"http://liuchenyang.top\\"}]}"]]},"headers":[{"level":2,"title":"项目文件结构","slug":"项目文件结构","link":"#项目文件结构","children":[]},{"level":2,"title":"test GFM警告案例","slug":"test-gfm警告案例","link":"#test-gfm警告案例","children":[]}],"git":{"createdTime":1737021380000,"updatedTime":1740555891000,"contributors":[{"name":"liuchenyang","username":"liuchenyang","email":"2162059863@qq.com","commits":2,"url":"https://github.com/liuchenyang"}]},"readingTime":{"minutes":2.74,"words":822},"filePathRelative":"structure.md","localizedDate":"2025年1月16日","excerpt":"<h2>项目文件结构</h2>\\n<ul>\\n<li>最外层目录</li>\\n</ul>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>.</span></span>\\n<span class=\\"line\\"><span>├── .git → Git 版本控制系统的隐藏文件夹，包含了版本控制的所有信息，如提交历史、分支、标签等。</span></span>\\n<span class=\\"line\\"><span>├── .github → 存放与 GitHub 相关的配置文件，如 GitHub Actions 工作流、GitHub Pages 配置等。提交到github上会自动通过里面的配置文件来进行自动构建部署（可以修改仓库路径、名称）。</span></span>\\n<span class=\\"line\\"><span>├── node_modules → 存放通过 npm 或 pnpm 安装的项目依赖包。这些依赖包是项目运行所必需的第三方库。</span></span>\\n<span class=\\"line\\"><span>├── src → 由你指定的文档文件夹，主要存放的是项目的源代码（下面会讲）</span></span>\\n<span class=\\"line\\"><span>├── .gitignore → 是git的一个配置文件，指定哪些文件或文件夹不应该被 Git 版本控制系统跟踪。例如，忽略编译生成的文件、依赖包node_modules目录等。</span></span>\\n<span class=\\"line\\"><span>├── git_push.bat → 我自己写的一个自动提交更改信息到github仓库上。</span></span>\\n<span class=\\"line\\"><span>├── package.json → 项目的配置文件，包含了项目的元数据（如名称、版本、描述等）、依赖包列表、脚本命令等。</span></span>\\n<span class=\\"line\\"><span>├── pnpm-lock.yaml → 由 pnpm 包管理器生成的锁定文件，确保项目依赖的版本一致性，避免因依赖版本不同导致的构建问题。</span></span>\\n<span class=\\"line\\"><span>├── tsconfig.json → TypeScript 编译器的配置文件，定义了编译选项、文件包含/排除规则等。</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","copyright":"著作权归 Mr.Liucy 所有，基于 MIT 协议，原文链接：https://liuchenyang.top","autoDesc":true}');export{c as comp,r as data};
