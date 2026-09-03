---
title: 【Linux压力测试工具】 - Stress命令进行压力测试cpu、内存、磁盘
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 运维
date: 2024-12-19
isOriginal: true
pageview: true
article: true
breadcrumb: false
comment: true
# 原创声明
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



## 一、查看系统的压力（负载情况）

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

top


![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202502251250069.png)





## 二、如何直接做压力测试呢？

开两个窗口，一个窗口写while死循环来持续观看，一个窗口用来检测负载

```bash
while true;do echo "压力测试" ; done
```



可以看到都有占用，只不过每个cpu都没有占满，所以不推荐使用这个来做压测。



![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202502251250429.png)




## 三、使用stress命令来做CPU、内存压测

cpu的压力，来自于高频的计算任务，比如数值计算等，我们可以用bash程序，python程序，以及各种编程语言，来实现复杂的高频率计算。

这里我们用几个工具

> stress	&emsp;&emsp;		stress是一个linux的压力测试工具，专门用于对设备的CPU、IO、内存、负载、磁盘等进行压测
> mpstat	&emsp;	&emsp;	多核CPU性能分析
> pidstat	&emsp;	&emsp;	实时查看cpu、内存、io等指标
> top	&emsp;	&emsp;	实时查看cpu、内存、负载、io等指标

### 3.1 安装stress命令

```bash
# 需要安装扩展源
yum -y install epel-release

# 安装stress命令
yum -y install stress

## ubuntu安装
apt install stress -y
```

### 3.2 stress命令解析
>`stress` 是一个用于在 Linux 系统中模拟系统负载的工具，主要用于测试系统的稳定性和性能表现。它可以通过创建多个进程来模拟 CPU、内存、磁盘 I/O 和网络等资源的压力。

#### 3.2.1 基本语法
```bash
stress [options]
```

#### 3.2.2 常用选项
1. **CPU 压力测试**
   - `-c, --cpu <N>`：创建 N 个进程，每个进程通过计算随机数的平方根来占用 CPU。
   - 示例：`stress --cpu 4`，模拟 4 个 CPU 核心的满负荷运行。


2. **内存压力测试**

   - `-m, --vm <N>`：创建 N 个进程，每个进程不断分配和释放内存。
   - `--vm-bytes <B>`：指定每个进程分配的内存大小。
   - `--vm-keep`：持续占用内存，而不是不断释放和重新分配。
   - 示例：`stress --vm 1 --vm-bytes 2048M --vm-keep`，创建 1 个进程，每个进程分配 2048MB 内存并持续占用。

3. **磁盘 I/O 压力测试**
   - `-i, --io <N>`：创建 N 个进程，每个进程通过调用 `sync()` 将内存内容写入磁盘。
   - 示例：`stress --io 4`，模拟 4 个磁盘 I/O 进程。

4. **磁盘压力测试**
   - `-d, --hdd <N>`：创建 N 个进程，每个进程不断在磁盘上创建文件、写入内容并删除文件。
   - `--hdd-bytes <B>`：指定创建文件的大小。

5. **其他选项**
   - `--timeout <N>`：指定压力测试的持续时间（单位为秒）。
   - `-v, --verbose`：输出详细的调试信息。
   - `-q, --quiet`：不输出任何信息。
   - `--backoff <N>`：在进程启动时延迟 N 微秒。
#### 3.2.3 使用场景
- **系统稳定性测试**：在系统升级或部署新应用前，使用 `stress` 测试系统在高负载下的稳定性。
- **性能评估**：通过模拟不同类型的负载，评估系统的性能瓶颈。
- **故障排查**：帮助确定系统在特定负载下出现的问题是硬件还是软件引起的。

通过合理使用 `stress` 命令，可以有效地对系统进行压力测试，从而优化系统性能和稳定性。

### 3.3 实践：

#### 3.3.1 跑满4核cpu持续600s
开两个窗口；一个执行命；一个用来检测查看cpu占用。
```bash
stress --cpu 4 --timeout 600s
```

> --cpu 4	指定要占满的cpu核数<br>
> --timeout 600s	指定超时（结束）时间，压测600s后自动结束

可以看到4核cpu都占用了100%。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202502251250723.png)




-  3.3.1.1 在使用stress命令占满四个cpu来测试，我要跑5个cpu，但实际上服务器只有4核cpu，会怎么样呢？我们一起来看看：

```bash
stress --cpu 5 --timeout 600s
```

开两个窗口；一个执行命；，一个用来检测查看cpu占用。



跑了5个cpu

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202502251250908.png)




可以看到4核cpu也是占满了，但是，我们跑了5个压力测试，他会平均分摊cpu的处理核数，并使其占满所有cpu。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202502251250063.png)


#### 3.3.2 跑满4核cpu并挂后台持续占用

开两个窗口；一个执行命；一个用来检测查看cpu占用。
```bash
stress --cpu 4
```
不加`timeout`就行。
如果想挂载后台一直让他运行就可以在指定cpu后添加`&`

```bash
stress --cpu 4 &
```
这样即使链接服务器窗口关了也可以持续占用cpu。

#### 3.3.3 跑满4核cpu、2G内存并一直压测

```bash
stress --cpu 4 --vm 1 --vm-bytes 2G --vm-keep
```
> `--cpu 4 ` 指定占用4cpu
> `--vm 1` 指定使用1个进程
> `--vm-bytes 2G` 指定每个进程分配的内存大小2G
> `--vm-keep` 持续占用内存<br>
>**注意事项：**
>1. **系统资源限制**：  
   在运行此命令之前，请确保系统有足够的资源来支持这种负载。如果系统资源不足，可能会导致系统崩溃或响应缓慢。
>2. **监控系统状态**：  
   在运行压力测试时，建议使用工具（如 `top`、`htop`、`vmstat` 或 `iostat`）监控系统的 CPU、内存和磁盘使用情况，以便及时发现潜在问题。
>3. **测试环境**：  
   建议在测试环境中运行此命令，避免对生产环境造成不必要的影响。
>4. **停止压力测试**：  
   如果需要停止压力测试，可以使用 `Ctrl+C` 或通过 `kill` 命令终止 `stress` 进程。



#### 3.3.4 例如：我有96线程cpu、118G内存，需要cpu占用30%、内存50%
要实现 CPU 占用 30% 和内存占用 50% 的压力测试，需要根据你的系统资源进行一些计算和调整。以下是具体的步骤和命令：

* 首先计算 CPU 和内存的使用量 
>  **CPU 占用 30%**：
>  - 有 96 个线程的 CPU，30% 的占用意味着需要占用约 28.8 个线程（96 × 30%）。为了方便，可以取整为 **29 个线程**。
>  <br>
>**内存占用 50%**：
>  - 有 118GB 内存，50% 的占用意味着需要占用约 **59GB 内存**。

* 命令实现：
```bash
stress --cpu 29 --vm 1 --vm-bytes 59G --vm-keep
```
* 命令解析：
>  **`--cpu 29`**     创建 29 个进程，每个进程通过计算随机数的平方根来占用 CPU，总共占用约 30% 的 CPU 资源。
>  **`--vm 1`**     创建 1 个进程用于内存压力测试。
>  **`--vm-bytes 59G`**    指定内存进程分配 59GB 的内存。
>  **`--vm-keep`**     让内存进程持续占用分配的内存，而不是不断释放和重新分配。

---
<center>常用的就是压测cpu和内存。</center>

---



#### 3.4.5 停止压测
①、如果是挂后台压测的话可以使用此命令停止压测。

```bash
ps -ef | grep -v grep | grep stress | awk '{print $2}' | xargs kill -9
```

②、如果是前台压测，直接`ctrl+c`停止压测。

---

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



![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202502260942015.png)

