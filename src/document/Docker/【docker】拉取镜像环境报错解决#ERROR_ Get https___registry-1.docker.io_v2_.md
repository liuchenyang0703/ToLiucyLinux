---
title: 【docker】拉取镜像环境报错解决#ERROR_ Get https___registry-1.docker.io_v2_
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

## 问题

```bash
ERROR: Get https://registry-1.docker.io/v2/library/nginx/manifests/latest: Get https://auth.docker.io/token?scope=repository%3Alibrary%2Fnginx%3Apull&service=registry.docker.io: net/http: request canceled while waiting for connection (Client.Timeout exceeded while awaiting headers)
```
<font size=4>**场景复现**</font>

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161503753.png)

## 报错原因
>&emsp;&emsp;因为我们下载的镜像是外网的镜像资源，所以下载的速度会非常的慢，甚至大概率下载时会报错，所以需要我们配置一个国内的服务器镜像地址，国内服务器镜像地址有很多，这里咱们就说一下阿里镜像加速器的配置方法。

## 解决方法
>&emsp;&emsp;找了很久找到了一个好的解决方式就是：<font color=teal>**配置阿里镜像加速器方法**</font>
>与 [【Docker】read tcp 172.16.11.202:42874-＞104.18.125.25:443: read: connection reset by peer](https://liucy.blog.csdn.net/article/details/127897592) 这篇文章解决方法一样。

1、访问阿里云官网：[阿里云官网](https://promotion.aliyun.com/ntms/act/kubernetes.html)     并登录官网：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161503881.png)

2、登录进来点击控制台：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161503948.png)

3、点击左上方的导航栏，在搜索框搜索容器镜像服务


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161503265.png)

4、点击 镜像工具---镜像加速器

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161503106.png)

5、复制镜像加速器地址，按照操作文档，找到对应平台的文档进行操作

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161503795.png)

6、返回服务器，新建 <font color=red> **/etc/docker** </font>目录

* 已有就不用创建了

```bash
mkdir -p /etc/docker
```


7、将下载的镜像加速器加到 <font color=red>**daemon.json** </font>配置文件中；
>如果已经又daemon.json文件的，为了保险起见可以先备份原来的配置文件，在按照以下步骤来做，如果是新部署的docker就可以不用备份。

```bash
#备份已有的daemon.json
mv /etc/docker/daemon.json /etc/docker/daemon.json-bak
```
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


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161503452.png)


问题解决。


