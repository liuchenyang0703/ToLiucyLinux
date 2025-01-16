---
title: Linux网络管理之ip命令 – 显示与操作路由
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

ip命令用来显示或操纵Linux主机的路由、网络设备、策略路由和隧道，是Linux下较新的功能强大的网络配置工具。

**<font color=red>ip命令：</font>**

>ip	网络管理命令
ip a	查看网卡信息
ip l	查看网络连接情况

## 语法格式：

> ip [参数]

## 常用参数：

|  |  |
|--|--|
|-s|	输出更详细的信息
|-f	|强制使用指定的协议族
|-4|	指定使用的网络层协议是IPv4协议
|-6|	指定使用的网络层协议是IPv6协议
|-r|	显示主机时，不使用IP地址，而使用主机的域名


## 参考实例：

用ip命令显示网络设备的运行状态:

```bash
[root@linuxcool ~]# ip link list
```
使用-s参数输出更详细的信息：

```bash
[root@linuxcool ~]# ip -s link list
```

显示核心路由表：

```bash
[root@linuxcool ~]# ip route list
[root@linuxcool ~]# ip route show
```

显示邻居路由表：

```bash
[root@linuxcool ~]# ip neigh list
[root@linuxcool ~]# ip neigh show
```
