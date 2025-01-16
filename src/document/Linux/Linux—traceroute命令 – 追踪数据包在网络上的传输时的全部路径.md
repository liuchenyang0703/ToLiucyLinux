---
title: Linux—traceroute命令 – 追踪数据包在网络上的传输时的全部路径
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

traceroute命令用于追踪数据包在网络上的传输时的全部路径，它默认发送的数据包大小是40字节。通过traceroute我们可以知道信息从你的计算机到互联网另一端的主机是走的什么路径。当然每次数据包由某一同样的出发点（source）到达某一同样的目的地(destination)走的路径可能会不一样，但基本上来说大部分时候所走的路由是相同的。

traceroute通过发送小的数据包到目的设备直到其返回，来测量其需要多长时间。一条路径上的每个设备traceroute要测3次。输出结果中包括每次测试的时间(ms)和设备的名称（如有的话）及其ip地址。



> traceroute	跟踪路由


## 语法格式：

>traceroute [参数] [域名或者IP]


## 常用参数：

|  |  |
|--|--|
|-d	|使用Socket层级的排错功能
|-f<存活数值>|	设置第一个检测数据包的存活数值TTL的大小
|-F	|设置勿离断位
|-g<网关>	|设置来源路由网关，最多可设置8个
|-i<网络界面>|	使用指定的网络界面送出数据包
|-I|	使用ICMP回应取代UDP资料信息
|-m<存活数值>	|设置检测数据包的最大存活数值TTL的大小
|-n|	直接使用IP地址而非主机名称
|-p<通信端口>	|设置UDP传输协议的通信端口
|-r|	忽略普通的Routing Table，直接将数据包送到远端主机上
|-s<来源地址>	|设置本地主机送出数据包的IP地址
|-t<服务类型>	|设置检测数据包的TOS数值
|-v|	详细显示指令的执行过程
|-w|	设置等待远端主机回报的时间
|-x|	开启或关闭数据包的正确性检验

## 参考实例：

追踪本地数据包到www.linuxprobe.com的传输路径：

```bash
[root@linuxcool ~]# traceroute www.linuxprobe.com
```

跳数设置：

```bash
[root@linuxcool ~]# traceroute -m 7 www.linuxprobe.com
```

显示IP地址，不查主机名 ：

```bash
[root@linuxcool ~]# traceroute -n www.linuxprobe.com
```

把探测包的个数设置为值4：

```bash
[root@linuxcool ~]# traceroute -q 4 www.linuxprobe.com
```

把对外发探测包的等待响应时间设置为3秒：

```bash
[root@linuxcool ~]# traceroute -w 3 www.linuxprobe.com
```


