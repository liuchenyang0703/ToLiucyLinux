---
title: 【Linux】zabbix告警执行远程脚本报错Unsupported item key.问题汇总及解决方式
icon: circle-info
order: 1
category:
  - Linux
  - zabbix
  - 服务器监控
tag:
  - Linux
  - zabbix
  - 服务器监控
  - 运维
pageview: false
date: 2024-12-16
comment: false
breadcrumb: false
---

>🍁**博主简介**
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>


使用zabbix监控时，有时需要直接监控如果告警则执行某个程序；
但是远程命令执行的时候出现了报错：<font color=red>Unsupported item key.</font>；这种报错有以下几中整理出来的可能原因；

## 1、修改自定义脚本未重启客户端
有时候使用自定义脚本监控，自动修改了zabix-agentd.conf之后，并没有将其重新启动，会有这个报错；
<font color=teal>解决方法：重启zabbix-agent</font>

```bash
systemctl restart zabbix-agent.service
```
## 2、未开启zabbix的通信端口
使用zabbix监控服务器时，由于zabbix agent与zabbix server通过10050端口通信。server端侦听在10051端口，客户端侦听在10050端口，所以我们要将端口暴露出来。有时服务器并没有将10050端口开启，进而导致报错。
首先我们可以使用命令iptables -nL查看其是否开启，没有开启，将其开启即可。
开启命令：

```bash
 #172.16.11.202是你的zabbix server的ip地址
iptables -I INPUT -p tcp -s 172.16.11.202 -m tcp --dport 10050 -m comment --comment "zabbix_agentd listen 10050" -j ACCEPT
```
## 3、Item的超时时间
使用Zabbix的时候往往会自定义Item。但是经常会遇到自定义的Item动不动就Not Supported了。其实原因很简单。Zabbix Agent默认的超时时间是3秒。往往我们自定义的Item由于各种原因返回时间会比较长。所以建议统一修改一个适合自己实际的值。
修改操作如下：

```bash
vim /etc/zabbix/zabbix_agent.conf

#Range: 1-30
Timeout=30
```
修改完毕后重启zabbix-agent即可；

## 4、zabbix_agentd与item_key版本不兼容
zabbix_agentd版本兼容性导致item_key不支持的故障；
有可能是自己升级了客户端或者服务端导致两个端口版本不一致，进而产生错误。
解决版本;升级客户端或者服务端到相同的版本；

## 5、未开启远程执行操作命令的配置
首先要实现远程执行命令的话需要开启agent端配置文件里的EnableRemoteCommands=1的参数

如果不改的话 当触发报警同时 会发现执行命令失败而报这Unsupported item key.错；

```bash
vim /etc/zabbix/zabbix_agentd.conf

#启用远程命令
EnableRemoteCommands=1
```
开启远程命令，重启服务再次测试即可；


## 附加+
如有遇到执行命令报错Permission denied表示没有权限执行当前命令；
这个时候需要使用visudo 去增加zabbix 使用sudo 切换到root用户的权限zabbix  ALL=(ALL)       NOPASSWD:ALL

```bash
visudo

zabbix  ALL=(ALL)       NOPASSWD:ALL
```
更改完再次测试即可；
