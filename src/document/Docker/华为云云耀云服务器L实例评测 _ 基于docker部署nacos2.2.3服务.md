---
title: 华为云云耀云服务器L实例评测 _ 基于docker部署nacos2.2.3服务
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

[#【有奖征文】华为云云服务器焕新上线，快来亲身感受评测吧！#](https://bbs.csdn.net/topics/617148096)

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---


## 一、前言
>本文主要讲解华为云云耀服务器的使用及在云服务器上部署docker，并基于docker部署minio2.2.3服务；
>三个内容点：
>- 1、讲解华为云云耀服务器的使用
>- 2、部署docker服务
>- 3、基于docker部署nacos2.2.3服务


**环境规划：**

| 服务器类别 |应用镜像  |内网IP地址|Docker版本|nacos版本
|--|--|--|--|--|
|云耀云服务器L实例  |Docker可视化-Portainer|172.16.11.10 | 24.0.4| 2.2.3
## 二、华为云耀云服务器L实例

### 2.1 华为云耀云服务器L实例简介 
> &emsp;&emsp;随着云计算时代的进一步深入，越来越多的中小企业企业与开发者需要一款简单易用、高能高效的云计算基础设施产品来支撑自身业务运营和创新开发。基于这种需求，华为云焕新推出华为云云服务器实例新品。<br>
> &emsp;&emsp;华为云云服务器具有智能不卡顿、价优随心用、上手更简单、管理特省心这四个优点，从而帮您快速上云！从8月底到10月中旬，华为云云服务器开启评测征文活动，邀请您分享对华为云云服务器的评测！<br>
>&emsp;&emsp; 云耀云服务器L实例是新一代开箱即用、面向中小企业和开发者打造的全新轻量应用云服务器。云耀云服务器L实例提供丰富严选的应用镜像，实现应用一键部署，助力客户便捷高效的在云端构建电商网站、Web应用、小程序、学习环境、各类开发测试等。




![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161439392.png)



### 2.2 华为云耀云服务器L实例地址
>华为云耀云服务器L实例购买地址：[华为云耀云服务器L实例地址](https://www.huaweicloud.com/product/hecs-light.html)
>控制台地址：[https://console.huaweicloud.com/smb/?region=cn-north-4#/resource/list](https://console.huaweicloud.com/smb/?region=cn-north-4#/resource/list)

### 2.3 华为云耀云服务器L实例产品架构

云耀云服务器L实例具备计算、存储、镜像安装、备份等能力：

- 云耀云服务器L实例在不同区域中部署，一个区域发生故障后不会影响其他区域的云服务器。
- 可以通过虚拟私有云（VPC）建立专属的网络环境，设置子网、安全组，并通过弹性公网IP实现外网链接。
- 通过云硬盘（EVS）服务实现数据存储，并通过云硬盘备份服务实现云耀云服务器L实例数据的备份和恢复。
- 云服务器备份（CBR）提供对云耀云服务器L实例的备份保护服务。支持对云耀云服务器L实例中的所有云硬盘（系统盘和数据盘）进行备份，并利用备份数据恢复云耀云服务器L实例数据。
- 主机安全（HSS）提升云耀云服务器L实例整体安全性，通过入侵检测、漏洞管理、基线检查功能，可识别并管理云服务器中的信息资产，实时监测云服务器中的风险，降低服务器被入侵的风险。
- 云耀负载均衡（HCES ELB）是将访问流量根据分配策略分发到后端多台云耀云服务器L实例的流量分发控制服务。负载均衡可以通过流量分发扩展应用系统对外的服务能力，同时通过消除单点故障提升应用系统的可用性。

## 三、购买云耀云服务器L实例

### 3.1 登录华为云官网购买
>登录个人华为云账号，在搜索栏输入云耀云服务器L实例，按回车键确认，进入云耀云服务器L实例详情页。
>或直接点击：[华为云耀云服务器L实例地址](https://www.huaweicloud.com/product/hecs-light.html)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161439812.png)



>区域：华北—北京四；
应用镜像：Docker可视化-Portainer；
实例规格：2核2G/系统盘40G/峰值带宽 3Mbps/流量包400G；
实例名称：自定义即可，这里编辑为HECS-L-nacos；
购买时长：1个月；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161439934.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161439720.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161439928.png)

- 检查配置 --> 确认购买

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161439308.png)

- 购买成功；

### 3.2 重置密码

- 到控制台查看我的资源
[https://console.huaweicloud.com/smb/?region=cn-north-4#/resource/list](https://console.huaweicloud.com/smb/?region=cn-north-4#/resource/list)

- 点击远程登录云耀云服务器L实例
- 点击右侧的重置密码选项，需要进行身份验证，选择手机验证后，即可重置密码成功

- 重置完密码需要重启服务器；重启即可；


### 3.3 使用xshell链接服务器
>使用ip、密码链接即可

## 四、检查docker环境及服务状态
>因为购买的就是 Docker可视化-Portainer	 的，所以不用安装docker

### 4.1 检查Docker版本

```bash
[root@localhost ~]# docker -v
Docker version 24.0.4, build 3713ee1
```
### 4.2 检查docker服务状态

```bash
[root@localhost ~]# systemctl status docker
● docker.service - Docker Application Container Engine
     Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2023-09-15 16:25:24 CST; 16h ago
TriggeredBy: ● docker.socket
       Docs: https://docs.docker.com
   Main PID: 2496 (dockerd)
      Tasks: 58
     Memory: 83.3M
        CPU: 1min 956ms
     CGroup: /system.slice/docker.service
```
## 五、部署nacos2.2.3

### 5.1 下载 nacos2.2.3 镜像

```bash
[root@localhost ~]# docker pull liuchenyang/redhat-nacos:latest
latest: Pulling from liuchenyang/redhat-nacos
872582724f33: Already exists 
b13ffc206103: Already exists 
13b296d5bcbd: Already exists 
5fcf8070f29a: Pull complete 
c8194a495b92: Pull complete 
Digest: sha256:a6d7575e810f080ae5b1e7535a0778aa581e9e43020f170a233fb78a42c91f90
Status: Downloaded newer image for liuchenyang/redhat-nacos:latest
docker.io/liuchenyang/redhat-nacos:latest
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161439483.png)
### 5.2 查看镜像

```bash
docker images | grep redhat-nacos
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161439381.png)

可以自己将镜像重新命名，或者直接使用此名字都可以；
重新命名命令为：`docker tag liuchenyang/redhat-nacos:latest nacos:latest`
### 5.3 创建nacos容器

nacos包下载地址：[https://github.com/alibaba/nacos/releases/download/2.2.3/nacos-server-2.2.3.tar.gz](https://github.com/alibaba/nacos/releases/download/2.2.3/nacos-server-2.2.3.tar.gz)

可以解压此包，拿出nacos目录，来作为配置映射目录；

要注意的是，如果需要做nacos配置映射，我们需要在`nacos/bin/startup.sh`里追加一行 `tail -f ${BASE_DIR}/logs/start.out`，不追加会导致容器启动不了。


```bash
docker run -itd --name nacos --restart=always --privileged -p 8848:8848 -v /usr/local/nacos/logs/:/nacos/logs/ -v /etc/localtime/:/etc/localtime/ liuchenyang/redhat-nacos:latest
```
创建完容器会自动启动nacos服务，日志可查看映射出来的/usr/local/start.out

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161439620.png)


启动完成，日志没问题，查看端口是否已经被占用；默认端口为：8848

```bash
netstat -lnt | grep 8848
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161439366.png)


这里可以看到，端口已经启动了；但是因为是云服务器，还需要在云服务器上开放 8848 端口；
开放完端口之后，页面访问。
### 5.4 页面访问nacos
> 172.16.11.10:8848/nacos


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161439228.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161439458.png)

>因为此部署没有设置数据库，所以会自动跳进来；

## 六、完成部署


