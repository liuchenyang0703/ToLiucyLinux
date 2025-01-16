---
title: 【Linux】之Centos7卸载KVM虚拟化服务
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

---



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181611790.png)

## 1、先查看是否有服务正在运行，将他们都停掉

```bash
#查看是否有服务正在运行；
virsh list --all
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181611356.png)

我们可以看到是有的，需要将服务关闭：

```bash
virsh shutdown centos7.0
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181611616.png)

然后在删除，不想删除也可以，依据自己；

```bash
virsh undefine centos7.0
```
删除完成之后就开始卸载服务；

## 2、启动 network 服务（<font color=red>重要</font>）

```bash
#设置开机自启
chkconfig NetworkManager on
#启动NetworkManager服务
service NetworkManager restart
#查看启动状态
service NetworkManager status
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181611289.png)

## 3、卸载 virbr0 网卡及解除 br0 网络桥接
### 卸载 virbr0 网卡
- 先查看网卡
```bash
#先查看网卡
ifconfig
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181610129.png)
- 显示桥接（bridge）列表

```bash
brctl show
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181610699.png)
- 列出当前连接的虚拟网络

```bash
virsh net-list
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181610472.png)

- 停止/删除默认的虚拟网络

```bash
virsh net-destroy default
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181610120.png)

- 取消定义默认的虚拟网络

```bash
virsh net-undefine default
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181610644.png)

- 重新启动libvirtd守护进程

```bash
service libvirtd restart 
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181610342.png)
- 再次列出当前连接的虚拟网络

```bash
virsh net-list
```
这时可以看到已经没有了；


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181610292.png)
- 再次查看桥接（bridge）列表

```bash
brctl show
```
发现`virtbr0`已经没有了；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181610364.png)

### 解除并删除br0桥接网卡
解除网卡会导致远程连接连接不上，需要使用`显示屏直连服务器`或者在`vmwar虚拟机`中操作，在里面使用命令行模式操作，init 3转为完整的字符界面多用户操作；

```bash
#解除绑定ens33网卡
brctl delif br0 ens33
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181610475.png)

执行这一步就会断连，所以需要使用`显示屏直连服务器`或者在`vmwar虚拟机`中操作接下来的步骤；
我的是用的虚拟机测试，所以，在`vmware`中执行接下来的命令；

```bash
#关闭br0,不关闭删不掉
ifconfig br0 down
#删除br0
brctl delbr br0

#删除完在查看一下桥接（bridge）列表
brctl show
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181610169.png)

会发现桥接（bridge）列表中的 br0 桥接 ens33 已经没了，然后ip a查看ip时，ens33没有设置IP，所以，需要设置一下ip，然后重启服务，就可以连接上了；

```bash
#进入网络配置目录
cd /etc/sysconfig/network-scripts/
#删除br0的配置
rm -rf ifcfg-br0
#将最开始部署时备份的覆盖一下ens33网卡（要用到的网卡），如果最开始没有备份的话那么就重新配置一下，还和原来的一样，记住ip就可以
cp -ar ens33-bak ifcfg-ens33
#选择覆盖即可

#覆盖完可以校验查看一下
cat /etc/ifcfg-ens33
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181610058.png)

- 确认完成，就需要重启一下网络服务，使其生效
```bash
#确认完成，就需要重启一下网络服务，使其生效
/etc/init.d/network restart
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181610768.png)
- 查看IP

```bash
ip a
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181610009.png)

这样就修改完成了，我们就可以继续远程连接服务器了；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181610799.png)




## 4、卸载服务

```bash
#卸载刚刚安装时的所有服务及相关依赖包
yum -y remove qemu-kvm\* python-virtinst\* libvirt\* libvirt-python\* virt-manager\* libguestfs-tools\* bridge-utils\* virt-install\*

#卸载完成之后，如果不确定可以在使用rpm查看一下是否还有这些包。
```


## 5、删除相关目录

```bash
#删除libvirt相关的目录，安装libvirt这个命令时就会产生，这几个存放位置是系统默认的，如果怕卸载不干净，可以使用find 查找
rm -rf /var/lib/libvirt /etc/libvirt /var/log/swtpm/libvirt /var/cache/libvirt /usr/lib64/libvirt 

#kvm的iso镜像和存储路径（自定义的）
rm -rf /home/kvm
```

这样就卸载完成了！！！
>&emsp;&emsp;<font color=red>提示：</font>卸载完成之后，有的细心的人为了彻底让他卸载干净，也会去查询kvm等相关的目录，如果是查询kvm相关的目录的话，可能会有几个，因为你开了虚拟化，这是系统生产的，我也没有删除，我用的是虚拟机，只要把虚拟化关了，那几个目录就没了；至于删了是什么后果，可能会导致服务器远程连接不上...等等...未知问题，所以，kvm虚拟化相关的目录就不用删了，避免出现不必要的麻烦。
## 相关文章
|文章标题| 文章地址 |
|--|--|
|[【Linux】之Centos7安装KVM虚拟化及相关命令](https://liucy.blog.csdn.net/article/details/126303077)|[https://liucy.blog.csdn.net/article/details/126303077](https://liucy.blog.csdn.net/article/details/126303077)|
| [【Linux】之Centos7卸载KVM虚拟化服务](https://liucy.blog.csdn.net/article/details/132076894) |  [https://liucy.blog.csdn.net/article/details/132076894](https://liucy.blog.csdn.net/article/details/132076894)|
