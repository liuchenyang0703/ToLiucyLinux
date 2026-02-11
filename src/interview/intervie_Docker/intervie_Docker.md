---
title: Docker常见面试题
icon: circle-info
order: 1
category:
  - 面试题
tag:
  - Docker常见面试题
  - 运维
date: 2026-02-07
pageview: true
article: false
breadcrumb: false
isOriginal: true
---

## 1、容器隔离及限制的底层技术是什么？  
答：cgroup 和 namespace 是最重要的两种技术。cgroup 实现系统资源限额， namespace 实现资源隔离。

## 2、namespace 分别对应六种资源有什么？  
答：Mount（文件系统）、UTS（主机名称）、IPC（内存）、PID（进程）、Network（网络） 和 User（用户）

## 3、Docker 安装时会自动在 host 上创建三个网桥模式，都叫什么？并简述下这几个不同的网络模式。  
答：bridge、host、none

## 4、Docker架构简单描述下

答：docker采用的是c/s架构。客户端向服务端发送请求，服务端负责构建、运行和分发容器。并且客户端和服务端可以运行在同一个宿主机上，客户端也可以通过socket与远程的服务端通信。

## 5、Docker 的核心组件都有什么？  
答：Docker 客户端 - Client 、Docker 服务器 - Docker daemon 、Docker 镜像 - Image、 Registry 仓库 – Registry、Docker 容器 - Container

## 6、创建容器的过程docker都做了哪些事情，简单描述下

答：

1.  Docker 客户端执行 docker run 命令。
    
2.  Docker daemon 发现本地没有 httpd 镜像。
    
3.  daemon 从 Docker Hub 下载镜像。
    
4.  下载完成，镜像 httpd 被保存到本地。
    
5.  Docker daemon 启动容器。
    

## 7、为什么 base 镜像 都很小？就比如centos在docker这里就很小，200M左右。

答：Linux系统的组成，Linux 操作系统由Bootfs（内核空间）和 Rootfs（用户空间）组成，因为对于 base 镜像来说，底层直接用宿主机的 kernel，自己只需要提供 rootfs 。

## 8、简述容器中copy-on-Write的特性

答：当用某个镜像创建了一个容器，在容器中只有当需要修改时才复制一份数据在容器层，这种特性被称作 Copy-on-Write。

## 9、Dockerfile 的基本结构是什么？  
![](https://i-blog.csdnimg.cn/img_convert/7978e6d010411399598cf41ad827bf40.png)

## 10、RUN 和 CMD 的区别是什么？  
答：

*   RUN：在构建镜像时执行命令，用于安装软件包或配置环境。
*   CMD：在容器启动时执行命令，用于定义默认的容器行为。

## 11、COPY 和 ADD 的区别是什么？  
答：

*   COPY：仅支持复制本地文件或目录到镜像中。
*   ADD：除了复制功能外，还支持自动解压和从远程 URL 下载文件。

## 12、如何查看 Docker 镜像的构建历史？  
答：使用 docker history 命令

## 13、如何清理未使用的 Docker 资源？  
删除未使用的镜像：docker image prune -a  
删除未使用的容器：docker container prune  
删除未使用的卷：docker volume prune

## 14、如何启动 Docker Compose 应用  
答案：docker-compose up -d。 -d：后台运行。

## 15、如何指定 Docker Compose 文件？  
答：docker-compose -f custom-compose.yml up

## 16、如何查看 Docker Compose 应用的日志？  
答：使用 docker-compose logs 命令


