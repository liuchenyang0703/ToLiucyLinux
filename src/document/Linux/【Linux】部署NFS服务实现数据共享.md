---
title: 【Linux】部署NFS服务实现数据共享
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - NFS
  - 运维
pageview: false
date: 2024-12-24
comment: false
breadcrumb: false
---

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181441583.png)



>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[CSDN博客专家](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---



## 一、NFS简介与RPC简介

### 1. NFS服务简介

NFS是一种网络协议，NFS依赖RPC才能工作。（RHEL5.0上是NFS V3而RHEL6.0上是NFS V4）

NFS 的基本原则是“容许不同的客户端及服务端通过一组RPC分享相同的文件系统”，它是独立于操作系统，容许不同硬件及操作系统的系统共同进行文件的分享。

NFS在文件传送或信息传送过程中依赖于RPC协议。RPC，远程过程调用 (Remote Procedure Call) 是能使客户端执行其他系统中程序的一种机制。NFS本身是没有提供信息传输的协议和功能的，但NFS却能让我们通过网络进行资料的分享，这是因为NFS使用了一些其它的传输协议。而这些传输协议用到这个RPC功能的。<font color=red>可以这么理解RPC和NFS的关系：NFS是一个文件系统，而RPC是负责信息的传输。</font>



### 2. RPC协议简介

RPC（Remote Procedure Call）远程过程调用，它是一种通过网络从远程计算机程序上请求服务，而不需要了解底层网络技术的协议。其工作在TCP/UDP的111端口。建立在Socket之上的，主要是简化编程的工作在底层提供网络之间的通信。

RPC采用客户机/服务器模式。请求程序就是一个客户机，而服务提供程序就是一个服务器。首先，客户机调用进程发送一个有进程参数的调用信息到服务进程，然后等待应答信息。在服务器端，进程保持睡眠状态直到调用信息的到达为止。当一个调用信息到达，服务器获得进程参数，计算结果，发送答复信息，然后等待下一个调用信息，最后，客户端调用进程接收答复信息，获得进程结果，然后调用执行继续进行。



RPC远程过程调度：

- NFS 协议本身并没有网络传输功能，而是基于远程过程调用协议实现的
- 提供一个面向过程的远程服务的接口
- 可以通过网络从远程主机程序上请求服务，而不需要了解底层网络技术的协议
- 工作在 OSI 模型的会话层，它可以为遵从 RPC 协议应用层协议提供端口注册功能
- 事实上，有很多服务（NFS 和 NIS 等）都可以向 RPC 注册端口
- RPC 使用网络端口 111 来监听客户端的请求





### 3. NFS工作流程

1.首先服务器端启动RPC服务，并开启111端口
2.然后还需要服务器端启动NFS服务，并向RPC注册端口信息
3.客户端启动RPC（portmap服务），向服务端的RPC(portmap)服务请求服务端的NFS端口
4.服务端的RPC(portmap)服务反馈NFS端口信息给客户端。
5.客户端通过获取的NFS端口来建立和服务端的NFS连接并进行数据的传输。



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181441484.png)



* [x] 挂载原理

> &emsp;&emsp;当我们在NFS服务器设置好一个共享目录/opt 后，其他人是有权访问/opt这个共享目录的，NFS客户端就可以将这个目录挂载到自己文件系统的某个挂载点（这个挂载点可以自己定义），路径不同也可以；如下图客户端A与客户端B挂载的目录就不相同。并且挂载好后我们在本地能够看到服务端/opt下的所有数据。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181440917.png)

## 二、准备工作

### 2.1 服务器信息

|  主机  |      IP       |   服务   |   端口    |
| :----: | :-----------: | :------: | :-------: |
| 服务端 | 172.16.11.201 | nfs、rpc | 2049、111 |
| 客户端 | 172.16.11.202 | nfs、rpc | 2049、111 |



### 2.2 防火墙配置

* 关闭防火墙服务

```bash
# 关闭防火墙
systemctl stop firewalld
# 禁止防火墙开机自启
systemctl disable firewalld
```

* 如果是必须要开启防火墙，可以使用两种方法，开端口或服务

```bash
# 开启nfs和rpc服务
firewall-cmd --permanent --add-service=nfs
firewall-cmd --permanent --add-service=rpc-bind
# 重载防火墙规则
firewall-cmd --reload
```

```bash
# 放行端口
# nfs端口为：2049、rpc端口为：111
firewall-cmd --permanent --add-port=2049/tcp
firewall-cmd --permanent --add-port=111/tcp
firewall-cmd --permanent --add-port=111/udp
# 重载防火墙规则
firewall-cmd --reload
```



* 如果使用的是`iptables`防火墙，可以使用以下命令：

```bash
iptables -A INPUT -p tcp --dport 2049 -j ACCEPT
iptables -A INPUT -p tcp --dport 111 -j ACCEPT
iptables -A INPUT -p udp --dport 111 -j ACCEPT
iptables-save > /etc/sysconfig/iptables
```



### 2.3 selinux沙盒

```bash
# 临时关闭
setenforce 0

# 永久关闭
vim /etc/selinux/config

# 将selinux=修改为disabled
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181440694.png)



<font color=red>修改配置文件永久生效要重启服务器；</font>



## 三、部署 NFS 和 RPC 服务



两台都安装

```bash
yum install -y nfs-utils rpcbind

# 启动并设置开机自启
systemctl start rpcbind
systemctl start nfs-server
systemctl enable rpcbind
systemctl enable nfs-server
```



查看服务状态

```bash
systemctl status nfs
systemctl status rpcbind
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181440383.png)



## 四、配置共享目录

①、首先，在<font color=gree>服务端</font>需要确认好要挂载的共享目录；这里我们要挂载的共享目录为：`/data/test/`，就需要先创建此目录

```bash
# 服务端
mkdir -p /data/test
```

②、然后，需要确认好共享目录要挂载到<font color=blue>客户端</font>的哪个目录上，这里就同目录吧；

```bash
# 客户端
mkdir -p /data/test
```

③、配置<font color=gree>服务端</font>NFS配置文件

NFS配置文件格式：`共享目录 [客户端1(参数)] [客户端2（参数）]  `

> 共享目录：NFS服务器需要共享的实际路径（绝对路径）；
> 客户端：可以访问共享目录的服务器地址或网段。

* 客户端常用形式：

| 客户端         | 说明               |
| :------------- | ------------------ |
| 172.16.11.202  | 指定IP地址的主机   |
| 172.16.10.1/24 | 指定子网的所有主机 |
| 172.16.10.*    | 指定子网的所有主机 |
| www.xxx.com    | 指定域名的主机     |
| *.xxx.com      | 指定域中的所有主机 |
| *              | 所有主机           |

```bash
vim /etc/exports

/data/test *(rw,sync,no_root_squash)
```

解析：

| 参数                            | 参数解析                                                     |
| ------------------------------- | ------------------------------------------------------------ |
| /data/test                      | 要共享的目录                                                 |
| *                               | 要共享给谁，可以是网段，可以是ip，*代表是所有都可以共享      |
| ----括号内，NFS访问权限参数---- | ---------------括号内，NFS访问权限参数---------------        |
| ro                              | 只读                                                         |
| rw                              | 读写                                                         |
| sync                            | 同时将数据写入到内存与硬盘中，保证不丢失数据                 |
| async                           | 优先将数据保存到内存，然后再写入硬盘；效率更高，但可能会丢失数据 |
| root_squash                     | 当NFS客户端以root管理员访问时，映射为NFS服务器的匿名用户     |
| no_root_squash                  | 当NFS客户端以root管理员访问时，映射为NFS服务器的root管理员   |
| all_squash                      | 无论NFS客户端使用什么账户访问，均映射为NFS服务器的匿名用户   |
| no_all_squash                   | 保留共享文件的UID和GID（默认）                               |

④、重启<font color=gree>服务端</font>NFS和RPC服务

```bash
systemctl restart nfs rpcbind
```

⑤、在<font color=blue>客户端</font>查看NFS服务共享信息

showmount [选项] (参数/服务端IP)

> -d：仅显示已被NFS客户端加载的共享目录；
> -e：显示NFS服务器上所有的共享目录。

```bash
[root@localhost ~]# showmount -e 172.16.11.201
Export list for 172.16.11.201:
/data/test *
```

## 五、挂载共享目录及配置永久挂载

<font color=red>注意：</font>

> 1、**挂载目录<font color=gree>服务端</font>的数据会覆盖<font color=blue>客户端</font>的数据；**
>
> 1、**挂载目录<font color=gree>服务端</font>的数据会覆盖<font color=blue>客户端</font>的数据；**
>
> 1、**挂载目录<font color=gree>服务端</font>的数据会覆盖<font color=blue>客户端</font>的数据；**
>
> ​      **执行`mount`挂载的为<font color=blue>客户端</font>；**
>
> 
>
> ---
>
> 
>
> 2、如果卸载挂载，提示：设备正忙（umount.nfs4: /data/test: device is busy），可以使用`umount -l /data/test`，不过存在一定风险，容易丢失数据



* 临时挂载

在<font color=blue>客户端</font>执行挂载目录命令

mount -t <font color=red>指定挂载的文件类型</font> <font color=gree>nfs服务端的IP</font>:<font color=orange>服务端要共享的路径目录</font> <font color=blue>要挂载到本机的路径目录</font>

```bash
mount -t nfs 172.16.11.201:/data/test /data/test/
```

如果遇到以下报错，有可能是：目录权限问题、服务端配置文件ip范围写的有问题、防火墙、selinux问题；

> mount.nfs: access denied by server while mounting 172.16.11.201:/data/test



* 永久挂载

这样只是临时挂载，重启服务器之后就会消息，所以可以配置永久挂载，在<font color=blue>客户端</font>上；

```bash
vim /etc/fstab

172.16.11.201:/data/test /data/test nfs defaults 0 0
```

保存退出之后，重启服务器可以进行测试，一旦写错，重启服务器将造成启动不了服务器，所以要谨慎；



---



* 卸载挂载（<font color=blue>客户端</font>）

```bash
umount 挂载点

举例：
umount /data/test
```



---

>  数据测试的话可自行测试；
