---
title: Linux网络管理之route命令 – 显示并设置路由
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

route命令用来显示并设置linux内核中的网络路由表，route命令设置的路由主要是静态路由。要实现两个不同的子网之间的通信，需要一台连接两个网络的路由器，或者同时位于两个网络的网关来实现。

在linux系统中设置路由通常是为了解决以下问题：该linux系统在一个局域网中，局域网中有一个网关，能够让主机访问Internet，那么就需要将这台机器的ip地址设置为linux机器的默认路由。

要注意的是：直接在命令行下执行route命令来添加路由，不会永久保存。当网卡重启或者机器重启之后，该路由就失效了。可以在/etc/rc.local中添加route命令来保证该路由设置永久有效。

<font color=red>route命令：</font>

> route	路由管理命令

## 语法格式：

>route [参数]

## 常用参数：

|  |  |
|--|--|
|-A	|设置地址类型（ 默认IPv4）
|-C|	打印linux核心的路由缓存
|-v	|详细信息模式
|-n	|不执行DNS反向查找，直接显示数字形式的ip地址
|-e	|netstat格式显示路由表
|-net|	到一个网络的路由表
|-host	|到一个主机的路由表
|Add	|增加指定的路由记录
|Del	|删除指定的路由记录
|Target|	目的网络或目的主机
|gw|	设置默认网关
|mss	|设置TCP的最大区块长度（MSS），单位MB
|window|	指定通过路由表的TCP连接的TCP窗口大小
|dev	|路由记录所表示的网络接口

## 参考实例：

显示当前路由：

```bash
[root@linuxcool ~]# route
Kernel IP routing table
Destination     Gateway      Genmask        Flags Metric Ref      Use Iface
default        _gateway      0.0.0.0         UG    100    0        0 ens192
192.168.60.0    0.0.0.0      255.255.255.0   U     100    0        0 ens192
```

添加一条路由记录：

```bash
[root@linuxcool ~]# route add -net 192.168.60.11 netmask 192.168.60.1 dev ens192

[root@linuxcool ~]# route add -net 192.168.3.0 netmask 255.255.255.0 ens33
```

删除路由记录：

```bash
[root@linuxcool ~]#  route del -net 192.168.60.11 netmask 192.168.60.1 dev ens192 

[root@linuxcool ~]# route del -net 192.168.3.0 netmask 255.255.255.0 ens33
```

添加和删除默认网关：

```bash
[root@linuxcool ~]# route add default gw 192.168.60.1
[root@linuxcool ~]# route del default gw 192.168.60.1
```

