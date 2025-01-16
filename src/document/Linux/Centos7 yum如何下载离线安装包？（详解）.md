---
title: Centos7 yum如何下载离线安装包？（详解）
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - 运维
pageview: false
date: 2024-12-18
comment: false
breadcrumb: false
---

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181624813.jpeg)

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---


## 前言
<font color=red>下载离线包的时候需要在有可以ping通baidu等外网的环境中下载离线包；</font>

>&emsp;&emsp;相信大家也遇到过这种问题，在没有外网的情况下，想安装一个服务却安装不了，这期我就教大家如何如何下载离线安装包，在内网中使用；

## 第一种方法：使用yum + 参数安装  -- 【推荐】包含依赖


*  首先先讲解一下yum下载离线安装包的参数及解析；

yum下载离线安装包的参数及解析；
|参数| 解析 |
|--|--|
|- -install|下载某个命令，直接安装|
| - -downloadonly |仅下载安装包，不进行安装  |
|- -downloaddir|指定下载的安装包的存放路径|

<br>

**<font color=teal>实例：</font>**

Centos7 yum直接下载安装lrzsz命令，下载完并不会有安装包残留，直接就会安装上；

```bash
yum -y install lrzsz
```

Centos7 yum下载离线安装包mysql，不进行安装，只需要离线安装包，并且放到/data/mysql目录中；

下载命令：
```bash
yum -y install gcc gcc-c++ --downloadonly --downloaddir=./
```
* 详情下载步骤：
```bash
#首先我们先创建一个/data/mysql目录
[root@zabbix-5 mysql]# mkdir /data
[root@zabbix-5 mysql]# mkdir /data/mysql

#然后我们来下载离线安装包
[root@zabbix-5 mysql]# yum -y install mysql --downloadonly --downloaddir=/data/mysql

#然后进入/data/mysql目录查看
[root@zabbix-5 mysql]# cd /data/mysql
[root@zabbix-5 mysql]# ls
mariadb-5.5.68-1.el7.x86_64.rpm  mariadb-libs-5.5.68-1.el7.x86_64.rpm
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181624651.png)
然后咱们可以把rpm包下载到本地，之后使用的时候就可以上传到内网环境中，直接<font color=red>**rpm -ivh 包名**</font>安装就可以了。

## 第二种方法：使用 yumdownloader 命令【只下载你需要的安装包（不包含依赖）】


* 要有这个命令，需要先安装一个命令：`yum-utils`
```bash
sudo yum -y install yum-utils
```
这个命令安装完之后就会有`yumdownloader `命令了，这时候我们使用这个命令去下载离线包；
* yumdownloader 用法

```bash
yumdownloader --destdir=要下载的路径 要下载的安装包
```

* yumdownloader 参数

|  参数|解析  |
|--|--|
| --resolve | 此选项会分析指定的软件包的依赖关系，并自动下载和保存这些依赖软件包。注意，如果系统内该依赖包已安装，运行命令时将不会下载已安装的依赖包。 |
|--enablerepo=\<repository>|指定yum源，如果不知可以省去此参数。
|--destdir=\<directory>|指定下载的软件包存放路径，默认下载到当前目录中。

**<font color=teal>实例：</font>**

* 下载一个mysql安装包且不安装服务，把安装包存到`/data/mysql/`目录下；

```bash
yumdownloader --destdir=/data/mysql/ mysql
```
下载完之后切换到这个目录看一下，可以看到离线包了。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181624636.png)


## 两者区别及优缺点：

-  举实例两者下载的区别：

* [x] 示例1：使用yum + 参数安装
```bash
yum -y install gcc gcc-c++ --downloadonly --downloaddir=./
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181624606.png)


* [x] 示例2：yumdownloader 命令下载
```bash
yumdownloader --destdir=./ gcc gcc-c++
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181624252.png)



两者的区别很明显了，yumdownloader下载的少，是因为他不会下载依赖包，只会下载你需要的包；

-  两者优缺点：

* [x] yum + 参数 优点：
1、会自动下载安装所需软件的所有依赖包，保证离线安装包的完整性；
2、无需安装，可直接使用命令+参数下载。
* [x] yum + 参数 缺点：
1、如果服务器上已经安装过这个命令或者包的话，下载会提示已经安装过，所以安装的时候需要使用空环境。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181624291.png)

* [x] yumdownloader 优点：
1、不管有没有安装都会下载下来离线包。

* [x] yumdownloader 缺点：
1、需要安装`yum-utils`；
2、安装只会安装所需要的包，而不会下载依赖；

---

* 总结：
> 各有利弊，还是推荐使用第一种方式。
