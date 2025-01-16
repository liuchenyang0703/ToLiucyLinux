---
title: 基于Linux对MySQL数据库的安全加固指南（超实用--实战版）
icon: circle-info
order: 3
category:
  - Linux
  - 数据库
tag:
  - Linux
  - 数据库
pageview: false
date: 2023-11-19 23:54:31
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

![IMG_202307267457_jpg.jpg](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/306574aa33344995bc7dca1f2a0aa5ba.jpeg)

## 前言
MySQL数据库是业务系统中常用的关系型数据库，但是由于其广泛使用，也成为安全攻击的目标。因此，数据库安全加固至关重要。下面将为大家提供一份基于Linux的MySQL数据库安全加固指南，帮助大家保护自己及公司的数据库免受潜在的安全威胁。

常见的MySQL数据库攻击方式包括SQL注入，暴力破解和拒绝服务攻击。以下是一些简单的加固方法：

> - 1.修改默认端口：MySQL默认端口为3306，容易被攻击者扫描到，建议修改为其他端口。
> - 2.安装防火墙：通过配置防火墙，可以控制数据库的访问权限，并防止恶意请求。
> - 3.强化密码：使用强密码并定期更新。避免使用简单的密码，比如123456和qwerty等。强密码包括：（复杂密码应包括大小写字母、数字和特殊字符），可参考此文章随机生成密码：[【Linux】Centos7 随机生成密码](https://blog.csdn.net/liu_chen_yang/article/details/129922682)
> - 4.删除无用的账户：删除不必要的账户以减少攻击面。
> - 5.开启SSL/TLS连接：开启MySQL的ssl选项，启用加密传输可以提高安全性。
> - 6.控制访问权限：控制应用程序对MySQL的操作权限，限制只能读取和操作必要的表、字段和行。
> - 7.开启日志：开启MySQL的日志功能，记录所有的查询操作，以便后期审查和追踪攻击来源。
> - 8.定期备份数据，并将备份数据存储在安全的位置。备份是防止数据丢失和恢复数据的重要手段。这里推荐一份定时定期备份数据的脚本：[mysql数据库定时备份脚本+定时删除 ](https://download.csdn.net/download/liu_chen_yang/87776124?spm=1001.2014.3001.5503)。
> - 9.禁用root远程登陆，启用访问控制： 在MySQL配置文件中启用访问控制，只允许特定的IP地址或主机名访问数据库。这样可以防止未授权的访问尝试。
> - 10.监控和警报： 设置数据库监控工具和警报系统，及时发现和响应潜在的安全事件和异常活动。


除了以上措施，还有一些其他的技巧可以帮助加强MySQL数据库的安全性。例如，使用双因素身份验证，设置入侵检测系统进行实时监控。

总之，MySQL数据库的安全加固是必要的，可以在攻击者趁虚而入之前有效地减少数据库安全风险。


下面给大家讲解一些实例吧！

## 数据库加固实例

## 1、修改mysql默认端口
>在配置文件中修改端口，配置文件名为：“my.cnf”在服务器中的/etc/下；

&emsp;&emsp;如果使用的是容器的方式部署的，可以修改一下创建容器时对外开放的端口，具体容器修改端口可参考：[docker修改容器的端口、容器名、映射地址......](https://liucy.blog.csdn.net/article/details/124511738)

来看看容器外部署的数据库如何修改；
```bash
cat /etc/my.cnf
```

找到port，注意`my.cnf`可能会有两个port，一个是`[client]`下的，一个是`[mysqld]`下的，修改`[mysqld]	`下的port即可，client下的也可以修改，主要是`[mysqld]`下的生效；
修改完重启数据库，有一点如果访问不到，可以先查看端口有没有起来，如果起来了，就检查防火墙，如果没起来，就去看数据库启动报错或日志；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/81c9b7abbf784b59b6835c3e03d171eb.png)

修改完重启一下服务即可生效。




## 2、安装配置防火墙

使用centos中自带的`firewall-cmd`来管理防火墙即可；

```bash
#开启防火墙
systemctl restart firewalld

#开放数据库的端口
#开放3306端口、加载防火墙配置、查看端口是否开放
firewall-cmd --permanent --add-port=3306/tcp
firewall-cmd --reload
firewall-cmd --list-ports | grep 3306
```
## 3、强化密码
可参考此文章随机生成密码：[【Linux】Centos7 随机生成密码](https://blog.csdn.net/liu_chen_yang/article/details/129922682)
这样安全性比较高，如果想要自己设置当然也可以；建议使用强密码并定期更新。避免使用简单的密码，比如123456和qwerty等。强密码包括：（复杂密码应包括大小写字母、数字和特殊字符）。


## 4、开启日志
开启log-bin日志，可在配置文件中开启；`/etc/my.cnf`

```bash
log-bin=mysql-bin
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/e30be3e33ff6489e9a12acae014e801d.png)


开启完，重启服务生效；

---

mariadb日志一般会存储在 `/var/lib/mysql` 下；
容器的方式部署的mysql，日志数据一般会存在 `/var/lib/mysql/data/` 下。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/27aed8f281df4275bc1ba77c7750a898.png)



## 5、定期备份数据
>这里推荐一个定期备份的脚本：[mysql数据库定时备份脚本+定时删除 ](https://download.csdn.net/download/liu_chen_yang/87776124?spm=1001.2014.3001.5503)


>建议放在数据库数据存储目录下（对于健忘的人来说比较好找），当然也可以自己找一个隐蔽安全的地方放起来（如果怕忘记，可以计一个笔记），然后设置定时任务，定时全备；


```bash
定时备份，需要写周期性计划任务：
#周期性计划任务（每天完备一次）
0 0 */1 * * root /bin/sh 脚本路径/back.sh
```

> **脚本可修改的内容：**
>  1、数据库信息：用户名、密码、ip、端口 
>  2、备份的路径及日志文件名 
>  3、脚本保留的天数
> 4、要备份的库（注意里面的说明，如需备份多个库，可以用到数组，如只备份一个库，可直接使用命令备份即可，总之，注意里面的说明）
> 5、备份库的文件名和打包备份的文件名 6、日志文件内打印的内容<br>
> 日志文件的内容展示：
> --- 创建备份文件: 20230510.sql.tgz
> 开始:2023年05月10日 16:06:15 结束:2023年05月10日 16:06:20 succ

## 6、控制访问权限

> 说明： 
> username：你将创建的用户名
> host：指定该用户在哪个主机上可以登陆，如果是本地用户可用localhost，如果想让该用户可以从任意远程主机登陆，可以使用通配符%
> password：该用户的登陆密码，密码可以为空，如果为空则该用户可以不需要密码登陆服务器

- 限制访问数据库ip和用户名

> **开放的ip：**
> localhost
> 172.16.11.11
> 172.16.11.12
> 172.16.11.13
> 172.16.11.14

这时候先不要删除远程登录，可以先在远程连接的第三方工具连接创建普通用户和指定某一个ip，因为linux查看用户列表的时候视觉感不是很好，所以等创建完指定ip和用户名，测试完之后，在关闭远程登陆和root登陆。<font color=red>提示：切记要互相可以ping通，才可以，否则设置了要是连不上问题还要找好久。</font>

- 使用`navicat`连接到数据库；

```bash
#进入mysql库中
use mysql;

#查看当前可以访问到该数据库的用户和权限
select * from user;
```
可以看到本地和远程都可以连接到该数据库，那么下来我们就给他做限制；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/fbb5e9f4736b47deb8a9d12e5183a26a.png)
### 开放单用户及ip测试
```bash
#首先创建一个库，（后面要用到这个库）
create database cs;

#创建一个用户
create user cs@'localhost' identified by '123123';
#给该用户设置权限（只给cs这个库的所有权限）
grant all privileges on cs.* to 'cs'@'localhost' identified by '123123';
#其实他两可合并为一条命令，那就是直接执行第二条就行；
#PROCESS权限，可以执行解释执行计划操作的权限（需要额外授予表上的select权限）。
#授权PROCESS权限
grant process on *.* to 'cs'@'localhost';
#刷新权限
flush privileges;

#查看用户权限(只可以用root用户查看)
#该命令可以在linux上执行查看，也可以在其他工具上查看
show grants for 'cs'@'localhost';
#或者（该命令仅限于linux上查看）
select * from mysql.user where user="cs" \G;
```
- 查看权限

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/d148d81701984c51a691d01cbc95a6ba.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/af5d712ab35346b79abf73a01eb5264c.png)


- 然后看mysql/user表，可以看到多了一个cs用户，只可以本地访问数据库，然后测试登陆；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/c7489a5048f140a4bf02b499e61e227a.png)

```bash
mysql -ucs -p123123
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/930327c0592f41c28cb2442d4dc6e7a7.png)

成功登陆，并且有`cs`这个库的所有权限；
而用第三方登陆，就登陆不上，比如我们用`navicat`连接测试；
很显然，登陆不上的这是；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/4da55b74ee2545e89d44f221b4394b94.png)

### 批量开放用户及ip测试

```bash
#批量创建用户
create user cs@'172.16.11.11',cs@'172.16.11.12',cs@'172.16.11.13',cs@'172.16.11.14' identified by '123123';
#给批量用户设置权限（只给cs这个库的所有权限）
grant all privileges on cs.* to cs@'172.16.11.11',cs@'172.16.11.12',cs@'172.16.11.13',cs@'172.16.11.14' identified by '123123';
#其实他两可合并为一条命令，那就是直接执行第二条就行；
#PROCESS权限，可以执行解释执行计划操作的权限（需要额外授予表上的select权限）。
#授权PROCESS权限
grant process on *.* to cs@'172.16.11.11',cs@'172.16.11.12',cs@'172.16.11.13',cs@'172.16.11.14';
#刷新权限
flush privileges;

#查看用户权限(只可以用root用户查看)
#该命令可以在linux上执行查看，也可以在其他工具上查看（此命令只可每次查一个）
show grants for 'cs'@'172.16.11.11';
#或者（该命令仅限于linux上查看，可以查看所有的cs用户，并输出所有信息）
select * from mysql.user where user="cs" \G;
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/3f51517d5db34f408715499c40ff01bc.png)

- 然后看mysql/user表，可以看到多了一个好几个cs用户，但是host不一样，也就是可以访问的ip主机不一样，只有上面显示的这几个访问数据库，然后测试登陆；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/5f66b7516f144bd38e7f162a505df232.png)



也可以使用mysql命令远程登陆测试，如果你在其他服务器上想访问本地服务器的数据库，前提是必须可以ping通要访问某台数据库的ip，可以使用：


```bash
mysql -h IP -P端口 -u用户名 -p密码

例如：
mysql -h 172.16.10.10 -P3306 -uroot -p123123
```
### 禁止root用户远程登录


>禁止root用户远程登录（切记要留一条root使用localhost登陆的，如果没有就不要禁用了，因为禁用了你就真的在哪都使用不了root了，就需要重新安装了）

```bash
delete from user where user='root' and host='%';
#刷新权限
flush privileges;

#可以再次查询一下是否存在
select * from mysql.user where user="root" \G;
```
可以看到只剩一个root@localhost了，那么就成功禁用的root远程登陆；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/7d4782bcf55345af97cb0fda8641cfee.png)


## 6.1 附加

### 删除用户

```bash
drop user cs@'172.16.11.11';
```

### 批量删除用户

```bash
drop user cs@'172.16.11.12',cs@'172.16.11.13';
```

### 修改root密码：（%为远程登陆，localhost为本机登录）

```bash
alter user 'root'@'localhost' identified by '要修改的密码';
alter user 'root'@'%' identified by '要修改的密码';

#刷新权限
flush privileges;
```



### 安装mariadb时初始化数据库

```bash
mysql_secure_installation
```

### 开启数据库远程连接

```bash
grant all privileges  on *.* to root@'%' identified by "123123";

#刷新权限
flush privileges;
```

## 7、监控和警报

可以使用`zabbix`取关键词告警或者是`Prometheus + Grafana`;
推荐文章：

- [zabbix添加自定义监控项&告警（邮件）](https://liucy.blog.csdn.net/article/details/124101253)
- [【Linux】部署Prometheus + Grafana简介、监控及设置告警详细操作（多种方式安装，亲测无问题）](https://liucy.blog.csdn.net/article/details/131049402)


## 本文可参考文献
|文章标题| 文章地址 |
|--|--|
| [【Linux】Centos7 随机生成密码](http://t.csdn.cn/RnMZf) | [https://blog.csdn.net/liu_chen_yang/article/details/129922682](https://blog.csdn.net/liu_chen_yang/article/details/129922682) |
|[mysql数据库定时备份脚本+定时删除 ](https://download.csdn.net/download/liu_chen_yang/87776124?spm=1001.2014.3001.5503)|[https://download.csdn.net/download/liu_chen_yang/87776124?spm=1001.2014.3001.5503](https://download.csdn.net/download/liu_chen_yang/87776124?spm=1001.2014.3001.5503) |
|[docker修改容器的端口、容器名、映射地址......](https://liucy.blog.csdn.net/article/details/124511738)|[https://liucy.blog.csdn.net/article/details/124511738](https://liucy.blog.csdn.net/article/details/124511738)|
|[zabbix添加自定义监控项&告警（邮件）](https://liucy.blog.csdn.net/article/details/124101253)|[https://liucy.blog.csdn.net/article/details/124101253](https://liucy.blog.csdn.net/article/details/124101253)|
|[【Linux】部署Prometheus + Grafana简介、监控及设置告警详细操作（多种方式安装，亲测无问题）](https://liucy.blog.csdn.net/article/details/131049402)|[https://liucy.blog.csdn.net/article/details/131049402](https://liucy.blog.csdn.net/article/details/131049402)|
|[mysql、mysqldump命令离线包（可直接使用命令）](https://download.csdn.net/download/liu_chen_yang/87769961?spm=1001.2014.3001.5503) |[https://download.csdn.net/download/liu_chen_yang/87769961?spm=1001.2014.3001.5503](https://download.csdn.net/download/liu_chen_yang/87769961?spm=1001.2014.3001.5503)|
|[【Linux】Centos安装mariadb并授权远程登陆](https://liucy.blog.csdn.net/article/details/132077172)|[https://liucy.blog.csdn.net/article/details/132077172](https://liucy.blog.csdn.net/article/details/132077172)|


## 相关文章：
|文章标题|文章地址  |
|--|--|
| [基于Linux对MySQL数据库的安全加固指南（超实用）](https://liucy.blog.csdn.net/article/details/131936739) |[https://liucy.blog.csdn.net/article/details/131936739](https://liucy.blog.csdn.net/article/details/131936739)  |
|[Centos7安装Mysql5.7（超详细版）](https://liucy.blog.csdn.net/article/details/124930789)|[https://liucy.blog.csdn.net/article/details/124930789](https://liucy.blog.csdn.net/article/details/124930789)|
|[【Linux】Centos安装mariadb并授权远程登陆](https://liucy.blog.csdn.net/article/details/132077172)|[https://liucy.blog.csdn.net/article/details/132077172](https://liucy.blog.csdn.net/article/details/132077172)|
|[【云原生】Docker之创建并进入mysql容器](https://liucy.blog.csdn.net/article/details/126288434)|[https://liucy.blog.csdn.net/article/details/126288434](https://liucy.blog.csdn.net/article/details/126288434)|





