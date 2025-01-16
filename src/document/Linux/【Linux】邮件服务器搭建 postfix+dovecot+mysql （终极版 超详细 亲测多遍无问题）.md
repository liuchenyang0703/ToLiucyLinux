---
title: 【Linux】邮件服务器搭建 postfix+dovecot+mysql （终极版 超详细 亲测多遍无问题）
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - postfix
  - dovecot
  - mysql
  - 运维
pageview: false
date: 2024-12-18
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


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181617490.png)


## 前言
> 因为最近公司需要搭建一个邮件服务系统，但是如果在linux创建的话会有uid限制，而又需要创建大量的用户，上w个，这样会导致uid不足而无法创建用户；所以需要用到虚拟用户，在千辛万苦下找到了使用postfix+dovecot+mysql这种方式来做虚拟用户及邮箱发收，最终选择了使用：postfix+dovecot+mysql来实现这个功能；
> 

<font color=red>这里不推荐使用云服务器，因为云服务器会限制25端口，会导致邮件系统收发不了；</font>

## 基础原理
>今天来聊聊Linux邮件服务器的搭建，本以为电子邮件这种高度成熟的技术应该很容易部署，上手后才发现原来坑还真不少。本方案以主流的postfix + dovacot为基础，其中postfix用作smtp，dovecot用作pop3(或imap)。

1、工作模式
>用postfix构建的邮件系统至少有两种工作模式，第一种是利用本地Linux账号进行邮件收发，比如本地系统有用户root或someone，那么就有root@example.com和someone@example.com两个email地址。 第二种相对复杂一些，为了管理的方便和系统安全，postfix的用户管理采用了虚拟用户方式，即postfix单独设立了许多用户，他们各自在系统中映射有独立的硬盘空间。但同时这些用户又跟本地Linux系统内固有的真实账号没有关联。本文所有讨论就是建立在这种模式下的，值得注意的是，这两种工作模式的部署方法差异极大，在参考网上教程的时候，首先要确认它是建立在哪个模式下的，否则容易张冠李戴，出现很多令人头疼的问题。

2、运行流程

> 对于电子邮件，我们有可能存在的一个误区是，将smtp和pop3按照字面的意思去理解，即smtp只管发件，pop3则只负责收件。其实并不完全是这样。下面是一封电子邮件在互联网上的投递流程：

- 发件人：me@qq.com 收件人：you@gmail.com
me@qq.com 用邮件客户端（比如outlook）写了一封邮件给you@gmail.com，点下发送按钮后，邮件首先会发送到smtp.qq.com
- smtp.qq.com 检索到这封邮件的收件人域名是gmail.com，于是通过互联网(WAN)将邮件发送到smtp.gmail.com
- smtp.gmail.com确认收下邮件后，将它转存到邮件服务器的硬盘中待收。
通过观察以上流程，你会发现smtp服务器其实身兼了 “收、发” 两个功能。 对于smtp.qq.com而言，是发送。 而从smtp.gmail.com的角度来看，则是接收。那么，咱们平时经常说起的 “收件服务器pop3” 又是怎么回事呢，整个流程似乎看不到它的身影？

pop3（或imap服务器，与之性质相同）更多的是起一个中转作用，它将存储在邮件服务器硬盘中的邮件转移回邮件客户端（user agent），它只负责从邮件服务器到邮件客户端这段路径，而邮件在广域网上的收发则是smtp要做的事，与pop3没有关系。

pop3与imap的区别是，pop3将邮件拉回本地后，即与服务器脱钩了。imap则更先进一些，它能做到实时将你在邮件客户端的操作反馈回邮件服务器，比如：删除邮件，标记已读等，服务器上的邮件也会做相应的动作。所以无论从浏览器登录邮箱或者客户端软件登录邮箱，看到的邮件以及状态都是一致的。


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181617072.png)




## 准备工作
前面说过，本文以虚拟邮件用户为基础，创建虚拟用户有很多方法，其中最容易也最易于扩展的方式莫过于采用数据库来管理邮件客户。比如说以后如果需要扩展Web Mail功能，就比较容易与现有系统无缝衔接。


本文选用Centos下最常见的MariaDB作为数据库，它与MySQL是完全兼容的，关于MariaDB的部署不在本文讨论之内，网上有很多教程，也非常简单。

首先将我的运行环境做一个说明：



> 操作系统 ： Centos 7.9 
> 数据库 ： MariaDB 10.3.17
>  Postfix： 2.10.1
>   Dovecot： 2.2.36
> 编辑器：vim


注意：

- 文中所有出现cs.com的地方，需要全部更换为自己的域名。
- 文中凡出现vim开头的地方表达的意思就是编辑这个文件。

---
在正式开始之前，我们还需要配置域名，以下来说说如何配置域名；

以云上DNS域名解析为例：

- 腾讯云

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181617408.png)

- 阿里云

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181617530.png)

配置好之后，可以在windows上打开cmd，输入nslookup，然后在输入set type=MX，然后在输入自己的域名（这里的域名不是带mail的域名，是mail后面的域名），如果windows上没有nslookup可以自己安装一下，如下图，则是解析成功。


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181617896.png)

解析成功之后，链接服务器，修改主机名：

```bash
hostnamectl set-hostname mail.域名
#加载新环境，或者关了重新开一个窗口；
bash
#完成之后可以再次确认
uname -n
```

确认完成之后，确认服务器中是否存在一些关于mail的服务，可以卸载；

```bash
rpm -qa | grep postfix
rpm -qa | grep dovecot
rpm -qa | grep sendmail

#先停止服务
systemctl stop postfix dovecot sendmail

#如果有这些，可以自行卸载，卸载完顺便看看配置还在不在，一般默认dovecot配置不会删除
yum -y remove dovecot\* postfix\* sendmail\*
```

> dovecot配置文件路径：/etc/dovecot/ 
> postfix配置文件路径：/etc/postfix


卸载完成之后，创建一个叫做 vmail 的用户 和一个叫做vmail 的组  之后基本所有的权限都应该交给这个用户；

```bash
groupadd -g 5000 vmail
useradd -g vmail -u 5000 -s /sbin/nologin vmail
```

## 一 、安装关于权限校验的软件  cyrus-sasl
1)安装
	

```bash
yum -y install cyrus-sasl\*
```
2)配置
```bash
vim /etc/sysconfig/saslauthd

#修改如下两行
SOCKETDIR=/var/run/saslauthd
MECH=shadow
```

vim /etc/sasl2/smtpd.conf
添加如下几行

```bash
pwcheck_method: saslauthd
mech_list: plain login
log_level: 3
saslauthd_path:/var/run/saslauthd/mux
```


3)启动

```bash
systemctl restart saslauthd
```

## 二、部署及创建数据库【mysql】
### 1、部署数据库（mariadb）

```bash
#安装mariadb
yum install mariadb\* -y

#启动数据库
systemctl start mariadb
#设置开机自启
systemctl enable mariadb

#查看数据库是否启动（有进程则启动）
netstat -anput | grep 3306

#数据库初始化操作（设置密码）
mysql_secure_installation
```
提示：如果回车没有反应，先检查mariadb是否启动。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181617423.png)

```bash
#进入mysql数据库
mysql -uroot -p密码

#设置数据库远程连接，用于使用外部软件链接数据库【Navicat、SQLyog】
grant all privileges  on *.* to root@'%' identified by "123123";
#刷新权限
flush privileges;
```
这样就可以在远程链接数据库了；

### 2、库、表结构导入
sql文件：（创建一个postfix.sql文件，将以下所有内容直接复制放到postfix.sql中，导入sql语句即可，里面有一条测试数据）

```sql
/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 5.7.38-log : Database - postfix
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`postfix` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `postfix`;

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `superadmin` tinyint(1) NOT NULL DEFAULT '0',
  `created` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `modified` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Postfix Admin - Virtual Admins';

/*Data for the table `admin` */

insert  into `admin`(`username`,`password`,`superadmin`,`created`,`modified`,`active`) values 
('cs@cs.com','123123',1,'2023-07-14 15:52:23','2023-07-14 15:52:23',1);

/*Table structure for table `alias` */

DROP TABLE IF EXISTS `alias`;

CREATE TABLE `alias` (
  `address` varchar(255) NOT NULL,
  `goto` text NOT NULL,
  `domain` varchar(255) NOT NULL,
  `created` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `modified` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`address`),
  KEY `domain` (`domain`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Postfix Admin - Virtual Aliases';

/*Data for the table `alias` */

insert  into `alias`(`address`,`goto`,`domain`,`created`,`modified`,`active`) values ('cs@cs.com','cs@cs.com','cs.com','2023-07-17 13:59:18','2023-07-17 13:59:18',1);

/*Table structure for table `alias_domain` */

DROP TABLE IF EXISTS `alias_domain`;

CREATE TABLE `alias_domain` (
  `alias_domain` varchar(255) NOT NULL DEFAULT '',
  `target_domain` varchar(255) NOT NULL DEFAULT '',
  `created` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `modified` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`alias_domain`),
  KEY `active` (`active`),
  KEY `target_domain` (`target_domain`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Postfix Admin - Domain Aliases';

/*Data for the table `alias_domain` */

/*Table structure for table `config` */

DROP TABLE IF EXISTS `config`;

CREATE TABLE `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `value` varchar(20) CHARACTER SET latin1 NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='PostfixAdmin settings';

/*Data for the table `config` */

insert  into `config`(`id`,`name`,`value`) values 
(1,'version','1836');

/*Table structure for table `domain` */

DROP TABLE IF EXISTS `domain`;

CREATE TABLE `domain` (
  `domain` varchar(255) NOT NULL,
  `description` varchar(255) CHARACTER SET utf8 NOT NULL,
  `aliases` int(10) NOT NULL DEFAULT '0',
  `mailboxes` int(10) NOT NULL DEFAULT '0',
  `maxquota` bigint(20) NOT NULL DEFAULT '0',
  `quota` bigint(20) NOT NULL DEFAULT '0',
  `transport` varchar(255) NOT NULL,
  `backupmx` tinyint(1) NOT NULL DEFAULT '0',
  `created` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `modified` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`domain`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Postfix Admin - Virtual Domains';

/*Data for the table `domain` */

insert  into `domain`(`domain`,`description`,`aliases`,`mailboxes`,`maxquota`,`quota`,`transport`,`backupmx`,`created`,`modified`,`active`) values 
('ALL','',0,0,0,0,'',0,'2023-07-14 15:52:22','2023-07-14 15:52:22',1),
('cs.com','测试邮箱',0,0,10,2048,'virtual',1,'2023-07-14 16:16:11','2023-07-14 16:16:11',1);

/*Table structure for table `domain_admins` */

DROP TABLE IF EXISTS `domain_admins`;

CREATE TABLE `domain_admins` (
  `username` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `created` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  KEY `username` (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Postfix Admin - Domain Admins';

/*Data for the table `domain_admins` */

insert  into `domain_admins`(`username`,`domain`,`created`,`active`) values 
('cs@cs.com','ALL','2023-07-14 15:52:24',1);

/*Table structure for table `fetchmail` */

DROP TABLE IF EXISTS `fetchmail`;

CREATE TABLE `fetchmail` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `domain` varchar(255) DEFAULT '',
  `mailbox` varchar(255) NOT NULL,
  `src_server` varchar(255) NOT NULL,
  `src_auth` enum('password','kerberos_v5','kerberos','kerberos_v4','gssapi','cram-md5','otp','ntlm','msn','ssh','any') CHARACTER SET utf8 DEFAULT NULL,
  `src_user` varchar(255) NOT NULL,
  `src_password` varchar(255) NOT NULL,
  `src_folder` varchar(255) NOT NULL,
  `poll_time` int(11) unsigned NOT NULL DEFAULT '10',
  `fetchall` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `keep` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `protocol` enum('POP3','IMAP','POP2','ETRN','AUTO') CHARACTER SET utf8 DEFAULT NULL,
  `usessl` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `sslcertck` tinyint(1) NOT NULL DEFAULT '0',
  `sslcertpath` varchar(255) CHARACTER SET utf8 DEFAULT '',
  `sslfingerprint` varchar(255) DEFAULT '',
  `extra_options` text,
  `returned_text` text,
  `mda` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT '2000-01-01 00:00:00',
  `created` timestamp NOT NULL DEFAULT '2000-01-01 00:00:00',
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `fetchmail` */

/*Table structure for table `log` */

DROP TABLE IF EXISTS `log`;

CREATE TABLE `log` (
  `timestamp` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `username` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `action` varchar(255) NOT NULL,
  `data` text NOT NULL,
  KEY `timestamp` (`timestamp`),
  KEY `domain_timestamp` (`domain`,`timestamp`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Postfix Admin - Log';

/*Data for the table `log` */

insert  into `log`(`timestamp`,`username`,`domain`,`action`,`data`) values 
('2023-07-14 16:20:05','cs@cs.com (172.16.10.1)','cs.com','create_alias','cs@cs.com');

/*Table structure for table `mailbox` */

DROP TABLE IF EXISTS `mailbox`;

CREATE TABLE `mailbox` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `maildir` varchar(255) NOT NULL,
  `quota` bigint(20) NOT NULL DEFAULT '0',
  `local_part` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `created` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `modified` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`username`),
  KEY `domain` (`domain`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COMMENT='Postfix Admin - Virtual Mailboxes';

/*Data for the table `mailbox` */

insert  into `mailbox`(`username`,`password`,`name`,`maildir`,`quota`,`local_part`,`domain`,`created`,`modified`,`active`) values 
('cs@cs.com','123123','测试','cs.com/cs/',0,'cs','cs.com','2023-07-14 16:20:05','2023-07-14 16:20:05',1);

/*Table structure for table `quota` */

DROP TABLE IF EXISTS `quota`;

CREATE TABLE `quota` (
  `username` varchar(255) CHARACTER SET latin1 NOT NULL,
  `path` varchar(100) CHARACTER SET latin1 NOT NULL,
  `current` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`username`,`path`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `quota` */

/*Table structure for table `quota2` */

DROP TABLE IF EXISTS `quota2`;

CREATE TABLE `quota2` (
  `username` varchar(100) CHARACTER SET latin1 NOT NULL,
  `bytes` bigint(20) NOT NULL DEFAULT '0',
  `messages` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

/*Data for the table `quota2` */

/*Table structure for table `vacation` */

DROP TABLE IF EXISTS `vacation`;

CREATE TABLE `vacation` (
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) CHARACTER SET utf8 NOT NULL,
  `body` text CHARACTER SET utf8 NOT NULL,
  `activefrom` timestamp NOT NULL DEFAULT '2000-01-01 00:00:00',
  `activeuntil` timestamp NOT NULL DEFAULT '2000-01-01 00:00:00',
  `cache` text NOT NULL,
  `domain` varchar(255) NOT NULL,
  `interval_time` int(11) NOT NULL DEFAULT '0',
  `created` datetime NOT NULL DEFAULT '2000-01-01 00:00:00',
  `modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`email`),
  KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Postfix Admin - Virtual Vacation';

/*Data for the table `vacation` */

/*Table structure for table `vacation_notification` */

DROP TABLE IF EXISTS `vacation_notification`;

CREATE TABLE `vacation_notification` (
  `on_vacation` varchar(255) CHARACTER SET latin1 NOT NULL,
  `notified` varchar(255) CHARACTER SET latin1 NOT NULL DEFAULT '',
  `notified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`on_vacation`,`notified`),
  CONSTRAINT `vacation_notification_pkey` FOREIGN KEY (`on_vacation`) REFERENCES `vacation` (`email`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Postfix Admin - Virtual Vacation Notifications';

/*Data for the table `vacation_notification` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
```


添加新用户都添加到mailbox表中即可；
字段解析：
|username|password  |name | maildir|quota|local_part|domain|created|modified|active
|--|--|--|--|--|--|--|--|--|--|
|用户邮箱地址|用户邮箱密码|用户名|用户数据存储路径（服务器上）|邮件大小限制（0为不限制，单位为 KB）|用户邮箱头部|所属域|创建时间|修改时间|是否激活|

字段实例：

|username|password  |name | maildir|quota|local_part|domain|created|modified|active
|--|--|--|--|--|--|--|--|--|--|
|cs@cs.com  | 123123 |测试用户|cs.com/cs|0|cs|cs.com|2023-07-21 00:00:00|2023-07-21 00:00:00|1|

## 三、安装及配置 postfix 邮局
1)安装
> linux 服务器一般都自带postfix centOS8 自带的应该是2.10.x左右的版本 此文档目前使用的是 2.10.1版本的postfix

```bash
wget -P /etc/yum.repos.d https://repos.fedorapeople.org/repos/mstevens/postfix/epel-postfix.repo

yum -y install postfix
#查看postfix版本 
postconf -d | grep mail_version
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181616941.png)


安装好以后 , 开始配置postfix的主配置文件
		
2)配置
		
先备份配置：

```bash
cp -ar /etc/postfix/main.cf /etc/postfix/main.cf-bak
```
编辑配置文件（直接重新写，<font color=red>需要改的只有服务器主机名称与域名</font>）：
```bash
vim /etc/postfix/main.cf

#固定写法
queue_directory = /var/spool/postfix
command_directory = /usr/sbin
daemon_directory = /usr/libexec/postfix
data_directory = /var/lib/postfix
mail_owner = postfix

#配置自己的邮件服务主机名称
myhostname = mail.cs.com
#配置自己邮件服务器的域名
mydomain = cs.com
#配置自己发送邮件使用的域名
myorigin = $mydomain
#配置监听的端口
inet_interfaces = all
#配置自己可以支持接收的所有域名
mydestination = $myhostname, localhost.$mydomain, localhost
#这里这个配置就是这样缺省的 我也不知道为什么
local_recipient_maps =
#这个注释是为了告诉使用者 下面这个和上面这个不是同一行
unknown_local_recipient_reject_code = 550
#固定写法
alias_maps = hash:/etc/aliases
alias_database = hash:/etc/aliases
debug_peer_level = 2
debugger_command =
		PATH=/bin:/usr/bin:/usr/local/bin:/usr/X11R6/bin
		ddd $daemon_directory/$process_name $process_id & sleep 5
sendmail_path = /usr/sbin/sendmail.postfix
newaliases_path = /usr/bin/newaliases.postfix
mailq_path = /usr/bin/mailq.postfix
setgid_group = postdrop
html_directory = no
manpage_directory = /usr/share/man
#这里的这个 postfix-2.10.1 需要改成你自己的版本 自己是什么版本 执行 postconf -d | grep mail_version 获取
sample_directory = /usr/share/doc/postfix-2.10.1/samples
readme_directory = /usr/share/doc/postfix-2.10.1/README_FILES
#启用smtp认证
#确定使用dovecot 进行用户验证  下面都是固定写法
smtpd_sasl_type = dovecot
smtpd_sasl_path = /var/spool/postfix/private/auth
smtpd_sasl_auth_enable = yes 
smtpd_sasl_local_domain = $myhostname
smtpd_sasl_security_options = noanonymous
smtpd_client_restrictions = permit_sasl_authenticated
#smtpd_sasl_application_name = smtpd
broken_sasl_auth_clients = yes
smtpd_recipient_restrictions = permit_mynetworks,permit_sasl_authenticated,reject_unauth_destination,reject_unknown_sender_domain
#smtpd_sasl_security_restrictions = permit_mynetworks,permit_sasl_authenticated,reject_unauth_destination
proxy_read_maps = $local_recipient_maps $mydestination $virtual_alias_domains $virtual_mailbox_maps $virtual_mailbox_domains $relay_recipient_maps $relay_domains $canonical_maps $sender_canonical_maps $recipient_canonical_maps $relocated_maps $transport_maps $mynetworks
#$virtual_alias_maps
#$virtual_mailbox_limit_maps
#启用虚拟用户
#确定虚拟用户的基础存储目录 
virtual_mailbox_base = /home/vmail/
#这里配置虚拟域 , 因为我只需要使用一个虚拟域 , 就是当前主机的域名 所以就直接写死了
virtual_mailbox_domains = $mydomain
#如果不想写死 就用下面这个 
#virtual_mailbox_domains = proxy:mysql:/etc/postfix/sql/mysql_virtual_domains_maps.cf
#virtual_alias_maps =
#	proxy:mysql:/etc/postfix/sql/mysql_virtual_alias_maps.cf,
#	proxy:mysql:/etc/postfix/sql/mysql_virtual_alias_domain_maps.cf,
#	proxy:mysql:/etc/postfix/sql/mysql_virtual_alias_domain_catchall_maps.cf
virtual_mailbox_maps = proxy:mysql:/etc/postfix/sql/mysql_virtual_mailbox_maps.cf
#	proxy:mysql:/etc/postfix/sql/mysql_virtual_alias_domain_mailbox_maps.cf
#这里是创建了一个 叫做vmail 的用户 手动给它划分的gid和uid 之所以叫vmail 是因为一般虚拟用户都是搭配postfixadmin 来使用的 , 要不然你不知道表结构 也不知道表里面存放些什么数据 , 之后我会贴出来 , vmail是默认配置项里常用的用户
virtual_uid_maps = static:5000
virtual_gid_maps = static:5000
#下面是固定写法
virtual_transport = dovecot
#dovecot_destination_recipient_limit = 1
```


先备份配置：

```bash
cp -ar /etc/postfix/master.cf /etc/postfix/master.cf-bak
```

vim /etc/postfix/master.cf

```bash
#在末尾添加一行
dovecot   unix  -       n       n       -       -       pipe
	flags=DRhu user=vmail:vmail argv=/usr/libexec/dovecot/dovecot-lda -f ${sender} -d ${recipient}
```

在postfix目录中 创建一个名为sql的文件夹 里面要存放上面使用到的这些sql 文件；<font color=red>mysql_virtual_mailbox_maps.cf为最重要</font>
```bash
#创建sql文件夹
mkdir /etc/postfix/sql

#创建 mysql_virtual_alias_maps.cf 文件
vim mysql_virtual_alias_maps.cf
#内容如下
user = root #(数据库用户名)
password = 123123	#(数据库密码)
hosts = 172.16.10.11:3333	#(数据库地址及端口号)
dbname = postfix				#(数据库名称)
query = SELECT goto FROM alias WHERE address='%s' AND active = '1'


#创建 mysql_virtual_alias_domain_catchall_maps.cf 文件
vim mysql_virtual_alias_domain_catchall_maps.cf
#内容如下
user = root
password = 123123
hosts = 172.16.10.11:3333
dbname = postfix
query = SELECT goto FROM alias,alias_domain WHERE alias_domain.alias_domain = '%d' and alias.address = CONCAT('@', alias_domain.target_domain) AND alias.active = 1 AND alias_domain.active='1'

#创建 mysql_virtual_alias_domain_mailbox_maps.cf 文件
vim mysql_virtual_alias_domain_mailbox_maps.cf
#内容如下
user = root
password = 123123
hosts = 172.16.10.11:3333
dbname = postfix
query = SELECT maildir FROM mailbox,alias_domain WHERE alias_domain.alias_domain = '%d' and mailbox.username = CONCAT('%u','@',alias_domain.target_domain) AND mailbox.active = 1 AND alias_domain.active='1';

#创建 mysql_virtual_mailbox_maps.cf 文件
vim mysql_virtual_mailbox_maps.cf
#内容如下
user = root
password = 123123
hosts = 172.16.10.11:3333
dbname = postfix
query = SELECT maildir FROM mailbox WHERE username='%s' AND active = '1'

#创建 mysql_virtual_alias_domain_maps.cf 文件
vim mysql_virtual_alias_domain_maps.cf
#内容如下
user = root
password = 123123
hosts = 172.16.10.11:3333
dbname = postfix
query = SELECT goto FROM alias,alias_domain WHERE alias_domain.alias_domain = '%d' and alias.address = CONCAT('%u', '@', alias_domain.target_domain) AND alias.active = 1 AND alias_domain.active='1';
```

测试是否成功链接数据库：

> 前提：
>  1、数据库里必须有数据；
> 2、如果使用命令执行没有返回任何结果，可查看文件并打开数据库去执行那条语句，如果有但是里面是空值那就没问题，如果没有就是写错了；
> 3、必须对好数据库的连接用户名、密码、数据库名。

```bash
postmap -q cs@cs.com mysql:/etc/postfix/sql/mysql_virtual_alias_maps.cf
postmap -q cs@cs.com mysql:/etc/postfix/sql/mysql_virtual_alias_domain_catchall_maps.cf
postmap -q cs@cs.com mysql:/etc/postfix/sql/mysql_virtual_alias_domain_mailbox_maps.cf
postmap -q cs@cs.com mysql:/etc/postfix/sql/mysql_virtual_mailbox_maps.cf
postmap -q cs@cs.com mysql:/etc/postfix/sql/mysql_virtual_alias_domain_maps.cf
```
测试完之后没有问题就可以启动postfix啦！！！

3)启动
	

```bash
systemctl restart postfix
```

4)日志
	

```bash
tailf /var/log/maillog
```

## 四 、安装及配置 dovecot
1)安装  安装的时候必须要保证这些组件全都在

```bash
yum -y install dovecot dovecot-devel dovecot-mysql pam-devel
```

安装完可以使用rpm命令看一下这些安装包都装上了没；

```bash
rpm -qa | grep dovecot
rpm -qa | grep pam-devel
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181616617.png)

可以看到都安装上了；


2)查看版本号

```bash
dovecot --version
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181616440.png)


3)配置

先备份配置：

```bash
cp -ar /etc/dovecot/dovecot.conf /etc/dovecot/dovecot.conf-bak
```

直接清空文件内容：
vim /etc/dovecot/dovecot.conf

```bash
#支持pop3 和 imap
protocols = imap pop3
#打开监听
listen = *
#邮件存放路径 %d 表示域名 %n表示用户名
mail_location = maildir:/home/vmail/%d/%n/Maildir
!include conf.d/*.conf
#密码验证方式  这里的 dovecot-sql.conf.ext 也是需要创建的
passdb {
  driver = sql
  args = /etc/dovecot/dovecot-sql.conf.ext
}
#这里使用静态验证的方式 这里的uid  和  gid 是 开头创建vmail 的uid 和 gid
userdb {
  driver = static
  args = uid=5000 gid=5000 home=/home/vmail/%d/%n
}
!include_try local.conf
#这里开启日志 方便排查错误
auth_debug_passwords=yes
mail_debug=yes
auth_verbose=yes
auth_verbose_passwords=plain
```
vim /etc/dovecot/conf.d/10-ssl.conf
```bash
#关闭ssl认证
ssl = no
```
退出编辑器创建dovecot日志文件：
```bash
#确定log的位置 这里的权限必须给 vmail 要不然报错  chown vmail:vmail  info_log_path = /var/log/dovecot_info.log  chown vmail:vmail  info_log_path = /var/log/dovecot_debug.log，目前没有这两个文件，可以先去创建；
touch /var/log/{dovecot_info.log,dovecot_debug.log}
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181616000.png)

将他们修改为vmail:vmail 用户:用户组

```bash
cd /var/log/
chown vmail:vmail dovecot_info.log dovecot_debug.log
chmod 777 dovecot_info.log dovecot_debug.log 
ll | grep dovecot
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181616627.png)



vim /etc/dovecot/conf.d/10-logging.conf 

```bash
#直接添加到最后一行：
#设置收件箱dovecot的日志路径
info_log_path = /var/log/dovecot_info.log
debug_log_path = /var/log/dovecot_debug.log
```

vim /etc/dovecot/conf.d/10-auth.conf

```bash
#这里做修改
disable_plaintext_auth = no
auth_mechanisms = plain
#结尾处 把!include auth-system.conf.ext 注释掉  
#!include auth-system.conf.ext
# 把!include auth-sql.conf.ext 打开注释
!include auth-sql.conf.ext
```

vim /etc/dovecot/conf.d/10-master.conf

```bash
#这里做修改
service pop3-login {
  inet_listener pop3 {
	port = 110
  }
  inet_listener pop3s {
	#port = 995
	#ssl = yes
  }
}

service lmtp {
  unix_listener lmtp {
	#mode = 0666
  }
  unix_listener /var/spool/postfix/private/dovecot-lmtp {
		mode = 0600
		user = vmail
		group = vmail

  }
}

service auth {
  unix_listener auth-userdb {
	mode = 0666
	user = vmail
	group = vmail
  }
  unix_listener /var/spool/postfix/private/auth {
	mode = 0666
	user= postfix
	#group =postfix
  }
}
```
3)设置权限 这里也是很重要的一步 要不然日志一直报错
首先查看 dovecot-lda 的执行权限  如果不是 vmail 则设置为vmail

```bash
ll /usr/libexec/dovecot/dovecot-lda
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181616755.png)

可以看出来是root权限，所以要设置dovecot-lda的执行权限；

```bash
chown vmail:vmail /usr/libexec/dovecot/dovecot-lda
chmod 777 /usr/libexec/dovecot/dovecot-lda
#再次查看权限
ll /usr/libexec/dovecot/dovecot-lda
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181616772.png)


给/var/spool/mail/ 授权

```bash
#先查看/var/spool/mail/权限
ll /var/spool/ | grep mail
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181616262.png)

是root:mail权限，给他设置为vmail:vmail权限
```bash
chown -R vmail:vmail /var/spool/mail/
#设置完再确认一下
ll /var/spool/ | grep mail
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181616865.png)



4) 在/etc/dovecot/ 下创建一个dovecot-sql.conf.ext 文件

```bash
vim /etc/dovecot/dovecot-sql.conf.ext

#内容如下
#(驱动类型)
driver = mysql 
#connect = host=数据库地址 dbname=数据库名称 user=用户名 password=密码 port=端口
connect = host=172.16.10.11 dbname=postfix user=root password=123123 port=3333
#(这里密码采用明文验证 和 auth_verbose_passwords 这个配置相互对应)
default_pass_scheme = plain 
password_query = SELECT username AS user,password FROM mailbox WHERE username = '%u'
#这里其实可以不写 因为外面用的是静态用户 , 这里写了日志会报一个waring 但是不影响使用
user_query = SELECT maildir, 5000 AS uid, 5000 AS gid FROM mailbox WHERE username = '%u'
```
5)创建master.pid

```bash
touch /var/run/dovecot/master.pid
```

6)重新启动postfix、dovecot服务

```bash
systemctl restart postfix dovecot
```



## 五、邮箱测试
我这里使用`Foxmail邮箱`

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181616594.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181616795.png)

输入自己的email地址，也就是数据库里的邮件地址和密码；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181616522.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181616027.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181616538.png)


然后自己就可以直接测试收发邮件了；


发送邮件成功收到；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181615784.png)

收取邮件成功；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181615718.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181615312.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181615660.png)

部署完成！！！


## 总结

> 邮件数据存储路径：/home/vmail 
> postfix配置文件路径：/etc/postfix
> dovecot配置文件路径：/etc/dovecot








