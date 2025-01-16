---
title: 【Linux】磁盘分区管理及挂载_永久挂载管理
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 磁盘管理
  - 运维
pageview: false
date: 2024-12-18
comment: false
breadcrumb: false
---

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181342354.jpeg)

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---

## 前言
> &emsp;&emsp;今天新到了一台服务器，需要安装服务；因为在安装服务的时候，发现/根目录下没有空间了，通过`fdisk -l`查看了一下磁盘空间，发现还有多余的100G没有使用，所以，这时候就需要去扩容磁盘分区；
>  &emsp;&emsp;当然，在扩容的时候也是有受阻的，比如遇到了磁盘损坏问题`“报错fdisk: cannot write disk label: Invalid argument”`，这个需要去修复一下：使用`parted -l`此命令去修复一下，即可重新进行扩容分区；因为在安装的时候也是遇到了一些问题的，因为好几年都没对磁盘空间进行分区了，所以有些忘了，在这里记录一下；
>   &emsp;&emsp; 因为服务器已经安装好服务，我们就用虚拟机来进行磁盘分区和挂载并设置永久挂载。



首先，我们需要准备一个虚拟机，并在添加一块硬盘；添加的时候使用`推荐的`即可，然后创建一个新的虚拟磁盘，这个就不会影响其他的了；磁盘大小我这里就设置成50G即可；过多的细节就不一一说了，一直下一步即可。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181342516.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181342984.png)

设置好之后，启动虚拟机，进行磁盘管理，和磁盘扩容。

## 一、查看磁盘空间

可以使用`fdsik -l`查看磁盘空间，这样查看的比较详细；

```bash
fdisk -l
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181342196.png)





也可以使用`lsblk`查看现有的磁盘，看着比较简便明了。

```bash
lsblk
```



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181342084.png)



使用`fdisk -l`可以看到`/dev/sdb`下还有50G空间；目前是空闲的；我们需要将他这50G挂载到/data/上；



## 二、进行磁盘分区

首先我们先说说磁盘分区的一些命令：
|磁盘分区的管理工具  |
|--|
|fdisk  |
|gdisk  |
|lsblk|

```bash
# 查看磁盘分区
fdisk -l 	# 查看所有磁盘信息
lsblk		# 查看所有磁盘信息

# 对磁盘分区进行操作
fdisk -l	# 对磁盘分区进行操作
gdisk -l	# 对磁盘分区进行操作（用于划分容量超过2T磁盘分区，需要手动安装）
```
* 进入磁盘分区的常用的操作命令

|命令|解析  |
|--|--|
|m /help | 帮助命令，查看其他参数 |
| p |  列出分区表|
|n  |创建新的分区 |
|  d |  删除一个分区|
| v |查看分区详细信息  |
|e  |  扩展分区|
| q | 不保存，退出 |
| w |  保存，退出|


* 分区讲解
>MBR中只可以划分4个主分区，或者时3个主分区+1个扩展分区
扩展分区后，可以划分逻辑分区



*  进行磁盘分区

```bash
# 首先刷新一下磁盘分区表(如果没执行成功也无所谓，这步可有可无)
partprobe

# 进行磁盘分区
[root@localhost ~]# fdisk /dev/sdb

Welcome to fdisk (util-linux 2.32.2).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table.
Created a new DOS disklabel with disk identifier 0x14c524a5.

# n 创建磁盘分区
Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): 

# 默认为主分区，直接回车；e为扩展分区。
Using default response p.
# 选择1-4分区，默认为1，因为sdb还没有分区，所以直接回车默认就行
Partition number (1-4, default 1): 
# 选择起始扇区，默认为2048，直接回车就好了
First sector (2048-104857599, default 2048): 
# 选择要分的磁盘空间大小，默认就是最大，直接回车即可；如果有其他需求，写对应的值即可；
Last sector, +sectors or +size{K,M,G,T,P} (2048-104857599, default 104857599): 

# 提示，成功创建一个Linux类型的磁盘分区，大小为50G。
Created a new partition 1 of type 'Linux' and of size 50 GiB.

# p 进行查看，列出分区表；这块是最后我在虚拟机上复制的，虽然是中文，但是都一样。
Command (m for help): p
磁盘 /dev/sdb：53.7 GB, 53687091200 字节，104857600 个扇区
Units = 扇区 of 1 * 512 = 512 bytes
扇区大小(逻辑/物理)：512 字节 / 512 字节
I/O 大小(最小/最佳)：512 字节 / 512 字节
磁盘标签类型：dos
磁盘标识符：0xe5a06cd9

   设备 Boot      Start         End      Blocks   Id  System
/dev/sdb1            2048   104857599    52427776   83  Linux


# 可以看到已经列出来了一个50G的sdb1磁盘分区，这时候我们要保存退出;
# w 保存退出，如果不想保存直接退出可以使用 q 。
Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.
```

这样磁盘分区就创建完了；

* 查看磁盘分区

```bash
fdisk -l
lsblk
```



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181342963.png)





![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181342505.png)





可以看到sdb分出来一个区为50G；



接下来我们就是挂载磁盘分区。





## 三、挂载`/dev/sdb1`到/data/目录

* 首先，需要创建一个/data/空目录

```bash
# 记得先查看一下，如果没有就可以创建了，如果有可以重新找一个挂载目录。
mkdir /data
```

然后对磁盘分区进行挂载；直接挂载肯定是不行的，会提示报错的；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181342542.png)

所以需要先格式化磁盘分区。
> 这里针对一下centos格式化磁盘空间的类型；
><font color=gree> centos7是xfs，centos6是ext4</font><br>
>#Cetnos6格式化磁盘命令为：
><font color=gree>mkfs.ext4 -f /dev/[sda]</font>
>#Centos7格式化磁盘命令为：
><font color=gree>mkfs.xfs -f /dev/[sda]</font>

这里我们是centos7的环境，那么就使用xfs来格式化；

```bash
# 格式化磁盘分区
[root@192 ~]# mkfs.xfs -f /dev/sdb1
meta-data=/dev/sdb1              isize=512    agcount=4, agsize=3276736 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=1        finobt=0, sparse=0
data     =                       bsize=4096   blocks=13106944, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0 ftype=1
log      =internal log           bsize=4096   blocks=6399, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0

# 格式化完之后，这时候我们就可以挂载目录了
[root@192 ~]# mount /dev/sdb1 /data/

# 挂载完成之后df -Th查看一下磁盘空间即可；
[root@192 ~]# df -Th
文件系统                类型      容量  已用  可用 已用% 挂载点
devtmpfs                devtmpfs  898M     0  898M    0% /dev
tmpfs                   tmpfs     910M     0  910M    0% /dev/shm
tmpfs                   tmpfs     910M  9.6M  901M    2% /run
tmpfs                   tmpfs     910M     0  910M    0% /sys/fs/cgroup
/dev/mapper/centos-root xfs        17G  1.2G   16G    7% /
/dev/sda1               xfs      1014M  150M  865M   15% /boot
tmpfs                   tmpfs     182M     0  182M    0% /run/user/0
/dev/sdb1               xfs        50G   33M   50G    1% /data

# 可以看到/dev/sdb1已经挂载上了，类型为 xfs。
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181342590.png)


扩展：
>mkfs：	创建文件系统
-f：		强制覆盖

>红帽系统8.8格式化命令为： /sbin/mke2fs -j /dev/sdb1    
>（-j 是ext2，而日志是ext3）
>永久挂载为：
>/dev/sdb1                                       /data                   ext3    defaults                                                1 2
>至于为什么是ext3，我也不是很清楚，因为这是商家的一个要求，毕竟永久挂载错了，服务器就起不来了，就需要去虚拟机或者连接服务器去看报错信息；一般配置完这个导致服务器启动不来大部分都是因为类型配置错了。


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181342427.png)


这个直接mount挂载完只是临时挂载，如果不设置永久挂载，服务器重启之后就会掉，还需要手动去挂载，容易丢失数据，所以我们还需要设置永久挂载。

>临时卸载挂载的磁盘为：`numount /data/`
## 四、设置永久挂载
永久挂载我们需要去`/etc/fstab` 配置文件中来配置；

```bash
[root@192 ~]# vim /etc/fstab

# 在最后一行添加
/dev/sdb1 /data/ xfs defaults 0 0
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181341103.png)


然后保存退出，重启测试`reboot`重启，如果配置的挂载有问题会导致服务器启动不了，需要到虚拟机或服务器去排查问题，查看报错信息，一般配置完这个导致服务器启动不了或者是大部分都是因为<font color=red>类型</font>配置错了，<font color=red>所以要谨慎更谨慎</font>；

解析：

> **/dev/sdb1**：为磁盘分区的目录，也就是挂载到data的源目录
**/data/**：这个是目录路径，挂载的目标路径及目录
**xfs**：centos7是xfs，centos6是ext4，如果不确定可以使用`df -Th`命令看临时挂载的时候的类型是什么。
**defaults**：挂载的参数 defaults默认参数
**第五段**：是否使用dump备份 0不备份 1备份 <font color=orange>（0）</font>
**第六段**：是否使用fsck检测 0不检测 1检测 <font color=orange>（0）</font>

重启测试，可以连接上，在使用`df -Th`看看，没有问题即可；那便是完成永久挂载了。

## 五、配置完成
