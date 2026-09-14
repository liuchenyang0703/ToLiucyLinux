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
date: 2023-07-31
isOriginal: true
pageview: true
article: true
breadcrumb: false
comment: true
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

# 一、前言

> 本文主要讲解的是在`Windows`上安装Go语言的环境及配置环境变量（不包含使用，具体使用可学习Go语言知识）；
> - Go语言版本：1.20.6
> - Windows版本：windows10/11系统通用

# 二、下载 Go 环境安装包
>下载go环境：[Go下载官网链接](https://golang.google.cn/dl/)

进入官网找到自己需要的版本及系统，点击进行下载；

![](https://i-blog.csdnimg.cn/blog_migrate/f3ef4e55cb1f43e128f590239b04fd3a.png)

等待下载完成，放到自己 自定义的目录（尽量使用英文），然后进行解压；


![](https://i-blog.csdnimg.cn/direct/72bdef92b66b4bca8a70e8f11bad9c45.png)

解压后得到如下文件夹

![](https://i-blog.csdnimg.cn/direct/ae111704bd4b4a709b082d64a3aa8437.png)

# 三、配置 Go 环境变量

>解压后就是 Go 环境的完整路径，这时候需要进行配置环境变量；
>返回桌面 右击此电脑 --> 属性 --> 高级系统设置 --> 环境变量，打开环境变量设置窗口。

![](https://i-blog.csdnimg.cn/direct/3e0a85a482454ccaaf8f8fb801879ee6.png)
![](https://i-blog.csdnimg.cn/direct/def64a73fae549ea9709e51eb86a3359.png)




><font color=red>需要新建两个环境变量配置</font>
>-  `GOROOT` ：这个是 Go 环境所在目录的配置。
>-  `GOPATH` ：这个是 Go 项目的工作目录，以后开发的代码就写在这个文件夹中。

>为了使所有的计算机用户都可以使用 Go 环境，我们就需要在系统变量之中进行环境配置。

* 配置`GOROOT`环境变量

>点击 系统变量下面的新建，在变量名一栏输入 `GOROOT` ，在变量值一栏输入 你解压文件所在的目录，例如：`F:\Go\install-GoFile\go1.20.6.windows-amd64\go`。
> 最后点击确定，就将 GOROOT 新建完毕。

![](https://i-blog.csdnimg.cn/direct/a48c54f08128456cb72ab1c0a3c024b3.png)

* 配置`GOPATH`环境变量

> `GOPATH`和`GOROOT`的配置略有不同，我建议配置两个`GOPATH`目录：第一个用于放 Go 语言的第三方包；第二个用于放自己的开发代码。
> 我们来新建`GOPATH`：点击 系统变量下面的新建，在变量名一栏输入`GOPATH`，在变量值一栏输入`library`和`workspace`两个目录（这两个目录需要提前在go目录下创建好），中间用英文分号隔开。<br>
示例：`F:\Go\data\library;F:\Go\data\workspace`


![](https://i-blog.csdnimg.cn/direct/c7b98bbeee374181840e7cc97b2baa58.png)



>然后将新建的`GOROOT`配置到 `Path` 这个环境变量中去，在系统变量中找到 `Path`，点击编辑 --> 新建，输入`%GOROOT%\bin`，点击确定。


![](https://i-blog.csdnimg.cn/direct/2443f7960d0c4cd9aeb359e466a7276b.png)![](https://i-blog.csdnimg.cn/direct/3a599371930c428d874a46a07cafca27.png)


> 这样就配置完了，一路点击确定，直到桌面，需要点确定，保证配置生效；

# 四、校验是否配置成功

> `windows+R` 输入 cmd 打开终端，输入`go version`查看go的版本号，如果输出如下图所示，则安装成功。

```bash
#查看Go版本
go version

#查看Go环境变量
go env
```

![](https://i-blog.csdnimg.cn/direct/d52468e2c66c474489fa03a649907f68.png)


# 五、配置 GO111MODULE、GOPROXY、GOSUMDB

> *   `GO111MODULE`：用于控制是否启用 Go Modules 依赖管理模式的开关。
> *   `GOPROXY`：用于指定 Go 依赖包的下载代理地址，解决下载慢或无法访问的问题。
> *   `GOSUMDB`：用于校验下载的依赖包是否被篡改，保证依赖的安全性。

> Go默认的`GOPROXY`的值是：`GOPROXY=https://proxy.golang.org,direct`，可以在`go env`中看到；这个`goproxy`在使用`go get`安装第三方库的时候有可能会报错，导致无法下载成功，因为默认找的是go官方的，国内可能不太稳定，所以需要要修改一下。<br>
>比如改为：`https://goproxy.io,direct` （七牛镜像）或 `https://mirrors.aliyun.com/goproxy`（阿里云镜像）

* 开始配置

```bash
# GO111MODULE：开启mod模式（项目管理需要用到）
go env -w GO111MODULE=on

# GOPROXY：设置为七牛镜像源（推荐）或阿里镜像源（用原有的会比较慢）
go env -w GOPROXY=https://goproxy.cn,direct
go env -w GOPROXY=https://mirrors.aliyun.com/goproxy

# GOSUMDB：关闭包的MD5校验
go env -w GOSUMDB=off

#查看环境变量
go env
```
![修改环境变量](https://i-blog.csdnimg.cn/direct/3e62ef13986f4e71aed0b7a798f36f59.png)
![查看修改的成果](https://i-blog.csdnimg.cn/direct/86ce3fb203a744d5ab7802ad50c7ceca.png)


# 六、附加：如何查看配置的环境变量内容
1. 可以再次点击 `此电脑-->属性-->环境变量` 查看

2. 可以在cmd终端查看

```bash
echo %GOPATH%
echo %GOROOT%
```
![](https://i-blog.csdnimg.cn/direct/77909c12ab25410ba8a5a97d6e0864d9.png)



>至此就配置完成了，后续使用命令进行服务启动等操作，可学习go知识进行操作。
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

# 七、相关文章：
|文章标题| 文章链接 |
|--|--|
|[Windows上安装 jdk 环境并配置环境变量 （超详细教程）](https://liucy.blog.csdn.net/article/details/132114315)  | [https://liucy.blog.csdn.net/article/details/132114315](https://liucy.blog.csdn.net/article/details/132114315) |
|[Windows上安装 Go 环境并配置环境变量 （超详细教程）](https://liucy.blog.csdn.net/article/details/132012969)|[https://liucy.blog.csdn.net/article/details/132012969](https://liucy.blog.csdn.net/article/details/132012969)|
|[Windows上安装 Python 环境并配置环境变量 （超详细教程）](https://liucy.blog.csdn.net/article/details/131808146)|[https://liucy.blog.csdn.net/article/details/131808146](https://liucy.blog.csdn.net/article/details/131808146)|
