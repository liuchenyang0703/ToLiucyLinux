---
title: Linux周期性计划任务和任务调度以及举例
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 运维
pageview: false
date: 2024-12-20
comment: false
breadcrumb: false
---



## 一次性计划任务：at

启动：systemctl start atd<br>
|  |  |
|--|--|
| at|	设置一次性计划任务
|atq	|查询系统中一次性任务
|atrm |	删除一次性计划任务

## 周期性计划任务：crond

|  |  |
|--|--|
|crontab -e|	进入执行命令的编辑模式
|crontab -l|		查看周期性计划任务
|crontab -r|	删除周期性计划任务

设置永久的周期性计划任务：vim /etc/crontab
进入vim /etc/crontab 编辑，保存退出即可；

## 重点：

|字段|说明  |
|--|--|
| 分 | 取值为0~59的整数 |
|时|取值为0~23的任意整数
|日|取值为1~31的任意整数
|月|取值为1~12的任意整数
|周|取值为0~6的任意整数，0代表星期日

<font color=teal>语法：</font>

> 分 时 日 月 周 用户 要执行的命令
> \* * * * * root 命令

<font color=green>举例：</font>


> <font color=blue>1.每周三清空一下/var/ftp目录</font>
0 0 * * 3 root rm -rf /var/ftp/*<br>
 <font color=blue>2.每月的第一个周一凌晨2点30对/var/www/html/进行打包</font>
30 2 1-7 * 1 root  tar -cvzf backup.tar.gz /var/www/html<br>
 <font color=blue>3.每月1日，重启一次httpd服务</font>
0 0 1 * *  root systemctl restart httpd<br>
 <font color=blue>4.每一分钟删除一个文件</font>
 \* * * * * root rm -rf /root/abc.txt<br>
 <font color=blue>5.每两分钟删除一个目录</font>
 */2 * * * * root rm -rf /appliaction/ceshi<br>
  <font color=blue>6.每2周查找目录并删除</font>
 \* * * * */2 root find / -name test -type d | xargs rm -rf

<font color=teal>补充：</font>
uid	用户的唯一标识
gid	用户组的唯一标识
uuid	设备的唯一标识
pid	进程的唯一标识


## 任务调度：

```bash
&	将命令放入后台运行
jobs	查看后台任务
jobs -l	查看后台进程的pid
fg 序号	将后台任务调度到前台
ctrl+z	将前台任务暂停放到后台
bg 序号	将后台暂停的任务继续执行
ctrl+c	中断前台执行的任务
```

## 推荐：周期性计划任务时间生成地址★
>[crontab工具在线生成器](https://www.box3.cn/page/crontab.html)





