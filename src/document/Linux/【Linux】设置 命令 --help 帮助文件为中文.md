---
title: 【Linux】设置 命令 --help 帮助文件为中文
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 运维
pageview: false
date: 2024-12-18
comment: false
breadcrumb: false
---


>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---


## 前言
>在Linux中，当我们执行某个命令的 –h 或者  –help 时，默认输出的都是英文，还需要到百度去搜什么意思，特麻烦，接下来我们来说下如何将所有帮助命令显示成中文。

## 设置系统默认语言为中文
对应每个shell而言，重启后会变成英文，所以每次都需要执行

- 1、查看当前语言
```bash
echo $LANG
输出：en_US.UTF-8 （此时为英文）


#或者使用locale查看
locale
```
下面 LANG=en_US.UTF-8 是当前语言，属于英文；


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181351499.png)

- 2、查看是否存在中文语言包

```bash
locale -a | grep zh_CN
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181351291.png)

`zh_CN.utf8` 是简体中文，如果没有zh_CN.utf8，就安装语言包，如果存在可以直接设置。
简体中文语言包安装：

```bash
yum install kde-l10n-Chinese
```
- 3、将`$LANG`变量修改为 `zh_CN.UTF-8`

```bash
#临时修改（再开一个新页面就失效了）
LANG=zh_CN.UTF-8
echo $LANG
输出：zh_CN.UTF-8 （此时为中文）

#永久修改，重启服务器之后不会失效（方法一）
#编辑 /etc/locale.conf 文件，增加下面的内容
LANG="zh_CN.UTF-8"
#需要重启。

#永久修改，重启服务器之后不会失效（方法二）
localectl set-locale LANG=zh_CN.UTF8
#也需要重启方可生效。

#永久修改，重启服务器之后不会失效（方法三：推荐）
#编辑 /root/.bashrc 文件，追加到最后
LANG=zh_CN.UTF-8
#这样，关了再开一个窗口就生效了，不用重启。
```

## 安装man-pages

```bash
#搜索man-pages所有的包
yum search man-pages
#安装 man-pages包
yum install man man-pages man-pages-zh-CN -y
```

## 验证

```bash
ls --help
man bash
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181351351.png)

## 完成


