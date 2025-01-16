---
title: nvidia-smi简介及各参数的详解与字段的详解和使用
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - GPU
  - NVIDIA
  - 运维
pageview: false
date: 2024-12-20
comment: false
breadcrumb: false
---

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201007644.png)


>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---


## nvidia-smi简介

### 1、什么是nvidia-smi
>nvidia-smi是nvidia 的系统管理界面 ，其中smi是 **System management interface** 的缩写，它可以收集各种级别的信息，查看显存使用情况，显卡的温度... ...。此外, 可以启用和禁用 GPU 配置选项 (如 ECC 内存功能)。

### 2、介绍nvidia-smi
>nvidia-sim简称NVSMI，提供监控GPU使用情况和更改GPU状态的功能，是一个跨平台工具，支持所有标准的NVIDIA驱动程序支持的Linux和WindowsServer 2008 R2 开始的64位系统。这个工具是N卡驱动附带的，只要使用nvidia显卡，完成安装驱动就会有nvidia-smi命令；

## nvidia-smi命令详解
### nvidia-smi 表格参数详解
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201008125.png)

```bash
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 515.57       Driver Version: 515.57       CUDA Version: 11.7     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|                               |                      |               MIG M. |
|===============================+======================+======================|
|   0  NVIDIA GeForce ...  Off  | 00000000:65:00.0 Off |                  N/A |
| 30%   22C    P8     3W / 350W |   9815MiB / 12288MiB |      0%      Default |
|                               |                      |                  N/A |
+-------------------------------+----------------------+----------------------+
                                                                               
+-----------------------------------------------------------------------------+
| Processes:                                                                  |
|  GPU   GI   CI        PID   Type   Process name                  GPU Memory |
|        ID   ID                                                   Usage      |
|=============================================================================|
|    0   N/A  N/A     37593      C   java                             2869MiB |
|    0   N/A  N/A     48477      C   python3                          2779MiB |
+-----------------------------------------------------------------------------+
```
&nbsp;
&nbsp;

```bash
| NVIDIA-SMI 515.57       Driver Version: 515.57       CUDA Version: 11.7     |
```
>NVIDIA-SMI 515.57&emsp;&emsp;&emsp;#GRID版本
>Driver Version: 515.57&emsp;&emsp;#驱动版本
>CUDA Version: 11.7&emsp;&emsp;&emsp;#CUDA最高支持的版本

```bash
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  NVIDIA GeForce ...  Off  | 00000000:65:00.0 Off |                  N/A |
| 30%   22C    P8     3W / 350W |   9815MiB / 12288MiB |      0%      Default |
```
>`|===============================+======================+======================|`
>为分隔符：上下两行是对应关系，上1对下1，上2对下2
>&nbsp;
>- GPU&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;#本机中的GPU编号,（多块显卡的时候，编号从0开始）图上GPU的编号为：0。
>- Fan&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;#风扇转速（0%-100%）；N/A表示没有风扇；err表示风扇可能损坏；图上表示风扇转速为：30%。
>- Name&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;#GPU类型（显卡型号），图上GPU的类型为：NVIDIA GeForce RTX 3080 Ti。
>- Temp&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;#GPU的温度（GPU温度过高会导致GPU的频率下降），单位摄氏度C；图上温度为：22C。
>- Perf&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;#GPU的性能状态，从P0（最大性能）到P12（最小性能），图上是：P8
>- Persistence-M&emsp;&emsp;&emsp;&emsp;#持续模式的状态，持续模式虽然耗能大，但是在新的GPU应用启动时花费的时间更少，图上显示的是：off
>- Pwr:Usage/Cap&emsp;&emsp;&emsp;&emsp;#能耗表示，Usage：用了多少，Cap总共多少；图上Usage显示：3W，Cap显示：350W。
>- Bus-Id&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;#GPU总线相关显示，domain：bus：device.function
>- Disp.A&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;#Display Active ，表示GPU的显示是否初始化
>- Memory-Usage&emsp;&emsp;&emsp;&emsp;#内存使用率
>- Volatile GPU-Util&emsp;&emsp;&emsp;&emsp;#GPU使用率
>- Uncorr. ECC&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;#关于ECC的东西，是否开启错误检查和纠正技术，0/disabled,1/enabled
>- Compute M&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;#计算模式，0/DEFAULT,1/EXCLUSIVE_PROCESS,2/PROHIBITED

```bash
| Processes:                                                       GPU Memory |
|  GPU       PID   Type   Process name                             Usage      |
|=============================================================================|
|    0       762      C   java                                        1995MiB |
|    1       354      C   python3                                     2101MiB |
```



>`|=============================================================================|`
>为分隔符：分隔符上面对应下面的所有
>&nbsp;
>- Processes&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;#显示每个进程占用的显存使用率、进程号、占用的哪个GPU。
>&nbsp;
>- GPU&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;#当前进程占用的那块显卡。
>- PID&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;#当前进程的PID，可使用ps -ef | grep PID 查看详细命令。
>- Type&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;#当前进程的运行状态。
>- Process name&emsp;&emsp;&emsp;&emsp;&emsp;#当前进程的运行主命令。
>- GPU Memory Usage&emsp;&emsp;&emsp;#该进程占用的显存。

### nvidia-smi --help命令详解

```bash
列表选项：
-L			#列出所有可用的 NVIDIA 设备
-B			#列出所有被拉入黑名单的NVIDIA设备

查询选项：
-q			#查询显示GPUnvidia的相关信息

配合选项：
-u、 --unit #显示单位属性，而不是GPU属性。
-i、 --id	#以特定GPU或单元为目标。可指定显卡编号
--format	#指定输出的格式csv
--filename	#输入csv文件，--filename=后跟自定义csv文件名；
--query-gpu	#指定输出的字段，后可跟timestamp时间、name，

-x、 --xml	#格式生成xml输出。

-l			#持续刷新显存状态
-lms		#循环动态显示;每毫秒

--dtd		#显示xml输出时，嵌入dtd。

-d、 --display	#仅显示选定信息：MEMORY，

```

#### 列出所有可用的 NVIDIA 设备

```bash
nvidia-smi -L
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201007621.png)
>作用：可用作统计服务器中的显卡数量。

#### 列出所有被拉入黑名单的NVIDIA设备

```bash
nvidia-smi -B
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201007457.png)
>`No blacklisted devices found.` 未找到列入黑名单的设备。

#### 查询nvidiaGPU的相关信息

```bash
nvidia-smi -q
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201007437.png)


#### 持续刷新显存状态

```bash
#每两秒刷新一次显存状态
nvidia-smi -l 2
```
>也可用`watch -n 1 nvidia-smi   #1秒刷新一次显存状态`

### 查询所有的csv文件`--query-gpu`可使用的字段及字段说明、实例

```bash
#查询可使用的所有字段
nvidia-smi --help-query-gpu


timestamp			#查询位置的时间戳，格式为“YYYY/MM/DD HH:MM:SS.msec”	；	nvidia-smi --format=csv,noheader --query-gpu=timestamp
memory.total		#查询已安装的GPU显存总数。								nvidia-smi --format=csv,noheader --query-gpu=memory.total
memory.used			#查询已安装的GPU显存使用率。							nvidia-smi --format=csv,noheader --query-gpu=memory.used
memory.free			#查询已安装的GPU剩余显存。								nvidia-smi --format=csv,noheader --query-gpu=memory.free
driver_version		#查询已安装的NVIDIA显示器驱动程序的版本；					nvidia-smi --format=csv,noheader --query-gpu=driver_version
index				#输出显卡的编号：										nvidia-smi --format=csv,noheader --query-gpu=index
pstate				#GPU的当前性能状态。状态范围从P0(最大性能)到P12(最小性能)	nvidia-smi --format=csv,noheader --query-gpu=pstate
power.draw			#显存功耗，对应Pwr：Usage使用：							nvidia-smi --format=csv,noheader --query-gpu=power.draw
temperature.gpu		#输出GPU温度，核心GPU温度。							nvidia-smi --format=csv,noheader --query-gpu=index,temperature.gpu | sed -e "s#, #卡温度为：#g" -e 's#$#°C#g'
fan.speed			#输出GPU风扇转速。									nvidia-smi --format=csv,noheader --query-gpu=index,fan.speed | sed "s#, #卡风扇转速为：#g"
utilization.gpu		#输出GPU的使用率：									nvidia-smi --format=csv,noheader --query-gpu=utilization.gpu
utilization.memory  #输出显存的使用率：									nvidia-smi --format=csv,noheader --query-gpu=utilization.memory
count				#查询位置的时间戳，格式为“YYYY/MM/DD HH:MM:SS.msec”；	nvidia-smi --format=csv,noheader --query-gpu=count
"name" or "gpu_name"		#查询显卡型号，适用于所有产品；												nvidia-smi --format=csv,noheader --query-gpu=name,gpu_name
"serial" or "gpu_serial"	#该编号与每个板上实际打印的序列号相匹配。它是全局唯一的不可变字母数字值。			nvidia-smi --format=csv,noheader --query-gpu=serial,gpu_serial
"uuid" or "gpu_uuid"		#此值是GPU的全局唯一不可变字母数字标识符。它与电路板上的任何物理标签都不对应。		nvidia-smi --format=csv,noheader --query-gpu=uuid,gpu_uuid
"pci.bus_id"or"gpu_bus_id"	#PCI总线id为“域：总线：设备.功能”，十六进制。									nvidia-smi --format=csv,noheader --query-gpu=pci.bus_id,gpu_bus_id
pci.domain			#PCI域名，十六进制。									nvidia-smi --format=csv,noheader --query-gpu=pci.domain
pci.bus				#PCI总线编号，十六进制。								nvidia-smi --format=csv,noheader --query-gpu=pci.bus
pci.device			#PCI设备编号，十六进制。								nvidia-smi --format=csv,noheader --query-gpu=pci.device
pci.device_id		#PCI供应商设备id，十六进制								nvidia-smi --format=csv,noheader --query-gpu=pci.device_id
pci.sub_device_id	#PCI子系统id，十六进制									nvidia-smi --format=csv,noheader --query-gpu=pci.sub_device_id
vbios_version		#GPU板的BIOS。										nvidia-smi --format=csv,noheader --query-gpu=vbios_version
inforom.oem			#OEM配置数据的版本。									nvidia-smi --format=csv,noheader --query-gpu=inforom.oem
inforom.ecc			#ECC记录数据的版本。									nvidia-smi --format=csv,noheader --query-gpu=inforom.ecc
driver_model.current		#当前使用的驱动程序模型。在Linux上始终为“N/A”		nvidia-smi --format=csv,noheader --query-gpu=driver_model.current
accounting.buffer_size		#循环缓冲区的大小，该缓冲区包含可查询会计统计信息的进程列表。这是在有关最旧进程的信息被有关新进程的信息覆盖之前，将为其存储记帐信息的最大进程数		nvidia-smi --format=csv --query-gpu=accounting.buffer_size
```

#### 持续监控nvidia-smi结果写入自定义csv文件，并指定写入文件的监控字段

```bash
nvidia-smi -l 1 --format=csv --filename=report.csv --query-gpu=timestamp,name,index,utilization.gpu,memory.total,memory.used,memory.free,power.draw
```
>`-l`&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;#隔多久记录一次，我们写的是每秒记录一次。
>`--format`&emsp;&emsp;&emsp;#结果记录文件格式是csv类型。（csv）
>`--filename`&emsp;&emsp;#结果记录文件的名字。（report.csv）
>`--query-gpu`&emsp;&emsp;#都记录哪些数据到csv文件中；
>&emsp;&emsp;`timestamp`&emsp;&emsp;&emsp;&emsp;&emsp;#输出每块显卡的时间戳：`nvidia-smi --format=csv --query-gpu=timestamp`
>&emsp;&emsp;`name`&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;#输出显卡的型号（名称）：`nvidia-smi --format=csv --query-gpu=name`
>&emsp;&emsp;`index`&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;#输出显卡的编号：`nvidia-smi --format=csv --query-gpu=index`
>&emsp;&emsp;`utilization.gpu`&emsp;&emsp;#输出GPU的使用率：`nvidia-smi --format=csv --query-gpu=utilization.gpu`
>&emsp;&emsp;`memory.total`&emsp;&emsp;&emsp;&emsp;#显存大小，输出总显存值：`nvidia-smi --format=csv --query-gpu=memory.total`
>&emsp;&emsp;`memory.used`&emsp;&emsp;&emsp;&emsp;&emsp;#显存大小，输出使用了多少显存：`nvidia-smi --format=csv --query-gpu=memory.used`
>&emsp;&emsp;`memory.free`&emsp;&emsp;&emsp;&emsp;&emsp;#显存大小，输出剩余多少显存：`nvidia-smi --format=csv --query-gpu=memory.free`；不太准，建议使用：总显存-使用显存来计算；
>&emsp;&emsp;`power.draw`&emsp;&emsp;&emsp;&emsp;&emsp;#显存功耗，对应Pwr：Usage使用：`nvidia-smi --format=csv --query-gpu=power.draw`

#### 持续监控nvidia-smi结果为csv类型并双重重定向到csv文件中，并指定写入文件的监控字段
```bash
 nvidia-smi -lms --query-gpu=timestamp,pstate,temperature.gpu,utilization.gpu,utilization.memory,memory.total,memory.free,memory.used --format=csv | tee gpu-log.csv
```
>`-lms`&emsp;&emsp;&emsp;&emsp;&emsp;#循环动态显示;每毫秒
>`--query-gpu`&emsp;&emsp;#都记录哪些数据到csv文件中；
>&emsp;&emsp;`timestamp`&emsp;&emsp;&emsp;&emsp;&emsp;#输出每块显卡的时间戳：`nvidia-smi --format=csv --query-gpu=timestamp`
>&emsp;&emsp;`pstate`&emsp;&emsp;&emsp;&emsp;&emsp;#输出GPU的性能状态：`nvidia-smi --format=csv --query-gpu=pstate`
>&emsp;&emsp;`temperature.gpu`&emsp;&emsp;&emsp;&emsp;&emsp;#输出GPU的显卡温度：`nvidia-smi --format=csv --query-gpu=temperature.gpu`
>&emsp;&emsp;`utilization.gpu`&emsp;&emsp;#输出GPU的使用率：`nvidia-smi --format=csv --query-gpu=utilization.gpu`
>&emsp;&emsp;`utilization.memory`&emsp;&emsp;#输出显存的使用率：`nvidia-smi --format=csv --query-gpu=utilization.memory`
>&emsp;&emsp;`memory.total`&emsp;&emsp;&emsp;&emsp;#显存大小，输出总显存值：`nvidia-smi --format=csv --query-gpu=memory.total`
>&emsp;&emsp;`memory.used`&emsp;&emsp;&emsp;&emsp;&emsp;#显存大小，输出使用了多少显存：`nvidia-smi --format=csv --query-gpu=memory.used`
>&emsp;&emsp;`memory.free`&emsp;&emsp;&emsp;&emsp;&emsp;#显存大小，输出剩余多少显存：`nvidia-smi --format=csv --query-gpu=memory.free`；不太准，建议使用：总显存-使用显存来计算；
>`--format`&emsp;&emsp;&emsp;#结果记录文件格式是csv类型。（csv）
>`tee`&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;#双重重定向到gpu-log.csv文件中。

#### 指定0显卡输出csv类型的显存总空间及使用空间和剩余空间

```bash
nvidia-smi -i 0 --format=csv  --query-gpu=memory.total,memory.used,memory.free
```
>`-i`&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;#指定显卡编号；不使用`-i`，默认是显示所有的显卡型号的数据；`nvidia-smi --format=csv  --query-gpu=memory.total,memory.used,memory.free`
>`--format`&emsp;&emsp;&emsp;&emsp;#结果记录文件格式是csv类型。（csv）
>`--query-gpu`&emsp;&emsp;#都记录哪些数据到csv文件中；
>&emsp;&emsp;`memory.total`&emsp;&emsp;&emsp;&emsp;#显存大小，输出总显存值：`nvidia-smi --format=csv --query-gpu=memory.total`
>&emsp;&emsp;`memory.used`&emsp;&emsp;&emsp;&emsp;&emsp;#显存大小，输出使用了多少显存：`nvidia-smi --format=csv --query-gpu=memory.used`
>&emsp;&emsp;`memory.free`&emsp;&emsp;&emsp;&emsp;&emsp;#显存大小，输出剩余多少显存：`nvidia-smi --format=csv --query-gpu=memory.free`；不太准，建议使用：总显存-使用显存来计算；


#### 查询所有的csv文件`--format`可使用的字段及字段说明、实例

```bash
csv			文件格式			vidia-smi --format=csv --query-gpu=memory.total
noheader	去除文件头部标题	vidia-smi --format=csv,noheader --query-gpu=memory.total
nounits		去除单位，比如MiB	nvidia-smi --format=csv,noheader,nounits --query-gpu=memory.total
```
#### 查询总显存不带头部标题

```bash
nvidia-smi --format=csv,noheader --query-gpu=memory.total
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201007130.png)

#### 查询总显存不带头部标题并且不带单位

```bash
nvidia-smi --format=csv,noheader,nounits --query-gpu=memory.total
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201007634.png)

## 附加：计算某显卡的剩余显存脚本
>下载地址：[计算显卡的剩余显存脚本：nvidia.sh](https://download.csdn.net/download/liu_chen_yang/87364591?spm=1001.2014.3001.5503)
>下载时记得看下面的说明和用法哈；
>注▲：没有积分可购买时，可私信我发你；但是还是需要进去看一下说明和用法，保证能够顺利使用。
