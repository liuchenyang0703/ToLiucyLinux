---
title: 【Docker】如何将已有的容器打为镜像？？？
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
---

- **首先，要查看需要打成镜像的容器ID或容器名**

```bash
docker ps -a | grep caffe
```

- **其次，使用docker commit命令打镜像**

```bash
#使用容器id打镜像
docker commit [CONTAINER ID] [IMAGE NAME]   #容器ID  要创建的镜像名
#使用容器名称打镜像
docker commit [CONTAINER name] [IMAGE NAME]   #容器名  要创建的镜像名

#等待打完镜像查看验证即可
docker images | grep caffe
```
- **实例**

```bash
#将容器打为镜像
docker commit caffe caffe:v1

#查看镜像
[root@localhost ~]# docker images | grep caffe
caffe               v1                  4af4940c8e64        4 minutes ago       15.7GB
```

