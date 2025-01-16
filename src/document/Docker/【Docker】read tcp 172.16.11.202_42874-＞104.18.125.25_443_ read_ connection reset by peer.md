---
title: 【Docker】read tcp 172.16.11.202_42874-＞104.18.125.25_443_ read_ connection reset by peer
icon: circle-info
order: 1
category:
  - Linux
  - Docker
tag:
  - Linux
  - Docker
  - 运维
pageview: false
date: 2024-12-16
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


## 问题：
>&emsp;&emsp;因为最近要打镜像，首先需要看一下该机器是否可以拉取到镜像，我就开始试拉取镜像，结果报错一层有一层；拉了一天都没有拉取到想要的镜像，就很气愤；最后找了很多文章以及报错的解决方式终于找到一个成功的了；
我就拿其一来举例，其中有一个报错是这样的；

```bash
[root@localhost docker]# docker pull qiushenjie/cuda11.1-cudnn8-devel-ubuntu18.04-python3.6:latest
latest: Pulling from qiushenjie/cuda11.1-cudnn8-devel-ubuntu18.04-python3.6
6e0aa5e7af40: Downloading [==================================================>]  8.753MB/8.753MB
d47239a868b3: Download complete 
49cbb10cca85: Download complete 
4450dd082e0f: Download complete 
c0471462e31b: Download complete 
e26abf45abc8: Download complete 
d044dd425955: Download complete 
03443386476a: Downloading [==================================================>]  1.511GB/1.511GB
1221fea730a2: Download complete 
9b0547807030: Downloading 
07352373c41d: Download complete 
459b54df8da1: Downloading 
4743a36bdb91: Retrying in 1 second 
7ad0074e2854: Download complete 
75822f5b5ee1: Downloading [==================================================>]  89.39kB/89.39kB

read tcp 172.16.11.202:42874->104.18.125.25:443: read: connection reset by peer
```

## 报错原因：
>&emsp;&emsp;因为我们下载的镜像是外网的镜像资源，所以下载的速度会非常的慢，甚至大概率下载时会报错，所以需要我们配置一个国内的服务器镜像地址，国内服务器镜像地址有很多，这里咱们就说一下阿里镜像加速器的配置方法。
## 解决方式：
>&emsp;&emsp;找了很久找到了一个好的解决方式就是：<font color=teal>**配置阿里镜像加速器方法**</font>

1、访问阿里云官网：[阿里云官网](https://promotion.aliyun.com/ntms/act/kubernetes.html)     并登录官网：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161517319.png)

2、登录进来点击控制台：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161517666.png)

3、点击左上方的导航栏，在搜索框搜索容器镜像服务


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161517962.png)

4、点击 镜像工具---镜像加速器

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161517558.png)

5、复制镜像加速器地址，按照操作文档，找到对应平台的文档进行操作

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161517544.png)

6、返回服务器，新建 <font color=red> **/etc/docker** </font>目录

* 已有就不用创建了

```bash
mkdir -p /etc/docker
```
7、将下载的镜像加速器加到 <font color=red>**daemon.json** </font>配置文件中；

```bash
[root@localhost docker]# sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://ofads5sdl5c.mirror.aliyuncs.com"]
}
EOF
```
8、重新加载配置文件+重启docker服务

```bash
#重新加载配置文件
systemctl daemon-reload

#重启docker服务
systemctl restart docker
```

9、重新拉取镜像

```bash
[root@localhost docker]# docker pull qiushenjie/cuda11.1-cudnn8-devel-ubuntu18.04-python3.6:latest
latest: Pulling from qiushenjie/cuda11.1-cudnn8-devel-ubuntu18.04-python3.6
6e0aa5e7af40: Download complete 
d47239a868b3: Download complete 
49cbb10cca85: Download complete 
4450dd082e0f: Download complete 
c0471462e31b: Download complete 
e26abf45abc8: Download complete 
d044dd425955: Download complete 
03443386476a: Download complete 
1221fea730a2: Download complete 
9b0547807030: Download complete 
07352373c41d: Download complete 
459b54df8da1: Download complete 
4743a36bdb91: Download complete 
7ad0074e2854: Download complete 
75822f5b5ee1: Download complete 
Digest： a256:c358e72e100ab493a0304bda35e6f239db2ec8c9bb836d8a427ac34307d074ed
Status： Downloadednewer image for qiushenjie/cuda11.1-cudnn8-devel-ubuntu18.04-python3.6:latest
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161517545.png)

这样就下载拉取完成了；



