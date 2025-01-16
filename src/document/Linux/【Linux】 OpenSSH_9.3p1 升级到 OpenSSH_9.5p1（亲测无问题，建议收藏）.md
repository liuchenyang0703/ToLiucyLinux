---
title: 【Linux】 OpenSSH_9.3p1 升级到 OpenSSH_9.5p1（亲测无问题，建议收藏）
icon: circle-info
order: 1
category:
  - Linux
  - 服务器安全
tag:
  - Linux
  - 服务器安全
  - openssh
  - 运维
pageview: false
date: 2024-12-15
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


## 文章声明

> 文章声明：此文基于实操撰写 生产环境：此文升级是基于9.3p1升级9.5p1
> ssh -V查看版本是：OpenSSH_9.3p1, OpenSSL 1.1.1t  7 Feb 2023
> 问题关键字：<font color=red>OpenSSH 升级, OpenSSH 更新, OpenSSH 漏洞修复</font>
> 漏洞信息：<font color=red>OpenSSH 命令注入漏洞(CVE-2020-15778)、OpenSSH 安全漏洞(CVE-2023-38408)</font>

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/fdc25d4d9a5c414596bf5f8ae9278347.png)

## 漏洞描述

**OpenSSH 命令注入漏洞(CVE-2020-15778) 详细描述：**

> OpenSSH（OpenBSD Secure Shell）是OpenBSD计划组的一套用于安全访问远程计算机的连接工具。该工具是SSH协议的开源实现，支持对所有的传输进行加密，可有效阻止窃听、连接劫持以及其他网络级的攻击。
>  OpenSSH 9.3p3及之前版本中的scp的scp.c文件存在命令注入漏洞。该漏洞源于外部输入数据构造可执行命令过程中，网络系统或产品未正确过滤其中的特殊元素。攻击者可利用该漏洞执行非法命令。

**OpenSSH 安全漏洞(CVE-2023-38408) 详细描述：**

> OpenSSH（OpenBSD Secure Shell）是加拿大OpenBSD计划组的一套用于安全访问远程计算机的连接工具。该工具是SSH协议的开源实现，支持对所有的传输进行加密，可有效阻止窃听、连接劫持以及其他网络级的攻击。
>
> CVE-2023-38408是一个远程代码执行漏洞，位于 ssh-agent 的转发功能内，特别是涉及提供PKCS#11相关服务的情况下。在某些条件下，可以操纵ssh-agent对PKCS#11的支持，以便通过转发的代理套接字来促进远程代码执行。利用的先决条件包括受害者系统上存在特定库以及需要将代理转发到攻击者控制的系统。
>
> OpenSSH 9.3p1之前版本存在安全漏洞，该漏洞源于ssh-agent的PKCS11功能存在安全问题。攻击者可利用该漏洞执行远程代码。可以将openssh升级到9.3p1及以上版本。


## 前述
>OpenSSH（OpenBSD Secure Shell）是OpenBSD计划组的一套用于安全访问远程计算机的连接工具。该工具是SSH协议的开源实现，支持对所有的传输进行加密，可有效阻止窃听、连接劫持以及其他网络级的攻击。 OpenSSH 8.9版本至9.5之前版本存在安全漏洞，该漏洞源于将智能卡密钥添加到ssh-agent，会导致忽略每次转发的目标约束。
注：此操作步骤同样适用于Red Hat系所有 9.x 服务器系统。

<font color=red>注意事项：</font>
>在升级之前，建议打开多个SSH终端连接，并安装telnet服务器，确保在SSH服务器升级异常时，可以通过telnet服务器远程连接，进行紧急问题修复处理。
>在升级前一定要备份原有的配置文件，以防出现意外情况。

## 此文升级是基于9.3p1升级9.5p1


### 备份openssh9.3p1的配置文件

```bash
[root@localhost ~]# mv /usr/sbin/sshd /usr/sbin/sshd-9.3p1
[root@localhost ~]# mv /usr/bin/ssh /usr/bin/ssh-9.3p1
[root@localhost ~]# mv /usr/bin/ssh-keygen /usr/bin/ssh-keygen-9.3p1
[root@localhost ~]# mv /etc/init.d/sshd /etc/init.d/sshd-9.3p1
[root@localhost ~]# mv /etc/pam.d/sshd.pam /etc/pam.d/sshd.pam-9.3p1
```



> 如果不需要备份的这些配置可以在升级完成之后确认没有问题再将其删除。



### 下载 openssh9.5p1 的安装包：
OpenSSH官网：[下载官网](https://cdn.openbsd.org/pub/OpenBSD/OpenSSH/portable/)

或者是使用我提供的离线包：[openssh7.4p1 升级到 openssh9.5p1 所需的离线包](https://download.csdn.net/download/liu_chen_yang/88584031)

**网盘下载：**
链接：[ https://pan.baidu.com/s/1HHzOCP3w0Rc8_sHotIzg7g?pwd=open ](https://pan.baidu.com/s/1HHzOCP3w0Rc8_sHotIzg7g?pwd=open )
提取码：open

```bash
wget https://cdn.openbsd.org/pub/OpenBSD/OpenSSH/portable/openssh-9.5p1.tar.gz
```



### 解压并编译安装openssh9.5p1



```bash
# 将下载的openssh安装包移动到/usr/local下
[root@localhost ~]# mv openssh-9.5p1.tar.gz /usr/local/

# 进入/usr/local/目录解压openssh9.4
[root@localhost ~]# cd /usr/local/
[root@localhost local]# tar xf openssh-9.5p1.tar.gz

# 进入openssh目录
[root@localhost local]# cd openssh-9.5p1

# 编译安装
[root@localhost openssh-9.5p1]# CCFLAGS="-I/usr/local/include" \
LDFLAGS="-L/usr/local/lib64" \
./configure \
--sysconfdir=/etc/ssh \
--with-zlib \
--with-ssl-dir=/usr/local/openssl

[root@localhost openssh-9.5p1]# make -j 4
[root@localhost openssh-9.5p1]# make install
```



### 授权

```bash
[root@localhost openssh-9.5p1]# chmod 600 /etc/ssh/*
```



### 复制配置文件

```bash
[root@localhost openssh-9.5p1]# cp -rf /usr/local/sbin/sshd /usr/sbin/sshd
[root@localhost openssh-9.5p1]# cp -rf /usr/local/bin/ssh /usr/bin/ssh
[root@localhost openssh-9.5p1]# cp -rf /usr/local/bin/ssh-keygen /usr/bin/ssh-keygen
[root@localhost openssh-9.5p1]# cp -ar /usr/local/openssh-9.5p1/contrib/redhat/sshd.init /etc/init.d/sshd
[root@localhost openssh-9.5p1]# cp -ar /usr/local/openssh-9.5p1/contrib/redhat/sshd.pam /etc/pam.d/sshd.pam
```



### 给sshd授予权限

```bash
 chmod 755 /etc/init.d/sshd
```

### 启用sshd，生成服务配置文件，并重启服务

```bash
# 启用sshd，生成服务配置文件
[root@localhost openssh-9.5p1]# systemctl enable sshd
sshd.service is not a native service, redirecting to /sbin/chkconfig.
Executing /sbin/chkconfig sshd on

# 重启服务
[root@localhost openssh-9.5p1]# systemctl restart sshd
# 查看服务状态
[root@localhost openssh-9.5p1]# systemctl status sshd
```

### 验证升级是否成功

```bash
[root@localhost openssh-9.5p1]#  ssh -V
OpenSSH_9.5p1, OpenSSL 1.1.1t  7 Feb 2023
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/8def7d4d60e94ac59529ce8b21522217.png)



## 相关专栏
| 专栏标题                                                     | 专栏链接                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [《OpenSSH 系列》](https://blog.csdn.net/liu_chen_yang/category_12463139.html) | [https://blog.csdn.net/liu_chen_yang/category_12463139.html](https://blog.csdn.net/liu_chen_yang/category_12463139.html) |
| [《Linux从入门到精通》](https://blog.csdn.net/liu_chen_yang/category_10887074.html) | [https://blog.csdn.net/liu_chen_yang/category_10887074.html](https://blog.csdn.net/liu_chen_yang/category_10887074.html) |
| [《Linux服务器安全》](https://blog.csdn.net/liu_chen_yang/category_12390514.html) | [https://blog.csdn.net/liu_chen_yang/category_12390514.html](https://blog.csdn.net/liu_chen_yang/category_12390514.html) |


## 相关文章
|  文章标题|文章链接  |
|--|--|
|[【Linux】 OpenSSH_7.4p1 升级到 OpenSSH_8.7p1（亲测无问题，建议收藏）](https://liucy.blog.csdn.net/article/details/130484944)|[https://liucy.blog.csdn.net/article/details/130484944](https://liucy.blog.csdn.net/article/details/130484944)
| [【Linux】 OpenSSH_7.4p1 升级到 OpenSSH_9.3p1（亲测无问题，建议收藏）](https://liucy.blog.csdn.net/article/details/131398113) | [https://liucy.blog.csdn.net/article/details/131398113](https://liucy.blog.csdn.net/article/details/131398113) |
| [【Linux】 OpenSSH_7.4p1 升级到 OpenSSH_9.3p2（亲测无问题，建议收藏）](https://liucy.blog.csdn.net/article/details/133460612) | [https://liucy.blog.csdn.net/article/details/133460612](https://liucy.blog.csdn.net/article/details/133460612)|
|[【Linux】 OpenSSH_7.4p1 升级到 OpenSSH_9.4p1（亲测无问题，建议收藏）](https://liucy.blog.csdn.net/article/details/133697104)|[https://liucy.blog.csdn.net/article/details/133697104](https://liucy.blog.csdn.net/article/details/133697104)|
|[【Linux】 OpenSSH_7.4p1 升级到 OpenSSH_9.6p1（亲测无问题，建议收藏）](https://liucy.blog.csdn.net/article/details/136536352)|[https://liucy.blog.csdn.net/article/details/136536352](https://liucy.blog.csdn.net/article/details/136536352)|
|[【Linux】 OpenSSH_9.3p1 升级到 OpenSSH_9.3p2（亲测无问题，建议收藏）](https://liucy.blog.csdn.net/article/details/133460539)|[https://liucy.blog.csdn.net/article/details/133460539](https://liucy.blog.csdn.net/article/details/133460539)|
|[【Linux】 OpenSSH_9.3p1 升级到 OpenSSH_9.5p1（亲测无问题，建议收藏）](https://liucy.blog.csdn.net/article/details/134717718)|[https://liucy.blog.csdn.net/article/details/134717718](https://liucy.blog.csdn.net/article/details/134717718)|
|[【Linux】 OpenSSH_9.3p1 升级到 OpenSSH_9.6p1（亲测无问题，建议收藏）](https://liucy.blog.csdn.net/article/details/136327961)|[https://liucy.blog.csdn.net/article/details/136327961](https://liucy.blog.csdn.net/article/details/136327961)|
|[【Linux】 OpenSSH_9.3p2 升级到 OpenSSH_9.4p1（亲测无问题，建议收藏）](https://liucy.blog.csdn.net/article/details/133682882)|[https://liucy.blog.csdn.net/article/details/133682882](https://liucy.blog.csdn.net/article/details/133682882)|

