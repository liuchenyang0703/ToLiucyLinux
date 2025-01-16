---
title: 【Linux】之【网络】相关的命令及解析[ethtool、nload、nethogs、iftop、iptraf、ifstat]
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 网络
  - 运维
pageview: false
date: 2024-12-18
comment: false
breadcrumb: false
---


## 一、网络带宽命令
### 1、ethtool – 查询与设置网卡参数
>ethtool命令用于查询ethX网口基本设置、及设置网卡的参数。

**<font color=teal>语法格式</font>**
```bash
ethtool [参数]
```
**<font color=teal>常用参数</font>**
|  参数|解析  |
|--|--|
|-i|	显示网卡驱动的信息
|-E|	修改网卡只读存储器字节
|-K|	修改网卡 Offload 的状态
|ethx|	查询ethx网口基本设置，其中 x 是对应网卡的编号，如eth0、eth1等
|-s|	修改网卡的部分配置
|-t	|让网卡执行自我检测

**<font color=teal>参考实例</font>**

查询网口基本设置：

```bash
[root@root ~]# ethtool eth0
```

查询网口的驱动相关信息：

```bash
[root@root ~]# ethtool -i eth0                                                                                        driver: e1000
version: 7.3.21-k8-NAPI
firmware-version: 
```

设置网口工作方式：

```bash
[root@root ~]# ethtool -s eth0 autoneg off speed 100 duplex full 
[root@root ~]# ethtool eth0     
```


查看网卡，在接收/发送数据时，有没有出错 ：

```bash
[root@root ~]# ethtool -S eth0      
```

停止网卡的发送模块TX:

```bash
[root@root ~]# ethtool -A tx off eth0       
```

### 2、nload – 实时统计网卡带宽使用率工具
**<font color=teal>语法格式</font>**
```bash
nload [网卡]
```
**<font color=teal>参考实例</font>**
指定监测一个网卡流量：

```bash
[root@root ~]# nload eno1
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181604595.png)

监测所有网卡的流量：
```bash
[root@root ~]# nload
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181604093.png)
按【回车健】查看下一个网卡监测情况；

**<font color=teal>字段解析</font>**
>Curr：当前流量 Avg：平均流量 Min：最小流量 Max：最大流量 Ttl：总流量

## 二、网络命令
### 1、nethogs – 实时统计网络带宽使用率工具
>nethogs是一个小型的net top工具，不像大多数工具那样拖慢每个协议或者是每个子网的速度而是按照进程进行带宽分组。NetHogs不需要依赖载入某个特殊的内核模块。如果发生了网络阻塞你可以启动NetHogs立即看到哪个PID造成的这种状况。这样就很容易找出哪个程序跑飞了然后突然占用你的带宽。


**<font color=teal>语法格式</font>**
```bash
nethogs [参数] [设备]
```
**<font color=teal>常用参数</font>**
|参数|解析  |
|--|--|
|device(s)	|要监控的设备，默认“eth0”
|-d	|以秒为单位的界面刷新频率。用于控制界面的更新速度。默认为一秒
|-v	|选择查看模式。参数mode的取值为：“0” = KB/s；“1” = total KB, “2” = total B, “3” = total MB。默认为“0”
|-p|	混杂模式的嗅探器
|-t|追踪模式
|--c	|限制刷新的次数，通常与-t选项配合使用
|-s	|根据输出中的SENT列进行排序


**<font color=teal>参考实例</font>**

设置5秒刷新一次：

```bash
[root@root ~]# nethogs -d 5 
```

监视设备（eth0）的网络带宽：

```bash
[root@root ~]# nethogs eth0
```

使用追踪模式：

```bash
[root@root ~]# nethogs -t 
```

```bash
[root@root ~]# nethogs 
Ethernet link detected
                      Waiting for first packet to arrive (see sourceforge.net bug 1019381)

NetHogs version 0.8.5

    PID USER     PROGRAM                            DEV        SENT      RECEIVED       
   2010 root     sshd: root@pts/0,pts/1,pts/2       ens33	0.129       0.059 KB/sec
      ? root     unknown TCP                                    0.000       0.000 KB/sec

  TOTAL                                                         0.129       0.059 KB/sec
```

### 2、iftop – 套接字及进程的网络利用率
>&emsp;&emsp;iftop是一款实时流量监控工具,监控TCP/IP连接等,缺点就是无报表功能。必须以root身份才能运行。
>&emsp;&emsp;iftop可测量通过每一个套接字连接传输的数据；它采用的工作方式有别于nload。iftop使用pcap库来捕获进出网络适配器的数据包，然后汇总数据包大小和数量，搞清楚总的带宽使用情况。
&emsp;&emsp;虽然iftop报告每个连接所使用的带宽，但它无法报告参与某个套按字连接的进程名称/编号（ID）。不过由于基于pcap库，iftop能够过滤流量，并报告由过滤器指定的所选定主机连接的带宽使用情况。

**<font color=teal>语法格式</font>**
```bash
iftop [参数]
```
**<font color=teal>常用参数</font>**
|  参数|解析  |
|--|--|
|-i	|指定要监控的网卡
|-n|	直接显示IP, 不进行DNS反解析

**<font color=teal>参考实例</font>**

默认监控第一块网卡的流量：

```bash
[root@root ~]# iftop 
```

监控eth1网卡的流量：

```bash
[root@root ~]# iftop -i eth1
```

直接显示IP, 不进行DNS反解析：

```bash
[root@root ~]# iftop -n
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181604811.png)


### 3、iptraf – 实时监视网卡流量
>&emsp;&emsp;iptraf是一款交互式、色彩鲜艳的IP局域网监控工具。它可以显示每个连接以及主机之间传输的数据量。
>&emsp;&emsp;iptraf命令的全拼是“IP traffic monitor”，iptraf命令可以实时地监视网卡流量，可以生成网络协议数据包信息、以太网信息、网络节点状态和ip校验和错误等信息。
&emsp;&emsp;iptraf命令支持命令行和菜单操作两种方式，当不带任何参数是iptraf命令将进入菜单操作方式，通过屏幕菜单来执行相应操作。
>
**<font color=teal>语法格式</font>**
```bash
iptraf [参数] [网卡]
```
**<font color=teal>常用参数</font>**
| 参数 |解析  |
|--|--|
|-i|	立即在指定网络接口上开启IP流量监视
|-g|	立即开始生成网络接口的概要状态信息
|-d	|在指定网络接口上立即开始监视明细的网络流量信息
|-s	|在指定网络接口上立即开始监视TCP和UDP网络流量信息
|-z	|在指定网络接口上显示包计数
|-l	|在指定网络接口上立即开始监视局域网工作站信息
|-t	|指定命令监视的时间
|-B|	将标注输出重新定向到“/dev/null”，关闭标注输入，将程序作为后台进程运行
|-f	|清空所有计数器
|-h|	显示帮助信息

**<font color=teal>参考实例</font>**

监视网卡eth0的详细流量：

```bash
[root@root ~]# iptraf -d eth0
```

监视网卡eth0的详细ip流量：

```bash
[root@root ~]# iptraf -i eth0
```

监视网卡eth0的详细tcp/udp流量：

```bash
[root@root ~]# iptraf -s eth0 
```
监视网络接口的概要状态信息：
```bash
[root@root ~]# iptraf-ng
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181604434.png)

### 4、ifstat – 统计网络信息
>&emsp;&emsp;ifstat命令就像iostat/vmstat描述其它的系统状况一样，是一个统计网络接口活动状态的工具。ifstat工具系统中并不默认安装，需要自己下载源码包，重新编译安装，使用过程相对比较简单。
&emsp;&emsp;ifstat能够以批处理式模式显示网络带宽。输出采用的一种格式便于用户使用其他程序或实用工具来记入日志和分析。


**<font color=teal>语法格式</font>**
```bash
ifstat [参数]
```
**<font color=teal>常用参数</font>**

| 参数 |解析  |
|--|--|
|-p|	优化打印
|-a|	忽略历史记录
|-e|	显示错误信息
|-r	|重置历史记录

**<font color=teal>参考实例</font>**

使用-p参数打印网络接口流量信息：

```bash
[root@root ~]# ifstat -p
```

使用-a参数忽略历史记录：

```bash
[root@root ~]# ifstat -a
```

使用-e参数显示网络接口错误信息：

```bash
[root@root ~]# ifstat -e
```

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
