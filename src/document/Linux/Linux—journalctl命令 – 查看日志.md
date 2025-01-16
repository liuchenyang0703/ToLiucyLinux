---
title: Linux—journalctl命令 – 查看日志
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

Systemd统一管理所有 Unit 的启动日志。带来的好处就是可以只用journalctl一个命令，查看所有日志（内核日志和 应用日志）。


>journalctl 查看所有日志

## 语法格式：

>  journalctl [参数]

## 常用参数：

|  |  |
|--|--|
|-k	|查看内核日志
|-b	|查看系统本次启动的日志
|-u	|查看指定服务的日志
|-n	|指定日志条数
|-f|追踪日志
|_PID|	根据进程id查
|-p	|根据级别查看
|- -since	|查看指定时间的日志
|- -disk-usage|	查看当前日志占用磁盘的空间的总大小


## 参考实例：

查看所有日志：

```bash
[root@linuxcool ~]# journalctl 
```

查看内核日志：

```bash
[root@linuxcool ~]# journalctl -k 
```

查看系统本次启动的日志：

```bash
[root@linuxcool ~]# journalctl -b 
```

查看httpd的日志：

```bash
[root@linuxcool ~]# journalctl -u httpd
```

查看最近发生的20条日志：

```bash
[root@linuxcool ~]# journalctl -n 20
```

追踪日志：

```bash
[root@linuxcool ~]# journalctl -f
```


