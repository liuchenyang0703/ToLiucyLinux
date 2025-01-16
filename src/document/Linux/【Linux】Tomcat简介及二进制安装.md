---
title: 【Linux】Tomcat简介及二进制安装
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

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180951125.jpeg)

## 1、Tomcat介绍
&emsp;&emsp;Tomcat是Apache 软件基金会（Apache Software Foundation）中的一个核心项目，由Apache、Sun和其他一些公司及个人共同开发而成，以Apache license许可的方式进行发布。由于有了Sun的参与和支持，最新的Servlet和JSP规范总是能在Tomcat中得到体现。因为Tomcat技术先进、性能稳定，而且免费，因而深受Java爱好者的喜爱并得到了部分软件开发商的认可，成为目前比较流行的Web应用服务器。

&emsp;&emsp;Tomcat服务器是一个免费的开放源代码的Web 应用服务器，属于轻量级应用服务器，在中小型系统和并发访问用户不是很多的场合下被普遍使用，是开发和调试JSP 程序的首选。对于一个初学者来说，可以这样认为，当在一台机器上配置好Apache服务器，可利用它响应HTML页面的访问请求。实际上Tomcat部分是Apache服务器的扩展，但它是独立运行的，所以当你运行tomcat 时，它实际上作为一个与Apache独立的进程单独运行的。

Tomcat官网地址：[https://tomcat.apache.org/](https://tomcat.apache.org/)

## 2、Tomcat的安装

### 2.1 安装JDK环境
>使用我们事先准备好的离线包《jdk1.8》
>
>链接：[https://pan.baidu.com/s/1_JcE1J_M32QRGi35XP6wlg](https://pan.baidu.com/s/1_JcE1J_M32QRGi35XP6wlg)
>提取码：nl6l

部署jdk的方式有很多我们可以选择按照本文的方式来部署，也可按照 [Linux中安装jdk1.8和配置环境变量 ](https://liucy.blog.csdn.net/article/details/123706070?spm=1001.2014.3001.5502)这篇文章来部署；


```bash
#先将jdk离线包放入服务器中
#放入服务器中将jdk1.8解压放到/usr/local/目录下
tar xf jdk-8u221-linux-x64.tar.gz -C /usr/local/

#解压完我们去/usr/local目录看一下
cd /usr/local/

#配置环境变量
vim /etc/profile.d/java.sh

JAVA_HOME=/usr/local/jdk1.8.0_221
CLASSPATH=$JAVA_HOME/lib
PATH=$PATH:$JAVA_HOME/bin
 
#配置完成之后生效配置文件
source /etc/profile

#验证
java -version

java version "1.8.0_221"
Java(TM) SE Runtime Environment (build 1.8.0_221-b11)
Java HotSpot(TM) 64-Bit Server VM (build 25.221-b11, mixed mode)
```
### 2.2 部署Tomcat
#### 2.2.1 下载安装包
首先我们先下载安装包；
>这里我们用tomcat10版本来安装
Tomcat官网：[https://tomcat.apache.org/](https://tomcat.apache.org/)

进入官网-->选择右侧的Tomcat 10

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180951479.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180951941.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180950809.png)

#### 2.2.2 部署Tomcat
下载完成之后上传至服务器；

```bash
#将下载好的安装包上传到服务器中；
#解压安装包
tar xf apache-tomcat-10.0.23.tar.gz

#将解压的目录移动到/usr/local/目录下并改名为tomcat
mv apache-tomcat-10.0.23 /usr/local/tomcat

#启动tomcat
/usr/local/tomcat/bin/startup.sh
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180950621.png)
#### 2.2.3 web页面访问
启动完成，访问地址测试：ip:8080
<font color=red>默认端口为8080</font>

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412180950256.png)

可以访问到，完成部署；

#### 2.2.4 二进制安装tomcat相关命令

```bash
#启动tomcat
/usr/local/tomcat/bin/startup.sh

#关闭tomcat
/usr/local/tomcat/bin/shutdown.sh

#查看tomcat版本与jdk、内核版本
/usr/local/tomcat/bin/version.sh
```

### 2.3 Tomcat配置文件详解
#### 2.3.1 Tomcat目录详解
>路径仅限于本文二进制安装；

|目录| 说明 |路径|
|--|--|--|
|  bin| 用于存放Tomcat启动或停止等脚本 |/usr/local/tomcat/bin/|
|conf| 用于存放Tomcat相关配置文件| /usr/local/tomcat/conf/|
|lib|Tomcat依赖库目录，包含Tomcat服务器运行环境依赖jar包|/usr/local/tomcat/lib/|
|logs|Tomcat默认日志存放路径|/usr/local/tomcat/logs/|
|webapps|Tomcat默认应用部署目录|/usr/local/tomcat/webapps/|
|work|WEB应用JSP代码生成和编译临时目录|/usr/local/tomcat/work/|
|temp|Tomcat临时数据目录|/usr/local/tomcat/temp/|

#### 2.3.2 Tomcat中conf目录中配置文件详解
>本文二进制安装的conf路径为：/usr/local/tomcat/conf/

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
|[Linux中安装jdk1.8和配置环境变量](https://liucy.blog.csdn.net/article/details/123706070?spm=1001.2014.3001.5502)|[https://liucy.blog.csdn.net/article/details/123706070?spm=1001.2014.3001.5502](https://liucy.blog.csdn.net/article/details/123706070?spm=1001.2014.3001.5502)

