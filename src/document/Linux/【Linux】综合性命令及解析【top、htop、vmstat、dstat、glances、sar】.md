---
title: 【Linux】综合性命令及解析【top、htop、vmstat、dstat、glances、sar】
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 性能
  - 运维
pageview: false
date: 2024-12-18
comment: false
breadcrumb: false
---

## 一、top – 实时显示系统运行状态

>&emsp;&emsp;top命令的功能是用于实时显示系统运行状态，包含处理器、内存、服务、进程等重要资源信息。运维工程师们常常会把top命令比作是“加强版的Windows任务管理器”，因为除了能看到常规的服务进程信息以外，还能够对处理器和内存的负载情况一目了然，实时感知系统全局的运行状态，非常适合作为接手服务器后执行的第一条命令。<br>
>&emsp;&emsp;动态查看进程信息，并且可以查看到系统负载，内存，CPU等使用情况。

**<font color=teal>语法格式</font>**
```bash
top [参数]
```
**<font color=teal>常用参数</font>**
| 参数 |解析  |
|--|--|
|-d <秒>|	改变显示的更新速度
|-c |	切换显示模式，更详细的显示路径及命令
|-s|	安全模式，不允许交互式指令
|-i	|不显示任何闲置或僵死的行程
|-n	|设定显示的总次数，完成后将会自动退出
|-b	|批处理模式，不进行交互式显示
|-p |指定某个pid来动态查看


**<font color=teal>常用交互参数</font>**

```bash
P：以CPU的使用资源排序显示
M：以内存的使用资源排序显示
N：以pid排序显示
T：由进程使用的时间累计排序显示
k：给某一个pid一个信号。可以用来杀死进程
r：给某个pid重新定制一个nice值（即优先级）
q：退出top（用ctrl+c也可以退出top）。
```



**<font color=teal>参考实例</font>**

以默认格式显示系统运行信息：

```bash
[root@root ~]# top
top - 02:48:56 up 20 min,  1 user,  load average: 0.00, 0.00, 0.04
Tasks: 432 total,   1 running, 431 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.0 us,  0.0 sy,  0.0 ni, 99.9 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 s
MiB Mem :   1966.1 total,    172.1 free,   1339.3 used,    454.7 buff/cache
MiB Swap:   2048.0 total,   2033.5 free,     14.5 used.    443.4 avail Mem 

   PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND                                
  2848 root      20   0  177712  28820   7700 S   6.2   1.4   0:01.31 sssd_kcm                   
     1 root      20   0  244748  14180   9052 S   0.0   0.7   0:01.10 systemd                    
     2 root      20   0       0      0      0 S   0.0   0.0   0:00.01 kthreadd  
………………省略部分输出信息………………
```

以默认格式显示系统运行信息，但提供完整的进程路径及名称：

```bash
[root@root ~]# top -c    
```

以批处理模式显示程序信息：

```bash
[root@root ~]# top -b
```

设定每隔5秒刷新一次信息：

```bash
[root@root ~]# top -c -d 5
```

设定总显示次数为3回，随后自动退出命令：

```bash
[root@root ~]# top -n 5
```

top -p: 指定pid 多个pid以‘逗号’分开，只显示指定pid进程的状态

```bash
[root@root ~]# top -c -p 5112,8891
```

**<font color=teal>字段解析</font>**

><font color=red>load average: 0.00, 0.01, 0.05</font>
>系统1分钟，5分钟，15分钟平均负载<br><br>
><font color=red>%Cpu(s): 0.0 us, 0.0 sy, 0.0 ni,100.0 id, 0.0 wa, 0.0 hi, 0.0 si, 0.0 st</font>
>us 用户态CPU
sy 内核态CPU
ni 优先级
id 空闲的CPU
wa 等待输入输出设备的CPU
hi 硬中断
si 软中断
>st 虚拟化占用CPU资源<br><br>
><font color=red>KiB Mem : 995896 total, 487280 free, 121580 used, 387036 buff/cache</font>
>total 总内存空间
free 空闲内存
used 已使用内存
buff 写缓冲 解决空间问题
cache 读缓存 解决速率问题

**<font color=teal>top进程信息</font>**

如下图

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181623269.png)

**进程参数含义**
|参数  |  含义/解析|
|--|--|
|PID	|进程id
|USER	|哪个用户启动的这个进程	
|PR	|优先级
|NI	|nice值。负值表示高优先级，正值表示低优先级
|VIRT	|进程使用的虚拟内存总量，单位kb。VIRT=SWAP+RES
|RES|此进程占用的内存大小，是总内存*%MEM得出的结果
|SHR	|共享内存大小，单位kb
|S	|进程状态。D=不可中断的睡眠状态 R=运行 S=睡眠 T=跟踪/停止 Z=僵尸进程
|%CPU|	上次更新到现在的CPU时间占用百分比；100%等于1核CPU
|%MEM	|进程使用的物理内存百分比；简单理解，此进程占用了内存总数的百分比。
|TIME+	|进程使用的CPU时间总计，单位1/100秒
|COMMAND	|命令名/命令行；使用top -c会显示全命令

**<font color=teal>推荐使用</font>**

```bash
top
&& 
top -c
&&
top -c -p pid(,pid)
```

## 二、htop – 互动的进程查看器
>&emsp;&emsp;htop是linux系统中的一个互动的进程查看器，一个文本模式的应用程序(在控制台或者X终端中)，需要ncurses。htop比较人性化。它可让用户交互式操作，支持颜色主题，可横向或纵向滚动浏览进程列表，并支持鼠标操作。
&emsp;&emsp;htop相比较top的优势有可以横向或纵向滚动浏览进程列表，以便看到所有的进程和完整的命令行、在启动上比top更快、杀进程时不需要输入进程号、支持鼠标选中操作、top已不再维护。
&emsp;&emsp;htop相当于top的升级版，监控界面是彩色的。


**<font color=teal>语法格式</font>**
```bash
htop [参数]
```
**<font color=teal>常用参数</font>**

><font color=red>非交互式</font>是直接输入命令的时候加上参数，而<font color=red>交互式</font>是htop进入监测后使用的。

&emsp;&emsp;**<font color=orsfdafsdafsdfasfqeqadfsffa>非交互式参数</font>**
| 参数 |解析  |
|--|--|
|-C|	使用单色配色方案
|-d|	设置更新的延迟， 单位是10微秒
|-s	用户|纵列排序
|-u	用户|只显示一个指定用户的进程
|-p 用户|	只显示给用户
|-h|	打印此命令帮助
|-v|	打印版本信息

&emsp;&emsp;**<font color=orsfdafsdafsdfasfqeqadfsffa>交互式参数</font>**
|参数| 解析 |
|--|--|
|space|	标记一个进程
|U	|取消所有标记
|l|	显示进程打来的文件
|u|	显示特定用户
|M|	按照内存排序
|P|	按照CPU排序
|T	|按在线时长排序
|直接输入数字|	查找对应的PID进程

**<font color=teal>参考实例</font>**

启动htop：

```bash
[root@root ~]# htop
```

以单色模式启动htop：

```bash
[root@root ~]# htop -C
```

设置显示更新的延迟为3秒：

```bash
[root@root ~]# htop -d 3
```

显示一个给定的用户的进程：

```bash
[root@root ~]# htop -u linuxcool_user
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181623419.png)

## 三、vmstat – 显示虚拟内存状态

>&emsp;&emsp;vmstat命令的含义为显示虚拟内存状态（“Virtual Memory Statistics”），但是它可以报告关于进程、内存、I/O等系统整体运行状态。
>
**<font color=teal>语法格式</font>**
```bash
vmstat [参数]
&&
vmstat [参数] [时间间隔] [执行次数]
```
**<font color=teal>常用参数</font>**
|参数| 解析 |
|--|--|
|-a	|显示活动内页
|-f	|显示启动后创建的进程总数
|-m	|显示slab信息
|-n|	头信息仅显示一次
|-s|	以表格方式显示事件计数器和内存状态
|-d|	报告磁盘状态
|-p|	显示指定的硬盘分区状态
|-S	|输出信息的单位

**<font color=teal>参考实例</font>**

显示活动内页：

```bash
[root@root ~]# vmstat -a
```

显示启动后创建的进程总数：


```bash
[root@root ~]# vmstat -f
```


显示slab信息：


```bash
[root@root ~]# vmstat -m
```


头信息仅显示一次：


```bash
[root@root ~]# vmstat -n
```


以表格方式显示事件计数器和内存状态：


```bash
[root@root  ~]# vmstat -s
```


显示指定的硬盘分区状态：


```bash
[root@root ~]# vmstat -p /dev/sda1
```


指定状态信息刷新的时间间隔为1秒：


```bash
[root@root ~]# vmstat 1
```

指定状态信息刷新的时间间隔为2秒刷新3次：

```bash
[root@root ~]# vmstat 2 3
```

**<font color=teal>字段解析</font>**

```bash
[root@root ~]# vmstat 
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 2  0  35896 445256    520 487496  271 2091   622  2119  129  127  1  1 97  0  0
```
>**<font color=red>1.procs</font>**
><font color=eoqne>r </font> 表示等待执行的任务数，当一段时间内这个数值一直超过CPU数说明当前系统出现CPU瓶颈；
><font color=eoqne>b</font>   表示等待IO的进程数量。<br><br>
>**<font color=red>2.memory</font>**
><font color=eoqne>swpd  </font>  虚拟内存已使用的大小，如果大于0，表示你的机器物理内存不足了，如果不是程序内存泄露的原因，那么你该升级内存了或者把耗内存的任务迁移到其他机器；
><font color=eoqne>free </font> 空闲的物理内存的大小；
><font color=eoqne>buff </font> Linux/Unix系统是用来存储，目录里面有什么内容，权限等的缓存；
><font color=eoqne>cache  </font> 直接用来记忆我们打开的文件,给文件做缓冲。<br><br>
>**<font color=red>3.swap</font>**
><font color=eoqne>si </font> 每秒从磁盘读入虚拟内存的大小，如果这个值大于0，表示物理内存不够用或者内存泄露了，要查找耗内存进程解决掉；
><font color=eoqne>so </font>   每秒虚拟内存写入磁盘的大小，如果这个值大于0，同上。<br><br>
>**<font color=red>4.io</font>**
><font color=eoqne>bi </font> 块设备每秒接收的块数量，这里的块设备是指系统上所有的磁盘和其他块设备，默认块大小是1024byte;
><font color=eoqne>bo </font> 块设备每秒发送的块数量，例如我们读取文件，bo就要大于0。bi和bo一般都要接近0，不然就是IO过于频繁，需要调整。<br><br>
>**<font color=red>5.system</font>**
><font color=eoqne>in </font>  每秒中断数，包括时钟中断；
><font color=eoqne>cs </font>  表示每秒上下文切换;
>这两个值越大，会看到由内核消耗的cpu时间会越多。<br><br>
>**<font color=red>6.cpu</font>**
><font color=eoqne>us </font> 用户CPU时间；
><font color=eoqne>sy </font> 系统CPU时间，如果太高，表示系统调用时间长，例如是IO操作频繁；
><font color=eoqne>id </font> 空闲 CPU时间，一般来说，id + us + sy = 100,一般我认为id是空闲CPU使用率，us是用户CPU使用率，sy是系统CPU使用率；
><font color=eoqne>wa </font> 等待IO CPU时间；
><font color=eoqne>st </font> 等待IO CPU时间。

## 四、dstat – 全能系统信息统计工具
>&emsp;&emsp;dstat命令是一个用来替换vmstat、iostat、netstat、nfsstat和ifstat这些命令的工具，是一个全能系统信息统计工具。与sysstat相比，dstat拥有一个彩色的界面，在手动观察性能状况时，数据比较显眼容易观察；而且dstat支持即时刷新，譬如输入dstat 3即每三秒收集一次，但最新的数据都会每秒刷新显示。和sysstat相同的是，dstat也可以收集指定的性能资源，譬如dstat -c即显示CPU的使用情况。

**<font color=teal>语法格式</font>**
```bash
 dstat [参数]
```
**<font color=teal>常用参数</font>**
| 参数 |解析  |
|--|--|
|-c	|显示CPU系统占用，用户占用，空闲，等待，中断，软件中断等信息
|-d	|显示磁盘读写数据大小
|-n	|显示网络状态
|-l|	显示系统负载情况
|-m	|显示内存使用情况
|-g|	显示页面使用情况
|-p	|显示进程状态
|-s	|显示交换分区使用情况
|-r	|I/O请求情况
|-y	|系统状态
|--ipc|	显示ipc消息队列，信号等信息
|--socket|	用来显示tcp udp端口状态

**<font color=teal>参考实例</font>**

分别显示cpu、disk、net、page、system信息：

```bash
[root@root ~]# dstat 
```

每三秒收集一次 cpu、disk、net、page、system 信息 ：

```bash
[root@root ~]# dstat 3
```

显示CPU系统占用，用户占用，空闲，等待，中断，软件中断等信息 ：

```bash
[root@root ~]# dstat -c
```

显示磁盘读写数据大小 ：

```bash
[root@root ~]# dstat -d
```

显示网络状态：

```bash
[root@root ~]# dstat -n
```

## 五、glances – 高层次的多子系统概览
>&emsp;&emsp;Glances是一个相对比较新的系统监控工具，用 Python 编写的，使用 psutil 库从系统获取信息。可以用它来监控 CPU、平均负载、内存、网络接口、磁盘 I/O，文件系统空间利用率、挂载的设备、所有活动进程以及消耗资源最多的进程。Glances 有很多有趣的选项。它的主要特性之一是可以在配置文件中设置阀值（careful小心、warning警告、critical致命），然后它会用不同颜色显示信息以表明系统的瓶颈。


**<font color=teal>语法格式</font>**
```bash
glances [参数]
```
**<font color=teal>常用参数</font>**
| 参数 |解析  |
|--|--|
|-b|	显示网络连接速度 Byte/ 秒
|-s	|设置 glances 运行模式为服务器
|-B|	绑定服务器端 IP 地址或者主机名称
|-c|	连接 glances 服务器端
|-t	|设置屏幕刷新的时间间隔，单位为秒，默认值为 2 秒，数值许可范围：1~32767

**<font color=teal>参考实例</font>**

192.168.10.2 主机启动 glances 服务：

```bash
[root@root ~]# glances -s -B 192.168.10.2 &
```

从另一台主机查看 192.168.10.2 主机的系统负载状态:

```bash
[root@root ~]# glances -c 192.168.10.2
```

显示网络连接速度 Byte/ 秒：

```bash
[root@root ~]# glances -b
```

设置屏幕刷新的时间间隔为6秒：

```bash
[root@root ~]# glances -t 6
```

## 六、sar – 系统运行状态统计
>&emsp;&emsp;sar命令是Linux下系统运行状态统计工具，它将指定的操作系统状态计、数器显示到标准输出设备。
>&emsp;&emsp;sar（System Activity Reporter系统活动情况报告）是目前Linux上最为全面的系统性能分析工具之一，可以从多方面对系统的活动进行报告，包括：文件的读写情况、系统调用的使用情况、磁盘I/O、CPU效率、内存使用状况、进程活动及IPC有关的活动等
>
**<font color=teal>语法格式</font>**
```bash
sar [ 选项 ] [ <时间间隔> [ <次数> ] ]
```
**<font color=teal>常用参数</font>**
| 参数 | 解析 |
|--|--|
|-A|所有报告的总和
|-R|	显示内存状态
|-b|	显示I/O和传递速率的统计信息
|-B	|显示换页状态
|-d|	输出每一块磁盘的使用信息
|-e|设置显示报告的结束时间
|-f|从制定的文件读取报告
|-i	|设置状态信息刷新的间隔时间
|-P|报告每个CPU的状态
|-u	|输出cpu使用情况和统计信息
|-v|显示索引节点、文件和其他内核表的状态
|-w|显示交换分区的状态
|-x|显示给定进程的装
|-r|报告内存利用率的统计信息

**<font color=teal>参考实例</font>**

使用-R参数显示内存信息：

```bash
[root@root ~]# sar -R
```

使用-b参数显示I/O速率：

```bash
[root@root ~]# sar -b
```

使用-u参数显示CPU利用率：

```bash
[root@root ~]# sar -u
```
使用-d参数查看每块磁盘的使用信息

```bash
[root@root ~]# sar -d
```

使用-i参数和-f参数设置状态信息1秒刷新一次并记录5次
```bash
[root@root ~]# sar -i 1 -f 5
```

## 总结
## &emsp;相关文章
>💻[【Linux】之【CPU】相关的命令及解析[lscpu、mpstat]](https://blog.csdn.net/liu_chen_yang/article/details/125143646)
>
>--------------------------
>💻[【Linux】之【内存】相关的命令&&解析以及内存相关的问题[free、meminfo、内存泄漏、内存溢出、Overcommit]](https://blog.csdn.net/liu_chen_yang/article/details/125146057)
>
>--------------------------
>💻[【Linux】之【磁盘】相关的命令及解析[df、du、iostat、iotop]](https://blog.csdn.net/liu_chen_yang/article/details/125256901?spm=1001.2014.3001.5501)
>
>--------------------------
>💻[【Linux】之【网络】相关的命令及解析[ethtool、nload、nethogs、iftop、iptraf、ifstat]](https://blog.csdn.net/liu_chen_yang/article/details/125146080)
>
>--------------------------
>💻[【Linux】综合性命令及解析【top、htop、vmstat、dstat、glances、sar】](https://blog.csdn.net/liu_chen_yang/article/details/125146126)
>
>--------------------------
>💻[【Linux】系统如何查看服务器带宽及网络使用情况](https://blog.csdn.net/liu_chen_yang/article/details/125169987)
>
>--------------------------
