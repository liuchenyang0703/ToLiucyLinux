---
title: 【Linux】Ubuntu 如何下载离线安装包？（详解）
icon: circle-info
order: 1
category:
  - Linux
  - 操作系统
tag:
  - Linux
  - 操作系统
  - Ubuntu
  - 运维
date: 2026-10-23
isOriginal: true
pageview: true
article: true
breadcrumb: false
comment: true
---


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


![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261024125834631.jpeg)

## 前言

<font color=red>下载离线包的时候需要在有可以 ping 通外网（如 baidu、ubuntu 官方源）的环境中下载离线包；</font>

>&emsp;&emsp;相信大家也遇到过这种问题，在没有外网的情况下，想安装一个服务却安装不了，这期我就教大家如何在 Ubuntu 系统中下载离线安装包，并在内网中使用；


## 第一种方法：使用 apt + 参数安装 -- 【推荐】包含依赖

*  首先先讲解一下 apt 下载离线安装包的参数及解析；

apt 下载离线安装包的参数及解析；
|参数| 解析 |
|--|--|
|install|下载并安装某个软件包|
| -d / --download-only |仅下载安装包，不进行安装|
| -o Dir::Cache::archives=路径|指定下载的安装包存放路径（apt 默认存放到 `/var/cache/apt/archives/`）|
| --reinstall|重新下载已安装的包（解决“已安装不下载”的问题）|

<br>

**<font color=teal>实例：</font>**

Ubuntu 直接下载安装 lrzsz 命令，下载完并不会有安装包残留，直接就会安装上；

```bash
apt install -y lrzsz
```

Ubuntu 下载离线安装包 lrzsz 命令，不进行安装，只需要离线安装包，并且放到 /application/lrzsz 目录中；

>  ⚠️ 注意：如果已经 install 安装了此命令，那么下载的时候就会提示 “已经是最新版本了”，所以下载的时候如果已经安装了，就需要先卸载，在进行下载；或者是开一个ubuntu镜像单独下载。

下载命令：

* 直接下载，不指定目录
```bash
apt install -d -y lrzsz
```
> 下载的 `.deb` 文件会集中存放在 `/var/cache/apt/archives/` 目录下。
> 建议执行前先运行 `apt clean` 清空旧缓存，避免混入旧版本文件。

* 下载离线安装包并指定下载存储路径
```bash
apt install -d -y lrzsz -o Dir::Cache::archives=/application/lrzsz/
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/20261024125842693.png)


使用如上命令就可以把 deb 离线包下载到本地，之后使用的时候就可以上传到内网环境中，直接 <font color=red>**dpkg -i 包名**</font> 安装就可以了。

> ⚠️ 注意：apt 的 `-d` 下载依赖时，如果依赖包在系统中已经安装过，则不会重复下载。若想强制下载全部依赖，可以先在**干净的容器/虚拟机**中执行下载操作。

## 第二种方法：使用 apt download 命令【只下载需要的安装包（不包含依赖）】

> 使用 `apt download` 命令，它只下载指定的单个软件包，不解析依赖，也不需要 root 权限。

* 命令如下：
```bash
apt download 要下载的安装包
```

* apt download 参数

|  参数|解析  |
|--|--|
| （无）| 只下载指定的 .deb 包，不包含依赖，默认下载到当前目录 |
| `--print-uris` | 只打印软件包的下载地址，不实际下载 |

> 由于 `apt download` 不支持直接指定目录，通常先 `cd` 到目标目录再执行下载。

**<font color=teal>实例：</font>**

* 单独只下载一个 curl 命令安装包且不安装服务，把安装包存到 `/application/curl/` 目录下；

```bash
# 切换到要下载的路径
cd /application/curl/
# 下载curl安装包
apt download curl
```
下载完之后切换到这个目录看一下，可以看到离线包了。

> 💡 如果需要连同依赖一起下载，可以先用 `apt-cache depends 包名` 查看依赖列表，再循环 `apt-get download` 下载；或者使用 `apt-rdepends` 工具递归分析依赖；或者直接使用`方法一`下载（包含依赖）。

## 两者区别及优缺点


- 举实例两者下载的区别

* [x] 示例1：使用 apt + 参数安装

```bash
apt install -y curl -d -o Dir::Cache::archives=./
```

* [x] 示例2：apt-get download 命令下载
```bash
apt-get download curl 
```

两者的区别很明显了，`apt download` 下载的少，是因为它不会下载依赖包，只会下载需要的命令包；

- 两者优缺点：

* [x] apt + 参数 优点：
1、会自动下载安装所需软件的所有依赖包，保证离线安装包的完整性；
2、无需额外安装工具，可直接使用命令 + 参数下载。
* [x] apt + 参数 缺点：
1、如果服务器上已经安装过这个命令或者包，下载会提示已经安装过，所以下载时需要使用空环境（或加 `--reinstall`）。

* [x] apt download 优点：
1、不管有没有安装都会下载下来离线包；
2、下载目录可控（先 cd）。
* [x] apt download 缺点：
1、不会下载依赖，离线安装时容易缺少依赖导致失败；

---

* 总结：
> 各有利弊，还是推荐使用第一种方式（配合 `--reinstall` 或在干净环境中执行）。

## 批量下载软件离线包及批量安装【推荐使用】

> 使用脚本来实现批量下载及安装

* download.sh（批量下载脚本）

```bash
#!/bin/bash

## 定义要下载的软件包列表
packages=(
    "vim"
    "unzip"
    "tar"
    "make"
    "net-tools"
    "gcc"
    "g++"
    "locales"
)

## 遍历软件包列表，下载每个软件包
for package in "${packages[@]}"; do
    ## 创建以软件包名命名的目录
    mkdir -p "$package"

    ## 使用 apt 下载软件包及其依赖
    echo "正在下载 $package ..."
    apt install -y "$package" -d -o Dir::Cache::archives="./$package"
done

echo "所有软件包下载完成！"
```

* install.sh（批量安装脚本）

```bash
#!/bin/bash

## 定义要安装的软件包列表
packages=(
    "vim"
    "unzip"
    "tar"
    "make"
    "net-tools"
    "gcc"
    "g++"
    "locales"
)

## 遍历软件包列表，安装每个软件包
for package in "${packages[@]}"; do
    ## 进入目录
    cd "$package" || continue

    ## 使用 dpkg 安装软件包
    echo "正在安装 $package ..."
    dpkg -i *.deb

    ## 返回上级目录
    cd ..
done

echo "所有软件包安装完成！"
```

> ⚠️ 如果 `dpkg -i` 安装时提示依赖缺失，可以进入对应目录执行：
> ```bash
> apt install -f --no-download
> ```
> 或者先把所有 deb 包放在同一个目录下，执行：
> ```bash
> dpkg -i *.deb
> apt -f install
> ```

## 附：CentOS 与 Ubuntu 命令对照表

| 功能 | CentOS (yum) | Ubuntu (apt) |
|--|--|--|
| 在线安装 | `yum -y install 包名` | `apt install -y 包名` |
| 仅下载不安装 | `yum -y install 包名 --downloadonly --downloaddir=路径` | `apt install -y 包名 -d -o Dir::Cache::archives=路径` |
| 只下载单个包（无依赖） | `yumdownloader --destdir=路径 包名` | `apt-get download 包名` |
| 安装本地包 | `rpm -ivh 包名.rpm` | `dpkg -i 包名.deb` |
| 修复依赖 | `yum -y install 依赖` | `apt -f install` |
| 已安装想重新下载 | 无直接参数，需干净环境 | 加 `--reinstall` |



## 相关文章
|文章标题| 文章链接 |
|--|--|
|  【Linux】Ubuntu 如何下载离线安装包？（详解）|[https://liucy.blog.csdn.net/article/details/166113897](https://liucy.blog.csdn.net/article/details/166113897)  |
|【Linux】yum如何下载离线安装包？（详解）|[https://liucy.blog.csdn.net/article/details/125780172](https://liucy.blog.csdn.net/article/details/125780172)|

