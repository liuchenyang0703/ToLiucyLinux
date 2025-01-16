---
title: 【Linux】部署mailx服务及发送邮件告警
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - mail
  - 运维
pageview: false
date: 2024-12-18
comment: false
breadcrumb: false
---

>🍁**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>


**知识点**
- MUA(邮件用户代理)
- MTA（邮件传输代理）
- MDA（邮件分发代理）



**STMP 简单邮件传输协议**

>TCP 25端口 专门用来发送邮件的。



**POP3 第三版邮局协议**

>TCP 110端口 客户端接受邮件时使用



**IMAP4 第四版因特网消息访问协议**

>TCP 143端口 客户端接受邮件时使用



**邮件服务器端软件**

商业邮件系统：
Exchange：微软的
Notes/Domaino：IBM的。提供跨平台支持


**开源邮件系统：**

Sendmail：运行稳定。安全性欠佳
Qmail：很好的执行效率，比较方便。
Postfix：兼容Sendmail，采用模块化设置。
Dovecot：用于为客户端提供邮件收取服务

Outlook Express：用于收发信的客户端工具
foxmail：国产邮件客户端软件

- SMTP : 是邮件传输协议 , SMTP 是专门用户邮件服务器之间进行邮件互传的通讯协议 , 用户通过客户端软件把邮件上传到自己的邮件服务器也是使用 SMTP协议
- POP3 : 是用户从邮件服务器下载邮件内容专用的协议 , 也只有在这一种情况下才会需要使用到 POP协议  客户端把邮件服务器的邮件收取以后 对于邮件的操作不会反馈到邮件服务器  比如删除邮件或者是标记已读
- IMAP : 这个是POP协议的升级版本 , 使用IMAP协议的时候 客户端对于邮件的操作会反馈到邮件服务器 , 例如对邮件执行删除或者是已读标记等操作都会让邮件服务器对此邮件做出相同的动作


## 一、关闭防火墙或开启53、 25、109、110、143、465、995、993端口
### 1、关闭防火墙
```bash
#停止防火墙
systemctl stop firewalld

#查看防火墙状态
systemctl status firewalld

#设置开机禁止自启防火墙
systemctl disable firewalld
```
### 2、开启53、 25、109、110、143、465、995、993端口

```bash
iptables -I INPUT -p tcp -m multiport --dport 53,25,109,110,143,465,995,993 -j ACCEPT

#或者使用firewalld逐个添加
firewall-cmd --permanent --add-port=53/tcp --add-port=25/tcp --add-port=109/tcp --add-port=110/tcp --add-port=143/tcp --add-port=465/tcp --add-port=995/tcp --add-port=993/tcp
#生效端口配置
firewall-cmd --reload
#查看开放的所有端口
firewall-cmd --list-ports
```
### 3、邮件端口解析
**25端口（SMTP）**：25端口为SMTP（Simple Mail Transfer Protocol，简单邮件传输协议）服务所开放的，是用于发送邮件。

&emsp;&emsp;如今绝大多数邮件服务器都使用该协议。当你给别人发送邮件时，你的机器的某个动态端口（大于1024）就会与邮件服务器的25号端口建立一个连接，你发送的邮件就会通过这个连接传送到邮件服务器上，保存起来。

**109端口（POP2）**：109端口是为POP2（Post Office Protocol Version 2，邮局协议2）服务开放的，是用于接收邮件的。

**110端口（POP3）**：110端口是为POP3（Post Office Protocol Version 3，邮局协议3）服务开放的，是用于接收邮件的。

**143端口（IMAP）**：143端口是为IMAP（INTERNET MESSAGE ACCESS PROTOCOL）服务开放的，是用于接收邮件的。

&emsp;&emsp;目前POP3使用的比POP2广得多，POP2几乎被淘汰，也有某些服务器同时支持POP2和POP3协议。客户端可以使用POP3协议来访问服务端的邮件服务，如今ISP的绝大多数邮件服务器都是使用POP3协议（极少用POP2协议）。在使用邮件客户端程序的时候，会要求输入POP3服务器地址，默认情况下使用的就是110端口。当你用邮件客户端（比如、Thunderbird、foxmail、MS Outlook Express以及各类邮件精灵）登录时，你的机器就会自动用机器的某一个动态端口（大于1024）连接邮件服务器的110端口，服务器就把别人给你发的邮件（之前保存在邮件服务器上），发送到你机器，这样你就可以看到你客户端工具上的收件箱里的新邮件了。

&emsp;&emsp;IMAP协议，和POP3协议一样是用来接收邮件的，但是它有它的特别和新颖之处，它是面向用户的，它和POP3协议的主要区别是：用户可以不用把所有的邮件内容全部下载，而是只下载邮件标题和发件人等基本信息，用户可以由标题等基本信息，去决定是否下载邮件全文，用户可以通过客户端的浏览器直接对服务器上的邮件进行操作（比如：打开阅读全文、丢进垃圾箱、永久删除、整理到某文件夹下、归档、）。再简单来说就是：浏览器用的IMAP协议（143端口）来为你接收邮件以及让你很方便的操作服务器上的邮件。邮件客户端用的POP3协议（110端口）来为你接收邮件的全部信息和全文内容保存到你的本地机器成为一个副本，你对邮件客户端上的副本邮件的任何操作都是在副本上，不干涉邮件服务器上为你保存的邮件原本。

&emsp;&emsp;上面介绍的SMTP协议、POP2协议、POP3协议、IMAP协议都是不安全的协议。因考虑到网络安全的因素，下面给你介绍基于SSL（Secure Sockets Layer 安全套接层）协议的安全的邮件收发协议。你的邮件在传输过程中可能被网络黑客截取邮件内容，如果你的邮件机密性非常强，不想被收件人以外的任何人和任何黑客截取，或者是涉及国家机密安全的，等等。那么你的邮件就不该使用上述的三种协议进行收发。

&emsp;&emsp;若你采用SMTP协议发邮件，那么你发出的邮件从你的机器传到服务器的过程中，可能被黑客截取从而泄露。若你采用POP2或者POP3协议收取邮件，那么你的邮件从服务器传至你当前机器的过程可能被黑客截取从而泄露。

**465端口（SMTPS）**：465端口是为SMTPS（SMTP-over-SSL）协议服务开放的，这是SMTP协议基于SSL安全协议之上的一种变种协议，它继承了SSL安全协议的非对称加密的高度安全可靠性，可防止邮件泄露。SMTPS和SMTP协议一样，也是用来发送邮件的，只是更安全些，防止邮件被黑客截取泄露，还可实现邮件发送者抗抵赖功能。防止发送者发送之后删除已发邮件，拒不承认发送过这样一份邮件。

**995端口（POP3S）**：995端口是为POP3S（POP3-over-SSL）协议服务开放的，这是POP3协议基于SSL安全协议之上的一种变种协议，它继承了SSL安全协议的非对称加密的高度安全可靠性，可防止邮件泄露。POP3S和POP3协议一样，也是用来接收邮件的，只是更安全些，防止邮件被黑客截取泄露，还可实现邮件接收方抗抵赖功能。防止收件者收件之后删除已收邮件，拒不承认收到过这样一封邮件。

**993端口（IMAPS）**：993端口是为IMAPS（IMAP-over-SSL）协议服务开放的，这是IMAP协议基于SSL安全协议之上的一种变种协议，它继承了SSL安全协议的非对称加密的高度安全可靠性，可防止邮件泄露。IMAPS和IMAP协议一样，也是用来接收邮件的，只是更安全些，防止邮件被黑客截取泄露，还可实现邮件接收方抗抵赖功能。防止收件者收件之后删除已收邮件，拒不承认收到过这样一封邮件。

## 二、安装mailx
mailx服务默认是已经安装了，如果没有安装一下就行；
```bash
[root@localhost ~]#  yum -y install mailx
```
## 三、配置邮件服务
### 1、生成授权码
使用163或者qq邮箱都可以，这里以qq邮箱为例；

1 打开[网页版qq邮箱](https://www.baidu.com/link?url=HCaTwQ6t4JQWm7TVHpUSONFDnTzdOGQLiav3Zt9xlC7&wd=&eqid=814cefc30001c04c0000000263fdbcef)
2 开启授权码

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181440945.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181440338.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181440272.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181440243.png)

完了会给你一个授权码，先复制保存起来，关闭了就找不到了。

### 2、编辑配置文件
编辑/etc/mail.rc配置文件
```bash
[root@localhost ~]# vim /etc/mail.rc
	
set from=mail@qq.com							# 对方收到邮件时显示的发件人
set smtp=smtp.qq.com							# 第三方发邮件的smtp服务器地址
set smtp-auth-user=user(可以是自己的qq或163)	# 第三方发邮件的用户名
set smtp-auth-password=sdajfqorewasojs			# 授权码
set smtp-auth=login								# SMTP的认证方式
```


## 四、测试邮件服务是否可以发送成功
### 使用管道符直接发送
```bash
echo "abc" | mail -s "123" qqmail@qq.com
```
- -s 邮件头部信息
### 发送时显示详细信息
```bash
echo "abc" | mail -v -s "123" qqmail@qq.com
```
- -v 输出发送邮件详细信息
### 带附件发送（即文本或目录）
```bash
echo "abc" | mail -v -a /路径/文件名 -s "123" qqmail@qq.com
```
- -a 附带发送文件
- -a 必须在 -s 前面，否则会报错


发送成功。






