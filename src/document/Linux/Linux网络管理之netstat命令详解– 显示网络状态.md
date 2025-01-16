---
title: Linux网络管理之netstat命令详解– 显示网络状态
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

netstat 命令用于显示各种网络相关信息，如网络连接，路由表，接口状态 (Interface Statistics)，masquerade 连接，多播成员 (Multicast Memberships) 等等。

从整体上看，netstat的输出结果可以分为两个部分：一个是Active Internet connections，称为有源TCP连接，其中”Recv-Q”和”Send-Q”指%0A的是接收队列和发送队列。这些数字一般都应该是0。如果不是则表示软件包正在队列中堆积。这种情况只能在非常少的情况见到；另一个是Active UNIX domain sockets，称为有源Unix域套接口(和网络套接字一样，但是只能用于本机通信，性能可以提高一倍)。

<font color=red>netstat命令：</font>

>netstat	查看网络连接情况

## 语法格式：

>netstat [参数]


## 常用参数：

| 参数 |参数解析  |
|--|--|
|-a	|查看所有连接端口
|-i|显示网络界面信息表单
|-p|	显示pid和进程名
|-u|	显示UDP
|-t|	显示TCP
|-n|	以数字形式显示
|-l	|显示处于监听状态的连接
|-g|显示多重广播功能群组组员名单

## 参考实例：

显示所有详细的网络端口状况：

```bash
[root@linuxcool ~]# netstat -a
```

显示当前户籍UDP连接状况：

```bash
[root@linuxcool ~]# netstat -nu
```

显示UDP端口号的使用情况：

```bash
[root@linuxcool ~]# netstat -apu 
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address  Foreign Address  State  PID/Program name    
udp        0      0 0.0.0.0:bootpc          0.0.0.0:*      4000/dhclient       
udp        0      0 localhost:323           0.0.0.0:*      3725/chronyd        
udp6       0      0 localhost:323           [::]:*         3725/chronyd 
```

显示网卡列表：

```bash
[root@linuxcool ~]# netstat -i 
Kernel Interface table 
Iface MTU Met  RX-OK  RX-ERR  RX-DRP RX-OVR  TX-OK TX-ERR TX-DRP TX-OVR Flg 
eth0 1500   0  181864   0      0       0     141278   0     0     0    BMRU 
lo   16436  0   3362    0      0       0     3362     0     0     0    LRU
```

显示组播组的关系：

```bash
[root@linuxcool ~]# netstat -g 
IPv6/IPv4 Group Memberships Interface    
RefCnt Group 
--------------- ------ --------------------- 
lo        1   ALL-SYSTEMS.MCAST.NET 
eth0      1   ALL-SYSTEMS.MCAST.NET lo       1   ff02::1 
eth0      1   ff02::1:ff0a:b0c eth0          1   ff02::1
```

显示正在监听的所有TCP端口

```bash
[root@linuxcool ~]# netstat -lnt
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State      
tcp        0      0 0.0.0.0:110             0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:143             0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:111             0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:18000           0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:9200            0.0.0.0:*               LISTEN     
```
显示正在监听的所有TCP端口及服务名称

```bash
[root@linuxcool ~]# netstat -lntp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 0.0.0.0:110             0.0.0.0:*               LISTEN      56016/dovecot       
tcp        0      0 0.0.0.0:143             0.0.0.0:*               LISTEN      56016/dovecot       
tcp        0      0 0.0.0.0:111             0.0.0.0:*               LISTEN      1602/rpcbind        
tcp        0      0 0.0.0.0:18000           0.0.0.0:*               LISTEN      127554/python3      
```
常用的命令有：

```bash
#查看所有的连接端口及服务名称
netstat -anput 
#查看所有的正在监听的TCP端口
netstat -lnt
#查看所有的正在监听的TCP端口及服务名称
netstat -lntp
#查看所有的连接端口及服务并过滤出自己想要查找的端口
netstat -[anput/lnt/lntp] | grep -w port
```

