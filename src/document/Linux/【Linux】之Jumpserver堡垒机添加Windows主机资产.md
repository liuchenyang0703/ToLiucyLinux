---
title: 【Linux】之Jumpserver堡垒机添加Windows主机资产
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

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181637671.jpeg)

## 资产要求
### SSH连接资产要求
>❗ Windows 资产测试连接，获取硬件，自动推送需要进行相关设置
>&emsp;&emsp;注意：按照下面的文档部署好 openssh 后，在 web 的资产列表里面找到你的 windows 资产，在协议组里面加入 rdp 3389，再添加一个 ssh 22，然后就可以使用 测试连接，获取硬件，自动推送 功能了

>❗ Win7/Win2008 需要升级 powershell 到 3.0 以上，详情请参考 [ansible 客户端需求](https://docs.ansible.com/ansible/latest/user_guide/windows_setup.html)



### RDP连接资产要求



>❗ 部分安装了安全软件的资产无法正常连接

>❗ 系统平台 默认情况下使用 Windows 即可

>- 打开 Windows 远程设置
>- 防火墙放行 rdp 端口
>- 创建资产时 系统平台 选择 Windows
>- 正常创建 RDP 系统用户
>- 授权后即可

>🔺️️ 如果资产设置了 远程(RDP)连接要求使用指定的连接层 SSL
>
>- 在 JumpServer 资产管理 - 平台列表 创建一个新的平台模板
>- 名称: Windows-SSL
>- 基础: Windows
>- 编码: UTF-8 如果复制粘贴乱码可以改成 GBK
>- RDP security: TLS
>- RDP console: 默认
>- 提交后, 修改资产的系统平台为 Windows-SSL


>🔺️️ 如果资产设置了 远程(RDP)连接要求使用指定的连接层 RDP
>
>- 在 JumpServer 资产管理 - 平台列表 创建一个新的平台模板
>- 名称: Windows-RDP
>- 基础: Windows
>- 编码: UTF-8 如果复制粘贴乱码可以改成 GBK
>- RDP security: RDP
>- RDP console: 默认
>- 提交后, 修改资产的系统平台为 Windows-RDP



>🔺️️ 域账号注意事项
>
>- 如果 域账号 配置了特定的 登录工作站, 则需要在 DC域控制器 的 域用户 属性 登录工作站 里面添加 lion 的 CONTAINER ID
>- 如不确定, 请配置为 此用户可以登录到: 所有计算机(C)



<font color=red>**这里以SSH方式来连接Windows资产**</font>
## Windows设置
### 1. 打开 Windows 远程设置
win+i进入系统设置页面

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181637189.png)

点击系统

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181637868.png)

往下拉，有一个远程桌面，将其开启即可；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181637532.png)
### 2.防火墙放行 RDP 端口
2.1 win+s搜索控制面板

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181637760.png)

2.2 点击系统和安全

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181637164.png)

2.3 点击Windows Defender防火墙


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181637419.png)

2.4 点击高级设置	

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181637548.png)

2.5 新建端口入站规则

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181637612.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181637322.png)

写入端口

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181637524.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181637300.png)
选择全部，下一步
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181637555.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181636160.png)

完成之后，可在此看到

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181636613.png)

### 3.下载 OpenSSH
[下载最新的 OpenSSH](https://github.com/PowerShell/Win32-OpenSSH/releases/tag/v8.9.1.0p1-Beta)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181636995.png)


>下载完之后解压；
>解压后，将文件夹移动到 C:\Program Files\，并改名为OpenSSH


### 4. 安装 OpenSSH
通过<font color=red>**管理员身份**</font>的方式打开 WindowsPowerShell，并在 powershell 里面执行下面命令；win+s打开搜索，搜索WindowsPowerShell。

```bash
cd "C:\Program Files\OpenSSH"
powershell.exe -ExecutionPolicy Bypass -File install-sshd.ps1
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181636929.png)

### 5. 设置 Firewalld

```bash
New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
```

```bash
# 如果 win7/win2008 执行上面的命令报错请执行此处的命令
netsh advfirewall firewall add rule name=sshd dir=in action=allow protocol=TCP localport=22
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181636173.png)

### 6. 启动 OpenSSH

```bash
#启动ssh服务
net start sshd
#设置开机自启
Set-Service sshd -StartupType Automatic
```
附加：
```bash
#关闭openssh服务
net stop sshd
#启动openssh服务
net start sshd
#设置开机自启
Set-Service sshd -StartupType Automatic
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181636190.png)

开放端口并且启动完成之后，接下来就是在web页面来操作；

## 系统管理
### 1.用户管理
#### 1.1  添加登录用户（用户列表）

创建新用户（用于其他用户登录jumpserver）

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181636162.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181636404.png)

完成之后点击提交即可（可以多创用户）


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181636525.png)

创建完成用户之后，我们可以设置用户组，就比如在公司你是哪个部门的，给你分配部门；


#### 1.2 添加用户组

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181636248.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181636845.png)

#### 1.3 角色列表

系统角色也是在用户列表中设置的；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181636341.png)

我们可以点击刚刚设置的用户

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181636643.png)

进入用户，点击授权用户就可以看到刚刚设置的用户了；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181636969.png)

#### 1.4 使用新建的用户来登录jumpserver
退出admin用户

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181636022.png)

使用刚刚创建的用户来登录

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181636462.png)

第一次登录会让我们确认信息，勾选我同意即可；然后点击提交；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635625.png)

提交完成之后点击工作台

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635388.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635648.png)

这样就能看到我们的资产了，当然现在还没有添加；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635793.png)

下面就是我的应用，有数据库和kernetes；可以自行添加

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635689.png)

这些看完之后，我们切换到admin用户，还是点击退出登录

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635550.png)

登录admin账号

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635193.png)

登录进来admin，选择视图---控制台


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635461.png)

### 2.资产管理

从仪表盘可以看到总体的数据；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635360.png)

#### 2.1 系统用户
由于目前 Windows 不支持自动推送，所以 Windows 的系统用户设置成与管理用户同一个用户（交换机、Windows等设备不支持 Ansible, 需手动填写账号密码）。Windows 资产协议务必选择 rdp，并且要去掉自动生成密钥、自动推送勾选。

windows的我们必须创建普通用户，同时也需要创建一个特权用户；普通用户呢就是<font color=red>Administrator</font>；而特权用户就设置你的电脑登录的哪个用户就可以；我的是<font color=red>user</font>；授权资产的时候记得要给两个用户都要授权；创建资产的时候选择特权用户就可以。

**创建普通用户**

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635405.png)

选择RDP协议

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635892.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635973.png)


添加完成之后我们就可以看到；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635134.png)

**特权用户**


特权用户是你要连接的windows电脑的用户和密码；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635639.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635903.png)

完成之后我们就可以看到；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635180.png)



#### 2.2 网域列表
>&emsp;&emsp;接下来就是网域，网域指的是什么呢，就比如你这台服务器在哪放着，比如自己公司机房，或者是地区机房，或者是虚拟机，都可以；名字的话按理来说是可以随意起的，但是我们为了标准化就起的标准一些吧；

创建网域

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635133.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635690.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635269.png)



#### 2.3 资产列表
接下来我们就开始添加资产了；本篇主要讲的是添加Windows主机资产；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635592.png)

右击资产树的default可创建节点、重命名节点、删除节点、添加资产到某个节点中、测试资产的可连接性......


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635882.png)

这里我们创建一个新的节点(win10)；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635353.png)

节点创建完成之后，开始创建Windows资产；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635236.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635476.png)


添加完资产之后可查看资产的详细信息，同时也可测试一下改资产是否连接上了服务器；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181635778.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181634913.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181634225.png)


#### 2.4 平台列表（可忽略，因为基本都是全的）

支持多平台的远程连接

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181634486.png)

### 3.权限管理
#### 3.1 资产授权
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181634073.png)

测试机选择自己的windows机器就可以，名称也可起一个windows；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181634585.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181634170.png)
资产授权完成，我们使用普通用户登录，来连接测试一下，授权完成之后在检查一下，资产的连接状态是否正常；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181634549.png)

可以看到是可以正常连接的，我们就切换为其他的普通用户来连接；

## 登录普通用户连接Windows主机

成功之后我们用普通用户登录，去连接该主机；

同样的第一步，退出登录：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181634421.png)

登录普通用户

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181634427.png)

登录进来点击“<font color=red>我的资产</font>”

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181634511.png)

可以看到我们这边多了一个主机；这个就是刚刚添加的Windows主机；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181634989.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181634242.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181634608.png)

看到这个界面就已经连接成功了；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181634395.png)


这样连接就完成了；

## 连接Windows服务器传输文件

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181634461.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181634338.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181634853.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181634010.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181634371.png)

上传完成之后，找<font color=red>文件资源管理器</font>；点击<font color=red>此电脑</font>，有一个<font color=red>jumpserver映射的文件夹</font>，上传的文件就在这里面；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181633726.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181633996.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181633460.png)

**下载文件**

同样的找个“小螺丝”，文件管理；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181633504.png)
单机要下载的文件即可下载。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181633596.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181633976.png)


这样文件传输就可以了；









## 相关文章
|文章名|文章地址|
|--|--|
| [【Linux】之Jumpserver堡垒机的部署/搭建](https://liucy.blog.csdn.net/article/details/126538846) |  [https://liucy.blog.csdn.net/article/details/126538846](https://liucy.blog.csdn.net/article/details/126538846)|
|[【Linux】之Jumpserver堡垒机添加linux主机资产](https://liucy.blog.csdn.net/article/details/126539267)|[https://liucy.blog.csdn.net/article/details/126539267](https://liucy.blog.csdn.net/article/details/126539267)  |
|[【Linux】之Jumpserver堡垒机添加Windows主机资产](https://liucy.blog.csdn.net/article/details/126542303)|[https://liucy.blog.csdn.net/article/details/126542303](https://liucy.blog.csdn.net/article/details/126542303)|
