---
title: 【Linux】远程桌面连接服务器报错：未启用对服务器的远程访问......
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
>&emsp;&emsp;🏅[CSDN博客专家](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---


## 前述
>我们知道，我们日常通过vnc来远程管理linux图形界面，今天分享一工具Xrdp，它是一个开源工具，允许用户通过Windows RDP访问Linux远程桌面。 除了Windows RDP之外，xrdp工具还接受来自其他RDP客户端的连接，如FreeRDP，rdesktop和NeutrinoRDP。这个工具也可以很有效的解决windows远程桌面连接服务器连不上的问题。

## 操作环境说明：
|系统|版本  |
|--|--|
|  Linux操作系统| centos7.9 |
|Windows客户端操作系统|win10
|xrdp软件版本|xrdp-0.9.19-1.el7.x86_64


## 远程报错

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181618407.png)
## 一、安装GNOME默认桌面环境

```bash
yum groupinstall -y 'GNOME Desktop'
```
这个过程有点漫长，可以嗑嗑瓜子等等，大概10-20分钟吧。

安装完GNOME默认桌面环境之后，再试一下连接，如果可以连接上就ok了，如果还连接不上，就继续下面的操作，安装Xrdp。


## 二、安装Xrdp（xrdp端口为3389）

```bash
#更新epel源
yum install epel-release -y
#安装xrdp
yum install xrdp -y
```
- 启动Xrdp服务，并设置开机启动

```bash
systemctl enable xrdp --now
```

- 查看Xrdp的启动状态

```bash
systemctl status xrdp
```

running为启动状态

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181618287.png)

再来看一下端口是否启动；（3389）

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181618046.png)

已经启动没问题。


### 1 配置Xrdp
设置Xrdp使用GNONE，编辑配置文件，添加如下行


```bash
echo "exec gnome-session" >> /etc/xrdp/xrdp.ini
```
- 重启Xrdp服务


```bash
systemctl restart xrdp
```
### 2 配置防火墙（如果启用了防火墙的话），放行3389端口

>默认情况下，Xrdp监听3389端口，如果使用的是云服务器（如阿里云、华为云），可以通过安全组规则放行3389端口。


## 三、测试验证

使用windows自带的 远程桌面 ，输入自己的ip和用户名

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181618911.png)

点击连接，跳出来这个框，代表现在已经可以连接了，只需要输入以下登陆密码即可。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181618568.png)

输入完成之后点击，确定就行；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181618791.png)

连接上了，ok，完事了。


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181618983.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181617299.png)



---

---

* 附加 - 可以看看

远程桌面连接出现了内部错误往往是突然发生的，无法追溯到前面的具体操作。主要发生在Windows 10、Windows Server 2008/2012/2016/2019等系统中。远程桌面连接出现了内部错误的原因可能有以下几点：

1.网络问题：网络不稳定、网络延迟或网络拥堵等都可能导致服务器无法正常响应请求，从而引发内部错误。

2.服务器配置问题：服务器的配置不正确，例如端口号错误、防火墙设置不当等，也可能导致内部错误。

3.服务器资源不足：服务器的硬件资源（如CPU、内存、磁盘空间等）不足或过载，可能导致服务器无法处理请求，从而产生内部错误。

4.文件权限问题：文件权限设置不正确，可能导致服务器无法正常读取或写入文件，从而引发内部错误。

5.防火墙屏蔽问题：防火墙作为电脑安全防护的重要程序，有时会阻挡远程桌面连接请求，从而导致远程桌面连接出现了内部错误。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181617525.png)

如果在使用远程桌面连接服务器时，遇到远程桌面出现内部错误的问题，可以使用本教程中提到的几种方法，来解决“远程桌面连接出现了内部错误”的问题。

方法一：

检查网络状况：确保网络连接稳定、无延迟或拥堵现象。可以尝试更换网络环境或者联系网络服务商解决网络问题。

方法二：

检查服务器配置：确保服务器的配置正确，包括端口号、防火墙设置等。可以参考服务器提供商的文档或联系技术支持获取帮助。

方法三：

优化服务器资源使用：根据服务器的硬件资源状况，合理分配资源，避免资源过载或不足。可以通过升级硬件、优化应用程序或调整系统参数等方式实现。

方法四：

检查文件权限设置：确保服务器上文件的权限设置正确，使得应用程序或用户能够正常读取和写入文件。可以通过修改文件权限设置或者使用适当的用户账户来访问文件。

方法五：

更改远程桌面安全性：

1.按“Win + R”打开运行对话框，输入“gpedit.msc”打开本地组策略编辑器。

2.在左侧依次选择：“计算机配置” > “管理模板” > “Windows组件” > “远程桌面服务” > “远程桌面会话主机” > “安全” > “远程（RDP）连接要求使用指定的安全层”。

3.双击打开“远程（RDP）连接要求使用指定的安全层”，在新界面中勾选“已启用”，在安全层中选择“RDP”并点击“确定”。



连接服务器出现内部错误是一个比较常见的问题，解决这个问题需要综合考虑多个方面，包括网络状况、服务器配置、资源使用情况、软件和脚本代码、数据库连接以及文件权限设置等。在实际操作中，可以根据具体情况逐一排查和解决问题，以保障服务器的稳定性和可靠性。同时，建议定期对服务器进行维护和监控，及时发现潜在问题并采取相应的措施加以解决。

