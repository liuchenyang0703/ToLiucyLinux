---
title: Windows上安装 Go 环境并配置环境变量 （超详细教程）
icon: circle-info
order: 11
tag:
- Windows
- Go
- 运维
category:
- Windows
- Go
pageview: false
date: 2024-03-24
comment: false
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

> 本文主要讲解的是在windows上安装Go语言的环境和配置环境变量；
> - Go语言版本：1.20.6
> - Windows版本：win11（win10通用）

## 下载Go环境
>下载go环境：[Go下载官网链接](https://golang.google.cn/dl/)

找到自己想下载的版本，点击下载；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/eb7b8c27610a4dbd8521fde84e5a3405.png)

等待下载完成，放到自己自定义的目录，然后解压；

解压后得到如下文件夹

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/209bd0b8b7734780b179e3e7910d4dee.png)
## 配置环境变量

>得到完整的 Go 环境之后，需要配置 Go 的环境变量，右击此电脑-->属性-->高级系统设置-->环境变量，打开环境变量设置窗口。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/cfdde248de514bda972735cffe6bede3.png)


><font color=red>需要新建两个环境变量配置</font>
>- 一个是 GOROOT ，这个就是 Go 环境所在目录的配置。
>- 另一个是 GOPATH ，这个是 Go 项目的工作目录，你以后开发的代码就写在这个文件夹中。

>为了使所有的计算机用户都可以使用 Go 环境，我们就在系统变量之中配置。点击系统变量下的新建，在变量名一栏输入 GOROOT ，在变量值一栏输入 你解压文件所在的目录D:\路径\go。
最后点击确定，就将 GOROOT 新建完毕。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/c82f70c26c544452abd4e4d03e21c7de.png)

>GOPATH和GOROOT的配置略有不同，我建议配置两个GOPATH目录，第一个用于放 Go 语言的第三方包，第二个用于放自己的开发代码。我们来新建GOPATH。点击系统变量下的新建，在变量名一栏输入GOPATH，在变量值一栏输入任意两个目录，中间用英文分号隔开。<br>
示例：`D:\路径\go\library;D:\路径\go\workspace`


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/3a96e2a6b4c24b13956eab9ae40ab0a7.png)


>然后将新建的GOROOT配置到 Path 这个环境变量中去，在系统变量中找到 Path，点击编辑->新建，输入%GOROOT%\bin，点击确定。并将所有母窗口的确定全部点下，确保环境变量生效。


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/db1937621020418e886c2c474254f0f8.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/9d0056d98f5943d691d19f6e9bcdc716.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/c4f7f3b28f48479a9346cf864176bb83.png)


>这样就配置完了，一路点击确定，直到桌面；

## 校验是否配置成功

> windows+R 输入 cmd 打开终端，输入go version，如果输出如下图所示，则安装成功。

```bash
#查看Go版本
go version

#查看Go环境变量
go env
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/0104579797eb45dfb95577b8acdfe596.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/86961f5d9e3e40bda2032893e50551fa.png)

## 配置 GO111MODULE、GOPROXY、GOSUMDB

>Go默认的GOPROXY的值是：GOPROXY=https://proxy.golang.org,direct。这个goproxy在使用go get安装第三方库的时候会报错，导致无法下载成功，所以必须要修改一下。<br>
>比如改为：https://goproxy.io,direct （七牛镜像）或 https://mirrors.aliyun.com/goproxy（阿里云镜像）

```bash
#开启mod模式（项目管理需要用到）
go env -w GO111MODULE=on
#重新设置成七牛镜像源（推荐）或阿里镜像源（用原有的会比较慢）
go env -w GOPROXY=https://goproxy.cn,direct
go env -w GOPROXY=https://mirrors.aliyun.com/goproxy

#关闭包的MD5校验
go env -w GOSUMDB=off

#查看环境变量
go env
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/5c53c3a773c94ec8b60a1f8822b3b0b1.png)

## 查看配置的环境变量
一、可以再次点击 `此电脑-->属性>环境变量` 查看

二、可以在cmd终端查看

```bash
echo %GOPATH%
echo %GOROOT%
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/a1dde0c1506e4ffe9c48acf74e00a61a.png)


>至此就配置完成了。
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

## 相关文章：
|文章标题| 文章链接 |
|--|--|
|[Windows上安装 jdk 环境并配置环境变量 （超详细教程）](https://liucy.blog.csdn.net/article/details/132114315)  | [https://liucy.blog.csdn.net/article/details/132114315](https://liucy.blog.csdn.net/article/details/132114315) |
|[Windows上安装 Go 环境并配置环境变量 （超详细教程）](https://liucy.blog.csdn.net/article/details/132012969)|[https://liucy.blog.csdn.net/article/details/132012969](https://liucy.blog.csdn.net/article/details/132012969)|
|[Windows上安装 Python 环境并配置环境变量 （超详细教程）](https://liucy.blog.csdn.net/article/details/131808146)|[https://liucy.blog.csdn.net/article/details/131808146](https://liucy.blog.csdn.net/article/details/131808146)|
