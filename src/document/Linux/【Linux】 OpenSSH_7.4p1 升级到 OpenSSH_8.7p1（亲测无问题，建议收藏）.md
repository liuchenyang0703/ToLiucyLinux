---
title: 【Linux】 OpenSSH_7.4p1 升级到 OpenSSH_8.7p1（亲测无问题，建议收藏）
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

👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---

## 文章声明
>文章声明：此文基于实操撰写 
>生产环境：ssh -V查看版本是：OpenSSH_7.4p1, OpenSSL 1.0.2k-fips  26 Jan 2017
> 问题关键字：<font color=red>OpenSSH 升级, OpenSSH 更新, OpenSSH 漏洞修复</font>

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/13e70db213ef46fba6bcf12482445256.png)


## 前述
>OpenSSH（OpenBSD Secure Shell）是OpenBSD计划组的一套用于安全访问远程计算机的连接工具。该工具是SSH协议的开源实现，支持对所有的传输进行加密，可有效阻止窃听、连接劫持以及其他网络级的攻击。 OpenSSH 8.3p1及之前版本中scp的scp.c文件存在操作系统命令注入漏洞。该漏洞源于外部输入数据构造操作系统可执行命令过程中，网络系统或产品未正确过滤其中的特殊字符、命令等。攻击者可利用该漏洞执行非法操作系统命令。 详细参考国家信息安全漏洞库信息: CVE-2020-15778 目前Rocky Linux 8.3 RC1 采用的为OpenSSH_8.0p1，所以建议通过升级OpenSSH修复此问题。同样OpenSSH before 8.5也存在漏洞，所以建议修复至最新版本OpenSSH_8.7p1。 注：此操作步骤同样适用于Red Hat系所有7.x 8.x服务器系统。

<font color=red>注意事项：</font>
>在升级之前，建议打开多个SSH终端连接，并安装telnet服务器，确保在SSH服务器升级异常时，可以通过telnet服务器远程连接，进行紧急问题修复处理。
>因为最开始需要直接卸载openssh，卸载完之后就连不上了，如有问题不好解决，所以建议多开几个SSH终端连接。
## 安装一些必要的命令（需要用到的）
<span id="click_me_jump">安装一些必要的命令（需要用到的）</span>

```bash
yum install wget gcc openssl-devel pam-devel rpm-build zlib -y
```
如果没有外网，可以选择在有网络的服务器上下载rpm安装包，yum离线下载安装包可参考：[Centos7 yum如何下载离线安装包？（详解）](https://liucy.blog.csdn.net/article/details/125780172?spm=1001.2014.3001.5502)

**命令解析：**

> - 1.1 OpenSSL：OpenSSH 使用了 OpenSSL 的加密库。因此，在更新 OpenSSH 之前，需要先更新 OpenSSL 的版本。
> - 1.2 PAM：OpenSSH 使用了Pluggable Authentication Modules (PAM)，因此需要安装 PAM 相关的库文件。
>-  1.3 Zlib：OpenSSH 使用了 Zlib 库进行数据压缩。因此，需要安装 Zlib 的库文件。
> - 1.4 GCC 和 G++：OpenSSH 的编译需要 GCC 和 G++ 编译器。

## Centos 服务器升级OpenSSH

```bash
# 查看当前安装包
[root@localhost ~]# rpm -qa | grep openssh
openssh-clients-7.4p1-21.el7.x86_64
openssh-7.4p1-21.el7.x86_64
openssh-server-7.4p1-21.el7.x86_64
```

```bash
# 查看当前OpenSSH版本（Centos7 默认使用OpenSSH_7.4p1）
[root@localhost ~]# ssh -V
OpenSSH_7.4p1, OpenSSL 1.0.2k-fips  26 Jan 2017
```

```bash
# 备份现有的SSH
[root@localhost ~]# mv /etc/ssh/ /etc/ssh.bak
[root@localhost ~]# mv /usr/bin/ssh /usr/bin/ssh.bak
[root@localhost ~]# mv /usr/sbin/sshd /usr/sbin/sshd.bak
```

```bash
# 如果您是第一次升级，备份/etc/init.d/sshd时会不存在，不影响后续操作
[root@localhost ~]# mv /etc/init.d/sshd /etc/init.d/sshd.bak
mv: 无法获取'/etc/init.d/sshd' 的文件状态(stat): No such file or directory
```

```bash
# 卸载现有OpenSSH
[root@localhost ~]# rpm -e --nodeps $(rpm -qa |grep openssh)
警告：文件 /usr/sbin/sshd: 移除失败: 没有那个文件或目录
警告：文件 /etc/ssh/sshd_config: 移除失败: 没有那个文件或目录
警告：文件 /usr/bin/ssh: 移除失败: 没有那个文件或目录
警告：文件 /etc/ssh/ssh_config: 移除失败: 没有那个文件或目录
警告：文件 /etc/ssh/moduli: 移除失败: 没有那个文件或目录
警告：文件 /etc/ssh: 移除失败: 没有那个文件或目录
```

```bash
# 确保已经卸载成功（没有返回则卸载成功）
[root@localhost ~]# rpm -qa | grep openssh
```
```bash
# 下载OpenSSH二进制包
[root@localhost ~]# wget https://cdn.openbsd.org/pub/OpenBSD/OpenSSH/portable/openssh-8.7p1.tar.gz
[root@localhost ~]# tar -zxvf openssh-8.7p1.tar.gz
[root@localhost ~]# cd openssh-8.7p1
```

```bash
# 编译安装
[root@localhost openssh-8.7p1]# ./configure --prefix=/usr --sysconfdir=/etc/ssh --with-md5-passwords --with-pam --with-zlib --with-ssl-dir=/usr/local/ssl --without-hardening
[root@localhost openssh-8.7p1]# make
[root@localhost openssh-8.7p1]# make install
```
编译如果有此报错，可能是你没安装gcc..需要的命令，返回最上面： [安装一些必要的命令（需要用到的）](#click_me_jump)，安装完再次编译就可以了。



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/70cf95167f6e4edaa39b2bf8fbcb174e.png)


```bash
# 授权
[root@localhost openssh-8.7p1]# chmod 600 /etc/ssh/ssh_host_rsa_key /etc/ssh/ssh_host_ecdsa_key /etc/ssh/ssh_host_ed25519_key
```

```bash
# 复制配置文件
[root@localhost openssh-8.7p1]# cp -a contrib/redhat/sshd.init /etc/init.d/sshd
[root@localhost openssh-8.7p1]# cp -a contrib/redhat/sshd.pam /etc/pam.d/sshd.pam
```

```bash
# 修改配置允许root用户远程登录（允许密码登录，允许root远程登录，开启端口，赋予/etc/init.d/sshd权限）
[root@localhost openssh-8.7p1]# echo "PasswordAuthentication yes" >> /etc/ssh/sshd_config
[root@localhost openssh-8.7p1]# echo "PermitRootLogin yes" >> /etc/ssh/sshd_config
[root@localhost openssh-8.7p1]# sed -i "s/^#Port/Port/g" /etc/ssh/sshd_config
[root@localhost openssh-8.7p1]# chmod 755 /etc/init.d/sshd
```

```bash
# 启用sshd，生成服务配置文件
[root@localhost openssh-8.7p1]# systemctl enable sshd
sshd.service is not a native service, redirecting to systemd-sysv-install.
Executing: /usr/lib/systemd/systemd-sysv-install enable sshd
```

```bash
# 重启服务
[root@localhost openssh-8.7p1]# systemctl restart sshd
```

```bash
# 验证升级是否成功
[root@localhost ~]# ssh -V
OpenSSH_8.7p1, OpenSSL 1.0.2k-fips  26 Jan 2017
```

## Ubuntu 服务器升级OpenSSH

```bash
# 下载OpenSSH二进制包
root@localhost:~# wget https://cdn.openbsd.org/pub/OpenBSD/OpenSSH/portable/openssh-8.7p1.tar.gz
root@localhost:~# tar -zxvf openssh-8.7p1.tar.gz
root@localhost:~# cd openssh-8.7p1
```

```bash
# 编译安装
root@localhost:openssh-8.7p1# ./configure --prefix=/usr --sysconfdir=/etc/ssh --with-md5-passwords --with-pam --with-zlib --with-privsep-path=/var/lib/sshd
root@localhost:openssh-8.7p1# make
root@localhost:openssh-8.7p1# make install
```
编译如果有此报错，可能是你没安装gcc..需要的命令，返回最上面： [安装一些必要的命令（需要用到的）](#click_me_jump)，安装完再次编译就可以了。



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/70cf95167f6e4edaa39b2bf8fbcb174e.png)

```bash
# 重启服务
root@localhost:openssh-8.7p1# systemctl restart sshd
```

```bash
# 验证升级是否成功
root@localhost:openssh-8.7p1# ssh -V
OpenSSH_8.7p1, OpenSSL 1.0.2k-fips  26 Jan 2017
```

## 参考文献
- [1] 国家信息安全漏洞库：[http://www.cnnvd.org.cn/](http://www.cnnvd.org.cn/) 
- [2] 腾讯安全：[https://s.tencent.com/research/bsafe/](http://www.cnnvd.org.cn/)
- [3] Centos7 yum如何下载离线安装包？（详解）：[https://liucy.blog.csdn.net/article/details/125780172?spm=1001.2014.3001.5502](https://liucy.blog.csdn.net/article/details/125780172?spm=1001.2014.3001.5502)



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

