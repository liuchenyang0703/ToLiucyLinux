---
title: Linux删除指定字符串内容及以前的字符串内容_以后的字符串内容
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 运维
pageview: false
date: 2024-12-19
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

## 内容编辑

```bash
[root@localhost ~]# cat a.txt
GeForce RTX 2080 Ti - 2733M
GeForce RTX 2080 Ti - 9282M
NVIDIA GeForce GTX 1080 Ti - 2947M
NVIDIA GeForce GTX 1080 Ti - 3098M
```
## 前
### 删除指定内容自身及以前所有的字符串内容

```bash
#原始内容
GeForce RTX 2080 Ti - 2733M
GeForce RTX 2080 Ti - 9282M
NVIDIA GeForce GTX 1080 Ti - 2947M
NVIDIA GeForce GTX 1080 Ti - 3098M

[root@localhost ~]# sed 's/.*GeForce //g' a.txt
RTX 2080 Ti - 2733M
RTX 2080 Ti - 9282M
GTX 1080 Ti - 2947M
GTX 1080 Ti - 3098M

```

### 删除指定内容以前所有的字符串内容不包括自身

```bash
#原始内容
GeForce RTX 2080 Ti - 2733M
GeForce RTX 2080 Ti - 9282M
NVIDIA GeForce GTX 1080 Ti - 2947M
NVIDIA GeForce GTX 1080 Ti - 3098M

[root@localhost ~]# sed 's/.*\(GeFo.*\)/\1/g' a.txt
GeForce RTX 2080 Ti - 2733M
GeForce RTX 2080 Ti - 9282M
GeForce GTX 1080 Ti - 2947M
GeForce GTX 1080 Ti - 3098M
```

## 后
### 删除指定内容自身及以后所有的字符串内容

```bash
#原始内容
GeForce RTX 2080 Ti - 2733M
GeForce RTX 2080 Ti - 9282M
NVIDIA GeForce GTX 1080 Ti - 2947M
NVIDIA GeForce GTX 1080 Ti - 3098M

[root@localhost ~]# sed 's/Ti -.*//g' a.txt
GeForce RTX 2080 
GeForce RTX 2080 
NVIDIA GeForce GTX 1080 
NVIDIA GeForce GTX 1080
```

### 删除指定内容以后所有的字符串内容不包括自身

```bash
#原始内容
GeForce RTX 2080 Ti - 2733M
GeForce RTX 2080 Ti - 9282M
NVIDIA GeForce GTX 1080 Ti - 2947M
NVIDIA GeForce GTX 1080 Ti - 3098M

[root@localhost ~]# sed 's/\(Ti\).*/\1/g' a.txt
GeForce RTX 2080 Ti
GeForce RTX 2080 Ti
NVIDIA GeForce GTX 1080 Ti
NVIDIA GeForce GTX 1080 Ti
```



