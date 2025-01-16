---
title: 【Linux】中不小心误卸载了rpm命令如何恢复？
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

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181626375.png)

>🍁**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>

## 问题复现

```bash
[root@localhost openssh-8.7p1]# rpm rpm -e --nodeps $(rpm -qa |grep pam-devel)

[root@localhost openssh-8.7p1]# rpm -ivh pam-devel-1.1.8-23.el7.x86_64.rpm
-bash: /usr/bin/rpm: 没有那个文件或目录
```
不小心多输了一个rpm，导致rpm被强制删除了，很伤心😟！那么怎么解决呢？下面来带大家解决。
## 问题解决方案
准备两台机器，一台有rpm命令的，一台没有rpm命令的。
- 查看rpm<font color=red> 故障 </font>的那台机器的rpm命令路径（209）

```bash
[root@localhost ~]# whereis rpm
rpm: /usr/lib/rpm /etc/rpm
```

- 查看rpm<font color=gree> 没有故障 </font>的哪台机器的rpm命令路径（210）

```bash
[root@localhost ~]# whereis rpm
rpm: /usr/bin/rpm /usr/lib/rpm /etc/rpm /usr/share/man/man8/rpm.8.gz
```


解决方案：

>从210.中可以看到209机器上rpm命令被卸载的，连man手册也没有了，bin下面更是没有。

>　思路：想到编译安装的软件的卸载方法是直接将安装路径下的文件直接删掉即可，那么我们可不可以缺什么补什么呢？显然可以啊。反过来不是一样么。

### 补全 whereis rpm 缺少的文件
从没有问题的那台服务器（210）往这边（209）拷文件过来；
可以看到有问题的rpm这台服务器（209）缺少：<font color=red>/usr/bin/rpm、/usr/share/man/man8/rpm.8.gz</font> 那么，将这两个文件从没有问题的服务器（210）上拉过来。
- 在没问题的服务器上执行（210）

```bash
#从没有问题（210）的服务器上拉文件到有问题（209）的服务器上
[root@localhost ~]# scp /usr/bin/rpm root@172.16.11.209:/usr/bin/
[root@localhost ~]# scp -r /usr/share/man/man8/rpm.8.gz root@172.16.11.209:/usr/share/man/man8/
```
都拉过来了之后再次使用whereis看一下，两边是否都一样了
- 查看rpm<font color=red> 故障 </font>的那台机器的rpm命令路径（209）

```bash
[root@localhost ~]# whereis rpm
rpm: /usr/bin/rpm /usr/lib/rpm /etc/rpm /usr/share/man/man8/rpm.8.gz
```

- 查看rpm<font color=gree> 没有故障 </font>的哪台机器的rpm命令路径（210）

```bash
[root@localhost ~]# whereis rpm
rpm: /usr/bin/rpm /usr/lib/rpm /etc/rpm /usr/share/man/man8/rpm.8.gz
```
现在可以看到两边命令路径都补全了，再次使用rpm运行一下，结果还是不行。

### 将rpmrc文件从没问题的环境（210）复制过来
- 在没问题的服务器上执行（210）

```bash
[root@localhost ~]# scp /usr/lib/rpm/rpmrc root@172.16.11.209:/usr/lib/rpm/
```
复制过去之后，再次执行rpm命令；

```bash
[root@localhost ~]# rpm -ivh pam-1.1.8-23.el7.x86_64.rpm 
error: no dbpath has been set
error: cannot open Packages database in /%{_dbpath}
warning: pam-1.1.8-23.el7.x86_64.rpm: Header V3 RSA/SHA256 Signature, key ID f4a80eb5: NOKEY
error: no dbpath has been set
error: cannot open Packages database in /%{_dbpath}
```
又出现一个报错，我们来继续解决。
### 出现这个问题：我们可以将没有问题的服务器中的 macros 文件复制过去
- 在没问题的服务器上执行（210）
```bash
[root@localhost ~]# scp /usr/lib/rpm/macros root@172.16.11.209:/usr/lib/rpm/
```
复制过去之后，再次执行，rpm命令

```bash
[root@localhost ~]# rpm -ivh pam-1.1.8-23.el7.x86_64.rpm 
Preparing...                          ################################# [100%]
	package pam-1.1.8-23.el7.x86_64 is already installed

[root@localhost ~]# rpm -qa  | grep pam
pam-1.1.8-23.el7.x86_64
```
吼，发现成功了。那么问题就解决了。








## 问题解决

><font color=red>再次提醒大家一定要认真，认真，在认真；</font>
>
><font color=red>再次提醒大家一定要认真，认真，在认真；</font>
>
><font color=red>再次提醒大家一定要认真，认真，在认真；</font>
