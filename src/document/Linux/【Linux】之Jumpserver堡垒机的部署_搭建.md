---
title: 【Linux】之Jumpserver堡垒机的部署_搭建
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

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181629630.jpeg)


## Jumpserver 概述
- Jumpserver 是一款使用 Python, Django 开发的开源跳板机系统, 为互联网企业提供了认证，授权，审计，自动化运维等功能。JumpServer 现已支持管理 SSH、 Telnet、 RDP、 VNC 协议资产
> 功能：
> 1.  精确记录操作命令
> 2.  支持批量文件上传下载
>3.  支持主机搜索登录
>4.  支持批量命令执行(Ansible完成)
>5.   支持WebTerminal连接主机
>6.  支持Web端批量命令执行
>7.  支持录像回放
>8.  支持硬件信息如cpu,内存等抓取
>9.  支持资产Excel导入导出
>10. 支持资产批量更改
>11. 支持系统用户的批量推送(Ansible实现)
>12. 支持用户，主机，用户组，主机组，系统用户混合细颗粒授权
>13. 支持sudo管理
>14. 支持命令统计和命令搜索
>15. 支持上传下载文件审计
>16. 支持终止用户连接
>17. 支持各种搜索
>18. 其他

- Jumpserver 后端主要技术是LDAP，配置了LDAP 集中认证服务器， 所有服务器的认证都是由ldap完成的。其做法是：每个用户一个密码，把密码加密放到了数据库中，当用户输入IP 从跳板机登陆服务器的时候，跳板机系统取出密码，并解密，通过pexpect 模块将密码发送过去，来完成登录。

- （LDAP是轻量目录访问协议，英文全称是Lightweight Directory Access Protocol，一般都简称为LDAP。它是基于X.500标准的，但是简单多了并且可以根据需要定制。与X.500不同，LDAP支持TCP/IP，这对访问Internet是必须的。LDAP的核心规范在RFC中都有定义，所有与LDAP相关的RFC都可以在LDAPman RFC网页中找到。）

> <font color=red>特色优势:</font>
>- 开源：零门槛，线上快速获取和安装；
>- 分布式：轻松支持大规模并发访问；
>- 无插件：仅需浏览器，极致的 Web Terminal 使用体验；
>- 多云支持：一套系统，同时管理不同云上面的资产；
>- 云端存储：审计录像云端存储，永不丢失；
>- 多租户：一套系统，多个子公司和部门同时使用；
>- 多应用支持：数据库，Windows远程应用，Kubernetes。

- 官方网址：[https://www.jumpserver.org/](https://www.jumpserver.org/)
- JumpServer官网文档：[https://docs.jumpserver.org/zh/master/](https://docs.jumpserver.org/zh/master/)
- github 项目网址：[https://github.com/jumpserver/jumpserver/releases](https://github.com/jumpserver/jumpserver/releases)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181629614.png)
	
### 环境需求
- 首先准备一台 4核8G （最低）且可以访问互联网的 64 位 Linux 主机；
- 其次就是部署需要root用户，最好使用新环境来部署，因为会有不是新的环境会有冲突的情况，所以建议使用新环境来部署；
- 关闭 iptables，关闭 selinux ；
- 需要wget git curl....几个命令；
```bash
yum -y install wget git curl
```
首先具备这几个条件，完了就是安装部署。

### 在线部署Jump server	

&emsp;&emsp;部署方式有很多种：<font color=red>有在线部署，也有离线部署；</font><font color=green>也有在linux中部署、在Windows中部署、在macOS中部署的；</font><font color=okuewklasfnnldsalfaflaflaejfoqirq>也有手动部署、一键部署、源码部署、Helm部署、Allinone部署；</font>看自己选哪个，其他部署文档可参考官网：[Jumpserver官网部署文档](https://docs.jumpserver.org/zh/master/install/setup_by_fast/)
这里我们选择一键部署就可以，脚本可以直接拉取官网的；

<font size=4>**拉取官网脚本并且执行安装操作：**</font>

```bash
curl -sSL https://github.com/jumpserver/jumpserver/releases/download/v2.25.1/quick_start.sh | bash
```
中途有的地方需要自己确认，会问你选择默认还是其他，不输入则自动选择默认；
<font color=teal>配置文件位置: /opt/jumpserver/config/config.txt</font>



**脚本安装步骤：**

 1. 检查配置文件
 2. 安装docker和docker-compose
 3. 配置dokcer
 4. 启动docker并设置开机自启
 5. 加载docker镜像（去拉取镜像redis、mariadb、web、core、koko、lion、magnus）
 6. 安装Jumpserver
 6.1、配置加密密钥
 6.2、配置持久化目录
 6.3、配置 MySQL
 6.4、配置 Redis	
 6.5、配置对外端口
 6.6、初始化数据库

 7.安装完成（以及相关信息）


页面访问：http://ip:80
初始账号密码：admin admin

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181629399.png)

进入页面之后可查看<font color=red>**页面访问操作**</font>操作

**<font size=5>jumpserver的命令及解析</font>**

```bash
cd /opt/jumpserver-installer-v2.25.1

# 安装Jump server
./jmsctl.sh install

# 升级Jump server
./jmsctl.sh upgrade [version]

# 监测当前版本号
./jmsctl.sh check_update

# 启动Jump server
./jmsctl.sh start

# 停止Jump server
./jmsctl.sh stop

#关闭Jump server
./jmsctl.sh close

#重启Jump server
./jmsctl.sh restart

#检查Jump server的运行状态
./jmsctl.sh status

# 卸载Jump server
./jmsctl.sh uninstall

# 帮助（查看命令参数详情）
./jmsctl.sh -h
```


### 离线部署Jump server
从飞致云社区 [下载最新的 linux/amd64 离线包](https://community.fit2cloud.com/#/products/jumpserver/downloads), 并上传到部署服务器的 /opt 目录；离线包大概（1.5G）。

注意：下载时需要注册、登录一下
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181629524.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181628412.png)

```bash
#将下载的包传到/opt目录
mv jumpserver-offline-installer-v2.25.2-amd64-67.tar.gz /opt/

#切换到/opt目录
cd /opt

#解压jumpserver压缩包
tar -xf jumpserver-offline-installer-v2.25.2-amd64-67.tar.gz

#重命名jumpserver-offline-installer-v2.25.2-amd64-67为jumpserver
mv jumpserver-offline-installer-v2.25.2-amd64-67 jumpserver

#进入jumpserver的目录
cd /opt/jumpserver
```

```bash
# 根据需要修改配置文件模板, 如果不清楚用途可以跳过修改
cat config-example.txt
```

```bash
# 以下设置如果为空系统会自动生成随机字符串填入
## 迁移请修改 SECRET_KEY 和 BOOTSTRAP_TOKEN 为原来的设置
## 完整参数文档 https://docs.jumpserver.org/zh/master/admin-guide/env/

## 配置 Docker 镜像加速, 不同的架构请参考安装文档
# DOCKER_IMAGE_PREFIX=

## 安装配置
VOLUME_DIR=/opt/jumpserver
DOCKER_DIR=/var/lib/docker
SECRET_KEY=
BOOTSTRAP_TOKEN=
LOG_LEVEL=ERROR

##  MySQL 配置, USE_EXTERNAL_MYSQL=1 表示使用外置数据库, 请输入正确的 MySQL 信息
USE_EXTERNAL_MYSQL=0
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=jumpserver

##  Redis 配置, USE_EXTERNAL_REDIS=1 表示使用外置数据库, 请输入正确的 Redis 信息
USE_EXTERNAL_REDIS=0
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=

## Compose 项目设置, 如果 192.168.250.0/24 网段与你现有网段冲突, 请修改然后重启 JumpServer
COMPOSE_PROJECT_NAME=jms
COMPOSE_HTTP_TIMEOUT=3600
DOCKER_CLIENT_TIMEOUT=3600
DOCKER_SUBNET=192.168.250.0/24

## IPV6 设置, 容器是否开启 ipv6 nat, USE_IPV6=1 表示开启, 为 0 的情况下 DOCKER_SUBNET_IPV6 定义不生效
USE_IPV6=0
DOCKER_SUBNET_IPV6=fc00:1010:1111:200::/64

## 访问配置
HTTP_PORT=80
SSH_PORT=2222
MAGNUS_MYSQL_PORT=33060
MAGNUS_MARIADB_PORT=33061

## HTTPS 配置, 参考 https://docs.jumpserver.org/zh/master/admin-guide/proxy/ 配置
# USE_LB=1
# HTTPS_PORT=443
# SERVER_NAME=your_domain_name
# SSL_CERTIFICATE=your_cert
# SSL_CERTIFICATE_KEY=your_cert_key

## Nginx 文件上传大小
CLIENT_MAX_BODY_SIZE=4096m

## Task 配置, 是否启动 jms_celery 容器, 单节点必须开启
USE_TASK=1

## XPack, USE_XPACK=1 表示开启, 开源版本设置无效
USE_XPACK=0
RDP_PORT=3389
MAGNUS_POSTGRE_PORT=54320
TCP_SEND_BUFFER_BYTES=4194304
TCP_RECV_BUFFER_BYTES=6291456

# Core 配置, Session 定义, SESSION_COOKIE_AGE 表示闲置多少秒后 session 过期, SESSION_EXPIRE_AT_BROWSER_CLOSE=True 表示关闭浏览器即 session 过期
# SESSION_COOKIE_AGE=86400
SESSION_EXPIRE_AT_BROWSER_CLOSE=True

# Koko Lion XRDP 组件配置
CORE_HOST=http://core:8080
JUMPSERVER_ENABLE_FONT_SMOOTHING=True

## 终端使用宿主 HOSTNAME 标识
SERVER_HOSTNAME=${HOSTNAME}

# 额外的配置
CURRENT_VERSION=
```

安装jumpserver，安装时需要手动给路径问你是选择默认呢还是什么，默认的话可以直接回车就好；唯一一点好的是比在线安装快，因为在线安装需要拉取镜像特别慢，这个只需要下载<font color=red>”jumpserver-offline-installer-v2.25.2-amd64-67.tar.gz“</font>离线包即可；

```bash
# 安装
./jmsctl.sh install

# 启动
./jmsctl.sh start
```
安装完成，启动完成之后，页面访问：ip地址就行，因为默认端口是80；

安装完成之后会给你说：
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181628050.png)

默认账号密码是admin admin

进入页面之后可查看<font color=red>**页面访问操作**</font>操作

<font color=teal>配置文件位置: /opt/jumpserver/config/config.txt</font>

<font size=5>**jumpserver的命令及解析**</font>
```bash
#进入jumpserver的目录
cd /opt/jumpserver

# 安装Jump server
./jmsctl.sh install

# 升级Jump server
./jmsctl.sh upgrade [version]

# 监测当前版本号
./jmsctl.sh check_update

# 启动Jump server
./jmsctl.sh start

# 停止Jump server
./jmsctl.sh stop

#关闭Jump server
./jmsctl.sh close

#重启Jump server
./jmsctl.sh restart

#检查Jump server的运行状态
./jmsctl.sh status

# 卸载Jump server
./jmsctl.sh uninstall

# 帮助（查看命令参数详情）
./jmsctl.sh -h
```

### 页面访问操作
页面访问：http://ip:80

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181628024.png)

默认账号密码是admin admin；第一次登录需要修改一下密码；可根据自己的情况来定密码；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181628913.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181628543.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181628476.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181628620.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181628054.png)


到这就完成了安装，相关文章请看下方！

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181628875.gif)


## 相关文章
|文章名|文章地址|
|--|--|
| [【Linux】之Jumpserver堡垒机的部署/搭建](https://liucy.blog.csdn.net/article/details/126538846) |  [https://liucy.blog.csdn.net/article/details/126538846](https://liucy.blog.csdn.net/article/details/126538846)|
|[【Linux】之Jumpserver堡垒机添加linux主机资产](https://liucy.blog.csdn.net/article/details/126539267)|[https://liucy.blog.csdn.net/article/details/126539267](https://liucy.blog.csdn.net/article/details/126539267)  |
|[【Linux】之Jumpserver堡垒机添加Windows主机资产](https://liucy.blog.csdn.net/article/details/126542303)|[https://liucy.blog.csdn.net/article/details/126542303](https://liucy.blog.csdn.net/article/details/126542303)|
