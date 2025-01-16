---
title: 【Linux】系统中安装Go环境
icon: circle-info
order: 1
category:
  - Linux
  - Go
tag:
  - Linux
  - Go
pageview: false
date: 2022-08-29
comment: false
breadcrumb: false
---

> >👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/fdbeaae72dae4574a34cb6aebff1c158.png)

## 下载安装包
首先，我们第一步就是先下载go的安装包；
Golang官网下载地址：[https://golang.google.cn/dl/](https://golang.google.cn/dl/)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/acc15cf61fcd451cb587a62824a7aca1.png)

下载到本地，然后上传到服务器上；

```bash
下载地址：https://golang.google.cn/dl/go1.18.3.linux-amd64.tar.gz
```
或者直接在服务器上直接下载。

```bash
wget https://golang.google.cn/dl/go1.18.3.linux-amd64.tar.gz
```

### 扩充：
往下翻可以找到1.18.3和1.17.11版本，想要下载这两个版本的也可以直接下载；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/48d559aaa43a4be2a24b210045cad2bc.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/9914bb7237a04f29b0022944f49d098c.png)

>但是，只有这两个版本，如果想下载其他版本呢？下面就交大家一个下载小技巧；

### 下载技巧：
如果找不到想要下载的版本，可以直接复制上面这个地址，然后去网页上修改：
>**<font color=teal>实例：</font>**
>
>---
>**<font color=red>问❓：我想下载一个1.11.5版本的go安装包，官网上找不到下载地址该怎么下载呢？</font>**
>
>---
>**<font color=green>答💻：不要去百度搜了；我们可以直接复制上面的1.18.3的下载地址—>>打开浏览器—>>新开一个标签页—>>把链接放上去—>>直接去改1.18.3那块的版本号—>>按回车自动下载—>>等待下载完成就ok。</font>**

打开浏览器—>>打开新标签页—>>链接放上去

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/ba2973da547046f1bc5f48da345753cb.png)
直接去改1.18.3那块的版本号—>>按回车自动下载—>>等待下载完成就ok
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/8d05c509d80649f2b44071ba87cb043c.png)
## 将安装包上传服务器并解压
>上传服务器，可以先任意放到一个目录下，但是一定要能找到。<br/>
这里我们直接把安装包上传到/usr/local/目录下。

解压安装包：
```bash
#切换到/usr/local/目录下
cd /usr/local/

#解压go的安装包
tar xf go1.18.3.linux-amd64.tar.gz
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/2dcbd899c4bf4171b0eef95da4c81d64.png)
解压完成之后，会生成一个go的目录；

## 将/usr/local/go/bin/目录下的所有文件添加到环境变量中，相当于Windows中的“快捷指令”

```bash
#进入配置文件
vim /etc/profile

# 在最后一行添加
export GOROOT=/usr/local/go
export PATH=$PATH:$GOROOT/bin

# 保存退出后source一下，让配置文件生效
source /etc/profile

#设置完成，可以打go然后tab两下看看
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/0f31ccb827d94b69b92516794f3f7e0e.png)
## go version查看是否安装成功

```bash
#查看版本号
go version
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/f0bb73f1ded04668a07f9baad632df63.png)
>由此我们可以看到go的版本是1.18.3，这样就是安装完成。




