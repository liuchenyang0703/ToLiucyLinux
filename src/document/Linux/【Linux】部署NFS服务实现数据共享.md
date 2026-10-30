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
date: 2024-07-01
isOriginal: true
pageview: true
article: true
breadcrumb: false
comment: true
---

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202412181441583.png)



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



![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202412181441484.png)



* [x] 挂载原理

> &emsp;&emsp;当我们在NFS服务器设置好一个共享目录/opt 后，其他人是有权访问/opt这个共享目录的，NFS客户端就可以将这个目录挂载到自己文件系统的某个挂载点（这个挂载点可以自己定义），路径不同也可以；如下图客户端A与客户端B挂载的目录就不相同。并且挂载好后我们在本地能够看到服务端/opt下的所有数据。

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202412181440917.png)

## 二、准备工作

### 2.1 服务器信息

|  主机  |操作系统|      IP       |   服务   |   端口    |
|---| :----: | :-----------: | :------: | :-------: |
| 服务端 | centos|172.16.11.201 | nfs、rpc | 2049、111 |
| 客户端 | centos|172.16.11.202 | nfs、rpc | 2049、111 |



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

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202412181440694.png)



<font color=red>修改配置文件永久生效要重启服务器；</font>


## 三、部署并启动 NFS 和 RPC 服务



两台都安装，`nfs-utils` 为 nfs 服务端、 `rpcbind` 为 nfs 客户端；

```bash
# yum
yum install -y nfs-utils rpcbind

# apt
apt install -y nfs-kernel-server
```

* 启动 nfs 服务并配置开机自启<font color=blue>（所有节点）</font>

```bash
systemctl enable --now nfs
```

* 查看服务状态

```bash
systemctl status nfs
systemctl status rpcbind
```

![](https://gcore.jsdelivr.net/gh/liuchenyang0703/blog-images@main/images/202412181440383.png)


## 四、服务端配置共享目录

安装完成之后 nfs 会自动创建一个系统程序用户`nfsnobody`，可使用命令：`cat /etc/passwd`查看；

* 创建需要作为共享目录的目录并给nfs权限（注意磁盘空间占用）


> <font color=blue>主节点创建即可</font>
```bash
# 创建一个需要共享的共享目录
mkdir -p /data/nfs

# 给此目录nfs用户权限
chown -R nfsnobody:nfsnobody /data/nfs
```
* 配置共享目录：`/etc/exports`，定义哪些地址可以访问，<font color=blue>（主节点配置）</font>

NFS配置文件格式：`共享目录 [客户端1(参数)] [客户端2（参数）]  `

> 共享目录：NFS服务器需要共享的实际路径（绝对路径）；
> 客户端：可以访问共享目录的服务器地址或网段。
```bash
vim /etc/exports
# 添加以下内容
# 共享目录 允许访问的网段或IP(权限参数)
# 示例：允许 172.16.11.0/24 网段的所有机器以读写(rw)方式访问，也可以采用ip方式
/data/nfs 172.16.11.0/24(rw,sync,no_subtree_check,no_root_squash)
```
**参数说明：**

| 参数 | 含义 |
|------|------|
| `rw` | 读写权限 |
| `sync` | 同步写入（保证数据安全） |
| `no_subtree_check` | 禁用子树检查（提升性能） |
| `no_root_squash` | 客户端 root 用户保持 root 权限 |


* 重启<font color=gree>服务端</font>NFS和RPC服务

```bash
systemctl restart nfs rpcbind
```
---

---

**客户端常用形式：**

| 客户端         | 说明               |
| :------------- | ------------------ |
| 172.16.11.202  | 指定IP地址的主机   |
| 172.16.11.0/24 | 指定该网段所有主机 |
| 172.16.10.*    | 指定子网的所有主机 |
| www.xxx.com    | 指定域名的主机     |
| *.xxx.com      | 指定域中的所有主机 |
| *              | 所有主机           |



**常用参数解析：**

| 参数                            | 参数解析                                                     |
| ------------------------------- | ------------------------------------------------------------ |
| ro                              | 只读                                                         |
| rw                              | 读写                                                         |
| sync                            | 同时将数据写入到内存与硬盘中，保证不丢失数据                 |
| async                           | 优先将数据保存到内存，然后再写入硬盘；效率更高，但可能会丢失数据 |
| root_squash                     | 当NFS客户端以root管理员访问时，映射为NFS服务器的匿名用户     |
| no_root_squash                  | 当NFS客户端以root管理员访问时，映射为NFS服务器的root管理员   |
| all_squash                      | 无论NFS客户端使用什么账户访问，均映射为NFS服务器的匿名用户   |
| no_all_squash                   | 保留共享文件的UID和GID（默认）                               |
|no_subtree_check|禁用子树检查（提升性能）|


---
---


## 五、客户端挂载共享目录及配置永久挂载
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

### 5.1 查看NFS服务共享信息
> 客户端、服务端都可以执行，指定的是nfs服务器的IP地址；

* 命令

```bash
showmount [选项] (参数/服务端IP)
```


> -d：仅显示已被NFS客户端加载的共享目录；
> -e：显示NFS服务器上所有的共享目录。

* 查看
```bash
# 这个命令需要安装nfs-utlis
showmount -e 172.16.11.201
```
```bash
[root@localhost ~]# showmount -e 172.16.11.201
Export list for 172.16.11.201:
/data/nfs1 172.16.11.0/24
```

### 5.2 创建目录并进行临时挂载测试


* 在客户端创建要挂载的目录
> 比如也在`/data/nfs`，其他位置也可以；

```bash
mkdir /data/nfs
```

* 临时挂载

>在<font color=blue>客户端</font>执行挂载目录命令：
>mount -t <font color=red>指定挂载的文件类型</font> <font color=gree>nfs服务端的IP</font>:<font color=orange>服务端要共享的路径目录</font> <font color=blue>要挂载到本机的路径目录</font>

```bash
mount -t nfs 172.16.11.201:/data/nfs /data/nfs
```

如果遇到以下报错，有可能是：目录权限问题、服务端配置文件ip范围写的有问题、防火墙、selinux问题；

> mount.nfs: access denied by server while mounting 172.16.11.201:/data/nfs

```bash
# 挂载完成df -Th进行检查
df -Th
# 进入挂载目录，写入或删除数据进行测试连通性
cd /data/nfs
touch 123
# 在挂载目录或nfs主服务器目录进行查看
```

### 5.3 永久挂载

这样只是临时挂载，重启服务器之后就会消失，所以需要在<font color=blue>客户端</font>上配置永久挂载；

```bash
# 永久挂载（需确认好ip和类型，配置错误会导致服务器重启不了）
vim /etc/fstab
# 追加以下内容（确认好自己的服务端ip和挂载路径）
172.16.11.201:/data/nfs  /data/nfs  nfs  defaults,nofail,x-systemd.automount,x-systemd.requires=network-online.target,x-systemd.device-timeout=30  0  0
```
<font color=red>保存退出之后，重启服务器可以进行测试，一旦写错，重启服务器将造成启动不了服务器，所以要谨慎；</font><br>
<font color=red>保存退出之后，重启服务器可以进行测试，一旦写错，重启服务器将造成启动不了服务器，所以要谨慎；</font><br>
<font color=red>保存退出之后，重启服务器可以进行测试，一旦写错，重启服务器将造成启动不了服务器，所以要谨慎；</font><br>

**挂载选项详解**

*   **`defaults`**：这是标准的挂载默认值集合，通常包含 `rw`（读写）、`suid`、`dev`、`exec`、`auto`（允许 `mount -a` 挂载）和 `nouser` 等。对于 NFS，它还会启用一些基础的 NFS 行为，但具体的 NFS 协议参数（如 `rsize`、`wsize`）通常会由系统自动协商。

*   **`nofail`**：**这是防止服务器重启失败的关键**。它告诉 `systemd`：这个挂载点不是启动的“必需”项。即使 NFS 服务器连不上或挂载失败，系统也**会继续完成启动过程**，而不会卡住或进入紧急模式。

*   **`x-systemd.automount`**：**按需挂载**。系统启动时不会立刻去挂载这个 NFS，而是等到第一次有人访问 `/data/nfs` 目录时，才触发挂载动作。这能进一步加快启动速度，并避免在启动阶段因网络未就绪而挂载失败。

*   **`x-systemd.requires=network-online.target`**：**保证网络就绪**。它强制要求 `systemd` 在尝试挂载之前，先等待 `network-online.target` 这个目标达成（即网络接口已配置并在线）。这解决了“系统以为网络好了，其实还没好就去挂载 NFS 导致失败”的常见时序问题。

*   **`x-systemd.device-timeout=30`**：**限制等待时间**。它规定 `systemd` 最多等待设备（这里是网络存储）**30 秒**。如果 30 秒后 NFS 服务器还不可用，就放弃等待并继续启动流程。结合 `nofail` 使用，可以避免因 NFS 服务器故障导致启动过程被拖延过久（默认等待时间可能长达 90 秒）。

**关于“0 0”结尾**

这是 `fstab` 的标准字段：
*   第一个 `0`：`dump` 备份标志，对 NFS 无意义，设为 `0`。
*   第二个 `0`：`fsck` 检查顺序，NFS 是网络文件系统，不需要本地磁盘检查，设为 `0`。


### 5.4 取消挂载

#### 5.4.1 临时取消挂载

```bash
umount 客户端挂载点
umount 服务端ip:服务端共享目录

举例：
umount /data/nfs
umount 172.16.11.201:/data/nfs
```
如果遇到取消挂载报错或卡住，可能是还在使用中，这种一般不会让取消挂载，需要确认还用不用，如果真的不用，可以强制取消挂载

```bash
umount -lf 172.16.11.201:/data/nfs
```
* `-f`：强制卸载
它的作用是“强制”执行卸载操作。对于 NFS 来说，当服务器端不可达（例如宕机或网络断开）时，普通的 `umount` 可能会一直等待或报错。加上 `-f` 后，系统会直接执行卸载，不再等待远程服务器的响应。

* `-l`：惰性卸载
它的作用是“惰性”卸载。系统会立刻把这个文件系统从目录树里“摘”下来，让新的访问无法进入。但是，如果此时还有进程正在使用这个挂载点里的文件（比如有程序打开了里面的文件），系统不会强行中断它们，而是会等这些进程释放引用后，在后台悄悄完成最终的清理。

#### 5.4.2 永久取消挂载
> 如果是配置了有永久挂载才需要用到这里；

1. 先临时取消挂载，按照上面的方法；
2. 进入`/etc/fstab`中，把`172.16.11.201:/data/nfs  /data/nfs  nfs  defaults,nofail,x-systemd.automount,x-systemd.requires=network-online.target,x-systemd.device-timeout=30  0  0`这一行删除就可以了。
