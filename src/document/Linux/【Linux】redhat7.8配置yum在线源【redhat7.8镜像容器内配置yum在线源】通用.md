---
title: 【Linux】redhat7.8配置yum在线源【redhat7.8镜像容器内配置yum在线源】通用
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


## 一、需求：

> 需要一个redhat7.8镜像，并带有yum在线源，可以下载命令；
> 从官网拉的镜像是：`registry.access.redhat.com/rhel7:7.8`；但是这个里面没有yum源，下载不了需要的命令；<br>
> 这时候就需要我们手动去打一个镜像了；
> 当然，如果不想自己打的话，我这边已经给大家打好现成的了；
> 拉取redhat:7.8命令：`docker pull liuchenyang/redhat:7.8`

## 二、现成镜像拉取地址

> 拉取redhat:7.8命令：`docker pull liuchenyang/redhat:7.8`

## 三、手动加一个yum源，并将其打成镜像

### 1、保证docker已安装
>如果没有安装docker，可参考：[linux（centos）中部署docker（步骤超全，含带一些发展史和一些概念）](https://liucy.blog.csdn.net/article/details/123842609)
### 2、拉取 registry.access.redhat.com/rhel7:7.8 镜像

```bash
docker pull registry.access.redhat.com/rhel7:7.8
```
### 3、创建一个容器以 registry.access.redhat.com/rhel7:7.8 为基础镜像

```bash
docker run -itd --name redhat registry.access.redhat.com/rhel7:7.8
```

### 4、进入容器

#### 4.1 关闭redhat自带的插件subscription-manager。
找到subscription-manage的配置文件/etc/yum/pluginconf.d/subscription-manager.conf

```bash
[root@locahost ]# vim /etc/yum/pluginconf.d/subscription-manager.conf

[main]
enabled=0           #将它禁用掉
```

#### 4.2 新增网络yum源

```bash
[root@locahost ]# vi /etc/yum.repos.d/aliyun.repo

[base]
name=aliyun
baseurl=http://mirrors.aliyun.com/centos/7/os/$basearch/
enabled=1
gpgcheck=0
```



#### 4.3 配置完保存退出，创建yum缓存

```bash
#清除缓存
yum clean all 

#重新加载所有缓存
yum makecache
```



#### 4.4 更新yum仓库

```bash
yum -y update
```

#### 4.5 安装常用命令

```bash
yum -y install vim wget make gcc gcc-c++
```
可以安装后，退出容器，将此容器打为镜像；


### 5、将容器打为镜像
> 可参考文档：[【Docker】如何将已有的容器打为镜像？？？](https://liucy.blog.csdn.net/article/details/129496969)

```bash
docker commint redhat redhat:7.8
```
### 6、查看镜像

```bash
docker images | grep redhat
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180922246.png)
## 四、redhat7.8镜像完成！
>如果想将打成的镜像上传到 `harbor` 或者 `dockerhub` 镜像仓库中，可参考此两篇文章：<br>
【私有镜像仓库】：[Linux中基于Docker搭建harbor私有镜像仓库（超级详细）](https://liucy.blog.csdn.net/article/details/124623482) 
【公有镜像仓库】：[Docker发布/上传镜像到dockerhub&&下载/拉取镜像&&删除dockerhub镜像](https://liucy.blog.csdn.net/article/details/124670946) 


## 五、参考文献【相关文档】
|文章标题| 文章地址 |
|--|--|
|dockerhub镜像仓库：redhat:7.8  | [https://hub.docker.com/r/liuchenyang/redhat/tags](https://hub.docker.com/r/liuchenyang/redhat/tags) |
|[linux（centos）中部署docker（步骤超全，含带一些发展史和一些概念）](https://liucy.blog.csdn.net/article/details/123842609)|[https://liucy.blog.csdn.net/article/details/123842609](https://liucy.blog.csdn.net/article/details/123842609)|
|[【Docker】如何将已有的容器打为镜像？？？](https://liucy.blog.csdn.net/article/details/129496969)|[https://liucy.blog.csdn.net/article/details/129496969](https://liucy.blog.csdn.net/article/details/129496969)|
|[Linux中基于Docker搭建harbor私有镜像仓库（超级详细）](https://liucy.blog.csdn.net/article/details/124623482)|[https://liucy.blog.csdn.net/article/details/124623482](https://liucy.blog.csdn.net/article/details/124623482)|
|[Docker发布/上传镜像到dockerhub&&下载/拉取镜像&&删除dockerhub镜像](https://liucy.blog.csdn.net/article/details/124670946)|[https://liucy.blog.csdn.net/article/details/124670946](https://liucy.blog.csdn.net/article/details/124670946)|

