---
title: Linux—nmap、nc命令 –网络探测工具和安全和端口扫描器
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 运维
pageview: false
date: 2024-12-19
comment: false
breadcrumb: false
---

## nmap命令

nmap (“Network Mapper(网络映射器)”) 是一款开放源代码的 网络探测和安全审核的工具。它的设计目标是快速地扫描大型网络，当然用它扫描单个 主机也没有问题。Nmap以新颖的方式使用原始IP报文来发现网络上有哪些主机，那些主机提供什么服务(应用程序名和版本)，那些服务运行在什么操作系统(包括版本信息)， 它们使用什么类型的报文过滤器/防火墙，以及一堆其它功能。虽然Nmap通常用于安全审核， 许多系统管理员和网络管理员也用它来做一些日常的工作，比如查看整个网络的信息，管理服务升级计划，以及监视主机和服务的运行。

除了所感兴趣的端口表，Nmap还能提供关于目标机的进一步信息，包括反向域名，操作系统猜测，设备类型，和MAC地址。


### 语法格式：

>nmap [参数]

### 常用参数：

|  |  |
|--|--|
|--traceroute|	扫描主机端口并跟踪路由
|-p|	扫描指定端口和端口范围
|-sP|	对目标主机进行ping扫描
|-A|	使用高级功能进行扫描
|-PE|	强制执行直接的ICMPping
|-sV	|探测服务版本信息
|-d	|增加调试信息地输出
|-PU|	发送udp ping
|-ps	|发送同步（SYN）报文

### 参考实例：

扫描主机并跟踪路由：

```bash
[root@linuxcool ~]# nmap --traceroute www.linuxcool.com
```

使用-p参数探测80、443端口：

```bash
[root@linuxcool ~]# nmap -p80,443 www.linuxcool.com
```

探测服务器的1-10000端口范围：

```bash
[root@linuxcool ~]# nmap -p1-10000 www.linuxcool.com
```

使用-A参数进行高级扫描：

```bash
[root@linuxcool ~]# nmap -A www.linuxcool.com
```


## nc命令

nc命令是一个功能打包的网络实用程序，它通过命令行在网络上读取和写入数据;nc是为NMAP项目编写的，是目前已分裂的netcat家族的顶峰,它被设计成一个可靠的后端工具，可以立即为其他用户提供网络连接应用程序和用户。nc不仅可以使用IPv4和IPv6，而且可以为用户提供无限的潜在用途。

在nc的大量功能中，有能力将nc链接在一起；TCP、UDP和到其他站点的SCTP端口；支持SSL；通过socks4或HTTP代理（带有可选代理）进行代理连接身份验证）;一些一般原则适用于大多数应用程序，因此使您能够立即向通常不支持它的软件添加网络支持。

### 语法格式：
>nc [参数]

### 常用参数：
|  |  |
|--|--|
|-l	|使用监听模式，管控传入的资料
|-p|	设置本地主机使用的通信端口
|-s	|设置本地主机送出数据包的IP地址
|-u	|使用UDP传输协议
|-v	|显示指令执行过程
|-w	|设置等待连线的时间
|-z	|使用0输入/输出模式，只在扫描通信端口时使用

### 参考实例：

扫描80端口：

```bash
[root@linuxcool ~]# nc -nvv 192.168.3.1 80
```

扫描UDP端口：

```bash
[root@linuxcool ~]# nc -u -z -w2 192.168.0.1 1-1000
```

扫描TCP端口：

```bash
[root@linuxcool ~]# nc -v -z -w2 192.168.0.3 1-100
```



