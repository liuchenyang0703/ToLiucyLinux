---
title: linux使用stress命令进行压力测试cpu
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

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---



## 查看系统的压力（负载情况）

uptime或者使用top

> top 显示动态的负载情况及cpu等等参数，参数比较多；<br>
> uptime 显示静态的负载情况，只能看到系统时间、启动时间、登陆用户、平均负载

```bash
[root@localhost ~]# uptime
 13:22:51 up 3 days, 22:43,  1 user,  load average: 0.00, 0.01, 0.05
```

>  13:22:51
>
> 系统时间
>
> 
>
>  up 3 days, 22:43
>
> 系统启动时长
>
> 
>
> 1 user
>
> 登陆用户
> 
>
> load average: 0.00, 0.01, 0.05
>
> 一分钟、五分钟、十五分钟负载

**top**


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191620136.png)





## 如何直接做压力测试呢？

开两个窗口，一个窗口写while死循环来持续观看，一个窗口用来检测负载

```bash
while true;do echo "压力测试" ; done
```



可以看到都有占用，只不过每个cpu都没有占满，所以不推荐使用这个来做压测。



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191620143.png)




## 使用stress命令来做CPU压测

cpu的压力，来自于高频的计算任务，比如数值计算等，我们可以用bash程序，python程序，以及各种编程语言，来实现复杂的高频率计算。

这里我们用几个工具

> stress	&emsp;&emsp;		stress是一个linux的压力测试工具，专门用于对设备的CPU、IO、内存、负载、磁盘等进行压测
> mpstat	&emsp;	&emsp;	多核CPU性能分析
> pidstat	&emsp;	&emsp;	实时查看cpu、内存、io等指标
> top	&emsp;	&emsp;	实时查看cpu、内存、负载、io等指标

### 实践：

- 1、安装stress命令

```bash
# 需要安装扩展源
yum -y install epel-release

# 安装stress命令
yum -y install stress
```

- 2、使用stress命令

> stress命令：服务器进行压力测试，次命令可以让你的cpu跑满，达到100%，以此实现最高压的环境；

```bash
stress --cpu 4 --timeout 600s
```

> --cpu 4	指定要占满的cpu核数<br>
> --timeout 600s	指定超时（结束）时间，压测600s后自动结束



- 2.1 先使用stress命令占满一个cpu来测试

```bash
stress --cpu 1 --timeout 600s
```

开两个窗口；一个执行命；，一个用来检测查看cpu占用。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191621358.png)





- 2.2 在使用stress命令占满三个cpu来测试

```bash
stress --cpu 3 --timeout 600s
```

开两个窗口；一个执行命；，一个用来检测查看cpu占用。



执行命令，可以看到占用3个cpu

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191621895.png)




三个cpu均已占满


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191621924.png)






- 2.3 在使用stress命令占满四个cpu来测试

```bash
stress --cpu 4 --timeout 600s
```

开两个窗口；一个执行命；，一个用来检测查看cpu占用。


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191621747.png)



可以看到都已经占满了。







- 2.4 在使用stress命令占满四个cpu来测试，我要跑5个cpu，但实际上服务器只有4核cpu，会怎么样呢？我们一起来看看：

```bash
stress --cpu 5 --timeout 600s
```

开两个窗口；一个执行命；，一个用来检测查看cpu占用。



跑了5个cpu

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191621255.png)




可以看到4核cpu也是占满了，但是，我们跑了5个压力测试，他会平均分摊cpu的处理核数，并使其占满所有cpu。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191621320.png)












## 附加：

Linux查看CPU详细信息

```bash
cat /proc/cpuinfo
lscpu
```



### Linux查看CPU型号（去重）
 ```bash
cat /proc/cpuinfo | grep 'model name' |uniq
 ```




查看服务器共有多少核的时候需要先查看cpu多少块，在查看cpu核数，如是2块4核的一共就是8核cpu；

### 查看物理cpu个数【多少块cpu】
```bash
cat /proc/cpuinfo | grep 'physical id' | sort | uniq | wc -l
```



### 查看cpu是几核
```bash
cat /proc/cpuinfo | grep 'cpu cores'|uniq
cat /proc/cpuinfo | grep 'cores'|uniq
```



### 查看逻辑cpu的个数【线程】
```bash
cat /proc/cpuinfo | grep 'processor' |wc -l
```



## 推荐



如果想直观的查看系统的一些硬件信息，可使用该脚本，执行脚本自动获取部分系统硬件信息；

> [自动获取服务器系统信息脚本：（操作系统、系统内核、系统架构、CPU型号、CPU核数、显卡型号、内存等等）](https://download.csdn.net/download/liu_chen_yang/88218063?spm=1001.2014.3001.5503)



> 自动获取服务器的信息都有：
>
> 1、服务器为物理机还是虚拟机还是KVM还是云服务器，型号是什么；
>
> 2、操作系统 
>
> 3、系统内核
>
> 4、系统架构 
>
> 5、CPU型号 
>
> 6、CPU核数 
>
> 7、显卡型号 
>
> 8、显卡显存 
>
> 9、总内存 
>
> 10、jdk版本 
>
> 11、mysql 版本 
>
> 12、redis 版本 
>
> 13、python 版本 
>
> 14、GCC 版本 
>
> 15、CUDA 版本




示例图：



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412191622409.png)

