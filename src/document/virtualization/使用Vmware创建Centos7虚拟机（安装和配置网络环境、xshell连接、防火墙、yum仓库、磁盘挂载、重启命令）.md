---
title: 使用Vmware创建Centos7虚拟机（安装和配置网络环境、xshell连接、防火墙、yum仓库、磁盘挂载、重启命令）
icon: circle-info
order: 1
category:
  - Linux
  - 虚拟化
tag:
  - Linux
  - 虚拟机
  - 运维
pageview: false
date: 2024-12-19
comment: false
breadcrumb: false
---



## <font color=red>网络配置 NAT</font>

前提：
>配置网络配置的时候需要先看本机的ip；
>`cmd`打开输入`ipconfig`查看本机ip
>
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201046754.png)
>
>可以看出ip为`192.168.0.103`，子网掩码为：`255.255.255.0`，默认网关为：`192.168.0.1`
>那么我们配置虚拟机ip的时候就不能写：192.168.2.10之类的了，需要和本机相关；


所以，配置的内容：网关需要和本机一致：`192.168.0.1`，子网掩码也是一样的：`255.255.255.0`，ip的话可以设置：`192.168.0.1 - 192.168.0.255`

注意：
>此方法适用于`桥接模式`，如果开始设置的模式为`net模式`，则还需要到`虚拟机中`的`虚拟网络编辑器`中配置，详细配置可百度一下：[vamware虚拟机配置net网络](https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=vamware%E8%99%9A%E6%8B%9F%E6%9C%BA%E9%85%8D%E7%BD%AEnet%E7%BD%91%E7%BB%9C&oq=vamware%2520%25E8%2599%259A%25E6%258B%259F%25E6%259C%25BA%25E9%2585%258D%25E7%25BD%25AEnet%25E7%25BD%2591%25E7%25BB%259C&rsv_pq=b4c587e000002804&rsv_t=7d756RDi%2bJFRWPyxy6r1OyDYklnF8CpmmqLUVKudH2VsqL/AiNLQfDjD3Sk&rqlang=cn&rsv_enter=1&rsv_dl=tb&rsv_btype=t&inputT=221&rsv_sug3=43&rsv_sug1=33&rsv_sug7=100&rsv_sug2=0&rsv_sug4=976)
因为桥接模式，比较简便多用，不用配置`虚拟网络编辑器`，也不用在本机配置`VMware Virtual Ethernet Adapter for VMnet8`。


* 进入网卡页面：

```bash
vim /etc/sysconfig/network-scripts/ifcfg-ens33
```
* 配置网络：
```bash
TYPE=Ethernet
BOOTPROTO=static
NAME=ens33
DEVICE=ens33
ONBOOT=yes
IPADDR=192.168.0.10
NETMASK=255.255.255.0
GATEWAY=192.168.0.1
DNS1=114.114.114.114
```
* 重启网络服务 

```bash
/etc/init.d/network restart 
```
*  查看网络信息 

```bash
ip a 
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201046546.png)
* ping百度，测试是否可以连接网络

```bash
ping baidu.com
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201046423.png)

可以连接，那么就开始在本机ping刚刚配置的ip，如果可以ping通，这时候就可以用xshell等连接工具连接了。

## <font color=red>xshell连接慢如何解决</font>

进入vi /etc/ssh/sshd_config 
再找到UseDNS 吧yes改成no，前面“#”符号也要删，保存退出
重启ssh服务：
systemctl restart sshd

## <font color=red>防火墙与selinux的关闭及开启和永久生效 </font>

防火墙详情请看：👉[Linux防火墙命令](https://blog.csdn.net/liu_chen_yang/article/details/123531619)👈

> systemctl stop firewalld  关闭防火墙服务
            start <br>
systemctl disable firewalld  禁止防火墙开机自启动
          enable <br>
firewall-cmd --state    查看防火墙状态		  
systemctl status firewalld<br>
systemctl is-enabled firewalld 
查看防火墙是否开机自启动  <br>
getenforce  查看selinux的状态
setenforce  设置selinux的状态  
vi /etc/selinux/config 
vi /etc/sysconfig/selinux 
SELINUX=disabled
重启系统生效

## <font color=red>挂载磁盘</font>

> 查看磁盘信息：
fdisk -l 查看<br>
创建目录：
mkdir /media/cdrom
mount /dev/sr0 /media/cdrom 挂载磁盘 <br>
df -Th 挂在完查看挂载信息

如果遇到挂载时报错：`mount: 在 /dev/sr0 上找不到媒体`
请检查ISO映像文件的连接设置；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201046739.png)


## <font color=red>配置本地yum仓库</font>

```bash
cd /etc/yum.repos.d/
mkdir bak
mv *.repo bak
```

> yum源文件存在 /etc/yum.repos.d 中<br>
> 创建一个文件(local.repo)：
vi local.repo
[local]
name=local
baseurl=file:///media/cdrom
enabled=1
gpgcheck=0

> 配置完成之后<br>
> yum clean all  清除yum缓存 
yum makecache  建立新的yum缓存 
或者直接用：yum makecache fas**t <font color=darkorange>加载未加载的缓存</font>**
**<font color=blue>安装vim和man命令：</font>** yum -y install vim man 






<font color=red>设置永久挂载：</font>

> 进入fstab：<br>
> vim /etc/fstab
``/dev/sr0 /media/cdrom iso9660 defaults 0 0``
第一段:挂载的设备	<font color=darkorange>（dev/sr0）</font>
第二段:挂载的目录 	<font color=darkorange>（/media/cdrom）</font>
第三段:文件系统类型 <font color=darkorange>（iso9660）</font>
第四段:挂载的参数 defaults默认参数 <font color=darkorange> （defaults ）</font>
第五段:是否使用dump备份  0不备份  1备份 <font color=darkorange>（0）</font>
第六段:是否使用fsck检测  0不检测<font color=darkorange>（0）</font>


<font color=red>注解：</font>

> 1.系统中只有一块硬盘，sda,分区sda1,sda2 ;
2.根目录是整个系统目录的顶点，/mnt也在根目录下；
3.如果知道根目录对应的是哪个硬盘分区，可以判断出
a.txt存到哪个设备上；<br>
mount /dev/sr0 /media/cdrom 
mount /dev/sdb4 /mnt
## <font color=red>扩展：挂载扩容盘</font>
比如我们在创建虚拟机的时候还加了一块盘，想要挂载在/data/目录下，那么我们可以：

```bash
# 先创建/data目录
mkdir /data

# 挂载目录
fdisk -l	# 查看磁盘分区，确认新加的盘为那个，我这里是sdb

# 将新盘sdb挂载到data目录
mount /dev/sdb /data

# 如果出现了下面的内容
[root@localhost ~]# mount /dev/sdb /data
mount: /dev/sdb 写保护，将以只读方式挂载
mount: 未知的文件系统类型“(null)”
# 那么需要格式化一下磁盘，也就是下面将的，分centos6与centos7
[root@localhost ~]# mkfs.xfs -f /dev/sdb
meta-data=/dev/sdb               isize=512    agcount=4, agsize=3932160 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=1        finobt=0, sparse=0
data     =                       bsize=4096   blocks=15728640, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0 ftype=1
log      =internal log           bsize=4096   blocks=7680, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0

# 这样就格式化完成了，然后再次进行挂载；
mount /dev/sdb /data
#就可以看到已经挂载完成了。
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201046334.png)

现在挂载完成了，但是重启他会失效，需要重新挂载，如果我们不想重新挂载，那么可以和上面的挂载方法一样，设置永久挂载；

```bash
[root@localhost ~]# vim /etc/fstab

# 在最后一行添加
/dev/sdb /data/ xfs defaults 0 0
```
然后保存退出，重启测试，如果配置的有问题会导致连接不上，需要到虚拟机或服务器重新配置，所以要谨慎更谨慎；

解析：
>/dev/sdb：为磁盘分区的目录，也就是挂载到data的源目录
>/data/：这个是目录路径，挂载的目标路径及目录
>xfs：centos7是xfs，centos6是ext4，如果不确定可以看在临时挂载的时候`df -Th`看到的
>defaults：挂载的参数 defaults默认参数
>第五段：是否使用dump备份  0不备份  1备份 <font color=darkorange>（0）</font>
>第六段：是否使用fsck检测  0不检测<font color=darkorange>（0）</font>

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201046475.png)


## <font color=red>扩展：格式化磁盘</font>

```bash
#Cetnos6格式化磁盘
mkfs.ext4 -f /dev/[sda]
#Centos7格式化磁盘
mkfs.xfs -f /dev/[sda]
```

<br>

**<font color=teal>重启系统的命令：reboot、init 6、shutdown -r </font>**


