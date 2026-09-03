---
title: Linux安装centos8及基础配置
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 运维
date: 2025-10-01 10:04:45
isOriginal: true
pageview: true
article: true
breadcrumb: false
comment: true
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

## 1、下载centos8 ISO镜像

>[阿里云centos8下载地址](https://mirrors.aliyun.com/centos/8.5.2111/isos/x86_64/)

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141033094.png)

## 2、VMware安装centos8操作系统

* 新建虚拟机
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141033651.png)
* 选择经典安装
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141033037.png)
* 稍后安装操作系统
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141033498.png)
* 选择Linux，版本选择centos8 64位
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141033577.png)
* 命名及配置存储路径
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141033150.png)
* 根据自己电脑磁盘大小来配置，也可后面扩容
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141033534.png)
* 选择自定义硬件
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141033590.png)
* 内存和cpu根据自己的所需和实际情况来调整
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141033676.png)
* 新DVD，连接选择使用 ISO 映像文件，点击浏览选择centos8.5的ISO。
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141033254.png)

* 网络适配器 - 根据自己需求进行选择，这里我直接选择桥接
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141033252.png)
* 都配置好之后点击关闭就行
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141034326.png)
* 然后在点击完成
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141034088.png)
* 开启虚拟机
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141034567.png)
* install centos Linux 8回车
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141034583.png)
* 选择安装语言 - 中文
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141034960.png)
* 需要配置的有如下四个
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141034565.png)
* 安装目的地，直接选择刚刚给的盘就行（如果点击完成还是显示红色，点进去在选一次）
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141034044.png)
* 网络连接 - 直接点击打开就好了
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141034063.png)
* 时间改成上海时间
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141034659.png)
* 配置root密码，根据自己需求（需要密码是123123这样简单的需要点两次完成）
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141034393.png)
* 都配置好之后开始安装就可以选择了，直接点击开始安装
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141035789.png)
* 等待安装完成之后选择重启系统（大约20分钟左右），等待系统重启完毕；
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141035825.png)
* 初始设置 - 许可证，点进去，点击我同意许可，点击完成，出来之后点击结束配置，完成；
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141035808.png)
* 然后一路前进就行；

完成之后到达桌面，点击终端，使用命令`ip a`查看ip，然后用xshell等连接工具连接服务器即可；
## 3、挂载磁盘
`lsblk`看一下，可以看到有一个`/dev/sr0`的盘，然后我们给他挂载到：`/media/cdrom`下。

```bash
# 创建/media/cdrom目录
mkdir /media/cdrom
# 挂载磁盘
mount /dev/sr0 /media/cdrom 
# 挂在完之后查看挂载信息（会多出一个/dev/sr0）
df -Th
```

挂载时提示`mount: /media/cdrom: WARNING: device write-protected, mounted read-only.`这个不用管，只是说因为有保护，所以只读，这个是正常的。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141035193.png)


>**问题1：**<br>
>如果遇到挂载时报错：`mount: 在 /dev/sr0 上找不到媒体`
请检查虚拟机的右下角ISO映像文件是否连接；
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141035732.png)


## 4、配置永久挂载磁盘
> 如果不配置永久挂载磁盘的话重启服务器或虚拟机挂载的磁盘就会掉，就需要重新手动挂载，比较麻烦，配置永久挂载之后重启就不用管，就会一直挂载着；所以配置永久挂载就比较方便。

```bash
vim /etc/fstab

# 将如下内容添加到最后一行，切记不要修改其他内容
/dev/sr0 /media/cdrom iso9660 defaults 0 0
```
> 内容解析：
> 第一段:挂载的设备	<font color=darkorange>（dev/sr0）</font>
第二段:挂载的目录 	<font color=darkorange>（/media/cdrom）</font>
第三段:文件系统类型 <font color=darkorange>（iso9660）</font>
第四段:挂载的参数 defaults默认参数 <font color=darkorange> （defaults ）</font>
第五段:是否使用dump备份  0不备份  1备份 <font color=darkorange>（0）</font>
第六段:是否使用fsck检测  0不检测<font color=darkorange>（0）</font>

配置好之后保存退出。

## 5、配置yum本地源
配置yum本地源主要是用到ISO镜像里的`repomd.xml`，可以直接去`/media/cdrom`下去查找这两个文件：`cd /media/cdrom && find ./ -name repomd.xml `，正常查出来是有两个，可以把这两个都配置成本地yum源（这两个必须都要）；

```bash
cd /etc/yum.repos.d/
# 先把系统自带的源文件备份起来
mkdir bak
mv *.repo bak
```

* 创建`AppStream.repo` 文件：

```bash
vim AppStream.repo

[AppStream]
name=AppStream Repository
baseurl=file:///media/cdrom/AppStream
enabled=1
gpgcheck=0
```
* 创建 `BaseOS.repo` 文件：


```bash
vim BaseOS.repo

[BaseOS]
name=BaseOS Repository
baseurl=file:///media/cdrom/BaseOS
enabled=1
gpgcheck=0
```

本地源配置好之后，就可以清理旧的缓存并重新生成缓存了：
```bash
yum clean all
yum makecache
```
缓存生成完毕之后就可以安装所需软件了，例如：

```bash
yum -y install gcc gcc-c++
```
## 6、关闭防火墙并配置开机禁止自启
> 测试环境开不开防火墙都行，这里主要是简单的介绍一下测试环境的，所以就把防火墙关闭了。
> 正式环境一般是需要开启的，开启之后配置防火墙规则可查看👉[【Linux】firewall-cmd之防火墙简介及命令详解【附加实战⭐建议收藏！！⭐】](https://blog.csdn.net/liu_chen_yang/article/details/126243544)👈

```bash
# 关闭防火墙
systemctl stop firewalld

# 配置开机禁止自启防火墙
systemctl disable firewalld
```
如果是启动、重启和配置开机自启，可看如下命令：

```bash
# 开启防火墙
systemctl start firewalld

# 重启防火墙
systemctl restart firewalld

# 配置防火墙开机自启
systemctl enable firewalld

# 查看防火墙状态
systemctl status firewalld

# 查看防火墙的开机自启状态
systemctl is-enabled firewalld 
```
>更多详细的防火墙操作命令可查看：👉[【Linux】firewall-cmd之防火墙简介及命令详解【附加实战⭐建议收藏！！⭐】](https://blog.csdn.net/liu_chen_yang/article/details/126243544)👈
## 7、关闭selinux（沙盒）并配置开机禁止自启
> 为什么关闭selinux？
> 因为不关闭的话比如安装docker或者是做其他安装或启动服务会收到影响，所以一般安装好服务器都可以把他关掉。

```bash
# 查看selinux状态
getenforce

# 临时关闭selinux
setenforce 0

# 配置永久关闭selinux
vim /etc/selinux/config
# 把selinux=改为如下
SELINUX=disabled
# 重启系统生效永久关闭selinux
```
查看selinux状态分为：
* `enforcing`：系统默认，开机自启selinux；
* `permissive`：临时关闭selinux；
* `disabled`：关闭开机自启selinux，配置需要重启服务器生效；



> <center>至此Centos8操作系统和基础配置就已经完成了。</center>


## 8、IP 说明
> 默认在安装操作系统时`IP`是自动分配的，也就是`DHCP`的，如果需要配置固定ip，可看如下操作：

前提：
>配置网络配置的时候需要先看本机的ip；
>`cmd`打开输入`ipconfig`查看本机ip
>
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141035375.png)
>
>可以看出ip为`192.168.0.103`，子网掩码为：`255.255.255.0`，默认网关为：`192.168.0.1`
>那么我们配置虚拟机ip的时候就不能写：192.168.2.10之类的了，需要和本机相关；


所以，配置的内容：网关需要和本机一致：`192.168.0.1`，子网掩码也是一样的：`255.255.255.0`，ip的话可以设置：`192.168.0.1 - 192.168.0.255`

注意：
>此方法适用于`桥接模式`，如果开始设置的模式为`net模式`，则还需要到`虚拟机中`的`虚拟网络编辑器`中配置，详细配置可百度一下：[vamware虚拟机配置net网络](https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=vamware%E8%99%9A%E6%8B%9F%E6%9C%BA%E9%85%8D%E7%BD%AEnet%E7%BD%91%E7%BB%9C&oq=vamware%2520%25E8%2599%259A%25E6%258B%259F%25E6%259C%25BA%25E9%2585%258D%25E7%25BD%25AEnet%25E7%25BD%2591%25E7%25BB%259C&rsv_pq=b4c587e000002804&rsv_t=7d756RDi%2bJFRWPyxy6r1OyDYklnF8CpmmqLUVKudH2VsqL/AiNLQfDjD3Sk&rqlang=cn&rsv_enter=1&rsv_dl=tb&rsv_btype=t&inputT=221&rsv_sug3=43&rsv_sug1=33&rsv_sug7=100&rsv_sug2=0&rsv_sug4=976)
因为桥接模式，比较简便多用，不用配置`虚拟网络编辑器`，也不用在本机配置`VMware Virtual Ethernet Adapter for VMnet8`。


* 进入网卡页面：

```bash
vim /etc/sysconfig/network-scripts/ifcfg-ens33
```
* 配置网络：
```bash
TYPE=Ethernet
BOOTPROTO=static
NAME=ens33
DEVICE=ens33
ONBOOT=yes
IPADDR=192.168.0.10
NETMASK=255.255.255.0
GATEWAY=192.168.0.1
DNS1=114.114.114.114
```
* 重启网络服务 

```bash
systemctl restart NetworkManager
```
* 重启之后需要重启服务器，方可生效；

---
*  重启完之后查看网络信息 

```bash
ip a 
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141035402.png)

> 确认ip已经变成自己修改的即可；
* ping百度，测试是否可以连接网络

```bash
ping baidu.com
```
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202510141036948.png)

可以连接，那么就开始在本机ping刚刚配置的ip，如果可以ping通，这时候就可以用xshell等连接工具连接了。

> <center>IP 配置完成</center>
