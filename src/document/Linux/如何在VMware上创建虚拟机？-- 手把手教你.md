---
title: 如何在VMware上创建虚拟机？-- 手把手教你
icon: circle-info
order: 1
category:
  - Linux
  - 虚拟化
  - Windows
tag:
  - Linux
  - 虚拟机
  - Windows
  - 运维
pageview: false
date: 2024-12-19
comment: false
breadcrumb: false
---

>🍁**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>


## 下载VMware
可以访问网盘链接下载有多个版本供你选择：

>链接：[https://pan.baidu.com/s/1seNL_oBQamg86wfcgze73w?pwd=ware](https://pan.baidu.com/s/1seNL_oBQamg86wfcgze73w?pwd=ware)
提取码：ware

下载完成之后，放到本地的任意盘，自己定，找空间大的就行，因为后续创建都会站很大的空间。

## 安装VMware
- 放到指定目录之后，双击`VMware Workstation v16.1.1.exe`即可；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201042870.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201042194.png#pci_center)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201042264.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201042502.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201042916.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201042106.png)

点击安装即可；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201042518.png)

等待安装完成即可；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201042492.png)

安装完成之后，双击点开`VMware Workstation Pro`

购买成功之后会是这个页面；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201042226.png)

点击完成就可以使用了（永久版）。
## 创建虚拟机

- 安装完成之后可以看到，页面正中心就有一个`创建新的虚拟机`这个字，可以直接点击他来创建，或者是：点击左上角的`文件-->新建虚拟机`创建也可以。

创建示例1：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201042389.png)

创建示例2：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201042989.png)

---

点击创建，选择推荐即可；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201042229.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201042899.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201042000.png)

这里选择：客户机操作系统为：Linux；版本为centos7 64位即可

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201041901.png)

这里：虚拟机名称可以自己自定义；位置的话也可以自定义，默认是在c盘，大家注意哈！

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201041541.png)

这里选择：自定义磁盘大小，可以自己根据自己的磁盘空间来写磁盘大小；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201041695.png)

---

这里点击自定义硬件，在这里添加ios映像文件和设置内存、磁盘空间、网络等等。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201041002.png)
- 设置内存，这里可根据自己的电脑配置来自己选，同时也是根据服务需要的内存大小来选；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201041935.png)


- 设置处理器，也是根据自己的电脑配置和服务所需的核数来选；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201041382.png)


- 设置CD也就是ISO映像，这里点击使用`ISO映像文件`选择`CentOS-7.7-x86_64-DVD-1908.iso`这个iso映像，这个映像网盘里有，可自行下载；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201041549.png)

- 设置网络适配器，这里可以选择：`桥接模式`，也可以选择`NAT模式`，不懂什么意思可以百度查一下，我使用的是桥接模式，可以直接连接物理网络，方便配置ip；
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201041255.png)
这几个都选择完成之后关闭即可；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201041612.png)

---

点击完成准备创建；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201041812.png)


## 安装虚拟机
继续上面的步骤，创建完虚拟机之后，在这边点击开启虚拟机；
>编辑虚拟机设置，这个是可以修改配置的，前提是要关闭虚拟机才可以配置；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201041807.png)

如果开启虚拟机遇到了这个报错，可参考此文：[开启虚拟机出现报错：“此主机支持 Intel VT-x，但 Intel VT-x 处于禁用状态”](https://liucy.blog.csdn.net/article/details/130219490) 来解决；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201041727.png)

开启虚拟机，选择第一个：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201041749.png)

让他执行，直到出现这个页面，然后选择`中文-->简体中文-->继续`

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201041401.png)
选择系统-->安装位置：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201041020.png)

点进去，点击20G，再点击完成；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201041656.png)

点击开始安装：

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201041310.png)

点击设置密码，密码如果设置的是123123或者是123456的话，需要点两下完成就可以；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201041441.png)

设置完root密码之后，等待安装完成，大概十几到二十几分钟吧，完成之后有下角会出现一个重启，点击重新即可；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412201041557.png)

重启完之后，输入账号：root；密码：刚刚设置的密码，进入就可以操作了；

这个是最小安装的方式，没有桌面，如果需要桌面化的，可以执行安装`yum groupinstall -y 'GNOME Desktop'`，等待安装完成之后init 5，切换桌面模式即可；


## 配置基础环境（yum源、ip等等）


>配置基础环境，可参考此文：[使用Vmware创建Centos7虚拟机（安装和配置网络环境、xshell连接、防火墙、yum仓库、磁盘挂载、重启命令）](https://liucy.blog.csdn.net/article/details/115432904)

















