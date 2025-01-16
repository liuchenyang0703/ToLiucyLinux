---
title: Linux网络管理之hostname命令 – 显示和设置系统的主机名
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

hostname命令用于显示和设置系统的主机名称。环境变量HOSTNAME也保存了当前的主机名。

在使用hostname命令设置主机名后，系统并不会永久保存新的主机名，重新启动机器之后还是原来的主机名。如果需要永久修改主机名，需要同时修改/etc/hosts和/etc/sysconfig/network的相关内容。


## 语法格式：

>hostname [参数]

## 常用参数：

|  |  |
|--|--|
|-a	|显示主机别名
|-d|	显示DNS域名
|-f	|显示FQDN名称
|-i	|显示主机的ip地址
|-s|	显示短主机名称，在第一个点处截断
|-y|	显示NIS域名

## 参考实例：


查看主机名：

```bash
hostname		查看主机名
```
修改主机名：

```bash
hostname 主机名	修改主机名

#修改的主机名是临时生效的
永久生效：
1.修改配置文件
/etc/hostname
2.hostnamectl set-hostname 主机名
```
查看主机ip地址：


```bash
[root@linuxcool ~]# hostname -I	查看主机的ip地址
```

使用-a参数显示主机别名：

```bash
[root@linuxcool ~]# hostname -a
```

使用-i参数显示主机的ip地址：

```bash
[root@linuxcool ~]# hostname -i
```

使用-y参数显示NIS域名：

```bash
[root@linuxcool ~]# hostname -y
```


