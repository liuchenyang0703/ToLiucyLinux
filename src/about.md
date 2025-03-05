---
icon: jisuanji
title: 关于本站
order: 2
category:
  - 关于本站
---

一个基于 VuePress Theme Hope 主题创建的个人博客，主要记录日常问题和一些学习笔记。

## 服务提供

本站由以下内容提供服务

```component VPCard
title: Cloudflare
desc: 提供免费的 CDN 服务。
logo: https://cf-assets.www.cloudflare.com/slt3lc6tev37/1wf4qdGsPqa2UUSEoa4Yyg/3250a65f210bbb7062ab4dd9a9bdf213/logo-cloudflare-dark.svg
link: https://www.cloudflare.com/
background: rgb(253, 230, 138, 0.15)
```

```component VPCard
title: VuePress
desc: 博客驱动引擎。
logo: https://vuepress.vuejs.org/images/hero.png
link: https://vuepress.vuejs.org/zh/
background: rgb(253, 230, 138, 0.15)
```

```component VPCard
title: VuePress Theme Hope
desc: 本站博客所用主题
logo: https://theme-hope-assets.vuejs.press/logo.svg
link: https://theme-hope.vuejs.press/zh/
background: rgb(253, 230, 138, 0.15)
```

```component VPCard
title: Giscus
desc: 本站评论所用服务。
logo: https://avatars.githubusercontent.com/in/106117
link: https://giscus.app/
background: rgb(253, 230, 138, 0.15)
```

```component VPCard
title: iconfont
desc: 本站图标所用服务
logo: https://img.alicdn.com/imgextra/i4/O1CN01XZe8pH1USpiUNT1QN_!!6000000002517-2-tps-114-114.png
link: https://www.iconfont.cn/
background: rgb(253, 230, 138, 0.15)
```


<!-- ```component VPCard
title: 
desc: 
logo: 
link: 
background: rgb(253, 230, 138, 0.15) 
``` -->


## 图床
- [Typora+PicGo搭建博客图床](document/other/图床oss.md)

## 仓库连接

本站所有内容及代码均开源，可通过下面 👇 的链接访问，方便的话可以点个免费的Star，谢谢！

<!-- [ToLiucyLinux 个人博客](https://github.com/liuchenyang0703/ToLiucyLinux) -->
[![github](https://badgen.net/badge/Github/ToLiucyLinux/blue?icon=github)](https://github.com/liuchenyang0703/ToLiucyLinux)![](https://badgen.net/badge/Star/2k%20%E2%AD%90/blue?icon=github)

## 项目文件结构

* 最外层目录
```
.
├── .git → Git 版本控制系统的隐藏文件夹，包含了版本控制的所有信息，如提交历史、分支、标签等。
├── .github → 存放与 GitHub 相关的配置文件，如 GitHub Actions 工作流、GitHub Pages 配置等。提交到github上会自动通过里面的配置文件来进行自动构建部署（可以修改仓库路径、名称）。
├── node_modules → 存放通过 npm 或 pnpm 安装的项目依赖包。这些依赖包是项目运行所必需的第三方库。
├── src → 由你指定的文档文件夹，主要存放的是项目的源代码（下面会讲）
├── .gitignore → 是git的一个配置文件，指定哪些文件或文件夹不应该被 Git 版本控制系统跟踪。例如，忽略编译生成的文件、依赖包node_modules目录等。
├── git_push.bat → 我自己写的一个自动提交更改信息到github仓库上。
├── package.json → 项目的配置文件，包含了项目的元数据（如名称、版本、描述等）、依赖包列表、脚本命令等。
├── pnpm-lock.yaml → 由 pnpm 包管理器生成的锁定文件，确保项目依赖的版本一致性，避免因依赖版本不同导致的构建问题。
├── tsconfig.json → TypeScript 编译器的配置文件，定义了编译选项、文件包含/排除规则等。
```

* src内目录

```
.
├── src → 由你指定的文档文件夹，主要存放的是项目的源代码
│    │
│    ├── .vuepress (可选的) → 用于存放全局的配置、组件、静态资源等
│    │    │
│    │    ├── components → 存放的一些自定义插件
│    │    │
│    │    ├── dist → 构建输出目录，用于部署到服务器上，例如：nginx（只有构建的时候才会有此目录）
│    │    │
│    │    ├── plugins → 也是存放了一个插件这里是鼠标点击特效插件
│    │    │
│    │    ├── public  → 静态资源目录，存放图标、背景等静态资源
│    │    │
│    │    ├── styles  → 用于存放样式相关的scss文件，比如页面宽度、颜色等配置
│    │    │
│    │    ├── client.ts → 客户端文件（用于引用一些样式，比如：雪花效果、虫洞、博客运行时间等）
│    │    │
│    │    ├── config.ts → 项目的配置文件（必须要）
│    │    │
│    │    ├── theme.ts → 项目的配置文件2（必须要）
│    │    │
│    │    ├── navbar.ts → 导航栏配置（必须要）
│    │    │
│    │    ├── sidebar.ts → 侧边栏配置（必须要）
│    │    │
│    │    ├── document.ts → 文档指南侧边栏配置
│    │    │
│    │    └── interview.ts → 面试题文章侧边栏配置
│    │
│    ├── document → 文档指南文件存储目录
│    │
│    ├── interview → 面试题文件存储目录
│    │
│    ├── update_history → 历史更新记录目录
│    │
│    ├── about.md → 关于本站页面
│    │
│    ├── blog.md → 博客个人页面
│    │
│    ├── document-all.md → 运维文库汇总页面
│    │
│    ├── donate.md → 打赏页面
│    │
│    ├── friendship.md → 友情链接页面
│    │
│    ├── honor.md → 荣誉墙页面
│    │
│    ├── person.md → 关于作者页面
│    │
│    ├── website-all.md → 运维服务官网页面
│    │
│    ├── tools-all.md → 运维工具配置页面
│    │
│    └── README.md → 主页页面
│  
└── 其他外层目录上面有讲解
```

::: warning
请注意 VuePress 对目录大小写敏感。
:::


## test GFM警告案例
::: important
重要文字
:::

::: info
信息文字
:::

::: tip
提示文字
:::

::: warning
注意文字
:::

::: caution
警告文字
:::

::: note
注释文字
:::

```bash
::: important
重要文字
:::

::: info
信息文字
:::

::: tip
提示文字
:::

::: warning
注意文字
:::

::: caution
警告文字
:::

::: note
注释文字
:::
```
