---
title: 【Linux】之Centos7安装KVM虚拟化及相关命令
icon: circle-info
order: 1
category:
  - Linux
  - 虚拟化
tag:
  - Linux
  - KVM
  - 虚拟化
  - 运维
pageview: false
date: 2024-12-18
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

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181607803.png)




---

## 备份网络配置（卸载时需要用到）

```bash
#进入网络配置目录
cd /etc/sysconfig/network-scripts/
#进行备份（备份时不要用原来的名字加bak这种备份，这种备份会在创建桥接设备时被清除）
mkdir backup
cp -ar ifcfg-ens33 backup/ens33-bak
#或者直接
cp -ar ifcfg-ens33 ens33-bak
```

## 检测是否支持KVM虚拟化

> &emsp;&emsp;KVM 是基于 x86 虚拟化扩展(Intel VT 或者 AMD-V) 技术的虚拟机软件，所以查看 CPU 是否支持 VT 技术，就可以判断是否支持KVM。有返回结果，如果结果中有vmx（Intel）或svm(AMD)字样，就说明CPU的支持的。


```bash
cat /proc/cpuinfo | egrep 'vmx|svm'
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181607556.png)
由此可看到，我这边是支持的；

有一个要注意的就是：要关闭selinux沙盒

```bash
#进入selinux中配置
vim /etc/sysconfig/selinux 

#将第6行设置为disabled
SELINUX=disabled

#保存退出;重启系统生效
```


<font color=red>如果是虚拟机的话，记得在虚拟机设置中开启虚拟化</font>

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181607168.png)

## 查看是否加载上KVM

```bash
[root@kvm ~]# lsmod | grep kvm
kvm_intel             188644  0 
kvm                   621480  1 kvm_intel
irqbypass              13503  1 kvm
```
有结果则加载上了KVM，如果没有的话可执行以下命令，再次查看；

```bash
[root@kvm ~]# lsmod | grep kvm
```
## 安装KVM相关软件包
通过 yum 安装 kvm 基础包和管理工具

kvm相关安装包及其作用:

```bash
qemu-kvm 			主要的KVM程序包
python-virtinst	 	创建虚拟机所需要的命令行工具和程序库
virt-manager 		GUI虚拟机管理工具
virt-top 			虚拟机统计命令
virt-viewer 		GUI连接程序，连接到已配置好的虚拟机
libvirt 			C语言工具包，提供libvirt服务
libvirt-client 		为虚拟客户机提供的C语言工具包
virt-install 		基于libvirt服务的虚拟机创建命令
bridge-utils 		创建和管理桥接设备的工具
```

安装KVM所需的包

```bash
yum -y install qemu-kvm python-virtinst libvirt libvirt-python virt-manager libguestfs-tools bridge-utils virt-install
```
## 开启KVM服务libvirt并设置开机自启

```bash
[root@kvm ~]# systemctl start libvirtd
[root@kvm ~]# systemctl enable libvirtd
```
查看libvirt当前的状态

```bash
[root@kvm ~]# systemctl status libvirtd
```
这样就是正在运行时（绿色的running）

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181607656.png)
## 设置机器的存储
首先就是看那块有空间

```bash
df -Th
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181607698.png)

可以看到/home目录下是有空间的，那么我们就将数据放到/home下：

**在/home目录下创建两个目录，一个存放系统镜像，一个做虚拟机的存储盘**
```bash
[root@kvm ~]# mkdir -p /home/kvm/iso
[root@kvm ~]# mkdir -p /home/kvm/images
```

准备镜像
>可以自己下载一个传到服务器中，也可以使用wget下载一个

```bash
wget https://mirrors.aliyun.com/centos/7/isos/x86_64/CentOS-7-x86_64-Minimal-2009.iso
```

上传镜像并将镜像放到/home/iso目录下

```bash
mv CentOS-7-x86_64-Minimal-2009.iso /home/iso/
```

## 创建物理桥接设备
1.查看网卡信息

```bash
ifconfig
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181607013.png)
2.关闭NetworkManager服务

```bash
[root@kvm ~]# chkconfig NetworkManager off
[root@kvm ~]# service NetworkManager stop
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181607392.png)

3.桥接设备关联网卡

设备网卡要看自己的网卡名称，我这边是ens33，用ifconfig查看；第一步已经说了；
```bash
[root@kvm ~]# virsh iface-bridge ens33 br0
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181607745.png)

4.查看是否成功

```bash
[root@kvm ~]# brctl show
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181607146.png)

多了一个br0，就可以看到已经成功了；

## 进入图形化界面
如果虚拟机不是在本地的话，就需要装一个<font color=red>**Xmanager（虚拟化界面工具）**</font>,可自行百度下载；

**<font color=gree>虚拟机中：</font>**
进入图形化界面：

```bash
init 5
```
如果发现虚拟机没有反应，那就是安装的时候选择的最小安装，没有安装桌面环境；
我们先来安装一下GNOME 桌面环境

```bash
yum groupinstall -y "GNOME Desktop"
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181606768.png)

安装完成之后，init 5 进入GNOME桌面环境：到虚拟机（vmvare）里操作；

```bash
init 5
```

进入GNOME桌面环境之后按照下面一步步走就可以了；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181606198.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181606751.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181606986.png)

时区设置为上海

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181606750.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181606760.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181606213.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181606218.png)

开始使用就好了

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181606336.png)
## 开始使用KVM

进入GNOME桌面环境之后我们打开终端；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181606467.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181606673.png)

### 在虚拟机中创建新的虚拟机

```bash
#使用virt-manager命令打开虚拟机管理器
virt-manager
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181606314.png)

打开虚拟系统管理器

>前面已经让上传了一个iso映像了，我们就用前面上传的吧，如果没上传创建虚拟机会找不到iso映像的。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181606631.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181606305.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181606211.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181605548.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181605768.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181605030.png)![](https://img-blog.csdnimg.cn/de1a1d91ec6d4faa8634b59120047c10.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181605933.png)

如果要给大一点的话可以查看自己的磁盘空间，哪个目录大，就把iso放到哪个目录，这样就可以选择更大的空间了；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181605835.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181605051.png)

点击完成就开始创建

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181605040.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181605152.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181605219.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181605546.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181605797.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181605287.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181605771.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181605099.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181605822.png)

登录账号密码，账号就是root，密码就是刚刚设置的root密码；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181605959.png)
### 新的虚拟机创建完成

这样就可以在虚拟机中创建一个虚拟机了，也就是KVM了。



<br>

### 【附加】virsh常用命令

```bash
[root@kvm ~]# virsh --help                                     #查看命令帮忙
 
[root@kvm ~]# virsh list                                       #显示正在运行的虚拟机
 
[root@kvm ~]# virsh list --all                                 #显示所有的虚拟机
 
[root@kvm ~]# virsh start vm-node1                             #启动vm-node1虚拟机
 
[root@kvm ~]# virsh shutdown vm-node1                          #关闭vm-node1虚拟机
 
[root@kvm ~]# virsh destroy vm-node1                           #虚拟机vm-node1强制断电
 
[root@kvm ~]# virsh suspend vm-node1                           #挂起vm-node1虚拟机
 
[root@kvm ~]# virsh resume vm-node1                            #恢复挂起的虚拟机
 
[root@kvm ~]# virsh undefine vm-node1                          #删除虚拟机，慎用
  
[root@kvm ~]# virsh edit vm-node1                              #修改vm-node1的xml配置文件（内存、磁盘空间....）都可以修改

[root@kvm ~]# virsh dominfo vm-node1                           #查看虚拟机的配置信息
 
[root@kvm ~]# virsh domiflist vm-node1                         #查看网卡配置信息
 
[root@kvm ~]# virsh domblklist vm-node1                        #查看该虚拟机的磁盘位置
 
[root@kvm ~]# virsh dumpxml vm-node1                           #查看KVM虚拟机当前配置
 
[root@kvm ~]# virsh dumpxml vm-node1 > vm-node1.bak.xml        #备份vm-node1虚拟机的xml文件，原文件默认路径/etc/libvirt/qemu/vm-node1.xml
 
[root@kvm ~]# virsh autostart vm-node1                         #KVM物理机开机自启动虚拟机，配置后会在此目录生成配置文件/etc/libvirt/qemu/autostart/vm-node1.xml
 
[root@kvm ~]# virsh autostart --disable vm-node1               #取消开机自启动
```
- KVM虚拟机快照相关命令

```bash
[root@kvm ~]# virsh snapshot-create test						#创建快照

[root@kvm ~]# virsh snapshot-current test   					#查看快照版本信息

[root@kvm ~]# virsh snapshot-list test     						#查看快照信息

[root@kvm ~]# virsh snapshot-revert test 初始化环境（快照名称）  	#恢复虚拟机至1620616838

[root@kvm ~]# virsh snapshot-delete test 刚安装的vim（快照名称）	#删除快照
```
- 快照文件位置

```bash
/var/lib/libvirt/qemu/snapshot/
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181605352.gif)


## 相关文章
|文章标题| 文章地址 |
|--|--|
|[【Linux】之Centos7安装KVM虚拟化及相关命令](https://liucy.blog.csdn.net/article/details/126303077)|[https://liucy.blog.csdn.net/article/details/126303077](https://liucy.blog.csdn.net/article/details/126303077)|
| [【Linux】之Centos7卸载KVM虚拟化服务](https://liucy.blog.csdn.net/article/details/132076894) |  [https://liucy.blog.csdn.net/article/details/132076894](https://liucy.blog.csdn.net/article/details/132076894)|

