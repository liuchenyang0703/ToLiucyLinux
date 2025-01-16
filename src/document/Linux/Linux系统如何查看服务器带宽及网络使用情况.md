---
title: Linux系统如何查看服务器带宽及网络使用情况
icon: circle-info
order: 1
category:
  - Linux
  - 网络
tag:
  - Linux
  - 网络
  - 宽带
  - 运维
pageview: false
date: 2024-12-20
comment: false
breadcrumb: false
---

## 前言
&emsp;&emsp;**操作系统：** Linux
&emsp;&emsp;**操作环境：** Centos7

> &emsp;&emsp;Linux系统中如何查看服务器带宽？本篇文章主要和大家分享一下Linux系统中查看服务器带宽的方法，有需要的朋友可以参考一下。

众多网络相关的命令可查看：[【Linux】之【网络】相关的命令及解析[ethtool、nload、nethogs、iftop、iptraf、ifstat]](https://blog.csdn.net/liu_chen_yang/article/details/125146080?spm=1001.2014.3001.5501)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200956824.gif)


## linux查看服务器带宽具体方法
### 一、使用speedtest-cli命令查看下载和上传最大流量值

因为命令是python的，所以，需要先下载一个python，用pip下载次命令；
```bash
yum -y install python-pip

#等待下载完

pip install speedtest-cli
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200956950.png)

```bash
root@cs:[/root]speedtest-cli 
Retrieving speedtest.net configuration...
Testing from China Unicom (125.119.20.3)...
Retrieving speedtest.net server list...
Selecting best server based on ping...
Hosted by China Telecom TianJin-5G (TianJin) [123.83 km]: 47.213 ms
Testing download speed................................................................................
Download: 16.36 Mbit/s
Testing upload speed................................................................................................
Upload: 18.58 Mbit/s
```

### 二、查看网卡、网络的详情

#### 1.查看服务器网络端口

```bash
ifconfig
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200956670.png)


#### 2.ethtool命令查看宽带大小

```bash
ethtool 网卡名称
```

```bash
[root@222 ~]# ethtool eno1
Settings for eno1:
	Supported ports: [ TP ]
	Supported link modes:   10baseT/Half 10baseT/Full 
	                        100baseT/Half 100baseT/Full 
	                        1000baseT/Full 
	Supported pause frame use: No
	Supports auto-negotiation: Yes
	Supported FEC modes: Not reported
	Advertised link modes:  10baseT/Half 10baseT/Full 
	                        100baseT/Half 100baseT/Full 
	                        1000baseT/Full 
	Advertised pause frame use: No
	Advertised auto-negotiation: Yes
	Advertised FEC modes: Not reported
	Speed: 100Mb/s
	Duplex: Full
	Port: Twisted Pair
	PHYAD: 1
	Transceiver: internal
	Auto-negotiation: on
	MDI-X: off (auto)
	Supports Wake-on: pumbg
	Wake-on: g
	Current message level: 0x00000007 (7)
			       drv probe link
	Link detected: yes
```
Speed: 100Mb/s 带宽为白兆

### 三、nload命令实时统计网卡带宽使用率

没有nload命令的需要下载；
```bash
yum -y install nload

#等待下载完

#直接使用命令查看
nload
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200956057.png)

```bash
#指定网卡进入
nload eno1
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200956299.png)
>&emsp;&emsp;Incoming是进入网卡的流量，Outgoing是从这块网卡出去的流量，每一部分都有下面几个。<br/>
>Curr：当前流量
> Avg：平均流量 
> Min：最小流量 
> Max：最大流量
>  Ttl：总流量

### 四、dstat -n命令实时监测网络的状态

```bash
dstat -n
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200956579.png)

## 总结
## &emsp;相关文章

>💻[【Linux】之【CPU】相关的命令及解析[lscpu、mpstat]](https://blog.csdn.net/liu_chen_yang/article/details/125143646)
>
>--------------------------
>💻[【Linux】之【内存】相关的命令&&解析以及内存相关的问题[free、meminfo、内存泄漏、内存溢出、Overcommit]](https://blog.csdn.net/liu_chen_yang/article/details/125146057)
>
>--------------------------
>💻[【Linux】之【磁盘】相关的命令及解析[df、du、iostat、iotop]](https://blog.csdn.net/liu_chen_yang/article/details/125256901?spm=1001.2014.3001.5501)
>
>--------------------------
>💻[【Linux】之【网络】相关的命令及解析[ethtool、nload、nethogs、iftop、iptraf、ifstat]](https://blog.csdn.net/liu_chen_yang/article/details/125146080)
>
>--------------------------
>💻[【Linux】综合性命令及解析【top、htop、vmstat、dstat、glances、sar】](https://blog.csdn.net/liu_chen_yang/article/details/125146126)
>
>--------------------------
>💻[【Linux】系统如何查看服务器带宽及网络使用情况](https://blog.csdn.net/liu_chen_yang/article/details/125169987)
>
>--------------------------

