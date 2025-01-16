---
title: 【Linux】之创建普通用户并禁止root用户远程登陆
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



>&emsp;&emsp;在有的情况下我们怕有人使用root用户登录服务器，乱窜该一些东西，或者使用删除的时候误删；为了避免这种情况，我们可以采取禁止root用户，使用普通用户来登录，这样可以在你删除的时候会提示你输入密码，之类的，这时候就会注意到，这个文件是否删除的正确。<br>
&emsp;&emsp;禁止root远程登陆也可以有效的预防服务器被攻击。


**==<font color=red>本文章分为两类，一类是创建普通用户，一类是禁止root用户远程登陆。</font>==**

## 1、创建普通用户并设置密码
### 1.1、创建普通用户

```bash
useradd test
```
查看是否创建成功

```bash
cat /etc/passwd
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181625050.png)

### 1.2、给test用户设置登录密码

```bash
passwd test
```
密码需要输入两次，如果第一次提示你的密码过于简单，不用担心，继续输入就好了，也可以设置一个比较难一点的密码，这样就不会提醒了；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181625235.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181625382.png)

输入完密码之后，可以测试一下；

```bash
su - test
```
可以直接切换到普通用户，但是普通用户切换不回来，因为普通用户什么权限也没有，所以，切换不回来。我们可以给他设置权限。

### 1.3、给test用户设置权限
可以使用visudo来设置

```bash
[root@localhost ~]# visudo
```
直接进入，查找root在第100行可以看到root的权限，我们可以紧跟着在下面添加用户和权限

```bash
test    ALL=(ALL)       ALL
```
设置完成之后保存退出，就可以切换到test普通用户，然后切换回来root用户测试了。

番外：
给普通用户设置权限，并且切换root用户不需要输入密码；
```bash
test    ALL=(ALL)       NOPASSWD:ALL
```

### 1.4、测试test普通用户

```bash
#先切换到普通用户
su - test

#使用普通用户创建文件
touch a

#ls查看

#切换回root用户
sudo su -

#这时候需要你输入test用户的密码，输入成功之后就可以进入root用户了。
```
## 2、禁止root用户远程登录
首先我们要切换回root用户，在/etc/ssh/sshd_config文件内修改为： PermitRootLogin no  ，正常在38行；

```bash
进入ssh配置文件
vim /etc/ssh/sshd_config

#去掉前面的井号注释，在将yes修改为no
PermitRootLogin no
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181625827.png)

修改完成之后，保存退出，重启ssh服务；

```bash
#重启ssh服务
systemctl restart sshd
```
重启完sshd服务之后，可以退出登录，或者重启服务器，在重新使用root用户连接，就会提示让你输入密码，密码正确也不会进来，因为已经设置了禁止root用户远程登陆，所以这时候就可以使用普通用户test来登录了；这时候使用普通用户就可以登录进来了。



这样就可以了，禁止root用户远程登陆了。



