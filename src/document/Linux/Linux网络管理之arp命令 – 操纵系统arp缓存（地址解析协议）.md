---
title: Linux网络管理之arp命令 – 操纵系统arp缓存（地址解析协议）
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


arp命令的英文全拼“Address Resolution Protocol” 。该命令用于操作主机的arp缓存，它可以显示arp缓存中的所有条目、删除指定的条目或者添加静态的ip地址与MAC地址对应关系。

## 语法格式：

>arp [参数] [IP]

## 常用参数：

|  |  |
|--|--|
|-a|	显示arp缓存的所有条目，主机位可选参数
|-H|	指定arp指令使用的地址类型
|-d|	从arp缓存中删除指定主机的arp条目
|-D|	使用指定接口的硬件地址
|-e|	以linux的显示风格显示arp缓存中的条目
|-i	|指定要操作arp缓存的网络接口
|-n|	以数字方式显示arp缓存中的条目
|-v|	显示详细的arp缓存条目，包括缓存条目的统计信息
|-f|	设置主机的IP地址与MAC地址的静态映射

## 参考实例：

显示本机arp缓存中所有记录：

```bash
[root@linuxcool ~]# arp
Address       HWtype     HWaddress         Flags Mask          Iface    
gateway       ether      00:03:0f:81:6b:f1    C                ens160
```


以数字方式显示指定主机arp缓存条目：

```bash
[root@linuxcool ~]# arp -n 192.168.60.1
Address           HWtype  HWaddress           Flags Mask         Iface
192.168.60.1      ether   00:03:0f:81:6b:f1   C                  ens160
```

删除接口eth1上的192.168.60.1的arp表中的项：

```bash
[root@linuxcool ~]# arp -i eth1 -d 192.168.60.1
```

使用eth1的MAC地址回答eth0上的192.168.60.2的arp请求：

```bash
[root@linuxcool ~]# arp -i eth0 -Ds 192.168.60.2 eth1 pub
```




