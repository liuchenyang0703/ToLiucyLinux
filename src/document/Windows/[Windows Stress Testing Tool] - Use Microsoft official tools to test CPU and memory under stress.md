---
title: 【Windows压力测试工具】 - 使用微软官方工具进行压测 cpu、内存
icon: circle-info
order: 1
category:
  - Windows
tag:
  - Windows
  - 运维
  - 压力测试
date: 2025-11-20
isOriginal: true
pageview: true
article: true
breadcrumb: false
comment: true
---

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[CSDN博客专家](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/usersnew/id_1661843828089234)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/profile/7yu26jk3lfqxg)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---

## 一、需求背景

>在某些场景下，我们虽然没有使用windows，但根据要求，也需要占用一定的资源；
> 或者是在开发一些极端场景的需求时，需要自测，这种情况需要模拟极端情况很麻烦，所以需要一些压力测试工具来模拟。

> 我在微软官方文档中找到专门针对cpu，内存，磁盘做压力测试的工具和方法：
> **官方文档：**[Tools To Simulate CPU / Memory / Disk Load
](https://learn.microsoft.com/zh-cn/archive/blogs/vijaysk/tools-to-simulate-cpu-memory-disk-load)

**运行平台：**
* 客户端：Windows Vista 及更高版本
* 服务器：Windows Server 2003 及更高版本
* Nano Server：2016 及更高版本
## 二、CPU压力测试工具 - cpustres
> CpuStres 是实用工具，可以通过在紧密循环中运行多达 64 个线程来模拟 CPU 活动。
> 每个线程都可以独立启动、暂停或停止，

### 2.1 下载 cpustres
> `cpustres`官方下载连接：[https://learn.microsoft.com/zh-cn/sysinternals/downloads/cpustres](https://learn.microsoft.com/zh-cn/sysinternals/downloads/cpustres)

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180945941.png)
### 2.2 cpustres 值说明
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180945621.png)
| 列名            | 含义             | 说明                                                        |
| ------------- | -------------- | --------------------------------------------------------- |
| **ID**        | 运行 ID（内部句柄）    | 可忽略，仅用于区分线程。                                              |
| **Active?**   | 线程是否正在运行       | **Yes**＝运行；空白＝暂停。                                         |
| **Activity**  | 占空比（跑-停比例）     | **Low**≈20 %；可菜单改为 Medium/High/Busy（40 %/60 %/100 %）。     |
| **Priority**  | 线程优先级          |  **Normal**|
| **Ideal CPU** | 首选逻辑核编号        | 根据核数分为0-11，仅作调度提示，提示调度器“尽量放这里”；非强制。 |
| **Affinity**  | 允许运行的核 **位掩码** | `111111111111`（12 个 1）→ 代表有12核cpu，可以在12核中随便跑 |


### 2.3 安装使用 cpustres
* 解压并打开文件夹选择`CPUSTRES64.EXE`
* 双击打开

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180945471.png)


* 默认打开后界面里有 4 条线程，其中只有 1 条被激活 (Active?=Yes)，可通过如下添加线程

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180945324.png)
* 根据自己需求添加多个线程，但是添加之后都是睡眠状态，我们可以激活睡眠状态，激活之后`Active?` 会出现`Yes`表示激活了。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180945488.png)
* 激活线程
> 选择要激活的线程 --> 点击激活 --> 可以看到`Active?` 出现了`Yes`，就成功激活了

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180945832.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180945704.png)
![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180945534.png)

* 激活之后可以看一下资源管理器，cpu是否增加了，可以先开一个，然后打开资源管理器，在多开几个，看看cpu会不会上涨

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180945783.png)
* 查看任务管理器，进程，cpu排序，就可以看到此程序占用多少%。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180945921.png)

* 最后，根据自己的需求达到多少%，就多开几个线程测试。

> 如果不想让`Activity`有空闲，可以选中要更改的线程（`Shift`+`鼠标`选中）
> <font color=green>点菜单 Thread → Activity → 选则`Busy`</font>
> 会立即生效，就可以看到cpu会直接上升，并且不会有空闲，就会一直再循环跑；
## 三、内存压力测试工具 - testlimit
> Testlimit 是一种命令行实用工具，可用于通过模拟内存、句柄、进程、线程和其他系统对象的低资源条件来对电脑和/或应用程序进行压力测试。

### 3.1 下载 testlimit
> `testlimit`官方下载连接：[https://learn.microsoft.com/zh-cn/sysinternals/downloads/testlimit](https://learn.microsoft.com/zh-cn/sysinternals/downloads/testlimit)

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180945856.png)

### 3.2 testlimit 参数
> 目前用到的就只有-d -c，其他的可以略过不用看，如果有想深入了解的可以看看；
> `Testlimit64.exe -d -c 要跑多少M`

| 参数    | 功能简述                 | 默认值  | 示例                             |
| ----- | -------------------- | ---- | ------------------------------ |
| -a MB | 分配 AWE（地址窗口扩展）内存     | 1 MB | -a 1024 → 分配 1 GB AWE          |
| -c N  | 对象/块计数（必须放在**最后**）   | 尽可能多 | -d 100 -c 5 → 5 块×100 MB       |
| -d MB | **泄漏并触摸物理内存**（最常用）   | 1 MB | -d 5120 → 占用 5 GB 物理内存         |
| -e S  | 两次分配间隔（秒）            | 0    | -e 1 → 每 1 s 分配一次              |
| -g B  | 创建 GDI 句柄（字节）        | 1 B  | -g 0 → 耗尽全部 GDI                |
| -h    | 创建内核句柄（事件等）          | —    | -h -c 10000 → 1 万个句柄           |
| -i    | 耗尽 USER 桌面堆          | —    | -i                             |
| -l N  | 分配大页面（数量）            | —    | -l 10 → 10 个大页面                |
| -m MB | **仅泄漏内存**（不强制驻留）     | 1 MB | -m 4096 → 4 GB 提交              |
| -p    | 创建新进程                | —    | -p -n 100 → 100 个最小工作集进程       |
| -r MB | **仅保留虚拟地址空间**        | 1 MB | -r 8192 → 保留 8 GB 虚拟内存         |
| -s MB | 泄漏共享内存（section）      | 1 MB | -s 512 → 512 MB 共享内存           |
| -t N  | 创建线程                 | —    | -t -n 256 → 256 个线程，各 256 KB 栈 |
| -u    | 创建 USER 菜单句柄         | —    | -u -c 5000 → 5000 个菜单句柄        |
| -v MB | 分配并 VirtualLock 锁定内存 | 1 MB | -v 2048 → 锁定 2 GB 到工作集         |
| -w    | 将工作集最小值抬到最高          | —    | -w                             |

### 3.3 安装使用 testlimit 
* 解压`Testlimit.zip`压缩包
* 打开`PowerShell`，切换到解压的目录

```bash
cd C:\Users\user\Desktop\Testlimit
```
* 查看资源管理器，当前还有多少内存，总共多少内存，需要达到多少%，计算大概需要占用的内存

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180946735.png)
> 可以看到是总共16G内存，可用的还有12.7G，比如我们的cpu要达到60%，那么还需要占用约`7000M`，计算是6.3G，可以往上加200-2000M，因为直接写6300会有误差，也有可能其他进程会掉导致内存下降，所以，比计算的尽量再大200-2000M都行；
> 如果感觉计算麻烦，或者是说大一些比如只要超过60%就行，那么直接用`总内存*0.6`也行；

* 使用 `Testlimit64.exe` 命令压测内存：`Testlimit64.exe -d -c xxx`。 xxx 是以MB为单位。

```bash
Testlimit64.exe -d -c 7000
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180946681.png)
* 也可也查看任务管理器，进程，内存排序，就可以看到此程序占用多少%。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202512180946816.png)
* 根据自己需求调整要跑内存大小。
## 四、安装包下载地址
>百度网盘（Windows压力测试工具）：
[https://pan.baidu.com/s/1wJxZrgcP52t-sdntxOnk7w?pwd=winy](https://pan.baidu.com/s/1wJxZrgcP52t-sdntxOnk7w?pwd=winy)

> CSDN资源下载（Windows压力测试工具）：
> [https://download.csdn.net/download/liu_chen_yang/92360704](https://download.csdn.net/download/liu_chen_yang/92360704)

> * `cpustres`官方下载连接：[https://learn.microsoft.com/zh-cn/sysinternals/downloads/cpustres](https://learn.microsoft.com/zh-cn/sysinternals/downloads/cpustres)
>*  `testlimit`官方下载连接：[https://learn.microsoft.com/zh-cn/sysinternals/downloads/testlimit](https://learn.microsoft.com/zh-cn/sysinternals/downloads/testlimit)
> * 可以直接选择下载要的文件：[https://live.sysinternals.com/](https://live.sysinternals.com/)
> * Sysinternals 套件（包含，cpu、内存压测工具）：
> [https://learn.microsoft.com/zh-cn/sysinternals/downloads/sysinternals-suite](https://learn.microsoft.com/zh-cn/sysinternals/downloads/sysinternals-suite)

## 五、参考文献
|标题| 文章链接 |
|--|--|
|[windows系统下压力测试工具（cpu使用率，内存使用率，磁盘使用率，磁盘空间）](https://blog.csdn.net/zsc_976529378/article/details/127734138)  | [https://blog.csdn.net/zsc_976529378/article/details/127734138](https://blog.csdn.net/zsc_976529378/article/details/127734138) |


