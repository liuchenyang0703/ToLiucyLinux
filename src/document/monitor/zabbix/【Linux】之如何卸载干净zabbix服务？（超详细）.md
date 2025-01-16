---
title: 【Linux】之如何卸载干净zabbix服务？（超详细）
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

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---


## 1、停止zabbix-server zabbix-agent httpd rh-php72-php-fpm

```bash
systemctl stop zabbix-server zabbix-agent httpd rh-php72-php-fpm
```

## 2、卸载zabbix服务
### 2.1、查找zabbix所有的服务

```bash
rpm -qa | grep -i zabbix
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161114486.png)

我们可以看到有好几个，可以依次卸载；

### 2.2、依次卸载zabbix服务

```bash
yum -y remove zabbix-agent-5.0.25-1.el7.x86_64
yum -y remove zabbix-web-mysql-scl-5.0.25-1.el7.noarch
yum -y remove zabbix-release-5.0-1.el7.noarch
yum -y remove zabbix-server-mysql-5.0.25-1.el7.x86_64
yum -y remove zabbix-web-5.0.25-1.el7.noarch
```
卸载完成之后再次查看一下；

```bash
rpm -qa | grep -i zabbix
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161114154.png)
这下已经没有了，就可以了；

### 2.3、删除zabbix所有的配置以及相关文件

```bash
#find查找zabbix
[root@localhost ~]# find / -name zabbix

/etc/selinux/targeted/active/modules/100/zabbix
/etc/zabbix
/var/lib/yum/repos/x86_64/7/zabbix
/var/lib/mysql/zabbix
/var/log/zabbix
/var/cache/yum/x86_64/7/zabbix
/usr/lib/zabbix

#直接全部删除
rm -rf /etc/selinux/targeted/active/modules/100/zabbix
rm -rf /etc/zabbix
rm -rf /var/lib/yum/repos/x86_64/7/zabbix
rm -rf /var/lib/mysql/zabbix
rm -rf /var/log/zabbix 
rm -rf /var/cache/yum/x86_64/7/zabbix
rm -rf /usr/lib/zabbix
```

最后检查是否删除干净；

```bash
find / -name zabbix
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161114251.png)

可以看到已经删除干净了；

需要更干净一点的话，可以利用模糊搜索；

```bash
find / -name "*zabbix*"
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161114478.png)
还可以查到这么多，最后全部删除就可以；
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161114821.png)
最后在次查找一下就可以了，这样就彻底的删除干净了。

## 3、卸载mysql

### 3.1、卸载mariadb
```bash
#查找mariadb
rpm -qa mariadb
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161114262.png)

```bash
#卸载即可
yum -y remove mariadb-5.5.68-1.el7.x86_64
```
### 3.2、删除mysql相关的配置文件

```bash
#查找mysql相关的文件
[root@localhost ~]# find / -name mysql

/etc/selinux/targeted/active/modules/100/mysql
/var/lib/mysql
/var/lib/mysql/mysql
/usr/lib64/mysql
/usr/lib64/perl5/vendor_perl/auto/DBD/mysql
/usr/lib64/perl5/vendor_perl/DBD/mysql
/usr/share/mysql

#直接全部删除
rm -rf /etc/selinux/targeted/active/modules/100/mysql
rm -rf /var/lib/mysql
rm -rf /var/lib/mysql/mysql
rm -rf /usr/lib64/mysql
rm -rf /usr/lib64/perl5/vendor_perl/auto/DBD/mysql
rm -rf /usr/lib64/perl5/vendor_perl/DBD/mysql
rm -rf /usr/share/mysql/
```

最后检查是否删除干净；

```bash
find / -name mysql
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161114776.png)
可以看到已经删除干净了；


## 4、卸载http服务

```bash
查找httpd服务
rpm -qa httpd

#卸载httpd服务
yum -y remove httpd-2.4.6-97.el7.centos.5.x86_64
```
## 5、卸载rh-php72-php-fpm服务

```bash
#查找rh-php72-php-fpm安装包
rpm -qa rh-php72-php-fpm
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161113643.png)

```bash
#进行卸载就可以
yum -y remove rh-php72-php-fpm-7.2.24-1.el7.x86_64
```


这样就全部卸载干净了。



