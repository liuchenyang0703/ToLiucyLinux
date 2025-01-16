---
title: linux（centos）中部署docker（步骤超全，含带一些发展史和一些概念）
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
&emsp;&emsp;Docker 是一个开源的应用容器引擎，基于Go语言 并遵从 Apache2.0 协议开源。
&emsp;&emsp;Docker 可以让开发者打包他们的应用以及依赖包到一个轻量级、可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口,更重要的是容器性能开销极低。
>	容器技术发展史:
> - 容器概念始于 1979年提出的UNIX chroot，它是一个UNIX操作系统的系统调用，将一个进程及其子进程的根目录改变到文件系统中的一个新位置，让这些进程只能访问到这个新的位置，从而达到了进程隔离的目的。<br>
>- 2000年的时候FreeBSD开发了一个类似于chroot的容器技术Jails，这是最早期，也是功能最多的容器技术。Jails 英译过来是监狱的意思，这个“监狱”（用沙盒更为准确）包含了文件系统、用户、网络、进程等的隔离。
>- 2001年Linux 也发布自己的容器技术Linux VServer，2004 Solaris也发布了Solaris Containers，两者都将资源进行划分，形成一个个zones，又叫做虚拟服务器。
>- 2005年年推出OpenVZ，它通过对Linux内核进行补丁来提供虚拟化的支持，每个OpenVZ容器完整支持了文件系统、用户及用户组、进程、网络、设备和 IPC 对象的隔离。
>- 2007 年Google实现了Control Groups( cgroups)，并加入到Linux内核中，这是划时代的，为后期容器的资源配额提供了技术保障。
>- 2008 年基于cgroups 和 Linux namespace推出了第一个最为完善的 Linux 容器 LXC。
>- 2013年推出到现在为止最为流行和使用最广泛的容器Docker，相比其他早期的容器技术，Docker 引入了一整套容器管理的生态系统，包括分层的镜像模型，容器注册库，友好的 Rest API。
>- 2014 年CoreOS 也推出了一个类似于Docker的容器Rocket，CoreOS一个更加轻量级的Linux操作系统，在安全性上比Docker更严格。
>- 2014年，Kubernetes项目正式发布，容器技术开始和编排系统起头并进。
>- 2015年，由Google，Redhat、Microsoft及一些大型云厂商共同创立了CNCF，云原生浪潮启动。
>- 2016年 - 2017年，容器生态开始模块化、规范化。CNCF接受Containerd、rkt项目，OCI发布1.0，CRI/CNI得到广泛支持。
>- 2017年 - 2018年，容器服务商业化。AWS ECS，Google EKS，Alibaba ACK/ASK/ECI，华为 CCI，Oracle Container Engine for Kubernetes；VMware，Redhat和Rancher开始提供基于Kubernetes的商业服务产品。
>- 2017 年 - 2019年，容器引擎技术飞速发展，新技术不断涌现。2017 年底Kata Containers社区成立，2018年5月Google开源gVisor代码，2018年11月AWS 开源firecracker，阿里云发布安全沙箱1.0。


## Docker中两项核心技术
&emsp;&emsp;Docker本质就是宿主机的一个进程，Docker是通过Namespace实现资源隔离，通过Cgroup实现资源限制，通过写时复制技术(copy-on-write)实现了高效的文件操作。

**<font color=teal>&emsp;&emsp;1.Namespace</font>**

&emsp;&emsp;Linux Namespaces机制提供一种资源隔离方案。PID,IPC,Network等系统资源不再是全局性的，而是属于某个特定的Namespace。每个Namespace下的资源对于其他Namespace下的资源都是透明，不可见的。因此在操作系统层面上看，就会出现多个相同pid的进程。系统中可以同时存在两个进程号为0,1,2的进程，由于属于不同的Namespace，所以它们之间并不冲突。而在用户层面上只能看到属于用户自己Namespace下的资源，例如使用ps命令只能列出自己Namespace下的进程。这样每个Namespace看上去就像一个单独的Linux系统。

| Namespace |  隔离内容/内核版本|
|--|--|
|Mount|	挂载点(文件系统)	/2.4.19
|UTS|	主机名与域名	/2.6.19
|IPC	|进程间通信的隔离，包括常见的几种进程间通信机制，如信号量，消息队列和共享内存。	/2.6.19
|PID|	进程ID	/2.6.24
|Network	|网络设备，端口等	/2.6.29
|User|	用户与用户组	/3.8


**<font color=teal>&emsp;&emsp;2.Cgroup</font>**

&emsp;&emsp;    Cgroup是Control Groups的缩写，是Linux内核提供的一种可以限制、记录、隔离进程组所使用的物理资源（如CPU、内存、磁盘IO等待）的机制，被LXC、docker等很多项目用于实现进程资源控制。Cgroup本身是提供将进程进行分组化管理的功能和接口的基础结构，I/O或内存的分配控制等具体的资源管理是通过该功能来实现的。
四大功能：　　　　　　　　

 - 资源限制：可以对任务使用的资源总额进行限制
 - 优先级分配：通过分配的cpu时间片数量以及磁盘IO带宽大小，实际上相当于控制了任务运行优先级
 - 资源统计：可以统计系统的资源使用量，如cpu时长，内存用量等
 - 任务控制：cgroup可以对任务执行挂起、恢复等操作

## Docker核心概念

**<font color=green> 1. 镜像(Image)</font>**


&emsp;&emsp; 一个带有创建docker容器命令的只读模板，通常在一个基础镜像上添加附加的指令，来创建一个新镜像。
    

镜像的两个特征：
>- 镜像是分层（Layer）的：即一个镜像可以多个中间层组成，多个镜像可以共享同一中间层，我们也可以通过在镜像添加多一层来生成一个新的镜像。
>- 镜像是只读的（read-only）：镜像在构建完成之后，便不可以再修改，而上面我们所说的添加一层构建新的镜像，这中间实际是通过创建一个临时的容器，在容器上增加或删除文件，从而形成新的镜像，因为容器是可以动态改变的。

**<font color=green>2. 容器(Container)</font>**

&emsp;&emsp;容器与镜像的关系，就如同面向编程中对象与类之间的关系。
>    &emsp;&emsp;因为容器是通过镜像来创建的，所以必须先有镜像才能创建容器，而生成的容器是一个独立于宿主机的隔离进程，并且有属于容器自己的网络和命名空间。
&emsp;&emsp;镜像由多个中间层（layer）组成，生成的镜像是只读的，但容器却是可读可写的，这是因为容器是在镜像上面添一层读写层（writer/read layer）来实现的。


**<font color=green>3. 仓库(Repository)</font>**

>仓库（Repository）是集中存储镜像的地方，仓库分为公有仓库与私有仓库。比如Docker Hub，就是Docker官方提供的一个仓库服务器。

## Docker的逻辑架构
  >&emsp;&emsp; Docker采用的是C/S架构，Docker客户端向服务端(docker-daemon)发送指令，docker-daemon负责构建，运行以及分发docker容器，docker的客户端与服务端可以运行在同一台主机上，也可以使用docker的客户端连接远程的服务端，客户端与服务端使用RSET API通信，也可以使用Unix套接字，或者是网络接口。另外还可以使用docker compose作为客户端，它可以控制一组docker容器的应用程序。
## docker优缺点

 &emsp; 优点：
>1.  快速部署：短时间内可以部署成百上千个应用，更快速交付到线上。
>2. 高效虚拟化：不需要额外的 hypervisor 支持，直接基于 linux 实现应用虚拟化，相比虚拟机大幅提高性能和效率。
>3. 节省开支：提高服务器利用率，降低 IT 支出。
>4. 简化配置：将运行环境打包保存至容器，使用时直接启动即可。
>5. 快速迁移和扩展： 可夸平台运行在物理机、虚拟机、公有云等环境，良好的兼容性可以方便将应用从A宿主机迁移到B宿主机， 甚至是A平台迁移到B平台。


&emsp; 缺点：
>隔离性：各应用之间的隔离不如虚拟机彻底。

## Docker VS 虚拟化
虚拟化：
>    &emsp;  传统的虚拟机需要模拟整台机器包括硬件，每台虚拟机都需要有自己的操作系统，虚拟机一旦被开启，预分配给他的资源将全部被占用。每一个虚拟机包括应用，必要的二进制和库，以及一个完整的用户操作系统。

Docker：
> &emsp; 容器技术是和宿主机共享硬件资源及操作系统可以实现资源的动态分配。
 &emsp; 容器包含应用和其所有的依赖包，但是与其他容器共享内核。容器在宿主机操作系统中，在用户空间以分离的进程运行。

<table><tr><td bgcolor=yellow>服务器虚拟化解决的核心问题是资源调配，而容器解决的核心问题是应用开发、测试和部署。</td></tr></table>

docker与虚拟化区别总结:
>1. docker启动快速属于秒级别。虚拟机通常需要几分钟去启动。
>2. docker需要的资源更少，docker在操作系统级别进行虚拟化，docker容器和内核交互，几乎没有性能损耗，性能优于通过Hypervisor层与内核层的虚拟化。；
>3. docker更轻量，docker的架构可以共用一个内核与共享应用程序库，所占内存极小。同样的硬件环境，Docker运行的镜像数远多于虚拟机数量。对系统的利用率非常高
>4. 与虚拟机相比，docker隔离性更弱，docker属于进程之间的隔离，虚拟机可实现系统级别隔离；
>5. 快速创建、删除：虚拟化创建是分钟级别的，Docker容器创建是秒级别的，Docker的快速迭代性，决定了无论是开发、测试、部署都可以节约大量时间。
>6. 交付、部署：虚拟机可以通过镜像实现环境交付的一致性，但镜像分发无法体系化；Docker在Dockerfile中记录了容器构建过程，可在集群中实现快速分发和快速部署;


## docker部署与管理
### docker安装

&emsp;&emsp;在服务器上准备在线镜像源，然后添加docker的镜像源，如果之前安装过需要先卸载。

#### 离线安装
连接中有步骤；
[部署docker的离线包](https://download.csdn.net/download/liu_chen_yang/85965917?spm=1001.2014.3001.5503)
[docker24.0.5离线安装包 （一键部署）](https://download.csdn.net/download/liu_chen_yang/88647183)

![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161441340.png)
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161441465.png)




#### 在线安装

```bash
#安装依赖包
[root@docker ~]# yum install -y yum-utils device-mapper-persistent-data lvm2	
#添加华为云的docker镜像地址
[root@docker ~]# yum-config-manager --add-repo https://repo.huaweicloud.com/docker-ce/linux/centos/docker-ce.repo
# 更新缓存，只处理新添加的yum源缓存
[root@docker ~]# yum makecache fast
#安装docker，默认安装最新版本
[root@docker ~]# yum -y install docker-ce
#查看安装docker版本
[root@docker ~]# docker –version(或者使用docker version)
Docker version 20.10.7, build f0df350

[root@docker ~]# systemctl start docker
#查看docker可以安装的版本
[root@docker ~]# yum list docker-ce --showduplicates | sort -r
```
## 添加镜像加速器
由于docker默认从docker hub(https://registry.hub.docker.com/)下载镜像，所以速度非常慢，可以通过阿里云的镜像加速器提高镜像拉取的速度。 
![](https://lcy-blog.oss-cn-beijing.aliyuncs.com/blog/202412161441041.png)

```bash
[root@docker ~]# mkdir -p /etc/docker
[root@docker ~]# tee /etc/docker/daemon.json <<-'EOF'

> {
>   "registry-mirrors": ["https://mrlmpasq.mirror.aliyuncs.com"]
> }
> EOF
{
  "registry-mirrors": ["https://mrlmpasq.mirror.aliyuncs.com"]
}
[root@docker ~]# systemctl daemon-reload
[root@docker ~]# systemctl restart docker
```
### docker镜像管理

```bash
#列出所有的镜像
[root@docker ~]# docker images
REPOSITORY   TAG       IMAGE ID   CREATED   SIZE
REPOSITORY：表示镜像的仓库源
TAG：镜像的标签
IMAGE ID：镜像ID
CREATED：镜像创建时间
SIZE：镜像大小
```
| docker image 命令 | 作用         | 举例          | 选项 / 参数 |
| ----------------- | ------------ | ------------- | ----------- |
| docker images     | 查看所有镜像 | docker images |             |
| docker build |通过Dockerfile构建镜像 | docker build -t centos:v1 .| -t 指定镜像名称
|docker search |	搜索镜像	|docker search centos	|-f 按条件过滤
|docker pull	|拉取镜像	|docker pull centos:7	
|docker push 	|推送镜像到仓库|	docker push centos:7	
|docker tag|	为镜像修改或制作标签	|docker tag centos:7 centos7:v1	
|docker rmi|	删除镜像|	docker rmi centos7:v1|	
|docker save |	将镜像保存为tar包|	docker save -o centos7.tar centos:7|	-o 指定生成tar包名称
|docker load 	|将tar包保存的镜像导入|	docker load -i centos.tar|	-i 指定读取的tar包名称
|docker histroy 	|查看镜像创建的历史	|docker history centos:7	
|docker prune|删除未使用的镜像|docker prune|

### docker容器管理
|  docker container命令	|说明	|举例
|--|--|--|
|docker ps -a|查看所有的容器 |docker ps -a|
|docekr ps |查看所有的正在运行的容器| docekr ps 
| docker ps -l|查看最新的容器|  docker ps -l| 
|docker container ls|	查看运行的容器|	docker container ls|	
|docker run|	运行一个docker容器		|docker run -itd --name nginx nginx:v1|
|docker container create	|创建容器但不运行		|docker container create nginx|
|docker exec|	进入容器或用来在已经运行的容器中执行命令	|	docker exec -it nginx bash|
|docker start |	启动容器		|docker start nginx|
|docker stop |	关闭容器		|docker stop nginx|
|docker restart |	重启容器		|docker restart nginx|
|docker inspect|	查看容器的信息		|docker inspect nginx|
|docker rm -f| 	删除容器	|docker rm -f nginx|	
|docker rename|	给容器重命名		|docker rename nginx nginx2|
|docker commit |	提交容器变化为新镜像		|docker commit nginx|
|docker top	|查看容器的进程		|docker top nginx2|
|docker logs	|获取容器日志信息	|docker logs nginx2|
|docker cp|	容器与主机间文件复制|docker cp a.txt nginx:/home/|		
|docker update |	更新容器配置		|docker update --restart=no nginx|
|docker stats	|查看容器资源使用情况		|docker stats nginx2|
|docker diff	|对比容器文件变化		docker diff nginx nginx2|
|docker container prune|	删除没有运行的容器	| 一般用不到
|docker container pause	|暂停容器运行(挂起)		| 一般用不到
|docker container unpause|	继续运行容器		| 一般用不到
|docker port |	列出端口映射		|docker port nginx2|
|docker container kill	|杀死正在运行的容器		|docker kill nginx2|
|docker export|	容器文件导出为tar 		|docker export nginx.tar nginx
|docker wait|	阻塞容器		|一般用不到

#### docker运行容器命令
>docker run命令是根据指定镜像创建一个容器并启动运行。如果本地没有该镜像，则从docker仓库中拉去镜像。所以
>docker run = docker image pull +  docker create + docker start  
>命令格式：`docker run [选项] 镜像名称|镜像ID  [command]`
>示例：`docker run -itd --name test --restart=always --network=host -v /etc/localtime/:/etc/localtime test:v1`

**常用参数选项：**
|参数|解释|
|--|--|
|-i |以交互模式运行容器，通常与 -t 同时使用；
|-t| 为容器重新分配一个伪输入终端，通常与 -i 同时使用；
|-d| 后台运行容器，返回容器ID，运行守护进程式容器 
|- -name |指定生成容器的名称
|- -restart|指定是否开机自启，always（开机自启）
|- -network |指定docker网络模式(bridge/host/none/container)
|-P |随机映射端口，容器内部端口随机映射为主机端口
|-p| 指定端口映射， -p 主机端口:容器端口
|- -expose| 指定暴露端口或端口范围
|-h |指定容器的主机名称
|-v|映射容器外与容器内的目录
|- -privileged|使用该参数，container内的root拥有真正的root权限。
|- -dns |指定DNS服务器地址，默认与主机一致
|-e |设置环境变量
|- -env-file |从指定文件读取环境变量 


```bash
1.运行交互式容器 
[root@docker ~]# docker container run -it --name='centos-1' centos:7 /bin/bash
[root@3ad7e1a5e55f /]#
直接退出，运行exit，容器会结束运行
[root@docker ~]# docker container ls -a
CONTAINER ID   IMAGE      COMMAND       CREATED          STATUS                     PORTS     NAMES
3ad7e1a5e55f   centos:7   "/bin/bash"   39 seconds ago   Exited (0) 6 seconds ago             centos-1
可以使用docker container start命令启动容器
[root@docker ~]# docker container start centos-1 
centos-1
[root@docker ~]# docker container ls -a
CONTAINER ID   IMAGE      COMMAND       CREATED              STATUS         PORTS     NAMES
3ad7e1a5e55f   centos:7   "/bin/bash"   About a minute ago   Up 2 seconds             centos-1
运行容器，不结束容器退出
[root@docker ~]# docker container run -it --name='centos-2' centos:7 /bin/bash
[root@764b82cb892f /]#（ctrl+pq）

2.启动守护进程式容器
[root@docker ~]# docker container run -d nginx:latest 
cef133be2d53c0d4921ceba34855e7dc250984191d10d3dfedf82195e9d85d3c
[root@docker ~]# docker ps -a
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS     NAMES
cef133be2d53   nginx:latest   "/docker-entrypoint.…"   6 seconds ago   Up 5 seconds   80/tcp    relaxed_lichterman
764b82cb892f   centos:7       "/bin/bash"              3 minutes ago   Up 3 minutes             centos-2
3ad7e1a5e55f   centos:7       "/bin/bash"              5 minutes ago   Up 4 minutes             centos-1
```
### docker网络管理

| 命令                   | 解析                 |
| ---------------------- | -------------------- |
| docker network ls      | 列出所有的docker网络 |
| docker network create  | 创建一个新的网络     |
| docker network rm      | 删除一个网络         |
| docker network inspect | 检查网络的详细信息   |