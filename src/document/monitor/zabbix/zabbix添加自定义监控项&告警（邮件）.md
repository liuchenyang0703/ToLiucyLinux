---
title: zabbix添加自定义监控项&告警（邮件）
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

## 🏆前言
&emsp;&emsp;有的时候zabbix提供的监控项目，不能满足我们生产环境下的监控需求，此时我们就要按照zabbix的规范自定义监控项目，来达到监控的目的。

### 🥈定义监控项介绍
>监控项就是监控项目，监控指标，具体的监控内容。
>在添加主机时我们会选择关联模板，模板中自带很多监控项，但是很多时候我们需要监控的监控项模板中没有，此时需要自定义监控项。<br>
**<font color=red>自定义监控项的步骤可以分为：取值，配置，测试，添加。<br>
取值和配置在客户端进行，测试在服务端进行，添加在web页面进行</font>**

## 🥇任务

> 下面给大家举例一个：自定义监控一个进程，如果监控到该进程则不报警；如果没有监控到，则报警发送邮件；如果报警处理后，恢复监控，则通知发送邮件。
### 🥈客户端
#### 🥉取值

```bash
ps -ef | grep -v grep | grep -E cs.jar | wc -l
1
```

#### 🥉配置
在被监控端的agent配置文件中添加配置
```bash
#进入zabbix客户端
vi /etc/zabbix/zabbix_agentd.conf

#寻找UserParameter=键，监测脚本或者命令
#zabbix监控项是以键值对的形式定义的，cs为键，也就是监控项的名称，取值命令为值；
#大概在296行，添加
UserParameter=cs,ps -ef | grep -v grep | grep -E cs.jar | wc -l

#保存退出，重启客户端
systemctl restart zabbix-agent.service
```
### 🥈服务端
先看看服务端有没有安装zabbix-get这个命令，没有的话，安装一下即可

```bash
yum -y install zabbix-get
```
zabbix_get:模拟zabbix_server获取agent数据

#### 🥉测试
测试在服务端使用zabbix_get命令实现

```bash
#-s	指定客户端ip
#-k	指定客户端配置文件里设置的键
[root@localhost ~]# zabbix_get -s 192.10.2.112 -k cs
1
```
这时服务端是可以获取到客户端的值的，说明配置成功，<font color=red>配置完之后必须要重启客户端；</font>然后接下来就是添加监控项；

<font color=red>**注意：**</font>不管取到0或者1都是配置成功了，如果没有配置成功会报错：ZBX_NOTSUPPORTED: Unsupported item key.；

### 🥈web页面
#### 🥉添加监控项
1.登陆web界面，配置——主机——创建主机
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161032668.png)
 选择主机，并填写以下红框部分。<font color=red>主机名称：</font>与agent配置文件中Hostname保持一致，<font color=red>可见名称：</font>自定义，<font color=red>群组：</font>选择一个或者新建一个，<font color=red>ip地址：</font>一般为内网ip，如果需要走公网监控则填写公网ip
 ![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161032676.png)

2.监控项——创建监控项
<font color=red>主机里要选中你监控的那台客户端</font>
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161031746.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161031165.png)
按下图进行填写，最后选择添加即可
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161031032.png)
 3.查看监控项的结果
监测——最新数据
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161031817.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161031113.png)

#### 🥉添加触发器
监控项创建完我们来创建触发器
点击触发器
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161031240.png)
创建触发器
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161031912.png)
按照下图来做就可以
还是设置0比较好，>1的话有点问题。
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161031687.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161030837.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161030488.png)
恢复表达式同样，只不过结果有些不同，可以写成=1就恢复。
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161030237.png)
![](https://img-blog.csdnimg.cn/2d9cf417b68d44b683cf7469b97081b0.png)

#### 🥉添加报警媒介
管理——报警媒介类型
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161030396.png)
可以选择Email
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161030879.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161030365.png)

注意：密码不是你的163或者qq密码，是邮箱内的smtp码，这里我们来用qq邮箱来举例

#### 🥉qq邮箱生成smtp码
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161030508.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161030515.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161030993.png)
发送短信，获取授权码，返回zabbix放到密码里就ok了。
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161030781.png)
生成smtp码之后，填写密码，保存即可。

#### 🥉设置用户和报警媒介

管理——用户
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161030895.png)
用户直接用超级管理员即可
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161029919.png)
添加报警媒介
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161029356.png)
可以用qq邮箱，也可以用163邮箱
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161029130.png)
点击添加，完成
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161029937.png)
切记一定要点添加或者更新。

#### 🥉添加动作
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161029019.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161029378.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161029543.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161029233.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161029000.png)
我们来勾选Custom message，告警和恢复的主题和消息，我们放到了这两张图的下面。

故障：
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161029230.png)

恢复：
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161029075.png)


故障：
```bash
故障{TRIGGER.STATUS},服务器名:{HOST.NAME}发生: {TRIGGER.NAME}故障!

告警主机:{HOST.NAME}
告警主机IP地址:{HOST.IP}
告警时间:{EVENT.DATE} {EVENT.TIME}
告警等级:{TRIGGER.SEVERITY}
告警信息: {TRIGGER.NAME}
告警项目:{TRIGGER.KEY1}
问题详情:{ITEM.NAME}:{ITEM.VALUE}
当前状态:{TRIGGER.STATUS}:{ITEM.VALUE1}
事件ID：{EVENT.ID}
```
恢复：

```bash
恢复{TRIGGER.STATUS}, 服务器名:{HOST.NAME}: {TRIGGER.NAME}已恢复!

恢复主机:{HOST.NAME}
恢复主机IP地址:{HOST.IP}
恢复时间:{EVENT.DATE} {EVENT.TIME}
恢复等级:{TRIGGER.SEVERITY}
恢复信息: {TRIGGER.NAME}
恢复项目:{TRIGGER.KEY1}
恢复问题详情:{ITEM.NAME}:{ITEM.VALUE}
当前状态:{TRIGGER.STATUS}:{ITEM.VALUE1}
事件ID：{EVENT.ID}
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161029415.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161029174.png)

至此就配置完成，我们开始测试

## 🥇测试告警和恢复告警
为了测试我先把jar包杀掉；
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161028874.png)
等待发送邮件和告警
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161022130.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161022352.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161021449.png)
告警就成功了

接下来就是恢复告警了
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161021202.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161021888.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161021891.png)

这样整套自定义监控就完成啦，包括发送邮件告警。
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161021858.gif)

