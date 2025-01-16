---
title: Linux磁盘管理
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 磁盘
  - 运维
pageview: false
date: 2024-12-19
comment: false
breadcrumb: false
---




## <font color=red>fdisk：</font>

磁盘管理-->块设备文件	b开头-->/dev/
对于linux系统磁盘命名：
IDE接口的硬盘为 hda hdb
SAS，SATA，SCSI接口的硬盘	sda  分区sda1 sda2  sdb

主引导记录（MBR）:位于磁盘的第一个扇区
521字节=446字节  引导程序
	记录4个分区表，每个16字节，64字节
	还有2个校验字节



|fdisk	|磁盘管理工具  |
|------------|--|
|-l	|查看所有磁盘信息
|n	|创建新分区
|d	|删除分区
|p	|列出分区表
|w|	把分区表写入硬盘并退出
|e|	扩展分区

> <font color=red>最常用的查看磁盘分区：fdisk -l</font>

MBR中只可以划分4个主分区，或者时3个主分区+1个扩展分区
扩展分区后，可以划分逻辑分区

> 1.fdisk划分分区<br>
2.创建文件系统	mkfs.xfs /dev/sdb1（划分）
&emsp;&emsp;文件系统：组织和管理文件的
&emsp;&emsp;FAT16	FAT32	exFAT	u盘使用-->不支持单个超过4G
&emsp;&emsp;NTFS	-->windows使用
<font color=red>&emsp;&emsp;ext4/ext3/ext2 -->centos6默认</font>
<font color=red>&emsp;&emsp;XFS	-->centos7默认</font>
<font color=red>&emsp;&emsp;centos6和centos7的区别：默认系统不同</font><br>
mkfs	创建文件系统
-f	强制覆盖
<br>
因为系统中主分区加扩展分区占用1-4的分区号，所以第一个逻辑分区为5

|partprobe		  |刷新分区表|
|----------------|--|


| df | 查看系统挂载信息 |
|--|--|
|-T|	显示文件系统类型
|-h|	以人类可读方式显示
|-i	|查看inode情况

<font color=teal>常用的是：df -Th	查看挂载文件</font>


## <font color=red>gdisk：</font>

gdisk	-->划分容量超过2T磁盘分区	GPT	128个
parted

<font color=red size=4>交换分区	swap</font>

> 作用：当内存不够时，使用交换分区代替内存；



>mkswap	创建交换分区
swapon	开启交换分区
&emsp; &emsp;  -s	查看系统中的交换分区
&emsp;  &emsp;  -p	设置优先级
&emsp; &emsp;   -a	开启所有的交换分区
swapoff	关闭交换分区 


<font color=red>查看内存：</font>

> free -m	查看内存
free 	查看系统内存使用情况
&emsp;&emsp;-m	以M为单位


<font color=red>查看文件、目录大小：</font>

> du  文件名	查看文件或目录占用磁盘大小
&emsp;&emsp;-m	-h	以人类可读方式显示
&emsp;&emsp;-m	-s	仅显示目录或文件的总计数值


------------------------------------------------------

## <font color=red>LVM 逻辑卷管理：</font>

<font color=blue>作用：动态调整区分大小<br>
缺点：在性能上有所降低</font><br><br>

<font color=orrages>pv  物理卷 -->直接对磁盘操作<br>
vg  卷组 -->将所有的物理卷组合<br>
lv    逻辑卷 -->在卷组中划分出一定的空间</font>

|  |  |
|--|--|
|pvcreate	|创建物理卷（pvcreate /dev/sdc1 /dev/sdd1）
|vgcreate	|创建卷组	(vgcreate 卷组名 /dev/sdc1 /dev/sdd1)
|lvcreate	|创建逻辑卷(lvcreate -L 10G -n lv0 /dev/vg0)【/dev/vg0卷组的路径】
|-L	|指定逻辑卷容量
|-n	|指定逻辑卷名字
|.....|.............................
|pvdisplay|	显示物理卷信息
|vgdisplay	|显示卷组信息
|lvdisplay|	显示逻辑卷信息
|...|....
|pvscan|	扫描物理卷
|vgscan|	扫描卷组
|lvscan|	扫描逻辑卷
|...|....
|pvremove|	删除物理卷
|vgremove|	删除卷组
|lvremove|	删除逻辑卷
|...|....
|pvchange|	修改物理卷
|vgchange|	修改卷组
|lvchange|	修改逻辑卷
|...|....
|vgextend	|扩展卷组
|lvextend|	扩展逻辑卷
|vgreduce|	缩容卷组
|lvreduce	|缩容逻辑卷

<font color=teal>xfs_growfs 路径	刷新xfs文件系统
resize2fs 路径	刷新ext4文件系统</font>

------------------------------------------------------

## <font color=red>cache 缓存：</font>

> cache data LV	数据卷，用来缓存数据
cache metadata LV	元数据卷，用来缓存元数据
cache pool LV	缓存池，包含data+meta
cache LV		缓存卷，包含真时的LV卷+缓存池

SSD	固态硬盘
HDD	机械硬盘

<font color=red>lsblk	列出块设备信息</font>

> 创建缓存数据	lvcreate -L 10G -n cache_data /dev/vg0 /dev/sde1<br>
创建元数据	lvcreate -L 100M -n cache_meta /dev/vg0 /dev/sde1<br>
创建缓存池	lvconvert --type cache-pool --poolmetadata vg0/cache_meta vg0/cache_data<br>
把缓存池里的放到逻辑卷下：		lvconvert --type  cache --cachepool vg0/cacha_data vg0/lv0

创建一个新的文件系统：mkfs.xfs /dev/vg0/lv0
在跟目录下创建test
挂载根目录下的test：mount /dev/vg0/lv0 /test

## <font color=red>snapshot 快照：</font>

> -s	快照
> -L  值	要设置的大小
-n  名字	要写的名字<br>
创建快照卷：lvcreate -L 2G -s -n lv_snapshot vg0/lv0
测试快照卷速度：	dd if=/dev/sda of=/test/mbr.bak bs=512 count=1（dd测试，if源路径，of要复制到哪路径，bs一次复制多少M，count复制多少次）
		dd if=/dev/zero of=/test/mbr.bak bs=10M count=100（dd测试，if源路径，zero代表0，of要复制到哪路径，bs一次复制多少M，count复制多少次）
		<br>
在跟目录下创建/snapshot目录
挂载：mount -o nouuid /dev/vg0/lv_snapshot /snapshot/（uuid相同用-o nouuid）

<font color=teal>UUID	设备的唯一标识：<br>
blkid	查看磁盘的UUID<br>
nmcli conn show	查看网卡的UUID</font>


## <font color=red>RAID 独立磁盘冗余阵列 数据安全性</font>

> 硬RAID	软RAID<br>
<font color=red>RAID 0 条带模式</font>
优点：提高数据的读写速度
缺点：数据安全性低，一旦RAID中有磁盘损坏，RAID组不可用<br>
<font color=red>RAID 1	镜像模式	需要2N快盘</font>
优点：数据完全冗余（备份），安全性高（读效率相对提高）
缺点：磁盘利用率低，成本高(50%)(写性能有所降低)<br>
<font color=red>RAID 5	分布式奇偶校验模式	至少使用少3块硬盘</font>
优点：数据相对安全，允许有一块磁盘损坏（校验数据）	读性能相对有提升
缺点：如果两块盘损坏，RAID不可用，写性能相对较低（做校验数据）
使用率："[（n-1）/n]*100"<br>
RAID 10
RAID 50

软RAID实现通过mdadm
|  |  |
|--|--|
| -C|	创建一个新的RAID
|-l	|指定RAID级别
|-n	|指定使用磁盘的数量
|-x	|指定热备盘
|-S	|停止RAID设备
|-D	|输出指定RAID设备的详细信息

<font color=red>降级与重构</font>

> cat /proc/mdstat






