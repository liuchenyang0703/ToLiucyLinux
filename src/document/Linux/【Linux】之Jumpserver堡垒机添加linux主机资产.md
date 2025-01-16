---
title: 【Linux】之Jumpserver堡垒机添加linux主机资产
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - Jumpserver
  - 跳板机
  - 运维
pageview: false
date: 2024-12-18
comment: false
breadcrumb: false
---

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181632531.jpeg)

## 资产要求
>❗ ssh连接资产必须要部署 openssh-server


>❗ vnc连接资产必须部署 vncserver


>❗ 防火墙 ssh/vnc 端口必须开放给 JumpServer 所有服务器访问

>❗ 请检查 /etc/hosts.allow /etc/hosts.deny /etc/ssh/sshd_config 是否有登录限制

>❗ 资产连接超时 timeout 请检查 /etc/ssh/sshd_config 的 USEDNS 项是否为 no

## 系统管理
### 1.用户管理
#### 1.1  添加登录用户（用户列表）
创建新用户（用于其他用户登录jumpserver）

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181632864.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181632790.png)

完成之后点击提交即可（可以多创用户）


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181632924.png)

创建完成用户之后，我们可以设置用户组，就比如在公司你是哪个部门的，给你分配部门；


#### 1.2 添加用户组

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181632361.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181632770.png)

#### 1.3 角色列表

系统角色也是在用户列表中设置的；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181632850.png)

我们可以点击刚刚设置的用户

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181632100.png)

进入用户，点击授权用户就可以看到刚刚设置的用户了；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181632538.png)

#### 1.4 使用新建的用户来登录jumpserver
退出admin用户

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631726.png)

使用刚刚创建的用户来登录

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631668.png)

第一次登录会让我们确认信息，勾选我同意即可；然后点击提交；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631347.png)

提交完成之后点击工作台

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631265.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631742.png)

这样就能看到我们的资产了，当然现在还没有添加；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631580.png)

下面就是我的应用，有数据库和kernetes；可以自行添加

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631397.png)

这些看完之后，我们切换到admin用户，还是点击退出登录

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631064.png)

登录admin账号

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631356.png)

登录进来admin，选择视图---控制台


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631286.png)

### 2.资产管理

从仪表盘可以看到总体的数据；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631662.png)

#### 2.1 系统用户
在创建系统用户或者特权用户之前，我们需要连接哪台服务器就要在哪台服务器上添加这个用户，并且给整个用户设置权限；
可参考：[【Linux】之创建普通用户并禁止root用户远程登陆](https://liucy.blog.csdn.net/article/details/125913785?spm=1001.2014.3001.5502)

我们就来创建一个test用户来测试；

首先，连接你需要管控的哪台服务器；

```bash
#添加一个test用户
useradd test

#然后给test用户设置密码
passwd test
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631874.png)

```bash
#设置完成密码之后，我们给test用户设置执行权限
visudo

#进入visudo，找到放root权限的地方，也就是第100行，添加test
test    ALL=(ALL)       ALL

#如果需要切换用户直接切换的话可以添加为
test    ALL=(ALL)       NOPASSWD:ALL
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631006.png)

设置完成之后我们可以切换用户试试；

```bash
su - test

#切换到test用户之后，我们可以在切换到root用户
sudo su -

#切换都没问题，证明添加用户和设置用户权限成功
```

在服务器上设置完成之后我们返回到web页面上来创建特权用户；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631125.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631690.png)


添加完成之后我们就可以看到；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631384.png)
#### 2.2 网域列表
>&emsp;&emsp;接下来就是网域，网域指的是什么呢，就比如你这台服务器在哪放着，比如自己公司机房，或者是地区机房，或者是虚拟机，都可以；名字的话按理来说是可以随意起的，但是我们为了标准化就起的标准一些吧；

创建网域

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631759.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631353.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631887.png)


#### 2.3 资产列表
接下来我们就开始添加资产了；本篇主要讲的是添加linux主机资产；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631592.png)

右击资产树的default可创建节点、重命名节点、删除节点、添加资产到某个节点中、测试资产的可连接性......


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631272.png)

这里我们创建一个新的节点(test)；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631055.png)

节点创建完成之后，开始创建linux资产；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181631079.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181630394.png)

添加完资产之后可查看资产的详细信息，同时也可测试一下改资产是否连接上了服务器；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181630738.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181630752.png)

现在连接不上是因为还没有给该资产授权；等我们给资产授权再反过来测试他的连接性；


#### 2.4 平台列表（可忽略，因为基本都是全的）

支持多平台的远程连接

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181630636.png)

### 3.权限管理
#### 3.1 资产授权
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181630832.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181630909.png)

给资产授权完成之后，我们在返回看资产管理中的资产列表，点进资产，测试连接是否可用；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181630709.png)


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181630981.png)

现在是可以通过了；需要注意的就是ip千万不要写错，因为这个连接连不上，基本的都写的正确了，问题不好找，尤其是细节上的东西，就比如刚刚我的ip就写错了，找了半天；

## 登录普通用户连接linux服务器

成功之后我们用普通用户登录，去连接该服务器；

同样的第一步，退出登录：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181630455.png)

登录普通用户

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181630105.png)

登录进来点击“<font color=red>我的资产</font>”

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181630396.png)

可以看到我们这边多了一个主机；这个就是刚刚添加的linux主机；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181630340.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181630665.png)

选择<font color=red>Web CLI</font>登录就可以；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181630829.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181630938.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181630022.png)

这样连接就完成了；

## 连接linux服务器传输文件

首先需要在/tmp目录下专门创建一个传输文件的目录；并将该目录设置为普通用户和普通用户组

```bash
#切换至普通用户
cd /tmp/

#创建目录，名字根据自己的情况定义
mkdir test

#给该目录设置普通用户和普通用户组
chown -R test:test test/

#ll查看
ll
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181630691.png)

设置完成之后，选择右上角的文件管理--连接


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181630003.png)

我们来逐一找到当前的服务器和目录

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181630386.png)

将文件直接拖过来就可以上传了

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181630912.png)

上传完成返回服务器进入test目录就可以看到传进来的文件了；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181630489.png)

需要将文件传到哪，复制或者移动都可以

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181630476.png)


这样文件传输就可以了；







## 相关文章
|文章名|文章地址|
|--|--|
| [【Linux】之Jumpserver堡垒机的部署/搭建](https://liucy.blog.csdn.net/article/details/126538846) |  [https://liucy.blog.csdn.net/article/details/126538846](https://liucy.blog.csdn.net/article/details/126538846)|
|[【Linux】之Jumpserver堡垒机添加linux主机资产](https://liucy.blog.csdn.net/article/details/126539267)|[https://liucy.blog.csdn.net/article/details/126539267](https://liucy.blog.csdn.net/article/details/126539267)  |
|[【Linux】之Jumpserver堡垒机添加Windows主机资产](https://liucy.blog.csdn.net/article/details/126542303)|[https://liucy.blog.csdn.net/article/details/126542303](https://liucy.blog.csdn.net/article/details/126542303)|
