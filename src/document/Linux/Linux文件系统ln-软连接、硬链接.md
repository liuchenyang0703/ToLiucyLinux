---
title: Linux文件系统ln-软连接、硬链接
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



ln命令是linux系统中一个非常重要命令，英文全称是“link”，即链接的意思，它的功能是为某一个文件在另外一个位置建立一个同步的链接。 一种是hard link，又称为硬链接；另一种是symbolic link，又称为符号链接。


通俗一点理解，可以把硬链接当成源文件的副本，他和源文件一样的大小，但是事实上却不占任何空间。符号链接可以理解为类似windows一样的快捷方式。

> inode：文件元数据-->权限	归属	时间	类型·block位置
block：磁盘IO的最小单位	默认4K=8个扇区<br>
一个文件占用一个inode，至少占用一个block

目录本身就是特殊的文件
目录的block存放的是目录下文件和目录的名字

**<font color=red>硬链接与软链接（符号链接）</font>**
<font color=blue>ln</font>

> ll命令查看结果，其中-rw-------1后面有个1就是硬链接数
硬链接是文件的另一个入口
软连接类似于windows的快捷方式

## 硬链接与软连接的区别：

> 1.硬链接的inode号相同，软连接inode不同
>&emsp;&emsp;diff	比较两个文件是否相同（返回信息是不同，不返回信息是相同）
&emsp;&emsp;vimdiff	比较两个文件是否相同
2.删除或重命名源文件对硬链接没有影响，软连接不可用。
3.硬链接不能跨文件系统；软链接可以跨文件系统。
4.目录不能创建硬链接；目录可以创建软链接
5.创建硬链接是ln；	创建软连接是ln -s

## <font color=teal>语法格式：</font>

>  ln [参数] [源文件或目录] [目标文件或目录]

## <font color=teal>常用参数：</font>

|  |  |
|--|--|
|-b	|为每个已存在的目标文件创建备份文件
|-d|	此选项允许“root”用户建立目录的硬链接
|-f|	强制创建链接，即使目标文件已经存在
|-n |把指向目录的符号链接视为一个普通文件
|-i	|交互模式，若目标文件已经存在，则提示用户确认进行覆盖
|-s	|对源文件建立符号链接，而非硬链接
|-v|	详细信息模式，输出指令的详细执行过程




## <font color=teal>参考实例：</font>

为源文件file.txt创建硬链接file_1：

> [root@linuxcool ~ ]# ln /root/dir/file.txt ./file_1


使用ln命令的“-s”参数来创建目录的符号链接，并使用ls命令来查看链接文件的详细信息：

> [root@linuxcool ~]# ln -s dir file
[root@linuxcool ~]# ls -l
总用量 4
-rw-------. 1 root root 1138 3月  11 14:48 anaconda-ks.cfg
drwxr-xr-x. 2 root root   36 4月   3 08:47 test
lrwxrwxrwx. 1 root root    4 4月   3 08:54 file -> dir

使用ln命令的“-v”参数来输出命令的详细执行过程：

> [root@linuxcool ~]# ln -v /root/dir/file.txt ./file_1
 './file_1' => '/root/dir/file.txt'

使用ln命令的“-b”命令来创建目标文件的备份文件，并使用ls命令来查看：
> 
> [root@linuxcool ~]# ln -b /root/dir/file.txt ./file_1
[root@linuxcool ~]# ls
 anaconda-ks.cfg  file_1  file_1~  dir 



## 相关命令：

1.df -Th 	查看磁盘空间
2.df -Thi	查看inode情况
inode耗尽引发的故障

1.删除不用的小文件
2.备份后，重新创建文件系统

<font color=teal>tune2fs 文件路径	查看文件系统的信息<br>
dumpe2fs 文件路径	查看文件系统的信息</font>




