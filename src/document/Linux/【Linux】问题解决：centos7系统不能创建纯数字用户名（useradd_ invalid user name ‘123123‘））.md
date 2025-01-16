---
title: 【Linux】问题解决：centos7系统不能创建纯数字用户名（useradd_ invalid user name ‘123123‘））
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



## 报错数据

```bash
[root@k8s-master ~]# useradd 123123
useradd: invalid user name '123123'
```
## 报错原因
>是因为linux系统用户的uid就是纯数字，所以被限制不能创建纯数字用户名

## 解决思路
其实想了一下，有这样的限制也是有道理的，毕竟linux系统用户的uid就是纯数字的

比如像id 之类的命令，是可以直接指定uid或者用户名的，如果是纯数字了，到底应该视为什么呢？

不过测试过，冲突了还是只显示用户名为纯数字的用户信息，总之只会显示一个用户的信息

查询了redhat相关的文档，其中redhat 7.6 版本的Release_Notes已经说明了,如下:

```bash
All-numeric user and group names in shadow-utils are now deprecated
Creating user and group names consisting purely of numeric characters using the useradd and
groupadd commands is now deprecated and will be removed from the system with the next major
release. Such names can potentially confuse many tools that work with user and group names and user
and group ids (which are numbers).
```

也就是说，从`7.6版本`开始弃用创建纯数字的用户名；
但是`7.6--7.9版本`之间可以使用环境变量来创建的；
但是从`8版本`会直接删除那种使用命令创建纯数字用户名的方式，使用环境变量也不能来创建。

后来在Red Hat Bugzilla – Bug 1672958 文档中也发现了此解释,如下

```bash
The useradd and groupadd commands disallow user and group names
consisting purely of numeric characters since Red Hat Enterprise Linux 7.6.
The reason for not allowing such names is that this can confuse potentially
many tools that work with user and group names and user and group ids
(which are numbers). However due to some deployments depending on allowing all-numeric user names
this erratum makes useradd and groupadd commands to allow all-numeric user and group names
if environment variable SHADOW_ALLOW_ALL_NUMERIC_USER is set.
Please note that the all-numeric user and group names are
deprecated in Red Hat Enterprise Linux 7 and the support will be completely removed in Red Hat Enterprise Linux 8.
```

## 解决方法（适用于centos 7.6-7.9）
但是终究还是有方法改变这个限制的，可以使用export定义SHADOW_ALLOW_ALL_NUMERIC_USER变量的值为1，如下：

```bash
#设置临时环境变量
export SHADOW_ALLOW_ALL_NUMERIC_USER=1

#创建纯数字用户
useradd 123123
useradd -g test -s /sbin/nologin 123123

#查看最后3个用户
tail -n 3 /etc/passwd
```
- 设置永久生效

```bash
echo "export SHADOW_ALLOW_ALL_NUMERIC_USER=1" >> /root/.bashrc
```
这样，每次连接该ip的时候都会自动生效了。




