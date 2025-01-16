---
title: Linux系统中CPU占用率较高问题排查思路与解决方法
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - CPU
  - 运维
pageview: false
date: 2024-12-20
comment: false
breadcrumb: false
---


>这篇文章主要给大家介绍了关于Linux系统中CPU占用率较高问题排查思路与解决方法，文中通过示例代码介绍的非常详细，对大家学习或者使用Linux具有一定的参考学习价值，需要的朋友们下面来一起学习学习吧

## 前言
作为 Linux 运维工程师，在日常工作中我们会遇到 Linux服务器上出现CPU负载达到100%居高不下的情况，如果CPU 持续跑高，则会影响业务系统的正常运行，带来企业损失。
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200949255.png)

很多运维的同学遇到这种状况往往会不知所措，对于CPU过载问题通常使用以下两种方式即可快速定位：

### 方法一

第一步：使用

>top命令，然后按shift+p按照CPU排序

找到占用CPU过高的进程的pid

第二步：使用

>top -H -p [进程id]

找到进程中消耗资源最高的线程的id

第三步：使用

>echo 'obase=16;[线程id]' | bc或者printf "%x\n" [线程id]

将线程id转换为16进制（字母要小写）

>bc是linux的计算器命令

第四步：执行

>jstack [进程id] |grep -A 10 [线程id的16进制]”

查看线程状态信息

### 方法二

第一步：使用

>top命令，然后按shift+p按照CPU排序

找到占用CPU过高的进程

第二步：使用

>ps -mp pid -o THREAD,tid,time | sort -rn

获取线程信息，并找到占用CPU高的线程

第三步：使用

>echo 'obase=16;[线程id]' | bc或者printf "%x\n" [线程id]

将需要的线程ID转换为16进制格式

第四步：使用

>jstack pid |grep tid -A 30 [线程id的16进制]

打印线程的堆栈信息

## 案例分析
<font color=red>结合上面来做。</font>
### 场景描述

生产环境下JAVA进程高CPU占用故障排查

### 解决过程

1、根据top命令，shift+p，发现PID为41673的Java进程占用CPU高达250%，出现故障。
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200949184.png)2、找到该进程后，如何定位具体线程或代码呢，首先显示线程列表,并按照CPU占用高的线程排序：

```bash
[root@localhost ~]# ps -mp 41673 -o THREAD,tid,time | sort -rn

```
显示结果如下：
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200949311.png)
3.将需要的线程TID转换为16进制格式

```bash
[root@localhost ~]# printf "%x\n" 41846
a376
```
4、最后使用jstack命令打印出该进程下面的此线程的堆栈信息：

```bash
[root@localhost ~]# jstack 41673 |grep "a376" -A 30
```

### 解决办法
1、根据top命令，shift+p，发现PID为41673的Java进程占用CPU高达250%，出现故障。
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200949607.png)
2、根据pid查看他的进程看看是什么服务占用这么高

```bash
ps -ef |grep -v grep | grep 41673
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412200949313.png)
3、查看到是一个java进程占用这么高，然后看看有没有用，没有用的话就杀掉它

```bash
kill -9 41673
```
4、再次top查看cpu整体就降下来了。


## 总结

以上就是这篇文章的全部内容了，希望本文的内容对大家的学习或者工作具有一定的参考学习价值，谢谢大家对我的支持。
