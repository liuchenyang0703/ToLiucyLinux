---
title: zabbix5.0部署（超级详细）
icon: circle-info
order: 1
category:
  - Linux
  - zabbix
  - 服务器监控
tag:
  - Linux
  - zabbix
  - 服务器监控
  - 运维
pageview: false
date: 2024-12-16
comment: false
breadcrumb: false
---

## 🏆Zabbix5.0部署
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161020511.webp)


### 🥇系统环境
系统环境：CentOS-7-x86_64-Minimal-1708

### 🥇关闭防火墙与selinux

关闭防火墙

```bash
systemctl stop firewalld && systemctl disable firewalld
```

关闭selinux

```bash
 sed -i 's/SELINUX=enforcing/SELINUX=disabled/' /etc/selinux/config
```

然后重启reboot

### 🥇替换阿里云Zabbix源
shell脚本zabbix_aliyun.sh

```bash
vi zabbix_aliyun.sh 
```

**复制下面脚本**

```bash
#!/bin/bash
 
echo -e "请给出要安装的zabbix版本号，建议使用4.x的版本  \033[31musage：./zabbix_aliyun.sh 4.0|4.4|4.5|5.0 \033[0m"
echo "例如要安装4.4版本，在命令行写上 ./zabbix_aliyun.sh 4.4"
if [ -z $1 ];then
    exit
fi
VERSION=$1
if [ -f /etc/yum.repos.d/zabbix.repo ];then
    rm -rf /etc/repos.d/zabbix.repo
fi
rpm -qa | grep zabbix-release && rpm -e zabbix-release
rpm -Uvh https://mirrors.aliyun.com/zabbix/zabbix/$VERSION/rhel/7/x86_64/zabbix-release-$VERSION-1.el7.noarch.rpm
sed -i "s@zabbix/.*/rhel@zabbix/$VERSION/rhel@g" /etc/yum.repos.d/zabbix.repo
sed -i 's@repo.zabbix.com@mirrors.aliyun.com/zabbix@g' /etc/yum.repos.d/zabbix.repo
[ $? -eq 0 ] && echo "阿里云的zabbix源替换成功" || exit 1
yum clean all
yum makecache fast
```

**然后执行命令：**

```bash
bash zabbix_aliyun.sh 5.0
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161019477.png)


### 🥇由于zabbix提供集中的web监控管理界面，因此服务在web界面的呈现需要LAMP架构支持。安装httpd php

```bash
yum install -y httpd  php php-mysql php-gd libjpeg* php-ldap php-odbc php-pear php-xml php-xmlrpc php-mhash
```

### 🥈安装常用的开发软件

```bash
yum groups install "Development Tools"
```

查看工具包

```bash
yum groups info "Development Tools"
```

### 🥈安装zabbix5.0仓库

```bash
wget  --no-check-certificate https://repo.zabbix.com/zabbix/5.0/rhel/7/x86_64/zabbix-release-5.0-1.el7.noarch.rpm

rpm -ivh zabbix-release-5.0-1.el7.noarch.rpm

yum clean all
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161019735.png)

### 🥈安装zabbix server 和agent

```bash
yum install zabbix-server-mysql zabbix-agent -y
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161019565.png)

### 🏅启用Red Hat软件集合
>SCL(Software Collections)可以让你在同一个操作系统上安装和使用多个版本的软件，而不会影响整个系统的安装包。

```bash
yum install centos-release-scl -y
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161019249.png)

### 🏅启用zabbix-deprecated repository

```bash
vi /etc/yum.repos.d/zabbix.repo
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161019117.png)

### 🥈安装zabbix前端

```bash
yum install -y zabbix-web-mysql-scl zabbix-apache-conf-scl
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161019214.png)

### 🥈安装mysql数据库

```bash
yum -y install mariadb-server mariadb
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161019465.png)

### 🏅启动mariadb

```bash
systemctl start mariadb&&systemctl enable mariadb
```

### 🏅启动mysql后执行初始化安全设置

```bash
 #设置mysql密码为123456
mysqladmin -u root password "123456"    
```

### 🥈创建数据库

```bash
#进入mysql
mysql -uroot -p   			#输入密码123456
#创建数据库，格式为utf8
create database zabbix character set utf8 collate utf8_bin;
#创建用户
create user zabbix@localhost identified by 'password';          #密码是password,导入Zabbix数据库结构和数据输入这个密码
#给zabbix用户权限
grant all privileges on zabbix.* to zabbix@localhost;
#退出
quit;                                                           
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161019568.png)

### 🥈在Zabbix服务器主机上，导入初始架构和数据。系统将提示您输入新创建的密码

```bash
zcat /usr/share/doc/zabbix-server-mysql*/create.sql.gz | mysql -uzabbix -p zabbix                 #回车密码是password
```

### 🏅为zabbix服务器配置数据库

```bash
#进入zabbix配置文件
vim /etc/zabbix/zabbix_server.conf

#切记要找到相对应的地方，可以/DBHost或者/DBPassword搜索，确保不会出问题；
#解除注销的DBHost=localhost   正常来说在91行
DBHost=localhost
#没有DBPassword，添加一个,密码要是你设置的密码，不要直接复制粘贴     正常来说在125行写入
DBPassword=password
```

### 🏅为Zabbix前端配置PHP
>编辑文件/etc/opt/rh/rh-php72/php-fpm.d/zabbix.conf，取消注释并为您设置正确的时区。

```bash
#进入zabbix配置
vim /etc/opt/rh/rh-php72/php-fpm.d/zabbix.conf

#删除第25行，也就是最后一行
#然后在最后一行添加时区
php_value[date.timezone] = Asia/Shanghai
```

### 🥇 启动zabbix服务

```bash
systemctl restart zabbix-server zabbix-agent httpd rh-php72-php-fpm&&systemctl enable zabbix-server zabbix-agent httpd rh-php72-php-fpm
```

### 🥇配置Zabbix Web前端
>- 浏览器输入http://ip/zabbix
><br>
> - 初始用户名：Admin，初始密码为：zabbix
><br>
>- 点next step下一步

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161019163.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161019769.png)

>- 配置mysql数据库账号和密码， 输入zabbix帐户的密码，点next step下一步

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161019094.png)
>- Name那里起一个名， 点next step下一步

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161019013.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161019423.png)


**<font color=red>至此zabbix前端配置完成</font>**


 输入账号Admin密码zabbix

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161019718.png)
进入zabbix页面
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161018395.png)


### 🥇 后续配置zabbix页面语言为中文
1.Zabbix前端界面设置成中文
选择User settings,语言选择中文，点击update

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161018482.png)
就修改成功了，同时zabbix也就部署完成了。
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161018302.png)

## 🥇 更多の推荐の提议

> &emsp;&emsp;如果感觉上面做的有问题可以评论或私信联系我，有哪个地方写的有问题也可以评论或私信联系我，感谢大家的支持🙏<br>
> &emsp;&emsp;下面这个是你可以不用按上面的步骤做，可以直接跳转到哪个页面下载离线包（安装包）和脚本，直接运行就可以，脚本和安装包都是亲测过的，有问题可以随时联系我。<br>
> **<font color=red>&emsp;&emsp;我的运行环境是centos7</font>**

👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
[zabbix5.0离线脚本一键安装(包含服务端、客户端、脚本和使用说明)](https://download.csdn.net/download/liu_chen_yang/86168600)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161018540.gif)