---
title: 【Windows】安装绿色版Mysql数据库 -- 可支持所有版本安装教程
icon: circle-info
order: 11
tag:
- Windows
- mysql
- 运维
category:
- Windows
- mysql
pageview: false
date: 2024-03-24
comment: false
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



## 一、前言

> &emsp;&emsp;项目所需，需要在`windows`上部署一个`Mysql`数据库，版本为`5.7.38`，刚好前两天在家也装了一个，只不过是别的版本，这里给大家演示的版本为`5.7.38`；





## 二、官网下载绿色版安装包

> Mysql官网下载地址：[https://downloads.mysql.com/archives/community/](https://downloads.mysql.com/archives/community/)



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/d1f7cb8c7c3a499db406389e46a782c2.png)



## 三、解压安装包



放到任意目录或自己的专用位置，尽量目录名都为英文；



* 解压压缩包



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/fe404b3fb0f44ed3bb64e9bf8743595e.png)



## 四、配置 my.ini 文件

* 配置 <font color=gree>my.ini </font> 文件

在解压下来的`mysql-5.7.38-winx64 `下创建一个文件，并进入文件将以下内容写入到里面；

```bash
[mysqld]
# 设置3306端口
port=3306
# 设置mysql的安装目录
basedir=E:\mysql\mysql-5.7.38-winx64
# 设置mysql数据库的数据的存放目录
datadir=E:\mysql\mysql-5.7.38-winx64\data  
# 允许最大连接数
max_connections=200
# 允许连接失败的次数。这是为了防止有人从该主机试图攻击数据库系统
max_connect_errors=10
# 服务端使用的字符集默认为UTF8
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
# 默认使用“mysql_native_password”插件认证
default_authentication_plugin=mysql_native_password
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8mb4
[client]
# 设置mysql客户端连接服务端时默认使用的端口
port=3306
default-character-set=utf8
```



配置完成之后，保存退出，修改文件名为：`my.ini`；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/aba0f14a39684b229b4806a5dcb95bf6.png)



## 五、运行、安装 Mysql



### 5.1 使用管理员运行命令提示符

* `ctrl + s` 搜索 `命令提示符` 以管理员方式打开； 
* 如果在e盘，先输入`e:` ，然后在使用cd 切换到mysql的bin目录下，如果是c盘，就可以直接`cd 目录` 切换过去；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/9351b1ed6c4e464884abff4225196eca.png)



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/4247912a4c4f48e9b6f9ffdeec2ab2f7.png)





### 5.2 执行MySQL初始化命令 



```bash
mysqld --initialize --console
```



等待执行完，会得到初始化密码，需要保存住，改完数据库密码就用不到了；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/57a35278375a45fba43605a6b1962863.png)



画框的就是初始化生成的密码了；需要先暂时保存住，<font color=red>很重要</font>。



### 5.3 安装mysql的服务

`mysqld --install 服务名`(不写的话默认服务名是mysql)

```bash
mysqld --install mysql
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/54f682d00eae4d24bb782bac9dd448ed.png)



安装完成；



### 5.4 启动mysql服务

```bash
net start mysql
```

这样就启动成功了。



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/055553479d8542ba840b4a5ed77155b5.png)





也可以使用任务管理，查看服务进程，存在则已经启动。





![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/12602c32bdb84802b450140895ff1abb.png)



## 六、登陆 Mysql 并 修改登陆密码

**输入命令：mysql -u root -p ，（其中-u root表示用户名为root，-p表示登录密码）登录，然后提示输入密码，密位为5.2初始化所画的红框。**

```bash
mysql -uroot -p
# 然后让输入密码，就输入刚刚初始化完的密码进入；
```



**由于自动生成的密码比较复杂，我们可以更改密码，更改密码命令为：`alter user root@'localhost' identified by '123123';` 其中单引号内为更改后的密码；密码可以自己设定。**

```mysql
alter user root@'localhost' identified by '123123';
```



设置完之后退出`exit`，验证密码登陆；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/819da59d8cf345bba202810983891a9b.png)









## 七、使用数据库连接工具测试



这里我是用`Navicat` ，大家也可以使用其他工具来进行测试；



> 连接名：自己随便输入
>
> 主机：`localhost` 或 `127.0.0.1`
>
> 端口：默认的`3306`
>
> 用户名：默认的`root`
>
> 密码：自己刚刚设置的



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/22c6c87dca394517b6af4145560a8d19.png)





* 点击`测试连接`，出现成功及可以连接



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/ca01d606fd98479bb8d8f19dc0e5700b.png)





## 八、其他 Mysql 操作命令

```bash
# 安装 mysql 服务
mysqld --install mysql

# 启动 mysql 服务
net start mysql

# 关闭 mysql 服务
net stop mysql

# 卸载 mysql 服务
## 卸载服务时先停止
net stop mysql
## 再卸载服务
sc delete mysql
```



> 注：需要彻底卸载服务，在命令行卸载完之后，还需要删除mysql的安装文件，<font color=red>如果配置了环境变量，记得也需要删除以下环境变量。</font>

