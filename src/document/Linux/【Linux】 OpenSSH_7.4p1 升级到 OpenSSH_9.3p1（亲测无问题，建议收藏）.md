---
title: 【Linux】 OpenSSH_7.4p1 升级到 OpenSSH_9.3p1（亲测无问题，建议收藏）
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
> 文章声明：此文基于实操撰写 生产环境：
> ssh -V查看版本是：OpenSSH_7.4p1, OpenSSL 1.0.2k-fips 26  Jan 2017 
> 问题关键字：<font color=red>OpenSSH 升级, OpenSSH 更新, OpenSSH 漏洞修复</font>

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/13e70db213ef46fba6bcf12482445256.png)

## 前述
>OpenSSH（OpenBSD Secure Shell）是OpenBSD计划组的一套用于安全访问远程计算机的连接工具。该工具是SSH协议的开源实现，支持对所有的传输进行加密，可有效阻止窃听、连接劫持以及其他网络级的攻击。 OpenSSH 8.9版本至9.3之前版本存在安全漏洞，该漏洞源于将智能卡密钥添加到ssh-agent，会导致忽略每次转发的目标约束。
注：此操作步骤同样适用于Red Hat系所有 9.x 服务器系统。

<font color=red>注意事项：</font>
>在升级之前，建议打开多个SSH终端连接，并安装telnet服务器，确保在SSH服务器升级异常时，可以通过telnet服务器远程连接，进行紧急问题修复处理。
>因为最开始需要直接卸载openssh，卸载完之后就连不上了，如有问题不好解决，所以建议多开几个SSH终端连接。
>在升级前一定要备份原有的配置文件，以防出现意外情况。

## 安装一些必要的命令（需要用到的）
<span id="click_me_jump">安装一些必要的命令（需要用到的）</span>

```bash
yum install wget gcc openssl-devel pam-devel rpm-build zlib-devel -y
```
如果没有外网，可以选择在有网络的服务器上下载rpm安装包，yum离线下载安装包可参考：[Centos7 yum如何下载离线安装包？（详解）](https://liucy.blog.csdn.net/article/details/125780172?spm=1001.2014.3001.5502)

或者是直接使用我提供的离线包：[openssh升级9.3所需的离线包 ](https://download.csdn.net/download/liu_chen_yang/87958990)

**网盘下载：**
链接：[https://pan.baidu.com/s/1DbdMNM3fbvLgB0mcVSo3pw](https://pan.baidu.com/s/1DbdMNM3fbvLgB0mcVSo3pw) 
提取码：4qm0

**命令解析：**

> - 1.1 OpenSSL：OpenSSH 使用了 OpenSSL 的加密库。因此，在更新 OpenSSH 之前，需要先更新 OpenSSL 的版本。
> - 1.2 PAM：OpenSSH 使用了Pluggable Authentication Modules (PAM)，因此需要安装 PAM 相关的库文件。
>-  1.3 Zlib：OpenSSH 使用了 Zlib 库进行数据压缩。因此，需要安装 Zlib 的库文件。
> - 1.4 GCC 和 G++：OpenSSH 的编译需要 GCC 和 G++ 编译器。

## Centos 服务器升级OpenSSH到9.3p1
### 1、安装依赖
 [安装一些必要的命令（需要用到的）](#click_me_jump)

### 2、编译安装openssl  
<span id="openssl">2.1 官网下载安装包：[openssl官网](https://www.openssl.org/source/old/)</span>

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/944b44d1363f4dd288211b863b1c7df7.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/0e31c72b56ce4e09916cc291e2a31251.png)

```bash
wget https://www.openssl.org/source/old/1.1.1/openssl-1.1.1t.tar.gz
```

或者是使用我提供的离线包：[openssh升级9.3所需的离线包 ](https://download.csdn.net/download/liu_chen_yang/87958990)

**网盘下载：**
链接：[https://pan.baidu.com/s/1DbdMNM3fbvLgB0mcVSo3pw](https://pan.baidu.com/s/1DbdMNM3fbvLgB0mcVSo3pw) 
提取码：4qm0

---

如果遇到以下问题，后面加上`--no-check-certificate`

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/3be70e41f33f44f6b3f445776e80d4ba.png)

```bash
wget https://www.openssl.org/source/old/1.1.1/openssl-1.1.1t.tar.gz --no-check-certificate
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/2b1c024b563642acabac5226d595b2ed.png)


**2.2  解压并放到/usr/local/目录**

```bash
tar xf openssl-1.1.1t.tar.gz -C /usr/local
```
**2.3 编译安装openssl** 

```bash
# 进入openssl目录
cd /usr/local/openssl-1.1.1t

# 编译安装openssl
./config shared --prefix=/usr/local/openssl
make -j 4
make install
```
**2.4 为openssl做软连接**

```bash
echo "/usr/local/openssl/lib/" >> /etc/ld.so.conf
# 加载配置文件
ldconfig
# 备份以前的openssl
mv /usr/bin/openssl /usr/bin/openssl.old
# 软连接，如果提示软连接已存在，记得备份软连接，然后在执行下面再次软连接，要不然会出问题，会导致root目录看不了，磁盘看不了，sftp连接不上；
ln -sv /usr/local/openssl/bin/openssl /usr/bin/openssl
ln -s /usr/local/openssl/lib/libssl.so.1.1 /usr/lib64/libssl.so.1.1
ln -s /usr/local/openssl/lib/libcrypto.so.1.1 /usr/lib64/libcrypto.so.1.1
```
<font color=red> 软连接，如果提示软连接已存在，记得备份软连接，然后在执行上面再次进行软连接，要不然会出问题，会导致root目录看不了，磁盘看不了，sftp连接不上，等等一系列问题；</font>

**2.5 查看openssl版本**

```bash
openssl version -a
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/c8f7d72ebba545f9aa2a3d306434d3d9.png)



### 3、查看、备份并卸载原有OpenSSH  
><font color=red>确保终端一直连接 断开远程连接就不能用了</font>

```bash
# 查看当前安装包
[root@localhost ~]# rpm -qa | grep openssh
openssh-clients-7.4p1-21.el7.x86_64
openssh-7.4p1-21.el7.x86_64
openssh-server-7.4p1-21.el7.x86_64

# 查看当前OpenSSH版本（Centos7 默认使用OpenSSH_7.4p1）
[root@localhost ~]# ssh -V
OpenSSH_7.4p1, OpenSSL 1.0.2k-fips  26 Jan 2017

# 备份现有的SSH
[root@localhost ~]# mv /etc/ssh/ /etc/ssh.bak
[root@localhost ~]# mv /usr/bin/ssh /usr/bin/ssh.bak
[root@localhost ~]# mv /usr/sbin/sshd /usr/sbin/sshd.bak

# 如果您是第一次升级，备份/etc/init.d/sshd时会不存在，不影响后续操作
[root@localhost ~]# mv /etc/init.d/sshd /etc/init.d/sshd.bak
mv: 无法获取'/etc/init.d/sshd' 的文件状态(stat): No such file or directory

# 卸载现有OpenSSH
rpm -e --nodeps $(rpm -qa |grep openssh)
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/93bcc6d3205a4b97b266ddbc8071febd.png)

**确保已经卸载成功（没有返回则卸载成功）**

```bash
rpm -qa | grep openssh
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/277bdd224f9e4ef09d818e5d3505aca9.png)


### 4、下载OpenSSH二进制包
openssh官网：[下载官网](https://cdn.openbsd.org/pub/OpenBSD/OpenSSH/portable/)

```bash
wget https://cdn.openbsd.org/pub/OpenBSD/OpenSSH/portable/openssh-9.3p1.tar.gz
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/8552f7289d3b4be5a0382f387714c048.png)

或者是使用我提供的离线包：[openssh升级9.3所需的离线包 ](https://download.csdn.net/download/liu_chen_yang/87958990)

**网盘下载：**
链接：[https://pan.baidu.com/s/1DbdMNM3fbvLgB0mcVSo3pw](https://pan.baidu.com/s/1DbdMNM3fbvLgB0mcVSo3pw) 
提取码：4qm0

### 5、解压并编译安装OpenSSH

```bash
# 将下载的openssh安装包移动到/usr/local下
[root@localhost ~]# mv openssh-9.3p1.tar.gz /usr/local/

# 进入/usr/local/目录解压openssh9.3
[root@localhost ~]# cd /usr/local/
[root@localhost local]# tar xf openssh-9.3p1.tar.gz

# 进入openssh目录
[root@localhost local]# cd openssh-9.3p1

# 编译安装
[root@localhost openssh-9.3p1]# CCFLAGS="-I/usr/local/include" \
LDFLAGS="-L/usr/local/lib64" \
./configure \
--sysconfdir=/etc/ssh \
--with-zlib \
--with-ssl-dir=/usr/local/openssl

[root@localhost openssh-9.3p1]# make -j 4
[root@localhost openssh-9.3p1]# make install
```

### 6、授权

```bash
[root@localhost openssh-9.3p1]# chmod 600 /etc/ssh/*
```

### 7、复制配置文件

```bash
[root@localhost openssh-9.3p1]# cp -rf /usr/local/sbin/sshd /usr/sbin/sshd
[root@localhost openssh-9.3p1]# cp -rf /usr/local/bin/ssh /usr/bin/ssh
[root@localhost openssh-9.3p1]# cp -rf /usr/local/bin/ssh-keygen /usr/bin/ssh-keygen
[root@localhost openssh-9.3p1]# cp -ar /usr/local/openssh-9.3p1/contrib/redhat/sshd.init /etc/init.d/sshd
[root@localhost openssh-9.3p1]# cp -ar /usr/local/openssh-9.3p1/contrib/redhat/sshd.pam /etc/pam.d/sshd.pam
```

### 8、修改配置允许root用户远程登录

```bash
# 修改配置允许root用户远程登录（允许使用密码登录，允许root远程登录，开启端口，赋予/etc/init.d/sshd权限）
cat >>/etc/ssh/sshd_config<<EOF
PermitRootLogin yes
X11Forwarding yes
PasswordAuthentication yes
KexAlgorithms diffie-hellman-group1-sha1,diffie-hellman-group14-sha1,diffie-hellman-group-exchange-sha1,diffie-hellman-group-exchange-sha256,ecdh-sha2-nistp256,ecdh-sha2-nistp384,ecdh-sha2-nistp521,diffie-hellman-group1-sha1,curve25519-sha256@libssh.org
EOF

[root@localhost openssh-9.3p1]# sed -i "s/^#Port/Port/g" /etc/ssh/sshd_config
[root@localhost openssh-9.3p1]# chmod 755 /etc/init.d/sshd
```

### 9、启用sshd，生成服务配置文件，并重启服务

```bash
# 启用sshd，生成服务配置文件
[root@localhost openssh-9.3p1]# systemctl enable sshd
sshd.service is not a native service, redirecting to /sbin/chkconfig.
Executing /sbin/chkconfig sshd on

# 重启服务
[root@localhost openssh-9.3p1]# systemctl restart sshd
# 查看服务状态
[root@localhost openssh-9.3p1]# systemctl status sshd
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/77139bd1d39b4a219b92a29d51a529fc.png)

### 10、验证升级是否成功

```bash
[root@localhost ~]# ssh -V
OpenSSH_9.3p1, OpenSSL 1.0.2k-fips  26 Jan 2017
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/9cdbe36990b7412db6ad0bdfa67b5774.png)

## 可能遇到的问题及解决方式

### 问题一：

编译如果有此报错，可能是你没安装gcc…需要的命令，返回最上面：  [安装一些必要的命令（需要用到的）](#click_me_jump)，安装完再次编译就可以了。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/0e2a3cc5ff714da1a9992828bd3e5948.png)

### 问题二：
编译时报错信息：
```bash
checking for cc... cc
checking whether the C compiler works... no
configure: error: in `/usr/local/openssh-9.3p1':
configure: error: C compiler cannot create executables
See `config.log' for more details
```
gcc问题，如果gcc是5.4将gcc降级为4.8.5，我遇到的问题就是因为gcc的版本为5.4，将gcc版本降为4.8.5即可。

### 问题三：
编译时报错信息：
```bash
checking for openssl/opensslv.h... yes
checking OpenSSL header version... 009070e0 (OpenSSL 0.9.7n-dev xx XXX xxxx)
checking for OpenSSL_version... no
checking for OpenSSL_version_num... no
checking OpenSSL library version... configure: error: OpenSSL >= 1.0.1 required (have "009070e0 (OpenSSL 0.9.7n-dev xx XXX xxxx)")
```
这个报错是说版本要必须大于等于1.0.1，但是ssh -V我看的时候是1.0.2，可能还是因为版本太低了，我就升级了一个openssl版本为1.1.1，就可以了。安装openssl可参考：[编译安装openssl](#openssl)

### 问题四：
升级OpenSSH后SFTP无法连接问题

- 1.修改配置

```bash
vim  /etc/ssh/sshd_config
 
#override default of no subsystems
#Subsystem      sftp    /usr/local/openssh/libexec/sftp-server改成下面这句
Subsystem      sftp    internal-sftp
```

- 2.重启sshd服务

```bash
systemctl restart sshd
```
再试一下就可以了。
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

