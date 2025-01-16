---
title: Linux网络管理之网卡、网络接口开关设置
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


## ifup 开启网卡-激活网络接口

ifup命令用于激活指定的网络接口。ifup命令会去读取/etc/sysconfig/network-scripts/目录下的相关网络接口的配置文件，并根据配置文件的内容来激活该网络接口。

注意：网络接口名称必须是/etc/sysconfig/network-scripts/目录配置文件中设置的才可以。如果使用ifconfig命令改变了网络接口后，ifup命令就不会识别了。因为ifup命令会对比当前网络的参数与/etc/sysconfig/network-scripts/中配置文件的内容是否相符。

**<font color=teal>语法格式：</font>**
>ifup [网络接口]

**<font color=teal>参考实例：</font>**

激活网络接口eth0：

```bash
[root@linuxcool ~]# ifup eth0
```

## ifdown 关闭网卡– 禁用网络接口


ifdown命令用于禁用指定的网络接口。该命令会去读取/etc/sysconfig/network-scripts/目录下的相关网络接口的配置文件，并根据配置文件的内容来关闭该网络接口。

注意：网络接口名称必须是/etc/sysconfig/network-scripts/目录配置文件中设置的才可以。如果使用ifconfig命令改变了网络接口后，ifdown命令就不会识别了。因为ifdown命令会对比当前网络的参数与/etc/sysconfig/network-scripts/中配置文件的内容是否相符。

**<font color=teal>语法格式：</font>**
>ifdown [网络接口]

**<font color=teal>参考实例：</font>**

禁用网络接口eth0：

```bash
[root@linuxcool ~]# ifdown eth0
```


