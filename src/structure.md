---
title:  项目文件结构介绍
icon: wenjianjiegou
order: 3
category:
  - 项目文件结构
---

## 项目文件结构

```
.
├── src → 由你指定的文档文件夹
│    │
│    ├── .vuepress (可选的) → 用于存放全局的配置、组件、静态资源等
│    │    │
│    │    ├── dist (默认的) → 构建输出目录
│    │    │
│    │    ├── public  → 静态资源目录，存放图标等静态资源
│    │    │
│    │    ├── styles  → 用于存放样式相关的scss文件
│    │    │
│    │    ├── config.ts → 配置文件的入口文件（必选）
│    │    │             
│    │    └── theme.ts → 配置文件的入口文件（必选）
│    │    │             
│    │    └── client.ts → 客户端文件（用于一些样式）
│    │    │             
│    │    └── navbar.ts → 导航栏配置
│    │    │             
│    │    └── sidebar.ts → 侧边栏配置
│    │    │             
│    │    ├── document.ts → 文档指南侧边栏配置
│    │    │             
│    │    └── interview.ts → 面试题文章侧边栏配置
│    │    │             
│    │    ├── update_history.ts → 历史更新记录侧边栏配置
│    │
│    ├── document → 文档指南文件存储目录
│    │
│    └── interview → 面试题文件存储目录
│    │
│    └── update_history → 历史更新记录目录
│    │
│    └── blog.md → 博客主页配置文件
│    │
│    └── document-all.md → 运维文库汇总配置文件
│    │
│    └── person.md → 个人介绍主页配置文件
│    │
│    └── README.md → 项目主页配置文件
│    │
│    └── structure.md → 项目文件结构配置文件
│    │
│    └── tools-all.md → 运维工具配置文件
│    │
│    └── website-all.md → 运维服务官网配置文件
│
└── package.json → Nodejs 配置文件
│
└── tsconfig.json → 官方的一个配置（必须要）
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