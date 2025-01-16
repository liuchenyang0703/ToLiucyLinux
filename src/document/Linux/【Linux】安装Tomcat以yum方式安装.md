---
title: 【Linux】安装Tomcat以yum方式安装
icon: circle-info
order: 1
category:
  - Linux
tag:
  - Linux
  - Tomcat
  - 运维
pageview: false
date: 2024-12-18
comment: false
breadcrumb: false
---

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181356632.jpeg)



>环境：Centos7.6
>前提：需要yum源
## 1、安装tomcat

在linux下部署java开发的web应用，一般采用Tomact+jre环境（可不需要apache）；
yum安装的不是最新版本，最新版本推荐二进制安装，去官网下载最新的安装包；
```bash
#安装tomcat；没有java安装tomcat默认会自动安装jdk
yum -y install tomcat
```
会安装大量依赖；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181356796.png)


## 2、启动tomcat并设置开机自启

```bash
#启动tomcat
systemctl start tomcat

#设置开机自启
systemctl enable tomcat

#查看tomcat状态
systemctl status tomcat
```
属于运行中；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181356253.png)

## 3、访问页面（失败的情况）
默认端口是8080

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181356420.png)

报错404；这个问题是因为没有安装完整的组件；

### 3.1、问题解决：安装完整组件

```bash
yum -y install tomcat-webapps tomcat-admin-webapps
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181356147.png)

## 4、重启tomcat服务

```bash
systemctl restart tomcat
```

## 5、查看tomcat启动状态

```bash
systemctl status tomcat
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181356200.png)


## 6、页面测试
ip:8080

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412181356282.png)


## 7、Tomcat配置文件详解
### 7.1  Tomcat目录详解
>路径仅限于本文yum安装；

|目录| 说明 |软连接路径|源路径|
|--|--|--|--|
|  bin| 用于存放Tomcat启动或停止等脚本 |/usr/share/tomcat/bin/|/usr/share/tomcat/bin/|
|conf| 用于存放Tomcat相关配置文件|/usr/share/tomcat/conf/|/etc/tomcat/
|lib|Tomcat依赖库目录，包含Tomcat服务器运行环境依赖jar包|/usr/share/tomcat/lib/|/usr/share/java/tomcat/
|logs|Tomcat默认日志存放路径|/usr/share/tomcat/logs/|/var/log/tomcat/
|webapps|Tomcat默认应用部署目录|/usr/share/tomcat/webapps/|/var/lib/tomcat//webapps/
|work|WEB应用JSP代码生成和编译临时目录|/usr/share/tomcat/work/|/var/cache/tomcat/work/
|temp|Tomcat临时数据目录|/usr/share/tomcat/temp/|/var/cache/tomcat/temp/

### 7.2  Tomcat中conf目录中配置文件详解
>本文yum安装的conf路径为：/usr/share/tomcat/conf/

|文件| 说明 |
|--|--|
|Catalina  | 用于存储针对每个虚拟机Context的配置文件 |
|  context.xml|用于定义默认所有WEB应用都要加载的context配置，web自定义优先使用  |
| catalina.properties |Tomcat的环境变量  |
| catalina.policy | 当Tomcat在安全模式下运行，默认使用的安全策略 |
| logging.properties |日志配置文件，级别以及日志文件路径  |
|server.xml  |Tomcat的主配置文件，包括连接器，监听端口，虚拟主机等  |
| tomcat-user.xml |Tomcat默认用户及角色映射信息，Manager模块用该文件定义用户安全认证  |
|web.xml  |所有应用的默认部署描述文件  |




## 相关文章🔅
|相关文章|链接地址  |
|--|--|
|  [【Linux】安装Tomcat以yum方式安装](https://liucy.blog.csdn.net/article/details/127006134)|[https://liucy.blog.csdn.net/article/details/127006134](https://liucy.blog.csdn.net/article/details/127006134)|
|[【Linux】Tomcat简介及二进制安装](https://liucy.blog.csdn.net/article/details/127009222)|[https://liucy.blog.csdn.net/article/details/127009222](https://liucy.blog.csdn.net/article/details/127009222)
|[【Linux】Tomcat优化](https://liucy.blog.csdn.net/article/details/127011859)|[https://liucy.blog.csdn.net/article/details/127011859](https://liucy.blog.csdn.net/article/details/127011859)|


