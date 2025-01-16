---
title: Linux—watch命令详解– 周期性执行命令
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

## 前言

&emsp;&emsp;watch命令以周期性的方式执行给定的指令，指令输出以全屏方式显示。watch是一个非常实用的命令，基本所有的Linux发行版都带有这个小工具，如同名字一样，watch可以帮你监测一个命令的运行结果，省得你一遍遍的手动运行。

### 语法格式

>watch [参数] [命令]


### 常用参数
|  |  |
|--|--|
|-n/--interval	|watch默认每2秒运行一下程序，可以用-n或-interval来指定间隔的时间
|-d/--differences|	用-d或--differences 选项watch 会高亮显示变化的区域。 而-d=cumulative选项会把变动过的地方(不管最近的那次有没有变动)都高亮显示出来
|-t/--no-title	|关闭watch命令在顶部的时间间隔、命令、当前时间的输出
|-h/--help	|查看帮助文档

### 参考实例

实时查看显存占用情况：(0.1秒刷新一次)

```bash
[root@linuxcool ~]# watch -n 0.1 nvidia-smi
```

重复执行uptime命令：

```bash
[root@linuxcool ~]# watch uptime
```

每隔一秒高亮显示网络链接数的变化情况：

```bash
[root@linuxcool ~]# watch -n 1 -d netstat -ant
```

每10秒一次输出系统的平均负载：

```bash
[root@linuxcool ~]# watch -n 10 'cat /proc/loadavg'
```

监测磁盘inode和block数目变化情况：

```bash
[root@linuxcool ~]# watch -n 1 "df -i;df"
```

监测当前目录中test.txt文件的变化：

```bash
[root@linuxcool ~]# watch -d 'ls -l|grep test.txt'
```



