---
title: Linux中基于Docker搭建harbor私有镜像仓库（超级详细）
icon: circle-info
order: 1
category:
  - Linux
  - Docker
tag:
  - Linux
  - Docker
  - 运维
pageview: false
date: 2024-12-16
comment: false
breadcrumb: false
---

## 前言
>Docker容器应用的开发和运行离不开可靠的镜像管理，虽然Docker官方也提供了公共的镜像仓库，但是从安全和效率等方面考虑，部署我们私有环境内的Registry也是非常必要的。

## Harbor仓库介绍

我们在日常Docker容器使用和管理过程中，渐渐发现部署企业私有仓库往往是很有必要的, 它可以帮助你管理企业的一些敏感镜像, 同时由于Docker Hub的下载速度和GFW的原因, 往往需要将一些无法直接下载的镜像导入本地私有仓库. 而Harbor就是部署企业私有仓库的一个不二之选。Harbor是由VMware公司开源的企业级的Docker Registry管理项目，Harbor主要提供Dcoker Registry管理UI，提供的功能包括：基于角色访问的控制权限管理(RBAC)、AD/LDAP集成、日志审核、管理界面、自我注册、镜像复制和中文支持等。Harbor的目标是帮助用户迅速搭建一个企业级的Docker registry服务。它以Docker公司开源的registry为基础，额外提供了如下功能:
->  基于角色的访问控制(Role Based Access Control)
->  基于策略的镜像复制(Policy based image replication)
->  镜像的漏洞扫描(Vulnerability Scanning)
->  AD/LDAP集成(LDAP/AD support)
->  镜像的删除和空间清理(Image deletion & garbage collection)
->  友好的管理UI(Graphical user portal)
->  审计日志(Audit logging)
->  RESTful API
->  部署简单(Easy deployment)

Harbor的所有组件都在Dcoker中部署，所以Harbor可使用Docker Compose快速部署。需要特别注意：**<font color=red>由于Harbor是基于Docker Registry V2版本，所以docker必须大于等于1.10.0版本，docker-compose必须要大于1.6.0版本！</font>**

## Harbor仓库结构

Harbor的每个组件都是以Docker容器的形式构建的，可以使用Docker Compose来进行部署。如果环境中使用了kubernetes，Harbor也提供了kubernetes的配置文件。Harbor大概需要以下几个容器组成：ui(Harbor的核心服务)、log(运行着rsyslog的容器，进行日志收集)、mysql(由官方mysql镜像构成的数据库容器)、Nginx(使用Nginx做反向代理)、registry(官方的Docker registry)、adminserver(Harbor的配置数据管理器)、jobservice(Harbor的任务管理服务)、redis(用于存储session)。

Harbor是一个用于存储和分发Docker镜像的企业级Registry服务器，整体架构还是很清晰的。下面借用了网上的架构图:
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161455489.png)

---
---
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161455105.png)


## 安装docker
首先要想部署harbor镜像仓库，我们就必须要docker服务，所以说先安装docker，安装步骤详情可以查看一下的安装步骤；
[linux（centos）中部署docker（步骤超全，含带一些发展史和一些概念）](https://blog.csdn.net/liu_chen_yang/article/details/123842609)
## 启动docker和设置开机自启
安装完成之后加载并启动docker和设置开机自启
```bash
#重新加载
systemctl daemon-reload
#启动docker
systemctl start docker
#设置开机自启
systemctl enable docker
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161455330.gif)
## 安装docker-compose

具体docker-compose的安装可以查看：[Linux中安装/部署docker-compose](https://blog.csdn.net/liu_chen_yang/article/details/124688952)

## 搭建harbor镜像仓库
### 1、下载harbor的安装包
>harbor版本 github地址：[https://github.com/goharbor/harbor/releases/](https://github.com/goharbor/harbor/releases/)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161455932.png)

拉到最后可以看到安装包，我们可以右键复制链接地址在服务器上使用`wget`下载，也可以直接点击下载；
需要指定版本的话，可以在链接上直接指定想要的版本，我这个就是找不到旧的了，随便点进去一个，指定了一下版本，然后下载2.4.2的即可。

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161455433.png)


![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161455526.png)





这里我们使用`wget`下载；
执行两次，第一次是加载，第二次是下载；
```bash
wget https://github.com/goharbor/harbor/releases/download/v2.4.2/harbor-offline-installer-v2.4.2.tgz
```
若下载慢或者连不上，可以使用如下命令下载

```bash
wget https://mirror.ghproxy.com/https://github.com/goharbor/harbor/releases/download/v2.4.2/harbor-offline-installer-v2.4.2.tgz
```
### 2、下载完进行解压

```bash
tar -xvf harbor-offline-installer-v2.4.2.tgz
```
### 3、编辑配置文件

```bash
#进入harbor目录
cd harbor
#复制一份harbor的配置文件并改名harbor.yml
cp -ar harbor.yml.tmpl harbor.yml
#vim进入配置文件
vim harbor.yml
```
修改以下内容：

```bash
hostname: 192.168.2.22  #这里配置的监听地址，也可以是域名
 
port: 10010 #这里配置监听端口

harbor_admin_password: 123456  # 配置admin用户的密码
 
data_volume: /data/harbor  #配置数据仓库
 
# 注释https，在13行开始
```
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161455302.png)
### 4、安装harbor
编辑完配置我们来安装harbor；

```bash
# Harbor安装环境预处理
./prepare
# 安装并启动Harbor
./install.sh
# 检查是否安装成功（应该是启动9个容器）要在harbor目录下操作，否则docker-compose会又问题；
docker-compose ps
```
#### 安装过程（可省略不看）

```bash
# Harbor安装环境预处理
[root@localhost harbor]# ./prepare 
prepare base dir is set to /usr/local/harbor
WARNING:root:WARNING: HTTP protocol is insecure. Harbor will deprecate http protocol in the future. Please make sure to upgrade to https
Generated configuration file: /config/portal/nginx.conf
Generated configuration file: /config/log/logrotate.conf
Generated configuration file: /config/log/rsyslog_docker.conf
Generated configuration file: /config/nginx/nginx.conf
Generated configuration file: /config/core/env
Generated configuration file: /config/core/app.conf
Generated configuration file: /config/registry/config.yml
Generated configuration file: /config/registryctl/env
Generated configuration file: /config/registryctl/config.yml
Generated configuration file: /config/db/env
Generated configuration file: /config/jobservice/env
Generated configuration file: /config/jobservice/config.yml
Generated and saved secret to file: /data/secret/keys/secretkey
Successfully called func: create_root_cert
Generated configuration file: /compose_location/docker-compose.yml
Clean up the input dir


# 安装并启动Harbor
[root@localhost harbor]# ./install.sh 

[Step 0]: checking if docker is installed ...

Note: docker version: 19.03.6

[Step 1]: checking docker-compose is installed ...

Note: docker-compose version: 1.29.2

[Step 2]: loading Harbor images ...
0e1c91c1a3dc: Loading layer [==================================================>]  41.07MB/41.07MB
7abced50bfd2: Loading layer [==================================================>]  5.296MB/5.296MB
43ad630c07b8: Loading layer [==================================================>]  5.928MB/5.928MB
3457e72d7725: Loading layer [==================================================>]  14.47MB/14.47MB
4a079b4b377a: Loading layer [==================================================>]  29.29MB/29.29MB
7b180b7bf3b4: Loading layer [==================================================>]  22.02kB/22.02kB
7b678649a1be: Loading layer [==================================================>]  14.47MB/14.47MB
Loaded image: goharbor/notary-signer-photon:v2.4.2
4f650960b0dc: Loading layer [==================================================>]  5.832MB/5.832MB
967788659fd5: Loading layer [==================================================>]  4.096kB/4.096kB
30cc19bdf2d6: Loading layer [==================================================>]  3.072kB/3.072kB
9ccede1a4324: Loading layer [==================================================>]  47.85MB/47.85MB
86f4685faff0: Loading layer [==================================================>]  12.38MB/12.38MB
25af1cf9c44e: Loading layer [==================================================>]  61.02MB/61.02MB
Loaded image: goharbor/trivy-adapter-photon:v2.4.2
0c68eb0d6bac: Loading layer [==================================================>]    166MB/166MB
9df9445e80b3: Loading layer [==================================================>]  67.71MB/67.71MB
3017f66ba184: Loading layer [==================================================>]   2.56kB/2.56kB
9dc332519067: Loading layer [==================================================>]  1.536kB/1.536kB
d1baaa0c2bb4: Loading layer [==================================================>]  12.29kB/12.29kB
e911a97738e0: Loading layer [==================================================>]   2.62MB/2.62MB
6fbfaf19de14: Loading layer [==================================================>]  326.1kB/326.1kB
Loaded image: goharbor/prepare:v2.4.2
323ed00cae7e: Loading layer [==================================================>]  8.447MB/8.447MB
c3f8c4668352: Loading layer [==================================================>]  3.584kB/3.584kB
94b71cd07106: Loading layer [==================================================>]   2.56kB/2.56kB
5d5638decfe4: Loading layer [==================================================>]   75.6MB/75.6MB
48426521f41c: Loading layer [==================================================>]  5.632kB/5.632kB
bb977315930e: Loading layer [==================================================>]  97.28kB/97.28kB
2a80a5f64ee7: Loading layer [==================================================>]  11.78kB/11.78kB
0a5146355ed0: Loading layer [==================================================>]   76.5MB/76.5MB
7d5eac57d5fa: Loading layer [==================================================>]   2.56kB/2.56kB
Loaded image: goharbor/harbor-core:v2.4.2
f7cedf07c50c: Loading layer [==================================================>]  8.447MB/8.447MB
b2a916599ac7: Loading layer [==================================================>]  3.584kB/3.584kB
3bc2556f46f8: Loading layer [==================================================>]   2.56kB/2.56kB
a9cc192089ec: Loading layer [==================================================>]  86.96MB/86.96MB
9e9c53c1bd85: Loading layer [==================================================>]  87.75MB/87.75MB
Loaded image: goharbor/harbor-jobservice:v2.4.2
6111e09009c2: Loading layer [==================================================>]  7.222MB/7.222MB
Loaded image: goharbor/nginx-photon:v2.4.2
f4658d2c3aa3: Loading layer [==================================================>]  8.447MB/8.447MB
4b7bdcad271f: Loading layer [==================================================>]  18.13MB/18.13MB
cbb8c130a490: Loading layer [==================================================>]  4.608kB/4.608kB
f1367013643c: Loading layer [==================================================>]  18.93MB/18.93MB
Loaded image: goharbor/harbor-exporter:v2.4.2
a1b12e0ab8ea: Loading layer [==================================================>]  5.296MB/5.296MB
df6629a5ee28: Loading layer [==================================================>]  5.928MB/5.928MB
944fcde3a84b: Loading layer [==================================================>]  15.88MB/15.88MB
300e181c27cf: Loading layer [==================================================>]  29.29MB/29.29MB
87f01e78dde1: Loading layer [==================================================>]  22.02kB/22.02kB
8306283aa89d: Loading layer [==================================================>]  15.88MB/15.88MB
Loaded image: goharbor/notary-server-photon:v2.4.2
c635aace513a: Loading layer [==================================================>]    5.3MB/5.3MB
8deb84525956: Loading layer [==================================================>]   64.5MB/64.5MB
5d1431f9963f: Loading layer [==================================================>]  3.072kB/3.072kB
faeb0aac7135: Loading layer [==================================================>]  4.096kB/4.096kB
7ade25e3acdb: Loading layer [==================================================>]  65.29MB/65.29MB
Loaded image: goharbor/chartmuseum-photon:v2.4.2
27495e3181af: Loading layer [==================================================>]  7.222MB/7.222MB
88649dba6134: Loading layer [==================================================>]  7.356MB/7.356MB
875f964b6f85: Loading layer [==================================================>]  1.754MB/1.754MB
Loaded image: goharbor/harbor-portal:v2.4.2
c724cc796747: Loading layer [==================================================>]  124.3MB/124.3MB
b6c853c6dc0d: Loading layer [==================================================>]  3.584kB/3.584kB
0c5772798040: Loading layer [==================================================>]  3.072kB/3.072kB
c5f3bfcfa62d: Loading layer [==================================================>]   2.56kB/2.56kB
2602a8530e9d: Loading layer [==================================================>]  3.072kB/3.072kB
ba9b43b5ffb1: Loading layer [==================================================>]  3.584kB/3.584kB
cf92b578ba00: Loading layer [==================================================>]  20.48kB/20.48kB
Loaded image: goharbor/harbor-log:v2.4.2
fc1f8cdaf1ce: Loading layer [==================================================>]  1.096MB/1.096MB
eb68e72cbb03: Loading layer [==================================================>]  5.888MB/5.888MB
53a31c9e9836: Loading layer [==================================================>]  166.2MB/166.2MB
bed7172f8681: Loading layer [==================================================>]  17.75MB/17.75MB
c8fcd33ae148: Loading layer [==================================================>]  4.096kB/4.096kB
0c8d734a07ee: Loading layer [==================================================>]  6.144kB/6.144kB
c01db4825573: Loading layer [==================================================>]  3.072kB/3.072kB
4802d0abc8ba: Loading layer [==================================================>]  2.048kB/2.048kB
70bafeb87c65: Loading layer [==================================================>]   2.56kB/2.56kB
376ced88e40e: Loading layer [==================================================>]   2.56kB/2.56kB
0ba55f221469: Loading layer [==================================================>]   2.56kB/2.56kB
55cac263100c: Loading layer [==================================================>]  8.704kB/8.704kB
Loaded image: goharbor/harbor-db:v2.4.2
30ed654bbb0e: Loading layer [==================================================>]  5.301MB/5.301MB
51a81f0bf9ea: Loading layer [==================================================>]  4.096kB/4.096kB
12992ea6b45e: Loading layer [==================================================>]  3.072kB/3.072kB
91b97bcaa9d7: Loading layer [==================================================>]  17.32MB/17.32MB
1a992360f6fa: Loading layer [==================================================>]  18.12MB/18.12MB
Loaded image: goharbor/registry-photon:v2.4.2
d7224235291f: Loading layer [==================================================>]  5.301MB/5.301MB
dd26d9070a7b: Loading layer [==================================================>]  4.096kB/4.096kB
4022ecee5f13: Loading layer [==================================================>]  17.32MB/17.32MB
93d727d0accc: Loading layer [==================================================>]  3.072kB/3.072kB
8a56be8f0b84: Loading layer [==================================================>]  28.69MB/28.69MB
629472303402: Loading layer [==================================================>]  46.81MB/46.81MB
Loaded image: goharbor/harbor-registryctl:v2.4.2
bf4dfb7b7a70: Loading layer [==================================================>]  120.1MB/120.1MB
a0b0ce804b6b: Loading layer [==================================================>]  3.072kB/3.072kB
f088aae660dd: Loading layer [==================================================>]   59.9kB/59.9kB
2c15508db9bd: Loading layer [==================================================>]  61.95kB/61.95kB
Loaded image: goharbor/redis-photon:v2.4.2


[Step 3]: preparing environment ...

[Step 4]: preparing harbor configs ...
prepare base dir is set to /usr/local/harbor
WARNING:root:WARNING: HTTP protocol is insecure. Harbor will deprecate http protocol in the future. Please make sure to upgrade to https
Clearing the configuration file: /config/portal/nginx.conf
Clearing the configuration file: /config/log/logrotate.conf
Clearing the configuration file: /config/log/rsyslog_docker.conf
Clearing the configuration file: /config/nginx/nginx.conf
Clearing the configuration file: /config/core/env
Clearing the configuration file: /config/core/app.conf
Clearing the configuration file: /config/registry/passwd
Clearing the configuration file: /config/registry/config.yml
Clearing the configuration file: /config/registryctl/env
Clearing the configuration file: /config/registryctl/config.yml
Clearing the configuration file: /config/db/env
Clearing the configuration file: /config/jobservice/env
Clearing the configuration file: /config/jobservice/config.yml
Generated configuration file: /config/portal/nginx.conf
Generated configuration file: /config/log/logrotate.conf
Generated configuration file: /config/log/rsyslog_docker.conf
Generated configuration file: /config/nginx/nginx.conf
Generated configuration file: /config/core/env
Generated configuration file: /config/core/app.conf
Generated configuration file: /config/registry/config.yml
Generated configuration file: /config/registryctl/env
Generated configuration file: /config/registryctl/config.yml
Generated configuration file: /config/db/env
Generated configuration file: /config/jobservice/env
Generated configuration file: /config/jobservice/config.yml
loaded secret from file: /data/secret/keys/secretkey
Generated configuration file: /compose_location/docker-compose.yml
Clean up the input dir


Note: stopping existing Harbor instance ...
Stopping registryctl   ... done
Stopping harbor-db     ... done
Stopping harbor-portal ... done
Stopping redis         ... done
Stopping harbor-log    ... done
Removing registryctl   ... done
Removing harbor-db     ... done
Removing harbor-portal ... done
Removing redis         ... done
Removing harbor-log    ... done
Removing network harbor_harbor


[Step 5]: starting Harbor ...
Creating network "harbor_harbor" with the default driver
Creating harbor-log ... done
Creating harbor-db     ... done
Creating redis         ... done
Creating registryctl   ... done
Creating harbor-portal ... done
Creating registry      ... done
Creating harbor-core   ... done
Creating nginx             ... done
Creating harbor-jobservice ... done
✔ ----Harbor has been installed and started successfully.----

# 检查是否安装成功（应该是启动9个容器）
[root@localhost harbor]# docker-compose ps -a
      Name                     Command                  State                 Ports          
---------------------------------------------------------------------------------------------
harbor-core         /harbor/entrypoint.sh            Up (healthy)                            
harbor-db           /docker-entrypoint.sh 96 13      Up (healthy)                            
harbor-jobservice   /harbor/entrypoint.sh            Up (healthy)                            
harbor-log          /bin/sh -c /usr/local/bin/ ...   Up (healthy)   127.0.0.1:1514->10514/tcp
harbor-portal       nginx -g daemon off;             Up (healthy)                            
nginx               nginx -g daemon off;             Up (healthy)   0.0.0.0:10010->8080/tcp  
redis               redis-server /etc/redis.conf     Up (healthy)                            
registry            /home/harbor/entrypoint.sh       Up (healthy)                            
registryctl         /home/harbor/start.sh            Up (healthy)                            
```
### 5、修改docker配置

```bash
# 由于docker默认不允许使用非https方式推送镜像,所以在需要pull镜像的服务器配置访问地址
vim /etc/docker/daemon.json
#添加如下内容(客户端访问的网址)：
{
	"registry-mirrors":[
     	   "https://njrds9qc.mirror.aliyuncs.com"
   	  ],
	"insecure-registries" :[
    	   "192.168.2.22:10010"
    ]
}

#或者，具体看自己的版本，版本不一样，写的格式就不一样。
{
"insecure-registries": ["192.168.2.22:10010"]
}
​
# 重启docker和harbor容器；要在harbor目录下操作，否则docker-compose会又问题；
systemctl daemon-reload
systemctl restart docker
docker-compose stop
docker-compose up -d

# docker登录方式
docker login 192.168.2.22:10010
#或者 
docker login -uadmin -p123456 192.168.2.22:10010
```
### 6、访问harbor页面
访问地址：（ip:端口）192.168.2.22:10010
用户名：admin		密码：123456
登录进入；
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161454046.png)
### 7、上传镜像
#### ①、查看所有镜像
找到你要上传的镜像。

```bash
[root@localhost ~]# docker images
REPOSITORY                                  TAG                 IMAGE ID            CREATED             SIZE
busybox                                     latest              beae173ccac6        4 months ago        1.24MB
```

#### ②、给要上传的镜像tag打个标签(修改镜像名)
注意：**<font color=red>一定要加上项目名称</font>**

<font color=teal>格式：</font>

```bash
docker tag 镜像名:版本 your-ip:端口/项目名称/新的镜像名:版本
```
<font color=teal>实例：</font>
```bash
docker tag busybox:latest 192.168.2.22:10010/library/busybox:v1
```
查看打好标签的镜像：

```bash
[root@localhost ~]# docker images
REPOSITORY                                  TAG                 IMAGE ID            CREATED             SIZE
busybox                                     latest              beae173ccac6        4 months ago        1.24MB
192.168.2.22:10010/library/busybox          v1                  beae173ccac6        4 months ago        1.24MB
```

#### ③、推送镜像到harbor仓库
<font color=teal>格式：</font>

```bash
docker push 修改的镜像名
```
<font color=teal>实例：</font>

```bash
[root@localhost ~]# docker push 192.168.2.22:10010/library/busybox:v1
The push refers to repository [192.168.2.22:10010/library/busybox]
01fd6df81c8e: Layer already exists 
v1: digest: sha256:62ffc2ed7554e4c6d360bce40bbcf196573dd27c4ce080641a2c59867e732dee size: 527
```
#### ④、web页面查看
然后我们去web页面看，登录页面192.168.2.22:10010，然后去查看。
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161454993.png)
这个就是我们的项目名称了，我们点进去就可以看到我们上传的镜像了。
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161454517.png)
然后再次点击进去就可以看到更详细的了；
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161454270.png)
这里我们的上传镜像就完成了。

### 8、拉取镜像

#### ①、拉取方法一
拉取镜像的话，我们可以点击这个小按钮，然后直接粘贴到linux中等待拉取就可以了；
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161454115.png)

#### ②、拉取方法二

<font color=teal>格式：</font>

```bash
docker pull 上传时修改的镜像名
```
<font color=teal>实例：</font>

```bash
[root@localhost ~]# docker pull 192.168.2.22:10010/library/busybox:v1
v1: Pulling from library/busybox
Digest: sha256:62ffc2ed7554e4c6d360bce40bbcf196573dd27c4ce080641a2c59867e732dee
Status: Downloaded newer image for 192.168.2.22:10010/library/busybox:v1
192.168.2.22:10010/library/busybox:v1
```
#### ③、查看拉过来的镜像：

```bash
[root@localhost ~]# docker images
REPOSITORY                                  TAG                 IMAGE ID            CREATED             SIZE
192.168.2.22:10010/library/busybox          v1                  beae173ccac6        4 months ago        1.24MB
```
要是想要原来的镜像名，我们可以tag来修改镜像镜像名和版本。
### 9、删除harbor镜像库中的镜像
删除镜像就是直接在web页面操作的；
#### ①、访问harbor并登录
192.168.2.22:10010

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161454353.png)

#### ②、查看镜像详情
点击项目——点击项目名称
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161454647.png)

#### ③、删除harbor镜像库中的镜像

找到要删除的镜像，选中前面的空白框；
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161454551.png)
选中要删除的镜像——点击删除——确认删除
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161454916.png)
这样就删除成功了。
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161454452.png)
好了，今天所有的到此结束了，感谢大家的阅读。

## 总结

**相关文章：**
>①、[Docker——denied: requested access to the resource is denied问题以及解决方法](https://blog.csdn.net/liu_chen_yang/article/details/124665726?spm=1001.2014.3001.5502)
>②、[Docker搭建harbor私有镜像仓库（命令行模式）](https://blog.csdn.net/liu_chen_yang/article/details/124705622)
>③、[Linux中安装/部署docker-compose](https://blog.csdn.net/liu_chen_yang/article/details/124688952)
>④、[Docker发布/上传镜像到dockerhub&&下载/拉取镜像&&删除dockerhub镜像](https://blog.csdn.net/liu_chen_yang/article/details/124670946?spm=1001.2014.3001.5502)

