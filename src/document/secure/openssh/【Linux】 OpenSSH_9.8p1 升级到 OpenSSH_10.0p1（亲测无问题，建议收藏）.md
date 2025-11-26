---
title: 【Linux】 OpenSSH_9.8p1 升级到 OpenSSH_10.0p1（亲测无问题，建议收藏）
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
date: 2025-10-16 09:00:00
comment: false
breadcrumb: false
isOriginal: true
---

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[CSDN博客专家](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/usersnew/id_1661843828089234)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/profile/7yu26jk3lfqxg)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---

## 文章声明
> 文章声明：此文基于实操撰写 生产环境：此文升级是基于9.8p1升级10.0p1，基于上一篇文章：[【Linux】Centos 8 升级OpenSSH9.8【升级其他OpenSSH版本通用】](https://liucy.blog.csdn.net/article/details/150848861)所写；
> ssh -V查看版本是：OpenSSH_9.8p1, OpenSSL 1.1.1k 
> 问题关键字：<font color=red>OpenSSH 升级, OpenSSH 更新, OpenSSH 漏洞修复</font>
> 漏洞信息：<font color=red>SSH Terrapin 前缀截断漏洞（CVE-2023-48795）</font>
> 漏洞等级：<font color=red>中级</font>
> 
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141038469.png)

## 漏洞描述及风险

**SSH Terrapin 前缀截断漏洞（CVE-2023-48795）详细描述：**
> 该漏洞被称为 `Terrapin` 攻击，是一种中间人攻击。攻击者可以截断 SSH 握手的重要部分，而无需关闭 SSH 连接，从而绕过完整性检查并降低连接的安全性。具体来说，是 SSH Binary Packet Protocol (BPP) 的实现存在缺陷，导致攻击者可以利用精心构造的数据包，在特定条件下截断 SSH 通信内容。
> * 影响范围：
>
> OpenSSH < 9.6
> * 修复措施：
> 
> 升级 OpenSSH <= 9.6

**风险：**
1. 升级OpenSSH时，由于远程登录，在卸载OpenSSH后Xshell可能与主机失联。
2. 开启多个xshell标签连接同一台主机并开启top命令挂起对话框，减少与主机失联风险。
3. 升级OpenSSH以后，会影响免密登录，需重新配置密钥。
4. 在升级前一定要备份原有的配置文件，以防出现意外情况。

## 此文升级是基于9.8p1升级10.0p1（如是8.0升级9.8p1，可参考文章最后的参考文章）
>8.0p1升级9.8p1文档：[【Linux】Centos 8 升级OpenSSH9.8【升级其他OpenSSH版本通用】](https://liucy.blog.csdn.net/article/details/150848861)
### 安装所需依赖

```bash
yum install -y gcc gcc-c++ make zlib zlib-devel pam-devel perl-IPC-Cmd perl-CPAN openssl-devel
```
### 备份openssh9.8p1的配置文件

```bash
# 备份现有的SSH配置及命令
mv /etc/ssh/ /etc/ssh-9.8p1
mv /usr/sbin/sshd /usr/sbin/sshd-9.8p1
mv /usr/bin/ssh /usr/bin/ssh-9.8p1
mv /usr/bin/ssh-keygen /usr/bin/ssh-keygen-9.8p1
mv /etc/pam.d/sshd.pam /etc/pam.d/sshd.pam-9.8p1
mv /etc/init.d/sshd /etc/init.d/sshd-9.8p1
```
> 如果不需要这些配置可以在升级完成之后确认没有问题再将其删除
### 下载 openssh10.0p1 的安装包：
>* OpenSSH官网：[官网下载地址](https://cdn.openbsd.org/pub/OpenBSD/OpenSSH/portable/)
> * 网盘下载地址：[https://pan.baidu.com/s/1N3sKWUdjrYKB0zq5Tm89Og?pwd=open](https://pan.baidu.com/s/1N3sKWUdjrYKB0zq5Tm89Og?pwd=open)
>* CSDN资源下载：[centos8 openssh9.8p1升级openssh10.0p1所需的离线包](https://download.csdn.net/download/liu_chen_yang/91776777)

```bash
wget https://cdn.openbsd.org/pub/OpenBSD/OpenSSH/portable/openssh-10.0p1.tar.gz
```
### 解压并编译安装OpenSSH10.0p1
```bash
#解压openssh：
tar -xf openssh-10.0p1.tar.gz -C /usr/src/

# 切换到解压后的路径
cd /usr/src/openssh-10.0p1/
# 设置配置【二选一】
# 如果需要使用新安装的openssl，就在编译的时候指定openssl安装路径(--with-ssl-dir)，在安装完成之后使用ssh -V查看的时候就是openssl-3.3.1。
./configure --prefix=/usr/local/openssh --sysconfdir=/etc/ssh --with-ssl-dir=/usr/local/openssl/ --without-openssl-header-check --with-pam --with-privsep-path=/var/lib/sshd --with-md5-passwords --with-zlib
# 默认不指定openssl就使用的是系统自带的openssl-1.1.1k，在安装完成之后使用ssh -V查看的时候就是openssl-1.1.1k。
./configure --prefix=/usr/local/openssh --sysconfdir=/etc/ssh --with-ssl-dir --without-openssl-header-check --with-pam --with-privsep-path=/var/lib/sshd --with-md5-passwords --with-zlib

#  编译安装
make -j4 && make install
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141038680.png)
### 复制ssh相关配置文件并添加远程登陆配置

```bash
# 复制启动文件到/etc/init.d/下并命名为sshd
cp -p contrib/redhat/sshd.init /etc/init.d/sshd
cp -a contrib/redhat/sshd.pam /etc/pam.d/sshd.pam
# 复制命令
cp -rf /usr/local/openssh/sbin/sshd /usr/sbin/sshd
cp -rf /usr/local/openssh/bin/ssh /usr/bin/ssh
cp -rf /usr/local/openssh/bin/ssh-keygen /usr/bin/ssh-keygen


echo 'PermitRootLogin yes' >> /etc/ssh/sshd_config
echo 'PasswordAuthentication yes' >> /etc/ssh/sshd_config
```

### 启用sshd，生成服务配置文件，并重启服务
* 使用/etc/init.d/sshd 方式启动服务

```bash
#重启sshd服务
/etc/init.d/sshd restart
#查看服务运行状态
/etc/init.d/sshd status
#添加开机启动
chkconfig --add sshd
#查看升级后ssh版本
ssh -V
```
* 使用systemctl 方式启动服务
```bash
# 启用sshd，生成服务启动配置文件
[root@localhost openssh-9.8p1]# systemctl enable sshd
sshd.service is not a native service, redirecting to /sbin/chkconfig.
Executing /sbin/chkconfig sshd on

# 或者自己写一个也行【二选一】
# 配置service启动文件
vim /etc/systemd/system/sshd.service

[Unit]
Description=OpenSSH server daemon
After=network.target

[Service]
Type=forking
ExecStart=/usr/sbin/sshd -D
ExecReload=/bin/kill -HUP $MAINPID
KillMode=process
Restart=on-failure

[Install]
WantedBy=multi-user.target

# 重启服务
[root@localhost openssh-9.8p1]# systemctl restart sshd
# 查看服务状态
[root@localhost openssh-9.8p1]# systemctl status sshd
```

### 验证升级是否成功

```
[root@localhost ~]# ssh -V
OpenSSH_10.0p2, OpenSSL 1.1.1k  FIPS 25 Mar 2021
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141039191.png)

版本没问题新开窗口再次连接此服务器，可以连上就没问题。



## 相关专栏
| 专栏标题                                                     | 专栏链接                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [《OpenSSH 系列》](https://blog.csdn.net/liu_chen_yang/category_12463139.html) | [https://blog.csdn.net/liu_chen_yang/category_12463139.html](https://blog.csdn.net/liu_chen_yang/category_12463139.html) |
| [《Linux从入门到精通》](https://blog.csdn.net/liu_chen_yang/category_10887074.html) | [https://blog.csdn.net/liu_chen_yang/category_10887074.html](https://blog.csdn.net/liu_chen_yang/category_10887074.html) |
| [《Linux服务器安全》](https://blog.csdn.net/liu_chen_yang/category_12390514.html) | [https://blog.csdn.net/liu_chen_yang/category_12390514.html](https://blog.csdn.net/liu_chen_yang/category_12390514.html) |


## 相关文章
|  文章标题|文章链接  |
|--|--|
|基于Centos7上测试||
|[【Linux】 OpenSSH_7.4p1 升级到 OpenSSH_8.7p1（亲测无问题，建议收藏）](https://liucy.blog.csdn.net/article/details/130484944)|[https://liucy.blog.csdn.net/article/details/130484944](https://liucy.blog.csdn.net/article/details/130484944)
| [【Linux】 OpenSSH_7.4p1 升级到 OpenSSH_9.3p1（亲测无问题，建议收藏）](https://liucy.blog.csdn.net/article/details/131398113) | [https://liucy.blog.csdn.net/article/details/131398113](https://liucy.blog.csdn.net/article/details/131398113) |
| [【Linux】 OpenSSH_7.4p1 升级到 OpenSSH_9.3p2（亲测无问题，建议收藏）](https://liucy.blog.csdn.net/article/details/133460612) | [https://liucy.blog.csdn.net/article/details/133460612](https://liucy.blog.csdn.net/article/details/133460612)|
|[【Linux】 OpenSSH_7.4p1 升级到 OpenSSH_9.4p1（亲测无问题，建议收藏）](https://liucy.blog.csdn.net/article/details/133697104)|[https://liucy.blog.csdn.net/article/details/133697104](https://liucy.blog.csdn.net/article/details/133697104)|
|[【Linux】 OpenSSH_7.4p1 升级到 OpenSSH_9.6p1（亲测无问题，建议收藏）](https://liucy.blog.csdn.net/article/details/136536352)|[https://liucy.blog.csdn.net/article/details/136536352](https://liucy.blog.csdn.net/article/details/136536352)|
|[【Linux】 OpenSSH_9.3p1 升级到 OpenSSH_9.3p2（亲测无问题，建议收藏）](https://liucy.blog.csdn.net/article/details/133460539)|[https://liucy.blog.csdn.net/article/details/133460539](https://liucy.blog.csdn.net/article/details/133460539)|
|[【Linux】 OpenSSH_9.3p1 升级到 OpenSSH_9.5p1（亲测无问题，建议收藏）](https://liucy.blog.csdn.net/article/details/134717718)|[https://liucy.blog.csdn.net/article/details/134717718](https://liucy.blog.csdn.net/article/details/134717718)|
|[【Linux】 OpenSSH_9.3p1 升级到 OpenSSH_9.6p1（亲测无问题，建议收藏）](https://liucy.blog.csdn.net/article/details/136327961)|[https://liucy.blog.csdn.net/article/details/136327961](https://liucy.blog.csdn.net/article/details/136327961)|
|[【Linux】 OpenSSH_9.3p2 升级到 OpenSSH_9.4p1（亲测无问题，建议收藏）](https://liucy.blog.csdn.net/article/details/133682882)|[https://liucy.blog.csdn.net/article/details/133682882](https://liucy.blog.csdn.net/article/details/133682882)|
|基于Centos8上测试||
|[【Linux】Centos 8 升级OpenSSH9.8【升级其他OpenSSH版本通用】](https://liucy.blog.csdn.net/article/details/150848861)|[https://liucy.blog.csdn.net/article/details/150848861](https://liucy.blog.csdn.net/article/details/150848861)|
|[【Linux】 OpenSSH_9.8p1 升级到 OpenSSH_10.0p1（亲测无问题，建议收藏）](https://liucy.blog.csdn.net/article/details/150921048)|[https://liucy.blog.csdn.net/article/details/150921048](https://liucy.blog.csdn.net/article/details/150921048)|

