---
title: 【Linux】基于 Jenkins 自动打包并部署 Tomcat 环境_docker环境_PHP环境
icon: circle-info
order: 1
category:
  - Linux
  - Jenkins
  - 自动化运维
tag:
  - Linux
  - Jenkins
  - 自动化运维
  - 运维
pageview: false
date: 2024-12-24
comment: false
breadcrumb: false
---

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/c0aa11fd101543d0a17ef264c0609468.jpeg)

>🍁**博主简介**
>&emsp;&emsp;🏅[云计算领域优质创作者](https://blog.csdn.net/liu_chen_yang?type=blog)
>&emsp;&emsp;🏅[华为云开发者社区专家博主](https://bbs.huaweicloud.com/community/myblog)
>&emsp;&emsp;🏅[阿里云开发者社区专家博主](https://developer.aliyun.com/my?spm=a2c6h.13148508.setting.3.21fc4f0eCmz1v3#/article?_k=zooqoz)
>💊**交流社区：**[运维交流社区](https://bbs.csdn.net/forums/lcy) 欢迎大家的加入！

---



## jenkins的基本配置

### 1、修改 jenkins 初始密码
1  点击Jenkins的管理
2  进入用户
3  设置修改密码

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/31df0c79e09f4d9aa2c3f8453f237b60.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/1014ef8d72a149bf813b1335b1540e74.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/180c0f1b574343baa0097d0a05520664.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/089bf009eb8a48d08e4f89458685ac1c.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/3f52f0f56e2b4cca90a33d4d6ec77762.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/f12898c529a548f48c326a701d2b1bdc.png)
### 2、安装 Jenkins 必要插件

在 Jenkins 首页中，点击左侧的 Manage Jenkins>>Manage Plugins>>可选插件，在过滤搜 索框中输入要安装的 <font color=red>Publish Over SSH</font> 、  <font color=red>Maven Integration</font> 插件，并勾中其左侧的复 选框，点击“直接安装”即可开始插件安装操作。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/c31abbbda15f4b1295bb326ff9c220e8.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/38d4ddbcd3ef4eb49b5de8dae87ccf14.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/4346fbf977a54640b40865794391f933.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/1d3c7745bc8f46c081bbc016daa4321b.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/18eb45bda8ec4fc2b45e575e18a9875b.png)
### 3、配置 jenkins 并发执行数量
用于提高提高执行效率
<font color=red>Manage Jenkins</font> >> <font color=red>Configure System</font> >> <font color=red>Maven 项目配置</font>

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/1268310994bc41c49751155aad084ad4.png)

并发执行者数量  如果构建任务数量多的时候,我们可以在同一时间内构建多个；
默认是2个

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/bc31c6fcb70a47b4a5af3b95ac2ecd8f.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/0536f9383e9943fb831f4268e23300f8.png)
### 4、配置邮件地址
在测试完成后，主动发邮件告知测试情况
<font color=red>Manage Jenkins</font> >> <font color=red>Configure System</font> >> <font color=red>Jenkins Location</font>

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/ca9de6d6a8804980a4d2e38556d88705.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/e2d16418a1f14ca3a8988f355dc7e81c.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/c60e8c9508b64ea09da14785f0a25574.png)
## 基于 Jenkins 自动打包并部署 Tomcat 环境
### 传统网站部署的流程
>&emsp;&emsp;在运维过程中，网站部署是运维的工作之一。传统的网站部署的流程大致分为:需求分析-->原型设计-->开发代码-->提交代码-->内网部署-->内网测试-->确认上线-->备份数据-->外网更新-->外网测试-->发布完成。如果在内网测试时发现代码有异常，返回代码开发人员名字,调整代码；如果在外网测试时发现外网部署的代码有异常，可以及时进行网站回滚。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/0e1de9e7a3f3449ea51afebec2c01efa.png)


![img](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/c9acdc7b28b1472eb27e3ee224475e1e.png)


<font color=teal>**传统代码上线的过程**</font>
>&emsp;&emsp;开发人员发起代码上线的需求（邮件附件中包含开发做好的 WAR 或者 JAR 包、SQL 文件）-->运维人员连接线上负载调度器（Nginx）--> 隔离一组服务器（Tomcat）--> 连接服务器（Tomcat）--> 备份旧代码（tar 打包）--> 删除旧代码目录 --> 上传新的 WAR 包 --> 外网测试 --> 测试不通过则通过备份回滚代码 --> 测试通过则利用 rsync 的脚本推送代码到其他服务器--> 统一外网测试 -->连接调度器恢复隔离机制 --> 隔离另一组服务器实施上线步骤 --> 上线完成。

### 主流网站部署的流程
>&emsp;&emsp;目前主流网站部署方法：通过 Hudson/Jenkins 工具平台实现全自动部署+测试，是一个可扩展的持续集成引擎，属于开源软件项目，旨在提供一个开放易用的软件平台，使软件的持续集成变成可能。Jenkins 非常易于安装和配置，简单易用。
>
>- 开发人员：写好代码，不需要自己进行源码编译、打包等工作，直接将代码分支存放在SVN、Git 仓库即可。
>-  运维人员：减轻人工干预的错误率，同时解放运维人员繁杂的上传代码、手动备份、更新等操作。
>-  测试人员：可以通过 Jenkins 进行简单的代码及网站测试。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/a6d999bd9fb647b4aadf67092587c348.png)

&emsp;&emsp;代码仓库中有Jenkins可直接进行打包和部署不需要开发人员进行打包,只要选择分支上的代码需要上线,会自动打包和构建.部署在内网测试的测试结果也会反馈给开发。

## Jenkins工作原理及实验准备

>&emsp;&emsp;Jenkins 的工作原理是先将源代码从 SVN/Git 版本控制系统中拷贝一份到本地，然后根据设置的脚本调用 Maven 进行 build（构建）。整个系统的关键就是 build 脚本，build脚本告诉 Jenkins 在一次集成中需要执行的任务。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/f55e3534b05d4bcc807c4199587fc0e1.png)


1、开发人员写代码 将代码往服务器上推送 
2、Jenkins负责从Git服务器里面拉取开发人员提交的代码
3、Jenkins拉取代码之后会对代码进行一个构建,服务器上构建后直接部署在web上
4、而我们用户需要做的事情就是访问web,对其进行一个测试


首先准备三台服务器
| 操作系统 | IP地址 |主机名 |参与角色 |
|--|--|--|--|
|CentOS7.7  | 172.16.11.203 |git |git服务器 |
| CentOS7.7 | 172.16.11.202 | jenkins| jenkins服务器|
| CentOS7.7 | 172.16.11.204 |tomcat | tomcat服务器|

其次关闭防火墙和沙盒

```bash
#关闭防火墙
systemctl stop firewalld
iptables -F
#关闭沙盒
setenforce 0
```

### 1、配置 git 主机
安装 git 并配置 git 用户信息

```bash
#安装git
[root@git ~]# yum -y install git

#添加git用户
[root@git ~]# useradd git

#git设置密码
[root@git ~]# echo "123456" | passwd --stdin git
```

创建本地仓库 probe

```bash
#切换到git用户
[root@git ~]# su - git
上一次登录：五 10 月 21 15:49:10 CST 2022pts/0 上

#创建probe.git目录
[git@git ~]$ mkdir probe.git

#切换到probe.git目录
[git@git ~]$ cd probe.git

#初始化空的 Git 版本库于 /home/git/probe.git/
[git@git probe.git]$ git --bare init

#退出git用户
[git@git probe.git]$ exit
```
克隆项目代码同步到自己创建的仓库中

```bash
[root@git ~]# git clone https://github.com/psi-probe/psi-probe
[root@git ~]# git clone git@172.16.11.203:/home/git/probe.git
[root@git ~]# cp -rf psi-probe/* probe/
[root@git ~]# cd probe/
[root@git probe]# git add . 

#新安装的git要配置相关信息
[root@git probe]# git config --global user.email "admin@163.com"
[root@git probe]# git config --global user.name "admin"
[root@git probe]# git commit -m "all probe"
[root@git probe]# git push origin master
```

### 2、配置 jenkins 主机
① 给Jenkins添加验证凭据
在 Jenkins 的首页中点击“<font color=red>凭据</font>”进入凭据页面；
注：有是版本不一样，位置不一样，根据自己的实际版本来定；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/b5501484432b4864a546a22c05239733.png)

在凭据页面中，点击“Jenkins”跳转到“系统”页面。点击左侧导航栏中“添加域”，跳转到“添加域”页面。在该页面创建域名为“crushlinux”并点击“ok”完成配置。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/0ceb65ac9724444386fefb2645e5d758.png)
在添加域里面添加的用户名的密码是web服务器的
Jenkins要往web服务器上面去部署,所以Jenkins要有权限去远程连接web服务器

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/4b8a3964fa7247fab871e3d91296d02c.png)

点击左侧导航栏中的“添加凭据”。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/07a62894b8934b61b6afc09446839d2a.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/467bea9c13154a58966118bec6e302af.png)

填写以上数据后，点击“确定”就可以查看到新增的远程 web 主机账号。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/a8e353a8c076438f91afa937451d525a.png)
② 添加 Publish Over SSH 远程主机
在主机名为 <font color=red>web</font> 的主机上上创建远程目录。

```bash
#目录的作用jenkins就是判断目录是否存在
[root@tomcat ~]# mkdir /data
```
>&emsp;&emsp;在 Jenkins 首页中点击“Manage Jenkins”->“Configure System”-“Publish overSSH”->“SSH Servers”->“增加”选项按钮，添加 SSH 远程主机。如图 3.13 所示，输入 Name、Hostname、Username 等必要信息后，点击“高级”选项按钮->勾选“Use Passwordauthentication,or use a different key”选项->输入“远程主机登录密码”->“TestConfiguration”测试远程主机配置。测试远程主机配置成功后点击“保存”按钮即可。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/ffc515317d4b40c2bcaa887f6970f932.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/5049adc621bd45319bcd3ff09b4f4cd1.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/b09ad61c7a984e0db8455aee1d25dd58.png)

③ 配置 Maven、JDK、Git 环境
Jenkins需要构建任务还要去配置Maven JDK Git 集成的工具
>&emsp;&emsp;在 Jenkins 首页中点击“Manage Jenkins”->“Global Tool Configuration”->“JDK”->新增“JDK”，设置 JDK 别名为”JDK1.8”。去掉“Install automatically”选项，设置 “JAVA_HOME”为本案例中 JDK 实际安装路径。

```bash
[root@jenkins ~]# tar xf jdk-8u191-linux-x64.tar.gz
[root@jenkins ~]# mv jdk1.8.0_191/ /usr/local/java
[root@jenkins ~]# vim /etc/profile
export JAVA_HOME=/usr/local/java/
export CLASSPATH=$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar
export PATH=$JAVA_HOME/bin:$PATH
[root@jenkins ~]# rm -rf /usr/bin/java
[root@jenkins ~]# source /etc/profile
[root@jenkins ~]# java -version
java version "1.8.0_191"
Java(TM) SE Runtime Environment (build 1.8.0_191-b12)
Java HotSpot(TM) 64-Bit Server VM (build 25.191-b12, mixed mode)
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/b6a627195fd14c9dbf4b1ff2eafcea3e.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/9fbcfb59dc5a42bfb4f7ff05582a3e0a.png)

&emsp;&emsp;在“Global Tool Configuration”配置界面中找到 Maven 配置选项，然后点击“新增Maven”并设置别名为“Maven3.5”。

```bash
[root@jenkins ~]# tar xf apache-maven-3.5.0-bin.tar.gz
[root@jenkins ~]# mv apache-maven-3.5.0 /usr/local/maven-3.5.0
```
为 maven 更换阿里云镜像站

在进行打包的时候Maven会下载很多的jar包默认的下载的地址是apache官网地址  会下载很慢更改Maven的下载地址
```bash
[root@jenkins ~]# vim /usr/local/maven-3.5.0/conf/settings.xml
	<mirror>
		<id>nexus-aliyun</id>
		<mirrorOf>central</mirrorOf>
		<name>Nexus aliyun</name>
		<url>http://maven.aliyun.com/nexus/content/groups/public</url>
	</mirror>
```
之后可能会报错，可以使用先使用apache官网下载地质下载jar包

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/310a8292ff074fb4834db827c7697074.png)
Git 配置

```bash
[root@jenkins ~]# which git
/usr/bin/git
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/dfae6c3f292f4c9e83f973a179a829bf.png)


以上全局基本配置完毕后，点击保存即可完成。




### 3、配置 web 主机
部署web   部署一个Java的项目所以要部署tomcat

```bash
[root@tomcat ~]# tar xf apache-tomcat-8.5.16.tar.gz
[root@tomcat ~]# tar xf jdk-8u191-linux-x64.tar.gz
[root@tomcat ~]# mv jdk1.8.0_191/ /usr/local/java
[root@tomcat ~]# mv apache-tomcat-8.5.16 /usr/local/tomcat
[root@tomcat ~]# vim /etc/profile
export JAVA_HOME=/usr/local/java/
export CLASSPATH=$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar
export PATH=$JAVA_HOME/bin:$PATH
[root@tomcat ~]# source /etc/profile
[root@tomcat ~]# java -version
java version "1.8.0_191"
Java(TM) SE Runtime Environment (build 1.8.0_191-b12)
Java HotSpot(TM) 64-Bit Server VM (build 25.191-b12, mixed mode)
```
发布公钥给 jenkins 主机

```bash
[root@tomcat ~]# ssh-keygen
[root@tomcat ~]# ssh-copy-id 172.16.11.202
```
web主机将公钥发送给Jenkins
### 4、新建 Maven 项目

&emsp;&emsp;在以上配置完成后，回到 Jenkins 首页，选择“新建任务”，然后输入一个任务名称“probe”，并选中“Maven project”点击当前页面下方的“确定”按钮。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/ba446e99d12640dbaf94928c504982b0.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/a2086736504c46de9f5bd13d6b1e05aa.png)

在点击“确定”按钮后，选择“源码管理”选中“Git”,配置“RepositoriesURL”为git@172.16.11.203:/home/git/probe.g

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/9531bf1d66204f0f848f829e515c5298.png)

主机 Jenkins 默认用 jenkins 用户去连接 git，所以用 jenkins 用户生成密钥对，并发送给 git。

```bash
[root@jenkins ~]# id jenkins
uid=988(jenkins) gid=982(jenkins) 组=982(jenkins)
[root@jenkins ~]# su -s /bin/bash jenkins
bash-4.2$ ssh-keygen
bash-4.2$ ssh-copy-id git@172.16.11.203
```
Jenkins将公钥文件发送给git用户；我们要注意的是Jenkins运行是一个程序用户，无法登录的我们要-s 指定/bin/bash 将秘钥对发送给指定的git 用户；

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/fe51e67d200c42e3ae7f44f60f9b63d0.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/a7693fd32be842e182ec0aaf3a59be3d.png)

选择“构建后操作“中的“send build artfacts over SSH” “Exec command”中执行命令的含义是:在自动部署前先杀掉 Tomcat 进程，然后删除 war 包，用 scp 远程拷贝命令将Jenkins 自动打包好的项目 war 包拷贝到当前 Tomcat 应用目录。 然后重启 Tomcat 。

```bash
scp 172.16.11.202:/var/lib/jenkins/workspace/probe/psi-probe-web/target/probe.war
/usr/local/tomcat/webapps/
/usr/local/tomcat/bin/startup.sh
```
将Jenkins的war包推送到tomcat的webapps目录下自动解压

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/1e064921f15547118cd6beefdbf1bbd4.png)

&emsp;&emsp;以上全部配置完成后，点击保存即可。然后点击刚才创建的“probe”->“Build Now”直至项目构建完成。构建过程可以在“控制台输出”中查看到。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/cc0ff45a0cba4c3fa6ac1bc0aa93a84f.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/c97a4bda21064866932f00524253c3b6.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/1577f744013b40b6a572524cb3077545.png)



### 5、验证 Jenkins 自动打包部署结果
在 web 主机上查看 probe 目录是否被拷贝到/usr/local/tomcat/webapps 目录下

 

```bash
[root@tomcat ~]# ls /usr/local/tomcat/webapps/
docs examples host-manager manager probe probe.war ROOT
[root@tomcat ~]# ls /usr/local/tomcat/webapps/probe -l
总用量 20
drwxr-x--- 3 root root 66 6 月 20 12:12 css
drwxr-x--- 2 root root 8192 6 月 20 12:12 flags
-rw-r----- 1 root root 536 6 月 20 09:55 index.jsp
drwxr-x--- 3 root root 148 6 月 20 12:12 js
drwxr-x--- 3 root root 76 6 月 20 12:12 META-INF
drwxr-x--- 6 root root 4096 6 月 20 12:12 WEB-INF
从以上结果来看，Jenkins 已把打好的 probe war 包拷贝过来了。
```
从构建后的执行命令可以看出，Tomcat 已经重新启动，通过浏览器访问测试 probe 监控系统。http://172.16.11.204:8080/probe。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/48bfabbd45b9427699338c1b235d0214.png)

```bash
[root@tomcat ~]# vim /usr/local/tomcat/conf/tomcat-users.xml
<role rolename="manager-gui"/>
<role rolename="admin-gui"/>
<user username="tomcat" password="tomcat" roles="manager-gui,admin-gui"/>
</tomcat-users> # 在此行前加入上面三行
```

```bash
[root@tomcat ~]# vim /usr/local/tomcat/webapps/manager/META-INF/context.xml
<!-- <Valve className="org.apache.catalina.valves.RemoteAddrValve" allow="127\.\d+\.\d+\.\d+|::1|0:0:0:0:0:0:0:1" /> -->
[root@tomcat ~]# /usr/local/tomcat/bin/shutdown.sh
[root@tomcat ~]# /usr/local/tomcat/bin/startup.sh
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/9bc10a1d18b442a8a758d6b9828daf40.png)

至此，Jenkins 自动打包部署完毕。

## 基于 Jenkins 自动打包并部署 docker 环境
### 1、安装 docker-ce	

在 172.16.11.204机器上，构建 tomcat 基础镜像。在构建基础镜像之前需要先安装 Docker与 JDK。

```bash
[root@docker ~]# wget -O /etc/yum.repos.d/CentOS-Base.repo
http://mirrors.aliyun.com/repo/Centos-7.repo
[root@docker ~]# yum -y install yum-utils device-mapper-persistent-data lvm2
[root@docker ~]# yum-config-manager --add-repo
http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
[root@docker ~]# ls /etc/yum.repos.d/
backup CentOS-Base.repo CentOS-Media.repo docker-ce.repo

[root@docker ~]# yum -y install docker-ce
[root@docker ~]# systemctl start docker
[root@docker ~]# systemctl enable docker
[root@docker ~]# docker version
Client:
Version: 18.09.6
API version: 1.39
Go version: go1.10.8
Git commit: 481bc77156
Built: Sat May 4 02:34:58 2019
OS/Arch: linux/amd64
Experimental: false
Server: Docker Engine - Community
Engine:
Version: 18.09.6
API version: 1.39 (minimum version 1.12)
Go version: go1.10.8
Git commit: 481bc77
Built: Sat May 4 02:02:43 2019
OS/Arch: linux/amd64
Experimental: false/
```

### 2、阿里云镜像加速器

```bash
[root@docker ~]# cat << END > /etc/docker/daemon.json
{ "registry-mirrors":[ "https://nyakyfun.mirror.aliyuncs.com" ]
}
END
[root@docker ~]# systemctl daemon-reload
[root@docker ~]# systemctl restart docker
[root@docker ~]# cat centos-7-x86_64.tar.gz | docker import - centos:7
sha256:58584b57ef9c5545816baaf39dd089d04c671c9faa1414e85fa245b167416603
[root@docker ~]# docker images
REPOSITORY TAG IMAGE ID CREATED
SIZE
centos 7 58584b57ef9c 11 seconds ago
589MB
```

### 3、构建 tomcat 基础镜像

```bash
[root@docker ~]# mkdir docker-tomcat
[root@docker ~]# cd docker-tomcat
[root@docker docker-tomcat]# ls
apache-tomcat-8.5.16.tar.gz jdk-8u191-linux-x64.tar.gz
[root@docker docker-tomcat]# cat Dockerfile
FROM centos:7
MAINTAINER from crushlinux <crushlinux@163.com>
#copy jdk and tomcat into image
ADD ./apache-tomcat-8.5.16.tar.gz /usr/local/
ADD ./jdk-8u191-linux-x64.tar.gz /usr/local
#set variable
ENV JAVA_HOME /usr/local/jdk1.8.0_191
ENV PATH $JAVA_HOME/bin:$PATH
#container starts up
ENTRYPOINT /usr/local/apache-tomcat-8.5.16/bin/startup.sh && tail -F
/usr/local/apache-tomcat-8.5.16/logs/catalina.out
[root@docker docker-tomcat]# docker build -t tomcat:v1 . [root@docker docker-tomcat]# docker images
REPOSITORY TAG IMAGE ID CREATED
SIZE
tomcat v1 1f25cb55c54b 23 seconds ago
999MB
centos 7 58584b57ef9c 8 minutes ago
589MB
```

### 4、构建一个 Maven 项目
在以上配置完成后，回到 Jenkins 首页，选择“新建任务”，然后输入一个任务名称“probe-docker”，并选择“Maven project”配置项，点击当前页面下方的“确定”按钮。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/ff31479639bc4487a164c97bd147c9de.png)

在点击“确定”按钮，选择“源码管理”并选中“Git”,设置“Repository URL”地址。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/d9de0fe87e814d16b8632b1a41575683.png)


选择“Build”-> clean package -Dmaven.test.skip=true

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/87414ec4de184fb694c46dc2b9541de3.png)

在上一步后面选择“构建后操作”中的“Send build artfacts over SSH”选项并进行。

```bash
scp 172.16.11.202: /var/lib/jenkins/workspace/probe/psi-probe-web/target/probe.war /data/
docker run -itd --name tomcat-test -p 8090:8080 -v /data:/usr/local/apache-tomcat-8.5.16/webapps tomcat:v1
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/898a8efe06b948f0b81711f9aca80d3c.png)

&emsp;&emsp;以上全部配置完成后，点击保存即可。然后点击刚才创建的工程任务“probe-docker “->” Build new”直至任务构建完成。开始构建过程中可以点击进度条查看

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/ac1649f7f969422f92b76e35770f9df2.png)

&emsp;&emsp;可以看到此工程任务已构建成功，并且在构建后，创建用于 docker 项目的 Docker Web环境命令也执行成功。

```bash
[root@tomcat ~]# ls /data/
probe probe.war
[root@tomcat ~]# docker ps
CONTAINER ID IMAGE COMMAND CREATED
STATUS PORTS
NAMESac8fefaac75f tomcat:v1 "/bin/sh -c '/usr/lo…" 39
seconds ago Up 37 seconds 0.0.0.0:8090->808
0/tcp tomcat-test
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/eec5312712d9417a8f7645fbdbe5474f.png)

## 基于 Jenkins 自动化部署 PHP 环境
准备 git 仓库

```bash
[root@git ~]# su - git
上一次登录：五 10 月 21 11:40:59 CST 2022pts/0 上
[git@git ~]$ mkdir php.git
[git@git ~]$ cd php.git
[git@git php.git]$ git --bare init
初始化空的 Git 版本库于 /home/git/php.git/
[git@git php.git]$ exit
登出
```
上传代码到仓库

```bash
[root@git ~]# git clone git@172.16.11.203:/home/git/php.git
正克隆到 'php'... git@172.16.11.203's password:
warning: 您似乎克隆了一个空版本库。
[root@git ~]# cd php/
[root@git php]# cat << EOF > index.php
<?php
phpinfo();
?>
EOF
[root@git php]# git add . [root@git php]# git commit -m "all"
[master（根提交） 4ec0ba3] all
1 file changed, 3 insertions(+)
create mode 100644 index.php
[root@git php]# git push origin master
git@192.168.200.111's password:
Counting objects: 3, done. Writing objects: 100% (3/3), 218 bytes | 0 bytes/s, done. Total 3 (delta 0), reused 0 (delta 0)
To git@172.16.11.203:/home/git/php.git * [new branch] master -> master
```
部署 web 主机环境

```bash
[root@web ~]# yum install -y httpd mariadb-server mariadb mariadb-devel php php-mysql
[root@web ~]# systemctl start httpd
[root@web ~]# systemctl start mariadb
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/838544d4119f4096be8a5803b722762e.png)

Jenkins 主机将密钥发布到 web 主机

```bash
[root@jenkins ~]# su -s /bin/bash jenkins
bash-4.2$ ssh-keygen
bash-4.2$ ssh-copy-id root@172.16.11.204
```


### 基于 rsync 部署
创建一个 Freestyle project

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/e4cc7fc51d7840228ed59865513edf2b.png)
![](https://img-blog.csdnimg.cn/1d80709ea27e4a8e88fbd460880c2b28.png)

rsync -avz --delete * root@172.16.11.204:/var/www/html/

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/1102e0d66a734268b4b16c1bee00c7bc.png)![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/f3db1eaa744143929e1bfc40a866203a.png)

```php
[root@web ~]# ls /var/www/html/
index.php
[root@web ~]# cat /var/www/html/index.php
<?php
phpinfo();
?>
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/d14b53d15ba1471982d36e47e41fb372.png)


### 基于 ansible 部署

```bash
[root@jenkins ~]# rpm -ivh epel-release-latest-7.noarch.rpm
[root@jenkins ~]# yum -y install ansible
[root@jenkins ~]# vim /etc/ansible/hosts
[webserver]
172.16.11.204
```
修改 jenkins 运行用户

```bash
[root@jenkins ~]# vim /etc/sysconfig/jenkins
JENKINS_USER="root"
[root@jenkins ~]# /etc/init.d/jenkins restart
Restarting jenkins (via systemctl): [ 确定 ]
```
添加 Ansible 插件

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/276415ca9f1641cabd97149518592521.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/58b6523db71e4a73a30ada20619689da.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/bf876d2e58ac486b9937291b21f4b7c5.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/b1164e81748b41109332d8acf5778fa0.png)

```bash
[root@jenkins ~]# ssh-keygen
[root@jenkins ~]# ssh-copy-id git@172.16.11.203
[root@jenkins ~]# ssh-copy-id root@172.16.11.204
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/41f1d3469f5545b38da90194049c2838.png)

src=${WORKSPACE} dest=/var/www/html rsync_opts=--exclude=.git


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/6d01660b31004f7ab1782b541a049bd0.png)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/a3508fd728db41ff9102045916515c6e.png)

```bash
[root@web ~]# cat /var/www/html/php-ansible/index.php
<?php
phpinfo();
?>
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/c6a132d5ac664d5da1202a35d9b06fc4.png)

至此所有就完成了；











