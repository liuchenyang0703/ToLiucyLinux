---
title: ubuntu各版本配置apt源（阿里源）
icon: circle-info
order: 1
category:
  - Linux
  - 操作系统
tag:
  - Linux
  - ubuntu
  - 运维
date: 2026-01-22
isOriginal: true
pageview: true
article: true
breadcrumb: false
comment: true
---

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202602021006733.png)


>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[CSDN博客专家](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/usersnew/id_1661843828089234)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/profile/7yu26jk3lfqxg)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---

## 简介

> &emsp;&emsp;在安装ubuntu系统，我们需要安装软件及服务的时候，由于自带的apt源国内访问不到，所以下载不下来，需要更换apt源为国内源。

## ubuntu各版本源内容替换：

> 如想换清华/中科大源，把 `mirrors.aliyun.com` 替换成对应域名即可，
>
> * 阿里源：`mirrors.aliyun.com` 
> * 清华源：`mirrors.tuna.tsinghua.edu.cn`
> * 中科大：`mirrors.ustc.edu.cn`



| ubuntu版本 | 代号   | 配置文件路径                             | 是否仍受官方支持     |
| ---------- | ------ | ---------------------------------------- | -------------------- |
| 14.04      | trusty | `/etc/apt/sources.list`                  | ❌ 已停止支持         |
| 16.04      | xenial | `/etc/apt/sources.list`                  | ❌ 已停止支持         |
| 18.04      | bionic | `/etc/apt/sources.list`                  | ✅ 维护支持至 2028-04 |
| 20.04      | focal  | `/etc/apt/sources.list`                  | ✅ 维护支持至 2030-04 |
| 22.04      | jammy  | `/etc/apt/sources.list`                  | ✅ 维护支持至 2032-04 |
| 24.04      | noble  | `/etc/apt/sources.list.d/ubuntu.sources` | ✅ 维护支持至 2036-04 |

### Ubuntu 14.04 LTS：

```bash
# 备份apt源文件
cp -ar /etc/apt/sources.list /etc/apt/sources.list-bak
# 编辑新的apt源文件
vim /etc/apt/sources.list
```

```bash
deb https://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse
deb https://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse

deb https://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse

deb https://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse

## Not recommended
# deb https://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse
# deb-src https://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse
```

### Ubuntu 16.04 LTS：

```bash
# 备份apt源文件
cp -ar /etc/apt/sources.list /etc/apt/sources.list-bak
# 编辑新的apt源文件
vim /etc/apt/sources.list
```

```bash
deb https://mirrors.aliyun.com/ubuntu/ xenial main
deb-src https://mirrors.aliyun.com/ubuntu/ xenial main

deb https://mirrors.aliyun.com/ubuntu/ xenial-updates main
deb-src https://mirrors.aliyun.com/ubuntu/ xenial-updates main

deb https://mirrors.aliyun.com/ubuntu/ xenial universe
deb-src https://mirrors.aliyun.com/ubuntu/ xenial universe
deb https://mirrors.aliyun.com/ubuntu/ xenial-updates universe
deb-src https://mirrors.aliyun.com/ubuntu/ xenial-updates universe

deb https://mirrors.aliyun.com/ubuntu/ xenial-security main
deb-src https://mirrors.aliyun.com/ubuntu/ xenial-security main
deb https://mirrors.aliyun.com/ubuntu/ xenial-security universe
deb-src https://mirrors.aliyun.com/ubuntu/ xenial-security universe

```

### Ubuntu 18.04 LTS：

```bash
# 备份apt源文件
cp -ar /etc/apt/sources.list /etc/apt/sources.list-bak
# 编辑新的apt源文件
vim /etc/apt/sources.list
```

```bash
deb https://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse

deb https://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse

deb https://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse

# deb https://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
# deb-src https://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse

deb https://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse

```

### Ubuntu 20.04 LTS：

```bash
# 备份apt源文件
cp -ar /etc/apt/sources.list /etc/apt/sources.list-bak
# 编辑新的apt源文件
vim /etc/apt/sources.list
```

```bash
deb https://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse

deb https://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse

deb https://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse

# deb https://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
# deb-src https://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse

deb https://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src https://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse

```

### Ubuntu 22.04 LTS：

```bash
# 备份apt源文件
cp -ar /etc/apt/sources.list /etc/apt/sources.list-bak
# 编辑新的apt源文件
vim /etc/apt/sources.list
```

```bash
deb http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-proposed main restricted universe multiverse
```

### Ubuntu 24.04 LTS：

```bash
# 备份apt源文件
cp -ar /etc/apt/sources.list.d/ubuntu.sources /etc/apt/sources.list.d/ubuntu.sources-bak
# 编辑新的apt源文件
vim /etc/apt/sources.list.d/ubuntu.sources
```

```bash
Types: deb
URIs: http://mirrors.aliyun.com/ubuntu
Suites: noble noble-security noble-updates noble-backports
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

## 更新apt源

```bash
apt-get -y update
```

> apt源更新好之后就可以进行下载所需软件了；
> 如果有问题大家可以进行反馈，我来更新，谢谢大家的支持！！！

---
> 👍后续如果还有其他的，可以联系添加哦！😄
> 🐋 希望大家多多支持，我们一起进步！😄
> 🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗
