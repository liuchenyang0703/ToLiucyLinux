---
title: Linux网络管理之ifconfig命令 – 显示或设置网络设备
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

ifconfig命令的英文全称是“network interfaces configuring”，即用于配置和显示Linux内核中网络接口的网络参数。用ifconfig命令配置的网卡信息，在网卡重启后机器重启后，配置就不存在。要想将上述的配置信息永远的存的电脑里，那就要修改网卡的配置文件了。

**<font color=red>ifconfig命令：</font>**

>ifconfig	查看或管理网络信息
ifconfig ens33	查看ens33信息
ifconfig ens33 192.168.2.100/24

## 语法格式：

>ifconfig [参数]

## 常用参数：

|  |  |
|--|--|
|add<地址>	|设置网络设备IPv6的IP地址
|del<地址>|删除网络设备IPv6的IP地址
|down	|关闭指定的网络设备
|up	|启动指定的网络设备
|IP地址|	指定网络设备的IP地址

## 参考实例：

显示网络设备信息：

```bash
[root@linuxcool ~]# ifconfig
eth0   Link encap:Ethernet HWaddr 00:50:56:0A:0B:0C       
       inet addr:192.168.0.3 Bcast:192.168.0.255 Mask:255.255.255.0
       inet6 addr: fe80::250:56ff:fe0a:b0c/64 Scope:Link     
       UP BROADCAST RUNNING MULTICAST MTU:1500 Metric:1      
       RX packets:172220 errors:0 dropped:0 overruns:0 frame:0      
       TX packets:132379 errors:0 dropped:0 overruns:0 carrier:0 
       collisions:0 txqueuelen:1000       
       RX bytes:87101880 (83.0 MiB) TX bytes:41576123 (39.6 MiB) 
       Interrupt:185 Base address:0x2024  
lo    Link encap:Local Loopback       
      inet addr:127.0.0.1 Mask:255.0.0.0      
      inet6 addr: ::1/128 Scope:Host      
      UP LOOPBACK RUNNING MTU:16436 Metric:1      
      RX packets:2022 errors:0 dropped:0 overruns:0 frame:0      
      TX packets:2022 errors:0 dropped:0 overruns:0 carrier:0   
      collisions:0 txqueuelen:0       
      RX bytes:2459063 (2.3 MiB) 
      TX bytes:2459063 (2.3 MiB)
```

启动关闭指定网卡：

```bash
[root@linuxcool ~]# ifconfig eth0 down
[root@linuxcool ~]# ifconfig eth0 up 
```

为网卡配置和删除IPv6地址：

```bash
[root@linuxcool ~]# ifconfig eth0 add 33ffe:3240:800:1005::2/64
[root@linuxcool ~]# ifconfig eth0 del 33ffe:3240:800:1005::2/64
```

用ifconfig修改MAC地址：

```bash
[root@linuxcool ~]# ifconfig eth0 down
[root@linuxcool ~]# ifconfig eth0 hw ether 00:AA:BB:CC:DD:EE
[root@linuxcool ~]# ifconfig eth0 up
[root@linuxcool ~]# ifconfig eth1 hw ether 00:1D:1C:1D:1E 
[root@linuxcool ~]# ifconfig eth1 up
```

配置IP地址：

```bash
[root@linuxcool ~]# ifconfig eth0 192.168.1.56 
[root@linuxcool ~]# ifconfig eth0 192.168.1.56 netmask 255.255.255.0
[root@linuxcool ~]# ifconfig eth0 192.168.1.56 netmask 255.255.255.0 broadcast 192.168.1.255
```

