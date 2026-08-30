---
title: 使用脚手架创建Vue3项目
icon: circle-info
order: 2
category:
  - 前端技术
tag:
  - 前端技术
pageview: false
date: 2023-12-03 19:36:39
comment: false
breadcrumb: false
---

> 转载~~~

# 使用脚手架创建Vue3项目


## 1.前言

大家好，我是Leo哥🫣🫣🫣，最近在复习Vue3相关知识，今天主要想分享一下Vue3创建项目的几种方式。好了，话不多说让我们开始吧😎😎😎。



## 2.创建Vue3项目的几种方式

目前创建vue3的项目方式比较多：

- vue-cli创建vue3项目
- vite创建vue3项目
- create-vue创建vue3项目

本次文章是主要介绍第二种和第三种方式进行演示，关于第一种使用vue-cli的方式创建项目，在vue2中使用较多，所以我们这里不过太多赘述。



## 3.使用Vite创建Vue3项目

- 通过[vite官网的介绍](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)，我们可以通过vite创建各种各样的项目，我们这里直接执行创建就好了。
- 我这里使用pnpm创建项目，大家可以选择其他包管理器进行项目创建。

```bash
pnpm create vite
```

![image-20231127102927179](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311271029235.png)

大家可以按照我这个步骤一步一步来即可。

第一步，进入我们创建好的vue3项目目录

```bash
cd vue3-demo
```

第二步，进行依赖安装

```
npm install
```

第三步，启动我们的vue3项目

```
npm run dev
```

![image-20231127103648176](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311271036201.png)

浏览器输入地址即可。

![image-20231127103711652](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311271037697.png)

看到上面，这个界面，说明我们已经大功告成了！



## 4.使用create-vue创建Vue3项目

- 最后一种也是我最推荐大家使用的一种，[这个库](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fcreate-vue)也是官方进行维护的，笔者一直都是使用这种方式进行创建的，简单粗暴。
- 执行方式也是比较简单的，我们可以基于vite创建vue3或者vue2的项目

```bash
npm init vue@3
npm init vue@2
```

首先我们找一个我们需要创建项目的文件夹，右键打开cmd窗口。

![image-20231127093955647](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311270939693.png)

然后执行以下命令即可。

```bash
npm init vue@latest
```

![image-20231127094145249](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311270941279.png)

大家按照我这个步骤一步一步选择执行即可。

完成我们接着执行依次命令即可。

第一步，进入我们创建好的vue3项目目录

```bash
cd vue3-demo
```

第二步，进行依赖安装

```
npm install
```

第三步，启动我们的vue3项目

```
npm run dev
```

![image-20231127102205009](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311271022037.png)

浏览器输入地址即可。

![image-20231127102245414](https://gaoziman.oss-cn-hangzhou.aliyuncs.com/LeoPic202311271022534.png)

看到以上界面，说明我们的Vue3入门程序没问题，大功告成！



## 5.参考文献

- https://vitejs.dev/
- https://vuejs.org/

