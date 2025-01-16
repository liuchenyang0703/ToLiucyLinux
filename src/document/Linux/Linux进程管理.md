---
title: Linux进程管理
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



程序：存放在磁盘中的静态代码（文件）
进程：在内存中允许运行的程序，动态的状态
进程是资源调度最小的单位
线程：线程是存在在进程中的
线程（thread）是任务执行的最小单位

进程间资源隔离，线程间资源共用

## ps命令：

|ps|静态查看进程信息  |
|--|--|
|ps aux|	查看进程信息(a是all全部，u是用户，x是详细信息)
|ps elf	|详细查看进程
|ps -o	|指定内容输出
|ps -o tid	|查看线程
|ps -u	|指定用户	


<font color=teal>使用方法：</font>


>查看进程过滤出nginx的进程：
> ps -ef | grep nginx


## netstat命令：

|netstat| 	查看网络连接情况 |
|----------------|--|
|-a|	查看所有链接
|-p|	显示pid和进程名
|-u	|显示UDP
|-t	|显示TCP
|-n|	以数字形式显示
|-l	|显示处于监听状态的连接

<font color=teal>使用方法：</font>

> 查看端口，并过滤出自己想找的端口
> netstat -anput | grep 8099

## top命令：
> top	动态查看进程信息<br>
uptime	查看top第一行<br>
lscpu	查看cpu负载的核数<br>
load average: 0.00, 0.01, 0.05
系统1分钟，5分钟，15分钟平均负载<br>
%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni,100.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
CPU使用情况<br>
进程需要占用系统资源（cpu，内存，磁盘，网络，显卡）<br>
> CPU密集型
IO密集型<br>
>us	用户态CPU
sy	内核态CPU
ni	优先级
id	空闲的CPU
wa	等待输入输出设备的CPU
hi	硬中断
si	软中断
st	虚拟化占用CPU资源<br>
KiB Mem :   995896 total,   487280 free,   121580 used,   387036 buff/cache<br>
buff	写缓冲	解决空间问题
cache	读缓存	解决速率问题

## renice优先级：

renice	调整运行进程的优先级
<font color=teal>renice -n 优先级等级 pid	进程优先级命令/程序</font>
只有root用户可以设置负值

nice	设置进程运行时的优先级



<font color=red>linux系统中进程状态：</font>
|  |  |
|--|--|
|R|	运行中的进程
|S	|睡眠状态（可以中断）
|D|	不可中断的，通常发生在IO操作
|Z	|僵尸进程
|T	|表示停止状态
|X	|退出状态
|W|	正在换页
|<|	高优先级
|N	|低优先级
|s	|表示该进程下有子进程
|l|	多线程 
|+	|前台运行的进程

## 僵尸进程：

<font color=blue>什么是僵尸进程：</font>

> 子进程结束，父进程没有回收子进程

<font color=blue>解决僵尸进程：</font>
> 1.重新启动系统
2.杀死父进程，将僵尸进程变为孤儿进程，此时孤儿进程由系统中的systemd接管，会自动清理。
<br>
kill -9 pid	<font color=daaafns>根据进程的pid强制杀死某个进程</font>

父进程派生子进程

<font color=teal>pstree	查看进程树</font>

<font color=teal>yum provides pstree	直接下载不了pstree，就可以利用这个命令找到pstree是哪个包</font>

## 结束（杀死）进程：

> kill PID	杀进程
killall 进程名	根据进程名杀进程
pkill	根据条件杀进程

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191617772.png)

|kill -l	| 查看进程的所有进程 |
|-----------------|--|
|kill -1	|HUP挂起进程
|kill -2	|INT中断进程（与ctrl+c以一样）
|kill -3	|QUIT退出
|kill -9	|KILL强制杀进程
|kill -15	|TERM终止进程
|kill -18	|CONT继续进程
|kill -19|	STOP暂停进程

<font color=teal>常用的杀进程是：</font>

> kill -9 进程pid


## pgrep命令：

|pgrep	| 根据特定条件查进程 |
|---------------|--|
|-l	|根据进程名查进程的PID
|-u	|根据用户名或用户id查进程的pid

<font color=teal>pidof 进程名	根据进程查进程号</font>


