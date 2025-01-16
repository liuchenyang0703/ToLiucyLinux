---
title: Linux中的日志管理
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 日志
  - 运维
pageview: false
date: 2024-12-20
comment: false
breadcrumb: false
---

<font color=teal>日志：记录系统中相关的信息	系统日志	程序日志</font>

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200948362.png)


>/var/log	一般都存在这里面
/var/log/messages	系统日志

从CentOs6开始，日志由系统中的rsyslog服务管理
日志存放在/var/log目录下

## 相关命令：

>dmesg	查看内核和硬件相关的日志<br>
last	查看用户登录的记录<br>
lastlog	查看用户最后一次登录的时间<br>
lastb	记录用户登录失败的信息<br>
logrotate	实现日志轮割

## 日志的级别（9个）：

|  |  |
|--|--|
|0 |  emerg		紧急（会导致主机系统不可用）
|1  |alert		警告（必须马上处理）
|2 | crit		严重（比较严重）
|3|  err		错误信息
|4 | warning	提醒（警告）
|5 | notice		注意
|6|  info		一般信息
|7| debug		程序或系统的调试信息
|8|  none		空，不记录日志


## 参考实例：

> 在周期计划性任务里写（crontab -e）cp file1 file1-$(date +\%Y\%m\%d) && >
> file1【在周期计划性任务中，实现把当前目录下的file1复制一份重新创建一个叫file1-时间（注意date里面的年月日..要加转义\）然后重定向清空file1】<br>
在crontab中%是有特殊含义的，表示换的意思。如果要用的话，必须进行转义\%，如经常用的date
`+%Y%m%d`在crontab中是不会执行的，应该换成date`+\%Y\%m\%d`


## syslog管理：

系统的日志由服务rsyslog管理
日志集中系统:

**<font color=blue>服务端 ：</font>**
```bash

[root@nginx-1 ~]# vim /etc/rsyslog.conf 
 15 $ModLoad imudp
 16 $UDPServerRun 514

[root@nginx-1 ~]#systemctl restart rsyslog  重启服务

#先安装yum -y install net-tools配置网络要用的比如ifconfig
[root@nginx-1 ~]#netstat -anput|grep 514  

#查看是否开放514号端口的服务 
```


**<font color=blue>客户端：</font>**

```bash
#添加服务端信息
[root@nginx-2 ~]# vim /etc/rsyslog.conf
	90 *.* @192.168.2.11:514  
	* 所有的服务 . 表示以上级别 * 所有级别 
	@ 表示UDP @@ 表示TCP   服务端ip:端口 

#重启rsyslog服务
[root@nginx-2 ~]#systemctl restart rsyslog 

#测试时使用tail -f 观察服务端/var/log/messages日志的变化
[root@nginx-2 ~]#logger "123123"  产生一条日志测试 
[root@nginx-2 ~]#tailf /var/log/messages
```



>.	记录包含该等级及以上级别的信息
.=	只记录当前等级的信息
!	除了该等级都记录





