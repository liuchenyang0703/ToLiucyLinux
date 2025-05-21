---
title: 【Linux】Redis 6.2.6 的二进制部署【适用于多版本】
icon: circle-info
order: 1
tag:
- Linux
- Redis
- 运维
- 数据库
category:
- Linux
- Redis
- 数据库
pageview: false
date: 2025-05-20
comment: false
isOriginal: true
---

>👨‍🎓**博主简介**
>
>&emsp;&emsp;🏅[CSDN博客专家](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/usersnew/id_1661843828089234)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/profile/7yu26jk3lfqxg)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！
>🐋 希望大家多多支持，我们一起进步！😄
>🎉如果文章对你有帮助的话，欢迎 点赞 👍🏻 评论 💬 收藏 ⭐️ 加关注+💗

---


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202505201616089.jpeg)



## 1. 准备工作 🛠️

* 操作系统：<font color=red>**centos 7**</font>

### 1.1 安装GCC、make编译环境

首先，我们需要确保系统中有GCC、make编译环境。如果没有，可以通过以下命令安装：

```bash
yum -y install gcc gcc-c++ make
```

检查gcc是否安装成功

```bash
gcc -v
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202505200954443.png)

检查make是否安装成功

```bash
make --version
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202505201029823.png)

### 1.2 创建安装目录

一般情况下redis都会安装到`/usr/local/`目录下，所以，我们可以在`/usr/local/`目录下创建一个`redis`目录（其他目录也可以，根据个人情况）

```bash
mkdir -p /usr/local/redis
```



## 2. 下载Redis源码包 📦

* Redis 各版本源码包地址：[http://download.redis.io/releases/](http://download.redis.io/releases/)

* Redis 官方网站：[https://redis.io/download](https://redis.io/download)

可通过上方两个地址来选择自己所需版本来下载源码包，当然第一个链接提供的比较丰富（各版本都有），这里我就在第一个链接中找自己所需版本，这里就下载`6.2.6`版本；

* 可以直接下载上传到服务器上或使用wget命令来下载上传到服务器上（wget需要提前安装命令）；

```bash
cd /usr/local/redis
wget http://download.redis.io/releases/redis-6.2.6.tar.gz
```



## 3. 解压源码包 🗜️

解压源码包

```bash
tar xf redis-6.2.6.tar.gz
```

进入解压目录

```bash
cd redis-6.2.6
```

## 4. 编译Redis源码 🔧

```bash
make
```

## 5. 安装Redis 🛠️

编译成功后，执行以下命令进行安装：

```bash
make PREFIX=/usr/local/redis/redis-6.2.6 install
```

这里执行安装之后会在`/usr/local/redis/redis-6.2.6`目录下多出一个`bin`目录，里面是redis的命令（可执行文件）；

>  也可以直接执行`make install`安装，这样就会自动将bin下的内容安装到`/usr/local/bin/下了`。

## 6. 配置Redis 📝

这里我习惯与将配置、日志、pid、数据，放到一个目录里，所以，这里需要整理一下目录（如下图）；

```bash
mkdir -p /usr/local/redis/redis_6379/{conf,logs,data,pid}
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202505201345762.png)



### 6.1 复制配置文件

将Redis的配置文件 `redis.conf `复制到conf目录：

```bash
cp -ar /usr/local/redis/redis-6.2.6/redis.conf /usr/local/redis/redis_6379/conf
```

### 6.2 修改配置文件

```bash
vim /usr/local/redis/redis.conf
```

#### 6.2.1 修改守护进程模式

将 daemonize 选项设置为 yes，使Redis以守护进程模式运行：

```bash
daemonize yes
```

#### 6.2.2 修改绑定IP地址

将 bind 选项设置为 0.0.0.0，允许远程访问：

```bash
bind 0.0.0.0
```

#### 6.2.3 开启监听端口

```bash
port 6379
```

#### 6.2.4 修改pid存储路径

```bash
pidfile /usr/local/redis/redis_6379/pid/redis_6379.pid
```

#### 6.2.5 修改日志存储路径

```bash
logfile /usr/local/redis/redis_6379/logs/redis_6379.log
```

#### 6.2.6 设置数据库的数量

```bash
databases 16
```

#### 6.2.7 配置本地数据存储路径

```bash
dir  /usr/local/redis/redis_6379/data
```

#### 6.2.8 关闭保护模式

将 protected-mode 选项设置为 no，关闭保护模式：

```bash
protected-mode no
```

#### 6.2.9 设置密码

为了安全起见，可以设置连接密码：

```bash
requirepass your_password
```



---

也可以删除多余的，只写这几个重要的，配置文件内容为：

```bash
#守护进程模式启动 后台启动
daemonize yes

#ip绑定
bind 0.0.0.0

#监听端口
port 6379

#pid文件和log文件 的保存地址
pidfile /usr/local/redis/redis_6379/pid/redis_6379.pid
logfile /usr/local/redis/redis_6379/logs/redis_6379.log

#设置数据库的数量，默认数据库为0
databases 16

#指定本地持久化文件的文件名，默认是dump.rdb
dbfilename redis_6379.rdb
#redis持久化方法
save 60 1        
#1秒钟内有1个操作就写入
save 120 1      
#2秒钟内有1个操作就写入
save 360 3      
#6秒钟内有3个操作就写入

# 关闭保护模式
protected-mode no

#本地数据库的目录
dir  /usr/local/redis/redis_6379/data
requirepass 123123

```

---



## 7. 启动Redis服务 🚀

配置完之后就需要启动redis服务，来验证是否部署成功；

```bash
/usr/local/redis/redis-6.2.6/bin/redis-server /usr/local/redis/redis_6379/conf/redis.conf
```

使用绝对路径来启动，前半部分指的是的redis-server的命令，后半部分是redis的配置文件；

* 检查启动状态，可以使用`ps命令`和`netstat`命令来检查

```bash
# 可以使用ps -ef命令来查看redis进程是否存在
ps -ef | grep redis

# 或可以使用netstat命令来查看端口是否正在运行
netstat -lnt | grep 6379
```

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202505201405741.png#pic_center)



可以看到端口是监听状态，进程也是存在的，代表已经起来了；



## 8. 连接Redis客户端 📡

使用 redis-cli 命令连接Redis客户端：

```bash
/usr/local/redis/redis-6.2.6/bin/redis-cli -h 127.0.0.1 -p 6379 -a you_password
```

连接成功后，可以执行一些简单的命令进行测试：

```bash
set hello world
get hello
```



或在windows上使用redis客户端（`RDM`）来连接测试；



![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202505201427426.png#pic_center)



## 9. Redis 6.0 配置登录用户名密码（redis6.0以上可以配置）

<font color=red>两种方式（配置完需要重启服务生效）：</font>

### 9.1 直接在redis.conf配置文件里添加

```bash
user user1 on >密码 ~* +@all
```

### 9.2 创建一个acl文件，需要在配置文件中指定acl

在redis.conf配置文件里添加：

```bash
aclfile /usr/local/redis/redis_6379/acl/redis.acl
```

创建一个acl目录及acl文件；

```bash
mkdir -p  /usr/local/redis/redis_6379/acl/
touch /usr/local/redis/redis_6379/acl/redis.acl
```

在acl文件中添加用户及配置密码；

```bash
user user1 on >密码 ~* +@all
```

---

解释：

* `user user1`: 创建一个名为 user1 的用户。

* `on`: 启用该用户。
* `密码`: 设置该用户的密码，与前方`>`中间不可有空格，否则会报错。
* `~*`: 表示该用户可以访问所有键。
* `+@all`: 给予该用户所有权限的访问。

---

> 注意：redis.conf配置文件中不能同时存在`user`和`aclfile`，否则会导致服务起不来；



### 9.3 配置多个用户名密码：

```bash
user user1 on >密码1 ~* +@all
user user2 on >密码2 ~* +@all
```



### 9.4 使用用户名密码方式登录redis

```bash
/usr/local/redis/redis-6.2.6/bin/redis-cli -u redis://用户名:密码@服务器地址:redis端口

比如：

/usr/local/redis/redis-6.2.6/bin/redis-cli -u redis://test:test123@127.0.0.1:6379
```

解析：

* `-u`: 使用指定的 URL 连接 Redis。格式为：`redis://用户名:密码@主机:端口`。



## 10. 总结与展望 🌟

> 通过这篇详细的文章，相信你已经学会了如何在Linux下安装和部署Redis。无论是发送简单的键值对还是处理复杂的数据结构，这些知识都能帮助你轻松搞定Redis的使用。如果你还有任何疑问或建议，欢迎在评论区留言交流哦！希望这篇文章能帮助你在Redis的道路上更进一步。🚀✨



