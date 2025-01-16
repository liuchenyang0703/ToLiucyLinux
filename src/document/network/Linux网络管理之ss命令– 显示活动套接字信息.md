---
title: Linux网络管理之ss命令– 显示活动套接字信息
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
ss是Socket Statistics的缩写。ss命令用来显示处于活动状态的套接字信息。它可以显示和netstat类似的内容。但ss的优势在于它能够显示更多更详细的有关TCP和连接状态的信息，而且比netstat更快速更高效。


## 语法格式：

>ss [参数]

## 常用参数：

|  |  |
|--|--|
|-n|	不解析服务名称，已数字方式显示
|-a	|显示所有套接字
|-l	|显示处于监听状态的套接字
|-o|	显示计时器信息
|-e|	显示详细的套接字信息
|-m	|显示套接字的内存使用情况
|-p	|显示使用套接字的进程
|-i	|显示内部的TCP信息
|-s	|显示套接字使用概况
|-4	|仅显示ipv4的套接字
|-6	|仅显示ipv6的套接字
|-0	|显示PACKET套接字
|-t	|只显示TCP套接字
|-u	|只显示UDP套接字
|-d|	只显示DCCP套接字
|-w	|只显示RAW套接字
|-x	|只显示 Unix套接字
|-D|将原始TCP套接字信息转储到文件


## 参考实例：

显示TCP套接字：

```bash
[root@linuxcool ~]# ss -t -a 
State     Recv-Q     Send-Q     Local Address:Port     Peer Address:Port   
LISTEN    0          128        0.0.0.0:ssh            0.0.0.0:*                                
ESTAB     0          52         192.168.60.19:ssh      192.168.30.21:59321               
LISTEN    0          128        *:websm                *:*               
LISTEN    0          128        [::]:ssh               [::]:* 
```

显示UDP套接字：

```bash
[root@linuxcool ~]# ss -u -a
State     Recv-Q     Send-Q     Local Address:Port     Peer Address:Port              
UNCONN    0          0          0.0.0.0:bootpc         0.0.0.0:*                 
UNCONN    0          0          127.0.0.1:323          0.0.0.0:*                 
UNCONN    0          0          [::1]:323              [::]:*  
```

显示套接字使用概况：

```bash
[root@linuxcool ~]# ss -s
Total: 185
TCP:   4 (estab 1, closed 0, orphaned 0, timewait 0)
Transport Total     IP        IPv6
RAW       1         0         1        
UDP       3         2         1        
TCP       4         2         2        
INET      8         4         4        
FRAG      0         0         0        
```
