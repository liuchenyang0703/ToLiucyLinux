---
title: Linux su命令 – 切换用户、用户提权
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


su命令用于切换当前用户身份到指定用户或者以指定用户的身份执行命令或程序。

普通用户切换到root用户，可以使用su -- 或su root,但是必须输入root密码才能完成切换。root用户切换到普通用户，可以使用su username,不需要输入任何密码即可完成切换。



## su与sudo

su	切换用户
sudo -	随用户更改环境变量

## 语法格式: 

>su [选项] [用户名]

## 常用参数：

|  |  |
|--|--|
|-c或--command	|执行完指定的指令后，即恢复原来的身份
|-f或--fast|	适用于csh与tsch，使shell不用去读取启动文件
|-l或--login|	改变身份时，也同时变更工作目录，以及HOME,SHELL,USER,logname,此外，也会变更PATH变量
|-m,-p或--preserve-environment|	变更身份时，不要变更环境变量
|-s或--shell	|指定要执行的shell
|--help|	显示帮助信息
|--version	|显示版本信息

## 参考实例：

切换到linuxcool用户，但环境变量仍然是root用户的：

>[root@linuxcool ~]# su linuxcool

切换到linuxcool用户，并改变为linuxcool用户环境变量：

>[root@linuxcool ~]# su - linuxcool  

变更帐号为 root 并传入 -f 参数给新执行的 shell：

>[root@linuxcool ~]# su root -f

##  用户提权：

visudo	编辑sudo配置文件
root	用户（用户不带%）
%wheel	用户组（组带%）

> sudo -i	切换到root用户



